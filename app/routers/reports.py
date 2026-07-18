from datetime import datetime
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models import ComplaintReport, Report
from app.schemas.schemas import (
    ComplaintCreateRequest,
    ComplaintCreateResponse,
    ComplaintFeedItem,
    ErrorResponse,
)
from app.services import pdf_generator

router = APIRouter(tags=["reports"])


@router.post(
    "/report",
    response_model=ComplaintCreateResponse,
    responses={404: {"model": ErrorResponse}, 422: {"model": ErrorResponse}},
)
def create_report(payload: ComplaintCreateRequest, db: Session = Depends(get_db)):
    if payload.scam_report_id is not None:
        linked = db.query(Report).filter(Report.id == payload.scam_report_id).first()
        if not linked:
            raise HTTPException(
                status_code=404,
                detail=f"scam_report_id {payload.scam_report_id} not found.",
            )

    try:
        pdf_path = pdf_generator.generate_complaint_pdf(
            {
                "name": payload.name.strip(),
                "phone": payload.phone.strip(),
                "description": payload.description.strip(),
                "date": datetime.utcnow(),
                "linked_report_id": payload.scam_report_id,
            }
        )
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate complaint PDF: {exc}",
        ) from exc

    try:
        record = ComplaintReport(
            name=payload.name.strip(),
            phone=payload.phone.strip(),
            description=payload.description.strip(),
            scam_report_id=payload.scam_report_id,
            pdf_path=pdf_path,
        )
        db.add(record)
        db.commit()
        db.refresh(record)
    except Exception as exc:  # noqa: BLE001
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to save complaint report: {exc}",
        ) from exc

    return {"report_id": record.id, "pdf_path": record.pdf_path}


@router.get(
    "/report/feed",
    response_model=list[ComplaintFeedItem],
)
def report_feed(db: Session = Depends(get_db)):
    rows = (
        db.query(ComplaintReport)
        .order_by(ComplaintReport.created_at.desc())
        .limit(20)
        .all()
    )
    return rows


@router.get(
    "/report/{report_id}/pdf",
    responses={404: {"model": ErrorResponse}},
)
def download_report_pdf(report_id: int, db: Session = Depends(get_db)):
    if report_id < 1:
        raise HTTPException(status_code=422, detail="report_id must be a positive integer.")

    record = db.query(ComplaintReport).filter(ComplaintReport.id == report_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Report not found.")

    pdf_path = Path(record.pdf_path)
    if not pdf_path.is_file():
        raise HTTPException(status_code=404, detail="PDF file missing on server.")

    return FileResponse(
        path=str(pdf_path),
        media_type="application/pdf",
        filename=pdf_path.name,
    )

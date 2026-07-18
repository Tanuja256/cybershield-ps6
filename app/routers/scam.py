from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models import Report
from app.schemas.schemas import ErrorResponse, ScamCheckRequest, ScamCheckResponse
from app.services import scam_agent

router = APIRouter(tags=["scam"])


@router.post(
    "/scam-check",
    response_model=ScamCheckResponse,
    response_model_exclude_none=True,
    responses={422: {"model": ErrorResponse}, 500: {"model": ErrorResponse}},
)
def scam_check(payload: ScamCheckRequest, db: Session = Depends(get_db)):
    message = payload.message.strip()
    if not message:
        raise HTTPException(status_code=422, detail="message must not be blank.")

    phone = payload.phone_number.strip() if payload.phone_number else None
    if phone == "":
        phone = None

    try:
        result = scam_agent.run(
            message=message,
            db=db,
            phone_number=phone,
            language=payload.language,
        )
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(
            status_code=500,
            detail=f"Scam analysis failed: {exc}",
        ) from exc

    try:
        report = Report(
            type="scam",
            phone_number=phone,
            message_text=message,
            verdict=result["verdict"],
            confidence=float(result.get("confidence", 0)),
            red_flags=result.get("red_flags") or [],
            city=None,
        )
        db.add(report)
        db.commit()
        db.refresh(report)
    except Exception as exc:  # noqa: BLE001
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to save scam report: {exc}",
        ) from exc

    response: dict = {
        "verdict": result["verdict"],
        "confidence": result["confidence"],
        "red_flags": result.get("red_flags") or [],
        "advisory": result.get("advisory", ""),
        "report_id": report.id,
        "language": result.get("language", payload.language),
    }

    if result.get("high_risk_network"):
        response["high_risk_network"] = True
    if "linked_report_count" in result:
        response["linked_report_count"] = result["linked_report_count"]
    if result.get("phone_number"):
        response["phone_number"] = result["phone_number"]

    return response

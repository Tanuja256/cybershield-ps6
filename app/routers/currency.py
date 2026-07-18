import uuid
from pathlib import Path

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models import CurrencyCheck
from app.schemas.schemas import (
    CurrencyFeatureFlags,
    CurrencyVerifyResponse,
    ErrorResponse,
)
from app.services import currency_model

router = APIRouter(tags=["currency"])

UPLOAD_DIR = Path("uploads/currency")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

ALLOWED_CONTENT_TYPES = {
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/bmp",
}
ALLOWED_SUFFIXES = {".jpg", ".jpeg", ".png", ".webp", ".bmp"}


@router.post(
    "/currency-verify",
    response_model=CurrencyVerifyResponse,
    responses={400: {"model": ErrorResponse}, 422: {"model": ErrorResponse}},
)
async def currency_verify(
    image: UploadFile = File(..., description="Currency note image"),
    db: Session = Depends(get_db),
):
    if image is None:
        raise HTTPException(status_code=400, detail="Image file is required.")

    content_type = (image.content_type or "").lower()
    suffix = Path(image.filename or "").suffix.lower()

    type_ok = (not content_type) or content_type in ALLOWED_CONTENT_TYPES
    suffix_ok = (not suffix) or suffix in ALLOWED_SUFFIXES
    if not type_ok or not suffix_ok:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type. Upload a JPEG, PNG, WEBP, or BMP image.",
        )

    raw = await image.read()
    if not raw:
        raise HTTPException(status_code=400, detail="Empty image upload.")

    try:
        result = currency_model.analyze_currency(raw)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(
            status_code=500,
            detail=f"Currency analysis failed: {exc}",
        ) from exc

    save_suffix = suffix if suffix in ALLOWED_SUFFIXES else ".jpg"
    filename = f"{uuid.uuid4().hex}{save_suffix}"
    save_path = UPLOAD_DIR / filename
    try:
        save_path.write_bytes(raw)
    except OSError as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to store uploaded image: {exc}",
        ) from exc

    image_path = str(save_path).replace("\\", "/")

    try:
        record = CurrencyCheck(
            image_path=image_path,
            verdict=result["verdict"],
            confidence=float(result["confidence"]),
            features=result["features"],
        )
        db.add(record)
        db.commit()
        db.refresh(record)
    except Exception as exc:  # noqa: BLE001
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to save currency check: {exc}",
        ) from exc

    return {
        "verdict": result["verdict"],
        "confidence": result["confidence"],
        "features": CurrencyFeatureFlags(**result["features"]),
        "check_id": record.id,
        "image_path": image_path,
    }

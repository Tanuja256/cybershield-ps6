from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.schemas import ErrorResponse, GraphResponse
from app.services import graph_engine

router = APIRouter(tags=["graph"])


@router.get(
    "/graph",
    response_model=GraphResponse,
    responses={500: {"model": ErrorResponse}},
)
def get_graph(db: Session = Depends(get_db)):
    """Return scammer/location network as React Flow nodes + edges."""
    try:
        return graph_engine.get_graph_payload(db)
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(
            status_code=500,
            detail=f"Failed to build fraud graph: {exc}",
        ) from exc

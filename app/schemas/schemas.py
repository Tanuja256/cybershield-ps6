from datetime import datetime
from typing import Literal, Optional

from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    status: Literal["ok"]
    service: str = "CyberShield India"


class RootResponse(BaseModel):
    message: str
    status: str


class ErrorResponse(BaseModel):
    detail: str


class ScamCheckRequest(BaseModel):
    message: str = Field(..., min_length=1, description="Message text to classify")
    language: str = Field(default="en", min_length=2, max_length=16)
    phone_number: Optional[str] = Field(default=None, max_length=32)


class ScamCheckResponse(BaseModel):
    verdict: Literal["scam", "safe"]
    confidence: float
    red_flags: list[str]
    advisory: str
    high_risk_network: Optional[bool] = None
    linked_report_count: Optional[int] = None
    phone_number: Optional[str] = None
    language: Optional[str] = None
    report_id: int


class CurrencyFeatureFlags(BaseModel):
    watermark: bool
    security_thread: bool
    microprint: bool
    serial_pattern: bool
    color_shift: bool


class CurrencyVerifyResponse(BaseModel):
    verdict: Literal["genuine", "fake"]
    confidence: float
    features: CurrencyFeatureFlags
    check_id: int
    image_path: str


class ComplaintCreateRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    phone: str = Field(..., min_length=1, max_length=32)
    description: str = Field(..., min_length=1, max_length=10000)
    scam_report_id: Optional[int] = Field(default=None, ge=1)


class ComplaintCreateResponse(BaseModel):
    report_id: int
    pdf_path: str


class ComplaintFeedItem(BaseModel):
    id: int
    name: str
    phone: str
    description: str
    scam_report_id: Optional[int] = None
    pdf_path: str
    created_at: datetime

    model_config = {"from_attributes": True}


class GraphNode(BaseModel):
    id: str
    type: Literal["scammer", "location"]
    label: str


class GraphEdge(BaseModel):
    source: str
    target: str


class GraphResponse(BaseModel):
    nodes: list[GraphNode]
    edges: list[GraphEdge]

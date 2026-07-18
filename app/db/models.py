from datetime import datetime

from sqlalchemy import Column, Integer, String, Float, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship

from app.db.database import Base


class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String, nullable=False)  # "scam" or "currency"
    phone_number = Column(String, nullable=True)
    message_text = Column(Text, nullable=True)
    verdict = Column(String, nullable=False)
    confidence = Column(Float, nullable=False)
    red_flags = Column(JSON, nullable=True)
    city = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class ScammerEntity(Base):
    __tablename__ = "scammer_entities"

    id = Column(Integer, primary_key=True, index=True)
    phone_number = Column(String, unique=True, nullable=False, index=True)
    linked_report_count = Column(Integer, default=0, nullable=False)
    first_seen = Column(DateTime, nullable=False)
    last_seen = Column(DateTime, nullable=False)


class CurrencyCheck(Base):
    __tablename__ = "currency_checks"

    id = Column(Integer, primary_key=True, index=True)
    image_path = Column(String, nullable=False)
    verdict = Column(String, nullable=False)
    confidence = Column(Float, nullable=False)
    features = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


class CaseLink(Base):
    __tablename__ = "case_links"

    id = Column(Integer, primary_key=True, index=True)
    report_id_a = Column(Integer, ForeignKey("reports.id"), nullable=False)
    report_id_b = Column(Integer, ForeignKey("reports.id"), nullable=False)
    link_type = Column(String, nullable=False)

    report_a = relationship("Report", foreign_keys=[report_id_a])
    report_b = relationship("Report", foreign_keys=[report_id_b])


class ComplaintReport(Base):
    __tablename__ = "complaint_reports"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    scam_report_id = Column(Integer, ForeignKey("reports.id"), nullable=True)
    pdf_path = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    scam_report = relationship("Report", foreign_keys=[scam_report_id])

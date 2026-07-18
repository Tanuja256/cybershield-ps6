"""
Seed the database with realistic historical fraud reports.

Usage:
    python -m app.seed
"""

from __future__ import annotations

from datetime import datetime, timedelta

from app.db.database import SessionLocal, create_tables
from app.db.models import CaseLink, Report, ScammerEntity

# Three numbers that repeat across Mumbai / Pune / Nagpur to form a visible cluster.
CLUSTER_PHONES = (
    "9876501234",  # "CBI / digital arrest" ring
    "9123456780",  # fake customs / parcel scam ring
    "9988776655",  # ED / bank-freeze impersonation ring
)

CITIES = ("Mumbai", "Pune", "Nagpur")


def _days_ago(days: int, hours: int = 0) -> datetime:
    return datetime.utcnow() - timedelta(days=days, hours=hours)


def _seed_reports() -> list[dict]:
    """15 mixed scam/currency reports with a 3-phone multi-city cluster."""
    a, b, c = CLUSTER_PHONES

    return [
        # --- Cluster phone A across 3 cities ---
        {
            "type": "scam",
            "phone_number": a,
            "message_text": (
                "This is Additional Director Ramesh from CBI. A digital arrest warrant "
                "has been issued under IT Act. Keep this call secret and transfer "
                "₹2,40,000 to the escrow account immediately."
            ),
            "verdict": "scam",
            "confidence": 96.5,
            "red_flags": [
                "Authority Impersonation",
                "Legal Threat",
                "Urgency Pressure",
                "Secrecy Demand",
                "Payment Request",
            ],
            "city": "Mumbai",
            "created_at": _days_ago(14, 3),
        },
        {
            "type": "scam",
            "phone_number": a,
            "message_text": (
                "Your Aadhaar is linked to a drug trafficking case. Report to the nearest "
                "CBI cyber cell video room within 30 minutes or face arrest."
            ),
            "verdict": "scam",
            "confidence": 94.0,
            "red_flags": ["Authority Impersonation", "Legal Threat", "Urgency Pressure"],
            "city": "Pune",
            "created_at": _days_ago(11, 5),
        },
        {
            "type": "scam",
            "phone_number": a,
            "message_text": (
                "Court order already printed. Pay compounding fee via Google Pay to "
                "avoid handcuffing team dispatch from Nagpur HQ."
            ),
            "verdict": "scam",
            "confidence": 97.2,
            "red_flags": [
                "Authority Impersonation",
                "Legal Threat",
                "Payment Request",
                "Urgency Pressure",
            ],
            "city": "Nagpur",
            "created_at": _days_ago(8, 2),
        },
        # --- Cluster phone B across 3 cities ---
        {
            "type": "scam",
            "phone_number": b,
            "message_text": (
                "Customs Mumbai: a parcel in your name contains illegal items. Clearance "
                "fee ₹18,500 required today or FIR will be registered."
            ),
            "verdict": "scam",
            "confidence": 91.0,
            "red_flags": [
                "Authority Impersonation",
                "Payment Request",
                "Urgency Pressure",
            ],
            "city": "Mumbai",
            "created_at": _days_ago(13, 1),
        },
        {
            "type": "scam",
            "phone_number": b,
            "message_text": (
                "Directorate of Revenue Intelligence calling from Pune. Your KYC failed. "
                "Share OTP and deposit refundable security bond."
            ),
            "verdict": "scam",
            "confidence": 93.4,
            "red_flags": [
                "Authority Impersonation",
                "Secrecy Demand",
                "Payment Request",
            ],
            "city": "Pune",
            "created_at": _days_ago(9, 7),
        },
        {
            "type": "scam",
            "phone_number": b,
            "message_text": (
                "Nagpur airport customs: undeclared gold detected against your passport. "
                "Pay penalty now; do not inform family."
            ),
            "verdict": "scam",
            "confidence": 95.1,
            "red_flags": [
                "Authority Impersonation",
                "Legal Threat",
                "Secrecy Demand",
                "Payment Request",
            ],
            "city": "Nagpur",
            "created_at": _days_ago(6, 4),
        },
        # --- Cluster phone C across 3 cities ---
        {
            "type": "scam",
            "phone_number": c,
            "message_text": (
                "Enforcement Directorate Mumbai. Your bank account is under money-laundering "
                "watch. Transfer balance to 'safe account' we provide."
            ),
            "verdict": "scam",
            "confidence": 98.0,
            "red_flags": [
                "Authority Impersonation",
                "Payment Request",
                "Urgency Pressure",
            ],
            "city": "Mumbai",
            "created_at": _days_ago(12, 6),
        },
        {
            "type": "scam",
            "phone_number": c,
            "message_text": (
                "ED Pune desk: video conference with magistrate starts in 10 minutes. "
                "Install TeamViewer and keep phone unlocked."
            ),
            "verdict": "scam",
            "confidence": 96.8,
            "red_flags": [
                "Authority Impersonation",
                "Urgency Pressure",
                "Secrecy Demand",
            ],
            "city": "Pune",
            "created_at": _days_ago(7, 3),
        },
        {
            "type": "scam",
            "phone_number": c,
            "message_text": (
                "This is ED Nagpur. Do not disconnect. Freeze order lifted only after "
                "UPI payment of recovery charges."
            ),
            "verdict": "scam",
            "confidence": 97.5,
            "red_flags": [
                "Authority Impersonation",
                "Legal Threat",
                "Payment Request",
                "Urgency Pressure",
            ],
            "city": "Nagpur",
            "created_at": _days_ago(3, 1),
        },
        # --- One-off scam reports (non-cluster phones) ---
        {
            "type": "scam",
            "phone_number": "9012345678",
            "message_text": (
                "Amazon Pay reward of ₹50,000 selected for you. Click the link and pay "
                "₹99 processing fee."
            ),
            "verdict": "scam",
            "confidence": 88.0,
            "red_flags": ["Payment Request", "Urgency Pressure"],
            "city": "Mumbai",
            "created_at": _days_ago(10, 2),
        },
        {
            "type": "scam",
            "phone_number": "8899001122",
            "message_text": (
                "Your electricity connection will be cut in 2 hours. Pay pending bill "
                "via this QR only."
            ),
            "verdict": "scam",
            "confidence": 84.5,
            "red_flags": ["Urgency Pressure", "Payment Request"],
            "city": "Pune",
            "created_at": _days_ago(5, 8),
        },
        {
            "type": "scam",
            "phone_number": None,
            "message_text": (
                "Hi Mom, my phone fell in water. Send ₹15,000 to this number for a new SIM. "
                "Please don't call anyone."
            ),
            "verdict": "scam",
            "confidence": 79.0,
            "red_flags": ["Secrecy Demand", "Payment Request", "Urgency Pressure"],
            "city": "Nagpur",
            "created_at": _days_ago(4, 5),
        },
        # --- Currency verification reports ---
        {
            "type": "currency",
            "phone_number": None,
            "message_text": "Uploaded ₹500 note scan for authenticity check after street purchase.",
            "verdict": "genuine",
            "confidence": 82.0,
            "red_flags": [],
            "city": "Mumbai",
            "created_at": _days_ago(15, 0),
        },
        {
            "type": "currency",
            "phone_number": None,
            "message_text": "Suspicious ₹2000 note with blurry Ashoka pillar and uneven serial.",
            "verdict": "fake",
            "confidence": 91.3,
            "red_flags": ["Irregular serial pattern", "Poor microprint"],
            "city": "Pune",
            "created_at": _days_ago(2, 4),
        },
        {
            "type": "currency",
            "phone_number": None,
            "message_text": "₹100 note from market vendor — watermark and security thread verified.",
            "verdict": "genuine",
            "confidence": 76.5,
            "red_flags": [],
            "city": "Nagpur",
            "created_at": _days_ago(1, 2),
        },
    ]


def seed(*, reset: bool = True) -> None:
    create_tables()
    db = SessionLocal()
    try:
        if reset:
            # CaseLink references reports; clear first for a clean demo graph.
            db.query(CaseLink).delete()
            db.query(Report).delete()
            db.query(ScammerEntity).delete()
            db.commit()

        reports_data = _seed_reports()
        assert len(reports_data) == 15

        for row in reports_data:
            db.add(Report(**row))
        db.commit()

        # Upsert ScammerEntity counts from scam reports that include a phone.
        phone_events: dict[str, list[datetime]] = {}
        scam_with_phone = (
            db.query(Report)
            .filter(Report.type == "scam", Report.phone_number.isnot(None))
            .all()
        )
        for report in scam_with_phone:
            phone = report.phone_number.strip()
            phone_events.setdefault(phone, []).append(report.created_at)

        for phone, timestamps in phone_events.items():
            timestamps.sort()
            entity = (
                db.query(ScammerEntity)
                .filter(ScammerEntity.phone_number == phone)
                .first()
            )
            if entity:
                entity.linked_report_count = len(timestamps)
                entity.first_seen = timestamps[0]
                entity.last_seen = timestamps[-1]
            else:
                db.add(
                    ScammerEntity(
                        phone_number=phone,
                        linked_report_count=len(timestamps),
                        first_seen=timestamps[0],
                        last_seen=timestamps[-1],
                    )
                )
        db.commit()

        report_count = db.query(Report).count()
        entity_count = db.query(ScammerEntity).count()
        cluster_counts = {
            phone: db.query(Report)
            .filter(Report.phone_number == phone)
            .count()
            for phone in CLUSTER_PHONES
        }

        print(f"Seeded {report_count} reports and {entity_count} scammer entities.")
        print(f"Cluster phones across {', '.join(CITIES)}:")
        for phone, count in cluster_counts.items():
            entity = (
                db.query(ScammerEntity)
                .filter(ScammerEntity.phone_number == phone)
                .one()
            )
            print(
                f"  {phone}: {count} reports, "
                f"linked_report_count={entity.linked_report_count}"
            )
    finally:
        db.close()


if __name__ == "__main__":
    seed()

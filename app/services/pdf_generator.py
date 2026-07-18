"""Generate cybercrime complaint PDFs with reportlab."""

from __future__ import annotations

import uuid
from datetime import datetime
from pathlib import Path
from typing import Any

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch, mm
from reportlab.platypus import (
    HRFlowable,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

OUTPUT_DIR = Path("generated_pdfs")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def _styles() -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "ComplaintTitle",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=16,
            alignment=TA_CENTER,
            textColor=colors.HexColor("#0B3D2E"),
            spaceAfter=4,
        ),
        "subtitle": ParagraphStyle(
            "ComplaintSubtitle",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=10,
            alignment=TA_CENTER,
            textColor=colors.HexColor("#333333"),
            spaceAfter=12,
        ),
        "section": ParagraphStyle(
            "SectionHeader",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=11,
            textColor=colors.HexColor("#0B3D2E"),
            spaceBefore=10,
            spaceAfter=6,
        ),
        "body": ParagraphStyle(
            "BodyText",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=10,
            leading=14,
            alignment=TA_LEFT,
        ),
        "justify": ParagraphStyle(
            "JustifyText",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=10,
            leading=14,
            alignment=TA_JUSTIFY,
        ),
        "footer": ParagraphStyle(
            "Footer",
            parent=base["Normal"],
            fontName="Helvetica-Oblique",
            fontSize=8,
            textColor=colors.HexColor("#555555"),
            alignment=TA_CENTER,
        ),
        "label": ParagraphStyle(
            "Label",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9,
            textColor=colors.HexColor("#222222"),
        ),
        "value": ParagraphStyle(
            "Value",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=12,
        ),
    }


def generate_complaint_pdf(details: dict[str, Any]) -> str:
    """
    Build a formatted cybercrime complaint PDF.

    Expected keys: name, phone, description, date, linked_report_id (optional).
    Returns the relative filesystem path to the saved PDF.
    """
    name = str(details.get("name") or "N/A")
    phone = str(details.get("phone") or "N/A")
    description = str(details.get("description") or "")
    linked_id = details.get("linked_report_id")
    date_value = details.get("date") or datetime.utcnow()
    if isinstance(date_value, datetime):
        date_str = date_value.strftime("%d %B %Y, %H:%M UTC")
    else:
        date_str = str(date_value)

    filename = f"complaint_{uuid.uuid4().hex}.pdf"
    output_path = OUTPUT_DIR / filename

    styles = _styles()
    doc = SimpleDocTemplate(
        str(output_path),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=16 * mm,
        bottomMargin=16 * mm,
        title="Cybercrime Complaint Form",
        author="CyberShield India",
    )

    story: list[Any] = []
    story.append(Paragraph("CYBERSHIELD INDIA", styles["title"]))
    story.append(
        Paragraph(
            "National Cybercrime Complaint Form (Auto-Generated Draft)",
            styles["subtitle"],
        )
    )
    story.append(
        HRFlowable(
            width="100%",
            thickness=1.5,
            color=colors.HexColor("#0B3D2E"),
            spaceBefore=2,
            spaceAfter=10,
        )
    )

    story.append(
        Paragraph(
            "This document is a structured complaint draft for reporting suspected "
            "digital fraud / impersonation / financial cybercrime. Submit a copy to "
            "the National Cybercrime Reporting Portal (cybercrime.gov.in) or your "
            "local cyber police station.",
            styles["justify"],
        )
    )

    story.append(Paragraph("1. Complainant Details", styles["section"]))
    info_data = [
        [
            Paragraph("Full Name", styles["label"]),
            Paragraph(name, styles["value"]),
        ],
        [
            Paragraph("Contact Number", styles["label"]),
            Paragraph(phone, styles["value"]),
        ],
        [
            Paragraph("Date of Filing", styles["label"]),
            Paragraph(date_str, styles["value"]),
        ],
        [
            Paragraph("Linked Analysis Report ID", styles["label"]),
            Paragraph(
                str(linked_id) if linked_id is not None else "Not linked",
                styles["value"],
            ),
        ],
    ]
    info_table = Table(info_data, colWidths=[2.3 * inch, 4.2 * inch])
    info_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#E8F2EE")),
                ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("#0B3D2E")),
                ("INNERGRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#9BB8AD")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    story.append(info_table)

    story.append(Paragraph("2. Incident Description", styles["section"]))
    desc_table = Table(
        [[Paragraph(description.replace("\n", "<br/>") or "No description provided.", styles["value"])]],
        colWidths=[6.5 * inch],
    )
    desc_table.setStyle(
        TableStyle(
            [
                ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("#0B3D2E")),
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#FAFCFA")),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 10),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
            ]
        )
    )
    story.append(desc_table)

    story.append(Paragraph("3. Declaration", styles["section"]))
    story.append(
        Paragraph(
            "I hereby declare that the particulars furnished above are true to the best "
            "of my knowledge and belief. I understand that providing false information "
            "may attract action under applicable Indian law.",
            styles["justify"],
        )
    )
    story.append(Spacer(1, 18))
    story.append(Paragraph("Complainant Signature: ____________________", styles["body"]))
    story.append(Spacer(1, 8))
    story.append(Paragraph(f"Name: {name}", styles["body"]))
    story.append(Spacer(1, 20))
    story.append(
        HRFlowable(
            width="100%",
            thickness=0.8,
            color=colors.HexColor("#9BB8AD"),
            spaceBefore=4,
            spaceAfter=6,
        )
    )
    story.append(
        Paragraph(
            "Generated by CyberShield India • For assistance visit cybercrime.gov.in • Helpline 1930",
            styles["footer"],
        )
    )

    doc.build(story)
    return str(output_path).replace("\\", "/")

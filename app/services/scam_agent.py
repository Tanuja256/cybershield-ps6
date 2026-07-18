"""Agentic scam-detection flow using Gemini."""

from __future__ import annotations

import json
import re
from datetime import datetime
from typing import Any

import google.generativeai as genai
from sqlalchemy.orm import Session

from app.config import GEMINI_API_KEY
from app.db.models import ScammerEntity

SYSTEM_PROMPT = """You are a fraud-detection classifier for Indian digital-arrest and impersonation scams.
Focus on patterns such as: fake CBI/ED/Customs officers, urgency threats, payment demands,
secrecy demands, and authority impersonation.

Analyze the user message and return ONLY valid JSON with this exact shape (no markdown, no extra text):
{
  "verdict": "scam" or "safe",
  "confidence": 0-100,
  "red_flags": ["Authority Impersonation", "Legal Threat", "Urgency Pressure", "Secrecy Demand", "Payment Request"],
  "advisory": "short actionable advice string"
}

Only include red_flags that actually apply. confidence must be a number between 0 and 100.
"""

FALLBACK_RESPONSE: dict[str, Any] = {
    "verdict": "safe",
    "confidence": 0,
    "red_flags": [],
    "advisory": "Unable to analyze this message automatically. Do not share OTPs, make payments, or trust unsolicited authority claims. Verify independently or report to cybercrime.gov.in.",
}


def _extract_json(text: str) -> dict[str, Any]:
    """Parse JSON from model output, tolerating optional markdown fences."""
    cleaned = text.strip()
    fence = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", cleaned)
    if fence:
        cleaned = fence.group(1).strip()
    return json.loads(cleaned)


def _validate_result(data: dict[str, Any]) -> dict[str, Any]:
    verdict = str(data.get("verdict", "safe")).lower()
    if verdict not in ("scam", "safe"):
        verdict = "safe"

    try:
        confidence = float(data.get("confidence", 0))
    except (TypeError, ValueError):
        confidence = 0.0
    confidence = max(0.0, min(100.0, confidence))

    red_flags = data.get("red_flags") or []
    if not isinstance(red_flags, list):
        red_flags = []
    red_flags = [str(flag) for flag in red_flags]

    advisory = str(data.get("advisory") or FALLBACK_RESPONSE["advisory"])

    return {
        "verdict": verdict,
        "confidence": confidence,
        "red_flags": red_flags,
        "advisory": advisory,
    }


def _call_gemini(message: str) -> dict[str, Any]:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel(
        "gemini-2.5-flash",
        system_instruction=SYSTEM_PROMPT,
        generation_config={
            "response_mime_type": "application/json",
            "temperature": 0.2,
        },
    )
    response = model.generate_content(
        f"Classify this message for scam risk:\n\n{message}"
    )
    raw = getattr(response, "text", None) or ""
    return _validate_result(_extract_json(raw))


def _think(message: str) -> dict[str, Any]:
    """Step 1: Classify the message with Gemini; retry once on malformed JSON."""
    last_error: Exception | None = None
    for _ in range(2):
        try:
            return _call_gemini(message)
        except Exception as exc:  # noqa: BLE001 — never crash the agent
            last_error = exc
            continue
    return {
        **FALLBACK_RESPONSE,
        "error": f"gemini_fallback: {last_error}",
    }


def _act_and_observe(
    db: Session,
    phone_number: str | None,
    verdict: str,
) -> int | None:
    """Steps 2–3: Look up / upsert ScammerEntity when verdict is scam."""
    if verdict != "scam" or not phone_number:
        return None

    now = datetime.utcnow()
    entity = (
        db.query(ScammerEntity)
        .filter(ScammerEntity.phone_number == phone_number)
        .first()
    )

    if entity:
        entity.linked_report_count = (entity.linked_report_count or 0) + 1
        entity.last_seen = now
    else:
        entity = ScammerEntity(
            phone_number=phone_number,
            linked_report_count=1,
            first_seen=now,
            last_seen=now,
        )
        db.add(entity)

    db.commit()
    db.refresh(entity)
    return entity.linked_report_count


def run(
    message: str,
    db: Session,
    phone_number: str | None = None,
    language: str | None = None,
) -> dict[str, Any]:
    """
    Run the Think → Act → Observe → Decide scam-detection agent.

    Returns a dict with verdict, confidence, red_flags, advisory, and optionally
    high_risk_network / linked_report_count / phone_number.
    """
    # Step 1 — Think
    result = _think(message)

    # Steps 2–3 — Act & Observe
    linked_count = _act_and_observe(db, phone_number, result["verdict"])

    # Step 4 — Decide
    if linked_count is not None:
        result["phone_number"] = phone_number
        result["linked_report_count"] = linked_count
        if linked_count > 3:
            result["high_risk_network"] = True

    if language:
        result["language"] = language

    return result

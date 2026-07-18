"""Build a scammer–location network graph for React Flow."""

from __future__ import annotations

from typing import Any

import networkx as nx
from sqlalchemy.orm import Session

from app.db.models import Report, ScammerEntity


def _scammer_id(phone: str) -> str:
    return f"scammer:{phone}"


def _location_id(city: str) -> str:
    return f"location:{city.strip().lower()}"


def build_graph(db: Session) -> dict[str, list[dict[str, str]]]:
    """
    Build a NetworkX graph from ScammerEntity + Report rows.

    Nodes:
      - scammer phone numbers (type "scammer")
      - cities mentioned on reports (type "location")
    Edges:
      - scammer → location for each report that links that phone to a city
        (reports are the linkage source; React Flow nodes stay scammer/location)
    """
    graph = nx.Graph()

    entities = db.query(ScammerEntity).all()
    reports = db.query(Report).all()

    for entity in entities:
        phone = (entity.phone_number or "").strip()
        if not phone:
            continue
        node_id = _scammer_id(phone)
        graph.add_node(
            node_id,
            type="scammer",
            label=phone,
        )

    for report in reports:
        phone = (report.phone_number or "").strip()
        city = (report.city or "").strip()

        if phone:
            node_id = _scammer_id(phone)
            if node_id not in graph:
                graph.add_node(node_id, type="scammer", label=phone)

        if city:
            loc_id = _location_id(city)
            if loc_id not in graph:
                graph.add_node(loc_id, type="location", label=city)

        # Edge: scammer ↔ location via this linked report
        if phone and city:
            graph.add_edge(_scammer_id(phone), _location_id(city), report_id=report.id)

        # If a report has a phone but no city, still reflect the report link
        # by ensuring the scammer node exists (already added above).

    nodes = [
        {
            "id": node_id,
            "type": data.get("type", "scammer"),
            "label": data.get("label", node_id),
        }
        for node_id, data in graph.nodes(data=True)
    ]

    edges = [
        {"source": source, "target": target}
        for source, target in graph.edges()
    ]

    return {"nodes": nodes, "edges": edges}


def get_graph_payload(db: Session) -> dict[str, Any]:
    """Public helper used by the /graph API route."""
    return build_graph(db)

"""
page_inventory_loader.py — Load page inventory for keyword-to-page mapping.

Reads page_inventory_v1.json and provides route lookup helpers.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Optional

SEO_OPS_ROOT = Path(__file__).resolve().parents[2]
INVENTORY_JSON = SEO_OPS_ROOT / "snapshots" / "normalized" / "pages" / "page_inventory_v1.json"


def load_page_inventory() -> list[dict]:
    """Load page inventory from JSON. Returns list of page dicts."""
    if not INVENTORY_JSON.exists():
        print(f"  WARNING: page inventory not found at {INVENTORY_JSON}")
        return []
    data = json.loads(INVENTORY_JSON.read_text(encoding="utf-8"))
    return data.get("pages", [])


def get_indexable_routes(pages: list[dict] = None) -> list[dict]:
    """Return only indexable pages with their key fields."""
    if pages is None:
        pages = load_page_inventory()
    return [
        p for p in pages
        if p.get("is_indexable_guess", True)
    ]


def build_route_index(pages: list[dict] = None) -> dict[str, dict]:
    """Build route_path -> page dict lookup."""
    if pages is None:
        pages = load_page_inventory()
    return {p["route_path"]: p for p in pages}

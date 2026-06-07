"""
query_snapshot_loader.py — Load normalized GSC snapshot artifacts for merge.

Reads pre-built CSVs from snapshots/normalized/seo/ and returns
dicts keyed by normalized_query.
"""

from __future__ import annotations

import csv
from pathlib import Path

SEO_OPS_ROOT = Path(__file__).resolve().parents[2]
NORM_SEO_DIR = SEO_OPS_ROOT / "snapshots" / "normalized" / "seo"

AGG_QUERIES_CSV = NORM_SEO_DIR / "gsc_query_page_aggregated_queries_last90d.csv"
ROW_LEVEL_CSV = NORM_SEO_DIR / "gsc_query_page_last90d.csv"


def _safe_int(val: str, default: int = 0) -> int:
    try:
        return int(float(val)) if val else default
    except (ValueError, TypeError):
        return default


def _safe_float(val: str, default: float = 0.0) -> float:
    try:
        return float(val) if val else default
    except (ValueError, TypeError):
        return default


def _read_csv(path: Path) -> list[dict]:
    if not path.exists():
        print(f"  WARNING: missing {path}")
        return []
    with open(path, encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


def load_gsc_aggregated_queries() -> dict[str, dict]:
    """Load GSC aggregated query data keyed by normalized_query."""
    rows = _read_csv(AGG_QUERIES_CSV)
    result = {}
    for row in rows:
        nq = row.get("normalized_query", "").strip()
        if not nq:
            continue
        result[nq] = {
            "query_raw": row.get("query", ""),
            "gsc_total_clicks": _safe_int(row.get("total_clicks")),
            "gsc_total_impressions": _safe_int(row.get("total_impressions")),
            "gsc_weighted_ctr": _safe_float(row.get("weighted_ctr")),
            "gsc_best_position_guess": _safe_float(row.get("best_position_guess")),
            "gsc_distinct_pages_count": _safe_int(row.get("distinct_pages_count")),
            "gsc_possible_cannibalization_guess": row.get("possible_cannibalization_guess", "").lower() == "true",
            "gsc_query_intent_guess": row.get("query_intent_guess", ""),
            "gsc_query_theme_guess": row.get("query_theme_guess", ""),
        }
    return result


def load_gsc_row_level() -> list[dict]:
    """Load GSC row-level query+page data."""
    return _read_csv(ROW_LEVEL_CSV)


def compute_top_page_per_query(row_level: list[dict] = None) -> dict[str, dict]:
    """
    For each normalized_query, find the page with most clicks (tiebreak: impressions).
    Returns {normalized_query: {page, clicks, impressions, route_guess, page_type_guess}}.
    """
    if row_level is None:
        row_level = load_gsc_row_level()

    best: dict[str, dict] = {}
    for row in row_level:
        nq = row.get("normalized_query", "").strip()
        if not nq:
            continue
        clicks = _safe_int(row.get("clicks"))
        impressions = _safe_int(row.get("impressions"))
        page = row.get("page", "")
        route = row.get("mapped_route_guess", "")
        page_type = row.get("mapped_page_type_guess", "")

        if nq not in best:
            best[nq] = {
                "gsc_top_page_guess": page,
                "gsc_top_page_clicks": clicks,
                "gsc_top_page_impressions": impressions,
                "gsc_top_page_route_guess": route,
                "gsc_top_page_type_guess": page_type,
            }
        else:
            existing = best[nq]
            if (clicks, impressions) > (existing["gsc_top_page_clicks"], existing["gsc_top_page_impressions"]):
                best[nq] = {
                    "gsc_top_page_guess": page,
                    "gsc_top_page_clicks": clicks,
                    "gsc_top_page_impressions": impressions,
                    "gsc_top_page_route_guess": route,
                    "gsc_top_page_type_guess": page_type,
                }
    return best

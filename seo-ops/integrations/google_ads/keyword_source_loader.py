"""
keyword_source_loader.py — Load and normalize keyword-related CSVs from Google Ads outputs.

Reads CSV files from D:\\projects\\bmklus\\google\\outputs\\ and returns
normalized dicts keyed by normalized_keyword.

Each loader returns: dict[str, dict]  (normalized_keyword -> source fields)
"""

from __future__ import annotations

import csv
import re
from pathlib import Path
from typing import Optional

# External Google Ads outputs directory
GOOGLE_OUTPUTS = Path("D:/projects/bmklus/google/outputs")


def normalize_keyword(raw: str) -> str:
    """Conservative normalization: lowercase, trim, collapse whitespace."""
    s = raw.strip().lower()
    s = re.sub(r'\s+', ' ', s)
    return s


def _safe_float(val: str, default: float = 0.0) -> float:
    try:
        return float(val) if val else default
    except (ValueError, TypeError):
        return default


def _safe_int(val: str, default: int = 0) -> int:
    try:
        return int(float(val)) if val else default
    except (ValueError, TypeError):
        return default


def _read_csv(path: Path) -> list[dict]:
    """Read CSV into list of dicts. Returns empty list if file missing."""
    if not path.exists():
        print(f"  WARNING: missing {path}")
        return []
    with open(path, encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


# ── Planner: keyword ideas ──────────────────────────────────────────────────

def load_planner_ideas(
    filename: str = "keyword_ideas_nl_gevelisolatie.csv",
) -> dict[str, dict]:
    """Load keyword planner ideas CSV."""
    rows = _read_csv(GOOGLE_OUTPUTS / filename)
    result = {}
    for row in rows:
        raw = row.get("keyword", "")
        if not raw:
            continue
        nk = normalize_keyword(raw)
        result[nk] = {
            "keyword_text_raw": raw,
            "planner_avg_monthly_searches": _safe_int(row.get("avg_monthly_searches")),
            "planner_competition": row.get("competition", ""),
            "planner_competition_index": _safe_int(row.get("competition_index")),
            "planner_low_bid_eur": _safe_float(row.get("low_bid_eur")),
            "planner_high_bid_eur": _safe_float(row.get("high_bid_eur")),
        }
    return result


# ── Planner: historical metrics ─────────────────────────────────────────────

def load_historical_metrics(
    filename: str = "keyword_historical_metrics_nl_gevelisolatie.csv",
) -> dict[str, dict]:
    """Load keyword historical metrics CSV."""
    rows = _read_csv(GOOGLE_OUTPUTS / filename)
    result = {}
    for row in rows:
        raw = row.get("keyword", "")
        if not raw:
            continue
        nk = normalize_keyword(raw)
        result[nk] = {
            "keyword_text_raw": raw,
            "historical_avg_monthly_searches": _safe_int(row.get("avg_monthly_searches")),
            "historical_competition": row.get("competition", ""),
            "historical_competition_index": _safe_int(row.get("competition_index")),
            "historical_low_bid_eur": _safe_float(row.get("low_bid_eur")),
            "historical_high_bid_eur": _safe_float(row.get("high_bid_eur")),
            "historical_intent_score": _safe_float(row.get("intent_score")),
        }
    return result


# ── Ads: keyword performance ────────────────────────────────────────────────

def load_ads_keywords(
    filename: str = "keywords_23271040037_last30d.csv",
) -> dict[str, dict]:
    """Load ads keyword performance CSV. Multiple rows per keyword (different match types)."""
    rows = _read_csv(GOOGLE_OUTPUTS / filename)
    result: dict[str, dict] = {}
    for row in rows:
        raw = row.get("keyword", "")
        if not raw:
            continue
        nk = normalize_keyword(raw)

        impressions = _safe_int(row.get("impressions"))
        clicks = _safe_int(row.get("clicks"))
        cost_eur = _safe_float(row.get("cost_eur"))
        conversions = _safe_float(row.get("conversions"))
        match_type = row.get("match_type", "")
        ad_group = row.get("ad_group_name", "")
        status = row.get("status", "")
        is_negative = row.get("negative", "").lower() == "true"

        if nk in result:
            # Aggregate across match types
            existing = result[nk]
            existing["ads_keyword_impressions"] += impressions
            existing["ads_keyword_clicks"] += clicks
            existing["ads_keyword_cost_eur"] += cost_eur
            existing["ads_keyword_conversions"] += conversions
            if match_type and match_type not in existing["ads_keyword_match_types"]:
                existing["ads_keyword_match_types"] += f",{match_type}"
            if ad_group and ad_group not in existing["ads_keyword_ad_groups"]:
                existing["ads_keyword_ad_groups"] += f",{ad_group}"
            if status and status not in existing["ads_keyword_statuses"]:
                existing["ads_keyword_statuses"] += f",{status}"
            if is_negative:
                existing["_is_negative"] = True
        else:
            result[nk] = {
                "keyword_text_raw": raw,
                "ads_keyword_impressions": impressions,
                "ads_keyword_clicks": clicks,
                "ads_keyword_cost_eur": cost_eur,
                "ads_keyword_conversions": conversions,
                "ads_keyword_match_types": match_type,
                "ads_keyword_ad_groups": ad_group,
                "ads_keyword_statuses": status,
                "_is_negative": is_negative,
            }
    return result


# ── Ads: search terms ───────────────────────────────────────────────────────

def load_ads_search_terms(
    filename: str = "search_terms_23271040037_last30d.csv",
) -> dict[str, dict]:
    """Load ads search term report CSV. Multiple rows per term (different ad groups)."""
    rows = _read_csv(GOOGLE_OUTPUTS / filename)
    result: dict[str, dict] = {}
    for row in rows:
        raw = row.get("search_term", "")
        if not raw:
            continue
        nk = normalize_keyword(raw)

        impressions = _safe_int(row.get("impressions"))
        clicks = _safe_int(row.get("clicks"))
        cost_eur = _safe_float(row.get("cost_eur"))
        conversions = _safe_float(row.get("conversions"))
        ad_group = row.get("ad_group_name", "")

        if nk in result:
            existing = result[nk]
            existing["ads_search_term_impressions"] += impressions
            existing["ads_search_term_clicks"] += clicks
            existing["ads_search_term_cost_eur"] += cost_eur
            existing["ads_search_term_conversions"] += conversions
            if ad_group and ad_group not in existing["ads_search_term_ad_groups"]:
                existing["ads_search_term_ad_groups"] += f",{ad_group}"
        else:
            result[nk] = {
                "keyword_text_raw": raw,
                "ads_search_term_impressions": impressions,
                "ads_search_term_clicks": clicks,
                "ads_search_term_cost_eur": cost_eur,
                "ads_search_term_conversions": conversions,
                "ads_search_term_ad_groups": ad_group,
            }
    return result


# ── Action candidates ───────────────────────────────────────────────────────

def load_action_candidates(
    filename: str = "campaign_23271040037_action_candidates_last30d.csv",
) -> dict[str, dict]:
    """Load action candidates / decision pack CSV."""
    rows = _read_csv(GOOGLE_OUTPUTS / filename)
    result = {}
    for row in rows:
        raw = row.get("keyword", "")
        if not raw:
            continue
        nk = normalize_keyword(raw)
        result[nk] = {
            "keyword_text_raw": raw,
            "action_candidate_decision": row.get("decision", ""),
            "action_candidate_reason": row.get("reason", ""),
            "action_candidate_theme": row.get("theme", ""),
        }
    return result

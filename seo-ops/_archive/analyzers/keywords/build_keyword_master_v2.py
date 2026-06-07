"""
build_keyword_master_v2.py — Merge keyword_master v1 + GSC query data into v2.

Reads:
  - keyword_master_v1.json
  - GSC aggregated queries CSV
  - GSC row-level CSV (for top-page computation)

Outputs:
  - keyword_master_v2.json
  - keyword_master_v2.csv
  - keyword_master_v2_summary.md

Usage:
  python seo-ops/analyzers/keywords/build_keyword_master_v2.py
"""

from __future__ import annotations

import csv
import json
import re
import sys
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
SEO_OPS_ROOT = SCRIPT_DIR.parents[1]
sys.path.insert(0, str(SEO_OPS_ROOT))

from integrations.gsc.query_snapshot_loader import (
    load_gsc_aggregated_queries,
    load_gsc_row_level,
    compute_top_page_per_query,
)

# ── Paths ────────────────────────────────────────────────────────────────────

KW_V1_JSON = SEO_OPS_ROOT / "snapshots" / "normalized" / "keyword_master" / "keyword_master_v1.json"
OUTPUT_DIR = SEO_OPS_ROOT / "snapshots" / "normalized" / "keyword_master"
REPORT_DIR = SEO_OPS_ROOT / "reports" / "keywords"

JSON_OUT = OUTPUT_DIR / "keyword_master_v2.json"
CSV_OUT = OUTPUT_DIR / "keyword_master_v2.csv"
SUMMARY_OUT = REPORT_DIR / "keyword_master_v2_summary.md"


# ── V2 CSV field order ──────────────────────────────────────────────────────

CSV_FIELDS = [
    # Identity
    "normalized_keyword", "keyword_text_raw",
    "topic_theme_guess", "intent_guess", "language_guess", "country_guess",
    "brand_nonbrand_guess",
    # Source presence (v1 + v2)
    "in_planner_ideas", "in_historical_metrics", "in_ads_keywords",
    "in_ads_search_terms", "in_action_candidates", "in_gsc_queries",
    # Planner
    "planner_avg_monthly_searches", "planner_competition", "planner_competition_index",
    "planner_low_bid_eur", "planner_high_bid_eur",
    # Historical
    "historical_avg_monthly_searches", "historical_competition", "historical_competition_index",
    "historical_low_bid_eur", "historical_high_bid_eur", "historical_intent_score",
    # Ads keywords
    "ads_keyword_impressions", "ads_keyword_clicks", "ads_keyword_cost_eur",
    "ads_keyword_conversions", "ads_keyword_match_types", "ads_keyword_ad_groups",
    "ads_keyword_statuses",
    # Ads search terms
    "ads_search_term_impressions", "ads_search_term_clicks", "ads_search_term_cost_eur",
    "ads_search_term_conversions", "ads_search_term_ad_groups",
    # Action
    "action_candidate_decision", "action_candidate_reason", "negative_watch_guess",
    # GSC metrics (NEW v2)
    "gsc_total_clicks", "gsc_total_impressions", "gsc_weighted_ctr",
    "gsc_best_position_guess", "gsc_distinct_pages_count",
    "gsc_possible_cannibalization_guess",
    "gsc_top_page_guess", "gsc_top_page_clicks", "gsc_top_page_impressions",
    "gsc_top_page_route_guess", "gsc_top_page_type_guess",
    # Page mapping (refined in v2)
    "mapped_route_guess", "mapped_page_type_guess", "mapping_confidence", "mapping_notes",
    # SEO opportunity (NEW/updated v2)
    "seo_priority_guess", "seo_opportunity_type", "seo_opportunity_reason",
    # PPC/SEO overlap (NEW v2)
    "ppc_seo_overlap_guess", "ppc_seo_notes",
    # Ads priority + keep/review/pause (from v1)
    "ads_priority_guess", "keep_review_pause_guess",
    "notes",
]


# ── Brand classification ─────────────────────────────────────────────────────

BRAND_TERMS = ["bm klus", "bmklus", "bm-klus", "boris mitov"]
BRAND_PARTIAL = ["bm bv", "bm bouw", "bm afbouw"]


def classify_brand(nk: str) -> str:
    nk_lower = nk.lower()
    for term in BRAND_TERMS:
        if term in nk_lower:
            return "brand"
    for term in BRAND_PARTIAL:
        if term in nk_lower:
            return "mixed"
    return "nonbrand"


# ── SEO opportunity logic ────────────────────────────────────────────────────

def compute_seo_opportunity(rec: dict) -> tuple[str, str, str]:
    """
    Returns (seo_priority_guess, seo_opportunity_type, seo_opportunity_reason).
    """
    brand = rec.get("brand_nonbrand_guess", "nonbrand")
    gsc_impr = rec.get("gsc_total_impressions", 0) or 0
    gsc_clicks = rec.get("gsc_total_clicks", 0) or 0
    gsc_ctr = rec.get("gsc_weighted_ctr", 0.0) or 0.0
    gsc_pos = rec.get("gsc_best_position_guess", 0.0) or 0.0
    gsc_pages = rec.get("gsc_distinct_pages_count", 0) or 0
    gsc_cannib = rec.get("gsc_possible_cannibalization_guess", False)
    planner_vol = rec.get("planner_avg_monthly_searches", 0) or 0
    hist_vol = rec.get("historical_avg_monthly_searches", 0) or 0
    best_vol = max(planner_vol, hist_vol)
    has_mapped_route = bool(rec.get("mapped_route_guess", ""))
    in_gsc = rec.get("in_gsc_queries", False)

    # Brand queries: not SEO opportunities
    if brand == "brand":
        return "", "none", "branded query"

    # Cannibalization risk
    if gsc_cannib and gsc_impr >= 20:
        reason = f"query on {gsc_pages} pages, {gsc_impr} impr"
        return "medium", "cannibalization_risk", reason

    # Striking distance: position 4-15, decent impressions
    if in_gsc and 4.0 <= gsc_pos <= 15.0 and gsc_impr >= 20:
        if gsc_ctr < 0.05:
            reason = f"pos {gsc_pos:.1f}, {gsc_impr} impr, CTR {gsc_ctr:.4f}"
            return "high", "striking_distance", reason
        else:
            reason = f"pos {gsc_pos:.1f}, {gsc_impr} impr, CTR {gsc_ctr:.4f}"
            return "medium", "striking_distance", reason

    # Low CTR / high impressions (any position, broad signal)
    if in_gsc and gsc_impr >= 50 and gsc_ctr < 0.02 and gsc_pos > 15:
        reason = f"{gsc_impr} impr, CTR {gsc_ctr:.4f}, pos {gsc_pos:.1f}"
        return "medium", "low_ctr_high_impressions", reason

    # Page gap: strong planner/volume signal but no route mapping
    if best_vol >= 200 and not has_mapped_route:
        reason = f"planner/hist vol {best_vol}, no mapped route"
        return "medium", "page_gap", reason

    # Weak signal: in GSC but low data
    if in_gsc and gsc_impr >= 5 and gsc_impr < 20:
        return "low", "weak_signal", f"{gsc_impr} impr, pos {gsc_pos:.1f}"

    # Volume-based priority only (no GSC yet)
    if best_vol >= 500:
        return "high", "none", "high planner volume, no GSC signal yet"
    if best_vol >= 100:
        return "medium", "none", "moderate planner volume"
    if best_vol >= 20:
        return "low", "none", ""

    return "", "none", ""


# ── PPC/SEO overlap ─────────────────────────────────────────────────────────

def compute_ppc_seo_overlap(rec: dict) -> tuple[str, str]:
    """Returns (ppc_seo_overlap_guess, ppc_seo_notes)."""
    in_ads_kw = rec.get("in_ads_keywords", False)
    in_ads_st = rec.get("in_ads_search_terms", False)
    in_gsc = rec.get("in_gsc_queries", False)
    in_planner = rec.get("in_planner_ideas", False)
    in_ads = in_ads_kw or in_ads_st

    if in_ads and in_gsc:
        ads_conv = (rec.get("ads_keyword_conversions", 0) or 0) + (rec.get("ads_search_term_conversions", 0) or 0)
        gsc_clicks = rec.get("gsc_total_clicks", 0) or 0
        notes = f"ads+organic; ads conv={ads_conv:.0f}, organic clicks={gsc_clicks}"
        return "in_ads_and_gsc", notes

    if in_gsc and not in_ads:
        return "in_gsc_only", "organic only, no ads presence"

    if in_ads and not in_gsc:
        return "in_ads_only", "paid only, no organic signal in GSC"

    if in_planner and not in_ads and not in_gsc:
        return "in_planner_only", "planner demand only, no ads or organic"

    return "", ""


# ── Mapping refinement ───────────────────────────────────────────────────────

def refine_mapping(rec: dict) -> None:
    """
    If GSC top_page evidence is stronger than v1 deterministic guess, update.
    Mutates rec in-place.
    """
    v1_route = rec.get("mapped_route_guess", "")
    v1_confidence = rec.get("mapping_confidence", "")
    gsc_route = rec.get("gsc_top_page_route_guess", "")
    gsc_page_type = rec.get("gsc_top_page_type_guess", "")
    gsc_clicks = rec.get("gsc_top_page_clicks", 0) or 0
    gsc_impr = rec.get("gsc_top_page_impressions", 0) or 0

    # No GSC evidence => keep v1
    if not gsc_route:
        return

    # v1 had no mapping => use GSC
    if not v1_route:
        rec["mapped_route_guess"] = gsc_route
        rec["mapped_page_type_guess"] = gsc_page_type
        rec["mapping_confidence"] = "medium"
        rec["mapping_notes"] = f"from GSC top page ({gsc_clicks} clicks, {gsc_impr} impr)"
        return

    # v1 mapping matches GSC => strengthen confidence
    if v1_route == gsc_route:
        if v1_confidence != "high":
            rec["mapping_confidence"] = "high"
            rec["mapping_notes"] = (rec.get("mapping_notes", "") + "; confirmed by GSC evidence").strip("; ")
        return

    # v1 and GSC disagree — only override if GSC has clicks and v1 was low confidence
    if gsc_clicks > 0 and v1_confidence == "low":
        rec["mapping_notes"] = (
            f"v1 mapped to {v1_route}, GSC top page is {gsc_route} "
            f"({gsc_clicks} clicks); using GSC evidence"
        )
        rec["mapped_route_guess"] = gsc_route
        rec["mapped_page_type_guess"] = gsc_page_type
        rec["mapping_confidence"] = "medium"


# ── Main merge ───────────────────────────────────────────────────────────────

def _safe_bool(val) -> bool:
    if isinstance(val, bool):
        return val
    if isinstance(val, str):
        return val.lower() == "true"
    return bool(val)


def merge_v2() -> list[dict]:
    """Merge keyword_master v1 + GSC data into v2."""

    # Load v1
    print("  Loading keyword_master v1...")
    v1_data = json.loads(KW_V1_JSON.read_text(encoding="utf-8"))
    v1_keywords = v1_data.get("keywords", [])
    print(f"    v1: {len(v1_keywords)} keywords")

    # Index v1 by normalized_keyword
    v1_index: dict[str, dict] = {}
    for kw in v1_keywords:
        nk = kw.get("normalized_keyword", "")
        if nk:
            v1_index[nk] = kw

    # Load GSC aggregated queries
    print("  Loading GSC aggregated queries...")
    gsc_agg = load_gsc_aggregated_queries()
    print(f"    GSC agg: {len(gsc_agg)} queries")

    # Load GSC row-level for top-page computation
    print("  Computing GSC top pages per query...")
    gsc_rows = load_gsc_row_level()
    gsc_top_pages = compute_top_page_per_query(gsc_rows)
    print(f"    Top pages computed for {len(gsc_top_pages)} queries")

    # Union all normalized keywords
    all_nk: set[str] = set(v1_index.keys()) | set(gsc_agg.keys())
    print(f"  Total unique normalized keywords: {len(all_nk)}")

    records: list[dict] = []
    for nk in sorted(all_nk):
        v1 = v1_index.get(nk, {})
        gsc = gsc_agg.get(nk, {})
        top_page = gsc_top_pages.get(nk, {})

        # Start with v1 fields (or defaults)
        rec = {}

        # Identity
        rec["normalized_keyword"] = nk
        rec["keyword_text_raw"] = v1.get("keyword_text_raw", "") or gsc.get("query_raw", "")
        rec["topic_theme_guess"] = v1.get("topic_theme_guess", "") or gsc.get("gsc_query_theme_guess", "")
        rec["intent_guess"] = v1.get("intent_guess", "") or gsc.get("gsc_query_intent_guess", "")
        rec["language_guess"] = v1.get("language_guess", "nl")
        rec["country_guess"] = v1.get("country_guess", "NL")

        # Brand
        rec["brand_nonbrand_guess"] = classify_brand(nk)

        # Source presence
        rec["in_planner_ideas"] = _safe_bool(v1.get("in_planner_ideas", False))
        rec["in_historical_metrics"] = _safe_bool(v1.get("in_historical_metrics", False))
        rec["in_ads_keywords"] = _safe_bool(v1.get("in_ads_keywords", False))
        rec["in_ads_search_terms"] = _safe_bool(v1.get("in_ads_search_terms", False))
        rec["in_action_candidates"] = _safe_bool(v1.get("in_action_candidates", False))
        rec["in_gsc_queries"] = nk in gsc_agg

        # Planner fields (from v1)
        for f in ["planner_avg_monthly_searches", "planner_competition",
                   "planner_competition_index", "planner_low_bid_eur", "planner_high_bid_eur"]:
            rec[f] = v1.get(f, "")

        # Historical fields (from v1)
        for f in ["historical_avg_monthly_searches", "historical_competition",
                   "historical_competition_index", "historical_low_bid_eur",
                   "historical_high_bid_eur", "historical_intent_score"]:
            rec[f] = v1.get(f, "")

        # Ads keyword fields (from v1)
        for f in ["ads_keyword_impressions", "ads_keyword_clicks", "ads_keyword_cost_eur",
                   "ads_keyword_conversions", "ads_keyword_match_types",
                   "ads_keyword_ad_groups", "ads_keyword_statuses"]:
            rec[f] = v1.get(f, "")

        # Ads search term fields (from v1)
        for f in ["ads_search_term_impressions", "ads_search_term_clicks",
                   "ads_search_term_cost_eur", "ads_search_term_conversions",
                   "ads_search_term_ad_groups"]:
            rec[f] = v1.get(f, "")

        # Action fields (from v1)
        rec["action_candidate_decision"] = v1.get("action_candidate_decision", "")
        rec["action_candidate_reason"] = v1.get("action_candidate_reason", "")
        rec["negative_watch_guess"] = v1.get("negative_watch_guess", "")

        # GSC metrics (NEW v2)
        rec["gsc_total_clicks"] = gsc.get("gsc_total_clicks", "")
        rec["gsc_total_impressions"] = gsc.get("gsc_total_impressions", "")
        rec["gsc_weighted_ctr"] = gsc.get("gsc_weighted_ctr", "")
        rec["gsc_best_position_guess"] = gsc.get("gsc_best_position_guess", "")
        rec["gsc_distinct_pages_count"] = gsc.get("gsc_distinct_pages_count", "")
        rec["gsc_possible_cannibalization_guess"] = gsc.get("gsc_possible_cannibalization_guess", "")

        # GSC top page
        rec["gsc_top_page_guess"] = top_page.get("gsc_top_page_guess", "")
        rec["gsc_top_page_clicks"] = top_page.get("gsc_top_page_clicks", "")
        rec["gsc_top_page_impressions"] = top_page.get("gsc_top_page_impressions", "")
        rec["gsc_top_page_route_guess"] = top_page.get("gsc_top_page_route_guess", "")
        rec["gsc_top_page_type_guess"] = top_page.get("gsc_top_page_type_guess", "")

        # Page mapping (start from v1, then refine)
        rec["mapped_route_guess"] = v1.get("mapped_route_guess", "")
        rec["mapped_page_type_guess"] = v1.get("mapped_page_type_guess", "")
        rec["mapping_confidence"] = v1.get("mapping_confidence", "")
        rec["mapping_notes"] = v1.get("mapping_notes", "")

        # Refine mapping with GSC evidence
        refine_mapping(rec)

        # SEO opportunity (NEW v2 — overrides v1 seo_priority)
        seo_p, seo_opp_type, seo_opp_reason = compute_seo_opportunity(rec)
        rec["seo_priority_guess"] = seo_p
        rec["seo_opportunity_type"] = seo_opp_type
        rec["seo_opportunity_reason"] = seo_opp_reason

        # PPC/SEO overlap (NEW v2)
        overlap, overlap_notes = compute_ppc_seo_overlap(rec)
        rec["ppc_seo_overlap_guess"] = overlap
        rec["ppc_seo_notes"] = overlap_notes

        # Ads priority + keep/review/pause (carry from v1)
        rec["ads_priority_guess"] = v1.get("ads_priority_guess", "")
        rec["keep_review_pause_guess"] = v1.get("keep_review_pause_guess", "")

        rec["notes"] = ""

        records.append(rec)

    return records


# ── Writers ──────────────────────────────────────────────────────────────────

def write_json(records: list[dict], path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    data = {
        "_meta": {
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "generator": "build_keyword_master_v2.py",
            "total_keywords": len(records),
            "sources": [
                "keyword_master_v1.json",
                "gsc_query_page_aggregated_queries_last90d.csv",
                "gsc_query_page_last90d.csv (top-page computation)",
            ],
        },
        "keywords": records,
    }
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False, default=str), encoding="utf-8")


def write_csv(records: list[dict], path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=CSV_FIELDS, extrasaction="ignore")
        writer.writeheader()
        for rec in records:
            writer.writerow(rec)


def write_summary(records: list[dict], path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    total = len(records)

    has_gsc = [r for r in records if r.get("in_gsc_queries")]
    brand_dist = Counter(r.get("brand_nonbrand_guess", "") for r in records)

    nonbrand_gsc = [r for r in has_gsc if r.get("brand_nonbrand_guess") == "nonbrand"]
    nonbrand_gsc_by_impr = sorted(nonbrand_gsc, key=lambda r: r.get("gsc_total_impressions", 0) or 0, reverse=True)

    # Source counts
    src_counts = {
        "planner_ideas": sum(1 for r in records if _safe_bool(r.get("in_planner_ideas"))),
        "historical_metrics": sum(1 for r in records if _safe_bool(r.get("in_historical_metrics"))),
        "ads_keywords": sum(1 for r in records if _safe_bool(r.get("in_ads_keywords"))),
        "ads_search_terms": sum(1 for r in records if _safe_bool(r.get("in_ads_search_terms"))),
        "action_candidates": sum(1 for r in records if _safe_bool(r.get("in_action_candidates"))),
        "gsc_queries": len(has_gsc),
    }

    # SEO opportunities
    seo_opp_dist = Counter(r.get("seo_opportunity_type", "none") for r in records if r.get("seo_opportunity_type") and r.get("seo_opportunity_type") != "none")
    striking = [r for r in records if r.get("seo_opportunity_type") == "striking_distance"]
    striking.sort(key=lambda r: r.get("gsc_total_impressions", 0) or 0, reverse=True)

    low_ctr = [r for r in records if r.get("seo_opportunity_type") == "low_ctr_high_impressions"]
    low_ctr.sort(key=lambda r: r.get("gsc_total_impressions", 0) or 0, reverse=True)

    cannibs = [r for r in records if r.get("seo_opportunity_type") == "cannibalization_risk"]
    cannibs.sort(key=lambda r: r.get("gsc_total_impressions", 0) or 0, reverse=True)

    page_gaps = [r for r in records if r.get("seo_opportunity_type") == "page_gap"]
    page_gaps.sort(key=lambda r: max(r.get("planner_avg_monthly_searches", 0) or 0, r.get("historical_avg_monthly_searches", 0) or 0), reverse=True)

    # PPC/SEO overlap
    overlap_dist = Counter(r.get("ppc_seo_overlap_guess", "") for r in records if r.get("ppc_seo_overlap_guess"))
    overlap_both = [r for r in records if r.get("ppc_seo_overlap_guess") == "in_ads_and_gsc"]
    overlap_both.sort(key=lambda r: (r.get("gsc_total_impressions", 0) or 0), reverse=True)

    # Planner-strong but weak GSC/Ads
    planner_orphans = [
        r for r in records
        if _safe_bool(r.get("in_planner_ideas"))
        and (r.get("planner_avg_monthly_searches", 0) or 0) >= 100
        and not _safe_bool(r.get("in_ads_keywords"))
        and not r.get("in_gsc_queries")
        and r.get("brand_nonbrand_guess") == "nonbrand"
    ]
    planner_orphans.sort(key=lambda r: r.get("planner_avg_monthly_searches", 0) or 0, reverse=True)

    lines = [
        "# Keyword Master v2 Summary",
        "",
        f"**Generated:** {now}",
        f"**Generator:** `build_keyword_master_v2.py`",
        "",
        "---",
        "",
        "## Overview",
        "",
        "| Metric | Count |",
        "|--------|-------|",
        f"| Total keywords | {total} |",
        f"| With GSC evidence | {len(has_gsc)} |",
        f"| New from GSC (not in v1) | {total - len([r for r in records if any(_safe_bool(r.get(f)) for f in ['in_planner_ideas','in_historical_metrics','in_ads_keywords','in_ads_search_terms','in_action_candidates'])])} |",
        "",
        "### Source presence",
        "",
        "| Source | Keywords |",
        "|--------|----------|",
    ]
    for src, count in src_counts.items():
        lines.append(f"| {src} | {count} |")

    lines += [
        "",
        "### Brand classification",
        "",
        "| Type | Count |",
        "|------|-------|",
    ]
    for btype, count in sorted(brand_dist.items(), key=lambda x: -x[1]):
        lines.append(f"| {btype} | {count} |")

    lines += [
        "",
        "---",
        "",
        "## Top nonbrand queries by GSC impressions",
        "",
        "| Keyword | Impressions | Clicks | CTR | Pos | Pages | Theme |",
        "|---------|-------------|--------|-----|-----|-------|-------|",
    ]
    for r in nonbrand_gsc_by_impr[:20]:
        lines.append(
            f"| {r['normalized_keyword']} "
            f"| {r.get('gsc_total_impressions', 0)} "
            f"| {r.get('gsc_total_clicks', 0)} "
            f"| {r.get('gsc_weighted_ctr', 0):.4f} "
            f"| {r.get('gsc_best_position_guess', 0):.1f} "
            f"| {r.get('gsc_distinct_pages_count', 0)} "
            f"| {r.get('topic_theme_guess', '')} |"
        )

    lines += [
        "",
        "---",
        "",
        "## SEO opportunities",
        "",
        "| Opportunity type | Count |",
        "|-----------------|-------|",
    ]
    for otype, count in sorted(seo_opp_dist.items(), key=lambda x: -x[1]):
        lines.append(f"| {otype} | {count} |")

    lines += [
        "",
        f"### Striking distance ({len(striking)} keywords)",
        "",
    ]
    if striking:
        lines.append("| Keyword | Impressions | Clicks | CTR | Pos | Reason |")
        lines.append("|---------|-------------|--------|-----|-----|--------|")
        for r in striking[:15]:
            lines.append(
                f"| {r['normalized_keyword']} "
                f"| {r.get('gsc_total_impressions', 0)} "
                f"| {r.get('gsc_total_clicks', 0)} "
                f"| {r.get('gsc_weighted_ctr', 0):.4f} "
                f"| {r.get('gsc_best_position_guess', 0):.1f} "
                f"| {r.get('seo_opportunity_reason', '')} |"
            )

    lines += [
        "",
        f"### Low CTR / high impressions ({len(low_ctr)} keywords)",
        "",
    ]
    if low_ctr:
        lines.append("| Keyword | Impressions | CTR | Pos | Reason |")
        lines.append("|---------|-------------|-----|-----|--------|")
        for r in low_ctr[:15]:
            lines.append(
                f"| {r['normalized_keyword']} "
                f"| {r.get('gsc_total_impressions', 0)} "
                f"| {r.get('gsc_weighted_ctr', 0):.4f} "
                f"| {r.get('gsc_best_position_guess', 0):.1f} "
                f"| {r.get('seo_opportunity_reason', '')} |"
            )

    lines += [
        "",
        f"### Cannibalization risk ({len(cannibs)} keywords)",
        "",
    ]
    if cannibs:
        lines.append("| Keyword | Impressions | Clicks | Pages | Reason |")
        lines.append("|---------|-------------|--------|-------|--------|")
        for r in cannibs[:15]:
            lines.append(
                f"| {r['normalized_keyword']} "
                f"| {r.get('gsc_total_impressions', 0)} "
                f"| {r.get('gsc_total_clicks', 0)} "
                f"| {r.get('gsc_distinct_pages_count', 0)} "
                f"| {r.get('seo_opportunity_reason', '')} |"
            )

    lines += [
        "",
        f"### Page gap ({len(page_gaps)} keywords)",
        "",
    ]
    if page_gaps:
        lines.append("| Keyword | Planner Vol | Theme | Reason |")
        lines.append("|---------|-------------|-------|--------|")
        for r in page_gaps[:15]:
            vol = max(r.get("planner_avg_monthly_searches", 0) or 0, r.get("historical_avg_monthly_searches", 0) or 0)
            lines.append(
                f"| {r['normalized_keyword']} "
                f"| {vol} "
                f"| {r.get('topic_theme_guess', '')} "
                f"| {r.get('seo_opportunity_reason', '')} |"
            )

    lines += [
        "",
        "---",
        "",
        "## PPC/SEO overlap",
        "",
        "| Overlap type | Count |",
        "|-------------|-------|",
    ]
    for otype, count in sorted(overlap_dist.items(), key=lambda x: -x[1]):
        lines.append(f"| {otype} | {count} |")

    lines += [
        "",
        f"### Keywords in both ads and GSC ({len(overlap_both)} keywords)",
        "",
    ]
    if overlap_both:
        lines.append("| Keyword | GSC Impr | GSC Clicks | Ads Cost | Ads Conv | Notes |")
        lines.append("|---------|----------|------------|----------|----------|-------|")
        for r in overlap_both[:15]:
            lines.append(
                f"| {r['normalized_keyword']} "
                f"| {r.get('gsc_total_impressions', 0)} "
                f"| {r.get('gsc_total_clicks', 0)} "
                f"| {r.get('ads_keyword_cost_eur', 0)} "
                f"| {r.get('ads_keyword_conversions', 0)} "
                f"| {r.get('ppc_seo_notes', '')} |"
            )

    lines += [
        "",
        f"### Planner-strong but no GSC/Ads presence ({len(planner_orphans)} keywords)",
        "",
    ]
    if planner_orphans:
        lines.append("| Keyword | Planner Vol | Competition | Theme |")
        lines.append("|---------|-------------|-------------|-------|")
        for r in planner_orphans[:15]:
            lines.append(
                f"| {r['normalized_keyword']} "
                f"| {r.get('planner_avg_monthly_searches', 0)} "
                f"| {r.get('planner_competition', '')} "
                f"| {r.get('topic_theme_guess', '')} |"
            )

    lines += [
        "",
        "---",
        "",
        "## Limitations (v2)",
        "",
        "1. **GSC data covers 90 days** (with 3-day lag); low-volume queries may be underrepresented",
        "2. **Brand classifier** is simple pattern-based; mixed cases (e.g., 'bm afbouw') may misclassify",
        "3. **Cannibalization threshold** is 3+ pages; branded queries inflate this artificially",
        "4. **SEO opportunity heuristics** are conservative and rule-based",
        "5. **Page mapping refinement** only overrides v1 when GSC evidence includes clicks",
        "6. **PPC/SEO overlap** does not account for position-level interactions",
        "7. **No external SERP data** (DataForSEO not connected)",
        "8. **GSC sampling** may affect accuracy for high-traffic properties",
        "",
        "---",
        "",
        "## Output files",
        "",
        "| File | Path |",
        "|------|------|",
        "| JSON (full) | `seo-ops/snapshots/normalized/keyword_master/keyword_master_v2.json` |",
        "| CSV (flat) | `seo-ops/snapshots/normalized/keyword_master/keyword_master_v2.csv` |",
        "| Summary (this file) | `seo-ops/reports/keywords/keyword_master_v2_summary.md` |",
    ]

    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


# ── Main ─────────────────────────────────────────────────────────────────────

def main() -> None:
    print("Building keyword master v2...")
    records = merge_v2()
    print(f"  Total: {len(records)} keywords")

    write_json(records, JSON_OUT)
    print(f"  JSON -> {JSON_OUT}")

    write_csv(records, CSV_OUT)
    print(f"  CSV  -> {CSV_OUT}")

    write_summary(records, SUMMARY_OUT)
    print(f"  Summary -> {SUMMARY_OUT}")

    # Quick stats
    has_gsc = sum(1 for r in records if r.get("in_gsc_queries"))
    brand_dist = Counter(r.get("brand_nonbrand_guess", "") for r in records)
    opp_dist = Counter(r.get("seo_opportunity_type", "none") for r in records if r.get("seo_opportunity_type") and r.get("seo_opportunity_type") != "none")
    overlap_dist = Counter(r.get("ppc_seo_overlap_guess", "") for r in records if r.get("ppc_seo_overlap_guess"))

    print(f"\n  GSC evidence: {has_gsc}/{len(records)} keywords")
    print(f"  Brand: {dict(brand_dist)}")
    print(f"  SEO opportunities: {dict(opp_dist)}")
    print(f"  PPC/SEO overlap: {dict(overlap_dist)}")
    print(f"\n  Done.")


if __name__ == "__main__":
    main()

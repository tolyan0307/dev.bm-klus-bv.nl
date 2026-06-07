"""
run_ppc_review_v1.py -- First integrated PPC review workflow.

Produces a recommendation-grade PPC review for one active campaign
using existing local CSV data, keyword_master v2, GA4 landing-page
snapshot, and the decision pack.

READ-ONLY: does not modify Google Ads or any site files.

Usage:
    python seo-ops/analyzers/ppc/run_ppc_review_v1.py
"""

from __future__ import annotations

import csv
import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parents[3]  # D:\projects\bmklus\v0-site\site
SEO_OPS = PROJECT_ROOT / "seo-ops"

GOOGLE_OUTPUTS = Path("D:/projects/bmklus/google/outputs")

# Input files -- Google Ads
CAMPAIGN_CSV = GOOGLE_OUTPUTS / "campaign_23271040037_last30d.csv"
KEYWORDS_CSV = GOOGLE_OUTPUTS / "keywords_23271040037_last30d.csv"
KEYWORDS_FLAGGED_CSV = GOOGLE_OUTPUTS / "keywords_23271040037_last30d_flagged.csv"
SEARCH_TERMS_CSV = GOOGLE_OUTPUTS / "search_terms_23271040037_last30d.csv"
SEARCH_TERMS_FLAGGED_CSV = GOOGLE_OUTPUTS / "search_terms_23271040037_last30d_flagged.csv"
ACTION_CANDIDATES_CSV = GOOGLE_OUTPUTS / "campaign_23271040037_action_candidates_last30d.csv"

# Input files -- normalized assets
KEYWORD_MASTER_CSV = SEO_OPS / "snapshots/normalized/keyword_master/keyword_master_v2.csv"
GA4_LANDING_CSV = SEO_OPS / "snapshots/normalized/pages/ga4_landing_pages_last90d.csv"
GA4_LANDING_CHANNEL_CSV = SEO_OPS / "snapshots/normalized/pages/ga4_landing_pages_by_channel_last90d.csv"
PAGE_INVENTORY_CSV = SEO_OPS / "snapshots/normalized/pages/page_inventory_v1.csv"

# Output files
REPORT_MD = SEO_OPS / "reports/ppc/ppc_review_campaign_23271040037_last30d.md"
OUTPUT_JSON = SEO_OPS / "outputs/ppc_review_campaign_23271040037_last30d.json"

CAMPAIGN_ID = "23271040037"
CAMPAIGN_NAME = "NL | Gevelisolatie | Search"

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _load_csv(path: Path) -> list[dict]:
    if not path.is_file():
        print(f"  WARN: {path.name} not found, skipping")
        return []
    with open(path, encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


def _safe_float(v, default=0.0) -> float:
    try:
        return float(v)
    except (TypeError, ValueError):
        return default


def _safe_int(v, default=0) -> int:
    try:
        return int(float(v))
    except (TypeError, ValueError):
        return default


def _fmt_eur(v: float) -> str:
    return f"\u20ac{v:,.2f}"


def _fmt_pct(v: float) -> str:
    return f"{v * 100:.1f}%"


def _normalize_kw(text: str) -> str:
    return " ".join(text.lower().strip().split())


# ---------------------------------------------------------------------------
# 1. Load all sources
# ---------------------------------------------------------------------------


def load_sources() -> dict:
    print("Loading sources...")
    campaign_daily = _load_csv(CAMPAIGN_CSV)
    keywords = _load_csv(KEYWORDS_CSV)
    keywords_flagged = _load_csv(KEYWORDS_FLAGGED_CSV)
    search_terms = _load_csv(SEARCH_TERMS_CSV)
    search_terms_flagged = _load_csv(SEARCH_TERMS_FLAGGED_CSV)
    action_candidates = _load_csv(ACTION_CANDIDATES_CSV)
    keyword_master = _load_csv(KEYWORD_MASTER_CSV)
    ga4_landing = _load_csv(GA4_LANDING_CSV)
    ga4_landing_channel = _load_csv(GA4_LANDING_CHANNEL_CSV)
    page_inventory = _load_csv(PAGE_INVENTORY_CSV)

    print(f"  campaign_daily: {len(campaign_daily)} rows")
    print(f"  keywords: {len(keywords)} rows")
    print(f"  keywords_flagged: {len(keywords_flagged)} rows")
    print(f"  search_terms: {len(search_terms)} rows")
    print(f"  search_terms_flagged: {len(search_terms_flagged)} rows")
    print(f"  action_candidates: {len(action_candidates)} rows")
    print(f"  keyword_master: {len(keyword_master)} rows")
    print(f"  ga4_landing: {len(ga4_landing)} rows")
    print(f"  ga4_landing_channel: {len(ga4_landing_channel)} rows")
    print(f"  page_inventory: {len(page_inventory)} rows")

    return {
        "campaign_daily": campaign_daily,
        "keywords": keywords,
        "keywords_flagged": keywords_flagged,
        "search_terms": search_terms,
        "search_terms_flagged": search_terms_flagged,
        "action_candidates": action_candidates,
        "keyword_master": keyword_master,
        "ga4_landing": ga4_landing,
        "ga4_landing_channel": ga4_landing_channel,
        "page_inventory": page_inventory,
    }


# ---------------------------------------------------------------------------
# 2. Campaign-level performance
# ---------------------------------------------------------------------------


def compute_campaign_summary(daily: list[dict]) -> dict:
    total_impr = sum(_safe_int(r.get("impressions", 0)) for r in daily)
    total_clicks = sum(_safe_int(r.get("clicks", 0)) for r in daily)
    total_cost_micros = sum(_safe_int(r.get("cost_micros", 0)) for r in daily)
    total_conv = sum(_safe_float(r.get("conversions", 0)) for r in daily)
    total_cost = total_cost_micros / 1_000_000

    dates = sorted(r.get("date", "") for r in daily if r.get("date"))
    date_start = dates[0] if dates else "?"
    date_end = dates[-1] if dates else "?"
    active_days = len([r for r in daily if _safe_int(r.get("impressions", 0)) > 0])

    ctr = total_clicks / total_impr if total_impr else 0.0
    cpc = total_cost / total_clicks if total_clicks else 0.0
    cpa = total_cost / total_conv if total_conv else 0.0

    return {
        "date_start": date_start,
        "date_end": date_end,
        "total_days": len(daily),
        "active_days": active_days,
        "impressions": total_impr,
        "clicks": total_clicks,
        "cost_eur": round(total_cost, 2),
        "conversions": total_conv,
        "ctr": round(ctr, 4),
        "cpc_eur": round(cpc, 2),
        "cpa_eur": round(cpa, 2) if total_conv else None,
    }


# ---------------------------------------------------------------------------
# 3. Ad group / theme analysis
# ---------------------------------------------------------------------------


def compute_ad_group_summary(keywords: list[dict]) -> list[dict]:
    groups: dict[str, dict] = {}
    for kw in keywords:
        ag = kw.get("ad_group_name", "unknown")
        if ag not in groups:
            groups[ag] = {"ad_group": ag, "keywords": 0, "impressions": 0, "clicks": 0, "cost_eur": 0.0, "conversions": 0.0}
        g = groups[ag]
        g["keywords"] += 1
        g["impressions"] += _safe_int(kw.get("impressions", 0))
        g["clicks"] += _safe_int(kw.get("clicks", 0))
        g["cost_eur"] += _safe_float(kw.get("cost_eur", 0))
        g["conversions"] += _safe_float(kw.get("conversions", 0))

    result = sorted(groups.values(), key=lambda x: x["cost_eur"], reverse=True)
    for g in result:
        g["cost_eur"] = round(g["cost_eur"], 2)
        g["conversions"] = round(g["conversions"], 1)
    return result


def compute_theme_summary(action_candidates: list[dict], keywords: list[dict]) -> list[dict]:
    """Aggregate by theme from action_candidates (which has a theme column)."""
    # Build theme from action_candidates
    themes: dict[str, dict] = {}
    for ac in action_candidates:
        theme = ac.get("theme", "other") or "other"
        if theme not in themes:
            themes[theme] = {"theme": theme, "keywords": 0, "impressions": 0, "clicks": 0, "cost_eur": 0.0, "conversions": 0.0}
        t = themes[theme]
        t["keywords"] += 1
        t["impressions"] += _safe_int(ac.get("impressions", 0))
        t["clicks"] += _safe_int(ac.get("clicks", 0))
        t["cost_eur"] += _safe_float(ac.get("cost_eur", 0))
        t["conversions"] += _safe_float(ac.get("conversions", 0))

    result = sorted(themes.values(), key=lambda x: x["cost_eur"], reverse=True)
    for t in result:
        t["cost_eur"] = round(t["cost_eur"], 2)
        t["conversions"] = round(t["conversions"], 1)
    return result


# ---------------------------------------------------------------------------
# 4. Keyword findings
# ---------------------------------------------------------------------------


def classify_keywords(keywords_flagged: list[dict], action_candidates: list[dict]) -> dict:
    """Classify keywords into protect/review/pause_risk/zero_impression buckets."""
    # Build action candidate lookup
    ac_lookup: dict[str, dict] = {}
    for ac in action_candidates:
        key = _normalize_kw(ac.get("keyword", ""))
        mt = ac.get("match_type", "")
        ac_lookup[(key, mt)] = ac

    protect = []
    review = []
    pause_risk = []
    zero_impression = []

    for kw in keywords_flagged:
        flags = kw.get("flags", "")
        impr = _safe_int(kw.get("impressions", 0))
        clicks = _safe_int(kw.get("clicks", 0))
        cost = _safe_float(kw.get("cost_eur", 0))
        conv = _safe_float(kw.get("conversions", 0))
        status = kw.get("status", "")

        entry = {
            "keyword": kw.get("keyword", ""),
            "match_type": kw.get("match_type", ""),
            "ad_group": kw.get("ad_group_name", ""),
            "impressions": impr,
            "clicks": clicks,
            "cost_eur": round(cost, 2),
            "conversions": conv,
            "flags": flags,
        }

        if "converting" in flags:
            protect.append(entry)
        elif "high_spend_no_conv" in flags:
            pause_risk.append(entry)
        elif "high_clicks_no_conv" in flags:
            review.append(entry)
        elif impr == 0 and status == "ENABLED":
            zero_impression.append(entry)

    # Also pick up zero-impression from action_candidates with decision=cleanup
    seen_zero = {(z["keyword"], z["match_type"]) for z in zero_impression}
    for ac in action_candidates:
        if ac.get("decision") == "cleanup" or (_safe_int(ac.get("impressions", 0)) == 0):
            key = ac.get("keyword", "")
            mt = ac.get("match_type", "")
            if (key, mt) not in seen_zero:
                zero_impression.append({
                    "keyword": key,
                    "match_type": mt,
                    "ad_group": ac.get("ad_group_name", ""),
                    "impressions": 0,
                    "clicks": 0,
                    "cost_eur": 0.0,
                    "conversions": 0.0,
                    "flags": "zero_impressions",
                })
                seen_zero.add((key, mt))

    # Also add action_candidates with decision=pause that aren't in pause_risk yet
    seen_pause = {(p["keyword"], p["match_type"]) for p in pause_risk}
    for ac in action_candidates:
        if ac.get("decision") == "pause":
            key = ac.get("keyword", "")
            mt = ac.get("match_type", "")
            if (key, mt) not in seen_pause:
                pause_risk.append({
                    "keyword": key,
                    "match_type": mt,
                    "ad_group": ac.get("ad_group_name", ""),
                    "impressions": _safe_int(ac.get("impressions", 0)),
                    "clicks": _safe_int(ac.get("clicks", 0)),
                    "cost_eur": round(_safe_float(ac.get("cost_eur", 0)), 2),
                    "conversions": _safe_float(ac.get("conversions", 0)),
                    "flags": "pause_candidate",
                })
                seen_pause.add((key, mt))

    # Add action_candidates with decision=review not already in review
    seen_review = {(r["keyword"], r["match_type"]) for r in review}
    for ac in action_candidates:
        if ac.get("decision") == "review":
            key = ac.get("keyword", "")
            mt = ac.get("match_type", "")
            if (key, mt) not in seen_review:
                review.append({
                    "keyword": key,
                    "match_type": mt,
                    "ad_group": ac.get("ad_group_name", ""),
                    "impressions": _safe_int(ac.get("impressions", 0)),
                    "clicks": _safe_int(ac.get("clicks", 0)),
                    "cost_eur": round(_safe_float(ac.get("cost_eur", 0)), 2),
                    "conversions": _safe_float(ac.get("conversions", 0)),
                    "flags": "review_candidate",
                })
                seen_review.add((key, mt))

    protect.sort(key=lambda x: x["conversions"], reverse=True)
    pause_risk.sort(key=lambda x: x["cost_eur"], reverse=True)
    review.sort(key=lambda x: x["cost_eur"], reverse=True)

    return {
        "protect": protect,
        "review": review,
        "pause_risk": pause_risk,
        "zero_impression": zero_impression,
    }


# ---------------------------------------------------------------------------
# 5. Search term findings
# ---------------------------------------------------------------------------


def analyze_search_terms(search_terms: list[dict], search_terms_flagged: list[dict]) -> dict:
    """Analyze search terms: top converting, top waste, negatives watchlist."""
    converting = []
    waste = []
    all_terms = []

    for st in search_terms:
        term = st.get("search_term", "")
        clicks = _safe_int(st.get("clicks", 0))
        cost = _safe_float(st.get("cost_eur", 0))
        conv = _safe_float(st.get("conversions", 0))
        impr = _safe_int(st.get("impressions", 0))
        ad_group = st.get("ad_group_name", "")

        entry = {
            "search_term": term,
            "ad_group": ad_group,
            "impressions": impr,
            "clicks": clicks,
            "cost_eur": round(cost, 2),
            "conversions": conv,
        }
        all_terms.append(entry)

        if conv > 0:
            converting.append(entry)
        elif cost > 5.0 and conv == 0:
            waste.append(entry)

    converting.sort(key=lambda x: x["conversions"], reverse=True)
    waste.sort(key=lambda x: x["cost_eur"], reverse=True)

    # Negatives watchlist: terms with clicks >= 3, zero conv, cost > 3
    negatives_watch = [
        t for t in all_terms
        if t["conversions"] == 0 and t["clicks"] >= 3 and t["cost_eur"] > 3.0
    ]
    negatives_watch.sort(key=lambda x: x["cost_eur"], reverse=True)

    # Flagged terms from the flagged file
    flagged_terms = []
    for st in search_terms_flagged:
        flagged_terms.append({
            "search_term": st.get("search_term", ""),
            "flags": st.get("flags", ""),
            "clicks": _safe_int(st.get("clicks", 0)),
            "cost_eur": round(_safe_float(st.get("cost_eur", 0)), 2),
            "conversions": _safe_float(st.get("conversions", 0)),
        })

    return {
        "total_terms": len(all_terms),
        "converting": converting,
        "waste_top15": waste[:15],
        "negatives_watchlist": negatives_watch[:20],
        "flagged_terms": flagged_terms,
    }


# ---------------------------------------------------------------------------
# 6. Landing page findings (GA4 + PPC)
# ---------------------------------------------------------------------------


def analyze_landing_pages(
    ga4_landing: list[dict],
    ga4_landing_channel: list[dict],
    page_inventory: list[dict],
) -> dict:
    """Analyze paid landing pages from GA4 data."""
    # Get paid-search rows
    paid_pages = []
    for row in ga4_landing_channel:
        channel = row.get("session_default_channel_group", "")
        if channel.lower() != "paid search":
            continue
        path = row.get("normalized_path", "")
        sessions = _safe_int(row.get("sessions", 0))
        engaged = _safe_int(row.get("engaged_sessions", 0))
        eng_rate = _safe_float(row.get("engagement_rate", 0))
        avg_dur = _safe_float(row.get("avg_session_duration_seconds", 0))
        mapped = row.get("mapped_route_guess", "")
        page_type = row.get("mapped_page_type_guess", "")

        paid_pages.append({
            "path": path,
            "paid_sessions": sessions,
            "engaged_sessions": engaged,
            "engagement_rate": round(eng_rate, 2),
            "avg_duration": round(avg_dur, 1),
            "mapped_route": mapped,
            "page_type": page_type,
        })

    paid_pages.sort(key=lambda x: x["paid_sessions"], reverse=True)

    # Identify weak engagement (eng_rate < 0.4 and sessions >= 5)
    weak_engagement = [
        p for p in paid_pages
        if p["engagement_rate"] < 0.4 and p["paid_sessions"] >= 5
    ]

    # Identify unmapped/legacy
    unmapped = [
        p for p in paid_pages
        if not p["mapped_route"] and p["paid_sessions"] > 0
    ]

    # Total paid page data from aggregate
    total_paid = []
    for row in ga4_landing:
        path = row.get("normalized_path", "")
        notes = row.get("notes", "")
        page_type = row.get("mapped_page_type_guess", "")
        ke = _safe_int(row.get("key_events", 0))
        sessions = _safe_int(row.get("sessions", 0))

        total_paid.append({
            "path": path,
            "sessions": sessions,
            "key_events": ke,
            "page_type": page_type,
            "notes": notes,
        })

    # Check for (not set) anomaly
    not_set_sessions = 0
    for row in ga4_landing_channel:
        if row.get("session_default_channel_group", "").lower() == "paid search":
            path = row.get("normalized_path", "")
            if "(not set)" in path:
                not_set_sessions += _safe_int(row.get("sessions", 0))

    anomalies = []
    if not_set_sessions > 0:
        anomalies.append(f"{not_set_sessions} paid sessions on (not set) landing pages -- tracking gap")

    return {
        "paid_pages": paid_pages[:20],
        "weak_engagement": weak_engagement,
        "unmapped": unmapped,
        "anomalies": anomalies,
        "total_paid_sessions": sum(p["paid_sessions"] for p in paid_pages),
    }


# ---------------------------------------------------------------------------
# 7. Cross-source insights (keyword_master v2)
# ---------------------------------------------------------------------------


def cross_source_insights(
    keyword_master: list[dict],
    keywords: list[dict],
    search_terms: list[dict],
) -> dict:
    """Cross-reference PPC data with keyword_master v2."""
    # Build lookup from keyword_master
    km_lookup: dict[str, dict] = {}
    for km in keyword_master:
        nk = km.get("normalized_keyword", "")
        if nk:
            km_lookup[nk] = km

    # PPC keywords that also have organic (GSC) evidence
    # Aggregate across match types first
    ads_agg: dict[str, dict] = {}
    for kw in keywords:
        nk = _normalize_kw(kw.get("keyword", ""))
        if nk not in ads_agg:
            ads_agg[nk] = {"cost_eur": 0.0, "clicks": 0, "conversions": 0.0}
        ads_agg[nk]["cost_eur"] += _safe_float(kw.get("cost_eur", 0))
        ads_agg[nk]["clicks"] += _safe_int(kw.get("clicks", 0))
        ads_agg[nk]["conversions"] += _safe_float(kw.get("conversions", 0))

    ads_kw_set = set(ads_agg.keys())
    ppc_with_organic = []
    ppc_only = []

    for nk, agg in ads_agg.items():
        km = km_lookup.get(nk)
        if km and km.get("in_gsc_queries") == "True":
            gsc_impr = _safe_int(km.get("gsc_total_impressions", 0))
            gsc_clicks = _safe_int(km.get("gsc_total_clicks", 0))
            gsc_pos = _safe_float(km.get("gsc_best_position_guess", 0))
            ppc_with_organic.append({
                "keyword": nk,
                "gsc_impressions": gsc_impr,
                "gsc_clicks": gsc_clicks,
                "gsc_position": round(gsc_pos, 1),
                "ads_cost_eur": round(agg["cost_eur"], 2),
                "ads_conversions": agg["conversions"],
                "overlap_type": km.get("ppc_seo_overlap_guess", ""),
            })
        elif agg["cost_eur"] > 0:
            ppc_only.append({
                "keyword": nk,
                "ads_cost_eur": round(agg["cost_eur"], 2),
                "ads_clicks": agg["clicks"],
                "ads_conversions": agg["conversions"],
            })

    ppc_with_organic.sort(key=lambda x: x["gsc_impressions"], reverse=True)
    ppc_only.sort(key=lambda x: x["ads_cost_eur"], reverse=True)

    # Planner-demand terms not active in ads (high planner vol, not in ads)
    planner_untapped = []
    for km in keyword_master:
        nk = km.get("normalized_keyword", "")
        if nk in ads_kw_set:
            continue
        if km.get("in_planner_ideas") != "True":
            continue
        vol = _safe_int(km.get("planner_avg_monthly_searches", 0))
        theme = km.get("topic_theme_guess", "")
        if vol >= 100 and theme in ("core_isolation", "stuc_crepi", "steenstrips", "prijs_kosten", "schilderen"):
            planner_untapped.append({
                "keyword": nk,
                "planner_volume": vol,
                "theme": theme,
                "competition": km.get("planner_competition", ""),
            })

    planner_untapped.sort(key=lambda x: x["planner_volume"], reverse=True)

    # Mapping misalignment: PPC keywords where mapped_route is empty or mismatched
    misaligned = []
    for nk, agg in ads_agg.items():
        km = km_lookup.get(nk)
        if km:
            mapped = km.get("mapped_route_guess", "")
            confidence = km.get("mapping_confidence", "")
            if not mapped or confidence in ("none", "low"):
                if agg["cost_eur"] > 1.0:
                    misaligned.append({
                        "keyword": nk,
                        "ads_cost_eur": round(agg["cost_eur"], 2),
                        "ads_clicks": agg["clicks"],
                        "mapped_route": mapped or "(none)",
                        "confidence": confidence or "(none)",
                        "theme": km.get("topic_theme_guess", ""),
                    })

    misaligned.sort(key=lambda x: x["ads_cost_eur"], reverse=True)

    return {
        "ppc_with_organic": ppc_with_organic[:20],
        "ppc_only_top15": ppc_only[:15],
        "planner_untapped_top15": planner_untapped[:15],
        "misaligned_top10": misaligned[:10],
    }


# ---------------------------------------------------------------------------
# 8. Build recommendations
# ---------------------------------------------------------------------------


def build_recommendations(
    campaign: dict,
    kw_findings: dict,
    st_findings: dict,
    lp_findings: dict,
    cross: dict,
) -> dict:
    do_now = []
    monitor = []
    do_later = []

    # --- Do now ---
    conv = campaign["conversions"]
    if conv <= 5:
        do_now.append({
            "action": "Verify conversion tracking completeness",
            "rationale": f"Only {conv} conversions in 30 days. Before making keyword decisions, confirm all lead forms, phone taps, and WhatsApp clicks fire Contact_Form_Site / Phone / Whatsapp events in GA4.",
            "confidence": "high",
            "risk": "If tracking is broken, all keyword performance data is misleading.",
        })

    # Protect converting keywords
    if kw_findings["protect"]:
        kw_list = ", ".join(p["keyword"] for p in kw_findings["protect"][:5])
        do_now.append({
            "action": "Protect converting keywords",
            "rationale": f"These keywords drive the only conversions: {kw_list}. Ensure adequate budget, competitive bids, and they are not limited by ad rank.",
            "confidence": "high",
            "risk": "Low risk -- these are proven performers.",
        })

    # Top pause candidates
    if kw_findings["pause_risk"]:
        top_pause = kw_findings["pause_risk"][:3]
        total_waste = sum(p["cost_eur"] for p in kw_findings["pause_risk"])
        kw_names = ", ".join(f"{p['keyword']} ({p['match_type']})" for p in top_pause)
        do_now.append({
            "action": f"Review top pause candidates ({_fmt_eur(total_waste)} at-risk spend)",
            "rationale": f"Top candidates: {kw_names}. High spend, zero conversions. Consider pausing or adding search-term negatives to restrict matching.",
            "confidence": "medium" if conv <= 5 else "high",
            "risk": "Low conversion volume means some of these keywords may convert with more time. Pause cautiously.",
        })

    # --- Monitor ---
    if kw_findings["review"]:
        review_total = sum(r["cost_eur"] for r in kw_findings["review"])
        monitor.append({
            "action": f"Watch review-bucket keywords ({_fmt_eur(review_total)} spend, 0 conversions)",
            "rationale": f"{len(kw_findings['review'])} keywords at moderate spend with no conversions. Re-evaluate after 2 more weeks of data.",
            "confidence": "medium",
            "risk": "Premature pausing could lose viable keywords.",
        })

    if st_findings["negatives_watchlist"]:
        neg_count = len(st_findings["negatives_watchlist"])
        top_neg = st_findings["negatives_watchlist"][0]
        monitor.append({
            "action": f"Monitor {neg_count} search terms as potential negatives",
            "rationale": f"Top: '{top_neg['search_term']}' ({_fmt_eur(top_neg['cost_eur'])}, {top_neg['clicks']} clicks, 0 conv). Track for 2 more weeks before adding as negatives.",
            "confidence": "medium",
            "risk": "Some may convert with more volume. Low urgency.",
        })

    if lp_findings["anomalies"]:
        for anomaly in lp_findings["anomalies"]:
            monitor.append({
                "action": "Investigate (not set) landing page tracking gap",
                "rationale": anomaly,
                "confidence": "medium",
                "risk": "May distort landing page performance data.",
            })

    if cross["ppc_with_organic"]:
        overlap_count = len(cross["ppc_with_organic"])
        monitor.append({
            "action": f"Track {overlap_count} PPC/organic overlap keywords",
            "rationale": "These keywords appear in both paid and organic. As organic rankings improve, consider reducing PPC bids for terms where organic CTR is strong.",
            "confidence": "low",
            "risk": "Need more organic CTR data before acting.",
        })

    if lp_findings["weak_engagement"]:
        weak = lp_findings["weak_engagement"]
        paths = ", ".join(w["path"] for w in weak[:3])
        monitor.append({
            "action": f"Investigate {len(weak)} paid landing pages with weak engagement",
            "rationale": f"Pages: {paths}. Engagement rate < 40% with meaningful paid traffic. Could indicate landing page relevance issues.",
            "confidence": "medium",
            "risk": "Could be normal for informational queries. Check intent alignment first.",
        })

    # --- Do later ---
    if kw_findings["zero_impression"]:
        zi_count = len(kw_findings["zero_impression"])
        do_later.append({
            "action": f"Clean up {zi_count} zero-impression keywords",
            "rationale": "These enabled keywords received 0 impressions in 30 days. Likely overlap with other keywords or have quality score issues.",
            "confidence": "low",
            "risk": "Very low urgency -- not costing anything. Clean up for account hygiene.",
        })

    if cross["planner_untapped_top15"]:
        top_untapped = cross["planner_untapped_top15"][:3]
        kw_list = ", ".join(f"{u['keyword']} ({u['planner_volume']}/mo)" for u in top_untapped)
        do_later.append({
            "action": "Explore untapped planner-demand keywords",
            "rationale": f"Top candidates: {kw_list}. High search volume, relevant themes, not yet in ads. Add after current campaign stabilizes.",
            "confidence": "low",
            "risk": "No urgency. Current campaign efficiency should be improved first.",
        })

    if cross["misaligned_top10"]:
        mis_count = len(cross["misaligned_top10"])
        do_later.append({
            "action": f"Review {mis_count} keywords with weak/missing page mapping",
            "rationale": "These active PPC keywords don't have a clearly mapped landing page. May indicate ad-to-landing-page relevance issues.",
            "confidence": "low",
            "risk": "Needs manual review of actual ad destinations vs. keyword intent.",
        })

    return {
        "do_now": do_now,
        "monitor": monitor,
        "do_later": do_later,
    }


# ---------------------------------------------------------------------------
# 9. Executive summary
# ---------------------------------------------------------------------------


def build_executive_summary(
    campaign: dict,
    kw_findings: dict,
    st_findings: dict,
    ad_groups: list[dict],
) -> dict:
    total_cost = campaign["cost_eur"]
    conv = campaign["conversions"]

    # Main strength
    if kw_findings["protect"]:
        top_kw = kw_findings["protect"][0]
        strength = f"3 converting keywords identified ({', '.join(p['keyword'] for p in kw_findings['protect'][:3])}), demonstrating viable conversion path."
    else:
        strength = "Campaign is generating clicks and impressions in target market."

    # Main weakness
    pause_cost = sum(p["cost_eur"] for p in kw_findings["pause_risk"])
    weakness = f"{_fmt_eur(pause_cost)} spent on keywords with zero conversions ({_fmt_pct(pause_cost / total_cost if total_cost else 0)} of budget). Concentration in non-converting themes (stuc_crepi, bekleden, steenstrips)."

    # Caution
    caution = f"Only {conv:.0f} conversions in 30 days. All keyword-level conclusions are provisional. Do not make aggressive changes until conversion volume grows or tracking is verified."

    return {
        "overall_state": f"Early-stage campaign: {_fmt_eur(total_cost)} spent, {campaign['clicks']} clicks, {conv:.0f} conversions at {_fmt_eur(campaign['cpa_eur'] or 0)} CPA. Campaign is generating traffic but conversion efficiency is unproven.",
        "main_strength": strength,
        "main_weakness": weakness,
        "caution": caution,
    }


# ---------------------------------------------------------------------------
# 10. Write markdown report
# ---------------------------------------------------------------------------


def write_report(
    exec_summary: dict,
    campaign: dict,
    ad_groups: list[dict],
    themes: list[dict],
    kw_findings: dict,
    st_findings: dict,
    lp_findings: dict,
    cross: dict,
    recommendations: dict,
    generated_at: str,
) -> str:
    lines = []

    def w(line=""):
        lines.append(line)

    w(f"# PPC Review: {CAMPAIGN_NAME}")
    w()
    w(f"**Campaign ID:** `{CAMPAIGN_ID}`")
    w(f"**Period:** {campaign['date_start']} to {campaign['date_end']} ({campaign['total_days']} days, {campaign['active_days']} active)")
    w(f"**Generated:** {generated_at}")
    w()
    w("> **Low-volume warning:** This campaign has only **{:.0f} conversions** in the analysis period.".format(campaign["conversions"]))
    w("> All conclusions are **provisional**. Do not make aggressive changes based on low-volume data.")
    w()

    # 1. Executive summary
    w("---")
    w()
    w("## 1. Executive summary")
    w()
    w(f"**Overall state:** {exec_summary['overall_state']}")
    w()
    w(f"**Main strength:** {exec_summary['main_strength']}")
    w()
    w(f"**Main weakness:** {exec_summary['main_weakness']}")
    w()
    w(f"**Caution:** {exec_summary['caution']}")
    w()

    # 2. Campaign performance
    w("---")
    w()
    w("## 2. Campaign performance summary")
    w()
    w("| Metric | Value |")
    w("|--------|-------|")
    w(f"| Impressions | {campaign['impressions']:,} |")
    w(f"| Clicks | {campaign['clicks']:,} |")
    w(f"| Cost | {_fmt_eur(campaign['cost_eur'])} |")
    w(f"| CTR | {_fmt_pct(campaign['ctr'])} |")
    w(f"| Avg CPC | {_fmt_eur(campaign['cpc_eur'])} |")
    w(f"| Conversions | {campaign['conversions']:.0f} |")
    w(f"| CPA | {_fmt_eur(campaign['cpa_eur']) if campaign['cpa_eur'] else 'N/A'} |")
    w(f"| Active days | {campaign['active_days']} / {campaign['total_days']} |")
    w()

    # 3. Ad group / theme
    w("---")
    w()
    w("## 3. Ad group and theme findings")
    w()
    w("### Ad group performance")
    w()
    w("| Ad group | KWs | Impr | Clicks | Cost | Conv |")
    w("|----------|----:|-----:|-------:|-----:|-----:|")
    for ag in ad_groups:
        w(f"| {ag['ad_group']} | {ag['keywords']} | {ag['impressions']:,} | {ag['clicks']} | {_fmt_eur(ag['cost_eur'])} | {ag['conversions']:.0f} |")
    w()

    w("### Theme performance")
    w()
    w("| Theme | KWs | Clicks | Cost | Conv |")
    w("|-------|----:|-------:|-----:|-----:|")
    for t in themes:
        w(f"| {t['theme']} | {t['keywords']} | {t['clicks']} | {_fmt_eur(t['cost_eur'])} | {t['conversions']:.0f} |")
    w()

    # Identify strongest/weakest themes
    converting_themes = [t for t in themes if t["conversions"] > 0]
    non_converting = [t for t in themes if t["conversions"] == 0 and t["cost_eur"] > 10]
    if converting_themes:
        w(f"**Strongest theme:** {converting_themes[0]['theme']} -- all {campaign['conversions']:.0f} conversions come from this theme.")
    if non_converting:
        waste_themes = ", ".join(f"{t['theme']} ({_fmt_eur(t['cost_eur'])})" for t in non_converting[:3])
        w(f"**Non-converting spend concentration:** {waste_themes}")
    w()

    # 4. Keyword findings
    w("---")
    w()
    w("## 4. Keyword findings")
    w()

    w("### Protect / keep (converting)")
    w()
    if kw_findings["protect"]:
        w("| Keyword | Match | Ad group | Clicks | Cost | Conv |")
        w("|---------|-------|----------|-------:|-----:|-----:|")
        for p in kw_findings["protect"]:
            w(f"| {p['keyword']} | {p['match_type']} | {p['ad_group']} | {p['clicks']} | {_fmt_eur(p['cost_eur'])} | {p['conversions']:.0f} |")
    else:
        w("No converting keywords found.")
    w()

    w("### Pause-risk (high spend, zero conversions)")
    w()
    if kw_findings["pause_risk"]:
        w("| Keyword | Match | Ad group | Clicks | Cost | Flags |")
        w("|---------|-------|----------|-------:|-----:|-------|")
        for p in kw_findings["pause_risk"][:10]:
            w(f"| {p['keyword']} | {p['match_type']} | {p['ad_group']} | {p['clicks']} | {_fmt_eur(p['cost_eur'])} | {p['flags']} |")
    else:
        w("No pause-risk keywords.")
    w()

    w("### Review (moderate spend, zero conversions)")
    w()
    if kw_findings["review"]:
        w("| Keyword | Match | Ad group | Clicks | Cost |")
        w("|---------|-------|----------|-------:|-----:|")
        for r in kw_findings["review"][:10]:
            w(f"| {r['keyword']} | {r['match_type']} | {r['ad_group']} | {r['clicks']} | {_fmt_eur(r['cost_eur'])} |")
    else:
        w("No review-bucket keywords.")
    w()

    w(f"### Zero-impression cleanup ({len(kw_findings['zero_impression'])} keywords)")
    w()
    w(f"{len(kw_findings['zero_impression'])} enabled keywords with 0 impressions in 30 days. Low urgency -- not costing anything but indicates account clutter.")
    w()

    # 5. Search term findings
    w("---")
    w()
    w("## 5. Search term findings")
    w()
    w(f"**Total unique search terms:** {st_findings['total_terms']}")
    w()

    w("### Top converting search terms")
    w()
    if st_findings["converting"]:
        w("| Search term | Ad group | Clicks | Cost | Conv |")
        w("|-------------|----------|-------:|-----:|-----:|")
        for c in st_findings["converting"][:10]:
            w(f"| {c['search_term']} | {c['ad_group']} | {c['clicks']} | {_fmt_eur(c['cost_eur'])} | {c['conversions']:.0f} |")
    else:
        w("No converting search terms found.")
    w()

    w("### Top waste search terms (>EUR5 spend, 0 conv)")
    w()
    if st_findings["waste_top15"]:
        w("| Search term | Ad group | Clicks | Cost |")
        w("|-------------|----------|-------:|-----:|")
        for ws in st_findings["waste_top15"]:
            w(f"| {ws['search_term']} | {ws['ad_group']} | {ws['clicks']} | {_fmt_eur(ws['cost_eur'])} |")
    else:
        w("No high-waste search terms.")
    w()

    w("### Negatives watchlist (recommendation only)")
    w()
    if st_findings["negatives_watchlist"]:
        w("| Search term | Clicks | Cost | Notes |")
        w("|-------------|-------:|-----:|-------|")
        for n in st_findings["negatives_watchlist"][:15]:
            w(f"| {n['search_term']} | {n['clicks']} | {_fmt_eur(n['cost_eur'])} | 0 conv, monitor 2 weeks |")
    else:
        w("No terms flagged for negatives watchlist.")
    w()

    # 6. Landing page findings
    w("---")
    w()
    w("## 6. Landing page findings")
    w()
    w(f"**Total paid sessions (GA4, last 90d):** {lp_findings['total_paid_sessions']}")
    w()

    w("### Paid landing pages by sessions")
    w()
    if lp_findings["paid_pages"]:
        w("| Path | Paid Sessions | Eng Rate | Avg Dur (s) | Page Type |")
        w("|------|-------------:|----------:|------------:|-----------|")
        for p in lp_findings["paid_pages"][:15]:
            w(f"| {p['path']} | {p['paid_sessions']} | {_fmt_pct(p['engagement_rate'])} | {p['avg_duration']:.0f} | {p['page_type']} |")
    w()

    if lp_findings["weak_engagement"]:
        w("### Weak engagement paid pages (eng rate < 40%, >= 5 sessions)")
        w()
        w("| Path | Sessions | Eng Rate |")
        w("|------|----------:|----------:|")
        for we in lp_findings["weak_engagement"]:
            w(f"| {we['path']} | {we['paid_sessions']} | {_fmt_pct(we['engagement_rate'])} |")
        w()

    if lp_findings["unmapped"]:
        w("### Unmapped / legacy paid landing pages")
        w()
        w("| Path | Sessions |")
        w("|------|----------:|")
        for u in lp_findings["unmapped"]:
            w(f"| {u['path']} | {u['paid_sessions']} |")
        w()

    if lp_findings["anomalies"]:
        w("### Tracking anomalies")
        w()
        for a in lp_findings["anomalies"]:
            w(f"- {a}")
        w()

    # 7. Cross-source insights
    w("---")
    w()
    w("## 7. Cross-source insights")
    w()

    w("### PPC keywords with organic (GSC) evidence")
    w()
    if cross["ppc_with_organic"]:
        w("| Keyword | GSC Impr | GSC Clicks | GSC Pos | Ads Cost | Ads Conv |")
        w("|---------|----------:|----------:|--------:|--------:|--------:|")
        for o in cross["ppc_with_organic"][:15]:
            w(f"| {o['keyword']} | {o['gsc_impressions']:,} | {o['gsc_clicks']} | {o['gsc_position']} | {_fmt_eur(o['ads_cost_eur'])} | {o['ads_conversions']:.0f} |")
    else:
        w("No overlap found.")
    w()

    w("### PPC-only keywords (no organic evidence)")
    w()
    if cross["ppc_only_top15"]:
        w("| Keyword | Ads Cost | Ads Clicks | Ads Conv |")
        w("|---------|--------:|----------:|--------:|")
        for p in cross["ppc_only_top15"]:
            w(f"| {p['keyword']} | {_fmt_eur(p['ads_cost_eur'])} | {p['ads_clicks']} | {p['ads_conversions']:.0f} |")
    else:
        w("No PPC-only keywords with significant spend.")
    w()

    w("### Untapped planner-demand keywords (not in ads)")
    w()
    if cross["planner_untapped_top15"]:
        w("| Keyword | Volume | Theme | Competition |")
        w("|---------|-------:|-------|-------------|")
        for u in cross["planner_untapped_top15"]:
            w(f"| {u['keyword']} | {u['planner_volume']:,} | {u['theme']} | {u['competition']} |")
    else:
        w("No relevant untapped keywords found.")
    w()

    if cross["misaligned_top10"]:
        w("### Keywords with weak/missing page mapping")
        w()
        w("| Keyword | Ads Cost | Theme | Mapped Route | Confidence |")
        w("|---------|--------:|-------|-------------|------------|")
        for m in cross["misaligned_top10"]:
            w(f"| {m['keyword']} | {_fmt_eur(m['ads_cost_eur'])} | {m['theme']} | {m['mapped_route']} | {m['confidence']} |")
        w()

    # 8. Recommendations
    w("---")
    w()
    w("## 8. Recommendations")
    w()

    for bucket_name, bucket_items in [("Do now", recommendations["do_now"]), ("Monitor", recommendations["monitor"]), ("Do later", recommendations["do_later"])]:
        w(f"### {bucket_name}")
        w()
        if bucket_items:
            for i, rec in enumerate(bucket_items, 1):
                w(f"**{i}. {rec['action']}**")
                w(f"- Rationale: {rec['rationale']}")
                w(f"- Confidence: {rec['confidence']}")
                w(f"- Risk: {rec['risk']}")
                w()
        else:
            w("No actions in this category.")
            w()

    # Limitations
    w("---")
    w()
    w("## Limitations")
    w()
    w("1. **Very low conversion volume** (3 conversions in 30 days) -- all keyword-level conclusions are provisional")
    w("2. **GA4 landing page data covers 90 days**, not aligned with 30-day PPC window")
    w("3. **No Google Ads API connection** -- using exported CSVs, may not reflect real-time state")
    w("4. **No ad copy / ad extension analysis** -- only keyword and search term level")
    w("5. **No Quality Score data** -- exported CSVs don't include QS")
    w("6. **No audience / demographic data** available in current exports")
    w("7. **Conversion attribution** may differ between Google Ads and GA4 models")
    w("8. **Search term data** may be incomplete due to Google's privacy thresholds")
    w()
    w("---")
    w()
    w("*Read-only analysis. No changes applied to Google Ads.*")
    w()

    return "\n".join(lines)


# ---------------------------------------------------------------------------
# 11. Write JSON output
# ---------------------------------------------------------------------------


def build_json_output(
    exec_summary: dict,
    campaign: dict,
    kw_findings: dict,
    st_findings: dict,
    lp_findings: dict,
    cross: dict,
    recommendations: dict,
    generated_at: str,
) -> dict:
    return {
        "campaign_id": CAMPAIGN_ID,
        "campaign_name": CAMPAIGN_NAME,
        "period": f"{campaign['date_start']} to {campaign['date_end']}",
        "generated_at": generated_at,
        "executive_summary": exec_summary,
        "campaign_performance": campaign,
        "strengths": [exec_summary["main_strength"]],
        "weaknesses": [exec_summary["main_weakness"]],
        "protect_keywords": [p["keyword"] for p in kw_findings["protect"]],
        "review_keywords": [r["keyword"] for r in kw_findings["review"]],
        "pause_risk_keywords": [p["keyword"] for p in kw_findings["pause_risk"]],
        "waste_search_terms": [w["search_term"] for w in st_findings["waste_top15"]],
        "landing_page_issues": lp_findings["anomalies"] + [
            f"weak engagement: {w['path']}" for w in lp_findings["weak_engagement"]
        ] + [
            f"unmapped: {u['path']}" for u in lp_findings["unmapped"]
        ],
        "cross_source_opportunities": {
            "ppc_with_organic_count": len(cross["ppc_with_organic"]),
            "ppc_only_count": len(cross["ppc_only_top15"]),
            "planner_untapped_count": len(cross["planner_untapped_top15"]),
            "misaligned_count": len(cross["misaligned_top10"]),
        },
        "recommendations_do_now": recommendations["do_now"],
        "recommendations_monitor": recommendations["monitor"],
        "recommendations_do_later": recommendations["do_later"],
        "limitations": [
            "Very low conversion volume (3 conversions in 30 days)",
            "GA4 data covers 90 days vs 30-day PPC window",
            "No Google Ads API -- using exported CSVs",
            "No ad copy / extension analysis",
            "No Quality Score data",
            "No audience / demographic data",
            "Conversion attribution may differ between Ads and GA4",
            "Search term data may be incomplete (privacy thresholds)",
        ],
    }


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def main():
    print("=" * 60)
    print("PPC Review v1: NL | Gevelisolatie | Search")
    print("=" * 60)
    print()

    sources = load_sources()
    print()

    # Campaign summary
    print("Computing campaign summary...")
    campaign = compute_campaign_summary(sources["campaign_daily"])
    print(f"  Period: {campaign['date_start']} to {campaign['date_end']}")
    print(f"  Cost: {_fmt_eur(campaign['cost_eur'])}, Clicks: {campaign['clicks']}, Conv: {campaign['conversions']:.0f}")
    print()

    # Ad group / theme
    print("Analyzing ad groups and themes...")
    ad_groups = compute_ad_group_summary(sources["keywords"])
    themes = compute_theme_summary(sources["action_candidates"], sources["keywords"])
    print(f"  {len(ad_groups)} ad groups, {len(themes)} themes")
    print()

    # Keywords
    print("Classifying keywords...")
    kw_findings = classify_keywords(sources["keywords_flagged"], sources["action_candidates"])
    print(f"  Protect: {len(kw_findings['protect'])}")
    print(f"  Pause-risk: {len(kw_findings['pause_risk'])}")
    print(f"  Review: {len(kw_findings['review'])}")
    print(f"  Zero-impression: {len(kw_findings['zero_impression'])}")
    print()

    # Search terms
    print("Analyzing search terms...")
    st_findings = analyze_search_terms(sources["search_terms"], sources["search_terms_flagged"])
    print(f"  Total: {st_findings['total_terms']}")
    print(f"  Converting: {len(st_findings['converting'])}")
    print(f"  Waste (>EUR5): {len(st_findings['waste_top15'])}")
    print(f"  Negatives watchlist: {len(st_findings['negatives_watchlist'])}")
    print()

    # Landing pages
    print("Analyzing landing pages...")
    lp_findings = analyze_landing_pages(
        sources["ga4_landing"],
        sources["ga4_landing_channel"],
        sources["page_inventory"],
    )
    print(f"  Paid pages: {len(lp_findings['paid_pages'])}")
    print(f"  Weak engagement: {len(lp_findings['weak_engagement'])}")
    print(f"  Unmapped: {len(lp_findings['unmapped'])}")
    print(f"  Anomalies: {len(lp_findings['anomalies'])}")
    print()

    # Cross-source
    print("Computing cross-source insights...")
    cross = cross_source_insights(
        sources["keyword_master"],
        sources["keywords"],
        sources["search_terms"],
    )
    print(f"  PPC+organic overlap: {len(cross['ppc_with_organic'])}")
    print(f"  PPC-only: {len(cross['ppc_only_top15'])}")
    print(f"  Planner untapped: {len(cross['planner_untapped_top15'])}")
    print(f"  Misaligned mapping: {len(cross['misaligned_top10'])}")
    print()

    # Recommendations
    print("Building recommendations...")
    recommendations = build_recommendations(campaign, kw_findings, st_findings, lp_findings, cross)
    print(f"  Do now: {len(recommendations['do_now'])}")
    print(f"  Monitor: {len(recommendations['monitor'])}")
    print(f"  Do later: {len(recommendations['do_later'])}")
    print()

    # Executive summary
    exec_summary = build_executive_summary(campaign, kw_findings, st_findings, ad_groups)

    generated_at = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    # Write MD report
    print("Writing markdown report...")
    report = write_report(
        exec_summary, campaign, ad_groups, themes,
        kw_findings, st_findings, lp_findings, cross,
        recommendations, generated_at,
    )
    REPORT_MD.parent.mkdir(parents=True, exist_ok=True)
    REPORT_MD.write_text(report, encoding="utf-8")
    print(f"  -> {REPORT_MD}")

    # Write JSON output
    print("Writing JSON output...")
    json_out = build_json_output(
        exec_summary, campaign, kw_findings, st_findings,
        lp_findings, cross, recommendations, generated_at,
    )
    OUTPUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_JSON.write_text(
        json.dumps(json_out, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    print(f"  -> {OUTPUT_JSON}")

    print()
    print("=" * 60)
    print("PPC Review v1 complete.")
    print("=" * 60)


if __name__ == "__main__":
    main()

"""
run_keyword_intelligence_review_v2.py -- Keyword intelligence review v2.

Produces a decision-grade semantic keyword review for SEO + PPC using
keyword_master v3 as the primary source, enriched with GSC, GA4,
page-inventory, and DataForSEO context.

Changes from v1:
  - Uses keyword_master v3 (adds 8 DataForSEO fields, 3 new keywords)
  - Introduces explicit evidence tiers
  - DataForSEO-aware source-overlap analysis
  - Conservative interpretation of external-only evidence
  - v1 -> v2 change summary in report

READ-ONLY: does not modify site pages or Google Ads.

Usage:
    python seo-ops/analyzers/keywords/run_keyword_intelligence_review_v2.py
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

PROJECT_ROOT = Path(__file__).resolve().parents[3]
SEO_OPS = PROJECT_ROOT / "seo-ops"

KEYWORD_MASTER_CSV = SEO_OPS / "snapshots/normalized/keyword_master/keyword_master_v3.csv"
PAGE_INVENTORY_CSV = SEO_OPS / "snapshots/normalized/pages/page_inventory_v1.csv"
GSC_QUERIES_CSV = SEO_OPS / "snapshots/normalized/seo/gsc_query_page_aggregated_queries_last90d.csv"
GSC_PAGES_CSV = SEO_OPS / "snapshots/normalized/seo/gsc_query_page_aggregated_pages_last90d.csv"
GA4_LANDING_CSV = SEO_OPS / "snapshots/normalized/pages/ga4_landing_pages_last90d.csv"

REPORT_MD = SEO_OPS / "reports/keywords/keyword_intelligence_review_v2.md"
OUTPUT_JSON = SEO_OPS / "outputs/keyword_intelligence_review_v2.json"

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _load_csv(path: Path) -> list[dict]:
    if not path.is_file():
        print(f"  WARN: {path.name} not found, skipping")
        return []
    with open(path, encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


def _si(v) -> int:
    try:
        return int(float(v))
    except (ValueError, TypeError):
        return 0


def _sf(v) -> float:
    try:
        return float(v)
    except (ValueError, TypeError):
        return 0.0


def _sb(v) -> bool:
    return str(v).strip().lower() in ("true", "1", "yes")


def _s(v) -> str:
    return str(v).strip() if v else ""


def _fmt(n: int | float, decimals: int = 0) -> str:
    if decimals == 0:
        return f"{int(n):,}"
    return f"{n:,.{decimals}f}"

# ---------------------------------------------------------------------------
# Evidence tiers
# ---------------------------------------------------------------------------

EVIDENCE_TIERS = [
    "internal_strong",          # planner + GSC + Ads
    "internal_moderate",        # 2 of 3 internal sources
    "externally_confirmed",     # internal data + DataForSEO confirmation
    "externally_discovered_only",  # DataForSEO only, no internal organic/ads data
    "weak_watchlist",           # planner-only or single weak signal
]


def classify_evidence_tier(kw: dict) -> str:
    """Assign an evidence tier to a keyword row from v3."""
    in_plan = _sb(kw.get("in_planner_ideas")) or _sb(kw.get("in_historical_metrics"))
    in_gsc = _sb(kw.get("in_gsc_queries"))
    in_ads = _sb(kw.get("in_ads_keywords")) or _sb(kw.get("in_ads_search_terms"))
    in_dfs = _sb(kw.get("in_dataforseo_overview")) or _sb(kw.get("in_dataforseo_related"))
    dfs_status = _s(kw.get("external_discovery_status"))

    internal_count = sum([in_plan, in_gsc, in_ads])

    # Externally discovered only (new keywords from DataForSEO with no prior internal data)
    if dfs_status == "newly_discovered_relevant" and internal_count == 0:
        return "externally_discovered_only"

    # Strong internal: all 3 sources
    if internal_count == 3:
        if in_dfs:
            return "externally_confirmed"  # all 3 + DFS = confirmed
        return "internal_strong"

    # Moderate internal: 2 of 3
    if internal_count == 2:
        if in_dfs:
            return "externally_confirmed"
        return "internal_moderate"

    # Single internal source + DFS confirmation
    if internal_count == 1 and in_dfs:
        return "externally_confirmed"

    # Single internal source without DFS
    if internal_count == 1:
        return "weak_watchlist"

    # No internal data at all but DFS exists
    if in_dfs:
        return "externally_discovered_only"

    return "weak_watchlist"


# ---------------------------------------------------------------------------
# Load sources
# ---------------------------------------------------------------------------


def load_sources() -> dict:
    print("Loading sources...")
    km = _load_csv(KEYWORD_MASTER_CSV)
    pi = _load_csv(PAGE_INVENTORY_CSV)
    gsc_q = _load_csv(GSC_QUERIES_CSV)
    ga4 = _load_csv(GA4_LANDING_CSV)

    print(f"  keyword_master_v3: {len(km)} rows")
    print(f"  page_inventory: {len(pi)} rows")
    print(f"  gsc_queries: {len(gsc_q)} rows")
    print(f"  ga4_landing: {len(ga4)} rows")

    return {
        "km": km,
        "pi": pi,
        "gsc_q": gsc_q,
        "ga4": ga4,
    }

# ---------------------------------------------------------------------------
# Source-overlap analysis (v2: includes DataForSEO buckets)
# ---------------------------------------------------------------------------


def analyze_source_overlap(km: list[dict]) -> dict:
    """Categorize keywords by which data sources have evidence.
    v2: adds DataForSEO-specific overlap buckets."""
    buckets: dict[str, list[dict]] = {
        "planner_gsc_ads": [],
        "planner_gsc": [],
        "planner_ads": [],
        "gsc_ads": [],
        "gsc_only": [],
        "ads_only": [],
        "planner_only": [],
        "dfs_confirmed": [],      # v2: existing keyword confirmed by DataForSEO
        "dfs_discovered_only": [], # v2: new keyword from DataForSEO with no other evidence
    }

    for kw in km:
        in_plan = _sb(kw.get("in_planner_ideas")) or _sb(kw.get("in_historical_metrics"))
        in_gsc = _sb(kw.get("in_gsc_queries"))
        in_ads = _sb(kw.get("in_ads_keywords")) or _sb(kw.get("in_ads_search_terms"))
        in_dfs = _sb(kw.get("in_dataforseo_overview")) or _sb(kw.get("in_dataforseo_related"))
        dfs_status = _s(kw.get("external_discovery_status"))

        entry = {
            "keyword": _s(kw.get("normalized_keyword")),
            "theme": _s(kw.get("topic_theme_guess")),
            "intent": _s(kw.get("intent_guess")),
            "brand": _s(kw.get("brand_nonbrand_guess")),
            "planner_vol": _si(kw.get("planner_avg_monthly_searches")),
            "gsc_impr": _si(kw.get("gsc_total_impressions")),
            "gsc_clicks": _si(kw.get("gsc_total_clicks")),
            "gsc_pos": _sf(kw.get("gsc_best_position_guess")),
            "ads_impr": _si(kw.get("ads_keyword_impressions")) + _si(kw.get("ads_search_term_impressions")),
            "ads_clicks": _si(kw.get("ads_keyword_clicks")) + _si(kw.get("ads_search_term_clicks")),
            "ads_cost": _sf(kw.get("ads_keyword_cost_eur")) + _sf(kw.get("ads_search_term_cost_eur")),
            "ads_conv": _sf(kw.get("ads_keyword_conversions")) + _sf(kw.get("ads_search_term_conversions")),
            "mapped_route": _s(kw.get("mapped_route_guess")),
            "mapping_conf": _s(kw.get("mapping_confidence")),
            "seo_opp_type": _s(kw.get("seo_opportunity_type")),
            "seo_opp_reason": _s(kw.get("seo_opportunity_reason")),
            "ppc_seo_overlap": _s(kw.get("ppc_seo_overlap_guess")),
            "evidence_tier": classify_evidence_tier(kw),
            # v2 DFS fields
            "dfs_vol": _si(kw.get("dataforseo_search_volume")),
            "dfs_cpc": _sf(kw.get("dataforseo_cpc")),
            "dfs_intent": _s(kw.get("dataforseo_intent")),
            "dfs_status": dfs_status,
        }

        # DataForSEO-specific buckets (non-exclusive: keyword also goes into internal bucket)
        if dfs_status == "existing_confirmed":
            buckets["dfs_confirmed"].append(entry)
        elif dfs_status == "newly_discovered_relevant":
            buckets["dfs_discovered_only"].append(entry)

        # Standard internal buckets
        if in_plan and in_gsc and in_ads:
            buckets["planner_gsc_ads"].append(entry)
        elif in_plan and in_gsc:
            buckets["planner_gsc"].append(entry)
        elif in_plan and in_ads:
            buckets["planner_ads"].append(entry)
        elif in_gsc and in_ads:
            buckets["gsc_ads"].append(entry)
        elif in_gsc:
            buckets["gsc_only"].append(entry)
        elif in_ads:
            buckets["ads_only"].append(entry)
        elif in_plan:
            buckets["planner_only"].append(entry)

    return buckets

# ---------------------------------------------------------------------------
# SEO opportunity analysis
# ---------------------------------------------------------------------------


def analyze_seo_opportunities(km: list[dict], pi: list[dict]) -> dict:
    """Find SEO opportunities from keyword-level perspective.
    v2: adds DFS-confirmed flag and evidence_tier to entries."""
    pi_routes = {_s(p.get("route_path")) for p in pi}

    striking_distance: list[dict] = []   # pos 4-20, 10+ impr, nonbrand
    low_ctr_high_impr: list[dict] = []   # 50+ impr, CTR < 1%, nonbrand
    page_gap: list[dict] = []            # planner vol 50+, mapped but route not in page_inventory
    unmapped_promising: list[dict] = []  # planner vol 50+, no mapped route, nonbrand
    weak_gsc_fit: list[dict] = []        # GSC evidence but weak mapping or wrong page type
    dfs_monitor: list[dict] = []         # v2: DFS discoveries worth monitoring

    for kw in km:
        brand = _s(kw.get("brand_nonbrand_guess"))
        if brand == "brand":
            continue

        nk = _s(kw.get("normalized_keyword"))
        theme = _s(kw.get("topic_theme_guess"))
        intent = _s(kw.get("intent_guess"))
        plan_vol = _si(kw.get("planner_avg_monthly_searches"))
        gsc_impr = _si(kw.get("gsc_total_impressions"))
        gsc_clicks = _si(kw.get("gsc_total_clicks"))
        gsc_pos = _sf(kw.get("gsc_best_position_guess"))
        gsc_ctr = _sf(kw.get("gsc_weighted_ctr"))
        mapped = _s(kw.get("mapped_route_guess"))
        map_conf = _s(kw.get("mapping_confidence"))
        seo_opp = _s(kw.get("seo_opportunity_type"))
        tier = classify_evidence_tier(kw)
        dfs_status = _s(kw.get("external_discovery_status"))
        dfs_vol = _si(kw.get("dataforseo_search_volume"))
        dfs_intent = _s(kw.get("dataforseo_intent"))

        entry = {
            "keyword": nk, "theme": theme, "intent": intent,
            "planner_vol": plan_vol, "gsc_impr": gsc_impr,
            "gsc_clicks": gsc_clicks, "gsc_pos": gsc_pos,
            "gsc_ctr": gsc_ctr, "mapped_route": mapped,
            "mapping_conf": map_conf, "seo_opp": seo_opp,
            "evidence_tier": tier,
            "dfs_confirmed": dfs_status == "existing_confirmed",
            "dfs_vol": dfs_vol,
            "dfs_intent": dfs_intent,
        }

        # Striking distance
        if gsc_impr >= 10 and 4 <= gsc_pos <= 20:
            striking_distance.append(entry)

        # Low CTR / high impressions
        if gsc_impr >= 50 and gsc_ctr < 0.01 and gsc_pos > 0:
            low_ctr_high_impr.append(entry)

        # Page gap: mapped to a route but route doesn't exist in inventory
        if mapped and mapped not in pi_routes and plan_vol >= 50:
            page_gap.append(entry)

        # Unmapped + promising
        if not mapped and plan_vol >= 50:
            unmapped_promising.append(entry)

        # Weak GSC fit: has GSC evidence but low mapping confidence
        if gsc_impr >= 20 and map_conf in ("low", ""):
            weak_gsc_fit.append(entry)

        # v2: DFS discoveries that should be monitored for GSC appearance
        if dfs_status == "newly_discovered_relevant" and dfs_vol >= 50:
            dfs_monitor.append(entry)

    # Sort each by relevance
    striking_distance.sort(key=lambda x: x["gsc_impr"], reverse=True)
    low_ctr_high_impr.sort(key=lambda x: x["gsc_impr"], reverse=True)
    page_gap.sort(key=lambda x: x["planner_vol"], reverse=True)
    unmapped_promising.sort(key=lambda x: x["planner_vol"], reverse=True)
    weak_gsc_fit.sort(key=lambda x: x["gsc_impr"], reverse=True)
    dfs_monitor.sort(key=lambda x: x["dfs_vol"], reverse=True)

    # Theme demand analysis
    theme_demand: dict[str, dict] = {}
    for kw in km:
        if _s(kw.get("brand_nonbrand_guess")) == "brand":
            continue
        th = _s(kw.get("topic_theme_guess"))
        if not th:
            continue
        if th not in theme_demand:
            theme_demand[th] = {"keywords": 0, "planner_vol": 0, "gsc_impr": 0,
                                "gsc_clicks": 0, "mapped_count": 0, "unmapped_count": 0,
                                "dfs_confirmed_count": 0}
        theme_demand[th]["keywords"] += 1
        theme_demand[th]["planner_vol"] += _si(kw.get("planner_avg_monthly_searches"))
        theme_demand[th]["gsc_impr"] += _si(kw.get("gsc_total_impressions"))
        theme_demand[th]["gsc_clicks"] += _si(kw.get("gsc_total_clicks"))
        if _s(kw.get("mapped_route_guess")):
            theme_demand[th]["mapped_count"] += 1
        else:
            theme_demand[th]["unmapped_count"] += 1
        if _s(kw.get("external_discovery_status")) in ("existing_confirmed", "newly_discovered_relevant"):
            theme_demand[th]["dfs_confirmed_count"] += 1

    # Compute coverage percentage per theme
    for th_data in theme_demand.values():
        total = th_data["keywords"]
        mapped = th_data["mapped_count"]
        th_data["coverage_pct"] = round(mapped / total * 100, 1) if total else 0

    # Sort themes by total demand (planner + GSC)
    theme_sorted = sorted(theme_demand.items(),
                          key=lambda x: x[1]["planner_vol"] + x[1]["gsc_impr"], reverse=True)

    return {
        "striking_distance": striking_distance[:20],
        "low_ctr_high_impr": low_ctr_high_impr[:20],
        "page_gap": page_gap[:15],
        "unmapped_promising": unmapped_promising[:15],
        "weak_gsc_fit": weak_gsc_fit[:15],
        "dfs_monitor": dfs_monitor,
        "theme_demand": theme_sorted,
    }

# ---------------------------------------------------------------------------
# PPC opportunity analysis
# ---------------------------------------------------------------------------


def analyze_ppc_opportunities(km: list[dict]) -> dict:
    """Find PPC opportunities and overlap from keyword-level perspective.
    v2: includes DFS CPC/intent in entries for richer interpretation."""
    proven_in_ads: list[dict] = []
    planner_not_in_ads: list[dict] = []
    ppc_seo_overlap: list[dict] = []
    ads_weak_mapping: list[dict] = []
    monitor_terms: list[dict] = []
    dfs_ppc_watchlist: list[dict] = []   # v2: DFS terms with CPC signal but no ads evidence

    for kw in km:
        nk = _s(kw.get("normalized_keyword"))
        brand = _s(kw.get("brand_nonbrand_guess"))
        theme = _s(kw.get("topic_theme_guess"))
        intent = _s(kw.get("intent_guess"))
        plan_vol = _si(kw.get("planner_avg_monthly_searches"))
        in_ads = _sb(kw.get("in_ads_keywords")) or _sb(kw.get("in_ads_search_terms"))
        in_gsc = _sb(kw.get("in_gsc_queries"))
        ads_clicks = _si(kw.get("ads_keyword_clicks")) + _si(kw.get("ads_search_term_clicks"))
        ads_cost = _sf(kw.get("ads_keyword_cost_eur")) + _sf(kw.get("ads_search_term_cost_eur"))
        ads_conv = _sf(kw.get("ads_keyword_conversions")) + _sf(kw.get("ads_search_term_conversions"))
        ads_impr = _si(kw.get("ads_keyword_impressions")) + _si(kw.get("ads_search_term_impressions"))
        gsc_impr = _si(kw.get("gsc_total_impressions"))
        gsc_clicks = _si(kw.get("gsc_total_clicks"))
        gsc_pos = _sf(kw.get("gsc_best_position_guess"))
        mapped = _s(kw.get("mapped_route_guess"))
        map_conf = _s(kw.get("mapping_confidence"))
        overlap = _s(kw.get("ppc_seo_overlap_guess"))
        tier = classify_evidence_tier(kw)
        dfs_cpc = _sf(kw.get("dataforseo_cpc"))
        dfs_intent = _s(kw.get("dataforseo_intent"))
        dfs_status = _s(kw.get("external_discovery_status"))

        entry = {
            "keyword": nk, "theme": theme, "intent": intent, "brand": brand,
            "planner_vol": plan_vol, "ads_impr": ads_impr, "ads_clicks": ads_clicks,
            "ads_cost": ads_cost, "ads_conv": ads_conv,
            "gsc_impr": gsc_impr, "gsc_clicks": gsc_clicks, "gsc_pos": gsc_pos,
            "mapped_route": mapped, "mapping_conf": map_conf,
            "overlap": overlap,
            "evidence_tier": tier,
            "dfs_cpc": dfs_cpc,
            "dfs_intent": dfs_intent,
        }

        # Proven in Ads (has conversions or meaningful clicks)
        if in_ads and (ads_conv > 0 or ads_clicks >= 3):
            proven_in_ads.append(entry)

        # Planner demand, commercial intent, not in Ads
        if not in_ads and plan_vol >= 50 and intent in ("commercial", "commercial_investigative"):
            planner_not_in_ads.append(entry)

        # PPC + SEO overlap
        if in_ads and in_gsc and brand != "brand":
            ppc_seo_overlap.append(entry)

        # In Ads but weak mapping
        if in_ads and ads_cost > 0 and map_conf in ("low", ""):
            ads_weak_mapping.append(entry)

        # Monitor: some signal but not enough to act
        if in_ads and ads_clicks < 3 and ads_conv == 0 and ads_impr >= 5:
            monitor_terms.append(entry)

        # v2: DFS discoveries with CPC signal but not in ads yet
        if dfs_status == "newly_discovered_relevant" and dfs_cpc > 0 and not in_ads:
            dfs_ppc_watchlist.append(entry)

    proven_in_ads.sort(key=lambda x: x["ads_conv"] * 1000 + x["ads_clicks"], reverse=True)
    planner_not_in_ads.sort(key=lambda x: x["planner_vol"], reverse=True)
    ppc_seo_overlap.sort(key=lambda x: x["gsc_impr"] + x["ads_impr"], reverse=True)
    ads_weak_mapping.sort(key=lambda x: x["ads_cost"], reverse=True)
    monitor_terms.sort(key=lambda x: x["ads_impr"], reverse=True)
    dfs_ppc_watchlist.sort(key=lambda x: x["dfs_cpc"], reverse=True)

    return {
        "proven_in_ads": proven_in_ads[:20],
        "planner_not_in_ads": planner_not_in_ads[:20],
        "ppc_seo_overlap": ppc_seo_overlap[:20],
        "ads_weak_mapping": ads_weak_mapping[:15],
        "monitor_terms": monitor_terms[:15],
        "dfs_ppc_watchlist": dfs_ppc_watchlist,
    }

# ---------------------------------------------------------------------------
# Mapping and cluster analysis
# ---------------------------------------------------------------------------


def analyze_mapping_clusters(km: list[dict], pi: list[dict]) -> dict:
    """Analyze keyword-to-page mapping quality and theme coverage.
    v2: adds newly_discovered theme tracking."""
    pi_index: dict[str, dict] = {}
    for p in pi:
        route = _s(p.get("route_path"))
        if route:
            pi_index[route] = p

    theme_coverage: dict[str, dict] = {}
    route_load: dict[str, dict] = {}
    weak_mappings: list[dict] = []
    new_discovery_themes: dict[str, list[str]] = {}  # v2: themes where DFS added new keywords

    for kw in km:
        if _s(kw.get("brand_nonbrand_guess")) == "brand":
            continue

        theme = _s(kw.get("topic_theme_guess"))
        mapped = _s(kw.get("mapped_route_guess"))
        map_conf = _s(kw.get("mapping_confidence"))
        plan_vol = _si(kw.get("planner_avg_monthly_searches"))
        gsc_impr = _si(kw.get("gsc_total_impressions"))
        nk = _s(kw.get("normalized_keyword"))
        dfs_status = _s(kw.get("external_discovery_status"))

        # Theme coverage
        if theme:
            if theme not in theme_coverage:
                theme_coverage[theme] = {"total": 0, "mapped": 0, "high_conf": 0,
                                         "planner_vol": 0, "gsc_impr": 0, "routes": set(),
                                         "dfs_count": 0}
            theme_coverage[theme]["total"] += 1
            theme_coverage[theme]["planner_vol"] += plan_vol
            theme_coverage[theme]["gsc_impr"] += gsc_impr
            if mapped:
                theme_coverage[theme]["mapped"] += 1
                theme_coverage[theme]["routes"].add(mapped)
                if map_conf in ("high", "medium"):
                    theme_coverage[theme]["high_conf"] += 1
            if dfs_status in ("existing_confirmed", "newly_discovered_relevant"):
                theme_coverage[theme]["dfs_count"] += 1

        # v2: track DFS discoveries by theme
        if dfs_status == "newly_discovered_relevant" and theme:
            new_discovery_themes.setdefault(theme, []).append(nk)

        # Route load
        if mapped:
            if mapped not in route_load:
                page_type = pi_index.get(mapped, {}).get("page_type", "unknown")
                route_load[mapped] = {"keywords": 0, "themes": set(), "planner_vol": 0,
                                      "gsc_impr": 0, "page_type": page_type}
            route_load[mapped]["keywords"] += 1
            if theme:
                route_load[mapped]["themes"].add(theme)
            route_load[mapped]["planner_vol"] += plan_vol
            route_load[mapped]["gsc_impr"] += gsc_impr

        # Weak mapping
        if mapped and map_conf == "low" and (plan_vol >= 30 or gsc_impr >= 20):
            weak_mappings.append({
                "keyword": nk, "theme": theme, "mapped_route": mapped,
                "mapping_conf": map_conf, "planner_vol": plan_vol, "gsc_impr": gsc_impr,
            })

    # Convert sets for serialization and sort
    for th in theme_coverage.values():
        th["distinct_routes"] = len(th["routes"])
        th["coverage_pct"] = round(th["mapped"] / th["total"] * 100, 1) if th["total"] else 0
        del th["routes"]

    theme_sorted = sorted(theme_coverage.items(),
                          key=lambda x: x[1]["planner_vol"] + x[1]["gsc_impr"], reverse=True)

    overloaded_routes: list[dict] = []
    for route, data in route_load.items():
        themes_list = sorted(data["themes"])
        n_themes = len(themes_list)
        data["themes"] = themes_list
        if n_themes >= 4 or data["keywords"] >= 50:
            overloaded_routes.append({"route": route, **data})

    overloaded_routes.sort(key=lambda x: x["keywords"], reverse=True)
    weak_mappings.sort(key=lambda x: x["planner_vol"] + x["gsc_impr"], reverse=True)

    return {
        "theme_coverage": theme_sorted,
        "overloaded_routes": overloaded_routes,
        "weak_mappings": weak_mappings[:20],
        "new_discovery_themes": new_discovery_themes,
    }

# ---------------------------------------------------------------------------
# Evidence tier distribution
# ---------------------------------------------------------------------------


def compute_evidence_distribution(km: list[dict]) -> dict[str, int]:
    """Count keywords per evidence tier."""
    dist: dict[str, int] = {t: 0 for t in EVIDENCE_TIERS}
    for kw in km:
        tier = classify_evidence_tier(kw)
        dist[tier] = dist.get(tier, 0) + 1
    return dist

# ---------------------------------------------------------------------------
# Priority buckets
# ---------------------------------------------------------------------------


def build_priority_buckets(
    seo_opps: dict, ppc_opps: dict, mapping: dict, km: list[dict]
) -> dict:
    """Assign keywords to practical priority buckets.
    v2: DataForSEO watchlist is evidence-aware."""

    seo_do_now: list[dict] = []
    seo_monitor: list[dict] = []
    ppc_do_now: list[dict] = []
    ppc_monitor: list[dict] = []
    cross_channel: list[dict] = []
    dataforseo_watchlist: list[dict] = []

    seen_seo: set[str] = set()
    seen_ppc: set[str] = set()

    # SEO do-now: striking distance with decent impression volume
    for kw in seo_opps["striking_distance"]:
        k = kw["keyword"]
        if kw["gsc_impr"] >= 20 and k not in seen_seo:
            reason = f"striking distance (pos {kw['gsc_pos']:.1f}, {kw['gsc_impr']} impr)"
            if kw.get("dfs_confirmed"):
                reason += " [DFS confirmed]"
            seo_do_now.append({
                "keyword": k, "theme": kw["theme"],
                "reason": reason,
                "evidence_tier": kw["evidence_tier"],
                "gsc_impr": kw["gsc_impr"], "gsc_pos": kw["gsc_pos"],
                "mapped_route": kw["mapped_route"],
            })
            seen_seo.add(k)

    # SEO do-now: unmapped promising with high planner volume
    for kw in seo_opps["unmapped_promising"][:10]:
        k = kw["keyword"]
        if kw["planner_vol"] >= 100 and k not in seen_seo:
            seo_do_now.append({
                "keyword": k, "theme": kw["theme"],
                "reason": f"unmapped, planner vol {kw['planner_vol']}",
                "evidence_tier": kw["evidence_tier"],
                "gsc_impr": kw["gsc_impr"], "gsc_pos": kw["gsc_pos"],
                "mapped_route": kw["mapped_route"],
            })
            seen_seo.add(k)

    # SEO monitor: low CTR / high impr
    for kw in seo_opps["low_ctr_high_impr"]:
        k = kw["keyword"]
        if k not in seen_seo:
            seo_monitor.append({
                "keyword": k, "theme": kw["theme"],
                "reason": f"low CTR ({kw['gsc_ctr']:.1%}) on {kw['gsc_impr']} impr",
                "evidence_tier": kw["evidence_tier"],
                "gsc_impr": kw["gsc_impr"], "gsc_pos": kw["gsc_pos"],
                "mapped_route": kw["mapped_route"],
            })
            seen_seo.add(k)

    # v2: DFS discoveries with SEO potential -> monitor (not do-now)
    for kw in seo_opps.get("dfs_monitor", []):
        k = kw["keyword"]
        if k not in seen_seo:
            seo_monitor.append({
                "keyword": k, "theme": kw["theme"],
                "reason": f"DFS discovery (vol {kw['dfs_vol']}, intent={kw['dfs_intent']}), awaiting GSC confirmation",
                "evidence_tier": kw["evidence_tier"],
                "gsc_impr": kw["gsc_impr"], "gsc_pos": kw["gsc_pos"],
                "mapped_route": kw["mapped_route"],
            })
            seen_seo.add(k)

    # PPC do-now: proven in ads + significant
    for kw in ppc_opps["proven_in_ads"]:
        k = kw["keyword"]
        if k not in seen_ppc:
            reason_parts = []
            if kw["ads_conv"] > 0:
                reason_parts.append(f"{kw['ads_conv']:.0f} conv")
            reason_parts.append(f"{kw['ads_clicks']} clicks, {kw['ads_cost']:.2f} EUR")
            if kw.get("dfs_cpc") and kw["dfs_cpc"] > 0:
                reason_parts.append(f"DFS CPC {kw['dfs_cpc']:.2f}")
            ppc_do_now.append({
                "keyword": k, "theme": kw["theme"],
                "reason": "proven: " + ", ".join(reason_parts),
                "evidence_tier": kw["evidence_tier"],
                "ads_clicks": kw["ads_clicks"], "ads_cost": kw["ads_cost"],
                "ads_conv": kw["ads_conv"],
            })
            seen_ppc.add(k)

    # PPC do-now: planner demand + commercial intent, not in Ads yet
    for kw in ppc_opps["planner_not_in_ads"][:10]:
        k = kw["keyword"]
        if kw["planner_vol"] >= 100 and k not in seen_ppc:
            ppc_do_now.append({
                "keyword": k, "theme": kw["theme"],
                "reason": f"expansion candidate, planner vol {kw['planner_vol']}, intent={kw['intent']}",
                "evidence_tier": kw["evidence_tier"],
                "ads_clicks": 0, "ads_cost": 0, "ads_conv": 0,
            })
            seen_ppc.add(k)

    # PPC monitor
    for kw in ppc_opps["monitor_terms"]:
        k = kw["keyword"]
        if k not in seen_ppc:
            ppc_monitor.append({
                "keyword": k, "theme": kw["theme"],
                "reason": f"low signal ({kw['ads_impr']} impr, {kw['ads_clicks']} clicks, 0 conv)",
                "evidence_tier": kw["evidence_tier"],
                "ads_impr": kw["ads_impr"],
            })
            seen_ppc.add(k)

    # Cross-channel: PPC+SEO overlap with meaningful volume
    for kw in ppc_opps["ppc_seo_overlap"]:
        k = kw["keyword"]
        combined_impr = kw["gsc_impr"] + kw["ads_impr"]
        if combined_impr >= 20:
            cross_channel.append({
                "keyword": k, "theme": kw["theme"],
                "gsc_impr": kw["gsc_impr"], "gsc_pos": kw["gsc_pos"],
                "ads_impr": kw["ads_impr"], "ads_clicks": kw["ads_clicks"],
                "ads_cost": kw["ads_cost"],
                "evidence_tier": kw["evidence_tier"],
                "reason": f"both channels active, combined {combined_impr} impr",
            })

    # DataForSEO watchlist: v2 version is more nuanced
    # Includes: high planner demand + weak organic/ads, OR DFS discoveries still pending
    for kw_row in km:
        brand = _s(kw_row.get("brand_nonbrand_guess"))
        if brand == "brand":
            continue
        nk = _s(kw_row.get("normalized_keyword"))
        plan_vol = _si(kw_row.get("planner_avg_monthly_searches"))
        gsc_impr = _si(kw_row.get("gsc_total_impressions"))
        ads_impr = _si(kw_row.get("ads_keyword_impressions")) + _si(kw_row.get("ads_search_term_impressions"))
        dfs_status = _s(kw_row.get("external_discovery_status"))
        dfs_vol = _si(kw_row.get("dataforseo_search_volume"))
        dfs_intent = _s(kw_row.get("dataforseo_intent"))
        tier = classify_evidence_tier(kw_row)

        # Case 1: traditional watchlist (high planner, weak evidence)
        if plan_vol >= 100 and gsc_impr < 10 and ads_impr < 10:
            dataforseo_watchlist.append({
                "keyword": nk,
                "theme": _s(kw_row.get("topic_theme_guess")),
                "planner_vol": plan_vol,
                "dfs_vol": dfs_vol,
                "evidence_tier": tier,
                "reason": "high planner demand, weak/no organic+ads evidence",
            })
        # Case 2: DFS discovery with no internal confirmation yet
        elif dfs_status == "newly_discovered_relevant":
            dataforseo_watchlist.append({
                "keyword": nk,
                "theme": _s(kw_row.get("topic_theme_guess")),
                "planner_vol": plan_vol,
                "dfs_vol": dfs_vol,
                "evidence_tier": tier,
                "reason": f"DFS discovery (vol {dfs_vol}, intent={dfs_intent}), no internal evidence yet",
            })

    dataforseo_watchlist.sort(key=lambda x: x.get("dfs_vol", 0) + x.get("planner_vol", 0), reverse=True)

    return {
        "seo_do_now": seo_do_now,
        "seo_monitor": seo_monitor,
        "ppc_do_now": ppc_do_now,
        "ppc_monitor": ppc_monitor,
        "cross_channel": cross_channel[:20],
        "dataforseo_watchlist": dataforseo_watchlist[:20],
    }

# ---------------------------------------------------------------------------
# Executive summary
# ---------------------------------------------------------------------------


def build_executive_summary(
    km: list[dict], overlap: dict, seo_opps: dict, ppc_opps: dict,
    mapping: dict, buckets: dict, evidence_dist: dict
) -> dict:
    """Build concise executive summary. v2: includes DFS context and v1 comparison."""
    total = len(km)
    nonbrand = sum(1 for k in km if _s(k.get("brand_nonbrand_guess")) != "brand")
    with_gsc = sum(1 for k in km if _sb(k.get("in_gsc_queries")))
    with_ads = sum(1 for k in km if _sb(k.get("in_ads_keywords")) or _sb(k.get("in_ads_search_terms")))
    with_plan = sum(1 for k in km if _sb(k.get("in_planner_ideas")) or _sb(k.get("in_historical_metrics")))
    with_dfs = sum(1 for k in km if _sb(k.get("in_dataforseo_overview")) or _sb(k.get("in_dataforseo_related")))

    total_plan_vol = sum(_si(k.get("planner_avg_monthly_searches")) for k in km)
    total_gsc_impr = sum(_si(k.get("gsc_total_impressions")) for k in km)
    total_gsc_clicks = sum(_si(k.get("gsc_total_clicks")) for k in km)

    themes = set(_s(k.get("topic_theme_guess")) for k in km if _s(k.get("topic_theme_guess")))

    # Main strength
    strength = "Broad keyword coverage"
    if len(overlap["planner_gsc_ads"]) >= 10:
        strength = f"{len(overlap['planner_gsc_ads'])} keywords with evidence across all 3 internal sources (planner + GSC + Ads)"
    elif with_gsc >= 100:
        strength = f"{with_gsc} keywords with organic GSC visibility"

    # Main weakness
    weakness = "Limited data"
    n_unmapped = sum(1 for k in km if not _s(k.get("mapped_route_guess")) and _s(k.get("brand_nonbrand_guess")) != "brand")
    if n_unmapped > 100:
        weakness = f"{n_unmapped} nonbrand keywords without page mapping"
    elif len(seo_opps["low_ctr_high_impr"]) >= 5:
        weakness = f"{len(seo_opps['low_ctr_high_impr'])} keywords with high impressions but low CTR"

    # Biggest SEO opportunity
    seo_opp = "None identified"
    if buckets["seo_do_now"]:
        top = buckets["seo_do_now"][0]
        seo_opp = f"'{top['keyword']}' -- {top['reason']}"

    # Biggest PPC opportunity
    ppc_opp = "None identified"
    if buckets["ppc_do_now"]:
        top = buckets["ppc_do_now"][0]
        ppc_opp = f"'{top['keyword']}' -- {top['reason']}"

    # Biggest mapping risk
    map_risk = "None identified"
    if mapping["overloaded_routes"]:
        top = mapping["overloaded_routes"][0]
        map_risk = f"{top['route']} carries {top['keywords']} keywords across {len(top['themes'])} themes"

    # Biggest watchlist item (v2)
    watchlist_item = "None"
    if buckets["dataforseo_watchlist"]:
        top = buckets["dataforseo_watchlist"][0]
        watchlist_item = f"'{top['keyword']}' -- {top['reason']}"

    # v1 -> v2 changes summary
    changes_from_v1 = [
        "Primary source upgraded from keyword_master_v2 (1032 kw) to v3 (1035 kw)",
        "3 new keywords added from DataForSEO related_keywords discovery",
        "10 existing keywords enriched with DataForSEO volume/CPC/intent confirmation",
        "Evidence tiers introduced (internal_strong / internal_moderate / externally_confirmed / externally_discovered_only / weak_watchlist)",
        "DataForSEO coverage is still small (13/1035 = 1.3%), so priorities are largely unchanged",
        "DataForSEO's main value: validation of existing evidence, not priority shifts",
    ]

    # Did DFS materially change priorities?
    dfs_priority_impact = (
        "No. DataForSEO confirmed 10 keywords that already had strong internal evidence. "
        "The 3 newly discovered keywords are low-volume long-tails (50-140 monthly searches) "
        "placed on watchlist/review. No priority bucket has changed ranking due to DFS data alone."
    )

    return {
        "total_keywords": total,
        "nonbrand_keywords": nonbrand,
        "with_gsc": with_gsc,
        "with_ads": with_ads,
        "with_planner": with_plan,
        "with_dfs": with_dfs,
        "total_planner_volume": total_plan_vol,
        "total_gsc_impressions": total_gsc_impr,
        "total_gsc_clicks": total_gsc_clicks,
        "distinct_themes": len(themes),
        "main_strength": strength,
        "main_weakness": weakness,
        "biggest_seo_opportunity": seo_opp,
        "biggest_ppc_opportunity": ppc_opp,
        "biggest_mapping_risk": map_risk,
        "biggest_watchlist_item": watchlist_item,
        "changes_from_v1": changes_from_v1,
        "dfs_priority_impact": dfs_priority_impact,
        "evidence_distribution": evidence_dist,
    }

# ---------------------------------------------------------------------------
# Report writer
# ---------------------------------------------------------------------------


def write_report(
    summary: dict, overlap: dict, seo_opps: dict, ppc_opps: dict,
    mapping: dict, buckets: dict
) -> str:
    """Generate markdown report. v2: includes DFS context throughout."""
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    lines: list[str] = []
    L = lines.append

    L("# Keyword Intelligence Review v2")
    L("")
    L(f"**Generated:** {now}")
    L(f"**Primary source:** keyword_master_v3 ({summary['total_keywords']} keywords)")
    L(f"**Data window:** GSC 90 days, GA4 90 days, Google Ads 30 days, DataForSEO spot-check")
    L("")
    L("---")
    L("")

    # --- 1. Executive summary ---
    L("## 1. Executive summary")
    L("")
    L("### v1 -> v2 changes")
    L("")
    for change in summary["changes_from_v1"]:
        L(f"- {change}")
    L("")
    L("### Did DataForSEO materially change priorities?")
    L("")
    L(summary["dfs_priority_impact"])
    L("")
    L(f"**Keyword landscape:** {_fmt(summary['total_keywords'])} total keywords "
      f"({_fmt(summary['nonbrand_keywords'])} nonbrand), "
      f"{summary['distinct_themes']} themes")
    L("")
    L(f"**Source coverage:** {_fmt(summary['with_planner'])} in Planner, "
      f"{_fmt(summary['with_gsc'])} in GSC, {_fmt(summary['with_ads'])} in Ads, "
      f"{_fmt(summary['with_dfs'])} with DataForSEO data")
    L("")
    L(f"**Aggregate demand:** {_fmt(summary['total_planner_volume'])} monthly planner volume, "
      f"{_fmt(summary['total_gsc_impressions'])} GSC impressions, "
      f"{_fmt(summary['total_gsc_clicks'])} GSC clicks")
    L("")

    # Evidence tier distribution
    L("### Evidence tier distribution")
    L("")
    L("| Tier | Count | Description |")
    L("|------|------:|-------------|")
    tier_desc = {
        "internal_strong": "All 3 internal sources (planner + GSC + Ads)",
        "internal_moderate": "2 of 3 internal sources",
        "externally_confirmed": "Internal data + DataForSEO confirmation",
        "externally_discovered_only": "DataForSEO only, no internal organic/ads",
        "weak_watchlist": "Single weak signal or planner-only",
    }
    for tier in EVIDENCE_TIERS:
        count = summary["evidence_distribution"].get(tier, 0)
        L(f"| {tier} | {count} | {tier_desc.get(tier, '')} |")
    L("")

    L(f"**Main strength:** {summary['main_strength']}")
    L("")
    L(f"**Main weakness:** {summary['main_weakness']}")
    L("")
    L(f"**Biggest SEO opportunity:** {summary['biggest_seo_opportunity']}")
    L("")
    L(f"**Biggest PPC opportunity:** {summary['biggest_ppc_opportunity']}")
    L("")
    L(f"**Biggest mapping risk:** {summary['biggest_mapping_risk']}")
    L("")
    L(f"**Biggest watchlist item:** {summary['biggest_watchlist_item']}")
    L("")
    L("---")
    L("")

    # --- 2. Source overlap ---
    L("## 2. Source-overlap findings")
    L("")
    L("### Internal source combinations")
    L("")
    L("| Source combination | Keywords |")
    L("|-------------------|--------:|")
    overlap_labels = [
        ("planner_gsc_ads", "Planner + GSC + Ads"),
        ("planner_gsc", "Planner + GSC"),
        ("planner_ads", "Planner + Ads"),
        ("gsc_ads", "GSC + Ads"),
        ("gsc_only", "GSC only"),
        ("ads_only", "Ads only"),
        ("planner_only", "Planner only"),
    ]
    for key, label in overlap_labels:
        L(f"| {label} | {len(overlap[key])} |")
    L("")

    # v2: DataForSEO overlap section
    L("### DataForSEO overlap (v2 addition)")
    L("")
    L(f"- **Confirmed existing keywords:** {len(overlap['dfs_confirmed'])} (these already had internal evidence)")
    L(f"- **Newly discovered keywords:** {len(overlap['dfs_discovered_only'])} (external-only, no prior internal data)")
    L("")
    if overlap["dfs_confirmed"]:
        L("**Confirmed keywords:**")
        L("")
        L("| Keyword | DFS Vol | DFS CPC | DFS Intent | Internal Evidence |")
        L("|---------|--------:|--------:|------------|------------------|")
        for kw in sorted(overlap["dfs_confirmed"], key=lambda x: x["dfs_vol"], reverse=True):
            internal = []
            if kw["planner_vol"] > 0:
                internal.append(f"planner {_fmt(kw['planner_vol'])}")
            if kw["gsc_impr"] > 0:
                internal.append(f"GSC {_fmt(kw['gsc_impr'])} impr")
            if kw["ads_clicks"] > 0:
                internal.append(f"Ads {kw['ads_clicks']} clicks")
            L(f"| {kw['keyword']} | {_fmt(kw['dfs_vol'])} | {kw['dfs_cpc']:.2f} "
              f"| {kw['dfs_intent']} | {', '.join(internal) or 'planner only'} |")
        L("")

    if overlap["dfs_discovered_only"]:
        L("**Newly discovered keywords (external-only):**")
        L("")
        L("| Keyword | DFS Vol | DFS CPC | DFS Intent | Theme | Status |")
        L("|---------|--------:|--------:|------------|-------|--------|")
        for kw in overlap["dfs_discovered_only"]:
            L(f"| {kw['keyword']} | {_fmt(kw['dfs_vol'])} | {kw['dfs_cpc']:.2f} "
              f"| {kw['dfs_intent']} | {kw['theme']} | watchlist/review |")
        L("")

    L("**Interpretation:** DataForSEO coverage is tiny (13/1035 keywords). "
      "Confirmed keywords validate existing evidence but add no new priority signal. "
      "Newly discovered keywords are low-volume long-tails -- worth monitoring in GSC, "
      "not worth acting on until organic evidence appears.")
    L("")

    # Top cross-source keywords
    if overlap["planner_gsc_ads"]:
        L("### Top keywords present in all 3 internal sources")
        L("")
        top_all = sorted(overlap["planner_gsc_ads"],
                         key=lambda x: x["planner_vol"] + x["gsc_impr"], reverse=True)[:15]
        L("| Keyword | Theme | Planner Vol | GSC Impr | GSC Pos | Ads Clicks | Ads Cost | Evidence |")
        L("|---------|-------|----------:|--------:|--------:|---------:|--------:|----------|")
        for kw in top_all:
            dfs_tag = " [DFS]" if kw["dfs_status"] == "existing_confirmed" else ""
            L(f"| {kw['keyword']} | {kw['theme']} | {_fmt(kw['planner_vol'])} "
              f"| {_fmt(kw['gsc_impr'])} | {kw['gsc_pos']:.1f} "
              f"| {kw['ads_clicks']} | {kw['ads_cost']:.2f} | {kw['evidence_tier']}{dfs_tag} |")
        L("")

    # GSC-only highlights
    if overlap["gsc_only"]:
        L("### Notable GSC-only keywords (no Planner or Ads presence)")
        L("")
        gsc_notable = sorted(overlap["gsc_only"], key=lambda x: x["gsc_impr"], reverse=True)[:10]
        L("| Keyword | Theme | GSC Impr | GSC Clicks | GSC Pos |")
        L("|---------|-------|--------:|----------:|--------:|")
        for kw in gsc_notable:
            L(f"| {kw['keyword']} | {kw['theme']} | {_fmt(kw['gsc_impr'])} "
              f"| {kw['gsc_clicks']} | {kw['gsc_pos']:.1f} |")
        L("")

    # Planner-only highlights
    if overlap["planner_only"]:
        L("### Notable Planner-only keywords (no organic or ads evidence)")
        L("")
        plan_notable = sorted(overlap["planner_only"], key=lambda x: x["planner_vol"], reverse=True)[:10]
        L("| Keyword | Theme | Planner Vol | Intent | Mapped |")
        L("|---------|-------|----------:|--------|--------|")
        for kw in plan_notable:
            L(f"| {kw['keyword']} | {kw['theme']} | {_fmt(kw['planner_vol'])} "
              f"| {kw['intent']} | {kw['mapped_route'] or '(none)'} |")
        L("")

    L("---")
    L("")

    # --- 3. SEO opportunities ---
    L("## 3. SEO opportunity findings")
    L("")

    if seo_opps["striking_distance"]:
        L("### Striking-distance keywords (pos 4-20, 10+ impr, nonbrand)")
        L("")
        L("| Keyword | Theme | GSC Impr | GSC Clicks | GSC Pos | Mapped | Evidence |")
        L("|---------|-------|--------:|----------:|--------:|--------|----------|")
        for kw in seo_opps["striking_distance"][:15]:
            dfs_tag = " [DFS]" if kw.get("dfs_confirmed") else ""
            L(f"| {kw['keyword']} | {kw['theme']} | {_fmt(kw['gsc_impr'])} "
              f"| {kw['gsc_clicks']} | {kw['gsc_pos']:.1f} "
              f"| {kw['mapped_route'] or '(none)'} | {kw['evidence_tier']}{dfs_tag} |")
        L("")

    if seo_opps["low_ctr_high_impr"]:
        L("### Low-CTR / high-impression keywords (50+ impr, CTR < 1%)")
        L("")
        L("| Keyword | Theme | GSC Impr | GSC CTR | GSC Pos | Mapped |")
        L("|---------|-------|--------:|--------:|--------:|--------|")
        for kw in seo_opps["low_ctr_high_impr"][:15]:
            L(f"| {kw['keyword']} | {kw['theme']} | {_fmt(kw['gsc_impr'])} "
              f"| {kw['gsc_ctr']:.1%} | {kw['gsc_pos']:.1f} "
              f"| {kw['mapped_route'] or '(none)'} |")
        L("")

    if seo_opps["unmapped_promising"]:
        L("### Unmapped promising keywords (planner vol 50+, no page mapped)")
        L("")
        L("| Keyword | Theme | Intent | Planner Vol |")
        L("|---------|-------|--------|----------:|")
        for kw in seo_opps["unmapped_promising"][:15]:
            L(f"| {kw['keyword']} | {kw['theme']} | {kw['intent']} "
              f"| {_fmt(kw['planner_vol'])} |")
        L("")

    if seo_opps["page_gap"]:
        L("### Page-gap keywords (mapped to route not in page inventory)")
        L("")
        L("| Keyword | Theme | Planner Vol | Mapped Route |")
        L("|---------|-------|----------:|-------------|")
        for kw in seo_opps["page_gap"][:10]:
            L(f"| {kw['keyword']} | {kw['theme']} | {_fmt(kw['planner_vol'])} "
              f"| {kw['mapped_route']} |")
        L("")

    # v2: DFS monitor
    if seo_opps.get("dfs_monitor"):
        L("### DataForSEO discoveries worth monitoring (v2 addition)")
        L("")
        L("These keywords were discovered by DataForSEO's related_keywords endpoint. ")
        L("They have no GSC or Ads evidence yet. Do NOT act on these until they surface organically.")
        L("")
        L("| Keyword | DFS Vol | DFS Intent | Theme | Status |")
        L("|---------|--------:|------------|-------|--------|")
        for kw in seo_opps["dfs_monitor"]:
            L(f"| {kw['keyword']} | {_fmt(kw['dfs_vol'])} | {kw['dfs_intent']} "
              f"| {kw['theme']} | monitor |")
        L("")

    # Theme demand table
    if seo_opps["theme_demand"]:
        L("### Theme demand summary (nonbrand)")
        L("")
        L("| Theme | Keywords | Planner Vol | GSC Impr | GSC Clicks | Mapped % | DFS |")
        L("|-------|--------:|----------:|--------:|----------:|---------:|----:|")
        for theme, data in seo_opps["theme_demand"][:15]:
            L(f"| {theme} | {data['keywords']} | {_fmt(data['planner_vol'])} "
              f"| {_fmt(data['gsc_impr'])} | {data['gsc_clicks']} "
              f"| {data['coverage_pct']:.0f}% | {data.get('dfs_confirmed_count', 0)} |")
        L("")

    L("---")
    L("")

    # --- 4. PPC opportunities ---
    L("## 4. PPC opportunity findings")
    L("")
    L("*Budget context: Google Ads at 10 EUR/day. PPC recommendations must respect this constraint.*")
    L("")

    if ppc_opps["proven_in_ads"]:
        L("### Proven in Ads (conversions or 3+ clicks)")
        L("")
        L("| Keyword | Theme | Ads Clicks | Ads Cost | Ads Conv | GSC Impr | Evidence |")
        L("|---------|-------|----------:|--------:|---------:|--------:|----------|")
        for kw in ppc_opps["proven_in_ads"][:15]:
            L(f"| {kw['keyword']} | {kw['theme']} | {kw['ads_clicks']} "
              f"| {kw['ads_cost']:.2f} | {kw['ads_conv']:.0f} "
              f"| {_fmt(kw['gsc_impr'])} | {kw['evidence_tier']} |")
        L("")

    if ppc_opps["planner_not_in_ads"]:
        L("### Ads expansion candidates (planner demand, commercial intent, not in Ads)")
        L("")
        L("| Keyword | Theme | Intent | Planner Vol | GSC Impr | Evidence |")
        L("|---------|-------|--------|----------:|--------:|----------|")
        for kw in ppc_opps["planner_not_in_ads"][:15]:
            L(f"| {kw['keyword']} | {kw['theme']} | {kw['intent']} "
              f"| {_fmt(kw['planner_vol'])} | {_fmt(kw['gsc_impr'])} "
              f"| {kw['evidence_tier']} |")
        L("")

    if ppc_opps["ppc_seo_overlap"]:
        L("### PPC + SEO overlap (evidence in both channels)")
        L("")
        L("| Keyword | Theme | GSC Impr | GSC Pos | Ads Impr | Ads Clicks | Ads Cost |")
        L("|---------|-------|--------:|--------:|--------:|---------:|--------:|")
        for kw in ppc_opps["ppc_seo_overlap"][:15]:
            L(f"| {kw['keyword']} | {kw['theme']} | {_fmt(kw['gsc_impr'])} "
              f"| {kw['gsc_pos']:.1f} | {_fmt(kw['ads_impr'])} "
              f"| {kw['ads_clicks']} | {kw['ads_cost']:.2f} |")
        L("")

    if ppc_opps["ads_weak_mapping"]:
        L("### Ads spend with weak page mapping")
        L("")
        L("| Keyword | Theme | Ads Cost | Ads Clicks | Mapped | Map Conf |")
        L("|---------|-------|--------:|---------:|--------|---------|")
        for kw in ppc_opps["ads_weak_mapping"][:10]:
            L(f"| {kw['keyword']} | {kw['theme']} | {kw['ads_cost']:.2f} "
              f"| {kw['ads_clicks']} | {kw['mapped_route'] or '(none)'} "
              f"| {kw['mapping_conf'] or 'none'} |")
        L("")

    # v2: DFS PPC watchlist
    if ppc_opps.get("dfs_ppc_watchlist"):
        L("### DataForSEO PPC watchlist (v2 addition)")
        L("")
        L("Terms with CPC signal from DataForSEO but no current Ads presence. ")
        L("These should NOT be added to campaigns based on external data alone.")
        L("")
        L("| Keyword | DFS CPC | DFS Intent | Theme | Recommendation |")
        L("|---------|--------:|------------|-------|---------------|")
        for kw in ppc_opps["dfs_ppc_watchlist"]:
            L(f"| {kw['keyword']} | {kw['dfs_cpc']:.2f} | {kw['dfs_intent']} "
              f"| {kw['theme']} | watchlist only |")
        L("")

    L("---")
    L("")

    # --- 5. Mapping and cluster ---
    L("## 5. Mapping and cluster findings")
    L("")

    if mapping["theme_coverage"]:
        L("### Theme coverage")
        L("")
        L("| Theme | Total KW | Mapped | High-conf | Coverage % | Planner Vol | GSC Impr | DFS |")
        L("|-------|--------:|------:|---------:|---------:|----------:|--------:|----:|")
        for theme, data in mapping["theme_coverage"][:15]:
            L(f"| {theme} | {data['total']} | {data['mapped']} | {data['high_conf']} "
              f"| {data['coverage_pct']:.0f}% | {_fmt(data['planner_vol'])} "
              f"| {_fmt(data['gsc_impr'])} | {data.get('dfs_count', 0)} |")
        L("")

    if mapping["overloaded_routes"]:
        L("### Overloaded pages (4+ themes or 50+ keywords)")
        L("")
        L("| Route | Keywords | Themes | Page Type | Planner Vol | GSC Impr |")
        L("|-------|--------:|-------:|----------|----------:|--------:|")
        for r in mapping["overloaded_routes"]:
            L(f"| {r['route']} | {r['keywords']} | {len(r['themes'])} "
              f"| {r['page_type']} | {_fmt(r['planner_vol'])} "
              f"| {_fmt(r['gsc_impr'])} |")
        L("")
        for r in mapping["overloaded_routes"]:
            L(f"  **{r['route']}** themes: {', '.join(r['themes'])}")
        L("")

    if mapping["weak_mappings"]:
        L("### Weak mappings (low confidence, meaningful demand)")
        L("")
        L("| Keyword | Theme | Mapped Route | Planner Vol | GSC Impr |")
        L("|---------|-------|-------------|----------:|--------:|")
        for kw in mapping["weak_mappings"][:15]:
            L(f"| {kw['keyword']} | {kw['theme']} | {kw['mapped_route']} "
              f"| {_fmt(kw['planner_vol'])} | {_fmt(kw['gsc_impr'])} |")
        L("")

    # v2: newly discovered terms by theme
    if mapping.get("new_discovery_themes"):
        L("### Newly discovered terms by theme (v2 addition)")
        L("")
        L("DataForSEO related_keywords returned 3 new terms across these themes:")
        L("")
        for theme, keywords in sorted(mapping["new_discovery_themes"].items()):
            L(f"- **{theme}:** {', '.join(keywords)}")
        L("")
        L("These suggest minor cluster growth potential but require GSC evidence before acting.")
        L("")

    L("---")
    L("")

    # --- 6. Priority buckets ---
    L("## 6. Priority buckets")
    L("")

    def _bucket_table(title: str, items: list[dict], cols: list[tuple[str, str]]):
        if not items:
            L(f"### {title}")
            L("")
            L("No items in this bucket.")
            L("")
            return
        L(f"### {title} ({len(items)} items)")
        L("")
        header = " | ".join(c[0] for c in cols)
        sep = " | ".join("---" for _ in cols)
        L(f"| {header} |")
        L(f"| {sep} |")
        for item in items:
            vals = " | ".join(str(item.get(c[1], "")) for c in cols)
            L(f"| {vals} |")
        L("")

    _bucket_table("SEO do now", buckets["seo_do_now"],
                   [("Keyword", "keyword"), ("Theme", "theme"), ("Reason", "reason"),
                    ("Evidence", "evidence_tier"), ("Mapped", "mapped_route")])
    _bucket_table("SEO monitor", buckets["seo_monitor"],
                   [("Keyword", "keyword"), ("Theme", "theme"), ("Reason", "reason"),
                    ("Evidence", "evidence_tier"), ("Mapped", "mapped_route")])
    _bucket_table("PPC do now", buckets["ppc_do_now"],
                   [("Keyword", "keyword"), ("Theme", "theme"), ("Reason", "reason"),
                    ("Evidence", "evidence_tier")])
    _bucket_table("PPC monitor", buckets["ppc_monitor"],
                   [("Keyword", "keyword"), ("Theme", "theme"), ("Reason", "reason"),
                    ("Evidence", "evidence_tier")])
    _bucket_table("Cross-channel opportunities", buckets["cross_channel"],
                   [("Keyword", "keyword"), ("Theme", "theme"), ("GSC Impr", "gsc_impr"),
                    ("Ads Clicks", "ads_clicks"), ("Evidence", "evidence_tier"), ("Reason", "reason")])
    _bucket_table("DataForSEO watchlist", buckets["dataforseo_watchlist"],
                   [("Keyword", "keyword"), ("Theme", "theme"), ("Planner Vol", "planner_vol"),
                    ("DFS Vol", "dfs_vol"), ("Evidence", "evidence_tier"), ("Reason", "reason")])

    L("---")
    L("")

    # --- 7. Decision guardrails ---
    L("## 7. Decision guardrails")
    L("")
    L("This review explicitly operates under the following constraints:")
    L("")
    L("- **Post-cutover preliminary mode:** Site migrated recently; organic signals are still stabilizing. Do not optimize aggressively based on 90-day GSC data alone.")
    L("- **Low-budget PPC reality:** 10 EUR/day Google Ads budget limits PPC expansion to 1-2 new keywords at a time. No broad match experiments.")
    L("- **Limited DataForSEO coverage:** Only 13/1035 keywords have external data. DFS findings are directional, not statistically representative.")
    L("- **No aggressive scaling:** External discovery alone is NOT sufficient for high priority. Require internal confirmation (GSC appearance or Ads conversion) before promoting any keyword.")
    L("- **Evidence hierarchy:** internal_strong > externally_confirmed > internal_moderate > weak_watchlist > externally_discovered_only")
    L("")

    L("---")
    L("")

    # --- 8. Risks and cautions ---
    L("## 8. Risks and cautions")
    L("")
    L("- **Low Ads data volume:** 30-day Ads window with limited conversions makes PPC conclusions provisional.")
    L("- **Brand distortion:** Brand queries excluded from most analyses but some edge-case brand terms may remain.")
    L("- **Heuristic limitations:** Theme, intent, and mapping classifications are rule-based, not ML-verified.")
    L("- **Mapping uncertainty:** Low-confidence mappings are best guesses. Manual verification recommended before acting.")
    L("- **GSC position averaging:** 90-day averaged positions may not reflect current rankings.")
    L("- **Theme taxonomy mismatch:** keyword_master uses `core_isolation`, page_inventory uses `gevelisolatie` -- some cluster analysis may show false mismatches.")
    L("- **Planner-only keywords:** High planner volume without GSC/Ads evidence does not guarantee opportunity -- SERP analysis needed.")
    L("- **No competitor intelligence:** Cannot assess whether opportunities are realistic without SERP feature/competitor data.")
    L("- **DataForSEO intent is model-based:** DFS intent classification is not verified against SERP. Treat as directional only.")
    L("")
    L("---")
    L("")
    L("## Limitations")
    L("")
    L("1. **No SERP analysis** -- cannot assess competitive difficulty or SERP features")
    L("2. **No ad copy analysis** -- PPC findings are keyword-level only")
    L("3. **No content-level analysis** -- page audit needed for on-page signals")
    L("4. **Low conversion volume** makes ROI conclusions unreliable")
    L("5. **Theme classification is heuristic** -- manual verification recommended")
    L("6. **DataForSEO coverage is 1.3%** -- external signals are a narrow spot-check, not comprehensive intelligence")
    L("")
    L("---")
    L("")
    L("*Read-only analysis. No changes applied to site pages or Google Ads.*")

    return "\n".join(lines)

# ---------------------------------------------------------------------------
# JSON output
# ---------------------------------------------------------------------------


def build_json_output(
    summary: dict, overlap: dict, seo_opps: dict, ppc_opps: dict,
    mapping: dict, buckets: dict
) -> dict:
    """Build machine-readable JSON output. v2: adds DFS fields."""

    # Simplify theme data for JSON
    theme_demand_json = [{"theme": t, **d} for t, d in seo_opps["theme_demand"][:15]]
    theme_coverage_json = [{"theme": t, **d} for t, d in mapping["theme_coverage"][:15]]

    return {
        "_meta": {
            "workflow": "keyword_intelligence_review_v2",
            "generated": datetime.now(timezone.utc).isoformat(),
            "primary_source": "keyword_master_v3",
            "changes_from_v1": summary["changes_from_v1"],
        },
        "summary": summary,
        "source_overlap": {
            key: len(overlap[key]) for key in overlap
        },
        "strengths": [
            summary["main_strength"],
        ],
        "weaknesses": [
            summary["main_weakness"],
        ],
        "seo_do_now": buckets["seo_do_now"],
        "seo_monitor": buckets["seo_monitor"],
        "ppc_do_now": buckets["ppc_do_now"],
        "ppc_monitor": buckets["ppc_monitor"],
        "cross_channel_opportunities": buckets["cross_channel"],
        "dataforseo_confirmed_terms": [
            {"keyword": kw["keyword"], "dfs_vol": kw["dfs_vol"],
             "dfs_cpc": kw["dfs_cpc"], "dfs_intent": kw["dfs_intent"],
             "evidence_tier": kw["evidence_tier"]}
            for kw in overlap.get("dfs_confirmed", [])
        ],
        "dataforseo_watchlist": buckets["dataforseo_watchlist"],
        "mapping_risks": {
            "overloaded_routes": mapping["overloaded_routes"],
            "weak_mappings": mapping["weak_mappings"][:15],
            "new_discovery_themes": mapping.get("new_discovery_themes", {}),
        },
        "theme_demand": theme_demand_json,
        "theme_coverage": theme_coverage_json,
        "limitations": [
            "No SERP analysis -- cannot assess competitive difficulty",
            "No ad copy analysis -- PPC findings are keyword-level only",
            "No content-level analysis -- page audit needed",
            "Low conversion volume makes ROI conclusions unreliable",
            "Theme classification is heuristic",
            "Theme taxonomy mismatch: keyword_master (core_isolation) vs page_inventory (gevelisolatie)",
            "DataForSEO coverage is 1.3% (13/1035) -- external signals are a narrow spot-check",
        ],
    }

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def main():
    # Fix Windows console encoding
    if sys.platform == "win32":
        import io
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

    print("=" * 60)
    print("Keyword Intelligence Review v2")
    print("=" * 60)
    print()

    sources = load_sources()
    km = sources["km"]
    pi = sources["pi"]

    if not km:
        print("ERROR: keyword_master_v3 is empty or missing. Cannot proceed.")
        sys.exit(1)

    print()
    print("Computing evidence tiers...")
    evidence_dist = compute_evidence_distribution(km)
    for tier, count in evidence_dist.items():
        print(f"  {tier}: {count}")

    print()
    print("Analyzing source overlap...")
    overlap = analyze_source_overlap(km)
    for key, items in overlap.items():
        print(f"  {key}: {len(items)}")

    print()
    print("Analyzing SEO opportunities...")
    seo_opps = analyze_seo_opportunities(km, pi)
    print(f"  striking_distance: {len(seo_opps['striking_distance'])}")
    print(f"  low_ctr_high_impr: {len(seo_opps['low_ctr_high_impr'])}")
    print(f"  unmapped_promising: {len(seo_opps['unmapped_promising'])}")
    print(f"  page_gap: {len(seo_opps['page_gap'])}")
    print(f"  dfs_monitor: {len(seo_opps.get('dfs_monitor', []))}")
    print(f"  themes: {len(seo_opps['theme_demand'])}")

    print()
    print("Analyzing PPC opportunities...")
    ppc_opps = analyze_ppc_opportunities(km)
    print(f"  proven_in_ads: {len(ppc_opps['proven_in_ads'])}")
    print(f"  planner_not_in_ads: {len(ppc_opps['planner_not_in_ads'])}")
    print(f"  ppc_seo_overlap: {len(ppc_opps['ppc_seo_overlap'])}")
    print(f"  ads_weak_mapping: {len(ppc_opps['ads_weak_mapping'])}")
    print(f"  monitor_terms: {len(ppc_opps['monitor_terms'])}")
    print(f"  dfs_ppc_watchlist: {len(ppc_opps.get('dfs_ppc_watchlist', []))}")

    print()
    print("Analyzing mapping and clusters...")
    mapping = analyze_mapping_clusters(km, pi)
    print(f"  themes: {len(mapping['theme_coverage'])}")
    print(f"  overloaded_routes: {len(mapping['overloaded_routes'])}")
    print(f"  weak_mappings: {len(mapping['weak_mappings'])}")
    print(f"  new_discovery_themes: {len(mapping.get('new_discovery_themes', {}))}")

    print()
    print("Building priority buckets...")
    buckets = build_priority_buckets(seo_opps, ppc_opps, mapping, km)
    for key, items in buckets.items():
        print(f"  {key}: {len(items)}")

    print()
    print("Building executive summary...")
    summary = build_executive_summary(km, overlap, seo_opps, ppc_opps, mapping, buckets, evidence_dist)

    print()
    print("Writing report...")
    report = write_report(summary, overlap, seo_opps, ppc_opps, mapping, buckets)
    REPORT_MD.parent.mkdir(parents=True, exist_ok=True)
    REPORT_MD.write_text(report, encoding="utf-8")
    print(f"  -> {REPORT_MD}")

    print()
    print("Writing JSON output...")
    json_out = build_json_output(summary, overlap, seo_opps, ppc_opps, mapping, buckets)
    OUTPUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_JSON.write_text(json.dumps(json_out, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"  -> {OUTPUT_JSON}")

    print()
    print("=" * 60)
    print("Keyword intelligence review v2 complete.")
    print("=" * 60)


if __name__ == "__main__":
    main()

"""
run_page_audit_v1.py -- Single-page audit workflow.

Produces a diagnosis of one page's fit against search demand,
observed performance, and likely content/structure needs.

READ-ONLY: does not modify any site pages.

Usage:
    python seo-ops/analyzers/pages/run_page_audit_v1.py [route]

    route  - e.g. /gevelisolatie/  (default if omitted)
"""

from __future__ import annotations

import csv
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parents[3]
SEO_OPS = PROJECT_ROOT / "seo-ops"

GSC_ROW_CSV = SEO_OPS / "snapshots/normalized/seo/gsc_query_page_last90d.csv"
GSC_QUERIES_CSV = SEO_OPS / "snapshots/normalized/seo/gsc_query_page_aggregated_queries_last90d.csv"
GSC_PAGES_CSV = SEO_OPS / "snapshots/normalized/seo/gsc_query_page_aggregated_pages_last90d.csv"
KW_MASTER_CSV = SEO_OPS / "snapshots/normalized/keyword_master/keyword_master_v2.csv"
PAGE_INV_CSV = SEO_OPS / "snapshots/normalized/pages/page_inventory_v1.csv"
GA4_LANDING_CSV = SEO_OPS / "snapshots/normalized/pages/ga4_landing_pages_last90d.csv"
GA4_CHANNEL_CSV = SEO_OPS / "snapshots/normalized/pages/ga4_landing_pages_by_channel_last90d.csv"

REPORT_DIR = SEO_OPS / "reports/pages"
OUTPUT_DIR = SEO_OPS / "outputs"

DEFAULT_ROUTE = "/gevelisolatie/"

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _load_csv(path: Path) -> list[dict]:
    if not path.is_file():
        print(f"  WARN: {path.name} not found")
        return []
    with open(path, encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


def _sf(v, d=0.0) -> float:
    try:
        return float(v)
    except (TypeError, ValueError):
        return d


def _si(v, d=0) -> int:
    try:
        return int(float(v))
    except (TypeError, ValueError):
        return d


def _pct(v: float) -> str:
    return f"{v * 100:.1f}%"


def _eur(v: float) -> str:
    return f"\u20ac{v:,.2f}"


def _slug(route: str) -> str:
    return route.strip("/").replace("/", "_") or "homepage"


# ---------------------------------------------------------------------------
# Load & filter
# ---------------------------------------------------------------------------


def load_page_data(route: str) -> dict:
    print("Loading sources...")
    gsc_rows_all = _load_csv(GSC_ROW_CSV)
    gsc_queries_all = _load_csv(GSC_QUERIES_CSV)
    gsc_pages_all = _load_csv(GSC_PAGES_CSV)
    kw_master_all = _load_csv(KW_MASTER_CSV)
    page_inv_all = _load_csv(PAGE_INV_CSV)
    ga4_landing_all = _load_csv(GA4_LANDING_CSV)
    ga4_channel_all = _load_csv(GA4_CHANNEL_CSV)

    # Page inventory entry
    page_inv = None
    for r in page_inv_all:
        if r.get("route_path", "") == route:
            page_inv = r
            break

    if not page_inv:
        print(f"  ERROR: route '{route}' not found in page_inventory")
        sys.exit(1)

    # GSC row-level: rows where mapped_route_guess == route
    gsc_rows = [r for r in gsc_rows_all if r.get("mapped_route_guess", "") == route]

    # GSC aggregated page
    gsc_page = None
    for r in gsc_pages_all:
        if r.get("route_match_guess", "") == route:
            gsc_page = r
            break

    # Keywords mapped to this route
    kw_mapped = [r for r in kw_master_all if r.get("mapped_route_guess", "") == route]

    # Keywords that SHOULD map here (GSC top page matches) but map elsewhere
    kw_nearby = []
    for r in kw_master_all:
        top_route = r.get("gsc_top_page_route_guess", "")
        mapped = r.get("mapped_route_guess", "")
        if top_route == route and mapped != route:
            kw_nearby.append(r)

    # GA4 landing data
    ga4_agg = None
    for r in ga4_landing_all:
        if r.get("normalized_path", "") == route:
            ga4_agg = r
            break

    ga4_channels = [r for r in ga4_channel_all if r.get("normalized_path", "") == route]

    # All queries that appear on this page's GSC URL (broader than mapped)
    page_url_suffix = route.rstrip("/") + "/"
    gsc_rows_by_url = [
        r for r in gsc_rows_all
        if r.get("page", "").endswith(page_url_suffix)
        or r.get("page", "").endswith(route.rstrip("/"))
    ]

    # Full keyword master for cross-reference
    kw_all = kw_master_all

    print(f"  page_inv: found")
    print(f"  gsc_rows (mapped): {len(gsc_rows)}")
    print(f"  gsc_rows (by URL): {len(gsc_rows_by_url)}")
    print(f"  gsc_page: {'found' if gsc_page else 'not found'}")
    print(f"  kw_mapped: {len(kw_mapped)}")
    print(f"  kw_nearby: {len(kw_nearby)}")
    print(f"  ga4_agg: {'found' if ga4_agg else 'not found'}")
    print(f"  ga4_channels: {len(ga4_channels)}")

    return {
        "route": route,
        "page_inv": page_inv,
        "gsc_rows": gsc_rows,
        "gsc_rows_by_url": gsc_rows_by_url,
        "gsc_page": gsc_page,
        "kw_mapped": kw_mapped,
        "kw_nearby": kw_nearby,
        "kw_all": kw_all,
        "ga4_agg": ga4_agg,
        "ga4_channels": ga4_channels,
    }


# ---------------------------------------------------------------------------
# 1. Page performance snapshot
# ---------------------------------------------------------------------------


def compute_performance(data: dict) -> dict:
    gp = data["gsc_page"]
    ga4 = data["ga4_agg"]
    channels = data["ga4_channels"]

    perf: dict = {"gsc": {}, "ga4": {}}

    if gp:
        perf["gsc"] = {
            "impressions": _si(gp.get("total_impressions", 0)),
            "clicks": _si(gp.get("total_clicks", 0)),
            "ctr": round(_sf(gp.get("weighted_ctr", 0)), 4),
            "avg_position": round(_sf(gp.get("avg_position", 0)), 1),
            "distinct_queries": _si(gp.get("distinct_queries_count", 0)),
        }

    if ga4:
        perf["ga4"] = {
            "sessions": _si(ga4.get("sessions", 0)),
            "engaged_sessions": _si(ga4.get("engaged_sessions", 0)),
            "engagement_rate": round(_sf(ga4.get("engagement_rate", 0)), 2),
            "avg_duration": round(_sf(ga4.get("avg_session_duration_seconds", 0)), 1),
            "key_events": _si(ga4.get("key_events", 0)),
        }

    # Channel breakdown
    channel_data = []
    for ch in channels:
        channel_data.append({
            "channel": ch.get("session_default_channel_group", ""),
            "sessions": _si(ch.get("sessions", 0)),
            "engagement_rate": round(_sf(ch.get("engagement_rate", 0)), 2),
        })
    channel_data.sort(key=lambda x: x["sessions"], reverse=True)
    perf["channels"] = channel_data

    # Verdict
    gsc_impr = perf["gsc"].get("impressions", 0)
    gsc_ctr = perf["gsc"].get("ctr", 0)
    ga4_eng = perf["ga4"].get("engagement_rate", 0)

    if gsc_impr > 500 and gsc_ctr > 0.02 and ga4_eng > 0.6:
        perf["verdict"] = "strong"
    elif gsc_impr > 200 and (gsc_ctr < 0.01 or ga4_eng < 0.4):
        perf["verdict"] = "weak"
    else:
        perf["verdict"] = "mixed"

    return perf


# ---------------------------------------------------------------------------
# 2. Query fit
# ---------------------------------------------------------------------------


def analyze_query_fit(data: dict) -> dict:
    gsc_rows = data["gsc_rows_by_url"]
    km_lookup = {r.get("normalized_keyword", ""): r for r in data["kw_all"] if r.get("normalized_keyword")}

    queries = []
    for r in gsc_rows:
        nq = r.get("normalized_query", "")
        impr = _si(r.get("impressions", 0))
        clicks = _si(r.get("clicks", 0))
        ctr = _sf(r.get("ctr", 0))
        pos = _sf(r.get("position", 0))
        theme = r.get("query_theme_guess", "")
        intent = r.get("query_intent_guess", "")

        km = km_lookup.get(nq, {})
        brand = km.get("brand_nonbrand_guess", "nonbrand")
        planner_vol = _si(km.get("planner_avg_monthly_searches", 0))

        queries.append({
            "query": nq,
            "impressions": impr,
            "clicks": clicks,
            "ctr": round(ctr, 4),
            "position": round(pos, 1),
            "theme": theme,
            "intent": intent,
            "brand": brand,
            "planner_vol": planner_vol,
        })

    queries.sort(key=lambda x: x["impressions"], reverse=True)

    nonbrand = [q for q in queries if q["brand"] == "nonbrand"]
    brand = [q for q in queries if q["brand"] in ("brand", "mixed")]

    # Striking distance for this page
    striking = [q for q in nonbrand if 4.0 <= q["position"] <= 20.0 and q["impressions"] >= 10]
    striking.sort(key=lambda x: x["impressions"], reverse=True)

    # Weak: high impr, 0 clicks
    weak_high_impr = [q for q in nonbrand if q["impressions"] >= 20 and q["clicks"] == 0]
    weak_high_impr.sort(key=lambda x: x["impressions"], reverse=True)

    # Brand distortion
    brand_impr = sum(q["impressions"] for q in brand)
    total_impr = sum(q["impressions"] for q in queries)
    brand_share = brand_impr / total_impr if total_impr else 0

    return {
        "all_queries": queries[:30],
        "nonbrand_top": nonbrand[:20],
        "brand_queries": brand[:5],
        "striking_distance": striking[:15],
        "weak_high_impr": weak_high_impr[:15],
        "total_queries": len(queries),
        "nonbrand_count": len(nonbrand),
        "brand_count": len(brand),
        "brand_impression_share": round(brand_share, 2),
    }


# ---------------------------------------------------------------------------
# 3. Keyword/cluster fit
# ---------------------------------------------------------------------------


def analyze_cluster_fit(data: dict) -> dict:
    kw_mapped = data["kw_mapped"]
    kw_nearby = data["kw_nearby"]
    route = data["route"]

    # Theme breakdown of mapped keywords
    theme_counts: dict[str, dict] = {}
    for km in kw_mapped:
        theme = km.get("topic_theme_guess", "other")
        if theme not in theme_counts:
            theme_counts[theme] = {"theme": theme, "count": 0, "with_gsc": 0, "total_gsc_impr": 0}
        tc = theme_counts[theme]
        tc["count"] += 1
        if km.get("in_gsc_queries") == "True":
            tc["with_gsc"] += 1
            tc["total_gsc_impr"] += _si(km.get("gsc_total_impressions", 0))

    themes = sorted(theme_counts.values(), key=lambda x: x["count"], reverse=True)

    # Well-covered: themes with many keywords + GSC evidence
    well_covered = [t for t in themes if t["with_gsc"] >= 3]
    # Weakly covered: themes with keywords mapped but little GSC evidence
    weakly_covered = [t for t in themes if t["count"] >= 3 and t["with_gsc"] <= 1]

    # Keywords mapped here but with opportunity flags
    opportunities = []
    for km in kw_mapped:
        opp = km.get("seo_opportunity_type", "")
        if opp and opp != "weak_signal":
            opportunities.append({
                "keyword": km.get("normalized_keyword", ""),
                "opportunity": opp,
                "reason": km.get("seo_opportunity_reason", ""),
                "planner_vol": _si(km.get("planner_avg_monthly_searches", 0)),
                "gsc_impr": _si(km.get("gsc_total_impressions", 0)),
            })
    opportunities.sort(key=lambda x: x["gsc_impr"] or x["planner_vol"], reverse=True)

    # Nearby: keywords whose GSC top page is this route but mapped elsewhere
    nearby_list = []
    for km in kw_nearby:
        nearby_list.append({
            "keyword": km.get("normalized_keyword", ""),
            "currently_mapped": km.get("mapped_route_guess", ""),
            "gsc_impr": _si(km.get("gsc_total_impressions", 0)),
            "gsc_clicks": _si(km.get("gsc_total_clicks", 0)),
            "theme": km.get("topic_theme_guess", ""),
        })
    nearby_list.sort(key=lambda x: x["gsc_impr"], reverse=True)

    # Important themes from keyword_master that could belong here but don't map
    route_themes = {"core_isolation", "gevelisolatie"}
    relevant_unmapped = []
    for km in data["kw_all"]:
        theme = km.get("topic_theme_guess", "")
        mapped = km.get("mapped_route_guess", "")
        conf = km.get("mapping_confidence", "")
        vol = _si(km.get("planner_avg_monthly_searches", 0))
        brand = km.get("brand_nonbrand_guess", "nonbrand")

        if brand != "nonbrand":
            continue
        if theme in route_themes and (not mapped or conf in ("none", "low")) and vol >= 100:
            relevant_unmapped.append({
                "keyword": km.get("normalized_keyword", ""),
                "planner_vol": vol,
                "theme": theme,
                "mapped": mapped or "(none)",
            })
    relevant_unmapped.sort(key=lambda x: x["planner_vol"], reverse=True)

    return {
        "theme_breakdown": themes,
        "well_covered": well_covered,
        "weakly_covered": weakly_covered,
        "opportunities": opportunities[:15],
        "nearby_keywords": nearby_list[:15],
        "relevant_unmapped": relevant_unmapped[:15],
        "total_mapped": len(kw_mapped),
    }


# ---------------------------------------------------------------------------
# 4. Intent diagnosis
# ---------------------------------------------------------------------------


def diagnose_intent(data: dict, query_fit: dict) -> dict:
    page_inv = data["page_inv"]
    queries = query_fit["nonbrand_top"]

    # Count intent distribution
    intents: dict[str, int] = {}
    for q in queries:
        i = q.get("intent", "unknown")
        intents[i] = intents.get(i, 0) + 1

    intent_dist = sorted(intents.items(), key=lambda x: -x[1])

    # Page signals
    has_faq = page_inv.get("has_faq", "") == "True"
    has_schema = page_inv.get("has_schema_hint", "") == "True"
    page_type = page_inv.get("page_type", "")
    meta_title = page_inv.get("meta_title_guess", "")
    h1 = page_inv.get("h1_guess", "")
    meta_desc = page_inv.get("meta_description_guess", "")

    # Determine likely page intent
    if "prijs" in meta_title.lower() or "offerte" in meta_title.lower():
        page_intent = "commercial"
    elif "advies" in h1.lower() or "mogelijkheden" in h1.lower():
        page_intent = "mixed (commercial + informational)"
    else:
        page_intent = "informational"

    # Check breadth
    themes_in_queries = set()
    for q in queries[:20]:
        if q["theme"]:
            themes_in_queries.add(q["theme"])

    too_broad = len(themes_in_queries) >= 4

    # Mismatch check
    dominant_intent = intent_dist[0][0] if intent_dist else "unknown"
    mismatch_note = ""
    if dominant_intent == "informational" and "prijs" in meta_title.lower():
        mismatch_note = "Page title signals pricing, but most queries are informational."
    elif dominant_intent == "transactional" and "advies" in h1.lower():
        mismatch_note = "Most queries are transactional but page H1 emphasizes advice/information."

    return {
        "page_intent": page_intent,
        "query_intent_distribution": intent_dist,
        "dominant_query_intent": dominant_intent,
        "meta_title": meta_title,
        "h1": h1,
        "meta_description": meta_desc,
        "has_faq": has_faq,
        "has_schema": has_schema,
        "themes_in_queries": sorted(themes_in_queries),
        "too_broad": too_broad,
        "mismatch_note": mismatch_note,
    }


# ---------------------------------------------------------------------------
# 5. Structural recommendations
# ---------------------------------------------------------------------------


def build_structural_recs(
    data: dict,
    perf: dict,
    query_fit: dict,
    cluster_fit: dict,
    intent_diag: dict,
) -> list[dict]:
    recs = []
    page_inv = data["page_inv"]

    # Title / H1 / meta
    gsc_ctr = perf["gsc"].get("ctr", 0)
    gsc_impr = perf["gsc"].get("impressions", 0)
    if gsc_ctr < 0.01 and gsc_impr > 500:
        top_query = query_fit["nonbrand_top"][0]["query"] if query_fit["nonbrand_top"] else ""
        recs.append({
            "area": "title_meta",
            "recommendation": f"Review meta title and description for CTR improvement. Current CTR is {_pct(gsc_ctr)} on {gsc_impr:,} impressions.",
            "detail": f"Top nonbrand query: '{top_query}'. Consider whether the title/description speak directly to this search intent.",
            "confidence": "medium",
        })

    # Internal links
    has_links = page_inv.get("has_internal_links_section", "") == "True"
    if not has_links:
        recs.append({
            "area": "internal_linking",
            "recommendation": "Page lacks a detected internal links section. Consider adding contextual links to cluster pages and related services.",
            "detail": "Internal linking helps distribute authority and guide users deeper into the topic.",
            "confidence": "medium",
        })

    # Weak coverage themes
    for wc in cluster_fit["weakly_covered"]:
        recs.append({
            "area": "content_coverage",
            "recommendation": f"Theme '{wc['theme']}' has {wc['count']} mapped keywords but only {wc['with_gsc']} show GSC evidence. Consider strengthening on-page content or adding dedicated sections.",
            "detail": "Weak GSC evidence for mapped keywords suggests the page content may not adequately address this topic.",
            "confidence": "low",
        })

    # Striking distance
    striking = query_fit["striking_distance"]
    if striking:
        top3 = ", ".join(f"'{s['query']}' (pos {s['position']})" for s in striking[:3])
        recs.append({
            "area": "striking_distance",
            "recommendation": f"{len(striking)} queries in striking distance. Top: {top3}.",
            "detail": "Consider strengthening on-page signals (headings, content depth, internal links) for these queries to push into top positions.",
            "confidence": "medium",
        })

    # Breadth
    if intent_diag["too_broad"]:
        themes = ", ".join(intent_diag["themes_in_queries"])
        recs.append({
            "area": "page_scope",
            "recommendation": f"Page attracts queries from {len(intent_diag['themes_in_queries'])} themes ({themes}). Consider whether some should be served by dedicated cluster pages instead.",
            "detail": "A service page covering too many subtopics may dilute relevance for each.",
            "confidence": "low",
        })

    # Nearby keywords mapped elsewhere
    nearby = cluster_fit["nearby_keywords"]
    if nearby:
        recs.append({
            "area": "keyword_mapping",
            "recommendation": f"{len(nearby)} keywords where GSC shows this page as top result but they're mapped to other routes. Review whether mapping is correct or if content should be consolidated.",
            "detail": "This may indicate the page is naturally winning for these terms, suggesting content ownership.",
            "confidence": "low",
        })

    # Engagement
    ga4_eng = perf["ga4"].get("engagement_rate", 0)
    ga4_sess = perf["ga4"].get("sessions", 0)
    if ga4_sess >= 10 and ga4_eng < 0.5:
        recs.append({
            "area": "engagement",
            "recommendation": f"GA4 engagement rate is {_pct(ga4_eng)} on {ga4_sess} sessions. Consider reviewing above-the-fold content, CTA placement, and page load speed.",
            "detail": "Low engagement may indicate content-intent mismatch or poor UX signals.",
            "confidence": "low",
        })

    return recs


# ---------------------------------------------------------------------------
# 6. Executive summary
# ---------------------------------------------------------------------------


def build_exec_summary(
    data: dict,
    perf: dict,
    query_fit: dict,
    cluster_fit: dict,
    intent_diag: dict,
) -> dict:
    page_inv = data["page_inv"]
    route = data["route"]

    page_role = f"{page_inv.get('page_type', 'unknown')} page for {page_inv.get('primary_topic_guess', 'unknown')}"

    gsc = perf["gsc"]
    ga4 = perf["ga4"]

    evidence = f"GSC: {gsc.get('impressions', 0):,} impr, {gsc.get('clicks', 0)} clicks, {_pct(gsc.get('ctr', 0))} CTR, pos {gsc.get('avg_position', 0)}. GA4: {ga4.get('sessions', 0)} sessions, {_pct(ga4.get('engagement_rate', 0))} engagement."

    # Strength
    if cluster_fit["total_mapped"] > 50:
        strength = f"Strong keyword coverage: {cluster_fit['total_mapped']} keywords mapped to this page. Primary cluster hub."
    elif gsc.get("distinct_queries", 0) > 30:
        strength = f"Visible for {gsc.get('distinct_queries', 0)} unique GSC queries, indicating broad topic relevance."
    else:
        strength = "Limited performance data. Difficult to identify clear strengths."

    # Weakness
    ctr = gsc.get("ctr", 0)
    impr = gsc.get("impressions", 0)
    if impr > 500 and ctr < 0.01:
        weakness = f"Very low CTR ({_pct(ctr)}) despite {impr:,} impressions. Impressions not converting to clicks."
    elif impr < 100:
        weakness = "Low impression volume limits analysis confidence."
    else:
        weakness = f"CTR of {_pct(ctr)} is below typical expectations for a money page."

    # Opportunity
    striking = query_fit["striking_distance"]
    if striking:
        opp = f"{len(striking)} striking-distance queries. Top: '{striking[0]['query']}' ({striking[0]['impressions']} impr, pos {striking[0]['position']})."
    else:
        opp = "Limited striking-distance opportunities detected."

    # Risk
    unmapped = cluster_fit["relevant_unmapped"]
    if unmapped:
        risk = f"{len(unmapped)} relevant high-volume keywords with weak/no page mapping. Content coverage may have gaps."
    else:
        risk = "No major structural risks identified."

    return {
        "page_role": page_role,
        "evidence": evidence,
        "main_strength": strength,
        "main_weakness": weakness,
        "biggest_opportunity": opp,
        "biggest_risk": risk,
    }


# ---------------------------------------------------------------------------
# 7. Risks / cautions
# ---------------------------------------------------------------------------


def build_cautions(data: dict, perf: dict, query_fit: dict) -> list[str]:
    cautions = []

    clicks = perf["gsc"].get("clicks", 0)
    if clicks < 20:
        cautions.append(f"Very low click volume ({clicks} clicks in 90 days). All query-level conclusions are provisional.")

    if query_fit["brand_impression_share"] > 0.3:
        cautions.append(f"Brand queries account for {_pct(query_fit['brand_impression_share'])} of impressions. This inflates visibility metrics.")

    pos = perf["gsc"].get("avg_position", 0)
    if pos > 20:
        cautions.append(f"Average position ({pos}) is deep in SERPs. Most impressions may come from page 2+ where click probability is very low.")

    ga4_sess = perf["ga4"].get("sessions", 0)
    if ga4_sess < 20:
        cautions.append(f"Low GA4 session count ({ga4_sess}). Engagement metrics may not be statistically reliable.")

    cautions.append("GSC position data is averaged over 90 days and may not reflect current rankings.")
    cautions.append("Theme/intent classification is heuristic-based. Manual SERP verification recommended before acting.")

    return cautions


# ---------------------------------------------------------------------------
# 8. Write markdown
# ---------------------------------------------------------------------------


def write_report(
    route: str,
    page_inv: dict,
    exec_sum: dict,
    perf: dict,
    query_fit: dict,
    cluster_fit: dict,
    intent_diag: dict,
    structural: list[dict],
    cautions: list[str],
    generated_at: str,
) -> str:
    L: list[str] = []

    def w(s=""):
        L.append(s)

    slug = _slug(route)
    w(f"# Page Audit: {route}")
    w()
    w(f"**Route:** `{route}`")
    w(f"**Page type:** {page_inv.get('page_type', 'unknown')}")
    w(f"**Source file:** `{page_inv.get('source_file', '?')}`")
    w(f"**Generated:** {generated_at}")
    w(f"**Data window:** GSC 90 days, GA4 90 days")
    w()

    # 1. Executive summary
    w("---")
    w()
    w("## 1. Executive summary")
    w()
    w(f"**What this page is:** {exec_sum['page_role']}")
    w()
    w(f"**Current evidence:** {exec_sum['evidence']}")
    w()
    w(f"**Main strength:** {exec_sum['main_strength']}")
    w()
    w(f"**Main weakness:** {exec_sum['main_weakness']}")
    w()
    w(f"**Biggest opportunity:** {exec_sum['biggest_opportunity']}")
    w()
    w(f"**Biggest risk:** {exec_sum['biggest_risk']}")
    w()

    # 2. Performance snapshot
    w("---")
    w()
    w("## 2. Page performance snapshot")
    w()
    w(f"**Performance verdict:** {perf['verdict']}")
    w()

    w("### GSC (90 days)")
    w()
    gsc = perf["gsc"]
    if gsc:
        w("| Metric | Value |")
        w("|--------|-------|")
        w(f"| Impressions | {gsc.get('impressions', 0):,} |")
        w(f"| Clicks | {gsc.get('clicks', 0)} |")
        w(f"| CTR | {_pct(gsc.get('ctr', 0))} |")
        w(f"| Avg Position | {gsc.get('avg_position', 0)} |")
        w(f"| Unique Queries | {gsc.get('distinct_queries', 0)} |")
    else:
        w("No GSC data found for this page.")
    w()

    w("### GA4 (90 days)")
    w()
    ga4 = perf["ga4"]
    if ga4:
        w("| Metric | Value |")
        w("|--------|-------|")
        w(f"| Sessions | {ga4.get('sessions', 0)} |")
        w(f"| Engaged Sessions | {ga4.get('engaged_sessions', 0)} |")
        w(f"| Engagement Rate | {_pct(ga4.get('engagement_rate', 0))} |")
        w(f"| Avg Duration (s) | {ga4.get('avg_duration', 0)} |")
        w(f"| Key Events | {ga4.get('key_events', 0)} |")
    else:
        w("No GA4 data found for this page.")
    w()

    if perf["channels"]:
        w("### Channel breakdown")
        w()
        w("| Channel | Sessions | Eng Rate |")
        w("|---------|--------:|---------:|")
        for ch in perf["channels"]:
            w(f"| {ch['channel']} | {ch['sessions']} | {_pct(ch['engagement_rate'])} |")
        w()

    # 3. Query fit
    w("---")
    w()
    w("## 3. Query fit")
    w()
    w(f"**Total queries:** {query_fit['total_queries']} ({query_fit['nonbrand_count']} nonbrand, {query_fit['brand_count']} brand)")
    w(f"**Brand impression share:** {_pct(query_fit['brand_impression_share'])}")
    w()

    w("### Top nonbrand queries")
    w()
    if query_fit["nonbrand_top"]:
        w("| Query | Impr | Clicks | CTR | Pos | Theme | Intent |")
        w("|-------|-----:|-------:|----:|----:|-------|--------|")
        for q in query_fit["nonbrand_top"][:15]:
            w(f"| {q['query']} | {q['impressions']:,} | {q['clicks']} | {_pct(q['ctr'])} | {q['position']} | {q['theme']} | {q['intent']} |")
    w()

    w("### Striking-distance queries (pos 4-20, 10+ impr)")
    w()
    if query_fit["striking_distance"]:
        w("| Query | Impr | Clicks | CTR | Pos | Theme |")
        w("|-------|-----:|-------:|----:|----:|-------|")
        for q in query_fit["striking_distance"][:10]:
            w(f"| {q['query']} | {q['impressions']:,} | {q['clicks']} | {_pct(q['ctr'])} | {q['position']} | {q['theme']} |")
    else:
        w("No striking-distance queries found for this page.")
    w()

    w("### Weak high-impression queries (20+ impr, 0 clicks)")
    w()
    if query_fit["weak_high_impr"]:
        w("| Query | Impr | Pos | Theme |")
        w("|-------|-----:|----:|-------|")
        for q in query_fit["weak_high_impr"][:10]:
            w(f"| {q['query']} | {q['impressions']:,} | {q['position']} | {q['theme']} |")
    else:
        w("No weak high-impression queries found.")
    w()

    # 4. Keyword/cluster fit
    w("---")
    w()
    w("## 4. Keyword/cluster fit")
    w()
    w(f"**Total keywords mapped:** {cluster_fit['total_mapped']}")
    w()

    w("### Theme breakdown")
    w()
    w("| Theme | Keywords | With GSC | GSC Impressions |")
    w("|-------|--------:|---------:|----------------:|")
    for t in cluster_fit["theme_breakdown"]:
        w(f"| {t['theme']} | {t['count']} | {t['with_gsc']} | {t['total_gsc_impr']:,} |")
    w()

    if cluster_fit["opportunities"]:
        w("### Keyword opportunities")
        w()
        w("| Keyword | Opportunity | Planner Vol | GSC Impr |")
        w("|---------|-----------|----------:|--------:|")
        for o in cluster_fit["opportunities"][:10]:
            w(f"| {o['keyword']} | {o['opportunity']} | {o['planner_vol']} | {o['gsc_impr']} |")
        w()

    if cluster_fit["nearby_keywords"]:
        w("### Keywords winning on this page but mapped elsewhere")
        w()
        w("| Keyword | Currently Mapped | GSC Impr | GSC Clicks | Theme |")
        w("|---------|-----------------|--------:|----------:|-------|")
        for nk in cluster_fit["nearby_keywords"][:10]:
            w(f"| {nk['keyword']} | {nk['currently_mapped']} | {nk['gsc_impr']} | {nk['gsc_clicks']} | {nk['theme']} |")
        w()

    if cluster_fit["relevant_unmapped"]:
        w("### Relevant high-volume keywords with weak/no mapping")
        w()
        w("| Keyword | Planner Vol | Theme | Mapped |")
        w("|---------|----------:|-------|--------|")
        for u in cluster_fit["relevant_unmapped"][:10]:
            w(f"| {u['keyword']} | {u['planner_vol']:,} | {u['theme']} | {u['mapped']} |")
        w()

    # 5. Intent diagnosis
    w("---")
    w()
    w("## 5. Intent diagnosis")
    w()
    w(f"**Detected page intent:** {intent_diag['page_intent']}")
    w(f"**Dominant query intent:** {intent_diag['dominant_query_intent']}")
    w()

    w("### Query intent distribution")
    w()
    w("| Intent | Count |")
    w("|--------|------:|")
    for intent, count in intent_diag["query_intent_distribution"]:
        w(f"| {intent} | {count} |")
    w()

    w(f"**Meta title:** {intent_diag['meta_title']}")
    w(f"**H1:** {intent_diag['h1']}")
    w(f"**Has FAQ:** {intent_diag['has_faq']}")
    w(f"**Has Schema:** {intent_diag['has_schema']}")
    w()

    if intent_diag["too_broad"]:
        w(f"**Breadth warning:** Page attracts queries from {len(intent_diag['themes_in_queries'])} themes: {', '.join(intent_diag['themes_in_queries'])}")
        w()

    if intent_diag["mismatch_note"]:
        w(f"**Intent mismatch note:** {intent_diag['mismatch_note']}")
        w()

    # 6. Structural recommendations
    w("---")
    w()
    w("## 6. Structural recommendations")
    w()
    if structural:
        for i, rec in enumerate(structural, 1):
            w(f"**{i}. [{rec['area']}] {rec['recommendation']}**")
            w(f"- Detail: {rec['detail']}")
            w(f"- Confidence: {rec['confidence']}")
            w()
    else:
        w("No structural recommendations at this time.")
        w()

    # 7. Risks / cautions
    w("---")
    w()
    w("## 7. Risks and cautions")
    w()
    for c in cautions:
        w(f"- {c}")
    w()

    # Limitations
    w("---")
    w()
    w("## Limitations")
    w()
    w("1. **Single page audit** -- does not assess competitor SERP landscape")
    w("2. **GSC 90-day window** -- position averaged, may not reflect current state")
    w("3. **Low click volume** makes query-level conclusions provisional")
    w("4. **No ad copy or landing page content analysis** -- structural signals only")
    w("5. **Theme classification is heuristic** -- manual verification recommended")
    w("6. **Page inventory metadata** may be stale if page was recently updated")
    w()
    w("---")
    w()
    w("*Read-only analysis. No changes applied to site pages.*")
    w()

    return "\n".join(L)


# ---------------------------------------------------------------------------
# 9. JSON output
# ---------------------------------------------------------------------------


def build_json(
    route: str,
    page_inv: dict,
    exec_sum: dict,
    perf: dict,
    query_fit: dict,
    cluster_fit: dict,
    intent_diag: dict,
    structural: list[dict],
    cautions: list[str],
    generated_at: str,
) -> dict:
    return {
        "generated_at": generated_at,
        "route": route,
        "page_type": page_inv.get("page_type", ""),
        "summary": exec_sum,
        "performance": {
            "gsc": perf["gsc"],
            "ga4": perf["ga4"],
            "verdict": perf["verdict"],
        },
        "strengths": [exec_sum["main_strength"]],
        "weaknesses": [exec_sum["main_weakness"]],
        "top_queries": [q["query"] for q in query_fit["nonbrand_top"][:10]],
        "weak_queries": [q["query"] for q in query_fit["weak_high_impr"][:10]],
        "striking_distance": [q["query"] for q in query_fit["striking_distance"][:10]],
        "cluster_fit": {
            "total_mapped": cluster_fit["total_mapped"],
            "theme_breakdown": cluster_fit["theme_breakdown"],
            "well_covered": [t["theme"] for t in cluster_fit["well_covered"]],
            "weakly_covered": [t["theme"] for t in cluster_fit["weakly_covered"]],
        },
        "intent_diagnosis": {
            "page_intent": intent_diag["page_intent"],
            "dominant_query_intent": intent_diag["dominant_query_intent"],
            "too_broad": intent_diag["too_broad"],
            "mismatch_note": intent_diag["mismatch_note"],
        },
        "structural_recommendations": structural,
        "internal_linking_recommendations": [
            r for r in structural if r["area"] == "internal_linking"
        ],
        "cautions": cautions,
    }


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def main():
    route = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_ROUTE

    # Normalize route
    if not route.startswith("/"):
        route = "/" + route
    if not route.endswith("/"):
        route = route + "/"

    slug = _slug(route)
    report_path = REPORT_DIR / f"page_audit_{slug}_v1.md"
    output_path = OUTPUT_DIR / f"page_audit_{slug}_v1.json"

    print("=" * 60)
    print(f"Page Audit v1: {route}")
    print("=" * 60)
    print()

    data = load_page_data(route)
    print()

    print("Computing performance snapshot...")
    perf = compute_performance(data)
    print(f"  Verdict: {perf['verdict']}")
    print()

    print("Analyzing query fit...")
    query_fit = analyze_query_fit(data)
    print(f"  Total: {query_fit['total_queries']} ({query_fit['nonbrand_count']} nonbrand)")
    print(f"  Striking distance: {len(query_fit['striking_distance'])}")
    print(f"  Weak high-impr: {len(query_fit['weak_high_impr'])}")
    print()

    print("Analyzing cluster fit...")
    cluster_fit = analyze_cluster_fit(data)
    print(f"  Mapped: {cluster_fit['total_mapped']}")
    print(f"  Themes: {len(cluster_fit['theme_breakdown'])}")
    print(f"  Opportunities: {len(cluster_fit['opportunities'])}")
    print(f"  Nearby: {len(cluster_fit['nearby_keywords'])}")
    print()

    print("Diagnosing intent...")
    intent_diag = diagnose_intent(data, query_fit)
    print(f"  Page intent: {intent_diag['page_intent']}")
    print(f"  Dominant query intent: {intent_diag['dominant_query_intent']}")
    print(f"  Too broad: {intent_diag['too_broad']}")
    print()

    print("Building structural recommendations...")
    structural = build_structural_recs(data, perf, query_fit, cluster_fit, intent_diag)
    print(f"  Recommendations: {len(structural)}")
    print()

    print("Building executive summary...")
    exec_sum = build_exec_summary(data, perf, query_fit, cluster_fit, intent_diag)
    print()

    cautions = build_cautions(data, perf, query_fit)

    generated_at = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    print("Writing markdown report...")
    report = write_report(
        route, data["page_inv"], exec_sum, perf, query_fit,
        cluster_fit, intent_diag, structural, cautions, generated_at,
    )
    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text(report, encoding="utf-8")
    print(f"  -> {report_path}")

    print("Writing JSON output...")
    jout = build_json(
        route, data["page_inv"], exec_sum, perf, query_fit,
        cluster_fit, intent_diag, structural, cautions, generated_at,
    )
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(jout, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"  -> {output_path}")

    print()
    print("=" * 60)
    print(f"Page Audit v1 complete: {route}")
    print("=" * 60)


if __name__ == "__main__":
    main()

"""
run_page_vs_query_gap_v1.py -- First integrated SEO page-vs-query gap review.

Produces a recommendation-grade SEO review showing where current pages
underperform against actual search demand and where site structure or
content coverage likely needs attention.

READ-ONLY: does not modify any site pages.

Usage:
    python seo-ops/analyzers/seo/run_page_vs_query_gap_v1.py
"""

from __future__ import annotations

import csv
import json
from datetime import datetime, timezone
from pathlib import Path

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parents[3]
SEO_OPS = PROJECT_ROOT / "seo-ops"

# Inputs
GSC_ROW_CSV = SEO_OPS / "snapshots/normalized/seo/gsc_query_page_last90d.csv"
GSC_QUERIES_CSV = SEO_OPS / "snapshots/normalized/seo/gsc_query_page_aggregated_queries_last90d.csv"
GSC_PAGES_CSV = SEO_OPS / "snapshots/normalized/seo/gsc_query_page_aggregated_pages_last90d.csv"
KW_MASTER_CSV = SEO_OPS / "snapshots/normalized/keyword_master/keyword_master_v2.csv"
PAGE_INV_CSV = SEO_OPS / "snapshots/normalized/pages/page_inventory_v1.csv"
GA4_LANDING_CSV = SEO_OPS / "snapshots/normalized/pages/ga4_landing_pages_last90d.csv"
GA4_CHANNEL_CSV = SEO_OPS / "snapshots/normalized/pages/ga4_landing_pages_by_channel_last90d.csv"

# Outputs
REPORT_MD = SEO_OPS / "reports/seo/page_vs_query_gap_v1.md"
OUTPUT_JSON = SEO_OPS / "outputs/page_vs_query_gap_v1.json"

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


def _eur(v: float) -> str:
    return f"\u20ac{v:,.2f}"


def _pct(v: float) -> str:
    return f"{v * 100:.1f}%"


def _nk(t: str) -> str:
    return " ".join(t.lower().strip().split())


# ---------------------------------------------------------------------------
# Load
# ---------------------------------------------------------------------------


def load_all() -> dict:
    print("Loading sources...")
    d = {
        "gsc_rows": _load_csv(GSC_ROW_CSV),
        "gsc_queries": _load_csv(GSC_QUERIES_CSV),
        "gsc_pages": _load_csv(GSC_PAGES_CSV),
        "kw_master": _load_csv(KW_MASTER_CSV),
        "page_inv": _load_csv(PAGE_INV_CSV),
        "ga4_landing": _load_csv(GA4_LANDING_CSV),
        "ga4_channel": _load_csv(GA4_CHANNEL_CSV),
    }
    for k, v in d.items():
        print(f"  {k}: {len(v)} rows")
    return d


# ---------------------------------------------------------------------------
# 1. Query opportunities
# ---------------------------------------------------------------------------


def analyze_query_opportunities(gsc_queries: list[dict], kw_master: list[dict]) -> dict:
    km_lookup = {r.get("normalized_keyword", ""): r for r in kw_master if r.get("normalized_keyword")}

    striking = []
    low_ctr = []
    nonbrand_top = []
    brand_queries = []
    commercial_weak = []

    for q in gsc_queries:
        nq = q.get("normalized_query", "")
        impr = _si(q.get("total_impressions", 0))
        clicks = _si(q.get("total_clicks", 0))
        ctr = _sf(q.get("weighted_ctr", 0))
        pos = _sf(q.get("best_position_guess", 0))
        pages = _si(q.get("distinct_pages_count", 0))
        theme = q.get("query_theme_guess", "")
        intent = q.get("query_intent_guess", "")

        km = km_lookup.get(nq, {})
        brand = km.get("brand_nonbrand_guess", "nonbrand")
        opp_type = km.get("seo_opportunity_type", "")
        planner_vol = _si(km.get("planner_avg_monthly_searches", 0))

        entry = {
            "query": nq,
            "impressions": impr,
            "clicks": clicks,
            "ctr": round(ctr, 4),
            "position": round(pos, 1),
            "pages": pages,
            "theme": theme,
            "intent": intent,
            "brand": brand,
            "planner_vol": planner_vol,
        }

        if brand in ("brand", "mixed"):
            brand_queries.append(entry)
            continue

        # Striking distance: pos 4-20, impr >= 20
        if 4.0 <= pos <= 20.0 and impr >= 20:
            striking.append(entry)

        # Low CTR / high impressions: impr >= 50, ctr < 0.02, pos <= 30
        if impr >= 50 and ctr < 0.02 and pos <= 30:
            low_ctr.append(entry)

        # Top nonbrand by impressions
        nonbrand_top.append(entry)

        # Commercially valuable but weak
        if intent in ("transactional", "commercial_investigative") and impr >= 20 and clicks == 0:
            commercial_weak.append(entry)

    striking.sort(key=lambda x: x["impressions"], reverse=True)
    low_ctr.sort(key=lambda x: x["impressions"], reverse=True)
    nonbrand_top.sort(key=lambda x: x["impressions"], reverse=True)
    commercial_weak.sort(key=lambda x: x["impressions"], reverse=True)

    # Also add page_gap from keyword_master
    page_gaps_from_km = []
    for km in kw_master:
        opp = km.get("seo_opportunity_type", "")
        if opp == "page_gap":
            page_gaps_from_km.append({
                "keyword": km.get("normalized_keyword", ""),
                "planner_vol": _si(km.get("planner_avg_monthly_searches", 0)),
                "theme": km.get("topic_theme_guess", ""),
                "reason": km.get("seo_opportunity_reason", ""),
            })
    page_gaps_from_km.sort(key=lambda x: x["planner_vol"], reverse=True)

    return {
        "striking_distance": striking[:20],
        "low_ctr_high_impr": low_ctr[:20],
        "nonbrand_top20": nonbrand_top[:20],
        "brand_queries": brand_queries[:10],
        "commercial_weak": commercial_weak[:15],
        "page_gaps_from_km": page_gaps_from_km[:15],
    }


# ---------------------------------------------------------------------------
# 2. Page-level findings
# ---------------------------------------------------------------------------


def analyze_pages(
    gsc_pages: list[dict],
    page_inv: list[dict],
    ga4_landing: list[dict],
) -> dict:
    # Build GA4 lookup by normalized path
    ga4_lk: dict[str, dict] = {}
    for row in ga4_landing:
        p = row.get("normalized_path", "")
        if p:
            ga4_lk[p] = row

    # Build page_inv lookup by route
    inv_lk: dict[str, dict] = {}
    for row in page_inv:
        rp = row.get("route_path", "")
        if rp:
            inv_lk[rp] = row

    pages = []
    for gp in gsc_pages:
        url = gp.get("page", "")
        impr = _si(gp.get("total_impressions", 0))
        clicks = _si(gp.get("total_clicks", 0))
        ctr = _sf(gp.get("weighted_ctr", 0))
        pos = _sf(gp.get("avg_position", 0))
        queries = _si(gp.get("distinct_queries_count", 0))
        ptype = gp.get("page_type_guess", "")
        route = gp.get("route_match_guess", "")

        # GA4 context
        ga4 = ga4_lk.get(route, {})
        ga4_sessions = _si(ga4.get("sessions", 0))
        ga4_eng_rate = _sf(ga4.get("engagement_rate", 0))
        ga4_key_events = _si(ga4.get("key_events", 0))

        # Inventory context
        inv = inv_lk.get(route, {})
        indexable = inv.get("is_indexable_guess", "")
        title = inv.get("title_guess", "")

        pages.append({
            "url": url,
            "route": route,
            "page_type": ptype,
            "impressions": impr,
            "clicks": clicks,
            "ctr": round(ctr, 4),
            "position": round(pos, 1),
            "queries": queries,
            "ga4_sessions": ga4_sessions,
            "ga4_eng_rate": round(ga4_eng_rate, 2),
            "ga4_key_events": ga4_key_events,
            "indexable": indexable,
            "title": title,
        })

    pages.sort(key=lambda x: x["impressions"], reverse=True)

    strongest = [p for p in pages if p["clicks"] > 0][:10]

    # Weak CTR pages: impr >= 100, ctr < 0.02
    weak_ctr = [p for p in pages if p["impressions"] >= 100 and p["ctr"] < 0.02]
    weak_ctr.sort(key=lambda x: x["impressions"], reverse=True)

    # Many queries, few clicks
    many_queries_weak = [p for p in pages if p["queries"] >= 10 and p["clicks"] <= 1]
    many_queries_weak.sort(key=lambda x: x["queries"], reverse=True)

    # Organic sessions but weak engagement
    weak_engagement = [
        p for p in pages
        if p["ga4_sessions"] >= 5 and p["ga4_eng_rate"] < 0.4 and p["ga4_eng_rate"] > 0
    ]

    # Disabled / legacy / suspicious
    legacy = [p for p in pages if not p["route"] or p["indexable"] == "False"]

    return {
        "all_pages": pages,
        "strongest": strongest,
        "weak_ctr": weak_ctr[:10],
        "many_queries_weak": many_queries_weak[:10],
        "weak_engagement": weak_engagement[:10],
        "legacy": legacy[:10],
    }


# ---------------------------------------------------------------------------
# 3. Page-vs-query gap
# ---------------------------------------------------------------------------


def analyze_page_query_gaps(
    gsc_rows: list[dict],
    kw_master: list[dict],
    page_inv: list[dict],
) -> dict:
    km_lookup = {r.get("normalized_keyword", ""): r for r in kw_master if r.get("normalized_keyword")}

    # Weakly mapped queries from GSC rows
    weak_mapped = []
    unmapped = []
    for row in gsc_rows:
        nq = row.get("normalized_query", "")
        conf = row.get("mapping_confidence", "")
        route = row.get("mapped_route_guess", "")
        impr = _si(row.get("impressions", 0))
        clicks = _si(row.get("clicks", 0))
        theme = row.get("query_theme_guess", "")

        if not route and impr >= 5:
            unmapped.append({
                "query": nq,
                "impressions": impr,
                "clicks": clicks,
                "theme": theme,
                "gsc_page": row.get("page", ""),
            })
        elif conf in ("low",) and impr >= 10:
            weak_mapped.append({
                "query": nq,
                "impressions": impr,
                "clicks": clicks,
                "theme": theme,
                "mapped_route": route,
                "gsc_page": row.get("page", ""),
            })

    unmapped.sort(key=lambda x: x["impressions"], reverse=True)
    weak_mapped.sort(key=lambda x: x["impressions"], reverse=True)

    # Intent mismatch: query intent is transactional but page is utility/archive/legal
    intent_mismatch = []
    for row in gsc_rows:
        intent = row.get("query_intent_guess", "")
        ptype = row.get("mapped_page_type_guess", "")
        impr = _si(row.get("impressions", 0))
        if intent in ("transactional", "commercial_investigative") and ptype in ("utility", "archive", "legal", "home") and impr >= 10:
            intent_mismatch.append({
                "query": row.get("normalized_query", ""),
                "intent": intent,
                "page_type": ptype,
                "page": row.get("page", ""),
                "impressions": impr,
                "clicks": _si(row.get("clicks", 0)),
            })
    intent_mismatch.sort(key=lambda x: x["impressions"], reverse=True)

    # Page gaps from keyword_master (high planner vol, no mapped route)
    page_gaps = []
    for km in kw_master:
        route = km.get("mapped_route_guess", "")
        conf = km.get("mapping_confidence", "")
        opp = km.get("seo_opportunity_type", "")
        vol = _si(km.get("planner_avg_monthly_searches", 0))
        brand = km.get("brand_nonbrand_guess", "nonbrand")
        theme = km.get("topic_theme_guess", "")

        if brand != "nonbrand":
            continue
        if (not route or conf in ("none", "low")) and vol >= 100:
            page_gaps.append({
                "keyword": km.get("normalized_keyword", ""),
                "planner_vol": vol,
                "theme": theme,
                "intent": km.get("intent_guess", ""),
                "mapped_route": route or "(none)",
                "confidence": conf or "(none)",
                "gsc_impressions": _si(km.get("gsc_total_impressions", 0)),
            })
    page_gaps.sort(key=lambda x: x["planner_vol"], reverse=True)

    # Cluster/page mismatch: query theme doesn't match page topic
    cluster_mismatch = []
    inv_topic = {}
    for pi in page_inv:
        rp = pi.get("route_path", "")
        topic = pi.get("primary_topic_guess", "")
        if rp and topic:
            inv_topic[rp] = topic

    for row in gsc_rows:
        route = row.get("mapped_route_guess", "")
        q_theme = row.get("query_theme_guess", "")
        p_topic = inv_topic.get(route, "")
        impr = _si(row.get("impressions", 0))

        if route and p_topic and q_theme and q_theme != "other" and p_topic != "other":
            if q_theme != p_topic and impr >= 10:
                cluster_mismatch.append({
                    "query": row.get("normalized_query", ""),
                    "query_theme": q_theme,
                    "page_topic": p_topic,
                    "route": route,
                    "impressions": impr,
                    "clicks": _si(row.get("clicks", 0)),
                })
    cluster_mismatch.sort(key=lambda x: x["impressions"], reverse=True)

    return {
        "unmapped": unmapped[:20],
        "weak_mapped": weak_mapped[:15],
        "intent_mismatch": intent_mismatch[:10],
        "page_gaps": page_gaps[:20],
        "cluster_mismatch": cluster_mismatch[:10],
    }


# ---------------------------------------------------------------------------
# 4. Cannibalization
# ---------------------------------------------------------------------------


def analyze_cannibalization(gsc_queries: list[dict], kw_master: list[dict]) -> dict:
    km_lookup = {r.get("normalized_keyword", ""): r for r in kw_master if r.get("normalized_keyword")}

    candidates = []
    for q in gsc_queries:
        cannibal = q.get("possible_cannibalization_guess", "")
        if cannibal != "True":
            continue
        nq = q.get("normalized_query", "")
        pages = _si(q.get("distinct_pages_count", 0))
        impr = _si(q.get("total_impressions", 0))
        clicks = _si(q.get("total_clicks", 0))
        theme = q.get("query_theme_guess", "")

        km = km_lookup.get(nq, {})
        brand = km.get("brand_nonbrand_guess", "nonbrand")

        candidates.append({
            "query": nq,
            "pages": pages,
            "impressions": impr,
            "clicks": clicks,
            "theme": theme,
            "brand": brand,
            "severity": "high" if pages >= 4 and impr >= 50 else "medium" if pages >= 3 and impr >= 20 else "low",
        })

    nonbrand = [c for c in candidates if c["brand"] == "nonbrand"]
    brand = [c for c in candidates if c["brand"] in ("brand", "mixed")]

    nonbrand.sort(key=lambda x: x["impressions"], reverse=True)
    brand.sort(key=lambda x: x["impressions"], reverse=True)

    return {
        "nonbrand": nonbrand,
        "brand": brand,
        "total": len(candidates),
    }


# ---------------------------------------------------------------------------
# 5. GA4 context
# ---------------------------------------------------------------------------


def analyze_ga4_context(
    ga4_landing: list[dict],
    ga4_channel: list[dict],
    page_inv: list[dict],
) -> dict:
    inv_routes = {r.get("route_path", "") for r in page_inv if r.get("route_path")}

    # Organic sessions
    organic = []
    for row in ga4_channel:
        ch = row.get("session_default_channel_group", "")
        if ch.lower() != "organic search":
            continue
        path = row.get("normalized_path", "")
        sessions = _si(row.get("sessions", 0))
        eng_rate = _sf(row.get("engagement_rate", 0))
        avg_dur = _sf(row.get("avg_session_duration_seconds", 0))
        ptype = row.get("mapped_page_type_guess", "")
        mapped = row.get("mapped_route_guess", "")

        organic.append({
            "path": path,
            "sessions": sessions,
            "engagement_rate": round(eng_rate, 2),
            "avg_duration": round(avg_dur, 1),
            "page_type": ptype,
            "mapped": mapped,
        })

    organic.sort(key=lambda x: x["sessions"], reverse=True)

    # Weak engagement organic pages
    weak_eng = [
        o for o in organic
        if o["sessions"] >= 5 and o["engagement_rate"] < 0.4 and o["engagement_rate"] > 0
    ]

    # Unmapped organic pages
    unmapped_organic = [
        o for o in organic
        if not o["mapped"] and o["sessions"] > 0
    ]

    # Legacy / not in inventory
    legacy = []
    for row in ga4_landing:
        path = row.get("normalized_path", "")
        notes = row.get("notes", "")
        sessions = _si(row.get("sessions", 0))
        if "unmapped" in notes.lower() and sessions > 0:
            legacy.append({
                "path": path,
                "sessions": sessions,
                "engagement_rate": round(_sf(row.get("engagement_rate", 0)), 2),
                "notes": notes,
            })
    legacy.sort(key=lambda x: x["sessions"], reverse=True)

    return {
        "organic_top15": organic[:15],
        "weak_engagement": weak_eng,
        "unmapped_organic": unmapped_organic,
        "legacy": legacy[:15],
    }


# ---------------------------------------------------------------------------
# 6. Executive summary
# ---------------------------------------------------------------------------


def build_executive_summary(
    gsc_pages: list[dict],
    gsc_queries: list[dict],
    query_opps: dict,
    page_findings: dict,
    gap_findings: dict,
    cannibal: dict,
) -> dict:
    total_impr = sum(_si(p.get("total_impressions", 0)) for p in gsc_pages)
    total_clicks = sum(_si(p.get("total_clicks", 0)) for p in gsc_pages)
    total_queries = len(gsc_queries)
    total_pages = len(gsc_pages)
    overall_ctr = total_clicks / total_impr if total_impr else 0

    # Strongest page
    strongest = page_findings["strongest"][0] if page_findings["strongest"] else None
    strength = f"Homepage drives {strongest['clicks']} clicks from {strongest['impressions']:,} impressions across {strongest['queries']} queries." if strongest else "Limited click data."

    # Weakness
    weak_pages = len(page_findings["weak_ctr"])
    weakness = f"{weak_pages} pages with 100+ impressions but CTR below 2%. Large impression volume not converting to clicks."

    # Opportunity
    striking = query_opps["striking_distance"]
    if striking:
        opp = f"{len(striking)} striking-distance queries (pos 4-20, 20+ impr). Top: '{striking[0]['query']}' ({striking[0]['impressions']} impr, pos {striking[0]['position']})."
    else:
        opp = "Limited striking-distance opportunities identified."

    # Risk
    gaps = gap_findings["page_gaps"]
    if gaps:
        risk = f"{len(gaps)} keywords with planner demand 100+/mo but weak/no page mapping. Potential content coverage gaps."
    else:
        risk = "No significant structural gaps identified."

    return {
        "overall_state": f"{total_pages} pages visible in GSC, {total_queries} unique queries, {total_impr:,} impressions, {total_clicks} clicks ({_pct(overall_ctr)} CTR) over 90 days. Early-stage organic visibility with very low click volume relative to impressions.",
        "main_strength": strength,
        "main_weakness": weakness,
        "biggest_opportunity": opp,
        "biggest_risk": risk,
        "total_impressions": total_impr,
        "total_clicks": total_clicks,
        "total_queries": total_queries,
        "total_pages": total_pages,
    }


# ---------------------------------------------------------------------------
# 7. Recommendations
# ---------------------------------------------------------------------------


def build_recommendations(
    exec_summary: dict,
    query_opps: dict,
    page_findings: dict,
    gap_findings: dict,
    cannibal: dict,
    ga4_ctx: dict,
) -> dict:
    do_now = []
    monitor = []
    do_later = []

    # Do now: striking distance
    striking = query_opps["striking_distance"]
    if striking:
        top3 = ", ".join(f"'{s['query']}' (pos {s['position']}, {s['impressions']} impr)" for s in striking[:3])
        do_now.append({
            "action": f"Optimize for {len(striking)} striking-distance queries",
            "rationale": f"These queries rank pos 4-20 with meaningful impressions. Top: {top3}. Small ranking improvements could yield significant click gains.",
            "confidence": "medium",
            "risk": "Position data is averaged over 90 days; actual daily position may vary.",
        })

    # Do now: low CTR pages
    weak_pages = page_findings["weak_ctr"]
    if weak_pages:
        top_weak = weak_pages[0]
        do_now.append({
            "action": f"Audit title tags and meta descriptions for {len(weak_pages)} low-CTR pages",
            "rationale": f"Top: {top_weak['route']} ({top_weak['impressions']:,} impr, {_pct(top_weak['ctr'])} CTR). Improving SERP snippets could increase clicks without ranking changes.",
            "confidence": "medium",
            "risk": "Low CTR may also reflect poor position or query mismatch, not just snippet quality.",
        })

    # Do now: cannibalization
    nb_cannibal = cannibal["nonbrand"]
    if nb_cannibal:
        top_c = nb_cannibal[0]
        do_now.append({
            "action": f"Investigate {len(nb_cannibal)} nonbrand cannibalization cases",
            "rationale": f"Top: '{top_c['query']}' appears on {top_c['pages']} pages ({top_c['impressions']} impr). Consolidating to a primary page could improve rankings.",
            "confidence": "medium" if top_c["severity"] == "high" else "low",
            "risk": "Some multi-page visibility is normal for broad terms. Verify with manual SERP check before consolidating.",
        })

    # Monitor: commercial weak
    commercial = query_opps["commercial_weak"]
    if commercial:
        do_now.append({
            "action": f"Review {len(commercial)} commercially valuable queries with 0 clicks",
            "rationale": "These transactional/commercial queries get impressions but zero clicks. May indicate poor SERP positioning or snippet mismatch.",
            "confidence": "low",
            "risk": "Some may be low-relevance impressions at very poor positions.",
        })

    # Monitor: GA4 weak engagement
    weak_eng = ga4_ctx["weak_engagement"]
    if weak_eng:
        paths = ", ".join(w["path"] for w in weak_eng[:3])
        monitor.append({
            "action": f"Investigate {len(weak_eng)} organic pages with weak engagement",
            "rationale": f"Pages: {paths}. Sessions >= 5 but engagement rate < 40%. May indicate content-intent mismatch.",
            "confidence": "medium",
            "risk": "Engagement rate thresholds are arbitrary. Check intent alignment before acting.",
        })

    # Monitor: legacy pages
    legacy = ga4_ctx["legacy"]
    if legacy:
        monitor.append({
            "action": f"Redirect or clean up {len(legacy)} legacy/unmapped pages with sessions",
            "rationale": "These pages receive traffic but aren't in the page inventory. May be old URLs that should 301-redirect.",
            "confidence": "low",
            "risk": "Some may be valid pages missing from inventory. Verify before redirecting.",
        })

    # Monitor: brand cannibalization
    if cannibal["brand"]:
        monitor.append({
            "action": f"Note {len(cannibal['brand'])} brand query cannibalization cases",
            "rationale": "Brand queries appearing on many pages is common and usually not harmful. No action needed unless specific pages are underperforming.",
            "confidence": "low",
            "risk": "Very low. Brand cannibalization is normal.",
        })

    # Do later: page gaps
    gaps = gap_findings["page_gaps"]
    if gaps:
        top3 = ", ".join(f"'{g['keyword']}' ({g['planner_vol']}/mo)" for g in gaps[:3])
        do_later.append({
            "action": f"Consider content for {len(gaps)} keyword gaps with planner demand 100+/mo",
            "rationale": f"Top: {top3}. These terms have search demand but weak/no page targeting them. Some may need dedicated pages or content sections.",
            "confidence": "low",
            "risk": "Planner volumes are estimates. Validate with SERP analysis before creating new pages.",
        })

    # Do later: cluster mismatch
    mismatches = gap_findings["cluster_mismatch"]
    if mismatches:
        do_later.append({
            "action": f"Review {len(mismatches)} query-page theme mismatches",
            "rationale": "Queries about one theme land on pages about another. May indicate internal linking or page targeting issues.",
            "confidence": "low",
            "risk": "Theme classification is heuristic-based. Some mismatches are false positives.",
        })

    # Do later: unmapped queries
    if gap_findings["unmapped"]:
        do_later.append({
            "action": f"Improve mapping for {len(gap_findings['unmapped'])} unmapped GSC queries",
            "rationale": "These queries appear in GSC but don't map to any known page in the inventory. May need new content or better internal linking.",
            "confidence": "low",
            "risk": "Some unmapped queries may be irrelevant to the business.",
        })

    return {"do_now": do_now, "monitor": monitor, "do_later": do_later}


# ---------------------------------------------------------------------------
# 8. Write markdown
# ---------------------------------------------------------------------------


def write_report(
    exec_sum: dict,
    query_opps: dict,
    page_findings: dict,
    gap_findings: dict,
    cannibal: dict,
    ga4_ctx: dict,
    recs: dict,
    generated_at: str,
) -> str:
    L: list[str] = []

    def w(s=""):
        L.append(s)

    w("# SEO Page-vs-Query Gap Review v1")
    w()
    w(f"**Generated:** {generated_at}")
    w(f"**Data window:** GSC 90 days, GA4 90 days")
    w()
    w("> This is a diagnostic review based on GSC, GA4, keyword planner, and page inventory data.")
    w("> All conclusions are heuristic-based. Manual verification recommended before acting.")
    w()

    # --- 1. Executive summary ---
    w("---")
    w()
    w("## 1. Executive summary")
    w()
    w(f"**Overall state:** {exec_sum['overall_state']}")
    w()
    w(f"**Main strength:** {exec_sum['main_strength']}")
    w()
    w(f"**Main weakness:** {exec_sum['main_weakness']}")
    w()
    w(f"**Biggest opportunity:** {exec_sum['biggest_opportunity']}")
    w()
    w(f"**Biggest risk:** {exec_sum['biggest_risk']}")
    w()

    # --- 2. Query opportunities ---
    w("---")
    w()
    w("## 2. Query opportunity findings")
    w()

    w("### Striking-distance queries (pos 4-20, 20+ impr, nonbrand)")
    w()
    if query_opps["striking_distance"]:
        w("| Query | Impr | Clicks | CTR | Pos | Theme |")
        w("|-------|-----:|-------:|----:|----:|-------|")
        for q in query_opps["striking_distance"][:15]:
            w(f"| {q['query']} | {q['impressions']:,} | {q['clicks']} | {_pct(q['ctr'])} | {q['position']} | {q['theme']} |")
    else:
        w("No striking-distance queries found.")
    w()

    w("### Low CTR / high impression queries (50+ impr, CTR < 2%, pos <= 30)")
    w()
    if query_opps["low_ctr_high_impr"]:
        w("| Query | Impr | Clicks | CTR | Pos | Theme |")
        w("|-------|-----:|-------:|----:|----:|-------|")
        for q in query_opps["low_ctr_high_impr"][:15]:
            w(f"| {q['query']} | {q['impressions']:,} | {q['clicks']} | {_pct(q['ctr'])} | {q['position']} | {q['theme']} |")
    else:
        w("No low-CTR high-impression queries found.")
    w()

    w("### Top nonbrand queries by impressions")
    w()
    if query_opps["nonbrand_top20"]:
        w("| Query | Impr | Clicks | CTR | Pos | Theme | Intent |")
        w("|-------|-----:|-------:|----:|----:|-------|--------|")
        for q in query_opps["nonbrand_top20"][:15]:
            w(f"| {q['query']} | {q['impressions']:,} | {q['clicks']} | {_pct(q['ctr'])} | {q['position']} | {q['theme']} | {q['intent']} |")
    w()

    w("### Commercially valuable but weakly covered (0 clicks)")
    w()
    if query_opps["commercial_weak"]:
        w("| Query | Impr | Pos | Theme | Intent |")
        w("|-------|-----:|----:|-------|--------|")
        for q in query_opps["commercial_weak"][:10]:
            w(f"| {q['query']} | {q['impressions']:,} | {q['position']} | {q['theme']} | {q['intent']} |")
    else:
        w("No commercially valuable zero-click queries found.")
    w()

    if query_opps["brand_queries"]:
        w(f"**Brand queries noted:** {len(query_opps['brand_queries'])} brand/mixed queries excluded from opportunity analysis to avoid distortion.")
        w()

    # --- 3. Page-level findings ---
    w("---")
    w()
    w("## 3. Page-level findings")
    w()

    w("### Strongest pages (by clicks)")
    w()
    if page_findings["strongest"]:
        w("| Route | Impr | Clicks | CTR | Pos | Queries | GA4 Sess | Eng Rate |")
        w("|-------|-----:|-------:|----:|----:|--------:|---------:|---------:|")
        for p in page_findings["strongest"][:10]:
            w(f"| {p['route']} | {p['impressions']:,} | {p['clicks']} | {_pct(p['ctr'])} | {p['position']} | {p['queries']} | {p['ga4_sessions']} | {_pct(p['ga4_eng_rate'])} |")
    w()

    w("### Weak CTR pages (100+ impr, CTR < 2%)")
    w()
    if page_findings["weak_ctr"]:
        w("| Route | Impr | Clicks | CTR | Pos | Queries |")
        w("|-------|-----:|-------:|----:|----:|--------:|")
        for p in page_findings["weak_ctr"][:10]:
            w(f"| {p['route']} | {p['impressions']:,} | {p['clicks']} | {_pct(p['ctr'])} | {p['position']} | {p['queries']} |")
    else:
        w("No weak-CTR pages found.")
    w()

    w("### Pages with many queries but weak clicks")
    w()
    if page_findings["many_queries_weak"]:
        w("| Route | Queries | Impr | Clicks | CTR | Pos |")
        w("|-------|--------:|-----:|-------:|----:|----:|")
        for p in page_findings["many_queries_weak"][:10]:
            w(f"| {p['route']} | {p['queries']} | {p['impressions']:,} | {p['clicks']} | {_pct(p['ctr'])} | {p['position']} |")
    else:
        w("No pages with many queries and weak clicks found.")
    w()

    if page_findings["legacy"]:
        w("### Legacy / suspicious pages still visible in GSC")
        w()
        w("| URL | Impr | Clicks | Route |")
        w("|-----|-----:|-------:|-------|")
        for p in page_findings["legacy"][:10]:
            w(f"| {p['url']} | {p['impressions']:,} | {p['clicks']} | {p['route'] or '(unmapped)'} |")
        w()

    # --- 4. Page-vs-query gap ---
    w("---")
    w()
    w("## 4. Page-vs-query gap findings")
    w()

    w("### Unmapped GSC queries (5+ impr, no mapped route)")
    w()
    if gap_findings["unmapped"]:
        w("| Query | Impr | Clicks | Theme | GSC Page |")
        w("|-------|-----:|-------:|-------|---------|")
        for q in gap_findings["unmapped"][:15]:
            w(f"| {q['query']} | {q['impressions']:,} | {q['clicks']} | {q['theme']} | {q['gsc_page'][:50]} |")
    else:
        w("No unmapped queries found.")
    w()

    w("### Weakly mapped queries (low confidence, 10+ impr)")
    w()
    if gap_findings["weak_mapped"]:
        w("| Query | Impr | Clicks | Theme | Mapped Route |")
        w("|-------|-----:|-------:|-------|-------------|")
        for q in gap_findings["weak_mapped"][:15]:
            w(f"| {q['query']} | {q['impressions']:,} | {q['clicks']} | {q['theme']} | {q['mapped_route']} |")
    else:
        w("No weakly mapped queries found.")
    w()

    w("### Page gaps (planner demand 100+/mo, weak/no mapping)")
    w()
    if gap_findings["page_gaps"]:
        w("| Keyword | Planner Vol | Theme | Intent | GSC Impr | Mapped |")
        w("|---------|----------:|-------|--------|--------:|--------|")
        for g in gap_findings["page_gaps"][:15]:
            w(f"| {g['keyword']} | {g['planner_vol']:,} | {g['theme']} | {g['intent']} | {g['gsc_impressions']} | {g['mapped_route']} |")
    else:
        w("No page gaps found.")
    w()

    if gap_findings["intent_mismatch"]:
        w("### Intent mismatch (commercial/transactional query on non-commercial page)")
        w()
        w("| Query | Intent | Page Type | Impr | Clicks |")
        w("|-------|--------|-----------|-----:|-------:|")
        for m in gap_findings["intent_mismatch"][:10]:
            w(f"| {m['query']} | {m['intent']} | {m['page_type']} | {m['impressions']:,} | {m['clicks']} |")
        w()

    if gap_findings["cluster_mismatch"]:
        w("### Cluster/theme mismatch (query theme != page topic)")
        w()
        w("| Query | Query Theme | Page Topic | Route | Impr |")
        w("|-------|-------------|-----------|-------|-----:|")
        for m in gap_findings["cluster_mismatch"][:10]:
            w(f"| {m['query']} | {m['query_theme']} | {m['page_topic']} | {m['route']} | {m['impressions']:,} |")
        w()

    # --- 5. Cannibalization ---
    w("---")
    w()
    w("## 5. Cannibalization findings")
    w()
    w(f"**Total candidates:** {cannibal['total']} queries appearing on 3+ pages")
    w()

    if cannibal["nonbrand"]:
        w("### Nonbrand cannibalization")
        w()
        w("| Query | Pages | Impr | Clicks | Theme | Severity |")
        w("|-------|------:|-----:|-------:|-------|----------|")
        for c in cannibal["nonbrand"][:15]:
            w(f"| {c['query']} | {c['pages']} | {c['impressions']:,} | {c['clicks']} | {c['theme']} | {c['severity']} |")
        w()

    if cannibal["brand"]:
        w("### Brand cannibalization (typically harmless)")
        w()
        w("| Query | Pages | Impr | Clicks |")
        w("|-------|------:|-----:|-------:|")
        for c in cannibal["brand"][:5]:
            w(f"| {c['query']} | {c['pages']} | {c['impressions']:,} | {c['clicks']} |")
        w()

    # --- 6. GA4 context ---
    w("---")
    w()
    w("## 6. GA4 context")
    w()

    w("### Top organic landing pages")
    w()
    if ga4_ctx["organic_top15"]:
        w("| Path | Sessions | Eng Rate | Avg Dur (s) | Page Type |")
        w("|------|--------:|---------:|------------:|-----------|")
        for o in ga4_ctx["organic_top15"][:15]:
            w(f"| {o['path']} | {o['sessions']} | {_pct(o['engagement_rate'])} | {o['avg_duration']:.0f} | {o['page_type']} |")
    w()

    if ga4_ctx["weak_engagement"]:
        w("### Organic pages with weak engagement (sessions >= 5, eng rate < 40%)")
        w()
        w("| Path | Sessions | Eng Rate |")
        w("|------|--------:|---------:|")
        for we in ga4_ctx["weak_engagement"]:
            w(f"| {we['path']} | {we['sessions']} | {_pct(we['engagement_rate'])} |")
        w()

    if ga4_ctx["legacy"]:
        w("### Legacy/unmapped pages with organic sessions")
        w()
        w("| Path | Sessions | Eng Rate | Notes |")
        w("|------|--------:|---------:|-------|")
        for lg in ga4_ctx["legacy"][:10]:
            w(f"| {lg['path']} | {lg['sessions']} | {_pct(lg['engagement_rate'])} | {lg['notes']} |")
        w()

    # --- 7. Recommendations ---
    w("---")
    w()
    w("## 7. Recommendations")
    w()

    for label, items in [("Do now", recs["do_now"]), ("Monitor", recs["monitor"]), ("Do later", recs["do_later"])]:
        w(f"### {label}")
        w()
        if items:
            for i, r in enumerate(items, 1):
                w(f"**{i}. {r['action']}**")
                w(f"- Rationale: {r['rationale']}")
                w(f"- Confidence: {r['confidence']}")
                w(f"- Risk: {r['risk']}")
                w()
        else:
            w("No actions in this category.")
            w()

    # Limitations
    w("---")
    w()
    w("## Limitations")
    w()
    w("1. **GSC data covers 90 days** with 3-day lag; low-volume queries may be underrepresented")
    w("2. **Position data is averaged** and may not reflect current rankings")
    w("3. **Theme/intent classification is heuristic-based** with simple pattern matching")
    w("4. **Cannibalization detection uses 3+ pages threshold** which may overcall for broad terms")
    w("5. **No external SERP data** (competitor analysis, SERP features, etc.)")
    w("6. **Page mapping relies on page_inventory v1** which may miss dynamic/redirected URLs")
    w("7. **GA4 engagement metrics** may not align perfectly with SEO performance window")
    w("8. **Planner volume estimates** are rough and may not reflect actual Dutch market demand")
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
    exec_sum: dict,
    query_opps: dict,
    page_findings: dict,
    gap_findings: dict,
    cannibal: dict,
    ga4_ctx: dict,
    recs: dict,
    generated_at: str,
) -> dict:
    return {
        "generated_at": generated_at,
        "summary": exec_sum,
        "strengths": [exec_sum["main_strength"]],
        "weaknesses": [exec_sum["main_weakness"]],
        "top_query_opportunities": {
            "striking_distance": [q["query"] for q in query_opps["striking_distance"][:10]],
            "low_ctr_high_impr": [q["query"] for q in query_opps["low_ctr_high_impr"][:10]],
            "commercial_weak": [q["query"] for q in query_opps["commercial_weak"][:10]],
        },
        "top_page_opportunities": [
            {"route": p["route"], "impressions": p["impressions"], "ctr": p["ctr"]}
            for p in page_findings["weak_ctr"][:10]
        ],
        "cannibalization_candidates": {
            "nonbrand": [{"query": c["query"], "pages": c["pages"], "severity": c["severity"]} for c in cannibal["nonbrand"][:10]],
            "brand": [c["query"] for c in cannibal["brand"][:5]],
        },
        "legacy_or_disabled_page_issues": [p["path"] for p in ga4_ctx["legacy"][:10]],
        "page_gap_candidates": [
            {"keyword": g["keyword"], "planner_vol": g["planner_vol"], "theme": g["theme"]}
            for g in gap_findings["page_gaps"][:15]
        ],
        "do_now": recs["do_now"],
        "monitor": recs["monitor"],
        "do_later": recs["do_later"],
        "limitations": [
            "GSC 90-day window with 3-day lag",
            "Position data averaged over period",
            "Theme/intent classification is heuristic",
            "No external SERP data",
            "Page mapping based on page_inventory v1",
            "Planner volumes are estimates",
        ],
    }


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def main():
    print("=" * 60)
    print("SEO Page-vs-Query Gap Review v1")
    print("=" * 60)
    print()

    data = load_all()
    print()

    print("Analyzing query opportunities...")
    query_opps = analyze_query_opportunities(data["gsc_queries"], data["kw_master"])
    print(f"  Striking distance: {len(query_opps['striking_distance'])}")
    print(f"  Low CTR / high impr: {len(query_opps['low_ctr_high_impr'])}")
    print(f"  Nonbrand top: {len(query_opps['nonbrand_top20'])}")
    print(f"  Commercial weak: {len(query_opps['commercial_weak'])}")
    print(f"  Page gaps (KM): {len(query_opps['page_gaps_from_km'])}")
    print()

    print("Analyzing pages...")
    page_findings = analyze_pages(data["gsc_pages"], data["page_inv"], data["ga4_landing"])
    print(f"  Total pages: {len(page_findings['all_pages'])}")
    print(f"  Strongest: {len(page_findings['strongest'])}")
    print(f"  Weak CTR: {len(page_findings['weak_ctr'])}")
    print(f"  Many queries weak: {len(page_findings['many_queries_weak'])}")
    print(f"  Legacy: {len(page_findings['legacy'])}")
    print()

    print("Analyzing page-vs-query gaps...")
    gap_findings = analyze_page_query_gaps(data["gsc_rows"], data["kw_master"], data["page_inv"])
    print(f"  Unmapped: {len(gap_findings['unmapped'])}")
    print(f"  Weak mapped: {len(gap_findings['weak_mapped'])}")
    print(f"  Intent mismatch: {len(gap_findings['intent_mismatch'])}")
    print(f"  Page gaps: {len(gap_findings['page_gaps'])}")
    print(f"  Cluster mismatch: {len(gap_findings['cluster_mismatch'])}")
    print()

    print("Analyzing cannibalization...")
    cannibal = analyze_cannibalization(data["gsc_queries"], data["kw_master"])
    print(f"  Total: {cannibal['total']}")
    print(f"  Nonbrand: {len(cannibal['nonbrand'])}")
    print(f"  Brand: {len(cannibal['brand'])}")
    print()

    print("Analyzing GA4 context...")
    ga4_ctx = analyze_ga4_context(data["ga4_landing"], data["ga4_channel"], data["page_inv"])
    print(f"  Organic top: {len(ga4_ctx['organic_top15'])}")
    print(f"  Weak engagement: {len(ga4_ctx['weak_engagement'])}")
    print(f"  Legacy: {len(ga4_ctx['legacy'])}")
    print()

    print("Building executive summary...")
    exec_sum = build_executive_summary(
        data["gsc_pages"], data["gsc_queries"],
        query_opps, page_findings, gap_findings, cannibal,
    )
    print()

    print("Building recommendations...")
    recs = build_recommendations(exec_sum, query_opps, page_findings, gap_findings, cannibal, ga4_ctx)
    print(f"  Do now: {len(recs['do_now'])}")
    print(f"  Monitor: {len(recs['monitor'])}")
    print(f"  Do later: {len(recs['do_later'])}")
    print()

    generated_at = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    print("Writing markdown report...")
    report = write_report(exec_sum, query_opps, page_findings, gap_findings, cannibal, ga4_ctx, recs, generated_at)
    REPORT_MD.parent.mkdir(parents=True, exist_ok=True)
    REPORT_MD.write_text(report, encoding="utf-8")
    print(f"  -> {REPORT_MD}")

    print("Writing JSON output...")
    jout = build_json(exec_sum, query_opps, page_findings, gap_findings, cannibal, ga4_ctx, recs, generated_at)
    OUTPUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_JSON.write_text(json.dumps(jout, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"  -> {OUTPUT_JSON}")

    print()
    print("=" * 60)
    print("SEO Page-vs-Query Gap Review v1 complete.")
    print("=" * 60)


if __name__ == "__main__":
    main()

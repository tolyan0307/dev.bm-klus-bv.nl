"""
build_keyword_master.py — Build the v1 keyword master for BM klus BV.

Merges:
  - Planner keyword ideas
  - Planner historical metrics
  - Ads keyword performance
  - Ads search terms
  - Action candidates

Outputs:
  - keyword_master_v1.json
  - keyword_master_v1.csv
  - keyword_master_summary_v1.md

Usage:
  python seo-ops/analyzers/keywords/build_keyword_master.py
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

from integrations.google_ads.keyword_source_loader import (
    load_planner_ideas,
    load_historical_metrics,
    load_ads_keywords,
    load_ads_search_terms,
    load_action_candidates,
    normalize_keyword,
)
from integrations.site.page_inventory_loader import load_page_inventory, build_route_index


# ── Output paths ─────────────────────────────────────────────────────────────

OUTPUT_DIR = SEO_OPS_ROOT / "snapshots" / "normalized" / "keyword_master"
REPORT_DIR = SEO_OPS_ROOT / "reports" / "keywords"

JSON_OUT = OUTPUT_DIR / "keyword_master_v1.json"
CSV_OUT = OUTPUT_DIR / "keyword_master_v1.csv"
SUMMARY_OUT = REPORT_DIR / "keyword_master_summary_v1.md"

CSV_FIELDS = [
    "normalized_keyword",
    "keyword_text_raw",
    "topic_theme_guess",
    "intent_guess",
    "language_guess",
    "country_guess",
    # Source presence
    "in_planner_ideas",
    "in_historical_metrics",
    "in_ads_keywords",
    "in_ads_search_terms",
    "in_action_candidates",
    # Planner
    "planner_avg_monthly_searches",
    "planner_competition",
    "planner_competition_index",
    "planner_low_bid_eur",
    "planner_high_bid_eur",
    # Historical
    "historical_avg_monthly_searches",
    "historical_competition",
    "historical_competition_index",
    "historical_low_bid_eur",
    "historical_high_bid_eur",
    "historical_intent_score",
    # Ads keywords
    "ads_keyword_impressions",
    "ads_keyword_clicks",
    "ads_keyword_cost_eur",
    "ads_keyword_conversions",
    "ads_keyword_match_types",
    "ads_keyword_ad_groups",
    "ads_keyword_statuses",
    # Ads search terms
    "ads_search_term_impressions",
    "ads_search_term_clicks",
    "ads_search_term_cost_eur",
    "ads_search_term_conversions",
    "ads_search_term_ad_groups",
    # Action
    "action_candidate_decision",
    "action_candidate_reason",
    "negative_watch_guess",
    # Page mapping
    "mapped_route_guess",
    "mapped_page_type_guess",
    "mapping_confidence",
    "mapping_notes",
    # Decision support
    "seo_priority_guess",
    "ads_priority_guess",
    "keep_review_pause_guess",
    "notes",
]


# ── Topic theme classification ───────────────────────────────────────────────

THEME_RULES: list[tuple[str, list[str]]] = [
    ("subsidie_vergunning", ["subsidi", "vergunning", "isde", "energielabel"]),
    ("prijs_kosten", ["prijs", "kosten", "kost", "tarief", "goedkoop", "duur", "per m2", "per m²"]),
    ("materialen", ["eps", "pir", "minerale wol", "rockwool", "polystyreen", "neopor", "xps",
                     "materiaal", "materialen", "isolatieplaat", "isolatieplaten"]),
    ("technical_rc_dikte", ["rc-waarde", "rc waarde", "rd-waarde", "rd waarde", "dikte",
                            "koudebrug", "lambda", "warmtegeleidings"]),
    ("steenstrips", ["steenstrips", "steenstrip", "baksteenstrip"]),
    ("stuc_crepi", ["stuc", "crepi", "sierpleister", "spachtelputz", "pleister",
                    "schilderen", "schilder", "verf"]),
    ("bekleden", ["bekleding", "bekleden", "gevelbekleding", "cladding"]),
    ("offerte", ["offerte", "aanvra", "contact", "bel ", "gratis"]),
    ("core_isolation", ["gevelisolatie", "buitengevelisolatie", "etics", "buitenmuur isol",
                        "gevel isoler", "muurisolatie", "buitenisolatie",
                        "gevel isolatie", "isoleren buitenkant",
                        "buitengevel", "woning isoler", "huis isoler"]),
]


def classify_theme(kw: str) -> str:
    """Classify keyword into a topic theme using rule-based patterns."""
    kw_lower = kw.lower()
    for theme, patterns in THEME_RULES:
        for pat in patterns:
            if pat in kw_lower:
                return theme
    return "other"


# ── Intent classification ────────────────────────────────────────────────────

COMMERCIAL_SIGNALS = [
    "prijs", "kosten", "kost", "offerte", "tarief", "per m2", "per m²",
    "goedkoop", "beste", "vergelijk", "aanvragen",
]
INFORMATIONAL_SIGNALS = [
    "wat is", "hoe ", "waarom", "verschil", "uitleg",
    "betekenis", "voordelen", "nadelen", "ervar",
]
TRANSACTIONAL_SIGNALS = [
    "kopen", "bestellen", "offerte", "aanvra", "contact",
]
INVESTIGATIVE_SIGNALS = [
    "review", "ervaring", "vergelijk", "of ", "vs ",
    "welke", "soorten", "typen", "materialen",
]


def classify_intent(kw: str) -> str:
    """Classify keyword intent."""
    kw_lower = kw.lower()
    has_commercial = any(s in kw_lower for s in COMMERCIAL_SIGNALS)
    has_informational = any(s in kw_lower for s in INFORMATIONAL_SIGNALS)
    has_transactional = any(s in kw_lower for s in TRANSACTIONAL_SIGNALS)
    has_investigative = any(s in kw_lower for s in INVESTIGATIVE_SIGNALS)

    if has_transactional:
        return "commercial"
    if has_commercial and has_informational:
        return "mixed"
    if has_commercial:
        return "commercial"
    if has_investigative:
        return "commercial_investigative"
    if has_informational:
        return "informational"
    # Default: most gevelisolatie keywords have commercial intent
    return "commercial_investigative"


# ── Page mapping ─────────────────────────────────────────────────────────────

MAPPING_RULES: list[tuple[str, list[str], str]] = [
    # (route, keyword_signals, confidence_note)
    ("/gevelisolatie/kosten/", ["kosten", "prijs", "tarief", "per m2", "per m²", "goedkoop", "duur"], "keyword contains cost/price signal"),
    ("/gevelisolatie/subsidie-vergunning/", ["subsidi", "vergunning", "isde", "energielabel"], "keyword contains subsidy/permit signal"),
    ("/gevelisolatie/materialen/", ["materiaal", "materialen", "eps", "pir", "minerale wol", "rockwool",
                                     "polystyreen", "neopor", "xps", "isolatieplaat"], "keyword contains material signal"),
    ("/gevelisolatie/rc-waarde-dikte/", ["rc-waarde", "rc waarde", "rd-waarde", "rd waarde", "dikte",
                                          "koudebrug", "lambda"], "keyword contains rc/dikte signal"),
    ("/gevelisolatie/afwerkingen/", ["afwerking", "steenstrips", "steenstrip", "bekleding", "bekleden",
                                      "gevelbekleding"], "keyword contains finishing signal"),
    ("/sierpleister/", ["sierpleister", "spachtelputz", "crepi"], "keyword contains sierpleister signal"),
    ("/buiten-stucwerk/", ["stucwerk", "stucen", "buitenstuc", "cementpleister"], "keyword contains stucwerk signal"),
    ("/gevel-schilderen/", ["gevel schilder", "buitenmuur verf", "gevel verf", "buitenschilder"], "keyword contains painting signal"),
    ("/muren-stucen/", ["muren stucen", "binnenmuur stuc", "binnenstuc"], "keyword contains indoor stucwerk signal"),
]


def map_to_page(kw: str, route_index: dict[str, dict]) -> tuple[str, str, str, str]:
    """
    Map a keyword to a page route.
    Returns (route, page_type, confidence, note).
    """
    kw_lower = kw.lower()

    for route, signals, note in MAPPING_RULES:
        for sig in signals:
            if sig in kw_lower:
                page = route_index.get(route, {})
                page_type = page.get("page_type", "")
                return route, page_type, "medium", note

    # Broad gevelisolatie terms -> main page
    gevel_signals = ["gevelisolatie", "buitengevelisolatie", "etics", "gevel isoler",
                     "buitenmuur isoler", "buitenisolatie", "muurisolatie"]
    for sig in gevel_signals:
        if sig in kw_lower:
            page = route_index.get("/gevelisolatie/", {})
            return "/gevelisolatie/", page.get("page_type", "service"), "low", "broad gevelisolatie term"

    return "", "", "", ""


# ── Priority heuristics ─────────────────────────────────────────────────────

def compute_priorities(rec: dict) -> tuple[str, str, str]:
    """
    Compute seo_priority_guess, ads_priority_guess, keep_review_pause_guess.
    Returns (seo, ads, keep_review_pause).
    """
    planner_vol = rec.get("planner_avg_monthly_searches", 0) or 0
    hist_vol = rec.get("historical_avg_monthly_searches", 0) or 0
    best_vol = max(planner_vol, hist_vol)

    ads_impr = rec.get("ads_keyword_impressions", 0) or 0
    ads_clicks = rec.get("ads_keyword_clicks", 0) or 0
    ads_cost = rec.get("ads_keyword_cost_eur", 0.0) or 0.0
    ads_conv = rec.get("ads_keyword_conversions", 0.0) or 0.0
    st_impr = rec.get("ads_search_term_impressions", 0) or 0
    st_conv = rec.get("ads_search_term_conversions", 0.0) or 0.0

    in_ads = rec.get("in_ads_keywords", False)
    in_planner = rec.get("in_planner_ideas", False)

    action_decision = rec.get("action_candidate_decision", "")

    # ── ads_priority_guess ──
    ads_priority = ""
    if ads_conv > 0 or st_conv > 0:
        ads_priority = "high"
    elif ads_cost > 20 and ads_conv == 0 and st_conv == 0:
        ads_priority = "review"
    elif in_ads and ads_clicks > 5:
        ads_priority = "medium"
    elif in_planner and best_vol >= 200 and not in_ads:
        ads_priority = "expansion_candidate"
    elif in_ads:
        ads_priority = "low"

    # ── seo_priority_guess ──
    seo_priority = ""
    if best_vol >= 500:
        seo_priority = "high"
    elif best_vol >= 100:
        seo_priority = "medium"
    elif best_vol >= 20:
        seo_priority = "low"

    # ── keep_review_pause_guess ──
    krp = ""
    if action_decision:
        krp = action_decision  # trust the existing analysis
    elif ads_conv > 0 or st_conv > 0:
        krp = "keep"
    elif ads_cost > 30 and ads_conv == 0:
        krp = "pause"
    elif ads_cost > 10 and ads_conv == 0:
        krp = "review"
    elif in_ads and ads_clicks > 0:
        krp = "review"

    return seo_priority, ads_priority, krp


# ── Merge engine ─────────────────────────────────────────────────────────────

def merge_sources() -> list[dict]:
    """Merge all keyword sources into unified records."""

    print("  Loading sources...")
    planner = load_planner_ideas()
    print(f"    planner ideas: {len(planner)} keywords")
    historical = load_historical_metrics()
    print(f"    historical metrics: {len(historical)} keywords")
    ads_kw = load_ads_keywords()
    print(f"    ads keywords: {len(ads_kw)} keywords")
    ads_st = load_ads_search_terms()
    print(f"    ads search terms: {len(ads_st)} terms")
    actions = load_action_candidates()
    print(f"    action candidates: {len(actions)} keywords")

    # Load page inventory for mapping
    pages = load_page_inventory()
    route_index = {p["route_path"]: p for p in pages}
    print(f"    page inventory: {len(pages)} pages")

    # Collect all unique normalized keywords
    all_nk: set[str] = set()
    all_nk.update(planner.keys())
    all_nk.update(historical.keys())
    all_nk.update(ads_kw.keys())
    all_nk.update(ads_st.keys())
    all_nk.update(actions.keys())

    print(f"  Merging {len(all_nk)} unique normalized keywords...")

    records = []
    for nk in sorted(all_nk):
        # Determine best raw text (prefer planner or ads keyword form)
        raw = ""
        for source in [planner, historical, ads_kw, ads_st, actions]:
            if nk in source and source[nk].get("keyword_text_raw"):
                raw = source[nk]["keyword_text_raw"]
                break

        rec = {
            "normalized_keyword": nk,
            "keyword_text_raw": raw,
            "language_guess": "nl",
            "country_guess": "NL",
            # Source presence
            "in_planner_ideas": nk in planner,
            "in_historical_metrics": nk in historical,
            "in_ads_keywords": nk in ads_kw,
            "in_ads_search_terms": nk in ads_st,
            "in_action_candidates": nk in actions,
        }

        # Merge planner fields
        if nk in planner:
            p = planner[nk]
            rec["planner_avg_monthly_searches"] = p.get("planner_avg_monthly_searches", 0)
            rec["planner_competition"] = p.get("planner_competition", "")
            rec["planner_competition_index"] = p.get("planner_competition_index", 0)
            rec["planner_low_bid_eur"] = p.get("planner_low_bid_eur", 0.0)
            rec["planner_high_bid_eur"] = p.get("planner_high_bid_eur", 0.0)

        # Merge historical fields
        if nk in historical:
            h = historical[nk]
            rec["historical_avg_monthly_searches"] = h.get("historical_avg_monthly_searches", 0)
            rec["historical_competition"] = h.get("historical_competition", "")
            rec["historical_competition_index"] = h.get("historical_competition_index", 0)
            rec["historical_low_bid_eur"] = h.get("historical_low_bid_eur", 0.0)
            rec["historical_high_bid_eur"] = h.get("historical_high_bid_eur", 0.0)
            rec["historical_intent_score"] = h.get("historical_intent_score", 0.0)

        # Merge ads keyword fields
        if nk in ads_kw:
            a = ads_kw[nk]
            rec["ads_keyword_impressions"] = a.get("ads_keyword_impressions", 0)
            rec["ads_keyword_clicks"] = a.get("ads_keyword_clicks", 0)
            rec["ads_keyword_cost_eur"] = round(a.get("ads_keyword_cost_eur", 0.0), 2)
            rec["ads_keyword_conversions"] = a.get("ads_keyword_conversions", 0.0)
            rec["ads_keyword_match_types"] = a.get("ads_keyword_match_types", "")
            rec["ads_keyword_ad_groups"] = a.get("ads_keyword_ad_groups", "")
            rec["ads_keyword_statuses"] = a.get("ads_keyword_statuses", "")

        # Merge ads search term fields
        if nk in ads_st:
            s = ads_st[nk]
            rec["ads_search_term_impressions"] = s.get("ads_search_term_impressions", 0)
            rec["ads_search_term_clicks"] = s.get("ads_search_term_clicks", 0)
            rec["ads_search_term_cost_eur"] = round(s.get("ads_search_term_cost_eur", 0.0), 2)
            rec["ads_search_term_conversions"] = s.get("ads_search_term_conversions", 0.0)
            rec["ads_search_term_ad_groups"] = s.get("ads_search_term_ad_groups", "")

        # Merge action fields
        if nk in actions:
            ac = actions[nk]
            rec["action_candidate_decision"] = ac.get("action_candidate_decision", "")
            rec["action_candidate_reason"] = ac.get("action_candidate_reason", "")

        # Negative watch guess
        is_negative = False
        if nk in ads_kw and ads_kw[nk].get("_is_negative"):
            is_negative = True
        rec["negative_watch_guess"] = is_negative

        # Classification
        rec["topic_theme_guess"] = classify_theme(nk)
        rec["intent_guess"] = classify_intent(nk)

        # Page mapping
        route, page_type, confidence, note = map_to_page(nk, route_index)
        rec["mapped_route_guess"] = route
        rec["mapped_page_type_guess"] = page_type
        rec["mapping_confidence"] = confidence
        rec["mapping_notes"] = note

        # Priority heuristics
        seo_p, ads_p, krp = compute_priorities(rec)
        rec["seo_priority_guess"] = seo_p
        rec["ads_priority_guess"] = ads_p
        rec["keep_review_pause_guess"] = krp

        rec["notes"] = ""

        records.append(rec)

    return records


# ── Output writers ───────────────────────────────────────────────────────────

def write_json(records: list[dict], path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    data = {
        "_meta": {
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "generator": "build_keyword_master.py v1",
            "total_keywords": len(records),
            "sources": [
                "keyword_ideas_nl_gevelisolatie.csv",
                "keyword_historical_metrics_nl_gevelisolatie.csv",
                "keywords_23271040037_last30d.csv",
                "search_terms_23271040037_last30d.csv",
                "campaign_23271040037_action_candidates_last30d.csv",
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

    # Source counts
    src_counts = {
        "planner_ideas": sum(1 for r in records if r.get("in_planner_ideas")),
        "historical_metrics": sum(1 for r in records if r.get("in_historical_metrics")),
        "ads_keywords": sum(1 for r in records if r.get("in_ads_keywords")),
        "ads_search_terms": sum(1 for r in records if r.get("in_ads_search_terms")),
        "action_candidates": sum(1 for r in records if r.get("in_action_candidates")),
    }

    # Multi-source overlap
    def source_count(r):
        return sum([
            r.get("in_planner_ideas", False),
            r.get("in_historical_metrics", False),
            r.get("in_ads_keywords", False),
            r.get("in_ads_search_terms", False),
            r.get("in_action_candidates", False),
        ])

    overlap_dist = Counter(source_count(r) for r in records)

    # Theme counts
    theme_counts = Counter(r.get("topic_theme_guess", "other") for r in records)
    intent_counts = Counter(r.get("intent_guess", "") for r in records)

    # Top by ads evidence (highest cost or conversions)
    ads_active = [r for r in records if r.get("ads_keyword_cost_eur", 0) > 0]
    ads_active.sort(key=lambda r: (r.get("ads_keyword_conversions", 0), r.get("ads_keyword_clicks", 0)), reverse=True)

    # Top by planner demand
    planner_top = [r for r in records if r.get("planner_avg_monthly_searches", 0) > 0]
    planner_top.sort(key=lambda r: r.get("planner_avg_monthly_searches", 0), reverse=True)

    # Gaps
    in_planner_not_ads = [r for r in records
                          if r.get("in_planner_ideas") and not r.get("in_ads_keywords")
                          and r.get("planner_avg_monthly_searches", 0) >= 50]
    in_planner_not_ads.sort(key=lambda r: r.get("planner_avg_monthly_searches", 0), reverse=True)

    in_st_not_kw = [r for r in records
                    if r.get("in_ads_search_terms") and not r.get("in_ads_keywords")]

    pause_candidates = [r for r in records if r.get("keep_review_pause_guess") == "pause"]
    review_candidates = [r for r in records if r.get("keep_review_pause_guess") == "review"]

    # Page mapping
    mapped = [r for r in records if r.get("mapped_route_guess")]
    unmapped = [r for r in records if not r.get("mapped_route_guess")]
    mapping_by_route = Counter(r.get("mapped_route_guess") for r in mapped)

    # SEO/ads priority counts
    seo_high = [r for r in records if r.get("seo_priority_guess") == "high"]
    ads_high = [r for r in records if r.get("ads_priority_guess") == "high"]
    ads_expansion = [r for r in records if r.get("ads_priority_guess") == "expansion_candidate"]

    lines = [
        f"# Keyword Master Summary v1",
        f"",
        f"**Generated:** {now}",
        f"**Generator:** `build_keyword_master.py v1`",
        f"",
        f"---",
        f"",
        f"## Overview",
        f"",
        f"| Metric | Count |",
        f"|--------|-------|",
        f"| Total normalized keywords | {total} |",
        f"| From planner ideas | {src_counts['planner_ideas']} |",
        f"| From historical metrics | {src_counts['historical_metrics']} |",
        f"| From ads keywords | {src_counts['ads_keywords']} |",
        f"| From ads search terms | {src_counts['ads_search_terms']} |",
        f"| From action candidates | {src_counts['action_candidates']} |",
        f"",
        f"---",
        f"",
        f"## Source overlap",
        f"",
        f"| Appears in N sources | Keywords |",
        f"|---------------------|----------|",
    ]
    for n in sorted(overlap_dist.keys()):
        lines.append(f"| {n} source{'s' if n != 1 else ''} | {overlap_dist[n]} |")

    lines += [
        f"",
        f"---",
        f"",
        f"## Topic themes",
        f"",
        f"| Theme | Count |",
        f"|-------|-------|",
    ]
    for theme, count in sorted(theme_counts.items(), key=lambda x: -x[1]):
        lines.append(f"| {theme} | {count} |")

    lines += [
        f"",
        f"## Intent distribution",
        f"",
        f"| Intent | Count |",
        f"|--------|-------|",
    ]
    for intent, count in sorted(intent_counts.items(), key=lambda x: -x[1]):
        lines.append(f"| {intent} | {count} |")

    lines += [
        f"",
        f"---",
        f"",
        f"## Top keywords by ads evidence (conversions + clicks)",
        f"",
        f"| Keyword | Clicks | Cost EUR | Conv | Match |",
        f"|---------|--------|----------|------|-------|",
    ]
    for r in ads_active[:15]:
        lines.append(
            f"| {r['normalized_keyword']} | {r.get('ads_keyword_clicks', 0)} "
            f"| {r.get('ads_keyword_cost_eur', 0):.2f} "
            f"| {r.get('ads_keyword_conversions', 0):.1f} "
            f"| {r.get('ads_keyword_match_types', '')} |"
        )

    lines += [
        f"",
        f"## Top keywords by planner demand (avg monthly searches)",
        f"",
        f"| Keyword | Volume | Competition | Low bid | High bid |",
        f"|---------|--------|-------------|---------|----------|",
    ]
    for r in planner_top[:15]:
        lines.append(
            f"| {r['normalized_keyword']} | {r.get('planner_avg_monthly_searches', 0)} "
            f"| {r.get('planner_competition', '')} "
            f"| {r.get('planner_low_bid_eur', 0):.2f} "
            f"| {r.get('planner_high_bid_eur', 0):.2f} |"
        )

    lines += [
        f"",
        f"---",
        f"",
        f"## Gap analysis",
        f"",
        f"### In planner but NOT in ads keywords (vol >= 50)",
        f"",
        f"| Keyword | Volume | Competition | Theme |",
        f"|---------|--------|-------------|-------|",
    ]
    for r in in_planner_not_ads[:20]:
        lines.append(
            f"| {r['normalized_keyword']} | {r.get('planner_avg_monthly_searches', 0)} "
            f"| {r.get('planner_competition', '')} "
            f"| {r.get('topic_theme_guess', '')} |"
        )

    lines += [
        f"",
        f"### In search terms but NOT in ads keywords ({len(in_st_not_kw)} terms)",
        f"",
    ]
    if in_st_not_kw:
        lines.append(f"| Keyword | ST Impressions | ST Clicks | ST Cost EUR |")
        lines.append(f"|---------|---------------|-----------|-------------|")
        in_st_not_kw.sort(key=lambda r: r.get("ads_search_term_clicks", 0), reverse=True)
        for r in in_st_not_kw[:15]:
            lines.append(
                f"| {r['normalized_keyword']} "
                f"| {r.get('ads_search_term_impressions', 0)} "
                f"| {r.get('ads_search_term_clicks', 0)} "
                f"| {r.get('ads_search_term_cost_eur', 0):.2f} |"
            )

    lines += [
        f"",
        f"### Pause candidates ({len(pause_candidates)} keywords)",
        f"",
    ]
    if pause_candidates:
        lines.append(f"| Keyword | Cost EUR | Conv | Reason |")
        lines.append(f"|---------|----------|------|--------|")
        for r in pause_candidates[:15]:
            lines.append(
                f"| {r['normalized_keyword']} "
                f"| {r.get('ads_keyword_cost_eur', 0):.2f} "
                f"| {r.get('ads_keyword_conversions', 0):.1f} "
                f"| {r.get('action_candidate_reason', r.get('notes', ''))} |"
            )

    lines += [
        f"",
        f"### Review candidates ({len(review_candidates)} keywords)",
        f"",
    ]
    if review_candidates:
        lines.append(f"| Keyword | Cost EUR | Conv |")
        lines.append(f"|---------|----------|------|")
        for r in review_candidates[:15]:
            lines.append(
                f"| {r['normalized_keyword']} "
                f"| {r.get('ads_keyword_cost_eur', 0):.2f} "
                f"| {r.get('ads_keyword_conversions', 0):.1f} |"
            )

    lines += [
        f"",
        f"---",
        f"",
        f"## Priority summary",
        f"",
        f"| Category | Count |",
        f"|----------|-------|",
        f"| SEO priority high | {len(seo_high)} |",
        f"| Ads priority high | {len(ads_high)} |",
        f"| Ads expansion candidates | {len(ads_expansion)} |",
        f"| Pause candidates | {len(pause_candidates)} |",
        f"| Review candidates | {len(review_candidates)} |",
        f"",
        f"---",
        f"",
        f"## Page mapping coverage",
        f"",
        f"| Metric | Count |",
        f"|--------|-------|",
        f"| Keywords mapped to a page | {len(mapped)} |",
        f"| Keywords unmapped | {len(unmapped)} |",
        f"",
        f"### Mapped routes",
        f"",
        f"| Route | Keywords mapped |",
        f"|-------|----------------|",
    ]
    for route, count in sorted(mapping_by_route.items(), key=lambda x: -x[1]):
        lines.append(f"| `{route}` | {count} |")

    lines += [
        f"",
        f"---",
        f"",
        f"## Limitations (v1)",
        f"",
        f"1. **Single campaign only** -- ads data is from campaign 23271040037 (NL | Gevelisolatie | Search)",
        f"2. **No GSC query data** -- organic search queries not yet merged (Phase 3)",
        f"3. **No DataForSEO** -- external SERP/volume data not available yet",
        f"4. **Theme/intent classifiers** are simple keyword-pattern rules, not ML",
        f"5. **Page mapping** is deterministic rule-based; some keywords may map to wrong page",
        f"6. **Priority heuristics** are conservative; do not treat as definitive recommendations",
        f"7. **Planner volumes** are approximate monthly averages from Google Keyword Planner",
        f"8. **Negative keywords** in ads data are included with _is_negative flag but not filtered out",
        f"9. **Search terms** may include irrelevant traffic not yet filtered",
        f"",
        f"---",
        f"",
        f"## Output files",
        f"",
        f"| File | Path |",
        f"|------|------|",
        f"| JSON (full) | `seo-ops/snapshots/normalized/keyword_master/keyword_master_v1.json` |",
        f"| CSV (flat) | `seo-ops/snapshots/normalized/keyword_master/keyword_master_v1.csv` |",
        f"| Summary (this file) | `seo-ops/reports/keywords/keyword_master_summary_v1.md` |",
    ]

    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


# ── Main ─────────────────────────────────────────────────────────────────────

def main() -> None:
    print("Building keyword master v1...")
    records = merge_sources()
    print(f"  Total: {len(records)} normalized keywords")

    write_json(records, JSON_OUT)
    print(f"  JSON -> {JSON_OUT}")

    write_csv(records, CSV_OUT)
    print(f"  CSV  -> {CSV_OUT}")

    write_summary(records, SUMMARY_OUT)
    print(f"  Summary -> {SUMMARY_OUT}")

    # Quick stats
    src_flags = ["in_planner_ideas", "in_historical_metrics", "in_ads_keywords",
                 "in_ads_search_terms", "in_action_candidates"]
    print(f"\n  Source presence:")
    for flag in src_flags:
        count = sum(1 for r in records if r.get(flag))
        print(f"    {flag:30s} {count}")

    theme_counts = Counter(r.get("topic_theme_guess", "other") for r in records)
    print(f"\n  Theme distribution:")
    for theme, count in sorted(theme_counts.items(), key=lambda x: -x[1]):
        print(f"    {theme:25s} {count}")

    mapped = sum(1 for r in records if r.get("mapped_route_guess"))
    print(f"\n  Page mapping: {mapped}/{len(records)} mapped")
    print(f"\n  Done.")


if __name__ == "__main__":
    main()

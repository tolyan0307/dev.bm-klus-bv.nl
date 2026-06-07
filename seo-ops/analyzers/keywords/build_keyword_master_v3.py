"""
build_keyword_master_v3.py — Merge keyword_master v2 + DataForSEO enrichment into v3.

Conservative extension:
  - Preserves all v2 fields and rows intact
  - Adds DataForSEO columns to existing rows (enrichment v1 overlay)
  - Adds 3 genuinely new keywords from related_keywords v1
  - Does NOT redesign the schema or re-run classification from scratch

Reads:
  - keyword_master_v2.csv              (main base)
  - keyword_master_dataforseo_enrichment_v1.csv  (10 enriched keywords)
  - dataforseo_related_keywords_v1.csv           (related keywords incl. 3 new)

Outputs:
  - keyword_master_v3.csv
  - keyword_master_v3.json
  - keyword_master_v3_summary.md

Usage:
  cd seo-ops/integrations && .venv/Scripts/python ../analyzers/keywords/build_keyword_master_v3.py
"""

from __future__ import annotations

import csv
import json
import re
import sys
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

SEO_OPS = Path(__file__).resolve().parents[2]

# ── Input paths ──────────────────────────────────────────────────────────────

V2_CSV = SEO_OPS / "snapshots" / "normalized" / "keyword_master" / "keyword_master_v2.csv"
DFS_ENRICHMENT_CSV = (
    SEO_OPS / "snapshots" / "normalized" / "keyword_master"
    / "keyword_master_dataforseo_enrichment_v1.csv"
)
DFS_RELATED_CSV = (
    SEO_OPS / "snapshots" / "normalized" / "keyword_master"
    / "dataforseo_related_keywords_v1.csv"
)

# ── Output paths ─────────────────────────────────────────────────────────────

OUTPUT_DIR = SEO_OPS / "snapshots" / "normalized" / "keyword_master"
REPORT_DIR = SEO_OPS / "reports" / "keywords"
CSV_OUT = OUTPUT_DIR / "keyword_master_v3.csv"
JSON_OUT = OUTPUT_DIR / "keyword_master_v3.json"
SUMMARY_OUT = REPORT_DIR / "keyword_master_v3_summary.md"

# ── v3 field order (v2 fields + 8 new DataForSEO fields at end) ─────────────

V2_FIELDS = [
    "normalized_keyword", "keyword_text_raw",
    "topic_theme_guess", "intent_guess", "language_guess", "country_guess",
    "brand_nonbrand_guess",
    "in_planner_ideas", "in_historical_metrics", "in_ads_keywords",
    "in_ads_search_terms", "in_action_candidates", "in_gsc_queries",
    "planner_avg_monthly_searches", "planner_competition", "planner_competition_index",
    "planner_low_bid_eur", "planner_high_bid_eur",
    "historical_avg_monthly_searches", "historical_competition", "historical_competition_index",
    "historical_low_bid_eur", "historical_high_bid_eur", "historical_intent_score",
    "ads_keyword_impressions", "ads_keyword_clicks", "ads_keyword_cost_eur",
    "ads_keyword_conversions", "ads_keyword_match_types", "ads_keyword_ad_groups",
    "ads_keyword_statuses",
    "ads_search_term_impressions", "ads_search_term_clicks", "ads_search_term_cost_eur",
    "ads_search_term_conversions", "ads_search_term_ad_groups",
    "action_candidate_decision", "action_candidate_reason", "negative_watch_guess",
    "gsc_total_clicks", "gsc_total_impressions", "gsc_weighted_ctr",
    "gsc_best_position_guess", "gsc_distinct_pages_count",
    "gsc_possible_cannibalization_guess",
    "gsc_top_page_guess", "gsc_top_page_clicks", "gsc_top_page_impressions",
    "gsc_top_page_route_guess", "gsc_top_page_type_guess",
    "mapped_route_guess", "mapped_page_type_guess", "mapping_confidence", "mapping_notes",
    "seo_priority_guess", "seo_opportunity_type", "seo_opportunity_reason",
    "ppc_seo_overlap_guess", "ppc_seo_notes",
    "ads_priority_guess", "keep_review_pause_guess",
    "notes",
]

DFS_FIELDS = [
    "in_dataforseo_overview",
    "in_dataforseo_related",
    "dataforseo_search_volume",
    "dataforseo_cpc",
    "dataforseo_competition",
    "dataforseo_intent",
    "dataforseo_source_type",
    "external_discovery_status",
]

CSV_FIELDS = V2_FIELDS + DFS_FIELDS


# ── Normalize helper ─────────────────────────────────────────────────────────

def normalize_keyword(kw: str) -> str:
    """Lowercase, strip, collapse whitespace."""
    return re.sub(r"\s+", " ", kw.strip().lower())


# ── Load helpers ─────────────────────────────────────────────────────────────

def load_v2() -> list[dict]:
    with open(V2_CSV, encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


def load_dfs_enrichment() -> dict[str, dict]:
    """Return {keyword: row} from enrichment v1."""
    result = {}
    with open(DFS_ENRICHMENT_CSV, encoding="utf-8", newline="") as f:
        for row in csv.DictReader(f):
            kw = normalize_keyword(row.get("keyword", ""))
            if kw:
                result[kw] = row
    return result


def load_dfs_related_new() -> dict[str, dict]:
    """Return {related_keyword: best_row} for new_but_relevant only, deduplicated."""
    result = {}
    with open(DFS_RELATED_CSV, encoding="utf-8", newline="") as f:
        for row in csv.DictReader(f):
            if row.get("novelty_bucket") != "new_but_relevant":
                continue
            kw = normalize_keyword(row.get("related_keyword", ""))
            if kw and kw not in result:
                result[kw] = row
    return result


# ── New keyword row builder ──────────────────────────────────────────────────

# Conservative classification for new keywords
NEW_KEYWORD_PROFILES = {
    "zelf buitenmuur isoleren": {
        "topic_theme_guess": "core_isolation",
        "intent_guess": "informational",
        "mapped_route_guess": "",
        "mapped_page_type_guess": "",
        "mapping_confidence": "",
        "mapping_notes": "DIY intent; no dedicated page exists; potential content/blog topic",
        "seo_priority_guess": "low",
        "seo_opportunity_type": "none",
        "seo_opportunity_reason": "new discovery, no GSC/Ads data yet",
        "ads_priority_guess": "",
        "keep_review_pause_guess": "review",
    },
    "wetgeving isolatie buitenmuur": {
        "topic_theme_guess": "subsidie_vergunning",
        "intent_guess": "informational",
        "mapped_route_guess": "/gevelisolatie/subsidie-en-vergunning/",
        "mapped_page_type_guess": "cluster_info",
        "mapping_confidence": "low",
        "mapping_notes": "Regulation/compliance intent; may partially align with subsidie page",
        "seo_priority_guess": "low",
        "seo_opportunity_type": "none",
        "seo_opportunity_reason": "new discovery, regulation-focused, niche",
        "ads_priority_guess": "",
        "keep_review_pause_guess": "review",
    },
    "buitenmuur isoleren en bekleden met hout": {
        "topic_theme_guess": "bekleden",
        "intent_guess": "informational",
        "mapped_route_guess": "",
        "mapped_page_type_guess": "",
        "mapping_confidence": "",
        "mapping_notes": "Niche long-tail; hout+bekleden combo; no matching page",
        "seo_priority_guess": "low",
        "seo_opportunity_type": "none",
        "seo_opportunity_reason": "new discovery, niche long-tail",
        "ads_priority_guess": "",
        "keep_review_pause_guess": "review",
    },
}


def build_new_row(kw: str, dfs_related_row: dict) -> dict:
    """Build a full v3 row for a newly discovered keyword."""
    profile = NEW_KEYWORD_PROFILES.get(kw, {})
    row = {}

    # Identity
    row["normalized_keyword"] = kw
    row["keyword_text_raw"] = kw
    row["language_guess"] = "nl"
    row["country_guess"] = "NL"
    row["brand_nonbrand_guess"] = "nonbrand"

    # All internal source flags are False for new keywords
    for f in ["in_planner_ideas", "in_historical_metrics", "in_ads_keywords",
              "in_ads_search_terms", "in_action_candidates", "in_gsc_queries"]:
        row[f] = ""

    # All internal data fields are blank
    for f in V2_FIELDS:
        if f not in row:
            row[f] = ""

    # Apply conservative profile
    for k, v in profile.items():
        row[k] = v

    row["notes"] = "Added in v3 from DataForSEO related_keywords discovery"

    # DataForSEO fields from related row
    row["in_dataforseo_overview"] = ""
    row["in_dataforseo_related"] = "True"
    row["dataforseo_search_volume"] = dfs_related_row.get("search_volume", "")
    row["dataforseo_cpc"] = dfs_related_row.get("cpc", "")
    row["dataforseo_competition"] = dfs_related_row.get("competition", "")
    row["dataforseo_intent"] = dfs_related_row.get("intent", "")
    row["dataforseo_source_type"] = "related_keywords"
    row["external_discovery_status"] = "newly_discovered_relevant"

    return row


# ── Main merge ───────────────────────────────────────────────────────────────

def merge_v3() -> tuple[list[dict], dict]:
    """
    Returns (records, stats) where stats captures merge metrics.
    """
    print("  Loading keyword_master v2...")
    v2_rows = load_v2()
    print(f"    v2: {len(v2_rows)} keywords")

    print("  Loading DataForSEO enrichment v1...")
    dfs_enrichment = load_dfs_enrichment()
    print(f"    Enrichment: {len(dfs_enrichment)} keywords")

    print("  Loading DataForSEO related keywords v1 (new only)...")
    dfs_related_new = load_dfs_related_new()
    print(f"    New related: {len(dfs_related_new)} unique keywords")

    # Build v2 index for overlap checking
    v2_index = set()
    for row in v2_rows:
        nk = normalize_keyword(row.get("normalized_keyword", ""))
        v2_index.add(nk)

    stats = {
        "v2_total": len(v2_rows),
        "enriched_count": 0,
        "new_added": [],
        "new_skipped": [],
    }

    # Step 1: Enrich existing v2 rows with DataForSEO overlay
    records = []
    for row in v2_rows:
        nk = normalize_keyword(row.get("normalized_keyword", ""))

        # DataForSEO overlay
        dfs = dfs_enrichment.get(nk)
        dfs_rel = dfs_related_new.get(nk)  # might also appear in related

        row["in_dataforseo_overview"] = "True" if dfs else ""
        row["in_dataforseo_related"] = "True" if dfs_rel else ""

        if dfs:
            row["dataforseo_search_volume"] = dfs.get("dataforseo_search_volume", "")
            row["dataforseo_cpc"] = dfs.get("dataforseo_cpc", "")
            row["dataforseo_competition"] = dfs.get("dataforseo_competition", "")
            row["dataforseo_intent"] = dfs.get("dataforseo_intent", "")
            row["dataforseo_source_type"] = "keyword_overview"
            row["external_discovery_status"] = "existing_confirmed"
            stats["enriched_count"] += 1
        elif dfs_rel:
            row["dataforseo_search_volume"] = dfs_rel.get("search_volume", "")
            row["dataforseo_cpc"] = dfs_rel.get("cpc", "")
            row["dataforseo_competition"] = dfs_rel.get("competition", "")
            row["dataforseo_intent"] = dfs_rel.get("intent", "")
            row["dataforseo_source_type"] = "related_keywords"
            row["external_discovery_status"] = "existing_confirmed"
            stats["enriched_count"] += 1
        else:
            row["dataforseo_search_volume"] = ""
            row["dataforseo_cpc"] = ""
            row["dataforseo_competition"] = ""
            row["dataforseo_intent"] = ""
            row["dataforseo_source_type"] = ""
            row["external_discovery_status"] = "none"

        records.append(row)

    # Step 2: Add genuinely new keywords from related_keywords
    for kw, rel_row in sorted(dfs_related_new.items()):
        if kw in v2_index:
            continue  # already exists
        new_row = build_new_row(kw, rel_row)
        records.append(new_row)
        stats["new_added"].append(kw)
        print(f"    + NEW: {kw} (vol={rel_row.get('search_volume', '?')})")

    # Sort: existing v2 order preserved, new ones appended at end (already sorted)
    return records, stats


# ── Writers ──────────────────────────────────────────────────────────────────

def write_csv(records: list[dict]) -> None:
    CSV_OUT.parent.mkdir(parents=True, exist_ok=True)
    with open(CSV_OUT, "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=CSV_FIELDS, extrasaction="ignore")
        w.writeheader()
        w.writerows(records)
    print(f"  CSV  -> {CSV_OUT.relative_to(SEO_OPS)}")


def write_json(records: list[dict]) -> None:
    JSON_OUT.parent.mkdir(parents=True, exist_ok=True)
    data = {
        "_meta": {
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "generator": "build_keyword_master_v3.py",
            "total_keywords": len(records),
            "sources": [
                "keyword_master_v2.csv",
                "keyword_master_dataforseo_enrichment_v1.csv",
                "dataforseo_related_keywords_v1.csv",
            ],
            "changes_from_v2": "Added 8 DataForSEO fields; merged 3 new keywords from related_keywords",
        },
        "keywords": records,
    }
    JSON_OUT.write_text(
        json.dumps(data, indent=2, ensure_ascii=False, default=str) + "\n",
        encoding="utf-8",
    )
    print(f"  JSON -> {JSON_OUT.relative_to(SEO_OPS)}")


def write_summary(records: list[dict], stats: dict) -> None:
    SUMMARY_OUT.parent.mkdir(parents=True, exist_ok=True)
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    total = len(records)
    v2_total = stats["v2_total"]
    enriched = stats["enriched_count"]
    new_added = stats["new_added"]

    # DataForSEO coverage
    has_dfs_overview = sum(1 for r in records if r.get("in_dataforseo_overview") == "True")
    has_dfs_related = sum(1 for r in records if r.get("in_dataforseo_related") == "True")
    has_any_dfs = sum(1 for r in records if r.get("external_discovery_status") not in ("none", ""))

    # Discovery status breakdown
    disc_dist = Counter(r.get("external_discovery_status", "none") for r in records)

    # New keywords detail
    new_records = [r for r in records if r.get("external_discovery_status") == "newly_discovered_relevant"]

    # Enriched existing keywords
    confirmed_records = [r for r in records if r.get("external_discovery_status") == "existing_confirmed"]

    lines = [
        "# Keyword Master v3 Summary",
        "",
        f"**Generated:** {now}",
        f"**Generator:** `build_keyword_master_v3.py`",
        "",
        "---",
        "",
        "## v2 -> v3 change summary",
        "",
        f"| Metric | Value |",
        f"|--------|-------|",
        f"| v2 keywords | {v2_total} |",
        f"| v3 keywords | {total} |",
        f"| New keywords added | {len(new_added)} |",
        f"| Existing keywords enriched with DFS data | {enriched} |",
        f"| New DataForSEO fields added | 8 |",
        f"| Schema fields removed | 0 |",
        "",
        "### Schema changes",
        "",
        "New fields added at end of CSV (no v2 fields modified or removed):",
        "",
        "| Field | Type | Description |",
        "|-------|------|-------------|",
        "| in_dataforseo_overview | bool | Was in keyword_overview enrichment batch |",
        "| in_dataforseo_related | bool | Appeared in related_keywords results |",
        "| dataforseo_search_volume | int | DataForSEO reported search volume |",
        "| dataforseo_cpc | float | DataForSEO CPC estimate |",
        "| dataforseo_competition | float | DataForSEO competition score |",
        "| dataforseo_intent | str | DataForSEO intent classification |",
        "| dataforseo_source_type | str | keyword_overview or related_keywords |",
        "| external_discovery_status | str | existing_confirmed / newly_discovered_relevant / none |",
        "",
        "---",
        "",
        "## DataForSEO coverage",
        "",
        f"| Metric | Count |",
        f"|--------|-------|",
        f"| With keyword_overview data | {has_dfs_overview} |",
        f"| In related_keywords results | {has_dfs_related} |",
        f"| Any external data | {has_any_dfs} |",
        f"| No external data | {total - has_any_dfs} |",
        "",
        "### Discovery status",
        "",
        "| Status | Count |",
        "|--------|-------|",
    ]
    for status in ["existing_confirmed", "newly_discovered_relevant", "none"]:
        lines.append(f"| {status} | {disc_dist.get(status, 0)} |")

    # Enriched existing
    lines += [
        "",
        "---",
        "",
        f"## Enriched existing keywords ({enriched})",
        "",
        "These keywords already existed in v2 and now have DataForSEO confirmation.",
        "",
        "| Keyword | DFS Vol | DFS CPC | DFS Intent | Source |",
        "|---------|---------|---------|------------|--------|",
    ]
    for r in sorted(confirmed_records, key=lambda x: int(x.get("dataforseo_search_volume") or 0), reverse=True):
        lines.append(
            f"| {r['normalized_keyword']} "
            f"| {r.get('dataforseo_search_volume', '')} "
            f"| {r.get('dataforseo_cpc', '')} "
            f"| {r.get('dataforseo_intent', '')} "
            f"| {r.get('dataforseo_source_type', '')} |"
        )

    # New keywords
    lines += [
        "",
        "---",
        "",
        f"## Newly added keywords ({len(new_added)})",
        "",
    ]
    if new_added:
        lines += [
            "| Keyword | Vol | CPC | Intent | Theme | Priority | Status |",
            "|---------|-----|-----|--------|-------|----------|--------|",
        ]
        for r in new_records:
            lines.append(
                f"| {r['normalized_keyword']} "
                f"| {r.get('dataforseo_search_volume', '')} "
                f"| {r.get('dataforseo_cpc', '')} "
                f"| {r.get('dataforseo_intent', '')} "
                f"| {r.get('topic_theme_guess', '')} "
                f"| {r.get('seo_priority_guess', '')} "
                f"| {r.get('keep_review_pause_guess', '')} |"
            )

        lines += [
            "",
            "### New keyword assessment",
            "",
        ]
        for kw in new_added:
            profile = NEW_KEYWORD_PROFILES.get(kw, {})
            lines.append(f"**{kw}**")
            lines.append(f"- Theme: {profile.get('topic_theme_guess', 'unknown')}")
            lines.append(f"- Intent: {profile.get('intent_guess', 'unknown')}")
            lines.append(f"- Mapping: {profile.get('mapping_notes', 'none')}")
            lines.append(f"- Status: watchlist/review -- no internal data yet")
            lines.append("")
    else:
        lines.append("_No new keywords added._")

    # Semantic coverage assessment
    lines += [
        "---",
        "",
        "## Did DataForSEO meaningfully change semantic coverage?",
        "",
        f"**Marginally.** Out of {total} total keywords:",
        f"- {enriched} got external volume/CPC/intent confirmation (useful for validation)",
        f"- {len(new_added)} genuinely new keywords were added (small but targeted)",
        f"- The existing keyword master already covered 11 of 18 related keywords returned",
        "",
        "DataForSEO's main value so far is **validation** (confirming planner volumes and",
        "adding intent signals), not **discovery** (most related terms were already known).",
        "",
        "---",
        "",
        "## Recommended next step",
        "",
        "1. **Keep using DataForSEO for targeted checks** -- keyword_overview on specific",
        "   shortlists remains low-cost and useful for CPC/intent validation",
        "2. **Expand to 1-2 more related_keywords seeds later** (e.g. gevelisolatie, gevelisolatie kosten)",
        "   but only after evaluating whether v3 new keywords surface in GSC",
        "3. **No need to scale broad enrichment yet** -- current balance (~$0.95) should be",
        "   preserved for high-value spot checks",
        "4. **Monitor new keywords** -- if they appear in GSC within 2-4 weeks, consider",
        "   promoting them from watchlist to active optimization targets",
        "",
        "---",
        "",
        "## Limitations (v3)",
        "",
        "1. DataForSEO enrichment covers only 10+3 keywords -- vast majority has no external data",
        "2. Intent classification from DataForSEO is model-based, not verified against SERP",
        "3. New keyword mapping is conservative and low-confidence",
        "4. Volume alignment between Planner and DataForSEO is expected (same underlying source)",
        "5. All v2 limitations still apply (GSC 90d window, simple brand classifier, etc.)",
        "",
        "---",
        "",
        "## Output files",
        "",
        "| File | Path |",
        "|------|------|",
        f"| JSON (full) | `{JSON_OUT.relative_to(SEO_OPS)}` |",
        f"| CSV (flat) | `{CSV_OUT.relative_to(SEO_OPS)}` |",
        f"| Summary (this file) | `{SUMMARY_OUT.relative_to(SEO_OPS)}` |",
    ]

    SUMMARY_OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"  Summary -> {SUMMARY_OUT.relative_to(SEO_OPS)}")


# ── Main ─────────────────────────────────────────────────────────────────────

def main() -> None:
    print("Building keyword master v3...")
    records, stats = merge_v3()
    print(f"  Total: {len(records)} keywords")

    write_csv(records)
    write_json(records)
    write_summary(records, stats)

    print(f"\n  v2: {stats['v2_total']} -> v3: {len(records)} keywords")
    print(f"  Enriched: {stats['enriched_count']}")
    print(f"  New added: {stats['new_added']}")
    print(f"  Done.")


if __name__ == "__main__":
    main()

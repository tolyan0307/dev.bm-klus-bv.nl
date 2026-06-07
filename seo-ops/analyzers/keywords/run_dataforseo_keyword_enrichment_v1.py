"""
run_dataforseo_keyword_enrichment_v1.py

Enriches a small shortlist of high-value keywords with external DataForSEO
keyword overview data. Compares against internal evidence (Planner, GSC, Ads).

Usage (from seo-ops/integrations/):
    .venv/Scripts/python -m analyzers.keywords.run_dataforseo_keyword_enrichment_v1

Or from seo-ops/:
    integrations/.venv/Scripts/python analyzers/keywords/run_dataforseo_keyword_enrichment_v1.py

Outputs:
    snapshots/raw/dataforseo/dataforseo_keyword_overview_v1.json
    snapshots/normalized/keyword_master/keyword_master_dataforseo_enrichment_v1.csv
    reports/keywords/dataforseo_keyword_enrichment_v1.md
    outputs/dataforseo_keyword_enrichment_v1.json
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
SEO_OPS = Path(__file__).resolve().parents[2]  # seo-ops/
INTEGRATIONS = SEO_OPS / "integrations"

# Ensure integrations is on path so dataforseo package is importable
sys.path.insert(0, str(INTEGRATIONS))

from dataforseo.labs_google import LabsGoogle

KEYWORD_MASTER = (
    SEO_OPS / "snapshots" / "normalized" / "keyword_master" / "keyword_master_v2.csv"
)
RAW_SNAPSHOT = SEO_OPS / "snapshots" / "raw" / "dataforseo" / "dataforseo_keyword_overview_v1.json"
ENRICHMENT_CSV = (
    SEO_OPS / "snapshots" / "normalized" / "keyword_master"
    / "keyword_master_dataforseo_enrichment_v1.csv"
)
REPORT_MD = SEO_OPS / "reports" / "keywords" / "dataforseo_keyword_enrichment_v1.md"
OUTPUT_JSON = SEO_OPS / "outputs" / "dataforseo_keyword_enrichment_v1.json"

# ---------------------------------------------------------------------------
# Shortlist: 10 high-value keywords, each with selection rationale
# ---------------------------------------------------------------------------
SHORTLIST = [
    {
        "keyword": "gevelisolatie rotterdam",
        "source_bucket": "seo_do_now",
        "why_selected": "Biggest SEO opportunity: striking distance pos 8.0, 1369 impr",
    },
    {
        "keyword": "buitengevelisolatie",
        "source_bucket": "ppc_do_now + seo_monitor",
        "why_selected": "Proven PPC converter (1 conv, 27 clicks) + high GSC impressions (517)",
    },
    {
        "keyword": "buitenmuur isoleren",
        "source_bucket": "ppc_do_now",
        "why_selected": "Proven PPC converter (1 conv, 9 clicks), high planner vol 1000",
    },
    {
        "keyword": "gevel van buiten isoleren",
        "source_bucket": "ppc_do_now",
        "why_selected": "Proven PPC converter (1 conv, 21 clicks), low CPA 18 EUR",
    },
    {
        "keyword": "gevelisolatie kosten",
        "source_bucket": "seo_do_now",
        "why_selected": "Striking distance pos 19.3, planner vol 260, kosten intent = high commercial",
    },
    {
        "keyword": "gevelisolatie",
        "source_bucket": "cross_channel",
        "why_selected": "Head term, planner vol 2400, 25 ads clicks, core brand relevance",
    },
    {
        "keyword": "buitenmuur isolatie",
        "source_bucket": "unmapped_gap",
        "why_selected": "Planner vol 320, no page mapping, potential content gap",
    },
    {
        "keyword": "isoleren van buitenmuren",
        "source_bucket": "unmapped_gap",
        "why_selected": "Planner vol 1000, unmapped, high volume gap candidate",
    },
    {
        "keyword": "gevelisolatie buitenkant",
        "source_bucket": "seo_do_now",
        "why_selected": "Striking distance pos 19.6, planner vol 590, core isolation theme",
    },
    {
        "keyword": "buitengevel isoleren",
        "source_bucket": "ppc_do_now",
        "why_selected": "13 ads clicks, planner vol 480, core isolation synonym",
    },
]


# ---------------------------------------------------------------------------
# Load internal evidence from keyword_master_v2.csv
# ---------------------------------------------------------------------------
def load_internal_data() -> dict[str, dict]:
    """Return {normalized_keyword: row_dict} for shortlist keywords."""
    with open(KEYWORD_MASTER, encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        all_rows = {r["normalized_keyword"]: r for r in reader}
    return {kw["keyword"]: all_rows.get(kw["keyword"], {}) for kw in SHORTLIST}


# ---------------------------------------------------------------------------
# Call DataForSEO keyword_overview
# ---------------------------------------------------------------------------
def fetch_keyword_overview(keywords: list[str]) -> dict:
    labs = LabsGoogle()
    return labs.keyword_overview(keywords=keywords)


# ---------------------------------------------------------------------------
# Parse DataForSEO response into per-keyword dict
# ---------------------------------------------------------------------------
def parse_overview_response(raw: dict) -> dict[str, dict]:
    """Extract per-keyword fields from DataForSEO keyword_overview response."""
    result = {}
    tasks = raw.get("tasks", [])
    for task in tasks:
        for item in task.get("result", []):
            items_list = item.get("items", [])
            for entry in items_list:
                kw_data = entry.get("keyword_info", {})
                keyword = entry.get("keyword", "")
                if not keyword:
                    continue
                result[keyword] = {
                    "search_volume": kw_data.get("search_volume"),
                    "cpc": kw_data.get("cpc"),
                    "competition": kw_data.get("competition"),
                    "competition_level": kw_data.get("competition_level"),
                    "categories": kw_data.get("categories"),
                    "monthly_searches": kw_data.get("monthly_searches", []),
                    # keyword_properties may have intent info
                    "keyword_properties": entry.get("keyword_properties", {}),
                    "search_intent_info": entry.get("search_intent_info", {}),
                    "impressions_info": entry.get("impressions_info", {}),
                    "serp_info": entry.get("serp_info", {}),
                }
    return result


# ---------------------------------------------------------------------------
# Alignment heuristics
# ---------------------------------------------------------------------------
def _safe_int(val) -> int | None:
    if val is None or val == "":
        return None
    try:
        return int(float(val))
    except (ValueError, TypeError):
        return None


def volume_alignment(planner_vol: int | None, dfs_vol: int | None) -> str:
    if planner_vol is None or dfs_vol is None:
        return "unavailable"
    if planner_vol == 0 and dfs_vol == 0:
        return "agrees"
    if planner_vol == 0 or dfs_vol == 0:
        return "diverges"
    ratio = max(planner_vol, dfs_vol) / min(planner_vol, dfs_vol)
    if ratio <= 1.5:
        return "agrees"
    if ratio <= 3.0:
        return "somewhat_agrees"
    return "diverges"


def commercial_alignment(
    ads_clicks: int | None, ads_conv: float | None, dfs_cpc: float | None
) -> str:
    has_ads = ads_clicks is not None and ads_clicks > 0
    has_cpc = dfs_cpc is not None and dfs_cpc > 0
    has_conv = ads_conv is not None and ads_conv > 0

    if not has_ads and not has_cpc:
        return "unavailable"
    if has_conv and has_cpc:
        return "strong"
    if has_ads and has_cpc:
        return "medium"
    if has_ads or has_cpc:
        return "weak"
    return "unavailable"


# ---------------------------------------------------------------------------
# Build enrichment rows
# ---------------------------------------------------------------------------
def build_enrichment(
    internal: dict[str, dict], dfs_data: dict[str, dict]
) -> list[dict]:
    rows = []
    for entry in SHORTLIST:
        kw = entry["keyword"]
        int_row = internal.get(kw, {})
        dfs = dfs_data.get(kw, {})

        planner_vol = _safe_int(int_row.get("planner_avg_monthly_searches"))
        hist_vol = _safe_int(int_row.get("historical_avg_monthly_searches"))
        gsc_imp = _safe_int(int_row.get("gsc_total_impressions"))
        ads_clicks = _safe_int(int_row.get("ads_keyword_clicks"))
        ads_conv_raw = int_row.get("ads_keyword_conversions")
        ads_conv = float(ads_conv_raw) if ads_conv_raw not in (None, "") else None

        dfs_vol = dfs.get("search_volume")
        dfs_cpc = dfs.get("cpc")
        dfs_comp = dfs.get("competition")
        dfs_comp_level = dfs.get("competition_level")

        # Intent from search_intent_info
        intent_info = dfs.get("search_intent_info", {})
        dfs_intent = intent_info.get("main_intent", "") if intent_info else ""

        vol_align = volume_alignment(planner_vol, dfs_vol)
        comm_align = commercial_alignment(ads_clicks, ads_conv, dfs_cpc)

        notes = []
        if vol_align == "diverges":
            notes.append(f"Volume mismatch: planner={planner_vol} vs dfs={dfs_vol}")
        if vol_align == "unavailable":
            notes.append("Volume comparison unavailable (missing planner or DFS data)")
        if comm_align == "strong":
            notes.append("Strong commercial signal confirmed")
        if comm_align == "weak":
            notes.append("Weak commercial signal: has CPC or ads data but not both confirmed")
        if not dfs:
            notes.append("No DataForSEO data returned")

        rows.append({
            "keyword": kw,
            "why_selected": entry["why_selected"],
            "source_bucket": entry["source_bucket"],
            "planner_volume": planner_vol or "",
            "historical_volume": hist_vol or "",
            "gsc_impressions": gsc_imp or "",
            "ads_clicks": ads_clicks or "",
            "ads_conversions": ads_conv if ads_conv is not None else "",
            "dataforseo_search_volume": dfs_vol if dfs_vol is not None else "",
            "dataforseo_cpc": dfs_cpc if dfs_cpc is not None else "",
            "dataforseo_competition": round(dfs_comp, 4) if dfs_comp is not None else "",
            "dataforseo_competition_level": dfs_comp_level or "",
            "dataforseo_intent": dfs_intent,
            "volume_alignment_guess": vol_align,
            "commercial_alignment_guess": comm_align,
            "notes": "; ".join(notes) if notes else "",
        })
    return rows


# ---------------------------------------------------------------------------
# Write CSV
# ---------------------------------------------------------------------------
CSV_FIELDS = [
    "keyword", "why_selected", "source_bucket",
    "planner_volume", "historical_volume", "gsc_impressions",
    "ads_clicks", "ads_conversions",
    "dataforseo_search_volume", "dataforseo_cpc", "dataforseo_competition",
    "dataforseo_competition_level", "dataforseo_intent",
    "volume_alignment_guess", "commercial_alignment_guess", "notes",
]


def write_csv(rows: list[dict]) -> None:
    ENRICHMENT_CSV.parent.mkdir(parents=True, exist_ok=True)
    with open(ENRICHMENT_CSV, "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=CSV_FIELDS)
        w.writeheader()
        w.writerows(rows)
    print(f"  CSV  -> {ENRICHMENT_CSV.relative_to(SEO_OPS)}")


# ---------------------------------------------------------------------------
# Write markdown report
# ---------------------------------------------------------------------------
def write_report(rows: list[dict], raw: dict, ts: str) -> None:
    cost_info = raw.get("cost", "unknown")
    lines = [
        "# DataForSEO Keyword Enrichment v1",
        "",
        f"**Date:** {ts}",
        f"**Endpoint:** `POST /v3/dataforseo_labs/google/keyword_overview/live`",
        f"**Keywords enriched:** {len(rows)}",
        f"**API cost reported:** {cost_info}",
        f"**Location:** Netherlands (2528) / nl",
        "",
        "## Cost sensitivity",
        "",
        "Balance is very limited (~$1). This batch uses a single API call with",
        f"{len(rows)} keywords in one task. keyword_overview costs ~$0.05 per task.",
        "Remaining balance should be sufficient for several more small batches.",
        "",
        "## Shortlist rationale",
        "",
        "| # | Keyword | Bucket | Why |",
        "|---|---------|--------|-----|",
    ]
    for i, r in enumerate(rows, 1):
        lines.append(f"| {i} | {r['keyword']} | {r['source_bucket']} | {r['why_selected']} |")

    lines += [
        "",
        "## Keyword-by-keyword comparison",
        "",
        "| Keyword | Planner vol | DFS vol | Vol align | Ads clicks | DFS CPC | Comm align | DFS intent |",
        "|---------|-------------|---------|-----------|------------|---------|------------|------------|",
    ]
    for r in rows:
        lines.append(
            f"| {r['keyword']} "
            f"| {r['planner_volume']} "
            f"| {r['dataforseo_search_volume']} "
            f"| {r['volume_alignment_guess']} "
            f"| {r['ads_clicks']} "
            f"| {r['dataforseo_cpc']} "
            f"| {r['commercial_alignment_guess']} "
            f"| {r['dataforseo_intent']} |"
        )

    # Analysis sections
    confirmed = [r for r in rows if r["volume_alignment_guess"] in ("agrees", "somewhat_agrees")
                 and r["commercial_alignment_guess"] in ("strong", "medium")]
    weakened = [r for r in rows if r["volume_alignment_guess"] == "diverges"
                or r["commercial_alignment_guess"] == "weak"]

    lines += [
        "",
        "## Strongest confirmed opportunities",
        "",
    ]
    if confirmed:
        for r in confirmed:
            lines.append(
                f"- **{r['keyword']}** -- volume {r['volume_alignment_guess']}, "
                f"commercial {r['commercial_alignment_guess']}. {r['notes']}"
            )
    else:
        lines.append("_None with both volume + commercial alignment._")

    lines += [
        "",
        "## Keywords where external data weakens confidence",
        "",
    ]
    if weakened:
        for r in weakened:
            lines.append(f"- **{r['keyword']}** -- {r['notes']}")
    else:
        lines.append("_None._")

    lines += [
        "",
        "## Recommended next DataForSEO step",
        "",
        "Based on v1 results:",
        "",
    ]
    if len(confirmed) >= 3:
        lines.append("- **Expand shortlist** -- add 10-20 more from seo_do_now and unmapped_gap buckets")
        lines.append("- Consider testing `related_keywords` on top 2 confirmed terms")
        next_step = "expand_shortlist"
    elif len(confirmed) >= 1:
        lines.append("- **Test related_keywords** on 1-2 strongest confirmed terms")
        lines.append("- Then decide whether to expand further")
        next_step = "test_related_keywords_on_1_2_terms"
    else:
        lines.append("- **Stop here** -- data does not justify further spend at current balance")
        next_step = "stop"

    lines += [
        "",
        "---",
        f"_Generated by `run_dataforseo_keyword_enrichment_v1.py` at {ts}_",
    ]

    REPORT_MD.parent.mkdir(parents=True, exist_ok=True)
    REPORT_MD.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"  Report -> {REPORT_MD.relative_to(SEO_OPS)}")
    return next_step


# ---------------------------------------------------------------------------
# Write JSON output
# ---------------------------------------------------------------------------
def write_json(rows: list[dict], raw: dict, ts: str, next_step: str) -> None:
    confirmed = [r["keyword"] for r in rows
                 if r["volume_alignment_guess"] in ("agrees", "somewhat_agrees")
                 and r["commercial_alignment_guess"] in ("strong", "medium")]
    weakened = [r["keyword"] for r in rows
                if r["volume_alignment_guess"] == "diverges"
                or r["commercial_alignment_guess"] == "weak"]

    obj = {
        "_meta": {
            "workflow": "dataforseo_keyword_enrichment_v1",
            "generated": ts,
            "endpoint": "POST /v3/dataforseo_labs/google/keyword_overview/live",
            "api_cost_reported": raw.get("cost", "unknown"),
        },
        "shortlist": [
            {"keyword": e["keyword"], "source_bucket": e["source_bucket"],
             "why_selected": e["why_selected"]}
            for e in SHORTLIST
        ],
        "endpoint_used": "dataforseo_labs/google/keyword_overview/live",
        "enriched_keywords": rows,
        "strongest_confirmed": confirmed,
        "weakened_cases": weakened,
        "next_step_recommendation": next_step,
        "limitations": [
            "Balance very limited (~$1), only 1 API call made",
            "keyword_overview only -- no related_keywords or SERP data yet",
            "Intent classification depends on DataForSEO model, not verified",
            "Volume comparison is heuristic, not statistically validated",
        ],
    }

    OUTPUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_JSON.write_text(
        json.dumps(obj, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    print(f"  JSON -> {OUTPUT_JSON.relative_to(SEO_OPS)}")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main() -> bool:
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S+00:00")
    print(f"[{ts}] DataForSEO keyword enrichment v1")
    print(f"  Shortlist: {len(SHORTLIST)} keywords")

    # 1. Load internal data
    internal = load_internal_data()
    print(f"  Internal data loaded for {sum(1 for v in internal.values() if v)} keywords")

    # 2. Call DataForSEO
    keywords = [e["keyword"] for e in SHORTLIST]
    print(f"  Calling keyword_overview for {len(keywords)} keywords...")

    try:
        raw = fetch_keyword_overview(keywords)
    except Exception as exc:
        print(f"  FAIL: API call failed: {exc}", file=sys.stderr)
        return False

    # 3. Save raw snapshot
    RAW_SNAPSHOT.parent.mkdir(parents=True, exist_ok=True)
    RAW_SNAPSHOT.write_text(
        json.dumps(raw, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    print(f"  Raw snapshot -> {RAW_SNAPSHOT.relative_to(SEO_OPS)}")

    # 4. Check API response status
    status_code = raw.get("status_code")
    if status_code != 20000:
        print(f"  FAIL: API returned status {status_code}: {raw.get('status_message')}")
        return False

    # 5. Parse and build enrichment
    dfs_data = parse_overview_response(raw)
    print(f"  DataForSEO returned data for {len(dfs_data)} keywords")

    rows = build_enrichment(internal, dfs_data)

    # 6. Write outputs
    write_csv(rows)
    next_step = write_report(rows, raw, ts)
    write_json(rows, raw, ts, next_step)

    # 7. Summary
    aligned = sum(1 for r in rows if r["volume_alignment_guess"] in ("agrees", "somewhat_agrees"))
    strong_comm = sum(1 for r in rows if r["commercial_alignment_guess"] in ("strong", "medium"))
    print(f"\n  Volume aligned: {aligned}/{len(rows)}")
    print(f"  Commercial signal: {strong_comm}/{len(rows)}")
    print(f"  Done.")
    return True


if __name__ == "__main__":
    ok = main()
    sys.exit(0 if ok else 1)

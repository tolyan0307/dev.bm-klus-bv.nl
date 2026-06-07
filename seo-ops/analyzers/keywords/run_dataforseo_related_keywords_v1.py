"""
run_dataforseo_related_keywords_v1.py

Tests DataForSEO related_keywords endpoint on 1-2 seed keywords to discover
whether it adds useful semantic expansion beyond existing Planner/GSC/Ads data.

Usage (from seo-ops/integrations/):
    .venv/Scripts/python ../analyzers/keywords/run_dataforseo_related_keywords_v1.py

Outputs:
    snapshots/raw/dataforseo/dataforseo_related_keywords_v1.json
    snapshots/normalized/keyword_master/dataforseo_related_keywords_v1.csv
    reports/keywords/dataforseo_related_keywords_v1.md
    outputs/dataforseo_related_keywords_v1.json
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
SEO_OPS = Path(__file__).resolve().parents[2]
INTEGRATIONS = SEO_OPS / "integrations"
sys.path.insert(0, str(INTEGRATIONS))

from dataforseo.labs_google import LabsGoogle

KEYWORD_MASTER = (
    SEO_OPS / "snapshots" / "normalized" / "keyword_master" / "keyword_master_v2.csv"
)
RAW_SNAPSHOT = SEO_OPS / "snapshots" / "raw" / "dataforseo" / "dataforseo_related_keywords_v1.json"
NORM_CSV = (
    SEO_OPS / "snapshots" / "normalized" / "keyword_master"
    / "dataforseo_related_keywords_v1.csv"
)
REPORT_MD = SEO_OPS / "reports" / "keywords" / "dataforseo_related_keywords_v1.md"
OUTPUT_JSON = SEO_OPS / "outputs" / "dataforseo_related_keywords_v1.json"

# ---------------------------------------------------------------------------
# Seeds — 2 top confirmed terms from enrichment v1
# ---------------------------------------------------------------------------
SEEDS = [
    {
        "keyword": "buitengevelisolatie",
        "why": "Strongest confirmed: proven PPC converter (1 conv), vol 480 agrees, CPC 3.09, intent=transactional",
    },
    {
        "keyword": "buitenmuur isoleren",
        "why": "Strongest confirmed: proven PPC converter (1 conv), vol 1000 agrees, CPC 2.32, intent=commercial",
    },
]

RELATED_LIMIT = 30  # max related keywords per seed to keep cost low


# ---------------------------------------------------------------------------
# Load keyword_master v2 for novelty comparison
# ---------------------------------------------------------------------------
def load_keyword_master() -> set[str]:
    """Return set of all normalized keywords from keyword_master_v2."""
    keywords = set()
    with open(KEYWORD_MASTER, encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            kw = row.get("normalized_keyword", "").strip().lower()
            if kw:
                keywords.add(kw)
    return keywords


def load_keyword_master_detail() -> dict[str, dict]:
    """Return {normalized_keyword: row} for detailed comparison."""
    result = {}
    with open(KEYWORD_MASTER, encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            kw = row.get("normalized_keyword", "").strip().lower()
            if kw:
                result[kw] = row
    return result


# ---------------------------------------------------------------------------
# Call DataForSEO related_keywords for each seed
# ---------------------------------------------------------------------------
def fetch_related(seeds: list[dict]) -> dict:
    """Call related_keywords for each seed. Returns combined raw response dict."""
    labs = LabsGoogle()
    all_responses = {"seeds": [], "cost_total": 0}

    for seed in seeds:
        kw = seed["keyword"]
        print(f"  Calling related_keywords for '{kw}' (limit={RELATED_LIMIT})...")
        try:
            resp = labs.related_keywords(
                keyword=kw, depth=1, limit=RELATED_LIMIT
            )
            cost = resp.get("cost", 0)
            all_responses["cost_total"] += cost
            all_responses["seeds"].append({
                "seed": kw,
                "response": resp,
                "cost": cost,
                "status_code": resp.get("status_code"),
            })
            print(f"    Status: {resp.get('status_code')} / Cost: {cost}")
        except Exception as exc:
            print(f"    FAIL: {exc}", file=sys.stderr)
            all_responses["seeds"].append({
                "seed": kw,
                "error": str(exc),
                "cost": 0,
            })

    return all_responses


# ---------------------------------------------------------------------------
# Parse related keywords from raw response
# ---------------------------------------------------------------------------
def parse_related(raw: dict) -> list[dict]:
    """Extract flat list of related keyword entries from raw responses."""
    results = []
    for seed_entry in raw.get("seeds", []):
        seed = seed_entry["seed"]
        resp = seed_entry.get("response", {})
        tasks = resp.get("tasks", [])
        for task in tasks:
            for result_block in task.get("result", []):
                items = result_block.get("items", [])
                for item in items:
                    kw_data = item.get("keyword_data", {})
                    kw_info = kw_data.get("keyword_info", {})
                    keyword = kw_data.get("keyword", "")
                    if not keyword:
                        continue

                    intent_info = kw_data.get("search_intent_info", {})
                    main_intent = intent_info.get("main_intent", "") if intent_info else ""

                    # related_keywords also returns se_results_count, related group info
                    results.append({
                        "seed_keyword": seed,
                        "related_keyword": keyword.strip().lower(),
                        "search_volume": kw_info.get("search_volume"),
                        "cpc": kw_info.get("cpc"),
                        "competition": kw_info.get("competition"),
                        "competition_level": kw_info.get("competition_level"),
                        "intent": main_intent,
                        "se_results_count": kw_info.get("se_results_count"),
                    })
    return results


# ---------------------------------------------------------------------------
# Novelty classification
# ---------------------------------------------------------------------------
def classify_novelty(
    related: list[dict],
    known_keywords: set[str],
    master_detail: dict[str, dict],
) -> list[dict]:
    """Add novelty and source overlap fields to each related keyword."""
    enriched = []

    # Derive subsets for faster lookup
    gsc_keywords = {
        k for k, v in master_detail.items()
        if v.get("in_gsc_queries") == "True" or v.get("gsc_total_impressions", "") not in ("", "0")
    }
    ads_keywords = {
        k for k, v in master_detail.items()
        if v.get("in_ads_keywords") == "True" or v.get("in_ads_search_terms") == "True"
    }
    planner_keywords = {
        k for k, v in master_detail.items()
        if v.get("in_planner_ideas") == "True" or v.get("in_historical_metrics") == "True"
    }

    # Relevance terms for this niche
    relevant_stems = {
        "isolat", "isol", "gevel", "buitenmuur", "muur", "stuc",
        "buiten", "eps", "etics", "pur", "steenstrip",
        "crepi", "pleister", "schilder", "wand", "thermisch",
    }

    for item in related:
        kw = item["related_keyword"]
        in_master = kw in known_keywords
        in_gsc = kw in gsc_keywords
        in_ads = kw in ads_keywords
        in_planner = kw in planner_keywords

        # Novelty bucket
        if in_master and (in_gsc or in_ads):
            bucket = "already_known_core"
        elif in_master:
            bucket = "already_known_secondary"
        elif any(stem in kw for stem in relevant_stems):
            vol = item.get("search_volume")
            if vol is not None and vol >= 50:
                bucket = "new_but_relevant"
            else:
                bucket = "new_low_confidence"
        else:
            bucket = "likely_not_useful"

        # Why interesting
        notes = []
        if bucket == "new_but_relevant":
            notes.append(f"New keyword with vol={item['search_volume']}, potentially useful")
            if item.get("cpc") and item["cpc"] > 1.0:
                notes.append(f"CPC={item['cpc']} suggests commercial value")
            if item.get("intent") in ("transactional", "commercial"):
                notes.append(f"Intent={item['intent']}")
        elif bucket == "already_known_core":
            notes.append("Already tracked with active data")
        elif bucket == "already_known_secondary":
            notes.append("In keyword master but limited active data")

        item.update({
            "already_in_keyword_master_guess": "yes" if in_master else "no",
            "already_in_gsc_guess": "yes" if in_gsc else "no",
            "already_in_ads_guess": "yes" if in_ads else "no",
            "already_in_planner_guess": "yes" if in_planner else "no",
            "novelty_bucket": bucket,
            "why_interesting": "; ".join(notes) if notes else "",
            "notes": "",
        })
        enriched.append(item)

    return enriched


# ---------------------------------------------------------------------------
# Write CSV
# ---------------------------------------------------------------------------
CSV_FIELDS = [
    "seed_keyword", "related_keyword", "search_volume", "cpc",
    "competition", "competition_level", "intent",
    "already_in_keyword_master_guess", "already_in_gsc_guess",
    "already_in_ads_guess", "already_in_planner_guess",
    "novelty_bucket", "why_interesting", "notes",
]


def write_csv(rows: list[dict]) -> None:
    NORM_CSV.parent.mkdir(parents=True, exist_ok=True)
    with open(NORM_CSV, "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=CSV_FIELDS, extrasaction="ignore")
        w.writeheader()
        w.writerows(rows)
    print(f"  CSV  -> {NORM_CSV.relative_to(SEO_OPS)}")


# ---------------------------------------------------------------------------
# Write markdown report
# ---------------------------------------------------------------------------
def write_report(rows: list[dict], raw: dict, ts: str) -> str:
    total_cost = raw.get("cost_total", 0)
    seeds_used = [s["seed"] for s in raw.get("seeds", [])]

    by_bucket = {}
    for r in rows:
        b = r["novelty_bucket"]
        by_bucket.setdefault(b, []).append(r)

    new_relevant = by_bucket.get("new_but_relevant", [])
    new_low = by_bucket.get("new_low_confidence", [])
    already_core = by_bucket.get("already_known_core", [])
    already_sec = by_bucket.get("already_known_secondary", [])
    not_useful = by_bucket.get("likely_not_useful", [])

    lines = [
        "# DataForSEO Related Keywords v1",
        "",
        f"**Date:** {ts}",
        f"**Endpoint:** `POST /v3/dataforseo_labs/google/related_keywords/live`",
        f"**Seeds:** {', '.join(seeds_used)}",
        f"**Total related returned:** {len(rows)}",
        f"**API cost reported:** ${total_cost}",
        "",
        "## Cost sensitivity",
        "",
        f"Balance before run: ~$0.98. This run cost ${total_cost}.",
        f"Used depth=1, limit={RELATED_LIMIT} per seed. Conservative budget approach.",
        "",
        "## Seed selection rationale",
        "",
    ]
    for s in SEEDS:
        lines.append(f"- **{s['keyword']}**: {s['why']}")

    lines += [
        "",
        "## Novelty breakdown",
        "",
        f"| Bucket | Count |",
        f"|--------|-------|",
        f"| already_known_core | {len(already_core)} |",
        f"| already_known_secondary | {len(already_sec)} |",
        f"| new_but_relevant | {len(new_relevant)} |",
        f"| new_low_confidence | {len(new_low)} |",
        f"| likely_not_useful | {len(not_useful)} |",
        f"| **Total** | **{len(rows)}** |",
        "",
        "## Top genuinely new keywords (new_but_relevant)",
        "",
    ]

    if new_relevant:
        # Deduplicate by keyword (same keyword may come from multiple seeds)
        seen = set()
        new_relevant_deduped = []
        for r in sorted(new_relevant, key=lambda x: x.get("search_volume") or 0, reverse=True):
            if r["related_keyword"] not in seen:
                seen.add(r["related_keyword"])
                new_relevant_deduped.append(r)

        lines += [
            f"Unique new keywords: **{len(new_relevant_deduped)}** "
            f"({len(new_relevant)} rows incl. cross-seed duplicates)",
            "",
            "| Keyword | Vol | CPC | Intent | Seed | Notes |",
            "|---------|-----|-----|--------|------|-------|",
        ]
        for r in new_relevant_deduped[:15]:
            # Collect all seeds that surfaced this keyword
            all_seeds = [x["seed_keyword"] for x in new_relevant if x["related_keyword"] == r["related_keyword"]]
            lines.append(
                f"| {r['related_keyword']} | {r.get('search_volume', '')} "
                f"| {r.get('cpc', '')} | {r.get('intent', '')} "
                f"| {', '.join(sorted(set(all_seeds)))} | {r['why_interesting']} |"
            )
    else:
        lines.append("_No genuinely new relevant keywords found._")

    lines += [
        "",
        "## Already known keywords returned",
        "",
        f"DataForSEO returned {len(already_core)} core and {len(already_sec)} secondary",
        "keywords that we already track. This confirms our keyword master has",
        "decent coverage of this semantic space.",
        "",
    ]

    # Promising for SEO / PPC / page-gap
    seo_candidates = [r for r in new_relevant if r.get("intent") in ("informational", "commercial", "transactional")]
    ppc_candidates = [r for r in new_relevant if (r.get("cpc") or 0) > 1.0]
    gap_candidates = [r for r in new_relevant if r.get("already_in_keyword_master_guess") == "no"]

    lines += [
        "## Potential action areas",
        "",
        f"- **SEO review candidates:** {len(seo_candidates)} new keywords with recognized intent",
        f"- **PPC review candidates:** {len(ppc_candidates)} new keywords with CPC > 1.00",
        f"- **Mapping/page-gap review:** {len(gap_candidates)} new keywords not in keyword master",
        "",
    ]

    # Verdict on endpoint value (use deduped count)
    seen_dedup = set()
    genuinely_new = 0
    for r in new_relevant:
        if r["related_keyword"] not in seen_dedup:
            seen_dedup.add(r["related_keyword"])
            genuinely_new += 1
    lines += [
        "## Is this endpoint worth using again?",
        "",
    ]
    if genuinely_new >= 5:
        verdict_text = (
            "**Yes** -- found meaningful new keywords. Worth expanding to 1-2 more seeds."
        )
        next_step = "expand_to_1_2_more_seeds"
    elif genuinely_new >= 1:
        verdict_text = (
            "**Cautiously yes** -- some new discoveries. Merge promising ones into "
            "future keyword_master v3, then decide on further expansion."
        )
        next_step = "merge_into_keyword_master_v3_then_decide"
    else:
        verdict_text = (
            "**Not yet** -- related_keywords did not surface meaningful new terms "
            "beyond what Planner/GSC/Ads already provide. Stop here."
        )
        next_step = "stop"

    lines += [
        verdict_text,
        "",
        "## Recommended next step",
        "",
    ]
    if next_step == "expand_to_1_2_more_seeds":
        lines += [
            "1. Merge top new_but_relevant keywords into keyword_master v3",
            "2. Expand related_keywords to 1-2 more seeds (e.g. gevelisolatie, gevelisolatie kosten)",
            "3. Do not scale further until ROI is validated",
        ]
    elif next_step == "merge_into_keyword_master_v3_then_decide":
        lines += [
            "1. Merge promising new keywords into keyword_master v3",
            "2. Evaluate whether they surface in GSC within 2-4 weeks",
            "3. Then decide on further expansion",
        ]
    else:
        lines += [
            "1. Stop related_keywords testing",
            "2. Focus DataForSEO budget on keyword_overview for larger shortlists",
        ]

    lines += [
        "",
        "---",
        f"_Generated by `run_dataforseo_related_keywords_v1.py` at {ts}_",
    ]

    REPORT_MD.parent.mkdir(parents=True, exist_ok=True)
    REPORT_MD.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"  Report -> {REPORT_MD.relative_to(SEO_OPS)}")
    return next_step


# ---------------------------------------------------------------------------
# Write JSON output
# ---------------------------------------------------------------------------
def write_json(rows: list[dict], raw: dict, ts: str, next_step: str) -> None:
    new_relevant = [r for r in rows if r["novelty_bucket"] == "new_but_relevant"]
    # Deduplicate
    seen = set()
    new_relevant_deduped = []
    for r in sorted(new_relevant, key=lambda x: x.get("search_volume") or 0, reverse=True):
        if r["related_keyword"] not in seen:
            seen.add(r["related_keyword"])
            new_relevant_deduped.append(r)

    top_promising = [
        {
            "keyword": r["related_keyword"],
            "search_volume": r.get("search_volume"),
            "cpc": r.get("cpc"),
            "intent": r.get("intent"),
            "seeds": sorted(set(
                x["seed_keyword"] for x in new_relevant
                if x["related_keyword"] == r["related_keyword"]
            )),
        }
        for r in new_relevant_deduped[:10]
    ]

    by_bucket = {}
    for r in rows:
        b = r["novelty_bucket"]
        by_bucket[b] = by_bucket.get(b, 0) + 1

    obj = {
        "_meta": {
            "workflow": "dataforseo_related_keywords_v1",
            "generated": ts,
            "endpoint": "POST /v3/dataforseo_labs/google/related_keywords/live",
            "api_cost_reported": raw.get("cost_total", 0),
        },
        "seeds": [{"keyword": s["keyword"], "why": s["why"]} for s in SEEDS],
        "endpoint_used": "dataforseo_labs/google/related_keywords/live",
        "total_related_keywords": len(rows),
        "novelty_breakdown": by_bucket,
        "genuinely_new_candidates": len(new_relevant_deduped),
        "genuinely_new_candidates_incl_dupes": len(new_relevant),
        "top_promising_keywords": top_promising,
        "recommended_next_step": next_step,
        "limitations": [
            "Only 2 seeds tested -- coverage is narrow",
            "Novelty classification is heuristic, not exact",
            "depth=1 only -- deeper semantic graphs not explored",
            f"limit={RELATED_LIMIT} per seed -- may miss long-tail",
            "Balance limited, further expansion requires cost awareness",
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
    print(f"[{ts}] DataForSEO related keywords v1")
    print(f"  Seeds: {[s['keyword'] for s in SEEDS]}")

    # 1. Load keyword master for comparison
    known_keywords = load_keyword_master()
    master_detail = load_keyword_master_detail()
    print(f"  Keyword master loaded: {len(known_keywords)} keywords")

    # 2. Call API
    raw = fetch_related(SEEDS)

    # 3. Save raw snapshot
    RAW_SNAPSHOT.parent.mkdir(parents=True, exist_ok=True)
    RAW_SNAPSHOT.write_text(
        json.dumps(raw, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    print(f"  Raw snapshot -> {RAW_SNAPSHOT.relative_to(SEO_OPS)}")

    # 4. Check for failures
    any_success = False
    for seed_entry in raw.get("seeds", []):
        if seed_entry.get("status_code") == 20000:
            any_success = True
        elif "error" in seed_entry:
            print(f"  WARNING: seed '{seed_entry['seed']}' failed: {seed_entry['error']}")
        else:
            sc = seed_entry.get("status_code")
            print(f"  WARNING: seed '{seed_entry['seed']}' returned status {sc}")

    if not any_success:
        print("  FAIL: No successful API responses", file=sys.stderr)
        return False

    # 5. Parse
    related = parse_related(raw)
    print(f"  Parsed {len(related)} related keywords")

    if not related:
        print("  WARNING: No related keywords returned")

    # 6. Classify novelty
    enriched = classify_novelty(related, known_keywords, master_detail)

    # 7. Write outputs
    write_csv(enriched)
    next_step = write_report(enriched, raw, ts)
    write_json(enriched, raw, ts, next_step)

    # 8. Summary
    by_bucket = {}
    for r in enriched:
        b = r["novelty_bucket"]
        by_bucket[b] = by_bucket.get(b, 0) + 1
    print(f"\n  Novelty breakdown:")
    for b, c in sorted(by_bucket.items()):
        print(f"    {b}: {c}")
    print(f"  Total cost: ${raw.get('cost_total', 0)}")
    print(f"  Done.")
    return True


if __name__ == "__main__":
    ok = main()
    sys.exit(0 if ok else 1)

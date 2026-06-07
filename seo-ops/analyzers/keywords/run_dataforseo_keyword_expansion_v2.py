"""
run_dataforseo_keyword_expansion_v2.py

Scenario 2: Keyword expansion across all 5 BM Klus service areas.
Uses DataForSEO related_keywords endpoint with seeds per service area.

Seeds:
  - buiten-stucwerk: "buitenmuur stucen", "gevel stucen"
  - sierpleister: "sierpleister", "spachtelputz"
  - muren-stucen: "muren stucen", "sausklaar stucwerk"
  - gevel-schilderen: "gevel schilderen", "silicaatverf"

Estimated cost: 8 seeds × ~$0.011 = ~$0.088

Usage (from seo-ops/integrations/):
    .venv/Scripts/python ../analyzers/keywords/run_dataforseo_keyword_expansion_v2.py
    .venv/Scripts/python ../analyzers/keywords/run_dataforseo_keyword_expansion_v2.py --dry-run
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
from dataforseo.cost_tracker import record_task_cost

KEYWORD_MASTER = (
    SEO_OPS / "snapshots" / "normalized" / "keyword_master" / "keyword_master_v3.csv"
)
RAW_SNAPSHOT = SEO_OPS / "snapshots" / "raw" / "dataforseo" / "dataforseo_keyword_expansion_v2.json"
OUTPUT_JSON = SEO_OPS / "outputs" / "dataforseo_keyword_expansion_v2.json"
REPORT_MD = SEO_OPS / "reports" / "keywords" / "dataforseo_keyword_expansion_v2.md"

# ---------------------------------------------------------------------------
# Seeds by service area
# ---------------------------------------------------------------------------
SERVICE_AREAS = {
    "buiten-stucwerk": {
        "seeds": ["buitenmuur stucen", "gevel stucen"],
        "existing_page": "/buiten-stucwerk/",
        "known_terms": [
            "buitenmuur stucen", "gevel stucen", "buiten stucwerk",
            "cementpleister", "betonstuc", "pleisterwerk buiten",
        ],
    },
    "sierpleister": {
        "seeds": ["sierpleister", "spachtelputz"],
        "existing_page": "/sierpleister/",
        "known_terms": [
            "sierpleister", "spachtelputz", "crepi", "gevelpleister",
            "korrelpleister", "decoratieve pleister",
        ],
    },
    "muren-stucen": {
        "seeds": ["muren stucen", "sausklaar stucwerk"],
        "existing_page": "/muren-stucen/",
        "known_terms": [
            "muren stucen", "sausklaar", "behangklaar", "binnenmuren stucen",
            "spackspuitwerk", "raapwerk", "stucwerk binnen",
        ],
    },
    "gevel-schilderen": {
        "seeds": ["gevel schilderen", "silicaatverf"],
        "existing_page": "/gevel-schilderen/",
        "known_terms": [
            "gevel schilderen", "buitenmuur verven", "silicaatverf",
            "keimen", "gevel verven", "buitenmuur schilderen",
        ],
    },
}

RELATED_LIMIT = 50  # max related per seed


# ---------------------------------------------------------------------------
# Load keyword master v3
# ---------------------------------------------------------------------------
def load_keyword_master() -> tuple[set[str], dict[str, dict]]:
    keywords = set()
    detail = {}
    with open(KEYWORD_MASTER, encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            kw = row.get("normalized_keyword", "").strip().lower()
            if kw:
                keywords.add(kw)
                detail[kw] = row
    return keywords, detail


# ---------------------------------------------------------------------------
# Relevant stems per service area
# ---------------------------------------------------------------------------
RELEVANCE_STEMS = {
    "buiten-stucwerk": [
        "stuc", "pleister", "gevel", "buiten", "cement", "beton",
        "voeg", "muur", "facade",
    ],
    "sierpleister": [
        "sierpleister", "spachtel", "crepi", "korrel", "pleister",
        "gevel", "decorat", "structuur", "afwerk",
    ],
    "muren-stucen": [
        "stuc", "muren", "wand", "saus", "behang", "spack",
        "raap", "binnen", "glad", "egalis",
    ],
    "gevel-schilderen": [
        "schilder", "verf", "verven", "silicaat", "keim", "gevel",
        "buiten", "latex", "acryl", "siloxaan", "dampopen",
    ],
}


# ---------------------------------------------------------------------------
# Fetch related keywords
# ---------------------------------------------------------------------------
def fetch_related(seeds: list[str], dry_run: bool = False) -> dict:
    labs = LabsGoogle()
    all_responses = {"seeds": [], "cost_total": 0}

    for kw in seeds:
        print(f"  Calling related_keywords for '{kw}' (limit={RELATED_LIMIT})...")
        if dry_run:
            print(f"    [DRY RUN] Skipped")
            all_responses["seeds"].append({
                "seed": kw,
                "dry_run": True,
                "cost": 0,
            })
            continue
        try:
            resp = labs.related_keywords(keyword=kw, depth=1, limit=RELATED_LIMIT)
            cost = resp.get("cost", 0)
            all_responses["cost_total"] += cost
            all_responses["seeds"].append({
                "seed": kw,
                "response": resp,
                "cost": cost,
                "status_code": resp.get("status_code"),
            })
            print(f"    Status: {resp.get('status_code')} / Cost: ${cost}")
        except Exception as exc:
            print(f"    FAIL: {exc}", file=sys.stderr)
            all_responses["seeds"].append({
                "seed": kw, "error": str(exc), "cost": 0,
            })

    return all_responses


# ---------------------------------------------------------------------------
# Parse related keywords from raw response
# ---------------------------------------------------------------------------
def parse_related(raw: dict) -> list[dict]:
    results = []
    for seed_entry in raw.get("seeds", []):
        if seed_entry.get("dry_run"):
            continue
        seed = seed_entry["seed"]
        resp = seed_entry.get("response", {})
        for task in resp.get("tasks", []):
            for result_block in task.get("result", []):
                for item in result_block.get("items", []):
                    kw_data = item.get("keyword_data", {})
                    kw_info = kw_data.get("keyword_info", {})
                    keyword = kw_data.get("keyword", "")
                    if not keyword:
                        continue
                    intent_info = kw_data.get("search_intent_info", {})
                    main_intent = intent_info.get("main_intent", "") if intent_info else ""
                    results.append({
                        "seed_keyword": seed,
                        "related_keyword": keyword.strip().lower(),
                        "search_volume": kw_info.get("search_volume"),
                        "cpc": kw_info.get("cpc"),
                        "competition": kw_info.get("competition"),
                        "competition_level": kw_info.get("competition_level"),
                        "intent": main_intent,
                    })
    return results


# ---------------------------------------------------------------------------
# Classify each keyword
# ---------------------------------------------------------------------------
def classify(
    related: list[dict],
    service_area: str,
    known_kws: set[str],
    master_detail: dict[str, dict],
    stems: list[str],
) -> list[dict]:
    enriched = []
    for item in related:
        kw = item["related_keyword"]
        in_master = kw in known_kws
        vol = item.get("search_volume") or 0

        # Check if it's relevant to this service area
        is_relevant = any(stem in kw for stem in stems)

        # Check if it's an off-service keyword
        off_service_stems = ["dak", "vloer", "cv", "ketel", "zonnepan", "warmtepomp", "kozijn", "raam"]
        is_off_service = any(stem in kw for stem in off_service_stems) and not is_relevant

        if in_master:
            bucket = "already_tracked"
        elif is_off_service:
            bucket = "off_service"
        elif is_relevant and vol >= 50:
            bucket = "new_relevant"
        elif is_relevant and vol > 0:
            bucket = "new_low_volume"
        elif vol >= 100:
            bucket = "new_adjacent_high_vol"
        elif vol > 0:
            bucket = "new_adjacent_low_vol"
        else:
            bucket = "no_volume"

        # Check master for more info
        master_row = master_detail.get(kw, {})
        mapped_route = master_row.get("mapped_route_guess", "")

        item.update({
            "service_area": service_area,
            "in_keyword_master": "yes" if in_master else "no",
            "mapped_route": mapped_route,
            "bucket": bucket,
            "is_relevant": is_relevant,
        })
        enriched.append(item)

    return enriched


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main() -> bool:
    dry_run = "--dry-run" in sys.argv
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S+00:00")
    print(f"[{ts}] DataForSEO keyword expansion v2 (Scenario 2)")
    if dry_run:
        print("  ** DRY RUN — no API calls **")

    # 1. Load keyword master
    known_kws, master_detail = load_keyword_master()
    print(f"  Keyword master loaded: {len(known_kws)} keywords")

    # 2. Collect all seeds
    all_seeds = []
    for area, cfg in SERVICE_AREAS.items():
        all_seeds.extend(cfg["seeds"])
    print(f"  Seeds: {all_seeds}")
    print(f"  Estimated cost: {len(all_seeds)} x $0.011 = ~${len(all_seeds) * 0.011:.3f}")

    # 3. Fetch
    raw = fetch_related(all_seeds, dry_run=dry_run)

    # 4. Save raw snapshot
    RAW_SNAPSHOT.parent.mkdir(parents=True, exist_ok=True)
    RAW_SNAPSHOT.write_text(
        json.dumps(raw, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    print(f"  Raw snapshot -> {RAW_SNAPSHOT.relative_to(SEO_OPS)}")

    if dry_run:
        print("  DRY RUN complete. No API calls made.")
        return True

    # 5. Parse all results
    all_related = parse_related(raw)
    print(f"  Total related keywords parsed: {len(all_related)}")

    # 6. Classify per service area
    results_by_area = {}
    for area, cfg in SERVICE_AREAS.items():
        area_keywords = [r for r in all_related if r["seed_keyword"] in cfg["seeds"]]
        stems = RELEVANCE_STEMS[area]
        classified = classify(area_keywords, area, known_kws, master_detail, stems)
        results_by_area[area] = classified

    # 7. Build summary output
    summary = {
        "_meta": {
            "workflow": "dataforseo_keyword_expansion_v2",
            "generated": ts,
            "endpoint": "POST /v3/dataforseo_labs/google/related_keywords/live",
            "api_cost_reported": raw.get("cost_total", 0),
            "seeds_count": len(all_seeds),
        },
        "service_areas": {},
    }

    for area, classified in results_by_area.items():
        # Deduplicate by keyword
        seen = set()
        deduped = []
        for r in sorted(classified, key=lambda x: x.get("search_volume") or 0, reverse=True):
            if r["related_keyword"] not in seen:
                seen.add(r["related_keyword"])
                deduped.append(r)

        by_bucket = {}
        for r in deduped:
            b = r["bucket"]
            by_bucket.setdefault(b, []).append(r)

        area_summary = {
            "existing_page": SERVICE_AREAS[area]["existing_page"],
            "seeds_used": SERVICE_AREAS[area]["seeds"],
            "total_returned": len(deduped),
            "bucket_counts": {b: len(v) for b, v in by_bucket.items()},
            "new_relevant": [
                {
                    "keyword": r["related_keyword"],
                    "volume": r.get("search_volume"),
                    "cpc": r.get("cpc"),
                    "intent": r.get("intent"),
                    "seeds": sorted(set(
                        x["seed_keyword"] for x in classified
                        if x["related_keyword"] == r["related_keyword"]
                    )),
                }
                for r in by_bucket.get("new_relevant", [])
            ],
            "new_adjacent_high_vol": [
                {
                    "keyword": r["related_keyword"],
                    "volume": r.get("search_volume"),
                    "cpc": r.get("cpc"),
                    "intent": r.get("intent"),
                }
                for r in by_bucket.get("new_adjacent_high_vol", [])
            ],
            "new_low_volume": [
                {
                    "keyword": r["related_keyword"],
                    "volume": r.get("search_volume"),
                    "cpc": r.get("cpc"),
                    "intent": r.get("intent"),
                }
                for r in by_bucket.get("new_low_volume", [])[:10]
            ],
            "off_service": [r["related_keyword"] for r in by_bucket.get("off_service", [])],
            "already_tracked_count": len(by_bucket.get("already_tracked", [])),
        }
        summary["service_areas"][area] = area_summary

    # 8. Save outputs
    OUTPUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_JSON.write_text(
        json.dumps(summary, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    print(f"  Output JSON -> {OUTPUT_JSON.relative_to(SEO_OPS)}")

    # 9. Record cost
    record_task_cost(
        analyzer="run_dataforseo_keyword_expansion_v2",
        keyword_or_scope=f"related_keywords ({len(all_seeds)} seeds)",
        actual_cost_override=raw.get("cost_total", 0),
        estimated_cost_usd=len(all_seeds) * 0.011,
    )

    # 10. Print summary
    print(f"\n  === SUMMARY ===")
    print(f"  Total API cost: ${raw.get('cost_total', 0):.4f}")
    for area, data in summary["service_areas"].items():
        nr = len(data["new_relevant"])
        na = len(data["new_adjacent_high_vol"])
        at = data["already_tracked_count"]
        print(f"  {area}: {data['total_returned']} total, {nr} new relevant, {na} adjacent high-vol, {at} already tracked")

    return True


if __name__ == "__main__":
    ok = main()
    sys.exit(0 if ok else 1)

"""
run_dataforseo_question_suggestions_v1.py

Collect question/suggestion keywords for a small seed list.
Output is standalone content/watchlist enrichment; does NOT auto-merge into keyword_master.

Usage (from seo-ops/):
    integrations/.venv/Scripts/python analyzers/keywords/run_dataforseo_question_suggestions_v1.py
    integrations/.venv/Scripts/python analyzers/keywords/run_dataforseo_question_suggestions_v1.py --dry-run
    integrations/.venv/Scripts/python analyzers/keywords/run_dataforseo_question_suggestions_v1.py --seeds "gevelisolatie,buitenmuur isoleren"
    integrations/.venv/Scripts/python analyzers/keywords/run_dataforseo_question_suggestions_v1.py --limit 30

Outputs:
    snapshots/raw/dataforseo/dataforseo_question_suggestions_v1.json
    snapshots/normalized/dataforseo/question_suggestions_v1.json
    reports/dataforseo/question_suggestions_v1.md
    outputs/dataforseo_question_suggestions_v1.json

Cost guardrail:
    keyword_suggestions: ~$0.075 per seed call.
    Default: 3 seeds -> ~$0.225 total.
    Hard limit: 5 seeds max.
    Hard limit: 50 suggestions per seed.

Guardrails:
    - Standalone enrichment; does NOT modify keyword_master
    - Post-cutover preliminary mode
    - Budget-sensitive: small limits by default
    - Question detection is heuristic (prefix-based)
"""

from __future__ import annotations

import argparse
import csv
import io
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
SEO_OPS = Path(__file__).resolve().parents[2]
INTEGRATIONS = SEO_OPS / "integrations"
sys.path.insert(0, str(INTEGRATIONS))

KEYWORD_MASTER_CSV = (
    SEO_OPS / "snapshots" / "normalized" / "keyword_master" / "keyword_master_v3.csv"
)
RAW_SNAPSHOT = SEO_OPS / "snapshots" / "raw" / "dataforseo" / "dataforseo_question_suggestions_v1.json"
NORM_OUTPUT = SEO_OPS / "snapshots" / "normalized" / "dataforseo" / "question_suggestions_v1.json"
REPORT_MD = SEO_OPS / "reports" / "dataforseo" / "question_suggestions_v1.md"
OUTPUT_JSON = SEO_OPS / "outputs" / "dataforseo_question_suggestions_v1.json"

# ---------------------------------------------------------------------------
# Defaults
# ---------------------------------------------------------------------------
DEFAULT_SEEDS = [
    "gevelisolatie",
    "buitenmuur isoleren",
    "gevelisolatie kosten",
]

HARD_LIMIT_SEEDS = 5
HARD_LIMIT_SUGGESTIONS_PER_SEED = 50

# Dutch question words for classification
QUESTION_PREFIXES_NL = [
    "hoe", "wat", "waarom", "wanneer", "welke", "hoeveel",
    "waar", "wie", "kan", "moet", "is het", "kun je",
]

QUESTION_PATTERN = re.compile(
    r"^(" + "|".join(QUESTION_PREFIXES_NL) + r")\b",
    re.IGNORECASE,
)


# ---------------------------------------------------------------------------
# Console encoding fix
# ---------------------------------------------------------------------------
def _fix_console_encoding():
    if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
        sys.stdout = io.TextIOWrapper(
            sys.stdout.buffer, encoding="utf-8", errors="replace", line_buffering=True
        )
    if sys.stderr.encoding and sys.stderr.encoding.lower() not in ("utf-8", "utf8"):
        sys.stderr = io.TextIOWrapper(
            sys.stderr.buffer, encoding="utf-8", errors="replace", line_buffering=True
        )


# ---------------------------------------------------------------------------
# Load keyword_master for novelty check
# ---------------------------------------------------------------------------
def load_keyword_master() -> set[str]:
    keywords = set()
    if not KEYWORD_MASTER_CSV.is_file():
        print(f"  WARNING: keyword_master not found at {KEYWORD_MASTER_CSV}, novelty check disabled")
        return keywords
    with open(KEYWORD_MASTER_CSV, encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            kw = row.get("normalized_keyword", "").strip().lower()
            if kw:
                keywords.add(kw)
    return keywords


# ---------------------------------------------------------------------------
# API call
# ---------------------------------------------------------------------------
def fetch_suggestions(seeds: list[str], limit_per_seed: int) -> list[dict]:
    """Call keyword_suggestions for each seed. Returns list of raw responses."""
    from dataforseo.labs_google import LabsGoogle

    labs = LabsGoogle()
    results = []
    for seed in seeds:
        print(f"  Fetching suggestions for '{seed}' (limit={limit_per_seed})...")
        try:
            resp = labs.keyword_suggestions(seed, limit=limit_per_seed)
            results.append({"seed": seed, "response": resp, "error": None})
        except Exception as e:
            print(f"  ERROR for '{seed}': {e}")
            results.append({"seed": seed, "response": None, "error": str(e)})
    return results


# ---------------------------------------------------------------------------
# Normalize + classify
# ---------------------------------------------------------------------------
def is_question(kw: str) -> bool:
    """Check if keyword looks like a question (Dutch heuristic)."""
    return bool(QUESTION_PATTERN.match(kw.strip()))


def extract_suggestions(raw_results: list[dict]) -> list[dict]:
    """Extract and classify all suggestions from raw responses."""
    seen = set()
    all_suggestions = []

    for entry in raw_results:
        seed = entry["seed"]
        resp = entry.get("response")
        if not resp or entry.get("error"):
            continue

        for task in resp.get("tasks", []):
            for result in task.get("result") or []:
                for item in result.get("items", []):
                    kw_data = item.get("keyword_data", {})
                    kw_info = kw_data.get("keyword_info", {})
                    kw = kw_data.get("keyword", "").strip().lower()
                    if not kw or kw in seen:
                        continue
                    seen.add(kw)

                    all_suggestions.append({
                        "keyword": kw,
                        "search_volume": kw_info.get("search_volume"),
                        "cpc": kw_info.get("cpc"),
                        "competition": kw_info.get("competition"),
                        "is_question": is_question(kw),
                        "seed": seed,
                    })

    return all_suggestions


def classify_suggestions(suggestions: list[dict], master_kws: set[str]) -> dict:
    """Split into questions vs non-questions, mark novelty."""
    questions = []
    non_questions = []

    for s in suggestions:
        s["in_keyword_master"] = s["keyword"] in master_kws
        s["novelty"] = "new" if not s["in_keyword_master"] else "known"
        if s["is_question"]:
            questions.append(s)
        else:
            non_questions.append(s)

    # Sort by volume desc
    questions.sort(key=lambda x: -(x.get("search_volume") or 0))
    non_questions.sort(key=lambda x: -(x.get("search_volume") or 0))

    new_questions = [q for q in questions if q["novelty"] == "new"]
    new_non_questions = [n for n in non_questions if n["novelty"] == "new"]

    return {
        "total_suggestions": len(suggestions),
        "questions": questions,
        "non_questions": non_questions,
        "question_count": len(questions),
        "non_question_count": len(non_questions),
        "new_question_count": len(new_questions),
        "new_non_question_count": len(new_non_questions),
        "new_questions": new_questions,
        "new_non_questions": new_non_questions,
    }


# ---------------------------------------------------------------------------
# Write outputs
# ---------------------------------------------------------------------------
def write_raw(raw_results: list[dict], ts: str):
    RAW_SNAPSHOT.parent.mkdir(parents=True, exist_ok=True)
    with open(RAW_SNAPSHOT, "w", encoding="utf-8") as f:
        json.dump({"generated": ts, "results": raw_results}, f, indent=2, ensure_ascii=False, default=str)
    print(f"  Raw snapshot: {RAW_SNAPSHOT}")


def write_normalized(classified: dict, ts: str):
    NORM_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with open(NORM_OUTPUT, "w", encoding="utf-8") as f:
        json.dump({"generated": ts, **classified}, f, indent=2, ensure_ascii=False)
    print(f"  Normalized: {NORM_OUTPUT}")


def write_json_output(classified: dict, seeds_used: list[str], limit_per_seed: int, ts: str, dry_run: bool):
    payload = {
        "_meta": {
            "generated": ts,
            "generator": "run_dataforseo_question_suggestions_v1.py",
            "seeds": seeds_used,
            "limit_per_seed": limit_per_seed,
            "dry_run": dry_run,
            "guardrails": {
                "hard_limit_seeds": HARD_LIMIT_SEEDS,
                "hard_limit_per_seed": HARD_LIMIT_SUGGESTIONS_PER_SEED,
                "estimated_cost_usd": round(len(seeds_used) * 0.075, 4),
                "mode": "post_cutover_preliminary",
                "interpretation": "content_watchlist_enrichment_only",
            },
        },
        "summary": {
            "total_suggestions": classified["total_suggestions"],
            "question_count": classified["question_count"],
            "non_question_count": classified["non_question_count"],
            "new_question_count": classified["new_question_count"],
            "new_non_question_count": classified["new_non_question_count"],
        },
        "new_questions": classified["new_questions"][:20],
        "new_non_questions": classified["new_non_questions"][:20],
        "all_questions": classified["questions"],
    }
    OUTPUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2, ensure_ascii=False)
    print(f"  JSON output: {OUTPUT_JSON}")


def write_report(classified: dict, seeds_used: list[str], limit_per_seed: int, ts: str, dry_run: bool):
    lines = []
    lines.append("# DataForSEO Question & Suggestions v1\n")
    lines.append(f"**Generated:** {ts}")
    lines.append(f"**Generator:** `run_dataforseo_question_suggestions_v1.py`")
    lines.append(f"**Seeds:** {', '.join(seeds_used)}")
    lines.append(f"**Limit per seed:** {limit_per_seed}")
    if dry_run:
        lines.append("**Mode:** DRY RUN (no API calls made)")
    lines.append(f"**Estimated cost:** ~${len(seeds_used) * 0.075:.3f}")
    lines.append("")

    # Guardrails
    lines.append("## Interpretation guardrails\n")
    lines.append("- Standalone content/watchlist enrichment; does NOT modify keyword_master")
    lines.append("- Question detection is heuristic (Dutch question-word prefix matching)")
    lines.append("- Post-cutover preliminary mode: suggestions are research input, not content briefs")
    lines.append("- Volume/CPC data is DataForSEO's estimate, not primary truth")
    lines.append("")

    # Summary
    lines.append("## Summary\n")
    lines.append("| Metric | Count |")
    lines.append("|--------|-------|")
    lines.append(f"| Total suggestions | {classified['total_suggestions']} |")
    lines.append(f"| Questions | {classified['question_count']} |")
    lines.append(f"| Non-questions | {classified['non_question_count']} |")
    lines.append(f"| New questions (not in KW master) | {classified['new_question_count']} |")
    lines.append(f"| New non-questions (not in KW master) | {classified['new_non_question_count']} |")
    lines.append("")

    # New questions
    if classified["new_questions"]:
        lines.append("## New question keywords (not in keyword_master v3)\n")
        lines.append("| Keyword | Vol | CPC | Seed |")
        lines.append("|---------|-----|-----|------|")
        for q in classified["new_questions"][:20]:
            vol = q.get("search_volume") or "-"
            cpc = f"{q['cpc']:.2f}" if q.get("cpc") else "-"
            lines.append(f"| {q['keyword']} | {vol} | {cpc} | {q['seed']} |")
        lines.append("")

    # Known questions
    known_q = [q for q in classified["questions"] if q["novelty"] == "known"]
    if known_q:
        lines.append("## Known question keywords (already in keyword_master)\n")
        lines.append("| Keyword | Vol | CPC | Seed |")
        lines.append("|---------|-----|-----|------|")
        for q in known_q[:15]:
            vol = q.get("search_volume") or "-"
            cpc = f"{q['cpc']:.2f}" if q.get("cpc") else "-"
            lines.append(f"| {q['keyword']} | {vol} | {cpc} | {q['seed']} |")
        lines.append("")

    # New non-question suggestions
    if classified["new_non_questions"]:
        lines.append("## New non-question suggestions (not in keyword_master)\n")
        lines.append("| Keyword | Vol | CPC | Seed |")
        lines.append("|---------|-----|-----|------|")
        for n in classified["new_non_questions"][:15]:
            vol = n.get("search_volume") or "-"
            cpc = f"{n['cpc']:.2f}" if n.get("cpc") else "-"
            lines.append(f"| {n['keyword']} | {vol} | {cpc} | {n['seed']} |")
        lines.append("")

    # Content opportunity notes
    lines.append("## Content opportunity notes\n")
    lines.append("New question keywords can inform:")
    lines.append("- FAQ section expansion on existing pages")
    lines.append("- Blog/content topics for organic traffic growth")
    lines.append("- PAA (People Also Ask) optimization targets")
    lines.append("")
    lines.append("**Action required before using:** Manual review for relevance to gevelisolatie niche.")
    lines.append("Do NOT auto-add to keyword_master or create content without review.")
    lines.append("")

    # Limitations
    lines.append("## Limitations\n")
    lines.append("1. Question detection is prefix-based; may miss indirect questions")
    lines.append("2. keyword_suggestions endpoint returns related terms, not all are questions")
    lines.append("3. Volume data is estimated, not exact")
    lines.append("4. No intent classification beyond question/non-question split")
    lines.append("5. Small seed list; broader seeds would yield more suggestions")
    lines.append("")
    lines.append(f"---\n_Generated by `run_dataforseo_question_suggestions_v1.py` at {ts}_")

    REPORT_MD.parent.mkdir(parents=True, exist_ok=True)
    with open(REPORT_MD, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print(f"  Report: {REPORT_MD}")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main():
    _fix_console_encoding()

    parser = argparse.ArgumentParser(
        description="DataForSEO question/suggestion keywords for content watchlist (NL/nl)"
    )
    parser.add_argument(
        "--dry-run", action="store_true",
        help="Print what would be done without making API calls"
    )
    parser.add_argument(
        "--seeds", type=str, default=None,
        help="Comma-separated seed keywords (default: built-in list of 3)"
    )
    parser.add_argument(
        "--limit", type=int, default=HARD_LIMIT_SUGGESTIONS_PER_SEED,
        help=f"Max suggestions per seed (default/hard limit: {HARD_LIMIT_SUGGESTIONS_PER_SEED})"
    )
    args = parser.parse_args()

    if args.seeds:
        seeds = [s.strip() for s in args.seeds.split(",") if s.strip()]
    else:
        seeds = list(DEFAULT_SEEDS)

    seeds = seeds[:HARD_LIMIT_SEEDS]
    limit_per_seed = min(args.limit, HARD_LIMIT_SUGGESTIONS_PER_SEED)

    ts = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S+00:00")

    print(f"\n=== DataForSEO Question Suggestions v1 ===")
    print(f"  Seeds: {', '.join(seeds)}")
    print(f"  Limit per seed: {limit_per_seed}")
    print(f"  Estimated cost: ~${len(seeds) * 0.075:.3f}")

    if args.dry_run:
        print(f"\n  DRY RUN - no API calls will be made.\n")
        print(f"  Seeds that would be checked:")
        for i, s in enumerate(seeds, 1):
            print(f"    {i}. {s}")
        print(f"\n  Output files that would be created:")
        print(f"    - {RAW_SNAPSHOT}")
        print(f"    - {NORM_OUTPUT}")
        print(f"    - {REPORT_MD}")
        print(f"    - {OUTPUT_JSON}")
        print(f"\n  DRY RUN complete. Use without --dry-run to execute.")
        return

    # Load keyword_master for novelty check
    master_kws = load_keyword_master()
    print(f"  Keyword master loaded: {len(master_kws)} keywords")

    # Fetch
    raw_results = fetch_suggestions(seeds, limit_per_seed)

    # Process
    all_suggestions = extract_suggestions(raw_results)
    classified = classify_suggestions(all_suggestions, master_kws)

    # Write outputs
    print(f"\n  Writing outputs...")
    write_raw(raw_results, ts)
    write_normalized(classified, ts)
    write_json_output(classified, seeds, limit_per_seed, ts, dry_run=False)
    write_report(classified, seeds, limit_per_seed, ts, dry_run=False)

    # Summary
    print(f"\n=== Done ===")
    print(f"  Total suggestions: {classified['total_suggestions']}")
    print(f"  Questions: {classified['question_count']} (new: {classified['new_question_count']})")
    print(f"  Non-questions: {classified['non_question_count']} (new: {classified['new_non_question_count']})")


if __name__ == "__main__":
    main()

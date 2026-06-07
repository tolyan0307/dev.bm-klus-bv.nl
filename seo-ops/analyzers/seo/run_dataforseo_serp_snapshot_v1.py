"""
run_dataforseo_serp_snapshot_v1.py

Live SERP snapshot for a small shortlist of priority queries.
Targets: NL / Netherlands (location_code=2528, language=nl).

Usage (from seo-ops/):
    integrations/.venv/Scripts/python analyzers/seo/run_dataforseo_serp_snapshot_v1.py
    integrations/.venv/Scripts/python analyzers/seo/run_dataforseo_serp_snapshot_v1.py --dry-run
    integrations/.venv/Scripts/python analyzers/seo/run_dataforseo_serp_snapshot_v1.py --keywords "gevelisolatie,buitenmuur isoleren"
    integrations/.venv/Scripts/python analyzers/seo/run_dataforseo_serp_snapshot_v1.py --limit 3

Outputs:
    snapshots/raw/dataforseo/dataforseo_serp_snapshot_v1.json
    snapshots/normalized/dataforseo/serp_snapshot_v1.json
    reports/dataforseo/serp_snapshot_v1.md
    outputs/dataforseo_serp_snapshot_v1.json

Cost guardrail:
    Default shortlist = 5 keywords -> ~$0.01 total (advanced organic: ~$0.002/task).
    Hard limit: --limit caps the number of keywords processed.

Guardrails:
    - Post-cutover preliminary mode: results are directional, not action-triggering
    - DataForSEO is enrichment-only, not a replacement for GSC/GA4 evidence
    - Small default shortlist to prevent accidental expensive runs
"""

from __future__ import annotations

import argparse
import io
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

RAW_SNAPSHOT = SEO_OPS / "snapshots" / "raw" / "dataforseo" / "dataforseo_serp_snapshot_v1.json"
NORM_OUTPUT = SEO_OPS / "snapshots" / "normalized" / "dataforseo" / "serp_snapshot_v1.json"
REPORT_MD = SEO_OPS / "reports" / "dataforseo" / "serp_snapshot_v1.md"
OUTPUT_JSON = SEO_OPS / "outputs" / "dataforseo_serp_snapshot_v1.json"

# ---------------------------------------------------------------------------
# Default shortlist: top priority queries from keyword_intelligence_review_v2
# ---------------------------------------------------------------------------
DEFAULT_KEYWORDS = [
    "gevelisolatie",
    "buitenmuur isoleren",
    "gevelisolatie kosten",
    "buitengevelisolatie",
    "gevelisolatie rotterdam",
]

HARD_LIMIT = 10  # absolute max keywords per run to prevent cost surprise


# ---------------------------------------------------------------------------
# Console encoding fix (Windows cp1251 workaround)
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
# API call
# ---------------------------------------------------------------------------
def fetch_serps(keywords: list[str]) -> list[dict]:
    """Call SERP organic/live/advanced for each keyword. Returns list of raw responses."""
    from dataforseo.serp_google import SerpGoogle

    serp = SerpGoogle()
    results = []
    for kw in keywords:
        print(f"  Fetching SERP for '{kw}'...")
        try:
            resp = serp.organic_live(kw, depth=10)
            results.append({"keyword": kw, "response": resp, "error": None})
        except Exception as e:
            print(f"  ERROR for '{kw}': {e}")
            results.append({"keyword": kw, "response": None, "error": str(e)})
    return results


# ---------------------------------------------------------------------------
# Normalize
# ---------------------------------------------------------------------------
def normalize_serp_results(raw_results: list[dict]) -> list[dict]:
    """Extract key fields from raw SERP responses into flat structures."""
    normalized = []
    for entry in raw_results:
        kw = entry["keyword"]
        resp = entry.get("response")
        if not resp or entry.get("error"):
            normalized.append({
                "keyword": kw,
                "error": entry.get("error", "no response"),
                "items": [],
            })
            continue

        tasks = resp.get("tasks", [])
        items_out = []
        for task in tasks:
            result = (task.get("result") or [None])[0]
            if not result:
                continue
            for item in result.get("items", []):
                if item.get("type") != "organic":
                    continue
                items_out.append({
                    "position": item.get("rank_absolute"),
                    "domain": item.get("domain"),
                    "url": item.get("url"),
                    "title": item.get("title"),
                    "description": (item.get("description") or "")[:200],
                    "breadcrumb": item.get("breadcrumb"),
                    "is_featured_snippet": item.get("is_featured_snippet", False),
                })

        se_results_count = 0
        if tasks and tasks[0].get("result"):
            se_results_count = tasks[0]["result"][0].get("se_results_count", 0)

        normalized.append({
            "keyword": kw,
            "se_results_count": se_results_count,
            "organic_count": len(items_out),
            "items": items_out,
        })
    return normalized


# ---------------------------------------------------------------------------
# Analysis helpers
# ---------------------------------------------------------------------------
def analyze_own_positions(normalized: list[dict], own_domain: str = "bm-klus-bv.nl") -> list[dict]:
    """Find our position for each keyword."""
    findings = []
    for entry in normalized:
        kw = entry["keyword"]
        own_items = [i for i in entry.get("items", []) if own_domain in (i.get("domain") or "")]
        if own_items:
            best = own_items[0]
            findings.append({
                "keyword": kw,
                "own_position": best["position"],
                "own_url": best["url"],
                "own_title": best["title"],
                "competitors_above": best["position"] - 1,
                "status": "ranking",
            })
        else:
            findings.append({
                "keyword": kw,
                "own_position": None,
                "own_url": None,
                "own_title": None,
                "competitors_above": None,
                "status": "not_found_in_top10",
            })
    return findings


def analyze_competitor_landscape(normalized: list[dict], own_domain: str = "bm-klus-bv.nl") -> dict:
    """Count domain appearances across all SERPs."""
    domain_counts: dict[str, int] = {}
    for entry in normalized:
        for item in entry.get("items", []):
            d = item.get("domain", "")
            if d and d != own_domain:
                domain_counts[d] = domain_counts.get(d, 0) + 1
    # Sort by frequency
    sorted_domains = sorted(domain_counts.items(), key=lambda x: -x[1])
    return {"top_competitors": sorted_domains[:15], "total_unique_domains": len(domain_counts)}


# ---------------------------------------------------------------------------
# Write outputs
# ---------------------------------------------------------------------------
def write_raw(raw_results: list[dict], ts: str):
    RAW_SNAPSHOT.parent.mkdir(parents=True, exist_ok=True)
    with open(RAW_SNAPSHOT, "w", encoding="utf-8") as f:
        json.dump({"generated": ts, "results": raw_results}, f, indent=2, ensure_ascii=False, default=str)
    print(f"  Raw snapshot: {RAW_SNAPSHOT}")


def write_normalized(normalized: list[dict], ts: str):
    NORM_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with open(NORM_OUTPUT, "w", encoding="utf-8") as f:
        json.dump({"generated": ts, "keywords": normalized}, f, indent=2, ensure_ascii=False)
    print(f"  Normalized: {NORM_OUTPUT}")


def write_json_output(findings: list[dict], landscape: dict, normalized: list[dict], ts: str, keywords_used: list[str], dry_run: bool):
    payload = {
        "_meta": {
            "generated": ts,
            "generator": "run_dataforseo_serp_snapshot_v1.py",
            "keywords_requested": keywords_used,
            "keywords_count": len(keywords_used),
            "dry_run": dry_run,
            "guardrails": {
                "hard_limit": HARD_LIMIT,
                "estimated_cost_usd": round(len(keywords_used) * 0.002, 4),
                "mode": "post_cutover_preliminary",
                "interpretation": "directional_only",
            },
        },
        "own_positions": findings,
        "competitor_landscape": landscape,
        "serp_details": [{
            "keyword": n["keyword"],
            "se_results_count": n.get("se_results_count", 0),
            "organic_count": n.get("organic_count", 0),
            "top3_domains": [i.get("domain") for i in n.get("items", [])[:3]],
        } for n in normalized],
    }
    OUTPUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2, ensure_ascii=False)
    print(f"  JSON output: {OUTPUT_JSON}")


def write_report(findings: list[dict], landscape: dict, normalized: list[dict], ts: str, keywords_used: list[str], dry_run: bool):
    lines = []
    lines.append("# DataForSEO SERP Snapshot v1\n")
    lines.append(f"**Generated:** {ts}")
    lines.append(f"**Generator:** `run_dataforseo_serp_snapshot_v1.py`")
    lines.append(f"**Keywords:** {len(keywords_used)}")
    if dry_run:
        lines.append("**Mode:** DRY RUN (no API calls made)")
    lines.append(f"**Estimated cost:** ~${len(keywords_used) * 0.002:.4f}")
    lines.append("")

    # Guardrails
    lines.append("## Interpretation guardrails\n")
    lines.append("- Post-cutover preliminary mode: SERP positions are directional evidence, not action-triggering")
    lines.append("- DataForSEO SERP is a point-in-time snapshot; positions fluctuate daily")
    lines.append("- Compare with GSC average position data for trend context")
    lines.append("- Small sample: only top-10 organic results captured")
    lines.append("")

    # Own positions
    lines.append("## Own positions (bm-klus-bv.nl)\n")
    lines.append("| Keyword | SERP Pos | URL | Status |")
    lines.append("|---------|----------|-----|--------|")
    for f in findings:
        pos = f["own_position"] or "-"
        url = f["own_url"] or "-"
        status = f["status"]
        lines.append(f"| {f['keyword']} | {pos} | {url} | {status} |")
    lines.append("")

    ranking = [f for f in findings if f["status"] == "ranking"]
    not_found = [f for f in findings if f["status"] == "not_found_in_top10"]
    lines.append(f"**Ranking in top 10:** {len(ranking)}/{len(findings)}")
    if not_found:
        lines.append(f"**Not found in top 10:** {', '.join(f['keyword'] for f in not_found)}")
    lines.append("")

    # Competitor landscape
    lines.append("## Competitor landscape\n")
    lines.append(f"**Unique competitor domains in SERPs:** {landscape['total_unique_domains']}")
    lines.append("")
    lines.append("| Domain | Appearances | Overlap |")
    lines.append("|--------|-------------|---------|")
    total_kw = len(keywords_used)
    for domain, count in landscape["top_competitors"][:10]:
        pct = round(count / total_kw * 100) if total_kw else 0
        lines.append(f"| {domain} | {count}/{total_kw} | {pct}% |")
    lines.append("")

    # SERP detail per keyword
    lines.append("## SERP details per keyword\n")
    for n in normalized:
        kw = n["keyword"]
        lines.append(f"### {kw}\n")
        if n.get("error"):
            lines.append(f"ERROR: {n['error']}\n")
            continue
        lines.append(f"- Total results: {n.get('se_results_count', '?')}")
        lines.append(f"- Organic in top 10: {n.get('organic_count', 0)}")
        lines.append("")
        lines.append("| # | Domain | Title |")
        lines.append("|---|--------|-------|")
        for item in n.get("items", [])[:10]:
            lines.append(f"| {item['position']} | {item['domain']} | {(item['title'] or '')[:60]} |")
        lines.append("")

    # Limitations
    lines.append("## Limitations\n")
    lines.append("1. Point-in-time snapshot; SERP positions change daily")
    lines.append("2. Desktop only (no mobile SERP)")
    lines.append("3. Top 10 organic only (no ads, PAA, featured snippets detail)")
    lines.append("4. No historical comparison (single snapshot)")
    lines.append("5. Cost per keyword ~$0.002; scale with caution")
    lines.append("")
    lines.append(f"---\n_Generated by `run_dataforseo_serp_snapshot_v1.py` at {ts}_")

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
        description="DataForSEO SERP snapshot for priority queries (NL/nl)"
    )
    parser.add_argument(
        "--dry-run", action="store_true",
        help="Print what would be done without making API calls"
    )
    parser.add_argument(
        "--keywords", type=str, default=None,
        help="Comma-separated keywords to check (default: built-in shortlist of 5)"
    )
    parser.add_argument(
        "--limit", type=int, default=None,
        help=f"Max keywords to process (hard limit: {HARD_LIMIT})"
    )
    args = parser.parse_args()

    # Resolve keyword list
    if args.keywords:
        keywords = [k.strip() for k in args.keywords.split(",") if k.strip()]
    else:
        keywords = list(DEFAULT_KEYWORDS)

    # Apply limit
    limit = min(args.limit or len(keywords), HARD_LIMIT)
    keywords = keywords[:limit]

    ts = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S+00:00")

    print(f"\n=== DataForSEO SERP Snapshot v1 ===")
    print(f"  Keywords: {len(keywords)}")
    print(f"  Estimated cost: ~${len(keywords) * 0.002:.4f}")
    print(f"  Hard limit: {HARD_LIMIT}")

    if args.dry_run:
        print(f"\n  DRY RUN - no API calls will be made.\n")
        print(f"  Keywords that would be checked:")
        for i, kw in enumerate(keywords, 1):
            print(f"    {i}. {kw}")
        print(f"\n  Output files that would be created:")
        print(f"    - {RAW_SNAPSHOT}")
        print(f"    - {NORM_OUTPUT}")
        print(f"    - {REPORT_MD}")
        print(f"    - {OUTPUT_JSON}")
        print(f"\n  DRY RUN complete. Use without --dry-run to execute.")
        return

    # Live run
    print(f"\n  Calling DataForSEO SERP API...\n")
    raw_results = fetch_serps(keywords)

    # Process
    normalized = normalize_serp_results(raw_results)
    findings = analyze_own_positions(normalized)
    landscape = analyze_competitor_landscape(normalized)

    # Write outputs
    print(f"\n  Writing outputs...")
    write_raw(raw_results, ts)
    write_normalized(normalized, ts)
    write_json_output(findings, landscape, normalized, ts, keywords, dry_run=False)
    write_report(findings, landscape, normalized, ts, keywords, dry_run=False)

    # Summary
    ranking = [f for f in findings if f["status"] == "ranking"]
    print(f"\n=== Done ===")
    print(f"  Keywords checked: {len(keywords)}")
    print(f"  Ranking in top 10: {len(ranking)}/{len(findings)}")
    print(f"  Unique competitor domains: {landscape['total_unique_domains']}")


if __name__ == "__main__":
    main()

"""
run_dataforseo_ranked_keywords_gap_v1.py

Lightweight keyword gap analysis: compare bm-klus-bv.nl ranked keywords
against 2-3 competitor domains using DataForSEO keywords_for_site endpoint.

Usage (from seo-ops/):
    integrations/.venv/Scripts/python analyzers/keywords/run_dataforseo_ranked_keywords_gap_v1.py
    integrations/.venv/Scripts/python analyzers/keywords/run_dataforseo_ranked_keywords_gap_v1.py --dry-run
    integrations/.venv/Scripts/python analyzers/keywords/run_dataforseo_ranked_keywords_gap_v1.py --competitors "isolatiewereld.nl,knauf.nl"
    integrations/.venv/Scripts/python analyzers/keywords/run_dataforseo_ranked_keywords_gap_v1.py --limit 50

Outputs:
    snapshots/raw/dataforseo/dataforseo_ranked_keywords_gap_v1.json
    snapshots/normalized/dataforseo/ranked_keywords_gap_v1.json
    reports/dataforseo/ranked_keywords_gap_v1.md
    outputs/dataforseo_ranked_keywords_gap_v1.json

Cost guardrail:
    keywords_for_site: ~$0.075 per domain call.
    Default: own + 2 competitors = 3 calls -> ~$0.225 total.
    Hard limit on competitor count: 3.
    Hard limit on keywords per domain: 100.

Guardrails:
    - Standalone enrichment; does NOT modify keyword_master
    - Post-cutover preliminary mode
    - Budget-sensitive: small limits by default
    - Results are directional evidence, not action-triggering
"""

from __future__ import annotations

import argparse
import csv
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

KEYWORD_MASTER_CSV = (
    SEO_OPS / "snapshots" / "normalized" / "keyword_master" / "keyword_master_v3.csv"
)
RAW_SNAPSHOT = SEO_OPS / "snapshots" / "raw" / "dataforseo" / "dataforseo_ranked_keywords_gap_v1.json"
NORM_OUTPUT = SEO_OPS / "snapshots" / "normalized" / "dataforseo" / "ranked_keywords_gap_v1.json"
REPORT_MD = SEO_OPS / "reports" / "dataforseo" / "ranked_keywords_gap_v1.md"
OUTPUT_JSON = SEO_OPS / "outputs" / "dataforseo_ranked_keywords_gap_v1.json"

# ---------------------------------------------------------------------------
# Defaults
# ---------------------------------------------------------------------------
OWN_DOMAIN = "bm-klus-bv.nl"

# Reasonable competitor guesses for gevelisolatie niche in NL.
# Can be overridden via --competitors flag.
DEFAULT_COMPETITORS = [
    "isolatie-info.nl",
    "verbouwkosten.com",
]

HARD_LIMIT_COMPETITORS = 3
HARD_LIMIT_KW_PER_DOMAIN = 100  # keywords_for_site limit param


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
# Load keyword_master for overlap check
# ---------------------------------------------------------------------------
def load_keyword_master() -> set[str]:
    """Return set of normalized keywords from keyword_master_v3."""
    keywords = set()
    if not KEYWORD_MASTER_CSV.is_file():
        print(f"  WARNING: keyword_master not found at {KEYWORD_MASTER_CSV}, overlap check disabled")
        return keywords
    with open(KEYWORD_MASTER_CSV, encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            kw = row.get("normalized_keyword", "").strip().lower()
            if kw:
                keywords.add(kw)
    return keywords


# ---------------------------------------------------------------------------
# API calls
# ---------------------------------------------------------------------------
def fetch_ranked_keywords(domain: str, limit: int) -> dict:
    """Call keywords_for_site for a single domain."""
    from dataforseo.labs_google import LabsGoogle

    labs = LabsGoogle()
    print(f"  Fetching ranked keywords for '{domain}' (limit={limit})...")
    try:
        resp = labs.keywords_for_site(target=domain, limit=limit)
        return {"domain": domain, "response": resp, "error": None}
    except Exception as e:
        print(f"  ERROR for '{domain}': {e}")
        return {"domain": domain, "response": None, "error": str(e)}


# ---------------------------------------------------------------------------
# Normalize
# ---------------------------------------------------------------------------
def extract_keywords_from_response(raw: dict) -> list[dict]:
    """Extract keyword entries from keywords_for_site response."""
    resp = raw.get("response")
    if not resp or raw.get("error"):
        return []

    items = []
    for task in resp.get("tasks", []):
        for result in task.get("result") or []:
            for item in result.get("items", []):
                # keywords_for_site returns keyword/keyword_info at top level
                kw_info = item.get("keyword_info", {})
                intent_info = item.get("search_intent_info", {})
                items.append({
                    "keyword": item.get("keyword", ""),
                    "search_volume": kw_info.get("search_volume"),
                    "cpc": kw_info.get("cpc"),
                    "competition": kw_info.get("competition"),
                    "intent": intent_info.get("main_intent"),
                })
    return items


def compute_gap(own_kws: list[dict], competitor_kws: dict[str, list[dict]], master_kws: set[str]) -> dict:
    """Compute keyword gap: competitor keywords we don't rank for."""
    own_set = {kw["keyword"].lower().strip() for kw in own_kws if kw.get("keyword")}

    # All competitor keywords
    all_competitor_kws: dict[str, dict] = {}
    for comp_domain, comp_items in competitor_kws.items():
        for item in comp_items:
            kw = item.get("keyword", "").lower().strip()
            if not kw:
                continue
            if kw not in all_competitor_kws:
                all_competitor_kws[kw] = {
                    "keyword": kw,
                    "search_volume": item.get("search_volume"),
                    "cpc": item.get("cpc"),
                    "competitor_domains": [],
                    "in_own_rankings": kw in own_set,
                    "in_keyword_master": kw in master_kws,
                }
            all_competitor_kws[kw]["competitor_domains"].append(comp_domain)

    # Split into buckets
    gap_keywords = []  # competitor has, we don't
    overlap_keywords = []  # both have
    for kw, data in all_competitor_kws.items():
        data["competitor_count"] = len(set(data["competitor_domains"]))
        if data["in_own_rankings"]:
            overlap_keywords.append(data)
        else:
            gap_keywords.append(data)

    # Sort gap by volume desc
    gap_keywords.sort(key=lambda x: -(x.get("search_volume") or 0))
    overlap_keywords.sort(key=lambda x: -(x.get("search_volume") or 0))

    # New to keyword_master
    new_to_master = [g for g in gap_keywords if not g["in_keyword_master"]]

    return {
        "own_keyword_count": len(own_set),
        "competitor_unique_keywords": len(all_competitor_kws),
        "gap_keywords": gap_keywords,
        "overlap_keywords": overlap_keywords,
        "new_to_keyword_master": new_to_master,
    }


# ---------------------------------------------------------------------------
# Write outputs
# ---------------------------------------------------------------------------
def write_raw(raw_results: dict, ts: str):
    RAW_SNAPSHOT.parent.mkdir(parents=True, exist_ok=True)
    with open(RAW_SNAPSHOT, "w", encoding="utf-8") as f:
        json.dump({"generated": ts, **raw_results}, f, indent=2, ensure_ascii=False, default=str)
    print(f"  Raw snapshot: {RAW_SNAPSHOT}")


def write_normalized(gap_data: dict, ts: str):
    NORM_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with open(NORM_OUTPUT, "w", encoding="utf-8") as f:
        json.dump({"generated": ts, **gap_data}, f, indent=2, ensure_ascii=False, default=str)
    print(f"  Normalized: {NORM_OUTPUT}")


def write_json_output(gap_data: dict, own_kws: list[dict], domains_used: list[str], ts: str, dry_run: bool):
    domain_count = len(domains_used)
    payload = {
        "_meta": {
            "generated": ts,
            "generator": "run_dataforseo_ranked_keywords_gap_v1.py",
            "own_domain": OWN_DOMAIN,
            "competitor_domains": [d for d in domains_used if d != OWN_DOMAIN],
            "dry_run": dry_run,
            "guardrails": {
                "hard_limit_competitors": HARD_LIMIT_COMPETITORS,
                "hard_limit_kw_per_domain": HARD_LIMIT_KW_PER_DOMAIN,
                "estimated_cost_usd": round(domain_count * 0.075, 4),
                "mode": "post_cutover_preliminary",
                "interpretation": "directional_enrichment_only",
            },
        },
        "summary": {
            "own_ranked_keywords": gap_data["own_keyword_count"],
            "competitor_unique_keywords": gap_data["competitor_unique_keywords"],
            "gap_keywords_count": len(gap_data["gap_keywords"]),
            "overlap_keywords_count": len(gap_data["overlap_keywords"]),
            "new_to_keyword_master_count": len(gap_data["new_to_keyword_master"]),
        },
        "gap_keywords_top30": gap_data["gap_keywords"][:30],
        "new_to_keyword_master": gap_data["new_to_keyword_master"][:20],
        "overlap_keywords_top20": gap_data["overlap_keywords"][:20],
    }
    OUTPUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2, ensure_ascii=False)
    print(f"  JSON output: {OUTPUT_JSON}")


def write_report(gap_data: dict, own_kws: list[dict], domains_used: list[str], ts: str, dry_run: bool):
    competitors = [d for d in domains_used if d != OWN_DOMAIN]
    domain_count = len(domains_used)
    lines = []
    lines.append("# DataForSEO Ranked Keywords Gap v1\n")
    lines.append(f"**Generated:** {ts}")
    lines.append(f"**Generator:** `run_dataforseo_ranked_keywords_gap_v1.py`")
    lines.append(f"**Own domain:** {OWN_DOMAIN}")
    lines.append(f"**Competitors:** {', '.join(competitors)}")
    if dry_run:
        lines.append("**Mode:** DRY RUN (no API calls made)")
    lines.append(f"**Estimated cost:** ~${domain_count * 0.075:.3f}")
    lines.append("")

    # Guardrails
    lines.append("## Interpretation guardrails\n")
    lines.append("- Standalone enrichment: does NOT modify keyword_master or trigger any actions")
    lines.append("- Post-cutover preliminary mode: gap data is directional, not definitive")
    lines.append("- keywords_for_site returns estimated rankings, not live SERP positions")
    lines.append("- Small sample (100 kw/domain): may miss long-tail coverage")
    lines.append("- Competitor selection is heuristic; validate before using for strategy")
    lines.append("")

    # Summary
    lines.append("## Summary\n")
    lines.append(f"| Metric | Count |")
    lines.append(f"|--------|-------|")
    lines.append(f"| Own ranked keywords returned | {gap_data['own_keyword_count']} |")
    lines.append(f"| Competitor unique keywords | {gap_data['competitor_unique_keywords']} |")
    lines.append(f"| Gap keywords (they rank, we don't) | {len(gap_data['gap_keywords'])} |")
    lines.append(f"| Overlap keywords (both rank) | {len(gap_data['overlap_keywords'])} |")
    lines.append(f"| New to keyword_master | {len(gap_data['new_to_keyword_master'])} |")
    lines.append("")

    # Gap keywords
    lines.append("## Top gap keywords (competitor ranks, we don't)\n")
    lines.append("| Keyword | Vol | CPC | Competitors | In KW Master |")
    lines.append("|---------|-----|-----|-------------|--------------|")
    for g in gap_data["gap_keywords"][:20]:
        vol = g.get("search_volume") or "-"
        cpc = f"{g['cpc']:.2f}" if g.get("cpc") else "-"
        comp = g.get("competitor_count", 0)
        in_master = "yes" if g.get("in_keyword_master") else "no"
        lines.append(f"| {g['keyword']} | {vol} | {cpc} | {comp} | {in_master} |")
    lines.append("")

    # New to keyword_master
    if gap_data["new_to_keyword_master"]:
        lines.append("## New keywords (not in keyword_master v3)\n")
        lines.append("| Keyword | Vol | CPC | Competitors |")
        lines.append("|---------|-----|-----|-------------|")
        for g in gap_data["new_to_keyword_master"][:15]:
            vol = g.get("search_volume") or "-"
            cpc = f"{g['cpc']:.2f}" if g.get("cpc") else "-"
            comp = g.get("competitor_count", 0)
            lines.append(f"| {g['keyword']} | {vol} | {cpc} | {comp} |")
        lines.append("")

    # Overlap
    lines.append("## Top overlap keywords (both rank)\n")
    lines.append("| Keyword | Vol | CPC | In KW Master |")
    lines.append("|---------|-----|-----|--------------|")
    for o in gap_data["overlap_keywords"][:15]:
        vol = o.get("search_volume") or "-"
        cpc = f"{o['cpc']:.2f}" if o.get("cpc") else "-"
        in_master = "yes" if o.get("in_keyword_master") else "no"
        lines.append(f"| {o['keyword']} | {vol} | {cpc} | {in_master} |")
    lines.append("")

    # Limitations
    lines.append("## Limitations\n")
    lines.append("1. keywords_for_site returns estimated data, not real-time SERP scrape")
    lines.append("2. Limited to 100 keywords per domain (may miss relevant long-tail)")
    lines.append("3. Competitor selection is heuristic and may need refinement")
    lines.append("4. Gap analysis is keyword-level only (no page-level comparison)")
    lines.append("5. Does not account for search intent differences")
    lines.append("")
    lines.append(f"---\n_Generated by `run_dataforseo_ranked_keywords_gap_v1.py` at {ts}_")

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
        description="DataForSEO keyword gap: own domain vs competitors (NL/nl)"
    )
    parser.add_argument(
        "--dry-run", action="store_true",
        help="Print what would be done without making API calls"
    )
    parser.add_argument(
        "--competitors", type=str, default=None,
        help="Comma-separated competitor domains (default: built-in list of 2)"
    )
    parser.add_argument(
        "--limit", type=int, default=HARD_LIMIT_KW_PER_DOMAIN,
        help=f"Max keywords per domain (default/hard limit: {HARD_LIMIT_KW_PER_DOMAIN})"
    )
    args = parser.parse_args()

    if args.competitors:
        competitors = [c.strip() for c in args.competitors.split(",") if c.strip()]
    else:
        competitors = list(DEFAULT_COMPETITORS)

    competitors = competitors[:HARD_LIMIT_COMPETITORS]
    kw_limit = min(args.limit, HARD_LIMIT_KW_PER_DOMAIN)
    all_domains = [OWN_DOMAIN] + competitors
    domain_count = len(all_domains)

    ts = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S+00:00")

    print(f"\n=== DataForSEO Ranked Keywords Gap v1 ===")
    print(f"  Own domain: {OWN_DOMAIN}")
    print(f"  Competitors: {', '.join(competitors)}")
    print(f"  KW limit per domain: {kw_limit}")
    print(f"  Estimated cost: ~${domain_count * 0.075:.3f}")

    if args.dry_run:
        print(f"\n  DRY RUN - no API calls will be made.\n")
        print(f"  Domains that would be checked:")
        for d in all_domains:
            role = "own" if d == OWN_DOMAIN else "competitor"
            print(f"    - {d} ({role})")
        print(f"\n  Output files that would be created:")
        print(f"    - {RAW_SNAPSHOT}")
        print(f"    - {NORM_OUTPUT}")
        print(f"    - {REPORT_MD}")
        print(f"    - {OUTPUT_JSON}")
        print(f"\n  DRY RUN complete. Use without --dry-run to execute.")
        return

    # Load keyword_master for overlap check
    master_kws = load_keyword_master()
    print(f"  Keyword master loaded: {len(master_kws)} keywords")

    # Fetch for all domains
    raw_all = {}
    for domain in all_domains:
        raw = fetch_ranked_keywords(domain, kw_limit)
        raw_all[domain] = raw

    # Extract keywords
    own_kws = extract_keywords_from_response(raw_all[OWN_DOMAIN])
    competitor_kws = {}
    for comp in competitors:
        competitor_kws[comp] = extract_keywords_from_response(raw_all[comp])

    # Compute gap
    gap_data = compute_gap(own_kws, competitor_kws, master_kws)

    # Write outputs
    print(f"\n  Writing outputs...")
    write_raw(raw_all, ts)
    write_normalized(gap_data, ts)
    write_json_output(gap_data, own_kws, all_domains, ts, dry_run=False)
    write_report(gap_data, own_kws, all_domains, ts, dry_run=False)

    # Summary
    print(f"\n=== Done ===")
    print(f"  Own ranked keywords: {gap_data['own_keyword_count']}")
    print(f"  Gap keywords: {len(gap_data['gap_keywords'])}")
    print(f"  Overlap keywords: {len(gap_data['overlap_keywords'])}")
    print(f"  New to keyword_master: {len(gap_data['new_to_keyword_master'])}")


if __name__ == "__main__":
    main()

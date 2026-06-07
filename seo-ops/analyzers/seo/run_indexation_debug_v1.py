"""
run_indexation_debug_v1.py — Indexation diagnostics analyzer.

Reads normalized URL Inspection artifacts and optional supporting data
(GSC query/page snapshots, page inventory) to produce a structured
indexation diagnosis per URL.

READ-ONLY: does not modify any site pages or server config.

Usage:
  python seo-ops/analyzers/seo/run_indexation_debug_v1.py
  python seo-ops/analyzers/seo/run_indexation_debug_v1.py --input seo-ops/snapshots/normalized/seo/url_inspection_cluster_check_2026-04-08_normalized.json
  python seo-ops/analyzers/seo/run_indexation_debug_v1.py --label cluster_check --prefer-window 28
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
# Windows UTF-8 stdout
# ---------------------------------------------------------------------------
if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
elif sys.stdout and sys.stdout.encoding != "utf-8":
    sys.stdout = io.TextIOWrapper(
        sys.stdout.buffer, encoding="utf-8", errors="replace"
    )

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
SCRIPT_DIR = Path(__file__).resolve().parent
SEO_OPS_ROOT = SCRIPT_DIR.parents[1]

NORM_DIR = SEO_OPS_ROOT / "snapshots" / "normalized" / "seo"
OUTPUT_DIR = SEO_OPS_ROOT / "outputs"
REPORT_DIR = SEO_OPS_ROOT / "reports" / "seo"
PAGES_DIR = SEO_OPS_ROOT / "snapshots" / "normalized" / "pages"


# ---------------------------------------------------------------------------
# Loaders
# ---------------------------------------------------------------------------

def _load_json(path: Path) -> dict | None:
    if not path.is_file():
        return None
    return json.loads(path.read_text(encoding="utf-8"))


def _load_csv(path: Path) -> list[dict]:
    if not path.is_file():
        return []
    with open(path, encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


def find_latest_inspection_artifact() -> Path | None:
    """Find the most recent normalized url_inspection JSON in NORM_DIR."""
    candidates = sorted(
        NORM_DIR.glob("url_inspection_*_normalized.json"),
        key=lambda p: p.stat().st_mtime,
        reverse=True,
    )
    return candidates[0] if candidates else None


def load_gsc_page_aggregates(window: int) -> list[dict]:
    """Load GSC page-aggregated data for the given window."""
    path = NORM_DIR / f"gsc_query_page_aggregated_pages_last{window}d.csv"
    return _load_csv(path)


def load_gsc_row_level(window: int) -> list[dict]:
    """Load GSC row-level query+page data for the given window."""
    path = NORM_DIR / f"gsc_query_page_last{window}d.csv"
    return _load_csv(path)


def load_page_inventory() -> list[dict]:
    path = PAGES_DIR / "page_inventory_v1.csv"
    return _load_csv(path)


# ---------------------------------------------------------------------------
# Classification logic
# ---------------------------------------------------------------------------

# Outcome buckets
NOT_INDEXED_CONFIRMED = "not_indexed_confirmed"
INDEXED_VISIBILITY_UNKNOWN = "indexed_but_visibility_unknown"
INDEXED_LOW_EVIDENCE = "indexed_with_low_search_evidence"
CANONICAL_MISMATCH = "canonical_mismatch_suspected"
INSUFFICIENT_EVIDENCE = "insufficient_evidence"


def _safe_int(val, default=0):
    try:
        return int(val)
    except (ValueError, TypeError):
        return default


def _safe_float(val, default=0.0):
    try:
        return float(val)
    except (ValueError, TypeError):
        return default


def classify_url(
    inspection: dict,
    gsc_page_data: dict | None,
    gsc_queries: list[dict],
    inventory_entry: dict | None,
) -> dict:
    """
    Produce a structured diagnosis for a single inspected URL.

    Returns a dict with: outcome, observations, interpretations,
    hypotheses, recommended_next_checks, excluded_context.
    """
    observations: list[str] = []
    interpretations: list[str] = []
    hypotheses: list[str] = []
    recommended_checks: list[str] = []
    excluded_context: list[str] = []

    indexing_state = inspection.get("indexing_state")
    verdict = inspection.get("verdict_raw")
    coverage_state = inspection.get("coverage_state")
    user_canonical = inspection.get("user_canonical")
    google_canonical = inspection.get("google_canonical")
    page_fetch_state = inspection.get("page_fetch_state")
    robots_txt_state = inspection.get("robots_txt_state")
    indexing_allowed = inspection.get("indexing_allowed")
    last_crawl_time = inspection.get("last_crawl_time")
    url = inspection.get("inspection_url", "")

    # ── Observation: inspection evidence ──
    if verdict:
        observations.append(f"URL Inspection verdict: {verdict}")
    if indexing_state:
        observations.append(f"Indexing state: {indexing_state}")
    if coverage_state:
        observations.append(f"Coverage state: {coverage_state}")
    if page_fetch_state:
        observations.append(f"Page fetch state: {page_fetch_state}")
    if robots_txt_state:
        observations.append(f"Robots.txt state: {robots_txt_state}")
    if indexing_allowed is not None:
        observations.append(f"Indexing allowed: {indexing_allowed}")
    if last_crawl_time:
        observations.append(f"Last crawl time: {last_crawl_time}")
    if user_canonical:
        observations.append(f"User-declared canonical: {user_canonical}")
    if google_canonical:
        observations.append(f"Google-selected canonical: {google_canonical}")

    # ── Observation: GSC visibility evidence ──
    has_gsc_data = gsc_page_data is not None
    gsc_clicks = 0
    gsc_impressions = 0
    gsc_queries_count = len(gsc_queries)

    if has_gsc_data:
        gsc_clicks = _safe_int(gsc_page_data.get("total_clicks", 0))
        gsc_impressions = _safe_int(gsc_page_data.get("total_impressions", 0))
        observations.append(
            f"GSC page-level: {gsc_clicks} clicks, {gsc_impressions} impressions, "
            f"{gsc_queries_count} distinct queries"
        )
    else:
        observations.append("No GSC page-level data found for this URL")

    # ── Observation: page inventory ──
    if inventory_entry:
        observations.append(
            f"Page exists in inventory: type={inventory_entry.get('page_type', '?')}, "
            f"route={inventory_entry.get('route_path', '?')}"
        )
    else:
        observations.append("URL not found in page inventory")

    # ── Classification ──
    outcome = INSUFFICIENT_EVIDENCE

    # Determine if indexed based on inspection evidence
    is_indexed = False
    is_not_indexed = False

    if indexing_state:
        state_lower = indexing_state.lower()
        if "submitted and indexed" in state_lower or state_lower == "indexed":
            is_indexed = True
        elif "not indexed" in state_lower or "excluded" in state_lower:
            is_not_indexed = True

    if verdict:
        verdict_lower = verdict.lower()
        if verdict_lower == "pass" or verdict_lower == "neutral":
            is_indexed = True
        elif verdict_lower == "fail":
            is_not_indexed = True

    # Check canonical mismatch
    canonical_mismatch = False
    if user_canonical and google_canonical:
        if user_canonical.rstrip("/") != google_canonical.rstrip("/"):
            canonical_mismatch = True
            observations.append(
                f"Canonical mismatch detected: user={user_canonical}, google={google_canonical}"
            )

    # Assign outcome bucket
    if is_not_indexed:
        outcome = NOT_INDEXED_CONFIRMED
        interpretations.append(
            "Inspection evidence confirms this URL is not currently in Google's index."
        )
        # Add context-aware hypotheses
        if page_fetch_state and "error" in page_fetch_state.lower():
            hypotheses.append(
                "Page fetch errors may be preventing indexing. "
                "This remains a hypothesis until server logs are checked."
            )
        if robots_txt_state and "blocked" in robots_txt_state.lower():
            interpretations.append(
                "Robots.txt is blocking crawling for this URL (confirmed by inspection)."
            )
        elif indexing_allowed is not None and str(indexing_allowed).lower() in ("false", "disallowed"):
            interpretations.append(
                "Indexing is disallowed for this URL (confirmed by inspection — noindex or equivalent)."
            )
        else:
            hypotheses.append(
                "Possible causes include: insufficient internal linking, content quality signals, "
                "or Google choosing not to index. Cause is not confirmed by inspection alone."
            )
        recommended_checks.append("Verify robots.txt and meta robots directives manually")
        recommended_checks.append("Check internal linking to this URL")
        recommended_checks.append("Review sitemap inclusion for this URL")

    elif is_indexed and canonical_mismatch:
        outcome = CANONICAL_MISMATCH
        interpretations.append(
            "URL appears indexed but Google selected a different canonical. "
            "This may affect which URL appears in search results."
        )
        hypotheses.append(
            "Canonical mismatch may be caused by duplicate content, redirect chains, "
            "or conflicting canonical signals. Further investigation needed."
        )
        recommended_checks.append("Inspect the Google-selected canonical URL")
        recommended_checks.append("Check for duplicate or near-duplicate content")
        recommended_checks.append("Verify canonical tag in page source")

    elif is_indexed:
        if has_gsc_data and gsc_impressions > 0:
            if gsc_clicks == 0 and gsc_impressions < 20:
                outcome = INDEXED_LOW_EVIDENCE
                interpretations.append(
                    "URL is indexed and has some impressions but no clicks. "
                    "Search visibility evidence is limited."
                )
                hypotheses.append(
                    "Low visibility may indicate weak ranking positions, low search demand "
                    "for matched queries, or insufficient data accumulation period."
                )
            elif gsc_clicks == 0 and gsc_impressions >= 20:
                outcome = INDEXED_LOW_EVIDENCE
                interpretations.append(
                    "URL is indexed with measurable impressions but zero clicks. "
                    "Current evidence suggests the page appears in results but fails to attract clicks."
                )
                recommended_checks.append("Review title tag and meta description for CTR optimization")
                recommended_checks.append("Check SERP presentation (position, rich results)")
            else:
                outcome = INDEXED_LOW_EVIDENCE if gsc_clicks < 5 else INDEXED_VISIBILITY_UNKNOWN
                if gsc_clicks < 5:
                    interpretations.append(
                        f"URL is indexed with {gsc_clicks} clicks and {gsc_impressions} impressions. "
                        f"Volume is low — conclusions about ranking performance are provisional."
                    )
                else:
                    interpretations.append(
                        f"URL is indexed with {gsc_clicks} clicks and {gsc_impressions} impressions. "
                        f"Visibility exists but full ranking assessment requires deeper query analysis."
                    )
        elif has_gsc_data and gsc_impressions == 0:
            outcome = INDEXED_LOW_EVIDENCE
            interpretations.append(
                "URL is indexed per inspection but has zero impressions in GSC data window. "
                "This may indicate the page is indexed but not matching any tracked queries."
            )
            hypotheses.append(
                "Possible explanations: page targets queries not in GSC sample, "
                "page was recently indexed and data not yet accumulated, "
                "or page ranks too low to generate impressions."
            )
            recommended_checks.append("Check if page targets queries with search demand")
            recommended_checks.append("Wait for data accumulation if page is recently published")
        else:
            outcome = INDEXED_VISIBILITY_UNKNOWN
            interpretations.append(
                "URL is indexed per inspection but no GSC page-level data is available. "
                "Visibility assessment is not possible without supporting data."
            )
            excluded_context.append("GSC query/page data not available for visibility assessment")

    else:
        # No clear indexed/not-indexed signal
        outcome = INSUFFICIENT_EVIDENCE
        interpretations.append(
            "Inspection did not return a clear indexing state. "
            "Evidence is insufficient to classify this URL."
        )
        recommended_checks.append("Re-run URL Inspection to confirm state")
        recommended_checks.append("Check if the URL is accessible and returns HTTP 200")

    # Standard excluded context
    if not has_gsc_data:
        excluded_context.append("No GSC page/query data available for this URL")
    if not inventory_entry:
        excluded_context.append("URL not found in page inventory — cannot verify internal page status")

    return {
        "url": url,
        "outcome": outcome,
        "observations": observations,
        "interpretations": interpretations,
        "hypotheses": hypotheses,
        "recommended_next_checks": recommended_checks,
        "excluded_context": excluded_context,
    }


# ---------------------------------------------------------------------------
# Report generation
# ---------------------------------------------------------------------------

def build_markdown_report(
    diagnoses: list[dict],
    meta: dict,
    artifact_provenance: dict,
) -> str:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    lines = [
        "# Indexation Debug Report",
        "",
        f"**Generated:** {now}",
        f"**Report mode:** preliminary",
        f"**Workflow:** indexation_debug_v1",
        f"**Contract:** contracts/indexation_diagnosis_rules_v1.md",
        "",
        "---",
        "",
        "## Sources used",
        "",
        "| Source | Path | Status |",
        "|--------|------|--------|",
    ]
    for src_name, src_info in artifact_provenance.items():
        lines.append(f"| {src_name} | {src_info['path']} | {src_info['status']} |")

    # Summary
    from collections import Counter
    outcome_counts = Counter(d["outcome"] for d in diagnoses)
    lines += [
        "",
        "## Summary",
        "",
        f"**URLs analyzed:** {len(diagnoses)}",
        "",
        "| Outcome | Count |",
        "|---------|-------|",
    ]
    for bucket in [NOT_INDEXED_CONFIRMED, INDEXED_VISIBILITY_UNKNOWN,
                   INDEXED_LOW_EVIDENCE, CANONICAL_MISMATCH, INSUFFICIENT_EVIDENCE]:
        count = outcome_counts.get(bucket, 0)
        if count > 0:
            lines.append(f"| {bucket} | {count} |")

    # Per-URL details
    lines += ["", "---", "", "## Per-URL diagnosis", ""]
    for d in diagnoses:
        lines.append(f"### {d['url']}")
        lines.append(f"**Outcome:** `{d['outcome']}`")
        lines.append("")

        if d["observations"]:
            lines.append("**Observations:**")
            for obs in d["observations"]:
                lines.append(f"- {obs}")
            lines.append("")

        if d["interpretations"]:
            lines.append("**Interpretations:**")
            for interp in d["interpretations"]:
                lines.append(f"- {interp}")
            lines.append("")

        if d["hypotheses"]:
            lines.append("**Hypotheses (require verification):**")
            for hyp in d["hypotheses"]:
                lines.append(f"- {hyp}")
            lines.append("")

        if d["recommended_next_checks"]:
            lines.append("**Recommended next checks:**")
            for check in d["recommended_next_checks"]:
                lines.append(f"- {check}")
            lines.append("")

        if d["excluded_context"]:
            lines.append("**Excluded context:**")
            for exc in d["excluded_context"]:
                lines.append(f"- {exc}")
            lines.append("")

        lines.append("---")
        lines.append("")

    # Provenance footer
    lines += [
        "## Provenance",
        "",
        f"- **Generated:** {now}",
        "- **Report mode:** preliminary",
        f"- **Generator:** run_indexation_debug_v1.py",
        f"- **Contract:** contracts/indexation_diagnosis_rules_v1.md",
        f"- **Primary truth:** URL Inspection API response",
        f"- **Supporting data:** GSC query/page snapshots (if available)",
        "- **Known limitations:**",
        "  - Inspection data is point-in-time, not historical",
        "  - GSC data may not cover all queries matched to a page",
        "  - Cause attribution is conservative — hypotheses require separate verification",
    ]

    return "\n".join(lines) + "\n"


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(description="Indexation diagnostics analyzer")
    parser.add_argument("--input", type=str, default=None,
                        help="Path to normalized url inspection artifact")
    parser.add_argument("--label", type=str, default=None,
                        help="Label for output naming")
    parser.add_argument("--prefer-window", type=int, default=28, choices=[28, 90],
                        help="Preferred GSC data window (default: 28)")
    args = parser.parse_args()

    # Find inspection artifact
    if args.input:
        inspection_path = Path(args.input)
    else:
        inspection_path = find_latest_inspection_artifact()

    if not inspection_path or not inspection_path.is_file():
        print(
            "ERROR: No normalized URL Inspection artifact found. "
            "Run build_url_inspection_snapshot.py first, or provide --input.",
            file=sys.stderr,
        )
        sys.exit(1)

    print(f"Indexation debug v1")
    print(f"  Inspection artifact: {inspection_path.name}")
    print(f"  Preferred GSC window: {args.prefer_window}d")
    print()

    # Load inspection data
    inspection_data = _load_json(inspection_path)
    if not inspection_data or "inspections" not in inspection_data:
        print("ERROR: Invalid inspection artifact format.", file=sys.stderr)
        sys.exit(1)

    inspections = inspection_data["inspections"]

    # Load supporting data
    window = args.prefer_window
    fallback_window = 90 if window == 28 else 28

    gsc_pages = load_gsc_page_aggregates(window)
    gsc_rows = load_gsc_row_level(window)
    used_window = window

    if not gsc_pages and fallback_window:
        gsc_pages = load_gsc_page_aggregates(fallback_window)
        gsc_rows = load_gsc_row_level(fallback_window)
        used_window = fallback_window if gsc_pages else None

    page_inventory = load_page_inventory()

    # Build lookup indices
    gsc_page_index: dict[str, dict] = {}
    for row in gsc_pages:
        page_url = row.get("page", "")
        if page_url:
            gsc_page_index[page_url.rstrip("/")] = row

    gsc_query_index: dict[str, list[dict]] = {}
    for row in gsc_rows:
        page_url = row.get("page", "")
        if page_url:
            key = page_url.rstrip("/")
            if key not in gsc_query_index:
                gsc_query_index[key] = []
            gsc_query_index[key].append(row)

    inventory_index: dict[str, dict] = {}
    for entry in page_inventory:
        route = entry.get("route_path", "")
        if route:
            inventory_index[route.rstrip("/")] = entry

    # Artifact provenance
    artifact_provenance = {
        "url_inspection": {
            "path": str(inspection_path.relative_to(SEO_OPS_ROOT)) if inspection_path.is_relative_to(SEO_OPS_ROOT) else str(inspection_path),
            "status": f"loaded, {len(inspections)} URLs",
        },
    }
    if gsc_pages:
        artifact_provenance["gsc_page_aggregates"] = {
            "path": f"snapshots/normalized/seo/gsc_query_page_aggregated_pages_last{used_window}d.csv",
            "status": f"loaded, {len(gsc_pages)} pages",
        }
    else:
        artifact_provenance["gsc_page_aggregates"] = {
            "path": f"snapshots/normalized/seo/gsc_query_page_aggregated_pages_last{window}d.csv",
            "status": "not found — running in limited mode",
        }
    if gsc_rows:
        artifact_provenance["gsc_row_level"] = {
            "path": f"snapshots/normalized/seo/gsc_query_page_last{used_window}d.csv",
            "status": f"loaded, {len(gsc_rows)} rows",
        }
    if page_inventory:
        artifact_provenance["page_inventory"] = {
            "path": "snapshots/normalized/pages/page_inventory_v1.csv",
            "status": f"loaded, {len(page_inventory)} pages",
        }
    else:
        artifact_provenance["page_inventory"] = {
            "path": "snapshots/normalized/pages/page_inventory_v1.csv",
            "status": "not found — limited mode",
        }

    print(f"  Supporting data:")
    for name, info in artifact_provenance.items():
        print(f"    {name}: {info['status']}")
    print()

    # Run classification
    diagnoses: list[dict] = []
    for insp in inspections:
        url = insp.get("inspection_url", "")
        url_key = url.rstrip("/")

        # Match to GSC data (try with and without trailing slash, and full URL)
        gsc_page = gsc_page_index.get(url_key)
        gsc_queries = gsc_query_index.get(url_key, [])

        # Match to inventory (extract route from URL)
        inv_entry = None
        from urllib.parse import urlparse
        parsed = urlparse(url)
        route = parsed.path.rstrip("/")
        inv_entry = inventory_index.get(route)
        if not inv_entry and not route.endswith("/"):
            inv_entry = inventory_index.get(route + "/")

        diagnosis = classify_url(insp, gsc_page, gsc_queries, inv_entry)
        diagnoses.append(diagnosis)

        print(f"  {url} → {diagnosis['outcome']}")

    # Output paths
    label_part = f"_{args.label}" if args.label else ""
    date_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    output_json_path = OUTPUT_DIR / "indexation_debug_v1.json"
    report_md_path = REPORT_DIR / f"indexation_debug{label_part}_{date_str}.md"

    # Write JSON output
    json_output = {
        "_meta": {
            "generator": "run_indexation_debug_v1.py",
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "version": "1.0",
            "contract": "contracts/indexation_diagnosis_rules_v1.md",
            "inspection_artifact": str(inspection_path.name),
            "gsc_window_used": used_window,
            "urls_analyzed": len(diagnoses),
            "limited_mode": not bool(gsc_pages),
        },
        "artifact_provenance": artifact_provenance,
        "summary": {
            "total_urls": len(diagnoses),
            "by_outcome": {
                bucket: sum(1 for d in diagnoses if d["outcome"] == bucket)
                for bucket in [NOT_INDEXED_CONFIRMED, INDEXED_VISIBILITY_UNKNOWN,
                               INDEXED_LOW_EVIDENCE, CANONICAL_MISMATCH, INSUFFICIENT_EVIDENCE]
            },
        },
        "diagnoses": diagnoses,
    }

    output_json_path.parent.mkdir(parents=True, exist_ok=True)
    output_json_path.write_text(
        json.dumps(json_output, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    print(f"\n  JSON output → {output_json_path}")

    # Write markdown report
    report_md = build_markdown_report(diagnoses, json_output["_meta"], artifact_provenance)
    report_md_path.parent.mkdir(parents=True, exist_ok=True)
    report_md_path.write_text(report_md, encoding="utf-8")
    print(f"  Report → {report_md_path}")

    print("\n  Done.")


if __name__ == "__main__":
    main()

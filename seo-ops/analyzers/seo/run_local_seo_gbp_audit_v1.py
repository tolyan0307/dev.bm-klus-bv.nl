"""
run_local_seo_gbp_audit_v1.py — Local SEO / GBP audit analyzer.

Produces a structured local SEO / GBP audit by combining:
  - GBP performance data (when available)
  - GBP reviews data (when available)
  - Supporting site/GSC context (optional)

Runs in limited mode when GBP data is absent, clearly disclosing
what evidence is missing and what cannot be concluded.

READ-ONLY: does not modify GBP profile, site pages, or any config.

Usage:
  python seo-ops/analyzers/seo/run_local_seo_gbp_audit_v1.py --scope combined
  python seo-ops/analyzers/seo/run_local_seo_gbp_audit_v1.py --scope profile
  python seo-ops/analyzers/seo/run_local_seo_gbp_audit_v1.py --scope reviews
  python seo-ops/analyzers/seo/run_local_seo_gbp_audit_v1.py --scope combined --label weekly_check
  python seo-ops/analyzers/seo/run_local_seo_gbp_audit_v1.py --scope combined --prefer-window 90
"""

from __future__ import annotations

import argparse
import csv
import io
import json
import sys
from collections import Counter
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

OUTPUT_DIR = SEO_OPS_ROOT / "outputs"
REPORT_DIR = SEO_OPS_ROOT / "reports" / "seo"
CONFIG_DIR = SEO_OPS_ROOT / "config"
NORM_SEO_DIR = SEO_OPS_ROOT / "snapshots" / "normalized" / "seo"
NORM_PAGES_DIR = SEO_OPS_ROOT / "snapshots" / "normalized" / "pages"

# Add integrations to path for loader imports
sys.path.insert(0, str(SEO_OPS_ROOT / "integrations"))

# ---------------------------------------------------------------------------
# Outcome buckets
# ---------------------------------------------------------------------------
GBP_SIGNAL_ADEQUATE = "gbp_signal_adequate"
GBP_SIGNAL_LIMITED = "gbp_signal_limited"
REVIEW_SIGNAL_LIMITED = "review_signal_limited"
LOCAL_CONTEXT_MISMATCH = "local_context_mismatch"
INSUFFICIENT_GBP_EVIDENCE = "insufficient_gbp_evidence"


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

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


def _load_yaml(path: Path) -> dict | None:
    """Load YAML config. Returns None if file missing or cannot be parsed.

    Fails loudly when PyYAML is missing rather than returning a truthy
    marker dict — otherwise callers silently proceed with empty config,
    producing zero-match supporting context while reporting "loaded".
    """
    if not path.is_file():
        return None
    try:
        import yaml
    except ImportError as e:
        raise ImportError(
            "PyYAML is required for local_seo_gbp_audit_v1 to parse "
            f"{path.name}. Install with: pip install pyyaml"
        ) from e
    try:
        return yaml.safe_load(path.read_text(encoding="utf-8"))
    except Exception:
        return None


def _load_csv(path: Path) -> list[dict]:
    if not path.is_file():
        return []
    with open(path, encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


# ---------------------------------------------------------------------------
# GBP loaders (with graceful import failure)
# ---------------------------------------------------------------------------

def _try_load_gbp_performance(days: int = 28) -> dict:
    """Attempt to load GBP performance data via loader."""
    try:
        from gbp.performance_loader import load_gbp_performance
        return load_gbp_performance(days=days)
    except ImportError:
        return {
            "status": "error",
            "error": "GBP performance loader not importable. Check integrations/gbp/ path.",
            "error_type": "import_error",
            "data": None,
        }
    except Exception as e:
        return {
            "status": "error",
            "error": f"GBP performance loader failed: {e}",
            "error_type": "runtime_error",
            "data": None,
        }


def _try_load_gbp_reviews() -> dict:
    """Attempt to load GBP reviews data via loader."""
    try:
        from gbp.reviews_loader import load_gbp_reviews
        return load_gbp_reviews()
    except ImportError:
        return {
            "status": "error",
            "error": "GBP reviews loader not importable. Check integrations/gbp/ path.",
            "error_type": "import_error",
            "data": None,
        }
    except Exception as e:
        return {
            "status": "error",
            "error": f"GBP reviews loader failed: {e}",
            "error_type": "runtime_error",
            "data": None,
        }


# ---------------------------------------------------------------------------
# Supporting data loaders
# ---------------------------------------------------------------------------

def load_local_entities() -> dict | None:
    path = CONFIG_DIR / "locales" / "local_entities_v1.yaml"
    return _load_yaml(path)


def load_gsc_queries(window: int) -> list[dict]:
    path = NORM_SEO_DIR / f"gsc_query_page_aggregated_queries_last{window}d.csv"
    return _load_csv(path)


def load_gsc_pages(window: int) -> list[dict]:
    path = NORM_SEO_DIR / f"gsc_query_page_aggregated_pages_last{window}d.csv"
    return _load_csv(path)


def load_page_inventory() -> list[dict]:
    path = NORM_PAGES_DIR / "page_inventory_v1.csv"
    return _load_csv(path)


# ---------------------------------------------------------------------------
# Local intent analysis (supporting context)
# ---------------------------------------------------------------------------

def find_local_queries(queries: list[dict], entities: dict | None) -> list[dict]:
    """Find queries with local intent signals from GSC data."""
    if not queries or not entities:
        return []

    # Build signal sets from config
    geo_terms = set()
    if entities:
        for term in entities.get("core_location_terms", []):
            geo_terms.add(term.lower())
        signals = entities.get("local_intent_signals", {})
        for mod in signals.get("geo_modifiers", []):
            if "{city}" not in mod:
                geo_terms.add(mod.lower())

    local_results = []
    for row in queries:
        query = row.get("query", "").lower()
        clicks = _safe_int(row.get("total_clicks", row.get("clicks", 0)))
        impressions = _safe_int(row.get("total_impressions", row.get("impressions", 0)))

        is_local = False
        matched_signal = ""
        for term in geo_terms:
            if term in query:
                is_local = True
                matched_signal = term
                break

        if is_local:
            local_results.append({
                "query": row.get("query", query),
                "clicks": clicks,
                "impressions": impressions,
                "matched_signal": matched_signal,
            })

    # Sort by impressions descending
    local_results.sort(key=lambda x: x["impressions"], reverse=True)
    return local_results


def assess_location_page_coverage(inventory: list[dict], entities: dict | None) -> dict:
    """Assess how well page inventory covers target locations."""
    if not inventory or not entities:
        return {"covered": 0, "total": 0, "coverage_ratio": 0.0, "pages": []}

    target_terms = set()
    for term in entities.get("core_location_terms", []):
        target_terms.add(term.lower())

    location_pages = []
    covered_terms = set()
    for page in inventory:
        route = page.get("route_path", "").lower()
        title = (page.get("title_guess") or page.get("title") or "").lower()
        for term in target_terms:
            if term in route or term in title:
                covered_terms.add(term)
                location_pages.append({
                    "route": page.get("route_path", ""),
                    "matched_term": term,
                })

    return {
        "covered": len(covered_terms),
        "total": len(target_terms),
        "coverage_ratio": len(covered_terms) / max(len(target_terms), 1),
        "pages": location_pages[:20],  # cap for output size
    }


# ---------------------------------------------------------------------------
# Diagnosis
# ---------------------------------------------------------------------------

def diagnose_profile(gbp_perf: dict, entities: dict | None) -> dict:
    """Diagnose GBP profile/performance signals."""
    observations = []
    interpretations = []
    hypotheses = []
    recommended_actions = []
    excluded_context = []

    if gbp_perf["status"] != "success":
        # Limited mode
        observations.append(
            f"GBP performance data not available: {gbp_perf.get('error', 'unknown error')}"
        )
        interpretations.append(
            "Without GBP performance data, profile visibility assessment is not possible. "
            "This audit is running in limited mode for the profile scope."
        )
        recommended_actions.append(
            "Configure GBP API access (set GBP_ACCOUNT_ID and GBP_LOCATION_ID in integrations/.env.local) "
            "to enable full profile audit."
        )
        excluded_context.append("GBP performance metrics (impressions, actions, searches)")
        return {
            "outcome": INSUFFICIENT_GBP_EVIDENCE,
            "observations": observations,
            "interpretations": interpretations,
            "hypotheses": hypotheses,
            "recommended_actions": recommended_actions,
            "excluded_context": excluded_context,
        }

    # GBP data available
    data = gbp_perf["data"]
    raw = data.get("raw_response", {})

    # Extract aggregate metrics if available
    total_impressions = 0
    total_actions = 0
    metrics_found = []

    # Response key is singular `multiDailyMetricTimeSeries`; each container
    # holds a `dailyMetricTimeSeries` list with one entry per requested metric.
    # Days without activity return `{"date": {...}}` without a `value` field —
    # treated as 0 for the running total (reporting lag on last 2–3 days).
    containers = raw.get("multiDailyMetricTimeSeries", [])
    for container in containers:
        for series in container.get("dailyMetricTimeSeries", []):
            metric_name = series.get("dailyMetric", "UNKNOWN")
            data_points = series.get("timeSeries", {}).get("datedValues", [])
            metric_total = sum(
                _safe_int(dp.get("value", 0)) for dp in data_points if "value" in dp
            )

            if "IMPRESSIONS" in metric_name:
                total_impressions += metric_total
            elif metric_name in ("CALL_CLICKS", "WEBSITE_CLICKS", "BUSINESS_DIRECTION_REQUESTS"):
                total_actions += metric_total

            metrics_found.append(f"{metric_name}: {metric_total}")

    observations.append(
        f"GBP data loaded for period: {data.get('start_date')} → {data.get('end_date')} "
        f"({data.get('period_days', '?')}d)"
    )
    for mf in metrics_found:
        observations.append(f"  {mf}")

    # Classify
    if total_impressions > 100 and total_actions > 5:
        outcome = GBP_SIGNAL_ADEQUATE
        interpretations.append(
            f"GBP profile shows measurable activity: {total_impressions} impressions "
            f"and {total_actions} user actions in the reporting period."
        )
    elif total_impressions > 0:
        outcome = GBP_SIGNAL_LIMITED
        interpretations.append(
            f"GBP profile has some impressions ({total_impressions}) but limited user actions "
            f"({total_actions}). Visibility signal is present but weak."
        )
        hypotheses.append(
            "Low action count relative to impressions may indicate: incomplete profile, "
            "weak call-to-action elements, or low search intent for action-oriented queries."
        )
        recommended_actions.append("Review GBP profile completeness: photos, description, categories, hours")
    else:
        outcome = GBP_SIGNAL_LIMITED
        interpretations.append(
            "GBP data shows zero or near-zero impressions. "
            "Profile may be new, unclaimed, or not visible in search."
        )
        recommended_actions.append("Verify GBP profile is claimed, verified, and published")

    return {
        "outcome": outcome,
        "observations": observations,
        "interpretations": interpretations,
        "hypotheses": hypotheses,
        "recommended_actions": recommended_actions,
        "excluded_context": excluded_context,
    }


def diagnose_reviews(gbp_reviews: dict) -> dict:
    """Diagnose GBP review/reputation signals."""
    observations = []
    interpretations = []
    hypotheses = []
    recommended_actions = []
    excluded_context = []

    if gbp_reviews["status"] != "success":
        observations.append(
            f"GBP reviews data not available: {gbp_reviews.get('error', 'unknown error')}"
        )
        interpretations.append(
            "Without GBP reviews data, review/reputation assessment is not possible. "
            "This audit is running in limited mode for the reviews scope."
        )
        recommended_actions.append(
            "Configure GBP API access to enable review audit."
        )
        excluded_context.append("GBP review count, average rating, recent reviews")
        return {
            "outcome": INSUFFICIENT_GBP_EVIDENCE,
            "observations": observations,
            "interpretations": interpretations,
            "hypotheses": hypotheses,
            "recommended_actions": recommended_actions,
            "excluded_context": excluded_context,
        }

    data = gbp_reviews["data"]
    total_count = _safe_int(data.get("total_review_count", 0))
    avg_rating = _safe_float(data.get("average_rating", 0))
    recent = data.get("recent_reviews", [])

    observations.append(f"Total reviews: {total_count}")
    observations.append(f"Average rating: {avg_rating:.1f}")
    observations.append(f"Recent reviews fetched: {len(recent)}")

    if total_count == 0:
        outcome = REVIEW_SIGNAL_LIMITED
        interpretations.append(
            "No reviews found. Review signal is absent. "
            "This limits social proof for potential customers finding the business via local search."
        )
        recommended_actions.append("Develop a review solicitation strategy for satisfied customers")
    elif total_count < 10:
        outcome = REVIEW_SIGNAL_LIMITED
        interpretations.append(
            f"Review count ({total_count}) is low. Average rating ({avg_rating:.1f}) "
            f"provides a baseline signal but low volume limits confidence in the rating."
        )
        recommended_actions.append("Continue building review volume through satisfied customer outreach")
    else:
        if avg_rating >= 4.0:
            outcome = GBP_SIGNAL_ADEQUATE
            interpretations.append(
                f"Review signal is adequate: {total_count} reviews with {avg_rating:.1f} average. "
                f"This provides reasonable social proof for a local service business."
            )
        else:
            outcome = GBP_SIGNAL_LIMITED
            interpretations.append(
                f"Review count ({total_count}) is reasonable but average rating ({avg_rating:.1f}) "
                f"is below 4.0. This may affect perceived trustworthiness in local search results."
            )
            recommended_actions.append("Review recent negative feedback for actionable service improvements")

    return {
        "outcome": outcome,
        "observations": observations,
        "interpretations": interpretations,
        "hypotheses": hypotheses,
        "recommended_actions": recommended_actions,
        "excluded_context": excluded_context,
    }


# ---------------------------------------------------------------------------
# Report generation
# ---------------------------------------------------------------------------

def build_markdown_report(
    scope: str,
    profile_diagnosis: dict | None,
    reviews_diagnosis: dict | None,
    local_queries: list[dict],
    location_coverage: dict,
    entities: dict | None,
    artifact_provenance: dict,
    limited_mode: bool,
) -> str:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    entity_name = "BM Klus BV"
    if entities and isinstance(entities, dict):
        pbe = entities.get("primary_business_entity", {})
        if isinstance(pbe, dict):
            entity_name = pbe.get("brand_name", entity_name)

    lines = [
        "# Local SEO / GBP Audit Report",
        "",
        f"**Generated:** {now}",
        f"**Report mode:** preliminary",
        f"**Workflow:** local_seo_gbp_audit_v1",
        f"**Contract:** contracts/local_seo_gbp_rules_v1.md",
        f"**Scope:** {scope}",
        f"**Business entity:** {entity_name}",
    ]

    if limited_mode:
        lines += [
            "",
            "> **Limited mode:** GBP data is not available. This audit is based on "
            "site/search context only. GBP-specific conclusions cannot be drawn.",
        ]

    lines += ["", "---", ""]

    # Section 1: Sources used
    lines += [
        "## 1. Sources used",
        "",
        "| Source | Path | Status | Source class |",
        "|--------|------|--------|-------------|",
    ]
    for src_name, src_info in artifact_provenance.items():
        lines.append(
            f"| {src_name} | {src_info['path']} | {src_info['status']} | {src_info.get('source_class', 'internal_artifact')} |"
        )

    # Section 2: GBP evidence summary
    if scope in ("profile", "combined") and profile_diagnosis:
        lines += [
            "", "## 2. GBP profile evidence", "",
            f"**Outcome:** `{profile_diagnosis['outcome']}`", "",
        ]
        if profile_diagnosis["observations"]:
            lines.append("**Observations:**")
            for obs in profile_diagnosis["observations"]:
                lines.append(f"- {obs}")
            lines.append("")
        if profile_diagnosis["interpretations"]:
            lines.append("**Interpretations:**")
            for interp in profile_diagnosis["interpretations"]:
                lines.append(f"- {interp}")
            lines.append("")
        if profile_diagnosis["hypotheses"]:
            lines.append("**Hypotheses (require verification):**")
            for hyp in profile_diagnosis["hypotheses"]:
                lines.append(f"- {hyp}")
            lines.append("")

    # Section 3: Review/reputation signals
    if scope in ("reviews", "combined") and reviews_diagnosis:
        lines += [
            "", "## 3. Review / reputation signals", "",
            f"**Outcome:** `{reviews_diagnosis['outcome']}`", "",
        ]
        if reviews_diagnosis["observations"]:
            lines.append("**Observations:**")
            for obs in reviews_diagnosis["observations"]:
                lines.append(f"- {obs}")
            lines.append("")
        if reviews_diagnosis["interpretations"]:
            lines.append("**Interpretations:**")
            for interp in reviews_diagnosis["interpretations"]:
                lines.append(f"- {interp}")
            lines.append("")

    # Section 4: Supporting site/search context
    lines += ["", "## 4. Supporting site/search context", ""]

    if local_queries:
        lines.append(f"**Local intent queries found:** {len(local_queries)}")
        lines.append("")
        lines.append("| Query | Impressions | Clicks | Local signal |")
        lines.append("|-------|-------------|--------|-------------|")
        for q in local_queries[:15]:
            lines.append(
                f"| {q['query']} | {q['impressions']} | {q['clicks']} | {q['matched_signal']} |"
            )
        lines.append("")
    else:
        lines.append("No local intent queries found in GSC data (or GSC data not available).")
        lines.append("")

    if location_coverage.get("total", 0) > 0:
        lines.append(
            f"**Location page coverage:** {location_coverage['covered']}/{location_coverage['total']} "
            f"target locations covered ({location_coverage['coverage_ratio']:.0%})"
        )
        lines.append("")
    else:
        lines.append("Location page coverage: not assessed (page inventory or entity config not available).")
        lines.append("")

    # Section 5: Interpretation boundaries
    lines += ["", "## 5. Interpretation boundaries", ""]
    if limited_mode:
        lines.append(
            "- This audit runs in limited mode: GBP data is not available. "
            "All findings are based on site/search context only."
        )
        lines.append(
            "- Local pack presence, GBP visibility, and review signals cannot be assessed."
        )
    else:
        lines.append(
            "- GBP performance metrics measure visibility, not business quality or lead quality."
        )
        lines.append(
            "- Review ratings are social proof signals, not causal proof of service quality."
        )
    lines.append(
        "- Local query presence in GSC does not confirm local pack ranking."
    )
    lines.append(
        "- Site-side local SEO signals (pages, queries) and GBP signals should be interpreted separately."
    )
    lines.append("")

    # Section 6: Recommended manual actions
    lines += ["", "## 6. Recommended manual actions", ""]
    all_actions = []
    if profile_diagnosis:
        all_actions.extend(profile_diagnosis.get("recommended_actions", []))
    if reviews_diagnosis:
        all_actions.extend(reviews_diagnosis.get("recommended_actions", []))
    if not all_actions:
        all_actions.append("No specific actions identified based on available evidence.")
    for action in all_actions:
        lines.append(f"- {action}")
    lines.append("")

    # Section 7: Excluded context
    lines += ["", "## 7. Excluded context", ""]
    excluded = []
    if profile_diagnosis:
        excluded.extend(profile_diagnosis.get("excluded_context", []))
    if reviews_diagnosis:
        excluded.extend(reviews_diagnosis.get("excluded_context", []))
    excluded.append("Competitor GBP data (not available)")
    excluded.append("Local pack ranking positions (not available via GBP API)")
    excluded.append("NAP consistency across directories (not checked)")
    for exc in excluded:
        lines.append(f"- {exc}")
    lines.append("")

    # Provenance footer
    lines += [
        "---", "",
        "## Provenance", "",
        f"- **Generated:** {now}",
        "- **Report mode:** preliminary",
        "- **Generator:** run_local_seo_gbp_audit_v1.py",
        "- **Contract:** contracts/local_seo_gbp_rules_v1.md",
        "- **Primary truth:** GBP Performance API + GBP Reviews API (when available)",
        "- **Supporting data:** GSC query/page snapshots, page inventory (optional)",
        "- **Known limitations:**",
        "  - GBP API access may not be configured — runs in limited mode without it",
        "  - No local pack ranking data available",
        "  - No competitor GBP data available",
        "  - Review analysis is quantitative only (no sentiment modeling)",
    ]

    return "\n".join(lines) + "\n"


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Local SEO / GBP audit analyzer (v1)",
    )
    parser.add_argument(
        "--scope",
        type=str,
        choices=["profile", "reviews", "combined"],
        default="combined",
        help="Audit scope: profile, reviews, or combined (default: combined)",
    )
    parser.add_argument(
        "--prefer-window",
        type=int,
        default=28,
        choices=[28, 90],
        help="Preferred GSC data window for supporting context (default: 28)",
    )
    parser.add_argument(
        "--label",
        type=str,
        default=None,
        help="Optional label for output file naming",
    )
    parser.add_argument(
        "--output-json",
        type=str,
        default=None,
        help="Override JSON output path",
    )
    parser.add_argument(
        "--output-report",
        type=str,
        default=None,
        help="Override markdown report path",
    )
    args = parser.parse_args()

    print("Local SEO / GBP Audit v1")
    print(f"  Scope: {args.scope}")
    print(f"  GSC window: {args.prefer_window}d")
    print()

    # ── Load local entities config ──
    entities = load_local_entities()
    if entities:
        print("  Local entities config: loaded")
    else:
        print("  Local entities config: NOT FOUND — limited local context")

    # ── Load GBP data ──
    profile_diagnosis = None
    reviews_diagnosis = None
    limited_mode = True

    if args.scope in ("profile", "combined"):
        print("  Loading GBP performance data...")
        gbp_perf = _try_load_gbp_performance(days=args.prefer_window)
        profile_diagnosis = diagnose_profile(gbp_perf, entities)
        print(f"  Profile outcome: {profile_diagnosis['outcome']}")
        if gbp_perf["status"] == "success":
            limited_mode = False

    if args.scope in ("reviews", "combined"):
        print("  Loading GBP reviews data...")
        gbp_reviews = _try_load_gbp_reviews()
        reviews_diagnosis = diagnose_reviews(gbp_reviews)
        print(f"  Reviews outcome: {reviews_diagnosis['outcome']}")
        if gbp_reviews["status"] == "success":
            limited_mode = False

    # ── Load supporting context ──
    window = args.prefer_window
    fallback_window = 90 if window == 28 else 28

    gsc_queries = load_gsc_queries(window)
    used_window = window
    if not gsc_queries:
        gsc_queries = load_gsc_queries(fallback_window)
        used_window = fallback_window if gsc_queries else None

    page_inventory = load_page_inventory()

    print(f"  GSC queries: {len(gsc_queries)} rows (window: {used_window or 'none'}d)")
    print(f"  Page inventory: {len(page_inventory)} pages")

    # ── Analyze supporting context ──
    local_queries = find_local_queries(gsc_queries, entities)
    location_coverage = assess_location_page_coverage(page_inventory, entities)

    print(f"  Local intent queries: {len(local_queries)}")
    print(f"  Location coverage: {location_coverage['covered']}/{location_coverage['total']}")
    print()

    # ── Build artifact provenance ──
    artifact_provenance = {}

    if entities:
        artifact_provenance["local_entities"] = {
            "path": "config/locales/local_entities_v1.yaml",
            "status": "loaded",
            "source_class": "internal_config",
        }

    if profile_diagnosis:
        gbp_status = "loaded" if profile_diagnosis["outcome"] != INSUFFICIENT_GBP_EVIDENCE else "not available — limited mode"
        artifact_provenance["gbp_performance"] = {
            "path": "GBP Performance API",
            "status": gbp_status,
            "source_class": "gbp_api",
        }

    if reviews_diagnosis:
        rev_status = "loaded" if reviews_diagnosis["outcome"] != INSUFFICIENT_GBP_EVIDENCE else "not available — limited mode"
        artifact_provenance["gbp_reviews"] = {
            "path": "GBP Reviews API",
            "status": rev_status,
            "source_class": "gbp_api",
        }

    if gsc_queries:
        artifact_provenance["gsc_queries"] = {
            "path": f"snapshots/normalized/seo/gsc_query_page_aggregated_queries_last{used_window}d.csv",
            "status": f"loaded, {len(gsc_queries)} rows",
            "source_class": "internal_artifact",
        }
    else:
        artifact_provenance["gsc_queries"] = {
            "path": f"snapshots/normalized/seo/gsc_query_page_aggregated_queries_last{window}d.csv",
            "status": "not found",
            "source_class": "internal_artifact",
        }

    if page_inventory:
        artifact_provenance["page_inventory"] = {
            "path": "snapshots/normalized/pages/page_inventory_v1.csv",
            "status": f"loaded, {len(page_inventory)} pages",
            "source_class": "internal_artifact",
        }

    # ── Determine overall outcome ──
    outcomes = []
    if profile_diagnosis:
        outcomes.append(profile_diagnosis["outcome"])
    if reviews_diagnosis:
        outcomes.append(reviews_diagnosis["outcome"])

    # ── Output paths ──
    label_part = f"_{args.label}" if args.label else f"_{args.scope}"
    date_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    output_json_path = Path(args.output_json) if args.output_json else OUTPUT_DIR / "local_seo_gbp_audit_v1.json"
    report_md_path = Path(args.output_report) if args.output_report else REPORT_DIR / f"local_seo_gbp_audit_v1{label_part}_{date_str}.md"

    # ── Write JSON output ──
    json_output = {
        "_meta": {
            "generator": "run_local_seo_gbp_audit_v1.py",
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "version": "1.0",
            "contract": "contracts/local_seo_gbp_rules_v1.md",
            "scope": args.scope,
            "gsc_window_used": used_window,
            "limited_mode": limited_mode,
        },
        "artifact_provenance": artifact_provenance,
        "outcomes": outcomes,
        "profile_diagnosis": profile_diagnosis,
        "reviews_diagnosis": reviews_diagnosis,
        "supporting_context": {
            "local_queries_count": len(local_queries),
            "local_queries_top10": local_queries[:10],
            "location_coverage": location_coverage,
        },
    }

    output_json_path.parent.mkdir(parents=True, exist_ok=True)
    output_json_path.write_text(
        json.dumps(json_output, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    print(f"  JSON output → {output_json_path}")

    # ── Write markdown report ──
    report_md = build_markdown_report(
        scope=args.scope,
        profile_diagnosis=profile_diagnosis,
        reviews_diagnosis=reviews_diagnosis,
        local_queries=local_queries,
        location_coverage=location_coverage,
        entities=entities,
        artifact_provenance=artifact_provenance,
        limited_mode=limited_mode,
    )
    report_md_path.parent.mkdir(parents=True, exist_ok=True)
    report_md_path.write_text(report_md, encoding="utf-8")
    print(f"  Report → {report_md_path}")

    print("\n  Done.")


if __name__ == "__main__":
    main()

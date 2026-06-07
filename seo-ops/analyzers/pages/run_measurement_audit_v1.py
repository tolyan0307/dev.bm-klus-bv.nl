"""
run_measurement_audit_v1.py — Measurement integrity audit.

Reads existing GA4/GSC artifacts and checks measurement quality,
completeness, and reliability per page or site-wide. Produces
a structured JSON output and a concise markdown report.

READ-ONLY: does not modify any site pages, tracking code, or config.

Contract: contracts/measurement_audit_rules_v1.md
Thresholds: config/thresholds/measurement_audit_v1.yaml

Usage:
  python seo-ops/analyzers/pages/run_measurement_audit_v1.py --scope site
  MSYS_NO_PATHCONV=1 python seo-ops/analyzers/pages/run_measurement_audit_v1.py --scope page --page /gevelisolatie/
  python seo-ops/analyzers/pages/run_measurement_audit_v1.py --scope pages --pages-file urls.txt
  python seo-ops/analyzers/pages/run_measurement_audit_v1.py --scope site --prefer-window 90
"""

from __future__ import annotations

import argparse
import csv
import io
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

import yaml  # PyYAML — already available in the project

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

PAGES_DIR = SEO_OPS_ROOT / "snapshots" / "normalized" / "pages"
SEO_DIR = SEO_OPS_ROOT / "snapshots" / "normalized" / "seo"
CONFIG_DIR = SEO_OPS_ROOT / "config"
OUTPUT_DIR = SEO_OPS_ROOT / "outputs"
REPORT_DIR = SEO_OPS_ROOT / "reports" / "audits"

# ---------------------------------------------------------------------------
# Loaders
# ---------------------------------------------------------------------------

def _load_csv(path: Path) -> list[dict]:
    if not path.is_file():
        return []
    with open(path, encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


def _load_yaml(path: Path) -> dict:
    if not path.is_file():
        return {}
    with open(path, encoding="utf-8") as f:
        return yaml.safe_load(f) or {}


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


# ---------------------------------------------------------------------------
# Load thresholds
# ---------------------------------------------------------------------------

def load_thresholds() -> dict:
    path = CONFIG_DIR / "thresholds" / "measurement_audit_v1.yaml"
    t = _load_yaml(path)
    if not t:
        # Fallback conservative defaults
        return {
            "session_thresholds": {"noise_floor": 5, "directional_minimum": 20, "confident_minimum": 50},
            "conversion_thresholds": {"low_volume_floor": 3, "directional_minimum": 10, "confident_minimum": 20},
            "gsc_thresholds": {"weak_signal_impression_floor": 10, "low_click_floor": 5, "meaningful_query_count": 3},
            "mismatch_thresholds": {"high_mismatch_ratio_upper": 3.0, "high_mismatch_ratio_lower": 0.3,
                                    "minimum_clicks_for_mismatch": 5, "minimum_sessions_for_mismatch": 5},
            "not_set_thresholds": {"elevated_pct": 0.05, "warning_pct": 0.10, "critical_pct": 0.20},
            "engagement_proxy_rules": {"minimum_sessions_for_engagement_rate": 20, "minimum_sessions_for_bounce_rate": 20},
        }
    return t


def load_conversions_config() -> dict:
    return _load_yaml(CONFIG_DIR / "conversions.yaml")


def load_analysis_context() -> dict:
    return _load_yaml(CONFIG_DIR / "analysis_context_v1.yaml")


# ---------------------------------------------------------------------------
# Outcome buckets
# ---------------------------------------------------------------------------
MEASUREMENT_ADEQUATE = "measurement_looks_adequate"
MEASUREMENT_LIMITED_LOW_VOLUME = "measurement_limited_low_volume"
MEASUREMENT_SIGNAL_MISMATCH = "measurement_signal_mismatch"
MEASUREMENT_SCOPE_MISMATCH = "measurement_scope_mismatch"
MEASUREMENT_EVIDENCE_INSUFFICIENT = "measurement_evidence_insufficient"


# ---------------------------------------------------------------------------
# Per-page audit logic
# ---------------------------------------------------------------------------

def audit_page(
    page_path: str,
    ga4_row: dict | None,
    ga4_channel_rows: list[dict],
    gsc_page_row: dict | None,
    thresholds: dict,
    conversions_config: dict,
) -> dict:
    """Audit measurement quality for a single page."""
    observations: list[str] = []
    interpretations: list[str] = []
    hypotheses: list[str] = []
    recommended_actions: list[str] = []
    excluded_context: list[str] = []
    caveats: list[str] = []

    st = thresholds.get("session_thresholds", {})
    ct = thresholds.get("conversion_thresholds", {})
    gt = thresholds.get("gsc_thresholds", {})
    mt = thresholds.get("mismatch_thresholds", {})
    ep = thresholds.get("engagement_proxy_rules", {})

    has_ga4 = ga4_row is not None
    has_gsc = gsc_page_row is not None
    has_channel = len(ga4_channel_rows) > 0

    # --- GA4 evidence ---
    sessions = 0
    engaged_sessions = 0
    engagement_rate = 0.0
    key_events = 0

    if has_ga4:
        sessions = _safe_int(ga4_row.get("sessions", 0))
        engaged_sessions = _safe_int(ga4_row.get("engaged_sessions", 0))
        engagement_rate = _safe_float(ga4_row.get("engagement_rate", 0.0))
        key_events = _safe_int(ga4_row.get("key_events", 0))
        observations.append(f"GA4: {sessions} sessions, {engaged_sessions} engaged, {key_events} key events")
    else:
        observations.append("No GA4 landing page data found for this page")

    # --- Channel breakdown ---
    if has_channel:
        channel_summary = []
        for cr in ga4_channel_rows:
            ch = cr.get("session_default_channel_group", "?")
            ch_sessions = _safe_int(cr.get("sessions", 0))
            channel_summary.append(f"{ch}={ch_sessions}")
        observations.append(f"GA4 channels: {', '.join(channel_summary)}")
    else:
        excluded_context.append("No channel-level GA4 breakdown available")

    # --- GSC evidence ---
    gsc_clicks = 0
    gsc_impressions = 0
    gsc_queries = 0

    if has_gsc:
        gsc_clicks = _safe_int(gsc_page_row.get("total_clicks", 0))
        gsc_impressions = _safe_int(gsc_page_row.get("total_impressions", 0))
        gsc_queries = _safe_int(gsc_page_row.get("distinct_queries_count", 0))
        observations.append(f"GSC: {gsc_clicks} clicks, {gsc_impressions} impressions, {gsc_queries} queries")
    else:
        observations.append("No GSC page-level data found for this page")

    # --- Classification ---
    outcome = MEASUREMENT_EVIDENCE_INSUFFICIENT

    # Check 1: Do we have ANY measurement evidence?
    if not has_ga4 and not has_gsc:
        outcome = MEASUREMENT_EVIDENCE_INSUFFICIENT
        interpretations.append(
            "No GA4 or GSC measurement evidence found for this page. "
            "Cannot assess measurement quality without any data."
        )
        recommended_actions.append("Verify page is deployed and accessible")
        recommended_actions.append("Check if page URL appears in GA4 and GSC artifacts")
        return _build_page_result(
            page_path, outcome, observations, interpretations,
            hypotheses, recommended_actions, excluded_context, caveats,
        )

    # Check 2: Session volume assessment
    volume_level = "noise"
    if sessions >= st.get("confident_minimum", 50):
        volume_level = "confident"
    elif sessions >= st.get("directional_minimum", 20):
        volume_level = "directional"
    elif sessions > st.get("noise_floor", 5):
        volume_level = "low"

    if volume_level == "noise":
        interpretations.append(
            f"GA4 session volume (N={sessions}) is at noise level. "
            f"Engagement and conversion metrics from this volume are unreliable."
        )
        caveats.append(f"Low-volume caveat: N={sessions} sessions, below noise floor")
    elif volume_level == "low":
        interpretations.append(
            f"GA4 session volume (N={sessions}) is low. "
            f"Engagement metrics are directional only."
        )
    elif volume_level == "directional":
        interpretations.append(
            f"GA4 session volume (N={sessions}) is directional. "
            f"Engagement signals can be cited with caveats."
        )

    # Check 3: Conversion evidence quality
    primary_events = conversions_config.get("primary_key_events", [])
    if key_events < ct.get("low_volume_floor", 3):
        interpretations.append(
            f"Key events (N={key_events}) are below the low-volume floor. "
            f"Conversion conclusions are not supported."
        )
        if key_events == 0 and sessions > 0:
            hypotheses.append(
                "Zero key events with non-zero sessions could indicate: "
                "low conversion intent traffic, correct behavior for informational pages, "
                "or a measurement gap in event configuration. "
                "Cause is not determinable from artifacts alone."
            )
    elif key_events < ct.get("directional_minimum", 10):
        interpretations.append(
            f"Key events (N={key_events}) are below directional minimum. "
            f"Conversion interpretation is weak."
        )
    else:
        interpretations.append(
            f"Key events (N={key_events}) are sufficient for directional conversion interpretation."
        )

    # Check 4: Engagement metric reliability
    min_sessions_engagement = ep.get("minimum_sessions_for_engagement_rate", 20)
    if sessions < min_sessions_engagement and has_ga4:
        interpretations.append(
            f"Engagement rate ({engagement_rate:.1%}, N={sessions}) should not be cited — "
            f"sample size is below minimum ({min_sessions_engagement})."
        )

    # Check 5: GSC vs GA4 mismatch
    min_clicks_mismatch = mt.get("minimum_clicks_for_mismatch", 5)
    min_sessions_mismatch = mt.get("minimum_sessions_for_mismatch", 5)

    if has_ga4 and has_gsc and gsc_clicks >= min_clicks_mismatch and sessions >= min_sessions_mismatch:
        # Get organic sessions if channel data available
        organic_sessions = sessions  # fallback to total
        if has_channel:
            for cr in ga4_channel_rows:
                if cr.get("session_default_channel_group", "").lower() == "organic search":
                    organic_sessions = _safe_int(cr.get("sessions", 0))
                    break

        if gsc_clicks > 0:
            ratio = organic_sessions / gsc_clicks
            upper = mt.get("high_mismatch_ratio_upper", 3.0)
            lower = mt.get("high_mismatch_ratio_lower", 0.3)

            if ratio > upper:
                observations.append(
                    f"GA4 organic sessions / GSC clicks ratio = {ratio:.1f} (elevated)"
                )
                hypotheses.append(
                    "High GA4/GSC ratio may reflect: different counting windows, "
                    "direct traffic misattributed as organic, or session counting differences. "
                    "Not necessarily a tracking issue."
                )
            elif ratio < lower:
                observations.append(
                    f"GA4 organic sessions / GSC clicks ratio = {ratio:.1f} (low)"
                )
                hypotheses.append(
                    "Low GA4/GSC ratio may reflect: consent mode blocking GA4, "
                    "(not set) allocation absorbing sessions, "
                    "or different data windows. Investigation recommended."
                )
                recommended_actions.append("Check consent mode configuration impact")
                recommended_actions.append("Review (not set) landing page allocation in GA4")
            else:
                observations.append(
                    f"GA4 organic sessions / GSC clicks ratio = {ratio:.1f} (within normal range)"
                )
    elif has_ga4 and has_gsc:
        if gsc_clicks < min_clicks_mismatch or sessions < min_sessions_mismatch:
            excluded_context.append(
                f"GSC/GA4 mismatch analysis skipped — volume too low "
                f"(clicks={gsc_clicks}, sessions={sessions})"
            )

    # Check 6: GSC-only page (has visibility but no GA4 evidence)
    if has_gsc and not has_ga4 and gsc_impressions > gt.get("weak_signal_impression_floor", 10):
        outcome = MEASUREMENT_SIGNAL_MISMATCH
        interpretations.append(
            f"Page has GSC visibility ({gsc_impressions} impressions, {gsc_clicks} clicks) "
            f"but no GA4 landing page data. This may indicate a measurement gap."
        )
        hypotheses.append(
            "Possible causes: GA4 tracking not firing on this page, "
            "sessions attributed to (not set), or page path mismatch in GA4 data."
        )
        recommended_actions.append("Verify GA4 tracking code is present on the page")
        recommended_actions.append("Check if page appears under (not set) in GA4")

    # Check 7: GA4-only page (has sessions but no GSC visibility)
    elif has_ga4 and not has_gsc and sessions > st.get("noise_floor", 5):
        outcome = MEASUREMENT_SCOPE_MISMATCH
        interpretations.append(
            f"Page has GA4 sessions (N={sessions}) but no GSC data. "
            f"Traffic may be non-organic or page may not be indexed."
        )
        if has_channel:
            organic_count = 0
            for cr in ga4_channel_rows:
                if cr.get("session_default_channel_group", "").lower() == "organic search":
                    organic_count = _safe_int(cr.get("sessions", 0))
            if organic_count == 0:
                interpretations.append(
                    "No organic sessions detected in channel breakdown — "
                    "absence from GSC is expected."
                )
            else:
                hypotheses.append(
                    f"GA4 shows {organic_count} organic sessions but GSC shows no data. "
                    f"May indicate: GSC data gap, URL mismatch, or recent indexation."
                )

    # Assign final outcome if not already set by checks 6-7
    elif has_ga4 or has_gsc:
        if volume_level == "confident" and key_events >= ct.get("directional_minimum", 10):
            outcome = MEASUREMENT_ADEQUATE
        elif volume_level in ("directional", "confident"):
            outcome = MEASUREMENT_LIMITED_LOW_VOLUME
        elif volume_level == "low":
            outcome = MEASUREMENT_LIMITED_LOW_VOLUME
        else:
            outcome = MEASUREMENT_EVIDENCE_INSUFFICIENT

    # Standard recommended actions based on outcome
    if outcome == MEASUREMENT_LIMITED_LOW_VOLUME:
        recommended_actions.append("Wait for more data accumulation before drawing performance conclusions")
        recommended_actions.append("Check measurement evidence again after 30-60 days")
    if outcome == MEASUREMENT_EVIDENCE_INSUFFICIENT:
        recommended_actions.append("Verify page is deployed and has GA4 tracking")
        recommended_actions.append("Check if page is indexed (run indexation_debug_v1)")

    return _build_page_result(
        page_path, outcome, observations, interpretations,
        hypotheses, recommended_actions, excluded_context, caveats,
    )


def _build_page_result(
    page_path, outcome, observations, interpretations,
    hypotheses, recommended_actions, excluded_context, caveats,
) -> dict:
    return {
        "page": page_path,
        "outcome": outcome,
        "observations": observations,
        "interpretations": interpretations,
        "hypotheses": hypotheses,
        "recommended_actions": recommended_actions,
        "excluded_context": excluded_context,
        "caveats": caveats,
    }


# ---------------------------------------------------------------------------
# Site-wide checks
# ---------------------------------------------------------------------------

def audit_site_wide(
    ga4_rows: list[dict],
    ga4_channel_rows: list[dict],
    thresholds: dict,
) -> dict:
    """Site-level measurement health indicators."""
    observations: list[str] = []
    interpretations: list[str] = []
    hypotheses: list[str] = []
    recommended_actions: list[str] = []

    nst = thresholds.get("not_set_thresholds", {})

    total_sessions = sum(_safe_int(r.get("sessions", 0)) for r in ga4_rows)
    not_set_sessions = 0
    for r in ga4_rows:
        if r.get("normalized_path", "") == "(not set)":
            not_set_sessions = _safe_int(r.get("sessions", 0))
            break

    observations.append(f"Total GA4 sessions across all landing pages: {total_sessions}")
    observations.append(f"Pages with GA4 data: {len(ga4_rows)}")
    observations.append(f"(not set) sessions: {not_set_sessions}")

    if total_sessions > 0:
        not_set_pct = not_set_sessions / total_sessions
        observations.append(f"(not set) proportion: {not_set_pct:.1%}")

        if not_set_pct >= nst.get("critical_pct", 0.20):
            interpretations.append(
                f"(not set) proportion ({not_set_pct:.1%}) is critically high. "
                f"Significant measurement gap — landing page attribution is unreliable."
            )
            recommended_actions.append("Investigate (not set) root cause: consent mode, direct traffic, tracking gaps")
        elif not_set_pct >= nst.get("warning_pct", 0.10):
            interpretations.append(
                f"(not set) proportion ({not_set_pct:.1%}) is elevated. "
                f"Landing page attribution may undercount specific pages."
            )
            recommended_actions.append("Monitor (not set) proportion over time")
        elif not_set_pct >= nst.get("elevated_pct", 0.05):
            interpretations.append(
                f"(not set) proportion ({not_set_pct:.1%}) is slightly elevated but within acceptable range."
            )
        else:
            observations.append(f"(not set) proportion is low ({not_set_pct:.1%}) — acceptable")

    # Pages with zero key events
    zero_event_pages = [r for r in ga4_rows
                        if _safe_int(r.get("key_events", 0)) == 0
                        and _safe_int(r.get("sessions", 0)) > 0
                        and r.get("normalized_path", "") != "(not set)"]
    pages_with_events = [r for r in ga4_rows
                         if _safe_int(r.get("key_events", 0)) > 0]

    observations.append(f"Pages with key events: {len(pages_with_events)}")
    observations.append(f"Pages with sessions but zero key events: {len(zero_event_pages)}")

    if len(pages_with_events) == 0 and total_sessions > 20:
        interpretations.append(
            "No pages recorded any key events despite non-trivial session volume. "
            "This may indicate a key event configuration issue or genuinely no conversions."
        )
        hypotheses.append(
            "Possible: key event tracking is misconfigured, "
            "or traffic volume is too low for conversions at the site's current conversion rate."
        )
        recommended_actions.append("Verify key event configuration in GA4")

    return {
        "total_sessions": total_sessions,
        "not_set_sessions": not_set_sessions,
        "not_set_pct": not_set_sessions / total_sessions if total_sessions > 0 else 0.0,
        "pages_with_data": len(ga4_rows),
        "pages_with_events": len(pages_with_events),
        "pages_zero_events": len(zero_event_pages),
        "observations": observations,
        "interpretations": interpretations,
        "hypotheses": hypotheses,
        "recommended_actions": recommended_actions,
    }


# ---------------------------------------------------------------------------
# Report generation
# ---------------------------------------------------------------------------

def build_markdown_report(
    scope: str,
    page_audits: list[dict],
    site_audit: dict | None,
    artifact_provenance: dict,
    meta: dict,
) -> str:
    now = meta.get("generated_at_display", datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC"))
    lines = [
        "# Measurement Audit Report",
        "",
        f"**Generated:** {now}",
        f"**Report mode:** preliminary",
        f"**Workflow:** measurement_audit_v1",
        f"**Contract:** contracts/measurement_audit_rules_v1.md",
        f"**Scope:** {scope}",
        "",
        "---",
        "",
        "## 1. Sources used",
        "",
        "| Source | Path | Status | Source class |",
        "|--------|------|--------|-------------|",
    ]
    for src_name, src_info in artifact_provenance.items():
        lines.append(
            f"| {src_name} | {src_info['path']} | {src_info['status']} | internal_artifact |"
        )

    # Site-wide summary
    if site_audit:
        lines += [
            "",
            "## 2. Site-wide measurement health",
            "",
        ]
        for obs in site_audit["observations"]:
            lines.append(f"- {obs}")
        if site_audit["interpretations"]:
            lines += ["", "**Interpretations:**"]
            for interp in site_audit["interpretations"]:
                lines.append(f"- {interp}")
        if site_audit["hypotheses"]:
            lines += ["", "**Hypotheses (require verification):**"]
            for hyp in site_audit["hypotheses"]:
                lines.append(f"- {hyp}")
        if site_audit["recommended_actions"]:
            lines += ["", "**Recommended actions:**"]
            for act in site_audit["recommended_actions"]:
                lines.append(f"- {act}")

    # Summary table
    if page_audits:
        from collections import Counter
        outcome_counts = Counter(pa["outcome"] for pa in page_audits)
        lines += [
            "",
            "## 3. Measurement quality summary",
            "",
            f"**Pages audited:** {len(page_audits)}",
            "",
            "| Outcome | Count |",
            "|---------|-------|",
        ]
        for bucket in [MEASUREMENT_ADEQUATE, MEASUREMENT_LIMITED_LOW_VOLUME,
                       MEASUREMENT_SIGNAL_MISMATCH, MEASUREMENT_SCOPE_MISMATCH,
                       MEASUREMENT_EVIDENCE_INSUFFICIENT]:
            count = outcome_counts.get(bucket, 0)
            if count > 0:
                lines.append(f"| `{bucket}` | {count} |")

        # Per-page details
        lines += ["", "---", "", "## 4. Per-page measurement diagnosis", ""]
        for pa in page_audits:
            lines.append(f"### {pa['page']}")
            lines.append(f"**Outcome:** `{pa['outcome']}`")
            lines.append("")

            if pa["observations"]:
                lines.append("**Observations:**")
                for obs in pa["observations"]:
                    lines.append(f"- {obs}")
                lines.append("")

            if pa["interpretations"]:
                lines.append("**Interpretation boundaries:**")
                for interp in pa["interpretations"]:
                    lines.append(f"- {interp}")
                lines.append("")

            if pa["hypotheses"]:
                lines.append("**Hypotheses (require verification):**")
                for hyp in pa["hypotheses"]:
                    lines.append(f"- {hyp}")
                lines.append("")

            if pa["recommended_actions"]:
                lines.append("**Recommended next checks:**")
                for act in pa["recommended_actions"]:
                    lines.append(f"- {act}")
                lines.append("")

            if pa["excluded_context"]:
                lines.append("**Excluded context:**")
                for exc in pa["excluded_context"]:
                    lines.append(f"- {exc}")
                lines.append("")

            if pa["caveats"]:
                lines.append("**Caveats:**")
                for cav in pa["caveats"]:
                    lines.append(f"- {cav}")
                lines.append("")

            lines.append("---")
            lines.append("")

    # Provenance footer
    lines += [
        "## Provenance",
        "",
        f"- **Generated:** {now}",
        "- **Report mode:** preliminary",
        "- **Generator:** run_measurement_audit_v1.py",
        "- **Contract:** contracts/measurement_audit_rules_v1.md",
        "- **Thresholds:** config/thresholds/measurement_audit_v1.yaml",
        "- **Primary truth:** GA4 landing page snapshots + conversions config",
        "- **Supporting data:** GSC page snapshots (if available)",
        "- **Known limitations:**",
        "  - Artifact-based audit — does not check live tracking or GTM configuration",
        "  - GA4 data subject to consent mode filtering",
        "  - Post-cutover: measurement baselines not yet established",
        "  - Low site volume limits confident interpretation across all pages",
    ]

    return "\n".join(lines) + "\n"


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Measurement integrity audit — check measurement quality for pages or site-wide"
    )
    parser.add_argument("--scope", type=str, required=True,
                        choices=["site", "page", "pages"],
                        help="Audit scope: site, page, or pages")
    parser.add_argument("--page", type=str, default=None,
                        help="Page path for single-page audit (e.g. /gevelisolatie/)")
    parser.add_argument("--pages-file", type=str, default=None,
                        help="File with page paths, one per line")
    parser.add_argument("--prefer-window", type=int, default=28, choices=[28, 90],
                        help="Preferred data window (default: 28)")
    parser.add_argument("--label", type=str, default=None,
                        help="Optional label for output naming")
    parser.add_argument("--output-json", type=str, default=None,
                        help="Override JSON output path")
    parser.add_argument("--output-report", type=str, default=None,
                        help="Override report output path")
    args = parser.parse_args()

    # Validate scope/page combination
    if args.scope == "page" and not args.page:
        print("ERROR: --scope page requires --page argument.", file=sys.stderr)
        sys.exit(1)
    if args.scope == "pages" and not args.pages_file:
        print("ERROR: --scope pages requires --pages-file argument.", file=sys.stderr)
        sys.exit(1)

    print("Measurement audit v1")
    print(f"  Scope: {args.scope}")
    if args.page:
        print(f"  Page: {args.page}")
    print(f"  Preferred window: {args.prefer_window}d")
    print()

    # Load config
    thresholds = load_thresholds()
    conversions_config = load_conversions_config()
    analysis_context = load_analysis_context()

    # Load artifacts
    window = args.prefer_window
    fallback_window = 90 if window == 28 else 28

    ga4_path = PAGES_DIR / f"ga4_landing_pages_last{window}d.csv"
    ga4_rows = _load_csv(ga4_path)
    used_ga4_window = window

    if not ga4_rows:
        ga4_path = PAGES_DIR / f"ga4_landing_pages_last{fallback_window}d.csv"
        ga4_rows = _load_csv(ga4_path)
        used_ga4_window = fallback_window if ga4_rows else None

    ga4_channel_path = PAGES_DIR / f"ga4_landing_pages_by_channel_last{window}d.csv"
    ga4_channel_rows = _load_csv(ga4_channel_path)
    used_ga4_channel_window = window

    if not ga4_channel_rows:
        ga4_channel_path = PAGES_DIR / f"ga4_landing_pages_by_channel_last{fallback_window}d.csv"
        ga4_channel_rows = _load_csv(ga4_channel_path)
        used_ga4_channel_window = fallback_window if ga4_channel_rows else None

    gsc_path = SEO_DIR / f"gsc_query_page_aggregated_pages_last{window}d.csv"
    gsc_rows = _load_csv(gsc_path)
    used_gsc_window = window

    if not gsc_rows:
        gsc_path = SEO_DIR / f"gsc_query_page_aggregated_pages_last{fallback_window}d.csv"
        gsc_rows = _load_csv(gsc_path)
        used_gsc_window = fallback_window if gsc_rows else None

    # Build indices
    ga4_index: dict[str, dict] = {}
    for row in ga4_rows:
        np = row.get("normalized_path", "")
        if np:
            ga4_index[np.rstrip("/")] = row

    ga4_channel_index: dict[str, list[dict]] = {}
    for row in ga4_channel_rows:
        np = row.get("normalized_path", "")
        if np:
            key = np.rstrip("/")
            if key not in ga4_channel_index:
                ga4_channel_index[key] = []
            ga4_channel_index[key].append(row)

    gsc_index: dict[str, dict] = {}
    for row in gsc_rows:
        page_url = row.get("page", "")
        if page_url:
            # Extract path from full URL
            from urllib.parse import urlparse
            parsed = urlparse(page_url)
            path_key = parsed.path.rstrip("/") if parsed.path else page_url.rstrip("/")
            gsc_index[path_key] = row

    # Artifact provenance
    artifact_provenance: dict[str, dict] = {}
    if ga4_rows:
        artifact_provenance["ga4_landing_pages"] = {
            "path": f"snapshots/normalized/pages/ga4_landing_pages_last{used_ga4_window}d.csv",
            "status": f"loaded, {len(ga4_rows)} pages",
        }
    else:
        artifact_provenance["ga4_landing_pages"] = {
            "path": f"snapshots/normalized/pages/ga4_landing_pages_last{window}d.csv",
            "status": "not found — limited mode",
        }
    if ga4_channel_rows:
        artifact_provenance["ga4_channel_breakdown"] = {
            "path": f"snapshots/normalized/pages/ga4_landing_pages_by_channel_last{used_ga4_channel_window}d.csv",
            "status": f"loaded, {len(ga4_channel_rows)} rows",
        }
    if gsc_rows:
        artifact_provenance["gsc_page_aggregates"] = {
            "path": f"snapshots/normalized/seo/gsc_query_page_aggregated_pages_last{used_gsc_window}d.csv",
            "status": f"loaded, {len(gsc_rows)} pages",
        }
    else:
        artifact_provenance["gsc_page_aggregates"] = {
            "path": f"snapshots/normalized/seo/gsc_query_page_aggregated_pages_last{window}d.csv",
            "status": "not found — GSC comparison not available",
        }
    artifact_provenance["conversions_config"] = {
        "path": "config/conversions.yaml",
        "status": "loaded" if conversions_config else "not found",
    }
    artifact_provenance["thresholds"] = {
        "path": "config/thresholds/measurement_audit_v1.yaml",
        "status": "loaded" if thresholds else "using defaults",
    }

    print("  Sources:")
    for name, info in artifact_provenance.items():
        print(f"    {name}: {info['status']}")
    print()

    # Determine target pages
    target_pages: list[str] = []

    if args.scope == "site":
        # All pages from GA4 + GSC combined
        seen = set()
        for p in ga4_index:
            if p and p != "(not set)":
                seen.add(p)
        for p in gsc_index:
            if p:
                seen.add(p)
        target_pages = sorted(seen)
    elif args.scope == "page":
        target_pages = [args.page.rstrip("/")]
    elif args.scope == "pages":
        pf = Path(args.pages_file)
        if not pf.is_file():
            print(f"ERROR: Pages file not found: {args.pages_file}", file=sys.stderr)
            sys.exit(1)
        target_pages = [
            line.strip().rstrip("/")
            for line in pf.read_text(encoding="utf-8").splitlines()
            if line.strip() and not line.strip().startswith("#")
        ]

    if not target_pages and not ga4_rows:
        print("ERROR: No target pages and no GA4 data available.", file=sys.stderr)
        sys.exit(1)

    # Run per-page audits
    page_audits: list[dict] = []
    for page_path in target_pages:
        key = page_path.rstrip("/")
        ga4_row = ga4_index.get(key)
        # Also try with trailing slash
        if not ga4_row:
            ga4_row = ga4_index.get(key + "/")
        ga4_ch = ga4_channel_index.get(key, [])
        if not ga4_ch:
            ga4_ch = ga4_channel_index.get(key + "/", [])
        gsc_row = gsc_index.get(key)
        if not gsc_row:
            gsc_row = gsc_index.get(key + "/")

        result = audit_page(
            page_path, ga4_row, ga4_ch, gsc_row,
            thresholds, conversions_config,
        )
        page_audits.append(result)
        print(f"  {page_path} → {result['outcome']}")

    # Site-wide audit (only for site scope)
    site_audit = None
    if args.scope == "site" and ga4_rows:
        site_audit = audit_site_wide(ga4_rows, ga4_channel_rows, thresholds)

    # Output paths
    label_part = f"_{args.label}" if args.label else f"_{args.scope}"
    date_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    output_json_path = Path(args.output_json) if args.output_json else OUTPUT_DIR / "measurement_audit_v1.json"
    report_md_path = (
        Path(args.output_report) if args.output_report
        else REPORT_DIR / f"measurement_audit{label_part}_{date_str}.md"
    )

    now_iso = datetime.now(timezone.utc).isoformat()
    now_display = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    # Build JSON output
    from collections import Counter
    outcome_counts = Counter(pa["outcome"] for pa in page_audits)

    json_output = {
        "_meta": {
            "generator": "run_measurement_audit_v1.py",
            "generated_at": now_iso,
            "version": "1.0",
            "contract": "contracts/measurement_audit_rules_v1.md",
            "thresholds_config": "config/thresholds/measurement_audit_v1.yaml",
            "scope": args.scope,
            "page_filter": args.page,
            "prefer_window": args.prefer_window,
            "ga4_window_used": used_ga4_window,
            "gsc_window_used": used_gsc_window,
            "pages_audited": len(page_audits),
            "limited_mode": not bool(ga4_rows),
        },
        "artifact_provenance": artifact_provenance,
        "summary": {
            "total_pages": len(page_audits),
            "by_outcome": {
                bucket: outcome_counts.get(bucket, 0)
                for bucket in [MEASUREMENT_ADEQUATE, MEASUREMENT_LIMITED_LOW_VOLUME,
                               MEASUREMENT_SIGNAL_MISMATCH, MEASUREMENT_SCOPE_MISMATCH,
                               MEASUREMENT_EVIDENCE_INSUFFICIENT]
            },
        },
    }

    if site_audit:
        json_output["site_wide"] = site_audit

    json_output["page_audits"] = page_audits

    # Write JSON
    output_json_path.parent.mkdir(parents=True, exist_ok=True)
    output_json_path.write_text(
        json.dumps(json_output, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    print(f"\n  JSON output → {output_json_path}")

    # Write markdown report
    meta = {"generated_at_display": now_display}
    report_md = build_markdown_report(
        args.scope, page_audits, site_audit, artifact_provenance, meta,
    )
    report_md_path.parent.mkdir(parents=True, exist_ok=True)
    report_md_path.write_text(report_md, encoding="utf-8")
    print(f"  Report → {report_md_path}")

    print("\n  Done.")


if __name__ == "__main__":
    main()

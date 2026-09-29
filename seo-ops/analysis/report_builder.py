"""
Build a structured analysis report from snapshot + rule findings.
Outputs both a dict and a markdown string.
"""

from datetime import datetime, timezone

EXPECTED_SECTIONS = [
    "gsc_top_pages",
    "gsc_top_queries",
    "gsc_page_comparison",
    "ga4_landing_pages",
    "ga4_key_events_by_page",
    "ga4_key_events_by_channel",
    "ga4_traffic_acquisition",
    "ga4_daily_sessions",
]


def data_issues(snapshot: dict) -> list[str]:
    """Snapshot sections that are missing, failed or empty — reported first, never silently."""
    issues = []
    for key in EXPECTED_SECTIONS:
        section = snapshot.get(key)
        if section is None:
            issues.append(f"{key}: missing")
        elif isinstance(section, dict) and "error" in section:
            issues.append(f"{key}: error — {section['error']}")
        elif isinstance(section, dict) and not section.get("rows"):
            issues.append(f"{key}: no rows")
    return issues


def build_report(snapshot: dict, findings: dict) -> dict:
    """
    Assemble the final report dict from categorised findings.

    findings = {
        "seo_opportunities": [...],
        "seo_risks": [...],
        "measurement_issues": [...],
        "conversion_opportunities": [...],
        "gevelisolatie_cluster_notes": [...],
    }
    """
    # Flatten all for pages_to_watch and next_actions
    all_findings = []
    for v in findings.values():
        all_findings.extend(v)

    # Pages mentioned in medium/high confidence findings
    pages_to_watch = sorted({
        f["page"]
        for f in all_findings
        if f.get("page") and f["confidence"] in ("medium", "high")
    })

    # Next actions: high/medium confidence actions, grouped so no target is lost
    grouped: dict[str, dict] = {}
    for f in all_findings:
        if f["confidence"] in ("medium", "high"):
            entry = grouped.setdefault(
                f["recommended_action"],
                {"action": f["recommended_action"], "category": f["category"], "related": []},
            )
            target = f.get("page") or f.get("query")
            if target and target not in entry["related"]:
                entry["related"].append(target)
    next_actions = list(grouped.values())

    # Counts for summary
    counts = {k: len(v) for k, v in findings.items()}
    total = sum(counts.values())

    report = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "site": snapshot.get("site", ""),
        "snapshot_generated_at": snapshot.get("_generated_at", "unknown"),
        "gsc_current_range": snapshot.get("gsc_page_comparison", {}).get("current_range"),
        "data_issues": data_issues(snapshot),
        "executive_summary": {
            "total_findings": total,
            "breakdown": counts,
            "pages_to_watch_count": len(pages_to_watch),
            "next_actions_count": len(next_actions),
        },
        "top_seo_opportunities": findings.get("seo_opportunities", []),
        "seo_risks": findings.get("seo_risks", []),
        "top_conversion_opportunities": findings.get("conversion_opportunities", []),
        "measurement_issues": findings.get("measurement_issues", []),
        "gevelisolatie_cluster_review": findings.get("gevelisolatie_cluster_notes", []),
        "pages_to_watch": pages_to_watch,
        "next_actions_7_14_days": next_actions,
    }

    return report


def report_to_markdown(report: dict) -> str:
    """Convert report dict to operator-friendly markdown."""
    lines = []

    lines.append(f"# SEO / Analytics Analysis Report")
    lines.append(f"")
    lines.append(f"Generated: {report['generated_at']}")
    lines.append(f"Site: {report['site']}")
    lines.append(f"Snapshot from: {report['snapshot_generated_at']}")
    gsc_range = report.get("gsc_current_range") or {}
    if gsc_range:
        lines.append(f"GSC window: {gsc_range.get('start')} → {gsc_range.get('end')} (final data)")
    lines.append("")
    lines.append("Rule findings are leads to verify, not conclusions (seo-ops/CLAUDE.md).")
    lines.append("")

    issues = report.get("data_issues") or []
    lines.append("## Data issues")
    lines.append("")
    if issues:
        for issue in issues:
            lines.append(f"- {issue}")
    else:
        lines.append("None — all snapshot sections present and non-empty.")
    lines.append("")

    # Executive summary
    es = report["executive_summary"]
    lines.append("## Executive Summary")
    lines.append("")
    lines.append(f"- **Total findings:** {es['total_findings']}")
    for k, v in es["breakdown"].items():
        label = k.replace("_", " ").title()
        lines.append(f"  - {label}: {v}")
    lines.append(f"- **Pages to watch:** {es['pages_to_watch_count']}")
    lines.append(f"- **Next actions:** {es['next_actions_count']}")
    lines.append("")

    # Sections
    section_map = [
        ("top_seo_opportunities", "Top SEO Opportunities"),
        ("seo_risks", "SEO Risks"),
        ("top_conversion_opportunities", "Conversion Opportunities"),
        ("measurement_issues", "Measurement Issues"),
        ("gevelisolatie_cluster_review", "Gevelisolatie Cluster Review"),
    ]

    for key, title in section_map:
        items = report.get(key, [])
        lines.append(f"## {title}")
        lines.append("")
        if not items:
            lines.append("No findings.")
            lines.append("")
            continue

        for i, item in enumerate(items, 1):
            page = item.get("page", "")
            query = item.get("query", "")
            target = page or query or "—"
            lines.append(f"### {i}. {target}")
            lines.append("")
            lines.append(f"- **Signal:** {item['signal']}")
            lines.append(f"- **Why:** {item['why_it_matters']}")
            lines.append(f"- **Confidence:** {item['confidence']}")
            lines.append(f"- **Action:** {item['recommended_action']}")
            lines.append(f"- **Category:** {item['category']}")
            lines.append("")

    # Pages to watch
    lines.append("## Pages to Watch")
    lines.append("")
    ptw = report.get("pages_to_watch", [])
    if ptw:
        for p in ptw:
            lines.append(f"- {p}")
    else:
        lines.append("None at medium/high confidence.")
    lines.append("")

    # Next actions
    lines.append("## Next Actions (7–14 days)")
    lines.append("")
    actions = report.get("next_actions_7_14_days", [])
    if actions:
        for i, a in enumerate(actions, 1):
            related = ", ".join(a.get("related") or [])
            suffix = f" — {related}" if related else ""
            lines.append(f"{i}. [{a['category']}] {a['action']}{suffix}")
    else:
        lines.append("No medium/high confidence actions at this time.")
    lines.append("")

    return "\n".join(lines)

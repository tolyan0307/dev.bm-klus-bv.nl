"""
Build a structured analysis report from snapshot + rule findings.
Outputs both a dict and a markdown string.
"""

from datetime import datetime, timezone


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

    # Next actions: deduplicated high/medium confidence actions
    seen_actions = set()
    next_actions = []
    for f in all_findings:
        if f["confidence"] in ("medium", "high"):
            action = f["recommended_action"]
            if action not in seen_actions:
                seen_actions.add(action)
                next_actions.append({
                    "action": action,
                    "category": f["category"],
                    "related_page": f.get("page"),
                    "related_query": f.get("query"),
                })

    # Counts for summary
    counts = {k: len(v) for k, v in findings.items()}
    total = sum(counts.values())

    report = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "site": snapshot.get("site", ""),
        "snapshot_generated_at": snapshot.get("_generated_at", "unknown"),
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
            related = a.get("related_page") or a.get("related_query") or ""
            suffix = f" — {related}" if related else ""
            lines.append(f"{i}. [{a['category']}] {a['action']}{suffix}")
    else:
        lines.append("No medium/high confidence actions at this time.")
    lines.append("")

    return "\n".join(lines)

"""
CLI: run analysis rules on the latest combined snapshot.

Prints a console summary and saves:
  - seo-ops/data/processed/latest_analysis_report.json
  - seo-ops/reports/weekly/latest_analysis_report.md

Usage:
    python run_analysis_report.py
"""

import json
import sys
from pathlib import Path

# Allow running from the analysis/ directory
sys.path.insert(0, str(Path(__file__).resolve().parent))

from snapshot_loader import load_snapshot
from rules import (
    seo_opportunities,
    seo_risks,
    measurement_issues,
    conversion_opportunities,
    gevelisolatie_cluster_notes,
)
from report_builder import build_report, report_to_markdown


def main() -> int:
    print("Loading snapshot...")
    snapshot = load_snapshot()
    print(f"Site: {snapshot.get('site')}")
    print(f"Snapshot from: {snapshot.get('_generated_at', 'unknown')}")

    print("Running analysis rules...")
    findings = {
        "seo_opportunities": seo_opportunities(snapshot),
        "seo_risks": seo_risks(snapshot),
        "measurement_issues": measurement_issues(snapshot),
        "conversion_opportunities": conversion_opportunities(snapshot),
        "gevelisolatie_cluster_notes": gevelisolatie_cluster_notes(snapshot),
    }

    report = build_report(snapshot, findings)
    md = report_to_markdown(report)

    # --- Console summary ---
    es = report["executive_summary"]
    print(f"\n{'='*60}")
    print(f"  Analysis complete")
    print(f"{'='*60}")
    print(f"  Total findings: {es['total_findings']}")
    for k, v in es["breakdown"].items():
        label = k.replace("_", " ").title()
        print(f"    {label}: {v}")
    print(f"  Pages to watch: {es['pages_to_watch_count']}")
    print(f"  Next actions: {es['next_actions_count']}")

    # Print top findings
    for section_key, section_title in [
        ("top_seo_opportunities", "SEO Opportunities"),
        ("seo_risks", "SEO Risks"),
        ("measurement_issues", "Measurement Issues"),
        ("top_conversion_opportunities", "Conversion Opportunities"),
    ]:
        items = report.get(section_key, [])
        if items:
            print(f"\n  --- {section_title} ({len(items)}) ---")
            for item in items[:3]:
                target = item.get("page") or item.get("query") or "—"
                print(f"    [{item['confidence']}] {target}: {item['signal']}")
            if len(items) > 3:
                print(f"    ... and {len(items) - 3} more")

    # Cluster
    cluster = report.get("gevelisolatie_cluster_review", [])
    if cluster:
        print(f"\n  --- Gevelisolatie Cluster ({len(cluster)}) ---")
        for item in cluster[:3]:
            target = item.get("page", "—")
            print(f"    [{item['confidence']}] {target}: {item['signal']}")

    # --- Save JSON ---
    root = Path(__file__).resolve().parent.parent

    json_dir = root / "data" / "processed"
    json_dir.mkdir(parents=True, exist_ok=True)
    json_path = json_dir / "latest_analysis_report.json"
    json_path.write_text(
        json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    # --- Save Markdown ---
    md_dir = root / "reports" / "weekly"
    md_dir.mkdir(parents=True, exist_ok=True)
    md_path = md_dir / "latest_analysis_report.md"
    md_path.write_text(md, encoding="utf-8")

    print(f"\n{'='*60}")
    print(f"  JSON: {json_path}")
    print(f"  Markdown: {md_path}")
    print(f"{'='*60}")

    return 0


if __name__ == "__main__":
    sys.exit(main())

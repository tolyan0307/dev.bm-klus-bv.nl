"""
build_page_inventory.py — Build the v1 page inventory for BM klus BV.

Reads from local_page_loader and outputs:
  - page_inventory_v1.json  (full structured data)
  - page_inventory_v1.csv   (flat table for quick review)
  - page_inventory_summary_v1.md (human-readable summary report)

Usage:
  cd seo-ops
  python -m analyzers.pages.build_page_inventory

Or from project root:
  python seo-ops/analyzers/pages/build_page_inventory.py
"""

from __future__ import annotations

import csv
import json
import sys
from collections import Counter
from dataclasses import asdict
from datetime import datetime, timezone
from pathlib import Path

# Ensure seo-ops root is importable
SCRIPT_DIR = Path(__file__).resolve().parent
SEO_OPS_ROOT = SCRIPT_DIR.parents[1]
sys.path.insert(0, str(SEO_OPS_ROOT))

from integrations.site.local_page_loader import build_inventory, PageRecord

# ── Output paths ─────────────────────────────────────────────────────────────

OUTPUT_DIR = SEO_OPS_ROOT / "snapshots" / "normalized" / "pages"
REPORT_DIR = SEO_OPS_ROOT / "reports" / "pages"

JSON_OUT = OUTPUT_DIR / "page_inventory_v1.json"
CSV_OUT = OUTPUT_DIR / "page_inventory_v1.csv"
SUMMARY_OUT = REPORT_DIR / "page_inventory_summary_v1.md"

CSV_FIELDS = [
    "page_id",
    "route_path",
    "source_file",
    "page_type",
    "is_dynamic",
    "is_indexable_guess",
    "title_guess",
    "meta_title_guess",
    "meta_description_guess",
    "h1_guess",
    "primary_topic_guess",
    "city_guess",
    "service_guess",
    "has_faq",
    "has_schema_hint",
    "has_internal_links_section",
    "section_headings",
    "notes",
]


# ── Output writers ───────────────────────────────────────────────────────────

def write_json(records: list[PageRecord], path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    data = {
        "_meta": {
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "generator": "build_page_inventory.py v1",
            "total_pages": len(records),
        },
        "pages": [asdict(r) for r in records],
    }
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")


def write_csv(records: list[PageRecord], path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=CSV_FIELDS)
        writer.writeheader()
        for rec in records:
            row = asdict(rec)
            writer.writerow(row)


def write_summary(records: list[PageRecord], path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    type_counts = Counter(r.page_type for r in records)
    dynamic_count = sum(1 for r in records if r.is_dynamic)
    indexable_count = sum(1 for r in records if r.is_indexable_guess)
    not_indexable = [r for r in records if not r.is_indexable_guess]
    no_h1 = [r for r in records if r.is_indexable_guess and not r.h1_guess]
    no_title = [r for r in records if r.is_indexable_guess and not r.meta_title_guess]
    no_desc = [r for r in records if r.is_indexable_guess and not r.meta_description_guess]
    faq_pages = [r for r in records if r.has_faq]
    schema_pages = [r for r in records if r.has_schema_hint]

    # Group by route prefix
    route_groups: dict[str, list[PageRecord]] = {}
    for r in records:
        parts = r.route_path.strip("/").split("/")
        group = f"/{parts[0]}/" if parts[0] else "/"
        route_groups.setdefault(group, []).append(r)

    lines = [
        f"# Page Inventory Summary v1",
        f"",
        f"**Generated:** {now}",
        f"**Generator:** `build_page_inventory.py v1`",
        f"",
        f"---",
        f"",
        f"## Totals",
        f"",
        f"| Metric | Count |",
        f"|--------|-------|",
        f"| Total pages found | {len(records)} |",
        f"| Indexable (guess) | {indexable_count} |",
        f"| Not indexable | {len(not_indexable)} |",
        f"| Dynamic (generated from data) | {dynamic_count} |",
        f"| Static (file-based routes) | {len(records) - dynamic_count} |",
        f"| Pages with FAQ | {len(faq_pages)} |",
        f"| Pages with schema hints | {len(schema_pages)} |",
        f"",
        f"---",
        f"",
        f"## Page type breakdown",
        f"",
        f"| Type | Count |",
        f"|------|-------|",
    ]
    for ptype, count in sorted(type_counts.items(), key=lambda x: -x[1]):
        lines.append(f"| {ptype} | {count} |")

    lines += [
        f"",
        f"---",
        f"",
        f"## Route groups",
        f"",
        f"| Group | Pages |",
        f"|-------|-------|",
    ]
    for group, pages in sorted(route_groups.items()):
        lines.append(f"| `{group}` | {len(pages)} |")

    lines += [
        f"",
        f"---",
        f"",
        f"## Data sources used",
        f"",
        f"| Source | What it provides |",
        f"|--------|-----------------|",
        f"| `app/` directory tree | Route detection, page.tsx files, schema/FAQ hints |",
        f"| `data/sitemap-plan.ts` | PLANNED_ROUTES: meta title, description, enabled flag |",
        f"| `lib/content/gevelisolatie-locations.ts` | Location data: slug, city, title, h1, description, FAQ |",
        f"| `lib/content/projects.ts` | Project cards: slug, title, city, serviceType |",
        f"| `lib/content/*.ts` (service pages) | Service meta: title, description, h1, FAQ presence |",
        f"",
        f"---",
        f"",
        f"## Extraction reliability",
        f"",
        f"| Field | Reliability | Notes |",
        f"|-------|-------------|-------|",
        f"| page_id | Reliable | Derived from route_path |",
        f"| route_path | Reliable | From app/ directory or data sources |",
        f"| source_file | Reliable | Actual file path in app/ |",
        f"| page_type | Reliable | Rule-based classifier on route patterns |",
        f"| is_dynamic | Reliable | Detected from [param] segments |",
        f"| is_indexable_guess | Good | Based on enabled flag in sitemap-plan |",
        f"| meta_title_guess | Good | From sitemap-plan or content modules |",
        f"| meta_description_guess | Good | From sitemap-plan or content modules |",
        f"| h1_guess | Good for services/locations | From content .ts files; missing for some static pages |",
        f"| title_guess | Good for projects/locations | From content data; blank for utility pages |",
        f"| city_guess | Good for city/project pages | From content data |",
        f"| service_guess | Good for service/cluster/city | From content data or route |",
        f"| has_faq | Good | Detected from content exports + page imports |",
        f"| has_schema_hint | Good | Detected from jsonLd/Schema imports in page.tsx |",
        f"| has_internal_links_section | Not extracted (v1) | No reliable detection method yet |",
        f"| section_headings | Not extracted (v1) | Requires AST parsing or full render |",
        f"",
        f"---",
        f"",
        f"## Anomalies to review",
        f"",
    ]

    if not_indexable:
        lines.append(f"### Not indexable ({len(not_indexable)} pages)")
        lines.append(f"")
        for r in not_indexable:
            lines.append(f"- `{r.route_path}` — {r.notes or 'no notes'}")
        lines.append(f"")

    if no_h1:
        lines.append(f"### Missing H1 guess ({len(no_h1)} indexable pages)")
        lines.append(f"")
        for r in no_h1:
            lines.append(f"- `{r.route_path}` ({r.page_type})")
        lines.append(f"")

    if no_title:
        lines.append(f"### Missing meta title guess ({len(no_title)} indexable pages)")
        lines.append(f"")
        for r in no_title:
            lines.append(f"- `{r.route_path}` ({r.page_type})")
        lines.append(f"")

    if no_desc:
        lines.append(f"### Missing meta description guess ({len(no_desc)} indexable pages)")
        lines.append(f"")
        for r in no_desc:
            lines.append(f"- `{r.route_path}` ({r.page_type})")
        lines.append(f"")

    if not no_h1 and not no_title and not no_desc and not not_indexable:
        lines.append(f"No anomalies detected.")
        lines.append(f"")

    lines += [
        f"---",
        f"",
        f"## Limitations (v1)",
        f"",
        f"1. **section_headings** — not extracted; requires rendering or AST parsing of JSX",
        f"2. **has_internal_links_section** — not reliably detectable from source scan",
        f"3. **Word count** — not available without rendering pages",
        f"4. **Actual rendered title vs meta title** — may differ due to `buildPageMetadata()` logic",
        f"5. **Home page H1** — hardcoded guess based on site branding, not extracted from JSX",
        f"6. **Disabled pages** — included with `is_indexable_guess=false` for completeness",
        f"",
        f"---",
        f"",
        f"## Output files",
        f"",
        f"| File | Path |",
        f"|------|------|",
        f"| JSON (full) | `seo-ops/snapshots/normalized/pages/page_inventory_v1.json` |",
        f"| CSV (flat) | `seo-ops/snapshots/normalized/pages/page_inventory_v1.csv` |",
        f"| Summary (this file) | `seo-ops/reports/pages/page_inventory_summary_v1.md` |",
    ]

    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


# ── Main ─────────────────────────────────────────────────────────────────────

def main() -> None:
    print("Building page inventory v1...")
    records = build_inventory()
    print(f"  Found {len(records)} pages")

    write_json(records, JSON_OUT)
    print(f"  JSON -> {JSON_OUT}")

    write_csv(records, CSV_OUT)
    print(f"  CSV  -> {CSV_OUT}")

    write_summary(records, SUMMARY_OUT)
    print(f"  Summary -> {SUMMARY_OUT}")

    # Quick stats
    type_counts = Counter(r.page_type for r in records)
    print(f"\n  Page type breakdown:")
    for ptype, count in sorted(type_counts.items(), key=lambda x: -x[1]):
        print(f"    {ptype:10s} {count}")

    print(f"\n  Done.")


if __name__ == "__main__":
    main()

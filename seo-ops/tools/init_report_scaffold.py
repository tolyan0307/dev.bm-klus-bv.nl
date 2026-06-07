#!/usr/bin/env python3
"""
Report scaffold generator for seo-ops.

Generates a markdown scaffold following templates/report_templates_v1.md.

Usage:
    python seo-ops/tools/init_report_scaffold.py decision_pack --topic "Rotterdam SEO"
    python seo-ops/tools/init_report_scaffold.py verification_audit --topic "Decision pack v1"
    python seo-ops/tools/init_report_scaffold.py page_ownership_audit --topic "gevelisolatie rotterdam"
    python seo-ops/tools/init_report_scaffold.py enrichment_note --topic "SERP snapshot"
    python seo-ops/tools/init_report_scaffold.py --list
"""
import argparse
import sys
from datetime import date
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
SEO_OPS_DIR = SCRIPT_DIR.parent
REPORTS_DIR = SEO_OPS_DIR / "reports" / "combined"

TODAY = date.today().isoformat()


def slugify(text: str) -> str:
    """Simple slugify: lowercase, replace spaces/special with underscores."""
    return "".join(c if c.isalnum() else "_" for c in text.lower()).strip("_")


# ─── Template definitions ───
# These mirror templates/report_templates_v1.md exactly.

TEMPLATES = {
    "decision_pack": {
        "description": "Actionable recommendations on a specific topic",
        "filename": "{slug}_decision_pack_{date}.md",
        "content": """# Decision Pack — {topic}

**Date:** {date}
**Scope:** {{what is covered}}
**Report mode:** preliminary | verified | enrichment_only
**Live API calls:** none

---

## 1. Objective
{{What decision this pack supports — 1-2 sentences}}

## 2. Data sources used
| Source | Artifact path | Freshness | Rows/records |
|--------|--------------|-----------|-------------|
| | | | |

## 3. Current state
{{Factual summary of current metrics, positions, traffic — all with provenance labels}}

## 4. Key findings
1. **{{Finding title}}** — {{description}}
   - Evidence: {{data point with source label}}
   - Confidence: low | medium | high
   - Impact: {{what happens if ignored}}

## 5. Recommended actions
| Priority | Action | Category | Confidence | Expected impact |
|----------|--------|----------|------------|-----------------|
| | | | | |

## 6. What should NOT be changed
{{Explicit list of things that are working correctly and should be preserved}}

## 7. Risks and uncertainties
{{What could go wrong, what is unknown, what needs more data}}

## 8. Provenance
- **Generated:** {date}
- **Report mode:** {{mode}}
- **Data sources used:** {{list with freshness}}
- **Live API calls made:** none
- **Numeric confidence cap:** {{state if any}}
- **Known limitations:** {{list}}
""",
    },
    "verification_audit": {
        "description": "Verify claims from a prior report or external source",
        "filename": "{slug}_verification_audit_{date}.md",
        "content": """# Verification Audit — {topic}

**Date:** {date}
**Scope:** {{what claims are being verified}}
**Source document:** {{what is being audited}}
**Report mode:** preliminary | verified

---

## 1. Claims under review
| # | Claim | Source document section |
|---|-------|----------------------|
| 1 | | |

## 2. Verification method
{{How each claim was checked — which artifacts, which fields}}

## 3. Verification results
| # | Claim | Verdict | Evidence | Correct value | Source |
|---|-------|---------|----------|---------------|--------|
| 1 | | | | | |

## 4. Provenance errors found
{{List of numeric claims that had wrong or missing provenance in original document}}

## 5. Impact assessment
{{Which incorrect claims matter for decisions, which are cosmetic}}

## 6. Corrected summary
{{If needed: corrected version of key findings from the audited document}}

## 7. Provenance
- **Generated:** {date}
- **Report mode:** {{mode}}
- **Data sources used:** {{list with freshness}}
- **Live API calls made:** none
- **Numeric confidence cap:** {{state if any}}
- **Known limitations:** {{list}}
""",
    },
    "page_ownership_audit": {
        "description": "Query ownership, cannibalization, or page-vs-query alignment",
        "filename": "{slug}_ownership_audit_{date}.md",
        "content": """# Page Ownership Audit — "{topic}"

**Date:** {date}
**Target query:** {topic}
**Expected owner page:** {{URL}}
**Report mode:** preliminary | verified

---

## 1. Current SERP state
| Position | Page | Impressions | Clicks | CTR | Source |
|----------|------|-------------|--------|-----|--------|
| | | | | | |

## 2. Internal competition
| Page | Position | Impressions | Volume share | Role |
|------|----------|-------------|-------------|------|
| | | | | owner / competitor / noise |

## 3. Diagnosis
- **Situation:** owner_page_weakness | true_cannibalization | no_issue | insufficient_data
- **Severity:** low | medium | high
- **Evidence:** {{specific data points with source labels}}

## 4. Root causes
{{Numbered list of identified causes}}

## 5. Recommended actions
| Priority | Action | Category | Files to change | Confidence |
|----------|--------|----------|-----------------|------------|
| | | | | |

## 6. What should NOT be changed
{{Things that are working and should be preserved}}

## 7. Monitoring plan
{{What to check after changes, when to re-evaluate}}

## 8. Provenance
- **Generated:** {date}
- **Report mode:** {{mode}}
- **Data sources used:** {{list with freshness}}
- **Live API calls made:** none
- **Numeric confidence cap:** {{state if any}}
- **Known limitations:** {{list}}
""",
    },
    "page_seo_diagnosis": {
        "description": "Single-page SEO diagnostic (uses page_seo_diagnosis_rules_v1)",
        "filename": "{slug}_seo_diagnosis_{date}.md",
        "content": """# Page SEO Diagnosis — {topic}

**Date:** {date}
**Target page:** {{full URL}}
**Report mode:** preliminary | verified
**Live API calls:** none

**Analysis scope:**
- Requested page: {{exact URL or path from user request}}
- Requested channel: {{organic | all-channel | specific}}
- Requested period: {{what user asked for}}
- Requested question: {{user's original question}}
- Actual data window: {{GSC date range; GA4 date range}}
- Scope match: {{✅ period matches | ⚠️ mismatch — reason}}
- Primary sources used: {{e.g., GSC page-level snapshot, GA4 landing-page snapshot, page inventory, on-page metadata}}

**Excluded from this diagnosis:** historical paid campaigns, blended traffic explanations, competitor assumptions without evidence, cross-channel conversion attribution, live SERP verification (not performed).

---

## 1. Data sources used
| Source | Artifact path | Window | Freshness | Rows/records |
|--------|--------------|--------|-----------|-------------|
| | | | | |

> Note: GSC data covers [date range]. GA4 data covers [date range]. Findings are not cross-multiplied.

## 2. Search visibility snapshot
| Metric | Value | Source | Window | Scope |
|--------|-------|--------|--------|-------|
| Organic impressions | | GSC | | page-level |
| Organic clicks | | GSC | | page-level |
| Organic CTR | | GSC | | page-level |
| Avg position | | GSC | | page-level aggregate |
| Organic sessions | | GA4 | | landing page = {{path}} |
| Engagement rate | | GA4 | | landing page = {{path}} |

## 3. Query fit analysis
{{Top queries by impressions — with clicks, CTR, position per query, all labeled}}
{{Query-intent alignment}}
{{Missing queries}}

## 4. On-page signal review
- Title tag vs top query terms
- Meta description vs commercial intent queries
- H1/content alignment with query clusters
- Structured data presence and correctness
- Internal linking (inbound links from other site pages)

## 5. Supported interpretations
{{Tier 1-2 claims. Each references specific data from sections 2-4. Alternative explanations stated.}}

## 6. Hypotheses requiring verification
{{Tier 3 claims. Each states what would confirm/refute. MUST NOT appear in Do now actions.}}

## 7. Actions
| Bucket | Action | Evidence level | Why now | Risk / reversibility |
|--------|--------|---------------|---------|---------------------|
| Do now | | Tier 1-2 only | | |
| Monitor | | Tier 2-3 | | |
| Later / needs data | | Tier 3-4 | | |

## 8. What should NOT be changed
{{Things working correctly — with evidence}}

## 9. Provenance
- **Generated:** {date}
- **Report mode:** {{mode}}
- **Data sources used:** {{list with freshness and windows}}
- **Live API calls made:** none
- **Numeric confidence cap:** {{state if any}}
- **Known limitations:** {{list}}
""",
    },
    "enrichment_note": {
        "description": "Document DataForSEO or other external enrichment results",
        "filename": "{slug}_enrichment_note_{date}.md",
        "content": """# Enrichment Note — {topic}

**Date:** {date}
**Enrichment type:** serp_snapshot | ranked_keywords_gap | question_suggestions | other
**Report mode:** enrichment_only

---

## 1. What was run
| Workflow | Scope | Estimated cost | Actual cost | Source |
|----------|-------|---------------|-------------|--------|
| | | | | cost_log |

## 2. Key data points
{{5-15 most relevant data points from the enrichment, each with source label}}

## 3. How this enriches existing analysis
{{What existing reports/decisions this data supports or changes}}

## 4. What this does NOT tell us
{{Limitations of the enrichment data}}

## 5. Raw artifact locations
| Artifact | Path |
|----------|------|
| Raw API response | |
| Normalized output | |
| Report | |

## 6. Provenance
- **Generated:** {date}
- **Report mode:** enrichment_only
- **Data sources used:** {{list with freshness}}
- **Live API calls made:** {{list with cost}}
- **Numeric confidence cap:** medium (enrichment data only)
- **Known limitations:** {{list}}
""",
    },
}


def list_templates():
    """List available report templates."""
    print(f"Available report templates ({len(TEMPLATES)}):\n")
    for name, tmpl in TEMPLATES.items():
        print(f"  {name:30s}  {tmpl['description']}")


def generate_scaffold(template_name: str, topic: str, output: str | None, mode: str | None):
    """Generate a report scaffold and write it to a file."""
    if template_name not in TEMPLATES:
        print(f"ERROR: Unknown template '{template_name}'. Use --list to see available templates.", file=sys.stderr)
        sys.exit(1)

    tmpl = TEMPLATES[template_name]
    slug = slugify(topic)

    # Determine output path
    if output:
        out_path = Path(output)
    else:
        filename = tmpl["filename"].format(slug=slug, date=TODAY)
        REPORTS_DIR.mkdir(parents=True, exist_ok=True)
        out_path = REPORTS_DIR / filename

    # Generate content
    content = tmpl["content"].format(topic=topic, date=TODAY)

    # Replace report mode if specified
    if mode:
        content = content.replace(
            "**Report mode:** preliminary | verified | enrichment_only",
            f"**Report mode:** {mode}",
        ).replace(
            "**Report mode:** preliminary | verified",
            f"**Report mode:** {mode}",
        )

    # Write
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(content, encoding="utf-8")
    print(f"Scaffold created: {out_path}")
    print(f"Template: {template_name}")
    print(f"Topic: {topic}")
    if mode:
        print(f"Mode: {mode}")
    print(f"\nNext: fill in the {{...}} placeholders with actual data.")


def main():
    parser = argparse.ArgumentParser(
        description="Report scaffold generator for seo-ops",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="Examples:\n"
               '  python seo-ops/tools/init_report_scaffold.py decision_pack --topic "Rotterdam SEO"\n'
               '  python seo-ops/tools/init_report_scaffold.py enrichment_note --topic "SERP check" --mode enrichment_only\n'
               "  python seo-ops/tools/init_report_scaffold.py --list\n"
    )
    parser.add_argument("template", nargs="?", help="Template name")
    parser.add_argument("--topic", required=False, help="Report topic/title")
    parser.add_argument("--output", "-o", required=False, help="Output file path (default: reports/combined/)")
    parser.add_argument("--mode", required=False, choices=["preliminary", "verified", "enrichment_only"],
                        help="Report mode")
    parser.add_argument("--list", action="store_true", help="List available templates")
    args = parser.parse_args()

    if args.list:
        list_templates()
        return

    if not args.template:
        parser.print_help()
        sys.exit(1)

    if not args.topic:
        print("ERROR: --topic is required", file=sys.stderr)
        sys.exit(1)

    generate_scaffold(args.template, args.topic, args.output, args.mode)


if __name__ == "__main__":
    main()

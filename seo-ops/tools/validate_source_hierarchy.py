#!/usr/bin/env python3
"""
Source hierarchy validator for seo-ops markdown reports.

Checks that reports respect the source hierarchy defined in
contracts/source_hierarchy_rules_v1.md:
  Rank 1: Internal operational artifacts (GSC, GA4, Ads, keyword_master, page_inventory)
  Rank 2: Google official documentation
  Rank 3: Vendor official documentation
  Rank 4: External enrichment data (DataForSEO, SERP checks, competitor observation)
  Rank 5: Community knowledge (blogs, forums)

Key violations detected:
- External enrichment data presented as primary truth for BM Klus performance
- Google/platform behavior claims without official-source support section
- BM Klus performance claims without internal-artifact references
- Suspicious substitution language (DataForSEO position replacing GSC, etc.)
- Third-party blogs used as policy sources

Usage:
    python seo-ops/tools/validate_source_hierarchy.py seo-ops/reports/combined/some_report.md
    python seo-ops/tools/validate_source_hierarchy.py --report-type page_seo_diagnosis report.md
    python seo-ops/tools/validate_source_hierarchy.py --strict report.md
"""
import argparse
import re
import sys
from pathlib import Path

# ─── Finding categories ───
CAT_EXTERNAL_AS_PRIMARY = "external_source_as_primary"
CAT_MISSING_INTERNAL_EVIDENCE = "missing_primary_internal_evidence"
CAT_THIRD_PARTY_BLOG_AS_POLICY = "third_party_blog_as_policy_source"
CAT_SUBSTITUTION_LANGUAGE = "substitution_language"
CAT_MISSING_SOURCE_SECTION = "missing_source_section"

# ─── Heuristic patterns ───

# Patterns that suggest external enrichment is being used as primary truth
# for BM Klus-specific performance claims
EXTERNAL_AS_PRIMARY_PATTERNS = [
    (
        re.compile(
            r"(?:according to|based on|per)\s+(?:DataForSEO|Ahrefs|SEMrush|Moz|Majestic|SimilarWeb)",
            re.IGNORECASE,
        ),
        "External tool cited as authority for a claim — verify this is enrichment context, not primary evidence",
    ),
    (
        re.compile(
            r"(?:DataForSEO|Ahrefs|SEMrush|Moz)\s+(?:shows?|confirms?|proves?|indicates?|reveals?)\s+"
            r"(?:the page|the site|BM Klus|bm-klus|our|the domain)",
            re.IGNORECASE,
        ),
        "External tool used to make BM Klus-specific performance claim — internal artifacts should be primary",
    ),
    (
        re.compile(
            r"(?:SERP|serp)\s+(?:tools?|analysis|data|check)\s+(?:shows?|confirms?|proves?)\s+"
            r"(?:the page|BM Klus|bm-klus|that|our)",
            re.IGNORECASE,
        ),
        "SERP tool observation presented as confirmation of BM Klus performance",
    ),
    (
        re.compile(
            r"(?:competitor|concurrent|rivaal)\s+(?:data|analysis|tools?)\s+"
            r"(?:shows?|confirms?|proves?)",
            re.IGNORECASE,
        ),
        "Competitor data used as proof — competitor observations are Rank 4 enrichment, not primary evidence",
    ),
]

# Patterns suggesting substitution: external position data replacing GSC
SUBSTITUTION_PATTERNS = [
    (
        re.compile(
            r"(?:DataForSEO|Ahrefs|SEMrush)\s+(?:position|ranking|rank)\b",
            re.IGNORECASE,
        ),
        "External tool position data — should not substitute GSC position data for BM Klus pages",
    ),
    (
        re.compile(
            r"(?:estimated|external)\s+(?:traffic|visits|sessions)\s+(?:for|of|to)\s+"
            r"(?:BM Klus|bm-klus|the page|the site|our)",
            re.IGNORECASE,
        ),
        "Estimated traffic from external tool — use GA4/GSC data for BM Klus traffic claims",
    ),
]

# Third-party blogs cited as policy/authority
BLOG_AS_POLICY_PATTERNS = [
    (
        re.compile(
            r"(?:according to|per|as (?:stated|recommended|suggested) (?:by|in))\s+"
            r"(?:Search Engine (?:Journal|Land|Roundtable)|Moz (?:Blog|recommends)|"
            r"Ahrefs (?:Blog|recommends|suggests)|SEMrush (?:Blog|recommends)|"
            r"Backlinko|Neil Patel|HubSpot|Yoast|Screaming Frog (?:blog|recommends))",
            re.IGNORECASE,
        ),
        "Third-party blog/vendor blog cited as policy source — use Google official docs for system behavior",
    ),
    (
        re.compile(
            r"(?:a recent|a new|a \d{4})\s+(?:study|research|analysis|article|post)\s+"
            r"(?:by|from|on|in)\s+"
            r"(?:Search Engine|Moz|Ahrefs|SEMrush|Backlinko|Neil Patel|HubSpot)",
            re.IGNORECASE,
        ),
        "Third-party study cited as evidence — community knowledge is Rank 5, background context only",
    ),
]

# Internal artifact indicators — if none found, report may lack primary evidence
INTERNAL_ARTIFACT_INDICATORS = [
    re.compile(r"\bsource:\s*(?:gsc_api|ga4_api|google_ads_csv|ads_api)\b", re.IGNORECASE),
    re.compile(r"\b(?:GSC|Google Search Console)\b.*\b(?:clicks|impressions|position|CTR)\b", re.IGNORECASE),
    re.compile(r"\b(?:GA4|Google Analytics)\b.*\b(?:sessions|engagement|events?)\b", re.IGNORECASE),
    re.compile(r"\b(?:snapshots?|page_inventory|keyword_master)\b", re.IGNORECASE),
    re.compile(r"\bRank 1\b.*\binternal artifact\b", re.IGNORECASE),
    re.compile(r"\binternal[_ ]artifact\b", re.IGNORECASE),
]

# Source/evidence section indicators
SOURCE_SECTION_PATTERNS = [
    re.compile(r"^#+\s+.*(?:Sources?\s+used|Data\s+sources?\s+used|Primary\s+evidence)", re.MULTILINE | re.IGNORECASE),
    re.compile(r"^#+\s+.*(?:Source\s+class|Supporting\s+references)", re.MULTILINE | re.IGNORECASE),
    re.compile(r"\|\s*Source\s*\|\s*Class\s*\|", re.IGNORECASE),
    re.compile(r"\bsource:\s*\w+", re.IGNORECASE),
]

# BM Klus performance claim indicators — if present, internal evidence expected
BM_KLUS_PERFORMANCE_CLAIM_PATTERNS = [
    re.compile(
        r"(?:BM Klus|bm-klus|the page|the site|our (?:page|site|domain))\s+"
        r"(?:receives?|gets?|has|had|shows?|generated|achieved|lost|gained|ranks?|performs?)",
        re.IGNORECASE,
    ),
    re.compile(
        r"(?:traffic|clicks|impressions|sessions|conversions|position|ranking|CTR|CPC|spend)\s+"
        r"(?:for|of|on)\s+(?:BM Klus|bm-klus|the page|our)",
        re.IGNORECASE,
    ),
]


def _is_example_or_anti_pattern(content: str) -> bool:
    """Check if report is an example/anti-pattern file (not a production report)."""
    return bool(re.search(
        r"(?:ANTI-PATTERN|EXEMPLAR|deliberately flawed|do not use as a template|not a production report)",
        content[:500],
        re.IGNORECASE,
    ))


def _detect_report_type(content: str) -> str | None:
    """Detect report type from content."""
    type_patterns = {
        "page_seo_diagnosis": re.compile(r"^#\s+Page SEO Diagnosis", re.MULTILINE),
        "indexation_diagnosis": re.compile(r"^#\s+Indexation (?:Diagnosis|Debug)", re.MULTILINE),
        "decision_pack": re.compile(r"^#\s+Decision Pack", re.MULTILINE),
        "enrichment_note": re.compile(r"^#\s+Enrichment Note", re.MULTILINE),
        "ppc_review": re.compile(r"^#\s+PPC Review", re.MULTILINE),
        "verification_audit": re.compile(r"^#\s+Verification Audit", re.MULTILINE),
    }
    for type_name, pattern in type_patterns.items():
        if pattern.search(content):
            return type_name
    return None


def validate_source_hierarchy(filepath: Path, report_type: str | None = None,
                               strict: bool = False) -> tuple[str, list[dict]]:
    """
    Validate a markdown report for source hierarchy violations.

    Returns (overall_status, findings) where findings is a list of dicts:
        {"severity": "WARN"|"FAIL", "category": str, "message": str, "match": str}
    """
    if not filepath.exists():
        return "FAIL", [{"severity": "FAIL", "category": "file_error",
                         "message": f"File not found: {filepath}", "match": ""}]

    content = filepath.read_text(encoding="utf-8")
    findings = []

    # Skip example/anti-pattern files
    if _is_example_or_anti_pattern(content):
        return "SKIP", [{"severity": "INFO", "category": "skip",
                         "message": "File is an example/anti-pattern — skipped", "match": ""}]

    # Detect report type if not provided
    if not report_type:
        report_type = _detect_report_type(content)

    # ── Check 1: Source/evidence section presence ──
    has_source_section = any(p.search(content) for p in SOURCE_SECTION_PATTERNS)
    if not has_source_section:
        severity = "FAIL" if strict else "WARN"
        findings.append({
            "severity": severity,
            "category": CAT_MISSING_SOURCE_SECTION,
            "message": "No source/evidence section found (expected: 'Sources used', 'Data sources used', or source class labels)",
            "match": "",
        })

    # ── Check 2: External enrichment as primary truth ──
    for pattern, description in EXTERNAL_AS_PRIMARY_PATTERNS:
        matches = pattern.findall(content)
        if matches:
            severity = "FAIL" if strict else "WARN"
            findings.append({
                "severity": severity,
                "category": CAT_EXTERNAL_AS_PRIMARY,
                "message": description,
                "match": matches[0] if isinstance(matches[0], str) else str(matches[0]),
            })

    # ── Check 3: Substitution language ──
    for pattern, description in SUBSTITUTION_PATTERNS:
        matches = pattern.findall(content)
        if matches:
            findings.append({
                "severity": "WARN",
                "category": CAT_SUBSTITUTION_LANGUAGE,
                "message": description,
                "match": matches[0] if isinstance(matches[0], str) else str(matches[0]),
            })

    # ── Check 4: Third-party blogs as policy ──
    for pattern, description in BLOG_AS_POLICY_PATTERNS:
        matches = pattern.findall(content)
        if matches:
            findings.append({
                "severity": "FAIL",
                "category": CAT_THIRD_PARTY_BLOG_AS_POLICY,
                "message": description,
                "match": matches[0] if isinstance(matches[0], str) else str(matches[0]),
            })

    # ── Check 5: BM Klus performance claims without internal evidence ──
    has_bm_klus_claims = any(p.search(content) for p in BM_KLUS_PERFORMANCE_CLAIM_PATTERNS)
    has_internal_evidence = any(p.search(content) for p in INTERNAL_ARTIFACT_INDICATORS)

    if has_bm_klus_claims and not has_internal_evidence:
        severity = "FAIL" if (strict or report_type == "page_seo_diagnosis") else "WARN"
        findings.append({
            "severity": severity,
            "category": CAT_MISSING_INTERNAL_EVIDENCE,
            "message": "Report makes BM Klus performance claims but no internal artifact references found "
                       "(expected: GSC/GA4/Ads source labels, snapshot references, or 'internal artifact' class)",
            "match": "",
        })

    # ── Stricter rules for page_seo_diagnosis ──
    if report_type == "page_seo_diagnosis":
        # For page diagnosis, having a source class table is expected
        has_source_class_table = bool(re.search(
            r"\|\s*Source\s*\|\s*Class\s*\|", content, re.IGNORECASE
        ))
        if not has_source_class_table and not has_source_section:
            findings.append({
                "severity": "WARN",
                "category": CAT_MISSING_SOURCE_SECTION,
                "message": "Page SEO diagnosis should include a source class table (Source | Class | Role)",
                "match": "",
            })

    # Determine overall status
    overall = "PASS"
    for f in findings:
        if f["severity"] == "FAIL":
            overall = "FAIL"
            break
        if f["severity"] == "WARN" and overall == "PASS":
            overall = "WARN"

    if not findings:
        findings.append({
            "severity": "PASS",
            "category": "all_checks",
            "message": "All source hierarchy checks passed.",
            "match": "",
        })

    return overall, findings


def format_output(filepath: Path, overall: str, findings: list[dict]) -> str:
    """Format validation results for human-readable output."""
    lines = [
        f"{'=' * 60}",
        f"SOURCE HIERARCHY: {filepath.name}",
        f"{'=' * 60}",
        f"Result: {overall}",
    ]

    if overall != "PASS" or len(findings) > 1:
        lines.append(f"{'-' * 60}")
        for f in findings:
            prefix = f["severity"]
            msg = f["message"]
            category = f["category"]
            match_text = f"  >>  '{f['match']}'" if f["match"] else ""
            lines.append(f"  {prefix}  [{category}] {msg}{match_text}")

    # Summary counts
    fail_count = sum(1 for f in findings if f["severity"] == "FAIL")
    warn_count = sum(1 for f in findings if f["severity"] == "WARN")
    lines.append(f"{'-' * 60}")
    lines.append(f"  Summary: {fail_count} FAIL, {warn_count} WARN")
    lines.append(f"{'=' * 60}")
    lines.append("")
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(
        description="Source hierarchy validator for seo-ops markdown reports",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=(
            "Examples:\n"
            "  python seo-ops/tools/validate_source_hierarchy.py seo-ops/reports/combined/report.md\n"
            "  python seo-ops/tools/validate_source_hierarchy.py --strict report.md\n"
            "  python seo-ops/tools/validate_source_hierarchy.py --report-type page_seo_diagnosis report.md\n"
        ),
    )
    parser.add_argument("files", nargs="+", help="Markdown report file(s) to validate")
    parser.add_argument(
        "--report-type",
        choices=["page_seo_diagnosis", "indexation_diagnosis", "decision_pack",
                 "enrichment_note", "ppc_review", "verification_audit"],
        default=None,
        help="Override auto-detected report type",
    )
    parser.add_argument(
        "--strict",
        action="store_true",
        help="Stricter mode: WARNs become FAILs where applicable",
    )
    args = parser.parse_args()

    any_fail = False
    for filepath_str in args.files:
        filepath = Path(filepath_str)
        overall, findings = validate_source_hierarchy(filepath, args.report_type, args.strict)
        print(format_output(filepath, overall, findings))

        if overall == "FAIL":
            any_fail = True

    sys.exit(1 if any_fail else 0)


if __name__ == "__main__":
    main()

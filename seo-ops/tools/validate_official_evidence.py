#!/usr/bin/env python3
"""
Official evidence validator for seo-ops markdown reports.

Checks that reports making claims about Google/platform behavior include
adequate official-source support, per contracts/official_source_usage_rules_v1.md.

Key violations detected:
- Google behavior claims without visible official-source support section
- Anthropomorphic / overclaim phrasing ("Google thinks...", "Google penalized...")
- Strong platform claims without official reference context
- "Penalized" without evidence of actual penalty

Usage:
    python seo-ops/tools/validate_official_evidence.py seo-ops/reports/combined/some_report.md
    python seo-ops/tools/validate_official_evidence.py --report-type indexation_diagnosis report.md
    python seo-ops/tools/validate_official_evidence.py --strict report.md
"""
import argparse
import re
import sys
from pathlib import Path

# ─── Finding categories ───
CAT_ANTHROPOMORPHIC = "anthropomorphic_google_language"
CAT_MISSING_OFFICIAL_SUPPORT = "missing_official_support"
CAT_PENALTY_OVERCLAIM = "penalty_overclaim"
CAT_PLATFORM_CLAIM_UNSUPPORTED = "unsupported_platform_claim"

# ─── Anthropomorphic / mind-reading patterns ───
# These are almost always wrong regardless of context.
ANTHROPOMORPHIC_PATTERNS = [
    (
        re.compile(r"\bGoogle\s+(?:thinks|believes|feels|wants|likes|prefers|hates|dislikes)\b", re.IGNORECASE),
        "Google anthropomorphism — attributes human cognition to an algorithm",
    ),
    (
        re.compile(r"\bGoogle\s+does(?:n't| not)\s+understand\b", re.IGNORECASE),
        "Unfalsifiable claim — state which signals are misaligned instead",
    ),
    (
        re.compile(r"\bGoogle\s+(?:sees?|views?|considers?|treats?|regards?)\s+(?:this|the|it|that)\s+(?:page|site|content|as)\b", re.IGNORECASE),
        "Google mind-reading — internal algorithm evaluation is not observable",
    ),
    (
        re.compile(r"\bGoogle\s+(?:rewards?|punishes?|demotes?|promotes?|favou?rs?|suppresses?)\b", re.IGNORECASE),
        "Attributes intentional action to Google — use observable signal language instead",
    ),
    (
        re.compile(r"\bGoogle\s+deprioritiz(?:es|ed|ing)\b", re.IGNORECASE),
        "Internal prioritization claim — crawl/index priority is not visible to site operators",
    ),
    # Russian variants
    (
        re.compile(r"\bGoogle\s+(?:думает|считает|полагает|хочет|предпочитает)\b", re.IGNORECASE),
        "Google anthropomorphism (RU) — алгоритм не имеет когнитивных функций",
    ),
    (
        re.compile(r"\bGoogle\s+не\s+понимает\b", re.IGNORECASE),
        "Unfalsifiable claim (RU) — укажите, какие сигналы не совпадают",
    ),
    (
        re.compile(r"\bGoogle\s+(?:наказывает|штрафует|понижает|повышает|подавляет)\b", re.IGNORECASE),
        "Attributes intentional action to Google (RU)",
    ),
]

# ─── Penalty overclaim ───
PENALTY_PATTERNS = [
    (
        re.compile(r"\b(?:is |was |being |been |got |getting )?penali[sz]ed\b", re.IGNORECASE),
        "'Penalized' implies a manual or algorithmic action — verify via GSC manual actions report",
    ),
    (
        re.compile(r"\bpenalty\b(?!\s+(?:kick|area|box|shootout))", re.IGNORECASE),
        "'Penalty' implies a specific Google action — require Rank 1 evidence from GSC manual actions",
    ),
    (
        re.compile(r"\bduplicate\s+content\s+(?:penalty|filter|suppression)\b", re.IGNORECASE),
        "There is no 'duplicate content penalty' in Google's documentation",
    ),
    # Russian
    (
        re.compile(r"\bпенализ|штраф(?:ован|уе|ной|ные)\b", re.IGNORECASE),
        "'Penalized' (RU) — требуется проверка через GSC manual actions",
    ),
]

# ─── Google/platform behavior claim indicators ───
# These suggest the report is making claims about how Google/platform works
PLATFORM_CLAIM_INDICATORS = [
    re.compile(r"\bGoogle(?:'s)?\s+(?:algorithm|crawler|indexer|bot|ranking)\b", re.IGNORECASE),
    re.compile(r"\b(?:crawl|index(?:ing|ation)?|rank(?:ing)?)\s+(?:budget|priority|signal|factor)\b", re.IGNORECASE),
    re.compile(r"\bE-?E-?A-?T\b", re.IGNORECASE),
    re.compile(r"\b(?:helpful|core)\s+content\s+(?:system|update|guidelines?)\b", re.IGNORECASE),
    re.compile(r"\b(?:Quality\s+Rater|quality\s+rater)\b", re.IGNORECASE),
    re.compile(r"\b(?:match\s+type|broad\s+match|phrase\s+match|exact\s+match)\s+(?:behavior|logic|meaning|expansion)\b", re.IGNORECASE),
    re.compile(r"\bGA4\s+(?:attribution|model|processing|definition|calculation)\b", re.IGNORECASE),
    re.compile(r"\bGSC\s+(?:reporting|aggregation|limitation|delay|sampling)\b", re.IGNORECASE),
]

# ─── Official source support indicators ───
# Presence of these suggests report has official documentation backing
OFFICIAL_SUPPORT_INDICATORS = [
    re.compile(r"\b(?:Google\s+)?Search\s+Central\b", re.IGNORECASE),
    re.compile(r"\b(?:Google\s+)?(?:Ads|Analytics)\s+Help\b", re.IGNORECASE),
    re.compile(r"\bdevelopers\.google\.com\b", re.IGNORECASE),
    re.compile(r"\bsupport\.google\.com\b", re.IGNORECASE),
    re.compile(r"\bRank\s+2\b.*\bofficial\b", re.IGNORECASE),
    re.compile(r"\bgoogle[_ ]official\b", re.IGNORECASE),
    re.compile(r"\bofficial\s+(?:documentation|docs|source|reference)\b", re.IGNORECASE),
    re.compile(r"\b(?:per|as documented in|according to)\s+(?:Google's?\s+)?official\b", re.IGNORECASE),
    re.compile(r"\bAPI\s+(?:documentation|docs|reference|spec)\b", re.IGNORECASE),
]

# ─── Strong unsupported platform claims ───
# Phrases that make strong claims about how Google/platform systems work
STRONG_PLATFORM_CLAIMS = [
    (
        re.compile(
            r"\bGoogle(?:'s)?\s+(?:algorithm|system|crawler|indexer)\s+"
            r"(?:evaluates?|measures?|assesses?|calculates?|determines?|checks?)\b",
            re.IGNORECASE,
        ),
        "Claims specific algorithm behavior — needs official documentation support",
    ),
    (
        re.compile(
            r"\bcrawl\s+budget\s+(?:is (?:being )?wasted|problem|issue|concern|limit)\b",
            re.IGNORECASE,
        ),
        "Crawl budget concern — verify this applies at the site's scale (Google docs: not relevant for small sites)",
    ),
    (
        re.compile(
            r"\b(?:topical|domain|page)\s+authority\s+(?:is|was|has|lacks?|needs?|requires?|affects?)\b",
            re.IGNORECASE,
        ),
        "Authority claim — 'domain authority' / 'topical authority' are not Google-defined metrics",
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


def _in_quoted_or_negated_context(content: str, match: re.Match) -> bool:
    """
    Check if a match is inside a quoted/negated context (e.g., "Do NOT say 'Google thinks...'").
    Looks for negation markers or quote/example framing nearby.
    """
    start = max(0, match.start() - 120)
    context = content[start:match.start()].lower()
    negation_markers = [
        "do not say", "do not use", "do not write",
        "forbidden", "avoid", "never say", "never use", "never write",
        "not claimed", "not confirmed", "not stated",
        "anti-pattern", "bad pattern", "what is wrong",
        "violated:", "overclaim:",
    ]
    return any(marker in context for marker in negation_markers)


def validate_official_evidence(filepath: Path, report_type: str | None = None,
                                strict: bool = False) -> tuple[str, list[dict]]:
    """
    Validate a markdown report for official evidence compliance.

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

    # ── Check 1: Anthropomorphic language ──
    for pattern, description in ANTHROPOMORPHIC_PATTERNS:
        for m in pattern.finditer(content):
            if _in_quoted_or_negated_context(content, m):
                continue
            findings.append({
                "severity": "FAIL",
                "category": CAT_ANTHROPOMORPHIC,
                "message": description,
                "match": m.group(0),
            })
            break  # One finding per pattern is enough

    # ── Check 2: Penalty overclaim ──
    for pattern, description in PENALTY_PATTERNS:
        for m in pattern.finditer(content):
            if _in_quoted_or_negated_context(content, m):
                continue
            findings.append({
                "severity": "FAIL",
                "category": CAT_PENALTY_OVERCLAIM,
                "message": description,
                "match": m.group(0),
            })
            break

    # ── Check 3: Platform behavior claims without official support ──
    has_platform_claims = any(p.search(content) for p in PLATFORM_CLAIM_INDICATORS)
    has_official_support = any(p.search(content) for p in OFFICIAL_SUPPORT_INDICATORS)

    if has_platform_claims and not has_official_support:
        # For indexation diagnosis and page_seo_diagnosis, this is stricter
        severity = "FAIL" if (
            strict or report_type in ("indexation_diagnosis", "page_seo_diagnosis")
        ) else "WARN"
        findings.append({
            "severity": severity,
            "category": CAT_MISSING_OFFICIAL_SUPPORT,
            "message": "Report makes claims about Google/platform behavior but no official documentation "
                       "references found (expected: Search Central, API docs, Google Help, or 'official documentation' label)",
            "match": "",
        })

    # ── Check 4: Strong unsupported platform claims ──
    for pattern, description in STRONG_PLATFORM_CLAIMS:
        for m in pattern.finditer(content):
            if _in_quoted_or_negated_context(content, m):
                continue
            # If official support is present, downgrade to WARN
            severity = "WARN" if has_official_support else "FAIL"
            if strict:
                severity = "FAIL"
            findings.append({
                "severity": severity,
                "category": CAT_PLATFORM_CLAIM_UNSUPPORTED,
                "message": description,
                "match": m.group(0),
            })
            break

    # ── Check 5: Report type-specific strictness ──
    if report_type == "indexation_diagnosis":
        # Indexation diagnoses must reference URL Inspection as primary truth
        has_url_inspection_ref = bool(re.search(
            r"\bURL\s+Inspection\b", content, re.IGNORECASE
        ))
        if not has_url_inspection_ref:
            findings.append({
                "severity": "WARN",
                "category": CAT_MISSING_OFFICIAL_SUPPORT,
                "message": "Indexation diagnosis should reference URL Inspection API as primary source",
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
            "message": "All official evidence checks passed.",
            "match": "",
        })

    return overall, findings


def format_output(filepath: Path, overall: str, findings: list[dict]) -> str:
    """Format validation results for human-readable output."""
    lines = [
        f"{'=' * 60}",
        f"OFFICIAL EVIDENCE: {filepath.name}",
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
        description="Official evidence validator for seo-ops markdown reports",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=(
            "Examples:\n"
            "  python seo-ops/tools/validate_official_evidence.py seo-ops/reports/combined/report.md\n"
            "  python seo-ops/tools/validate_official_evidence.py --strict report.md\n"
            "  python seo-ops/tools/validate_official_evidence.py --report-type indexation_diagnosis report.md\n"
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
        overall, findings = validate_official_evidence(filepath, args.report_type, args.strict)
        print(format_output(filepath, overall, findings))

        if overall == "FAIL":
            any_fail = True

    sys.exit(1 if any_fail else 0)


if __name__ == "__main__":
    main()

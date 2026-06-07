#!/usr/bin/env python3
"""
Provenance validator for seo-ops markdown reports.

Checks basic hardening rules:
- Report mode present
- Provenance footer present
- No forbidden patterns (derived balance, unlabeled costs, etc.)
- Mandatory sections for known report types

Optional companion validators (run separately or via --with-all):
- validate_source_hierarchy.py — source hierarchy compliance
- validate_official_evidence.py — official-source support for platform claims

Usage:
    python seo-ops/tools/validate_report_provenance.py seo-ops/reports/combined/some_report.md
    python seo-ops/tools/validate_report_provenance.py seo-ops/reports/combined/*.md
    python seo-ops/tools/validate_report_provenance.py --with-all report.md
"""
import argparse
import re
import sys
from pathlib import Path

# ─── Forbidden patterns ───
# Each: (compiled regex, human-readable description, severity)
FORBIDDEN_PATTERNS = [
    (
        re.compile(r"balance\s+(?:is|=|:)\s*\$[\d.]+", re.IGNORECASE),
        "Derived balance claim without 'source: user_reported' or 'source: dashboard_verified'",
        "FAIL",
    ),
    (
        re.compile(r"money\.balance|money\.total", re.IGNORECASE),
        "Reference to DataForSEO money.balance/money.total fields (unreliable — not USD)",
        "FAIL",
    ),
    (
        re.compile(r"\$[\d.]+(?:\s+(?:spent|cost|spend|total))", re.IGNORECASE),
        "Cost claim — verify it has a provenance label (source: cost_log / estimated / etc.)",
        "WARN",
    ),
    (
        re.compile(r"(?:position|pos\.?)\s+[\d.]+(?!\s*\()", re.IGNORECASE),
        "Position claim without parenthetical source label",
        "WARN",
    ),
    (
        re.compile(r"\d+\s+(?:impressions|clicks|sessions|conversions)(?!\s*\()", re.IGNORECASE),
        "Metric claim without parenthetical source/period label",
        "WARN",
    ),
]

# ─── Page SEO diagnosis specific patterns ───
# Only applied when report type is page_seo_diagnosis
# Severity: FAIL for page diagnoses (these break report trust)
PAGE_DIAGNOSIS_FORBIDDEN = [
    # --- Overclaim / emotional / causal language ---
    (
        re.compile(r"\b(?:obvious cause|clearly because|catastrophic CTR)\b", re.IGNORECASE),
        "Overclaim: emotional/causal language without evidence tier qualification",
        "FAIL",
    ),
    (
        re.compile(r"\bGoogle does not understand\b", re.IGNORECASE),
        "Unfalsifiable claim -- state which signals are misaligned instead",
        "FAIL",
    ),
    (
        re.compile(r"\bpage converts well\b", re.IGNORECASE),
        "Engagement != conversion -- state exact metric and key event name",
        "FAIL",
    ),
    (
        re.compile(r"\bThe (?:reason|problem|cause) is\b", re.IGNORECASE),
        "Causal language -- verify this is tier 1-2, not a hypothesis presented as fact",
        "FAIL",
    ),
    # --- Speculative cause escalation ban ---
    (
        re.compile(r"\b(?:low |weak |poor )?domain authority\s+(?:causes?|explains?|means?|is the reason)\b", re.IGNORECASE),
        "Domain authority as stated cause -- hypothesis-only without DA comparison data",
        "FAIL",
    ),
    (
        re.compile(r"\b(?:lacks?|no|without|few) backlinks?\s+(?:therefore|so|which|causing|means?)\b", re.IGNORECASE),
        "Backlinks as stated cause -- no backlink data in current toolset",
        "FAIL",
    ),
    (
        re.compile(r"\bfeatured snippet\s+(?:steals?|takes?|captures?|reduces?)\b", re.IGNORECASE),
        "Featured snippet traffic steal as stated cause -- no SERP feature data available",
        "FAIL",
    ),
    (
        re.compile(r"\bengagement signals?\s+(?:hurt|help|boost|harm|affect)\s+rank", re.IGNORECASE),
        "GA4 engagement as ranking signal -- causation unproven",
        "FAIL",
    ),
    # --- Additional causal / overclaim language (EN) ---
    (
        re.compile(r"\b(?:the )?main cause\b", re.IGNORECASE),
        "Overclaim: 'main cause' implies singular root cause without elimination of alternatives",
        "FAIL",
    ),
    (
        re.compile(r"\b(?:the )?primary cause\b", re.IGNORECASE),
        "Overclaim: 'primary cause' implies singular root cause without elimination of alternatives",
        "FAIL",
    ),
    (
        re.compile(r"\bthis (?:tells us|shows us) that\b", re.IGNORECASE),
        "Presents interpretation as confirmed fact -- use 'suggests' or 'may indicate'",
        "FAIL",
    ),
    (
        re.compile(r"\bGoogle does not (?:equate|treat)\b", re.IGNORECASE),
        "Internal algorithm claim without evidence -- state observable signal mismatch instead",
        "FAIL",
    ),
    # --- Russian-language forbidden causal phrases ---
    (
        re.compile(r"главная причина|основная причина", re.IGNORECASE),
        "Overclaim (RU): 'главная/основная причина' -- use 'вероятный фактор', 'возможная причина'",
        "FAIL",
    ),
    (
        re.compile(r"очевидная причина|очевидно потому", re.IGNORECASE),
        "Overclaim (RU): 'очевидная причина' -- false certainty without evidence tier",
        "FAIL",
    ),
    (
        re.compile(r"это говорит о том, что|это показывает, что", re.IGNORECASE),
        "Overclaim (RU): presents interpretation as fact -- use 'вероятно указывает на', 'может свидетельствовать'",
        "FAIL",
    ),
    (
        re.compile(r"Google не понимает страницу", re.IGNORECASE),
        "Unfalsifiable claim (RU) -- state which signals are misaligned",
        "FAIL",
    ),
    (
        re.compile(r"Google не приравнивает", re.IGNORECASE),
        "Internal algorithm claim (RU) without evidence",
        "FAIL",
    ),
    (
        re.compile(r"страница хорошо конвертит", re.IGNORECASE),
        "Engagement != conversion (RU) -- state exact metric and key event",
        "FAIL",
    ),
    (
        re.compile(r"катастрофический CTR", re.IGNORECASE),
        "Emotional language (RU) -- state CTR value and position-band benchmark instead",
        "FAIL",
    ),
    (
        re.compile(r"Причина в том, что|Проблема в том, что", re.IGNORECASE),
        "Causal language (RU) -- verify this is tier 1-2, not hypothesis as fact",
        "FAIL",
    ),
    # --- Channel isolation violations ---
    (
        re.compile(r"\btotal sessions\b(?!.*\ball[- ]channel\b)", re.IGNORECASE),
        "Possible channel contamination: 'total sessions' without channel qualifier -- use 'organic sessions' for SEO diagnosis",
        "WARN",
    ),
    (
        re.compile(r"\b(?:all[- ]channel|blended|combined)\s+(?:traffic|sessions|clicks|CTR)\b", re.IGNORECASE),
        "All-channel / blended metric in page SEO diagnosis -- isolate organic channel",
        "FAIL_CONTEXT",  # special: skip if inside "Excluded from this diagnosis" line
    ),
]

# ─── Report type detection and required sections ───
REPORT_TYPES = {
    "decision_pack": {
        "detect": re.compile(r"^#\s+Decision Pack", re.MULTILINE),
        "required_sections": [
            "Objective",
            "Data sources used",
            "Current state",
            "Key findings",
            "Recommended actions",
            "What should NOT be changed",
            "Provenance",
        ],
    },
    "verification_audit": {
        "detect": re.compile(r"^#\s+Verification Audit", re.MULTILINE),
        "required_sections": [
            "Claims under review",
            "Verification method",
            "Verification results",
            "Provenance errors found",
            "Provenance",
        ],
    },
    "page_ownership_audit": {
        "detect": re.compile(r"^#\s+Page Ownership Audit", re.MULTILINE),
        "required_sections": [
            "Current SERP state",
            "Internal competition",
            "Diagnosis",
            "Recommended actions",
            "Provenance",
        ],
    },
    "enrichment_note": {
        "detect": re.compile(r"^#\s+Enrichment Note", re.MULTILINE),
        "required_sections": [
            "What was run",
            "Key data points",
            "Raw artifact locations",
            "Provenance",
        ],
    },
    "page_seo_diagnosis": {
        "detect": re.compile(r"^#\s+Page SEO Diagnosis", re.MULTILINE),
        "required_sections": [
            "Data sources used",
            "Search visibility snapshot",
            "Query fit analysis",
            "On-page signal review",
            "Supported interpretations",
            "Hypotheses requiring verification",
            "Actions",
            "Provenance",
        ],
    },
}


def validate_report(filepath: Path) -> tuple[str, list[str]]:
    """Validate a single report file. Returns (overall_status, issues)."""
    if not filepath.exists():
        return "FAIL", [f"File not found: {filepath}"]

    content = filepath.read_text(encoding="utf-8")
    lines = content.split("\n")
    issues = []
    overall = "PASS"

    # 1. Check report mode
    has_report_mode = bool(re.search(
        r"\*\*Report mode:\*\*\s*(preliminary|verified|enrichment_only)",
        content
    ))
    if not has_report_mode:
        issues.append("FAIL  Missing or invalid '**Report mode:**' field")
        overall = "FAIL"

    # 2. Check provenance footer
    has_provenance = bool(re.search(
        r"^##\s+\d*\.?\s*Provenance",
        content,
        re.MULTILINE
    ))
    if not has_provenance:
        issues.append("FAIL  Missing '## Provenance' section")
        overall = "FAIL"

    # 3. Check for 'Generated:' in provenance
    has_generated = bool(re.search(
        r"\*\*Generated:\*\*\s*\d{4}-\d{2}-\d{2}",
        content
    ))
    if not has_generated:
        issues.append("WARN  Missing '**Generated:** YYYY-MM-DD' in provenance")
        if overall == "PASS":
            overall = "WARN"

    # 4. Check for 'Live API calls' disclosure
    has_api_disclosure = bool(re.search(
        r"\*\*Live API calls",
        content
    ))
    if not has_api_disclosure:
        issues.append("WARN  Missing '**Live API calls**' disclosure in provenance")
        if overall == "PASS":
            overall = "WARN"

    # 5. Forbidden patterns
    for pattern, description, severity in FORBIDDEN_PATTERNS:
        matches = pattern.findall(content)
        if matches:
            # For WARN-level patterns, check if they have a source label nearby
            if severity == "WARN":
                # Heuristic: if "source:" appears within 100 chars, probably labeled
                for match in matches:
                    pos = content.find(match)
                    context = content[max(0, pos - 50):pos + len(match) + 100]
                    if "source:" not in context.lower():
                        issues.append(f"{severity}  {description}: '{match}'")
                        if overall == "PASS":
                            overall = severity
                        break
            else:
                example = matches[0] if isinstance(matches[0], str) else matches[0]
                issues.append(f"{severity}  {description}: '{example}'")
                if severity == "FAIL":
                    overall = "FAIL"
                elif overall == "PASS":
                    overall = severity

    # 6. Detect report type and check required sections
    detected_type = None
    for type_name, type_info in REPORT_TYPES.items():
        if type_info["detect"].search(content):
            detected_type = type_name
            break

    if detected_type:
        # Extract all section headings (## N. Title or ## Title)
        section_headings = re.findall(r"^##\s+(?:\d+\.\s+)?(.+)", content, re.MULTILINE)
        section_headings_lower = [h.strip().lower() for h in section_headings]

        for required in REPORT_TYPES[detected_type]["required_sections"]:
            found = any(required.lower() in h for h in section_headings_lower)
            if not found:
                issues.append(f"WARN  Missing required section for {detected_type}: '{required}'")
                if overall == "PASS":
                    overall = "WARN"

    # 7. Page SEO diagnosis-specific checks
    if detected_type == "page_seo_diagnosis":
        # 7a. Check for scope binding block (FAIL if missing)
        has_scope_binding = bool(re.search(
            r"\*\*Analysis scope:\*\*",
            content
        ))
        if not has_scope_binding:
            issues.append("FAIL  Page SEO diagnosis missing '**Analysis scope:**' block (request binding)")
            overall = "FAIL"
        else:
            # 7a-i. Check scope binding has required fields
            scope_fields = ["Requested page:", "Requested channel:", "Requested period:",
                            "Requested question:", "Actual data window:", "Primary sources used:"]
            for field in scope_fields:
                if field not in content:
                    issues.append(f"FAIL  Scope binding block missing '{field}'")
                    overall = "FAIL"

            # 7a-ii. Check for period mismatch disclosure
            has_scope_match = bool(re.search(r"Scope match:", content))
            if not has_scope_match:
                issues.append("FAIL  Scope binding block missing 'Scope match:' field (period mismatch disclosure)")
                overall = "FAIL"
            else:
                # If mismatch is flagged, check it has justification
                mismatch_match = re.search(r"Scope match:.*⚠️.*mismatch", content)
                if mismatch_match:
                    # Check there's text after "mismatch" (justification)
                    mismatch_line = re.search(r"Scope match:.*⚠️.*mismatch\s*[—–-]\s*(\S+)", content)
                    if not mismatch_line:
                        issues.append("FAIL  Period mismatch detected but no justification provided")
                        overall = "FAIL"

        # 7b. Check for excluded-context block (FAIL — mandatory per contract)
        has_excluded = bool(re.search(
            r"\*\*Excluded from this diagnosis:\*\*",
            content
        ))
        if not has_excluded:
            issues.append("FAIL  Page SEO diagnosis missing '**Excluded from this diagnosis:**' block")
            overall = "FAIL"
        else:
            # Check that default exclusion items are present
            excl_text = ""
            excl_m = re.search(r"\*\*Excluded from this diagnosis:\*\*(.*?)(?:\n\n|\n##|\Z)", content, re.DOTALL)
            if excl_m:
                excl_text = excl_m.group(1).lower()
            default_exclusions = ["paid campaign", "blended", "competitor", "conversion attribution", "serp verification"]
            for excl_item in default_exclusions:
                if excl_item not in excl_text:
                    issues.append(f"WARN  Excluded-context block may be missing default item: '{excl_item}'")
                    if overall == "PASS":
                        overall = "WARN"

        # 7c. Check metric table has source+window+scope columns
        has_metric_table = bool(re.search(
            r"\|\s*Source\s*\|\s*Window\s*\|\s*Scope\s*\|",
            content
        ))
        if not has_metric_table:
            issues.append("FAIL  Page SEO diagnosis missing metric table with Source | Window | Scope columns")
            overall = "FAIL"

        # 7d. Check that hypotheses section exists (FAIL for page_seo_diagnosis, not just WARN)
        has_hypotheses_section = bool(re.search(
            r"^##\s+\d+\.\s+Hypotheses requiring verification",
            content, re.MULTILINE
        ))
        if not has_hypotheses_section:
            issues.append("FAIL  Page SEO diagnosis missing mandatory '## Hypotheses requiring verification' section")
            overall = "FAIL"

        # 7e. Page-diagnosis-specific forbidden patterns
        # Precompute excluded-context lines for FAIL_CONTEXT filtering
        excluded_line = ""
        excl_match = re.search(r"\*\*Excluded from this diagnosis:\*\*.*", content)
        if excl_match:
            excluded_line = excl_match.group(0).lower()

        for pattern, description, severity in PAGE_DIAGNOSIS_FORBIDDEN:
            matches = list(pattern.finditer(content))
            if matches:
                # For FAIL_CONTEXT: skip matches that fall inside the excluded-context line
                if severity == "FAIL_CONTEXT":
                    real_matches = []
                    for m in matches:
                        matched_text = m.group(0).lower()
                        if matched_text not in excluded_line:
                            real_matches.append(m)
                    if not real_matches:
                        continue
                    example = real_matches[0].group(0)
                    effective_severity = "FAIL"
                else:
                    example = matches[0].group(0)
                    effective_severity = severity

                issues.append(f"{effective_severity}  [page_diag] {description}: '{example}'")
                if effective_severity == "FAIL":
                    overall = "FAIL"
                elif overall == "PASS":
                    overall = effective_severity

        # 7f. Contradiction guard — lightweight text-vs-metric checks
        # Check: title/summary says "0 clicks" or "no traffic" but metrics show >0
        title_line = lines[0] if lines else ""
        # Gather first ~30 lines as "header/summary zone"
        summary_zone = "\n".join(lines[:30]).lower()

        # Extract organic clicks value from metric table
        clicks_match = re.search(
            r"\|\s*Organic clicks\s*\|\s*(\d+)", content, re.IGNORECASE
        )
        if clicks_match:
            clicks_val = int(clicks_match.group(1))
            if clicks_val > 0:
                # Check for zero/no-traffic language in summary
                zero_phrases = [
                    r"\b0\s+clicks\b", r"\bno clicks\b", r"\bzero clicks\b",
                    r"\bno organic traffic\b", r"\bdoes not get.*traffic\b",
                    r"\bgets no.*traffic\b", r"\bno seo traffic\b",
                ]
                for phrase in zero_phrases:
                    if re.search(phrase, summary_zone, re.IGNORECASE):
                        issues.append(
                            f"FAIL  [contradiction] Summary says zero/no traffic but metric table shows "
                            f"organic clicks = {clicks_val}"
                        )
                        overall = "FAIL"
                        break

        # Check: summary says "growing"/"improving" but delta is negative
        sessions_match = re.search(
            r"\|\s*Organic sessions\s*\|\s*(\d+)", content, re.IGNORECASE
        )
        delta_negative = re.search(
            r"[Δδ]\s*(?:clicks|sessions|impressions)\s*[:=]\s*[−–-]\s*\d+", content, re.IGNORECASE
        )
        if delta_negative:
            growth_phrases = [r"\bgrowing\b", r"\bimproving\b", r"\bupward trend\b", r"\bpositive trend\b"]
            for phrase in growth_phrases:
                if re.search(phrase, summary_zone, re.IGNORECASE):
                    issues.append(
                        "FAIL  [contradiction] Summary says growing/improving but delta shows decline"
                    )
                    overall = "FAIL"
                    break

    if not issues:
        issues.append("All checks passed.")

    return overall, issues


def run_companion_validator(script_name: str, files: list[str]) -> int:
    """Run a companion validator script. Returns its exit code."""
    import subprocess
    script_path = Path(__file__).parent / script_name
    if not script_path.exists():
        print(f"  [skip] Companion validator not found: {script_path}")
        return 0
    result = subprocess.run(
        [sys.executable, str(script_path)] + files,
        capture_output=False,
    )
    return result.returncode


def main():
    parser = argparse.ArgumentParser(
        description="Provenance validator for seo-ops markdown reports",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="Examples:\n"
               "  python seo-ops/tools/validate_report_provenance.py seo-ops/reports/combined/report.md\n"
               "  python seo-ops/tools/validate_report_provenance.py seo-ops/reports/combined/*.md\n"
               "  python seo-ops/tools/validate_report_provenance.py --with-all report.md\n"
    )
    parser.add_argument("files", nargs="+", help="Markdown report file(s) to validate")
    parser.add_argument(
        "--with-source-hierarchy",
        action="store_true",
        help="Also run source hierarchy validator (validate_source_hierarchy.py)",
    )
    parser.add_argument(
        "--with-official-evidence",
        action="store_true",
        help="Also run official evidence validator (validate_official_evidence.py)",
    )
    parser.add_argument(
        "--with-all",
        action="store_true",
        help="Run all companion validators (source hierarchy + official evidence)",
    )
    args = parser.parse_args()

    any_fail = False
    for filepath_str in args.files:
        filepath = Path(filepath_str)
        overall, issues = validate_report(filepath)

        print(f"{'='*60}")
        print(f"VALIDATE: {filepath.name}")
        print(f"{'='*60}")
        print(f"Result: {overall}")
        if len(args.files) > 1 or overall != "PASS":
            print(f"{'-'*60}")
            for issue in issues:
                print(f"  {issue}")
        print(f"{'='*60}")
        print()

        if overall == "FAIL":
            any_fail = True

    # Run companion validators if requested
    run_hierarchy = args.with_source_hierarchy or args.with_all
    run_evidence = args.with_official_evidence or args.with_all

    if run_hierarchy:
        print(f"\n{'-'*60}")
        print("Running companion: validate_source_hierarchy.py")
        print(f"{'-'*60}\n")
        rc = run_companion_validator("validate_source_hierarchy.py", args.files)
        if rc != 0:
            any_fail = True

    if run_evidence:
        print(f"\n{'-'*60}")
        print("Running companion: validate_official_evidence.py")
        print(f"{'-'*60}\n")
        rc = run_companion_validator("validate_official_evidence.py", args.files)
        if rc != 0:
            any_fail = True

    # Suggest companion validators if not run
    if not run_hierarchy and not run_evidence:
        print("Tip: Run companion validators for deeper checks:")
        print("  python seo-ops/tools/validate_source_hierarchy.py <report>")
        print("  python seo-ops/tools/validate_official_evidence.py <report>")
        print("  Or use --with-all to run all validators together.")
        print()

    sys.exit(1 if any_fail else 0)


if __name__ == "__main__":
    main()

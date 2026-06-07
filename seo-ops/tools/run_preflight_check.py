#!/usr/bin/env python3
"""
Preflight checker for seo-ops workflows.

Reads config/preflight_rules_v1.yaml and checks:
- Required artifacts present
- Artifact freshness
- Required credentials
- Warnings to surface

Usage:
    python seo-ops/tools/run_preflight_check.py ppc_review_v1
    python seo-ops/tools/run_preflight_check.py page_audit_v1
    python seo-ops/tools/run_preflight_check.py --list
"""
import argparse
import glob
import os
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

# --- Locate project root and config ---
SCRIPT_DIR = Path(__file__).resolve().parent
SEO_OPS_DIR = SCRIPT_DIR.parent
PROJECT_ROOT = SEO_OPS_DIR.parent
CONFIG_PATH = SEO_OPS_DIR / "config" / "preflight_rules_v1.yaml"


def load_yaml_simple(path: Path) -> dict:
    """Minimal YAML loader — handles the subset used in preflight_rules_v1.yaml.
    Falls back to PyYAML if available, otherwise uses a basic parser."""
    try:
        import yaml
        with open(path, "r", encoding="utf-8") as f:
            return yaml.safe_load(f)
    except ImportError:
        pass

    # Fallback: very simple YAML subset parser for our config structure.
    # This handles: mappings, lists, strings, numbers, booleans, null.
    import json
    with open(path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    # Strip comments and blank lines, convert to JSON-ish structure
    # This is intentionally simple and only works for our specific YAML format.
    clean = []
    for line in lines:
        stripped = line.split(" #")[0].rstrip()
        if stripped.startswith("#") or not stripped:
            continue
        clean.append(line.rstrip("\n"))

    # Use PyYAML-like approach: just exec a simple state machine
    # For robustness, we require PyYAML.
    print("ERROR: PyYAML is required. Install with: pip install pyyaml", file=sys.stderr)
    sys.exit(2)


def file_age_days(filepath: str) -> float | None:
    """Return age of file in days, or None if file doesn't exist."""
    # Resolve path relative to project root
    p = Path(filepath)
    if not p.is_absolute():
        p = PROJECT_ROOT / filepath
    if not p.exists():
        return None
    mtime = p.stat().st_mtime
    age_seconds = time.time() - mtime
    return age_seconds / 86400


def resolve_glob(pattern: str) -> list[str]:
    """Resolve a glob pattern, trying both absolute and project-relative."""
    p = Path(pattern)
    if not p.is_absolute():
        p = PROJECT_ROOT / pattern
    matches = glob.glob(str(p))
    return matches


def check_artifact_exists(artifact_path: str) -> tuple[bool, str]:
    """Check if artifact exists. Supports glob patterns."""
    if "*" in artifact_path:
        matches = resolve_glob(artifact_path)
        if matches:
            return True, f"found ({len(matches)} files)"
        return False, "MISSING (no files match pattern)"

    p = Path(artifact_path)
    if not p.is_absolute():
        p = PROJECT_ROOT / artifact_path
    if p.exists():
        age = file_age_days(artifact_path)
        age_str = f"{age:.1f}d old" if age is not None else ""
        return True, f"present ({age_str})"
    return False, "MISSING"


def check_freshness(config: dict, artifact_name: str) -> tuple[str, str]:
    """Check freshness of a named artifact group. Returns (status, message)."""
    freshness_rules = config.get("artifact_freshness", {})
    rule = freshness_rules.get(artifact_name)
    if not rule:
        return "PASS", f"No freshness rule for '{artifact_name}'"

    stale_days = rule.get("stale_after_days", 7)
    paths = rule.get("paths", [])
    blocking = rule.get("blocking", False)
    warning = rule.get("warning", "Artifact may be stale.")

    oldest_age = 0
    any_missing = False
    for p in paths:
        age = file_age_days(p)
        if age is None:
            any_missing = True
            continue
        oldest_age = max(oldest_age, age)

    if any_missing:
        status = "BLOCK" if blocking else "WARN"
        return status, f"Some files missing for '{artifact_name}'"

    if oldest_age > stale_days:
        status = "BLOCK" if blocking else "WARN"
        return status, f"{warning} (oldest: {oldest_age:.1f}d, limit: {stale_days}d)"

    return "PASS", f"Fresh ({oldest_age:.1f}d old, limit: {stale_days}d)"


def run_preflight(workflow_name: str, config: dict) -> tuple[str, list[str]]:
    """Run preflight checks for a workflow. Returns (overall_status, issues_list)."""
    workflow_rules = config.get("workflow_preflight", {})
    if workflow_name not in workflow_rules:
        return "BLOCK", [f"Unknown workflow: '{workflow_name}'. Not in preflight_rules_v1.yaml."]

    rule = workflow_rules[workflow_name]
    issues = []
    overall = "PASS"

    # 1. Check required artifacts
    for artifact_path in rule.get("required_artifacts", []):
        exists, msg = check_artifact_exists(artifact_path)
        if not exists:
            issues.append(f"BLOCK  artifact {artifact_path} — {msg}")
            overall = "BLOCK"

    # 2. Check freshness
    for freshness_name in rule.get("freshness_checks", []):
        status, msg = check_freshness(config, freshness_name)
        if status == "BLOCK":
            issues.append(f"BLOCK  freshness {freshness_name} — {msg}")
            overall = "BLOCK"
        elif status == "WARN":
            issues.append(f"WARN   freshness {freshness_name} — {msg}")
            if overall == "PASS":
                overall = "WARN"

    # 3. Check credentials (existence check only)
    for cred in rule.get("required_credentials", []):
        # Extract path portion before parenthetical note
        cred_path = cred.split("(")[0].strip()
        p = Path(cred_path)
        if not p.is_absolute():
            p = PROJECT_ROOT / cred_path
        if not p.exists():
            issues.append(f"WARN   credential {cred} — path not found")
            if overall == "PASS":
                overall = "WARN"

    # 4. Live API warning
    if rule.get("requires_live_api", False):
        issues.append(f"WARN   requires_live_api — user confirmation needed before running")
        if overall == "PASS":
            overall = "WARN"

    # 5. Budget sensitive warning
    if rule.get("budget_sensitive", False):
        issues.append(f"WARN   budget_sensitive — check cost estimate before running")

    # 6. Static warnings
    for w in rule.get("warnings", []):
        issues.append(f"WARN   {w}")

    # 6b. Check preferred recent artifacts (informational — not blocking)
    for artifact_path in rule.get("preferred_recent_artifacts", []):
        exists, msg = check_artifact_exists(artifact_path)
        if exists:
            issues.append(f"INFO   recent artifact {artifact_path} — {msg}")
        else:
            issues.append(f"INFO   recent artifact {artifact_path} — MISSING (28d snapshot not yet built)")

    # 6c. Check preferred recent freshness
    for freshness_name in rule.get("preferred_recent_freshness_checks", []):
        status, msg = check_freshness(config, freshness_name)
        if status == "PASS":
            issues.append(f"INFO   recent freshness {freshness_name} — {msg}")
        else:
            issues.append(f"INFO   recent freshness {freshness_name} — {msg}")

    # 7. Global rules
    for global_rule in config.get("global_rules", []):
        rid = global_rule.get("id", "")
        if rid == "post_cutover_check":
            cutover = global_rule.get("cutover_date", "")
            if cutover:
                try:
                    cutover_dt = datetime.strptime(cutover, "%Y-%m-%d").replace(tzinfo=timezone.utc)
                    months_needed = global_rule.get("months_until_stable", 6)
                    now = datetime.now(timezone.utc)
                    months_elapsed = (now.year - cutover_dt.year) * 12 + (now.month - cutover_dt.month)
                    if months_elapsed < months_needed:
                        issues.append(f"WARN   post_cutover — site is {months_elapsed}m post-cutover (<{months_needed}m). Report mode: preliminary.")
                except ValueError:
                    pass

        elif rid == "dataforseo_dry_run_first":
            if rule.get("requires_live_api") and "dataforseo" in workflow_name:
                issues.append(f"WARN   Always run --dry-run first for DataForSEO workflows")

    if not issues:
        issues.append("All checks passed.")

    return overall, issues


def list_workflows(config: dict):
    """List all workflows with preflight rules."""
    workflow_rules = config.get("workflow_preflight", {})
    print(f"Available workflows ({len(workflow_rules)}):\n")
    for name in sorted(workflow_rules.keys()):
        rule = workflow_rules[name]
        n_artifacts = len(rule.get("required_artifacts", []))
        live = "LIVE API" if rule.get("requires_live_api") else "offline"
        print(f"  {name:45s}  artifacts: {n_artifacts:2d}  {live}")


def main():
    parser = argparse.ArgumentParser(
        description="Preflight checker for seo-ops workflows",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="Examples:\n"
               "  python seo-ops/tools/run_preflight_check.py ppc_review_v1\n"
               "  python seo-ops/tools/run_preflight_check.py --list\n"
    )
    parser.add_argument("workflow", nargs="?", help="Workflow name to check")
    parser.add_argument("--list", action="store_true", help="List all available workflows")
    args = parser.parse_args()

    if not CONFIG_PATH.exists():
        print(f"ERROR: Config not found at {CONFIG_PATH}", file=sys.stderr)
        sys.exit(2)

    config = load_yaml_simple(CONFIG_PATH)

    if args.list:
        list_workflows(config)
        return

    if not args.workflow:
        parser.print_help()
        sys.exit(1)

    overall, issues = run_preflight(args.workflow, config)

    # Output
    print(f"{'='*60}")
    print(f"PREFLIGHT CHECK: {args.workflow}")
    print(f"{'='*60}")
    print(f"Result: {overall}")
    print(f"{'-'*60}")
    for issue in issues:
        print(f"  {issue}")
    print(f"{'='*60}")

    if overall == "BLOCK":
        sys.exit(1)
    else:
        sys.exit(0)


if __name__ == "__main__":
    main()

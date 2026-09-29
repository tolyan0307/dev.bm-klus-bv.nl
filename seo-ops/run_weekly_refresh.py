"""
run_weekly_refresh.py — the weekly data collection (skill seo-refresh) in one command.

Steps, in order: page inventory -> combined GSC + GA4 snapshot (28 d) ->
GSC query x page CSV (90 / 28 d) -> GA4 landing pages (90 / 28 d) ->
rule-based analysis report -> WP lead log (90 / 28 d) -> lead reconciliation
(56 d) -> Google Ads (28 d). Each step is the standalone script, run as a
subprocess with integrations/.env.local loaded and UTF-8 output forced; its
output is printed as is.

If GSC needs a browser login (token expired), the remaining GSC steps are
skipped: the owner has to run integrations/test_gsc_access.py first.
Exit code: 0 all steps OK, 2 GSC login needed, 1 another step failed.

Usage (from seo-ops/):
    integrations/.venv/Scripts/python.exe run_weekly_refresh.py
"""

from __future__ import annotations

import os
import subprocess
import sys
import time
from pathlib import Path

SEO_OPS = Path(__file__).resolve().parent
sys.path.insert(0, str(SEO_OPS / "integrations"))
from google_clients.config import load_env_local  # noqa: E402

# Message of google_clients.definitions.require_interactive_auth
GSC_LOGIN_MARKER = "needs a browser login"

# (label, script, args, needs GSC)
STEPS: list[tuple[str, str, list[str], bool]] = [
    ("Page inventory", "analyzers/pages/build_page_inventory.py", [], False),
    ("Combined snapshot GSC + GA4, 28d", "integrations/run_combined_snapshot.py", [], True),
    ("GSC query x page, 90d", "analyzers/seo/build_gsc_query_page_snapshot.py", [], True),
    ("GSC query x page, 28d", "analyzers/seo/build_gsc_query_page_snapshot.py", ["--days", "28"], True),
    ("GA4 landing pages, 90d", "analyzers/pages/build_ga4_landing_page_snapshot.py", [], False),
    ("GA4 landing pages, 28d", "analyzers/pages/build_ga4_landing_page_snapshot.py", ["--days", "28"], False),
    ("Rules report", "analysis/run_analysis_report.py", [], False),
    ("WP lead log, 90d", "analyzers/pages/build_wp_snapshot.py", [], False),
    ("WP lead log, 28d", "analyzers/pages/build_wp_snapshot.py", ["--days", "28"], False),
    ("Lead reconciliation, 56d", "analyzers/pages/run_lead_reconciliation_v1.py", ["--days", "56"], False),
    ("Google Ads, 28d", "integrations/google_ads/campaign_daily_loader.py", [], False),
]


def main() -> int:
    # Step output contains non-cp1251 characters (arrows, "£" in queries)
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    load_env_local()
    env = {**os.environ, "PYTHONIOENCODING": "utf-8", "PYTHONUTF8": "1"}

    results: list[tuple[str, str, str]] = []  # (status, label, detail)
    gsc_login_needed = False

    for label, script, args, needs_gsc in STEPS:
        print(f"\n{'#' * 70}\n# {label}: {script} {' '.join(args)}\n{'#' * 70}", flush=True)
        if needs_gsc and gsc_login_needed:
            print("SKIPPED: GSC login needed (see above)", flush=True)
            results.append(("SKIPPED", label, "GSC login needed"))
            continue

        started = time.monotonic()
        proc = subprocess.run(
            [sys.executable, script, *args],
            cwd=SEO_OPS,
            env=env,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
        )
        elapsed = f"{time.monotonic() - started:.0f}s"
        print(proc.stdout, end="", flush=True)
        if proc.stderr:
            print(proc.stderr, end="", file=sys.stderr, flush=True)

        if needs_gsc and GSC_LOGIN_MARKER in proc.stdout + proc.stderr:
            gsc_login_needed = True
        results.append(("OK" if proc.returncode == 0 else "FAILED", label,
                        elapsed if proc.returncode == 0 else f"exit {proc.returncode}, {elapsed}"))

    print(f"\n{'=' * 70}\n  Weekly refresh summary\n{'=' * 70}")
    for status, label, detail in results:
        print(f"  {status:<8} {label:<36} {detail}")
    if gsc_login_needed:
        print("\n  GSC token expired: with the owner present run "
              "integrations/.venv/Scripts/python.exe integrations/test_gsc_access.py, then rerun.")
    print("=" * 70)

    if gsc_login_needed:
        return 2
    return 1 if any(status == "FAILED" for status, _, _ in results) else 0


if __name__ == "__main__":
    sys.exit(main())

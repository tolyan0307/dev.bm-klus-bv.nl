"""
Smoke test: DataForSEO connectivity & auth.

Calls GET /v3/appendix/user_data — a safe, read-only, free endpoint.

Usage (from repo root):
    .venv/Scripts/python -m dataforseo.smoke_test_user_data

Outputs:
    - Console summary (no secrets)
    - Raw JSON  → seo-ops/snapshots/raw/dataforseo/dataforseo_user_data_v1.json
    - Report    → seo-ops/reports/keywords/dataforseo_smoke_test_v1.md
"""

from __future__ import annotations

import json
import sys
from datetime import datetime, timezone
from pathlib import Path

# Allow running as  python -m dataforseo.smoke_test_user_data  from integrations/
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from dataforseo.client import DataForSEOClient

# Output paths (relative to repo seo-ops/)
SEO_OPS = Path(__file__).resolve().parents[2]
SNAPSHOT_DIR = SEO_OPS / "snapshots" / "raw" / "dataforseo"
REPORT_PATH = SEO_OPS / "reports" / "keywords" / "dataforseo_smoke_test_v1.md"


def run() -> bool:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    print(f"[{now}] DataForSEO smoke test - GET /v3/appendix/user_data")

    client = DataForSEOClient()

    try:
        data = client.user_data()
    except Exception as exc:
        _write_report(success=False, ts=now, error=str(exc))
        print(f"FAIL: {exc}", file=sys.stderr)
        return False

    # ---------- inspect response ----------
    status_code = data.get("status_code")
    status_message = data.get("status_message")
    tasks = data.get("tasks", [])
    task_result = tasks[0].get("result", [{}])[0] if tasks else {}

    login = task_result.get("login", "N/A")
    money = task_result.get("money", {})
    # WARNING: money.balance and money.total from user_data are NOT USD amounts.
    # They appear to be access-level flags or counts, not dollar values.
    # Do NOT use these to derive account balance in reports.
    # For actual balance, check the DataForSEO dashboard directly.
    raw_balance = money.get("balance", "N/A")
    currency = money.get("currency", "N/A")
    balance = f"{raw_balance} (UNVERIFIED — see dashboard for actual USD balance)"

    # ---------- save raw snapshot ----------
    SNAPSHOT_DIR.mkdir(parents=True, exist_ok=True)
    snapshot_path = SNAPSHOT_DIR / "dataforseo_user_data_v1.json"
    snapshot_path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"  Snapshot saved -> {snapshot_path.relative_to(SEO_OPS)}")

    # ---------- console summary ----------
    success = status_code == 20000
    print(f"  Status:  {status_code} — {status_message}")
    print(f"  Login:   {login}")
    print(f"  Balance: {balance} {currency}")
    print(f"  Result:  {'OK' if success else 'UNEXPECTED'}")

    # ---------- markdown report ----------
    _write_report(
        success=success,
        ts=now,
        status_code=status_code,
        status_message=status_message,
        login=login,
        balance=balance,
        currency=currency,
        task_result=task_result,
        snapshot_path=str(snapshot_path.relative_to(SEO_OPS)),
    )

    return success


def _write_report(
    *,
    success: bool,
    ts: str,
    error: str | None = None,
    status_code: int | None = None,
    status_message: str | None = None,
    login: str = "N/A",
    balance: str | float = "N/A",
    currency: str = "N/A",
    task_result: dict | None = None,
    snapshot_path: str = "N/A",
) -> None:
    verdict = "PASS" if success else "FAIL"
    lines = [
        f"# DataForSEO Smoke Test — {verdict}",
        "",
        f"**Date:** {ts}",
        f"**Endpoint:** `GET /v3/appendix/user_data`",
        f"**Auth method:** HTTP Basic Auth",
        "",
        "## Result",
        "",
        f"| Check | Value |",
        f"|-------|-------|",
        f"| API reachable | {'Yes' if success else 'No'} |",
        f"| Auth accepted | {'Yes' if success else 'No'} |",
        f"| Status code | `{status_code}` |",
        f"| Status message | {status_message} |",
        f"| Login returned | {login} |",
        f"| Balance returned | {balance} |",
        f"| Snapshot saved | `{snapshot_path}` |",
        "",
        "> **⚠ Balance caveat:** The `money.balance` field from `/v3/appendix/user_data` "
        "is NOT a reliable USD balance. It may be an access flag or rate-limit indicator. "
        "For the actual account balance in USD, check the DataForSEO dashboard directly.",
    ]

    if error:
        lines += ["", f"## Error", "", f"```", error, f"```"]

    if task_result:
        rate_limits = task_result.get("limits", {})
        if rate_limits:
            lines += [
                "",
                "## Rate limits (sample)",
                "",
                "| Endpoint group | Day limit | Minute limit |",
                "|----------------|-----------|--------------|",
            ]
            for group, limits in list(rate_limits.items())[:5]:
                day = limits.get("day", {}).get("limit", "?")
                minute = limits.get("minute", {}).get("limit", "?")
                lines.append(f"| {group} | {day} | {minute} |")
            if len(rate_limits) > 5:
                lines.append(f"| … ({len(rate_limits) - 5} more groups) | | |")

    lines += [
        "",
        "## Verdict",
        "",
        f"**{verdict}** — DataForSEO API connectivity and authentication "
        + ("confirmed." if success else "failed."),
        "",
        "---",
        f"_Generated by `dataforseo/smoke_test_user_data.py` at {ts}_",
    ]

    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    REPORT_PATH.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"  Report saved  -> {REPORT_PATH.relative_to(SEO_OPS)}")


if __name__ == "__main__":
    ok = run()
    sys.exit(0 if ok else 1)

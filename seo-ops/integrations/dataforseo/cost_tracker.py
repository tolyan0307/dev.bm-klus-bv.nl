"""
DataForSEO cost tracker — append-only log of actual API task costs.

Reads the `cost` field from DataForSEO API responses and appends entries
to a single JSON log file:  seo-ops/outputs/dataforseo_cost_log.json

Usage:
    from dataforseo.cost_tracker import record_task_cost, read_cost_log

    # After any DataForSEO API call:
    record_task_cost(
        analyzer="run_dataforseo_serp_snapshot_v1",
        keyword_or_scope="gevelisolatie rotterdam",
        api_response=resp,                 # full DataForSEO response dict
        estimated_cost_usd=0.002,          # optional pre-run estimate
    )

Design:
    - Captures actual `cost` from tasks[].cost in the API response
    - Distinguishes actual_task_cost_usd vs estimated_cost_usd
    - Never derives balance from user_data.money fields
    - Append-only: existing entries are preserved
"""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

SEO_OPS = Path(__file__).resolve().parents[2]
COST_LOG_PATH = SEO_OPS / "outputs" / "dataforseo_cost_log.json"


def _extract_actual_cost(api_response: dict | None) -> float | None:
    """Extract total actual cost from a DataForSEO API response.

    DataForSEO returns `cost` at two levels:
      - top-level: total cost for the request
      - per-task: tasks[i].cost

    We prefer the top-level cost as it's the authoritative total.
    Returns None if cost cannot be determined.
    """
    if not api_response:
        return None

    # Top-level cost (preferred)
    top_cost = api_response.get("cost")
    if isinstance(top_cost, (int, float)) and top_cost > 0:
        return float(top_cost)

    # Fallback: sum per-task costs
    tasks = api_response.get("tasks", [])
    task_costs = []
    for task in tasks:
        tc = task.get("cost")
        if isinstance(tc, (int, float)) and tc > 0:
            task_costs.append(float(tc))
    if task_costs:
        return round(sum(task_costs), 6)

    return None


def record_task_cost(
    *,
    analyzer: str,
    keyword_or_scope: str,
    api_response: dict | None = None,
    estimated_cost_usd: float | None = None,
    actual_cost_override: float | None = None,
    note: str = "",
) -> dict:
    """Append a cost entry to the cost log.

    Args:
        analyzer: Name of the analyzer script (e.g. "run_dataforseo_serp_snapshot_v1")
        keyword_or_scope: What was queried (keyword, domain list, etc.)
        api_response: Full DataForSEO API response dict (cost is extracted automatically)
        estimated_cost_usd: Pre-run estimate from guardrails
        actual_cost_override: Manually set actual cost (overrides extraction)
        note: Optional context note

    Returns:
        The entry dict that was appended.
    """
    actual = actual_cost_override or _extract_actual_cost(api_response)

    entry = {
        "timestamp": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S+00:00"),
        "analyzer": analyzer,
        "scope": keyword_or_scope,
        "actual_task_cost_usd": actual,
        "estimated_cost_usd": estimated_cost_usd,
        "cost_source": (
            "api_response" if actual and not actual_cost_override
            else "manual_override" if actual_cost_override
            else "unavailable"
        ),
        "note": note,
    }

    # Read existing log
    log: list[dict] = []
    if COST_LOG_PATH.is_file():
        try:
            log = json.loads(COST_LOG_PATH.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, ValueError):
            log = []

    log.append(entry)

    # Write back
    COST_LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    COST_LOG_PATH.write_text(
        json.dumps(log, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )

    return entry


def read_cost_log() -> list[dict]:
    """Read the full cost log. Returns empty list if no log exists."""
    if not COST_LOG_PATH.is_file():
        return []
    try:
        return json.loads(COST_LOG_PATH.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, ValueError):
        return []


def total_actual_spend() -> float:
    """Sum all actual_task_cost_usd entries from the log."""
    return sum(
        e.get("actual_task_cost_usd") or 0.0
        for e in read_cost_log()
    )

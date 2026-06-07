# Numeric Provenance Contract v1

**Version:** 1.1
**Date:** 2026-04-07
**Purpose:** Mandatory rules for labeling numeric claims in all seo-ops reports.

---

## 1. Provenance labels

Every numeric claim in a report MUST carry one of these labels.
If the label is missing, the claim is considered **unverified** by default.

| Label | Meaning | Example |
|-------|---------|---------|
| `source: gsc_api` | Value read directly from GSC API response or normalized snapshot | "Position 12.3 (source: gsc_api, 90d)" |
| `source: ga4_api` | Value read directly from GA4 API response or normalized snapshot | "Sessions 42 (source: ga4_api, 28d)" |
| `source: google_ads_csv` | Value from manually exported Google Ads CSV | "Cost EUR 287 (source: google_ads_csv)" |
| `source: dataforseo_api` | Value from DataForSEO API response | "Search volume 1900 (source: dataforseo_api)" |
| `source: site_code` | Value read from site source code (e.g. title length) | "Title 56 chars (source: site_code)" |
| `source: cost_log` | Value from `outputs/dataforseo_cost_log.json` | "Actual spend $0.10 (source: cost_log)" |
| `source: user_reported` | Value stated by user, not independently verified | "Balance $50.86 (source: user_reported)" |
| `source: calculated` | Derived from other labeled values; show formula | "CTR gap 2.1% = expected 4.5% - actual 2.4% (source: calculated)" |
| `source: estimated` | Approximation, not from a live data source | "~$0.01 per query (source: estimated)" |
| `source: unverified` | Cannot be traced to any artifact | "~500 searches/month (source: unverified)" |

---

## 2. Confidence labels for numeric claims

| Confidence | When to use |
|------------|-------------|
| `high` | Value from fresh (<7d) primary source, volume sufficient (>50 clicks or >200 impressions) |
| `medium` | Value from primary source but stale (7-30d) OR low volume (10-50 clicks) OR <30d post-cutover |
| `low` | Value from stale source (>30d), very low volume (<10 clicks), derived/estimated, or cross-source mismatch |

---

## 3. Forbidden patterns

These patterns MUST NOT appear in any report:

| Pattern | Why forbidden | Correct alternative |
|---------|---------------|---------------------|
| "Balance is $X" (derived from API `money` fields) | DataForSEO `money.balance`/`money.total` are access-level flags, NOT USD | Use `source: user_reported` or `source: dashboard_verified` only |
| Unlabeled cost totals | Cannot distinguish actual vs estimated spend | Label each cost with `source: cost_log` or `source: estimated` |
| "Position X" without specifying aggregation level | GSC query-level vs page-level positions differ significantly | Specify: "query-level position" or "page-level position" |
| Rounded numbers presented as exact | e.g. "2900 impressions" when actual is 2917 | Use "~2900" or exact "2917" |
| Period-less metrics | "Gets 42 sessions" — which period? | Always specify: "42 sessions (28d)" |
| Cross-source arithmetic without disclosure | "GSC clicks + GA4 sessions = X" | State: "cross-source; values may not align due to different counting methods" |

---

## 4. Cost claim rules

All cost-related numbers must follow these rules:

### 4a. DataForSEO costs

| Field | Label | Source |
|-------|-------|--------|
| Cost of a specific API task | `actual_task_cost_usd` | `cost` field in API response |
| Pre-run cost estimate | `estimated_cost_usd` | Script constant x count |
| Total verified spend | Sum of `actual_task_cost_usd` | `outputs/dataforseo_cost_log.json` |
| Account balance | `user_reported_balance_usd` | Only from user or DataForSEO dashboard |
| Derived balance | **DO NOT USE** | Never derive balance from API fields |

### 4b. Google Ads costs

| Field | Label | Source |
|-------|-------|--------|
| Campaign spend | `google_ads_cost_eur` | Google Ads CSV `Cost` column |
| CPC | `google_ads_avg_cpc_eur` | Google Ads CSV `Avg. CPC` column |
| Budget | `google_ads_daily_budget_eur` | `config/site.yaml` or user-reported |

---

## 5. Report provenance footer

Every report MUST end with a provenance section:

```markdown
## Provenance

- **Generated:** YYYY-MM-DD HH:MM UTC
- **Report mode:** preliminary | verified | enrichment_only
- **Data sources used:** [list each source with freshness]
- **Live API calls made:** none | [list with cost]
- **Numeric confidence cap:** [state if any cap applies, e.g. "medium — site <30d post-cutover"]
- **Known limitations:** [list]
```

---

## 6. Integration with existing cost_tracker

The `integrations/dataforseo/cost_tracker.py` is the authoritative source for DataForSEO spend.

- Use `cost_tracker.total_actual_spend()` for verified total, NOT manual addition
- Use `cost_tracker.read_cost_log()` to cite individual task costs
- Any report that mentions DataForSEO costs MUST reference `outputs/dataforseo_cost_log.json`
- Never reference `money.balance` or `money.total` from `user_data()` API response

---

## 6b. Page-level metric labeling (mandatory for page SEO diagnoses)

When reporting metrics for a specific page (page SEO diagnosis, page audit), every metric must carry three components: **source + window + scope**.

| Component | What it means | Example |
|-----------|--------------|---------|
| Source | Data system that produced the value | GSC, GA4, site_code |
| Window | Date range or period length | 28d, 2026-03-08 → 2026-04-04 |
| Scope | Aggregation level and filter | page-level, query = "X" page-filtered, landing page = /path/ |

**Required format:** `Value (Source, Window, Scope)`

| Forbidden | Required |
|-----------|----------|
| 234 clicks | Organic clicks: 234 (GSC, 28d, page-level) |
| 5.2% CTR | Organic CTR: 5.2% (GSC, 28d, page-level) |
| 42 sessions | Organic sessions: 42 (GA4, 28d, landing page = /gevelisolatie/) |
| Position 12 | Avg position: 12.3 (GSC, 28d, page-level aggregate) |

**Rule:** A page SEO diagnosis with bare metric names (no source/window/scope) fails provenance validation.

---

## 7. Aggregation disclosure rules

When presenting aggregated numbers (especially from GSC):

| Aggregation | Disclosure needed |
|-------------|-------------------|
| Query-level (best URL per query) | "GSC query-level aggregation — position reflects best-ranking URL" |
| Page-level (all queries for a page) | "GSC page-level aggregation — position is weighted average across all queries" |
| Row-level (query+page pairs) | "GSC row-level — each row is one query-page pair" |
| Cross-page sum | "Sum across N pages — not deduplicated (same query may appear under multiple pages)" |

---

## 8. Verification source priority

When verifying numeric claims from any report, sources must be consulted in this order:

| Priority | Source type | Examples | Role |
|----------|-----------|----------|------|
| 1 (highest) | Machine-readable artifacts | `snapshots/normalized/*.csv`, `snapshots/normalized/*.json`, `snapshots/raw/*.json` | Primary truth — use for all verifiable claims |
| 2 | Direct workflow outputs | `outputs/*.json` | Structured, traceable — use when normalized snapshots lack the specific field |
| 3 (lowest) | Markdown reports | `reports/**/*.md` | Human-readable support only — never the sole verification source |

**Rule:** A verification audit that compares one markdown report to another without consulting machine-readable artifacts is invalid. Every numeric claim must be traced to priority 1 or 2 sources.

---

_This contract is binding for all seo-ops reports. Violations should be flagged during report review._

# Orchestrator Rules v1

**Version:** 1.0
**Date:** 2026-04-07
**System:** BM klus BV search analysis (seo-ops)

---

## 1. System philosophy

- **Claude is the operator/analyst.** Python workflows are deterministic workers.
- **Read-only.** No workflow modifies site pages, Google Ads, or any external system.
- **Human-in-the-loop.** The user performs all actual changes. This system produces analysis and recommendations only.
- **Evidence-first.** Every recommendation must cite its data source and confidence level.
- **No autonomous chains.** Each workflow run is an explicit operator decision.

---

## 2. Workflow types

| Type | Purpose | Examples |
|------|---------|---------|
| `source_build` | Create or refresh a normalized data artifact | page_inventory, keyword_master, GSC snapshot, GA4 snapshot |
| `analysis` | Produce a diagnostic report from existing artifacts | PPC review, SEO gap review, page audit |

**Rule:** Analysis workflows consume artifacts produced by source_build workflows. Always verify artifact freshness before running an analysis.

---

## 3. Choosing the right workflow

| User intent | Recommended workflow | Prerequisites |
|-------------|---------------------|---------------|
| "Review PPC / Google Ads performance" | `ppc_review_v1` | Fresh Google Ads CSVs + keyword_master_v3 + GA4 snapshot |
| "Find SEO gaps / opportunities" | `seo_page_vs_query_gap_v1` | Fresh GSC + keyword_master_v3 + GA4 + page_inventory |
| "Audit a specific page" | `page_audit_v1` | Same as SEO gap + target route |
| "Rebuild keyword database" | `build_keyword_master_v3` | Fresh Google Ads CSVs + GSC snapshot + DataForSEO enrichment |
| "Refresh search data" | `build_gsc_query_page_snapshot_v1` | GSC API credentials configured |
| "Refresh traffic data" | `build_ga4_landing_page_snapshot_v1` | GA4 API credentials configured |
| "Refresh page inventory" | `build_page_inventory_v1` | None (reads local files) |
| "Full refresh from scratch" | Run all source_builds in order 1-5, then analysis | All credentials + fresh exports |

---

## 4. Freshness rules

### When to rebuild snapshots

| Artifact | Stale after | Rebuild trigger |
|----------|------------|-----------------|
| page_inventory_v1 | When site structure changes | New pages added/removed, metadata updated |
| keyword_master_v3 | When upstream sources change | After refreshing Ads CSVs, GSC snapshot, or DataForSEO data |
| gsc_query_page_snapshot | 7 days | Weekly or before any SEO analysis |
| ga4_landing_page_snapshot | 7 days | Weekly or before any analysis needing engagement data |

### How to check freshness

1. Check file modification timestamps on the artifact CSVs
2. Read the `_generated_at` field in JSON outputs
3. Read the date header in markdown reports

### When to reuse existing artifacts

- If an artifact is less than 7 days old and no upstream data has changed, reuse it
- For page_inventory: reuse unless site structure was modified since last build
- For keyword_master_v3: reuse unless new Google Ads exports, GSC data, or DataForSEO enrichment were refreshed

---

## 5. Dependency handling

### Dependency chain

```
build_page_inventory_v1            (no deps)
build_gsc_query_page_snapshot_v1   (no deps)
build_ga4_landing_page_snapshot_v1 (no deps)
    │
    └──> build_keyword_master_v3   (requires: Ads CSVs + GSC snapshot; optional: DataForSEO enrichment)
              │
              └──> ppc_review_v1              (requires: keyword_master_v3 + GA4 + page_inventory + Ads CSVs)
              └──> seo_page_vs_query_gap_v1   (requires: keyword_master_v3 + GSC + GA4 + page_inventory)
              └──> page_audit_v1              (requires: keyword_master_v3 + GSC + GA4 + page_inventory)
```

### Missing dependency behavior

- If a required artifact file is missing: **stop and report** which artifact is missing and how to build it
- If a required artifact is stale: **warn the user** but allow proceeding if they confirm
- If Google Ads CSVs are missing: **stop and instruct** user to export from Google Ads scripts
- If API credentials are not configured: **stop and instruct** user to set up credentials

---

## 6. Post-cutover analysis context

**Reference:** `seo-ops/config/analysis_context_v1.yaml`

The rebuilt site went live on **2026-03-08**. The system is currently in **post_cutover_preliminary** mode. All analysis workflows must account for this context.

### Data interpretation rules

| Rule | Rationale |
|------|-----------|
| Prefer post-cutover data (after 2026-03-08) for meaningful conclusions | Pre-cutover data reflects the old WordPress site |
| Treat pre-cutover GSC/GA4 signals as legacy/historical noise by default | URL structure, content, and tracking all changed at cutover |
| Do not compare current metrics to pre-cutover benchmarks as like-for-like | Different site, different pages, different tracking |
| Flag when a finding may be distorted by transition effects | Index stabilization, URL migration, fresh domain signals |
| Note that indexed page count is still incomplete | GSC coverage grows gradually after site launch |

### PPC budget constraint

- **Budget: 10 EUR/day (~300 EUR/month)** — this is a low-budget campaign
- Conversion volume will be low — do not draw statistical conclusions from <20 conversions
- Do not recommend budget increases unless the user explicitly asks
- Avoid aggressive keyword expansion — budget cannot support broad coverage
- CPA and ROAS conclusions are unreliable at this volume; state confidence as `low`

### Legacy data exceptions

- `legacy_indexation_review_v1` **intentionally** inspects old-site URL tails — this is expected
- Explicit old-vs-new comparison analysis may use pre-cutover data when clearly labeled
- All other workflows should default to post-cutover data only

### Report output guidance

All analysis reports generated during the preliminary period should:
1. State that the site is post-cutover and data is preliminary
2. Flag findings that may be influenced by cutover transition
3. Note when conversion/click volume is too low for confident conclusions
4. Avoid recommending aggressive scaling actions
5. Distinguish between structural issues (fixable now) and volume issues (need time)

---

## 7. When NOT to run

- Do not run analysis workflows if all upstream artifacts are more than 30 days old — results will be misleading
- Do not run PPC review if Google Ads CSVs have not been refreshed — report will reflect old data
- Do not run multiple analysis workflows hoping to "find something" — choose based on the user's actual question
- Do not chain workflows automatically — each run is a deliberate operator action

---

## 8. Output handling

- All outputs go to `seo-ops/reports/` (markdown) and `seo-ops/outputs/` (JSON)
- Outputs are **append/overwrite** — running the same workflow again overwrites previous output
- If the user needs to preserve a previous run, they should manually archive it first
- JSON outputs are machine-readable for future workflow consumption
- Markdown reports are the primary human-readable deliverable

---

## 9. Known limitations

| Limitation | Impact | Mitigation |
|-----------|--------|------------|
| Theme taxonomy mismatch (keyword_master vs page_inventory) | False cluster mismatches in gap/audit reports | Manual verification of flagged items |
| Single campaign support in PPC review | Only campaign 23271040037 | Extend script for additional campaigns when needed |
| Limited competitor intelligence | Cannot assess full SERP competition | DataForSEO partially operational (SERP snapshots, keyword gap); full competitor layer planned |
| No automated scheduling | All runs are manual | Planned: Phase 6 orchestrator enhancements |
| Windows path issues | MSYS_NO_PATHCONV=1 needed for route args | Documented in command catalog |

---

## 10. Scope boundaries

**This system does:**
- Read data from Google Ads CSVs, GSC API, GA4 API, local site files
- Produce structured analysis with confidence levels
- Generate actionable recommendations with evidence
- Maintain normalized data artifacts for cross-source analysis

**This system does NOT:**
- Modify site pages or content
- Change Google Ads campaigns, keywords, or bids
- Publish content or push to production
- Make autonomous decisions
- Access systems without configured credentials

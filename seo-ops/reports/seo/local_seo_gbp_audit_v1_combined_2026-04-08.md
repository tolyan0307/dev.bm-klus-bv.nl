# Local SEO / GBP Audit Report

**Generated:** 2026-04-08 13:50 UTC
**Report mode:** preliminary
**Workflow:** local_seo_gbp_audit_v1
**Contract:** contracts/local_seo_gbp_rules_v1.md
**Scope:** combined
**Business entity:** BM Klus BV

> **Limited mode:** GBP data is not available. This audit is based on site/search context only. GBP-specific conclusions cannot be drawn.

---

## 1. Sources used

| Source | Path | Status | Source class |
|--------|------|--------|-------------|
| local_entities | config/locales/local_entities_v1.yaml | loaded | internal_config |
| gbp_performance | GBP Performance API | not available — limited mode | gbp_api |
| gbp_reviews | GBP Reviews API | not available — limited mode | gbp_api |
| gsc_queries | snapshots/normalized/seo/gsc_query_page_aggregated_queries_last28d.csv | loaded, 356 rows | internal_artifact |
| page_inventory | snapshots/normalized/pages/page_inventory_v1.csv | loaded, 54 pages | internal_artifact |

## 2. GBP profile evidence

**Outcome:** `insufficient_gbp_evidence`

**Observations:**
- GBP performance data not available: GBP account ID not configured. Set GBP_ACCOUNT_ID in D:\projects\bmklus\v0-site\site\seo-ops\integrations\.env.local or pass account_id argument.

**Interpretations:**
- Without GBP performance data, profile visibility assessment is not possible. This audit is running in limited mode for the profile scope.


## 3. Review / reputation signals

**Outcome:** `insufficient_gbp_evidence`

**Observations:**
- GBP reviews data not available: GBP account ID not configured. Set GBP_ACCOUNT_ID in D:\projects\bmklus\v0-site\site\seo-ops\integrations\.env.local or pass account_id argument.

**Interpretations:**
- Without GBP reviews data, review/reputation assessment is not possible. This audit is running in limited mode for the reviews scope.


## 4. Supporting site/search context

No local intent queries found in GSC data (or GSC data not available).

Location page coverage: not assessed (page inventory or entity config not available).


## 5. Interpretation boundaries

- This audit runs in limited mode: GBP data is not available. All findings are based on site/search context only.
- Local pack presence, GBP visibility, and review signals cannot be assessed.
- Local query presence in GSC does not confirm local pack ranking.
- Site-side local SEO signals (pages, queries) and GBP signals should be interpreted separately.


## 6. Recommended manual actions

- Configure GBP API access (set GBP_ACCOUNT_ID and GBP_LOCATION_ID in integrations/.env.local) to enable full profile audit.
- Configure GBP API access to enable review audit.


## 7. Excluded context

- GBP performance metrics (impressions, actions, searches)
- GBP review count, average rating, recent reviews
- Competitor GBP data (not available)
- Local pack ranking positions (not available via GBP API)
- NAP consistency across directories (not checked)

---

## Provenance

- **Generated:** 2026-04-08 13:50 UTC
- **Report mode:** preliminary
- **Generator:** run_local_seo_gbp_audit_v1.py
- **Contract:** contracts/local_seo_gbp_rules_v1.md
- **Primary truth:** GBP Performance API + GBP Reviews API (when available)
- **Supporting data:** GSC query/page snapshots, page inventory (optional)
- **Known limitations:**
  - GBP API access may not be configured — runs in limited mode without it
  - No local pack ranking data available
  - No competitor GBP data available
  - Review analysis is quantitative only (no sentiment modeling)

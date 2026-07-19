# Local SEO / GBP Audit Report

**Generated:** 2026-07-19 16:25 UTC
**Report mode:** preliminary
**Workflow:** local_seo_gbp_audit_v1
**Contract:** contracts/local_seo_gbp_rules_v1.md
**Scope:** combined
**Business entity:** BM Klus BV

---

## 1. Sources used

| Source | Path | Status | Source class |
|--------|------|--------|-------------|
| local_entities | config/locales/local_entities_v1.yaml | loaded | internal_config |
| gbp_performance | GBP Performance API | loaded | gbp_api |
| gbp_reviews | GBP Reviews API | loaded | gbp_api |
| gsc_queries | snapshots/normalized/seo/gsc_query_page_aggregated_queries_last90d.csv | loaded, 420 rows | internal_artifact |
| page_inventory | snapshots/normalized/pages/page_inventory_v1.csv | loaded, 54 pages | internal_artifact |

## 2. GBP profile evidence

**Outcome:** `gbp_signal_adequate`

**Observations:**
- GBP data loaded for period: 2026-04-20 → 2026-07-19 (90d)
-   BUSINESS_DIRECTION_REQUESTS: 115
-   WEBSITE_CLICKS: 79
-   BUSINESS_IMPRESSIONS_DESKTOP_SEARCH: 173
-   BUSINESS_IMPRESSIONS_MOBILE_SEARCH: 394
-   BUSINESS_IMPRESSIONS_MOBILE_MAPS: 79
-   CALL_CLICKS: 1
-   BUSINESS_IMPRESSIONS_DESKTOP_MAPS: 73

**Interpretations:**
- GBP profile shows measurable activity: 719 impressions and 195 user actions in the reporting period.


## 3. Review / reputation signals

**Outcome:** `gbp_signal_adequate`

**Observations:**
- Total reviews: 19
- Average rating: 4.9
- Recent reviews fetched: 19

**Interpretations:**
- Review signal is adequate: 19 reviews with 4.9 average. This provides reasonable social proof for a local service business.


## 4. Supporting site/search context

**Local intent queries found:** 28

| Query | Impressions | Clicks | Local signal |
|-------|-------------|--------|-------------|
| gevelrenovatie met folie in rotterdam | 410 | 0 | rotterdam |
| gevelisolatie rotterdam | 355 | 0 | rotterdam |
| renovatie buitenschil rotterdam | 64 | 0 | rotterdam |
| pand schilderen vlaardingen | 29 | 0 | vlaardingen |
| buitengevelisolatie rotterdam | 26 | 0 | rotterdam |
| klussenbedrijf 010 rotterdam vlaardingen | 20 | 0 | vlaardingen |
| klussen rotterdam | 16 | 0 | rotterdam |
| klussenbedrijf 010 vlaardingen rotterdam | 15 | 0 | vlaardingen |
| klusbedrijf rotterdam | 12 | 1 | rotterdam |
| gevelbeplating rotterdam | 11 | 0 | rotterdam |
| stucadoor rotterdam | 10 | 0 | rotterdam |
| klussenbedrijf apostol, schiedamseweg, , rotterdam netherlands | 9 | 0 | rotterdam |
| klussenbedrijf rotterdam | 8 | 0 | rotterdam |
| specialistisch stucwerk in rotterdam | 7 | 0 | rotterdam |
| gevelisolatie den haag | 5 | 0 | den haag |

**Location page coverage:** 8/9 target locations covered (89%)


## 5. Interpretation boundaries

- GBP performance metrics measure visibility, not business quality or lead quality.
- Review ratings are social proof signals, not causal proof of service quality.
- Local query presence in GSC does not confirm local pack ranking.
- Site-side local SEO signals (pages, queries) and GBP signals should be interpreted separately.


## 6. Recommended manual actions

- No specific actions identified based on available evidence.


## 7. Excluded context

- Competitor GBP data (not available)
- Local pack ranking positions (not available via GBP API)
- NAP consistency across directories (not checked)

---

## Provenance

- **Generated:** 2026-07-19 16:25 UTC
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

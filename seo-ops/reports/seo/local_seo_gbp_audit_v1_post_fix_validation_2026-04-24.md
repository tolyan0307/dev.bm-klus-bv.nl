# Local SEO / GBP Audit Report

**Generated:** 2026-04-24 17:12 UTC
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
| gsc_queries | snapshots/normalized/seo/gsc_query_page_aggregated_queries_last28d.csv | loaded, 356 rows | internal_artifact |
| page_inventory | snapshots/normalized/pages/page_inventory_v1.csv | loaded, 54 pages | internal_artifact |

## 2. GBP profile evidence

**Outcome:** `gbp_signal_adequate`

**Observations:**
- GBP data loaded for period: 2026-03-27 → 2026-04-24 (28d)
-   BUSINESS_IMPRESSIONS_DESKTOP_SEARCH: 38
-   WEBSITE_CLICKS: 17
-   BUSINESS_IMPRESSIONS_DESKTOP_MAPS: 15
-   BUSINESS_IMPRESSIONS_MOBILE_MAPS: 38
-   BUSINESS_DIRECTION_REQUESTS: 16
-   CALL_CLICKS: 0
-   BUSINESS_IMPRESSIONS_MOBILE_SEARCH: 109

**Interpretations:**
- GBP profile shows measurable activity: 200 impressions and 33 user actions in the reporting period.


## 3. Review / reputation signals

**Outcome:** `gbp_signal_adequate`

**Observations:**
- Total reviews: 18
- Average rating: 4.9
- Recent reviews fetched: 18

**Interpretations:**
- Review signal is adequate: 18 reviews with 4.9 average. This provides reasonable social proof for a local service business.


## 4. Supporting site/search context

**Local intent queries found:** 21

| Query | Impressions | Clicks | Local signal |
|-------|-------------|--------|-------------|
| gevelisolatie rotterdam | 413 | 2 | rotterdam |
| gevelisolatie den haag | 151 | 0 | den haag |
| gevelrenovatie met folie in rotterdam | 136 | 0 | rotterdam |
| buitengevelisolatie rotterdam | 45 | 0 | rotterdam |
| stucen rotterdam | 20 | 0 | rotterdam |
| specialistisch stucwerk in rotterdam | 11 | 0 | rotterdam |
| renovatie buitenschil rotterdam | 6 | 0 | rotterdam |
| mkz klussenbedrijf, hogenbanweg, , rotterdam netherlands | 4 | 0 | rotterdam |
| isolatie vlaardingen | 2 | 0 | vlaardingen |
| klussenbedrijf 010 rotterdam | 2 | 0 | rotterdam |
| vochtproblemen rotterdam | 2 | 0 | rotterdam |
| afwerkingen en renovaties rotterdam | 1 | 0 | rotterdam |
| capelle aan den ijssel | 1 | 0 | capelle aan den ijssel |
| gevel coating rotterdam | 1 | 0 | rotterdam |
| gevel renovatie rotterdam | 1 | 0 | rotterdam |

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

- **Generated:** 2026-04-24 17:12 UTC
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

# WP Stats Snapshot (last 90 days)

**Generated:** 2026-10-15 11:57 UTC
**Date range:** 2026-07-17 to 2026-10-14
**Source:** BM Stats v2 plugin, https://bm-klus-bv.nl (provenance label: `[WP, 90d, lead-level]` / `[WP, 90d, event-level]`)
**Plugin version:** 2.2.0

> Pageview and CTA events exist only from 2026-09-04 (41 of 90 days in window). Lead rows exist from 2026-03-11.

---

## Leads

| Metric | Value |
|--------|-------|
| Leads total | 28 |
| Leads excl. spam | 28 |
| Qualified (qualified + won + lost) | 0 |
| Won | 0 |
| Revenue on won (order_value) | € 0 |
| With gclid | 14 |

### By status

| Status | Leads |
|--------|-------|
| new | 11 |
| archive | 17 |

### By source (first touch)

| Source | Leads |
|--------|-------|
| ads | 14 |
| campaign | 1 |
| organic | 3 |
| direct | 10 |

### By form

| Form | Leads |
|------|-------|
| other | 17 |
| quote_modal | 8 |
| contact_form | 3 |

---

## Traffic (events available since 2026-09-04)

| Metric | Value |
|--------|-------|
| Page views | 1016 |
| CTA clicks | 12 |
| Days with events | 41 |

### Top pages by views (conversion shown as — : views start later than lead events in this window)

| Page | Views | CTA | Lead events | Conv. | Type |
|------|-------|-----|-------------|-------|------|
| / | 186 | 4 | 3 | — | home |
| /gevelisolatie/ | 160 | 2 | 6 | — | service |
| /buiten-stucwerk/ | 155 | 1 | 6 | — | service |
| /gevelisolatie/afwerkingen/ | 86 | 0 | 3 | — | cluster |
| /onze-werken/ | 78 | 0 | 1 | — | archive |
| /contact/ | 43 | 4 | 7 | — | utility |
| /sierpleister/ | 38 | 0 | 0 | — | service |
| /gevelisolatie/kosten/ | 32 | 0 | 0 | — | cluster |
| /over-ons/ | 31 | 0 | 2 | — | utility |
| /diensten/ | 30 | 0 | 1 | — | service |
| /gevel-schilderen/ | 20 | 0 | 0 | — | service |
| /gevel-schilderen/keimen/ | 20 | 1 | 0 | — | cluster |
| /onze-werken/strijen-schenkeldijk-gevelisolatie-sierpleister-2026/ | 12 | 0 | 0 | — | project |
| /gevelisolatie/rc-waarde-dikte/ | 11 | 0 | 0 | — | cluster |
| /onze-werken/etten-leur-bankenstraat-gevelisolatie-dakrenovatie-2026/ | 10 | 0 | 0 | — | project |
| /gevelisolatie/materialen/ | 8 | 0 | 1 | — | cluster |
| /muren-stucen/sausklaar-behangklaar/ | 8 | 0 | 0 | — | cluster |
| /gevelisolatie/leiden/ | 7 | 0 | 0 | — | city |
| /muren-stucen/ | 7 | 0 | 0 | — | service |
| /onze-werken/delft-willemstraat-gevelrenovatie-schilderwerk-2026/ | 7 | 0 | 0 | — | project |

### Traffic by source

| Source | Views | CTA | Lead events |
|--------|-------|-----|-------------|
| ads | 308 | 1 | 14 |
| campaign | 64 | 2 | 1 |
| organic | 359 | 4 | 3 |
| referral | 28 | 0 | 0 |
| direct | 257 | 5 | 13 |

### CTA clicks

| CTA | Clicks |
|-----|--------|
| whatsapp | 8 |
| email | 3 |
| phone | 1 |

### Form outcomes (anti-spam)

| Outcome | Count |
|---------|-------|
| lead | 31 |

---

## Limitations

1. Pageviews and CTA clicks are counted by a JS beacon from 2026-09-04; earlier days are 0 by construction, not real zeros.
2. Leads before 2026-09-04 were backfilled: source comes from the form page URL only (utm/gclid), no first-touch referrer, form variant unknown.
3. Lead source is classified from first-touch UTM/gclid/referrer, not from GA4 channel grouping; the two are not expected to match 1:1.
4. No cookies, no visitor identifier: unique visitors are not available (visitor hash disabled by owner decision).
5. Statuses are set manually by the owner; `new` means not yet triaged, `archive` means a real pre-2026-09-05 lead whose outcome is unknown (excluded from qualified/won ratios).

## Output files

| File | Path |
|------|------|
| Raw JSON | `seo-ops/snapshots/raw/wp/wp_stats_last90d_raw.json` |
| Leads CSV | `seo-ops/snapshots/normalized/wp/wp_leads_last90d.csv` |
| Leads daily CSV | `seo-ops/snapshots/normalized/wp/wp_leads_daily_last90d.csv` |
| Pageviews daily CSV | `seo-ops/snapshots/normalized/wp/wp_pageviews_daily_last90d.csv` |
| Pageviews by path CSV | `seo-ops/snapshots/normalized/wp/wp_pageviews_by_path_last90d.csv` |
| Traffic by source CSV | `seo-ops/snapshots/normalized/wp/wp_traffic_by_source_last90d.csv` |
| CTA CSV | `seo-ops/snapshots/normalized/wp/wp_cta_last90d.csv` |

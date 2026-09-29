# WP Stats Snapshot (last 90 days)

**Generated:** 2026-09-24 16:19 UTC
**Date range:** 2026-06-26 to 2026-09-23
**Source:** BM Stats v2 plugin, https://bm-klus-bv.nl (provenance label: `[WP, 90d, lead-level]` / `[WP, 90d, event-level]`)
**Plugin version:** 2.2.0

> Pageview and CTA events exist only from 2026-09-04 (20 of 90 days in window). Lead rows exist from 2026-03-11.

---

## Leads

| Metric | Value |
|--------|-------|
| Leads total | 23 |
| Leads excl. spam | 23 |
| Qualified (qualified + won + lost) | 0 |
| Won | 0 |
| Revenue on won (order_value) | € 0 |
| With gclid | 11 |

### By status

| Status | Leads |
|--------|-------|
| new | 5 |
| archive | 18 |

### By source (first touch)

| Source | Leads |
|--------|-------|
| ads | 11 |
| campaign | 1 |
| organic | 1 |
| direct | 10 |

### By form

| Form | Leads |
|------|-------|
| other | 18 |
| quote_modal | 3 |
| contact_form | 2 |

---

## Traffic (events available since 2026-09-04)

| Metric | Value |
|--------|-------|
| Page views | 553 |
| CTA clicks | 8 |
| Days with events | 20 |

### Top pages by views (conversion shown as — : views start later than lead events in this window)

| Page | Views | CTA | Lead events | Conv. | Type |
|------|-------|-----|-------------|-------|------|
| / | 103 | 3 | 2 | — | home |
| /gevelisolatie/ | 96 | 2 | 6 | — | service |
| /buiten-stucwerk/ | 75 | 0 | 6 | — | service |
| /gevelisolatie/afwerkingen/ | 46 | 0 | 2 | — | cluster |
| /onze-werken/ | 37 | 0 | 1 | — | archive |
| /contact/ | 22 | 2 | 6 | — | utility |
| /over-ons/ | 20 | 0 | 1 | — | utility |
| /sierpleister/ | 20 | 0 | 0 | — | service |
| /gevelisolatie/kosten/ | 17 | 0 | 0 | — | cluster |
| /diensten/ | 15 | 0 | 0 | — | service |
| /gevel-schilderen/keimen/ | 14 | 1 | 0 | — |  |
| /gevel-schilderen/ | 13 | 0 | 0 | — | service |
| /onze-werken/strijen-schenkeldijk-gevelisolatie-sierpleister-2026/ | 9 | 0 | 0 | — |  |
| /gevelisolatie/rc-waarde-dikte/ | 6 | 0 | 0 | — | cluster |
| /gevelisolatie/materialen/ | 5 | 0 | 1 | — | cluster |
| /muren-stucen/ | 5 | 0 | 0 | — | service |
| /muren-stucen/sausklaar-behangklaar/ | 5 | 0 | 0 | — |  |
| /gevelisolatie/den-haag/ | 4 | 0 | 1 | — | city |
| /onze-werken/etten-leur-gevelisolatie-10cm-ral9010-2025/ | 4 | 0 | 0 | — | project |
| /onze-werken/delft-willemstraat-gevelrenovatie-schilderwerk-2026/ | 3 | 0 | 0 | — |  |

### Traffic by source

| Source | Views | CTA | Lead events |
|--------|-------|-----|-------------|
| ads | 157 | 0 | 11 |
| campaign | 37 | 1 | 1 |
| organic | 185 | 2 | 1 |
| referral | 14 | 0 | 0 |
| direct | 160 | 5 | 13 |

### CTA clicks

| CTA | Clicks |
|-----|--------|
| whatsapp | 5 |
| email | 2 |
| phone | 1 |

### Form outcomes (anti-spam)

| Outcome | Count |
|---------|-------|
| lead | 26 |

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

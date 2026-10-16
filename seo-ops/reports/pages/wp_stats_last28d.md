# WP Stats Snapshot (last 28 days)

**Generated:** 2026-10-15 11:57 UTC
**Date range:** 2026-09-17 to 2026-10-14
**Source:** BM Stats v2 plugin, https://bm-klus-bv.nl (provenance label: `[WP, 28d, lead-level]` / `[WP, 28d, event-level]`)
**Plugin version:** 2.2.0

> Pageview and CTA events exist only from 2026-09-04 (28 of 28 days in window). Lead rows exist from 2026-03-11.

---

## Leads

| Metric | Value |
|--------|-------|
| Leads total | 8 |
| Leads excl. spam | 8 |
| Qualified (qualified + won + lost) | 0 |
| Won | 0 |
| Revenue on won (order_value) | € 0 |
| With gclid | 5 |

### By status

| Status | Leads |
|--------|-------|
| new | 8 |

### By source (first touch)

| Source | Leads |
|--------|-------|
| ads | 5 |
| organic | 2 |
| direct | 1 |

### By form

| Form | Leads |
|------|-------|
| quote_modal | 7 |
| contact_form | 1 |

---

## Traffic (events available since 2026-09-04)

| Metric | Value |
|--------|-------|
| Page views | 601 |
| CTA clicks | 5 |
| Days with events | 28 |

### Top pages by views

| Page | Views | CTA | Lead events | Conv. | Type |
|------|-------|-----|-------------|-------|------|
| / | 101 | 2 | 1 | 0.99% | home |
| /gevelisolatie/ | 100 | 0 | 2 | 2.00% | service |
| /buiten-stucwerk/ | 96 | 1 | 0 | 0.00% | service |
| /onze-werken/ | 55 | 0 | 0 | 0.00% | archive |
| /gevelisolatie/afwerkingen/ | 50 | 0 | 1 | 2.00% | cluster |
| /contact/ | 26 | 2 | 1 | 3.85% | utility |
| /gevelisolatie/kosten/ | 22 | 0 | 0 | 0.00% | cluster |
| /sierpleister/ | 21 | 0 | 0 | 0.00% | service |
| /diensten/ | 18 | 0 | 1 | 5.56% | service |
| /over-ons/ | 15 | 0 | 1 | 6.67% | utility |
| /gevel-schilderen/ | 8 | 0 | 0 | 0.00% | service |
| /onze-werken/etten-leur-bankenstraat-gevelisolatie-dakrenovatie-2026/ | 8 | 0 | 0 | 0.00% | project |
| /gevel-schilderen/keimen/ | 6 | 0 | 0 | 0.00% | cluster |
| /gevelisolatie/rc-waarde-dikte/ | 6 | 0 | 0 | 0.00% | cluster |
| /onze-werken/strijen-schenkeldijk-gevelisolatie-sierpleister-2026/ | 6 | 0 | 0 | 0.00% | project |
| /gevelisolatie/leiden/ | 5 | 0 | 0 | 0.00% | city |
| /onze-werken/etten-leur-gevelisolatie-10cm-ral9010-2025/ | 5 | 0 | 0 | 0.00% | project |
| /gevelisolatie/materialen/ | 4 | 0 | 1 | 25.00% | cluster |
| /muren-stucen/ | 4 | 0 | 0 | 0.00% | service |
| /onze-werken/delft-willemstraat-gevelrenovatie-schilderwerk-2026/ | 4 | 0 | 0 | 0.00% | project |

### Traffic by source

| Source | Views | CTA | Lead events |
|--------|-------|-----|-------------|
| ads | 200 | 1 | 5 |
| campaign | 34 | 1 | 0 |
| organic | 230 | 2 | 2 |
| referral | 14 | 0 | 0 |
| direct | 123 | 1 | 1 |

### CTA clicks

| CTA | Clicks |
|-----|--------|
| whatsapp | 4 |
| email | 1 |

### Form outcomes (anti-spam)

| Outcome | Count |
|---------|-------|
| lead | 8 |

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
| Raw JSON | `seo-ops/snapshots/raw/wp/wp_stats_last28d_raw.json` |
| Leads CSV | `seo-ops/snapshots/normalized/wp/wp_leads_last28d.csv` |
| Leads daily CSV | `seo-ops/snapshots/normalized/wp/wp_leads_daily_last28d.csv` |
| Pageviews daily CSV | `seo-ops/snapshots/normalized/wp/wp_pageviews_daily_last28d.csv` |
| Pageviews by path CSV | `seo-ops/snapshots/normalized/wp/wp_pageviews_by_path_last28d.csv` |
| Traffic by source CSV | `seo-ops/snapshots/normalized/wp/wp_traffic_by_source_last28d.csv` |
| CTA CSV | `seo-ops/snapshots/normalized/wp/wp_cta_last28d.csv` |

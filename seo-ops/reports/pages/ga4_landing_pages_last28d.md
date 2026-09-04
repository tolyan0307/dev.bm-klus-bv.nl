# GA4 Landing Page Snapshot (last 90 days)

**Generated:** 2026-09-04 15:50 UTC
**Date range:** 2026-08-07 to 2026-09-03
**Property:** 428253147

---

## Overview

| Metric | Count |
|--------|-------|
| Total landing pages | 21 |
| Mapped to page_inventory | 17 |
| Unmapped | 4 |
| (not set) pages | 1 |
| Total sessions | 194 |
| Total key events | 11 |

---

## Channel summary

| Channel | Sessions |
|---------|----------|
| Paid Search | 73 |
| Organic Search | 63 |
| Direct | 41 |
| AI Assistant | 8 |
| Unassigned | 5 |
| Organic Social | 2 |
| Cross-network | 2 |

---

## Top landing pages by sessions

| Page | Sessions | Engaged | Eng Rate | Avg Dur (s) | Key Events | Type |
|------|----------|---------|----------|-------------|------------|------|
| / | 47 | 33 | 0.70 | 211 | 0 | home |
| /buiten-stucwerk/ | 33 | 25 | 0.76 | 209 | 4 | service |
| /gevelisolatie/afwerkingen/ | 25 | 12 | 0.48 | 120 | 3 | cluster |
| /gevelisolatie/ | 19 | 14 | 0.74 | 244 | 2 | service |
| (not set) | 14 | 0 | 0.00 | 32 | 0 |  |
| /onze-werken/ | 10 | 7 | 0.70 | 154 | 1 | archive |
| /gevelisolatie/kosten/ | 8 | 2 | 0.25 | 178 | 0 | cluster |
| /gevel-schilderen/ | 7 | 6 | 0.86 | 65 | 1 | service |
| /onze-werken/delft-willemstraat-gevelrenovatie-schilderwerk-2026/ | 5 | 2 | 0.40 | 21 | 0 |  |
| /onze-werken/etten-leur-bankenstraat-gevelisolatie-dakrenovatie-2026/ | 4 | 4 | 1.00 | 158 | 0 |  |
| /over-ons/ | 4 | 3 | 0.75 | 226 | 0 | utility |
| /sierpleister/ | 4 | 3 | 0.75 | 85 | 0 | service |
| /contact/ | 3 | 1 | 0.33 | 32 | 0 | utility |
| /diensten/ | 3 | 3 | 1.00 | 690 | 0 | service |
| /onze-werken/etten-leur-gevelisolatie-6cm-strikolith-2025/ | 2 | 1 | 0.50 | 11 | 0 | project |
| /gevelisolatie/delft/ | 1 | 1 | 1.00 | 166 | 0 | city |
| /gevelisolatie/dordrecht/ | 1 | 1 | 1.00 | 3379 | 0 | city |
| /gevelisolatie/rc-waarde-dikte/ | 1 | 1 | 1.00 | 13 | 0 | cluster |
| /gevelisolatie/subsidie-vergunning/ | 1 | 1 | 1.00 | 1100 | 0 | cluster |
| /onze-werken/etten-leur-gevelisolatie-10cm-ral9010-2025/ | 1 | 1 | 1.00 | 66 | 0 | project |

## Top paid landing pages

| Page | Paid Sessions |
|------|--------------|
| /buiten-stucwerk/ | 30 |
| /gevelisolatie/afwerkingen/ | 21 |
| /gevelisolatie/ | 11 |
| (not set) | 4 |
| /gevel-schilderen/ | 4 |
| /gevelisolatie/kosten/ | 2 |
| /onze-werken/ | 1 |

## Top organic search landing pages

| Page | Organic Sessions |
|------|-----------------|
| / | 22 |
| /gevelisolatie/ | 7 |
| /onze-werken/ | 4 |
| (not set) | 3 |
| /contact/ | 3 |
| /diensten/ | 3 |
| /over-ons/ | 3 |
| /sierpleister/ | 3 |
| /buiten-stucwerk/ | 2 |
| /gevelisolatie/afwerkingen/ | 2 |
| /onze-werken/delft-willemstraat-gevelrenovatie-schilderwerk-2026/ | 2 |
| /onze-werken/etten-leur-gevelisolatie-6cm-strikolith-2025/ | 2 |
| /gevel-schilderen/ | 1 |
| /gevelisolatie/dordrecht/ | 1 |
| /gevelisolatie/kosten/ | 1 |

---

## Weak engagement pages (1 pages with sessions >= 5, engagement < 30%)

| Page | Sessions | Eng Rate | Avg Dur (s) | Type | Notes |
|------|----------|----------|-------------|------|-------|
| /gevelisolatie/kosten/ | 8 | 0.25 | 178 | cluster |  |

## Unmapped / legacy landing pages (3 pages with sessions > 0)

| Page | Sessions | Eng Rate | Notes |
|------|----------|----------|-------|
| /onze-werken/delft-willemstraat-gevelrenovatie-schilderwerk-2026/ | 5 | 0.40 | unmapped: not in page_inventory |
| /onze-werken/etten-leur-bankenstraat-gevelisolatie-dakrenovatie-2026/ | 4 | 1.00 | unmapped: not in page_inventory |
| /onze-werken/strijen-schenkeldijk-gevelisolatie-sierpleister-2026/ | 1 | 0.00 | unmapped: not in page_inventory |

---

## Limitations (v1)

1. **No sessionSourceMedium split** -- only sessionDefaultChannelGroup used for simplicity
2. **Key events pulled separately** and merged by landing page; some attribution mismatch possible
3. **averageSessionDuration** is session-weighted in aggregation; may not match GA4 UI exactly
4. **Query string stripped** during normalization; pages with different query params merged
5. **(not set) pages** represent sessions where GA4 could not determine the landing page
6. **No user-level metrics** (new users, returning users)
7. **No bounce rate** -- GA4 uses engagement rate instead
8. **Page mapping** based on page_inventory v1; legacy/redirected URLs may not map

---

## Output files

| File | Path |
|------|------|
| Raw JSON | `seo-ops/snapshots/raw/ga4/ga4_landing_pages_last90d_raw.json` |
| Page aggregate CSV | `seo-ops/snapshots/normalized/pages/ga4_landing_pages_last90d.csv` |
| By channel CSV | `seo-ops/snapshots/normalized/pages/ga4_landing_pages_by_channel_last90d.csv` |
| Summary (this file) | `seo-ops/reports/pages/ga4_landing_pages_last90d.md` |

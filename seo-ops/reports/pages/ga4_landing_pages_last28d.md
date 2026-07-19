# GA4 Landing Page Snapshot (last 90 days)

**Generated:** 2026-07-19 16:24 UTC
**Date range:** 2026-06-21 to 2026-07-18
**Property:** 428253147

---

## Overview

| Metric | Count |
|--------|-------|
| Total landing pages | 15 |
| Mapped to page_inventory | 13 |
| Unmapped | 2 |
| (not set) pages | 1 |
| Total sessions | 238 |
| Total key events | 4 |

---

## Channel summary

| Channel | Sessions |
|---------|----------|
| Organic Search | 110 |
| Paid Search | 101 |
| Direct | 24 |
| Cross-network | 2 |
| Unassigned | 1 |

---

## Top landing pages by sessions

| Page | Sessions | Engaged | Eng Rate | Avg Dur (s) | Key Events | Type |
|------|----------|---------|----------|-------------|------------|------|
| / | 94 | 70 | 0.74 | 312 | 3 | home |
| /gevelisolatie/afwerkingen/ | 52 | 33 | 0.63 | 108 | 0 | cluster |
| /gevelisolatie/ | 36 | 25 | 0.69 | 228 | 1 | service |
| (not set) | 18 | 1 | 0.06 | 0 | 0 |  |
| /gevelisolatie/kosten/ | 11 | 6 | 0.55 | 198 | 0 | cluster |
| /over-ons/ | 6 | 3 | 0.50 | 132 | 0 | utility |
| /onze-werken/ | 4 | 3 | 0.75 | 155 | 0 | archive |
| /buiten-stucwerk/ | 3 | 3 | 1.00 | 184 | 0 | service |
| /onze-werken/etten-leur-gevelisolatie-10cm-ral9010-2025/ | 3 | 1 | 0.33 | 16 | 0 | project |
| /onze-werken/spijkenisse-malledijk-stucwerk-schilderwerk-2024/ | 3 | 1 | 0.33 | 248 | 0 |  |
| /sierpleister/ | 3 | 0 | 0.00 | 1 | 0 | service |
| /onze-werken/klaaswaal-gevelisolatie-6cm-sierpleister-2025/ | 2 | 1 | 0.50 | 46 | 0 | project |
| /contact/ | 1 | 1 | 1.00 | 44 | 0 | utility |
| /muren-stucen/ | 1 | 0 | 0.00 | 0 | 0 | service |
| /onze-werken/etten-leur-gevelisolatie-6cm-strikolith-2025/ | 1 | 1 | 1.00 | 236 | 0 | project |

## Top paid landing pages

| Page | Paid Sessions |
|------|--------------|
| /gevelisolatie/afwerkingen/ | 48 |
| /gevelisolatie/ | 31 |
| / | 10 |
| /gevelisolatie/kosten/ | 9 |
| (not set) | 3 |

## Top organic search landing pages

| Page | Organic Sessions |
|------|-----------------|
| / | 66 |
| (not set) | 13 |
| /over-ons/ | 5 |
| /onze-werken/ | 4 |
| /buiten-stucwerk/ | 3 |
| /gevelisolatie/ | 3 |
| /gevelisolatie/afwerkingen/ | 3 |
| /onze-werken/etten-leur-gevelisolatie-10cm-ral9010-2025/ | 3 |
| /sierpleister/ | 3 |
| /gevelisolatie/kosten/ | 2 |
| /onze-werken/klaaswaal-gevelisolatie-6cm-sierpleister-2025/ | 2 |
| /contact/ | 1 |
| /muren-stucen/ | 1 |
| /onze-werken/etten-leur-gevelisolatie-6cm-strikolith-2025/ | 1 |

---

## Weak engagement pages (0 pages with sessions >= 5, engagement < 30%)

No weak-engagement pages detected.

## Unmapped / legacy landing pages (1 pages with sessions > 0)

| Page | Sessions | Eng Rate | Notes |
|------|----------|----------|-------|
| /onze-werken/spijkenisse-malledijk-stucwerk-schilderwerk-2024/ | 3 | 0.33 | unmapped: not in page_inventory |

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

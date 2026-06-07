# 02 — SEO Query Loss / Gain & Ownership (GSC truth layer)

Windows: **current** 2026-05-06→06-02 vs **previous** 2026-04-08→05-05 (both 28d). `[GSC]`
Data: `processed/query_gap_matrix.csv`, `processed/query_page_ownership_map.csv`, `processed/_money_page_metrics.json`.

## Site-level
- Organic is low-volume: site clicks ~1–5/day, avg position ~17–20. Organic is a **minor** lead channel today.
- GA4 organic sessions **131 → 73 (−44%)**, organic key events 6 → 1. Paid sessions 137→106, Contact_Form_Site 6→6.
  → Organic softened in both traffic and conversions; paid lead capture is stable. `[GA4]`

## Money-page metrics (impr / clicks / avg-pos, previous → current)
| Page | impr p→c | clicks p→c | pos p→c | Read |
|---|---|---|---|---|
| /gevelisolatie/ | 627→574 | 9→9 | 19.3→**15.5** | stable, position improving |
| **/gevelisolatie/kosten/** | 456→**285** | 4→3 | 18.5→**25.5** | **declining (impr −37%, pos worse)** |
| /gevelisolatie/afwerkingen/ | 163→202 | 1→2 | 23.5→**11.1** | improving |
| /buiten-stucwerk/ | 1078→**782** | 1→6 | 12.1→13.5 | impr −27%, clicks up |
| /sierpleister/ | 306→231 | 2→1 | 24.0→21.6 | mild decline |
| /muren-stucen/ | 1434→1446 | **0→0** | 38.7→35.1 | high impr, pos ~35, **0 clicks** (too deep) |
| /gevel-schilderen/ | 407→463 | 2→0 | 34.5→37.0 | weak, deep |
| **City pages (group)** | **854→191** | 3→4 | — | **impressions −78%; 20→18 pages visible** |

## Top losses (previous → current)
**Lost queries (≥20 prev impr):** `gevelisolatie breda` −124 impr (pos 19.9→gone); `isolatie maassluis` −39;
`isoleren maassluis` −36; `klussenbedrijf 010 vlaardingen rotterdam` −27. `[GSC]`

**Fell >5 positions (commercial focus):**
- `kosten gevelisolatie` 21.0→51.8 (impr 85→30)
- `gevelisolatie kosten` 30.7→52.7 (impr 124→56)
- `wat kost gevelisolatie` 38.7→56.4
- `buiten stucwerk` 23.9→44.0 (impr 33→2)
- `muren stucen` 26.2→43.0
- `buitenmuur isoleren en stucen` 3.0→42.1
- `sierpleister prijs` 26.6→61.5
- `kosten buitenmuur stucen` 22.4→44.6

→ The **kosten/prijs cluster and buiten-stucwerk are in genuine ranking decline**; **city visibility collapsed**.

## Query × page ownership problems (cannibalization) `[GSC query×page, current]`
| Query | Actual owner | Expected | Issue |
|---|---|---|---|
| gevelisolatie rotterdam | **/** (homepage) | /gevelisolatie/rotterdam/ | hub/home outranks city page |
| buitengevelisolatie rotterdam | /gevelisolatie/ (hub) | /gevelisolatie/rotterdam/ | hub outranks city page |
| klusbedrijf rotterdam / klussen rotterdam | / | /gevelisolatie/rotterdam/ | home owns local query |
| buitenstucwerk vught | /onze-werken/ (project) | /buiten-stucwerk/ | project page owns service query |
| gevelisolatie almere | /onze-werken/almere…/ | /gevelisolatie/ | project page owns head query |
| buiten sierpleister | /gevelisolatie/afwerkingen/ | /sierpleister/ | wrong cluster page |

→ City pages are **not winning their own geo queries** — the homepage/hub ranks instead. This is a
**page-authority / internal-signal / differentiation** problem, **not** a doorway/thin-content issue
(city pages are indexed, ~1100 words, unique meta — see 2026-06-06 crawl). No noindex/canonical/redirect proposed.

## Diagnosis (GSC layer, before SERP/competitor confirmation)
- **Confirmed decline:** kosten cluster, buiten-stucwerk impressions, city-page visibility. `[GSC]` medium-high
- **Cannibalization confirmed** for Rotterdam/local + some service queries owned by home/hub/project pages. `[GSC]` high
- Whether this is demand, ranking, or SERP-structure (AIO/local-pack/competitors) → resolved in memo 03 with DataForSEO.

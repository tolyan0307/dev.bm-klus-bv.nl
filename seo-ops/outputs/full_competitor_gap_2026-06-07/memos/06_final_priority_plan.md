# 06 — Final Priority Plan (Action Backlog)

READ-ONLY audit. Nothing changed. This is a prioritized backlog, **not** "wait". Every item: problem → evidence →
exact change → expected effect → risk → files → timing. Confidence reflects low organic + low-conversion volume.

DataForSEO total spend this audit: **$1.36 / $3** (94 SERP results ok, 12 mobile timeouts; desktop coverage complete). Backlinks API: **not in subscription → authority not measured.**

## What the evidence says (one paragraph)
BM is beaten organically by **contractors and niche service sites, not aggregators** (contractors = 4.5–8.8 of every
top-10; city queries ~88% contractors). The two **measurable, fixable** gaps are: (1) **no €/m² price table** on the
kosten/city/service pages that all ranking competitors have, and (2) **thin, cannibalized city pages** (homepage
outranks them for their own geo query; competitors run 2,200–5,600-word city pages). Where BM is already
content-competitive (buiten-stucwerk, hub), the residual gap is **authority/links — not measured**, so no content
work is justified there. Paid remains the stable lead engine (Contact_Form_Site 6→6) but is **Ad-Rank-capped**
(rank-lost IS 62–72%) and **signal-starved** (~5 conv/28d).

---

## P0 — Urgent, affects leads/money

| # | Page/Campaign | Problem | Evidence | Exact change | Expected effect | Risk | Files | Timing |
|---|---|---|---|---|---|---|---|---|
| P0-1 | `/gevelisolatie/kosten/` | pos 18.5→25.5, impr −37%; kosten queries fell to ~52 | GSC; crawl: **no price table** vs competitors' price tables | Add €/m² **price table** + `Wat bepaalt de prijs` + worked rekenvoorbeeld + short nadelen + 2–3 project-cost proof links | Recover kosten queries from ~50 toward ~15–25; more organic lead intent | low (additive) | `app/gevelisolatie/kosten/page.tsx`, `lib/content/gevelisolatie.ts` | after approval |
| P0-2 | Ads measurement | Phone/WhatsApp fire but are **not counted** conversions → Max-Conv starved (~5/28d) | Ads conv-by-action: only form counts; rank/IS data | After verifying tel/wa events fire (test in `2026-06-06/memos/03_form_test_checklist.md`), add Phone + WhatsApp as counted conversions | 2–3× more bidding signal → better Max-Conv | low-med | Google Ads UI (no repo) | after verification |
| P0-3 | Lead reconciliation (carry-over) | April drop real vs tracking-artifact still unresolved | 2026-06-06 audit | Export WP `bm/v1/contact` submissions/day 04-06→now; GTM version history | Confirms root cause before any Ads change | none (read) | — | do now (user) |

## P1 — SEO money pages

| # | Page | Problem | Evidence | Exact change | Expected effect | Risk | Files | Timing |
|---|---|---|---|---|---|---|---|---|
| P1-1 | `/buiten-stucwerk/` | `buitenmuur stucen` 24→44; nadelen query lost | GSC; crawl: BM content-strong already | Promote nadelen to own H2 + onderhoud + alternatieven comparison + freshness date + internal links from project pages | Capture nadelen/kosten long-tail | low | `app/buiten-stucwerk/page.tsx`, `lib/content/buiten-stucwerk.ts` | after approval |
| P1-2 | Ads keywords | informational terms spend w/o converting | `ads_keyword_action_matrix.csv` | Lower bid/tighten `gevel van buiten isoleren` (€58/0), `buitenmuur isoleren en stucen` (€42/0); protect steenstrips/bekleden cluster | Lower CPA, redirect budget to converters | low | Ads UI | after confirmation |
| P1-3 | `/sierpleister/`, `/muren-stucen/`, `/gevel-schilderen/` | high impr, deep pos, ~0 clicks; BM closest (#22–38) | GSC; crawl: no price table | Add `prijs` €/m² block per page | Convert near-miss rankings (#22–38) into clickable positions | low | respective `app/<route>/page.tsx` | after approval |

## P2 — City / local authority & structure

| # | Page | Problem | Evidence | Exact change | Expected effect | Risk | Files | Timing |
|---|---|---|---|---|---|---|---|---|
| P2-1 | City pages (cannibalization) | homepage/hub outranks city pages for their own geo query | GSC ownership map | Add city-anchored internal links to each city page from home portfolio, hub, nearby project pages | City page becomes owner of `gevelisolatie {city}` | low | `app/page.tsx`, `app/gevelisolatie/page.tsx`, `app/onze-werken/*`, `lib/content/gevelisolatie-locations.ts` | after approval |
| P2-2 | City pages (depth) — **Top-5: Rotterdam, Breda, Den Haag, Leiden, Dordrecht** | impr −78%; thin (1148 w/4 FAQ) vs competitors' 2,200–5,600 w city pages | GSC; crawl | Add `Kosten in {city}` price block, nearby-projects w/ photos, local proof (wijk/gemeente/subsidie), FAQ 4→6–8, unique hero | Recover city impressions; win local queries | low (additive, no noindex/canonical) | `app/gevelisolatie/[location]/page.tsx`, `lib/content/gevelisolatie-locations.ts` | after approval (Top-5 first) |
| P2-3 | `/gevelisolatie/dordrecht/` | was "crawled, not indexed" (2026-06-06) | URL inspection | After P2-2 depth uplift, request indexing | Page enters index | none | — | after P2-2 |

## P3 — Hygiene

| # | Item | Problem | Exact change | Risk | Files | Timing |
|---|---|---|---|---|---|---|
| P3-1 | Ads | 75 zero-impression keywords | clean up | none | Ads UI | anytime |
| P3-2 | Project pages | each missing 1 image alt | add alt text | none | `app/onze-werken/*` | anytime |
| P3-3 | Measurement hardening | tel/wa events depend solely on GTM | add in-repo dataLayer pushes on tel/wa clicks; document GTM→GA4→Ads mapping | low | tel/wa link components | separate task |

## Paid ↔ SEO overlap (which paid terms should map to which pages)
| Paid converting cluster | Paid landing should be | Same SEO cluster status |
|---|---|---|
| `gevel isoleren en bekleden`, steenstrips, `gevelisolatie met stucwerk` | `/gevelisolatie/afwerkingen/` (improving, pos 23→11) | SEO improving — reinforce; paid validates intent converts |
| `buitengevelisolatie`, `gevelisolatie` | `/gevelisolatie/` hub | SEO weak but content-rich |
| kosten terms | `/gevelisolatie/kosten/` | **SEO declining → P0-1 price table** |
→ Paid proves the **steenstrips/bekleden/kosten** intent converts. Prioritize SEO work on exactly those pages
(P0-1 kosten, afwerkingen momentum) so organic captures the same validated demand.

## Do now / after approval / do not
- **Do now (read-only, user):** WP submission export + GTM history (P0-3); the manual conversion test; index re-check dordrecht.
- **Do after approval (scoped content/code tasks):** P0-1, P1-1, P1-3, P2-1, P2-2 (additive content + internal links); Ads P0-2/P1-2 after verification.
- **Do NOT do:** mass rewrites; delete/noindex/canonical/redirect on city pages; bid-strategy/budget overhaul before WP reconciliation + signal maturity; claim/act on an "authority gap" (not measured) by rewriting already-strong pages.

## Validation checkpoints
- **7-day:** WP↔GA4↔Ads reconciliation; confirm tel/wa fire; dordrecht index status; Max-Conv conv-count trend.
- **14-day:** GSC re-check kosten queries + city impressions after price-table/internal-link changes; Ads CPA after keyword curbs.
- **28-day:** re-run this competitor SERP pull; measure BM position movement on kosten + Top-5 city queries vs the named non-aggregator winners.

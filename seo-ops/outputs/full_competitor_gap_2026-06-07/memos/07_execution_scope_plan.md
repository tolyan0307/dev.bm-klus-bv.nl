# 07 — Scoped Implementation Plan (P0 + P1)  — PLAN ONLY, NOT EXECUTED

READ-ONLY. No site/Ads files changed. This converts P0/P1 from `06_final_priority_plan.md` into 3 independent,
surgical scopes. **Discipline:** every block below was checked against the *current* code — items that already
exist are marked "EXISTS — do not re-add". Source artifacts used:
`06_final_priority_plan.md`, `04_page_by_page_actions.md`, `05_ads_actions.md`,
`processed/{page_action_matrix,ads_keyword_action_matrix,non_aggregator_competitor_matrix,query_gap_matrix}.csv`.

> Filename note: the user referenced `06_final_priority_backlog.md` / `04_page-by-page_actions.md`; actual files are
> `06_final_priority_plan.md` / `04_page_by_page_actions.md`. Matrices `.csv` are present (no `.json` variants); all data needed was available.

## P0/P1 extracted from memo 06
- **P0-1** `/gevelisolatie/kosten/` price-table gap → **Scope A**
- **P0-2 / P1-2** Ads (count Phone/WhatsApp; lower-bid/pause informational terms) → **Scope C**
- **P0-3** WP/GTM reconciliation → carry-over (user task, not a code scope; restated at end)
- **P1-1** `/buiten-stucwerk/` nadelen/onderhoud → noted in Scope A appendix (lower priority; content already strong)
- **P1-3** price blocks on sierpleister/muren-stucen/gevel-schilderen → Scope A appendix
- City structural (P2) is **not** in this plan (P0/P1 only) **except** the cannibalization internal-link fix, which is
  cheap, high-leverage and gates city ROI → included as **Scope B** (top-5 only) per the user's explicit request.

---

# SCOPE A — SEO money page: `/gevelisolatie/kosten/`

### Goal
Recover the kosten cluster (pos 18.5→25.5, impr −37%) by matching the one SERP-rewarded element BM lacks: a
**structured €/m² comparison table**. Additive only — the page is otherwise content-complete.

### Evidence
- `[GSC]` `/gevelisolatie/kosten/` pos 18.5→25.5, impr 456→285; `gevelisolatie kosten` 30.7→52.7, `kosten gevelisolatie` 21→51.8.
- `[crawl]` BM kosten = 1445 w, `has_price_table=False`. Ranking non-aggregators all have an explicit price **table**:
  gevelrenovatie-info.nl/gevelisolatie/kosten (2693 w), isolatie-info.nl (2694 w), kooyisolatie.nl (1770 w). `non_aggregator_competitor_matrix.csv`
- `[Ads]` kosten-intent paid terms spend with 0 conv (`gevelisolatie buitenkant kosten`, `crepi gevel prijs`) → demand exists.

### Already EXISTS on the page (DO NOT re-add)
- `PriceCards` "Richtprijzen per m²" (prices as cards) — line ~411/416.
- "Welke factoren bepalen de prijs?", "Wat zit er in de prijs?", "Voorbeeldscenario's", "Besparen zonder kwaliteitsverlies".
- FAQ: steiger "niet inbegrepen" (line ~168), ISDE/subsidie (line ~188).
- `RelatedLinks` → `/gevelisolatie/subsidie-vergunning/` and `/onze-werken/` (lines ~232–238); project proof image (vught).

### Files to change
- `app/gevelisolatie/kosten/page.tsx` (primary)
- possibly a small new presentational component `components/page/PriceTable.tsx` (additive; or extend `PriceCards`)
- NO change to `lib/seo/*`, schema, routes.

### Exact additive content blocks
1. **€/m² comparison TABLE** (the core gap). Add **below/within** the existing "Richtprijzen per m²" section a
   `<table>` (do not delete PriceCards). Matrix:
   | Systeem / isolatiedikte | Afwerking sierpleister (€/m²) | Afwerking steenstrips (€/m²) |
   |---|---|---|
   | ETICS 6 cm | <richtprijs> | <richtprijs> |
   | ETICS 10 cm | … | … |
   | ETICS 12 cm | … | … |
   - Use the **same numeric ranges already shown in PriceCards** (do not invent new numbers — reuse existing data to
     avoid contradiction). Caption: "Richtprijzen incl. arbeid & materiaal, excl. steiger/herstelwerk — indicatie, definitieve prijs na opname."
2. **Visible "Inbegrepen / niet inbegrepen" two-column block** (surface what is currently only in FAQ): left =
   inbegrepen (arbeid, materiaal, basisdetaillering); right = niet inbegrepen (steiger, herstelwerk, complexe detaillering).
3. (Optional, low effort) one extra FAQ entry "Wat kost gevelisolatie per m² in 2026?" pointing at the table (helps featured-snippet/PAA).

### Title / meta / H1 decision
- **Do NOT change.** Current title 55 chars contains "kosten"; H1 present (1). `[crawl]` No evidence that title/meta is
  the lever (the gap is on-page table format, not the title). Changing them adds risk without evidence.

### Do NOT change
- URL, canonical, robots, JSON-LD schema, existing PriceCards numbers, existing FAQ/RelatedLinks. No rewrite of prose.

### Risk
Low (additive DOM + one component). Possible: table numbers contradicting PriceCards if not sourced from the same
constant → mitigate by reusing the existing price data object.

### Rollback plan
Single-file additive change → `git revert <commit>` or remove the added `<PriceTable/>`/`<table>` block. No data migration.

### Validation commands
```
npx tsc --noEmit          # must pass
pnpm build                # static export must succeed
```
Manual: confirm the table renders, prices equal the PriceCards values, no CLS regression on the kosten page.

### Expected metric movement
`gevelisolatie kosten` / `kosten gevelisolatie` avg position from ~52 toward ~20–30; kosten page impressions recover
toward the previous-window ~456. Low-confidence on magnitude (organic is low-volume; authority not measured).

### Checkpoint
**2026-06-21** (14 days): re-pull GSC for the page + queries; **2026-07-05** (28 days): re-run competitor SERP for
`gevelisolatie kosten`, `kosten gevelisolatie` and check BM movement vs gevelrenovatie-info/isolatie-info/kooyisolatie.

### Appendix (P1 same scope, after A ships)
- `/buiten-stucwerk/`: content already strong (2228 w, table, nadelen) → only promote `nadelen` to its own H2 +
  add `onderhoud`/`alternatieven` mini-table + freshness date + internal links from `/onze-werken/*buitenstucwerk*`. No rewrite.
- `/sierpleister/`, `/muren-stucen/`, `/gevel-schilderen/`: add the same €/m² table pattern (P2-level).

---

# SCOPE B — Local/city: TOP-5 city pages only

### Goal
Make each top-5 city page the **owner** of its own `gevelisolatie {city}` query (currently the homepage/hub
cannibalizes it), and add local proof depth. **No** noindex/delete/redirect/canonical.

### Top-5 selection (business value + measured signal)
| City | Why (data) |
|---|---|
| **Rotterdam** | HQ + highest demand; `gevelisolatie rotterdam` owned by **/** (homepage) — `query_page_ownership_map.csv` |
| **Den Haag** | large core-radius city; `buitengevelisolatie rotterdam`/hub cannibalization pattern; demand |
| **Leiden** | core-radius demand; SERP = 8.8 contractors/top10 (winnable with ownership) |
| **Dordrecht** | has a real featured project already; was "crawled-not-indexed" 2026-06-06 — needs ownership + index |
| **Breda** | **largest single query loss** `gevelisolatie breda` −124 impr (`query_gap_matrix.csv`); note: radius edge |

> Per-city *page* impressions are tiny (0–16) and some grow (rotterdam 2→12) — the loss is at **query** level
> (homepage absorbs geo queries), so the lever is **ownership/links**, not page volume. `[GSC]`

### Evidence
- `query_page_ownership_map.csv`: `gevelisolatie rotterdam`→`/`, `buitengevelisolatie rotterdam`→`/gevelisolatie/`,
  `klusbedrijf rotterdam`/`klussen rotterdam`→`/`.
- `[crawl]` BM city page 1148 w / 4 FAQ vs plusisolatie `/plaats/…rotterdam` 5610 w, isolatiespecialist `/zuid-holland/rotterdam` 2204 w/18 H2.

### Already EXISTS (DO NOT re-add)
- `LocationData` already has: `intro, localContext, woningTypes, afstanden, faq[4], bouwperiode, gemiddeldBesparing,
  subsidieInfo, vergunningTip, energieTip, gemeenteWebsite, nearbyLocations` — rich local proof + wijk references.
- Template already renders: hero `ResponsiveImage`, **kosten-calculator** (dynamic), "Wat kost gevelisolatie in {city}",
  featured projects (Dordrecht/Vlaardingen/Rotterdam **hardcoded**), nearbyLocations.

### Files to change
- `app/gevelisolatie/[location]/page.tsx` (rendering: internal links + per-city nearby project, FAQ render count)
- `lib/content/gevelisolatie-locations.ts` (data: expand faq[] for the 5 cities; per-city hero image ref if added)
- `app/page.tsx` + `app/gevelisolatie/page.tsx` + relevant `app/onze-werken/*` (add anchored internal links TO city pages)
- `lib/content/projects.ts` (read-only: to map nearest project per city)

### Exact changes
1. **Cannibalization fix (highest leverage, do first):** add internal links **to** each top-5 city page with anchor
   `gevelisolatie {city}` from: (a) homepage portfolio/area block, (b) `/gevelisolatie/` hub "regio" list, (c) the
   matching `/onze-werken/{project-in-that-city}` page. Goal: city page becomes the ranking owner instead of `/`.
2. **Per-city nearby-project proof:** the featured-project block is currently hardcoded to 3 cities — generalise it to
   pick the nearest real project for each of the 5 cities (Rotterdam/Dordrecht/Vlaardingen already have one; add
   nearest-project mapping for Den Haag, Leiden, Breda using `lib/content/projects.ts`). Real photos/links only.
3. **Expand FAQ 4 → 6** for the 5 cities (add 2 local Q each in `locations.ts`: doorlooptijd, subsidie/ISDE in {gemeente}).
4. **Unique hero/card image per city** if currently shared — assign a distinct existing project image per city (no new assets required; reuse `/images/projects/*`).

### Do NOT change
- No noindex / canonical / redirect / delete. No new URLs. Do not force identical edits across all 21 cities — only
  the 5; minimum-safe intervention per page (per `feedback_rollout_asymmetry`).

### Risk
Low. Internal-link changes are additive; the only behavioural risk is link-graph shifts → monitor that the hub itself
doesn't lose its own head term.

### Rollback plan
Per-file `git revert`; link additions and FAQ entries are isolated and reversible.

### Validation commands
```
npx tsc --noEmit
pnpm build
```
Manual: each top-5 city page renders its nearby project + 6 FAQ; homepage/hub now link to the city page.

### Expected metric movement
`gevelisolatie {city}` ownership shifts from `/` to `/gevelisolatie/{city}/` (re-check `query_page_ownership_map`);
city-page impressions rise off their ~0–16 base; Dordrecht enters index.

### Checkpoint
**2026-06-21** ownership map re-pull; **2026-07-05** re-run city SERP (rotterdam/den-haag/leiden/dordrecht/breda) +
GSC city impressions vs plusisolatie/isolatiespecialist/pluimers.

---

# SCOPE C — Google Ads rescue

### Goal
Improve efficiency (CPA €48–68; rank-lost IS 62–72%; Max-Conv starved ~5 conv/28d) **without** touching bid
strategy/budget until the WP reconciliation (P0-3) confirms the April drop was real vs. tracking.

### Evidence
`ads_keyword_action_matrix.csv` (buckets below); `05_ads_actions.md`; conv-by-action (only the form counts).

### Final action matrix (from `ads_keyword_action_matrix.csv`)
| Bucket | Keywords (cost / conv over 56d) | Action |
|---|---|---|
| **KEEP / protect** | `gevel isoleren en bekleden` (€107/3), `buitengevelisolatie` exact (€45/2), `buitengevelisolatie met steenstrips` (€36/1), `gevelisolatie met stucwerk` (€30/1), `gevelisolatie` phrase (€22/1), `gevelisolatie met steenstrips` (€12/2), `buitenmuur isoleren buitenkant` (€7/1) | protect bids/budget |
| **LOWER BID / monitor** | `gevel van buiten isoleren` phrase (€58/0), `buitenmuur isoleren en stucen` phrase (€42/0) | reduce bid / tighten match |
| **PAUSE candidate** (after ≥2 wks of 0 conv) | `huis isoleren buitenkant` exact (€25/0), `isolatie buitengevel` phrase (€24/0), `huis aan buitenkant isoleren` phrase (€18/0), `buitengevel isoleren` exact (€16/0) | pause |
| **NEGATIVE** | none egregious — top waste search terms are on-topic (no DIY/retail/jobs) | none |
| **NEEDS DATA** | 90 low-volume keywords | observe |
| **HYGIENE** | 75 zero-impression keywords | cleanup (no cost) |

### Paid search-term → landing-page mapping (the user's explicit check)
`[Ads search terms, current+previous]` — these spend with ~0 conversions and are routed sub-optimally:
| Search-term intent | Examples (cost/0 conv) | Should land on |
|---|---|---|
| **Afwerking (steenstrips/crepi/bekleden)** | `gevelisolatie met steenstrips` €7, `buitengevel isoleren en bekleden` €6, `gevelisolatie met crepi` €5, `gevel isolatie met steenstrips` €4 | **`/gevelisolatie/afwerkingen/`** (SEO-improving page, exact intent) |
| **Kosten/prijs** | `gevelisolatie buitenkant kosten` €3, `crepi gevel prijs` €1, `steenstrips buitengevel kosten` | **`/gevelisolatie/kosten/`** |
→ **Action:** verify the ad groups serving these terms point their final URL to the matching page above. Mismatched
landing pages hurt **Ad Rank/relevance** — directly relevant to the 62–72% rank-lost IS. (Read-only check first; change is an Ads-UI final-URL edit, not a bid/budget change.)

### Do NOT change
- Bid strategy (MAX_CONVERSIONS) and budget (€9/day): **no change without separate confirmation** + WP reconciliation.
- Do not add Phone/WhatsApp as counted conversions until they are **verified firing** (test in `2026-06-06/memos/03_form_test_checklist.md`).

### Risk
Pausing/lowering on <5 conv/28d is low-volume → low confidence; act cautiously, monitor 2 weeks. Landing-URL
re-pointing is low risk and reversible.

### Rollback plan
All Ads changes are reversible in-platform (re-enable keyword, restore bid, revert final URL). Keep a before/after
screenshot of keyword statuses + final URLs.

### Validation commands / checks
- Re-pull Ads keyword + search-term + IS after 7/14 days (reuse `raw/_pull_ads.py`).
- Watch: CPA, conv count (Max-Conv signal), rank-lost IS after landing-URL alignment.

### Expected metric movement
Lower wasted spend on the 2 lower-bid + 4 pause terms (~€90/56d); better ad relevance from correct landing pages →
rank-lost IS improves; conv signal preserved on KEEP cluster.

### Checkpoint
**2026-06-14** (7 days) first Ads re-pull; **2026-06-21** (14 days) decide pause confirmations.

---

# Recommended execution order

| Step | When | What | Gated by |
|---|---|---|---|
| **Step 1 — today (2026-06-07)** | now | (a) **Scope C read-only checks**: verify afwerking/kosten search-term landing URLs; (b) **Scope B-1 cannibalization internal links** (cheapest, highest leverage, additive); (c) user runs **P0-3** WP-submission export + GTM history | none (additive / read-only) |
| **Step 2 — after Step-1 validation** | after `npx tsc --noEmit` + `pnpm build` pass | **Scope A**: kosten €/m² table + inbegrepen/niet-inbegrepen block | Step 1 build green |
| **Step 3 — after 7 days (2026-06-14)** | post first re-pull | **Scope B-2/3/4** (per-city nearby project, FAQ 4→6, unique hero for top-5); **Scope C** lower-bid the 2 terms; add Phone/WhatsApp conversions **iff** verified firing | 7-day Ads/GSC re-pull + form test result |
| **Step 4 — after 14/28 days (2026-06-21 / 07-05)** | post checkpoint | Confirm Ads **pause** candidates (still 0 conv); extend price-table pattern to sierpleister/muren-stucen/gevel-schilderen; re-run competitor SERP to measure BM movement; decide on city scope expansion beyond top-5 | 14/28-day metrics |

**Carry-over (not a code scope):** P0-3 WP `bm/v1/contact` submission export + GTM version history — the only
unresolved root-cause check from the 2026-06-06 audit; do this in parallel from Step 1. It is the gate for any
bid-strategy/budget change.

**Nothing in this memo has been executed.** All site/Ads files are unchanged.

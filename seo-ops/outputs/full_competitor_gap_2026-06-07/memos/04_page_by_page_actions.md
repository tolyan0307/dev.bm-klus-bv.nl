# 04 — Page-by-Page Actions (additive only)

READ-ONLY. No URL/canonical/noindex/redirect changes. No mass rewrites. Every change traces to a measured gap.
Evidence: `memo 03`, `raw/competitor_crawls/competitor_crawl.json`, GSC `memo 02`.
File paths are the likely owners (confirm before editing): `app/<route>/page.tsx` and `lib/content/*.ts`.

---

## A. `/gevelisolatie/kosten/`  — P0 (commercial core, confirmed decline)
**Problem:** avg position 18.5→**25.5**, impressions 456→285 (−37%); `gevelisolatie kosten` 30.7→52.7,
`kosten gevelisolatie` 21→51.8. `[GSC]`
**Why competitors win (measured `[crawl]`):** gevelrenovatie-info (2693 w), isolatie-info (2694 w), kooyisolatie
(1770 w) all rank with an **explicit €/m² price table**; BM page = **1445 w, NO price table** (rekenvoorbeeld text only),
nadelen absent.

**Exact additive changes (no URL change):**
1. **Add a structured price table** (the single biggest gap). H2 `Gevelisolatie kosten per m² (2026)` with a real
   `<table>`: rows = systeem/dikte (6/10/12 cm), afwerking (sierpleister vs steenstrips), columns = richtprijs €/m²
   incl. btw. Use honest ranges (no fake precision). Mark "indicatie, definitieve prijs na opname."
2. **Add H2 `Wat bepaalt de prijs?`** (geveloppervlak, dikte/Rc, afwerking, steigerwerk, voorbereiding, gevelstaat).
3. **Add H2 `Rekenvoorbeeld 100 m² gevel`** (step-by-step indicatief totaal) — extends existing rekenvoorbeeld into a worked example.
4. **Add H2 `Subsidie (ISDE) en het effect op de kosten`** (link to existing /gevelisolatie/subsidie-vergunning/).
5. **Add a short `Nadelen / aandachtspunten` block** (eerlijk, kort) — competitors include it on the kosten page.
6. **Add project-cost proof:** 2–3 links to `/onze-werken/` cases with real m²/afwerking (factual, no invented prices).
**Title/meta:** current title (55 chars, contains "kosten") is within limits — **do not rewrite**; optionally ensure
"per m²" and "2026" appear in the description (additive, ≤160). No slug/canonical change.
**Expected effect:** match SERP intent for kosten queries (price-table is the rewarded block) → recover from pos ~50 toward ~15–25.
**Risk:** low (additive). **Files:** `app/gevelisolatie/kosten/page.tsx` (+ `lib/content/gevelisolatie.ts` if content is centralized).
**Do:** after approval (content task).

---

## B. `/buiten-stucwerk/`  — P1
**Problem:** `buitenmuur stucen` 23.9→44, `buitenmuur stucen nadelen` dropped, impr 1078→782. `[GSC]`
**Why competitors win:** stukadoor-expert (13 H2, price table), **stukadoorsclub has a dedicated
`/blog/buitenmuur-stucen-nadelen` article**. BUT BM `/buiten-stucwerk/` is **already content-strong** (2228 w, 15 H2,
**price table present**, nadelen present, 10 FAQ) — often deeper than the pages outranking it.
**Therefore the gap is NOT content depth.** Likely freshness / internal links / **authority (NOT measured)**.

**Exact additive changes (small, no rewrite, no new URL):**
1. **Strengthen the existing `nadelen` block** into a clearly-headed H2 `Nadelen van buitenmuur stucen` with 4–6
   concrete points + how BM mitigates them (this is the angle `buitenmuur stucen nadelen` rewards). Keep it on the same page.
2. **Add H2 `Onderhoud`** and **H2 `Alternatieven` (sierpleister vs cementpleister vs gevelisolatie+afwerking)** with a small comparison table, if not already explicit.
3. **Refresh signals:** add an updated "bijgewerkt 2026" date and 2–3 internal links from project pages
   (`/onze-werken/*-buitenstucwerk-*`) back to `/buiten-stucwerk/` with anchor "buitenmuur stucen".
**Title/meta:** within limits — no change.
**Expected effect:** capture `nadelen`/`kosten` long-tail; freshness + internal links lift a content-ready page.
**Risk:** low. **Files:** `app/buiten-stucwerk/page.tsx`, `lib/content/buiten-stucwerk.ts`, relevant `app/onze-werken/*` for links.
**Do:** after approval.

---

## C. City pages (`/gevelisolatie/{city}/`)  — P2 structural
**Problem:** city-group impressions **854→191 (−78%)**; `gevelisolatie breda` −124 impr; **homepage/hub
cannibalizes** city pages for their own geo query (`gevelisolatie rotterdam` owned by `/`). `[GSC]`
**Why competitors win (measured `[crawl]`):** national contractors run **deep programmatic city pages** —
plusisolatie `/plaats/…rotterdam` **5610 w + price table + reviews**, isolatiespecialist `/zuid-holland/rotterdam` **2204 w / 18 H2**.
BM city page = **1148 w, 4 FAQ, no price table**. **This is page depth + internal-signal, NOT doorway.**
**No delete / noindex / canonical / redirect.**

**Exact additive changes (template-level, applies to all city pages):**
1. **Fix cannibalization first (highest leverage, lowest effort):** add city-anchored internal links **to** each city
   page **from** the homepage portfolio, the `/gevelisolatie/` hub, and any `/onze-werken/` project in/near that city,
   using anchor "gevelisolatie {city}". Goal: make the city page the chosen owner instead of `/`.
2. **Add a `Kosten gevelisolatie in {city}` block** with the same €/m² price table as the kosten page (templated).
3. **Add `Projecten in de buurt van {city}`** — link 1–3 real `/onze-werken/` cases nearest that city, with photos (factual).
4. **Add local proof:** wijk/district wording, "{gemeente} vergunning/subsidie" note, region phrasing
   (exact governance phrase where used).
5. **Expand FAQ 4 → 6–8** with local Q (vergunning in {gemeente}, doorlooptijd, subsidie).
6. **Unique hero/intro per city** (avoid near-duplicate intros) — minimum-safe per-page edit, proportional to need.
**Title/meta:** keep within limits; ensure city + service in title.
**Top-5 cities to do first** (by loss + demand + cannibalization + index): **Rotterdam** (cannibalized, top demand),
**Breda** (−124 impr, biggest single loss), **Den Haag**, **Leiden**, **Dordrecht** (was "crawled-not-indexed" on 2026-06-06 — re-check + strengthen).
**Expected effect:** city pages win their own geo queries; recover the −78% impression loss over 4–8 weeks.
**Risk:** low (additive); do NOT force equal edits per city — minimum safe intervention per page.
**Files:** `app/gevelisolatie/[location]/page.tsx`, `lib/content/gevelisolatie-locations.ts`, homepage portfolio + project pages for links.
**Do:** after approval (start with Top-5).

---

## D. Secondary pages
- `/sierpleister/` (2536 w) — add a `sierpleister prijs` €/m² block (P2). Files: `app/sierpleister/page.tsx`.
- `/muren-stucen/` (1790 w, pos ~35, 0 clicks; BM closest at #24 sausklaar) — add price + proces blocks for
  `sausklaar/behangklaar stucen` (P2). Files: `app/muren-stucen/page.tsx`.
- `/gevel-schilderen/` (2536 w; BM #25 on `gevel schilderen kosten`) — add price table (P2). Files: `app/gevel-schilderen/page.tsx`.
- `/gevelisolatie/afwerkingen/` — **improving** (pos 23→11); no action, keep momentum.

## E. Cross-cutting (measurement caveat)
Authority/backlinks NOT measured (no DataForSEO backlinks subscription). For pages already content-competitive
(buiten-stucwerk, hub, sierpleister) the residual gap is most likely links/authority — **do not invent content work
to "fix" an unmeasured authority gap.** If authority is the real lever, that is a separate off-page program
(citations, GBP, niche directories), not page rewrites.

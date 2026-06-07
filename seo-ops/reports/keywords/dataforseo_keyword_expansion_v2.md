# DataForSEO Scenario 2: Keyword Expansion — Decision Memo

**Date:** 2026-04-09
**Endpoint:** `POST /v3/dataforseo_labs/google/related_keywords/live`
**Seeds:** 8 (2 per service area) + 2 from prior v1 run (gevelisolatie)
**Total keywords returned:** 69 (across 4 areas) + 18 (gevelisolatie v1)
**API cost:** $0.087 (this run) + $0.022 (v1 run) = $0.109 total
**Cumulative DataForSEO spend:** ~$0.20

---

## 1. Candidate Expanded Keyword Clusters

### A. buiten-stucwerk (seeds: "buitenmuur stucen", "gevel stucen")

| Keyword | Vol | CPC | Intent | Assessment |
|---------|-----|-----|--------|-----------|
| buitenmuur stucen waarmee | 70 | 0.20 | commercial | Material selection query — informational, weak |
| buitengevel stucen prijs m2 | 70 | 1.26 | commercial | Price query — commercial, already partially covered by page |
| huis stucen buitenkant vergunning | 40 | — | commercial | Permit question — partially addressed in content |
| buitenmuur stucen betonlook | 20 | — | commercial | Specific finish style — niche |
| buitenmuur stucen wit | 10 | 0.30 | commercial | Color variant — low vol |
| buitengevel stucen materiaal | 10 | — | commercial | Material variant — low vol |

**10 of 16 returned keywords already tracked.** Coverage is solid.

### B. sierpleister / spachtelputz (seeds: "sierpleister", "spachtelputz")

| Keyword | Vol | CPC | Intent | Assessment |
|---------|-----|-----|--------|-----------|
| spachtelputz | 6600 | 0.93 | commercial | Head term — existing page partially targets this |
| spachtelputz verwijderen | 880 | 0.81 | commercial | DIY/maintenance — not service-hire intent |
| spachtelputz glad maken | 720 | 0.79 | transactional | DIY smoothing — not BM Klus service |
| spachtelputz repareren | 720 | 0.43 | commercial | Repair — could be service-hire or DIY |
| spachtelputz verven | 720 | 0.42 | commercial | Painting over — DIY intent dominant |
| spachtelputz aanbrengen | 480 | 2.33 | commercial | Application — could be service-hire, highest CPC |
| spachtelputz gamma | 210 | 0.22 | navigational | Retail — noise |
| spachtelputz hornbach | 140 | 0.10 | navigational | Retail — noise |
| soorten sierpleister | 110 | 2.35 | transactional | Types/selection — commercial, relevant |
| sierpleister verwijderen | 110 | 0.62 | transactional | Removal — could be part of renovation service |
| granol sierpleister | 70 | 0.32 | navigational | Brand — noise |
| spachtelputz praxis | 70 | 0.13 | navigational | Retail — noise |
| sierpleister gamma | 50 | 0.17 | navigational | Retail — noise |
| sierpleister aanbrengen met roller | 50 | 0.28 | commercial | DIY technique — noise |
| sierpleister plafond | 50 | 0.20 | transactional | Interior ceiling — possibly off-scope |

**Only 2 of 18 already tracked.** Largest gap area. But most volume is DIY/navigational.

### C. muren-stucen / sausklaar (seeds: "muren stucen", "sausklaar stucwerk")

| Keyword | Vol | CPC | Intent | Assessment |
|---------|-----|-----|--------|-----------|
| muur stucen zelf | 720 | 0.46 | transactional | DIY — not service-hire |
| zelf stucen met fix & finish | 260 | 0.33 | transactional | DIY product — noise |
| grove muur stucen | 210 | 1.24 | transactional | Rough wall substrate — relevant for service page |
| zelf stucen met stucpasta | 170 | 0.28 | commercial | DIY product — noise |
| sausklaar stucen prijs | 140 | **4.13** | commercial | **Strong commercial signal** — price query |
| muur stucen met roodband | 140 | 0.43 | transactional | DIY product-specific — noise |
| muur stucen met cement | 110 | 1.43 | transactional | Material/method — partially relevant |
| wat is sausklaar stucen | 50 | **3.96** | commercial | **Definition with high CPC** — intent is strong |

**6 of 17 already tracked.** Mix of DIY and genuine commercial queries.

### D. gevel-schilderen / silicaatverf (seeds: "gevel schilderen", "silicaatverf")

| Keyword | Vol | CPC | Intent | Assessment |
|---------|-----|-----|--------|-----------|
| buitenmuur verven ideeen | 320 | 0.23 | informational | Inspiration — pre-purchase, weak |
| silicaatverf | 210 | 0.78 | commercial | Head term — exists in content, not as standalone |
| buitenmuur verven kleur | 170 | 0.72 | commercial | Color selection — pre-purchase |
| oude buitenmuur schilderen | 140 | **4.18** | commercial | **Renovation intent, high CPC** — strong signal |
| buitenmuur verven zonder voorstrijk | 70 | 0.22 | transactional | DIY technique — noise |
| gevel schilderen prijs per m2 | 50 | **4.65** | commercial | **Highest CPC in entire dataset** — direct commercial |

**3 of 16 already tracked.** Strong commercial signals in price and renovation queries.

### E. gevelisolatie (from v1 run — 2 seeds)

Already analyzed in v1 report. 3 genuinely new keywords found:
- "zelf buitenmuur isoleren" (140, DIY)
- "wetgeving isolatie buitenmuur" (70, commercial)
- "buitenmuur isoleren en bekleden met hout" (50, off-scope finish)

**11 of 18 already tracked.** Best coverage among all areas.

---

## 2. Coverage Assessment by Cluster

### Already well-covered (no action needed)

| Area | Page | Evidence |
|------|------|----------|
| gevelisolatie | `/gevelisolatie/` + cluster pages | 11/18 already tracked, full cluster deployed |
| buiten-stucwerk | `/buiten-stucwerk/` | 10/16 already tracked, only 2 new at vol 70 |

### Partially covered (content strengthening possible)

| Area | Page | Gap description |
|------|------|----------------|
| muren-stucen | `/muren-stucen/` | Missing: "sausklaar stucen prijs" (CPC 4.13), "grove muur stucen" (vol 210), "wat is sausklaar stucen" (CPC 3.96) |
| gevel-schilderen | `/gevel-schilderen/` | Missing: "gevel schilderen prijs per m2" (CPC 4.65), "oude buitenmuur schilderen" (CPC 4.18) |
| sierpleister | `/sierpleister/` | Head term "spachtelputz" (vol 6600) only partially targeted; "soorten sierpleister" (CPC 2.35) worth anchoring |

### Weakly covered (largest gap, but mostly DIY traffic)

| Area | Page | Note |
|------|------|------|
| sierpleister (maintenance tail) | `/sierpleister/` | verwijderen (880), glad maken (720), repareren (720), verven (720) — high volume but predominantly DIY intent |

---

## 3. Noise / Low Priority / Out of Scope

### Retail/navigational keywords (NOISE — no action)
- spachtelputz gamma (210), hornbach (140), praxis (70)
- sierpleister gamma (50), hornbach (40)
- silicaatverf gamma (20)
- granol sierpleister (70)

**Rationale:** People searching for store-brand products at specific retailers. Not relevant for a service company.

### DIY keywords (NOISE — no new pages)
- muur stucen zelf (720), zelf stucen met fix & finish (260), zelf stucen met stucpasta (170)
- muur stucen met roodband (140)
- sierpleister aanbrengen met roller (50)
- buitenmuur verven zonder voorstrijk (70)

**Rationale:** DIY product-specific queries. The audience is explicitly NOT looking for professional service. Creating content for these would attract non-converting traffic.

### Low-volume variants (MONITOR — no action now)
- buitenmuur stucen betonlook (20), wit (10), materiaal (10)
- silicaatverf buiten (40), binnen (30)
- gevel schilderen nadelen (10)
- sausklaar betekenis (40)

**Rationale:** Below threshold for content investment. May surface in GSC organically.

---

## 4. Keywords Worth Carrying Forward

### Tier 1: Confirmed commercial expansion (high CPC, clear service-hire intent)

| Keyword | Vol | CPC | Current coverage | Action type |
|---------|-----|-----|-----------------|-------------|
| gevel schilderen prijs per m2 | 50 | 4.65 | Weak — exists in general content | Strengthen existing page anchor |
| oude buitenmuur schilderen | 140 | 4.18 | Not covered | Strengthen existing page content |
| sausklaar stucen prijs | 140 | 4.13 | Weak — price mentioned but not anchored | Strengthen existing page anchor |
| wat is sausklaar stucen | 50 | 3.96 | Not explicitly answered | Add FAQ or content block |
| soorten sierpleister | 110 | 2.35 | Partially covered in afwerkingen | Verify on-page targeting |
| spachtelputz aanbrengen | 480 | 2.33 | Partially covered | Verify on-page targeting |

### Tier 2: Suspected but unverified (needs GSC/Ads confirmation)

| Keyword | Vol | CPC | Why suspected |
|---------|-----|-----|--------------|
| grove muur stucen | 210 | 1.24 | Substrate-specific, commercial intent, could drive qualified traffic |
| muur stucen met cement | 110 | 1.43 | Method-specific, some commercial intent |
| buitengevel stucen prijs m2 | 70 | 1.26 | Price variant, already partially covered |
| spachtelputz repareren | 720 | 0.43 | Could be professional repair service or DIY — ambiguous |
| sierpleister verwijderen | 110 | 0.62 | Could be part of renovation service — ambiguous |

### Tier 3: Theoretically interesting only

| Keyword | Vol | CPC | Why theoretical |
|---------|-----|-----|----------------|
| spachtelputz (head term) | 6600 | 0.93 | Massive volume but broad — /sierpleister/ already targets partially |
| spachtelputz verwijderen | 880 | 0.81 | High vol but DIY-dominant |
| spachtelputz glad maken | 720 | 0.79 | High vol but DIY smoothing |
| spachtelputz verven | 720 | 0.42 | High vol but painting over = DIY |
| buitenmuur verven ideeen | 320 | 0.23 | Inspiration search, pre-purchase, low conversion |
| buitenmuur verven kleur | 170 | 0.72 | Color selection, pre-purchase |

---

## 5. Final Conservative Memo

### Confirmed useful expansion themes

1. **Price/kosten variants per service page.** Three keywords with CPC >4.00 are not well-anchored on existing pages: "gevel schilderen prijs per m2", "sausklaar stucen prijs", "oude buitenmuur schilderen". These can be addressed by strengthening on-page H2/H3 anchors and FAQ entries — no new pages needed.

2. **"Soorten sierpleister" and "spachtelputz aanbrengen"** have commercial intent (CPC >2.00) and are partially covered. Verify whether existing `/sierpleister/` page has proper anchor text and heading targeting.

3. **"Wat is sausklaar stucen"** has CPC 3.96 despite low volume — strong commercial signal. This is a FAQ-style query that the `/muren-stucen/` page should explicitly answer if it doesn't already.

### Suspected but unverified expansion themes

4. **Sierpleister/spachtelputz maintenance cluster.** "Repareren" (720) and "verwijderen" (110) could represent renovation service demand (remove old + apply new). But they could also be pure DIY. **Wait for GSC data** — if these queries generate impressions for BM Klus pages, they may be worth strengthening. Do not act yet.

5. **Substrate-specific muren stucen queries.** "Grove muur stucen" (210) and "muur stucen met cement" (110) suggest people with specific wall conditions. Could be commercial if these people realize they need a professional. **Wait for GSC signals.**

### Out-of-scope or low-value themes

6. **Retail/navigational cluster** (gamma, hornbach, praxis, granol, sikkens brand queries) — irrelevant. Do not pursue.

7. **DIY technique cluster** ("zelf stucen", "met roller", "met fix & finish", "met stucpasta", "zonder voorstrijk") — these audiences are explicitly avoiding professional service. Do not create content for DIY audiences.

8. **Interior sierpleister/plafond** — "sierpleister plafond" (50) is interior scope, not aligned with BM Klus's exterior focus. Do not pursue.

### What should NOT be acted on yet

- **No new pages.** None of the discovered keywords justifies a new URL. All actionable items can be addressed within existing page content.
- **No rewriting.** The expansion keywords suggest content *anchoring* improvements, not structural rewrites.
- **No PPC changes.** The CPC data from DataForSEO is directional only. Do not add keywords to campaigns based solely on DataForSEO CPC estimates.
- **Do not treat "spachtelputz" vol 6600 as a ranking opportunity.** The existing `/sierpleister/` page already targets this space. The high volume is mostly DIY/informational. Verify GSC ranking position before any changes.
- **Do not confuse DataForSEO volume with real demand.** All numbers above are DataForSEO estimates, not verified through GSC or Ads data. They indicate *direction*, not *magnitude*.

### Methodology note

DataForSEO `related_keywords` endpoint was used with depth=1 and limit=50. This provides a surface-level semantic map. Deeper exploration (depth=2+) would yield more long-tail variants but at higher cost and diminishing returns. The 8-seed approach gives sufficient coverage for a diagnostic pass.

---

## Cost Summary

| Run | Seeds | Actual cost | Estimated |
|-----|-------|-------------|-----------|
| v1 related_keywords (gevelisolatie) | 2 | $0.022 | $0.150 |
| v2 expansion (4 service areas) | 8 | $0.087 | $0.088 |
| **Total Scenario 2** | **10** | **$0.109** | **$0.238** |
| **Cumulative DataForSEO spend** | — | **~$0.20** | — |

---

_Generated from `run_dataforseo_keyword_expansion_v2.py` output at 2026-04-09_

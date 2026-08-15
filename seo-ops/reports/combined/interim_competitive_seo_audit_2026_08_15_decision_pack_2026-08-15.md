# Decision Pack — Interim competitive SEO audit 2026-08-15

**Date:** 2026-08-15
**Scope:** Money pages + /gevelisolatie/ cluster vs live NL SERP competitors; query-level demand mapping; content-gap and trust-gap assessment. NOT a final audit — fixes interim conclusions before tooling expansion (MCP layer) and final plan.
**Report mode:** preliminary
**Live API calls:** GSC (snapshot rebuild), GA4 (snapshot rebuild), DataForSEO SERP advanced (8 keywords, ~$0.016)

---

## 1. Objective

Fix interim conclusions on: (a) why competitors outrank bm-klus-bv.nl on money queries, (b) what to rework. Final action plan is deferred until the data layer is expanded (MCP tooling, GBP audit, local-pack data).

## 2. Data sources used

| Source | Artifact path | Freshness | Rows/records |
|--------|--------------|-----------|-------------|
| GSC+GA4 combined snapshot | `data/processed/latest_combined_snapshot.json` | 2026-08-15 (28d window 2026-07-18→2026-08-14) | all sections OK |
| GSC query+page 90d | `snapshots/normalized/seo/gsc_query_page_last90d.csv` | 2026-08-15 (window 2026-05-15→2026-08-12) | 407 rows, 351 queries, 28 pages |
| DataForSEO live SERP | `snapshots/normalized/dataforseo/serp_snapshot_v1.json` | 2026-08-15, NL national (location 2528, nl) | 8 keywords, 48 competitor domains |
| Competitor page fetches | live fetch 2026-08-15 (6 pages) | 2026-08-15 | [competitor observation] |
| Own page fetches | live fetch bm-klus-bv.nl (5 money pages) | 2026-08-15 | — |

## 3. Current state

- GSC 28d: 58 clicks (−50 vs prev 28d), 5,739 impressions (−103) [GSC, 28d vs prev 28d, page-level]. Drop concentrated on homepage 82→42 clicks (branded), position improved 8.7→8.0.
- Key events 28d: Contact_Form_Site 11, Whatsapp 5, Phone 3 = 19 total vs 4 in prior window [GA4, 28d]. Part of growth may be tracking-change artifact (hypothesis, unverified vs WP submission log).
- Cluster /gevelisolatie/: 25 pages in GSC, impressions 988→1,043 (+55), clicks 10→8 [GSC, 28d vs prev 28d].
- Live SERP top-10 presence: **0/8 money keywords** (gevelisolatie, buitenmuur isoleren, gevelisolatie kosten, buiten stucwerk, gevel schilderen, sierpleister, gevelisolatie rotterdam, stukadoor rotterdam) [DataForSEO SERP, live 2026-08-15, NL national].

## 4. Key findings

1. **Content depth is NOT the gap** — own money pages (2,200–3,200 words, price tables with €/m², 8–10 FAQ, subsidy info incl. Rotterdam ETF/Duurzaam 010, neighborhood mentions) match or exceed ranking competitors (takkenkamp kosten page ≈1,000–1,200 words) [competitor observation, 2026-08-15].
   - Confidence: medium (single-day fetch, rendered-content approximation)
   - Impact: investing further in more text on existing pages is low-yield; effort must go elsewhere.

2. **National generic queries are dominated by authority platforms** — eigenhuis.nl, consumentenbond, milieucentraal, homedeal, slimster, gevelrenovatie-info.nl, stucwerk-info.nl, manufacturers (rockwool, gamma) [DataForSEO SERP, live, NL]. Contractors in top-10 are rare (takkenkamp, munneke, vanginkel, metsel-gigant).
   - Confidence: high (direct SERP observation)
   - Impact: fighting these queries with on-page content is a losing strategy; do not allocate effort there.

3. **Local commercial queries are won by trust + business age, not text** — stukadoor rotterdam winners show 4.9★/188 Google reviews/25 yrs (de Vries), 9.5/2,274 reviews/KOMO/10-yr warranty (plusisolatie) directly on page. Own pages mention "Google reviews" without visible rating/count [competitor observation].
   - Confidence: medium-high
   - Impact: review volume/display is the most visible competitive gap on winnable queries.

4. **Post-cutover ranking-signal age suppresses local pages** — /gevelisolatie/rotterdam/ received 3 impressions (GSC, 90d, page-level); city pages new since 2026-03-08, many not indexed. This is signal age, not content quality (do not conflate with URL/content age).
   - Confidence: medium
   - Impact: rewriting these pages now would reset settling; monitor-first policy stays.

5. **Largest untapped demand pools sit on mis-matched pages** [GSC, 90d, query-level]:
   - sausklaar/behangklaar cluster on /muren-stucen/: ≈3,100 impressions (GSC, 90d, query-level), 0 clicks (GSC, 90d). Top queries: sausklaar stucen — 813 impr, position: 19.6 (GSC, 90d); sausklaar stucwerk — 708 impr, position: 29.2 (GSC, 90d); behangklaar stucen — 435 impr, position: 32.9 (GSC, 90d); behangklaar stucwerk — 432 impr, position: 37.3 (GSC, 90d).
   - keimen cost cluster: ≈900 impressions (GSC, 90d, query-level) on /gevel-schilderen/ at position: 27–42 (keimen kosten 124, keimen gevel kosten 123, keimwerk prijs m2 119, etc.), page has keimen content but no dedicated page and no keimen-specific price.
   - Confidence: high (raw GSC data)
   - Impact: these are the two biggest realistic organic growth levers on the site.

6. **/gevelisolatie/ is optimized for jargon the market doesn't search** — ranks position: 6–11 for etics-queries (~270 impr total) but position: 46.5 for "buitengevelisolatie" (149 impr) [GSC, 90d, query-level]. Title: "Gevelisolatie buitenkant (ETICS) – prijs per m²" [site source, data/sitemap-plan.ts].
   - Confidence: medium
   - Impact: main cluster page invisible on the highest-volume phrasing of its own topic.

7. **CTR failure on a won position** — "gevel stucen": position: 3.0, 186 impr, 2 clicks (≈1% CTR; pos-3 norm 5–10%) on /buiten-stucwerk/ [GSC, 90d, query-level].
   - Confidence: high (raw data), interpretation medium (SERP features may absorb clicks)
   - Impact: cheapest possible win — title/snippet rework.

8. **Intent shift on "gevelisolatie rotterdam"** — SERP = broad isolatiebedrijven (spouwmuur/vloer/dak: plusisolatie, takkenkamp, si-isolatie, pluimers), municipal subsidy pages (rotterdam.nl, duurzaam010), directory (trustoo) [DataForSEO SERP, live]. Google reads the query as "insulation company Rotterdam", not "ETICS facade specialist".
   - Confidence: medium
   - Impact: pure-ETICS positioning may cap the ceiling on this query family.

9. **Anomaly to investigate** — "gevelrenovatie met folie in rotterdam" 376 impr position: 20.9 + "…in delft" 219 impr position: 36.6 [GSC, 90d, query-level]; unclear which page catches these and why.

## 5. Recommended actions (interim — final plan deferred until data layer expanded)

| Priority | Action | Category | Confidence | Expected impact |
|----------|--------|----------|------------|-----------------|
| 1 | Systematic Google review collection after every project; display live rating+count on money pages | CRO/Local | high | closes most visible gap vs local winners |
| 2 | Dedicated page "Gevel keimen: kosten per m²" | SEO | medium | captures ~900 impr/90d demand pool |
| 3 | Split sausklaar/behangklaar sub-intents from /muren-stucen/ (check cannibalization rules first) | SEO | medium | captures ~3,100 impr/90d pool |
| 4 | Retitle /gevelisolatie/ — lead with "Buitengevelisolatie", keep ETICS in body | SEO | medium | visibility on highest-volume topic phrasing |
| 5 | CTR test title /buiten-stucwerk/ (position: 3, 1% CTR) | SEO | medium | cheap click recovery |
| 6 | GBP audit (`run_local_seo_gbp_audit_v1.py`) + local pack data | Local | medium | local queries decided partly in map pack |
| 7 | Reconcile lead growth vs WP submission log | Measurement | high | validate 4→19 key-event jump |
| 8 | Do NOT invest in national generic informational queries | Strategy | high | avoids wasted effort |

## 6. What should NOT be changed

- Money page content depth/structure — already competitive; do not rewrite wholesale.
- City pages — post-cutover settling; monitor-first (per decision log / city-pages program).
- /gevelisolatie/ ETICS body content — it wins the etics niche (position: 6–11); only the title emphasis shifts.

## 7. Risks and uncertainties

- DataForSEO SERP = NL-national, desktop, non-personalized; GSC avg positions are impression-weighted and geo-mixed — the two are not directly comparable (explains "position: 3.0 in GSC but absent in national top-10").
- Local pack (map) items were not captured in this SERP run — local visibility picture incomplete.
- Key-event growth may be partially a tracking-change artifact (contact-methods/tracking commit); unverified against WP log.
- Seasonality (bouwvak Jul–Aug) plausibly depresses branded demand — hypothesis, not verified.
- Single-day SERP snapshot; volatility unknown.
- Competitor word counts are model-estimated from rendered fetches, not exact.

## 8. Provenance

- **Generated:** 2026-08-15
- **Report mode:** preliminary
- **Data sources used:** GSC 90d query-level (2026-08-15), GSC+GA4 combined 28d (2026-08-15), DataForSEO live SERP NL (2026-08-15), competitor/own live page fetches (2026-08-15), site source (data/sitemap-plan.ts)
- **Live API calls made:** GSC, GA4, DataForSEO SERP advanced (8 kw, ~$0.016)
- **Numeric confidence cap:** medium (preliminary mode)
- **Known limitations:** no local-pack data, no GBP data, no backlink data, no competitor GSC-equivalent data; enrichment sources labeled per source-hierarchy rules

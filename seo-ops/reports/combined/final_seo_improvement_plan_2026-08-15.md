# Final SEO Improvement Plan — bm-klus-bv.nl

**Date:** 2026-08-15
**Supersedes:** interim decision pack `interim_competitive_seo_audit_2026_08_15_decision_pack_2026-08-15.md` (section 5 "final plan deferred")
**Report mode:** final (data layer expanded as required by the interim pack: search volumes, competitor domains via Labs, backlink summary, Rotterdam local pack, GBP data)
**Live API calls this run:** GSC (MCP, 1 query), GA4 (MCP, 1 report), DataForSEO 25 tasks = **$0.34** (cost log: `outputs/dataforseo_cost_log.json`, analyzer `run_dataforseo_final_audit_collect_2026_08`)

---

## 0. MCP layer status (verified 2026-08-15)

| Server | Status | Evidence |
|--------|--------|----------|
| `gsc` (service account) | OK | `list_sites` → `https://bm-klus-bv.nl/` siteFullUser |
| `google-analytics` | OK | account 303130737 / property 428253147 |
| `dataforseo` | OK | `/appendix/user_data` 20000; note: MCP tool truncates responses to ~10 items → bulk collection done via `analyzers/seo/run_dataforseo_final_audit_collect_2026_08.py` (direct API, same creds) |

## 1. Data collected (new since interim pack)

| Source | Artifact | Scope |
|--------|----------|-------|
| Google Ads search volume (NL, nl) | `snapshots/raw/dataforseo/final_audit_2026-08/volume.json` | 99 keywords, 7 clusters, 12-month monthly series |
| Labs competitors_domain / ranked_keywords / serp_competitors / bulk_traffic / domain_rank_overview | `…/labs.json` | own domain + 18 competitor domains + 60 SERP competitors on cluster keyword set |
| Backlinks bulk_ranks / bulk_referring_domains / bulk_backlinks / summary / referring_domains | `…/backlinks.json` | own + 18 competitors |
| SERP advanced, **Rotterdam** (location_code 1010751), desktop, depth 20 | `…/serp_local.json` | 12 keywords incl. local_pack items |
| Business Data my_business_info | `…/gbp.json` | own GBP listing |
| Normalized summary | `snapshots/normalized/dataforseo/final_audit_2026-08_summary.json` | all of the above |
| GSC live (MCP) | inline | "folie" anomaly query→page, 2026-05-15→08-13 |
| GA4 live (MCP) | inline | landing page × channel, sessions/keyEvents, 2026-05-17→08-14 |

---

## 2. Findings that change the picture

### F1. Backlink hypothesis — CONFIRMED (confidence: high)

| Domain | DFS rank | Referring domains | Backlinks |
|--------|---------:|------------------:|----------:|
| **bm-klus-bv.nl** | **23** | **1** (improuse.com, UGC) | 13 |
| vanklassestukadoors.nl (LP3 stukadoor rotterdam) | 87 | 20 | 47 |
| munnekestukadoors.nl | 99 | 29 | 56 |
| vanginkelstukadoors.nl | 142 | 61 | 55 |
| rotterdamse-stukadoor.nl (#3 organic stukadoor rotterdam) | 139 | 119 | 134 |
| stucadoorsbedrijfdevries.nl (#1 organic stukadoor rotterdam) | 236 | 313 | 549 |
| si-isolatie.nl | 217 | 122 | 330 |
| stuc-gigant.nl | 174 | 249 | 411 |
| metsel-gigant.nl | 243 | 359 | 967 |
| takkenkamp.com | 312 | 726 | 8,411 |
| plusisolatie.nl | 287 | 1,243 | 4,434 |
| pluimers.nl | 262 | 1,095 | 2,184 |
| isolatiespecialist.nl | 308 | 3,297 | 4,647 |
| gevelrenovatie-info.nl | 281 | 332 | 1,270 |

[DataForSEO Backlinks, 2026-08-15]. Every competitor that ranks on winnable local queries has **20–300+ referring domains vs. our 1**. Content depth is already competitive (interim F1) → the domain-authority gap is the primary structural blocker for organic top-10 on commercial queries. This is the single most important finding of the final audit.

Labs traffic estimate confirms the same picture: bm-klus-bv.nl ETV ≈ 6 visits/month, 9 ranked keywords in the Labs DB (best: "sausklaar stucen" pos 12, "buitengevel isoleren en stucen prijs" pos 10); competitors: munneke 399, vanginkel 591, de Vries 621, si-isolatie 2,968, takkenkamp 5,140, plusisolatie 5,359, metsel-gigant 7,261, gevelrenovatie-info 8,293, jandeisolatieman 24,554 [DataForSEO Labs, NL, 2026-08-15; estimates, not measured traffic].

### F2. Local pack Rotterdam — 0/8 packs; GBP category is the lever (confidence: medium-high)

- Own presence in Rotterdam SERPs (12 keywords): **only 1 organic top-10** — `/gevel-schilderen/` #3 on "gevel schilderen rotterdam" (AI Overview present). Absent from all local packs [DataForSEO SERP Rotterdam, 2026-08-15].
- Own GBP: "BM klus BV", **primary category "Aannemer"**, additional: Bouwbedrijf, Schilder, Stukadoorsbedrijf; 4.9★ / 19 reviews; claimed; 49 photos; description mentions ETICS/gevelisolatie; review topics include "gevel" 10, "isolatie" 7, "stucwerk" 7, "communicatie" 4, **"taalbarrière" 3** [DataForSEO Business Data, 2026-08-15].
- Local pack "stukadoor rotterdam" / "buitenmuur stucen rotterdam": 9–12 listings, all stukadoor-categorised; **LP1–LP2 are keyword-named listings with only 12–16 reviews** (stukadoorrotterdam.net, rotterdamstukadoor.com); LP3 Van Klasse 4.8★/191; Batouz 5★/207. → Category + name relevance + proximity outweigh review count here; our 19 reviews are not the blocker, "Aannemer" is.
- Local pack "gevelisolatie rotterdam" / "isolatiebedrijf rotterdam" / "gevelisolatie" / "gevelisolatie bedrijf": entirely spouwmuur/vloer/dak isolatie companies + keyword-named listings with 1–22 reviews. Category "Isolatiebedrijf" is the entry ticket; ETICS-only positioning is invisible to Maps.
- "gevelrenovatie rotterdam": pack = gevelreiniging/voegwerk/impregneren specialists (KH 4.8★/76 "50+ jaar"). Partial fit.
- No local pack triggered for "gevel schilderen rotterdam" and "sierpleister rotterdam" (organic + AI Overview only).

### F3. Search demand by cluster (Google Ads, NL, monthly avg; confidence: high for volumes, medium for intent)

| Cluster | Head terms (vol) | Notes |
|---------|------------------|-------|
| Gevelisolatie | gevelisolatie 1,900 · buitenmuur isoleren 720 · buitengevelisolatie 480 · gevelisolatie buitenkant 480 · buitengevel isoleren 480 · kosten 320 · subsidie 320 · gevel isoleren 260 · etics 260 | Strong seasonality: Sep peak (gevelisolatie 3,600), Jul–Aug trough (1,300) → bouwvak hypothesis confirmed; Q4–Q1 is the window. Geo variants ("gevelisolatie rotterdam/delft/…") return **no Ads volume** (below threshold) — geo demand is tiny per city; GSC impressions on these come from broad-match/local intent, not from typed geo queries. |
| Muren stucen (interior) | stukadoor 9,900 · muren stucen 2,400 · plafond stucen 1,000 · **stukadoor rotterdam 480 (CPC €12)** · muren stucen kosten 390 · behangklaar 320 · stucen prijs per m2 320 · sausklaar stucen 260 · wanden stucen 210 · sausklaar stucwerk 170 · behangklaar stucen 140 · sausklaar 140 · behangklaar stucwerk 90 | sausklaar/behangklaar family ≈ **1,100/mo**; GSC 3,100 impr/90d at pos 19–37; Labs sees us pos 12–36 → nearest realistic win. |
| Buiten stucwerk | buitenmuur stucen 1,000 · **betonstuc 880** · buiten stucwerk 480 · cementpleister 170 · buitengevel stucen 170 · gevel stucen 140 | Page title targets "gevel stucen" (140) — smallest of the family; "betonstuc" (880) not covered. |
| Sierpleister | **spachtelputz 6,600** (CPC €0.99) · sierpleister 1,900 · crepi 480 · spachtelputz buiten 170 · sierpleister buiten 90 | spachtelputz volume is largely interior/DIY-product intent (low CPC, HIGH competition, retailers rank) — not a target for a facade page. |
| Gevel schilderen | buitenmuur verven 1,300 · **keimen 590** · buitenmuur schilderen 320 · **keimwerk 260** · gevel schilderen 210 · gevel keimen 110 · keimverf 90 · keimen gevel kosten 50 | keimen family ≈ **1,100/mo**; GSC ~900 impr/90d at pos 27–42 on a page whose title/H1 doesn't say keimen. |
| Gevelrenovatie | **gevelrenovatie 5,400** (CPC €7.24) · gevelrenovatie kosten 590 · gevel renoveren 260 · **gevelrenovatie rotterdam 210 (CPC €18.20)** · gevelfolie 110 | No page on the site. Highest CPC in the whole dataset → strong commercial value. Fit is partial (SERP = reiniging/voegwerk/impregneren) — decision needed. |

### F4. GA4 90d — where organic leads actually come from (confidence: high)

Organic Search key events by landing page, 2026-05-17→08-14: `/` 12 (branded), `(not set)` 3, `/gevelisolatie/` 3, `/contact/` 2, everything else 0. Paid: `/gevelisolatie/afwerkingen/` 9, `/gevelisolatie/` 7, `/buiten-stucwerk/` 2 [GA4]. → Non-brand organic produces ≈3–5 leads/quarter today; the growth levers below are additive, not a rescue of something that once worked.

### F5. "gevelrenovatie met folie" anomaly — resolved (confidence: high)

Query→page [GSC 2026-05-15→08-13]: "…in rotterdam" → `/` 380 impr pos 20.9; "…in delft" → `/gevelisolatie/delft/` 225 impr pos 36.9; leiden/den haag city pages 2–7 impr. Intent = kozijn/gevel-folie wrapping, not our service. No action; do not chase.

---

## 3. Final plan — prioritised

Ordering rule: (impact × confidence) ÷ effort, and P0 items are structural blockers that cap everything else.

### P0 — structural (start now, run continuously)

**A1. Link acquisition programme** — SEO/Authority — confidence high — target **≥25 referring domains in 6 months, ≥40 in 12** (from 1).
Sources, in order of ease: (1) NL business directories/aggregators already ranking on our queries: Trustoo, Werkspot, Homedeal, Slimster, Zoofy, Bouwpartnersnel, Stukadoorsclub, Casius, Bobex, Vakmanvinden, gevelrenovatie-info.nl and stucwerk-info.nl bedrijvenlijsten; KVK-linked directories (openingstijden.nl, telefoonboek.nl, cylex.nl, drimble, bedrijvenpagina). (2) Manufacturer/system "verwerkers/dealers" listings (ETICS system supplier, KEIM verwerkers, sierpleister brand). (3) Municipal/energy: Duurzaam010 / energieloket "aanbieders" lists, WoonWijzerWinkel. (4) Project features + local press (AD Rotterdam wijk, buurt-sites) around finished projects (already 10+ project pages as assets). (5) Partner cross-links (architects, VvE-beheerders, aannemers). Anchor policy: brand / URL / "BM Klus BV Rotterdam" only. No PBNs, no paid link packages.
Owner: business owner + operator. KPI: DFS referring_domains monthly (re-run `--only backlinks`).

**A2. GBP restructuring** — Local — confidence medium-high. **Owner decision 2026-08-15: APPROVED — primary category → Isolatiebedrijf.**
- Primary category → **"Isolatiebedrijf"** (gevelisolatie is the strategic cluster; Maps for gevelisolatie/isolatiebedrijf queries is 100% isolatie-categorised); keep Stukadoorsbedrijf, Schilder as secondary; add "Gevelreiniging"/"Gevelrenovatie" only if that service is confirmed. Verify exact category names in the GBP UI before changing.
- Fill Services with names matching money pages (Buitengevelisolatie, Buitenmuur stucen, Sierpleister, Gevel schilderen/keimen) with URLs; add UTM to website link; weekly Posts with project photos; seed Q&A.
- Review programme: ask after every oplevering (QR + short link); target 19 → 50 in 6 months; **reply to every review**; the "taalbarrière/communicatie" topic must be addressed in replies and in the site's over-ons/contact copy (Dutch-speaking contact person named).
- Do NOT create keyword-named secondary listings (spam pattern seen at LP1–2; policy risk).
KPI: presence in Rotterdam local pack for "stukadoor rotterdam", "isolatiebedrijf rotterdam" (re-run `--only serp_local` monthly).

**A3. Trust display on money pages** — CRO — confidence high — show live GBP rating + count + "bekijk reviews" link on all 5 money pages + homepage (visual badge; do NOT add `aggregateRating` JSON-LD for third-party reviews). Add "actief sinds", KvK, warranty line in the trust strip (competitors do: "Actief sinds 2000", "9.5 / 2,274 reviews", "10 jaar garantie").

### P1 — content moves with measured demand (weeks 2–8)

**B1. New page: gevel keimen / keimwerk kosten** — SEO — confidence medium-high — ≈1,100/mo demand (keimen 590, keimwerk 260, gevel keimen 110, keimverf 90, kosten variants), GSC 900 impr/90d at pos 27–42 with zero keimen-specific page. URL under `/gevel-schilderen/keimen/` (cluster child, per URL rules); title lead "Gevel keimen: kosten per m² …"; price table for keimwerk, KEIM vs siloxaan comparison, when keimen is/isn't suitable, FAQ from GSC queries ("gevel keimen of schilderen", "wat kost keimen per m2"). Internal links from `/gevel-schilderen/` and `/gevelisolatie/afwerkingen/`.

**B2. Sausklaar / behangklaar split** — SEO — confidence medium — ≈1,100/mo demand, 3,100 impr/90d, Labs pos 12–36. Create `/muren-stucen/sausklaar-behangklaar/` (or two children if cannibalization rules allow only one primary per intent — check `docs/governance/20-seo-and-url-rules.md`) targeting "sausklaar stucen / behangklaar stucen: verschil, prijs per m²"; keep `/muren-stucen/` on head "muren stucen (kosten)". Move sausklaar-specific FAQ blocks to the child; parent links to child above the fold.

**B3. Retitle `/gevelisolatie/`** — SEO — confidence medium — current "Gevelisolatie buitenkant (ETICS) – prijs per m²". New lead: "Buitengevelisolatie (gevelisolatie buitenkant) – prijs per m² | ETICS" — covers buitengevelisolatie 480 + gevelisolatie buitenkant 480 + head 1,900; keeps ETICS for the niche it already wins (pos 6–11). H1 aligned; body untouched (per interim §6).

**B4. `/buiten-stucwerk/` title + betonstuc** — SEO — confidence medium — pos 3.0 / 1% CTR on "gevel stucen"; head volumes: buitenmuur stucen 1,000, betonstuc 880, buiten stucwerk 480. New title lead "Buitenmuur stucen: kosten per m² (2026)…" with buiten stucwerk/gevel stucen in the second half; add a betonstuc/cementpleister section (afwerkingsopties + prijsindicatie). CTR test window: 6 weeks, GSC query-level.

**B5. Gevelrenovatie hub — APPROVED by owner 2026-08-15** — SEO — confidence low-medium — 5,400/mo national + 210/mo Rotterdam at CPC €18.20 (highest in dataset). Only if the business confirms it delivers "gevelrenovatie" as a package (isolatie + stuc + schilderwerk + reparatie); SERP fit is partial (reiniging/voegwerk players). Build `/gevelrenovatie/` hub linking the 4 money pages, Rotterdam-first. Scope guard: page must state explicitly what BM Klus does (isolatie + stucwerk + schilderwerk + herstel ondergrond) and what it does not (gevelreiniging, voegwerk, metselwerkherstel as standalone) to avoid irrelevant leads; if the business later confirms those services, widen scope.

### P2 — do not do / monitor only

- National informational queries (gevelisolatie, buitenmuur isoleren, gevel stucen national top-10 = eigenhuis/milieucentraal/gamma/homedeal + AI Overviews) — **no effort** (interim §5.8 stands; volumes confirm the pool but SERP shows platforms + retail).
- "spachtelputz" 6,600 — interior/DIY product intent, low CPC; at most a short interior-vs-facade clarification on `/sierpleister/`; no dedicated page.
- City pages — monitor-first unchanged (post-cutover settling); geo Ads volumes are null anyway → their job is local/Maps relevance, not typed geo demand.
- "gevelrenovatie met folie" — ignore.
- Measurement: reconcile 4→19 key events vs WP submission log (open since interim; not repeated here).

---

## 4. Timeline & KPIs

| Checkpoint | KPI | Baseline (2026-08-15) | Target |
|-----------|-----|-----------------------|--------|
| +3 mo (2026-11-15) | Referring domains (DFS) | 1 | ≥12 |
| | GBP reviews | 19 | ≥32 |
| | Local pack presence (Rotterdam, 5 core queries) | 0/5 | ≥1/5 |
| | Keimen page indexed + GSC pos on "keimen kosten" family | 27–42 (parent page) | ≤20 |
| | Sausklaar family clicks/90d | 0 | ≥20 |
| | "buitengevelisolatie" pos on `/gevelisolatie/` | 46.5 | ≤25 |
| | "gevel stucen" CTR (pos ~3) | ≈1% | ≥4% |
| +6 mo (2027-02-15) | Referring domains | 1 | ≥25 |
| | GBP reviews | 19 | ≥50 |
| | Local pack presence | 0/5 | ≥2/5 |
| | Non-brand organic key events / 90d | ≈3–5 | ≥12 |
| | Labs ETV | ≈6 | ≥60 |

Seasonality note: gevelisolatie demand peaks Sep–Mar (Sep = 2× Jul). P0/P1 items shipped by end of Sept 2026 land in the high-demand window; slipping to Q1 loses most of the season.

## 5. Re-collection procedure

`integrations/.venv/Scripts/python analyzers/seo/run_dataforseo_final_audit_collect_2026_08.py --only backlinks --only serp_local --only gbp` (~$0.20) monthly; `--only volume --only labs` quarterly. GSC/GA4: `seo-refresh` skill.

## 6. Risks & uncertainties

- Backlink counts are DataForSEO index counts, not Google's; direction and order of magnitude are what matter (1 vs 20–3,000).
- Labs ETV/keyword counts undercount small domains; used only comparatively.
- Local pack snapshot is single-day, desktop, city-centroid; mobile/proximity results differ per user location.
- Google Ads volumes are rounded buckets; null for most geo variants means "below reporting threshold", not zero.
- GBP category names/availability must be checked in the GBP UI; category change may cause a short-term ranking wobble in Maps.
- Key-event growth (interim §7) still unverified vs WP log.

## 7. Provenance

- Generated 2026-08-15; report mode final; numeric confidence cap medium-high.
- Sources: DataForSEO (Google Ads volume, Labs, Backlinks, SERP Rotterdam, Business Data) 2026-08-15; GSC MCP live; GA4 MCP live; GSC 90d query-level CSV 2026-08-15; combined snapshot 2026-08-15; interim decision pack 2026-08-15; site source `data/sitemap-plan.ts`.
- Cost this run: $0.34 (25 DataForSEO tasks).

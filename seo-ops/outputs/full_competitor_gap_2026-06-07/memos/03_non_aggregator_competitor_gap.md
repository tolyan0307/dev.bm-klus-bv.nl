# 03 — Non-Aggregator Competitor Gap

READ-ONLY. Focus = **non-aggregator** competitors (local/regional/national contractors, niche service & cost-guide sites).
Truth layer = GSC (BM's real positions/impressions). Enrichment = DataForSEO SERP (NL/nl, depth 100, desktop) 2026-06-07.
Data: `processed/non_aggregator_competitor_matrix.csv`, `raw/competitor_crawls/competitor_crawl.json`, `processed/serp_summary.json`.

## 0. Headline correction — it is NOT the aggregators
Average top-10 composition per cluster (DataForSEO desktop):

| Cluster | contractor | media/cost-guide | aggregator | retail | gov |
|---|---|---|---|---|---|
| core | **5.8** | 2.5 | 0.3 | 0.3 | 1.0 |
| kosten | **4.5** | 4.0 | 1.2 | 0.0 | 0.3 |
| afwerking | **7.0** | 2.4 | 0.6 | 0.0 | 0.0 |
| **city/local** | **8.8** | 0.0 | 1.2 | 0.0 | 0.0 |
| buiten-stucwerk | **6.9** | 1.0 | 1.6 | 0.6 | 0.0 |
| sierpleister | **6.8** | 1.7 | 1.2 | 0.3 | 0.0 |
| muren-stucen | **6.8** | 0.2 | 1.7 | 1.3 | 0.0 |
| gevel-schilderen | **5.8** | 1.5 | 1.3 | 1.3 | 0.0 |

→ Aggregators are ≤1.7 of 10; **contractors own 4.5–8.8 of every top-10**. BM is beaten by ordinary
contractors and niche service sites, not by Homedeal/Werkspot/Slimster. **City queries are ~88% contractors.**

**BM organic reality** `[GSC + DataForSEO]`: BM is in DataForSEO top-100 for only 4/53 queries
(`gevel sierpleister` #22, `sausklaar stucen` #24, `gevel schilderen kosten` #25, `behangklaar stucen` #38).
For the commercial/local head terms BM is page-2+ / absent (GSC avg position ~18–52). 

**Authority/backlinks: NOT MEASURED** — DataForSEO Backlinks API is not in the account subscription
(task status 40204, $0 charged). So this memo does **not** claim an "authority gap." Every "why higher"
below is grounded in **measurable on-page signals** from the live crawl.

## 1. Repeat non-aggregator winners (the real competitors)
| Domain | top-10 hits | Type | Pattern that wins |
|---|---|---|---|
| gevelrenovatie-info.nl | 29 | niche cost-guide | dedicated `/gevelisolatie/kosten` with **price table** |
| isolatie-info.nl | 12 | niche cost-guide | `/gevelisolatie/kosten` price table + nadelen |
| takkenkamp.com | 11 | national contractor | `/isolatie/gevelisolatie/kosten-gevelisolatie/` |
| **plusisolatie.nl** | 11 | national contractor | **city subpages** `/plaats/isolatiebedrijf-rotterdam` (5610 words) |
| **isolatiespecialist.nl** | 9 | national contractor | **region/city pages** `/zuid-holland/rotterdam/` (18 H2) |
| **pluimers.nl** | 7 | national contractor | **city pages** `/plaats/rotterdam/` |
| stucadoor-expert.nl | 11 | contractor | `/buitenmuur-stucen/` (13 H2, price table) |
| kooyisolatie.nl | 8 | contractor | `/gevelisolatie-kosten/` (price table + nadelen) |
| stuc-concurrent.nl, lsgi.nl, metsel-gigant.nl, 040stucadoor.nl, stucwerk-info.nl, stukadoorsclub.nl | 6–7 each | contractors / niche | dedicated service+kosten+nadelen pages |

## 2. Per-cluster gap tables (query → expected BM page → BM pos → top non-agg winner → why)

### Core gevelisolatie
| query | expected BM page | BM pos (GSC) | top non-agg winner | type | why higher (measured) |
|---|---|---|---|---|---|
| gevelisolatie | /gevelisolatie/ | ~30+/absent | takkenkamp.com, plusisolatie.nl | national contractor | service+kosten depth; multi-page topical cluster |
| buitengevelisolatie | /gevelisolatie/ | absent | gevelrenovatie-info, isolatiespecialist | niche/national | dedicated subtopic pages |
| buitenmuur isoleren | /gevelisolatie/ | absent | isolatiemateriaal.nl, takkenkamp | national | topical breadth |
→ BM hub is content-rich (2812 w, 12 FAQ) but competes against multi-page national clusters. **authority not measured.**

### Kosten / prijs  ← highest commercial priority
| query | expected BM page | BM pos (GSC) | top non-agg winner | type | why higher (measured) |
|---|---|---|---|---|---|
| gevelisolatie kosten | /gevelisolatie/kosten/ | **52.7** (was 30.7) | gevelrenovatie-info.nl/gevelisolatie/kosten | niche cost-guide | **price table** + rekenvoorbeeld + 2693 w |
| kosten gevelisolatie | /gevelisolatie/kosten/ | **51.8** (was 21) | isolatie-info.nl/gevelisolatie/kosten | niche cost-guide | price table + **nadelen** + 2694 w |
| wat kost gevelisolatie | /gevelisolatie/kosten/ | 56.4 | kooyisolatie.nl/gevelisolatie-kosten | contractor | price table + nadelen + 16 H2 |
| buitengevelisolatie kosten | /gevelisolatie/kosten/ | absent | takkenkamp, lsgi.nl, metsel-gigant.nl | national/contractor | dedicated `/...kosten` page, price ranges |

**Measured gap on `/gevelisolatie/kosten/`:** BM = **1445 words, NO structured price table** (has rekenvoorbeeld text
only), nadelen=absent. All ranking competitors have an explicit **€/m² price table** and most include nadelen.
BM is *thinner and lacks the one block the SERP rewards.* `[crawl]` **This is a concrete, additive gap — high confidence.**

### Afwerking (steenstrips/crepi/bekleden)
| query | expected BM page | BM pos | top non-agg winner | why |
|---|---|---|---|---|
| gevelisolatie met steenstrips | /gevelisolatie/afwerkingen/ | improving (page pos 23→11) | vandersanden, gevel contractors | product+project pages |
→ `/gevelisolatie/afwerkingen/` is **improving** (avg pos 23.5→11.1). Lower priority; keep momentum.

### City / local  ← structural priority
| query | expected BM page | BM owner now | top non-agg winner | why higher (measured) |
|---|---|---|---|---|
| gevelisolatie rotterdam | /gevelisolatie/rotterdam/ | **/ (homepage)** ⚠ cannibalized | plusisolatie.nl/plaats/…rotterdam (5610 w) | dedicated city page w/ price table, reviews, local proof |
| buitengevelisolatie rotterdam | /gevelisolatie/rotterdam/ | **/gevelisolatie/ (hub)** ⚠ | isolatiespecialist.nl/zuid-holland/rotterdam (2204 w, 18 H2) | deep city page |
| gevelisolatie den haag/leiden/breda… | /gevelisolatie/{city}/ | weak/absent | pluimers.nl/plaats/{city}, isolatiespecialist | programmatic city pages at scale |

**Measured gap:** BM city page (`/gevelisolatie/rotterdam/`) = **1148 words, 4 FAQ, NO price table**.
Winners: plusisolatie **5610 w**, isolatiespecialist **2204 w / 18 H2** — both with price tables + reviews + local depth.
Plus BM city pages are **cannibalized by the homepage/hub** for their own geo query (GSC ownership). **High confidence, measurable.**

### Buiten-stucwerk
| query | expected BM page | BM pos (GSC) | top non-agg winner | why |
|---|---|---|---|---|
| buitenmuur stucen | /buiten-stucwerk/ | ~44 (was 24) | stucadoor-expert.nl/buitenmuur-stucen (13 H2, price table) | freshness/links |
| buitenmuur stucen nadelen | /buiten-stucwerk/ | dropped | stukadoorsclub.nl/blog/buitenmuur-stucen-nadelen | **dedicated nadelen article** |
| buitenmuur stucen kosten | /buiten-stucwerk/ | ~45 | 040stucadoor, stucadoor-expert | dedicated kosten section |

**Measured note:** BM `/buiten-stucwerk/` is **content-competitive** (2228 w, 15 H2, price table, nadelen present, 10 FAQ) —
often *stronger* than the contractors that outrank it. So the buiten-stucwerk decline is **NOT a content-depth gap**;
it's most likely freshness/internal-links/**authority (not measured)** + a dedicated `nadelen` angle that competitors own.

### Sierpleister
| query | expected BM page | BM pos | winner | why |
|---|---|---|---|---|
| gevel sierpleister | /sierpleister/ | **#22** | stucwerk-info.nl, stuc-gigant.nl | niche pages |
| sierpleister prijs | /sierpleister/ | 61 (was 27) | stucadoorsproducten, stucwerk-info | price clarity |
→ BM `/sierpleister/` is content-rich (2536 w, 10 FAQ); add a clearer **price block** for `sierpleister prijs`.

### Muren-stucen
| query | expected BM page | BM pos | winner | why |
|---|---|---|---|---|
| sausklaar stucen | /muren-stucen/ | **#24** | stuc contractors | on par; deepen |
| behangklaar stucen | /muren-stucen/ | **#38** | stuc contractors | price/proces |
| muren stucen | /muren-stucen/ | ~43 | retail + contractors | — |
→ `/muren-stucen/` = high impressions, pos ~35, **0 clicks**. Closest BM is to ranking (#24–38). Add price/proces blocks.

### Gevel-schilderen
| query | expected BM page | BM pos | winner | why |
|---|---|---|---|---|
| gevel schilderen kosten | /gevel-schilderen/ | **#25** | contractors + media | price table |
| gevel schilderen | /gevel-schilderen/ | ~37 | painters | — |
→ `/gevel-schilderen/` (2536 w) closest on `kosten`; add price table.

## 3. What the winners consistently have that BM lacks (measured, on-page)
1. **Explicit €/m² price TABLE** on kosten & city pages — present on ~all ranking competitors; **missing on BM's
   `/gevelisolatie/kosten/`, all city pages, `/sierpleister/`, `/muren-stucen/`, `/gevel-schilderen/`** (BM has
   rekenvoorbeeld text, not a structured table). `[crawl]`
2. **Deeper city pages** (2200–5600 words, price table, reviews, local proof) vs BM city pages (~1150 w, 4 FAQ). `[crawl]`
3. **Dedicated angle pages** (e.g. `buitenmuur-stucen-nadelen` article) capturing the long-tail BM folds into one page.
4. Where BM is already equal/stronger on content (buiten-stucwerk, hub, sierpleister): the remaining gap is
   **authority/links — explicitly NOT measured** (no backlinks subscription). Do not assert it as fact.

## 4. What is BM already ahead on (don't "fix")
- **FAQ schema depth** (10–12 Q vs 0 for most competitors) and structured data — BM leads. Keep.
- `/buiten-stucwerk/` content depth, `/gevelisolatie/` hub breadth — competitive. No rewrite needed.

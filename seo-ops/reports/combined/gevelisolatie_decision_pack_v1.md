# Gevelisolatie Decision Pack v1

**Date:** 2026-04-07
**Scope:** /gevelisolatie/ cluster + related money/local intents
**Mode:** Post-cutover preliminary (cutover 2026-03-08, ~30 days of data)
**Status:** First operational analysis pack

---

## 1. Sources and artifacts used

| Source | Artifact | Freshness |
|--------|----------|-----------|
| GSC API | gsc_query_page_last90d.csv (528 rows) | 2026-04-07 |
| GA4 API | ga4_landing_pages_last90d.csv (55 pages) | 2026-04-07 |
| Google Ads CSVs | ppc_review_campaign_23271040037_last30d.json | 2026-04-07 |
| Keyword master v3 | keyword_master_v3.csv (1035 keywords) | 2026-04-07 |
| Keyword intelligence v2 | keyword_intelligence_review_v2.json | 2026-04-07 |
| Page audit | page_audit_gevelisolatie_v1.json | 2026-04-07 |
| Page-vs-query gap | page_vs_query_gap_v1.json | 2026-04-07 |
| Page inventory | page_inventory_v1.csv (54 pages) | 2026-04-07 |
| DataForSEO SERP | serp_snapshot_v1.json (5 keywords) | 2026-04-07 |
| DataForSEO Gap | ranked_keywords_gap_v1.json (3 domains) | 2026-04-07 |
| DataForSEO prior enrichment | keyword_overview (10 kw) + related_keywords (2 seeds) | 2026-04-07 |

---

## 2. Live runs executed

| Run | Scope | Cost |
|-----|-------|------|
| SERP snapshot v1 | 5 keywords, top 10 organic | ~$0.01 |
| Ranked keywords gap v1 | 3 domains x 100 kw | ~$0.225 |
| **Total DataForSEO spend this session** | | **~$0.235** |

---

## 3. Executive summary

### Strongest signals

1. **"gevelisolatie rotterdam" is the clear #1 SEO opportunity.**
   - GSC: 1,369 impressions, pos 8.0, 2 clicks (90d)
   - SERP snapshot: position 6 (live, April 7)
   - 6 pages competing internally (cannibalization risk = HIGH)
   - DataForSEO confirmed: vol unknown for local, but SERP competition is moderate
   - Confidence: **HIGH**

2. **PPC has 3 proven converting keywords.**
   - buitengevelisolatie: 1 conv, 27 clicks, EUR 44 (CPA EUR 44)
   - buitenmuur isoleren: 1 conv, 9 clicks, EUR 7 (CPA EUR 7)
   - gevel van buiten isoleren: 1 conv, 21 clicks, EUR 18 (CPA EUR 18)
   - Total: 3 conversions from EUR 69 spend = CPA EUR 23 average
   - Confidence: **MEDIUM** (only 3 conversions total)

3. **EUR 193 PPC spend (55% of budget) went to 0-conversion keywords.**
   - Top waste: gevel isoleren en bekleden (EUR 51), buitenmuur isoleren en stucen (EUR 42), buitengevel isoleren en stucen (EUR 41), gevelisolatie (EUR 57)
   - These are mostly stuc/bekleden/steenstrips themes — not core conversion path

4. **4 out of 5 core keywords NOT in top 10 organic.**
   - SERP confirmed: gevelisolatie, buitenmuur isoleren, gevelisolatie kosten, buitengevelisolatie — all NOT in top 10
   - Only gevelisolatie rotterdam is ranking (pos 6)
   - This is expected for a 30-day-old site, but sets the SEO baseline

5. **SERP competition is dominated by info/authority sites.**
   - eigenhuis.nl, milieucentraal.nl, isolatiemateriaal.nl appear in 60% of SERPs
   - These are NOT direct service competitors — they are content/info portals
   - Direct service competitors: takkenkamp.com, metsel-gigant.nl, schotgevelisolatie.nl

### Where caution is needed

- All findings are **preliminary**: only ~30 days post-cutover data
- PPC conversions = 3 total; all CPA/efficiency conclusions are provisional
- GSC clicks = 65 total site-wide; CTR conclusions are weak
- SERP positions fluctuate daily; one snapshot is directional only
- DataForSEO keywords_for_site gap analysis returned mostly noise (see section 8)

---

## 4. Evidence map

### Strong internal evidence (planner + GSC + Ads, or Ads conversion proven)

| Query | Planner vol | GSC impr | GSC pos | Ads clicks | Ads conv | DFS confirmed |
|-------|-------------|----------|---------|------------|----------|---------------|
| buitengevelisolatie | 480 | 517 | 28.7 | 27 | 1 | yes (vol 480, CPC 3.09) |
| buitenmuur isoleren | 1000 | - | - | 9 | 1 | yes (vol 1000, CPC 2.32) |
| gevel van buiten isoleren | 30 | - | - | 21 | 1 | yes (vol 30, CPC 0.46) |
| gevelisolatie | 2400 | - | - | 25 | 0 | yes (vol 2400, CPC 4.61) |
| gevelisolatie kosten | 260 | 69 | 19.3 | - | - | yes (vol 260, CPC 4.35) |
| gevelisolatie rotterdam | - | 1369 | 8.0 | - | - | yes (SERP pos 6) |
| gevelisolatie buitenkant | 590 | 56 | 19.6 | - | - | yes (vol 590, CPC 2.76) |
| buitengevel isoleren | 480 | - | - | 13 | 0 | yes (vol 480, CPC 2.39) |

### Moderate internal evidence (2 of 3 sources)

| Query | Sources | GSC impr | Key signal |
|-------|---------|----------|------------|
| buitengevel isoleren en stucen | Planner + Ads | - | 27 clicks, EUR 41, 0 conv |
| buitenmuur isoleren en stucen | Planner + Ads | - | 26 clicks, EUR 42, 0 conv |
| gevelisolatie afwerking | Planner + GSC | 123 | pos 17.8, striking distance |
| buitengevelisolatie rotterdam | GSC + Planner | 135 | pos 4.3, striking distance |
| etics / etics systeem | Planner + GSC | 45/37 | pos 6.7/8.0, near top 5 |

### Externally confirmed (DataForSEO validated internal data)

10 keywords confirmed by DFS keyword_overview. Key ones above.
3 newly discovered by DFS related_keywords: zelf buitenmuur isoleren (vol 140), wetgeving isolatie buitenmuur (vol 70), buitenmuur isoleren en bekleden met hout (vol 50). All on watchlist.

### External watchlist only (no internal confirmation yet)

- zelf buitenmuur isoleren (vol 140, intent=transactional)
- wetgeving isolatie buitenmuur (vol 70, intent=commercial)
- buitenmuur isoleren en bekleden met hout (vol 50, intent=transactional)

---

## 5. Query ownership map

| Query/theme | Best owner page | Evidence | Confidence | Note |
|-------------|-----------------|----------|------------|------|
| gevelisolatie rotterdam | /gevelisolatie/rotterdam/ | GSC pos 8.0, SERP pos 6 | HIGH | But 6 pages compete — consolidate |
| buitengevelisolatie | /gevelisolatie/ | GSC 517 impr, Ads 1 conv | HIGH | pos 28.7 — needs improvement |
| gevelisolatie kosten | /gevelisolatie/kosten/ | GSC 69 impr, pos 19.3 | MEDIUM | Dedicated kosten page exists |
| gevelisolatie afwerking | /gevelisolatie/afwerkingen/ | GSC 123 impr, pos 17.8 | MEDIUM | Cluster page exists |
| buitenmuur isoleren | /gevelisolatie/ | Ads 1 conv, planner 1000 | LOW | No GSC signal yet |
| gevel van buiten isoleren | /gevelisolatie/ | Ads 1 conv | LOW | No GSC, no planner |
| gevelisolatie den haag | /gevelisolatie/den-haag/ | GSC 246 impr, pos 9.25 | MEDIUM | City page exists |
| gevelisolatie leiden | /gevelisolatie/leiden/ | GSC 337 impr, pos 6.36 | MEDIUM | City page exists |
| gevelisolatie almere | /gevelisolatie-woning-almere-.../ | GSC 828 impr, pos 13.3 | LOW | Mapped to project page, not city |
| etics / etics systeem | /gevelisolatie/ | GSC 45/37 impr, pos 6.7/8.0 | MEDIUM | Technical term, fits main page |
| gevelisolatie buitenkant | /gevelisolatie/ | GSC 56 impr, pos 19.6, DFS confirmed | MEDIUM | Synonym of buitengevelisolatie |
| buitengevelisolatie rotterdam | /gevelisolatie/rotterdam/ | GSC 135 impr, pos 4.3 | MEDIUM | 4 pages compete |

---

## 6. SEO findings

### Striking distance (pos 4-20, meaningful impressions)

| Keyword | GSC impr | GSC pos | SERP pos (live) | Owner page |
|---------|----------|---------|-----------------|------------|
| gevelisolatie rotterdam | 1369 | 8.0 | **6** | /gevelisolatie/ (but /rotterdam/ exists) |
| gevelisolatie almere | 828 | 13.3 | not checked | /gevelisolatie-woning-almere-.../ |
| gevelisolatie leiden | 337 | 6.4 | not checked | /gevelisolatie/leiden/ |
| gevelisolatie den haag | 246 | 9.25 | not checked | /gevelisolatie/den-haag/ |
| buitengevelisolatie rotterdam | 135 | 4.3 | not checked | /gevelisolatie/ |
| gevelisolatie afwerking | 123 | 17.8 | not checked | /gevelisolatie/ |
| gevelisolatie kosten | 69 | 19.3 | not in top 10 | /gevelisolatie/kosten/ |
| gevelisolatie buitenkant | 56 | 19.6 | not in top 10 | /gevelisolatie/ |

### Low CTR, high impressions

- /gevelisolatie/ — 2,914 impr, 0.2% CTR, avg pos 35. Title/description may need review.
- buitengevelisolatie — 517 impr, 0.2% CTR, pos 28.7. Too deep in SERPs for clicks.
- gevelisolatie zoetermeer — 440 impr, 0% CTR, pos 87.9. No real visibility.

### Cannibalization (HIGH risk)

- **gevelisolatie rotterdam**: 6 pages compete in GSC. Must consolidate to /gevelisolatie/rotterdam/.
- **buitengevelisolatie rotterdam**: 4 pages compete. Same consolidation needed.
- These are the highest-impression queries — cannibalization directly harms ranking potential.

### Page overloading

- /gevelisolatie/ carries 192 keywords across 9 themes. Symptoms of topic dilution.
- The page audit verdict is "weak" (7 clicks on 2,914 impressions).
- Not all queries belong here — kosten, afwerking, subsidy intent should be served by cluster pages.

### Not ranking (SERP confirmed)

For the 4 core keywords where we're NOT in top 10:
- **gevelisolatie**: SERP dominated by eigenhuis.nl (#1), isolatiemateriaal.nl (#3), rockwool.com (#7) — info/authority sites
- **buitenmuur isoleren**: milieucentraal.nl (#1), jandeisolatieman.nl (#3), eigenhuis.nl (#8)
- **gevelisolatie kosten**: eigenhuis.nl (#2), homedeal.nl (#4) — pricing comparison sites
- **buitengevelisolatie**: milieucentraal.nl (#1), bewi-isobouw.nl (#3)

These are high-competition, info-heavy SERPs. Ranking in top 10 will require significant content authority. This is a **long-term** play, not a quick fix.

---

## 7. PPC findings

### Proven terms (protect)

| Keyword | Clicks | Cost | Conv | CPA | Action |
|---------|--------|------|------|-----|--------|
| buitengevelisolatie | 27 | EUR 44 | 1 | EUR 44 | PROTECT |
| gevel van buiten isoleren | 21 | EUR 18 | 1 | EUR 18 | PROTECT |
| buitenmuur isoleren | 9 | EUR 7 | 1 | EUR 7 | PROTECT |
| voorgevel isolatie | 1 | EUR 1 | 1 | EUR 1 | PROTECT |

### Waste / review candidates

| Keyword | Clicks | Cost | Conv | Theme | Action |
|---------|--------|------|------|-------|--------|
| gevelisolatie | 25 | EUR 57 | 0 | core | REVIEW — high cost, 0 conv |
| gevel isoleren en bekleden | 31 | EUR 51 | 0 | bekleden | REVIEW — off-theme? |
| buitenmuur isoleren en stucen | 26 | EUR 42 | 0 | stuc_crepi | REVIEW |
| buitengevel isoleren en stucen | 27 | EUR 41 | 0 | stuc_crepi | REVIEW |
| buitengevelisolatie met steenstrips | 21 | EUR 28 | 0 | steenstrips | REVIEW |

**Total at-risk spend: EUR 193 (55% of budget)**

Budget = EUR 10/day = EUR 300/month. EUR 193 going to 0-conversion keywords is significant, but:
- Only 30 days of data
- Some may convert with more time
- Recommendation: monitor 2 more weeks, then cautiously pause worst performers

### Mapping issues

- 10 paid sessions on "(not set)" landing pages — tracking gap
- 10 PPC keywords without clear landing page mapping

---

## 8. DataForSEO findings

### SERP snapshot (HIGH value)

- **gevelisolatie rotterdam: position 6** — strongest live signal. GSC averaged pos 8.0, live SERP is better. This is the #1 actionable query.
- **4 core keywords not in top 10** — confirms GSC data that avg positions are deep. Expected for 30-day-old site.
- **Competitor landscape**: eigenhuis.nl, isolatiemateriaal.nl, jandeisolatieman.nl dominate (3/5 SERPs each). These are info portals, not direct service competitors.
- **Direct service competitors visible**: takkenkamp.com (2/5), metsel-gigant.nl (2/5), schotgevelisolatie.nl (1/5, but in "gevelisolatie rotterdam" — local competitor).

### Keywords_for_site gap (LOW value)

- **Endpoint returned generic, broad keywords** — wand panelen, akoestische panelen, gips platen, etc.
- **Zero overlap** between own and competitor keyword sets
- **Not suitable for niche gap analysis**. The SERP snapshot is far more useful.
- **Recommendation**: do not use keywords_for_site for gevelisolatie gap analysis in the future. Use SERP-based competitor keyword extraction if gap analysis is needed.

### Prior DFS enrichment (MEDIUM value)

- 10 keywords confirmed with volume/CPC/intent — useful for validation, did NOT change priorities
- 3 new keywords discovered (zelf buitenmuur isoleren, wetgeving isolatie buitenmuur, buitenmuur isoleren en bekleden met hout) — all on watchlist, all low-volume

---

## 9. Recommended next actions (priority-ordered)

### 1. Consolidate "gevelisolatie rotterdam" to /gevelisolatie/rotterdam/
- **Priority:** HIGH
- **Why:** 6 pages compete for 1,369 impressions. Cannibalization directly hurts ranking for our best query. Live SERP pos 6 — with consolidation, top 5 is achievable.
- **Expected impact:** Improved ranking stability, potential position 3-5
- **Confidence:** HIGH
- **Channel:** SEO

### 2. Verify conversion tracking completeness
- **Priority:** HIGH
- **Why:** Only 3 conversions in 30 days on EUR 350 spend. Before making any PPC keyword decisions, confirm all lead forms, phone clicks, and WhatsApp taps fire correctly in GA4.
- **Expected impact:** May reveal more conversions that change keyword performance data
- **Confidence:** HIGH
- **Channel:** PPC / Measurement

### 3. Review /gevelisolatie/ title tag and meta description
- **Priority:** MEDIUM
- **Why:** 2,914 impressions, 0.2% CTR. Title = "Gevelisolatie buitenkant (ETICS) -- prijs per m2". The "(ETICS)" may not resonate with users. Consider a clearer value proposition.
- **Expected impact:** CTR improvement from 0.2% to 1-2% = ~15-30 additional clicks over 90 days
- **Confidence:** MEDIUM
- **Channel:** SEO

### 4. Monitor PPC waste keywords 2 more weeks, then review
- **Priority:** MEDIUM
- **Why:** EUR 193 on 0-conversion keywords is 55% of budget, but only 30 days of data. Premature pausing could lose viable keywords.
- **Expected impact:** If paused after monitoring: ~EUR 6/day savings -> budget concentration on proven terms
- **Confidence:** MEDIUM
- **Channel:** PPC

### 5. Consolidate "buitengevelisolatie rotterdam" to /gevelisolatie/rotterdam/
- **Priority:** MEDIUM
- **Why:** 4 pages compete for 135 impressions, pos 4.3. Same consolidation logic as #1.
- **Expected impact:** Improved ranking for local variant
- **Confidence:** MEDIUM
- **Channel:** SEO

### 6. Strengthen /gevelisolatie/kosten/ for "gevelisolatie kosten"
- **Priority:** MEDIUM
- **Why:** SERP shows strong pricing-comparison competitors (homedeal.nl #4, kooyisolatie.nl #5). Our kosten page exists but is at pos 19.3. Content depth and pricing specificity may need improvement.
- **Expected impact:** Long-term ranking improvement for high-commercial-intent query (DFS CPC EUR 4.35)
- **Confidence:** LOW (requires SERP content analysis first)
- **Channel:** SEO

### 7. Review gevelisolatie almere mapping
- **Priority:** LOW
- **Why:** 828 impressions mapped to project page, not a city page. If a /gevelisolatie/almere/ city page exists or could be created, it would be a better owner.
- **Expected impact:** Better intent match, potential ranking improvement
- **Confidence:** LOW
- **Channel:** SEO

### 8. Protect PPC proven converters with adequate bids
- **Priority:** LOW (already recommended in PPC review, likely already actioned)
- **Why:** buitengevelisolatie, buitenmuur isoleren, gevel van buiten isoleren — these 3 drive all conversions.
- **Expected impact:** Conversion continuity
- **Confidence:** HIGH
- **Channel:** PPC

---

## 10. Should we run Workflow C (Question Suggestions)?

**Not yet.** Reasoning:

1. Current data volume is too low (65 clicks, 3 conversions in 30 days) to know which content topics drive engagement.
2. The /gevelisolatie/ page already has FAQ sections — we need to verify they are indexed and surfacing before adding more.
3. Priority now is **consolidation and tracking verification**, not content expansion.
4. After 2-4 more weeks of data, if GSC shows question-type queries surfacing, Workflow C can provide useful seed expansion for FAQ/content planning.

**Trigger for running C:** When GSC shows 5+ question-type queries with 10+ impressions each, OR when kosten/afwerking cluster pages need content enrichment.

---

## 11. Files produced

| File | Type | Status |
|------|------|--------|
| `snapshots/raw/dataforseo/dataforseo_serp_snapshot_v1.json` | Raw SERP data | NEW |
| `snapshots/normalized/dataforseo/serp_snapshot_v1.json` | Normalized SERP | NEW |
| `reports/dataforseo/serp_snapshot_v1.md` | SERP report | NEW |
| `outputs/dataforseo_serp_snapshot_v1.json` | SERP JSON output | NEW |
| `snapshots/raw/dataforseo/dataforseo_ranked_keywords_gap_v1.json` | Raw gap data | NEW |
| `snapshots/normalized/dataforseo/ranked_keywords_gap_v1.json` | Normalized gap | NEW |
| `reports/dataforseo/ranked_keywords_gap_v1.md` | Gap report | NEW |
| `outputs/dataforseo_ranked_keywords_gap_v1.json` | Gap JSON output | NEW |
| `reports/combined/gevelisolatie_decision_pack_v1.md` | This document | NEW |

---

## 12. Approximate DataForSEO cost

| Run | Cost |
|-----|------|
| SERP snapshot (5 keywords) | ~$0.01 |
| Ranked keywords gap (3 domains) | ~$0.225 |
| Prior: keyword_overview (10 kw) | ~$0.009 |
| Prior: related_keywords (2 seeds) | ~$0.022 |
| **Total DFS spend to date** | **~$0.27** |
| **Remaining balance (est.)** | **~$0.69** |

---

## 13. What was NOT done in this analysis

- No site page content changes
- No Google Ads campaign modifications
- No keyword_master v4 creation
- No Workflow C (question suggestions) execution
- No broad competitor research beyond 2 pre-set domains
- No full site audit (scoped to gevelisolatie cluster only)
- No scheduler/automation setup
- No architecture/framework changes
- No content briefs generated
- No bulk SERP scraping

---

_Generated: 2026-04-07. Analysis mode: post_cutover_preliminary._
_All findings are directional. Verify with 2-4 more weeks of data before making significant changes._

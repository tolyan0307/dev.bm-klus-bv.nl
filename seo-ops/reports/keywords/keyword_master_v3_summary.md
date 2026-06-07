# Keyword Master v3 Summary

**Generated:** 2026-04-07 14:34 UTC
**Generator:** `build_keyword_master_v3.py`

---

## v2 -> v3 change summary

| Metric | Value |
|--------|-------|
| v2 keywords | 1032 |
| v3 keywords | 1035 |
| New keywords added | 3 |
| Existing keywords enriched with DFS data | 10 |
| New DataForSEO fields added | 8 |
| Schema fields removed | 0 |

### Schema changes

New fields added at end of CSV (no v2 fields modified or removed):

| Field | Type | Description |
|-------|------|-------------|
| in_dataforseo_overview | bool | Was in keyword_overview enrichment batch |
| in_dataforseo_related | bool | Appeared in related_keywords results |
| dataforseo_search_volume | int | DataForSEO reported search volume |
| dataforseo_cpc | float | DataForSEO CPC estimate |
| dataforseo_competition | float | DataForSEO competition score |
| dataforseo_intent | str | DataForSEO intent classification |
| dataforseo_source_type | str | keyword_overview or related_keywords |
| external_discovery_status | str | existing_confirmed / newly_discovered_relevant / none |

---

## DataForSEO coverage

| Metric | Count |
|--------|-------|
| With keyword_overview data | 10 |
| In related_keywords results | 3 |
| Any external data | 13 |
| No external data | 1022 |

### Discovery status

| Status | Count |
|--------|-------|
| existing_confirmed | 10 |
| newly_discovered_relevant | 3 |
| none | 1022 |

---

## Enriched existing keywords (10)

These keywords already existed in v2 and now have DataForSEO confirmation.

| Keyword | DFS Vol | DFS CPC | DFS Intent | Source |
|---------|---------|---------|------------|--------|
| gevelisolatie | 2400 | 4.61 | transactional | keyword_overview |
| buitenmuur isoleren | 1000 | 2.32 | commercial | keyword_overview |
| isoleren van buitenmuren | 1000 | 2.32 | informational | keyword_overview |
| gevelisolatie buitenkant | 590 | 2.76 | transactional | keyword_overview |
| buitengevel isoleren | 480 | 2.39 | informational | keyword_overview |
| buitengevelisolatie | 480 | 3.09 | transactional | keyword_overview |
| buitenmuur isolatie | 320 | 2.11 | transactional | keyword_overview |
| gevelisolatie kosten | 260 | 4.35 | transactional | keyword_overview |
| gevel van buiten isoleren | 30 | 0.46 | informational | keyword_overview |
| gevelisolatie rotterdam |  |  | commercial | keyword_overview |

---

## Newly added keywords (3)

| Keyword | Vol | CPC | Intent | Theme | Priority | Status |
|---------|-----|-----|--------|-------|----------|--------|
| buitenmuur isoleren en bekleden met hout | 50 | 0.57 | transactional | bekleden | low | review |
| wetgeving isolatie buitenmuur | 70 | 1.89 | commercial | subsidie_vergunning | low | review |
| zelf buitenmuur isoleren | 140 | 0.87 | transactional | core_isolation | low | review |

### New keyword assessment

**buitenmuur isoleren en bekleden met hout**
- Theme: bekleden
- Intent: informational
- Mapping: Niche long-tail; hout+bekleden combo; no matching page
- Status: watchlist/review -- no internal data yet

**wetgeving isolatie buitenmuur**
- Theme: subsidie_vergunning
- Intent: informational
- Mapping: Regulation/compliance intent; may partially align with subsidie page
- Status: watchlist/review -- no internal data yet

**zelf buitenmuur isoleren**
- Theme: core_isolation
- Intent: informational
- Mapping: DIY intent; no dedicated page exists; potential content/blog topic
- Status: watchlist/review -- no internal data yet

---

## Did DataForSEO meaningfully change semantic coverage?

**Marginally.** Out of 1035 total keywords:
- 10 got external volume/CPC/intent confirmation (useful for validation)
- 3 genuinely new keywords were added (small but targeted)
- The existing keyword master already covered 11 of 18 related keywords returned

DataForSEO's main value so far is **validation** (confirming planner volumes and
adding intent signals), not **discovery** (most related terms were already known).

---

## Recommended next step

1. **Keep using DataForSEO for targeted checks** -- keyword_overview on specific
   shortlists remains low-cost and useful for CPC/intent validation
2. **Expand to 1-2 more related_keywords seeds later** (e.g. gevelisolatie, gevelisolatie kosten)
   but only after evaluating whether v3 new keywords surface in GSC
3. **No need to scale broad enrichment yet** -- current balance (~$0.95) should be
   preserved for high-value spot checks
4. **Monitor new keywords** -- if they appear in GSC within 2-4 weeks, consider
   promoting them from watchlist to active optimization targets

---

## Limitations (v3)

1. DataForSEO enrichment covers only 10+3 keywords -- vast majority has no external data
2. Intent classification from DataForSEO is model-based, not verified against SERP
3. New keyword mapping is conservative and low-confidence
4. Volume alignment between Planner and DataForSEO is expected (same underlying source)
5. All v2 limitations still apply (GSC 90d window, simple brand classifier, etc.)

---

## Output files

| File | Path |
|------|------|
| JSON (full) | `snapshots\normalized\keyword_master\keyword_master_v3.json` |
| CSV (flat) | `snapshots\normalized\keyword_master\keyword_master_v3.csv` |
| Summary (this file) | `reports\keywords\keyword_master_v3_summary.md` |

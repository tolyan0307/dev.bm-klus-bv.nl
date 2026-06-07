# Roadmap V1 — BM klus BV Search Analysis System

**Site cutover:** 2026-03-08 (WordPress → Next.js)
**Analysis mode:** post_cutover_preliminary (see `seo-ops/config/analysis_context_v1.yaml`)

---

## Phase 1: Architecture scaffold ✅

**Status:** Complete (2026-04-07)

- Directory structure created
- Documentation files in place (ARCHITECTURE, ROADMAP, CONTRACTS, ASSET_REGISTRY)
- Existing assets inventoried and registered
- No existing code modified

---

## Phase 2: keyword_master + page_inventory ✅

**Status:** Complete (2026-04-07)

- [x] page_inventory v1: 54 pages scanned from Next.js routes
- [x] keyword_master v1: 632 keywords merged from Google Ads Planner + campaign keywords + search terms

---

## Phase 3: Source merges ✅

**Status:** Complete (2026-04-07)

- [x] Phase 3A: GSC query/page snapshot — 528 rows, 441 queries, 37 pages
- [x] Phase 3B: keyword_master v2 — 1032 keywords (v1 + 400 GSC-only), 62 columns
- [x] Phase 3C: GA4 landing page snapshot — 55 pages, 928 sessions, 24 key events

---

## Phase 4: PPC / SEO / Page / Keyword workflows ✅

**Status:** Complete (2026-04-07)

- [x] Phase 4A: PPC review v1 — campaign 23271040037 integrated review
- [x] Phase 4B: SEO page-vs-query gap review v1
- [x] Phase 4C: Single-page audit v1
- [x] Phase 4D: Keyword intelligence review v1
- [x] Phase 4E: Legacy/indexation review v1

**Note:** All Phase 4 workflows operate in post_cutover_preliminary mode.
PPC review is budget-sensitive (10 EUR/day). SEO conclusions are provisional
due to incomplete indexation.

---

## Phase 5: DataForSEO enrichment

**Status:** Partially complete (2026-04-07)

- [x] DataForSEO API connector (`integrations/dataforseo/`)
- [x] SERP snapshot for priority keywords (`dataforseo_serp_snapshot_v1`)
- [x] Competitor keyword gap analysis (`dataforseo_ranked_keywords_gap_v1`, experimental)
- [x] Question/suggestion enrichment (`dataforseo_question_suggestions_v1`, experimental)
- [ ] Backlink profile data
- [ ] Enrich page_inventory with SERP features

---

## Phase 6: Orchestrator / command layer

**Status:** Phase 6A complete (2026-04-07)

- [x] Phase 6A: Workflow registry, orchestrator rules, command catalog, runbook, task intake template
- [ ] Phase 6B: Batch runner for multi-page audits
- [ ] Phase 6B: Automated scheduling / cron integration

---

## Principles across all phases

1. **Read-only.** No phase introduces automatic edits or mutations.
2. **Incremental.** Each phase delivers standalone value.
3. **Preserve working code.** Existing scripts and integrations are never broken.
4. **Evidence-first.** Recommendations cite specific data points.
5. **User decides.** System recommends; user implements.
6. **Post-cutover awareness.** All analysis must account for the 2026-03-08 site transition and preliminary data state.

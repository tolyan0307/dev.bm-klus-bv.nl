# Asset Registry — BM klus BV Search Analysis System

External and internal assets registered for use by the analysis system.
Assets are referenced in-place; nothing is moved or copied.

---

## Google Ads utilities (external)

**Location:** `D:\projects\bmklus\google\`
**Status:** All working as of 2026-04-07
**Runtime:** Python 3.x + google-ads library
**Config:** `google\google-ads.yaml` + OAuth tokens in same directory

| Script | Purpose | Type | Status |
|--------|---------|------|--------|
| `google/test_ads_access.py` | Verify Google Ads API connectivity and credentials | Source utility | Working |
| `google/report_campaign_performance.py` | Pull campaign-level performance metrics (cost, clicks, conversions, CPC) | Source utility | Working |
| `google/report_search_terms.py` | Pull search term report (actual queries triggering ads) | Source utility | Working |
| `google/report_keywords.py` | Pull keyword-level performance (QS, bids, match types) | Source utility | Working |
| `google/analyze_campaign_decisions.py` | Analyze campaigns and produce optimization recommendations | Analyzer | Working |
| `google/generate_keyword_ideas.py` | Generate keyword ideas via Keyword Planner API | Planner utility | Working |
| `google/generate_keyword_historical_metrics.py` | Get historical search volume and metrics for keyword lists | Planner utility | Working |

### Output location

All Google Ads scripts write to `D:\projects\bmklus\google\outputs\`.

### Integration notes

- These scripts are standalone; they do not depend on `seo-ops/`.
- In Phase 3+, thin wrappers in `seo-ops/integrations/google_ads/` will call these scripts and normalize their output to internal schemas.
- **Do not refactor these scripts.** They work. Wrap, don't rewrite.

---

## GSC + GA4 integrations (internal)

**Location:** `seo-ops/integrations/google_clients/`
**Status:** Working
**Runtime:** Python 3.x + google-analytics-data, google-auth, google-api-python-client

| Module | Purpose | Type | Status |
|--------|---------|------|--------|
| `integrations/google_clients/gsc_client.py` | Search Console data fetcher | Source utility | Working |
| `integrations/google_clients/ga4_client.py` | GA4 data fetcher | Source utility | Working |
| `integrations/google_clients/combined_snapshot.py` | Merge GSC + GA4 into unified snapshot | Source utility | Working |
| `integrations/google_clients/config.py` | Shared configuration loader | Config | Working |
| `integrations/run_combined_snapshot.py` | CLI runner for combined snapshot | Runner | Working |
| `integrations/test_gsc_access.py` | Test GSC API access | Test | Working |
| `integrations/test_ga4_access.py` | Test GA4 API access | Test | Working |

---

## Analysis engine (internal)

**Location:** `seo-ops/analysis/`

| Module | Purpose | Type | Status |
|--------|---------|------|--------|
| `analysis/rules.py` | Rule-based analysis logic | Analyzer | Working |
| `analysis/report_builder.py` | Report generation from analysis results | Formatter | Working |
| `analysis/snapshot_loader.py` | Load and validate snapshots | Loader | Working |
| `analysis/run_analysis_report.py` | CLI runner for analysis | Runner | Working |

---

## Config files (internal)

**Location:** `seo-ops/config/`

| File | Purpose |
|------|---------|
| `config/site.yaml` | Site URL, property IDs, general metadata |
| `config/conversions.yaml` | Key conversion events and rules |
| `config/priority-pages.yaml` | Wave 1 + wave 2 priority page lists |
| `config/competitors.yaml` | Competitor domains for future benchmarking |

---

## Prompt templates (internal)

**Location:** `seo-ops/prompts/`

| File | Purpose |
|------|---------|
| `prompts/weekly-organic-opportunities.md` | Weekly organic opportunity scan prompt |
| `prompts/landing-page-audit.md` | Landing page audit prompt |
| `prompts/indexation-watchdog.md` | Indexation monitoring prompt |
| `prompts/content-brief.md` | Content brief generation prompt |

---

## DataForSEO integration (internal)

**Location:** `seo-ops/integrations/dataforseo/`
**Status:** Working
**Runtime:** Python 3.x + requests (in seo-ops/integrations/.venv)
**Config:** `seo-ops/integrations/.env.local` (DATAFORSEO_API_LOGIN, DATAFORSEO_API_PASSWORD)

| Module | Purpose | Type | Status |
|--------|---------|------|--------|
| `integrations/dataforseo/client.py` | REST client with Basic Auth | Client | Working |
| `integrations/dataforseo/labs_google.py` | Labs Google endpoints (keyword_overview, related_keywords, keywords_for_site, keyword_suggestions) | API wrapper | Working |
| `integrations/dataforseo/serp_google.py` | SERP Google endpoints (organic/live/advanced) | API wrapper | Working |
| `integrations/dataforseo/smoke_test_user_data.py` | API connectivity test | Test | Working |

### DataForSEO analyzer workflows

| Script | Purpose | Type | Status |
|--------|---------|------|--------|
| `analyzers/keywords/run_dataforseo_keyword_enrichment_v1.py` | Keyword overview enrichment for top-10 shortlist | Enrichment | Working |
| `analyzers/keywords/run_dataforseo_related_keywords_v1.py` | Related keywords discovery from 2 seeds | Enrichment | Working |
| `analyzers/seo/run_dataforseo_serp_snapshot_v1.py` | Live SERP snapshot for priority queries | Enrichment | Working |
| `analyzers/keywords/run_dataforseo_ranked_keywords_gap_v1.py` | Keyword gap: own domain vs competitors | Enrichment | Working |
| `analyzers/keywords/run_dataforseo_question_suggestions_v1.py` | Question/suggestion keywords for content watchlist | Enrichment | Working |

### Integration notes

- All DataForSEO workflows are **standalone enrichment**; they do not modify keyword_master or any internal pipeline artifacts.
- Budget-sensitive: each workflow has hard limits on API calls and --dry-run support.
- Credentials loaded from `seo-ops/integrations/.env.local`.

---

## URL Inspection / Indexation diagnostics (internal)

**Location:** `seo-ops/integrations/gsc/url_inspection_loader.py` + `seo-ops/analyzers/seo/`
**Status:** Working (v1)
**Runtime:** Python 3.x + google-api-python-client (same auth as GSC client)
**Config:** Reuses GSC OAuth credentials from `integrations/google_clients/config.py`

| Module | Purpose | Type | Status |
|--------|---------|------|--------|
| `integrations/gsc/url_inspection_loader.py` | Thin wrapper for GSC URL Inspection API | Loader | Working |
| `analyzers/seo/build_url_inspection_snapshot.py` | CLI: collect and normalize inspection data | Source build | Working |
| `analyzers/seo/run_indexation_debug_v1.py` | CLI: indexation diagnostics analyzer | Analyzer | Working |

### Source class

- **URL Inspection API** — Internal operational data (primary truth for indexation state of specific URLs)
- Requires GSC property verification and URL Inspection permission
- Point-in-time evidence, not historical
- One API call per URL (no bulk endpoint)

### Limitations

- Does not replace a full technical SEO crawler
- Cannot determine cause of non-indexation — only confirms state and generates hypotheses
- No server log analysis, no HTTP status checks, no robots.txt parsing
- Rate limited to 1 request/second by polite delay in builder script

### Contract

All outputs governed by `contracts/indexation_diagnosis_rules_v1.md`.

---

## Measurement integrity audit (internal)

**Location:** `seo-ops/analyzers/pages/run_measurement_audit_v1.py`
**Status:** Working (v1)
**Runtime:** Python 3.x + PyYAML (standard project dependency)
**Config:** `seo-ops/config/thresholds/measurement_audit_v1.yaml`

| Module | Purpose | Type | Status |
|--------|---------|------|--------|
| `analyzers/pages/run_measurement_audit_v1.py` | Measurement quality assessment per page or site-wide | Analyzer | Working |

### Source class

- **GA4 landing page snapshots** — Internal operational data (primary truth for on-site measurement)
- **GSC page aggregates** — Internal operational data (supporting comparison layer)
- **config/conversions.yaml** — Internal config (key event definitions)
- Artifact-based audit — no live API calls

### Limitations

- Cannot diagnose GTM/tag-level tracking issues
- Cannot verify if tracking code exists on a page
- Post-cutover: measurement baselines not established
- Low site volume limits confident assessment across all pages
- Does not check server logs, HTTP status, or consent mode configuration

### Contract

All outputs governed by `contracts/measurement_audit_rules_v1.md`.

---

## Query intelligence layer (internal)

**Location:** `seo-ops/analyzers/keywords/run_query_intelligence_review_v1.py`
**Status:** Working (v1)
**Runtime:** Python 3.x + PyYAML (standard project dependency)
**Config:** `seo-ops/config/mappings/query_intent_taxonomy_v1.yaml`

| Module | Purpose | Type | Status |
|--------|---------|------|--------|
| `analyzers/keywords/run_query_intelligence_review_v1.py` | Query intent classification and page-fit review | Analyzer | Working |

### Source class

- **keyword_master v3/v2** — Internal operational data (primary query universe)
- **GSC query/page snapshots** — Internal operational data (primary search performance truth)
- **Page inventory** — Internal operational data (page role/type for fit assessment)
- **query_intent_taxonomy_v1.yaml** — Internal config (deterministic classification rules)
- Artifact-based analysis — no live API calls

### Limitations

- Intent classification is heuristic — based on keyword signal matching, not confirmed user intent
- No conversion data — cannot prove business value from intent alone
- No competitor SERP analysis within this workflow
- Page-query fit assessment requires page_inventory to be available
- Low-volume queries have reduced classification confidence
- Falls back to built-in signals if PyYAML is not installed (reduced taxonomy coverage)

### Contract

All outputs governed by `contracts/query_intelligence_rules_v1.md`.

---

## GBP / Local SEO layer (internal)

**Location:** `seo-ops/integrations/gbp/` + `seo-ops/analyzers/seo/run_local_seo_gbp_audit_v1.py`
**Status:** Working (v1) — limited mode by default until GBP API access is configured
**Runtime:** Python 3.x + google-api-python-client (optional — for GBP API access)
**Config:** `seo-ops/config/locales/local_entities_v1.yaml` (entity context), `seo-ops/integrations/.env.local` (GBP credentials, optional)

| Module | Purpose | Type | Status |
|--------|---------|------|--------|
| `integrations/gbp/performance_loader.py` | Thin read-only loader for GBP performance metrics | Loader | Working (limited mode if unconfigured) |
| `integrations/gbp/reviews_loader.py` | Thin read-only loader for GBP reviews/ratings | Loader | Working (limited mode if unconfigured) |
| `analyzers/seo/run_local_seo_gbp_audit_v1.py` | Local SEO / GBP audit analyzer | Analyzer | Working |

### Source class

- **GBP Performance API** — Primary truth for GBP visibility metrics (impressions, actions) when available
- **GBP Reviews API** — Primary truth for review count, average rating, review content when available
- **GSC query/page snapshots** — Supporting context for local intent query presence (Tier 2)
- **Page inventory** — Supporting context for location page coverage (Tier 2)
- **local_entities_v1.yaml** — Internal config for business entity context

### Limitations

- GBP API access may not be configured — runs in limited mode without it
- No local pack ranking data available via GBP API
- No competitor GBP data available
- Review analysis is quantitative only (count, rating) — no sentiment modeling
- Does not check NAP consistency across directories
- Does not crawl citations or external listings
- Read-only — does not modify GBP profile

### Contract

All outputs governed by `contracts/local_seo_gbp_rules_v1.md`.

---

## Source classification

Assets in this registry fall into three source classes, per `contracts/source_hierarchy_rules_v1.md`:

| Source class | Role | Examples in this registry |
|-------------|------|--------------------------|
| **Internal operational data** | Primary truth for BM Klus account/site performance | GSC/GA4 clients, Google Ads utilities, analysis engine, keyword_master, page_inventory |
| **Official reference sources** | Policy/reference layer for platform definitions and system behavior | Google Search Central, GSC/GA4/Ads API docs, Google Ads Help Center (not assets in this repo — see `config/official_sources_manifest_v1.yaml`) |
| **External enrichment sources** | Supplementary context: competitor/SERP/keyword intelligence | DataForSEO integration and analyzer workflows |

Source manifests: `config/official_sources_manifest_v1.yaml`, `config/external_sources_manifest_v1.yaml`.

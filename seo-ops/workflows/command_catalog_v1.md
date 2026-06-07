# Command Catalog v1

**Version:** 1.0
**Date:** 2026-04-07

Commands for operating the seo-ops analysis system. Each command maps to exactly one Python workflow.

---

## Source Build Commands

### BUILD_PAGE_INVENTORY

**Purpose:** Scan local site routes and build normalized page inventory.
**Script:** `seo-ops/analyzers/pages/build_page_inventory.py`

```bash
python seo-ops/analyzers/pages/build_page_inventory.py
```

| Parameter | Required | Default | Notes |
|-----------|----------|---------|-------|
| (none) | — | — | Reads from app/ directory |

**Outputs:**
- `seo-ops/snapshots/normalized/pages/page_inventory_v1.csv`
- `seo-ops/snapshots/normalized/pages/page_inventory_v1.json`
- `seo-ops/reports/pages/page_inventory_summary_v1.md`

**Dependencies:** None
**Failure modes:** Site directory not found; parse errors in page files
**When to run:** After adding/removing pages or changing page metadata

---

### BUILD_KEYWORD_MASTER_V3

**Purpose:** Build keyword_master v3 — consolidated keyword pipeline (replaces v1+v2).
**Script:** `seo-ops/analyzers/keywords/build_keyword_master_v3.py`

```bash
python seo-ops/analyzers/keywords/build_keyword_master_v3.py
```

| Parameter | Required | Default | Notes |
|-----------|----------|---------|-------|
| (none) | — | — | Reads from Google Ads CSVs + GSC snapshot |

**Outputs:**
- `seo-ops/snapshots/normalized/keyword_master/keyword_master_v3.csv`
- `seo-ops/snapshots/normalized/keyword_master/keyword_master_v3.json`
- (also regenerates keyword_master_v2.csv/json for backward compatibility)

**Dependencies:** Google Ads CSV exports + GSC snapshot
**Failure modes:** Missing CSV files; missing GSC snapshot
**When to run:** After new Google Ads data is exported or GSC snapshot is refreshed

> **Deprecated:** `build_keyword_master.py` (v1) and `build_keyword_master_v2.py` have been archived to `_archive/`. Do not use — use `build_keyword_master_v3.py` instead.

---

### BUILD_GSC_SNAPSHOT

**Purpose:** Fetch GSC query+page data, normalize into row/query/page aggregates.
**Script:** `seo-ops/analyzers/seo/build_gsc_query_page_snapshot.py`

```bash
python seo-ops/analyzers/seo/build_gsc_query_page_snapshot.py           # 90d (default)
python seo-ops/analyzers/seo/build_gsc_query_page_snapshot.py --days 28 # 28d (recent, for page diagnostics)
```

| Parameter | Required | Default | Notes |
|-----------|----------|---------|-------|
| `--days` | No | 90 | Window size. Use 28 for recent page diagnostics. |

**Outputs (parameterized by --days N):**
- `seo-ops/snapshots/normalized/seo/gsc_query_page_last{N}d.csv`
- `seo-ops/snapshots/normalized/seo/gsc_query_page_aggregated_queries_last{N}d.csv`
- `seo-ops/snapshots/normalized/seo/gsc_query_page_aggregated_pages_last{N}d.csv`
- `seo-ops/reports/seo/gsc_query_page_snapshot_last{N}d.md`

**Dependencies:** GSC API credentials configured
**Failure modes:** Auth failure; API quota exceeded; network error
**When to run:** Weekly for 90d; before page diagnosis for 28d

---

### BUILD_GA4_SNAPSHOT

**Purpose:** Fetch GA4 landing page data (sessions, engagement, events, channel split).
**Script:** `seo-ops/analyzers/pages/build_ga4_landing_page_snapshot.py`

```bash
python seo-ops/analyzers/pages/build_ga4_landing_page_snapshot.py           # 90d (default)
python seo-ops/analyzers/pages/build_ga4_landing_page_snapshot.py --days 28 # 28d (recent, for page diagnostics)
```

| Parameter | Required | Default | Notes |
|-----------|----------|---------|-------|
| `--days` | No | 90 | Window size. Use 28 for recent page diagnostics. |

**Outputs (parameterized by --days N):**
- `seo-ops/snapshots/normalized/pages/ga4_landing_pages_last{N}d.csv`
- `seo-ops/snapshots/normalized/pages/ga4_landing_pages_by_channel_last{N}d.csv`
- `seo-ops/reports/pages/ga4_landing_pages_last{N}d.md`

**Dependencies:** GA4 API credentials configured
**Failure modes:** Auth failure; API quota exceeded; network error
**When to run:** Weekly for 90d; before page diagnosis for 28d

---

## Analysis Commands

### RUN_PPC_REVIEW

**Purpose:** Integrated PPC campaign review with cross-source overlap analysis.
**Script:** `seo-ops/analyzers/ppc/run_ppc_review_v1.py`

```bash
python seo-ops/analyzers/ppc/run_ppc_review_v1.py
```

| Parameter | Required | Default | Notes |
|-----------|----------|---------|-------|
| (none) | — | — | Hardcoded to campaign 23271040037 |

**Outputs:**
- `seo-ops/reports/ppc/ppc_review_campaign_23271040037_last30d.md`
- `seo-ops/outputs/ppc_review_campaign_23271040037_last30d.json`

**Dependencies:**
- Fresh Google Ads CSVs (6 files) at `D:/projects/bmklus/google/outputs/`
- `keyword_master_v2.csv`
- `ga4_landing_pages_last90d.csv` + channel variant
- `page_inventory_v1.csv`

**Failure modes:** Missing CSV files; stale data (>30 days)
**When to run:** Monthly, or after significant campaign changes

---

### RUN_SEO_GAP_REVIEW

**Purpose:** Site-wide SEO gap analysis: query opportunities, page performance, cannibalization.
**Script:** `seo-ops/analyzers/seo/run_page_vs_query_gap_v1.py`

```bash
python seo-ops/analyzers/seo/run_page_vs_query_gap_v1.py
```

| Parameter | Required | Default | Notes |
|-----------|----------|---------|-------|
| (none) | — | — | Analyzes all pages/queries |

**Outputs:**
- `seo-ops/reports/seo/page_vs_query_gap_v1.md`
- `seo-ops/outputs/page_vs_query_gap_v1.json`

**Dependencies:**
- GSC snapshot (3 files)
- `keyword_master_v2.csv`
- `page_inventory_v1.csv`
- GA4 snapshot (2 files)

**Failure modes:** Missing snapshot files; stale GSC data
**When to run:** Weekly or bi-weekly for ongoing monitoring

---

### RUN_PAGE_AUDIT

**Purpose:** Single-page deep audit with performance verdict and structural recommendations.
**Script:** `seo-ops/analyzers/pages/run_page_audit_v1.py`

```bash
MSYS_NO_PATHCONV=1 python seo-ops/analyzers/pages/run_page_audit_v1.py {route}
```

| Parameter | Required | Default | Notes |
|-----------|----------|---------|-------|
| route | No | `/gevelisolatie/` | Target page route with leading and trailing `/` |

**Note:** `MSYS_NO_PATHCONV=1` is required in Git Bash on Windows to prevent path expansion.

**Outputs:**
- `seo-ops/reports/pages/page_audit_{slug}_v1.md`
- `seo-ops/outputs/page_audit_{slug}_v1.json`

**Dependencies:**
- `page_inventory_v1.csv`
- GSC snapshot (3 files)
- `keyword_master_v2.csv`
- GA4 snapshot (2 files)

**Failure modes:** Route not found in page_inventory; missing snapshot files
**When to run:** On-demand when investigating a specific page

---

### RUN_KEYWORD_INTELLIGENCE_REVIEW_V2

**Purpose:** Cross-source keyword intelligence review with priority buckets for SEO and PPC.
**Script:** `seo-ops/analyzers/keywords/run_keyword_intelligence_review_v2.py`

```bash
python seo-ops/analyzers/keywords/run_keyword_intelligence_review_v2.py
```

| Parameter | Required | Default | Notes |
|-----------|----------|---------|-------|
| (none) | — | — | Analyzes full keyword_master_v2/v3 |

**Outputs:**
- `seo-ops/reports/keywords/keyword_intelligence_review_v2.md`
- `seo-ops/outputs/keyword_intelligence_review_v2.json`

**Dependencies:**
- `keyword_master_v2.csv` (or v3)
- `page_inventory_v1.csv`
- `gsc_query_page_aggregated_queries_last90d.csv`
- `ga4_landing_pages_last90d.csv`

**Failure modes:** Missing keyword_master; missing page_inventory
**When to run:** After refreshing keyword_master, or for periodic keyword landscape review

> **Deprecated:** `run_keyword_intelligence_review_v1.py` has been archived to `_archive/`. Do not use — use v2 instead.

---

### RUN_LEGACY_INDEXATION_REVIEW

**Purpose:** Legacy/indexation cleanup review — identifies legacy, disabled, unmapped, and suspicious URLs still receiving impressions or sessions.
**Script:** `seo-ops/analyzers/seo/run_legacy_indexation_review_v1.py`

```bash
python seo-ops/analyzers/seo/run_legacy_indexation_review_v1.py
```

| Parameter | Required | Default | Notes |
|-----------|----------|---------|-------|
| (none) | — | — | Analyzes all URLs across page_inventory + GSC + GA4 |

**Outputs:**
- `seo-ops/reports/seo/legacy_indexation_review_v1.md`
- `seo-ops/outputs/legacy_indexation_review_v1.json`
- `seo-ops/outputs/legacy_indexation_candidates_v1.csv`

**Dependencies:**
- `page_inventory_v1.csv`
- `gsc_query_page_aggregated_pages_last90d.csv`
- `ga4_landing_pages_last90d.csv`
- `ga4_landing_pages_by_channel_last90d.csv`

**Failure modes:** Missing page_inventory or snapshot files
**When to run:** Monthly, or after site restructuring / URL changes

---

## DataForSEO Enrichment Commands

### RUN_DATAFORSEO_SERP_SNAPSHOT

**Purpose:** Live SERP snapshot for priority queries (NL/nl, top 10 organic).
**Script:** `seo-ops/analyzers/seo/run_dataforseo_serp_snapshot_v1.py`
**Type:** External enrichment (standalone, does not modify internal artifacts)
**Estimated cost:** ~$0.01 for 5 keywords

```bash
# From seo-ops/ directory:
integrations/.venv/Scripts/python analyzers/seo/run_dataforseo_serp_snapshot_v1.py
integrations/.venv/Scripts/python analyzers/seo/run_dataforseo_serp_snapshot_v1.py --dry-run
integrations/.venv/Scripts/python analyzers/seo/run_dataforseo_serp_snapshot_v1.py --keywords "gevelisolatie,buitenmuur isoleren" --limit 3
```

| Parameter | Required | Default | Notes |
|-----------|----------|---------|-------|
| --dry-run | No | — | Print plan without API calls |
| --keywords | No | 5 built-in | Comma-separated keywords |
| --limit | No | 5 | Max keywords (hard limit: 10) |

**Outputs:**
- `seo-ops/snapshots/raw/dataforseo/dataforseo_serp_snapshot_v1.json`
- `seo-ops/snapshots/normalized/dataforseo/serp_snapshot_v1.json`
- `seo-ops/reports/dataforseo/serp_snapshot_v1.md`
- `seo-ops/outputs/dataforseo_serp_snapshot_v1.json`

**Dependencies:** DataForSEO API credentials
**Failure modes:** Auth failure; network error; keyword returns no results

---

### RUN_DATAFORSEO_RANKED_KEYWORDS_GAP

**Purpose:** Keyword gap analysis: own domain vs 2-3 competitors.
**Script:** `seo-ops/analyzers/keywords/run_dataforseo_ranked_keywords_gap_v1.py`
**Type:** External enrichment (standalone)
**Estimated cost:** ~$0.225 for 3 domains

```bash
# From seo-ops/ directory:
integrations/.venv/Scripts/python analyzers/keywords/run_dataforseo_ranked_keywords_gap_v1.py
integrations/.venv/Scripts/python analyzers/keywords/run_dataforseo_ranked_keywords_gap_v1.py --dry-run
integrations/.venv/Scripts/python analyzers/keywords/run_dataforseo_ranked_keywords_gap_v1.py --competitors "isolatiewereld.nl,knauf.nl"
```

| Parameter | Required | Default | Notes |
|-----------|----------|---------|-------|
| --dry-run | No | — | Print plan without API calls |
| --competitors | No | isolatie-info.nl, verbouwkosten.com | Comma-separated domains (max 3) |
| --limit | No | 100 | Max keywords per domain (hard limit: 100) |

**Outputs:**
- `seo-ops/snapshots/raw/dataforseo/dataforseo_ranked_keywords_gap_v1.json`
- `seo-ops/snapshots/normalized/dataforseo/ranked_keywords_gap_v1.json`
- `seo-ops/reports/dataforseo/ranked_keywords_gap_v1.md`
- `seo-ops/outputs/dataforseo_ranked_keywords_gap_v1.json`

**Dependencies:** DataForSEO API credentials; keyword_master_v3.csv (for overlap check, optional)
**Failure modes:** Auth failure; competitor domain not found in DataForSEO

---

### RUN_DATAFORSEO_QUESTION_SUGGESTIONS

**Purpose:** Question/suggestion keywords for content watchlist enrichment.
**Script:** `seo-ops/analyzers/keywords/run_dataforseo_question_suggestions_v1.py`
**Type:** External enrichment (standalone)
**Estimated cost:** ~$0.225 for 3 seeds

```bash
# From seo-ops/ directory:
integrations/.venv/Scripts/python analyzers/keywords/run_dataforseo_question_suggestions_v1.py
integrations/.venv/Scripts/python analyzers/keywords/run_dataforseo_question_suggestions_v1.py --dry-run
integrations/.venv/Scripts/python analyzers/keywords/run_dataforseo_question_suggestions_v1.py --seeds "gevelisolatie,buitenmuur isoleren" --limit 30
```

| Parameter | Required | Default | Notes |
|-----------|----------|---------|-------|
| --dry-run | No | — | Print plan without API calls |
| --seeds | No | gevelisolatie, buitenmuur isoleren, gevelisolatie kosten | Comma-separated seeds (max 5) |
| --limit | No | 50 | Max suggestions per seed (hard limit: 50) |

**Outputs:**
- `seo-ops/snapshots/raw/dataforseo/dataforseo_question_suggestions_v1.json`
- `seo-ops/snapshots/normalized/dataforseo/question_suggestions_v1.json`
- `seo-ops/reports/dataforseo/question_suggestions_v1.md`
- `seo-ops/outputs/dataforseo_question_suggestions_v1.json`

**Dependencies:** DataForSEO API credentials; keyword_master_v3.csv (for novelty check, optional)
**Failure modes:** Auth failure; seed keyword returns no suggestions

---

### BUILD_URL_INSPECTION_SNAPSHOT

**Purpose:** Collect URL Inspection data from GSC API for one or more URLs.
**Script:** `seo-ops/analyzers/seo/build_url_inspection_snapshot.py`

```bash
python seo-ops/analyzers/seo/build_url_inspection_snapshot.py --url https://bm-klus-bv.nl/gevelisolatie/
python seo-ops/analyzers/seo/build_url_inspection_snapshot.py --urls-file urls.txt --label cluster_check
python seo-ops/analyzers/seo/build_url_inspection_snapshot.py --url https://bm-klus-bv.nl/gevelisolatie/ --site-url https://bm-klus-bv.nl/
```

| Parameter | Required | Default | Notes |
|-----------|----------|---------|-------|
| `--url` | One of `--url` / `--urls-file` | — | Single URL to inspect |
| `--urls-file` | One of `--url` / `--urls-file` | — | File with one URL per line |
| `--site-url` | No | From config/site.yaml | GSC property URL override |
| `--label` | No | — | Short label for output file naming |

**Outputs (parameterized by label and date):**
- `seo-ops/snapshots/raw/gsc/url_inspection_{label}_{date}_raw.json`
- `seo-ops/snapshots/normalized/seo/url_inspection_{label}_{date}_normalized.json`

**Dependencies:** GSC API credentials with URL Inspection permission
**Failure modes:** Auth failure; permission denied; URL not in property; network error
**When to run:** Before `indexation_debug_v1`. On-demand when investigating indexation for specific pages.

**Caveats:**
- Makes live API calls — 1 call per URL with 1s delay
- Point-in-time snapshot, not historical

---

### RUN_INDEXATION_DEBUG

**Purpose:** Diagnose indexation state per URL using inspection evidence + optional GSC visibility data.
**Script:** `seo-ops/analyzers/seo/run_indexation_debug_v1.py`
**Contract:** `contracts/indexation_diagnosis_rules_v1.md`

```bash
python seo-ops/analyzers/seo/run_indexation_debug_v1.py
python seo-ops/analyzers/seo/run_indexation_debug_v1.py --input seo-ops/snapshots/normalized/seo/url_inspection_cluster_check_2026-04-08_normalized.json
python seo-ops/analyzers/seo/run_indexation_debug_v1.py --label cluster_check --prefer-window 28
```

| Parameter | Required | Default | Notes |
|-----------|----------|---------|-------|
| `--input` | No | Latest normalized inspection | Path to specific inspection artifact |
| `--label` | No | — | Label for report naming |
| `--prefer-window` | No | 28 | GSC data window: 28 or 90 |

**Outputs:**
- `seo-ops/outputs/indexation_debug_v1.json`
- `seo-ops/reports/seo/indexation_debug_{label}_{date}.md`

**Dependencies:**
- Normalized URL Inspection artifact (required)
- GSC page/query snapshots (optional — runs in limited mode without)
- Page inventory (optional)

**Failure modes:** No inspection artifact found; invalid artifact format
**When to run:** After `build_url_inspection_snapshot`. When investigating why a page is not indexed or has no search visibility.

**Caveats:**
- Conservative — classifies into outcome buckets, does not claim definitive causes
- Limited mode (no GSC data) = indexation state only, no visibility assessment
- Does NOT replace page_audit_v1 for full SEO diagnosis

---

### RUN_MEASUREMENT_AUDIT

**Purpose:** Measurement integrity audit — assess whether GA4/GSC measurement evidence is sufficient and reliable for a given scope.
**Script:** `seo-ops/analyzers/pages/run_measurement_audit_v1.py`
**Contract:** `contracts/measurement_audit_rules_v1.md`

```bash
python seo-ops/analyzers/pages/run_measurement_audit_v1.py --scope site
MSYS_NO_PATHCONV=1 python seo-ops/analyzers/pages/run_measurement_audit_v1.py --scope page --page /gevelisolatie/
python seo-ops/analyzers/pages/run_measurement_audit_v1.py --scope pages --pages-file urls.txt
python seo-ops/analyzers/pages/run_measurement_audit_v1.py --scope site --prefer-window 90
```

| Parameter | Required | Default | Notes |
|-----------|----------|---------|-------|
| `--scope` | Yes | — | `site`, `page`, or `pages` |
| `--page` | If scope=page | — | Page path (e.g. `/gevelisolatie/`) |
| `--pages-file` | If scope=pages | — | File with one page path per line |
| `--prefer-window` | No | 28 | Data window: 28 or 90 |
| `--label` | No | — | Label for output file naming |

**Note:** `MSYS_NO_PATHCONV=1` is required in Git Bash on Windows for `--page` argument.

**Outputs:**
- `seo-ops/outputs/measurement_audit_v1.json`
- `seo-ops/reports/audits/measurement_audit_{scope}_{date}.md`

**Dependencies:**
- GA4 landing page snapshot (required — primary truth)
- GA4 channel breakdown (recommended)
- GSC page aggregates (optional — supporting comparison)
- `config/conversions.yaml`
- `config/thresholds/measurement_audit_v1.yaml`

**Failure modes:** No GA4 data available; page not found in artifacts
**When to run:** Before drawing performance conclusions when measurement trust is in doubt. Before page_audit_v1 when GSC/GA4 numbers seem inconsistent.

**Key caveats:**
- This audit checks measurement evidence quality, NOT page performance
- Cannot diagnose GTM/tag-level issues — artifact-based only
- Low volume is expected for a young site — not automatically a problem
- Runs in limited mode when only partial evidence exists

---

### RUN_QUERY_INTELLIGENCE_REVIEW

**Purpose:** Structured query intelligence review — classify queries by intent and commercial role, detect page-query fit mismatches, identify SEO opportunities and PPC containment candidates.
**Script:** `seo-ops/analyzers/keywords/run_query_intelligence_review_v1.py`
**Contract:** `contracts/query_intelligence_rules_v1.md`

```bash
# Site-wide review
python seo-ops/analyzers/keywords/run_query_intelligence_review_v1.py --scope site

# Single page review
MSYS_NO_PATHCONV=1 python seo-ops/analyzers/keywords/run_query_intelligence_review_v1.py --scope page --page /gevelisolatie/

# Custom query set
python seo-ops/analyzers/keywords/run_query_intelligence_review_v1.py --scope query-set --queries-file queries.txt

# With 90d window and label
python seo-ops/analyzers/keywords/run_query_intelligence_review_v1.py --scope site --prefer-window 90 --label weekly_check
```

| Parameter | Required | Default | Notes |
|-----------|----------|---------|-------|
| `--scope` | Yes | — | `site`, `page`, or `query-set` |
| `--page` | If scope=page | — | Page path (e.g. `/gevelisolatie/`) |
| `--queries-file` | If scope=query-set | — | File with one query per line |
| `--prefer-window` | No | 28 | GSC data window: 28 or 90 |
| `--label` | No | — | Label for output file naming |
| `--output-json` | No | — | Override JSON output path |
| `--output-report` | No | — | Override markdown report path |

**Note:** `MSYS_NO_PATHCONV=1` is required in Git Bash on Windows for `--page` argument.

**Outputs:**
- `seo-ops/outputs/query_intelligence_review_v1.json`
- `seo-ops/reports/keywords/query_intelligence_review_v1_{label}_{date}.md`

**Dependencies:**
- `keyword_master_v3.csv` (preferred) or `keyword_master_v2.csv`
- GSC query/page snapshots (28d preferred, 90d fallback)
- `page_inventory_v1.csv` (recommended for page-fit assessment)

**Failure modes:** No query artifacts available (keyword_master + GSC both missing); page not found in GSC data (page mode); queries file not found (query-set mode)
**When to run:** When investigating query landscape for intent distribution, SEO/PPC opportunity identification, or page-query fit audit. Complements `keyword_intelligence_review_v2` with intent-focused analysis.

**Key caveats:**
- Intent classification is heuristic — based on deterministic signal matching
- Does NOT prove conversion likelihood or business value
- Runs in limited mode when some artifacts are absent
- Recommendations are for manual review, not automatic implementation

---

### RUN_LOCAL_SEO_GBP_AUDIT

**Purpose:** Local SEO / GBP audit — assess GBP profile visibility, review signals, and supporting site/search local context.
**Script:** `seo-ops/analyzers/seo/run_local_seo_gbp_audit_v1.py`
**Contract:** `contracts/local_seo_gbp_rules_v1.md`

```bash
python seo-ops/analyzers/seo/run_local_seo_gbp_audit_v1.py --scope combined
python seo-ops/analyzers/seo/run_local_seo_gbp_audit_v1.py --scope profile
python seo-ops/analyzers/seo/run_local_seo_gbp_audit_v1.py --scope reviews
python seo-ops/analyzers/seo/run_local_seo_gbp_audit_v1.py --scope combined --label weekly_check --prefer-window 90
```

| Parameter | Required | Default | Notes |
|-----------|----------|---------|-------|
| `--scope` | No | `combined` | `profile`, `reviews`, or `combined` |
| `--prefer-window` | No | 28 | GSC data window for supporting context: 28 or 90 |
| `--label` | No | — | Label for output file naming |
| `--output-json` | No | — | Override JSON output path |
| `--output-report` | No | — | Override markdown report path |

**Outputs:**
- `seo-ops/outputs/local_seo_gbp_audit_v1.json`
- `seo-ops/reports/seo/local_seo_gbp_audit_v1_{label}_{date}.md`

**Dependencies:**
- `config/locales/local_entities_v1.yaml` (recommended — local entity context)
- GBP API access (optional — runs in limited mode without)
- GSC query snapshots (optional — for local intent query analysis)
- Page inventory (optional — for location page coverage)

**Failure modes:** All dependencies are optional — workflow always runs, degrading gracefully. If GBP access is unavailable, runs in limited mode with site-side signals only.
**When to run:** When investigating local SEO health, GBP visibility, or review signals. When separating site-side vs GBP-side local issues.

**Key caveats:**
- GBP API access may not be configured — limited mode is the default until setup
- No local pack ranking data available via GBP API
- No competitor GBP data
- Reviews are quantitative only (count, rating) — no sentiment analysis
- Recommendations are for manual follow-up, not automatic implementation

---

## Planned Commands (Not Yet Implemented)

### RUN_FULL_SITE_AUDIT

**Status:** Planned (Phase 6)
**Purpose:** Orchestrated multi-page audit across all priority pages.
**Blocked by:** Orchestrator batch runner not yet built.

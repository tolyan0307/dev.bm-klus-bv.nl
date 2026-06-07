# Architecture V1 — BM klus BV Search Analysis System

## System purpose

Evidence-first analysis and recommendations platform for BM klus BV.
Claude acts as orchestrator, reading data from multiple sources and producing
structured recommendations. **No automatic edits. No automatic mutations.**

### Roles

| Role | Description |
|------|-------------|
| PPC assistant | Campaign analysis, bid/budget recommendations, search term review |
| SEO assistant | Organic visibility, CTR gaps, content opportunities |
| Keyword intelligence | Keyword research, clustering, intent mapping, cannibalization |
| Page analysis | On-page audit, conversion path, internal linking |
| Orchestrator (Claude) | Coordinates workflows, reads data, produces reports |

### Core principle

**Read-only.** The system reads data, analyzes it, and produces recommendations.
The user decides what to implement and applies changes manually.

---

## Project analysis context

**Reference:** `seo-ops/config/analysis_context_v1.yaml`

| Parameter | Value | Notes |
|-----------|-------|-------|
| Site cutover date | 2026-03-08 | Rebuilt Next.js site replaced old WordPress site |
| Analysis mode | `post_cutover_preliminary` | Data baselines not yet established |
| PPC budget | 10 EUR/day (~300 EUR/month) | Low-budget; conversion volume insufficient for statistical significance |
| Legacy data policy | Treat as noise | Pre-cutover GSC/GA4 data reflects old site; do not use for new-site evaluation |

**Implications for all analysis:**
- GSC/GA4 data before 2026-03-08 is old-site data — do not compare directly to post-cutover metrics
- Indexed page count is still incomplete; SEO coverage conclusions are provisional
- PPC recommendations must respect the 10 EUR/day budget reality
- Transition to `stable_production` mode when: 6+ months of clean data, indexation complete, baselines established

---

## Data sources

| Source | Status | Location |
|--------|--------|----------|
| Google Ads API | Working | `D:\projects\bmklus\google\` (external, registered in ASSET_REGISTRY) |
| GA4 Data API | Working | `seo-ops/integrations/google_clients/ga4_client.py` |
| Search Console API | Working | `seo-ops/integrations/google_clients/gsc_client.py` |
| Local site/project files | Available | Project root (`/app`, `/components`, etc.) |
| DataForSEO | Partially operational | `seo-ops/integrations/dataforseo/` (SERP snapshots, keyword gap, question suggestions) |
| Web research | Not connected | `seo-ops/integrations/web/` (placeholder) |

---

## Directory structure

```
seo-ops/
├── config/                    # Configuration
│   ├── locales/               # Locale-specific settings (nl-NL)
│   ├── thresholds/            # Analysis thresholds (CTR, position, etc.)
│   ├── mappings/              # Source-to-schema mappings
│   ├── site.yaml              # [existing] Site metadata
│   ├── conversions.yaml       # [existing] Key events
│   ├── priority-pages.yaml    # [existing] Priority page lists
│   └── competitors.yaml       # [existing] Competitor list
│
├── integrations/              # Data source connectors
│   ├── google_clients/        # [existing] GSC + GA4 Python clients
│   ├── google_ads/            # [v1] Google Ads data fetchers
│   ├── ga4/                   # [v1] GA4 extended workers
│   ├── gsc/                   # [v1] GSC extended workers
│   ├── dataforseo/            # [v1] DataForSEO connector (partially operational)
│   ├── site/                  # [v1] Local site content reader
│   └── web/                   # [v1] Web research layer (future)
│
├── snapshots/                 # [v1] Timestamped data snapshots
│   ├── raw/                   # Raw API responses
│   └── normalized/            # Normalized to internal schemas
│
├── analyzers/                 # [v1] Analysis modules
│   ├── ppc/                   # PPC campaign analysis
│   ├── seo/                   # SEO opportunity/risk analysis
│   ├── keywords/              # Keyword intelligence
│   └── pages/                 # Page-level audits
│
├── workflows/                 # [v1] Orchestrated multi-step workflows
│
├── schemas/                   # [v1] Data contracts and schemas
│
├── reports/                   # Output reports
│   ├── weekly/                # [existing] Weekly organic reports
│   ├── audits/                # [existing] Audit reports
│   ├── briefs/                # [existing] Content briefs
│   ├── ppc/                   # [v1] PPC reports
│   ├── seo/                   # [v1] SEO reports
│   ├── keywords/              # [v1] Keyword reports
│   ├── pages/                 # [v1] Page audit reports
│   └── combined/              # [v1] Cross-domain reports
│
├── outputs/                   # [v1] Final deliverables
│
├── analysis/                  # [existing] Rule-based analysis engine
├── prompts/                   # [existing] Prompt templates
├── templates/                 # [existing] Export templates
├── data/                      # [existing] Raw + processed data
│
├── capabilities.md            # [existing] Operator capability map
├── README.md                  # [updated] Project overview
├── ARCHITECTURE_V1.md         # This file
├── ROADMAP_V1.md              # Implementation phases
├── CONTRACTS_V1.md            # Output contracts
└── ASSET_REGISTRY.md          # External asset registry
```

---

## Core future objects

### keyword_master

Central keyword intelligence object. Aggregates keyword data from all sources
(GSC queries, Google Ads keywords, search terms, DataForSEO) into a unified
keyword database with:
- Search volume, CPC, competition
- Current ranking position (GSC)
- Ad performance (Ads)
- Intent classification
- Cluster assignment
- Cannibalization flags

### page_inventory

Unified page object combining:
- URL and metadata (from site crawl)
- GSC performance (clicks, impressions, position)
- GA4 metrics (sessions, conversions, engagement)
- Ads landing page performance
- On-page signals (H1, title, description, word count)
- Internal linking profile
- Content freshness

---

## Design decisions

1. **Existing code stays in place.** Google Ads scripts in `D:\projects\bmklus\google\` are registered but not moved.
2. **Existing seo-ops/ code stays.** `analysis/`, `integrations/google_clients/`, `data/`, `prompts/` are preserved as-is.
3. **New v1 directories extend, not replace.** `analyzers/` is the v1 evolution of `analysis/`. `snapshots/` complements `data/`.
4. **No auto-apply.** System produces JSON/Markdown reports. User decides what to implement.
5. **Claude orchestrates.** Workflows are defined as prompt templates + data pipelines that Claude executes on request.

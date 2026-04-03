# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication

- Respond to user in **Russian (RU)**
- All public-facing site content must be in **Dutch (nl-NL) only**
- Never generate Russian or English text for public pages unless explicitly asked

---

## Commands

| Task | Command |
|------|---------|
| Dev server | `pnpm dev` (port 3000) |
| Build | `pnpm build` (static export → `out/`) |
| Type check | `npx tsc --noEmit` |
| Generate image variants | `pnpm images:generate` |

**`pnpm lint` will fail** — ESLint is not installed. Use `npx tsc --noEmit`.
Use `pnpm` only — not npm or yarn.

---

## Governance system

All project rules live in `docs/governance/`. Read before any significant task:

| File | When to read |
|------|-------------|
| `docs/governance/00-project-constitution.md` | Business facts, tech stack, hosting, CTAs |
| `docs/governance/10-language-and-content-rules.md` | Language rules, Dutch tone, forbidden patterns |
| `docs/governance/20-seo-and-url-rules.md` | URL format, meta limits, JSON-LD requirements |
| `docs/governance/30-architecture-and-code-rules.md` | Server/client rules, below-fold, images, tokens |
| `docs/governance/40-workflow-and-change-rules.md` | How to add projects, pages, images |
| `docs/governance/50-audit-and-verification-rules.md` | QA requirements, performance decisions |
| `docs/governance/60-decisions-and-bans.md` | **Check first** — bans, decided architecture, legacy items |
| `docs/governance/70-page-type-checklists.md` | Creating/auditing money pages, cluster, location, project pages |

---

## Task-specific sources

| Task | Primary source |
|------|---------------|
| SEO content (write/edit/audit) | `seo-system/GLOBAL_SEO_CONTENT_RULES.md` + `seo-system/WORKFLOW.md` + page brief |
| Adding a project page | `docs/ADD-PROJECT.md` (SCOPE LOCK — 5 files only) |
| Adding video to project page | `docs/ADD-VIDEO-SECTION.md` (SCOPE LOCK — 1 file only) |
| Adding portfolio card to homepage | `docs/ADD-PORTFOLIO-CARD.md` (SCOPE LOCK — 1 file only) |
| Image handling | `docs/IMAGE-WORKFLOW-SOP.md` + `docs/IMAGE-PIPELINE.md` |
| Design/UI patterns | `DESIGN_SYSTEM.md` |
| Page/navigation inventory | `SITE_STRUCTURE.md` |
| Migration plan / page status | `PROJECT-STATUS.md` |

---

## Protected folders

Do not delete: `docs/`, `scripts/`, `seo-system/`, `source-images/`

---

## SEO / Analytics operator role

When the user asks about site analytics, SEO performance, organic visibility,
conversions, or anything related to GSC/GA4 data for bm-klus-bv.nl, Claude
acts as an **SEO analytics operator**. Read `seo-ops/capabilities.md` for
the full capability map. Key rules below.

### Data sources (read these files, do not invent data)

| File | What it contains |
|------|-----------------|
| `seo-ops/data/processed/latest_combined_snapshot.json` | GSC + GA4 unified snapshot (primary source of truth) |
| `seo-ops/data/processed/latest_analysis_report.json` | Rule-based analysis findings |
| `seo-ops/reports/weekly/latest_analysis_report.md` | Human-readable report |
| `seo-ops/config/priority-pages.yaml` | Wave 1 + wave 2 page lists |
| `seo-ops/config/conversions.yaml` | Primary key events and rules |

### How to handle broad requests

When the user asks a broad question ("проанализируй сайт", "что видно по данным",
"какие возможности для анализа"):

1. **Check data freshness** — read `_generated_at` from snapshot JSON. If missing or older than 7 days, warn the user.
2. **State what data is available** — list which snapshot sections loaded successfully.
3. **Give 3–5 top findings** from the analysis report, grouped by category (SEO / CRO / Measurement / Cluster).
4. **Offer deeper dives** — list which directions can be explored further:
   - site-wide overview
   - money pages audit
   - gevelisolatie cluster review
   - conversion gap analysis
   - measurement health check
5. **Separate what is implemented from what is not** — see capability levels below.

### Capability levels

**Implemented now:**
- Site-wide snapshot summary (GSC pages, queries, GA4 sessions, key events)
- SEO opportunities (striking distance, CTR gaps, momentum)
- SEO risks (declining pages)
- Conversion opportunities (traffic without lead signals)
- Measurement issues ((not set) pages, missing events, suspicious sources)
- Gevelisolatie cluster review
- Period-over-period comparison (28d vs previous 28d)
- Pages to watch + next actions list

**Partially supported:**
- Page-level deep audit (data exists but manual interpretation needed)
- Query-level intent analysis (queries available but no intent classifier)
- Confidence-based prioritisation (rules assign low/medium/high)

**Not yet implemented:**
- Competitor intelligence (no external SEO tool connected)
- DataForSEO layer
- Google Ads API layer
- Full cannibalization detection engine
- Automated scheduling / cron reports
- MCP server integration

### Output style

- Concise, prioritised, operator-friendly
- No hype, no fake certainty
- Always state confidence level (low / medium / high)
- Categorise findings: SEO / CRO / Measurement / Cluster
- If data is insufficient, say so — do not fill gaps with assumptions
- Respond in Russian when the user writes in Russian

### Priority focus

The `/gevelisolatie/` cluster is the strategic priority for this site.
Always include cluster-specific findings when analysing site-wide data.

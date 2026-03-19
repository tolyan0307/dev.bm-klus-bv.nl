# Inventory of Existing Rules — BM klus BV

**Date:** 2026-03-19
**Purpose:** Audit of all rule-like files in the repository, conducted before creating the governance structure.

---

## Rule sources found

| File | Role | Status | Lines |
|------|------|--------|-------|
| `CLAUDE.md` | Claude Code adapter | active | ~140 |
| `AGENTS.md` | Cursor Cloud adapter | active, thin | 34 |
| `DESIGN_SYSTEM.md` | Visual design reference | **excellent, keep as-is** | 371 |
| `PROJECT-STATUS.md` | Architecture + migration plan + deferred tasks | reference | ~243 |
| `SITE_STRUCTURE.md` | Content/navigation inventory (RU) | reference | ~560 |
| `TODO-DEFERRED.md` | Backlog (unstructured, RU) | active backlog | 78 |
| `seo-system/GLOBAL_SEO_CONTENT_RULES.md` | SEO content rules | **excellent, keep as-is** | 263 |
| `seo-system/WORKFLOW.md` | SEO workflow step-by-step | **excellent, keep as-is** | 249 |
| `seo-system/CURSOR_TASK_TEMPLATE.md` | 3-step task template for Cursor | **excellent, keep as-is** | 198 |
| `seo-system/SEO_BRIEF_TEMPLATE.yaml` | Page brief template | active | 62 |
| `seo-system/briefs/*.yaml` | 9 page briefs | active | varies |
| `docs/ADD-PROJECT.md` | Project page creation workflow | **excellent, keep as-is** | 1161 |
| `docs/ADD-PROJECT-PROMPT.md` | Prompt for weak AI models | active, keep | 331 |
| `docs/IMAGE-PIPELINE.md` | Image system specification | **excellent, keep as-is** | 337 |
| `docs/IMAGE-WORKFLOW-SOP.md` | Image handling SOP | **excellent, keep as-is** | 251 |
| `docs/IMAGE-SLOT-AUDIT.md` | Image audit (2026-03-13) | audit output | 1033 |
| `docs/PROJECT-REGISTRY-AUDIT.md` | Project registry audit (2025-03-15) | audit output | 116 |
| `docs/perf/performance-map-current-state.md` | Performance map (2026-03-15) | audit output | 243 |
| `docs/perf/homepage-audit-lighthouse-followup.md` | Lighthouse audit (2026-03-15) | audit output | 355 |
| `scripts/generate-variants.mjs` | Image variant generator | tool, keep | 303 |
| `scripts/fetch-google-place.mjs` | Pre-build Google Places fetch | tool, keep | 133 |

**No `.cursor/` directory found** — Cursor had no automatic rule loading before this governance pass.

---

## Duplications

| Information | Duplicated in |
|-------------|---------------|
| Tech stack description | `CLAUDE.md` + `AGENTS.md` + `GLOBAL_SEO_CONTENT_RULES.md §1` + `PROJECT-STATUS.md` |
| Dev commands (pnpm dev/build) | `CLAUDE.md` + `AGENTS.md` |
| No ESLint caveat | `CLAUDE.md` + `AGENTS.md` |
| Dutch content language rule | `CLAUDE.md` + `CURSOR_TASK_TEMPLATE.md` + `DESIGN_SYSTEM.md §13` + `GLOBAL_SEO_CONTENT_RULES.md §5` |
| Below-fold rendering pattern | `CLAUDE.md` + `DESIGN_SYSTEM.md §14` |

---

## Conflicts

| Conflict | Resolution |
|----------|------------|
| `seo-system/WORKFLOW.md` "Добавление нового проекта" scenario vs `docs/ADD-PROJECT.md` | Not a real conflict — WORKFLOW.md has a brief snippet; ADD-PROJECT.md is the canonical 1161-line source. WORKFLOW.md should reference ADD-PROJECT.md. No content is wrong. |
| `PROJECT-STATUS.md` Deferred Tasks vs `TODO-DEFERRED.md` | Partial overlap, no factual conflict. Both remain as reference. |
| `DESIGN_SYSTEM.md §13` tone ("professioneel, warm") vs `GLOBAL_SEO_CONTENT_RULES.md §5` tone ("duidelijk, betrouwbaar, praktisch, lokaal") | Not a conflict — different phrasings of the same requirement. Consolidated in `docs/governance/10-language-and-content-rules.md`. |

---

## Stale/legacy items (do not copy forward)

| Item | Location | Status |
|------|----------|--------|
| `styles/globals.css` (126 lines) | root | Dead file — shadcn/ui artifact, never imported |
| `#cookiescript_badge` CSS rule | `app/globals.css:197` | Remnant, safe to delete |
| `public/vendor/cookiescript/` | `public/` | Unused file, safe to delete |
| `components/inline-quote-form.tsx` | `components/` | Unused after switch to QuoteModal popup |
| `components/sections/gevelisolatie/mid-page-cta.tsx` | `components/sections/gevelisolatie/` | Removed from pages, file remains |
| `BeforeAfterSection` | `components/sections/gevelisolatie/` | Built but not connected (needs photos) |
| `lh3.googleusercontent.com` preconnect | `app/layout.tsx:48` | Low-priority removal candidate |

---

## What must be preserved (critical decisions buried in these files)

| Decision | Source |
|----------|--------|
| `/contact/page.tsx` intentionally `"use client"` — do not refactor | `docs/perf/performance-map-current-state.md §9` |
| Manifest leak fully closed — do not reopen | `docs/perf/performance-map-current-state.md §2` |
| `app/gevelisolatie/materialen/page.tsx` needs refactor to server component (high priority) | `docs/perf/performance-map-current-state.md §8` |
| All 30 `.htaccess` redirects needed before deploy | `PROJECT-STATUS.md §Migration Plan` |
| SCOPE LOCK for adding project pages (only 5 files allowed) | `docs/ADD-PROJECT.md §1a` |
| baseName format differs: subfolder projects vs flat projects | `docs/PROJECT-REGISTRY-AUDIT.md §4` |
| Etten-Leur 6cm has duplicate path segment bug | `docs/PROJECT-REGISTRY-AUDIT.md §6` |
| Hardcoded price table (owner must confirm changes) | `seo-system/GLOBAL_SEO_CONTENT_RULES.md §10` |

---

## What can be merged into governance docs

| Content | From | Into |
|---------|------|------|
| Business facts (phone, address, KVK) | `GLOBAL_SEO_CONTENT_RULES.md §1` | `00-project-constitution.md` |
| Hosting/deployment details | `PROJECT-STATUS.md §Hosting` | `00-project-constitution.md` |
| Language/tone rules | `DESIGN_SYSTEM.md §13` + `GLOBAL_SEO_CONTENT_RULES.md §5` | `10-language-and-content-rules.md` |
| URL format + meta limits | `GLOBAL_SEO_CONTENT_RULES.md §6` | `20-seo-and-url-rules.md` |
| Code architecture rules | `CLAUDE.md` architecture section | `30-architecture-and-code-rules.md` |
| Workflow pointers | `AGENTS.md` + `CLAUDE.md` | `40-workflow-and-change-rules.md` |
| Performance decisions | `docs/perf/performance-map-current-state.md §8-9` | `50-audit-and-verification-rules.md` |
| Explicit bans | scattered | `60-decisions-and-bans.md` |
| Service page checklist | `TODO-DEFERRED.md` + `GLOBAL_SEO_CONTENT_RULES.md §8` | `70-page-type-checklists.md` |

---

## What should NOT be copied forward verbatim

- Full tech stack descriptions (derive from code instead)
- Full page content inventory from `SITE_STRUCTURE.md` (read the file directly)
- Full audit data from `docs/IMAGE-SLOT-AUDIT.md` (reference the file)
- Backlog items from `TODO-DEFERRED.md` (managed separately)

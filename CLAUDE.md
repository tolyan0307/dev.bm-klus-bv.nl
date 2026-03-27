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

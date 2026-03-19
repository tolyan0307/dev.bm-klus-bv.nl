# AGENTS.md

Neutral agent bridge for BM klus BV repository.
Read by any AI agent operating in this codebase.

## Project

Static marketing website for **BM klus BV** (Dutch facade/construction company).
Next.js 16, App Router, `output: 'export'` — fully static, no server runtime.
Full project facts → `docs/governance/00-project-constitution.md`

---

## Development commands

| Task | Command |
|------|---------|
| Dev server | `pnpm dev` (port 3000) |
| Build | `pnpm build` (static export → `out/`) |
| Type check | `npx tsc --noEmit` |
| Generate image variants | `pnpm images:generate` |

- `pnpm lint` will fail — ESLint is not installed
- Package manager: **pnpm** only (pnpm-lock.yaml is authoritative)
- No automated test suite

---

## Communication

- Respond to owner in **Russian (RU)**
- All public site content: **Dutch (nl-NL) only**
- Full rules → `docs/governance/10-language-and-content-rules.md`

---

## Governance

All project rules → `docs/governance/`
Check `docs/governance/60-decisions-and-bans.md` before any task.

| Task | Source |
|------|--------|
| SEO content + workflow | `seo-system/GLOBAL_SEO_CONTENT_RULES.md` + `seo-system/WORKFLOW.md` + page brief |
| Code changes | `docs/governance/30-architecture-and-code-rules.md` |
| Adding a project page | `docs/ADD-PROJECT.md` (SCOPE LOCK — 5 files only) |
| Image handling | `docs/IMAGE-WORKFLOW-SOP.md` |
| Design/UI | `DESIGN_SYSTEM.md` |
| Page checklists | `docs/governance/70-page-type-checklists.md` |

---

## Protected folders

Do not delete: `docs/`, `scripts/`, `seo-system/`, `source-images/`

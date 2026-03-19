# Governance Architecture Plan — BM klus BV

**Date:** 2026-03-19
**Purpose:** Documents the final governance structure after the inventory pass.

---

## Design principles

1. **Don't break what works.** `seo-system/`, `docs/ADD-PROJECT.md`, `DESIGN_SYSTEM.md`, `docs/IMAGE-*.md` are excellent. Reference them, never duplicate them.
2. **Fill gaps.** Governance docs exist only where information is currently scattered or missing.
3. **Single source of truth per domain.** Every rule lives in exactly one place.
4. **Thin adapters.** `CLAUDE.md`, `AGENTS.md`, `.cursor/rules/` are thin pointers — not content holders.

---

## File structure

```
docs/
  governance/
    INVENTORY_EXISTING_RULES.md      ← this audit (frozen, reference)
    GOVERNANCE_ARCHITECTURE_PLAN.md  ← this document (frozen, reference)
    00-project-constitution.md       ← SSoT: business facts, stack, hosting, CTAs
    10-language-and-content-rules.md ← SSoT: communication + Dutch content rules
    20-seo-and-url-rules.md          ← SSoT: URL/meta invariants + pointer → seo-system/
    30-architecture-and-code-rules.md ← SSoT: code rules, server/client, below-fold
    40-workflow-and-change-rules.md  ← SSoT: how to work on project (pointers to docs/)
    50-audit-and-verification-rules.md ← SSoT: QA + performance decisions
    60-decisions-and-bans.md         ← SSoT: explicit bans + architectural decisions
    70-page-type-checklists.md       ← SSoT: per-page-type checklists
  audit/
    index.md                         ← index of all audit outputs with dates
  ADD-PROJECT.md                     ← unchanged (SSoT for project pages workflow)
  ADD-PROJECT-PROMPT.md              ← unchanged (weak-model prompt)
  IMAGE-PIPELINE.md                  ← unchanged (SSoT for image system)
  IMAGE-WORKFLOW-SOP.md              ← unchanged (SSoT for image procedures)
  IMAGE-SLOT-AUDIT.md                ← unchanged (audit output 2026-03-13)
  PROJECT-REGISTRY-AUDIT.md         ← unchanged (audit output 2025-03-15)
  perf/                              ← unchanged (audit outputs)

seo-system/                          ← unchanged (SSoT for SEO content rules)
DESIGN_SYSTEM.md                     ← unchanged (SSoT for visual design)
PROJECT-STATUS.md                    ← unchanged (reference: migration plan, page status)
SITE_STRUCTURE.md                    ← unchanged (reference: content inventory)
TODO-DEFERRED.md                     ← unchanged (reference: backlog)

CLAUDE.md                            ← thin adapter (updated)
AGENTS.md                            ← thin adapter (updated)

.cursor/rules/
  00-always.mdc                      ← always-on: core bans + key facts
  10-seo-content.mdc                 ← auto for content/*.ts + page.tsx
  20-code-changes.mdc                ← auto for app/, components/, lib/
```

---

## Single source of truth map

| Domain | SSoT file |
|--------|-----------|
| Business facts, tech stack, hosting | `docs/governance/00-project-constitution.md` |
| Communication language, Dutch style | `docs/governance/10-language-and-content-rules.md` |
| URL format, meta limits | `docs/governance/20-seo-and-url-rules.md` |
| SEO content rules, terminology, cannibalization | `seo-system/GLOBAL_SEO_CONTENT_RULES.md` |
| SEO workflow | `seo-system/WORKFLOW.md` |
| SEO page briefs | `seo-system/briefs/*.yaml` |
| Code architecture, server/client, below-fold | `docs/governance/30-architecture-and-code-rules.md` |
| Visual design, tokens, component patterns | `DESIGN_SYSTEM.md` |
| Workflow pointers, protected files | `docs/governance/40-workflow-and-change-rules.md` |
| QA, performance decisions | `docs/governance/50-audit-and-verification-rules.md` |
| Bans, architectural decisions, legacy items | `docs/governance/60-decisions-and-bans.md` |
| Per-page-type checklists | `docs/governance/70-page-type-checklists.md` |
| Adding project pages | `docs/ADD-PROJECT.md` |
| Image pipeline | `docs/IMAGE-PIPELINE.md` |
| Image procedures | `docs/IMAGE-WORKFLOW-SOP.md` |
| Migration plan, redirect table | `PROJECT-STATUS.md` |
| Audit outputs index | `docs/audit/index.md` |

---

## What existing files now become

| File | New role |
|------|----------|
| `CLAUDE.md` | Thin adapter: quick start + commands + pointer to governance |
| `AGENTS.md` | Neutral agent bridge: commands + governance pointer, no agent-specific content |
| `seo-system/GLOBAL_SEO_CONTENT_RULES.md` | Remains SSoT for SEO — governance references it |
| `DESIGN_SYSTEM.md` | Remains SSoT for design — governance references it |
| `docs/ADD-PROJECT.md` | Remains SSoT for project pages — governance references it |
| `docs/IMAGE-PIPELINE.md` | Remains SSoT for image system — governance references it |
| `PROJECT-STATUS.md` | Reference doc — migration plan, page completion status |
| `TODO-DEFERRED.md` | Reference doc — active backlog |
| `SITE_STRUCTURE.md` | Reference doc — content/navigation inventory |

---

## 4-layer model

```
Layer 0 — Project SSoT (authoritative, pre-existing)
  seo-system/GLOBAL_SEO_CONTENT_RULES.md  — SEO content rules
  seo-system/WORKFLOW.md                  — SEO workflow
  DESIGN_SYSTEM.md                        — visual design + tokens
  docs/ADD-PROJECT.md                     — project page creation
  docs/IMAGE-PIPELINE.md                  — image system
  docs/IMAGE-WORKFLOW-SOP.md              — image procedures

Layer 1 — Governance (project rules SSoT, fills gaps)
  docs/governance/00-project-constitution.md
  docs/governance/10-language-and-content-rules.md
  docs/governance/20-seo-and-url-rules.md
  docs/governance/30-architecture-and-code-rules.md
  docs/governance/40-workflow-and-change-rules.md
  docs/governance/50-audit-and-verification-rules.md
  docs/governance/60-decisions-and-bans.md       ← check first
  docs/governance/70-page-type-checklists.md

Layer 2 — Audit memory (snapshots, working state)
  docs/audit/index.md
  docs/IMAGE-SLOT-AUDIT.md
  docs/PROJECT-REGISTRY-AUDIT.md
  docs/perf/performance-map-current-state.md
  docs/perf/homepage-audit-lighthouse-followup.md
  PROJECT-STATUS.md                       — migration plan, page status
  TODO-DEFERRED.md                        — active backlog
  SITE_STRUCTURE.md                       — content/navigation inventory

Layer 3 — Agent adapters (thin pointers, no rule definitions)
  AGENTS.md                               — neutral bridge (all agents)
  CLAUDE.md                               — Claude Code specific
  .cursor/rules/00-always.mdc             — Cursor always-on
  .cursor/rules/10-seo-content.mdc        — Cursor content work
  .cursor/rules/20-code-changes.mdc       — Cursor code work
```

**Rules for the layer model:**
- Layers 0 and 1 define rules. Layers 2 and 3 only reference rules, never define them.
- If a rule exists in Layer 0, Layer 1 does not duplicate it — only points to it.
- If a rule exists in Layer 1, Layer 3 does not duplicate it — only references it with a 1-line reminder.
- Audit memory (Layer 2) describes state, not rules. It changes as the project evolves.

---

## What gets updated and when

| Event | Update |
|-------|--------|
| New architectural decision | `docs/governance/60-decisions-and-bans.md` |
| New workflow added | `docs/governance/40-workflow-and-change-rules.md` (pointer) |
| Image audit run | `docs/IMAGE-SLOT-AUDIT.md` + `docs/audit/index.md` |
| Performance audit run | `docs/perf/` + `docs/audit/index.md` |
| Business facts change | `docs/governance/00-project-constitution.md` |
| New service page added | `docs/governance/70-page-type-checklists.md` (if new pattern) |
| Price change | `docs/governance/60-decisions-and-bans.md §Hardcoded prices` |

---

## How Claude should use this system

1. Read `CLAUDE.md` for quick start + commands
2. For **any task**: check `docs/governance/60-decisions-and-bans.md` first (bans + decisions)
3. For **code**: read `docs/governance/30-architecture-and-code-rules.md`
4. For **content**: read `seo-system/GLOBAL_SEO_CONTENT_RULES.md` + page brief + `seo-system/WORKFLOW.md`
5. For **specific task type**: follow pointer in `docs/governance/40-workflow-and-change-rules.md`
6. For **design**: `DESIGN_SYSTEM.md`
7. For **checklists**: `docs/governance/70-page-type-checklists.md`

## How Cursor should use this system

1. `.cursor/rules/00-always.mdc` always loaded — core bans + key facts
2. For content files: `.cursor/rules/10-seo-content.mdc` auto-loads
3. For code files: `.cursor/rules/20-code-changes.mdc` auto-loads — thin reminders only
4. For SEO sessions: user runs prompts from `seo-system/WORKFLOW.md` (copy-paste ready)
5. For project pages: `docs/ADD-PROJECT.md` is the complete self-contained instruction

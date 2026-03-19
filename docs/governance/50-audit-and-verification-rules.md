# 50 — Audit & Verification Rules

> When and how to run audits. Performance decisions that are already closed.
> Existing audit outputs → `docs/audit/index.md`

---

## QA requirements for every content task

For every content write or edit, produce scores (0–100) for 6 dimensions and report issues.
Full QA template: `seo-system/CURSOR_TASK_TEMPLATE.md Step 3`

| Dimension | What it checks |
|-----------|---------------|
| SEO alignment | Intent match, keyword coverage, heading structure |
| Dutch naturalness | Professional tone, no AI-sounding phrases, correct terminology |
| Factual safety | No fabricated claims, all uncertainties flagged |
| Conversion clarity | CTA present, next step obvious, commercial intent appropriate |
| Cannibalization risk | Checked against sibling pages from brief |
| On-page constraints | Title ≤60, description ≤160, slug ≤75, heading hierarchy |

Result: **PASS** / **PASS WITH FIXES** (apply fixes) / **FAIL** (return to Step 2).
**Never skip QA. The project owner cannot manually validate Dutch quality.**

---

## Performance — closed issues (do not reopen)

Source: `docs/perf/performance-map-current-state.md`

| Issue | Status |
|-------|--------|
| Image manifest client bundle leak | **CLOSED** — fully eliminated across all routes |
| Homepage CLS | **CLOSED** |
| CookieScript self-host experiment | **CLOSED** — rolled back |
| Duplicate GTM injection | **CLOSED** — single integration point confirmed |

Do not add these back to action queues.

---

## Performance — priority action (open)

| Item | File | Why |
|------|------|-----|
| Refactor `app/gevelisolatie/materialen/page.tsx` to server component | `app/gevelisolatie/materialen/page.tsx` | Currently `"use client"` at page level (90.5 KB chunk). No manifest leak, but fragile architecture. Convert to server page + client interactive leaf (same pattern as rest of `/gevelisolatie/`). Expected reduction: ~30–50 KB. |

---

## Performance — leave alone

| Item | Reason |
|------|--------|
| `/contact/page.tsx` wide client boundary | Form complexity makes cost > benefit. Accepted. |
| `/gevelisolatie/` 79.1 KB chunk | Clean, all sections correct server/client split |
| GTM integration | No duplicates, single injection point, clean |
| Vendor runtime chunks (Next.js RSC, polyfills) | Framework baseline, not controllable |
| Tailwind 140 KB CSS chunk | Compresses to ~15–20 KB over wire; split not supported in v4 without major effort |

---

## Project registry integrity

When adding/modifying project pages, verify:
1. Entry exists in `lib/content/projects.ts`
2. Matching page directory in `app/onze-werken/[slug]/`
3. Images present in correct format (flat vs subfolder — see `docs/PROJECT-REGISTRY-AUDIT.md §4`)
4. `baseName` references do not create duplicate path segments
5. `data/image-manifest.json` has entries for all used images

Known bug: Etten-Leur 6cm (`etten-leur-gevelisolatie-6cm-strikolith-2025`) has a duplicate path segment in hero image. See `docs/PROJECT-REGISTRY-AUDIT.md §6` for fix instructions.

---

## Image integrity checks

After `pnpm images:generate`:
- Verify file sizes are within preset budgets (see `docs/IMAGE-PIPELINE.md §File size limits`)
- Verify `data/image-manifest.json` has the new entries
- Verify variants exist at correct widths for the preset used
- Verify `sizes` attribute in `<ResponsiveImage>` matches the actual layout

---

## Lighthouse / PageSpeed audits

Run after significant build changes:
- Score targets: LCP < 2.5s, TBT < 200ms, CLS < 0.1
- Key metric driver: client JS bundle size (avoid manifest leak pattern)
- For detailed current state: `docs/perf/performance-map-current-state.md`

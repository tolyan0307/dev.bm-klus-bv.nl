# 40 — Workflow & Change Rules

> How work happens on this project. All workflows have canonical instruction docs — this file is a map.

---

## General principles

- **Minimal changes:** only what's explicitly requested or clearly necessary
- **Read before editing:** always read a file before changing it
- **No unsolicited refactors:** don't clean up surrounding code while fixing a specific issue
- **No new pages without a brief:** every new route needs an entry in `data/sitemap-plan.ts` and a purpose

---

## Task type → workflow map

| Task | Primary instruction | Key notes |
|------|--------------------|-----------|
| Add a project page | `docs/ADD-PROJECT.md` | SCOPE LOCK: only 5 files may change (see §1a) |
| SEO content (write/edit/audit) | `seo-system/WORKFLOW.md` | 3 steps: Analyze → Edit → QA |
| Add/update images | `docs/IMAGE-WORKFLOW-SOP.md` | Source → `source-images/`, never `public/images/` |
| New service page | `DESIGN_SYSTEM.md §10` + create brief | Follow pillar page structure |
| Performance work | `docs/perf/performance-map-current-state.md §8` | Priority item: `/gevelisolatie/materialen/` |
| Update prices | `seo-system/GLOBAL_SEO_CONTENT_RULES.md §10` | Always flag `[CLAIM_NEEDS_CONFIRMATION]` |

---

## Adding a project page (SCOPE LOCK)

Follow `docs/ADD-PROJECT.md` exactly. Only these 5 files may change:
1. `lib/content/projects.ts`
2. `lib/content/projects/[slug].ts`
3. `app/onze-werken/[slug]/page.tsx`
4. `data/image-manifest.json` (script-updated)
5. `public/_htaccess` (only if `oldUrl` in JSON)

Reference implementation: `app/onze-werken/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025/`

---

## SEO content workflow

Follow `seo-system/WORKFLOW.md` (3 steps: Analyze → Edit → QA). Never skip Step 3.

---

## Adding/updating images

Follow `docs/IMAGE-WORKFLOW-SOP.md`. Source always from `source-images/`, never `public/images/`.

---

## New service page

1. Create `app/[service]/page.tsx` following pillar page structure (`DESIGN_SYSTEM.md §10`)
2. Create `lib/content/[service].ts` (content only, no UI)
3. Create `components/sections/[service]/` directory with section components
4. Add route to `data/sitemap-plan.ts`
5. Create SEO brief: `seo-system/briefs/[service].yaml` from template
6. Run `npx tsc --noEmit` — must pass

---

## Protected files (do not delete)

| Path | Why |
|------|-----|
| `docs/` | Workflow instructions, audit docs |
| `scripts/` | Build tools (generate-variants.mjs, fetch-google-place.mjs) |
| `seo-system/` | SEO workflow and briefs |
| `source-images/` | Source images for responsive pipeline |
| `data/image-manifest.json` | Generated manifest — run `pnpm images:generate` to update, never hand-edit |

---

## Pre-build note

`pnpm build` runs `scripts/fetch-google-place.mjs` as a prebuild step.
Requires `GOOGLE_PLACES_SERVER_KEY` (or `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` as fallback) in `.env.local`.
Without it, build succeeds but Google Place data (reviews, rating) won't update.

---

## Pre-deploy checklist

Before uploading `out/` to production:

- [ ] `npx tsc --noEmit` passes with 0 errors
- [ ] `pnpm build` succeeds (no build errors)
- [ ] `public/_htaccess` created with all 30 redirects (see `PROJECT-STATUS.md §Migration Plan`)
- [ ] `NEXT_PUBLIC_GTM_ID` set in `.env`
- [ ] OG images in place (`/public/images/og-*.jpg`)
- [ ] Cloudflare Turnstile key set and tested
- [ ] `data/google-place.json` current (run prebuild or manually fetch)

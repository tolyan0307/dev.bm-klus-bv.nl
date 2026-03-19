# Audit Outputs Index

> Index of all audit documents. These are snapshots — check dates before acting on findings.
> Living project state → `PROJECT-STATUS.md`, `TODO-DEFERRED.md`

---

## Current audit outputs

| File | Date | Scope | Key findings |
|------|------|-------|-------------|
| `docs/IMAGE-SLOT-AUDIT.md` | 2026-03-13 | All ~95 image slots across 18 routes | Location pages share one hero image (TODO); /buiten-stucwerk/ has only 2 images; ~20 orphaned image files; before/after consistency gaps |
| `docs/PROJECT-REGISTRY-AUDIT.md` | 2025-03-15 | 14 project pages vs projects.ts registry | All 14 projects have pages and registry entries; Etten-Leur 6cm hero has duplicate path segment bug |
| `docs/perf/performance-map-current-state.md` | 2026-03-15 | All audited routes post-manifest-leak-fix | Manifest leak CLOSED on all routes; `/gevelisolatie/materialen/` has unnecessary page-level client boundary (priority fix) |
| `app/gevelisolatie/page.tsx` (inline fix) | 2026-03-19 | `/gevelisolatie/` page technical fixes | `WatIsEticsSection` added `below-fold` wrapper (was missing); `WerkwijzeSection` converted from static import to `dynamic()` (was client component, caused SSR bundle leak) |
| `app/sierpleister/page.tsx` (inline fix) | 2026-03-19 | `/sierpleister/` page content/SEO fixes | `hero.lead[1]` surfaced in hero (was dead content); `soorten.types[*].bullets` added to type cards (comparison data was in content file but not rendered — brief requires "vergelijking" SERP format) |
| `docs/perf/homepage-audit-lighthouse-followup.md` | 2026-03-15 | Homepage only | Manifest leak was root cause (now fixed); vendor baseline ~500KB; CSS 140KB Tailwind output |

---

## Decisions from audits (already applied)

See `docs/governance/60-decisions-and-bans.md §Performance decisions` for the full list of closed issues and what to leave alone.

---

## Next audit triggers

| When | What to audit |
|------|---------------|
| After adding 5+ new project pages | Run `docs/PROJECT-REGISTRY-AUDIT.md` checks again |
| After significant image additions | Run image slot coverage check |
| After refactoring `/gevelisolatie/materialen/` | Run performance map update |
| Before production deploy | Lighthouse run on all money pages |

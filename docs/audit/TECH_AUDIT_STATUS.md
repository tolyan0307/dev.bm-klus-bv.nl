# Technical Audit — Full Project
**Date:** 2026-03-19
**Scope:** All routes, layouts, components, metadata, images, CTAs, dead code, performance, governance divergence
**Status:** Complete — findings recorded, no code changes made in this audit pass

> This is a snapshot. Code may have changed since this date.
> For current state: run targeted reads on specific files.
> Decisions already made → `docs/governance/60-decisions-and-bans.md`

---

## Severity summary

| Severity | Count | Description |
|----------|-------|-------------|
| CRITICAL | 1 | Build/performance breaking — client component in initial bundle |
| MAJOR | 5 | Governance violations with real-world perf or maintainability impact |
| MEDIUM | 4 | Inconsistencies or suboptimal patterns — no immediate breakage |
| MINOR | 4 | Known dead code / stale docs — already documented in governance bans |

---

## CRITICAL findings

### C-1 — `ReviewsSection` statically imported on homepage
- **Where:** `app/page.tsx` line 14
- **What:** `import ReviewsSection from "@/components/reviews-section"` — static import of a `"use client"` component
- **Why it matters:** `ReviewsSection` is a client component (confirmed `"use client"` in `components/reviews-section.tsx`). A static import forces its entire JS into the initial homepage bundle, directly increasing TBT and harming LCP. Every other page that uses ReviewsSection correctly imports it via `dynamic()`. The homepage is the highest-traffic page.
- **Safe to fix now:** Yes — isolated change, no side effects
- **Fix direction:** Replace static import with `const ReviewsSection = dynamic(() => import("@/components/reviews-section"))`. Also verify the `below-fold` wrapper stays (or is removed — see MEDIUM M-1).

---

## MAJOR findings

### MA-1 — Stale governance doc: `50-audit-and-verification-rules.md`
- **Where:** `docs/governance/50-audit-and-verification-rules.md`
- **What:** Still lists `/gevelisolatie/materialen/page.tsx` as "Priority action — currently use client at page level (90.5 KB chunk), needs refactor to server component"
- **Why it matters:** `app/gevelisolatie/materialen/page.tsx` has already been refactored to a server component (confirmed: no `"use client"` directive). The stale finding may cause future Claude instances to incorrectly audit or refactor this file.
- **Safe to fix now:** Yes — doc-only change
- **Fix direction:** Remove the "Priority action" entry from the open issues list in `50-audit-and-verification-rules.md`. Add a "Closed" entry noting it was fixed (date unknown, pre-2026-03-19).

### MA-2 — FAQ content hardcoded in layout files
- **Where:** `app/gevelisolatie/materialen/layout.tsx`, `app/gevelisolatie/rc-waarde-dikte/layout.tsx`
- **What:** Full FAQ question/answer content (8 items each) is hardcoded inside layout files, mixed together with `metadata` export and full JSON-LD schemas. Content should live in `lib/content/`.
- **Why it matters:** Violates content/code separation of concerns. Editing FAQ content requires touching layout files, risking accidental metadata or schema breakage. Pattern is inconsistent with other pages (e.g., `gevelisolatie/page.tsx` imports `faqContent` from `lib/content/gevelisolatie`).
- **Safe to fix now:** With care — requires extracting to lib/content/ and re-importing. No build risk if done correctly.
- **Fix direction:** Create `lib/content/gevelisolatie/materialen.ts` and `lib/content/gevelisolatie/rc-waarde-dikte.ts` (or equivalent). Move FAQ arrays there. Import in layout files.

### MA-3 — FAQ content hardcoded inline in cluster page files
- **Where:** `app/gevelisolatie/kosten/page.tsx` (10 FAQ items, lines 141–192), `app/gevelisolatie/afwerkingen/page.tsx` (8 FAQ items, lines 205–246)
- **What:** FAQ data defined as inline constants in page.tsx files. Same pattern as MA-2 but in page files.
- **Why it matters:** Same separation-of-concerns issue. SEO brief content should be in `lib/content/` where it is auditable and reusable.
- **Safe to fix now:** With care — extraction only, no rendering changes
- **Fix direction:** Move FAQ arrays to corresponding `lib/content/` files. For kosten: `lib/content/gevelisolatie/kosten.ts`. For afwerkingen: `lib/content/gevelisolatie/afwerkingen.ts` (or append to existing file if one exists).

### MA-4 — Single large `below-fold` wrapper on `/gevelisolatie/kosten/`
- **Where:** `app/gevelisolatie/kosten/page.tsx` lines 371–595
- **What:** One `<div className="below-fold">` wraps everything from TableOfContents through all 6 Sections (richtprijzen, kostenfactoren, wat-zit-erin, voorbeeldscenarios, besparen, faq) plus RelatedLinks plus internal nav — all inside one wrapper.
- **Why it matters:** Governance rule (`docs/governance/30-architecture-and-code-rules.md`) requires each section to be individually wrapped. One large wrapper eliminates the deferred-rendering benefit — the browser still needs to compute the entire subtree before visibility is established. `content-visibility: auto` only helps if boundaries are per-section, not page-level.
- **Safe to fix now:** Yes — layout refactor only, no content change
- **Fix direction:** Wrap each `<Section>` (and the FAQ `<section>`) in its own `<div className="below-fold">`. Remove the single large wrapper. Keep `<div className="bg-background">` as the background container. Pattern reference: `afwerkingen/page.tsx` does this correctly.

### MA-5 — `TrustStrip` dynamically imported in `materialen/page.tsx`
- **Where:** `app/gevelisolatie/materialen/page.tsx`
- **What:** `TrustStrip` is imported via `dynamic()` in this page. `TrustStrip` is an above-fold component (appears immediately after hero, before any below-fold content).
- **Why it matters:** Dynamic imports defer component JS until after hydration. For an above-fold component, this creates a flash or layout shift where TrustStrip renders late. Every other page imports TrustStrip statically.
- **Safe to fix now:** Yes — convert to static import
- **Fix direction:** Replace `const TrustStrip = dynamic(() => import("@/components/trust-strip"))` with `import TrustStrip from "@/components/trust-strip"`.

---

## MEDIUM findings

### ME-1 — `ReviewsSection` incorrectly wrapped in `below-fold` on multiple pages
- **Where:** `app/gevelisolatie/afwerkingen/page.tsx` line 809; `app/gevelisolatie/page.tsx` line 227; `app/sierpleister/page.tsx` (confirmed in earlier audit); likely other service pages
- **What:** `<ReviewsSection />` rendered inside `<div className="below-fold">` even though it is imported via `dynamic()`.
- **Why it matters:** Governance rule states: do NOT wrap `dynamic()` components in `below-fold` — they are already lazy-loaded. Adding `below-fold` is redundant and adds CSS containment overhead to a component that is already deferred. (Note: homepage ReviewsSection is statically imported — see C-1 — so its below-fold wrapper is a different issue there.)
- **Safe to fix now:** Yes — remove the `below-fold` wrapper div around ReviewsSection calls
- **Fix direction:** Remove `<div className="below-fold">` wrapper around each `<ReviewsSection />`. Keep scroll-target `id` attributes on the inner div if present.

### ME-2 — Metadata exported from `layout.tsx` vs `page.tsx` inconsistency
- **Where:** `app/sierpleister/layout.tsx`, `app/gevelisolatie/materialen/layout.tsx`, `app/gevelisolatie/rc-waarde-dikte/layout.tsx`, `app/gevelisolatie/subsidie-vergunning/layout.tsx`, `app/contact/layout.tsx` (inferred), `app/diensten/layout.tsx` (inferred)
- **What:** These 6 pages export `metadata` from `layout.tsx`. All other pages export from `page.tsx`.
- **Why it matters:** No functional issue in Next.js App Router — both work. But the inconsistency creates confusion when auditing SEO coverage. A future agent auditing metadata might miss a page if only checking `page.tsx`.
- **Safe to fix now:** Low priority — no functional impact
- **Fix direction:** Document the split in governance (it may be intentional for pages with dynamic child routes that need inherited metadata). No code change required unless standardizing.

### ME-3 — Dead export: `meta` in `lib/content/sierpleister.ts`
- **Where:** `lib/content/sierpleister.ts` — exports `meta` object
- **What:** `meta` is exported but never imported anywhere in the codebase. Metadata for `/sierpleister/` flows through `app/sierpleister/layout.tsx → buildPageMetadata() → data/sitemap-plan.ts`.
- **Why it matters:** Dead export creates confusion — future agents may try to use `meta` from the content file, not realizing it has no effect.
- **Safe to fix now:** Yes — remove the unused export
- **Fix direction:** Delete the `export const meta = { ... }` block from `lib/content/sierpleister.ts`. Verify no other content files have the same dead pattern.

### ME-4 — `afwerkingen/page.tsx` content outside `bg-background` container
- **Where:** `app/gevelisolatie/afwerkingen/page.tsx` lines 808–813 (ReviewsSection) and lines 816–902 (FAQ + RelatedLinks)
- **What:** ReviewsSection is rendered outside the `<div className="bg-background">` container div. FAQ and related links section uses a second `bg-background` div. The page has two separate background containers.
- **Why it matters:** Structural inconsistency. The `kosten/page.tsx` puts everything in one background container. Two containers can cause visual seam if background color ever changes. Not a functional bug but inconsistent with the cluster page pattern.
- **Safe to fix now:** Low priority
- **Fix direction:** If standardizing, unify into one `bg-background` wrapper, with ReviewsSection inside it.

---

## MINOR findings (known dead code — documented in governance bans)

### MI-1 — `styles/globals.css` not imported
- **Where:** `styles/globals.css` (126 lines)
- **What:** File exists but is not imported anywhere. `app/globals.css` is the active global stylesheet.
- **Governance status:** Already documented as a ban in `docs/governance/60-decisions-and-bans.md`
- **Fix:** Delete the file when cleaning up dead code.

### MI-2 — `components/inline-quote-form.tsx` not imported
- **Where:** `components/inline-quote-form.tsx`
- **What:** Component exists but is never imported anywhere.
- **Governance status:** Already documented as a ban in `docs/governance/60-decisions-and-bans.md`
- **Fix:** Delete the file when cleaning up dead code.

### MI-3 — `#cookiescript_badge` dead CSS rule
- **Where:** `app/globals.css` line 197 (approx)
- **What:** CSS rule targeting `#cookiescript_badge` — CookieScript is not installed or used.
- **Governance status:** Already documented as a ban in `docs/governance/60-decisions-and-bans.md`
- **Fix:** Remove the CSS rule when cleaning up.

### MI-4 — `lib/content/sierpleister.ts` dead `meta` export
- **Where:** `lib/content/sierpleister.ts`
- **What:** Same as ME-3 — listed here as a minor dead code item. Elevated to MEDIUM because it creates confusion about how metadata works for the page.

---

## Audit areas with no findings

| Area | Status |
|------|--------|
| Routes / pages / layouts coverage | All routes in `data/sitemap-plan.ts` have corresponding `app/` directories. No orphaned routes found. |
| Metadata / canonical / JSON-LD per money page | All audited money pages have `buildPageMetadata()`, breadcrumb schema, business schema, service schema. FAQ pages have FAQPage schema. |
| `buildPageMetadata` wiring | All pages call `buildPageMetadata(path)` matching their route. No mismatched paths found. |
| `output: 'export'` compatibility | No `useSearchParams`, `useRouter` (server), `revalidate`, or other SSR-only APIs found in server components. |
| Internal linking | All cluster pages have `RelatedLinks` section and "Overige pagina's" internal nav. Project pages link back via `/onze-werken/`. |
| `QuoteModal` injection | `app/onze-werken/layout.tsx` injects QuoteModal for all project pages — correct single-injection-point pattern. Project pages do NOT have their own QuoteModal. |
| Image system | `<ResponsiveImage>` used everywhere. No `next/image` `<Image>` usage in page files found. `dir` + `baseName` + `preset` pattern consistent. |
| Manifest leak | No `buildSrcSet` / `getFallbackSrc` / `image-manifest.json` imports in `"use client"` components confirmed closed. |
| Sitemap | `app/sitemap.ts` covers PLANNED_ROUTES + all project pages + location pages. Priorities match `data/sitemap-plan.ts`. |
| Trailing slashes | All internal `href` values use trailing slash. `trailingSlash: true` in `next.config.mjs`. |
| CTA consistency | Primary CTA: `href="#offerte"` → opens QuoteModal. Secondary: WhatsApp URL (`wa.me/31612079808`). Tertiary: `tel:+31612079808`. Pattern consistent across all audited pages. |
| Sticky components | `StickyCTABar` and `StickyToc` (on `/gevelisolatie/`) are `dynamic()` imported — correct. |
| Hero images | All service page heroes use `<ResponsiveImage>` with `preset="hero"`. No missing hero images on audited pages. |

---

## Files audited in this pass

`app/page.tsx`, `app/layout.tsx`, `app/gevelisolatie/page.tsx`, `app/gevelisolatie/materialen/page.tsx`, `app/gevelisolatie/materialen/layout.tsx`, `app/gevelisolatie/rc-waarde-dikte/layout.tsx`, `app/gevelisolatie/subsidie-vergunning/layout.tsx`, `app/gevelisolatie/kosten/page.tsx`, `app/gevelisolatie/afwerkingen/page.tsx`, `app/sierpleister/page.tsx`, `app/sierpleister/layout.tsx`, `app/onze-werken/layout.tsx`, `app/sitemap.ts`, `data/sitemap-plan.ts`, `next.config.mjs`, `lib/content/sierpleister.ts`, `lib/content/projects/etten-leur-gevelisolatie-6cm-strikolith-2025.ts`, `components/reviews-section.tsx`, `components/page/Section.tsx`, `docs/governance/30-architecture-and-code-rules.md`, `docs/governance/50-audit-and-verification-rules.md`, `docs/governance/60-decisions-and-bans.md`

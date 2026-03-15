# Current performance map
**Date:** 2026-03-15  
**Build artifacts:** current `.next/` after last production build  
**Scope:** post-manifest-leak-fix pass — `/`, `/gevelisolatie/`, `/buiten-stucwerk/`, `/sierpleister/`, `/gevel-schilderen/`, `/muren-stucen/`, `/diensten/`, `/contact/`, `/gevelisolatie/materialen/`, `/onze-werken/`, `/onze-werken/[project]/`

---

## 1. Executive summary

### Already closed (do not re-open as action items)
- `data/image-manifest.json` manifest leak: **fully eliminated** across all audited routes — confirmed by chunk scanning (no `11027` module, no `buildSrcSet`/`getFallbackSrc` in any client chunk)
- Homepage CLS, heavy CookieScript CSS, Pinterest tags, self-hosted CookieScript experiment
- Homepage, `/gevelisolatie/`, `/sierpleister/`, `/diensten/`, `/onze-werken/[project]/` image manifests previously fixed

### What still remains (controllable)
1. **`/gevelisolatie/materialen/` is still a `"use client"` page-level component** (90.5 KB chunk). It uses `<ResponsiveImage>` directly as JSX inside a client page. No manifest leak (server boundary preserved), but the page-level client boundary is unnecessarily wide.
2. **`/contact/page.tsx` is `"use client"`** — entire contact page is a client component (80.9 KB chunk), including full quote form + Turnstile + Google Reviews carousel. Structurally unclean but functionally justified due to complex form state.
3. **CSS: 140 KB Tailwind output** is single largest render-blocking file — inherent to Tailwind v4 full-class generation, partially controllable with CSS purge tuning.
4. **`app/globals.css` contains a CookieScript remnant** (`#cookiescript_badge` CSS rule) — minor, low priority.

### Vendor baseline (not our code defects)
- 218 KB Next.js RSC/hydration runtime (`69be39811437728d.js`) — `hydrateRoot`, `FlightData`, RSC streaming protocol
- 114 KB Next.js flight/streaming (`58665f1783672c50.js`)
- 110 KB polyfill chunk (`a6dad97d9634a72d.js`)
- GTM overhead: single GTM container from env var, no duplicates, no hardcoded `gtag.js`
- CookieScript banner load via GTM: vendor baseline

---

## 2. Manifest leak status by page

| Route | Status | Source component | Import chain | Chunk | Impact | Priority |
|-------|--------|-----------------|--------------|-------|--------|----------|
| `/` | **CLEAN** | — | — | `048ee8947a8cd242.js` (53.8 KB) | manifest absent | closed |
| `/gevelisolatie/` | **CLEAN** | — | — | `1ae96d563ae5c388.js` (79.1 KB) | manifest absent | closed |
| `/buiten-stucwerk/` | **CLEAN** | — | — | `c4b5a4d81bc36fca.js` (58.8 KB) | manifest absent | closed |
| `/sierpleister/` | **CLEAN** | — | — | `9b91c92bd780c870.js` (64.7 KB) | manifest absent | closed |
| `/gevel-schilderen/` | **CLEAN** | — | — | `400f1d17d2e24e20.js` (36.9 KB) | manifest absent | closed |
| `/muren-stucen/` | **CLEAN** | — | — | `86d33344b66c674d.js` (43.2 KB) | manifest absent | closed |
| `/diensten/` | **CLEAN** | — | — | `88e5a42299540144.js` (50.1 KB) | manifest absent | closed |
| `/contact/` | **CLEAN** | `app/contact/page.tsx` ("use client") imports `<ResponsiveImage>` as JSX only | `ResponsiveImage` is a server component; no `buildSrcSet` in client chunk | `9b68f0458a927a95.js` (80.9 KB) | manifest absent (server boundary preserved) | architecture concern, not leak |
| `/gevelisolatie/materialen/` | **CLEAN** | `app/gevelisolatie/materialen/page.tsx` ("use client") imports `<ResponsiveImage>` as JSX only | same pattern as contact | `254ba836a299d291.js` (90.5 KB) | manifest absent (server boundary preserved) | architecture concern, not leak |
| `/onze-werken/` | **CLEAN** | — | — | `26b6abc9eed57f91.js` (56 KB) | manifest absent | closed |
| `/onze-werken/[project]/` | **CLEAN** | — | — | `adf342954c14d34e.js` (9.8 KB) carousel | manifest absent | closed |

**Verification method:** scanned all page-specific client chunks for `"11027"`, `buildSrcSet`, `getFallbackSrc`, `image-manifest`. All negative.

---

## 3. Homepage status

**Chunk:** `048ee8947a8cd242.js` — 53.8 KB, **manifest absent**

### What's in the homepage chunk
Based on RSC payload analysis and source inspection:
- `ServicesShowcase` (interactive tabs) — client, justified (`useState`)
- `ProcessSteps` (step selector) — client, justified (`useState`)
- `QuoteModal` (offerte form) — dynamically loaded (`dynamic()`), justified
- Google Reviews carousel — dynamically loaded, justified
- Contact bar (sticky, scroll-based) — client, justified

### Residual concerns
- **`app/page.tsx` is a server component** — correct architecture, no client boundary at page level
- **Chunk size (53.8 KB)** is reasonable for the interactive content it delivers
- No manifest in client bundle

### Verdict
Homepage is in a **good state**. Another pass is **not justified** at this time.  
The remaining 53.8 KB is primarily legitimate interactive UI (tabs, steps, modal, reviews).

---

## 4. Client JS map

| Route | Component | Why client | Necessary? | Pulls manifest? | Future candidate |
|-------|-----------|------------|------------|-----------------|-----------------|
| `/` | `ServicesShowcase` | `useState` tab switch | Yes | No | Low — already optimized |
| `/` | `ProcessSteps` | `useState` step selection | Yes | No | Low |
| `/gevelisolatie/` | `AfwerkingenInteractive` | `useState` tab | Yes | No | Low |
| `/gevelisolatie/` | `MaterialenInteractive` | `useState` tab | Yes | No | Low |
| `/gevelisolatie/` | `DetailsKoudebruggenInteractive` | `useState` tab | Yes | No | Low |
| `/gevelisolatie/` | `WerkwijzeSection` | likely animation/tabs | Yes | No | Medium |
| `/gevelisolatie/` | `StickyTocSection` | scroll detection | Yes | No | Low |
| `/gevelisolatie/` | `StickyCTABar` | scroll detection | Yes | No | Low |
| `/gevelisolatie/` | `KostenCalculator` | `useState` calculator | Yes | No | Low |
| `/gevelisolatie/` | `FaqSection` | accordion `useState` | Yes | No | Low |
| `/gevelisolatie/materialen/` | `page.tsx` (entire page) | `useState` + `<ResponsiveImage>` inline | **Partially** — page-level boundary is too wide | No (server boundary preserved) | **HIGH** — should be server page + client interactive leaf |
| `/sierpleister/` | `GevelAfwerkingGidsInteractive` | filters, compare, modal | Yes | No | Low |
| `/diensten/` | `ServicesRailInteractive` | active state, filters | Yes | No | Low |
| `/contact/` | `page.tsx` (entire page) | complex form with many `useState` | Mostly yes, but page-level boundary is wide | No | **MEDIUM** — could be refactored but form complexity makes it costly |
| `/muren-stucen/` | `werkwijze-stepper.tsx` | `useState` step | Yes | No | Low |
| `/muren-stucen/` | `faq-accordion.tsx` | `useState` accordion | Yes | No | Low |
| `/gevel-schilderen/` | `voorbereiding-steps.tsx` | `useState` | Yes | No | Low |
| `/gevel-schilderen/` | `faq-accordion.tsx` | `useState` accordion | Yes | No | Low |
| `/buiten-stucwerk/` | `AfwerkingKeuzehulp.tsx` | interactive | Yes | No | Low |
| `/buiten-stucwerk/` | `werkwijze-stepper.tsx` | `useState` | Yes | No | Low |
| `/buiten-stucwerk/` | `nadelen-switcher.tsx` | `useState` | Yes | No | Low |
| `/onze-werken/[project]/` | `ProjectGalleryCarousel` | carousel, lightbox | Yes | **No** (fixed) | Low |
| `/onze-werken/[project]/` | `WerkzaamhedenAccordion` | accordion | Yes | No | Low |

### Top architecture concern: `app/gevelisolatie/materialen/page.tsx`
- This is a `"use client"` page-level component (90.5 KB)
- It directly renders `<ResponsiveImage baseName=... preset="serviceCard">` inside JSX
- No manifest leak currently (server boundary preserved), but the architecture is fragile
- A safe fix exists: convert to server page + client interactive leaf (same pattern already used elsewhere)

---

## 5. CSS / critical path audit

### CSS chunks in current build

| Chunk | Size | Content | Render-blocking? | Controllable |
|-------|------|---------|-----------------|-------------|
| `ed76bee95dfab6c1.css` | 140.4 KB | Tailwind v4 generated utility classes (`--tw-` custom properties, `@layer properties`) | Yes — loaded on every page | Partially: CSS purging, splitting |
| `4e1c0da8ee9de505.css` | 2.0 KB | `next/font` Inter `@font-face` rules (multiple unicode ranges) | Yes — small, unavoidable | No — baseline `next/font` cost |

### Analysis

**`ed76bee95dfab6c1.css` (140.4 KB)** — This is the Tailwind v4 full output. At 140 KB it is larger than typical, but:
- Tailwind v4 changed how `@layer properties` is generated (CSS custom properties for utilities)
- The size is driven by the full set of utility classes across all pages
- This cannot be split per-page in the current architecture (single CSS chunk for all routes)
- **Controllable actions:** audit Tailwind config for unused utilities, avoid `@apply` with full layers, review if any third-party components import extra classes. However, gains are typically modest without a major refactor.

**`4e1c0da8ee9de505.css` (2.0 KB)** — Inter font face declarations. This is the `next/font/google` output.
- **Not controllable** — baseline `next/font` cost
- Justified: font preloading is correct behavior

### Verdict
CSS is primarily **vendor/framework baseline**. The 140 KB Tailwind chunk is the only meaningful opportunity, but savings require Tailwind config work and are likely modest (10–20 KB). **Not a priority next pass.**

---

## 6. GTM / CookieScript / third-party audit

### GTM
| Item | Status |
|------|--------|
| GTM integration point | `components/gtm-provider.tsx` — single `<Script strategy="afterInteractive">` with GTM snippet |
| GTM ID source | `process.env.NEXT_PUBLIC_GTM_ID` — env var, not hardcoded |
| Hardcoded `gtag.js` | **Not found** — `app/layout.tsx` has no direct Google tag script |
| Hardcoded `G-*` GA4 ID | **Not found** — no direct `gtag/js?id=G-` calls outside GTM |
| Duplicate GTM injection | **Not proven** — single injection point in `GtmProvider` |
| Extra `dataLayer` pushes | `trackEvent()` utility in `gtm-provider.tsx` — clean, uses `dataLayer.push` correctly |

**Verdict:** GTM integration is clean. The `gtm.js` and `gtag/js` overhead observed in Lighthouse is **vendor baseline** from GTM container loading GA4 and conversion tags.

### CookieScript
| Item | Status |
|------|--------|
| Current loading path | Via GTM tag — correct, as intended |
| Self-hosted remnants in code | **None in JS/layout** — no `<Script src="/vendor/cookiescript/...">` |
| Local file in public/ | `public/vendor/cookiescript/d0155e1334498811a509131c3fda40b3.js` still exists (not linked) — **optional cleanup only** |
| CSS remnant in `globals.css` | `#cookiescript_badge { display: none !important; }` at line 197 — minor, but technically a remnant |
| CDN preconnect | `<link rel="preconnect" href="https://cdn.cookie-script.com" />` in `app/layout.tsx` — justified since banner JS loads from CDN via GTM |

**Verdict:** CookieScript is clean. The CSS line 197 rule is a minor remnant — low risk, safe to remove if desired. Not a performance issue.

---

## 7. Preconnect / preload audit

| Origin/Resource | Where declared | Why used | Justified? |
|----------------|---------------|----------|-----------|
| `https://cdn.cookie-script.com` | `app/layout.tsx` | Preconnects to CookieScript CDN before GTM fires — reduces banner load latency | **Yes** — banner JS serves from this CDN |
| `https://lh3.googleusercontent.com` | `app/layout.tsx` | Google user avatar images in Reviews carousel | **Maybe** — only needed if Reviews carousel is above-the-fold, which it's not. Low-priority removal candidate. |
| `https://www.googletagmanager.com` | Not explicitly declared — GTM script URL is in inline snippet | GTM loading | **Not needed** — GTM `async` script loads well without preconnect; browser resolves it lazily |
| `https://challenges.cloudflare.com` | Not declared | Cloudflare Turnstile (loaded on form interaction) | **Not needed** — correct, Turnstile loads lazily on form open |

**Note:** No `dns-prefetch` declarations found. No `<link rel="preload">` for hero images found in layout — hero preloading is handled by `fetchPriority="high"` on the img tag directly.

### Verdict
Only two preconnects exist. `cdn.cookie-script.com` is justified. `lh3.googleusercontent.com` is a low-priority removal candidate (saves one preconnect round-trip on pages without above-the-fold reviews). Both are minor.

---

## 8. Recommended queue

### Fix next

| Item | File | Why | Expected impact |
|------|------|-----|----------------|
| Refactor `app/gevelisolatie/materialen/page.tsx` | `app/gevelisolatie/materialen/page.tsx` | Currently a `"use client"` page-level component with `<ResponsiveImage>` inline. No manifest leak now, but architecture is fragile and 90.5 KB chunk is entirely avoidable. Convert to server page + client interactive leaf (same pattern as other pages). | Chunk reduction ~30–50 KB; cleaner architecture; removes fragile server-in-client-component dependency |

### Later

| Item | File | Why |
|------|------|-----|
| Remove `lh3.googleusercontent.com` preconnect | `app/layout.tsx` | Reviews carousel is below-fold; preconnect is early and may waste TCP slot. Low urgency. |
| Remove `#cookiescript_badge` CSS rule | `app/globals.css` line 197 | Leftover from earlier experiment. Safe to delete. ~3 lines. |
| Remove unused local CookieScript file | `public/vendor/cookiescript/d0155e1334498811a509131c3fda40b3.js` | Dead file, not loaded. Delete to reduce repo/deploy size. |
| Tailwind CSS purge audit | `app/globals.css`, `tailwind.config.ts` | 140 KB CSS chunk. May yield 10–20 KB reduction with careful audit of unused utilities/components. |

### Leave alone

| Item | Why |
|------|-----|
| Homepage (`/`) client chunks | Well-optimized, 53.8 KB, manifest clean, no obvious split candidate |
| `/gevelisolatie/` client chunks | 79.1 KB, manifest clean, all sections have correct server/client split |
| `/sierpleister/` 64.7 KB chunk | Clean, `GevelAfwerkingGidsInteractive` is justified full-UI component |
| `/contact/page.tsx` wide boundary | 80.9 KB, form complexity justifies page-level client. No manifest. Refactor cost > benefit. |
| `/onze-werken/[project]/` carousel | 9.8 KB, manifest clean, correct architecture |
| GTM integration | No duplicates, no hardcoded tags, clean single injection point |
| CSS `4e1c0da8ee9de505.css` (2 KB) | `next/font` baseline, not controllable |

### Vendor baseline

| Item | Evidence |
|------|---------|
| `69be39811437728d.js` (218 KB) | Next.js RSC hydration runtime: `hydrateRoot`, `FlightData`, `createFromReadableStream` |
| `58665f1783672c50.js` (114 KB) | Next.js RSC flight/streaming protocol |
| `a6dad97d9634a72d.js` (110 KB) | Polyfill chunk — `build-manifest.json` `polyfillFiles` |
| `ee0d84a15409c5ca.js` (24.5 KB) | Next.js client router |
| `f091501564eb2ea3.js` (32.1 KB) | Next.js app internals |
| GTM `gtm.js` ~50–80 KB | GTM container with GA4, conversion tags |
| CookieScript banner JS ~35 KB | CookieScript consent banner, via GTM |
| Cloudflare Turnstile ~40 KB | Loaded lazily on form open — not a page load cost |

Total vendor baseline JS per page: **~500 KB** (unminified approx.), unavoidable with current stack.

---

## 9. Final verdict

### 3 most useful next actions

1. **Refactor `app/gevelisolatie/materialen/page.tsx` to server component** (same pattern as rest of `/gevelisolatie/`). Currently the only page with a wide, unnecessary `"use client"` boundary at page level that still uses `<ResponsiveImage>` inline. Expected chunk reduction: ~30–50 KB. Low risk, proven pattern.

2. **Remove 3 minor CSS/file remnants** in one pass: `#cookiescript_badge` rule (line 197, `globals.css`), the dead `public/vendor/cookiescript/...js` file, and optionally the `lh3.googleusercontent.com` preconnect. Combined cost: 30 minutes, zero risk.

3. **Consider a Tailwind CSS audit** if 140 KB CSS chunk is flagged in next Lighthouse run. Scan for utility classes in components that are removed or no longer used. Likely 10–20 KB reduction. Medium effort.

### What NOT to do

- Do not refactor `/contact/page.tsx` — form complexity makes the benefit marginal, high risk for form regressions.
- Do not attempt to reduce vendor runtime chunks (Next.js RSC, polyfills) — these are framework fixed costs.
- Do not re-run manifest leak fixes — the leak is **fully closed across all audited routes**.
- Do not add more preconnects — current set is already minimal and correct.

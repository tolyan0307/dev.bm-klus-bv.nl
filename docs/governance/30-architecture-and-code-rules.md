# 30 — Architecture & Code Rules

> Single source of truth for code architecture decisions.
> For visual design patterns and design tokens → `DESIGN_SYSTEM.md` (SSoT)
> For image pipeline → `docs/IMAGE-PIPELINE.md` (SSoT)

---

## Core constraints

- **Static export only** (`output: 'export'`): no API routes, no SSR, no server actions, no middleware
- All content pre-rendered at build time — `pnpm dev` works normally for development
- **pnpm only** — do not use npm or yarn
- TypeScript strict mode — no `// @ts-ignore` without explanation
- ESLint is NOT installed — use `npx tsc --noEmit` for type checking

---

## Server vs Client components

**Default: Server Component.** Only add `"use client"` when the component requires:
- `useState`, `useEffect`, `useRef`, or other React hooks
- Event listeners
- Browser APIs (scroll, resize, window, document)

**Never mark a page-level component `"use client"`** unless the entire page genuinely requires it (accepted exception: `app/contact/page.tsx` — do not refactor, see `docs/governance/60-decisions-and-bans.md`).

Pattern: keep the page as a Server Component, extract interactivity into leaf client components.

---

## Dynamic imports for below-fold interactive components

Always use `dynamic()` for interactive components that load below the fold:

```tsx
const QuoteModal = dynamic(() => import("@/components/quote-modal"))
const StickyCTABar = dynamic(() => import("@/components/sections/gevelisolatie/sticky-cta-bar"))
const ReviewsSection = dynamic(() => import("@/components/reviews-section"))
```

Do NOT wrap these in `below-fold` div — they are already lazy-loaded.

---

## below-fold rendering pattern

Every section **below** hero/TrustStrip must be wrapped **individually**:

```tsx
<HeroSection />        {/* no below-fold — always visible */}
<TrustStrip />         {/* no below-fold — always visible */}

<div className="below-fold"><SectionA /></div>
<div className="below-fold"><SectionB /></div>
<div className="below-fold"><SectionC /></div>
```

CSS definition (in `app/globals.css`):
```css
.below-fold {
  content-visibility: auto;
  contain-intrinsic-size: auto 500px;
}
```

**Never:** one large `below-fold` wrapper around all sections — browser can't skip individual sections.
**Never:** apply `below-fold` to `StickyCTABar` or `QuoteModal` — they're already `dynamic()`.

---

## Image handling

Always use `<ResponsiveImage>` — **never** Next.js `<Image>` component:

```tsx
<ResponsiveImage
  baseName="services/gevelisolatie-hero"
  preset="hero"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="..."
/>
```

Source images: always put in `source-images/`. Generate variants: `pnpm images:generate <preset> <path>`.
Never edit files in `public/images/` directly — they are generated output.

Known intentional bypass: logos (`components/footer.tsx`, `components/navbar.tsx`) and `nadelen/` images use direct `<img src>` — acceptable for single-resolution assets.

Full pipeline reference: `docs/IMAGE-PIPELINE.md`

---

## Manifest leak prevention (critical)

**Never import** `buildSrcSet`, `getFallbackSrc`, or `image-manifest.json` directly from `"use client"` components. This causes the entire 70KB `data/image-manifest.json` to be bundled into client JS.

If a client component needs image data, pass pre-computed props from a server parent:

```tsx
// Server component (page.tsx)
const src = getFallbackSrc(baseName, preset) // runs server-side only
return <ClientComponent imageSrc={src} />

// Client component — receives props, does NOT import from lib/responsive-image
```

---

## Design tokens (critical)

**Always use Tailwind design token classes — never raw hex colors** (exception: hero gradient values):

```tsx
// ✅ correct
className="bg-primary text-foreground border-border"

// ❌ forbidden
className="bg-[#EA6C20] text-[#2D2A26]"

// ✅ acceptable — hero gradient only
style={{ background: "linear-gradient(175deg, #1A1A1A 0%, #2E2016 35%, ...)" }}
```

Full token reference: `DESIGN_SYSTEM.md §1`

---

## Tailwind CSS v4 syntax

Use v4 syntax (breaking changes from v3):

| v4 (correct) | v3 (wrong) |
|--------------|------------|
| `bg-linear-to-r` | `bg-gradient-to-r` |
| `bg-primary/4` | `bg-primary/[0.04]` for ≥5% |
| Use `bg-primary/[0.04]` | Only for opacity values < 5% |

---

## Path aliases

- `@/*` → project root
- Example: `import { cn } from "@/lib/utils"`

---

## Utility function for class merging

Always use `cn()` from `lib/utils.ts` for conditional class merging:

```tsx
import { cn } from "@/lib/utils"
className={cn("base-classes", condition && "conditional-class")}
```

---

## Content file pattern

Content for service pages lives in `lib/content/[service].ts` — **no UI code in content files**.
UI components live in `components/sections/[service]/`.
Page orchestration lives in `app/[service]/page.tsx`.

Section anchor targets must have `scroll-mt-24` for TOC navigation.

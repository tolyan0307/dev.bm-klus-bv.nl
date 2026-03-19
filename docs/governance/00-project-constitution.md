# 00 — Project Constitution

> Single source of truth for immutable project facts.
> Do not change any value here without owner confirmation.
> Referenced by: CLAUDE.md, AGENTS.md, .cursor/rules/00-always.mdc

---

## Business identity

| Field | Value |
|-------|-------|
| Company | BM klus BV |
| Domain | bm-klus-bv.nl |
| Market | Netherlands (NL) |
| Region | "Regio Rotterdam en omgeving (±80–100 km), Zuid-Holland en omliggende regio's" |
| Phone | +31 6 12 07 98 08 |
| Phone href | `tel:+31612079808` |
| Email | info@bm-klus-bv.nl |
| Address | Bonaventurastraat 58B, 3081 HE Rotterdam |
| KVK | 77356039 |
| Certifications | VCA* gecertificeerd |
| Google rating | 4.8/5 (23+ reviews) |

---

## Tech stack

| Layer | Value |
|-------|-------|
| Framework | Next.js 16.1.6, App Router |
| Export mode | `output: 'export'` — fully static, no server runtime |
| React | 19.x |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) |
| Components | shadcn/ui (Radix UI primitives) |
| Icons | lucide-react only — no emoji in UI |
| Forms | React Hook Form + Zod + Cloudflare Turnstile |
| Carousel | Embla Carousel |
| Package manager | **pnpm** — pnpm-lock.yaml is authoritative |
| Type checking | `npx tsc --noEmit` (ESLint is NOT installed) |
| No automated test suite | — |

**No backend, no database, no CMS, no server-side rendering.**
Content lives in `lib/content/*.ts` files.

---

## Hosting & deployment

| Item | Value |
|------|-------|
| Host | OneHome by Antagonist (antagonist.nl), "slim" package |
| Server | Apache |
| Deploy | Upload `out/` folder (replaces WordPress) |
| Redirects | Apache `.htaccess` — file to create: `public/_htaccess` |
| GTM | `NEXT_PUBLIC_GTM_ID` env var |
| Google Places | `GOOGLE_PLACES_SERVER_KEY` (pre-build fetch via `scripts/fetch-google-place.mjs`) |

See `PROJECT-STATUS.md §Migration Plan` for the full 30-redirect table (required before deploy).

---

## Services

| Slug | Service |
|------|---------|
| `/gevelisolatie/` | ETICS / buitengevelisolatie — pillar page + 5 cluster pages + 21 city pages |
| `/buiten-stucwerk/` | Exterior stucco |
| `/sierpleister/` | Decorative facade plaster |
| `/gevel-schilderen/` | Facade painting |
| `/muren-stucen/` | Interior plastering |

---

## CTA conventions (site-wide)

| CTA type | Text | Target |
|----------|------|--------|
| Primary (offerte) | "Plan gratis inspectie" | `#offerte` → QuoteModal |
| Navbar | "Gratis offerte" | `#offerte` |
| Secondary | "Bekijk onze diensten" | `/diensten/` |
| Phone | "+31 6 1207 9808" | `tel:+31612079808` |
| WhatsApp | MessageCircle icon (lucide-react) | wa.me link |

**Communication priority:** WhatsApp / email / form **first**, phone **secondary**.
No mid-page CTA blocks — Hero + StickyCTABar is sufficient on all service pages.

---

## Communication language

Language rules (chat, content, QA) → `docs/governance/10-language-and-content-rules.md`

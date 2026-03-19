# 20 — SEO & URL Rules

> This file covers only the technical invariants that every code change must respect.
> For full SEO content rules → `seo-system/GLOBAL_SEO_CONTENT_RULES.md` (SSoT)
> For SEO workflow → `seo-system/WORKFLOW.md`
> For page briefs → `seo-system/briefs/*.yaml`

---

## URL invariants

These are enforced by `next.config.mjs` (`trailingSlash: true`):

- All URLs **end with trailing slash**: `/gevelisolatie/` not `/gevelisolatie`
- Slugs ≤ 75 characters
- Slug format: lowercase, hyphens only, no underscores
- Example: `/gevelisolatie/rotterdam/` not `/gevelisolatie/Rotterdam`

---

## Meta limits

| Element | Limit | Implementation |
|---------|-------|----------------|
| Meta title | ≤ 60 characters | `buildPageMetadata()` auto-truncates |
| Meta description | ≤ 160 characters | `buildPageMetadata()` auto-truncates |

All titles and descriptions are defined in `data/sitemap-plan.ts`.
**Always use `buildPageMetadata(path)` — do not write raw `metadata` objects.**

---

## Heading structure

- Exactly **1 H1** per page — contains the primary keyword
- H2/H3 nested properly — no skipping levels
- No decorative H-tags (don't use H2 just for font size)

---

## SEO infrastructure (do not modify without explicit request)

These files are working correctly. Change content only via their own patterns:

| Component | File |
|-----------|------|
| Metadata builder | `lib/seo/meta.ts` → `buildPageMetadata()` |
| JSON-LD schemas | `lib/seo/schema.ts` → `localBusinessSchema()`, `serviceSchema()`, `breadcrumbSchema()`, `faqPageSchema()`, `jsonLdScript()` |
| Sitemap | `app/sitemap.ts` (pulls from `data/sitemap-plan.ts` + locations + projects) |
| Robots | `app/robots.ts` (blocks dev, allows prod) |
| Route config | `data/sitemap-plan.ts` |

**Rule:** when editing content, preserve existing JSON-LD schemas and internal link structure. Only suggest content-level changes — do not redesign infrastructure.

---

## Canonical domain

- Production canonical: `https://bmklusbv.nl` (no hyphen — note different from `bm-klus-bv.nl` folder name)
- Dev: `http://localhost:3000`
- `getSiteUrl()` in `lib/seo/routes.ts` resolves this from env or default

---

## Anti-cannibalization

Full overlap map → `seo-system/GLOBAL_SEO_CONTENT_RULES.md §4`

Key rule: when editing any page, check its `siblingPages` in the brief. Do not duplicate large content blocks between siblings — cross-reference with internal links instead.

---

## JSON-LD requirements by page type

| Page type | Required schemas |
|-----------|-----------------|
| Service page (money) | BreadcrumbList + LocalBusiness + Service + FAQPage |
| Cluster page | BreadcrumbList + FAQPage |
| Location page | BreadcrumbList + LocalBusiness + Service |
| Project page | BreadcrumbList + project schema |
| Hub page (/diensten/) | BreadcrumbList + FAQPage + ItemList + LocalBusiness |
| Homepage | WebSite + LocalBusiness |

---

## alt text format for project images

`[City] [service] – voor/na de werken foto [num] ([year])`

Example: `Rotterdam gevelisolatie – na de werken foto 1 (2025)`

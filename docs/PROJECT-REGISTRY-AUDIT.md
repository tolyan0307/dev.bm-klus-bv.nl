# Project Registry Audit Report

**Date:** 2025-03-15  
**Scope:** `lib/content/projects.ts`, `lib/content/projects/*.ts`, `ProjectCard.tsx`, `app/onze-werken/page.tsx`

---

## 1. projects.ts ↔ app/onze-werken/{slug}/page.tsx Mapping

| Check | Result |
|-------|--------|
| Every project in `projects.ts` has a corresponding page | ✅ **PASS** — All 14 projects have matching folders in `app/onze-werken/{slug}/` |
| Every project page has an entry in `projects.ts` | ✅ **PASS** — All 14 project folders are listed in the registry |

**Projects:** etten-leur-gevelisolatie-6cm-strikolith-2025, etten-leur-gevelisolatie-10cm-ral9010-2025, halsteren-buitenstucwerk-sierpleister-schilderwerk-2025, nieuw-beijerland-gevelisolatie-12cm-sierpleister-2025, bruinisse-gevelisolatie-6cm-sierpleister-2025, dordrecht-gevelisolatie-10cm-sierpleister-2025, klaaswaal-gevelisolatie-6cm-sierpleister-2025, rotterdam-buitenstucwerk-cementpleister-2025, vlaardingen-gevelisolatie-10cm-sierpleister-2025, almere-gevelisolatie-35m2-sierpleister-2024, vlaardingen-gevelisolatie-6cm-sierpleister-2024, rottekade-gevelisolatie-schilderwerk-2024, vught-gevelisolatie-10cm-sierpleister-2024, katwijk-gevelisolatie-6cm-sierpleister-2024

---

## 2. Required Fields & Image Paths (projects.ts)

| Project | coverImage.src | beforeThumb.src | Required fields |
|---------|----------------|----------------|-----------------|
| All 14 | ✅ Present | ✅ Present | ✅ title, slug, location (meta.city), description (meta.highlight), serviceType, serviceTypes, projectUrl, cardAlt |

**Path format summary:**
- **With subfolder** (2 projects): `etten-leur-gevelisolatie-6cm-strikolith-2025`, `etten-leur-gevelisolatie-10cm-ral9010-2025` → `/images/projects/{slug}/{slug}-na-01.webp`
- **Flat** (12 projects): `/images/projects/{prefix}-na-01.webp` (e.g. `halsteren-buitenstucwerk-na-01.webp`, `zuidzijdsedijk-nieuw-beijerland-gevelisolatie-na-01.webp`)

**Note:** Vught uses `na-1` / `voor-1` (no leading zero) — matches files on disk and manifest.

---

## 3. Card Ordering

- **Source:** Explicit array order in `lib/content/projects.ts` (lines 5–318)
- **Comment:** `1 Etten-Leur 6cm, 2 Etten-Leur 10cm, 3 Halsteren, 4 Nieuw-Beijerland, 5 Bruinisse, 6 Dordrecht, 7 Klaaswaal, 8 Rotterdam, 9 Vlaardingen 10cm, 10 Almere, 11 Vlaardingen 6cm, 12 Rottekade, 13 Vught, 14 Katwijk`
- **Rendering:** `ProjectsSection` → `ProjectsGrid` → `ProjectCard` — no sort, order preserved
- **Filtering:** By `serviceTypes` only; order unchanged when filtered

---

## 4. baseName References in lib/content/projects/*.ts

| Project file | baseName format | Subfolder prefix |
|--------------|----------------|------------------|
| etten-leur-gevelisolatie-6cm-strikolith-2025 | `{PREFIX}/{PREFIX}-voor-01` | ✅ Yes |
| etten-leur-gevelisolatie-10cm-ral9010-2025 | `{PREFIX}/{PREFIX}-voor-01` | ✅ Yes |
| halsteren-buitenstucwerk-sierpleister-schilderwerk-2025 | `{PREFIX}-voor-01` | ❌ No (flat) |
| nieuw-beijerland-gevelisolatie-12cm-sierpleister-2025 | `zuidzijdsedijk-nieuw-beijerland-gevelisolatie-voor-01` | ❌ No (different prefix) |
| bruinisse, vught, etc. | `{PREFIX}-voor-01` or `{PREFIX}-voor-1` | ❌ No (flat) |

**Conclusion:** baseName format depends on image layout:
- **Subfolder projects** (etten-leur): `prefix/prefix-xx`
- **Flat projects**: `prefix-xx` only
- **Nieuw-Beijerland**: Uses `zuidzijdsedijk-nieuw-beijerland-gevelisolatie` (different from slug)

---

## 5. srcToBaseName() in ProjectCard.tsx

```ts
function srcToBaseName(src: string): string {
  return src.replace(/^\/images\/projects\//, "").replace(/\.\w+$/, "")
}
```

| Input | Output |
|-------|--------|
| `/images/projects/etten-leur-gevelisolatie-6cm-strikolith-2025/etten-leur-gevelisolatie-6cm-strikolith-2025-na-01.webp` | `etten-leur-gevelisolatie-6cm-strikolith-2025/etten-leur-gevelisolatie-6cm-strikolith-2025-na-01` |
| `/images/projects/halsteren-buitenstucwerk-na-01.webp` | `halsteren-buitenstucwerk-na-01` |

**Result:** ✅ **Correct** — Works for both subfolder and flat paths. `dir="/images/projects"` + `baseName` yields correct full path.

---

## 6. Project Page Hero Image — Inconsistency (etten-leur 6cm)

| Page | dir | baseName |
|------|-----|----------|
| etten-leur-gevelisolatie-6cm-strikolith-2025 | `/images/projects/etten-leur-gevelisolatie-6cm-strikolith-2025` | `etten-leur-gevelisolatie-6cm-strikolith-2025/etten-leur-gevelisolatie-6cm-strikolith-2025-na-01` |
| etten-leur-gevelisolatie-10cm-ral9010-2025 | `/images/projects/etten-leur-gevelisolatie-10cm-ral9010-2025` | `etten-leur-gevelisolatie-10cm-ral9010-2025-na-01` |

**Issue:** Etten-Leur 6cm uses `dir` with subfolder and `baseName` with subfolder, so `variantPath` becomes:
`/images/projects/etten-leur-gevelisolatie-6cm-strikolith-2025/etten-leur-gevelisolatie-6cm-strikolith-2025/etten-leur-gevelisolatie-6cm-strikolith-2025-na-01.w1920.webp` — **duplicate folder segment**.

**Recommendation:** Use `dir="/images/projects"` and `baseName="etten-leur-gevelisolatie-6cm-strikolith-2025/etten-leur-gevelisolatie-6cm-strikolith-2025-na-01"` (as in ProjectCard), or `dir` with subfolder and `baseName` without subfolder (as in etten-leur 10cm page).

---

## 7. Hardcoded Image Paths Bypassing Responsive System

| Location | Usage | Bypasses ResponsiveImage? |
|----------|-------|----------------------------|
| `app/buiten-stucwerk/nadelen-switcher.tsx` | `<img src="/images/nadelen/xxx.webp">` | ✅ Yes |
| `components/footer.tsx` | `<img src="/images/logo-bm-klus.webp">` | ✅ Yes |
| `components/navbar.tsx` | `<img src="/images/logo-bm-klus.webp">` | ✅ Yes |
| `app/onze-werken/page.tsx` | `ResponsiveImage` with `baseName="bruinisse-gevelisolatie-6cm-na-04"` | ❌ No |
| Project pages (schema `image`) | JSON-LD only, not display | N/A |
| `components/google-reviews.tsx` | External URLs (Google avatars) | N/A |

**Note:** Logos and nadelen images may be intentionally single-resolution; logos are small assets.

---

## Summary

| # | Finding |
|---|---------|
| 1 | All projects in registry have pages; all pages are in registry |
| 2 | All projects have coverImage.src, beforeThumb.src, and required fields |
| 3 | Order is explicit in `projects.ts` array; no runtime sort |
| 4 | baseName format varies: subfolder projects use `prefix/prefix-xx`, flat use `prefix-xx` |
| 5 | `srcToBaseName()` correctly derives baseName from src |
| 6 | **Bug:** Etten-Leur 6cm hero uses dir+baseName that produce duplicate path segment |
| 7 | nadelen-switcher, footer, navbar use direct `<img src>` (bypass ResponsiveImage) |

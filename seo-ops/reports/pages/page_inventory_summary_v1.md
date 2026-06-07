# Page Inventory Summary v1

**Generated:** 2026-04-07 10:55 UTC
**Generator:** `build_page_inventory.py v1`

---

## Totals

| Metric | Count |
|--------|-------|
| Total pages found | 54 |
| Indexable (guess) | 52 |
| Not indexable | 2 |
| Dynamic (generated from data) | 21 |
| Static (file-based routes) | 33 |
| Pages with FAQ | 35 |
| Pages with schema hints | 50 |

---

## Page type breakdown

| Type | Count |
|------|-------|
| city | 21 |
| project | 16 |
| service | 7 |
| cluster | 5 |
| utility | 2 |
| home | 1 |
| archive | 1 |
| legal | 1 |

---

## Route groups

| Group | Pages |
|-------|-------|
| `/` | 1 |
| `/buiten-stucwerk/` | 1 |
| `/contact/` | 1 |
| `/diensten/` | 1 |
| `/gevel-schilderen/` | 1 |
| `/gevelisolatie/` | 27 |
| `/muren-stucen/` | 1 |
| `/onze-werken/` | 17 |
| `/over-ons/` | 1 |
| `/privacybeleid/` | 1 |
| `/schoonmaak-na-verbouwing/` | 1 |
| `/sierpleister/` | 1 |

---

## Data sources used

| Source | What it provides |
|--------|-----------------|
| `app/` directory tree | Route detection, page.tsx files, schema/FAQ hints |
| `data/sitemap-plan.ts` | PLANNED_ROUTES: meta title, description, enabled flag |
| `lib/content/gevelisolatie-locations.ts` | Location data: slug, city, title, h1, description, FAQ |
| `lib/content/projects.ts` | Project cards: slug, title, city, serviceType |
| `lib/content/*.ts` (service pages) | Service meta: title, description, h1, FAQ presence |

---

## Extraction reliability

| Field | Reliability | Notes |
|-------|-------------|-------|
| page_id | Reliable | Derived from route_path |
| route_path | Reliable | From app/ directory or data sources |
| source_file | Reliable | Actual file path in app/ |
| page_type | Reliable | Rule-based classifier on route patterns |
| is_dynamic | Reliable | Detected from [param] segments |
| is_indexable_guess | Good | Based on enabled flag in sitemap-plan |
| meta_title_guess | Good | From sitemap-plan or content modules |
| meta_description_guess | Good | From sitemap-plan or content modules |
| h1_guess | Good for services/locations | From content .ts files; missing for some static pages |
| title_guess | Good for projects/locations | From content data; blank for utility pages |
| city_guess | Good for city/project pages | From content data |
| service_guess | Good for service/cluster/city | From content data or route |
| has_faq | Good | Detected from content exports + page imports |
| has_schema_hint | Good | Detected from jsonLd/Schema imports in page.tsx |
| has_internal_links_section | Not extracted (v1) | No reliable detection method yet |
| section_headings | Not extracted (v1) | Requires AST parsing or full render |

---

## Anomalies to review

### Not indexable (2 pages)

- `/onze-werken/gevelisolatie/` — disabled in sitemap-plan.ts
- `/schoonmaak-na-verbouwing/` — disabled in sitemap-plan.ts

### Missing H1 guess (25 indexable pages)

- `/contact/` (utility)
- `/diensten/` (service)
- `/gevelisolatie/afwerkingen/` (cluster)
- `/gevelisolatie/kosten/` (cluster)
- `/gevelisolatie/materialen/` (cluster)
- `/gevelisolatie/rc-waarde-dikte/` (cluster)
- `/gevelisolatie/subsidie-vergunning/` (cluster)
- `/onze-werken/` (archive)
- `/onze-werken/almere-gevelisolatie-35m2-sierpleister-2024/` (project)
- `/onze-werken/bruinisse-gevelisolatie-6cm-sierpleister-2025/` (project)
- `/onze-werken/dordrecht-gevelisolatie-10cm-sierpleister-2025/` (project)
- `/onze-werken/etten-leur-gevelisolatie-10cm-ral9010-2025/` (project)
- `/onze-werken/etten-leur-gevelisolatie-6cm-strikolith-2025/` (project)
- `/onze-werken/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025/` (project)
- `/onze-werken/katwijk-gevelisolatie-6cm-sierpleister-2024/` (project)
- `/onze-werken/klaaswaal-gevelisolatie-6cm-sierpleister-2025/` (project)
- `/onze-werken/nieuw-beijerland-gevelisolatie-12cm-sierpleister-2025/` (project)
- `/onze-werken/rottekade-gevelisolatie-schilderwerk-2024/` (project)
- `/onze-werken/rotterdam-buitenstucwerk-cementpleister-2025/` (project)
- `/onze-werken/rotterdam-julianastraat-aanbouw-isolatie-4cm-2026/` (project)
- `/onze-werken/vlaardingen-gevelisolatie-10cm-sierpleister-2025/` (project)
- `/onze-werken/vlaardingen-gevelisolatie-6cm-sierpleister-2024/` (project)
- `/onze-werken/vught-gevelisolatie-10cm-sierpleister-2024/` (project)
- `/over-ons/` (utility)
- `/privacybeleid/` (legal)

### Missing meta title guess (16 indexable pages)

- `/` (home)
- `/onze-werken/almere-gevelisolatie-35m2-sierpleister-2024/` (project)
- `/onze-werken/bruinisse-gevelisolatie-6cm-sierpleister-2025/` (project)
- `/onze-werken/dordrecht-gevelisolatie-10cm-sierpleister-2025/` (project)
- `/onze-werken/etten-leur-gevelisolatie-10cm-ral9010-2025/` (project)
- `/onze-werken/etten-leur-gevelisolatie-6cm-strikolith-2025/` (project)
- `/onze-werken/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025/` (project)
- `/onze-werken/katwijk-gevelisolatie-6cm-sierpleister-2024/` (project)
- `/onze-werken/klaaswaal-gevelisolatie-6cm-sierpleister-2025/` (project)
- `/onze-werken/nieuw-beijerland-gevelisolatie-12cm-sierpleister-2025/` (project)
- `/onze-werken/rottekade-gevelisolatie-schilderwerk-2024/` (project)
- `/onze-werken/rotterdam-buitenstucwerk-cementpleister-2025/` (project)
- `/onze-werken/rotterdam-julianastraat-aanbouw-isolatie-4cm-2026/` (project)
- `/onze-werken/vlaardingen-gevelisolatie-10cm-sierpleister-2025/` (project)
- `/onze-werken/vlaardingen-gevelisolatie-6cm-sierpleister-2024/` (project)
- `/onze-werken/vught-gevelisolatie-10cm-sierpleister-2024/` (project)

### Missing meta description guess (15 indexable pages)

- `/onze-werken/almere-gevelisolatie-35m2-sierpleister-2024/` (project)
- `/onze-werken/bruinisse-gevelisolatie-6cm-sierpleister-2025/` (project)
- `/onze-werken/dordrecht-gevelisolatie-10cm-sierpleister-2025/` (project)
- `/onze-werken/etten-leur-gevelisolatie-10cm-ral9010-2025/` (project)
- `/onze-werken/etten-leur-gevelisolatie-6cm-strikolith-2025/` (project)
- `/onze-werken/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025/` (project)
- `/onze-werken/katwijk-gevelisolatie-6cm-sierpleister-2024/` (project)
- `/onze-werken/klaaswaal-gevelisolatie-6cm-sierpleister-2025/` (project)
- `/onze-werken/nieuw-beijerland-gevelisolatie-12cm-sierpleister-2025/` (project)
- `/onze-werken/rottekade-gevelisolatie-schilderwerk-2024/` (project)
- `/onze-werken/rotterdam-buitenstucwerk-cementpleister-2025/` (project)
- `/onze-werken/rotterdam-julianastraat-aanbouw-isolatie-4cm-2026/` (project)
- `/onze-werken/vlaardingen-gevelisolatie-10cm-sierpleister-2025/` (project)
- `/onze-werken/vlaardingen-gevelisolatie-6cm-sierpleister-2024/` (project)
- `/onze-werken/vught-gevelisolatie-10cm-sierpleister-2024/` (project)

---

## Limitations (v1)

1. **section_headings** — not extracted; requires rendering or AST parsing of JSX
2. **has_internal_links_section** — not reliably detectable from source scan
3. **Word count** — not available without rendering pages
4. **Actual rendered title vs meta title** — may differ due to `buildPageMetadata()` logic
5. **Home page H1** — hardcoded guess based on site branding, not extracted from JSX
6. **Disabled pages** — included with `is_indexable_guess=false` for completeness

---

## Output files

| File | Path |
|------|------|
| JSON (full) | `seo-ops/snapshots/normalized/pages/page_inventory_v1.json` |
| CSV (flat) | `seo-ops/snapshots/normalized/pages/page_inventory_v1.csv` |
| Summary (this file) | `seo-ops/reports/pages/page_inventory_summary_v1.md` |

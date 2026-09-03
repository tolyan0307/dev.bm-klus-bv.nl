# Internal Link Audit v1

**Generated:** 2026-09-03T16:09:58+00:00
**Report mode:** preliminary
**Generator:** `run_internal_link_audit_v1.py`
**Pages crawled:** 56 `[live crawl, sitemap.xml]`
**External links checked:** 28/28

## Provenance

- **Generated:** 2026-09-03T16:09:58+00:00
- **Report mode:** preliminary
- **Generator:** run_internal_link_audit_v1.py
- **Workflow:** internal_link_audit_v1
- **Primary truth:** live read-only HTTP crawl of https://bm-klus-bv.nl (sitemap.xml pages + linked targets)
- **Live API calls:** none (own-site HTTP crawl only, free)
- **Known limitations:** template/contextual split is heuristic; regex HTML parsing; crawls deployed site, not local tree

## Method

- Template links = (target, anchor) pairs present on >= 80% of pages (nav/footer/breadcrumb).
- Orphan/dead-end verdicts count **contextual (in-body) links only** — sitewide nav does not pass topical link equity.
- All data from a live read-only crawl; no site changes made.

## Summary

| Issue | Count |
|-------|-------|
| Hard orphans (zero inlinks incl. nav) | 0 |
| Contextual orphans (nav-only inlinks) | 1 |
| Dead ends (no contextual outlinks) | 1 |
| Broken internal link targets | 0 |
| Internal links hitting redirects | 0 |
| Weak anchor texts | 6 |
| Over-linked pages (>100 links) | 1 |
| Broken external links | 11 |

## Hard orphans

None found.

## Contextual orphans (reachable only via nav/footer)

| Page | Template inlinks |
|---|---|
| /privacybeleid/ | 110 |

## Dead ends (no in-body outlinks)

| Page | Template outlinks |
|---|---|
| /privacybeleid/ | 36 |

## Broken internal link targets

None found.

## Internal links hitting redirects (update link to final URL)

None found.

## Weak anchor texts

| Source | Target | Anchor |
|---|---|---|
| /diensten/ | /gevelisolatie/ | Meer info |
| /diensten/ | /gevel-schilderen/ | Meer info |
| /diensten/ | /buiten-stucwerk/ | Meer info |
| /diensten/ | /sierpleister/ | Meer info |
| /diensten/ | /muren-stucen/ | Meer info |
| /diensten/ | /gevelisolatie/ | Meer info |

## Over-linked pages

| Page | Total links |
|---|---|
| /gevelisolatie/ | 109 |

## Broken external links

| URL | Status | Linked from |
|---|---|---|
| https://www.capelleaandenijssel.nl/duurzaamheid | 404 | /gevelisolatie/capelle-aan-den-ijssel/ |
| https://www.delft.nl/duurzaamheid | 404 | /gevelisolatie/delft/ |
| https://www.denhaag.nl/nl/wonen-en-bouwen/duurzaam-wonen.htm | 404 | /gevelisolatie/den-haag/ |
| https://www.dordrecht.nl/duurzaamheid | 404 | /gevelisolatie/dordrecht/ |
| https://www.gouda.nl/duurzaamheid | 404 | /gevelisolatie/gouda/ |
| https://www.instagram.com/bm_klus_bv | 429 | /, /buiten-stucwerk/, /contact/, /diensten/, /gevel-schilderen/ |
| https://www.linkedin.com/in/boris-mitov-a436902b9 | 999 | /, /buiten-stucwerk/, /contact/, /diensten/, /gevel-schilderen/ |
| https://www.lv.nl/duurzaam-wonen-en-leven | 403 | /gevelisolatie/leidschendam-voorburg/ |
| https://www.rotterdam.nl/wonen-leven/energiebesparing/ | 404 | /gevelisolatie/rotterdam/ |
| https://www.voornenaanzee.nl/duurzaamheid | None | /gevelisolatie/hellevoetsluis/ |
| https://www.zoetermeer.nl/duurzaamheid | 404 | /gevelisolatie/zoetermeer/ |

## Contextual inlinks per page

| Page | Contextual in | Template in | Contextual out |
|------|---------------|-------------|----------------|
| /privacybeleid/ | 0 | 110 | 0 |
| / | 0 | 111 | 31 |
| /onze-werken/almere-gevelisolatie-35m2-sierpleister-2024/ | 1 | 0 | 1 |
| /onze-werken/bruinisse-gevelisolatie-6cm-sierpleister-2025/ | 1 | 0 | 1 |
| /onze-werken/etten-leur-gevelisolatie-10cm-ral9010-2025/ | 1 | 0 | 1 |
| /onze-werken/katwijk-gevelisolatie-6cm-sierpleister-2024/ | 1 | 0 | 1 |
| /onze-werken/klaaswaal-gevelisolatie-6cm-sierpleister-2025/ | 1 | 0 | 1 |
| /onze-werken/rottekade-gevelisolatie-schilderwerk-2024/ | 1 | 0 | 1 |
| /onze-werken/spijkenisse-malledijk-stucwerk-schilderwerk-2024/ | 1 | 0 | 1 |
| /onze-werken/vlaardingen-gevelisolatie-10cm-sierpleister-2025/ | 1 | 0 | 1 |
| /onze-werken/vught-gevelisolatie-10cm-sierpleister-2024/ | 1 | 0 | 1 |
| /onze-werken/hendrik-ido-ambacht-gevelrenovatie-2024/ | 1 | 0 | 2 |
| /onze-werken/rotterdam-buitenstucwerk-cementpleister-2025/ | 1 | 0 | 2 |
| /onze-werken/delft-willemstraat-gevelrenovatie-schilderwerk-2026/ | 2 | 0 | 1 |
| /onze-werken/etten-leur-bankenstraat-gevelisolatie-dakrenovatie-2026/ | 2 | 0 | 1 |
| /onze-werken/etten-leur-gevelisolatie-6cm-strikolith-2025/ | 2 | 0 | 1 |
| /onze-werken/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025/ | 2 | 0 | 1 |
| /onze-werken/nieuw-beijerland-gevelisolatie-12cm-sierpleister-2025/ | 2 | 0 | 1 |
| /onze-werken/vlaardingen-gevelisolatie-6cm-sierpleister-2024/ | 2 | 0 | 1 |
| /gevelisolatie/capelle-aan-den-ijssel/ | 2 | 0 | 12 |
| /onze-werken/rotterdam-julianastraat-aanbouw-isolatie-4cm-2026/ | 3 | 0 | 1 |
| /onze-werken/dordrecht-gevelisolatie-10cm-sierpleister-2025/ | 3 | 0 | 3 |
| /gevelisolatie/bergen-op-zoom/ | 3 | 0 | 11 |
| /gevelisolatie/breda/ | 3 | 0 | 11 |
| /gevelisolatie/roosendaal/ | 3 | 0 | 11 |
| /gevelisolatie/alphen-aan-den-rijn/ | 3 | 0 | 12 |
| /gevelisolatie/gouda/ | 3 | 0 | 12 |
| /gevelisolatie/hellevoetsluis/ | 3 | 0 | 12 |
| /gevelisolatie/spijkenisse/ | 3 | 0 | 12 |
| /gevelisolatie/leiden/ | 4 | 0 | 13 |
| /gevelisolatie/maassluis/ | 4 | 0 | 13 |
| /gevelisolatie/vlaardingen/ | 4 | 0 | 14 |
| /gevelisolatie/hendrik-ido-ambacht/ | 5 | 0 | 12 |
| /gevelisolatie/leidschendam-voorburg/ | 5 | 0 | 12 |
| /gevelisolatie/den-haag/ | 5 | 0 | 13 |
| /gevelisolatie/schiedam/ | 5 | 0 | 13 |
| /gevelisolatie/dordrecht/ | 5 | 0 | 14 |
| /gevelisolatie/barendrecht/ | 6 | 0 | 13 |
| /gevelisolatie/ridderkerk/ | 6 | 0 | 13 |
| /muren-stucen/ | 6 | 199 | 5 |
| /gevelisolatie/delft/ | 7 | 0 | 13 |
| /gevelisolatie/zoetermeer/ | 7 | 0 | 14 |
| /sierpleister/ | 7 | 215 | 6 |
| /diensten/ | 7 | 280 | 21 |
| /gevelisolatie/rotterdam/ | 9 | 0 | 15 |
| /buiten-stucwerk/ | 10 | 203 | 8 |
| /gevel-schilderen/ | 10 | 205 | 6 |
| /gevelisolatie/materialen/ | 27 | 0 | 8 |
| /gevelisolatie/subsidie-vergunning/ | 28 | 0 | 8 |
| /over-ons/ | 28 | 169 | 3 |
| /gevelisolatie/rc-waarde-dikte/ | 29 | 0 | 7 |
| /gevelisolatie/kosten/ | 31 | 0 | 7 |
| /gevelisolatie/afwerkingen/ | 31 | 0 | 13 |
| /onze-werken/ | 34 | 213 | 29 |
| /contact/ | 50 | 328 | 1 |
| /gevelisolatie/ | 62 | 214 | 43 |

## Limitations

1. Template detection is heuristic (share threshold), a sitewide contextual block would be misclassified as template.
2. Anchor extraction is regex-based; JS-injected links are not seen (site is static export, impact low).
3. External checks capped at 50 unique URLs per run.
4. Point-in-time crawl of the live site; local uncommitted changes are not reflected.

---
_Generated by `run_internal_link_audit_v1.py` at 2026-09-03T16:09:58+00:00_
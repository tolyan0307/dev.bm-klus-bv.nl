# Дорожная карта: удаление цен и калькуляторов — волна 0 (нулевой SEO-риск)

**Дата:** 2026-09-05 · **Основание:** `price_removal_impact_2026-09-04.md` §3–4
**Рамки:** только элементы с нулевым риском. Волна 1 (таблицы richtprijzen и цифры в FAQ на 4 money pages) и волна 2 (`/gevelisolatie/kosten/`) **не входят** и ждут отдельного решения.
**Принцип оформления:** элемент не вырезается «в дыру» — чип заменяется чипом, виджет статической таблицей, секция сохраняет заголовок и ритм.

| # | Шаг | Файлы | Замена | Статус |
|---|-----|-------|--------|--------|
| W0-1 | Убрать ценовой калькулятор с `/gevelisolatie/` и 21 городской | `components/sections/gevelisolatie/kosten-section.tsx`, `app/gevelisolatie/[location]/page.tsx`, удалить `kosten-calculator.tsx` | Текст «Gebruik de calculator» → ссылка на kostenfactoren + CTA opname | ✅ |
| W0-2 | Заменить Rc-калькулятор статической таблицей | `app/gevelisolatie/rc-waarde-dikte/page.tsx`, новый `rc-waarde-dikte-table.tsx`, удалить `rc-waarde-dikte-calculator.tsx` | Таблица Rc 2,5 / 3,5 / 4,7 / 5,5 × EPS / PIR / wol из `lib/constants/rc-waarde.ts` | ✅ |
| W0-3 | Hero-чипы «Vanaf €X/m²» ×6 | `hero-gevelisolatie.tsx`, `kosten/page.tsx`, `buiten-stucwerk`, `gevel-schilderen`, `muren-stucen`, `sierpleister` | Чип «Gratis opname & offerte» + подпись «prijs na opname op locatie» | ✅ |
| W0-4 | Dordrecht-блок с ценами + intro городской kosten-секции | `app/gevelisolatie/[location]/page.tsx` | Удалить блок; секция = H2 + текст + ссылка на факторы + CTA | ✅ |
| W0-5 | JSON-LD `AggregateOffer` (lowPrice/highPrice) ×9 | 9 вызовов `serviceSchema()` | Убрать параметры; `offers` перестаёт эмититься | ✅ |
| W0-6 | UI-лейблы | `trust-strip.tsx`, `verdieping-section.tsx`, `etics-section.tsx`, `[location]/page.tsx:849` | «Prijs per m²» → «Gratis opname»; «Kosten & prijs per m²» → «Kosten & offerte» | ✅ |
| W0-7 | Незадеплоенные keimen + sausklaar: PriceCards, чипы, цифры в FAQ и мета | `app/gevel-schilderen/keimen/page.tsx`, `app/muren-stucen/sausklaar-behangklaar/page.tsx`, `data/sitemap-plan.ts`, удалить `components/page/PriceCards.tsx` | Секцию richtprijzen убрать, FAQ-ответы качественные, title/description без цен | ✅ |
| W0-8 | Мёртвое поле `priceRange` | `data/services.ts` | Удалить | ✅ |
| W0-9 | Документация | `docs/governance/70-page-type-checklists.md`, `SITE_STRUCTURE.md`/`DESIGN_SYSTEM.md` при упоминании | Чеклист без «Price teaser (range)» | ✅ |
| W0-10 | Проверка | `npx tsc --noEmit`, `pnpm build`, grep на остатки | 0 ошибок; в `out/` нет «Vanaf €», «prijscalculator», «AggregateOffer» | ✅ |

Не трогаем в этой волне: `lib/content/*.ts` richtprijzen и FAQ-цифры money pages, `/gevelisolatie/kosten/` контент, 27 title-тегов, `gemiddeldBesparing`, `LocalBusiness.priceRange "€€"`, шкала «€/€€/€€€» на afwerkingen.

## Итог выполнения (2026-09-05)

- Все 10 шагов выполнены. `npx tsc --noEmit` — 0 ошибок, `next build` — успех.
- Проверка `out/`: «Vanaf €» — 0 файлов, «prijscalculator» — 0, `AggregateOffer` — 0, лейбл «Prijs per m²» в trust-strip — 0. Чип «Gratis opname & offerte» — 8 страниц (6 hero + keimen + sausklaar).
- Удалены файлы: `kosten-calculator.tsx`, `rc-waarde-dikte-calculator.tsx`, `components/page/PriceCards.tsx`. Добавлен `rc-waarde-dikte-table.tsx`.
- Оставшиеся `€` на money pages и `/gevelisolatie/kosten/` — это волна 1/2 (таблицы richtprijzen в `lib/content/*.ts`, FAQ-цифры, контент kosten-страницы). Не тронуто по плану.
- Городской чип «Prijsindicatie: zie kostenpagina» оставлен (без цифр, ведёт на kosten-страницу).
- Не закоммичено — ждёт ревью.

---

# Волны 1–2 (2026-09-05, по команде «продолжай»)

**Принцип тот же:** цифры уходят, тема «kosten» остаётся. Секции сохраняют заголовок, сетку карточек и ритм; в карточках вместо `€X–€Y/m²` — название системы + что определяет его цену. Title меняется только у `/gevelisolatie/kosten/` (одна страница, решение из отчёта); остальные 26 title — волна 3.

| # | Шаг | Файлы | Замена | Статус |
|---|-----|-------|--------|--------|
| W1-1 | `/gevelisolatie/` kosten-секция | `lib/content/gevelisolatie.ts`, `kosten-section.tsx` | Убрать `richtprijzen`, H2 «(prijs per m²)» → «(wat bepaalt de prijs?)», FAQ-ответ без цифр | ✅ |
| W1-2 | `/buiten-stucwerk/` | `lib/content/buiten-stucwerk.ts`, `app/buiten-stucwerk/page.tsx` | `prices` → `opties` (система + прайс-фактор), disclaimer без €, FAQ без цифр | ✅ |
| W1-3 | `/gevel-schilderen/` | `lib/content/gevel-schilderen.ts`, `app/gevel-schilderen/page.tsx` | Тир-карточки Basis/Standaard/Intensief без сумм, `table` → `note`, FAQ без цифр | ✅ |
| W1-4 | `/sierpleister/` | `lib/content/sierpleister.ts`, `app/sierpleister/page.tsx` | `priceCards` → `opties`, disclaimer, FAQ | ✅ |
| W1-5 | `/muren-stucen/` | `lib/content/muren-stucen.ts`, `app/muren-stucen/page.tsx` | `prices` → `opties`, disclaimer, FAQ | ✅ |
| W2-1 | `/gevelisolatie/kosten/` контент | `app/gevelisolatie/kosten/page.tsx` | Секция richtprijzen → «Prijs per m²: hoe komt die tot stand?» (карточки без сумм), сценарии без «Indicatie totaal» (вместо — «Bepalend voor de prijs»), FAQ без цифр, hero-текст | ✅ |
| W2-2 | `/gevelisolatie/kosten/` title/description + schema | `data/sitemap-plan.ts`, `kosten/page.tsx` | «Kosten gevelisolatie buiten: wat bepaalt de prijs?» | ✅ |
| W2-3 | Ссылки и упоминания «richtprijzen» на других страницах | `afwerkingen`, `materialen`, `subsidie-vergunning`, `rc-waarde-dikte`, 12 FAQ-ответов в `gevelisolatie-locations.ts` | «Kostenfactoren en prijsopbouw» / «lees welke factoren de prijs bepalen» | ✅ |
| W2-4 | Документация | `docs/governance/60-decisions-and-bans.md §Hardcoded prices`, `seo-system/GLOBAL_SEO_CONTENT_RULES.md §10 + таблица страниц`, `SITE_STRUCTURE.md §10.3` | Таблицы цен → запись о решении владельца: цены на публичных страницах не публикуются | ✅ |
| W2-5 | Проверка | tsc, build, grep `out/` на `€` (ожидаем только `priceRange:"€€"` и `gemiddeldBesparing`), «richtprij» | | ✅ |

## Итог выполнения волн 1–2 (2026-09-05)

- Все шаги выполнены. `npx tsc --noEmit` — 0 ошибок, `next build` — успех (64 страницы).
- В `out/` не осталось ни одной цифры с `€`, кроме запланированных исключений: `LocalBusiness.priceRange "€€"` (2 JSON-LD на каждой странице), `gemiddeldBesparing €/jaar` на 21 городской (экономия по Milieu Centraal), шкала `€/€€/€€€` на `/gevelisolatie/afwerkingen/`.
- «Indicatie totaal» — 0 вхождений. Слово «richtprijs» осталось только в hero-буллетах `/sierpleister/` и `/muren-stucen/` («Richtprijs per m² na opname op locatie» — обещание цены после осмотра, без цифр).
- Title `/gevelisolatie/kosten/` → «Gevelisolatie kosten: wat bepaalt de prijs?» (43 симв., в бюджете 47). Title keimen укорочен до «Gevel keimen: kosten & wanneer het past» (лимит title = 60 − суффикс « | BM klus BV»).
- Описания sierpleister / muren-stucen / afwerkingen-ссылка на keimen: «Richtprijzen per m²» → «Wat bepaalt de prijs per m²» (description, не title).
- Governance: `60-decisions-and-bans.md` §Hardcoded prices заменён на BAN «Prices on public pages»; `GLOBAL_SEO_CONTENT_RULES.md §10` — то же; `SITE_STRUCTURE.md §10.3` обновлён.
- Волна 3 (26 оставшихся title с «prijs per m²»: 21 городских + gevelisolatie, buiten-stucwerk, gevel-schilderen, sierpleister + description'ы) — **не выполнена**, отдельный деплой через 3–4 недели после этого.
- Не закоммичено — ждёт ревью.

---

# Повторный прогон + сверка цифр (2026-09-05)

См. `price_removal_numbers_check_2026-09-05.md`. Итог: единственная устаревшая цифра — экономия на 21 городской странице (€400–€900/jaar) → заменена на данные Milieu Centraal от 29.06.2026 (tussenwoning €320, hoekwoning €750, vrijstaand €1.100 при газе €1,37/m³) с указанием источника и даты. Условия ISDE и streefwaarde Rc 6 подтверждены на rvo.nl без изменений. tsc 0 ошибок, build OK.

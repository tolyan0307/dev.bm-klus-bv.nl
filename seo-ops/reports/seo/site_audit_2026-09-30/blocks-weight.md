# Инвентаризация блоков: SEO и вес (read-only аудит, 2026-09-30)

Источник: сборка `out/` от 2026-09-30 16:57 (совпадает с HEAD `42c575d`), исходники `app/`, `components/`, `lib/`. Замеры моими скриптами (cheerio по `out/*/index.html`, разбор RSC `self.__next_f`, разбор чанков Turbopack по id модулей) лежат в (временный скрипт сессии, не сохранён), (временный скрипт сессии, не сохранён). Байты — сырые (без gzip), если не сказано иное. «JS-only» — текст, который есть в JS-чанке страницы и отсутствует в HTML (видят только после клика/гидратации).

Обозначения: **S** — серверный компонент, **C** — `"use client"`, **C(в S)** — серверная секция с клиентским листом внутри. «Слова» — видимые слова блока в HTML.

---

## 0. Главное коротко

1. **Около половины HTML любой страницы — дубль вёрстки в RSC-payload** (`self.__next_f`): 30 КБ на 404, 65–187 КБ на страницах. Движут им Tailwind-классы (17–37 % payload) и lucide-иконки в серверных компонентах (15–32 КБ атрибутов SVG), на проектах — srcset картинок (до 38 КБ). Сам текст — около 10 %. Манифест изображений в клиент **не утекает** (защита `server-only` работает).
2. **`dynamic()` в `page.tsx` ничего не откладывает.** Все клиентские компоненты страницы, включая «отложенные» отзывы, модалку и FAQ, лежат в одном page-чанке, который грузится сразу (`<script async>`). Проверено по id модулей. Правило в `.claude/rules/code.md` («интерактив ниже первого экрана — через dynamic()») на этой сборке эффекта не даёт (весь чанк скачивается в любом случае).
3. **Общий «клиентский набор» дублируется в каждом page-чанке.** QuoteModal (11,3 КБ) + google-reviews (11,7) + StickyCTABar (3,7) + next/script (3,7) + google-place-cache (1,3) + rating badge (0,8) + хелперы dynamic (~1,7) ≈ **34 КБ сырых / ~10 КБ gzip**. Этот набор лежит в 10–16 разных чанках, и браузер качает его заново на каждом новом шаблоне страницы. На страницах городов он занимает ~32 из 37 КБ page-чанка.
4. **Общий JS фреймворка** ≈ 466 КБ сырых / **~137 КБ gzip** для современных браузеров. `a6dad97d9634a72d.js` (113 КБ) — полифиллы core-js с `noModule`: современные браузеры его **не качают**, так что «580 КБ / 177 КБ» из краула завышены. Нашего кода в общем бандле — 1 чанк `dc1ea9deb976df07.js`: 27 КБ сырых / 8,7 КБ gzip (navbar ~12 КБ, next/link, GTM, CtaClickTracker, PageviewBeacon, ядро lucide). Остальное — React DOM и роутер Next.
5. **SEO-мусор, повторяющийся на многих URL:** блок отзывов (30 страниц) в HTML — пустой скелет с H2 (12 слов, тексты приходят только через JS, а после деплоя их нет вовсе); «Waarom klanten voor ons kiezen» — один и тот же текст на 27 страницах; скрытая QuoteModal с H2 «Offerte aanvragen» и полной формой — в DOM на 58 из 61 страницы; H2 в футере на всех страницах; на городских страницах 26–38 % текста `<main>` — повтор с ≥5 других URL.
6. **Текст в табах и степперах, которого нет в HTML:** `/buiten-stucwerk/` ~440 слов, `/gevelisolatie/` ~330, `/sierpleister/` ~275, `/muren-stucen/` ~190 (шаги werkwijze, «nadelen», «keuzehulp»). Google эти тексты, скорее всего, не проиндексирует: они появляются только после клика.

---

## 1. Общий JS (все страницы, включая 404)

| Чанк | Сырой | gzip | Что внутри | Наш код? |
|---|---|---|---|---|
| `867e7e140bc3d9cc.js` | 223 КБ | 69,7 | react-dom (модуль 87649 = 198 КБ), bootstrap app-router, hydrate | нет |
| `68f02381d337636c.js` | 117 КБ | 31,9 | react-server-dom (Flight-клиент, 24 КБ), редьюсеры роутера/prefetch/segment cache (~70 модулей) | нет |
| `a6dad97d9634a72d.js` | 113 КБ | 39,5 | core-js полифиллы, `<script noModule>` — **современные браузеры не загружают** | нет |
| `3e305376473376ac.js` | 33 КБ | 7,2 | Next: work-unit/prerender storage, ошибки навигации | нет |
| `81f0f13d25d49d65.js` | 31 КБ | 7,4 | Next: layout-router, Metadata/Viewport/Outlet boundaries | нет |
| `be3ef9d4e6968357.js` | 25 КБ | 7,9 | react (jsx-runtime), react-dom shim, error boundary | нет |
| `turbopack-*.js` | 10 КБ | 4,0 | рантайм Turbopack | нет |
| `dc1ea9deb976df07.js` | 27 КБ | 8,7 | **navbar (12 КБ)**, next/link (3,4), CtaClickTracker (1,3), GtmProvider (1,0), PageviewBeacon, lucide core (1,2), url-утилиты | **да** |
| `26ca…` | 0,3 | — | загрузчик | — |
| **Итого для современного браузера** | **~466 КБ** | **~137 КБ** | фреймворк ≈ 93 %, наш код ≈ 6 % | |

- **Lucide**: иконки tree-shaken (отдельные модули по 150–400 Б), весь набор не бандлится. Проблема lucide не в JS, а в HTML и RSC: в серверных компонентах каждая иконка — inline `<svg>`. На странице 43–133 SVG, это **17–52 КБ HTML** плюс их копия в RSC.
- **Footer** — серверный (в JS не входит), но его ~4,4 КБ JSON плюс блок «Contact» ~4,6 КБ дублируются в RSC каждой страницы.
- **CSS** `79e77fd06090c1e9.css`: 182 КБ сырых / **23 КБ gzip**, блокирует рендер, один файл на все страницы (`components/ui` исключён через `@source not`). Мёртвые `@keyframes shimmer` и прочее — в BACKLOG.
- Базовая стоимость любой страницы (404): HTML 68 КБ = navbar 16 КБ (desktop- и mobile-меню одновременно: 24 ссылки, из них 11 уникальных) + footer 12 КБ + RSC 34 КБ.

## 2. Что раздувает RSC-payload (inline `self.__next_f`)

RSC — сериализованное дерево серверных компонентов, которое нужно для гидратации. В static export выключить его нельзя: он просто повторяет всю серверную вёрстку второй раз.

| Страница | HTML | RSC-скрипты | className в RSC | SVG-атрибуты | img-атрибуты | JSON-LD (T-строки) |
|---|---|---|---|---|---|---|
| 404 | 68 | 34 | 8 (28 %) | 9 | 1 | 0 |
| / | 227 | 91 | 21 (26 %) | 18 | 9 | 2 |
| /gevelisolatie/ | 386 | 180 | **57 (36 %)** | 26 | 5 | 7 |
| /buiten-stucwerk/ | 296 | 140 | 43 (34 %) | 22 | 3 | 7 |
| /sierpleister/ | 391 | **187** | 55 (33 %) | **32** | 7 | 6 |
| /gevel-schilderen/ | 328 | 169 | 53 (35 %) | 29 | 6 | 8 |
| /gevel-schilderen/keimen/ | 241 | 123 | 32 | 22 | 4 | 6 |
| /muren-stucen/ | 300 | 150 | 45 | 25 | 7 | 6 |
| /onze-werken/ | 267 | 121 | 21 | 16 | **28** | 2 |
| /diensten/ | 207 | 86 | 22 | 15 | 2 | 2 |
| /over-ons/ | 193 | 99 | 26 | 22 | 3 | 2 |
| /contact/ | 165 | 79 | 21 | 19 | 2 | 2 |
| /gevelisolatie/rotterdam/ | 247 | 132 | 43 (37 %) | 23 | 5 | 4 |
| проект etten-leur-bankenstraat | 274 | 136 | 21 | 9 | **38** | 3 |
| проект katwijk | 154 | 73 | 20 | 8 | 7 | 0 |

(КБ, сырые.) Главные источники, по убыванию:
1. **Tailwind-классы** — одна и та же строка `className` сидит и в HTML (`class=` — 37–103 КБ), и в RSC.
2. **Inline SVG lucide** в серверных компонентах: 105–282 SVG-элемента в RSC на money page.
3. **Картинки**: srcset всех кадров галереи передаётся в клиентский `ProjectGalleryCarousel` пропсом (etten-leur: T-строка 22 КБ со srcset плюс отрисованная сетка 41 КБ). Карточки 20 проектов на `/onze-werken/` дают строку RSC 44 КБ.
4. **Дублированные варианты mobile/desktop** (см. §4.2) и навбар с двумя меню.
5. **JSON-LD** — второй раз как T-строка (2–8 КБ): LocalBusiness 2,1 КБ на каждой странице плюс FAQPage и Service.
6. Крупные пропсы клиентских компонентов: `GevelAfwerkingGids` finishes 7 КБ (sierpleister), `faqContent`/`werkwijzeContent` на хабе. Весь текст из пропсов виден и в HTML: скрытого в пропсах текста нет (проверено).

## 3. Блоки по страницам

Колонки: порядок · блок (компонент, файл) · S/C · интерактив · HTML-вес · свой JS (модуль в page-чанке) · SEO.

### `/` — HTML 227 КБ, DOM 1164, 737 слов; page-чанк `6889bb` 60 КБ
| # | Блок | S/C | Интерактив | HTML | JS | SEO |
|---|---|---|---|---|---|---|
| 1 | HeroSection `components/hero-section.tsx` | S (+PriorityImage C) | — | 10,1 КБ | — | H1; claims «1200+ / 25 jr» (BACKLOG) |
| 2 | TrustStrip `components/trust-strip.tsx` | S + GoogleRatingBadge C | — | 2,6 | 0,8 | повтор на 38 стр.; рейтинг в HTML = «Google reviews» (цифры только JS) |
| 3 | EticsSection `components/etics-section.tsx` | S | — | 13,3 | — | уникален; 3 скрытых desktop-only эл. |
| 4 | ServicesSection → `services-showcase.tsx` | C | hover/tabs услуг | 19,1 | 4,6 | **mobile+desktop дубль** («Binnen strak & sausklaar» ×2) |
| 5 | ProcessSection → `process-steps.tsx` | C | степпер | 11,8 | 5,6 | **дубль** mobile/desktop; «Offerte binnen 48 uur» (claim); тот же блок на /diensten/ |
| 6 | PortfolioSection `portfolio-section.tsx` + ProjectCard/ClientImage | S+C | — | 10,7 | 0,5 | 4 ссылки на проекты — ок |
| 7 | ReviewsSection → `google-reviews.tsx` | C | карусель, fetch JSON | 3,2 | 11,7 | **скелет, 12 слов, H2; тексты только JS** |
| 8 | WorkAreaSection `work-area-section.tsx` | C | SVG-карта с hover-анимацией | **15,4** | 8,9 | 39 слов; 23 города **без ссылок** на 21 городскую страницу |
| 9 | FaqSection `components/faq-section.tsx` | C | аккордеон | 8,2 | 4,8 | ответы в HTML (свёрнуты) + в JS + в FAQPage JSON-LD (3 копии) |
| 10 | StickyCTABar `sections/gevelisolatie/sticky-cta-bar.tsx` | C | появляется после hero | 0 (SSR null) | 3,7 | — |
| 11 | QuoteModal `quote-modal.tsx` | C | модалка, Turnstile | **7,1** | 11,3 | скрыта opacity-0, но в DOM: H2 + форма |

### `/gevelisolatie/` (хаб) — HTML 386 КБ, DOM 1855, 2026 слов; page-чанк `7dc7c2` 74 КБ
| # | Блок | S/C | Интерактив | HTML | JS | SEO |
|---|---|---|---|---|---|---|
| 1 | GevelisolatieHero `sections/gevelisolatie/hero-gevelisolatie.tsx` | S | — | 10,9 | — | H1 |
| 2 | TrustStrip | S | — | 2,6 | — | boilerplate |
| 3 | TOC nav (inline в page) | S | — | 4,4 | — | + StickyToc C 1,4 КБ |
| 4 | WatIsEticsSection | S | — | 11,3 | — | уникален |
| 5 | VoordelenSection | S | — | 4,7 | — | уникален |
| 6 | WaaromBmKlusSection `sections/gevelisolatie/waarom-bm-klus-section.tsx` | S | — | 8,6 | — | **повтор на 27 стр.** (меняется только subtitle) |
| 7 | KostenSection | S | — | 9,1 | — | уникален, без цен |
| 8 | WerkwijzeSection `werkwijze-section.tsx` | C | табы/шаги + мини-FAQ | 14,6 | 7,8 | **~330 слов JS-only** (детали шагов, «Hoe lang duurt de opname?» и др.); mobile/desktop дубль |
| 9 | AfwerkingenSection → `afwerkingen-interactive.tsx` | C(в S) | табы | 13,2 | 7,4 | дубль mobile/desktop |
| 10 | MaterialenSection → `materialen-interactive.tsx` / `materialen-vergelijking.tsx` | C(в S) | табы, сравнение | 11,0 | 7,7 | дубль («λ 0,031–0,038» ×2) |
| 11 | RcWaardeDikteSection | S | — | 5,1 | — | |
| 12 | DetailsKoudebruggenSection → `details-koudebruggen-interactive.tsx` | C(в S) | табы | 8,8 | 4,3 | дубль |
| 13 | SubsidieVergunningSection | S | — | 9,2 | — | |
| 14 | VerdiepingSection | S | карточки-ссылки | 10,0 | — | 59 слов; 10 SVG |
| 15 | ReviewsSection | C | — | 3,2 | 11,7 | скелет |
| 16 | FaqSection `sections/gevelisolatie/faq-section.tsx` | C | аккордеон + фильтр по темам | **19,3** | 3,6 + данные 5,4 | 529 слов; 3 копии текста |
| 17 | MeerInformatieSection «Gerelateerde pagina's» | S | — | **14,3** | — | 55 слов, 13 SVG; единственное место со ссылками на города |
| 18 | StickyCTABar, QuoteModal | C | | 7,1 | 15 | |

### `/buiten-stucwerk/` — HTML 296 КБ, 1810 слов; чанк `d6d9fd` 65 КБ. Контент прямо в `app/buiten-stucwerk/page.tsx` (S)
Hero (inline S, 11,4; GoogleRatingBadge) → TrustStrip → TOC (4,9) → «Wat is» (4,3) → Voordelen (8,1) → **WaaromBmKlus (8,6, boilerplate)** → Kosten (9,2) → **WerkwijzeStepper `app/buiten-stucwerk/werkwijze-stepper.tsx` C, 6,5 КБ JS, детали шагов JS-only** → Materialen (5,9) → **AfwerkingKeuzehulp `sections/buiten-stucwerk/AfwerkingKeuzehulp.tsx` C 8,8 КБ JS — квиз; в HTML 20 слов, результаты JS-only** → Ondergronden (2,7) → **NadelenSwitcher `nadelen-switcher.tsx` C 5,3 КБ — переключатель; советы JS-only** → Reparatie (3,6) → ETICS (2,4) → Reviews (скелет) → FAQ `faq-accordion.tsx` C 1,6 КБ + данные 5,8 КБ (17,1 HTML, 574 слова) → related links → Sticky/Quote. **JS-only всего ≈ 440 слов** — самый большой объём скрытого текста на сайте.

### `/sierpleister/` — HTML 391 КБ (самый тяжёлый), DOM 1871; чанк `fe88a2` 71 КБ
Hero (11,8) → TrustStrip → TOC → «Wat is» (11,4) → **GevelAfwerkingGids → `GevelAfwerkingGidsInteractive.tsx` C: 834 строки, 21 КБ JS, 33,5 КБ HTML — фильтры (структура/система/уход), поиск, сравнение, модалка деталей; пропсы 7 КБ в RSC** → Voordelen (10,7) → Kosten (11,8; «richtprijs» — BACKLOG) → **WaaromBmKlus (boilerplate)** → **WerkwijzeStepper C 6,7 КБ, ~275 слов JS-only** → Details (6,1) → Onderhoud (7,2) → Reparatie (10,3) → ETICS (7,3) → Reviews (скелет) → FAQ `sierpleister-faq.tsx` C (16,4, 448 слов) → Sticky/Quote. Дубль внутри страницы: «Wat kunt u verwachten» / «Gedetailleerde offerte binnen 2 werkdagen» ×2 (claim из BACKLOG, выводится дважды).

### `/gevel-schilderen/` — HTML 328 КБ, 2115 слов; чанк `f02588` 43 КБ
Контент inline в page (S): Hero → TrustStrip → TOC → Core (5,2) → Kosten (9,2) → Offerte-info (9,9) → Verfsoorten (8,7) → Voorbereiding (8,3) → Techniek (6,9) → Onderhoud (8,7) → **WaaromBmKlus** → Werkgebied (4,6) → Reviews (скелет) → FAQ `app/gevel-schilderen/faq-accordion.tsx` C: **вопросы захардкожены в клиентском модуле, 7,2 КБ JS**, в HTML 18,6 КБ / 749 слов → Sticky/Quote. JS-only текста нет. «Voor advies op maat, neem contact op.» ×3. `voorbereiding-steps.tsx` в папке не используется.

### `/gevel-schilderen/keimen/` — HTML 241 КБ, 1132 слова; чанк `bdcdda` 28 КБ
Дублирующий `<link rel=preload>` hero (BACKLOG) → Hero (11,3) → TrustStrip → TableOfContents `components/page/TableOfContents.tsx` C (3,1) → одна обёртка `below-fold` (известное отклонение): Wat is (9,7), Wanneer (6,4), Kostenfactoren (10,2), Werkwijze (5,4), FAQ `components/page/FaqAccordion.tsx` C (15,1; 533 слова), RelatedLinks (6,5) → Sticky/Quote. **Самая «чистая» money page**: нет WaaromBmKlus и Reviews, нет JS-only текста, boilerplate 1 %. Контент не трогать до 2026-10-16 (BACKLOG).

### `/muren-stucen/` — HTML 300 КБ; чанк `774f29` 50 КБ
Hero → TrustStrip → TOC → Wat is (9,0) → Behangklaar vs sausklaar (6,1) → Voordelen (7,0) → Kosten (9,6) → **WaaromBmKlus** → **WerkwijzeStepper C 6,2 КБ, ~190 слов JS-only** → Voorbereiding (6,3) → Droogtijd (6,4) → Reviews (скелет) → FAQ C (16,4; вопросы ещё и в JS 4,2 КБ) → related → Sticky/Quote. Внутри страницы 9 повторов текста (например, «Stofvrij werken…», «Vraag een offerte aan →» ×2).

### `/onze-werken/` — HTML 267 КБ, 951 слово; чанки `735c5d` 18 + `6a4423` 13 КБ
Hero (9,3) → TrustStrip → nav «Inhoud» (1,5) → «Wat u kunt verwachten» (2,2) → **ProjectsSection `components/projects/ProjectsSection.tsx` C — фильтр по услугам, 20 карточек, 72 КБ HTML, 40 img; в RSC 44 КБ (пропсы карточек со srcset)** → Onze diensten (5,2) → FAQ `page/FaqAccordion` C (7,7) → Werkgebied (2,8) → related → Sticky/Quote. В JS есть пустое состояние «Binnenkort verschijnen hier projectkaarten…», сейчас оно не показывается. `app/onze-werken/faq.tsx` не используется.

### `/diensten/` — HTML 207 КБ, 800 слов; чанк `7d264a` 57 КБ
Hero (10,3; stat-блок с GoogleRatingBadge: в HTML **«–»** вместо числа отзывов) → TrustStrip → **ServicesRail → `ServicesRailInteractive.tsx` C 14,2 КБ JS: квиз «цель → услуги» + отдельная mobile-версия с фото; 32,3 КБ HTML, дубль mobile/desktop (~86 слов ×2)**; claim «24–48 uur» (BACKLOG) → ProcessSection (`process-steps` C, дубль, копия главной) → **WaaromBmKlus** → Reviews (скелет) → FAQ `<details>` S (9,6) → Sticky/Quote. **21 % текста — повтор с ≥5 URL** (выше только города).

### `/over-ons/` — HTML 193 КБ, 669 слов; чанк `5dc079` 38 КБ
Hero (10,1) → TrustStrip → Bedrijf (3,3) → Waarom (5,1) → Diensten (9,8) → **Aanpak (10,1, тёмный блок; 4 шага дважды — mobile+desktop, ~71 слово ×2)** → Reviews (скелет) → FAQ `page/FaqAccordion` C (8,4) → Sticky/Quote. Интерактива, кроме FAQ, нет; чанк 38 КБ — почти целиком общий набор.

### `/contact/` — HTML 165 КБ, 292 слова; чанк `03390c` 40 КБ
Hero (9,7) → TrustStrip (через dynamic) → **ContactFormCard `components/contact/ContactFormCard.tsx` C, 10,8 КБ JS, 20,5 КБ HTML** → «Wat we nodig hebben» (7,8) → LazyGoogleMap C (клик «Toon kaart» — ок) + ContactOpeningHours C (2,2 КБ) (4,4) → Sticky + **QuoteModal (вторая скрытая форма на странице с формой)**. Телефон в тексте ×3.

### `/gevelisolatie/rotterdam/` (шаблон `app/gevelisolatie/[location]/page.tsx`, 21 страница) — HTML 247 КБ, 807 слов; чанк `b13a21` 37 КБ (**~32 КБ — общий набор**)
Hero (10,0; одно дордрехтское фото на всех городах — BACKLOG) → TrustStrip → Intro + факты (13,8; 9 desktop-only элементов, классы сетки собираются динамически) → **WaaromBmKlus** → Kosten (2,3; `gemiddeldBesparing` €320/€750 на 5 городах — разрешённое исключение) → «Goed om te weten in Rotterdam» (7,6, самый уникальный блок) → «Project in Rotterdam» (3,0; LazyBeforeAfterSlider C 2,5 КБ — только на 3 городах) → **«Alles over gevelisolatie» (10,6; одинаков на 21 странице)** → Reviews (скелет) → FAQ `<details>` S (6,3) → **«Ook actief in de regio» (3,2; одинаков на 21 странице)** → Sticky/Quote. **Boilerplate: 26–38 % текста `<main>` на всех 21 городе.** 13 из 21 не в индексе (BACKLOG). Шаблонность, скорее всего, одна из причин.

### Проект `/onze-werken/etten-leur-bankenstraat-gevelisolatie-dakrenovatie-2026/` — HTML 274 КБ (самый тяжёлый проект), 649 слов; чанки `735c5d` 18 + `e771af` 13 КБ
Hero (7,7) → «Wat hebben we uitgevoerd?» `WerkzaamhedenAccordion.tsx` C 3,7 КБ (9,0) → **«Voor de werken» `ProjectGalleryCarousel.tsx` C 6,1 КБ: 41 КБ HTML, 32 img (большой кадр + миниатюры), srcset всех кадров ещё и в RSC** → «Na de werken» (26,3; 18 img) → YouTubeEmbed C 2,8 КБ (фасад, ок) (3,8) → Details (3,7) → Materialen (4,3) → aside «Gerelateerde diensten» (1,6) → Sticky/Quote. Отзывов и WaaromBmKlus нет, boilerplate 4 %. Типичный проект (katwijk): 154 КБ HTML, галереи 11+9 КБ. В HTML крупно виден только первый кадр галереи, остальные — миниатюры с alt. Для SEO картинок этого достаточно.

---

## 4. Проблемы на многих страницах (по убыванию «вред SEO + вес»)

1. **Блок отзывов `ReviewsSection` → `google-reviews.tsx` (30 страниц).** В HTML только скелет: H2 «Klanten over BM klus BV» и 12 слов. Тексты отзывов грузятся fetch'ем после гидратации, поисковик их не видит. После каждого деплоя текстов нет совсем (BACKLOG): блок показывает только ссылку на Google. JS 11,7 КБ повторяется в каждом page-чанке. Плюс `google-place-cache` вшивает в каждый чанк браузерный ключ Maps и place id для «dev-only» fallback'а на Maps JS API. Если статический JSON не загрузится, посетитель дёрнет платный API (вероятность мала, **[не проверял: стоит ли ограничение ключа по referrer]**).
2. **RSC-дубль вёрстки (все страницы, +65–187 КБ HTML).** См. §2. Размер определяется количеством серверной разметки: чем больше декоративных иконок, классов и mobile/desktop-вариантов, тем тяжелее. Это главный множитель веса.
3. **Текст, спрятанный в клиентских табах и степперах (4 money page, ~1 240 слов суммарно JS-only).** Затронуты `werkwijze-stepper` ×3 (buiten-stucwerk, sierpleister, muren-stucen), `werkwijze-section` (хаб), `AfwerkingKeuzehulp`, `NadelenSwitcher`. Для поисковика этот текст теряется, хотя его писали для SEO.
4. **`WaaromBmKlusSection` на 27 страницах** (8,6 КБ HTML, ~115 слов одинакового текста, H2 + 4×H3). Отличается только subtitle. Размывает уникальность money pages и городов. В тексте «gecertificeerde materialen» и «vaste prijs per m²» (факт/формулировку лучше подтвердить у владельца — **[CLAIM_NEEDS_CONFIRMATION?]**).
5. **Шаблонность городских страниц (21 URL).** 26–38 % текста повторяется: Waarom, «Alles over gevelisolatie», «Ook actief in de regio», FAQ-шаблоны, мета-тексты hero.
6. **Общий клиентский набор копируется в каждый page-чанк** (~34 КБ сырых / ~10 КБ gzip на шаблон), а `dynamic()` не откладывает загрузку (см. §0). Сейчас бесполезны и `dynamic()`, и обёртки ради «ленивости»: код всё равно в одном чанке.
7. **Скрытая QuoteModal в DOM на 58 страницах** (7,1 КБ HTML: H2 «Offerte aanvragen», 5 полей, чекбокс, honeypot; `opacity-0 pointer-events-none`, без `inert`/`hidden`). Каждой странице добавляется лишний H2 и 35 слов формы, а поля, скорее всего, достижимы с клавиатуры (Tab) при закрытой модалке **[a11y — проверить в браузере]**. На `/contact/` получается две формы.
8. **Двойной рендер mobile + desktop** (текст виден дважды в DOM, один вариант скрыт `hidden`/`lg:hidden`): navbar (все страницы, 24 ссылки вместо 11), `services-showcase` и `process-steps` (главная; process-steps ещё и на /diensten/), `ServicesRailInteractive` (/diensten/), «Onze aanpak» (/over-ons/), табы хаба (werkwijze, afwerkingen, materialen, details). Вес — десятки КБ HTML плюс их копия в RSC. SEO-вред умеренный: повтор фраз, лишние H3.
9. **Inline SVG-иконки lucide в серверной вёрстке**: 43–133 штуки на странице, 17–52 КБ HTML плюс 8–32 КБ в RSC. В основном декоративные галочки и стрелки в каждом пункте списка.
10. **FAQ в трёх копиях** на страницах, где вопросы захардкожены в клиентском модуле: HTML + JS-чанк + FAQPage JSON-LD (главная, gevel-schilderen, buiten-stucwerk, sierpleister, muren-stucen, хаб). Для SEO вреда нет, лишний вес JS — 2–7 КБ.
11. **Плейсхолдеры в HTML**: GoogleRatingBadge рендерит «Google reviews» / «–», а числа подставляются только в JS (TrustStrip на 38 стр., hero-плашки, stat-блок /diensten/, где в HTML стоит «–» под подписью «Reviews»). Сам по себе вред мал, но в HTML виден пустой счётчик. Подпись «Google Maps» рядом с рейтингом отсутствует (BACKLOG).
12. **H2 в футере** «Laat uw gevel transformeren.» на всех страницах (`components/footer.tsx:84`): лишний шаблонный заголовок в структуре каждой страницы.
13. **WorkAreaSection на главной**: 15 КБ HTML и 8,9 КБ JS ради декоративной SVG-карты; 23 города показаны без ссылок на 21 существующую городскую страницу (упущенная перелинковка). На города сейчас ссылается только хаб (MeerInformatie).

Мёртвый код (подтверждаю BACKLOG, новые находки отмечены *): `components/cta-section.tsx`, `app/onze-werken/faq.tsx`, `components/sections/related-projects.tsx`, `components/theme-provider.tsx`, *`components/seo/Breadcrumbs.tsx`, *`app/gevel-schilderen/voorbereiding-steps.tsx`, `components/ui/*`. В сборку они не попадают (вес не добавляют), это только шум в репозитории.

---

## 5. Кандидаты для проекта облегчения

| Блок | Решение | Почему |
|---|---|---|
| ReviewsSection / google-reviews (30 стр.) | **Упростить → серверный** (тексты отзывов из `google-place.json` на этапе сборки) **или убрать** со страниц, оставив 1–2 места | сейчас в HTML пусто, после деплоя блок пустой, 11,7 КБ JS × каждый шаблон. Сначала починить секрет в env сборки (BACKLOG). Важно: разметку Review не возвращать |
| WaaromBmKlusSection (27 стр.) | **Убрать** с городов и дочерних; на money pages **заменить** 1–2 строками или уникальным текстом | чистый boilerplate + claims |
| WerkwijzeStepper ×3, werkwijze-section хаба | **Сделать серверными**: все шаги открытым списком (`<ol>`) или `<details>` | ~800 слов уходят из индекса; −6–8 КБ JS на страницу |
| AfwerkingKeuzehulp, NadelenSwitcher (buiten-stucwerk) | **Упростить**: статическая таблица или список; квиз убрать | JS-only текст, 14 КБ JS |
| GevelAfwerkingGidsInteractive (sierpleister) | **Упростить** до серверных карточек или таблицы (фильтры, поиск и сравнение для 6 текстур избыточны) | 21 КБ JS, 33 КБ HTML + 7 КБ RSC |
| ServicesRailInteractive (/diensten/) | **Упростить** до серверного списка услуг, один вариант для всех ширин | 14 КБ JS, дубль mobile/desktop |
| services-showcase, process-steps (главная, /diensten/) | **Сделать серверными**, один адаптивный вариант | двойной рендер, клиентский JS без реальной нужды |
| afwerkingen / materialen / details-koudebruggen interactive (хаб) | **Упростить** (хаб и так ссылается на дочерние страницы) | дубли, 19 КБ JS |
| WorkAreaSection (главная) | **Заменить** серверным списком городов **со ссылками** на городские страницы; карту убрать или сделать статичным SVG/изображением | 24 КБ, 0 ссылок |
| QuoteModal | **Оставить, но не рендерить форму в DOM до открытия** (монтировать по событию/хэшу) и вынести из page-чанков в общий lazy-чанк; на `/contact/` не подключать | −7 КБ HTML/стр., лишний H2, a11y |
| StickyCTABar | **Оставить** (SSR null, 3,7 КБ). Вынести в layout или общий чанк, чтобы не копировался | главный CTA по правилам |
| Navbar | **Оставить; упростить** mobile-меню (рендерить при открытии) | −~6–8 КБ HTML на каждой странице **[оценка]** |
| Footer H2, соцссылки | **Упростить**: H2 → `<p>` | шаблонный заголовок на 61 стр. |
| Декоративные lucide-иконки в списках | **Упростить**: CSS-маркеры (`::before`) или одна SVG через `<use>` | 17–52 КБ HTML + до 32 КБ RSC |
| Города: «Alles over gevelisolatie», «Ook actief in de regio» | **Сократить** до короткого списка ссылок; усилить уникальный блок «Goed om te weten» | 26–38 % boilerplate; решение по Wave 1 — за владельцем |
| TrustStrip | **Оставить** (2,6 КБ); рейтинг рендерить в HTML из JSON сборки | в HTML сейчас плейсхолдер |
| FAQ-аккордеоны (5 разных реализаций: `faq-section`, `gevelisolatie/faq-section`, `app/*/faq-accordion` ×3, `sierpleister-faq`, `page/FaqAccordion`) | **Свести к одному** серверному `<details>` (как на городах и /diensten/) | −2–7 КБ JS на страницу, один код |
| ProjectGalleryCarousel, WerkzaamhedenAccordion, YouTubeEmbed (проекты) | **Оставить** (реально нужны, лёгкие); srcset лайтбокса можно не передавать целиком **[проверить]** | галерея — суть кейса |
| ProjectsSection (onze-werken) | **Оставить**, фильтр допустим; вес — от 20 карточек | все карточки в HTML, SEO ок |
| ContactFormCard, LazyGoogleMap, ContactOpeningHours | **Оставить** | работают, карта уже по клику |
| TableOfContents / StickyToc | **Оставить** (1,5–1,6 КБ) | ок |
| keimen, sausklaar, rc-waarde-dikte, kosten, materialen, subsidie | **Не трогать** в первой волне: boilerplate 1–2 % (эталон «лёгкой» страницы); keimen заморожен до 2026-10-16 | |
| Мёртвые файлы (§4) | **Удалить** отдельной задачей | шум |

Порядок по эффекту (моя оценка): (1) отзывы и WaaromBmKlus — сразу убирают boilerplate и пустые блоки на 27–30 URL; (2) степперы, табы и квизы → серверные — возвращают ~1 200 слов в индекс и срезают 30–60 КБ JS на money pages; (3) модалка и mobile-меню не в DOM, минус декоративные иконки — −20–60 КБ HTML на каждой странице через RSC; (4) города — после решения по Wave 1.

## 6. Что не проверено / неточно
- Разбор чанков — эвристика по id модулей Turbopack. Названия модулей определены по уникальным строкам: общий бандл и крупные модули — надёжно, мелкие — примерно.
- «JS-only» считался по строкам ≥5 слов из JS-чанков, которых нет в тексте HTML. Туда попадают и служебные сообщения формы (не SEO). Цифры по слову — порядок величины.
- То, что `dynamic()` не даёт отдельного чанка, установлено по составу чанков этой сборки (Next 16 + Turbopack). Причину в документации Next не сверял.
- Доступность скрытой модалки с клавиатуры и визуальную правку не проверял: браузер не запускал.
- Ограничение Maps-ключа по referrer не проверял (к консоли Google доступа нет).

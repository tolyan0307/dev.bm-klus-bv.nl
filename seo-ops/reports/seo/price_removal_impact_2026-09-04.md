# Удаление цен и калькуляторов с сайта — карта данных и оценка SEO-риска

**Дата:** 2026-09-04 · **Роль:** SEO analytics operator · **Слой:** read-only, код не менялся
**Запрос:** заказчику не нравятся блоки с ценами и калькуляторы; нужно убрать с минимальными последствиями для SEO.
**Источники:** grep по `app/`, `components/`, `lib/content/`, `data/`; GSC query×page 90d (2026-06-06…2026-09-03) через MCP; GSC index inspect; GA4 landing pages 28d/90d (`seo-ops/snapshots/normalized/pages/`); PPC review `seo-ops/reports/ppc/ppc_review_campaign_23271040037_last30d.md`; curl по production.

---

## 0. Вывод в трёх строках

1. **Цены на сайте сейчас почти не приносят органического трафика.** За 90 дней price-intent запросы (prijs / kosten / wat kost / per m2) дали **~2 800 показов и 1 клик** из ~250 органических кликов сайта. Почти все эти показы — позиции 20–45 (страница 3+).
2. **Весь реальный риск сосредоточен в двух местах:** страница `/gevelisolatie/kosten/` (проиндексирована, 17 внутренних ссылок, посадочная в Ads) и **27 title-тегов** с модификатором «prijs per m²». Всё остальное (калькуляторы, hero-чипы «Vanaf €», таблицы richtprijzen, JSON-LD offers) можно убирать с нулевым измеримым риском.
3. **Принцип минимального ущерба:** убираем *цифры и виджеты*, но сохраняем *тему «kosten»* (H2, kostenfactoren, prijsopbouw, FAQ-вопросы «Wat kost…?» с качественными ответами). Google ранжирует за покрытие темы, а не за наличие числа «€110».

Уверенность: **высокая** для «сейчас цены не дают кликов»; **средняя** для долгосрочного эффекта (окно 90 дней, сайт маленький, сигналы слабые).

---

## 1. Карта: где на сайте цены и калькуляторы

### 1.1 Интерактивные калькуляторы (2 шт.)

| # | Компонент | Где рендерится | Что показывает | SEO-данные страниц |
|---|-----------|----------------|----------------|--------------------|
| K1 | `components/sections/gevelisolatie/kosten-calculator.tsx` | `/gevelisolatie/` (внутри `kosten-section.tsx`) + **все 21 городских страниц** `/gevelisolatie/[city]/` | Выбор типа дома × отделка → «Indicatie totaal €X–€Y», ставки €110–165 / 120–180 / 200–280 per m² | Рендерится в SSR-HTML (проверено curl на `/gevelisolatie/rotterdam/`). Городские страницы: 0 кликов по price-запросам |
| K2 | `components/sections/gevelisolatie/rc-waarde-dikte-calculator.tsx` | `/gevelisolatie/rc-waarde-dikte/` | Слайдер Rc-waarde → толщина EPS/PIR/wol. **Не ценовой**, но «подобный» | 58 показов, 0 кликов, 2 запроса за 90d |

### 1.2 Выделенная ценовая страница

**`/gevelisolatie/kosten/`** — единственная страница, у которой цена является *сутью*:
- H1 про kosten, hero-чип «Vanaf €110/m²», карточки richtprijzen (€110–200 / €200–280), **3 voorbeeldscenario's с суммами** (€3.500–10.000, €9.000–26.000, €12.000–25.000), FAQ с цифрами, JSON-LD `AggregateOffer lowPrice 110 / highPrice 280`.
- Title `Kosten gevelisolatie buiten – prijs per m²`, description «Wat kost buitengevelisolatie per m²? …».
- GSC 90d: **608 показов, 5 кликов, ср. позиция 20.1**. ~45 % показов — price-запросы (`gevelisolatie kosten` 102 imp @ 33, `vliesgevel prijs per m2` 64 @ 29, `kosten gevelisolatie` 34 @ 37) — **0 кликов** с них. Единственный клик — `gevelisolatie met stucwerk`.
- GA4 28d: 8 сессий, engagement 25 %, **0 key events**. Ads: 19 paid-сессий за 90d, 2 за 28d; ad group «Kosten & Prijs» — 4 показа, €0.87.
- Индекс: PASS, last crawl 2026-08-15, rich results = Breadcrumbs + Review snippets (**AggregateOffer в rich results не участвует**).
- Внутренние ссылки на неё: 12 файлов, из них `[location]/page.tsx` ×2 (=42 ссылки на 21 странице), `kosten-section` ×3, `afwerkingen` ×2, `materialen` ×2, по одной из `gevelisolatie/page`, `rc-waarde-dikte`, `subsidie-vergunning`, `etics-section`, `verdieping-section`, `wat-is-etics-section`. Плюс 12 FAQ-ответов в городском контенте отсылают «bekijk de richtprijzen op onze kostenpagina».

### 1.3 Hero-чипы «Vanaf €X/m²» (6 страниц)

| Страница | Файл:строка | Чип |
|----------|-------------|-----|
| `/gevelisolatie/` | `components/sections/gevelisolatie/hero-gevelisolatie.tsx:64` | Vanaf €110/m² |
| `/gevelisolatie/kosten/` | `app/gevelisolatie/kosten/page.tsx:342` | Vanaf €110/m² |
| `/buiten-stucwerk/` | `app/buiten-stucwerk/page.tsx:179` | Vanaf €35/m² |
| `/gevel-schilderen/` | `app/gevel-schilderen/page.tsx:215` | Vanaf €25/m² |
| `/muren-stucen/` | `app/muren-stucen/page.tsx:197` | Vanaf €8/m² |
| `/sierpleister/` | `app/sierpleister/page.tsx:221` | Vanaf €50/m² |

Городские страницы: чип «Prijsindicatie: zie kostenpagina» (без цифры), в фактах «Prijsindicatie: na opname».

### 1.4 Секции «Kosten … (prijs per m²)» с таблицами richtprijzen

| Страница | Источник контента | Цифры |
|----------|-------------------|-------|
| `/gevelisolatie/` | `lib/content/gevelisolatie.ts:145-200` (`kostenContent`) | 2 карточки €110–200 / €200–280; FAQ-ответ стр. 520 с цифрами |
| `/buiten-stucwerk/` | `lib/content/buiten-stucwerk.ts:98-116, 292-294` | 4 строки €50–110/m² + надбавки €10–20; FAQ с цифрами |
| `/gevel-schilderen/` | `lib/content/gevel-schilderen.ts:83-84, 257` + `app/gevel-schilderen/page.tsx:419-431` (таблица price: «€25–40», «€30–50», «Op aanvraag») | 2 строки + FAQ |
| `/sierpleister/` | `lib/content/sierpleister.ts:160-164` | 2 строки €50–95 / €55–105 |
| `/muren-stucen/` | `lib/content/muren-stucen.ts:131-145, 244` | H2 и FAQ «Wat kost…» есть, **цифр в файле нет** (только hero-чип €8) |
| `/gevelisolatie/[city]/` | `app/gevelisolatie/[location]/page.tsx:498-530` | Блок €110–200 / €200–280 **только для dordrecht**; у остальных — только калькулятор K1 |

### 1.5 Подстраницы с `PriceCards` (не задеплоены)

| Страница | Цифры | Статус |
|----------|-------|--------|
| `/gevel-schilderen/keimen/` | PriceCards €25–40 / €30–50, чип «Richtprijs €25–50/m²», FAQ «€750 tot €2.500», offers lowPrice 25 | **404 на production**, GSC «URL is unknown to Google» |
| `/muren-stucen/sausklaar-behangklaar/` | PriceCards €10–22 / €15–30, чипы, FAQ, **meta description с € в тексте** (`data/sitemap-plan.ts:149`), offers lowPrice 10 | **404 на production**, «URL is unknown to Google» |

Обе страницы из коммита `0e1f8c3` (B1/B2), который запушен, но не задеплоен (см. weekly 2026-09-04). SEO-история у них нулевая → правки бесплатны.

### 1.6 Метаданные с ценовыми словами

| Группа | Кол-во | Пример |
|--------|--------|--------|
| Title «… – ETICS prijs per m²» / «Gevelisolatie prijs …» | **21** городских (`lib/content/gevelisolatie-locations.ts`) | `Gevelisolatie Rotterdam – ETICS prijs per m²` |
| Title money pages | 5 | `Gevelisolatie buitenkant (ETICS) – prijs per m²`, `Buitenmuur stucen (gevel stucen) – prijs per m²`, `Gevel schilderen: kosten per m² & offerte`, `Gevel sierpleister (…) – prijs`, `Kosten gevelisolatie buiten – prijs per m²` |
| Title подстраниц | 2 | keimen, sausklaar |
| Description | ~8 | «Kosten per m² na gratis opname», «Richtprijzen per m²», «Opname op locatie en offerte per m²» (21 городских), sausklaar с €-числами |

Итого **27 живых title** с ценовым модификатором + 1 с «kosten» без «prijs» (`muren-stucen` — чистый).

### 1.7 Структурированные данные

- `lib/seo/schema.ts:123-130` — `serviceSchema()` добавляет `offers: AggregateOffer {lowPrice, highPrice, EUR, per m²}`, если переданы `lowPrice/highPrice`. Передают **9 файлов**: `gevelisolatie/page` (110), `[location]/page` (110 → все 21), `kosten/page` (110), `buiten-stucwerk` (35), `gevel-schilderen` (25), `keimen` (25), `sierpleister` (50), `muren-stucen` (8), `sausklaar` (10).
- `LocalBusiness.priceRange: "€€"` (`schema.ts:52`) — стандартное нечисловое поле, **оставить**.
- `data/services.ts:38 priceRange: "€110 – €280 / m²"` — нигде не рендерится (мёртвое поле).
- FAQPage schema берёт ответы из тех же FAQ-массивов → цифры в ответах попадают в JSON-LD.

### 1.8 Микро-упоминания (UI-лейблы, не ранжирующий контент)

- `components/trust-strip.tsx:9` — пункт «Prijs per m²» с иконкой Calculator; TrustStrip стоит на **всех 20+ страницах**.
- `components/sections/gevelisolatie/verdieping-section.tsx:8` — карточка «Kosten & prijs per m²» → `/kosten/`.
- `components/etics-section.tsx:71` — ссылка «Kosten & prijzen».
- `app/gevelisolatie/afwerkingen/page.tsx:108-180, 792` — относительная шкала бюджета «€ / €€ / €€€» в таблице отделок (не цены).
- `components/sections/gevelisolatie/werkwijze-section.tsx:15-16` — «offerte met prijs per m²» (описание процесса, безобидно).
- `components/services/ServicesRail.tsx` — фразы «Prijs hangt af van…» (без цифр).
- `lib/content/gevelisolatie-locations.ts` `gemiddeldBesparing` ×21 — «Indicatief €600–€900/jaar besparing (bron: Milieu Centraal)». Это **экономия клиента, не наша цена**. Формально не входит в запрос, но заказчик может воспринимать как «цены» — уточнить.

---

## 2. Что говорят данные GSC (90d, 2026-06-06…2026-09-03)

### 2.1 Price-intent запросы по страницам

| Страница | Всего imp / clicks / pos | Price-intent imp | Price-intent clicks | Позиции price-запросов |
|----------|--------------------------|------------------|---------------------|------------------------|
| `/gevel-schilderen/` | 4 496 / 3 / 36.2 | **~2 130** (47 %) — семейство «keimen kosten / keim prijs per m2 / keimwerk kosten» | 0 | 25–46 |
| `/gevelisolatie/kosten/` | 608 / 5 / 20.1 | ~270 (45 %) | 0 | 22–38; `wat kost crepi per m2` @ 10.1 (11 imp) |
| `/buiten-stucwerk/` | 2 338 / 5 / 8.1 | ~205 (9 %) | **1** (`buitengevel isoleren en stucen prijs` 153 imp @ 10.7) | 10–28 |
| `/sierpleister/` | 543 / 9 / 16.6 | ~9 | 0 | 20–45 |
| `/gevelisolatie/` | 1 111 / 13 / 12.9 | ~3 | 0 | — |
| `/muren-stucen/` | 4 259 / 1 / 27.9 | 1 | 0 | — |
| 21 городских | суммарно ~1 000 imp / 5 clicks | **0** | 0 | — (ни один price-запрос не привёл к показу городской страницы) |

Итого: **~2 800 показов, 1 клик** по price-intent за 90 дней при ~250 кликах сайта (0.4 %).

### 2.2 Интерпретация

- Модификатор «prijs per m²» в 21 городском title **не генерирует ни одного показа по ценовым запросам**. Городские страницы показываются по «gevelisolatie {город}». Убрать модификатор — потеря ≈ 0.
- Ценовой кластер «keimen kosten» (2 000+ показов) сидит на позициях 25–46 у `/gevel-schilderen/`. Это единственный «теоретический upside», от которого отказываемся. Но: страница keimen, которая должна была его закрывать, не задеплоена, и 90 дней на позиции 30+ показывают, что таблица €25–50 сама по себе не вытянула. Upside существовал только на бумаге.
- Единственный price-запрос вблизи 1-й страницы — `buitengevel isoleren en stucen prijs` @ 10.7 на `/buiten-stucwerk/` (1 клик за 90d). Ранжирование этой страницы держится на «buitenmuur stucen» @ 8.75 и брендовых — не на цене. Этот запрос = контрольная точка после изменений.
- Ads: посадочные — `/gevelisolatie/afwerkingen/` (115 сессий 90d), `/gevelisolatie/` (78), `/buiten-stucwerk/` (57). `/kosten/` — 19 сессий 90d, 2 за 28d. Ad group «Kosten & Prijs» практически не крутится. Риск для Quality Score от удаления цен на посадочных — низкий; тексты объявлений в репо не хранятся, **проверить в Ads-аккаунте, нет ли в headlines «vanaf €110»** (иначе появится расхождение объявление↔страница).
- Сторонний сигнал (низкая уверенность): 8 сессий за 28d с `chatgpt.com / ai-assistant`. LLM-ответы охотнее цитируют страницы с конкретными диапазонами. Удаление цифр может снизить цитируемость. Измерить нечем, отмечено как допущение.

---

## 3. Оценка риска по каждому элементу

| Элемент | Риск SEO | Почему | Что сделать вместо удаления «в ноль» |
|---------|----------|--------|--------------------------------------|
| K1 калькулятор на `/gevelisolatie/` + 21 city | **нулевой** | JS-виджет, 0 кликов по price-запросам, дублирует цифры секции | Просто удалить `<KostenCalculator />` (2 места) + фразу «Gebruik de calculator hieronder» в callout и в intro city-страниц |
| K2 Rc-калькулятор | **нулевой** | 58 imp / 0 clicks | Удалить виджет, оставить текстовую таблицу толщин (`lib/constants/rc-waarde.ts` можно вывести статически) |
| Hero-чипы «Vanaf €» ×6 | **нулевой** | UI-элемент, не ранжирующий | Заменить на «Gratis opname & offerte» / «Offerte na opname op locatie» |
| Dordrecht price-блок | **нулевой** | 1 imp / 0 clicks на странице | Удалить условный блок |
| JSON-LD `AggregateOffer` ×9 | **нулевой** (обязательно) | Не участвует в rich results; после удаления видимых цен схема с ценами станет несоответствием | Не передавать `lowPrice/highPrice` (offers не эмитятся автоматически) |
| PriceCards keimen / sausklaar | **нулевой** | 404, не в индексе | Убрать PriceCards, цифры из FAQ и из description sausklaar **до деплоя** |
| Таблицы richtprijzen на 4 money pages | **низкий** | Цифры не дают кликов; тема «kosten» сохраняется через H2 + kostenfactoren + prijsopbouw + FAQ | Удалить карточки и цифры из FAQ-ответов; H2 переименовать «Kosten … (prijs per m²)» → «Wat bepaalt de kosten van …?»; ответ FAQ «Wat kost X?» → качественный (факторы + «prijs na gratis opname, offerte binnen N dagen») |
| Trust-strip «Prijs per m²», verdieping/etics-лейблы | **нулевой** | Лейблы | «Gratis opname» / «Kosten & offerte» |
| Шкала «€/€€/€€€» на afwerkingen | нулевой | Относительная | Если заказчик считает ценой — «Laag / Gemiddeld / Hoog» |
| `gemiddeldBesparing €/jaar` ×21 | нулевой | Экономия, источник Milieu Centraal | Оставить; спросить заказчика отдельно |
| **`/gevelisolatie/kosten/` как страница** | **средний** | Единственный URL, где цена = суть; индексирован; 42+ внутренних ссылок; посадочная Ads | См. §4, волна 2 — репозиционировать, не удалять |
| **27 title с «prijs per m²»** | **средний (процедурный)** | Трафика модификатор не даёт, но одновременная смена 27 title = массовая переоценка и потеря атрибуции | Менять отдельной волной, после стабилизации контентных правок |

---

## 4. План внедрения волнами

Принцип: **сначала бесплатное, потом единственное спорное, title — последними и отдельно.** Между волнами 3–4 недели, чтобы GSC успел показать эффект.

### Волна 0 — нулевой риск (один деплой)
1. Удалить `<KostenCalculator />` из `kosten-section.tsx:155` и `[location]/page.tsx:533`; убрать упоминания калькулятора в тексте (`kosten-section.tsx` callout, `[location]/page.tsx:498-502`).
2. Удалить `<RcWaardeDikteCalculator />` (`rc-waarde-dikte/page.tsx:544`), заменить статической таблицей из констант.
3. Заменить 6 hero-чипов «Vanaf €X/m²».
4. Удалить dordrecht-блок `[location]/page.tsx:504-530`.
5. Убрать `lowPrice/highPrice` из 9 вызовов `serviceSchema()`.
6. Trust-strip «Prijs per m²» → «Gratis opname»; лейблы verdieping / etics-section.
7. Keimen + sausklaar: убрать PriceCards, цифры в FAQ, чипы, description sausklaar в `data/sitemap-plan.ts:149` — **до того, как коммит 0e1f8c3 задеплоят**.
8. Удалить мёртвое `data/services.ts:38 priceRange`.

Ожидаемый эффект на органику: не измерим (≈0).

### Волна 1 — низкий риск (через 1–2 недели после волны 0)
Money pages `/gevelisolatie/`, `/buiten-stucwerk/`, `/gevel-schilderen/`, `/sierpleister/` + таблица `gevel-schilderen/page.tsx:419-431`:
- убрать карточки richtprijzen и суммы; **оставить** H2 «Kosten» (переформулировать без «prijs per m²»), списки kostenfactoren / prijsopbouw / «wat zit er in», FAQ-вопросы «Wat kost … per m²?» с ответами без цифр.
- Обновить governance: `60-decisions-and-bans.md §Hardcoded prices`, `70-page-type-checklists.md` («Price teaser», «Kosten (price range…)»), `GLOBAL_SEO_CONTENT_RULES.md §10`.

Контрольные точки: `/buiten-stucwerk/` по `buitenmuur stucen` (8.75) и `buitengevel isoleren en stucen prijs` (10.7); `/gevelisolatie/` по core-запросам (12.9).

### Волна 2 — единственное спорное решение: `/gevelisolatie/kosten/`
**Рекомендация: вариант A — оставить URL, репозиционировать.**
- Убрать: hero-чип, карточки richtprijzen, суммы в voorbeeldscenario's (сами сценарии можно оставить как «что влияет на цену у рядного дома / углового / 2-onder-1-kap»), цифры в FAQ, offers.
- Оставить: kostenfactoren, «wat zit erin», besparen-tips, процесс offerte, FAQ.
- Title: `Kosten gevelisolatie buiten – prijs per m²` → `Kosten gevelisolatie buiten: wat bepaalt de prijs?` (слово «kosten» сохраняем — это #1 запрос страницы, 102 показа).
- 12 городских FAQ-ответов «bekijk de richtprijzen op onze kostenpagina» → «lees welke factoren de prijs bepalen».
- Цена: потеря ≈ 270 показов/90d с 0 кликов. Клики (5/90d) идут с не-ценовых запросов и, вероятно, сохранятся.

Вариант B (удалить + 301 на `/gevelisolatie/#kosten`) — **не рекомендуется сейчас**: 42+ ссылок на правку, посадочная Ads, «kosten»-тема потеряет отдельный URL. Пересмотреть через 8–12 недель, если репозиционированная страница останется на 0 кликов.

### Волна 3 — title/description (отдельно, через 3–4 недели после волны 1)
- 21 городских: `Gevelisolatie {City} – ETICS prijs per m²` → `Gevelisolatie {City} – ETICS buitengevelisolatie` (или «…kosten & offerte», если тема kosten остаётся в теле). Батчем — трафик городских низкий, атрибуция не пострадает.
- 5 money pages — по одной, с недельным интервалом; description «Richtprijzen per m²» → «Kosten na gratis opname».
- Не трогать `/muren-stucen/` (уже без «prijs»).

---

## 5. Что НЕ убирать (аргумент для заказчика)

- H2-секции «Kosten» и списки факторов — это покрытие темы, за которое Google показывает страницу по «gevelisolatie kosten» (102 показа, единственный запрос с потенциалом на `/kosten/`).
- FAQ-вопросы «Wat kost …?» — вопрос остаётся, ответ становится качественным. FAQPage schema продолжает работать.
- `LocalBusiness.priceRange "€€"` — стандартное поле, без чисел.
- Ссылка «Kosten & offerte» в навигации кластера — нужна для внутренней перелинковки `/kosten/`.

---

## 6. Измерение до/после

Baseline зафиксирован в этом отчёте (§2.1) и в `seo-ops/reports/seo/gsc_query_page_snapshot_last90d.md` (обновлён 2026-09-04). После каждой волны — `/seo-refresh` и сравнение:
- `/gevelisolatie/kosten/`: clicks, позиция `gevelisolatie kosten`, `kosten gevelisolatie`.
- `/buiten-stucwerk/`: позиция `buitenmuur stucen`, `buitengevel isoleren en stucen prijs`.
- Сумма кликов 5 money pages и 21 city.
- GA4: key events по landing `/gevelisolatie/`, `/buiten-stucwerk/`, `/gevelisolatie/afwerkingen/` (Ads-посадочные) — CRO-эффект от исчезновения цен важнее SEO-эффекта и не измерен заранее.
- Ads: проверить headlines/descriptions на «€» до волны 0.

## 7. Ограничения анализа

- Окно 90 дней и ~250 кликов — низкая статистическая мощность; «0 кликов» ≠ «никогда не будет».
- Тексты объявлений Google Ads и GTM-контейнер вне репозитория — проверка вручную.
- Эффект на конверсию (пользователь, не видящий цены, звонит или уходит) данными не подтверждается ни в одну сторону.

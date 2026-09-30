# Разбор: /gevel-schilderen/ и /gevel-schilderen/keimen/ — 2026-09-30

Только чтение, в репозитории ничего не менялось.

**Источники и окна**
- GSC (MCP `search_analytics` + `snapshots/normalized/seo/gsc_query_page_last{28,90}d.csv`): текущие 28 дней — 2026-08-30…09-26, прошлые — 08-02…08-29; 90 дней — 07-01…09-29. Дневной ряд — до 09-27; даты после 09-26 ещё не окончательные.
- GA4 (MCP `run_report`, 07-01…09-28), WP (`reports/pages/wp_stats_last90d.md`, до 09-28; просмотры и CTA только с 09-04).
- URL Inspection: `data/processed/index_status_latest.json` (прогон 2026-09-30).
- Сборка: `out/gevel-schilderen/**/index.html`, обход (временный скрипт сессии, не сохранён).
- DataForSEO SERP live, 2026-09-30, desktop, 4 запроса: «gevel schilderen» (NL, advanced), «gevel schilderen» (Роттердам 1010751, regular), «gevel laten schilderen» (NL, regular), «gevel keimen» (NL, regular). Стоимость около $0.02 (через MCP в лог расходов не попадает).

## Коротко
1. **Трафика и заявок нет ни у одной из двух страниц.** Родитель — 2 клика за 90 дней, keimen — 3 клика с запуска. Заявок в WP — 0. Единственное ключевое событие из органики — 1 клик по WhatsApp с keimen.
2. **Большая часть показов, судя по всему, не от людей.** Показы идут ровными порциями: одинаковое число каждый день, у десятков вариантов запроса — почти одинаковые цифры, кликов нет. Поток оборвался у родителя 17.09 (~80 показов в день → ~25), у keimen 21.09 (~110 → 0–4). Обрыв одновременно по всем группам запросов, включая «gevel schilderen {поселок в Bollenstreek}», — похоже на отключённый трекер позиций, а не на санкцию. Уверенность средняя. **Базой для ревью должны быть показы после 17.09 / 21.09, а не сентябрьские пики.**
3. **Позиции родителя по сопоставимым запросам.** По keimen-запросам родитель ушёл вниз (35 → 45,5), потому что их забрала дочерняя страница (у неё позиции 7–12) — так и задумано. По остальным запросам — 41,2 → 37,9, это в пределах шума. Каннибализации по правилу проекта нет.
4. **Выдача не наша по типу.** По «gevel schilderen» и «gevel laten schilderen» в топе DIY-магазины и лидгены с ценой в первой строке сниппета, плюс local pack маляров (категория «Schilder»). Нас нет в топ-30 ни по стране, ни в Роттердаме. keimen 30.09 стоит #18 в органике по «gevel keimen», уже с новым сниппетом без цен.
5. **Обе страницы Google перечитал 29.09 в 23:06–23:08 UTC** (запрос владельца). Эффект удаления цен и новых title для этих URL считается с 30.09, поэтому ревью 16.10 для них получится ранним: будет всего ~2 недели данных.

## 1. Что ранжируется

### /gevel-schilderen/
| | прошлые 28 дней | текущие 28 дней | 90 дней |
|---|---|---|---|
| клики | 2 | 0 | 2 |
| показы | 2 125 | 1 653 | 5 372 |
| позиция | — | 40,1 | 37,4 |
`[GSC, page]`

- Главные запросы за 90 дней (показы / позиция) `[GSC, 90d, query]`: «gevel schilderen» 416 / 41; «gevel schilder» 263 / 51; 14 keimen-запросов по 146–249 / 27–50; «gevel schilderen de zilk / oegstgeest / noordwijk(erhout) / voorhout / katwijk / rijnsburg / lisse» по 81–116 / 27–66; «gevel laten schilderen» 86 / 47; «gevel verven» 59 / 46; «gevel schilderen kosten» 54 / 15,6; «buitenmuur laten schilderen» 50 / 37,5; «gevel schilderen voor en na» 35 / 28.
- «buitenmuur verven» (~1 300 в месяц по `knowledge.md`) — **0 показов**, хотя фраза стоит в H1 и description. Есть только «buitenmuur verven kosten» — 3 показа, позиция 17.
- Сопоставимые запросы, 39 штук, прошлые → текущие 28 дней `[GSC, 28d, query]`:
  - все: 37,3 → 42,6 (43,0 с весами прошлого окна);
  - keimen, 14 запросов: 35,0 → 45,5 — после 04.09 их забрала дочерняя страница;
  - остальные 25: 41,2 → 37,9 (39,3 с весами прошлого окна) — без изменений, в пределах шума.
- Показы глубже 50-го места среди видимых запросов: 9 % (182 из 1 939) → 16 % (243 из 1 502) `[GSC, 28d, query]`.
- CTR: позиция >20 почти везде, делать выводы по CTR нельзя. Исключения:
  - «gevel schilderen kosten» — позиция ~14, 15 показов за 28 дней, 0 кликов: слишком мало для выводов;
  - «gevel schilderen en beschermen tegen weersinvloeden» — позиция 6 → 2, 27 показов, 0 кликов. Длинная, «машинная» формулировка, по всей видимости трекер.
- Лиды: GA4 — 19 сессий за 90 дней, из них Paid 11, Direct 7, Organic 1; 1 WhatsApp (Direct) `[GA4, 90d, landing]`. WP — 14 просмотров с 04.09, 0 CTA, 0 заявок `[WP, 25d, page]`.

### /gevel-schilderen/keimen/ (в сети с 2026-09-04)
- 04.09–27.09: 1 751 показ, 3 клика (06.09, 08.09, 15.09), позиция 18,3 `[GSC, page]`. Прошлого окна нет, like-for-like не посчитать.
- Лучшие запросы: «keimwerk kosten» 3,6; «keimen kosten» 6,8; «keimwerk prijs m2» 7,3; «wat kost keimen (per m2)» 8,6–9,9; «keimen of schilderen» 12,3; «gevel keimen» 22,9. По 40–70 показов на каждый запрос, 0 кликов по видимым запросам `[GSC, 28d, query]`. Глубже 50-го места — 2 показа из 1 629.
- С 23.09 — 1–4 показа в день.
- Лиды: GA4 — 3 органические сессии и 1 клик WhatsApp (Organic) `[GA4, 90d]`. WP — 15 просмотров, 1 CTA, 0 заявок `[WP, 25d]`. Данных мало, любые коэффициенты считать нельзя.

### Почему показы похожи на ботов (гипотеза, уверенность средняя)
- Каждый keimen-запрос у родителя за прошлые 28 дней дал 67–102 показа, то есть около 3 в день каждый.
- Каждый «gevel schilderen {поселок}» дал ~30 показов, то есть ~1 в день. Все поселки — Bollenstreek, вне ядра зоны работ.
- Клики за 90 дней: 0 по всем видимым запросам.
- Обрыв у родителя 17.09 затронул все группы сразу (keimen, поселки, общие), без выката сайта и до spam update 24.09.
- Проверить напрямую нельзя. Косвенно: если показы после 17.09 держатся на уровне ~25 в день, этот уровень и есть реальная база.

## 2. Интент выдачи `[DataForSEO SERP, live 2026-09-30]`
- **«gevel schilderen», NL.** Над органикой картинки и «Mensen vragen ook» (PAA: zelf schilderen, nadelen, beste periode, hoeveel kost).
  - Топ-10: deverfzaak (магазин, блог), gevelrenovatie-info (лидген, «€35–40 per m²» в сниппете), Hornbach, Gamma, colora, slimster (лидген, €25–40), bouwbestel, vtwonen, bouwchemie24.
  - После 3-го результата — **local pack маляров** (Perfect Gevel B.V., De Gevel Schilder, Quality1Paint; 28–50 отзывов, 4,7–5,0) и блок «Gerelateerde websites» (10 малярных фирм), затем видео Gamma и colora.
  - Дальше homedeal, schilder-concurrent, bobex, casius, eigenhuis. Нас нет в топ-~27 органики.
- **«gevel schilderen», Роттердам (regular).** В выдаче Pinterest, форумы (klusidee, bouwinfo.be), бельгийские сайты, местные фирмы из других городов. Нас нет в топ-30. Выдача странная; вывод «локально тоже нет» — уверенность низкая–средняя.
- **«gevel laten schilderen», NL.** Места 1–8 — лидгены и инфосайты с ценами (homedeal, slimster, gevelrenovatie-info, schilder-gigant, schildersvak, gevelbekleding-info, verfwinkel, Hornbach). Сайты местных фирм — только с 15-го места (glansgarant, mvrschilderwerken Utrecht, falson, rosenberg). Нас нет в топ-30.
- **«gevel keimen», NL.** Смешанная выдача:
  - инфо: verfwinkel, joostdevree, verf.nl;
  - лидгены: gevelrenovatie-info €15–35, slimster €20–40, bobex €25–55;
  - специалисты: specialistenmetkeim («25 jaar», специализация на keim/kalei), keimwerken.nl, gebototaal («werkt samen met KEIM Nederland»), stukadoorsbedrijfvanderloop (€25–45), perfectgevel.
  - **Мы — #18 органики (абсолютная позиция 22)**, с новым title и сниппетом из текста hero без цен.

**Интерпретация**
- По «gevel schilderen» Google отвечает DIY-инструкциями и ценами. Страница местной фирмы по такому запросу на первую страницу по стране не попадает, особенно без цены: цифра есть в сниппете у всех из топа.
- Коммерческая часть этой выдачи — local pack из категорий «Schilder». Основная категория нашего GBP — «Aannemer voor isolatie», и вряд ли профиль вообще участвует в этом паке. Уверенность средняя.
- keimen — единственное место, где у нас есть реальная видимость: вторая страница по стране.
- Чего нет у нас и есть у конкурентов-специалистов по keimen:
  - реальный keimen-проект с фото;
  - указанный бренд или система (KEIM);
  - срок службы и число слоёв (сознательно не указаны, потому что владелец их не подтвердил);
  - цена (запрещена решением владельца).

## 3. Страница: мета, контент, пересечения

### /gevel-schilderen/ (2 115 слов, 13 H2, 10 FAQ)
- **Мета.** Title «Gevel schilderen & keimen: kosten & offerte» (43 символа + суффикс), description 159. В H1 «Gevel schilderen (buitenmuur verven) vakkundig & beschermd» — запросы покрыты. «keimen» в title родителя дублирует тему дочерней страницы. Каннибализации по правилу нет: разница позиций больше 5. Но title тратит место на тему, которую уже закрывает дочерняя страница, вместо «buitenmuur verven».
- **Остатки ценовых карточек** в «Kosten» (`lib/content/gevel-schilderen.ts:77–80`, рендер в `page.tsx`):
  - три уровня «Basis · Voordeligst / Standaard · Gemiddeld prijsniveau / Intensief · Maatwerk»;
  - подпись «Prijs per m² incl. arbeid & standaardmaterialen»;
  - в TOC пункт «02 Kosten per m²».

  Сумм нет, но блок выглядит как прайс, из которого вынули цифры: посетитель ищет цену и не находит. Правило цен не нарушено. Это проблема ясности, не SEO-риск.
- **В «Waarom»:** «heldere offerte met een vaste prijs per m²» (`page.tsx`, секция «Gratis opname ter plaatse»). Это обещание фиксированной цены за m², его стоит подтвердить у владельца.
- **Неподтверждённые утверждения:**
  - таблица «Verwachte levensduur: silicaat 15–25 jr, siloxaan 10–15, acryl 7–12» — на keimen срок службы сознательно не назван (бриф: «no owner-confirmed figure»), страницы противоречат друг другу;
  - «Wij slaan nooit voorbereidingsstappen over» — абсолютное обещание;
  - «Wij werken met gecertificeerde materialen» — расплывчато, не подтверждено.
- **Пересечение с keimen.** На родителе целиком H3 «Keimen of schilderen (en kaleien)» и FAQ 07 «Keimen of schilderen — wat kiest u wanneer?», почти дословно как FAQ 03 и H2 дочерней страницы. По `content-nl.md` на родителе должен быть краткий анонс со ссылкой (ссылка есть: «Bekijk de kosten van gevel keimen per m²»). Сейчас это пересечение, не каннибализация.
- **С /buiten-stucwerk/ и /sierpleister/ не пересекается:** в тексте есть только ссылки на них.
- **Доказательств нет:**
  - ни одной контекстной ссылки на малярные проекты, хотя их 4 (`lib/content/projects/`: delft-willemstraat-…-schilderwerk-2026, halsteren-…-schilderwerk-2025, rottekade-…-schilderwerk-2024, spijkenisse-malledijk-…-schilderwerk-2024). Эти проекты сами ссылаются на родителя, а обратной ссылки нет;
  - запрос «gevel schilderen voor en na» (35 показов / 90 дней, позиция 28) страница не закрывает.
- **Изображения** (11, у всех есть alt):
  - hero — фото ETICS-проекта Vlaardingen (`vlaardingen-gevelisolatie-10cm-na-01`) с alt «Gevel schilderen — vernieuwde buitenmuur in Vlaardingen». Это утепление, не покраска;
  - «Waarom» — «Detaillering stucwerk na gevelisolatie»;
  - есть реальное фото покраски Delft Willemstraat, оно используется только на keimen.
- **Schema:** BreadcrumbList, HomeAndConstructionBusiness, Service, FAQPage (10 Q = 10 FAQ). Цен и `AggregateOffer` нет, только `priceRange €€`. В LocalBusiness — OfferCatalog из четырёх «Gevelisolatie met …» и 42 City: общий блок, одинаковый на всех страницах.
- **Внутренние ссылки:** входящих контекстных 16 (главная, /diensten/, /buiten-stucwerk/, /gevelisolatie/afwerkingen/, 6 проектов и др.), исходящих 9. Битых нет.

### /gevel-schilderen/keimen/ (1 132 слова, 4 содержательных H2, 9 FAQ) — контент заморожен до 2026-10-16
- Title «Gevel keimen: kosten & wanneer het past» (39 символов), description 155.
- **H1 «Gevel keimen: kosten per m² en wanneer het past».** H1 обещает цену за m², а цены нет: FAQ 01 «Wat kost gevel keimen per m²?» отвечает только факторами. Выдача по «… per m²» — сплошь цифры в сниппетах. Страница здесь частично не попадает в интент, и это прямое следствие запрета цен (решение владельца, не пересматривать).
- **Остаток старого текста:** «De m²-prijs verschuift **binnen de bandbreedte** door een combinatie van factoren» (`app/gevel-schilderen/keimen/page.tsx:479`). Диапазона на странице больше нет, фраза ссылается на пустоту. Мелкий текстовый дефект; чинить — решение владельца, раз контент заморожен.
- Уникальность: разделы «keimen / schilderen / kaleien» и «wanneer wél/niet» — по делу. Кластерный интент закрыт в пределах запрета цен.
- Ссылки: входящих контекстных всего 2 (родитель и /gevelisolatie/afwerkingen/), исходящих 6, включая проект Delft.
- Schema: те же 4 типа, FAQPage 9 = 9.
- Изображения: 4, фото Delft (schilderwerk, не keimen — в брифе это `[MISSING_BUSINESS_INPUT]`).
- Телефон написан иначе, чем на родителе: «+31 6 12 07 98 08» против «+31 6 1207 9808». Мелочь.

## 4. Индексация `[URL Inspection, 2026-09-30]`
- Обе страницы: «Submitted and indexed», canonical совпадает, robots ALLOWED.
- Последний обход: родитель 2026-09-29 23:06 UTC, keimen 23:08 UTC, то есть после удаления цен.
- Раньше в индексе были: у родителя версия от 05.07, у keimen — от 04.09 22:07 UTC, обе с ценами. SERP 30.09 по «gevel keimen» уже показывает новый title и текст без цен.

## 5. Блоки с весом, но без пользы для SEO и конверсии (только пометка)
- Родитель: HTML 336 КБ, из них 182 КБ inline-скриптов (RSC payload); 10 JS-файлов на 624 КБ; 1 354 DOM-узла.
- keimen: 247 КБ, 998 узлов.
- Кандидаты на облегчение (родитель):
  - секция «Offerte voor gevel schilderen» (чек-лист + generic-фото) дублирует форму и CTA внизу;
  - внизу подряд форма «Offerte aanvragen» и баннер «Laat uw gevel transformeren»;
  - TrustStrip и повтор «Google reviews / KVK / VCA / Gratis opname» сразу под hero;
  - виджет погодных условий;
  - «Werkgebied» — список городов без ссылок, дословно повторяет FAQ-ответ про регион на keimen;
  - «Waarom» с фото ETICS;
  - в JSON-LD на каждой странице 42 City и каталог из 4 ETICS-предложений.
- keimen: дубль preload hero в `layout.tsx` и обёртка `below-fold` на весь контент — уже в `docs/BACKLOG.md`.

## 6. Рекомендации по приоритету

1. **Ничего не переписывать до ревью, базу пересчитать.** Google перечитал обе страницы 29.09, а поток «ровных» показов кончился 17–21.09. Ревью 2026-10-16 по keimen и title родителя сравнивать с показами и позициями **после 21.09**, по сопоставимым запросам. Окончательный вывод об эффекте без цен — не раньше ~2026-10-28 (4 недели после переобхода). Мера: позиции семейства «keimen kosten» и «gevel keimen» в GSC; позиция 22 по «gevel keimen» в SERP как точка отсчёта.

2. **Ссылки на свои малярные проекты и реальное фото (родитель; после ревью или раньше, если владелец не против).**
   - Короткий блок «Voorbeelden» со ссылками на 4 проекта со schilderwerk.
   - В hero поставить фото Delft Willemstraat вместо ETICS Vlaardingen.
   - Пример анкора: «Bekijk het schilderwerk aan een woning in Delft (voor en na)» — «посмотрите покраску дома в Делфте (до и после)».
   - Ожидаемый эффект: больше доверия, контекстные ссылки на проекты, ответ на «voor en na». Уверенность в эффекте на позиции низкая, на конверсию — средняя.
   - Мера: клики по «gevel schilderen voor en na», CTA/WhatsApp с родителя (WP). Ревью через 8 недель.

3. **Кусок «Kosten» на родителе без прайсовой рамки.** Убрать «Voordeligst / Gemiddeld prijsniveau / Maatwerk» и «Prijs per m² incl. …». Оставить три ситуации как факторы, в TOC — «Kosten» вместо «Kosten per m²». Пример: «Wat de prijs bepaalt: staat van de ondergrond, voorbereiding en bereikbaarheid» — «что определяет цену: состояние основания, подготовка и доступ». Эффект — ясность для посетителя. Позиции от этого не вырастут.

4. **Пересечение с keimen — сократить на родителе.** H3 «Keimen of schilderen (en kaleien)» и FAQ 07 заменить 2–3 предложениями со ссылкой на /gevel-schilderen/keimen/. На ревью title решить, заменить ли «keimen» в title родителя на «buitenmuur verven». Кандидат: «Gevel schilderen & buitenmuur verven: offerte» (45 символов) — «покраска фасада и наружной стены: смета». Делать только после 16.10 и одним изменением за раз. Мера: появление показов по «buitenmuur verven» через 4–6 недель.

5. **Вопросы владельцу — факты:**
   - подтверждает ли он сроки службы 15–25 / 10–15 / 7–12 лет? Если нет — убрать таблицу с родителя; если да — можно дать и на keimen;
   - «vaste prijs per m²» — действительно ли смета всегда фиксированная за m²;
   - работает ли он с продукцией KEIM и есть ли keimen-проект с фото. Это главный недостающий элемент по сравнению со специалистами в выдаче «gevel keimen».

6. **GBP (владелец): дополнительная категория «Schilder» / «Schildersbedrijf».** Только если покраска фасадов — реальная постоянная услуга. Local pack по «gevel schilderen» собран из категорий маляров. Эффект не гарантирован, у конкурентов в паке 28–50 отзывов. Мера: локальный SERP «gevel schilderen rotterdam» через месяц (центы). Отдельный GBP-листинг не создавать (решение владельца).

7. **keimen на ревью 16.10 (сейчас не трогать):**
   - заменить «binnen de bandbreedte» на нейтральное «De m²-prijs hangt af van…» — «цена за m² зависит от…»;
   - решить, оставлять ли в H1 «kosten per m²», если цифр нет. Вариант: «Gevel keimen: kosten en wanneer het past» — «keimen фасада: стоимость и когда подходит».

   Цены не возвращать.

8. **Ads (владелец, уже в BACKLOG):** в группе gevel schilderen убрать «Vanaf €25/m²» из объявлений — это расходится с сайтом, где цен нет.

**Не делать:**
- не пробиваться в национальную DIY- и ценовую выдачу «gevel schilderen» текстом (отклонено);
- не делать массовых переписываний;
- не создавать отдельные посадочные для Ads.

## Ограничения
- Клики — единицы, заявок 0. Конверсию страниц посчитать нельзя.
- Гипотеза о ботах напрямую не проверяется.
- У keimen нет прошлого окна, like-for-like для неё не посчитать.
- DataForSEO — одна дата. Роттердамская выдача (regular) выглядит нетипично, уверенность низкая.
- Анонимизированные запросы: у родителя за 28 дней ~150 показов без запроса (1 653 − 1 502).

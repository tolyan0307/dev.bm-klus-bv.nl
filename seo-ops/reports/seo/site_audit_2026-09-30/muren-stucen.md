# /muren-stucen/ и /muren-stucen/sausklaar-behangklaar/ — SEO-разбор (read-only), 2026-09-30

**Окна и свежесть данных**
- GSC query×page CSV: 90d и 28d, конец 2026-09-27 (`seo-ops/snapshots/normalized/seo/`); MCP GSC: по дням 2026-06-29…09-27, запросы 28d (08-31…09-27) против предыдущих 28d (08-03…08-30).
- GA4 лендинги 90d; WP BM Stats 90d (2026-07-01…09-28; просмотры/CTA только с 09-04).
- Индексация: `index_status_latest.json` (URL Inspection 2026-09-30).
- DataForSEO live, NL (2528), desktop, 2026-09-30: «sausklaar stucen» (advanced), «muren stucen» (regular). 2 запроса, ≈ $0,005–0,01 в сумме.
- Граница календаря: 2026-09-04 — выкат дочерней страницы, 2026-09-05 01:25 CEST — снятие цен с обеих страниц. Сравнение «до/после 09-04» — с этой оговоркой.
- Контекст решения владельца: `seo-ops/knowledge.md` → «С 2026-07-19 фокус — только наружные работы, в интерьер не вкладываемся». Противоречие в документах: в KPI плана 2026-08-15 остаётся «семейство sausklaar, клики за 90 дней ≥ 20 к 2026-11-15», и дочернюю страницу создали 09-04, уже после этого решения.

---

## 1. По каким запросам показывается, откуда 4 259 показов и 0 кликов

### Факты
- `/muren-stucen/`: 4 259 показов, 0 кликов, 69 запросов, средняя позиция 29,6 [GSC, 90d, page]. 28d: 1 451 показ, 0 кликов, 49 запросов, поз. 33,3 [GSC, 28d, page]. Единственный клик за квартал — 2026-07-03 [GSC, daily, page]. Он на границе окна и в CSV за 90d не попал.
- `/muren-stucen/sausklaar-behangklaar/`: 318 показов, 0 кликов, 35 запросов, поз. 45,7 [GSC, 28d = 90d, page]. Страница живёт с 09-04, поэтому окна совпадают.
- Показы родителя почти целиком дают запросы семейства sausklaar/behangklaar. Топ за 90 дней [GSC, 90d, query]: sausklaar stucwerk — 823 показа, поз. 27,7; sausklaar stucen — 721, поз. 18,1; behangklaar stucwerk — 392, поз. 39,4; behangklaar stucen — 335, поз. 33,7; stucwerk sausklaar — 221, поз. 35,7; stucen behangklaar — 191, поз. 26,1; sausklaar maken muren — 173, поз. 22,6; stucwerk behangklaar — 114, поз. 39,3; behangklaar of sausklaar — 94, поз. 25,8.
- **По главному ключу страницы «muren stucen» (2 400/мес) — ноль показов.** «stucwerk binnen» — 2 показа, «stucen rotterdam» — 1, «plafond laten stucen» — 1 [GSC, 90d, query]. Показов по запросам «binnen + услуга + город» нет.
- Доля показов глубже 50-го места: у родителя 6 % за 90d (238 из 4 259) и 10 % за 28d (142 из 1 451); у дочерней — 38 % (121 из 318) [GSC, page].
- Родитель, позиции по сопоставимым запросам: 35 запросов есть в обоих окнах. Взвешенная позиция 27,7 (08-03…08-30) → 33,2 (08-31…09-27), по весам текущего окна 28,5 → 32,3. Показы по этим запросам: 1 347 → 1 252 [GSC, 28d vs prev 28d, query].
  - Стабильно: sausklaar stucen — 17,6 → 18,7; sausklaar maken muren — 23,2 → 23,0.
  - Хуже: sausklaar stucwerk — 24,4 → 35,6; behangklaar stucen — 30,3 → 39,7; stucwerk sausklaar — 31,8 → 47,9; stucwerk behangklaar — 37,9 → 50,2.
- По дням родитель в июле–августе держал поз. 24–28 и 35–80 показов в день. С 09-07 — 32–40 при примерно тех же показах [GSC, daily, page].
- Дочерняя по дням: 05–12.09 — 26–81 показ в день на поз. 33–44. С 09-13 — 1–5 показов в день на поз. 5–10. За 13–27.09 видимый запрос всего один («stuc behang», 1 показ), остальное анонимизировано [GSC, daily/query, page]. Похоже на keimen: после выката страницу коротко «пробуют», потом её почти нет в выдаче.
- Лиды: 0. В WP с 09-04 — 6 просмотров родителя и 6 дочерней, 0 CTA-кликов, 0 заявок [WP, 90d, event/lead]. GA4: у `/muren-stucen/` 2 сессии как лендинг за 90d (1 organic, 1 direct), 1 ключевое событие — из direct [GA4, 90d, landing]. Для коэффициентов этого мало.
- Ads: интерьер в кампанию не входит. Исторически «muren stucen» — CPA €121 без конверсий (knowledge.md).

### Интерпретация
- 0 кликов — ожидаемый итог для позиций 18–50. По правилам проекта CTR при позиции >20 ни о чём не говорит, так что это не проблема сниппета (уверенность высокая).
- Большинство запросов информационные («wat is», «verschil», «maken», «voorstrijken») — это ответ «что это», а не «кого нанять» (высокая).
- Google считает `/muren-stucen/` страницей о sausklaar/behangklaar, а не об услуге «muren stucen». Совпадает с title и H1, где стоит «sausklaar stucwerk» (высокая).
- Просадка родителя примерно на 5 позиций по сопоставимым запросам совпала с выкатом дочерней страницы и снятием цен (09-04/05). Разделить эти две причины нельзя. Сильнее всего просели именно пересекающиеся запросы («sausklaar stucwerk», «behangklaar stucen»), поэтому вероятнее эффект второго URL на ту же тему, чем эффект цен (средняя уверенность). Общий объём показов семейства не упал: 1 347 → 1 451 + 318.

### Каннибализация (правило проекта: у обоих URL >10 показов по запросу и разница позиций <5)
- За 90d правило выполняется для двух запросов (флаг `possible_cannibalization_guess=True` в `gsc_query_page_aggregated_queries_last90d.csv`):
  - «stucwerk sausklaar»: родитель 221 показ @ 35,7, дочерняя 19 @ 35,5;
  - «behangklaar stucen»: 335 @ 33,7 и 24 @ 31,1.
- Все показы дочерней по ним пришлись на 05–12.09. С 13.09 дочерняя почти не показывается, так что сейчас это скорее бывшая каннибализация.
- Остальное — пересечение, а не каннибализация. Родитель выше по головным запросам: «sausklaar stucwerk» 27,7 против 77, «sausklaar stucen» 18,1 против 40,8. Дочерняя выше лишь на мелких: «verschil behangklaar en sausklaar» — 12 показов @ 11,7 против 20,2; «behangklaar stucwerk» — 32 @ 23 против 39.
- **Поправка к `knowledge.md` и `BACKLOG.md`:** формулировка «по семейству sausklaar Google ставит выше родителя (26 против 48)» двусмысленна. Данные показывают, что выше ставят **родителя**: страница в целом — поз. 29,6 против 45,7, и по головным запросам то же.

## 2. Интент выдачи и конкуренты
[DataForSEO, NL desktop, 2026-09-30]
- **«sausklaar stucen».** Сверху AI Overview с определением, разницей с behangklaar и ценами €10–25/m², со ссылками на wandenplafondspuiten.nl, homedeal.nl, stucadoor-expert.nl, bouwwereld.nl. Дальше блок картинок, PAA (Wat betekent…, Kan een stukadoor…, Wat kost…, Verschil stucen en sauzen). В органике: DIY-статья (stukadoor-in-almere «Zelf stucen»), Reddit, FAQ budgetstucen с ценой €18/m², YouTube, renovlies-behang, форум klusidee, behangklaarstucen.nl, Instagram, прайс-страницы (stukadoorserviceeindhoven, ikknapmijnhuisop, bouwsectornederland — почти все с ценой за m²), Facebook. **Нас нет в топ-30** национальной выдачи.
- **«muren stucen».** Выдача DIY: Gamma, Hornbach, Hubo, Bouwbestel, Reddit, homedeal (€15–30/m²), YouTube, форумы; подрядчики — единичные городские страницы (Tilburg, Eindhoven). Нас нет в топ-30. «muren stucen» в NL понимают как «как сделать самому», а не как запрос на услугу.
- В GSC позиции 18–35, в национальной выдаче нас нет. Скорее всего, GSC-позиции локальные (регион Роттердам) или персональные — так же, как у `/buiten-stucwerk/` (knowledge.md). Уверенность средняя.
- **Что есть у конкурентов и чего нет у нас:**
  - цены за m² — главное, что цитирует AIO, но это запрещено решением владельца;
  - фото и видео реальных работ (у нас реальный интерьерный проект только один — Spijkenisse);
  - нормы и допуски (bouwwereld «De normen voor sausklaar stucwerk»);
  - отдельные страницы подрядчиков под «sausklaar stucen nieuwbouw».
- Наша дочерняя по типу подходит («verschil» + FAQ из PAA). Но без цен, ссылок и отзывов об интерьерных работах у неё нет сильного отличия от десятков однотипных статей.

## 3. On-page

### Мета и заголовки (из `out/…/index.html`, crawl `pages.json`, `data/sitemap-plan.ts`)
| | `/muren-stucen/` | `/muren-stucen/sausklaar-behangklaar/` |
|---|---|---|
| Title | «Muren stucen (binnen) – sausklaar stucwerk \| BM klus BV» (42 + суффикс) | «Sausklaar of behangklaar stucen: het verschil \| BM klus BV» (45 + суффикс) |
| Description | 143 символа, «behangklaar of sausklaar… prijs per m²…» | 160 символов (на пределе) |
| H1 | «Muren stucen (binnen): sausklaar stucwerk voor strakke wanden» | «Sausklaar of behangklaar stucen: het verschil en wat de prijs bepaalt» |
| H2 | 12, в т. ч. «Behangklaar vs. sausklaar: wat is het verschil?» | 7, первый — «Behangklaar of sausklaar: wat is het verschil?» |
| Слов | 1 469 | 1 124 |
| Схемы | Breadcrumb, HomeAndConstructionBusiness, Service, FAQPage (10) | те же, FAQPage (10) |
| Входящие контекстные ссылки | 6 + навбар + футер (сквозные) | 1 (только с родителя) |

### Пересечение родителя и дочерней (правило «на родителе — краткий анонс»)
- Title и H1 родителя нацелены на «sausklaar stucwerk» — это головной запрос дочерней. Бриф дочерней требовал, чтобы родитель держал «muren stucen (kosten)» (`parentAdjustment`). Title с 2026-03-03 не меняли, запись в журнале 2026-04-07 остаётся pending.
- Раздел родителя «Behangklaar vs. sausklaar: wat is het verschil?» — полноценная секция с H2 и 4 карточками, а не анонс.
- Почти одинаковые тексты на двух страницах:
  - FAQ «Wat is het verschil tussen behangklaar en sausklaar?» — ответ совпадает почти дословно;
  - droogtijd («Gipspleister is doorgaans na ca. 1–2 weken…»);
  - абзац о voorstrijk / primer (FAQ родителя = карточка «Voorstrijken» дочерней);
  - «één tot twee werkdagen» для комнаты.
- Уникальное у дочерней: callout про NOA, keuzehulp (4 сценария), «schuren en plamuren», FAQ «behangklaar later sausklaar», «stucen vs sauzen», «Kan een stukadoor sausklaar stucen».
- Вывод: для Google это две страницы на одну тему, и сейчас он выбрал родителя. Уверенность средняя-высокая.

### Остатки темы цен и обещания (не суммы, но вводят в заблуждение)
- Hero родителя: ссылка «Sausklaar of behangklaar? Bekijk het verschil en de prijs per m²» («Посмотрите разницу и цену за m²»). В секции afwerking — «Uitgebreid: … het verschil en de prijs per m²». Цены за m² на дочерней нет, анкор обещает то, чего нет.
- `kosten.disclaimer` на родителе: «Prijs per m² incl. arbeid & standaardmaterialen.» («Цена за m² включает работу и стандартные материалы») — строка осталась от удалённой таблицы, теперь стоит под списком без цифр.
- Trust bullet: «Richtprijs per m² na opname op locatie» («Ориентировочная цена за m² после осмотра»). В BACKLOG «richtprijs» уже отмечен на `/sierpleister/` как остаток ценовой темы.
- `serviceSchema` description: «Prijs per m² na opname op locatie».
- Неподтверждённые утверждения (по `content-nl.md` — пометить или спросить владельца):
  - «Vakkundige monteurs met jarenlange ervaring» и «Stofvrij werken door zorgvuldig afplakken»;
  - «Kwalitatief stucwerk binnen gaat tientallen jaren mee»;
  - «Snelle reactie tijdens openingstijden» (объект `ctaStrip` на странице, похоже, не выводится — проверить);
  - «één tot twee werkdagen» — срок;
  - в дочерней: «Zo staat het ook in onze offerte» и «behangklare wand kan later alsnog sausklaar» — в брифе это было `[CLAIM_NEEDS_CONFIRMATION]`, но выкатили без подтверждения.
- Шаблонные блоки не по теме на интерьерных страницах:
  - H2 футера «Laat uw gevel transformeren» («Преобразите свой фасад»);
  - WaaromBmKlusSection из `sections/gevelisolatie` (подзаголовок адаптирован);
  - StickyCTABar из gevelisolatie.
- Телефон записан в двух форматах: на родителе «+31 6 1207 9808», на дочерней «+31 6 12 07 98 08». Пункт уже есть в BACKLOG.
- Внутренние ссылки:
  - на дочернюю ссылается только родитель;
  - в журнале решений (09-04) записано «links from … footer», но в `components/footer.tsx` ссылки на дочернюю нет;
  - проект Spijkenisse (единственный интерьерный кейс) ссылается на родителя, а не на дочернюю;
  - `/onze-werken/` подписывает «Muren stucen» как «Binnen & buiten» — противоречит интенту «только внутри».
- Изображения:
  - у родителя 16 `<img>`, все декоративные (`muren-stucen-*`, `voorbereiding-*`, `droogtijd-*`); по BACKLOG («Интерьер: ~14 слотов… снять 6–8 фото») это ещё не реальные фото;
  - у дочерней 4 изображения — реальные фото проекта Spijkenisse.
- Индексируемость и схемы в порядке: canonical на себя, `index, follow`, AggregateOffer не выводится, битых якорей нет.

## 4. Индексация
[URL Inspection, 2026-09-30]
- `/muren-stucen/`: Submitted and indexed, последний обход 2026-09-28 13:39 UTC, в индексе версия без цен, Google canonical = свой.
- `/muren-stucen/sausklaar-behangklaar/`: Submitted and indexed, последний обход 2026-09-05 03:39 UTC — это уже после снятия цен (09-04 23:25 UTC), canonical свой.
- Вывод: с индексацией проблем нет. Исчезновение дочерней из показов с 13.09 не связано с выпадением из индекса. Это решение ранжирования (уверенность высокая).

## 5. Блоки с весом без пользы для SEO и конверсий (только заметки для проекта облегчения)
- Родитель: HTML 307 КБ, из него inline-скрипты (RSC-payload) 161 КБ; 1 335 DOM-узлов; 16 изображений. Больше всего весят декоративные картинки:
  - сетка «Wanneer» (4 фото);
  - фото «Voordelen»;
  - 3 фото в «Voorbereiding»;
  - 3 фото в «Droogtijd»;
  - картинка в «Wat is».
- Секция «Voordelen» (5 общих пунктов) и «Wat mag u verwachten» (неподтверждённые обещания) контент почти не добавляют.
- Дочерняя: HTML 229 КБ, inline 122 КБ, 915 узлов. Лишний `layout.tsx` с дублирующим preload hero (BACKLOG) и одна обёртка `below-fold` на весь контент (BACKLOG).
- Обе страницы: TrustStrip, ReviewsSection (только у родителя), футер-CTA про фасад.

## 6. Рекомендации по приоритету
Решение владельца «в интерьер не вкладываемся» (2026-07-19) — отправная точка. Отдельно нужно подтвердить, что KPI «sausklaar ≥ 20 кликов / 90d» больше не цель.

**P0 — решение владельца, без правок, сейчас.**
- Подтвердить режим «интерьер — только поддержка».
- Снять или пометить недействительным KPI sausklaar в `knowledge.md` и плане 2026-08-15. Причины: национальная выдача занята AIO, DIY-сайтами и ценами; мы вне топ-30; 0 лидов; CPA в Ads для интерьера был €121 без конверсий.
- Ожидаемый эффект: не тратить ревью 10-16 и силы на страницы, которые не приносят заявок.

**P1 — гигиена ценовой темы (точечно, ~10 строк, не «вложение»).**
- Убрать обещание «prijs per m²» из двух анкоров на родителе. Например: «Sausklaar of behangklaar? Bekijk het verschil» («Посмотрите разницу»).
- Удалить строку-сироту «Prijs per m² incl. arbeid & standaardmaterialen.»
- Bullet «Richtprijs per m² na opname» заменить на «Prijs na gratis opname op locatie» («Цена — после бесплатного осмотра на месте»).
- В description схемы Service — так же.
- Проверка: `npx tsc --noEmit`, `pnpm build`, grep «per m²» по `out/muren-stucen/`. Эффект на трафик — нулевой (ожидаемо). Смысл — соответствие решению от 09-05 и честность анкоров.

**P2 — судьба дочерней на ревью 2026-10-16 (решение по данным).**
- Критерий, считать с 09-13:
  - (а) у дочерней в среднем меньше 10 показов в день;
  - (б) нет запроса, где у неё больше 10 показов и позиция лучше родителя.
- Если оба условия выполнены — предлагаю **объединить**:
  - 301 `/muren-stucen/sausklaar-behangklaar/` → `/muren-stucen/` (запись в `deploy/apache/root.htaccess`, убрать из `data/sitemap-plan.ts`);
  - уникальные куски дочерней (NOA-callout, keuzehulp, 3–4 FAQ) — в секцию afwerking родителя, дубли убрать.
  - Получится одна страница с сигналами семейства вместо двух полупустых, и одним файлом меньше в поддержке.
  - Эффект: вернуть сопоставимые позиции родителя к уровню до 09-04 (≈ 27–28 по 35 запросам). Замер — like-for-like 28d после выката против 08-03…08-30. Ревью — через 6 недель после выката.
- Если дочерняя ожила (условия не выполнены) — ничего не трогать, повторить ревью 2026-11-15.
- Альтернатива при полном нуле вложений: оставить обе страницы как есть. Цена — продолжающееся пересечение и две страницы в поддержке.
- Интерьерный контент в обоих вариантах **не расширять**: без новых разделов, фото и городских вариантов.

**P3 — не делать (и почему).**
- Не переписывать title и H1 родителя под «muren stucen»: по этому запросу выдача DIY, а у нас ноль показов. Потеряем то немногое, что есть по sausklaar, без шанса на заявки.
- Не добавлять цены — запрет.
- Не заказывать интерьерную фотосъёмку (слоты из BACKLOG) — противоречит решению про интерьер. Вместо этого в проекте облегчения можно сократить число декоративных картинок на родителе с 16 до 3–4.
- Не делать дизайн-проход дочерней (BACKLOG, просьба 09-04) до решения P2.

**P4 — сопутствующее (в BACKLOG / владельцу).**
- Убрать `/muren-stucen/` из ротации GBP-постов типа `service` (вопрос уже есть в BACKLOG; при режиме «поддержка» ответ — убрать).
- Подпись «Binnen & buiten» у «Muren stucen» на `/onze-werken/` поменять на «Binnen».
- Исправить в журнале запись 09-04 о «footer link» — её нет.
- Уточнить формулировку в `knowledge.md` и BACKLOG: выше Google ставит родителя, а не дочернюю.
- Неподтверждённые обещания (стофвrij/«jarenlange ervaring»/«tientallen jaren»/«1–2 werkdagen»/«Zo staat het in onze offerte»/«behangklaar later sausklaar») — спросить владельца: подтвердить или убрать.

## Ограничения
- Кликов 0, заявок 0: нет данных о конверсии, все выводы — о видимости.
- Дочерней 26 дней, эпизод 05–12.09 короткий, так что суждения о ней предварительные.
- Выкат дочерней и снятие цен (09-04/05) нельзя разделить во времени.
- DataForSEO — национальная десктопная выдача без локализации по Роттердаму. Локальную выдачу не проверял, чтобы остаться в лимите 4 запросов.
- Мусорные строки GSC вида `sausklaar stucwerk voorstrijken;7;2;…` и `stucen op hout;13;1;…` в сумме запросов учтены, но в сравнении позиций их вес незначителен.

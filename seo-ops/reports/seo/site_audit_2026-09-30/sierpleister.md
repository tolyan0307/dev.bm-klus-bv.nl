# /sierpleister/ — SEO-разбор (только чтение), 2026-09-30

**Источники и свежесть**
- GSC: query×page CSV 28/90 дней (до 2026-09-26, пайплайн); MCP `search_analytics` по странице: 90d = 2026-06-29…09-26, 28d = 08-30…09-26, прошлые 28d = 08-02…08-29, дневной ряд 2026-03-08…09-27.
- GA4 landings 28/90d (снапшот от 09-29). WP BM Stats v2: 2026-07-01…09-28 (просмотры и CTA только с 09-04).
- Индексация: `index_status_latest.json` (прогон 2026-09-29 23:13 UTC).
- Сборка: `out/sierpleister/index.html` (сборка 09-30 16:57), crawl `pages.json`.
- Живая выдача: DataForSEO, NL (2528), nl, desktop, depth 30, 3 запроса. Стоимость ≈ $0.018 (3 × ~$0.006; вызовы через MCP не попадают в cost log).
- Исходники: `lib/content/sierpleister.ts`, `app/sierpleister/page.tsx`, `werkwijze-stepper.tsx`, `sierpleister-faq.tsx`, `components/sections/sierpleister/GevelAfwerkingGids.tsx`, `data/sitemap-plan.ts`.
- Граница данных: последняя правка контента на проде — удаление цен 2026-09-04 23:25 UTC; Google перечитал страницу 09-19, то есть в индексе уже версия без цен. Выводы «после удаления цен» — по данным с 09-19, это ~1 неделя GSC. Мало.

---

## 1. Позиции, CTR, клики, лиды

### Факты
| Показатель | Значение |
|---|---|
| Клики / показы / поз., 90d | 6 / 563 / 15.9 [GSC, 90d, page] |
| Клики / показы / поз., 28d | 1 / 170 / 11.2 [GSC, 28d, page] |
| Прошлые 28d | 3 / 215 / 22.8 [GSC, prev 28d, page] |
| Видимые запросы (не анонимные) | 223 из 563 показов за 90d (40 %), 57 из 170 за 28d (34 %) [GSC, query] |
| Клики по видимым запросам | 0 за 90d — все 6 кликов пришли с анонимизированных запросов [GSC, 90d, query] |
| Сессии-входы GA4 | 11 за 90d (9 organic), 0 ключевых событий; 5 за 28d [GA4, 90d/28d, landing] |
| WP | 25 просмотров, 0 CTA-кликов, 0 заявок (просмотры с 09-04) [WP, 90d, page/lead] |

Топ запросов 90d [GSC, 90d, query]:
| Запрос | Показы | Поз. |
|---|---|---|
| gevel sierpleister | 109 | 18.7 |
| sierpleisters | 54 | 55.4 |
| sierpleister buitengevel | 40 | 21.6 |
| spachtelputz buitengevel | 4 | 9.8 |
| остальные 16 запросов | по 1 показу | 1–75 |

**Позиции по сопоставимым запросам (28d против прошлых 28d).** Общие запросы: gevel sierpleister (36 → 28 показов, 16.9 → 18.4), sierpleister buitengevel (18 → 22, 19.4 → 23.4), spachtelputz buitengevel (1 → 3, 15 → 8). Взвешенно: **17.7 → 19.9** — в пределах шума (53–55 показов).

**Доля показов глубже 50-го места:** прошлые 28d — 55 из 116 видимых (47 %, почти всё «sierpleisters» на 55-м месте); текущие 28d — 0 из 57; за 90d — 56 из 223 (25 %).

**Динамика с переезда** [GSC, daily, page]: март — ~15–30 показов в день на 15–35 месте; с середины мая — 2–10 показов в день; с июня — позиция ~8–12 при 3–10 показах в день. Клики — 1 раз в 2–4 недели (14 кликов с 03-08).

### Интерпретация
- Средняя позиция страницы «улучшилась» с 22.8 до 11.2 **не** из-за роста: из окна ушли глубокие показы по «sierpleisters». По сопоставимым запросам — ровно, небольшое ухудшение в пределах шума (уверенность высокая, что роста нет; средняя — что нет и падения).
- Показы упали примерно в 3 раза весной (март → май/июнь). По времени это совпадает с core update в апреле и мае. Это корреляция, не доказательство (уверенность низкая).
- CTR: по основному запросу позиция 18–23, так что CTR ничего не говорит. Сниппет тут не проблема.
- Лиды: 0 [WP]. 11 сессий за 90 дней — коэффициенты считать нельзя.

---

## 2. Интент и выдача [DataForSEO, 2026-09-30, NL desktop]

| Запрос | Наша позиция | Кто в топе / тип страниц |
|---|---|---|
| gevel sierpleister | органика #15 (rank_absolute 20, стр. 2) | #1 магазин (gevelisolatiestore.nl), дальше информационные порталы (gevelrenovatie-info, stucwerk-info, crepi.nl, gevelbekleding-info, isolatie-info), производитель sto.nl, магазин stucadoorsproducten; блоки PAA, популярные товары, картинки. Подрядчиков почти нет (nextlevelstuc ~#20) |
| sierpleister buitengevel | нет в видимых ~17 органических (GSC: 21–23) | #1 — **страница проекта подрядчика** (hjsiebert.nl «Buitengevel Den Haag», spachtelputz 1,5 mm), блог подрядчика butun.nl, bobex, форум klusidee, Instagram / TikTok / Facebook-посты с работами, региональные страницы casius.nl |
| crepi gevel | нет в топ-30 | Выдача в основном бельгийская (crepi.be, fassado.be, bobex.be, batibouw), crepi.nl #1, local pack (VT Crepi Gevel и др.), «Gerelateerde websites» — бельгийские фирмы, видео |

PAA: «Welke pleister voor buitenmuren?», «Hoeveel kost sierpleister per m2?», «Wat is een sierpleister?», «Wat is goedkoper, steenstrips of crepi?», «Wat is het verschil tussen spachtelputz en sierpleister?», «Wat zijn de nadelen van een crepi gevel?», «Hoe lang blijft crepi goed?».

В сниппете Google берёт первый абзац hero («Gevel sierpleister is een decoratieve buitenpleister…»), а не meta description.

### Интерпретация
- «gevel sierpleister» — информационно-товарная выдача (что это / виды / цена / купить). Наша страница — единственный тип «услуга подрядчика» на странице 2, и по формату она ближе к ответу, чем многие. Но выдача вознаграждает порталы с «soorten + prijs», а цифр у нас по решению владельца нет. Потолок без ссылок — 1–2 страница (уверенность средняя).
- «sierpleister buitengevel» — **коммерческо-проектный интент**: реальные работы, фото, соцсети. У нас такие проекты есть (Strijen, Halsteren, Vught, Dordrecht, Bruinisse, Almere, Nieuw-Beijerland), но `/sierpleister/` на них не ссылается (уверенность средняя, что это пробел).
- «crepi» — прежде всего фламандский термин. Нидерландскую долю спроса забирают бельгийские сайты и `/gevelisolatie/afwerkingen/`. Отдельную crepi-страницу делать не стоит (уверенность средняя).
- Объёмов по семейству sierpleister в `knowledge.md` нет. Проверка — DataForSEO `keywords_data/google_ads/search_volume` (~$0.075 за вызов), не делал.

---

## 3. On-page

**Мета** (`data/sitemap-plan.ts`): title «Gevel sierpleister (spachtelputz/crepi): kosten» — 47 символов + суффикс, в лимите; description — 159 символов, упоминает «prijs per m²». Canonical и robots в порядке.

**H1** (`page.tsx:202`): «Gevel sierpleister: spachtelputz of crepi / prijs per m² na opname». Вторая строка H1 — про цену, которой нет. Главный запрос в H1 есть.

**H2** (14 шт.): Wat is… / Populaire gevel-structuren in Nederland / Voordelen / Kosten (wat bepaalt de prijs?) / Waarom klanten voor ons kiezen / Van voorbereiding tot oplevering / Details / Onderhoud / Repareren / ETICS / Klanten / FAQ / Offerte / Laat uw gevel transformeren.

**Находки (с файлом и местом):**
1. **Нет заголовка «Spachtelputz vs. crepi»**, а это главный PAA-вопрос. Текст сравнения есть (`soorten` в `sierpleister.ts:65–105`), но выводится карточками `<p>` внутри «Wat is…». Заголовок `soorten.h2` («Spachtelputz vs. crepi: welke gevelpleister past bij u?») и `korrelgrootte.h2` определены в контенте, но в `page.tsx` не используются.
2. **Werkwijze: 5 из 6 шагов нет в HTML.** `werkwijze-stepper.tsx` рендерит только активный шаг (`useState(0)`). В `out/…/index.html` нет «Reiniging en beoordeling ondergrond», «Profielen & detaillering», «Oplevering + controle». Поисковику виден только шаг 1.
3. **Остатки цен и неподтверждённые утверждения** (запрет от 2026-09-05 и `docs/BACKLOG.md`):
   - «Na een korte opname stellen wij een heldere **richtprijs**…» (`hero.lead[1]`); «**Richtprijs per m²** na opname» (`trustBullets[2]`); «Opname op locatie voor advies en **richtprijs**» (`werkwijze.verwachten`) — в HTML 3 раза.
   - «**Prijs per m² incl. arbeid & standaardmaterialen.**» (`kosten.disclaimer[0]`) — сироты от удалённой таблицы цен.
   - «Gedetailleerde offerte **binnen 2 werkdagen**» — в BACKLOG как неподтверждённое.
   - «wij voeren **altijd** een proefvlak uit bij twijfel» (`reparatie.note`) — «altijd» в обещании.
   - «20–30 jaar levensduur» (3 места), «uitharden 4–6 weken» — технические утверждения без источника; риск низкий, но стоит подтвердить у владельца.
4. **Перелинковка** (`hrefs` в HTML): контекстные ссылки только на `/onze-werken/`, `/over-ons/`, `/contact/`, `/gevelisolatie/`; блок «related» — gevelisolatie, buiten-stucwerk, gevel-schilderen, muren-stucen, diensten, contact.
   - **Нет ссылки на `/gevelisolatie/afwerkingen/`** — соседа по правилам интента.
   - Нет ссылок на проекты с sierpleister.
   - Нет контекстной ссылки на `/buiten-stucwerk/` в блоке «Verschil met glad buitenstucwerk» и на `/gevel-schilderen/` в FAQ «Kan ik sierpleister later schilderen?» (бриф их предлагает).
   - Входящих контекстных ссылок 22 [crawl `ctxInlinks`].
5. **Изображения**: 18 `<img>`, все с alt; 1 eager (hero, реальный проект Vlaardingen). В гиде 6 текстур: по BACKLOG реальных фото нет для siliconenhars, krabpleister, kalei, для silicaat — общий снимок. При этом alt вида «**Rotterdam** gevel sierpleister kaleien – …» — привязка к городу на не-проектных фото. `details-wapening` использован дважды.
6. **Schema**: BreadcrumbList, HomeAndConstructionBusiness, Service (без цен, `priceRange €€` — разрешённое исключение), FAQPage (10 вопросов — совпадают с видимыми, ответы есть в HTML). В порядке.
7. **Мелочь по конверсии**: в `externalLinks` страницы есть WhatsApp-ссылка с текстом «interesse in **gevelisolatie**». Похоже, это общий StickyCTABar; на странице sierpleister текст не тот. Гипотеза, проверить в `sticky-cta-bar.tsx`.

**Пересечения с соседями** (правило каннибализации — >10 показов у обоих URL и разница <5 позиций):
- «gevel sierpleister»: `/sierpleister/` 109 @18.7 против `/gevelisolatie/afwerkingen/` 21 @46 → **пересечение, не каннибализация** (разница 27). Проекты Dordrecht и Etten-Leur — по 2 показа @5–6 (ниже порога).
- Запросы crepi на `/sierpleister/` не приходят: «crepi afwerking» 89 @21.3, «crepi stucwerk» 5 @5.6, «crepi gevel» 4 @48 — на `/afwerkingen/`; «wat kost crepi per m2» 13 @10.2 — на `/gevelisolatie/kosten/`; «sierpleister» 5 @9.4 — на главной [GSC, 90d, query]. Каннибализации нет, но Google связывает «crepi» с `/afwerkingen/`, у которой H2 «Stucwerk vs sierpleister / crepi» и 35 упоминаний sierpleister.
- У `/buiten-stucwerk/` title «…betonstuc & crepi» — формальное пересечение по crepi в title. По данным GSC crepi-запросы туда не идут (0 показов у видимых crepi-запросов).
- ETICS-блок на `/sierpleister/` (4 шага opbouw + highlights) повторяет `/gevelisolatie/` и `/afwerkingen/`, хотя бриф говорит «doNotCoverDeeply». Объём умеренный.

**Глубина**: ~1 970 слов (crawl) — на уровне `/gevelisolatie/` (2 026) и `/gevel-schilderen/` (2 115). Недостатка объёма нет. Структурно не хватает ответа «spachtelputz vs sierpleister» (spachtelputz — это разновидность sierpleister) и реальных примеров работ.

---

## 4. Индексация
`/sierpleister/`: «Submitted and indexed», PASS, последний обход 2026-09-19 01:50 UTC (после удаления цен), canonical Google = пользовательский [URL Inspection, 2026-09-29]. Проблем нет.

---

## 5. Вес страницы и блоки без пользы (только заметки)
- HTML 401 КБ — самая тяжёлая из соседей (`/gevelisolatie/` 395, `/afwerkingen/` 373, `/gevel-schilderen/` 336, `/buiten-stucwerk/` 303 КБ). Состав: ~199 КБ inline RSC-данных Next (дублируют разметку), ~89 КБ атрибутов `class`, 125 inline SVG-иконок (~52 КБ), 1 871 DOM-узел. Вес структурный (шаблон Next + Tailwind + lucide), не из-за одного блока. Сигнала проблемы со скоростью нет, а работа по PageSpeed без сигнала отклонена владельцем → **не приоритет**.
- Блоки, которые добавляют вес, но мало дают SEO и конверсии:
  - `GevelAfwerkingGids` — 6 карточек (~7 КБ props в RSC), 3–4 без реальных фото; kaleien — ближе к теме `/gevel-schilderen/keimen/`.
  - «Voordelen» — 5 общих преимуществ, тёмный блок.
  - Шаблонный `WaaromBmKlusSection` — одинаковый на разных страницах.
  - Чипы korrelgrootte — дублируют FAQ «Welke korrelgrootte…».
  - ETICS-opbouw — дублирует кластер.
  - Картинка «offerte-berekening» — декоративная.
  - 3 тёмных блока вне hero (дизайн-долг, `docs/BACKLOG.md`).

---

## 6. Рекомендации (по приоритету)

Общая оговорка: данных мало (1–3 клика за 28 дней, 0 лидов). Главный структурный блокер сайта — внешние ссылки (1 ссылающийся домен), поэтому on-page правки дадут эффект порядка «страница 2 → конец страницы 1», не больше. Ревью ставить на пик сезона (сентябрь–март), не сравнивать через июль–август.

**P1. Убрать остатки цен и неподтверждённые обещания** (правило, а не SEO; риск 0).
- `hero.lead[1]`: «Na een korte opname ontvangt u een duidelijke offerte op maat.» (после короткого осмотра вы получите понятное индивидуальное предложение).
- `trustBullets[2]`: «Prijs na gratis opname op locatie» (цена — после бесплатного осмотра на месте).
- `verwachten`: «Opname op locatie en persoonlijk advies» (осмотр на месте и личная консультация).
- Удалить `kosten.disclaimer[0]`.
- «binnen 2 werkdagen» — убрать или подтвердить у владельца.
- «altijd een proefvlak» → «bij twijfel maken wij eerst een proefvlak» (при сомнениях мы сначала делаем пробный участок).
- Эффект: соответствие решению 2026-09-05. Замер: `grep` по out/ — 0 вхождений «richtprijs» и «Prijs per m²».

**P1. Показать поисковику уже написанный текст** (малые правки кода).
- Вывести `soorten.h2` как H2 «Spachtelputz of crepi: welke gevelpleister past bij u?» (шпахтельпутц или крепи: какая штукатурка подходит вам?), типы — как H3.
- Добавить 1–2 фразы: «Spachtelputz is een soort sierpleister met een schuurstructuur.» (шпахтельпутц — разновидность декоративной штукатурки с затёртой структурой). Это ответ на PAA «verschil spachtelputz en sierpleister».
- Werkwijze: все 6 шагов — в HTML (например, степпер поверх видимого `<ol>`).
- Ожидание: больше показов по «spachtelputz …» и «verschil …». База: запросы со «spachtelputz» — 6 показов за 90d [GSC]. Уверенность низкая–средняя.
- Ревью: 2026-12-15.

**P1. Перелинковка под проектный интент.**
- В блок «Verschil met glad buitenstucwerk» — ссылка на `/buiten-stucwerk/`.
- В ETICS-блок — ссылка на `/gevelisolatie/afwerkingen/`, сам блок сократить до анонса.
- Мини-блок «Voorbeelden» с 2–3 проектами: Halsteren (buitenstucwerk + sierpleister без ETICS — самый точный), Strijen Schenkeldijk, Dordrecht. Анкор, например: «Bekijk sierpleister-projecten in Halsteren en Strijen» (посмотрите проекты с декоративной штукатуркой в Халстерене и Стрейене).
- Ожидание: выдача «sierpleister buitengevel» ценит реальные работы. База: 21.6 [GSC, 90d] / 23.4 [GSC, 28d]; цель ≤ 15 к 2026-12-15. Уверенность низкая.

**P2. H1 без ценовой строки.**
- Вместо «prijs per m² na opname» — например «voor een strakke of robuuste gevel» (для гладкого или фактурного фасада); «Gratis opname & offerte» уже есть рядом.
- Title не трогать: позиция ~18, кликов единицы, эффект не измерить.

**P2. Гид текстур.** Сократить до реально выполняемых и сфотографированных (spachtelputz, crepi, возможно siliconenhars) или доснять макро (пункт BACKLOG). Убрать «Rotterdam» из alt не-проектных фото. Решение владельца: какие текстуры BM klus реально делает (kaleien, krabpleister?) — `[MISSING_BUSINESS_INPUT]`.

**P3. Подтвердить у владельца:** «20–30 jaar levensduur», «4–6 weken uitharden». Проверить текст WhatsApp в StickyCTABar на этой странице.

**Не рекомендую:**
- отдельную страницу под crepi (выдача бельгийская);
- страницу под spachtelputz (отклонено);
- возвращать цены;
- снова править title;
- работу над весом HTML без сигнала по скорости.

**Как мерить:** like-for-like позиции по `/sierpleister/` (gevel sierpleister, sierpleister buitengevel, spachtelputz*) в окнах по 28 дней; доля показов глубже 50-го места — отдельно; лиды — только WP. Запись в `decision_log_v1.csv` — после выката на прод, с датой deploy-prod. Ревью — 2026-12-15.

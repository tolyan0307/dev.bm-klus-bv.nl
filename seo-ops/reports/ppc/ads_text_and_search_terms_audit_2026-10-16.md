# Аудит текстов объявлений и поисковых запросов Google Ads — 2026-10-16

Повод: разбор ролика «Claude Just Changed Google Ads Forever» (eCom). Из него применимы две вещи: тексты объявлений из реального контекста бизнеса и проверка «проблемных» запросов. Перед этим — инвентаризация того, что сейчас в объявлениях.

- Источник: Google Ads API v23, только чтение, аккаунт 590-225-6023.
- Окна: тексты и ассеты — состояние на 2026-10-16; поисковые запросы — 2026-07-20…2026-10-15 (с Ads v2, 88 дней); показы по объявлениям — 2026-09-17…2026-10-15.
- Кампания 23271040037 теперь называется «NL | Gevelwerken | Search» (в `knowledge.md` было «NL | Gevelisolatie | Search»). Старые кампании: «BM klus BV клики» — REMOVED, «BM klus BV конверсии» — PAUSED; их тексты не показываются.

## 1. Цены и неподтверждённые обещания в показываемых объявлениях

Активны 5 групп: Gevelisolatie - Core, Gevelisolatie - Afwerking, Buiten Stucwerk, Stukadoor Regio, Gevel Schilderen. Остальные группы кампании на паузе.

| Где | Текст | Проблема | Показы [Ads API, 2026-09-17…10-15, ad] |
|---|---|---|---|
| Buiten Stucwerk, заголовок | «Vanaf €35/m² spachtelputz» | цена (запрет с 2026-09-05) | 590 |
| Gevel Schilderen, заголовок | «Vanaf €25/m²» | цена | 101 |
| Gevel Schilderen, описание | «Vanaf €25/m², afhankelijk van staat en verfsysteem. …» | цена | 101 |
| Buiten Stucwerk, Stukadoor Regio, Gevel Schilderen — заголовок | «4,9/5 op Google Reviews» | захардкоженный рейтинг; в `public/data/google-place.json` (2026-09-30) — 5,0 и 20 отзывов | 714 |
| Sitelink «Sierpleister» (кампания + 3 группы) | «Kwaliteitswerk, met garantie» / «Duurzaam met kwaliteitsgarantie» | гарантии убраны с сайта 2026-09-30 по решению владельца | — |
| Sitelink «Gevelisolatie kosten» (Core, Afwerking) | «Prijs per m² en kostenfactoren» | на странице kosten цен за m² больше нет — обещание не совпадает со страницей | — |
| Stukadoor Regio, описание | «Let op: wij richten ons op buitenwerk — geen binnenmuren of plafonds.» | противоречит услугам сайта (binnen stucwerk, /muren-stucen/); если это осознанный фильтр для Ads — оставить, но нужен ответ владельца | 23 |

«Vanaf €110/m²» — только в группе «Gevelisolatie - Kosten & Prijs» (PAUSED): не показывается, но при включении группы вернётся.

Без замечаний: «Gratis opname», «Gecertificeerde ETICS» (о системах производителей — допустимо по `.claude/rules/content-nl.md`), «Snel antwoord via WhatsApp», «Heldere offerte per m²» (это не сумма).

## 2. Поисковые запросы с 2026-07-20

Кампания за окно: 4 556 показов, 458 кликов, €907.92, 20 конверсий [Ads API, 88d, campaign]. Отчёт по запросам видит только 218 кликов, €335.87 и 6 конверсий — меньше половины: остальное Google скрывает как редкие запросы. Выводы ниже — по видимой части.

Конверсии по запросам (по 1): buitengevelisolatie, isolatie buitengevel, crepi buitengevel, buiten stukadoor, buitenmuur laten stucen, spachtelputz buitenmuur [Ads API, 88d, search term].

Наблюдение (не вывод — малые числа): семейство «crepi» — crepi gevel mannen (16 кликов, €19.40), crepi gevel (10, €10.63), crepi (9, €8.16), crepi isolatie (4, €8.72) — 39 кликов, ~€47, 1 конверсия (crepi buitengevel). Самый дорогой запрос без конверсий — «crepi gevel mannen»; смысл «mannen» неясен (возможно, ищут исполнителей-«рабочих»). Пересмотреть при следующем ревью, к 50 кликам.

«Проблемные» запросы (ремонт, трещины, сырость и т. п.): 7 запросов про ремонт штукатурки — всего 11 показов и 0 кликов. Google уже подбирает такие запросы через текущие ключи, но объём ничтожный. Отдельная группа под «проблемные» запросы по видимым данным не оправдана; проверить объём в Keyword Planner перед решением.

## Действия для владельца (по приоритету)

**Статус:** пункты 1–5 применены через API 2026-10-16 по просьбе владельца (фраза про binnenmuren удалена; дополнительно заменён sitelink «Buitengevelisolatie» с «Isolatie installatie met garantie!»). Подробности — в `data/decision_log_v1.csv`.

1. Убрать цены из двух активных объявлений: заголовок «Vanaf €35/m² spachtelputz» (Buiten Stucwerk), заголовок и описание «Vanaf €25/m²» (Gevel Schilderen). Замены — без сумм (например, «Prijs na gratis opname»).
2. Заменить «4,9/5 op Google Reviews» в трёх группах: устарело и противоречит правилу «рейтинг не хардкодить». Вариант без цифры — «Top beoordeeld op Google»; либо не указывать рейтинг в тексте.
3. Переписать описания sitelink «Sierpleister» (убрать «garantie») и «Gevelisolatie kosten» (убрать «Prijs per m²» — например, «Waar de prijs van afhangt»).
4. Ответить, оставлять ли в Stukadoor Regio фразу «geen binnenmuren of plafonds».
5. В паузной группе «Gevelisolatie - Kosten & Prijs» — убрать «Vanaf €110/m²» или удалить группу, чтобы цена не вернулась при включении.

## Ограничения

- Отчёт по запросам покрывает менее половины кликов и треть конверсий.
- 20 конверсий за 88 дней — CPA по отдельным группам и запросам не считать.
- Ассеты-изображения без имён в API не проверялись визуально.

## 3. Изображения (применено 2026-10-16)

35 кадров из фото «после» проектов (`source-images/projects/`), 1200×1200 и 1200×628, по группам: Core 9, Afwerking 8, Buiten Stucwerk 9, Stukadoor Regio 9, Gevel Schilderen 10. Старые ссылки на картинки (27 в группах, 5 рисованных на уровне кампании) отвязаны, ассеты в аккаунте сохранены. Логотип 32×32 на уровне кампании остался — удаление ждёт решения владельца; исходника логотипа в высоком разрешении в репозитории нет (максимум `public/apple-icon.png` 180×180).

## 4. Keyword Planner: «проблемные» и ремонтные запросы

[Ads API Keyword Planner, NL / Rotterdam, avg monthly searches, 2026-10-16]; выгрузка — 557 идей, ниже релевантные.

| Запрос | NL | Rotterdam | Ставка верх. стр., € | В кампании |
|---|---|---|---|---|
| gevelrenovatie | 4 400 | 720 | 2.29–7.55 | нет |
| gevel renoveren / renovatie gevel | 140 | 10 | 2.03–4.43 | нет |
| gevelrenovatie bedrijf | 90 | 10 | 1.69–5.67 | нет |
| scheur in buitenmuur repareren | 260 | 10 | 0.69–2.71 | нет |
| scheur in gevel herstellen | 170 | 10 | 1.02–4.60 | нет |
| sierpleister repareren | 110 | 10 | 0.55–4.73 | нет |
| stucwerk buiten repareren | 90 | 10 | 1.12–3.40 | нет (подбирается через phrase «buiten stucwerk»: 11 показов за 88 дней) |
| vochtige buitenmuur | 170 | 10 | 0.92–4.33 | нет |

Не наши услуги (в минус-слова не добавлены, на заметку): gevelreiniging 2 400, gevel impregneren 1 300, voegwerk / gevel voegen 480 / 260, gevel zandstralen 260.

Интерпретация (средняя уверенность): ремонтные запросы — высокое намерение, но объём в регионе единицы в месяц; добавлять как exact в Buiten Stucwerk — дёшево и безопасно. «gevelrenovatie» — единственный крупный релевантный запрос, но смешанный интент (часть — voegen, reinigen, impregneren); при бюджете ~€10/день может съесть бюджет. Если тестировать — только exact с минус-словами voegen / reinigen / impregneren / zandstralen, посадка /buiten-stucwerk/, ревью через 60 дней.

## 5. Тексты по отзывам Google (применены 2026-10-16 после сверки с сайтом)

Источник: 20 отзывов GBP (API, чтение). Повторяющиеся темы: «komt afspraken na» (3), «denkt mee» (3), «reageert snel», «netjes / gestructureerd», «netjes afgedekt», решённые проблемы с влагой (2), «isolatie + sierpleister», «hele huis aangepakt».

Найдено попутно: в Gevelisolatie - Core безусловные обещания экономии — «Minder stookkosten per jaar», «Nieuwe gevel, lagere kosten», описание «…Lagere energiekosten…» (правило: экономия только условно). В Afwerking — «Kleuradvies en proefvlak mogelijk»: владелец подтвердил 2026-10-16 (proefvlak — по просьбе клиента), оставлено.

| Группа | Заменить | На |
|---|---|---|
| Core | H «Minder stookkosten per jaar» | «Warmer huis, frisse gevel» |
| Core | H «Nieuwe gevel, lagere kosten» | «Isoleren en afwerken in één» |
| Core | H «Muurisolatie buitenmuur huis» | «Top beoordeeld op Google» |
| Core | D «Gevel isoleren met ETICS. Lagere energiekosten en een frisse nieuwe gevel.» | «Buitengevelisolatie met ETICS kan uw stookkosten verlagen. Plus een frisse nieuwe gevel.» |
| Core | D «We werken koudebruggen weg en zorgen voor nette details rond ramen en deuren.» | «Klanten over ons: afspraken nagekomen, meedenken en netjes werk. Bekijk onze projecten.» |
| Afwerking | D «Strakke gevel die jaren meegaat. Minder onderhoud en betere bescherming.» | «Isolatie en afwerking door één team: stuc, sierpleister, crepi of steenstrips.» |
| Afwerking | H «Gevel isoleren en bekleden» | «Wij denken met u mee» |
| Buiten Stucwerk | H «Gevel strak laten stucen» | «Herstel van scheuren in stuc» |
| Buiten Stucwerk | D «Herstel, egaliseren en volledig nieuwe afwerking van uw buitengevel.» | «Scheuren of loszittend stucwerk buiten? Wij herstellen en stucen uw gevel weer strak.» |
| Gevel Schilderen | H «Buitenmuur strak geverfd» | «Netjes afgedekt en opgeleverd» |
| Gevel Schilderen | D «Bescherm uw gevel tegen weer en vocht met een duurzaam verfsysteem.» | «Ramen en deuren netjes afgedekt, gevel vakkundig voorbereid en strak geschilderd.» |


## 6. Применено 2026-10-16 (второй заход)

- 11 замен из раздела 5 (сверено с `lib/content/buiten-stucwerk.ts`, `gevel-schilderen.ts`, `gevelisolatie.ts`: ремонт трещин, укрывание, варианты отделки, условная экономия — без противоречий).
- В Buiten Stucwerk добавлены exact: stucwerk buiten repareren, buiten stucwerk repareren, scheur in gevel herstellen, gevel scheuren herstellen, sierpleister repareren. «gevelrenovatie» не добавлен — ждёт решения владельца.
- Логотип: файл владельца LOGO_BM1.png → 1200×1200 с полями; в кампании разрешён один логотип — старые 200×200 и 32×32 отвязаны.
- Проверка после выгрузки: в активных группах нет «€», «4,9», «garantie», безусловной экономии; все объявления APPROVED на момент проверки.

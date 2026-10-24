# Приложение D. Конкуренты, ссылки и площадки

К отчёту `../indexation_strategy_evidence_2026-10-24.md`.

## D1. Выбор конкурентов

Взяты небольшие и средние компании, которые реально стоят в выдаче по нашим услугам в Роттердаме и соседних городах:

- органика и local pack по 12 запросам в Роттердаме (DataForSEO, 2026-10-01, desktop, location Rotterdam) — сырые данные `snapshots/raw/dataforseo/final_audit_2026-08/serp_local.json`;
- 25 городских выдач 2026-10-24 (mobile, location = город) — см. приложение B.

Национальные сети (takkenkamp, plusisolatie, isolatiespecialist и т. п.) и лидогенераторы (werkspot, trustoo, zoofy, Gigant-сеть) в сравнение не включены: это другой тип бизнеса.

## D2. Сравнение

Источники: ссылающиеся домены и rank — DataForSEO Backlinks `bulk_referring_domains` и `bulk_ranks` (2026-10-24); видимость — DataForSEO Labs `bulk_traffic_estimation`, NL (2026-10-24: ETV — оценка органического трафика в месяц и число ключей; оценки индекса DataForSEO, сравнивать только между доменами); структура — публичные sitemap (скачаны 2026-10-24, классификация URL по шаблонам в пути — эвристика); «городская страница в индексе» — точечный запрос `site:<URL>` через DataForSEO SERP (2026-10-24; найдено — значит в индексе, «не найдено» — скорее всего нет, `site:` не абсолютно надёжен); «полезные доноры» — ссылающиеся домены после грубого фильтра спама (казино, покер, автосгенерированные каталоги, «SEO packet» и т. п.; эвристика по имени домена и spam score ≥ 40).

| Домен | Где виден в наших выдачах | Ссылающихся доменов (всего / main) | Полезных доноров после фильтра | DataForSEO rank | Labs ETV / ключей | URL в sitemap: всего / городских / страниц проектов | Городская страница в индексе? |
|---|---|---|---|---|---|---|---|
| **bm-klus-bv.nl** | sierpleister rotterdam #6 (`/onze-werken/`, 10-01); gevelisolatie delft #9 (10-24) | **1 / 1** | 1 (improuse.com, ugc) | 23 | 5,2 / 13 | 60 / 21 / 21 | 10 из 21 (URL Inspection 10-24) |
| rotterdam-stukadoor.nl | buitenmuur stucen rotterdam #2, sierpleister rotterdam #1 (10-01); stukadoor barendrecht #10 (10-24) | 45 / 43 | 4 | 45 | 20,1 / 31 | 29 / 0 (город в домене) / 0 | — |
| stukadoorsbedrijfhoffman.nl | stukadoor rotterdam #2, buitenmuur stucen rotterdam #4 (10-01) | 161 / 159 | 8 | 101 | 16,3 / 12 | 294 / 255 / 12 | `betonlook-badkamers-maassluis` — не найдена |
| prostukadoors.nl | buitenmuur stucen rotterdam #1, sierpleister rotterdam #7 (10-01); stukadoor barendrecht #3, stukadoor ridderkerk #7 (10-24) | 56 / 54 | 14 | 117 | 73,3 / 124 | sitemap не найден | — |
| gevelstucspecialist.nl | buitenmuur stucen rotterdam #9 (10-01) | **2 / 2** | 2 (vakman-indebuurt.nl, prijzenstucadoor.nl) | 23 | 1,4 / 7 | 31 / 16 / 1 (`/projecten/`) | `buitenmuur-stucen-alphen-aan-den-rijn`, `buitenmuur-stucen-delft` — **в индексе** |
| vanklassestukadoors.nl | local pack «stukadoor rotterdam», «buitenmuur stucen rotterdam» (10-01; 203 отзыва) | 27 / 27 | 10 | 111 | 223,8 / 3 | 38 / 15 / 1 (`/projecten/`) | `stukadoor-hellevoetsluis`, `stukadoor-capelle-aan-den-ijssel` — **в индексе** |
| cpgroenendijk.nl | sierpleister rotterdam #5 (10-01) | 211 / 138 | 45 | 116 | 35,1 / 4 | 21 / 3 / 1 (`/portfolio/`) | — |
| gevelspecialisatierotterdam.nl | gevelrenovatie rotterdam: органика #5 и local pack #1 (10-01) | **7 / 7** | 5 | 63 | 195,0 / 39 | 1 592 / 250 (+ ~1 300 страниц «услуга × город») / 0 | `gevelrenovatie/gouda`, `/maassluis`, `/hellevoetsluis` — **не найдены** |
| oskam-bodegraven.nl | buitenmuur stucen rotterdam #5, gevel stucen #9 — программные страницы `/sitemap/lp/buitenstuc-na-isoleren/<город>.html` (10-01) | 91 / 77 | 20 | 128 | 16,5 / 33 | 3 230 / ~1 100 / 21 | `buitenstuc-na-isoleren/rotterdam.html` — в выдаче #5 (10-01), значит, в индексе |
| stukadoor-at.nl | sierpleister rotterdam #2; local pack «AT Stukadoor Rotterdam» (10-01) | 160 / 157 | 9 | 131 | 9,2 / 12 | 30 / 7 / 1 (`/referenties/`) | — |

Качественная проверка двух индексируемых городских страниц конкурентов (WebFetch, 2026-10-24):

- `gevelstucspecialist.nl/buitenmuur-stucen-delft/` — около 1 000 слов, в основном общий текст с названием города; одна конкретная фраза о прошлой работе в Delft, портфолио — из Leiden, указаны цены €45–150/m².
- `vanklassestukadoors.nl/stukadoor-hellevoetsluis/` — около 1 100–1 200 слов: районы, маршрут из Роттердама, два фото с местом в alt-тексте; конкретных местных проектов и отзывов нет; есть ссылки на 16 других городских страниц.

То есть по качеству они сопоставимы с нашими городскими страницами (около 950 слов, районы, типы домов, FAQ). Индексация у них лучше при похожем качестве текста.

## D3. Где полезные доноры повторяются у локальных конкурентов

Списки ссылающихся доменов: 7 доменов — DataForSEO `referring_domains/live`, топ-100 по rank, 2026-10-24; ещё 8 — из прогона 2026-10-01 (`snapshots/raw/dataforseo/final_audit_2026-08/link_prospects.json`). После фильтра спама — домены, которые ссылаются хотя бы на 2 из 15 локальных конкурентов:

| Донор | Конкурентов | Что это (по имени и выдаче; не проверено вручную, если не сказано иное) |
|---|---:|---|
| onderde.nl | 9 | страницы-каталоги ссылок в стиле «startpagina»; ценность низкая |
| klussercommunity.nl | 8 | сообщество / каталог мастеров |
| bootjevanpapier.nl | 7 | каталог ссылок; ценность низкая |
| vakman-indebuurt.nl | 7 | каталог мастеров по провинциям, есть профили компаний (проверено 2026-10-24); как попасть и есть ли ссылка на сайт — на странице не сказано |
| demargaretha.nl | 5 | не распознано |
| yoys.nl | 4 | не распознано |
| eenstukadoor.nl, stucadoor-nu.nl, kostenstucwerk.nl | 2–3 | сайты-лидогенераторы по stucwerk |
| prijzenstucadoor.nl | 3 | сравнение цен stucwerk (среди его ссылок — у gevelstucspecialist.nl) |
| stagemarkt.nl | 3 | SBB, места практики; только для «erkend leerbedrijf» |
| bedrijvenwegwijzer.nl, bedrijven-index.nl, bedrijvenopdekaart.nl | 2–3 | общие бизнес-каталоги (NAP) |
| gevelkaart.nl | 2 | каталог фасадных компаний (по названию) |
| klantkompas.com | 2 | платформа отзывов |
| komo.nl | 2 | сертификация KOMO — ссылка только при сертификате |
| offerteknaller.nl | 2 | лидогенератор |

Вывод для отчёта: большая часть «ссылающихся доменов» у конкурентов — автоматический спам, полезных — от 1–2 до нескольких десятков, у большинства небольших стукадоров 2–20. Наш разрыв по полезным упоминаниям — «1 против 2–20», а не «1 против сотен».

## D4. Площадки, которые стоит рассмотреть (короткий список)

Принцип: тематическая или локальная площадка, на которой уже есть похожие компании, с одинаковыми NAP-данными (название, адрес, телефон, сайт), как в GBP. Не гнаться за числом. «Проверено» — открывал страницу; остальное нужно проверить при регистрации.

| # | Площадка | Почему оправданно | Что проверить | Статус |
|---|---|---|---|---|
| 1 | Regionaal Energieloket — страницы «vakspecialist» гемент | стоит в выдаче наших городских запросов: «gevelisolatie leiden» #2 (`leiden.regionaalenergieloket.nl`), «gevelisolatie leidschendam» #6 (`…/aan-de-slag/vakspecialist`) [DataForSEO SERP, 2026-10-24]; тема — энергосберегающие меры, в т. ч. gevelisolatie; локально по гементам | условия включения (сертификаты, страховка), есть ли ссылка на сайт | не проверено: страница отдала 403 автоматической проверке |
| 2 | Поставщики систем: Strikolith (марка в 2 наших проектах), GW-Plus | самая тематическая возможная ссылка: «verwerker» / референции / кейс у поставщика | есть ли у поставщика список verwerkers или раздел проектов | не проверено (поиск не нашёл списка) |
| 3 | Реестр VCA (у компании VCA*, подтверждено владельцем 2026-09-30) | официальное подтверждение сертификата; сигнал доверия | даёт ли реестр ссылку на сайт | не проверено |
| 4 | klussercommunity.nl | есть у 8 из 15 локальных конкурентов | условия, ссылка на сайт | не проверено |
| 5 | vakman-indebuurt.nl | у 7 из 15, в т. ч. у gevelstucspecialist.nl (2 донора, городские страницы в индексе) | как зарегистрироваться | частично (сайт и профили есть) |
| 6 | gevelkaart.nl | фасадный каталог; есть у 2 конкурентов | условия | не проверено |
| 7 | bedrijvenwegwijzer.nl, bedrijven-index.nl, bedrijvenopdekaart.nl | базовые NAP-упоминания; есть у 2–6 конкурентов | бесплатный ли базовый профиль | не проверено |
| 8 | klantkompas.com или klantenvertellen.nl | отзывы + ссылка с профиля; klantenvertellen — платный | цена; не дублировать усилия с GBP-отзывами | не проверено |
| 9 | Telefoonboek.nl, De Telefoongids / Goudengids | стоят в local-выдаче (telefoonboek — в «stukadoor rotterdam», «stukadoor barendrecht»; goudengids — #2 «gevelrenovatie rotterdam», 10-01) — это NAP-упоминания, а не «сильные» ссылки | бесплатный базовый профиль | не проверено |

Отдельно — платформы заявок (Werkspot, Trustoo, Homedeal, Solvari): они занимают большую часть локальной выдачи, но это платные заявки, а не SEO-ссылки (профили обычно без dofollow). Решение — бизнес-вопрос владельца с учётом языкового барьера и стоимости заявки.

## D5. Чего избегать

- Группы «editorial_or_partner» из tier A/B `link_prospects_latest.md`, которые ссылаются на один и тот же набор конкурентов — например, 3egolf.nl, passion4web.nl, thealternative.nl, uwbeste.nl, vsenv.nl, grotemarktberaad.nl ссылаются ровно на isolatiespecialist / pluimers / stucadoorsbedrijfdevries. Это типичная сеть платных ссылок; для спам-апдейтов Google это прямой риск (документация Google: при link spam «any ranking benefit the links may have previously generated for your site is lost»).
- Каталоги-«startpagina» и сайты с высоким spam score — малая польза, лишний шум.
- Покупка ссылок пакетами («SEO packet»), обмен ссылками.
- Цель «12 доменов к 15.11» как число: она толкает к низкокачественным площадкам. Лучше 6–10 настоящих упоминаний с одинаковыми NAP за 8 недель.

# Приложение B. 21 городская страница: спрос, выдача, реклама, заявки

К отчёту `../indexation_strategy_evidence_2026-10-24.md`. Источники:

- **KP** — Google Ads Keyword Planner (`GenerateKeywordHistoricalMetrics`), среднее за 12 мес, Google Search, язык nl, выгрузка 2026-10-24. «фраза, NL» — запрос «услуга + город», искали по всей стране; «из города» — общий запрос («gevelisolatie», «stukadoor»), который искали люди, находящиеся в этом городе (гео-таргет = город). «н/д» — Planner не отдал значение (обычно < 10). Значение 10 у малых городов — минимальное значение Planner, читать как «≈10 или меньше».
- **GSC** — запросы с названием города на любых страницах сайта, 2026-03-08…2026-10-21, query-level (анонимизированные запросы не видны).
- **Ads** — Google Ads API, `geographic_view`, местоположение пользователя (presence), все кампании, 2026-04-22…2026-10-21: клики / конверсии.
- **WP** — лог заявок BM Stats v2, поле `city`, все источники, 2026-03-11…2026-10-23 (59 заявок).
- **SERP** — DataForSEO `serp/google/organic/live/advanced`, mobile, location = город, nl, глубина 20, 2026-10-24; классы результатов — эвристика по домену (`platform/leadgen` — каталоги и лидогенераторы; `national` — национальные сети изоляции).
- **Ярус** — зона работ из `seo-ops/knowledge.md` («ядро» и «2-й ярус»); пусто — город в списке не назван.

| Город | Ярус | В индексе 29.09 / 15.10 / 22.10 / 24.10 | Посл. скан. | GSC: запросы с городом (показы, главный запрос) | KP фраза NL: gevelisolatie / stukadoor / gevelrenovatie / isolatiebedrijf / schilder | KP из города: gevelisolatie / stukadoor | Ads: клики / конв. | WP заявки | Наши проекты в городе / рядом |
|---|---|---|---|---|---|---|---|---|---|
| alphen-aan-den-rijn |  | нет / нет / нет / нет | 2026-07-10 | 70; «gevelisolatie alphen aan den rijn» 63 @ 19 | н/д / 110 / 30 / 10 / 260 | 10 / 40 | 1 / 0 | 0 | нет; ближайший — Katwijk (≈20 км) |
| barendrecht | ядро | нет / нет / нет / нет | 2026-07-10 | 1; «stucwerk barendrecht» 1 @ 39 | н/д / 70 / 10 / н/д / 110 | 10 / 20 | 8 / 0 | 2 | нет; рядом Hendrik-Ido-Ambacht (≈8 км), Strijen и Klaaswaal (≈15 км) |
| bergen-op-zoom | 2-й ярус | нет / нет / нет / нет | 2026-07-15 | 1; «gevelreiniging bergen op zoom» 1 @ 88 | н/д / 90 / 10 / н/д / 140 | 10 / 20 | 3 / 0 | 0 | Halsteren (та же гемента) — на странице с 22.10 |
| breda | 2-й ярус | нет / нет / нет / нет | 2026-05-18 | 192; «gevelisolatie breda» 168 @ 19 | н/д / 260 / 40 / 90 / 390 | 20 / 70 | 19 / 1 | 2 | нет в городе; 4 проекта в Etten-Leur (≈12 км) |
| capelle-aan-den-ijssel | ядро | нет / нет / нет / нет | 2026-06-26 | 2; «capelle aan den ijssel» 1 @ 10 | н/д / 50 / н/д / н/д / 70 | 10 / 20 | 2 / 0 | 0 | нет; проекты в Rotterdam |
| delft | ядро | да / да / да / да | 2026-09-25 | 634; «gevelrenovatie met folie in delft» 529 @ 37 | н/д / 110 / 50 / 10 / 210 | 10 / 40 | 5 / 0 | 2 | Delft Willemstraat (на странице) |
| den-haag | 2-й ярус | да / да / да / да | 2026-09-01 | 354; «gevelisolatie den haag» 297 @ 9 | 20 / 390 / 140 / 40 / 480 | 70 / 260 | 49 / 1 | 5 | нет; Delft (≈10 км) |
| dordrecht | ядро | да / да / да / да | 2026-09-16 | 46; «gevelrenovatie met folie in dordrecht» 37 @ 54 | н/д / 210 / 50 / 30 / 260 | 10 / 40 | 12 / 0 | 1 | Dordrecht (на странице) |
| gouda | 2-й ярус | нет / нет / нет / нет | 2026-07-10 | 47; «gevelisolatie gouda» 44 @ 11 | н/д / 140 / 30 / 20 / 170 | 10 / 20 | 6 / 0 | 0 | нет |
| hellevoetsluis |  | нет / нет / нет / нет | 2026-07-10 | 11; «vloerisolatie hellevoetsluis» 11 @ 36 | н/д / 50 / 10 / н/д / 70 | 10 / 10 | 2 / 0 | 0 | нет; Spijkenisse (≈15 км) |
| hendrik-ido-ambacht |  | нет / да / да / да | 2026-10-10 | 7; «gevelreiniging hendrik-ido-ambacht» 4 @ 2 | н/д / 50 / н/д / н/д / 90 | 10 / 20 | 4 / 0 | 0 | Hendrik-Ido-Ambacht (на странице с 22.10) |
| leiden | 2-й ярус | да / да / да / да | 2026-10-18 | 479; «gevelisolatie leiden» 369 @ 7 | н/д / 210 / 20 / 50 / 210 | 10 / 40 | 8 / 0 | 1 | нет; Katwijk (≈15 км) |
| leidschendam-voorburg |  | нет / нет / нет / нет | 2026-07-10 | 34; «gevelwerken voorburg» 23 @ 18 | н/д / 20 / н/д / н/д / 40 | 10 / 20 | 1 / 0 | 1 | нет; Delft (≈10 км) |
| maassluis |  | нет / нет / нет / нет | 2026-06-26 | 77; «isolatie maassluis» 40 @ 23 | н/д / 70 / н/д / н/д / 50 | 10 / 10 | 2 / 0 | 0 | нет; Vlaardingen ×2 (≈7 км) |
| ridderkerk | ядро | нет / нет / нет / нет | 2026-07-10 | 0 | 10 / 50 / н/д / н/д / 110 | 10 / 20 | 12 / 0 | 0 | нет; Hendrik-Ido-Ambacht (≈5 км) |
| roosendaal |  | нет / да / да / да | 2026-10-11 | 2; «gevelrenovatie roosendaal» 2 @ 44 | н/д / 110 / 20 / 30 / 260 | 10 / 30 | 9 / 0 | 0 | нет; Halsteren (≈12 км), Etten-Leur (≈12 км) |
| rotterdam | ядро | да / да / да / да | 2026-09-28 | 2526; «gevelrenovatie met folie in rotterdam» 803 @ 21 | н/д / 480 / 170 / 110 / 390 | 170 / 880 | 100 / 4 | 7 | Julianastraat, cementpleister (на странице), Rottekade |
| schiedam | ядро | да / да / да / да | 2026-09-20 | 13; «klussenbedrijf apostol, schiedamseweg, , rotterdam netherlands» 9 @ 9 | н/д / 90 / 20 / н/д / 140 | 10 / 30 | 10 / 1 | 1 | нет; Rotterdam, Vlaardingen |
| spijkenisse | ядро | да / да / да / да | 2026-09-25 | 2; «gevelrenovatie spijkenisse» 1 @ 98 | н/д / 90 / 10 / 10 / 110 | 10 / 30 | 3 / 0 | 0 | Spijkenisse Malledijk (на странице) |
| vlaardingen | ядро | да / да / да / да | 2026-09-22 | 115; «klussenbedrijf 010 rotterdam vlaardingen» 43 @ 36 | н/д / 90 / 30 / н/д / 110 | 10 / 20 | 4 / 0 | 0 | Vlaardingen ×2 (на странице с 22.10) |
| zoetermeer | ядро | нет / нет / нет / нет | 2026-07-04 | 354; «gevelisolatie zoetermeer» 313 @ 20 | н/д / 140 / 30 / 30 / 320 | 10 / 40 | 12 / 0 | 0 | нет; Delft (≈13 км) |

## Живая выдача по проблемным городам (DataForSEO, 2026-10-24, mobile, location = город)

| Запрос | Наша позиция в топ-20 | AI Overview | Local pack (первые 3) | Классы топ-10 | Местных компаний с городом в URL |
|---|---|---|---|---|---|
| stukadoor alphen aan den rijn | нет | да | Stukadoors Amedi; Wolswijk Stukadoorsbedrijf; De Alphense Stukadoor | local-company 8, platform/leadgen 2 | 7 |
| gevelisolatie barendrecht | нет | да | Isolatiebedrijf Barendrecht; Spouwmuurisolatie Barendrecht; Isolatiebedrijf C.J. van Waas | national-isolatie 2, local-company 4, platform/leadgen 4 | 2 |
| stukadoor barendrecht | нет | да | Stukadoor Barendrecht; Stucadoorsbedrijfzwaneveld; Spack en structuur spuitbedrij | local-company 8, platform/leadgen 2 | 4 |
| stukadoor bergen op zoom | нет | да | Stukadoorsbedrijf D. van Mouri; Wijmans Afbouw; Stukadoorsbedrijf AVG | local-company 8, platform/leadgen 2 | 5 |
| gevelisolatie breda | нет | да | Isolatiebedrijf Breda; Home Isolatie; Spouwmuurisolatie Breda | local-company 4, national-isolatie 5, platform/leadgen 1 | 4 |
| stukadoor breda | нет | да | Stukadoor Breda; Stukadoorsbedrijf P. VD Velden; Stukadoor Breda | local-company 6, platform/leadgen 4 | 5 |
| gevelisolatie capelle aan den ijssel | нет | да | — | local-company 9, platform/leadgen 1 | 9 |
| stukadoor capelle aan den ijssel | нет | да | — | local-company 7, platform/leadgen 3 | 2 |
| gevelisolatie gouda | нет | да | Isolatiebedrijf Gouda; duurzame spouwmuurisolatie / S; Ecoflex Isolatie | national-isolatie 2, local-company 6, platform/leadgen 2 | 5 |
| stukadoor gouda | нет | да | Britsemmer Stucadoor; Stukadoor Gouda; Stukadoor Gouw Gesmeerd | local-company 8, platform/leadgen 2 | 7 |
| gevelisolatie hellevoetsluis | нет | да | Isolatiebedrijf Hellevoetsluis; GRC Isolatie; Vloerisolatie Hellevoetsluis | national-isolatie 5, local-company 2, platform/leadgen 3 | 2 |
| stukadoor hellevoetsluis | нет | да | Stucadoorsbedrijf Hoekstra; R Bos Stucadoorswerk; Boudesteijn Stukadoors | platform/leadgen 2, local-company 8 | 4 |
| gevelisolatie leidschendam | нет | да | — | local-company 6, platform/leadgen 3, national-isolatie 1 | 4 |
| stukadoor leidschendam | нет | да | Bianco Stukadoors; Stucwerk Jansen; ten Wolde Stukadoors- en Onder | local-company 7, platform/leadgen 3 | 0 |
| gevelisolatie maassluis | нет | да | DeIsoleerMeneer; Efficiënte Spouwmuurisolatie /; Altuntas Isolatie B.V. | local-company 6, platform/leadgen 3, national-isolatie 1 | 5 |
| stukadoor maassluis | нет | да | Stukadoor Maassluis; Stukadoorswereld - Stukadoor W; MRT Stukadoor | local-company 6, platform/leadgen 4 | 4 |
| stukadoor ridderkerk | нет | да | Stukadoor Ridderkerk; Stukadoorsbedrijf Van der Krui; Stukadoorsbedrijf J.Bos | local-company 5, platform/leadgen 5 | 2 |
| gevelisolatie zoetermeer | нет | да | Isolatiebedrijf Zoetermeer; isa isolatie; Spouwmuurisolatie Zoetermeer | local-company 5, national-isolatie 2, platform/leadgen 3 | 5 |
| stukadoor zoetermeer | нет | да | Stucadoorsbedrijf de Vries / S; Stukadoor Zoetermeer; STUCLUXE BV STUKADOORSBEDRIJF | local-company 7, platform/leadgen 3 | 4 |
| gevelisolatie leiden | нет | да | Spouwmuur leadgen Leiden; Isolatiebedrijf Leiderdorp; Dakisolatie Leiden | national-isolatie 1, local-company 7, platform/leadgen 2 | 6 |
| gevelisolatie den haag | нет | да | Den Haag Spouwmuurisolatie; Gevelisolatie nieuwbouw; Isolatiebedrijf Den Haag | local-company 7, platform/leadgen 3 | 6 |
| gevelisolatie delft | 9 | да | Isolatiebedrijf Delft; Spouwmuurisolatie Delft; ALSA Isolatie | national-isolatie 3, local-company 5, platform/leadgen 1, us 1 | 5 |
| buitengevelisolatie | нет | да | Isolex&Zn / Gevel & Dak Isolat; Isoleerbewust; OC Totaal Bouw Nederland | local-company 9, platform/leadgen 1 | 0 |
| gevelisolatie buitenkant | нет | да | — | local-company 8, platform/leadgen 2 | 0 |

По «gevelisolatie alphen aan den rijn», «gevelisolatie bergen op zoom» и «gevelisolatie ridderkerk» DataForSEO вернул ошибку 40101 (Internal SE Server Error) — данных нет, повтор не делался.

Общее наблюдение по выдаче: «gevelisolatie {город}» Google понимает как любую изоляцию — в топ-10 spouwmuur- и vloerisolatie, городские страницы национальных сетей (plusisolatie, pluimers, isolatiespecialist), лидогенераторы (werkspot, trustoo, zoofy, isolatie.website), страницы гемент и энергоботов о субсидиях, микросайты вида `{город}-isolatie.extraisolatie.nl`. ETICS-подрядчиков почти нет. «stukadoor {город}» — местные стукадоры, каталоги и домены с городом в имени; интент в основном внутренние работы.

# Приложение C. 21 страница проектов: факты, текст, ссылки, индексация

К отчёту `../indexation_strategy_evidence_2026-10-24.md`. Источники: серверный HTML 24.10 (релиз `6347d83`); исходники `app/onze-werken/<slug>/page.tsx`, `lib/content/projects.ts`, `lib/content/projects/<slug>.ts`; URL Inspection; GSC 2026-03-08…2026-10-21.

- «Шаблон»: «старый» — 11 страниц, у которых `<title>` обрезан многоточием («… | BM klus BV»); все они перенесены со старого WordPress (301-редиректы в `deploy/apache/root.htaccess`). «новый» — остальные 10 (Halsteren тоже был на WordPress, но title не обрезан).
- «Скрыто»: описания пунктов блока «Wat hebben we uitgevoerd?», которых нет в HTML (рендерится только активный пункт, `components/sections/projects/WerkzaamhedenAccordion.tsx`).
- Факты найдены регулярными выражениями в видимом и скрытом тексте: m², cm, марки, отделка, тип дома. Пусто — в тексте не найдено.
- «Входящие» — внутренние ссылки с других страниц сайта (все виды); источники — ссылки вне header/footer/nav.

| Проект | Шаблон | В индексе 29.09 / 15.10 / 22.10 / 24.10 | Посл. скан. | Показы / клики, всё | Видимых слов / скрыто | Повтор | Фото до / после | m² | cm | Марки | Тип дома | Видео | Входящие (откуда) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `almere-gevelisolatie-35m2-sierpleister-2024` | старый | да / да / нет / нет | 2026-07-09 | 81 / 1 | 574 / 91 | 29 % | 8 / 5 | 35 | — | gw-plus | — | — | 1 (ow/) |
| `bruinisse-gevelisolatie-6cm-sierpleister-2025` | старый | да / да / да / да | 2026-09-21 | 5 / 0 | 585 / 103 | 39 % | 11 / 10 | — | 30, 6 | — | — | — | 1 (ow/) |
| `dordrecht-gevelisolatie-10cm-sierpleister-2025` | старый | да / да / да / да | 2026-09-17 | 32 / 0 | 618 / 97 | 45 % | 12 / 6 | — | 10, 30 | — | — | — | 3 (g/afwerkingen/, g/dordrecht/, ow/) |
| `katwijk-gevelisolatie-6cm-sierpleister-2024` | старый | нет / нет / нет / нет | нет | 4 / 0 | 562 / 56 | 34 % | 7 / 4 | — | 6 | — | hoekwoning | — | 1 (ow/) |
| `klaaswaal-gevelisolatie-6cm-sierpleister-2025` | старый | нет / нет / нет / нет | 2026-06-14 | 8 / 0 | 625 / 107 | 33 % | 11 / 6 | — | 1, 30, 6 | — | — | — | 1 (ow/) |
| `nieuw-beijerland-gevelisolatie-12cm-sierpleister-2025` | старый | да / да / да / да | 2026-07-04 | 2 / 0 | 497 / 56 | 32 % | 12 / 6 | — | 12 | — | vrijstaande woning | — | 3 (g/afwerkingen/, ow/, /sierpleister/) |
| `rottekade-gevelisolatie-schilderwerk-2024` | старый | да / да / нет / нет | 2026-07-14 | 3 / 0 | 579 / 76 | 27 % | 16 / 9 | — | 10 | — | — | — | 1 (ow/) |
| `rotterdam-buitenstucwerk-cementpleister-2025` | старый | да / да / нет / нет | 2026-10-18 | 20 / 0 | 528 / 60 | 24 % | 5 / 7 | — | — | — | — | — | 3 (/buiten-stucwerk/, g/rotterdam/, ow/) |
| `vlaardingen-gevelisolatie-10cm-sierpleister-2025` | старый | да / да / нет / нет | 2026-10-18 | 19 / 0 | 548 / 69 | 40 % | 7 / 5 | — | 10, 15 | — | — | — | 2 (g/vlaardingen/, ow/) |
| `vlaardingen-gevelisolatie-6cm-sierpleister-2024` | старый | нет / нет / нет / нет | 2026-05-01 | 23 / 0 | 492 / 66 | 36 % | 10 / 3 | — | 10, 6 | trespa | — | — | 2 (g/vlaardingen/, ow/) |
| `vught-gevelisolatie-10cm-sierpleister-2024` | старый | да / да / да / да | 2026-07-27 | 29 / 0 | 613 / 109 | 36 % | 6 / 3 | — | 10, 15, 30 | — | hoekwoning | — | 1 (ow/) |
| `delft-willemstraat-gevelrenovatie-schilderwerk-2026` | новый | да / да / да / да | 2026-09-29 | 82 / 0 | 722 / 123 | 19 % | 16 / 7 | — | — | keralit | — | — | 6 (/, /buiten-stucwerk/, /gevel-schilderen/, /gevel-schilderen/keimen/, g/delft/, ow/) |
| `etten-leur-bankenstraat-gevelisolatie-dakrenovatie-2026` | новый | да / да / да / да | 2026-09-28 | 189 / 2 | 768 / 162 | 22 % | 31 / 17 | — | — | trespa | — | да | 3 (/, g/, ow/) |
| `etten-leur-bankenstraat-stucwerk-sierpleister-2024` | новый | — / — / — / да | 2026-10-22 | 0 / 0 | 571 / 52 | 24 % | 5 / 11 | — | — | — | — | — | 1 (ow/) |
| `etten-leur-gevelisolatie-10cm-ral9010-2025` | новый | да / да / да / да | 2026-08-23 | 204 / 4 | 643 / 112 | 23 % | 17 / 7 | — | 10 | strikolith | — | — | 2 (/gevel-schilderen/, ow/) |
| `etten-leur-gevelisolatie-6cm-strikolith-2025` | новый | да / да / да / да | 2026-10-23 | 125 / 0 | 603 / 112 | 25 % | 10 / 9 | — | 6 | gw-plus, strikolith | — | — | 1 (ow/) |
| `halsteren-buitenstucwerk-sierpleister-schilderwerk-2025` | новый | да / да / да / да | 2026-09-15 | 381 / 0 | 497 / 123 | 23 % | 21 / 10 | — | 50 | — | — | — | 6 (/buiten-stucwerk/, /gevel-schilderen/, g/afwerkingen/, g/bergen-op-zoom/, ow/, /sierpleister/) |
| `hendrik-ido-ambacht-gevelrenovatie-2024` | новый | нет / нет / нет / нет | 2026-07-25 | 15 / 0 | 652 / 117 | 22 % | 11 / 16 | — | — | — | — | — | 2 (g/hendrik-ido-ambacht/, ow/) |
| `rotterdam-julianastraat-aanbouw-isolatie-4cm-2026` | новый | да / да / да / да | 2026-07-29 | 122 / 1 | 705 / 103 | 24 % | 10 / 6 | — | 30, 4 | — | aanbouw | да | 4 (/, g/, g/rotterdam/, ow/) |
| `spijkenisse-malledijk-stucwerk-schilderwerk-2024` | новый | да / да / да / да | 2026-10-12 | 6 / 0 | 721 / 97 | 18 % | 7 / 5 | — | — | — | — | — | 3 (g/spijkenisse/, /muren-stucen/sausklaar-behangklaar/, ow/) |
| `strijen-schenkeldijk-gevelisolatie-sierpleister-2026` | новый | да / да / да / да | 2026-10-18 | 14 / 0 | 708 / 118 | 20 % | 8 / 14 | — | 6 | gw-plus | aanbouw | — | 4 (/, g/, ow/, /sierpleister/) |

## Сводка по шаблонам

| Группа | Страниц | В индексе 24.10 | Видимых слов (среднее) | Повтор (среднее) | Входящих ссылок (среднее) |
|---|---|---|---|---|---|
| старый шаблон | 11 | 4 | 566 | 34 % | 1.7 |
| новый шаблон | 10 | 9 | 659 | 22 % | 3.2 |

Точный тест Фишера (в индексе / нет × старый / новый шаблон): p = 0,024 (двусторонний). Выборка мала, признаки шаблона (объём, повтор, ссылки, возраст страницы) между собой связаны — какой из них решает, по этим данным не разделить.

Расхождения в данных проектов (для владельца): у Almere в URL и title год 2024, в `projects.ts` — 2025; у Rottekade в поле города стоит «Rottekade» (это набережная в Роттердаме, город не указан); у Spijkenisse Malledijk услуга в карточке — «Muren stucen», в URL — stucwerk & schilderwerk.

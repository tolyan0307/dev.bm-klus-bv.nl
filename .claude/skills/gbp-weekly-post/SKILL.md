---
name: gbp-weekly-post
description: Раз в неделю готовит один пост для Google Business Profile BM klus BV (nl-NL) по реальному кейсу с bm-klus-bv.nl — текст, кнопка с UTM, фото, чеклист. Публикует человек. Запускать по /gbp-weekly-post или просьбе «новый пост для GBP».
---

# Еженедельный пост для Google Business Profile — BM klus BV

## 1. Цель

Подготовить **один** пост для профиля BM klus BV в Google Business Profile: готовый текст на нидерландском, ссылку кнопки с UTM-метками, точное указание, какое фото приложить, и чеклист публикации. Агент **не публикует** — публикует человек за две минуты. Причина: политика фото Google Business Profile требует реальных снимков бизнеса — ИИ-сгенерированные и стоковые изображения запрещены, поэтому фото к посту должно быть настоящим снимком объекта, а его прикладывает человек.

Один запуск — один пост. Никаких «сделать сразу на месяц вперёд».

## 2. Неизменяемые факты (не искать заново, не менять)

**Компания:** BM klus BV, Rotterdam. Специализация — buitengevelisolatie (ETICS), buiten stucwerk, sierpleister/crepi, gevel schilderen, binnenstucwerk. Eigen team, geen onderaannemers. VCA*-gecertificeerd. KVK 77356039. Основана 17-02-2020.

**Сайт:** https://bm-klus-bv.nl/ — единственный источник фактов.

**Профиль GBP:** основная категория `Aannemer voor isolatie`, доп.: `Aannemer`, `Schilder`, `Stukadoorsbedrijf`, `Bouwbedrijf`. Язык профиля — только nl-NL.

**Цены не публикуются.** С 2026-09-05 по решению владельца на публичных страницах сайта нет ни одной цены (см. `CLAUDE.md` в корне репозитория, раздел «Правила, которые легко нарушить»). В постах запрещены любые суммы в €, «vanaf €…», диапазоны per m², «richtprijs» с цифрой — даже если такие цифры встречаются в старых постах, в памяти или в чужих промптах. Вместо цены пишем, что её определяет (Rc-waarde en dikte, afwerking, detaillering, steiger) и что «een exacte prijs per m² volgt na een opname op locatie».

**Техника (только как справка; цифру можно взять в пост, только если она есть на странице-источнике этого поста):** Rc 3,5 m²K/W ≈ 135 mm EPS / 125 mm minerale wol / 90 mm PIR (таблица на `/gevelisolatie/rc-waarde-dikte/`, расчёт в `lib/constants/rc-waarde.ts`); totale ETICS-opbouw ca. 10–18 cm. Слои: lijm + pluggen → isolatieplaten → wapeningslaag (mortel + glasvezelweefsel) → afwerklaag. Детали: dagkanten, kozijnaansluiting met afdichtingsprofiel, hoekprofielen, plint/spatwaterzone.

**Субсидия/разрешение (та же оговорка про цифры):** ISDE — minimaal Rd 3,5 m²K/W, aanvraag ná uitvoering binnen 24 maanden, rvo.nl. Omgevingsvergunning — per gemeente, wij checken vooraf gratis.

**Оффер:** gratis opname/inspectie op locatie; vrijblijvende offerte; werkgebied rond Rotterdam. Сроки («binnen 24–48 uur») и радиус («80–100 km») называть только если они есть на странице-источнике поста; иначе — без цифр.

**Города с посадочными `/gevelisolatie/<slug>/`:** Rotterdam, Den Haag, Delft, Dordrecht, Schiedam, Vlaardingen, Leiden, Gouda, Zoetermeer, Capelle aan den IJssel, Spijkenisse, Barendrecht, Ridderkerk, Alphen aan den Rijn, Maassluis, Hellevoetsluis, Breda, Bergen op Zoom, Roosendaal, Leidschendam-Voorburg, Hendrik-Ido-Ambacht.

**Контакты в тексте поста не допускаются** (телефон, e-mail, адрес): Google отклоняет такие посты автоматически.

## 3. Состояние между запусками

Файл `seo-ops/gbp-posts/log.jsonl` (пути в этом skill — от корня репозитория `D:\projects\bmklus\v0-site\site`; поле `file` в логе — от `seo-ops/`) — одна строка на пост:

```json
{"week":"2026-W36","type":"case","source":"/onze-werken/dordrecht-gevelisolatie-10cm-sierpleister-2025/","slug":"dordrecht","file":"gbp-posts/2026-W36-dordrecht.md","published":true}
```

Если файла нет — создать и записать в него уже опубликованный первый пост (строка выше). Перед генерацией **прочитать весь лог**: источник не должен повторяться раньше, чем через 12 постов; тип поста берётся по ротации из раздела 4.

Запись с `"superseded": true` — отменённый черновик (например, `2026-W37-faq-kosten`, снят из-за удаления цен). Такие записи игнорировать и при проверке `published`, и при ротации; они остаются в логе только как история.

Это единственная версия skill. Облачную копию в claude.ai не используем (решение 2026-09-29): у облака нет доступа к репозиторию и логу, а облачная рутина с 2026-09-28 падала с ошибкой 403.

## 4. Ротация типов

Цикл из четырёх недель, по кругу:

| # | Тип | Источник | Кнопка ведёт на |
|---|---|---|---|
| 1 | `case` — объект недели | страница из `/onze-werken/` | страницу кейса или `/gevelisolatie/<город>/`, если для города есть посадочная |
| 2 | `faq` — вопрос-ответ | пара из раздела 6 | страницу, указанную у пары |
| 3 | `city` — город | `/gevelisolatie/<slug>/` из списка городов раздела 2 + любой кейс из этого города или соседнего | эту посадочную |
| 4 | `service` — услуга | страница услуги (`/sierpleister/`, `/buiten-stucwerk/`, `/gevel-schilderen/`, `/gevel-schilderen/keimen/`, `/muren-stucen/`) | эту страницу услуги |

Тип текущей недели = следующий после последней записи в логе (без `superseded`).

## 5. Алгоритм

1. **Прочитать лог**, определить `week` (ISO, например `2026-W37`), тип и список уже использованных источников (записи с `"superseded": true` не считать). Если у последней не-superseded записи `published` не `true` (`false` — ещё не опубликован, `null` — неизвестно), новый пост не готовить: показать файл и текст этого поста (если `file: null` — текста в репозитории нет, назвать источник и тип), спросить владельца, опубликован ли он, и остановиться. Ответ записать в лог: `true` с `published_at` или `false`.
2. **Получить список кандидатов** из `https://bm-klus-bv.nl/sitemap.xml`. Для `case` — все URL под `/onze-werken/`; для `city` — города из раздела 2 (под `/gevelisolatie/` есть и тематические страницы, это не города); для `service` — страницы из таблицы раздела 4; для `faq` — раздел 6.
3. **Выбрать источник:** не использованный в последних 12 постах; при равных условиях — более свежий год в slug (2026 > 2025 > 2024) и город, которого давно не было.
4. **Загрузить страницу и извлечь факты.** Сайт — статический экспорт Next.js: весь контент уже в HTML, `curl -sL <url>` достаточно всегда (headless-браузер не нужен, ничего не устанавливать). Из репозитория надёжнее брать факты прямо из `app/onze-werken/<slug>/page.tsx` и `lib/content/projects/<slug>.ts`. Извлечь **только то, что написано на странице**: город, год, толщину изоляции (cm), материал (напр. Strikolith), отделку (sierpleister/stuc/crepi/steenstrips), цвет (RAL), дополнительные работы (plint, raamdorpels, daklijst, sokkel), тип объекта (woning/bedrijfspand). **Проверка цифр обязательна:** каждую цифру, которую планируешь использовать, найти в HTML страницы (`grep` в Git Bash). Если на странице нет ни одной подходящей цифры — пост пишется без цифр, это нормально. Знак `€` на странице-источнике отсутствовать должен; если он есть — это не повод называть цену (см. раздел 2).
5. **Написать текст** по правилам раздела 7.
6. **Собрать ссылку кнопки:** тип кнопки всегда `Meer informatie`; URL = целевая страница + `?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=post-<slug>`, где `<slug>` — короткий латинский идентификатор поста (`etten-leur`, `faq-kosten`, `city-delft`, `service-sierpleister`).
7. **Фото:** для `case` — «na»-фото той же страницы (блок «Na de werken»); для `city` / `service` / `faq` — «na»-фото подходящего кейса (если кейс из другого города, город в тексте = город кейса с фото). Каждого кандидата смотреть в полный размер: в миниатюре не видно деревьев перед фасадом, лесов, машин, скотча. Предпочтение — горизонтальный кадр, дом целиком, без лесов и мусора; у кейсов 2026 многие фото вертикальные — тогда лучше горизонтальный кадр другого кейса с тем же типом работ. Оригинал — `source-images/projects/<slug>/<slug>-na-NN.jpg` (у старых кейсов — без подпапки, искать по имени). Готовый файл для GBP (JPG 1200×900, 4:3):
   ```bash
   node -e "require('sharp')(process.argv[1]).rotate().resize(1200,900,{fit:'cover',position:'attention'}).jpeg({quality:85}).toFile(process.argv[2])" <оригинал.jpg> seo-ops/gbp-posts/media/gbp-<slug>-<год>-4x3.jpg
   ```
   Подробнее о форматах для GBP — `docs/IMAGE-PIPELINE.md` §4.4.
8. **Прогнать чеклист** раздела 8. Любой провал — переписать, не публиковать «с оговоркой».
9. **Сохранить** `seo-ops/gbp-posts/<week>-<slug>.md` по шаблону раздела 9 и **дописать строку в лог** с `"published": false`.
10. Вывести человеку: путь к файлу, текст поста в code-блоке, URL кнопки, какое фото взять. Человек публикует и меняет `published` на `true` (или просит агента).

## 6. Пары вопрос-ответ для типа `faq` (использовать по порядку, затем по кругу с новыми формулировками)

1. **Wat bepaalt de prijs van buitengevelisolatie per m²?** — De Rc-waarde en isolatiedikte, de gekozen afwerking (stuc, sierpleister, crepi of steenstrips), de detaillering rond kozijnen en plint, en of er een steiger nodig is. Een exacte prijs per m² volgt na een opname op locatie. Geen bedragen noemen. → `/gevelisolatie/kosten/`
2. **Welke Rc-waarde en isolatiedikte heb ik nodig?** — Bij Rc 3,5 m²K/W: circa 135 mm EPS, 125 mm minerale wol of 90 mm PIR. Totale opbouw doorgaans 10–18 cm. Wij rekenen het tijdens de opname uit. (Цифры брать только если они стоят в таблице на `/gevelisolatie/rc-waarde-dikte/` — проверить grep'ом.) → `/gevelisolatie/rc-waarde-dikte/`
3. **EPS, PIR of minerale wol — wat kies ik?** — EPS: veelzijdig, goede prijs-kwaliteit. PIR: dezelfde Rc met minder centimeters. Minerale wol: sterk op brandgedrag en dampopenheid. Advies per project. → `/gevelisolatie/materialen/`
4. **Welke afwerking kan ik kiezen?** — Glad stucwerk (strak), sierpleister/spachtelputz (getextureerd, laag onderhoud), crepi (grof, rustiek), steenstrips (baksteen-look, zeer laag onderhoud). → `/gevelisolatie/afwerkingen/`
5. **Heb ik een omgevingsvergunning nodig?** — Soms: bij zichtbare verandering van het gevelbeeld en bij beschermd stads- of dorpsgezicht. Per gemeente verschillend; wij checken het vooraf gratis. → `/gevelisolatie/subsidie-vergunning/`
6. **Kan ik subsidie krijgen (ISDE)?** — Minimaal Rd 3,5 m²K/W van het isolatiemateriaal; aanvraag ná uitvoering, binnen 24 maanden; voorwaarden op rvo.nl; wij helpen met documentatie. → `/gevelisolatie/subsidie-vergunning/`
7. **In welke plaatsen werken jullie?** — Vanuit Rotterdam in een straal van 80–100 km: Schiedam, Vlaardingen, Capelle aan den IJssel, Dordrecht, Delft, Den Haag, Zoetermeer, Leiden, Gouda, Breda en meer. → `/diensten/`
8. **Hoe snel krijg ik een offerte?** — Gratis opname op locatie; daarna een offerte met scope, Rc-waarde en afwerking. Snelste weg: WhatsApp met woonplaats en foto's. (Termijn «24–48 uur» alleen noemen als die op `/contact/` staat.) → `/contact/`
9. **Werken jullie met onderaannemers?** — Nee: eigen vakmensen, één aanspreekpunt, VCA*-gecertificeerd, KVK 77356039. → `/over-ons/`

## 7. Правила текста

- Язык — **только нидерландский**. Ни одного русского, английского или украинского слова, в том числе в служебных пометках внутри текста.
- Длина **350–700 знаков** (лимит Google 1500; первые ~100 знаков видны до раскрытия — они должны содержать город или суть).
- Не больше **одной** конкретной цифры со страницы-источника (толщина, Rc, korrel) и **один** город. Без цифр — тоже нормально.
- Структура: 1) что сделано / о чём вопрос → 2) одна деталь, которую заметит клиент (dagkanten, plint, RAL, korrel) → 3) призыв: gratis opname / vrijblijvende offerte (срок называть только если он есть на странице-источнике).
- Первая фраза **не должна** совпадать по конструкции ни с одним из последних 8 постов в логе. Запрещено начинать три поста подряд с названия города.
- Города — в голландском написании, посимвольно как в URL посадочной (`Capelle aan den IJssel`, `Den Haag`).
- Нельзя: телефон, e-mail, адрес, слова «goedkoopste», «beste van Nederland», «garantie» в любом виде (пока владелец не подтвердит условия гарантии), CAPS, больше одного эмодзи, восклицательные знаки подряд, любые цифры, которых нет на странице-источнике.
- **Цены — никогда:** ни одной суммы в €, ни «vanaf», ни «richtprijs» с цифрой, ни диапазона per m². Причина в разделе 2. Тема «kosten» допустима только как «wat bepaalt de prijs» + «prijs na opname».
- Тон — как на сайте: спокойный, предметный, «wij» и «u».

## 8. Чеклист перед сохранением (все пункты — обязательны)

- [ ] Каждая цифра в тексте найдена на странице-источнике (записать, откуда).
- [ ] В тексте нет знака € и нет цены ни в каком виде.
- [ ] Город и год совпадают с URL кейса.
- [ ] Нет телефона / e-mail / адреса / контактных призывов «bel ons op …».
- [ ] Только nl-NL.
- [ ] 350–700 знаков.
- [ ] Первая фраза не повторяет последние 8 постов; источник не использовался в последних 12.
- [ ] URL кнопки открывается (HTTP 200) и содержит все четыре UTM-параметра.
- [ ] Указано конкретное фото: страница + блок «Na de werken» + порядковый номер; кадр просмотрен в полный размер; JPG 1200×900 лежит в `seo-ops/gbp-posts/media/`.
- [ ] Фото — реальный снимок объекта; никаких сгенерированных или стоковых.

## 9. Шаблон выходного файла `seo-ops/gbp-posts/<week>-<slug>.md`

```markdown
# GBP-post <week> · <type> · <slug>

**Bron:** <URL страницы-источника>
**Feiten uit bron:** <город>, <год>, <толщина>, <материал>, <отделка>, <прочее> — с указанием, где на странице найдено

## Tekst (kopiëren als geheel)

<текст поста>

## Knop

Type: Meer informatie
URL: <целевая страница>?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=post-<slug>

## Foto

Pagina: <URL кейса> → blok «Na de werken», foto <n>
Klaar voor upload: `seo-ops/gbp-posts/media/gbp-<slug>-<год>-4x3.jpg` (1200×900)
Eisen: echte foto, JPG/PNG (WebP niet toegestaan), min. 400×300, aanbevolen 1200×900, 4:3, 10 KB–5 MB

## Publiceren (mens, ~2 minuten)

1. google.com/search?q=BM+klus+BV&hl=nl → blok «Je bedrijf op Google» → **Posts** → **Post toevoegen** → **Update**
2. Tekst plakken (teller moet <N>/1.500 tonen) · foto uploaden · **+ Knop → Meer informatie** → URL plakken
3. «Deze post plannen» uit laten → publiceren → status «In behandeling» (moderatie)
4. In `seo-ops/gbp-posts/log.jsonl` bij deze week `"published": true` zetten (of Claude vragen)

## Checklist

- [x] … (все пункты раздела 8 с отметкой)
```

## 10. Что агент делать НЕ должен

- Публиковать самостоятельно или через API без отдельного поручения.
- Генерировать, дорисовывать или брать со стоков изображения.
- Придумывать объекты, города, сроки, отзывы клиентов. Называть цены — в любом виде, даже «примерные» и даже если они где-то записаны.
- Писать посты «Aanbieding» или «Evenement» — только «Update».
- Менять что-либо ещё в профиле (категории, описание, услуги, товары).
- Готовить больше одного поста за запуск.

## 11. Готово, когда

Файл поста создан, JPG для загрузки готов, все пункты чеклиста отмечены, строка добавлена в лог, человеку выведены текст, URL кнопки и фото.

# Ads Restructure v2 — план внесения изменений в кампанию 23271040037

**Дата:** 2026-07-19 · **Кампания:** NL | Gevelisolatie | Search (23271040037) · **Аккаунт:** 590-225-6023
**Основание:** стратегия v2 (`reports/combined/strategy_v2_draft_2026-07-19.md`), снимок структуры `D:\projects\bmklus\google\outputs\campaign_structure_20260719.txt`
**Кто вносит:** владелец (система read-only). **Порядок внесения — строго по §6.**

---

## 1. Текущее состояние (снимок 2026-07-19)

| Параметр | Значение | Вердикт |
|---|---|---|
| Бюджет | €9/день | → поднять до €13 |
| Ставки | Maximize Conversions, без tCPA | оставить (tCPA ~€45 — через 4–6 недель) |
| Гео | радиус 80 км от Роттердама, presence-only; BE/DE исключены | **уже правильно — не трогать** |
| Сети | только Google Search (партнёры/КМС выкл.) | правильно — не трогать |
| Негативы | 77 шт. (DIY, магазины, декор) | хорошая база → дополнить (§4) |
| Группы | 7, все только про gevelisolatie | добавить 3 группы фасадного комплекса (§3) |
| Объявления | RSA во всех группах, качественные | новые RSA только для новых групп (§5) |

Главная проблема кампании — **не настройки, а охват тем**: изоляция есть, а исторические конвертеры «buiten stucwerk» (CPA €26) и «gevel schilderen» (CPA €22–46) отсутствуют.

---

## 2. Паузы в существующих группах

### 2.1. Группы целиком → PAUSED (инфо-интент, 0 конверсий за всю историю)
- **Gevelisolatie - Technisch** (rc-waarde, dikte, koudebrug — исследовательская стадия)
- **Gevelisolatie - Materialen** (eps/pir/kingspan — сравнение материалов, не найм)
- **Gevelisolatie - Subsidie & Vergunning** (ранняя стадия; субсидии закрывает SEO-страница)

### 2.2. Отдельные ключи → PAUSED
| Группа | Ключ | Match | Причина [Ads API, 15.03–18.07] |
|---|---|---|---|
| Core | huis isoleren buitenkant | EXACT | €56, 0 conv (и исторически CPA €72) |
| Core | huis aan buitenkant isoleren | PHRASE | €28, 0 conv |
| Core | huis aan de buitenkant isoleren | EXACT | €16, 0 conv |
| Core | isolatie buitengevel | PHRASE | €42, 0 conv (взамен включить EXACT — сейчас он на паузе) |
| Afwerking | buitenmuur isoleren en stucen | PHRASE | €114, 0 conv |
| Afwerking | buitenmuur isoleren en stucen | EXACT | €9, 0 conv |
| Afwerking | gevel isoleren en bekleden | PHRASE | €257 / 4 conv (CPA €64) — сужаем до EXACT, ревизия через 4 нед. |
| Afwerking | nieuwe gevel plaatsen met isolatie | EXACT | €5, 0 conv, нерелевантный интент |

### 2.3. Включить обратно (ENABLED)
| Группа | Ключ | Match | Причина |
|---|---|---|---|
| Core | isolatie buitengevel | EXACT | исторически 5 conv, CPA €34 — точная форма вместо фразовой |

Остальное в Core/Afwerking/Kosten&Prijs/Offerte не трогаем.

---

## 3. Новые группы объявлений

### Группа A: «Buiten Stucwerk» → лендинг `https://bm-klus-bv.nl/buiten-stucwerk/`
Исторические показатели темы: buiten stucwerk — 30.5 conv @ €26; pleisterwerk buiten — 10 @ €30; gevel stucwerk — 6 @ €22; search terms spachtelputz buitenmuur @ €2, buiten stukadoor @ €3.

| Ключ | Match |
|---|---|
| buiten stucwerk | EXACT + PHRASE |
| buitenstucwerk | EXACT |
| gevel stucen | EXACT + PHRASE |
| gevel stucwerk | EXACT |
| buitengevel stucen | EXACT |
| buitenmuur stucen | EXACT + PHRASE |
| pleisterwerk buiten | EXACT |
| stucwerk buitenmuur | EXACT |
| stukadoor buitengevel | EXACT |
| buiten stukadoor | EXACT |
| spachtelputz buitenmuur | EXACT |
| gevel bepleisteren | EXACT |
| voorgevel stucen | EXACT |

### Группа B: «Gevel Schilderen» → лендинг `https://bm-klus-bv.nl/gevel-schilderen/`
Исторические: gevel schilderen 2 conv @ €46; buiten gevel schilderen 3 @ €22; gevel laten schilderen/verven @ €5–6; buitenmuur schilderen kosten @ €1.

| Ключ | Match |
|---|---|
| gevel schilderen | EXACT + PHRASE |
| gevel laten schilderen | EXACT |
| gevel laten verven | EXACT |
| buitenmuur schilderen | EXACT |
| buiten gevel schilderen | EXACT |
| buitenmuur verven | EXACT |
| gevel verven | EXACT |
| huis buitenkant schilderen | EXACT |

### Группа C: «Stukadoor Regio» → лендинг `https://bm-klus-bv.nl/buiten-stucwerk/`
Исторические: stukadoor rotterdam @ €18, stukadoor leiden @ €11, stukadoor bergen op zoom @ €9. Только EXACT — низкие объёмы, высокая точность. Риск интерьерного интента гасим текстом объявления («buitenwerk») и негативами.

| Ключ | Match |
|---|---|
| stukadoor rotterdam | EXACT |
| stucadoor rotterdam | EXACT |
| stukadoor vlaardingen | EXACT |
| stukadoor schiedam | EXACT |
| stukadoor dordrecht | EXACT |
| stukadoor delft | EXACT |
| stukadoor zoetermeer | EXACT |
| stukadoor spijkenisse | EXACT |
| stukadoor leiden | EXACT |

---

## 4. Дополнить негативы кампании (BROAD, если не указано иное)

Интерьер (фокус — только наружные работы): `muren stucen`, `binnen`, `binnenmuur`, `plafond`, `badkamer`, `behangklaar`, `sausklaar`, `spackspuitwerk`, `wand stucen`
Чужие услуги: `spouwmuur`, `spouwmuurisolatie`, `dakisolatie`, `vloerisolatie`, `glas`, `kozijn vervangen`
Обшивка не нашего профиля: `hout`, `houten`, `kunststof`, `rockpanel`, `trespa`
Прочее: `vacature`, `vacatures`, `opleiding`, `salaris`, `huren`, `verhuur`

Примечание: негатив `binnen` не блокирует «buitenkant»-запросы (отдельное слово). Существующие 77 негативов не трогаем.

---

## 5. RSA для новых групп (nl-NL, заголовки ≤30 симв., описания ≤90)

Факты в текстах проверены: рейтинг 4,9/19 отзывов — [GBP API 2026-07-19]; «vanaf €35/m²» (spachtelputz) и «vanaf €25/m²» (schilderen basis) — утверждённые диапазоны из `lib/content/*` (governance §60). Если модерация отклонит заголовок с «WhatsApp» — заменить на «Snelle reactie gegarandeerd».

### Группа A «Buiten Stucwerk»
Заголовки (использовать все):
1. Buiten stucwerk specialist
2. Buitenmuur strak gestuukt
3. Gevel stucen in de regio
4. Stukadoor voor buitenwerk
5. Vanaf €35/m² spachtelputz
6. Gratis opname & offerte
7. Heel de regio Rotterdam
8. 4,9/5 op Google Reviews
9. Cementpleister & sierpleister
10. Strak resultaat, heldere prijs
11. Ook herstel van stucwerk
12. Snel antwoord via WhatsApp

Описания:
1. Buitenmuur of gevel stucen? Gratis opname op locatie en een heldere offerte per m².
2. Cementpleister, spachtelputz of sierpleister — strak aangebracht door ervaren vakmensen.
3. Actief in de hele regio Rotterdam (±80 km). Snelle reactie, ook via WhatsApp.
4. Herstel, egaliseren en volledig nieuwe afwerking van uw buitengevel.

### Группа B «Gevel Schilderen»
Заголовки:
1. Gevel laten schilderen
2. Schilder voor uw gevel
3. Vanaf €25/m²
4. Gratis opname & offerte
5. Heel de regio Rotterdam
6. 4,9/5 op Google Reviews
7. Buitenmuur strak geverfd
8. Incl. grondige voorbereiding
9. Duurzame gevelverfsystemen
10. Oude gevel weer als nieuw
11. Snel antwoord via WhatsApp
12. Heldere offerte per m²

Описания:
1. Gevel schilderen door vakmensen: reiniging, herstel en dekkende laag. Gratis opname.
2. Vanaf €25/m², afhankelijk van staat en verfsysteem. Heldere offerte na opname op locatie.
3. Actief in de hele regio Rotterdam (±80 km). Snelle reactie, ook via WhatsApp.
4. Bescherm uw gevel tegen weer en vocht met een duurzaam verfsysteem.

### Группа C «Stukadoor Regio»
Заголовки:
1. Stukadoor in uw regio
2. Stukadoor voor buitenwerk
3. Buitenmuur & gevel stucen
4. Gratis opname & offerte
5. 4,9/5 op Google Reviews
6. Strak buitenstucwerk
7. Heel de regio Rotterdam
8. Snel antwoord via WhatsApp
9. Heldere offerte per m²
10. Sierpleister & cementpleister

Описания:
1. Stukadoor voor buitenwerk: gevels, buitenmuren en sierpleister. Gratis opname.
2. Wij stucen buitengevels in uw regio. Heldere offerte per m² na opname op locatie.
3. Strak resultaat door ervaren vakmensen. Snelle reactie, ook via WhatsApp.
4. Let op: wij richten ons op buitenwerk — geen binnenmuren of plafonds.

---

## 6. Порядок внесения (чтобы не было простоя)

1. **Негативы** — добавить список §4 в кампанию.
2. **Новые группы** — создать A, B, C: ключи из §3 + RSA из §5, финальные URL как указано. Ставки — авто (кампанийная стратегия).
3. **Включить** isolatie buitengevel EXACT (§2.3).
4. **Паузы** — ключи §2.2, затем группы §2.1.
5. **Бюджет** — €9 → €13/день.
6. *(Опционально)* переименовать кампанию в «NL | Gevelwerken | Search» — только косметика.
7. **Конверсии (проверить в Инструменты → Конверсии):** primary («в столбце Конверсии») должна быть только «Отправка контактной формы с сайта» (id 6790076058) + lead form. «bm-klus-bv.nl (web) Whatsapp» — добавить как **secondary** (наблюдаем 4 недели, потом решаем про primary). «Местные действия» и «Clicks to call» — только secondary.

## 7. Что НЕ трогаем
Гео (радиус 80 км — корректен), сети, стратегию ставок, существующие RSA, группы Core/Afwerking/Kosten&Prijs/Offerte (кроме перечисленных ключей), существующие 77 негативов.

## 8. Контроль (после внесения — моя часть)
- Сверка структуры через API с этим документом (день 0).
- Еженедельно: расход/CPA/поисковые запросы новых групп; мусорные search terms → в негативы.
- Чекпойнт 4 недели: цель CPA < €60 blended; группы/ключи с расходом > €25 без конверсий — кандидаты на паузу; решение по tCPA ~€45 и по «gevel isoleren en bekleden EXACT».

_Провенанс всех цифр: [Ads API, campaign 23271040037 + legacy 21273654640, 2024-01-01…2026-07-18]._

---

## 9. Быстрые ссылки по группам (добавлено 2026-07-20, после сверки)

Сверка 2026-07-20: план §1–§6 внесён без расхождений; группы Kosten&Prijs и Offerte дополнительно на паузе (решение владельца, принято). Ad Strength новых групп поднят добавлением заголовков.

### 9.1. Создать 2 новых актива (Объекты → Быстрые ссылки)

| Текст ссылки | URL | Описание 1 (≤35) | Описание 2 (≤35) |
|---|---|---|---|
| Onze werken | https://bm-klus-bv.nl/onze-werken/ | Bekijk afgeronde projecten | Foto's van gevels in de regio |
| Buiten stucwerk | https://bm-klus-bv.nl/buiten-stucwerk/ | Cementpleister & spachtelputz | Strak stucwerk voor uw gevel |

Плюс дозаполнить пустые описания у существующего актива «Gevel schilderen» (id 130196308112): «Duurzame verfsystemen» / «Bescherming tegen weer en vocht».

### 9.2. Привязки на уровне ГРУПП (группа → Объекты → Добавить → использовать существующий)

| Группа (LP) | 4 быстрые ссылки |
|---|---|
| Gevelisolatie - Core (/gevelisolatie/) | Gevelisolatie kosten · Afwerkingen bekijken · Subsidie & vergunning · Onze werken |
| Gevelisolatie - Afwerking (/gevelisolatie/afwerkingen/) | Buitengevelisolatie · Gevelisolatie kosten · Sierpleister · Onze werken |
| Buiten Stucwerk (/buiten-stucwerk/) | Sierpleister · Gevel schilderen · Buitengevelisolatie · Onze werken |
| Gevel Schilderen (/gevel-schilderen/) | Buiten stucwerk · Sierpleister · Onze werken · Offerte aanvragen |
| Stukadoor Regio (/buiten-stucwerk/) | Sierpleister · Gevel schilderen · Onze werken · Offerte aanvragen |

Правило соблюдено: ни одна ссылка не ведёт на лендинг своей группы (такие Google не показывает).

### 9.3. Уровень кампании (fallback) — заменить состав
Оставить: Offerte aanvragen · Onze werken · Onze diensten · Over Ons. Отвязать от кампании: Materialen vergelijken, Subsidie & vergunning (изоляционно-специфичные — теперь живут на уровне групп Core/Afwerking; Materialen — группа на паузе, ссылка кампании не нужна).

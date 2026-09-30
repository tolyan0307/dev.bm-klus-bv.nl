---
paths:
  - "lib/content/**/*.ts"
  - "app/**/*.tsx"
  - "components/**/*.tsx"
  - "data/sitemap-plan.ts"
  - "seo-system/**/*"
---

# Тексты сайта (nl-NL) и SEO страниц

## Порядок работы
- Перед правкой страницы прочитай её бриф в `seo-system/briefs/` (`<slug>.yaml`, у вложенных — `<родитель>-<дочерняя>.yaml`; есть у money pages и кластера): интент, секции, соседи. Брифы составлены до 2026-09-05 — их пункты о ценах, richtprijzen, PriceCards, калькуляторах и «prijs per m²» в title недействительны: запрет цен важнее брифа. Для новой страницы сначала бриф по `seo-system/SEO_BRIEF_TEMPLATE.yaml`.
- Заметная правка текста (секция, страница, несколько страниц) — сначала план по-русски, правки после согласия владельца, по секциям. Точечная правка по прямой просьбе — сразу. То, что работает, сохраняй. Структуру JSON-LD и адреса ссылок не меняй; анкоры улучшать можно; FAQPage меняется вместе с массивом FAQ, из которого строится.
- После правки — короткая самопроверка с вердиктом PASS / PASS WITH FIXES / FAIL: соответствие интенту и запросам; естественность нидерландского; фактическая безопасность (цены, обещания); понятность следующего шага; пересечение с соседями; лимиты (title ≤ 47 + суффикс, description ≤ 160, один H1, иерархия заголовков). Рискованные фразы — цитатой с исправлением. Отчёт по-русски, нидерландские фразы — с переводом: владелец не может сам проверить язык.

## Язык и тон
- Всё публичное — только нидерландский: заголовки, текст, кнопки, FAQ, alt, meta.
- Тон — duidelijk, betrouwbaar, praktisch, lokaal; обращение «u», о себе «wij»; пишем для домовладельцев без спецзнаний. Без калек («het is belangrijk om te vermelden dat…»), без пустых фраз вроде «wij staan klaar voor u» вместо содержания, без превосходных степеней без доказательств, без переноса одинаковых блоков между страницами.
- Термины:

| Понятие | Используем | Примечание |
|---|---|---|
| Наружное утепление | buitengevelisolatie, ETICS, gevelisolatie (buitenkant) | не «gevelisolatie binnenkant» |
| Наружная штукатурка | gevel stucen, buitenmuur stucen; buitenstucwerk — как дополнительный | betonstuc, cementpleister — тоже снаружи |
| Внутренняя штукатурка | muren stucen (binnen), binnenmuren stucen, stucwerk binnen | sausklaar и behangklaar — внутри; «stucen» без уточнения двусмысленно |
| Декоративная штукатурка | gevel sierpleister, spachtelputz, crepi | снаружи, если не сказано иное |
| Регион | «Regio Rotterdam en omgeving (±80–100 km)» | стандартная формулировка |

- Реквизиты (KvK, VCA*, адрес, телефон, e-mail) бери из кода (`lib/seo/schema.ts`, `components/footer.tsx`), а не по памяти.

## Утверждения
- Не выдумывать гарантии, сертификаты, награды, суммы субсидий, сроки, число проектов, марки материалов, юридические утверждения. Неподтверждённое помечай в черновике: `[CLAIM_NEEDS_CONFIRMATION]`, `[MISSING_BUSINESS_INPUT]`, `[UNCERTAIN_TERM]`, `[CHECK_LOCAL_WORDING]` — и не выкатывай текст с пометками.
- Экономия энергии — только условно: «kan leiden tot», не «leidt tot» и не «bespaart altijd».
- Без «altijd» и «garanderen» в обещаниях и без сроков вида «binnen X uur». Такие обещания (сроки offerte и контакта, гарантии, «vaste prijs», «geen onderaannemers», «1200+ gevels», «2–4× woningwaarde», «25 jr», сроки службы покраски, длительность работ) убраны 2026-09-30 по решению владельца — не возвращать. Ждут подтверждения: «VCA* gecertificeerd» и «ETICS gecertificeerd» (`docs/BACKLOG.md`) — не размножать.
- Цены запрещены (см. `CLAUDE.md`): тема kosten — только через факторы цены и «prijs na opname».

## Одна страница — один интент
| Страница | Интент | Следить за пересечением с |
|---|---|---|
| `/gevelisolatie/` | ETICS, обзорная (pillar) | все `/gevelisolatie/*`, `/buiten-stucwerk/` |
| `/gevelisolatie/kosten/` | от чего зависит цена ETICS (без цифр) | раздел kosten на `/gevelisolatie/` |
| `/gevelisolatie/afwerkingen/` | отделки поверх ETICS | `/buiten-stucwerk/`, `/sierpleister/` |
| `/gevelisolatie/materialen/` | EPS / PIR / minerale wol | `/gevelisolatie/rc-waarde-dikte/` |
| `/gevelisolatie/rc-waarde-dikte/` | Rc и толщина | `/gevelisolatie/materialen/` |
| `/gevelisolatie/subsidie-vergunning/` | ISDE и разрешения | — |
| `/gevelisolatie/<город>/` | местная посадочная ETICS | друг с другом: одинаковые блоки |
| `/buiten-stucwerk/` | наружная штукатурка без утепления, betonstuc | `/gevelisolatie/afwerkingen/`, `/sierpleister/` |
| `/sierpleister/` | spachtelputz, crepi на фасаде | `/buiten-stucwerk/`, `/gevelisolatie/afwerkingen/` |
| `/gevel-schilderen/` | покраска фасада | `/gevel-schilderen/keimen/`, `/buiten-stucwerk/` (подготовка) |
| `/gevel-schilderen/keimen/` | keimen: kosten, keimen vs schilderen | `/gevel-schilderen/` |
| `/muren-stucen/` | штукатурка внутри | `/muren-stucen/sausklaar-behangklaar/`, `/buiten-stucwerk/` |
| `/muren-stucen/sausklaar-behangklaar/` | sausklaar vs behangklaar | `/muren-stucen/` |

Большие блоки между соседями не дублировать — ссылаться. На родителе о подтеме дочерней страницы — краткий анонс со ссылкой, не полноценный раздел.

## Типы страниц
- **Money page** (5 услуг): hero с H1 и «Gratis opname & offerte» → что это и для кого → когда нужно → werkwijze → варианты и материалы → от чего зависит цена (без цифр) → почему BM klus BV (доказательно) → отзывы → FAQ → связанные страницы. Схемы: BreadcrumbList, LocalBusiness, Service, FAQPage.
- **Кластерная и дочерняя**: глубина по своей подтеме, не пересказ родителя; ссылки на родителя и `/contact/`. Схемы: BreadcrumbList, LocalBusiness, Service, FAQPage (у `materialen` и `rc-waarde-dikte` — без Service, Breadcrumb и LocalBusiness там в `layout.tsx`).
- **Городская** (`/gevelisolatie/<город>/`, 21 шт., данные в `lib/content/gevelisolatie-locations.ts`): реальный местный контекст (bouwperiode, woningTypes, gemeente); `localContext` не пересказывает `intro`, `energieTip` не повторяет `localContext` и FAQ; FAQ — местные практические вопросы; без werkwijze и финального CTA-блока. При правке нескольких городов объём правок — по потребности каждой страницы: сильные (Rotterdam) трогать минимально.
- **Проект** (`/onze-werken/<slug>/`): фактическое описание выполненной работы без рекламных фраз, ссылки только на страницы услуг, alt фото — `[City] [service] – voor/na de werken foto [num] ([year])`. Процедура — skill `add-project`.

## Перелинковка
Архитектура ссылок уже есть (навбар, футер, связанные страницы, оглавления, `internalLinks` в контенте): существующие ссылки сохраняй, анкоры можно улучшать, битые — называть. Длинные списки городов на другие страницы не добавлять.

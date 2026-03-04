# Добавление нового проекта (Onze werken)

> **Расположение:** `v0-site/site/docs/ADD-PROJECT.md`  
> **Ссылки:** см. [PROJECT-STATUS.md](../PROJECT-STATUS.md), [instructions.md](../../instructions.md)

---

## Как использовать

Передай AI (Cursor) **JSON с данными проекта** — он создаст страницу, добавит карточку в список и при необходимости обновит редиректы.

**Шаблон:** скопируй блок ниже, заполни и вставь в чат.

---

## JSON-шаблон (battle template v1)

```json
{
  "slug": "vlaardingen-gevelisolatie-6cm-sierpleister-2024",
  "oldUrl": "/gevelisolatie-woning-vlaardingen-6cm/",
  "title": "Vlaardingen – gevelisolatie 6 cm sierpleister (2024)",
  "subtitle": "Vrijstaande woning, EPS 6 cm, sierpleister 15 mm",
  "meta": {
    "city": "Vlaardingen",
    "objectType": "Woning",
    "highlight": "Gevelisolatie EPS 6 cm, sierpleister 15 mm, nette plintafwerking.",
    "year": 2024
  },
  "serviceType": "Gevelisolatie",
  "serviceTypes": ["Gevelisolatie", "Sierpleister"],
  "cardAlt": "Vlaardingen gevelisolatie 6 cm sierpleister – na de werken foto 01 (2024)",
  "heroBullets": [
    "EPS 6 cm isolatie",
    "Sierpleister 15 mm",
    "Nette plintafwerking"
  ],
  "werkzaamheden": [
    { "title": "Inspectie gevel", "body": "…" },
    { "title": "Hechtmortel & isolatieplaten", "body": "…" },
    { "title": "Glasvezelwapeningsnet & basislaag", "body": "…" }
  ],
  "bevindingen": [
    { "title": "Ongeïsoleerde gevel", "body": "…" }
  ],
  "resultaten": [
    { "title": "Betere isolatiewaarde", "body": "In dit project is de gevel voorzien van EPS 6 cm, wat bijdraagt aan een lagere warmtevraag. Het exacte resultaat kan verschillen per woning." }
  ],
  "detailCards": [
    { "title": "Plintafwerking", "body": "…" },
    { "title": "Hoekprofielen", "body": "…" }
  ],
  "materialen": [
    { "label": "Isolatie", "value": "EPS 6 cm" },
    { "label": "Afwerking", "value": "Sierpleister 15 mm" }
  ],
  "relatedLinks": [
    { "label": "Gevelisolatie", "href": "/gevelisolatie/" },
    { "label": "Sierpleister", "href": "/sierpleister/" }
  ],
  "beforeCount": 5,
  "afterCount": 8,
  "metaTitle": "Vlaardingen gevelisolatie 6 cm sierpleister – 2024",
  "metaDescription": "Vlaardingen (2024): gevelisolatie EPS 6 cm, sierpleister 15 mm. Bekijk voor/na foto's en details van dit project."
}
```

---

## Поля: required vs optional

### Required (обязательные)

| Поле | Тип | Описание |
|------|-----|----------|
| `slug` | string | URL-часть: `/onze-werken/{slug}/`. Только `a-z`, `0-9`, дефис. Max 75 символов, trailing slash обязателен. |
| `title` | string | Заголовок проекта (H1, карточка) |
| `subtitle` | string | Подзаголовок (карточка, hero) |
| `meta.city` | string | Город |
| `meta.objectType` | string | Тип объекта: `Woning`, `Appartement`, `VvE`, … |
| `meta.highlight` | string | Краткое описание работ (1 предложение) |
| `meta.year` | number | Год выполнения |
| `serviceType` | string | Основная услуга (для badge) |
| `serviceTypes` | string[] | Все услуги (для фильтра на `/onze-werken/`) |
| `cardAlt` | string | Alt для cover-фото в карточке — см. [правило alt-текста](#alt-текст-seo) |
| `werkzaamheden` | array | `{title, body}` — что сделали. Мин. 2 записи |
| `bevindingen` | array | `{title, body}` — что было до работ. Мин. 1 запись |
| `resultaten` | array | `{title, body}` — что получилось. Мин. 1 запись. Без неподтверждённых % |
| `detailCards` | array | `{title, body}` — детали/vakmanschap. Мин. 1 запись |
| `materialen` | array | `{label, value}` — материалы. Мин. 2 записи (при нехватке данных — 1) |
| `relatedLinks` | array | `{label, href}` — **только service pages** (см. ниже). 2–4 ссылки |
| `beforeCount` | number | Кол-во фото «до» |
| `afterCount` | number | Кол-во фото «после» |
| `metaTitle` | string | SEO-заголовок. **Max 60 символов** |
| `metaDescription` | string | SEO-описание. **Max 160 символов** |

### Optional (необязательные)

| Поле | Тип | Описание |
|------|-----|----------|
| `oldUrl` | string | Старый URL для 301 redirect. Только если нужен редирект с WP или другого домена. |
| `heroBullets` | string[] | 3 кратких тезиса для hero-блока. Optional, **рекомендуется ровно 3**. |

---

## Минимумы по массивам

| Поле | Минимум | Рекомендация |
|------|---------|--------------|
| `heroBullets` | 0 (или 3) | **3** (если добавляешь — ровно 3) |
| `werkzaamheden` | 2 | 3–5 |
| `bevindingen` | 1 | 1–3 |
| `resultaten` | 1 | 1–3 |
| `detailCards` | 1 | 2–4 |
| `materialen` | 2 (при нехватке 1) | 2–5 |
| `relatedLinks` | 2 | 2–4 |
| `beforeCount` | 1 (draft) | ≥ 3 |
| `afterCount` | 1 (draft) | ≥ 5 |

---

## Правило: relatedLinks — только service pages

`relatedLinks` содержит **исключительно ссылки на страницы услуг**.

**Допустимые значения `href`:**

- `/gevelisolatie/`
- `/buiten-stucwerk/`
- `/sierpleister/`
- `/gevel-schilderen/`
- `/muren-stucen/`

**Запрещено включать:**

- `/onze-werken/` — остаётся в CTA-блоке шаблона, не в JSON
- `/contact/` — остаётся в CTA-блоке шаблона, не в JSON

---

## Правила content quality

### Claims safety

Project pages — это **фактические кейсы**. Не допускается:

- Жёсткие % (например, "40% besparing") без документации
- Неподтверждённые гарантии
- Точные сроки без документального подтверждения
- Абсолюты: "altijd", "nooit", "geen voorrijkosten", "de beste"

**Разрешённый стиль:**

- "In dit project …"
- "Afhankelijk van de situatie …"
- "Op basis van de opname op locatie …"
- "Kan verschillen per woning/gevel …"

### Anti-cannibalization

Project page = **реализованный объект**, не money page.

- Не превращать проектную страницу в SEO-обзор услуги
- `metaTitle` и `metaDescription` должны содержать город + год + конкретные материалы
- Не использовать общие ключи типа "beste gevelisolatie bedrijf" или "gevelisolatie prijzen"

---

## SEO-лимиты и формат slug

| Параметр | Правило |
|----------|---------|
| Публичный контент | **NL только** |
| `metaTitle` | ≤ 60 символов |
| `metaDescription` | ≤ 160 символов |
| `slug` | ≤ 75 символов, lower-case, только дефисы, **trailing slash обязателен** |

---

## Рекомендации по фото

### Формат и папка

- **Формат:** WebP (предпочтительно) или JPEG
- **Папка:** `public/images/projects/`
- **Конвертация JPEG/PNG → WebP:** локальный скрипт `scripts/convert-to-webp.mjs` — см. [Локальные инструменты](#локальные-инструменты)
- **Имена файлов (по умолчанию):**
  - До работ: `{slug}-voor-01.webp`, `{slug}-voor-02.webp`, …
  - После работ: `{slug}-na-01.webp`, `{slug}-na-02.webp`, …
- **Нумерация:** с ведущим нулём (01, 02, … 21)

> ⚠️ **Важно для AI:** если файлы уже загружены с другим именованием (например, `zuidzijdsedijk-nieuw-beijerland-...` вместо `{slug}-...`), AI **обязан проверить реальные имена файлов** в `public/images/projects/` и использовать их точно — без подстановки шаблонного `{slug}`.
>
> Порядок приоритетов:
> 1. Реальные файлы на диске (если они уже загружены) — всегда приоритет
> 2. Имена, явно указанные пользователем в JSON или сообщении
> 3. Шаблон `{slug}-voor-01.webp` — только если файлы ещё не загружены

### Размеры и качество

| Назначение | Рекомендация |
|------------|--------------|
| Hero (главное фото) | `na-01` — ширина **≥1920 px**, соотношение 16:9 или 4:3 |
| Cover карточки | `na-01` — то же фото |
| Before thumb | `voor-01` — минимум 800 px по длинной стороне |
| Галерея | 1200–1920 px по длинной стороне, качество 80–85% |

### Минимальное количество

- **Voor (до):** рекомендуется ≥3, для draft допускается 1
- **Na (после):** рекомендуется ≥5, для draft допускается 1

### Содержание снимков

- **Voor:** общий вид фасада, повреждения, трещины, отслоения, plint
- **Na:** общий вид, детали (hoeken, profielen, plint, dagkanten), крупный план afwerking
- **Порядок:** от общего к деталям

### Alt-текст (SEO)

Шаблон: `{Plaats} {type werk} {specificatie} – voor/na de werken foto {nr} ({jaar})`

Пример: `Vlaardingen gevelisolatie 10 cm – na de werken foto 01 (2024)`

- Короткий, одна строка
- Начинается с города и типа работ
- На NL

---

## Step 1: Data/Structure Check (checklist перед генерацией JSON)

Перед передачей JSON AI проверь:

- [ ] Город, тип объекта и год подтверждены
- [ ] Основная услуга (`serviceType`) и все услуги (`serviceTypes`) определены
- [ ] Есть текст с деталями для `werkzaamheden`, `bevindingen`, `resultaten`, `detailCards`
- [ ] Списки фото `voor` и `na` готовы, `beforeCount` / `afterCount` известны
- [ ] `na-01` выбрана как hero/cover
- [ ] `metaTitle` ≤ 60, `metaDescription` ≤ 160, `slug` ≤ 75
- [ ] Нет неподтверждённых % и абсолютных claims
- [ ] `relatedLinks` содержит только service pages

**AI перед генерацией кода обязан:**

- [ ] Проверить реальные имена файлов в `public/images/projects/` через `cmd /c dir`
- [ ] Использовать точные имена файлов с диска, не шаблонные `{slug}-voor-01.webp`

---

## Что делает AI по JSON

1. **Проверяет** реальные имена файлов в `public/images/projects/` для данного проекта — и использует их точно, не подставляя шаблонное `{slug}-voor-01.webp`
2. **Создаёт** `app/onze-werken/{slug}/page.tsx` (по шаблону Halsteren)
3. **Создаёт** `lib/content/projects/{slug}.ts` (beforeImages, afterImages)
4. **Добавляет** запись в `lib/content/projects.ts`
5. **Обновляет** `public/.htaccess` — если есть `oldUrl` (301 redirect)
6. **Проверяет** sitemap — проекты подхватываются из `projects` автоматически

---

## Пример: старый URL → редирект

Если проект переносится со старого WP и нужен 301:

```
Старый: /gevelisolatie-woning-vlaardingen-10cm-sierpleister/
Новый:  /onze-werken/vlaardingen-gevelisolatie-10cm-sierpleister-2024/
```

Добавь в JSON (опционально):

```json
"oldUrl": "/gevelisolatie-woning-vlaardingen-10cm-sierpleister/"
```

AI добавит в `.htaccess`:

```
Redirect 301 /gevelisolatie-woning-vlaardingen-10cm-sierpleister/ /onze-werken/vlaardingen-gevelisolatie-10cm-sierpleister-2024/
```

---

## Локальные инструменты

| Инструмент | Путь | Назначение |
|------------|------|------------|
| **Конвертация в WebP** | `scripts/convert-to-webp.mjs` | Пакетная конвертация JPEG/PNG → WebP для проектов |
| **Конвертация с заменой** | `scripts/convert-and-replace.mjs` | JPEG/PNG → WebP, удаляет оригинал только если WebP меньше |

**Использование:**
```bash
pnpm images:webp
pnpm images:webp public/images/projects/
pnpm images:webp public/images/projects/vlaardingen-2024/
```

По умолчанию обрабатывает `public/images/projects/`. Оригиналы сохраняются, рядом создаются `.webp`.

**Конвертация с заменой** (удаляет оригинал только если WebP меньше):
```bash
node scripts/convert-and-replace.mjs --dir public/images/projects --prefix rottekade-gevelisolatie-10cm
node scripts/convert-and-replace.mjs rottekade-gevelisolatie-10cm-na-01.jpg rottekade-gevelisolatie-10cm-na-02.jpg
```

---

## Референс: Halsteren

- **Страница:** `app/onze-werken/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025/page.tsx`
- **Контент:** `lib/content/projects/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025.ts`
- **Карточка:** `lib/content/projects.ts` (первая запись)

---

## AI Task: пошаговый скрипт для Composer

Используй этот блок как системный промпт для Composer (или другой модели). Вставь его перед JSON проекта.

````
Ты выполняешь задачу добавления нового project page на сайт bm-klus-bv.nl.
Источник данных — JSON проекта ниже. Выполни все шаги строго по порядку, без пропусков.

─── ШАГ 1: ПРОВЕРЬ РЕАЛЬНЫЕ ИМЕНА ФАЙЛОВ ────────────────────────────────────
Выполни команду:
  cmd /c "dir D:\projects\bmklus\v0-site\site\public\images\projects /b" | findstr /i {slug}
  (замени {slug} на первую часть slug — например, "klaaswaal" или "dordrecht")

Запомни точный префикс найденных файлов (например: "klaaswaal-gevelisolatie-6cm-").
Используй ТОЛЬКО эти имена во всём дальнейшем коде. Не придумывай имена из slug.
Если файлов нет — запиши это и используй шаблон {slug}-voor-01.webp как placeholder.

─── ШАГ 2: СОЗДАЙ ДИРЕКТОРИЮ СТРАНИЦЫ ───────────────────────────────────────
  New-Item -ItemType Directory -Force -Path "app/onze-werken/{slug}"

─── ШАГ 3: СОЗДАЙ lib/content/projects/{slug}.ts ────────────────────────────
Файл содержит ТОЛЬКО:
  - IMAGE_EXT = "webp"
  - pad() helper
  - beforeImages: Array.from({ length: {beforeCount} }, ...) — с реальным префиксом из шага 1
  - afterImages: Array.from({ length: {afterCount} }, ...) — с реальным префиксом из шага 1
Alt-текст формат: "{Stad} {type werk} {spec} – voor/na de werken foto {nr} ({jaar})"

─── ШАГ 4: СОЗДАЙ app/onze-werken/{slug}/page.tsx ───────────────────────────
Копируй структуру из референса:
  app/onze-werken/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025/page.tsx
Замени все данные данными из JSON. Обязательно:
  - metadata: buildPageMetadata("/onze-werken/{slug}/", { title, description }) — из metaTitle/metaDescription
  - Hero img src: реальный путь из шага 1 (na-01)
  - Passport строка: город · objectType · ключевые материалы · jaar
  - heroBullets — если есть в JSON, ровно 3 пункта
  - Все секции B–F и aside H присутствуют
  - relatedLinks grid: sm:grid-cols-2 при 2 ссылках, lg:grid-cols-3 при 3, lg:grid-cols-4 при 4
  - НЕ добавлять /onze-werken/ и /contact/ в relatedLinks

─── ШАГ 5: ОБНОВИ lib/content/projects.ts ───────────────────────────────────
Добавь карточку нового проекта ПЕРВОЙ в массив projects[].
Структура карточки:
  {
    slug, serviceType, serviceTypes, title, subtitle,
    meta: { city, objectType, highlight, year },
    projectUrl: "/onze-werken/{slug}/",
    cardAlt,
    coverImage: { src: "реальный na-01 путь", alt: "..." },
    beforeThumb: { src: "реальный voor-01 путь", alt: "..." },
  }

─── ШАГ 6: ОБНОВИ public/.htaccess (только если есть oldUrl) ────────────────
Найди строку:  Redirect 301 {oldUrl} /onze-werken/
Замени на:     Redirect 301 {oldUrl} /onze-werken/{slug}/

─── ШАГ 7: ПРОВЕРЬ ЛИНТЕР ───────────────────────────────────────────────────
Проверь с помощью ReadLints:
  - app/onze-werken/{slug}/page.tsx
  - lib/content/projects/{slug}.ts
  - lib/content/projects.ts
Исправь все ошибки перед завершением.

─── ФИНАЛЬНЫЙ ОТЧЁТ ─────────────────────────────────────────────────────────
Укажи:
  1. Реальный префикс файлов изображений (или "файлы не найдены")
  2. Список созданных/изменённых файлов
  3. Статус линтера
  4. Обновлён ли .htaccess

СТОП-ПРАВИЛА (никогда не нарушать):
  ✗ Не придумывать имена файлов изображений из slug
  ✗ Не добавлять /onze-werken/ или /contact/ в relatedLinks
  ✗ Не пропускать проверку линтера
  ✗ Не добавлять карточку в конец projects[] — только первой

─── JSON ПРОЕКТА ─────────────────────────────────────────────────────────────
[ВСТАВЬ JSON СЮДА]
````
-------------------

# Добавление нового проекта (Onze werken)

> **Расположение:** `v0-site/site/docs/ADD-PROJECT.md`  
> **Ссылки:** см. [PROJECT-STATUS.md](../PROJECT-STATUS.md), [instructions.md](../../instructions.md)

---

## Как использовать

Передай AI (Cursor) **JSON с данными проекта** — он создаст страницу, добавит карточку в список и при необходимости обновит редиректы.

**Шаблон:** скопируй блок ниже, заполни и вставь в чат.

---

## JSON-шаблон

```json
{
  "slug": "vlaardingen-gevelisolatie-6cm-sierpleister-2024",
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
  "cardAlt": "Vlaardingen gevelisolatie 6 cm sierpleister – woning voor/na (2024)",
  "heroBullets": [
    "EPS 6 cm isolatie",
    "Sierpleister 15 mm",
    "Plintafwerking"
  ],
  "werkzaamheden": [
    { "title": "Inspectie", "body": "…" },
    { "title": "Hechtmortel & isolatie", "body": "…" }
  ],
  "bevindingen": [
    { "title": "Ongeïsoleerde gevel", "body": "…" }
  ],
  "resultaten": [
    { "title": "Energiebesparing", "body": "…" }
  ],
  "detailCards": [
    { "title": "Plint", "body": "…" }
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
  "metaDescription": "Vlaardingen (2024): gevelisolatie EPS 6 cm, sierpleister 15 mm. Bekijk voor/na en details."
}
```

---

## Обязательные поля

| Поле | Тип | Описание |
|------|-----|----------|
| `slug` | string | URL-часть: `/onze-werken/{slug}/`. Только `a-z`, `0-9`, дефис. |
| `title` | string | Заголовок проекта (H1, карточка) |
| `subtitle` | string | Подзаголовок (карточка, hero) |
| `meta.city` | string | Город |
| `meta.objectType` | string | Тип объекта: Woning, Appartement, VvE, … |
| `meta.highlight` | string | Краткое описание работ (1 предложение) |
| `meta.year` | number | Год выполнения |
| `serviceType` | string | Основная услуга (для badge) |
| `serviceTypes` | string[] | Все услуги (для фильтра на /onze-werken/) |
| `cardAlt` | string | Alt для cover-фото в карточке |
| `werkzaamheden` | array | `{title, body}` — что сделали |
| `bevindingen` | array | `{title, body}` — что было до работ |
| `resultaten` | array | `{title, body}` — что получилось |
| `detailCards` | array | `{title, body}` — детали/вакmanschap |
| `materialen` | array | `{label, value}` — материалы |
| `relatedLinks` | array | `{label, href}` — ссылки на услуги |
| `beforeCount` | number | Кол-во фото «до» |
| `afterCount` | number | Кол-во фото «после» |

---

## Рекомендации по фото

### Формат и папка

- **Формат:** WebP (предпочтительно) или JPEG
- **Папка:** `public/images/projects/`
- **Конвертация JPEG/PNG → WebP:** локальный скрипт `scripts/convert-to-webp.mjs` — см. [Локальные инструменты](#локальные-инструменты)
- **Имена файлов:**
  - До работ: `{slug}-voor-01.webp`, `{slug}-voor-02.webp`, …
  - После работ: `{slug}-na-01.webp`, `{slug}-na-02.webp`, …
- **Нумерация:** с ведущим нулём (01, 02, … 21)

### Размеры и качество

| Назначение | Рекомендация |
|------------|--------------|
| Hero (главное фото) | `na-01` — ширина **≥1920 px**, соотношение 16:9 или 4:3 |
| Cover карточки | `na-01` — то же фото |
| Before thumb | `voor-01` — минимум 800 px по длинной стороне |
| Галерея | 1200–1920 px по длинной стороне, качество 80–85% |

### Минимальное количество

- **Voor (до):** 3–5 фото (общий вид, проблемные зоны, детали)
- **Na (после):** 5–10 фото (общий вид, детали, углы, plint)

### Содержание снимков

- **Voor:** общий вид фасада, повреждения, трещины, отслоения, plint
- **Na:** общий вид, детали (hoeken, profielen, plint, dagkanten), крупный план afwerking
- **Порядок:** логичный — от общего к деталям

### Alt-текст (SEO)

- Шаблон: `{Plaats} {type werk} – voor/na de werken foto {nr} ({jaar})`
- Пример: `Vlaardingen gevelisolatie sierpleister – na de werken foto 01 (2024)`

---

## Что делает AI по JSON

1. **Создаёт** `app/onze-werken/{slug}/page.tsx` (по шаблону Halsteren)
2. **Создаёт** `lib/content/projects/{slug}.ts` (beforeImages, afterImages)
3. **Добавляет** запись в `lib/content/projects.ts`
4. **Обновляет** `public/.htaccess` — если есть старый URL (301 redirect)
5. **Проверяет** sitemap — проекты подхватываются из `projects` автоматически

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

**Использование:**
```bash
pnpm images:webp
pnpm images:webp public/images/projects/
pnpm images:webp public/images/projects/vlaardingen-2024/
```

По умолчанию обрабатывает `public/images/projects/`. Оригиналы сохраняются, рядом создаются `.webp`. На сайт не попадает — только `out/` деплоится.

---

## Референс: Halsteren

- **Страница:** `app/onze-werken/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025/page.tsx`
- **Контент:** `lib/content/projects/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025.ts`
- **Карточка:** `lib/content/projects.ts` (первая запись)

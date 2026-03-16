# ADD-PROJECT v2 — Добавление нового проекта (Onze werken)

> **v2 — жёсткая, буквальная инструкция для любой модели.**
> Предыдущая версия v1 устарела и заменена этим документом.
>
> **Расположение:** `docs/ADD-PROJECT.md`
> **Связанные файлы:**
> - [`docs/IMAGE-PIPELINE.md`](IMAGE-PIPELINE.md) — технический стандарт pipeline
> - [`docs/IMAGE-WORKFLOW-SOP.md`](IMAGE-WORKFLOW-SOP.md) — пошаговые сценарии
> - [`docs/ADD-PROJECT-PROMPT.md`](ADD-PROJECT-PROMPT.md) — копипаст-промт для слабых моделей

---

## 1. Purpose

Эта инструкция описывает **единственный допустимый способ** добавления новой project page в `/onze-werken/`.

Каждая новая страница проекта — это **точная копия структуры эталонной страницы Halsteren**, в которой заменены только данные.

Модель **НЕ должна**:
- изобретать новые секции, layout или стили
- менять порядок секций
- менять hero overlay, spacing, heading sizes, CSS-классы
- добавлять секции, которых нет в Halsteren

Модель **ДОЛЖНА**:
- скопировать структуру Halsteren 1:1
- заменить только контентные данные
- следовать каждому шагу буквально

---

## 1a. SCOPE LOCK — Узкий коридор (ПРОЧИТАТЬ ПЕРВЫМ)

> **Это самый важный раздел документа. Нарушение любого пункта = СТОП + откат.**

### Разрешённые файлы (whitelist)

Модель имеет право **создавать или изменять** ТОЛЬКО эти файлы:

| # | Файл | Действие |
|---|------|----------|
| 1 | `lib/content/projects/{slug}.ts` | **Создать** (новый файл) |
| 2 | `app/onze-werken/{slug}/page.tsx` | **Создать** (новый файл) |
| 3 | `lib/content/projects.ts` | **Обновить** — добавить 1 карточку ПЕРВОЙ в массив. Ничего больше не менять |
| 4 | `deploy/apache/root.htaccess` | **Обновить** — ТОЛЬКО если в JSON есть `oldUrl`. Иначе НЕ ТРОГАТЬ |
| 5 | `data/image-manifest.json` | Обновляется **автоматически** скриптом `generate-variants`. Руками НЕ редактировать |

### Запрещённые действия (blacklist)

**ЗАПРЕЩЕНО** при любых обстоятельствах:

- ❌ Редактировать `app/onze-werken/page.tsx` (архив проектов)
- ❌ Редактировать **любые** существующие project pages (`app/onze-werken/*/page.tsx` кроме нового)
- ❌ Редактировать **любые** существующие data-файлы (`lib/content/projects/*.ts` кроме нового)
- ❌ Редактировать компоненты (`components/**/*`)
- ❌ Редактировать SEO-инфраструктуру (`lib/seo/*`)
- ❌ Редактировать типы (`lib/types/*`)
- ❌ Редактировать стили, конфиги, package.json
- ❌ Редактировать любые страницы вне `/onze-werken/{slug}/`
- ❌ Удалять любые файлы
- ❌ Переименовывать любые файлы
- ❌ «Рефакторить», «улучшать» или «исправлять» код вне whitelist

### Что делать при трудностях

> **Если что-то не получается (ошибка write, import не работает, build fails, файл не найден) — СТОП.**
>
> **НЕ ПЫТАТЬСЯ** решить проблему путём изменения файлов вне whitelist.
> **НЕ ПЫТАТЬСЯ** «починить» существующие компоненты или страницы.
> **НЕ ПЫТАТЬСЯ** «оптимизировать» или «обновить» код, который не относится к новому проекту.
>
> Вместо этого: **ОСТАНОВИТЬСЯ и сообщить пользователю** что именно не получилось, с полным текстом ошибки.

### Verification после каждой write-операции

После **каждого** создания/изменения файла — **немедленно** проверить что файл на месте:

```bash
Test-Path "полный/путь/к/файлу"
```

Если `False` — СТОП. Файл не записался. Сообщить пользователю.

### Multi-root workspace warning

> Этот проект может быть открыт в multi-root workspace.
> **Рабочая директория сайта:** `D:\projects\bmklus\v0-site\site\`
> Все пути к файлам указывай **абсолютно** или проверяй `pwd` перед каждой операцией.
> **Никогда** не полагайся на относительные пути без проверки текущей директории.

---

## 2. Inputs from user

Пользователь предоставляет:

### 2.1. Фото (до начала работы модели)

Пользователь создаёт **подпапку** в `source-images/projects/` и кладёт туда оригиналы:

```
source-images/projects/{slug}/
  {prefix}-voor-01.jpg
  {prefix}-voor-02.jpg
  {prefix}-na-01.jpg
  {prefix}-na-02.jpg
  ...
```

Где `{prefix}` = город + тип работ, например: `dordrecht-gevelisolatie-10cm`

Пользователь указывает путь к подпапке в чате, например:
`Фото проекта: source-images/projects/etten-leur-gevelisolatie-10cm-ral9010-2025/`

**Важно:**
- `source-images/` — единственный допустимый input для pipeline
- `public/images/` — **output**, НИКОГДА не использовать как input
- Модель использует путь к подпапке, указанный пользователем, а не ищет файлы по всему `source-images/projects/`
- Оригиналы: JPEG, PNG или WebP, ≥1920 px по длинной стороне (hero/cover), ≥1200 px (gallery), ≥800 px (before thumb)

### 2.2. JSON в чате

Пользователь вставляет JSON со всеми данными проекта **как текст в чат**.
JSON НЕ хранится как файл — он вводится в диалог.

### 2.3. oldUrl (опционально)

Старый URL для 301 redirect, если проект переносится с WordPress.

---

## 3. Required JSON contract

### Обязательные поля

| Поле | Тип | Описание | Пример |
|------|-----|----------|--------|
| `slug` | string | URL segment: `/onze-werken/{slug}/`. `a-z`, `0-9`, дефис. Max 75 символов. | `"dordrecht-gevelisolatie-10cm-sierpleister-2025"` |
| `prefix` | string | Префикс имён файлов изображений в `source-images/projects/`. | `"dordrecht-gevelisolatie-10cm"` |
| `title` | string | Заголовок проекта (карточка, schema). | `"Dordrecht – gevelisolatie 10 cm & sierpleister 1,5 mm (2025)"` |
| `subtitle` | string | Подзаголовок (hero, карточка fallback). | `"Woning met 10 cm buitengevelisolatie..."` |
| `heroDescription` | string | Описательный абзац в hero под H1. | `"Buitengevelrenovatie van een woning..."` |
| `meta.city` | string | Город. | `"Dordrecht"` |
| `meta.objectType` | string | Тип объекта. | `"Woning"` |
| `meta.highlight` | string | Краткое описание работ (1–2 предложения). | `"Gevelrenovatie met 10 cm..."` |
| `meta.year` | number | Год выполнения. | `2025` |
| `serviceType` | string | Основная услуга (для badge в hero). | `"Gevelisolatie"` |
| `serviceTypes` | string[] | Все услуги (для фильтра и schema). | `["Gevelisolatie", "Sierpleister"]` |
| `cardAlt` | string | Alt-текст для cover карточки. | `"Dordrecht gevelisolatie 10 cm..."` |
| `passportItems` | string[] | Элементы паспортной строки в hero. Первый = город (белый жирный). | `["Dordrecht", "woning", "gevelisolatie 10 cm", "sierpleister 1,5 mm"]` |
| `heroBullets` | string[] | **Ровно 3** тезиса для hero. | `["10 cm isolatie", "Sierpleister 1,5 mm", "Aluminium raamdorpels"]` |
| `werkzaamheden` | `{title, body}[]` | Что сделали. **Мин. 2, рекоменд. 3–8.** | |
| `bevindingen` | `{title, body}[]` | Что было до работ. **Мин. 1.** | |
| `resultaten` | `{title, body}[]` | Что получилось. **Мин. 1.** | |
| `detailCards` | `{title, body}[]` | Детали/vakmanschap. **Мин. 1.** | |
| `materialen` | `{label, value}[]` | Материалы. **Мин. 2.** | |
| `relatedLinks` | `{label, href}[]` | Ссылки на service pages. **2–4 шт.** | |
| `beforeCount` | number | Кол-во фото «до». | `3` |
| `afterCount` | number | Кол-во фото «после». | `10` |
| `metaTitle` | string | SEO-заголовок. **Max 60 символов.** | `"Dordrecht gevelisolatie 10 cm..."` |
| `metaDescription` | string | SEO-описание. **Max 160 символов.** | `"Project in Dordrecht: gevelrenovatie..."` |
| `werkzaamhedenIntro` | string | Подпись под H2 секции B. | `"Van isolatieopbouw tot..."` |
| `voorIntro` | string | Подпись под H2 секции C. | `"Vier aandachtspunten..."` |
| `naIntro` | string | Подпись под H2 секции D. | `"Een geïsoleerde gevel..."` |
| `detailsIntro` | string | Подпись под H2 секции E. | `"Vier technische details..."` |
| `materialenIntro` | string | Подпись под H2 секции F. | `"Overzicht van alle..."` |

### Необязательные поля (overrides)

| Поле | Тип | Описание | Default если не дано |
|------|-----|----------|---------------------|
| `oldUrl` | string | Старый URL для 301 redirect. | Нет redirect |
| `meta.yearDisplay` | string | Нестандартное отображение года. | `meta.year` |
| `h1Text` | string | Явный текст `<h1>`. | Модель берёт `title`, заменяет ` – ` на `: ` |
| `subtitleShort` | string | Короткий подзаголовок для карточки. | Модель берёт `subtitle` |

### Правило для derived-полей

Если override-поле **дано** в JSON — модель использует его **точно как есть**.
Если override-поле **не дано** — модель применяет default из таблицы выше.

**Модель НЕ должна:**
- самостоятельно изобретать текст для полей, которые не даны и не имеют default
- менять текст данного поля (даже для "улучшения")
- добавлять поля, которых нет в contract

### Правила для relatedLinks

`relatedLinks` содержит **исключительно ссылки на страницы услуг**.

**Допустимые `href`:**
- `/gevelisolatie/`
- `/buiten-stucwerk/`
- `/sierpleister/`
- `/gevel-schilderen/`
- `/muren-stucen/`

**Запрещено включать:**
- `/onze-werken/` — остаётся в CTA-блоке шаблона
- `/contact/` — остаётся в CTA-блоке шаблона

---

## 4. Folder and image contract

### 4.1. Source images

Оригиналы лежат в **подпапке** внутри `source-images/projects/`.
Путь к подпапке пользователь указывает в чате.

```
source-images/projects/{slug}/
  {prefix}-voor-01.jpg    (before photos)
  {prefix}-voor-02.jpg
  {prefix}-na-01.jpg       (after photos — na-01 = hero/cover)
  {prefix}-na-02.jpg
```

`{prefix}` — определяется полем `prefix` из JSON.
Подпапка может называться иначе, чем `{slug}` — используй путь, указанный пользователем.

Каталог `source-images/` НЕ попадает в production build.

### 4.2. Generate variants

Запустить **четыре** preset-команды с **реальным расширением** (определяется на шаге 2a, см. §6).

Обозначим путь к подпапке пользователя как `SRCDIR` (например `source-images/projects/etten-leur-gevelisolatie-10cm-ral9010-2025`).

Пример для `.jpg`:

```bash
# Все фото проекта: gallery + thumbnail
pnpm images:generate gallery "SRCDIR/{prefix}-*.jpg"
pnpm images:generate thumbnail "SRCDIR/{prefix}-*.jpg"

# Только cover (na-01): hero + card
pnpm images:generate hero "SRCDIR/{prefix}-na-01.jpg"
pnpm images:generate card "SRCDIR/{prefix}-na-01.jpg"
```

> **ВАЖНО:**
> - `SRCDIR` = путь к подпапке, указанный пользователем в чате.
> - Замени `.jpg` на фактическое расширение файлов (`.jpeg`, `.webp`, `.png`).
> - Если расширения смешанные — запусти отдельно для каждого расширения.
> - **НИКОГДА** не подставляй абстрактный `{ext}` — только реальное расширение.
> - Сначала определи расширение (шаг 2a), потом запускай генерацию.

### 4.3. Preset → variant widths

| Preset | Widths (px) | Назначение |
|--------|-------------|------------|
| `hero` | 480, 768, 1280, 1600, 1920 | Фоновое изображение hero |
| `card` | 320, 480, 640, 828 | Карточка в `/onze-werken/` |
| `gallery` | 480, 800, 1200, 1600 | Галерея voor/na |
| `thumbnail` | 160, 240, 320 | Превью в полосе миниатюр |

### 4.4. Verify

После генерации проверить:

1. **Variant files exist:**
   ```bash
   ls public/images/projects/{prefix}-*.w*.webp
   ```

2. **Manifest updated:**
   `data/image-manifest.json` должен содержать записи для всех `{prefix}-*`.

### 4.5. baseName

`baseName` — имя файла **без расширения и width-суффикса**.
Пример: файл `dordrecht-gevelisolatie-10cm-na-01.w480.webp` → baseName = `dordrecht-gevelisolatie-10cm-na-01`

> **⚠ CRITICAL — baseName зависит от `dir`!**
>
> `ResponsiveImage` формирует manifest key как: `dir.replace(/^\/images\/?/, "") + "/" + baseName`.
> Это значит, что **baseName НЕ включает то, что уже есть в `dir`**.
>
> Для subfolder-проектов есть ДВА разных контекста:
>
> | Контекст | `dir` | `baseName` | manifest key |
> |----------|-------|------------|-------------|
> | **Data file** (gallery, card) | `/images/projects` | `{prefix}/{prefix}-na-01` | `projects/{prefix}/{prefix}-na-01` |
> | **Hero** (page.tsx) | `/images/projects/{prefix}` | `{prefix}-na-01` | `projects/{prefix}/{prefix}-na-01` |
>
> Оба варианта дают **один и тот же manifest key**, но используют разную комбинацию `dir`/`baseName`.
>
> **Типичная ошибка**: скопировать `baseName` из data file в hero — получится двойная подпапка и 404.

---

## 5. Standard page assembly

### 5.1. Эталон

**Единственный эталон: Halsteren.**

Файлы эталона:
- Page: `app/onze-werken/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025/page.tsx`
- Content: `lib/content/projects/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025.ts`
- Card: `lib/content/projects.ts` (первая запись)

Все новые project pages строятся **путём копирования Halsteren** и замены данных.
Никакие layout decisions не переизобретаются.

### 5.2. Файлы, которые нужно создать/обновить

| # | Файл | Действие |
|---|------|----------|
| 1 | `lib/content/projects/{slug}.ts` | Создать |
| 2 | `app/onze-werken/{slug}/page.tsx` | Создать |
| 3 | `lib/content/projects.ts` | Обновить (добавить карточку ПЕРВОЙ в массив) |
| 4 | `deploy/apache/root.htaccess` | Обновить **ТОЛЬКО** если в JSON есть поле `oldUrl`. Если `oldUrl` нет — **НЕ ТРОГАТЬ** этот файл |

### 5.3. Content file: `lib/content/projects/{slug}.ts`

Точный шаблон:

```typescript
// ─── Config ──────────────────────────────────────────────────────────────────
export const IMAGE_EXT = "webp"

// ─── Image helpers ────────────────────────────────────────────────────────────
const pad = (n: number) => String(n).padStart(2, "0")
const PREFIX = "{prefix}"
const DIR = `/images/projects/${PREFIX}`

export const beforeImages = Array.from({ length: {beforeCount} }, (_, i) => ({
  src: `${DIR}/${PREFIX}-voor-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `{city} {werkType} – voor de werken foto ${pad(i + 1)} ({year})`,
  baseName: `${PREFIX}/${PREFIX}-voor-${pad(i + 1)}`,
}))

export const afterImages = Array.from({ length: {afterCount} }, (_, i) => ({
  src: `${DIR}/${PREFIX}-na-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `{city} {werkType} – na de werken foto ${pad(i + 1)} ({year})`,
  baseName: `${PREFIX}/${PREFIX}-na-${pad(i + 1)}`,
}))
```

> **ВАЖНО — подпапка проекта:**
> Изображения проекта хранятся в собственной подпапке: `public/images/projects/{prefix}/`.
> Скрипт `generate-variants` автоматически создаёт эту подпапку из пути source images.
>
> Поэтому:
> - `src` содержит полный путь: `/images/projects/{prefix}/{prefix}-na-01.webp`
> - `baseName` содержит `{prefix}/{prefix}-na-01` (с подпапкой!) — иначе manifest lookup сломается
> - `DIR` = `/images/projects/{prefix}` — используется для `src` и `ResponsiveImage dir`

Где:
- `{prefix}` = поле `prefix` из JSON
- `{city}` = `meta.city`
- `{werkType}` = краткое описание работ на NL (например `gevelisolatie 10 cm sierpleister`, `buitenstucwerk met sierpleister`)
- `{year}` = `meta.year` (или `meta.yearDisplay` если есть)
- `{beforeCount}` и `{afterCount}` = из JSON

### 5.4. Page file: `app/onze-werken/{slug}/page.tsx`

#### Imports (фиксированные, без исключений)

```tsx
import { Fragment } from "react"
import Link from "next/link"
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react"
import { buildPageMetadata } from "@/lib/seo/meta"
import { jsonLdScript, projectPageSchema } from "@/lib/seo/schema"
import { SITE } from "@/lib/seo/routes"
import ProjectGalleryCarousel from "@/components/sections/projects/ProjectGalleryCarousel"
import WerkzaamhedenAccordion from "@/components/sections/projects/WerkzaamhedenAccordion"
import ResponsiveImage from "@/components/responsive-image"
import { beforeImages, afterImages } from "@/lib/content/projects/{slug}"
```

#### SEO metadata

```tsx
export const metadata = buildPageMetadata(
  "/onze-werken/{slug}/",
  {
    title: "{metaTitle}",
    description: "{metaDescription}",
  },
)
```

#### Data блок

Все данные объявляются как `const` перед компонентом:
- `heroBullets` — string[]
- `werkzaamheden` — {title, body}[]
- `bevindingen` — {title, body}[]
- `resultaten` — {title, body}[]
- `detailCards` — {title, body}[]
- `materialen` — {label, value}[]
- `relatedLinks` — {label, href}[]

#### Component name

`export default function {City}ProjectPage()` — где `{City}` = название города с заглавной буквы.

#### Обязательные секции (в строгом порядке)

Все секции ниже обязательны. Порядок не менять.

---

### Секция: JSON-LD Schema (перед `<div>`)

```tsx
{projectPageSchema({
  title: "{metaTitle}",
  description: "{metaDescription}",
  url: `${SITE.canonicalBase}/onze-werken/{slug}/`,
  image: "/images/projects/{prefix}/{prefix}-na-01.webp",
  city: "{city}",
  year: {year},
  serviceTypes: {serviceTypes},
}).map((s, i) => (
  <Fragment key={i}>{jsonLdScript(s)}</Fragment>
))}
```

---

### Секция A · HERO

**Фиксированная структура. Не менять ничего, кроме данных.**

```
<div className="min-h-screen bg-background">
<section className="relative isolate overflow-hidden min-h-[80vh] lg:min-h-[65vh]">
```

**Hero image (ResponsiveImage):**
```tsx
<ResponsiveImage
  baseName="{prefix}-na-01"
  dir="/images/projects/{prefix}"
  preset="hero"
  alt=""
  aria-hidden="true"
  className="absolute inset-0 h-full w-full object-cover object-center"
  sizes="(max-width: 1920px) 100vw, 1920px"
  priority
  draggable={false}
/>
```

> **⚠ НЕ копировать `baseName` из data file!**
> Hero `dir` уже содержит подпапку → `baseName` = только имя файла.
> Правильно: `baseName="{prefix}-na-01"`, `dir="/images/projects/{prefix}"`.
> Неправильно: `baseName="{prefix}/{prefix}-na-01"` — двойная подпапка → 404.

**6 overlay layers (КОПИРОВАТЬ ТОЧНО ИЗ HALSTEREN, НЕ МЕНЯТЬ):**

| Layer | Описание | CSS |
|-------|----------|-----|
| 1 | Base darkening | `rgba(10,7,3,0.48)` |
| 2 | Left-heavy gradient | `linear-gradient(108deg, ...)` |
| 3 | Top band (navbar) | `height: 200`, gradient to transparent |
| 4 | Orange glow bottom-left | `480×480`, radial-gradient |
| 5 | Bottom fade to white | `height: 180`, gradient to `#ffffff` |
| 6 | Right vignette | `width: 32%`, gradient to transparent |

**Content wrapper:**
```
<div className="relative z-10 container-default flex flex-col justify-between min-h-[80vh] lg:min-h-[65vh]">
```

**Breadcrumbs:**
```
<nav aria-label="Breadcrumb" className="pt-28 sm:pt-32 lg:pt-36 mb-7">
```
Last item format: `{City} ({year})`

**Content area:**
```
<div className="pb-16 sm:pb-20 lg:pb-24">
```

**Badge:**
```tsx
<span
  className="inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white"
  style={{ background: "rgba(232,96,10,0.90)", border: "1px solid rgba(232,96,10,0.60)" }}
>
  {serviceType}
</span>
```

**H1:**
```
className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl max-w-3xl"
```

**Subtitle paragraph:**
```
className="mt-4 text-lg leading-relaxed max-w-2xl" style={{ color: "rgba(255,255,255,0.78)" }}
```

**Passport row (frosted-glass bar):**
```tsx
<div
  className="mt-6 inline-flex flex-wrap gap-x-2 gap-y-1 rounded-xl px-4 py-3 text-sm"
  style={{
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.18)",
    backdropFilter: "blur(8px)",
    color: "rgba(255,255,255,0.75)",
  }}
>
  <span className="font-medium text-white">{city}</span>
  <span aria-hidden>·</span>
  <span>{passportItems[1]}</span>
  <span aria-hidden>·</span>
  <span>{passportItems[2]}</span>
  ...
</div>
```

**Hero bullets:**
```tsx
<ul className="mt-6 grid gap-2 sm:grid-cols-2 max-w-2xl" role="list">
  {heroBullets.map((b) => (
    <li key={b} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.82)" }}>
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
      {b}
    </li>
  ))}
</ul>
```

**CTAs (ТОЧНО как в Halsteren):**
```tsx
<div className="mt-8 flex flex-wrap gap-3">
  <Link href="/contact/" className="btn-hero">
    Offerte aanvragen
    <ArrowRight className="h-4 w-4" />
  </Link>
  <Link
    href="/onze-werken/"
    className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/80 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10"
  >
    Terug naar Onze werken
  </Link>
</div>
```

---

### Секция B · WERKZAAMHEDEN

```tsx
<section className="section-spacing border-b border-border" aria-labelledby="werkzaamheden-heading">
  <div className="container-default">
    <div className="section-header">
      <span className="section-header-line" aria-hidden />
      <span className="section-header-label">Werkzaamheden</span>
    </div>
    <h2 id="werkzaamheden-heading" className="section-title max-w-2xl">
      Wat hebben we <span className="text-primary">uitgevoerd?</span>
    </h2>
    <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
      {werkzaamhedenIntro}
    </p>
    <WerkzaamhedenAccordion items={werkzaamheden} />
  </div>
</section>
```

H2 текст — **всегда** `Wat hebben we <span className="text-primary">uitgevoerd?</span>`.
Меняется ТОЛЬКО `<p>` с intro.

---

### Секция C · VOOR DE WERKEN

```tsx
<section className="section-spacing border-b border-border bg-secondary/30" aria-labelledby="voor-heading">
```

- H2: **всегда** `Voor de <span className="text-primary">werken</span>`
- Label: **всегда** `Beginsituatie`
- Cards: `bevindingen` в grid `mt-7 grid gap-3 sm:grid-cols-2`
- Gallery: `ProjectGalleryCarousel title="Voor de werken" variant="voor" images={beforeImages}`
- Карточки используют **точно тот же JSX**, что в Halsteren (с orange left accent bar)

---

### Секция D · NA DE WERKEN

```tsx
<section className="section-spacing border-b border-border" aria-labelledby="na-heading">
```

- H2: **всегда** `Na de <span className="text-primary">werken</span>`
- Label: **всегда** `Eindresultaat`
- Cards: `resultaten` — тот же шаблон карточек
- Gallery: `ProjectGalleryCarousel title="Na de werken" variant="na" images={afterImages}`

---

### Секция E · DETAILS

```tsx
<section className="section-spacing border-b border-border bg-secondary/30" aria-labelledby="details-heading">
```

- H2: **всегда** `Details die het <span className="text-primary">verschil maken</span>`
- Label: **всегда** `Vakmanschap`

---

### Секция F · MATERIALEN

```tsx
<section className="section-spacing border-b border-border bg-secondary/30" aria-labelledby="materialen-heading">
  <div className="container-default max-w-3xl">
```

- H2: **всегда** `Materialen &amp; <span className="text-primary">afwerking</span>`
- Label: **всегда** `Materialen`
- `<dl>` table с разделителями `border-t`
- Disclaimer paragraph с **`Let op:`** — копировать точно из Halsteren

---

### Секция H · GERELATEERDE DIENSTEN

```tsx
<aside className="border-t border-border bg-secondary/10 py-10" aria-label="Gerelateerde diensten">
```

**Grid columns зависят от количества relatedLinks:**

| Кол-во ссылок | Grid classes |
|---------------|-------------|
| 2 | `grid gap-3 sm:grid-cols-2` |
| 3 | `grid gap-3 sm:grid-cols-2 lg:grid-cols-3` |
| 4 | `grid gap-3 sm:grid-cols-2 lg:grid-cols-4` |

---

### 5.5. Card entry: `lib/content/projects.ts`

Добавить карточку **ПЕРВОЙ** в массив `projects[]`.

#### Runtime contract (НЕ МЕНЯТЬ)

Тип `ProjectCard` определён в `lib/types/projects.ts`.
Компонент `ProjectCard` (`components/projects/ProjectCard.tsx`) использует эти поля **в runtime**:

| Поле | Обязательно | Как используется в runtime |
|------|-------------|--------------------------|
| `slug` | да | — |
| `serviceType` | да | Badge на карточке |
| `serviceTypes` | да | Фильтр + secondary chips |
| `title` | да | `<h3>` карточки |
| `subtitle` | да | Не рендерится напрямую, но часть типа |
| `meta.city` | да | `{city} · {objectType}` строка |
| `meta.objectType` | да | `{city} · {objectType}` строка |
| `meta.highlight` | да | Текст под заголовком карточки |
| `meta.year` | да | Badge с годом (top-right) |
| `meta.yearDisplay` | нет | Если дан — отображается вместо `year` |
| `projectUrl` | да | `<Link href>` |
| `cardAlt` | да | `aria-label` карточки |
| `coverImage.src` | **да** | **`srcToBaseName(src)` → `baseName` для `ResponsiveImage`** |
| `coverImage.alt` | **да** | Alt cover-изображения |
| `beforeThumb.src` | **да** | **`srcToBaseName(src)` → `baseName` для миниатюры** |
| `beforeThumb.alt` | **да** | Alt миниатюры |

> **КРИТИЧЕСКИ ВАЖНО:**
> `coverImage.src` и `beforeThumb.src` **нельзя убирать или менять формат**.
> Компонент `ProjectCard` вызывает `srcToBaseName(coverImage.src)` для получения
> `baseName`, который затем передаётся в `ResponsiveImage`.
>
> Формат `src`: `/images/projects/{prefix}/{prefix}-na-01.webp`
> Функция `srcToBaseName` отрезает `/images/projects/` и `.webp` → получает `{prefix}/{prefix}-na-01`.
> Это значение используется как `baseName`, а `dir="/images/projects"` захардкожен в компоненте.
> Manifest key собирается как `projects/{baseName}` = `projects/{prefix}/{prefix}-na-01` — что совпадает с ключом в `image-manifest.json`.
>
> Если `src` не в этом формате — **карточка сломается в runtime**.
> Модель НЕ должна "оптимизировать" этот формат.

#### Шаблон записи

```typescript
{
  slug: "{slug}",
  serviceType: "{serviceType}",
  serviceTypes: {serviceTypes},
  title: "{title}",
  subtitle: "{subtitleShort или subtitle}",
  meta: {
    city: "{city}",
    objectType: "{objectType}",
    highlight: "{highlight}",
    year: {year},
  },
  projectUrl: "/onze-werken/{slug}/",
  cardAlt: "{cardAlt}",
  coverImage: {
    src: "/images/projects/{prefix}/{prefix}-na-01.webp",
    alt: "{city} {werkType} – na de werken foto 01 ({year})",
  },
  beforeThumb: {
    src: "/images/projects/{prefix}/{prefix}-voor-01.webp",
    alt: "{city} {werkType} – voor de werken foto 01 ({year})",
  },
},
```

Если есть `meta.yearDisplay`, добавить `yearDisplay: "{yearDisplay}"` в `meta`.

> Создание project page **без корректного обновления `lib/content/projects.ts`**
> считается **незавершённой задачей**.

### 5.6. Redirect: `deploy/apache/root.htaccess`

> **ЗАПРЕЩЕНО** трогать `deploy/apache/root.htaccess`, если в JSON **нет** поля `oldUrl`.
> Новые проекты **не имеют** старых URL — redirect им не нужен. **Не выдумывай** URL для redirect.

**Только если в JSON явно указано поле `oldUrl`:**

Добавить строку в секцию `# ─── Old WP project pages`:
```
Redirect 301 {oldUrl} /onze-werken/{slug}/
```

> **ВАЖНО:** Редиректы идут в `deploy/apache/root.htaccess`, НЕ в `public/.htaccess`.

---

## 6. Execution steps for the model

Выполняй строго по порядку. Не пропускай шаги.

### Шаг 1: Validate JSON

- [ ] Все обязательные поля присутствуют
- [ ] `slug` ≤ 75 символов, только `a-z`, `0-9`, дефис
- [ ] `metaTitle` ≤ 60 символов
- [ ] `metaDescription` ≤ 160 символов
- [ ] `heroBullets` — ровно 3 пункта
- [ ] `werkzaamheden` ≥ 2
- [ ] `bevindingen` ≥ 1
- [ ] `resultaten` ≥ 1
- [ ] `detailCards` ≥ 1
- [ ] `materialen` ≥ 2
- [ ] `relatedLinks` — 2–4 ссылки, только на service pages
- [ ] Нет неподтверждённых %, абсолютов ("altijd", "nooit", "de beste")
- [ ] `passportItems` — первый элемент = город
- [ ] Content на **NL только**

**Если JSON неполный или невалидный — СТОП. Запросить у пользователя исправления.**

### Шаг 2: Validate source images and detect extension

Пользователь указывает путь к подпапке с фото (обозначим `SRCDIR`).
Например: `source-images/projects/etten-leur-gevelisolatie-10cm-ral9010-2025`

**2a. Определить реальные файлы и расширение:**

```bash
ls SRCDIR/
```

Запомни **фактическое расширение** файлов (`.jpg`, `.jpeg`, `.webp`, `.png`).
Оно нужно для шага 3. Обозначим его `EXT`.

Если расширения смешанные (например, часть `.jpg`, часть `.webp`) — это допустимо.
В этом случае запускай команды шага 3 по каждому расширению отдельно.

**2b. Проверить полноту:**
- [ ] Файл `{prefix}-na-01.{EXT}` существует в `SRCDIR`
- [ ] Файл `{prefix}-voor-01.{EXT}` существует в `SRCDIR`
- [ ] Количество voor-файлов = `beforeCount`
- [ ] Количество na-файлов = `afterCount`

**Если файлы не найдены — СТОП. Сообщить пользователю.**
**Если `prefix` из JSON не совпадает ни с одним файлом — СТОП. Уточнить prefix.**

### Шаг 3: Generate image variants

Используй `SRCDIR` и `EXT`, определённые на шаге 2. Примеры ниже для `.jpg`:

```bash
pnpm images:generate gallery "SRCDIR/{prefix}-*.jpg"
pnpm images:generate thumbnail "SRCDIR/{prefix}-*.jpg"
pnpm images:generate hero "SRCDIR/{prefix}-na-01.jpg"
pnpm images:generate card "SRCDIR/{prefix}-na-01.jpg"
```

> **Адаптация:** замени `.jpg` на фактическое расширение из шага 2a.
> Если расширения смешанные — запусти по каждому отдельно:
> ```bash
> pnpm images:generate gallery "SRCDIR/{prefix}-*.jpg"
> pnpm images:generate gallery "SRCDIR/{prefix}-*.webp"
> ```
>
> **НИКОГДА** не подставляй абстрактный `{ext}` — только реальное расширение.

### Шаг 4: Verify variants

```bash
ls public/images/projects/{prefix}/
```

Проверить:
- [ ] Variant files (`.w480.webp`, `.w800.webp` и т.д.) в подпапке `{prefix}/`
- [ ] `data/image-manifest.json` обновился (ключи: `projects/{prefix}/{prefix}-na-01` и т.д.)

**Если variants не созданы — СТОП. Проверить ошибки pipeline.**

### Шаг 5: Create content file

Создать `lib/content/projects/{slug}.ts` по шаблону из §5.3.

**CHECKPOINT:** Сразу после создания:
```bash
Test-Path "lib/content/projects/{slug}.ts"
```
Если `False` — СТОП. Файл не записался. Сообщить пользователю.

### Шаг 6: Create page file

Создать `app/onze-werken/{slug}/page.tsx` по шаблону из §5.4.

**Обязательно:**
1. Скопировать **точную структуру** Halsteren
2. Заменить ТОЛЬКО данные
3. Все 6 overlay layers — без изменений
4. Все CSS-классы — без изменений
5. Секции A–F, H — все присутствуют, порядок сохранён

**CHECKPOINT:** Сразу после создания:
```bash
Test-Path "app/onze-werken/{slug}/page.tsx"
```
Если `False` — СТОП. Файл не записался. Сообщить пользователю.

### Шаг 7: Update projects.ts

Добавить карточку **ПЕРВОЙ** в массив в `lib/content/projects.ts`.

> **SCOPE LOCK:** Добавить ТОЛЬКО новую карточку. НЕ менять, НЕ переформатировать, НЕ «улучшать» существующие записи.
> Если `StrReplace` не находит уникальное совпадение — СТОП. Сообщить пользователю. НЕ переписывать весь файл.

### Шаг 8: Update htaccess (ТОЛЬКО если oldUrl)

> **Нет `oldUrl` в JSON → ПРОПУСТИТЬ этот шаг. НЕ трогать htaccess. НЕ придумывать URL.**

Если в JSON **явно указано** поле `oldUrl`:
Добавить redirect в `deploy/apache/root.htaccess` в секцию legacy redirects.

### Шаг 9: Lint check

- [ ] `ReadLints` на всех изменённых файлах
- [ ] Исправить все lint errors

### Шаг 10: Build verification (ОБЯЗАТЕЛЬНО)

Запустить production build:

```bash
pnpm build
```

Проверить:
- [ ] Build завершился с exit code 0
- [ ] Нет новых ошибок или warnings, связанных с новой страницей
- [ ] Страница `/onze-werken/{slug}/` присутствует в output

> **Без успешного build задача НЕ считается завершённой.**
> Lint проверяет только синтаксис, build проверяет реальную сборку:
> imports, types, metadata export, image manifest lookups.

### Шаг 11: Card and page verification (ОБЯЗАТЕЛЬНО)

Если dev server доступен (`pnpm dev`), проверить:
- [ ] Открыть `/onze-werken/` — новая карточка отображается **первой**
- [ ] Карточка: cover image загрузился, before thumb отображается
- [ ] Открыть `/onze-werken/{slug}/` — страница рендерится
- [ ] Hero: background image загрузился
- [ ] Gallery: voor и na carousels работают, lightbox открывается

> **Без проверки карточки в archive задача НЕ считается завершённой.**
> Если dev server недоступен — выполнить build (шаг 10) как минимум.

---

## 7. Stop rules

Модель **ОБЯЗАНА ОСТАНОВИТЬСЯ** и запросить помощь, если:

| Ситуация | Действие |
|----------|----------|
| JSON неполный | СТОП — запросить недостающие поля |
| Source images не найдены | СТОП — сообщить, какие файлы отсутствуют |
| `prefix` из JSON не совпадает с файлами на диске | СТОП — уточнить правильный prefix |
| `metaTitle` > 60 символов | СТОП — попросить сократить |
| `metaDescription` > 160 символов | СТОП — попросить сократить |
| `relatedLinks` содержит `/onze-werken/` или `/contact/` | СТОП — исправить |
| `slug` конфликтует с существующим | СТОП — сообщить |
| Manifest не обновился после генерации | СТОП — проверить pipeline |
| Структура страницы не может быть собрана без догадок | СТОП — запросить уточнение |
| `heroBullets` ≠ 3 | СТОП — ровно 3, не больше и не меньше |
| В JSON нет `oldUrl`, но модель добавила redirect | СТОП — убрать redirect, не трогать htaccess |
| `pnpm build` fails | СТОП — исправить ошибки **только в файлах из whitelist (§1a)**. Если ошибка в чужом файле — СТОП, сообщить пользователю |
| Карточка не отображается на `/onze-werken/` | СТОП — проверить `projects.ts` |
| Файл не записался (`Test-Path` = False) | СТОП — сообщить пользователю, НЕ пытаться «починить» другие файлы |
| `StrReplace` не находит совпадение в `projects.ts` | СТОП — сообщить пользователю. НЕ переписывать весь файл через Write |
| Любая ошибка ведёт к желанию изменить файл вне whitelist | **ПОЛНЫЙ СТОП.** Сообщить пользователю и ждать инструкций |
| Import не работает / модуль не найден | СТОП — проверить путь и `Test-Path`. НЕ менять компоненты или lib/ |

---

## 8. Definition of Done

Project page считается **завершённой**, когда:

### Файлы
- [ ] `lib/content/projects/{slug}.ts` создан
- [ ] `app/onze-werken/{slug}/page.tsx` создан
- [ ] `lib/content/projects.ts` обновлён (карточка первая в массиве)
- [ ] `deploy/apache/root.htaccess` обновлён **только если** в JSON было поле `oldUrl` (иначе файл **не тронут**)

### Image pipeline
- [ ] Все source images в `source-images/projects/`
- [ ] Все 4 preset-а запущены (gallery, thumbnail, hero, card)
- [ ] Variant files в `public/images/projects/`
- [ ] `data/image-manifest.json` обновлён
- [ ] `baseName` указан в каждом image entry

### Page quality
- [ ] Секции A–F, H — все присутствуют в правильном порядке
- [ ] Hero: 6 overlay layers, badge, H1, subtitle, passport, bullets, CTAs
- [ ] Gallery: voor + na carousels работают
- [ ] Lightbox: открывается/закрывается
- [ ] Materialen: dl-таблица + disclaimer
- [ ] Related links: grid columns соответствуют количеству ссылок

### SEO / Schema
- [ ] `metadata` экспортирован через `buildPageMetadata`
- [ ] `projectPageSchema` вызван с правильными параметрами
- [ ] Breadcrumbs: Home → Onze werken → {City} ({year})
- [ ] `metaTitle` ≤ 60 символов
- [ ] `metaDescription` ≤ 160 символов

### Build and runtime
- [ ] `pnpm build` — exit code 0, нет ошибок связанных с новой страницей
- [ ] Карточка отображается **первой** на `/onze-werken/`
- [ ] Cover image и before thumb в карточке загружаются (responsive variants)
- [ ] Страница `/onze-werken/{slug}/` рендерится в dev/build

### Technical
- [ ] Lint — 0 ошибок
- [ ] Нет broken imports
- [ ] Нет hardcoded image paths (только через baseName / manifest)
- [ ] `lib/content/projects.ts` обновлён корректно (coverImage.src и beforeThumb.src в формате `/images/projects/{baseName}.webp`)

---

## 9. Final report format

После завершения модель выдаёт отчёт:

```
## Project page report

### Created files
- lib/content/projects/{slug}.ts
- app/onze-werken/{slug}/page.tsx

### Updated files
- lib/content/projects.ts (card added as first entry)
- deploy/apache/root.htaccess (ONLY if `oldUrl` was in JSON — otherwise NOT touched)
- data/image-manifest.json (auto-updated by pipeline)

### Image pipeline
- Prefix: {prefix}
- Source images: {beforeCount} voor + {afterCount} na
- Presets run: gallery ✓, thumbnail ✓, hero ✓, card ✓
- Variants generated: {total variant count} files

### Checks
- Lint: ✓ clean
- Build: ✓ pnpm build exit 0
- Card on /onze-werken/: ✓ visible as first entry
- JSON validation: ✓ all fields valid
- metaTitle: {length}/47 chars (бюджет: 60 − 13 суффикс)
- metaDescription: {length}/160 chars

### Visual checks performed (if dev server available)
- [ ] /onze-werken/{slug}/ renders correctly
- [ ] Hero image loads
- [ ] Gallery voor/na works, lightbox opens
- [ ] Card cover + before thumb load with responsive variants
- [ ] Mobile layout OK

### SEO audit
- [ ] metadata.title ≤ 47 символов   (факт: __ / 47)
- [ ] metadata.description ≤ 160 символов (факт: __ / 160)
- [ ] schema image path содержит подпапку {prefix}/
- [ ] relatedLinks grid-cols-N == кол-во ссылок
- [ ] Все image paths содержат подпапку {prefix}/
- [ ] buildPageMetadata canonical path корректен
```

---

## 10. Content quality rules

### Claims safety

Project pages — **фактические кейсы**. Запрещено:
- Жёсткие % без документации (`"40% besparing"`)
- Неподтверждённые гарантии
- Точные сроки без подтверждения
- Абсолюты: `"altijd"`, `"nooit"`, `"geen voorrijkosten"`, `"de beste"`

Допустимый стиль:
- `"In dit project …"`
- `"Afhankelijk van de situatie …"`
- `"Op basis van de opname op locatie …"`

### Anti-cannibalization

Project page = **реализованный объект**, не money page.
- Не превращать в SEO-обзор услуги
- `metaTitle` / `metaDescription` содержат: город + год + материалы
- Не использовать: `"beste gevelisolatie bedrijf"`, `"gevelisolatie prijzen"`

### Alt-текст

Шаблон: `{Stad} {type werk} {specificatie} – voor/na de werken foto {nr} ({jaar})`

Пример: `Dordrecht gevelisolatie 10 cm sierpleister – na de werken foto 01 (2025)`

---

## 11. JSON template (copy-paste)

```json
{
  "slug": "",
  "prefix": "",
  "title": "",
  "subtitle": "",
  "heroDescription": "",
  "meta": {
    "city": "",
    "objectType": "",
    "highlight": "",
    "year": 2025
  },
  "serviceType": "",
  "serviceTypes": [],
  "cardAlt": "",
  "passportItems": [],
  "heroBullets": ["", "", ""],
  "werkzaamheden": [
    { "title": "", "body": "" }
  ],
  "werkzaamhedenIntro": "",
  "bevindingen": [
    { "title": "", "body": "" }
  ],
  "voorIntro": "",
  "resultaten": [
    { "title": "", "body": "" }
  ],
  "naIntro": "",
  "detailCards": [
    { "title": "", "body": "" }
  ],
  "detailsIntro": "",
  "materialen": [
    { "label": "", "value": "" }
  ],
  "materialenIntro": "",
  "relatedLinks": [
    { "label": "", "href": "" }
  ],
  "beforeCount": 0,
  "afterCount": 0,
  "metaTitle": "",
  "metaDescription": "",
  "oldUrl": ""
}
```

---

## 12. SEO & Technical audit (финальная проверка)

> **Выполнять ПОСЛЕ успешного билда (step 9).**
> Цель — поймать типичные ошибки до деплоя.

### 12.1 Meta title (бюджет: ≤ 47 символов)

`TITLE_SUFFIX` = `" | BM klus BV"` (13 символов).
`buildPageMetadata` обрезает title до `60 - TITLE_SUFFIX.length = 47` символов.

**Проверка:** посчитать длину `metadata.title` в `page.tsx`.
- Если > 47 → сократить. Использовать формат:
  `"{Stad} gevelisolatie {dikte} {afwerking} ({jaar})"` или аналогичный.
- `–` и `—` занимают 1 символ, но отнимают по 2 визуальных. Заменять на `(...)` при нехватке бюджета.

### 12.2 Meta description (бюджет: ≤ 160 символов)

`buildPageMetadata` обрезает description до 160 символов.
**Проверка:** посчитать длину `metadata.description` в `page.tsx`.

### 12.3 Schema image path

`projectPageSchema({ image: ... })` в `page.tsx` — путь к обложке должен
включать подпапку проекта:

```
✓  /images/projects/{prefix}/{prefix}-na-01.webp
✗  /images/projects/{prefix}-na-01.webp        ← подпапка пропущена
```

### 12.4 Related links grid

Количество `relatedLinks` должно совпадать с grid columns:
| Кол-во ссылок | className |
|---------------|-----------|
| 2 | `lg:grid-cols-2` |
| 3 | `lg:grid-cols-3` |
| 4 | `lg:grid-cols-4` |

### 12.5 Image paths consistency

Проверить что **все** ссылки на изображения содержат подпапку `{prefix}/`:

| Место | Шаблон правильного пути | Пояснение |
|-------|------------------------|-----------|
| `lib/content/projects/{slug}.ts` → `src` | `/images/projects/{prefix}/{prefix}-na-01.webp` | полный URL |
| `lib/content/projects/{slug}.ts` → `baseName` | `{prefix}/{prefix}-na-01` | gallery dir = `/images/projects` → нужна подпапка |
| `lib/content/projects.ts` → `coverImage.src` | `/images/projects/{prefix}/{prefix}-na-01.webp` | полный URL |
| `lib/content/projects.ts` → `beforeThumb.src` | `/images/projects/{prefix}/{prefix}-voor-01.webp` | полный URL |
| `page.tsx` → hero `ResponsiveImage baseName` | `{prefix}-na-01` | **без подпапки!** dir уже включает её |
| `page.tsx` → hero `ResponsiveImage dir` | `/images/projects/{prefix}` | указывает на подпапку |
| `page.tsx` → `projectPageSchema image` | `/images/projects/{prefix}/{prefix}-na-01.webp` | полный URL |

### 12.6 Итоговый чеклист

```
SEO AUDIT (вставить в FINAL REPORT):
- [ ] metadata.title ≤ 47 символов   (факт: __ / 47)
- [ ] metadata.description ≤ 160 символов (факт: __ / 160)
- [ ] schema image path содержит подпапку {prefix}/
- [ ] relatedLinks grid-cols-N соответствует кол-ву ссылок
- [ ] Все image paths содержат подпапку {prefix}/
- [ ] buildPageMetadata canonical path корректен
```

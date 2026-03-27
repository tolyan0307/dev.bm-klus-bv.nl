# ADD-VIDEO-SECTION — Добавление видео-секции на project page

> **Расположение:** `docs/ADD-VIDEO-SECTION.md`
> **Связанные файлы:**
> - [`docs/ADD-PROJECT.md`](ADD-PROJECT.md) — основная инструкция по созданию проектных страниц
> - `components/youtube-embed.tsx` — клиентский компонент (facade pattern)
> - `lib/seo/schema.ts` → `videoSchema()` — JSON-LD генератор
> - Эталон: `app/onze-werken/rotterdam-julianastraat-aanbouw-isolatie-4cm-2026/page.tsx`

---

## 1. Когда применять

Эта инструкция применяется, когда пользователь хочет добавить YouTube-видео на **существующую** project page в `/onze-werken/`.

Видео добавляется **только** если пользователь предоставил ссылку на YouTube-ролик, снятый на этом проекте.

---

## 2. SCOPE LOCK

### Разрешённые действия

| # | Файл | Действие |
|---|------|----------|
| 1 | `app/onze-werken/{slug}/page.tsx` | **Обновить** — добавить import, JSON-LD и секцию видео |

### Запрещённые действия

- ❌ Редактировать `components/youtube-embed.tsx`
- ❌ Редактировать `lib/seo/schema.ts`
- ❌ Создавать новые компоненты
- ❌ Менять другие секции страницы (hero, werkzaamheden, galleries и т.д.)
- ❌ Менять порядок существующих секций
- ❌ Менять spacing, стили или CSS-классы других секций

---

## 3. Inputs от пользователя

Пользователь предоставляет **YouTube-ссылку**. Из неё модель должна извлечь:

| Поле | Откуда взять | Пример |
|------|-------------|--------|
| `videoId` | URL: `youtu.be/{ID}` или `watch?v={ID}` | `iSUV_L9tD-E` |
| `name` | Заголовок видео на YouTube | `Aanbouw isoleren in Rotterdam Julianastraat \| 4 cm gevelisolatie` |
| `description` | Описание видео на YouTube (первые 1–2 предложения) | `Bij dit project hebben we de gevelplint behandeld met bitumen...` |
| `uploadDate` | Дата публикации на YouTube (ISO 8601, только дата) | `2026-03-26` |
| `duration` | Длительность видео в двух форматах: | |
| — ISO 8601 | Для JSON-LD schema (`duration` в `videoSchema`) | `PT33S` / `PT2M15S` |
| — Читаемый | Для UI badge (`duration` prop в `YouTubeEmbed`) | `0:33` / `2:15` |

### Как получить метаданные

Использовать oEmbed API (не требует ключа):

```
https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={VIDEO_ID}&format=json
```

Или загрузить страницу видео и прочитать заголовок, описание, дату и длительность.

---

## 4. Пошаговая инструкция

### Шаг 1: Добавить import

В файле `app/onze-werken/{slug}/page.tsx` добавить два импорта:

**1a.** Добавить `videoSchema` к существующему импорту из schema:

```tsx
// БЫЛО:
import { jsonLdScript, projectPageSchema } from "@/lib/seo/schema"

// СТАЛО:
import { jsonLdScript, projectPageSchema, videoSchema } from "@/lib/seo/schema"
```

**1b.** Добавить импорт компонента YouTubeEmbed (после остальных импортов):

```tsx
import YouTubeEmbed from "@/components/youtube-embed"
```

---

### Шаг 2: Добавить VideoObject JSON-LD

Сразу после блока `projectPageSchema(...).map(...)` добавить:

```tsx
      {jsonLdScript(videoSchema({
        name: "ЗАГОЛОВОК ВИДЕО С YOUTUBE",
        description: "ОПИСАНИЕ ВИДЕО С YOUTUBE (1-2 предложения)",
        videoId: "VIDEO_ID",
        thumbnailUrl: "https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg",
        uploadDate: "YYYY-MM-DD",
        duration: "PT__S",
      }))}
```

**Пример** (эталон — Rotterdam Julianastraat):

```tsx
      {jsonLdScript(videoSchema({
        name: "Aanbouw isoleren in Rotterdam Julianastraat | 4 cm gevelisolatie",
        description:
          "Bij dit project hebben we de gevelplint behandeld met bitumen, 4 cm isolatie verlijmd en verankerd met pluggen, gaas gemonteerd en geplamuurd, en de gevel afgewerkt met sierpleister 1,5 mm in standaard wit. De plint is afgewerkt in antraciet voor een strak contrast.",
        videoId: "iSUV_L9tD-E",
        thumbnailUrl: "https://i.ytimg.com/vi/iSUV_L9tD-E/maxresdefault.jpg",
        uploadDate: "2026-03-26",
        duration: "PT33S",
      }))}
```

**Правила для `duration` (ISO 8601):**
- Только секунды: `PT33S`
- Минуты и секунды: `PT2M15S`
- Часы, минуты, секунды: `PT1H5M30S`

---

### Шаг 3: Вставить видео-секцию

#### Позиция: между секцией D (Na de werken) и секцией E (Details die het verschil maken)

Найти комментарий `{/* ── E · DETAILS DIE HET VERSCHIL MAKEN` и вставить **перед ним** следующий блок.

#### Копируемый шаблон (заменить только 4 значения):

```tsx
      {/* ── D½ · VIDEO ──────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden border-b border-border py-16 sm:py-20 lg:py-24"
        aria-labelledby="video-heading"
        style={{ background: "linear-gradient(175deg, #1A1A1A 0%, #1F1710 45%, #2A1C0E 70%, #1A1A1A 100%)" }}
      >
        {/* Decorative orange glow — top-right */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-[0.07] blur-3xl"
          style={{ background: "#E8600A" }}
          aria-hidden
        />
        {/* Decorative orange glow — bottom-left */}
        <div
          className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full opacity-[0.05] blur-3xl"
          style={{ background: "#E8600A" }}
          aria-hidden
        />

        <div className="container-default max-w-4xl">
          {/* Section header — adapted for dark background */}
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-12 bg-primary" aria-hidden />
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Video
            </span>
          </div>
          <h2
            id="video-heading"
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Bekijk het project{" "}
            <span className="text-primary">in beeld</span>
          </h2>
          <p
            className="mt-3 max-w-2xl text-base leading-relaxed"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            __BESCHRIJVING__
          </p>

          {/* Video card */}
          <div className="mt-8 rounded-2xl p-2 sm:p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <YouTubeEmbed
              videoId="__VIDEO_ID__"
              title="__VIDEO_TITLE__"
              duration="__DURATION_LEESBAAR__"
            />
          </div>

          {/* Metadata strip */}
          <div
            className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                <path d="M8 0a8 8 0 110 16A8 8 0 018 0zm0 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM6.5 5l5 3-5 3V5z" />
              </svg>
              BM klus BV op YouTube
            </span>
            <span className="h-3 w-px" style={{ background: "rgba(255,255,255,0.15)" }} aria-hidden />
            <span>__LOCATIE__</span>
            <span className="h-3 w-px" style={{ background: "rgba(255,255,255,0.15)" }} aria-hidden />
            <span>__JAAR__</span>
          </div>
        </div>
      </section>
```

#### Значения для замены

| Placeholder | Что подставить | Пример |
|-------------|---------------|--------|
| `__BESCHRIJVING__` | 1 предложение на **голландском**: что видно на видео | `In deze korte video ziet u hoe de aanbouw in Rotterdam Julianastraat stap voor stap is voorzien van isolatie, wapening en sierpleister.` |
| `__VIDEO_ID__` | YouTube video ID | `iSUV_L9tD-E` |
| `__VIDEO_TITLE__` | Заголовок видео (голландский, с em-dash вместо pipe) | `Aanbouw isoleren in Rotterdam Julianastraat – 4 cm gevelisolatie` |
| `__DURATION_LEESBAAR__` | Читаемая длительность | `0:33` |
| `__LOCATIE__` | Город + улица (как в hero) | `Rotterdam Julianastraat` |
| `__JAAR__` | Год проекта | `2026` |

---

## 5. Что НЕ менять

Следующие элементы секции **фиксированы** и одинаковы для всех проектных страниц:

- Градиент фона: `linear-gradient(175deg, #1A1A1A 0%, #1F1710 45%, #2A1C0E 70%, #1A1A1A 100%)`
- Оба декоративных glow-элемента (`#E8600A`, размеры и opacity)
- Section header: `Video` label + `Bekijk het project in beeld` заголовок
- Glass frame: `rgba(255,255,255,0.04)` фон + `rgba(255,255,255,0.08)` border
- Metadata strip: YouTube-иконка + "BM klus BV op YouTube" + разделители
- Spacing: `py-16 sm:py-20 lg:py-24`
- Container: `container-default max-w-4xl`
- Все CSS-классы, transitions, hover-эффекты

---

## 6. Архитектурные правила

### Компонент YouTubeEmbed

- Расположение: `components/youtube-embed.tsx`
- Тип: `"use client"` — leaf client component
- Паттерн: **Facade** — показывает статичную обложку (thumbnail с YouTube CDN), загружает iframe только по клику
- Домен embed: `youtube-nocookie.com` (privacy)
- CLS: предотвращён через `aspect-ratio: 16/9`
- Не редактировать этот компонент при добавлении видео на новые страницы

### VideoObject JSON-LD

- Функция: `videoSchema()` в `lib/seo/schema.ts`
- Обязательные поля (Google): `name`, `description`, `thumbnailUrl`, `uploadDate`
- Рекомендованные поля: `duration`, `embedUrl`, `contentUrl`
- `embedUrl` и `contentUrl` генерируются автоматически из `videoId`
- `publisher` ссылается на LocalBusiness через `@id`

### Позиция на странице

```
A · HERO
B · WERKZAAMHEDEN
C · VOOR DE WERKEN (галерея "до")
D · NA DE WERKEN (галерея "после")
D½ · VIDEO ← сюда
E · DETAILS DIE HET VERSCHIL MAKEN
F · MATERIALEN & AFWERKING
H · GERELATEERDE DIENSTEN
```

Видео всегда ставится **между D и E** — после фото результата, перед техническими деталями. Это создаёт нарративный поток: фото "до" → фото "после" → видео процесса → технические детали.

---

## 7. Verification checklist

После добавления видео-секции проверить:

- [ ] `npx tsc --noEmit` проходит без ошибок
- [ ] Страница загружается на `http://localhost:3000/onze-werken/{slug}/`
- [ ] Видео-секция видна между "Na de werken" и "Details"
- [ ] Тёмный фон отображается корректно
- [ ] Play button виден и кликабелен
- [ ] По клику на Play загружается YouTube iframe с автовоспроизведением
- [ ] Duration badge отображается в правом нижнем углу
- [ ] Metadata strip показывает "BM klus BV op YouTube", локацию и год
- [ ] В исходном коде страницы присутствует `<script type="application/ld+json">` с `"@type": "VideoObject"`
- [ ] Мобильная версия (390px) отображается корректно

---

## 8. Полный пример (эталон)

Файл: `app/onze-werken/rotterdam-julianastraat-aanbouw-isolatie-4cm-2026/page.tsx`

### Импорты (строки 5, 12):

```tsx
import { jsonLdScript, projectPageSchema, videoSchema } from "@/lib/seo/schema"
// ...
import YouTubeEmbed from "@/components/youtube-embed"
```

### JSON-LD (после projectPageSchema):

```tsx
{jsonLdScript(videoSchema({
  name: "Aanbouw isoleren in Rotterdam Julianastraat | 4 cm gevelisolatie",
  description:
    "Bij dit project hebben we de gevelplint behandeld met bitumen, 4 cm isolatie verlijmd en verankerd met pluggen, gaas gemonteerd en geplamuurd, en de gevel afgewerkt met sierpleister 1,5 mm in standaard wit. De plint is afgewerkt in antraciet voor een strak contrast.",
  videoId: "iSUV_L9tD-E",
  thumbnailUrl: "https://i.ytimg.com/vi/iSUV_L9tD-E/maxresdefault.jpg",
  uploadDate: "2026-03-26",
  duration: "PT33S",
}))}
```

### Секция (между D и E):

```tsx
<YouTubeEmbed
  videoId="iSUV_L9tD-E"
  title="Aanbouw isoleren in Rotterdam Julianastraat – 4 cm gevelisolatie"
  duration="0:33"
/>
```

Metadata strip:

```tsx
<span>Rotterdam Julianastraat</span>
<span>2026</span>
```

Описание:

```tsx
In deze korte video ziet u hoe de aanbouw in Rotterdam Julianastraat stap
voor stap is voorzien van isolatie, wapening en sierpleister.
```

# Battle Prompt — Добавление project page (для слабых моделей)

> **Этот файл содержит готовый копипаст-промт.**
> Вставь его в чат ПЕРЕД JSON-ом проекта.
> Полная инструкция: [`docs/ADD-PROJECT.md`](ADD-PROJECT.md)

---

## Как использовать

1. Скопируй весь блок ниже (от `───` до `───`)
2. Вставь в чат Cursor / Composer
3. Сразу после промта вставь заполненный JSON проекта (шаблон — в ADD-PROJECT.md §11)

---

## Промт (копировать целиком)

````
Ты выполняешь задачу добавления нового project page на сайт bm-klus-bv.nl.
Инструкция: docs/ADD-PROJECT.md (v2). Следуй ей БУКВАЛЬНО.
Эталон страницы: app/onze-werken/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025/page.tsx

═══════════════════════════════════════════════════════════════
SCOPE LOCK — ПРОЧИТАЙ ПЕРВЫМ, ЭТО ВАЖНЕЕ ВСЕХ ОСТАЛЬНЫХ ПРАВИЛ
═══════════════════════════════════════════════════════════════

РАЗРЕШЁННЫЕ ФАЙЛЫ (whitelist) — ТОЛЬКО эти, ничего больше:
  1. lib/content/projects/{slug}.ts         → СОЗДАТЬ (новый)
  2. app/onze-werken/{slug}/page.tsx         → СОЗДАТЬ (новый)
  3. lib/content/projects.ts                 → ОБНОВИТЬ (добавить 1 карточку первой)
  4. deploy/apache/root.htaccess             → ОБНОВИТЬ только если в JSON есть oldUrl
  5. data/image-manifest.json                → НЕ ТРОГАТЬ РУКАМИ (обновляется скриптом)

ЗАПРЕЩЕНО ТРОГАТЬ (при ЛЮБЫХ обстоятельствах):
  ✗ app/onze-werken/page.tsx (архив проектов)
  ✗ Любые существующие project pages и data-файлы
  ✗ Любые компоненты (components/**)
  ✗ Любые lib/seo/*, lib/types/*, стили, конфиги
  ✗ package.json, tsconfig, tailwind config
  ✗ Любые страницы вне /onze-werken/{slug}/

ЕСЛИ ЧТО-ТО НЕ ПОЛУЧАЕТСЯ (ошибка, build fails, import не работает):
  → СТОП. Сообщи пользователю что именно не получилось.
  → НЕ ПЫТАЙСЯ решить проблему изменением файлов вне whitelist.
  → НЕ ПЫТАЙСЯ «починить» компоненты, типы или другие страницы.
  → Лучше ОСТАНОВИСЬ, чем СЛОМАЙ проект.

ПОСЛЕ КАЖДОГО СОЗДАНИЯ ФАЙЛА — проверь:
  Test-Path "полный/путь/к/файлу"
  Если False → СТОП. Файл не записался.

═══════════════════════════════════════════════════════════════

ПРАВИЛА:
• Импровизация ЗАПРЕЩЕНА. Копируй структуру Halsteren, меняй только данные.
• НЕ менять: hero overlays, CSS классы, spacing, heading sizes, секции, порядок.
• НЕ добавлять: новые секции, новые стили, новые компоненты.
• НЕ удалять: никакие секции из шаблона Halsteren.

───────────────────────────────────────────────────────────────
ШАГ 1 · VALIDATE JSON
───────────────────────────────────────────────────────────────
Проверь:
  ✓ Все обязательные поля из ADD-PROJECT.md §3 присутствуют
  ✓ slug ≤ 75 символов, только a-z 0-9 дефис
  ✓ metaTitle ≤ 60 символов (считай точно!)
  ✓ metaDescription ≤ 160 символов (считай точно!)
  ✓ heroBullets — ровно 3
  ✓ werkzaamheden ≥ 2
  ✓ bevindingen ≥ 1, resultaten ≥ 1, detailCards ≥ 1
  ✓ materialen ≥ 2
  ✓ relatedLinks 2–4 шт, ТОЛЬКО service pages
  ✓ relatedLinks НЕ содержит /onze-werken/ и /contact/
  ✓ Нет неподтверждённых %, абсолютов
  ✓ Весь контент на NL

ЕСЛИ ЧТО-ТО НЕ ТАК → СТОП. Сообщи что не так, жди исправлений.

───────────────────────────────────────────────────────────────
ШАГ 2 · VALIDATE SOURCE IMAGES + DETECT EXTENSION
───────────────────────────────────────────────────────────────
Пользователь указывает путь к подпапке с фото. Обозначь его SRCDIR.
Например: source-images/projects/etten-leur-gevelisolatie-10cm-ral9010-2025

2a. Определи реальные файлы и расширение:
  ls SRCDIR/

Запомни ФАКТИЧЕСКОЕ расширение (например .jpg). Обозначь его EXT.
Если расширения смешанные — запускай шаг 3 по каждому отдельно.

2b. Проверь полноту:
  • {prefix}-voor-01.{EXT} ... {prefix}-voor-{beforeCount}.{EXT}
  • {prefix}-na-01.{EXT} ... {prefix}-na-{afterCount}.{EXT}

ЕСЛИ ФАЙЛОВ НЕТ → СТОП. Сообщи какие файлы отсутствуют.
ЕСЛИ prefix не совпадает с файлами → СТОП. Уточни prefix.
ВАЖНО: source-images/ — единственный допустимый input.
public/images/ — это OUTPUT. НИКОГДА не использовать как input.

───────────────────────────────────────────────────────────────
ШАГ 3 · GENERATE IMAGE VARIANTS
───────────────────────────────────────────────────────────────
Используй SRCDIR и EXT из шага 2. Пример для .jpg:

  pnpm images:generate gallery "SRCDIR/{prefix}-*.jpg"
  pnpm images:generate thumbnail "SRCDIR/{prefix}-*.jpg"
  pnpm images:generate hero "SRCDIR/{prefix}-na-01.jpg"
  pnpm images:generate card "SRCDIR/{prefix}-na-01.jpg"

Замени .jpg на фактическое расширение.
Замени SRCDIR на реальный путь из шага 2.
НИКОГДА не подставляй абстрактный {ext} — только реальное расширение.

───────────────────────────────────────────────────────────────
ШАГ 4 · VERIFY VARIANTS
───────────────────────────────────────────────────────────────
  ls public/images/projects/{prefix}/

Проверь:
  ✓ Файлы .w480.webp, .w800.webp и т.д. существуют в подпапке {prefix}/
  ✓ data/image-manifest.json обновился (ключи: projects/{prefix}/{prefix}-na-01 и т.д.)

ЕСЛИ VARIANTS НЕ СОЗДАНЫ → СТОП. Проверь ошибки pipeline.

───────────────────────────────────────────────────────────────
ШАГ 5 · CREATE lib/content/projects/{slug}.ts
───────────────────────────────────────────────────────────────
Формат — строго по ADD-PROJECT.md §5.3:
  • IMAGE_EXT = "webp"
  • pad() helper
  • PREFIX = "{prefix}"
  • DIR = `/images/projects/${PREFIX}`   ← подпапка проекта!
  • beforeImages: Array.from({ length: {beforeCount} }, ...)
  • afterImages: Array.from({ length: {afterCount} }, ...)
  • Каждый entry: { src, alt, baseName }
  • src: `${DIR}/${PREFIX}-voor-${pad(i+1)}.${IMAGE_EXT}`   ← через DIR!
  • baseName: `${PREFIX}/${PREFIX}-voor-${pad(i+1)}`        ← с подпапкой!
  • Alt формат: "{Stad} {werkType} – voor/na de werken foto {nr} ({jaar})"

⚠ baseName ОБЯЗАТЕЛЬНО включает подпапку: {prefix}/{prefix}-voor-01
  Без подпапки manifest lookup сломается, изображения не отобразятся.

───────────────────────────────────────────────────────────────
ШАГ 6 · CREATE app/onze-werken/{slug}/page.tsx
───────────────────────────────────────────────────────────────
СНАЧАЛА прочитай эталон:
  app/onze-werken/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025/page.tsx

Затем создай новую страницу, скопировав Halsteren и заменив ТОЛЬКО данные:

IMPORTS (фиксированные):
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

METADATA:
  export const metadata = buildPageMetadata("/onze-werken/{slug}/", {
    title: "{metaTitle}",
    description: "{metaDescription}",
  })

DATA BLOCK: heroBullets, werkzaamheden, bevindingen, resultaten,
            detailCards, materialen, relatedLinks — как const перед компонентом.

COMPONENT: export default function {City}ProjectPage()

СЕКЦИИ (ВСЕ обязательны, порядок фиксирован):
  • JSON-LD Schema (projectPageSchema)
  • A · HERO — 6 overlay layers (КОПИРОВАТЬ из Halsteren, не менять!)
    - ResponsiveImage (baseName="{prefix}-na-01", dir="/images/projects/{prefix}", preset="hero")
    - Breadcrumbs: Home → Onze werken → {City} ({year})
    - Badge: {serviceType}
    - H1: {h1Text}
    - Subtitle: {heroDescription}
    - Passport: {passportItems}
    - Bullets: {heroBullets} (ровно 3)
    - CTAs: "Offerte aanvragen" + "Terug naar Onze werken"
  • B · WERKZAAMHEDEN — WerkzaamhedenAccordion
  • C · VOOR DE WERKEN — bevindingen cards + ProjectGalleryCarousel(voor)
  • D · NA DE WERKEN — resultaten cards + ProjectGalleryCarousel(na)
  • E · DETAILS — detailCards grid
  • F · MATERIALEN — dl таблица + disclaimer "Let op:"
  • H · GERELATEERDE DIENSTEN — relatedLinks grid
    Grid: 2 links → sm:grid-cols-2
          3 links → sm:grid-cols-2 lg:grid-cols-3
          4 links → sm:grid-cols-2 lg:grid-cols-4

───────────────────────────────────────────────────────────────
ШАГ 7 · UPDATE lib/content/projects.ts
───────────────────────────────────────────────────────────────
Добавь карточку ПЕРВОЙ в массив projects[].
Формат — см. ADD-PROJECT.md §5.5.

ОБЯЗАТЕЛЬНЫЕ ПОЛЯ КАРТОЧКИ (runtime contract):
  coverImage: {
    src: "/images/projects/{prefix}/{prefix}-na-01.webp",   ← ОБЯЗАТЕЛЕН (с подпапкой!)
    alt: "..."                                               ← ОБЯЗАТЕЛЕН
  }
  beforeThumb: {
    src: "/images/projects/{prefix}/{prefix}-voor-01.webp",  ← ОБЯЗАТЕЛЕН (с подпапкой!)
    alt: "..."                                               ← ОБЯЗАТЕЛЕН
  }

КРИТИЧЕСКИ ВАЖНО:
  • coverImage.src и beforeThumb.src НЕЛЬЗЯ убирать или менять формат
  • Компонент ProjectCard вызывает srcToBaseName(src) для получения baseName
  • srcToBaseName отрезает "/images/projects/" и ".webp" → получает "{prefix}/{prefix}-na-01"
  • Это baseName включает подпапку — так manifest lookup находит нужный entry
  • Без корректного projects.ts задача НЕ завершена

───────────────────────────────────────────────────────────────
ШАГ 8 · UPDATE deploy/apache/root.htaccess (ТОЛЬКО если oldUrl)
───────────────────────────────────────────────────────────────
⚠ Нет поля `oldUrl` в JSON → ПРОПУСТИТЬ ПОЛНОСТЬЮ. НЕ трогать htaccess. НЕ придумывать URL.

Если в JSON ЯВНО указано поле `oldUrl` → добавь в секцию legacy redirects:
  Redirect 301 {oldUrl} /onze-werken/{slug}/

НЕ ТРОГАТЬ public/.htaccess — там НЕ хранятся редиректы.

───────────────────────────────────────────────────────────────
ШАГ 9 · LINT CHECK
───────────────────────────────────────────────────────────────
Проверь lint через ReadLints:
  • app/onze-werken/{slug}/page.tsx
  • lib/content/projects/{slug}.ts
  • lib/content/projects.ts

Исправь ВСЕ ошибки.

───────────────────────────────────────────────────────────────
ШАГ 10 · BUILD (ОБЯЗАТЕЛЬНО)
───────────────────────────────────────────────────────────────
  pnpm build

  ✓ Exit code 0
  ✓ Нет ошибок, связанных с новой страницей

БЕЗ УСПЕШНОГО BUILD ЗАДАЧА НЕ ЗАВЕРШЕНА.

───────────────────────────────────────────────────────────────
ШАГ 11 · CARD + PAGE VERIFICATION (ОБЯЗАТЕЛЬНО)
───────────────────────────────────────────────────────────────
Если dev server доступен:
  ✓ Карточка первой на /onze-werken/
  ✓ Cover image + before thumb загружаются
  ✓ Страница /onze-werken/{slug}/ рендерится
  ✓ Hero image, gallery, lightbox работают

БЕЗ ПРОВЕРКИ КАРТОЧКИ ЗАДАЧА НЕ ЗАВЕРШЕНА.

───────────────────────────────────────────────────────────────
ШАГ 12 · FINAL REPORT
───────────────────────────────────────────────────────────────
Выведи:
  1. Созданные файлы
  2. Обновлённые файлы
  3. Prefix: {prefix}
  4. Количество source images
  5. Presets: gallery ✓ thumbnail ✓ hero ✓ card ✓
  6. Lint status
  7. Build status: ✓ exit 0
  8. Card on /onze-werken/: ✓ first entry
  9. htaccess updated: yes/no
  10. Visual checks:
     - [ ] Hero, gallery, lightbox
     - [ ] Мобильная вёрстка
  11. SEO AUDIT:
     - [ ] title ≤ 47 chars   (факт: __ / 47)
     - [ ] description ≤ 160 chars (факт: __ / 160)
     - [ ] schema image path OK
     - [ ] grid-cols matches link count
     - [ ] all image paths include {prefix}/ subfolder

СТОП-ПРАВИЛА (нарушение = ошибка):
  ✗ НЕ придумывать имена файлов — использовать prefix из JSON
  ✗ НЕ менять overlay layers, CSS классы, spacing
  ✗ НЕ добавлять /onze-werken/ или /contact/ в relatedLinks
  ✗ НЕ добавлять карточку в КОНЕЦ projects[] — ТОЛЬКО первой
  ✗ НЕ использовать public/images/ как input для pipeline
  ✗ НЕ подставлять абстрактный {ext} — только реальное расширение
  ✗ НЕ пропускать lint check
  ✗ НЕ пропускать pnpm build — без build задача не завершена
  ✗ НЕ убирать/менять coverImage.src или beforeThumb.src — runtime зависимость
  ✗ НЕ собирать страницу без сначала прочтённого эталона Halsteren

───────────────────────────────────────────────────────────────
ШАГ 13 · SEO & TECHNICAL AUDIT
───────────────────────────────────────────────────────────────
После успешного билда — обязательная проверка:

1. metadata.title в page.tsx ≤ 47 символов
   (бюджет: 60 − 13 символов суффикса " | BM klus BV")
   Если > 47 → сократи! Формат: "{Stad} gevelisolatie {dikte} {afwerking} ({jaar})"

2. metadata.description ≤ 160 символов

3. projectPageSchema({ image: ... }) содержит подпапку:
   ✓  /images/projects/{prefix}/{prefix}-na-01.webp
   ✗  /images/projects/{prefix}-na-01.webp

4. relatedLinks grid — кол-во ссылок == lg:grid-cols-N:
   2 ссылки → lg:grid-cols-2
   3 ссылки → lg:grid-cols-3
   4 ссылки → lg:grid-cols-4

5. Все image paths содержат подпапку {prefix}/:
   - lib/content/projects/{slug}.ts → src, baseName
   - lib/content/projects.ts → coverImage.src, beforeThumb.src
   - page.tsx → ResponsiveImage dir, projectPageSchema image

Добавь в FINAL REPORT:
  SEO AUDIT:
  - [ ] title ≤ 47 chars   (факт: __ / 47)
  - [ ] description ≤ 160 chars (факт: __ / 160)
  - [ ] schema image path OK
  - [ ] grid-cols matches link count
  - [ ] all image paths include {prefix}/ subfolder

───────────────────────────────────────────────────────────────
JSON ПРОЕКТА (вставь ниже):
───────────────────────────────────────────────────────────────
````

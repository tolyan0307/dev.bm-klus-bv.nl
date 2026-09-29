# Изображения: пайплайн и процедуры

Единый документ по изображениям сайта (2026-09-29, объединяет прежние IMAGE-PIPELINE.md и IMAGE-WORKFLOW-SOP.md). Источник истины — код: `scripts/generate-variants.mjs`, `lib/responsive-image.ts`, `components/responsive-image.tsx`, `components/client-image.tsx`, `lib/gallery-utils.ts`. Если документ расходится с кодом, прав код, а документ нужно поправить.

## 1. Как устроено

```text
source-images/<путь>/<имя>.jpg              оригинал; папки нет в git, это единственная копия
  → pnpm images:generate <preset> <путь>    = node scripts/generate-variants.mjs <preset> <путь>
public/images/<путь>/<имя>.w<ширина>.webp    варианты WebP (в git)
data/image-manifest.json                     "<путь>/<имя>" → originalWidth, originalHeight, aspectRatio, variants (в git)
  → <ResponsiveImage baseName dir preset sizes alt>  →  <img src srcset sizes width height>
  → в клиентском компоненте: resolveImage() в серверном родителе → пропс → <ClientImage image sizes alt>
```

- Всё считается локально до коммита; при сборке и на сервере изображения не обрабатываются.
- Скрипт принимает файл или папку (папку обходит рекурсивно), пишет варианты в `public/images/` по тому же относительному пути и дописывает манифест. Ключ манифеста — путь исходника от `source-images/` без расширения, поэтому `.jpg`, `.JPG` или `.webp` на ключ не влияют.
- Скрипт ничего не удаляет: ни исходники, ни старые варианты, ни ключи. Повторный запуск перезаписывает файлы тех же ширин; в манифесте список `variants` объединяется со старым, а размеры перезаписываются.
- `ResponsiveImage` (серверный компонент) собирает ключ как `dir` без `/images` + `/` + `baseName`. `srcset` — ширины записи в диапазоне пресета (если таких нет — все ширины записи; если нет самой записи — ширины пресета вслепую, и файлов может не оказаться). `src` — самая широкая из них, `width`/`height` — из манифеста. Без `priority` — `loading="lazy"`, с `priority` — `fetchPriority="high"` и `decoding="sync"`. Пропсы: `baseName`, `dir` (по умолчанию `/images`), `preset`, `alt`, `sizes`, `priority`, `fallbackSrc` и любые атрибуты `<img>`.
- Хелперы для серверного кода: `buildSrcSet`, `getFallbackSrc`, `getVariantWidths`, `getOriginalDimensions`, `getAspectRatio`, `resolveImage` из `lib/responsive-image.ts`. `resolveGalleryImages(images)` из `lib/gallery-utils.ts` отдаёт `src`/`srcSet` пресета `gallery` и `thumbSrcSet` пресета `thumbnail`, всегда с `dir="/images/projects"`; `resolveProjectCards(projects)` оттуда же добавляет карточкам проектов поле `resolved` (обложка — `card`, миниатюра «voor» — `thumbnail`).
- Картинка в клиентском компоненте (`"use client"`): серверный родитель вызывает `resolveImage(baseName, dir, preset)` и передаёт результат (`src`, `srcSet`, `width`, `height`, тип `ResolvedImage` из `lib/types/images.ts`) пропсом, а клиентский компонент рендерит `<ClientImage image sizes alt>` из `components/client-image.tsx` — разметка та же, что у `ResponsiveImage`, но без манифеста. Так устроены слайдер voor/na (`lazy-before-after-slider`, `before-after-slider`) и `ProjectCard`.

## 2. Пресеты и бюджеты

Лимиты взяты из `PRESETS` в скрипте (1 KB = 1024 байта).

| Пресет | Ширина → лимит, KB | Где используется |
|---|---|---|
| `hero` | 480→50 · 768→55 · 1280→170 · 1600→250 · 1920→340 | фоны hero (главная, услуги, города, проекты) и секций; preload в `layout.tsx` |
| `card` | 320→15 · 480→22 · 640→30 · 828→45 | карточки проектов (`ProjectCard`, `portfolio-section`, `related-projects`), слайдер voor/na |
| `serviceCard` | 320→10 · 480→14 · 640→18 · 828→25 | фото в тексте страниц услуг, карточки услуг (`services-section`, `ServicesRail`) |
| `gallery` | 480→45 · 800→80 · 1200→140 · 1600→220 | галерея voor/na (через `resolveGalleryImages`) |
| `thumbnail` | 160→12 · 240→18 · 320→28 | миниатюры галереи, `beforeThumb` в `ProjectCard` |

Сжатие устроено так. Каждая ширина кодируется в WebP с качеством 82 → 76 → 70 → 64 → 58 → 52, пока файл не влезет в лимит. Если не влез, ширина уменьшается на 10 % и лестница проходится заново (всего три прохода). После этого ширина уменьшается ещё на 10 % и файл пишется на q52; если он всё равно больше лимита, в выводе будет `⚠ OVER`. Итоговая ширина попадает в имя файла и в манифест (`w432` вместо `w480`), поэтому в папках встречаются нестандартные ширины. Ширины больше ширины исходника пропускаются (`SKIP`), увеличения нет. Считается именно ширина, а не длинная сторона: портрет 1500×2000 даёт hero только 480/768/1280.

Чтобы ограничить максимальную ширину, уменьшите исходник до запуска: ширин больше исходника скрипт не создаёт.

## 3. Папки и имена

`source-images/` указан в `.gitignore`. Оригиналы в нём не удалять и не перезаписывать.

| Папка | Что там | Куда идут варианты |
|---|---|---|
| корень | фото страниц услуг и главной (`dienst-*`, `wat-is-*`, `detail-*`, `ondergrond-*`, `materiaal-*`, `scenario-*`, `muren-stucen-*` …); `1.jpg`–`11.jpg` без имён, не подключены | `public/images/`, в коде `dir="/images"` (по умолчанию) |
| `projects/` | фото проектов, два формата (ниже) | `public/images/projects/…` |
| `services/` | карточки услуг на главной | `public/images/services/` → `components/services-section.tsx` |
| `sierpleister/` | `details-*` для `/sierpleister/` | `public/images/sierpleister/` |
| `general/` | PNG слоёв ETICS, логотип, `hero-home` | `public/images/general/` — в коде сейчас не используется |
| `heroes/` | пусто | — |
| `_originals/`, `_ai-legacy/` | сырые фото владельца (`temp-2026-09-15/IMG_*`); снятые AI-исходники для отката | не обрабатываются: при обходе папки скрипт пропускает имена, начинающиеся с `_` и `.` |

`public/images/` — результат работы скрипта (лежит в git), руками не править. Вне пайплайна там же лежат одиночные файлы: `logo-bm-klus.webp` (`<img>` в `navbar` и `footer`, логотип в схеме), `og-default.png`, `nadelen/*.webp` (`<img>` в `app/buiten-stucwerk/nadelen-switcher.tsx`) и legacy single-res копии. Из копий нужны только `projects/<prefix>-na-01.webp`: на них ссылается JSON-LD `image` 12 старых страниц проектов. Остальные копии (`dienst-*.webp`, `swatches/` и прочие) не используются.

Фото проектов хранятся в двух форматах. Оба рабочие, но новые проекты кладутся только в подпапку.

| | Плоский (legacy, 12 проектов) | Подпапка (8 проектов, стандарт) |
|---|---|---|
| Исходник | `source-images/projects/<prefix>-na-01.jpg` | `source-images/projects/<PREFIX>/<PREFIX>-na-01.jpg` |
| Варианты | `public/images/projects/<prefix>-na-01.w480.webp` | `public/images/projects/<PREFIX>/<PREFIX>-na-01.w480.webp` |
| Ключ манифеста | `projects/<prefix>-na-01` | `projects/<PREFIX>/<PREFIX>-na-01` |
| Префикс | короче slug (`halsteren-buitenstucwerk`) | равен slug страницы |

- Имя подпапки = `PREFIX` = slug: из него скрипт строит папку вариантов и ключ. Папку с пробелами или заглавными буквами («Hendrik -Ido - Ambacht 2024») переименовать до запуска.
- Имена файлов: `<PREFIX>-voor-NN` (до работ) и `<PREFIX>-na-NN` (после), где `NN` — 01, 02 … с ведущим нулём. `na-01` — обложка (hero и карточка). Исключение из прошлого — Vught: `vught-gevelisolatie-10cm-na-1` без нуля, так и прописано в его data-файле.
- Одна и та же картинка адресуется двумя способами, ключ при этом один:
  - в data-файле, галерее и карточке: `dir="/images/projects"`, `baseName="<PREFIX>/<PREFIX>-na-01"`;
  - в hero на странице проекта: `dir="/images/projects/<PREFIX>"`, `baseName="<PREFIX>-na-01"`.

  Подпапка указывается либо в `dir`, либо в `baseName`, но не в обоих сразу: иначе путь задвоится и будет 404.
- Alt фото проекта (nl-NL): `` `<Stad> <werk> – voor de werken foto ${pad(i + 1)} (<jaar>)` `` и `– na de werken foto …`, например `Strijen Schenkeldijk gevelisolatie en sierpleister – na de werken foto 01 (2026)`. Hero страницы проекта — декоративный фон: `alt=""` и `aria-hidden="true"`.

## 4. Процедуры

Команды `pnpm` и `node -e` ниже работают и в PowerShell, и в Git Bash. Маску `*` скрипт сам не раскрывает, а PowerShell не раскрывает её за него, поэтому передавайте папку или конкретные файлы.

### 4.1. Новые фото проекта

Весь порядок добавления страницы (data-файл, `page.tsx`, карточка, проверка) описан в skill `add-project` (`.claude/skills/add-project/SKILL.md`). Здесь — только часть про изображения.

1. Подготовить исходники. HEIC перевести в JPG: sharp в проекте HEIC не читает, и скрипт такие файлы пропускает. Применить поворот по EXIF: скрипт этого не делает, и вариант ляжет боком (все текущие исходники уже повёрнуты). Проверить папку и имена по §3.
2. Сгенерировать четыре пресета, порядок не важен:
   ```
   pnpm images:generate gallery source-images/projects/<PREFIX>/
   pnpm images:generate thumbnail source-images/projects/<PREFIX>/
   pnpm images:generate hero source-images/projects/<PREFIX>/<PREFIX>-na-01.jpg
   pnpm images:generate card source-images/projects/<PREFIX>/<PREFIX>-na-01.jpg
   ```
   Не запускайте скрипт на всю `source-images/projects/`: он пройдёт по всем проектам. Кроме того, у 13 плоских имён есть и `.jpg`, и `.webp` — обработаются оба, и победит последний.
3. В `lib/content/projects/<slug>.ts` у каждого фото должен быть `baseName` с подпапкой (`${PREFIX}/${PREFIX}-na-01`): по нему `resolveGalleryImages` находит запись. В карточке в `lib/content/projects.ts` поля `coverImage.src` и `beforeThumb.src` имеют вид `/images/projects/<PREFIX>/<PREFIX>-na-01.webp`, а `ProjectCard` сам выводит из них `baseName` (`srcToBaseName`).
4. Проверка — по §6. В коммит (он делается только по команде владельца) вместе с кодом идут `public/images/projects/<PREFIX>/` и `data/image-manifest.json`.

### 4.2. Заменить одно изображение

Если `baseName` остаётся прежним, код не меняется. Так 2026-09-15 были заменены 49 изображений (коммит `d7c64a4`).

1. Найти, где и с каким пресетом используется картинка: `grep -rn "<baseName>" app components lib`. Hero пяти страниц ещё и предзагружается в `layout.tsx` (см. §5). Какие пресеты запускались, видно по ширинам в записи манифеста.
2. Старый исходник перенести в папку на `_` (`source-images/_ai-legacy/` или `source-images/_originals/`), а новый положить на его место под тем же именем (расширение может отличаться). Не оставляйте в одной папке два файла с одним именем и разными расширениями.
3. Обрезать новый исходник под пропорцию слота (`aspectRatio` старой записи): `width`/`height` берутся из манифеста, и вёрстка не должна поехать.
4. Удалить старые варианты `public/images/<путь>/<имя>.w*.webp` и ключ этой картинки в манифесте. Иначе скрипт объединит старые и новые ширины, и на части ширин `srcset` будет отдавать старую картинку.
5. Запустить те же пресеты, что раньше, и проверить по §6.

Если нужен новый `baseName`: положить исходник под новым именем, запустить пресеты и поправить `baseName` в компоненте (и в `layout.tsx`, если это hero с preload). Старые ключ и файлы останутся мусором до отдельной чистки.

### 4.3. Кадрирование и фокус

- Фокус внутри слота сдвигается классами на `ResponsiveImage`: `object-cover` плюс `object-center` (стандарт), `object-top`, `object-bottom` или произвольное `object-[center_90%]`, в том числе с адаптивными префиксами. Примеры: `app/gevelisolatie/kosten/page.tsx` (`object-top`) и `app/gevelisolatie/subsidie-vergunning/page.tsx` (`object-bottom sm:object-[center_90%]`).
- Пропорцию или обрезку меняют только обрезкой исходника и перегенерацией по §4.2: пайплайн не кадрирует, и варианты повторяют пропорции исходника. Необрезанный оригинал сохраните в `_originals/`. Обрезка через sharp (с поворотом по EXIF и умным фокусом):
  ```
  node -e "require('sharp')('<вход>').rotate().resize(1600,1600,{fit:'cover',position:'attention'}).jpeg({quality:92}).toFile('<выход>.jpg')"
  ```
  Вместо `'attention'` можно указать `'top'`, `'bottom'`, `'left'` или `'right'`.

### 4.4. JPG для поста в Google Business Profile

GBP не принимает WebP. Нужен JPG или PNG: минимум 400×300, рекомендовано 1200×900 (4:3), размер от 10 KB до 5 MB. Брать оригинал из `source-images/`, а не вариант из `public/images/`. Файлы сохранять в `seo-ops/gbp-posts/media/`: `gbp-<slug>-<год>-4x3.jpg` (1200×900) и при желании `gbp-<slug>-<год>.jpg` (исходная пропорция, до 1600 px).
```
node -e "require('sharp')('source-images/projects/<PREFIX>/<PREFIX>-na-01.jpg').rotate().resize(1200,900,{fit:'cover',position:'attention'}).jpeg({quality:85}).toFile('seo-ops/gbp-posts/media/gbp-<slug>-<год>-4x3.jpg')"
node -e "require('sharp')('<тот же исходник>').rotate().resize({width:1600,height:1600,fit:'inside',withoutEnlargement:true}).jpeg({quality:85}).toFile('seo-ops/gbp-posts/media/gbp-<slug>-<год>.jpg')"
```
Текст поста и выбор фото — skill `gbp-weekly-post`.

## 5. Правила

- Только `<ResponsiveImage>` (или хелперы из §1 в серверном коде). Next.js `<Image>` из `next/image` — никогда: в проекте его нет, сайт собирается статическим экспортом. Одиночный `<img>` допустим для логотипа, `nadelen/*.webp`, внешних картинок (фото в отзывах Google, превью YouTube) и в клиентских компонентах, которые получают готовые `src`/`srcSet` через пропсы.
- Вход скрипта — только `source-images/`. Пути внутри `public/images/` скрипт отклоняет, а путь вне `source-images/` не проверяет. Файл с того же диска уйдёт за пределы `public/images/`, и в манифест попадёт ключ с `../`; файл с другого диска (например, из «Загрузок» на C:) упадёт с `FAIL`. Поэтому файл сначала скопируйте в `source-images/`.
- Оригиналы в `source-images/` не удалять и не перезаписывать: папки нет в git, другой копии тоже нет. Заменяемый исходник переносится в папку на `_`.
- `public/images/` — сгенерированный результат. Файлы там не правьте и не подкладывайте руками, а в коде не ссылайтесь на `*.w<N>.webp` — только `baseName` + `preset`. Удалять можно только старые варианты заменяемой картинки (§4.2).
- `data/image-manifest.json` пишет только скрипт: значения в нём руками не вписывать и не менять. Единственное ручное действие — удалить ключ заменяемой картинки перед перегенерацией (§4.2).
- В файл с `"use client"` не импортируйте `components/responsive-image`, `lib/responsive-image` (`buildSrcSet`, `getFallbackSrc` …), `lib/gallery-utils` и `data/image-manifest.json` — ни напрямую, ни через другой модуль (так в 2026-09 утекал манифест: клиентский `ProjectsSection` рендерил `ProjectCard` с `ResponsiveImage`). Иначе весь манифест (~125 KB на диске, ~86 KB в чанке) уходит в клиентский JS. `lib/responsive-image.ts` начинается с `import "server-only"`, поэтому такой импорт роняет сборку с ошибкой — это защита, не убирать. Считайте `src`/`srcset` в серверном родителе и передавайте пропсами: `resolveImage()` → `<ClientImage>` (§1), либо своим полем, как `components/services/ServicesRail.tsx` → `ServicesRailInteractive.tsx` или `resolveGalleryImages()` в `page.tsx` → `ProjectGalleryCarousel`.
- `sizes` описывает реальную ширину слота. `100vw` — только для полноэкранного hero; для сетки карточек, например, `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw`.
- `priority` ставится только картинке первого экрана (hero), остальные грузятся лениво — карточки проектов тоже (`ProjectCard` без `priority` с 2026-09-30: раньше `/onze-werken/` ставил 20 обложек в `<head>` с высоким приоритетом). `ResponsiveImage` с `priority` рендерится через клиентский `components/priority-image.tsx` с той же разметкой: иначе React кладёт подсказку предзагрузки в RSC-данные маршрута, и префетч каждой видимой ссылки скачивает hero её страницы. Своя страница по-прежнему предзагружает свой hero в `<head>` (React делает это сам для `fetchPriority="high"`).
- На пяти страницах hero предзагружается в `layout.tsx` через `buildSrcSet(..., "hero")`: `app/gevel-schilderen/keimen/`, `app/gevelisolatie/afwerkingen/`, `app/gevelisolatie/kosten/`, `app/gevelisolatie/subsidie-vergunning/`, `app/muren-stucen/sausklaar-behangklaar/`. Если меняете hero в `page.tsx`, поменяйте его и там.

## 6. Проверка после генерации

1. Вывод скрипта: `Done. N succeeded, 0 failed`, строк `⚠ OVER` нет (иначе нужен другой исходник или осознанное решение), `SKIP` только там, где исходник уже этой ширины.
2. Файлы на месте: у каждого исходника в `public/images/<путь>/` есть несколько `.w<N>.webp`.
3. Манифест цел — у каждой ширины есть файл:
   ```
   node -e "const m=require('./data/image-manifest.json'),fs=require('fs');const bad=Object.keys(m).filter(k=>m[k].variants.some(w=>!fs.existsSync('public/images/'+k+'.w'+w+'.webp')));console.log(bad.length+' keys with missing files');bad.forEach(k=>console.log(k))"
   ```
   Сейчас команда выдаёт 16 ключей `projects/rotterdam-julianastraat-aanbouw-isolatie-4cm-2025/…` — это известный мусор (§7). Всё остальное — новая проблема.
4. В коде ключ собирается верно (`dir` + `baseName`, §3), `sizes` соответствует вёрстке, `npx tsc --noEmit` проходит без ошибок. Отсутствующая запись в манифесте не ломает ни `tsc`, ни сборку — картинка просто не загрузится. Поэтому пункт 3 и просмотр страницы обязательны.
5. Для новой страницы или нового hero — `pnpm build`, затем проверить, что `srcset` в `out/` ведёт на существующие файлы. Утечку манифеста проверяет поиск `"variants":[` в `out/_next/static/chunks/*.js` (Git Bash: `grep -l '"variants":\[' out/_next/static/chunks/*.js`): он не должен ничего находить (с 2026-09-29 не находит).
6. Посмотреть страницу в dev-сервере на десктопе и на мобильной ширине: кадр, фокус, резкость.

## 7. Открытые вопросы

- Мусор, который стоит вычистить отдельной задачей:
  - 16 ключей манифеста от переименованной папки `rotterdam-julianastraat-aanbouw-isolatie-4cm-2025`;
  - 117 файлов-вариантов (~4 MB), чьих ширин нет в манифесте: 101 в плоской `projects/` и 16 в двух папках Etten-Leur;
  - 72 файла `.w<N>.webp` внутри `source-images/projects/`;
  - неиспользуемые `public/images/general/`, `swatches/` и single-res `dienst-*.webp` (`data/services.ts` никто не импортирует).
- По аудиту замены ИИ-фото (2026-09-15, `docs/audit/IMAGE-AI-REPLACEMENT-AUDIT.md` в git-теге `instructions-v1`; открытые пункты — в `docs/BACKLOG.md`) реальных фото до сих пор нет для этих тем: интерьер `/muren-stucen/` вместе с `dienst-muren`, steenstrips (5 слотов), типы sierpleister siliconenhars/krabpleister/kalei (для silicaat стоит общий снимок), PIR и minerale wol, schoonmaak. `og-default.png` всё ещё AI-рендер.

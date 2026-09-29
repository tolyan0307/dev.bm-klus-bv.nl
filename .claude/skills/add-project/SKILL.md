---
name: add-project
description: Новая страница проекта (кейс) в /onze-werken/ по папке с фото и JSON от владельца — варианты изображений, страница, карточка, редирект при oldUrl; также карточка на главной, порядок карточек и видео YouTube на странице проекта. Использовать при «добавь проект», «новый объект», «добавь карточку на главную», «поставь проект перед …», «добавь видео к проекту».
---

# Новый проект в «Onze werken»

Кейс = файл контента + страница + карточка + варианты изображений из пайплайна. Образец для копирования — самый новый проект без видео `strijen-schenkeldijk-gevelisolatie-sierpleister-2026`; по структуре он совпадает с `etten-leur-gevelisolatie-10cm-ral9010-2025`. Проекты с плоской раскладкой `/images/projects/<prefix>-…` (halsteren, dordrecht, bruinisse и др.) — старый формат, не образец. Команды — из корня сайта `D:\projects\bmklus\v0-site\site`.

Что меняется: создать `lib/content/projects/<slug>.ts` и `app/onze-werken/<slug>/page.tsx`; одна запись в `lib/content/projects.ts`; строка в `deploy/apache/root.htaccess` — только при `oldUrl`. Скрипт сам пишет `public/images/projects/<PREFIX>/` и `data/image-manifest.json` (руками не править). По запросу — `components/portfolio-section.tsx`. Другие проекты, компоненты, `lib/seo/*` и `data/sitemap-plan.ts` не трогать: `app/sitemap.ts` берёт проекты из `lib/content/projects.ts` сам.

## 1. Вход и проверка до правок
Владелец присылает путь к папке с фото и JSON в чате. Всё, что не сходится, — одним списком владельцу до правок, с готовым исправлением там, где оно очевидно; продолжать после ответа.
- JSON — по контракту §2.
- Фото: в папке только `<PREFIX>-voor-NN.<ext>` и `<PREFIX>-na-NN.<ext>`, NN двузначный, подряд с 01; voor-файлов ровно `beforeCount`, na — `afterCount`; расширения jpg/jpeg/png/webp в любом регистре, можно вперемешку. Код строит имена по счётчикам вслепую: пропуск номера или лишний файл дают битую картинку, которую сборка не заметит. `na-01` — обложка (hero и карточки).
- Скрипт не поворачивает фото по EXIF (снимок с Orientation ≠ 1 выйдет боком) и молча пропускает HEIC. Проверка, пустой вывод = порядок (работает и в Git Bash, и в PowerShell):
```bash
node -e "const s=require('sharp'),fs=require('fs'),d=process.argv[1];for(const f of fs.readdirSync(d)){if(!/\.(jpe?g|png|webp)$/i.test(f)){console.log(f,'format');continue}s(d+'/'+f).metadata().then(m=>{if((m.orientation||1)!==1)console.log(f,'orientation',m.orientation)})}" "<папка с фото>"
```
  Что-то нашлось — до генерации попросить владельца пересохранить эти фото ровно и в JPG.
- `PREFIX` = поле `prefix`, с него начинаются имена файлов; в текущей практике `prefix` = `slug`. Файлам без префикса (`voor-01.jpg`) его можно дописать; по именам вроде `IMG_1234.jpg` не угадывать, где «до», где «после», — спросить.
- slug свободен: нет `app/onze-werken/<slug>/`, нет в `lib/content/projects.ts` и в `deploy/apache/root.htaccess`.

## 2. JSON-контракт
Имена полей фиксированы — JSON собирает внешний процесс владельца. Новых полей не добавлять, данные переносить дословно.
```json
{
  "slug": "", "prefix": "",
  "title": "", "subtitle": "", "heroDescription": "",
  "meta": { "city": "", "objectType": "", "highlight": "", "year": 2026 },
  "serviceType": "", "serviceTypes": [], "cardAlt": "",
  "passportItems": [], "heroBullets": ["", "", ""],
  "werkzaamheden": [{ "title": "", "body": "" }], "werkzaamhedenIntro": "",
  "bevindingen": [{ "title": "", "body": "" }], "voorIntro": "",
  "resultaten": [{ "title": "", "body": "" }], "naIntro": "",
  "detailCards": [{ "title": "", "body": "" }], "detailsIntro": "",
  "materialen": [{ "label": "", "value": "" }], "materialenIntro": "",
  "relatedLinks": [{ "label": "", "href": "" }],
  "beforeCount": 0, "afterCount": 0,
  "metaTitle": "", "metaDescription": "",
  "oldUrl": ""
}
```
- Обязательно всё, кроме `oldUrl`. Необязательные: `oldUrl`, `meta.yearDisplay`, `h1Text`, `subtitleShort`; пустая строка = поля нет.
- `slug`: `a-z0-9-`, ≤75 символов, год в конце. `heroBullets` — ровно 3; `werkzaamheden` ≥2; `bevindingen`, `resultaten`, `detailCards` ≥1; `materialen` ≥2; `relatedLinks` 2–4. `title`/`label`/`href` внутри одного списка не повторяются (это React key).
- `passportItems[0]` — город, как `meta.city` (`Strijen (Schenkeldijk)`).
- `metaTitle` ≤47 символов (60 минус « | BM klus BV»; длиннее — `buildPageMetadata` обрежет с «…»), `metaDescription` ≤160. Длина: `node -e "console.log(process.argv[1].length)" "<текст>"`. Сверх лимита — предложить сокращение в стиле соседей: `Strijen gevelisolatie & sierpleister – 2026`.
- `serviceType` (бейдж) входит в `serviceTypes`. Значения `serviceTypes` — только из таблицы: фильтр на /onze-werken/ собирается из них, другое написание даст лишнюю кнопку. `relatedLinks.href` — только эти пять страниц услуг; `/onze-werken/` и `/contact/` уже есть в CTA шаблона.

| `serviceTypes` | страница услуги | обычный `label` |
|---|---|---|
| `Gevelisolatie` | `/gevelisolatie/` | `Gevelisolatie` |
| `Sierpleister` | `/sierpleister/` | `Sierpleister` |
| `Buiten-stucwerk` | `/buiten-stucwerk/` | `Buiten stucwerk` |
| `Gevel schilderen` | `/gevel-schilderen/` | `Gevel schilderen` |
| `Muren stucen` | `/muren-stucen/` | `Muren stucen` |

Производные значения (в JSON их нет — показать владельцу в отчёте):
- H1 = `h1Text`, иначе `title` с « – » → «: »: `Strijen Schenkeldijk: gevelisolatie, sierpleister &amp; dakrandafwerking (2026)`.
- Год для крошки и alt = `meta.yearDisplay` ?? `meta.year`; крошка — город без улицы: `Strijen (2026)`.
- Alt-основа: `<Stad> [<straat>] <kort type werk>` — `Strijen Schenkeldijk gevelisolatie en sierpleister`.
- Имя компонента: PascalCase + `ProjectPage` — `StrijenSchenkeldijkProjectPage`.

## 3. Фото → варианты
Папка должна называться `source-images/projects/<PREFIX>/`: из имени подпапки скрипт строит и выходную папку `public/images/projects/<PREFIX>/`, и ключи манифеста `projects/<PREFIX>/<файл>`. Переименовать до генерации; папку вне `source-images/projects/` скопировать туда (`source-images/` в `.gitignore`). Затем четыре прогона:
```bash
pnpm images:generate gallery source-images/projects/<PREFIX>/
pnpm images:generate thumbnail source-images/projects/<PREFIX>/
pnpm images:generate hero source-images/projects/<PREFIX>/<PREFIX>-na-01.<ext>
pnpm images:generate card source-images/projects/<PREFIX>/<PREFIX>-na-01.<ext>
```
gallery (480–1600 px) — галерея; thumbnail (160–320) — лента миниатюр и мини-фото «Voor» на карточке; hero (480–1920) — фон hero; card (320–828) — карточки в архиве и на главной. Передавать папку, а не маску: скрипт обходит папку сам, а `*.jpg` в кавычках или в PowerShell не раскроется — будет `Path not found`. `<ext>` — как у файла na-01 (бывает `.JPG`).

Каждый прогон заканчивается `Done. N succeeded, 0 failed.` Строки `⚠ OVER` (вариант тяжелее бюджета пресета) и `SKIP w1280` у hero (обложка уже 1280 px, на десктопе будет мыльно) — в отчёт.

## 4. Файл контента
Скопировать `lib/content/projects/strijen-schenkeldijk-gevelisolatie-sierpleister-2026.ts`; поменять только `PREFIX`, две длины `Array.from({ length: … })` (`beforeCount`, `afterCount`) и текст двух alt: `<alt-основа> – voor de werken foto ${pad(i + 1)} (<jaar>)` и то же с `na de werken`. Разделитель — « – » (en dash), как в новых проектах.

## 5. Страница
Скопировать `app/onze-werken/strijen-schenkeldijk-gevelisolatie-sierpleister-2026/page.tsx`. Структура остаётся: импорты (включая `resolveGalleryImages` из `@/lib/gallery-utils`; добавить `import { getFallbackSrc } from "@/lib/responsive-image"` — §6), шесть overlay-слоёв hero, классы, метки и H2 секций, подписи «Fotodocumentatie …», дисклеймер «Let op:», CTA, обёртка `below-fold`. Меняются только данные:
- путь импорта `@/lib/content/projects/<slug>`; `buildPageMetadata("/onze-werken/<slug>/", { title: metaTitle, description: metaDescription })`;
- массивы `heroBullets`, `werkzaamheden`, `bevindingen`, `resultaten`, `detailCards`, `materialen`, `relatedLinks`; имя компонента;
- `projectPageSchema`: `title` = `metaTitle`, `description` = `metaDescription`, `url` со slug, `image` (§6), `city` = `meta.city`, `year` = `meta.year`, `serviceTypes`;
- hero: `ResponsiveImage` (§6), крошка, бейдж = `serviceType`, H1, абзац = `heroDescription`; паспорт — первый элемент в `<span className="font-medium text-white">`, остальные через `<span aria-hidden>·</span>`, столько, сколько в `passportItems`;
- абзацы под H2: `werkzaamhedenIntro`, `voorIntro`, `naIntro`, `detailsIntro`, `materialenIntro`;
- сетка «Gerelateerde diensten»: `grid gap-3 sm:grid-cols-2 lg:grid-cols-N`, N = число `relatedLinks`.

## 6. Пути к изображениям
Ключ манифеста = `dir` без `/images/` + `/` + `baseName`. Ошибка в пути не ломает ни `tsc`, ни сборку — просто 404.
- Hero: `dir="/images/projects/<PREFIX>"`, `baseName="<PREFIX>-na-01"`. Подпапка уже в `dir`; `baseName` из файла контента сюда не копировать — выйдет двойная подпапка.
- Галерея: `images={resolveGalleryImages(beforeImages)}` и так же `afterImages`; там `dir="/images/projects"`, поэтому `baseName` в файле контента — `${PREFIX}/${PREFIX}-…`. Без `resolveGalleryImages` не пройдёт `tsc`.
- Карточка: `coverImage.src` = `/images/projects/<PREFIX>/<PREFIX>-na-01.webp`, `beforeThumb.src` = `/images/projects/<PREFIX>/<PREFIX>-voor-01.webp`. Таких файлов нет и не нужно: `resolveProjectCards()` (`lib/gallery-utils.ts`) получает из src `baseName` через `srcToBaseName` (срезает `/images/projects/` и расширение) при `dir="/images/projects"`. Формат не менять.
- Schema `image`: `getFallbackSrc("<PREFIX>-na-01", "/images/projects/<PREFIX>", "hero")` — сигнатура `(baseName, dir, preset)`, возвращает самый широкий существующий вариант обложки по манифесту (`…-na-01.w1280.webp` и т. п.); импорт — `import { getFallbackSrc } from "@/lib/responsive-image"`. Строка `…-na-01.webp` без ширины даёт 404: в подпапке таких файлов нет.

## 7. Карточка в `lib/content/projects.ts`
Массив идёт по году проекта, от новых к старым; новую запись — первой в блоке своего года (проект текущего года — первой в массиве). Порядок массива = порядок на /onze-werken/; комментарий `// Order:` в начале файла устарел. Другие записи не трогать.
```ts
  {
    slug: "<slug>",
    serviceType: "<serviceType>",
    serviceTypes: [<serviceTypes>],
    title: "<title>",
    subtitle: "<subtitleShort или subtitle>",
    meta: {
      city: "<meta.city>",
      objectType: "<meta.objectType>",
      highlight: "<meta.highlight>",
      year: <meta.year>, // + yearDisplay: "<…>", если дан
    },
    projectUrl: "/onze-werken/<slug>/",
    cardAlt: "<cardAlt>",
    coverImage: {
      src: "/images/projects/<PREFIX>/<PREFIX>-na-01.webp",
      alt: "<alt-основа> – na de werken foto 01 (<jaar>)",
    },
    beforeThumb: {
      src: "/images/projects/<PREFIX>/<PREFIX>-voor-01.webp",
      alt: "<alt-основа> – voor de werken foto 01 (<jaar>)",
    },
  },
```

## 8. Редирект — только при `oldUrl`
В `deploy/apache/root.htaccess`, в конец блока `# ─── Old WP project pages (root slug → /onze-werken/)`:
```
Redirect 301 /<oude-slug>/ /onze-werken/<slug>/
```
Только путь, без домена, со слешами с обеих сторон; строки для этого пути ещё не должно быть. Без `oldUrl` файл не трогать и URL не придумывать.

## 9. Проверка
1. `npx tsc --noEmit` — 0 ошибок (ESLint не установлен, `pnpm lint` не работает).
2. `grep -c '"projects/<PREFIX>/' data/image-manifest.json` = `beforeCount + afterCount`.
3. `pnpm build`. Prebuild тянет данные Google Place; без `GOOGLE_PLACES_SERVER_KEY` в `.env.local` пишет предупреждение, и сборка идёт дальше. Потом:
   - есть `out/onze-werken/<slug>/index.html`; `out/sitemap.xml` содержит `/onze-werken/<slug>/`;
   - `grep -o "<title>[^<]*" out/onze-werken/<slug>/index.html` — без «…»;
   - `grep -oE "vanaf ?€|€ ?[0-9][0-9.,]*" out/onze-werken/<slug>/index.html` — пусто;
   - все варианты на месте — пустой вывод значит, что пути hero, галереи, карточек и schema верны (Git Bash):
```bash
grep -ohE "/images/projects/[^\"' ,\\]+\.w[0-9]+\.webp" out/onze-werken/<slug>/index.html out/onze-werken/index.html out/index.html | sort -u | while read f; do [ -f "public$f" ] || echo "MISSING $f"; done
```
   Ошибка в чужих файлах — сообщить владельцу, не чинить.
4. Локальный просмотр: `pnpm dev` → http://localhost:3000/onze-werken/<slug>/ (hero, обе галереи, лайтбокс) и http://localhost:3000/onze-werken/ (карточка на месте, обложка и мини-фото «Voor»).

## 10. Главная, порядок, видео
Главная: в `components/portfolio-section.tsx` массив `const projects` — всегда ровно 4 карточки; новую — первой, последнюю удалить. Формат — как у соседей:
```ts
  {
    id: "<slug>",
    baseName: "<PREFIX>/<PREFIX>-na-01",
    city: "<город без улицы>",
    service: "<часть title после « – » без года, с заглавной>",
    highlight: "<три коротких пункта через « + »>",
    href: "/onze-werken/<slug>/",
  },
```
Последние три проекта попадали на главную тем же заходом; если владелец не сказал — спросить в отчёте.

«Поставь X перед Y»: переставить объект целиком — в `lib/content/projects.ts` (архив /onze-werken/) или в `components/portfolio-section.tsx` (главная); больше ничего не менять.

Видео YouTube на странице проекта — `video.md` в этой папке.

## 11. Контент
- Публичный текст — только nl-NL.
- Никаких цен: сумм в €, «vanaf …», диапазонов, «prijs per m²» с цифрой (решение владельца 2026-09-05). Если они в JSON — не переносить, сказать владельцу.
- Тон — фактическое описание объекта: что было, что сделали, какими материалами. Без «altijd», «nooit», «de beste», процентов экономии и сроков без подтверждения; фактов сверх JSON не добавлять; кейс не превращать в страницу услуги.

## 12. Отчёт владельцу (по-русски)
- Созданные и изменённые файлы; число фото voor/na; `⚠ OVER` и `SKIP`, если были.
- Что открыть: ссылки из §9.4.
- Что подтвердить: производные тексты (H1 без `h1Text`, alt-основа, крошка, поля карточки на главной), предложенные сокращения, узкая обложка, ставить ли на главную. Если у города есть страница `/gevelisolatie/<stad>/` (список — `lib/content/gevelisolatie-locations.ts`), отметить, что проект с неё пока не ссылается.

Не коммитить и не пушить — решает владелец; перед пушем есть skill `ship-check`.

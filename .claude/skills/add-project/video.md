# Видео YouTube на странице проекта

Когда владелец даёт ссылку на ролик с этого объекта. Меняется только `app/onze-werken/<slug>/page.tsx`. Образец — `app/onze-werken/etten-leur-bankenstraat-gevelisolatie-dakrenovatie-2026/page.tsx` (второй пример — `rotterdam-julianastraat-aanbouw-isolatie-4cm-2026`). `components/youtube-embed.tsx` и `lib/seo/schema.ts` не трогать.

## Данные ролика
- `videoId` — из `youtu.be/<ID>`, `youtube.com/watch?v=<ID>` или `youtube.com/shorts/<ID>`.
- Заголовок — oEmbed: `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<ID>&format=json` (он даёт только заголовок и превью).
- Описание (1–2 предложения), дату публикации и длительность — со страницы ролика; не получилось — спросить владельца, не угадывать.
- `uploadDate` — ISO 8601 с часовым поясом (так требует комментарий у `videoSchema`): `2026-08-14T00:00:00+02:00` для летнего времени (с последнего воскресенья марта по последнее воскресенье октября), `2026-03-26T00:00:00+01:00` для зимнего. Одной даты `2026-08-14` мало.
- Длительность в двух видах: ISO для схемы (`PT49S`, `PT2M15S`, `PT1H5M30S`) и читаемая для бейджа (`0:49`, `2:15`).
- Обложка: `curl -s -o /dev/null -w "%{http_code}" https://i.ytimg.com/vi/<ID>/maxresdefault.jpg` → `200`. Её берут и схема, и `YouTubeEmbed`; при `404` сказать владельцу, компонент не менять.

## Правки
1. Импорты: `import { jsonLdScript, projectPageSchema, videoSchema } from "@/lib/seo/schema"` (добавить `videoSchema`) и `import YouTubeEmbed from "@/components/youtube-embed"` после остальных.
2. JSON-LD — сразу после блока `projectPageSchema({...}).map(...)`:
```tsx
      {jsonLdScript(videoSchema({
        name: "<заголовок ролика как на YouTube>",
        description:
          "<1–2 предложения из описания ролика>",
        videoId: "<ID>",
        thumbnailUrl: "https://i.ytimg.com/vi/<ID>/maxresdefault.jpg",
        uploadDate: "2026-08-14T00:00:00+02:00",
        duration: "PT49S",
      }))}
```
3. Секция: скопировать из образца блок от `{/* ── D½ · VIDEO` до его закрывающего `</section>` и вставить перед `{/* ── E · DETAILS DIE HET VERSCHIL MAKEN` — между «Na de werken» и «Details». Поменять только:
   - абзац под H2 — одно предложение на нидерландском о том, что видно в ролике (`In deze korte video ziet u hoe …`);
   - у `YouTubeEmbed`: `videoId`, `title` (заголовок ролика, `|` → « – »), `duration` (читаемая);
   - в полосе метаданных — место как в hero (`Etten-Leur Bankenstraat`) и год.

   Фон, свечения, метку «Video», H2 «Bekijk het project in beeld», «BM klus BV op YouTube» и классы не трогать.

## Проверка
- `npx tsc --noEmit` — 0 ошибок.
- `pnpm dev` → http://localhost:3000/onze-werken/<slug>/: секция между «Na de werken» и «Details», обложка видна, по клику грузится плеер, в углу бейдж длительности.
- После `pnpm build`: `grep -o '"uploadDate":"[^"]*"' out/onze-werken/<slug>/index.html` — одна строка, дата с часовым поясом.
- Текст — только nl-NL, без цен (как в `SKILL.md`). Не коммитить — решает владелец.

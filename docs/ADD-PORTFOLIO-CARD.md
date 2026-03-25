# Добавление карточки проекта в блок Portfolio на главной

## Файл

`components/portfolio-section.tsx` — массив `const projects = [...]` (всегда ровно 4 элемента).

## Триггер

Пользователь пишет: «добавь карточку проекта на главную» + даёт ссылку на проект (например `/onze-werken/<slug>/`).

## Шаги

1. **Открыть страницу проекта** — `app/onze-werken/<slug>/page.tsx`. Извлечь:
   - `id` — slug проекта
   - `baseName` — `<slug>/<slug>-na-01` (первое фото «после»)
   - `city` — город (из `projectPageSchema` → `city:` или breadcrumb)
   - `service` — краткое описание услуги (из h1 / badge / metadata)
   - `highlight` — ключевая особенность (из `heroBullets` или `description`)
   - `href` — `/onze-werken/<slug>/`

2. **Вставить** новый объект **первым** в массив `projects`.

3. **Удалить последний** (4-й) объект — чтобы всегда оставалось ровно 4 карточки.

4. **Больше ничего не трогать** — никаких других файлов, компонентов, импортов.

## Формат объекта

```ts
{
  id: "<slug>",
  baseName: "<slug>/<slug>-na-01",
  city: "<Город>",
  service: "<Услуга кратко>",
  highlight: "<Ключевая особенность>",
  href: "/onze-werken/<slug>/",
},
```

## Scope lock

- **1 файл**: `components/portfolio-section.tsx`
- **1 массив**: `const projects`
- **1 добавление** (первый элемент) + **1 удаление** (последний элемент)

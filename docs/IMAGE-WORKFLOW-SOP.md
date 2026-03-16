# Image Workflow — SOP & Checklists

> Practical step-by-step instructions for working with the image pipeline.
> For technical reference, see [IMAGE-PIPELINE.md](IMAGE-PIPELINE.md).

---

## Important: correct source path

> **Always** use `source-images/...` as input for `pnpm images:generate`.
>
> `public/images/...` is the **output** directory — never use it as a source.
> The script will refuse to run and exit with an error if you do.
>
> **Wrong:** `pnpm images:generate gallery public/images/projects/`
> **Correct:** `pnpm images:generate gallery source-images/projects/`

---

## Scenario A — New project page

### Step 1: Prepare source files

1. Create source files with the naming pattern:
   ```
   {prefix}-voor-01.jpg     (before photos)
   {prefix}-voor-02.jpg
   {prefix}-na-01.jpg        (after photos)
   {prefix}-na-02.jpg
   ```
   Where `{prefix}` = city + work type, e.g. `dordrecht-gevelisolatie-10cm`

2. Place them in a project subfolder under `source-images/projects/`:
   ```bash
   mkdir -p source-images/projects/{prefix}/
   cp ~/photos/{prefix}-*.jpg source-images/projects/{prefix}/
   ```

### Step 2: Generate variants

Run four presets. Order doesn't matter.

```bash
# All project photos: gallery + thumbnails
pnpm images:generate gallery source-images/projects/{prefix}/{prefix}-*.jpg
pnpm images:generate thumbnail source-images/projects/{prefix}/{prefix}-*.jpg

# Cover photo only (na-01): hero + card
pnpm images:generate hero source-images/projects/{prefix}/{prefix}-na-01.jpg
pnpm images:generate card source-images/projects/{prefix}/{prefix}-na-01.jpg
```

> **Note:** Source images live in a project subfolder (`source-images/projects/{prefix}/`).
> The script preserves this structure — generated variants go to `public/images/projects/{prefix}/`.

### Step 3: Verify variants created

```bash
# Check generated files in the project subfolder
ls public/images/projects/{prefix}/

# Check manifest updated
# Look for entries with key "projects/{prefix}/{prefix}-na-01" etc.
```

Each source image should have multiple `.w{width}.webp` files in `public/images/projects/{prefix}/`.

### Step 4: Create project data file

Create `lib/content/projects/{slug}.ts`:

```typescript
export const IMAGE_EXT = "webp"

const pad = (n: number) => String(n).padStart(2, "0")
const PREFIX = "{prefix}"
const DIR = `/images/projects/${PREFIX}`

export const beforeImages = Array.from({ length: BEFORE_COUNT }, (_, i) => ({
  src: `${DIR}/${PREFIX}-voor-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `{Stad} {type werk} – voor de werken foto ${pad(i + 1)} ({jaar})`,
  baseName: `${PREFIX}/${PREFIX}-voor-${pad(i + 1)}`,
}))

export const afterImages = Array.from({ length: AFTER_COUNT }, (_, i) => ({
  src: `${DIR}/${PREFIX}-na-${pad(i + 1)}.${IMAGE_EXT}`,
  alt: `{Stad} {type werk} – na de werken foto ${pad(i + 1)} ({jaar})`,
  baseName: `${PREFIX}/${PREFIX}-na-${pad(i + 1)}`,
}))
```

**Key:** each entry must include `baseName` with the project subfolder prefix (`{prefix}/{prefix}-na-01`).
This is how the gallery carousel looks up the manifest entry (its `dir="/images/projects"`).
Without the subfolder in `baseName`, gallery images won't display.

### Step 5: Use in page components

> **⚠ baseName format depends on `dir` — DO NOT mix them!**
>
> `manifestKey = dir.replace(/^\/images\/?/, "") + "/" + baseName`
>
> | Context | `dir` | `baseName` | Resulting key |
> |---------|-------|------------|---------------|
> | Data file (gallery, card) | `/images/projects` | `{prefix}/{prefix}-na-01` | `projects/{prefix}/{prefix}-na-01` |
> | Hero in page.tsx | `/images/projects/{prefix}` | `{prefix}-na-01` | `projects/{prefix}/{prefix}-na-01` |
>
> Both produce the **same manifest key**, but `baseName` must NOT repeat what `dir` already includes.
> Copying data file `baseName` into hero → double subfolder → 404.

```tsx
// Hero — dir includes the project subfolder, so baseName is just the filename
<ResponsiveImage
  baseName="{prefix}-na-01"
  dir="/images/projects/{prefix}"
  preset="hero"
  alt="…"
  sizes="(max-width: 1920px) 100vw, 1920px"
  priority
/>

// Gallery images use buildSrcSet/getFallbackSrc via the gallery component
// Gallery dir="/images/projects" → baseName includes subfolder: "{prefix}/{prefix}-na-01"
```

### Step 6: Add card to projects list

In `lib/content/projects.ts`, add the card entry with `coverImage` and `beforeThumb`.
The `src` must include the project subfolder: `/images/projects/{prefix}/{prefix}-na-01.webp`.
The `ProjectCard` component derives `baseName` from the `src` path automatically via `srcToBaseName()`.

### Step 7: Commit

```bash
git add public/images/projects/{prefix}/
git add data/image-manifest.json
git add lib/content/projects/{slug}.ts
git add app/onze-werken/{slug}/page.tsx
git add lib/content/projects.ts
```

---

## Scenario B — New service image

### Step 1: Place source

```bash
cp ~/photos/service-nieuw.jpg source-images/services/
```

### Step 2: Generate variants

```bash
pnpm images:generate serviceCard source-images/services/service-nieuw.jpg
```

### Step 3: Use in component

In `services-section.tsx` or a service page, reference by `baseName`:
- `baseName="service-nieuw"`
- `dir="/images/services"`
- `preset="serviceCard"`

### Step 4: Commit

```bash
git add public/images/services/service-nieuw.w*.webp
git add data/image-manifest.json
```

---

## Scenario C — Replace existing image

### Step 1: Replace source

Overwrite the file in `source-images/` with the new version, keeping the **same filename**.

```bash
cp ~/photos/new-version.jpg source-images/projects/bruinisse-gevelisolatie-6cm-na-01.jpg
```

### Step 2: Re-generate variants

Run the same presets as originally used. The script will overwrite existing variant files.

```bash
pnpm images:generate gallery source-images/projects/bruinisse-gevelisolatie-6cm-na-01.jpg
pnpm images:generate thumbnail source-images/projects/bruinisse-gevelisolatie-6cm-na-01.jpg
pnpm images:generate hero source-images/projects/bruinisse-gevelisolatie-6cm-na-01.jpg
pnpm images:generate card source-images/projects/bruinisse-gevelisolatie-6cm-na-01.jpg
```

### Step 3: Check

- `baseName` stays the same → no code changes needed
- Manifest updates with new dimensions/aspect ratio if they changed
- Verify visually that the image looks correct

### Step 4: Commit

```bash
git add public/images/projects/bruinisse-gevelisolatie-6cm-na-01.w*.webp
git add data/image-manifest.json
```

---

## Migration checklist

Use this checklist when converting any existing page to the new image pipeline.

### Source & generation

- [ ] Source images placed in `source-images/{subdir}/`
- [ ] All needed presets run (see usage matrix in IMAGE-PIPELINE.md)
- [ ] Variant files exist in `public/images/{subdir}/`
- [ ] `data/image-manifest.json` updated with correct entries

### Data & code

- [ ] `baseName` added to each image entry in data file
- [ ] Hero `baseName` does NOT include subfolder (dir already has it)
- [ ] Components use `ResponsiveImage` or `buildSrcSet`/`getFallbackSrc`
- [ ] `dir` prop is correct (`/images/projects`, `/images/services`, etc.)
- [ ] `preset` prop matches the image's use case

### HTML output

- [ ] `srcset` attribute present with multiple width descriptors
- [ ] `sizes` attribute set to meaningful value (not `100vw` everywhere)
- [ ] Fallback `src` points to the largest variant
- [ ] `width` and `height` attributes present (from manifest or explicit)

### Loading behavior

- [ ] Hero / above-fold images: `priority` prop set (no lazy, high fetchpriority)
- [ ] Below-fold images: `loading="lazy"` (default)
- [ ] No obvious overfetch (hidden images not loaded, no eager on display:none)

### Quality & output

- [ ] Variant file sizes within preset limits
- [ ] No visible compression artifacts
- [ ] No broken image paths
- [ ] `next build` passes cleanly
- [ ] No broken imports

---

## Definition of Done

A page is **fully migrated** to the new image pipeline when ALL of the following are true:

1. **All images** on the page use the new pipeline (`ResponsiveImage` or helpers)
2. **No old single-resolution** `<img src="...webp">` without `srcset` for new/migrated images
3. **`srcset`** is present on every content image with multiple width descriptors
4. **`sizes`** is meaningful for the layout context
5. **File weights** are within preset limits (checked via file system)
6. **Visual quality** is acceptable — no aggressive compression artifacts
7. **No broken paths** — all variant files exist on disk
8. **Build is clean** — `next build` exits 0 with no new errors
9. **Fallback works** — `src` attribute has a valid path
10. **Layout is stable** — `width`/`height` or CSS ensures no CLS
11. **Loading attributes correct** — hero eager/priority, rest lazy
12. **Manifest is committed** — `data/image-manifest.json` reflects all processed images

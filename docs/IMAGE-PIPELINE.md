# Image Pipeline v1 — Standard Reference

> Single source of truth for the bm-klus-bv.nl responsive image workflow.

## Architecture

Images are processed **locally before commit**. No build-time or runtime processing.

```
source-images/           ← originals (NOT in build output)
  ├── projects/
  ├── services/
  ├── heroes/
  └── general/

public/images/           ← production variants (committed, served as static files)
  ├── projects/
  ├── services/
  └── …

data/image-manifest.json ← metadata for all processed images (committed)
```

### Key rules

- Originals go in `source-images/`, never in `public/`
- Only generated `.w{width}.webp` variants go in `public/images/`
- The script only **reads** from `source-images/` and **writes** to `public/images/`
- The script **never deletes** any files (neither originals nor old variants)
- Manifest is **merged**, not overwritten — running a new preset adds widths to existing entries

---

## Presets

| Preset        | Target widths (px)     | Use case                                     |
| ------------- | ---------------------- | -------------------------------------------- |
| `hero`        | 480, 768, 1280, 1600, 1920 | Full-width hero backgrounds                  |
| `card`        | 320, 480, 640, 828     | Portfolio / project cards                     |
| `serviceCard` | 320, 480, 640, 828     | Service section cards                         |
| `gallery`     | 480, 800, 1200, 1600   | Project gallery main images, large content    |
| `thumbnail`   | 160, 240, 320          | Gallery thumbnail strips, mini previews       |

### File size limits (v2 — mobile-first, 2026-03)

Limits are aggressive by design: most images appear behind overlays,
gradients or at small mobile viewports. Tighter budgets save bandwidth
on slow 4G and improve PageSpeed scores.

#### hero

| Width | Max    |
| ----- | ------ |
| 480   | 50 KB  |
| 768   | 40 KB  |
| 1280  | 170 KB |
| 1600  | 250 KB |
| 1920  | 340 KB |

#### card

| Width | Max    |
| ----- | ------ |
| 320   | 15 KB  |
| 480   | 22 KB  |
| 640   | 30 KB  |
| 828   | 45 KB  |

#### serviceCard

| Width | Max    |
| ----- | ------ |
| 320   | 10 KB  |
| 480   | 14 KB  |
| 640   | 18 KB  |
| 828   | 25 KB  |

#### gallery

| Width | Max     |
| ----- | ------- |
| 480   | 45 KB   |
| 800   | 80 KB   |
| 1200  | 140 KB  |
| 1600  | 220 KB  |

#### thumbnail

| Width | Max    |
| ----- | ------ |
| 160   | 12 KB  |
| 240   | 18 KB  |
| 320   | 28 KB  |

---

## Naming convention

### Variant files

```
{baseName}.w{width}.webp
```

Examples:
```
bruinisse-gevelisolatie-6cm-na-01.w480.webp
bruinisse-gevelisolatie-6cm-na-01.w800.webp
bruinisse-gevelisolatie-6cm-na-01.w1200.webp
bruinisse-gevelisolatie-6cm-na-01.w1600.webp
```

### What is `baseName`

`baseName` is the filename **without extension and without width suffix**.

| File on disk                                          | `baseName`                            |
| ----------------------------------------------------- | ------------------------------------- |
| `bruinisse-gevelisolatie-6cm-na-01.w800.webp`         | `bruinisse-gevelisolatie-6cm-na-01`   |
| `service-isolatie.w640.webp`                          | `service-isolatie`                    |

In data files and components, you always reference `baseName`, never a full filename with extension.

### Source file naming

For projects, follow this pattern:
```
{project-prefix}-voor-01.webp    (before photo 1)
{project-prefix}-voor-02.webp    (before photo 2)
{project-prefix}-na-01.webp      (after photo 1)
{project-prefix}-na-02.webp      (after photo 2)
```

The `{project-prefix}` is typically the city + work type, e.g. `bruinisse-gevelisolatie-6cm`.

Numbering uses zero-padded two digits: `01`, `02`, … `21`.

---

## Adaptive compression

1. Start at quality **82**
2. If file exceeds limit → try **76 → 70 → 64 → 58 → 52**
3. Below 52 is never used
4. If still over at q52 → reduce width by ~10%, restart quality ladder
5. Up to 3 width-reduction attempts
6. Goal: fit within limit without destroying visual quality

If a source image is **narrower** than a target width, that variant is skipped (no upscale).

If the adaptive compression reduces the width, the actual width is used in the filename (e.g. `w432` instead of `w480`). The manifest and helper handle this correctly.

---

## Manifest (`data/image-manifest.json`)

Each processed image gets an entry keyed by `{subdir}/{baseName}`:

```json
{
  "projects/bruinisse-gevelisolatie-6cm-na-01": {
    "originalWidth": 2000,
    "originalHeight": 1500,
    "aspectRatio": 1.333,
    "variants": [160, 240, 320, 480, 640, 768, 800, 828, 1200, 1280, 1600, 1920]
  }
}
```

- `variants` lists all **actually generated** widths across all presets
- Running multiple presets for the same image **merges** widths into one entry
- The helper uses the manifest to build `srcset` from real widths only

---

## Components and helpers

### `ResponsiveImage` component

```tsx
import ResponsiveImage from "@/components/responsive-image"

<ResponsiveImage
  baseName="bruinisse-gevelisolatie-6cm-na-03"
  dir="/images/projects"
  preset="hero"
  alt="Gevelisolatie — BM klus BV"
  sizes="(max-width: 1920px) 100vw, 1920px"
  priority          // sets fetchpriority="high", disables lazy loading
  className="…"
/>
```

**Props:**

| Prop          | Required | Default         | Description                                    |
| ------------- | -------- | --------------- | ---------------------------------------------- |
| `baseName`    | yes      | —               | Image baseName (no extension, no width suffix)  |
| `dir`         | no       | `"/images"`     | Directory under `public/`                       |
| `preset`      | yes      | —               | Which preset to use for `srcset`                |
| `alt`         | yes      | —               | Alt text                                        |
| `sizes`       | yes      | —               | Responsive sizes attribute                      |
| `priority`    | no       | `false`         | Hero images: high priority, no lazy             |
| `width`       | no       | from manifest   | Override intrinsic width                        |
| `height`      | no       | from manifest   | Override intrinsic height                       |

### Direct helper functions

```tsx
import { buildSrcSet, getFallbackSrc, getVariantWidths, getOriginalDimensions } from "@/lib/responsive-image"

const srcSet = buildSrcSet("my-image", "/images/projects", "gallery")
const src    = getFallbackSrc("my-image", "/images/projects", "gallery")
const widths = getVariantWidths("my-image", "/images/projects", "gallery")
const dims   = getOriginalDimensions("my-image", "/images/projects")
```

- `buildSrcSet` — returns a full `srcset` string from manifest widths within the preset range
- `getFallbackSrc` — returns the largest available variant as `src` fallback
- `getVariantWidths` — returns array of widths from manifest that fall within preset's min/max
- `getOriginalDimensions` — returns `{ width, height }` from manifest

### Path format in components

- `dir` always starts with `/images/` (public-relative path)
- `baseName` never includes directory, extension, or width suffix
- Examples: `dir="/images/projects"`, `baseName="bruinisse-gevelisolatie-6cm-na-01"`

---

## Usage matrix — which presets for which images

| Use case                        | Required presets             | `dir`               | Notes                                  |
| ------------------------------- | ---------------------------- | ------------------- | -------------------------------------- |
| Project page hero               | `hero`                       | `/images/projects`  | Usually `na-01`                        |
| Project gallery main images     | `gallery`                    | `/images/projects`  | All voor + na images                   |
| Project gallery thumbnails      | `thumbnail`                  | `/images/projects`  | Same images as gallery                 |
| Homepage portfolio card         | `card`                       | `/images/projects`  | Cover image (`na-01`)                  |
| Homepage service section        | `serviceCard`                | `/images/services`  | Service card images                    |
| Homepage hero background        | `hero`                       | `/images/projects`  | Currently uses a project photo         |
| Service page hero               | `hero`                       | `/images/services`  | (future migration)                     |

**Typical project photo needs all of:** `hero` (for na-01) + `gallery` + `thumbnail` + `card` (for na-01).

**Typical service image needs only:** `serviceCard`.

---

## Command reference

```bash
pnpm images:generate <preset> <path|dir> [path...]
```

### Single image, single preset

```bash
pnpm images:generate card source-images/projects/mijn-project-na-01.webp
```

### All images in a directory, single preset

```bash
pnpm images:generate gallery source-images/projects/
```

### Typical new project — full set

```bash
# Gallery + thumbnails for ALL project photos
pnpm images:generate gallery source-images/projects/mijn-project-*.webp
pnpm images:generate thumbnail source-images/projects/mijn-project-*.webp

# Hero + card for the cover photo only
pnpm images:generate hero source-images/projects/mijn-project-na-01.webp
pnpm images:generate card source-images/projects/mijn-project-na-01.webp
```

### Order

Preset order doesn't matter. Each run merges into the manifest. You can re-run safely — existing variant files are overwritten, manifest widths are merged.

### What each run does

1. Reads source images from `source-images/`
2. Generates `.w{width}.webp` variants in `public/images/` (same subdirectory structure)
3. Updates `data/image-manifest.json` (merge, not overwrite)
4. Prints a summary with file sizes and quality levels

---

## What NOT to do

| Don't                                                 | Why                                                          |
| ----------------------------------------------------- | ------------------------------------------------------------ |
| Put originals in `public/`                            | They'd be served to users and bloat the build                 |
| **Run `images:generate` on `public/images/`**         | **Creates broken chained variants; script blocks this**       |
| Use any script other than `images:generate`            | No responsive variants, no manifest                           |
| Manually create `.w{width}.webp` files                | Manifest won't know about them                                |
| Reference full filenames with `.w800.webp` in code     | Use `baseName` + preset; the helper resolves actual widths    |
| Delete originals from `source-images/` automatically  | Keep for re-processing if presets change                      |
| Use `next/image` for new responsive images             | Use `ResponsiveImage` or direct helpers instead               |
| Hardcode widths in `srcset` strings                   | The helper builds `srcset` from manifest automatically        |
| Set `sizes="100vw"` everywhere                        | Use meaningful `sizes` for the actual layout context          |

### Source path rule

> **Always** pass `source-images/...` as input to `pnpm images:generate`.
> **Never** pass `public/images/...` — it is the output directory, not the input.
>
> The script enforces this automatically and will exit with an error if a
> `public/images/` path is provided. It also skips any already-generated
> `.w{N}.webp` variant files to prevent chained variant creation.

---

## Orientation handling

Both horizontal and vertical images are processed identically:
- Variants are generated by **target width**, preserving aspect ratio
- No forced crop, no separate naming for portrait
- If source is narrower than a target width, that variant is skipped
- Vertical images naturally produce fewer wide variants

---

## Cleanup status

| Legacy item                       | Status      | Notes                                                |
| --------------------------------- | ----------- | ---------------------------------------------------- |
| `scripts/convert-to-webp.mjs`    | **Removed** | Superseded by `generate-variants.mjs`                |
| `scripts/convert-and-replace.mjs`| **Removed** | Superseded by `generate-variants.mjs`                |
| `next/image` imports             | **Removed** | All components now use `ResponsiveImage`             |
| `vertex-image-matching/`         | Kept        | Audit/reference data — remove when no longer needed  |
| `docs/IMAGE-SLOT-AUDIT.md`       | Kept        | Historical reference                                 |
| Legacy single-res WebP files     | Kept        | Safe to remove in a separate asset cleanup pass      |

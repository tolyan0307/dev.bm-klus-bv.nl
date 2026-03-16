import manifest from "@/data/image-manifest.json"

export type ImagePreset = "hero" | "card" | "serviceCard" | "gallery" | "thumbnail"

const PRESET_WIDTHS: Record<ImagePreset, number[]> = {
  hero: [480, 768, 1280, 1600, 1920],
  card: [320, 480, 640, 828],
  serviceCard: [320, 480, 640, 828],
  gallery: [480, 800, 1200, 1600],
  thumbnail: [160, 240, 320],
}

type ManifestEntry = {
  originalWidth: number
  originalHeight: number
  aspectRatio: number
  variants: number[]
}

const entries = manifest as Record<string, ManifestEntry>

function variantPath(dir: string, baseName: string, width: number) {
  return `${dir}/${baseName}.w${width}.webp`
}

function manifestKey(dir: string, baseName: string): string {
  const stripped = dir.replace(/^\/images\/?/, "")
  return stripped ? `${stripped}/${baseName}` : baseName
}

export function getVariantWidths(
  baseName: string,
  dir: string,
  preset: ImagePreset,
): number[] {
  const key = manifestKey(dir, baseName)
  const entry = entries[key]
  const presetWidths = PRESET_WIDTHS[preset]

  if (!entry) return presetWidths

  const minW = Math.min(...presetWidths)
  const maxW = Math.max(...presetWidths)
  const inRange = entry.variants.filter((w) => w >= minW && w <= maxW)

  if (inRange.length > 0) return inRange
  // Source too small for this preset range — use all available variants
  // to avoid broken srcSet refs pointing to non-existent files
  return entry.variants
}

export function buildSrcSet(
  baseName: string,
  dir: string,
  preset: ImagePreset,
): string {
  const widths = getVariantWidths(baseName, dir, preset)
  return widths.map((w) => `${variantPath(dir, baseName, w)} ${w}w`).join(", ")
}

export function getFallbackSrc(
  baseName: string,
  dir: string,
  preset: ImagePreset,
): string {
  const widths = getVariantWidths(baseName, dir, preset)
  if (widths.length > 0) {
    return variantPath(dir, baseName, widths[widths.length - 1])
  }
  return `${dir}/${baseName}.webp`
}

export function getAspectRatio(
  baseName: string,
  dir: string,
): number | undefined {
  return entries[manifestKey(dir, baseName)]?.aspectRatio
}

export function getOriginalDimensions(
  baseName: string,
  dir: string,
): { width: number; height: number } | undefined {
  const key = manifestKey(dir, baseName)
  const entry = entries[key]
  if (!entry) return undefined
  return { width: entry.originalWidth, height: entry.originalHeight }
}

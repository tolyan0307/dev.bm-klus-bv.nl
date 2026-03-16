#!/usr/bin/env node
/**
 * generate-variants.mjs — ingest-time image variant generator
 *
 * Reads source images, generates responsive WebP variants per preset,
 * writes them to public/images/… with width suffix naming.
 *
 * Usage:
 *   pnpm images:generate <preset> <path|glob...>
 *   pnpm images:generate hero   source-images/projects/bruinisse-*.webp
 *   pnpm images:generate card   source-images/projects/halsteren-buitenstucwerk-na-01.webp
 *   pnpm images:generate gallery source-images/projects/
 *
 * Presets: hero, card, serviceCard, gallery, thumbnail
 *
 * Variants land in public/images/… preserving subdirectory structure:
 *   source-images/projects/foo.webp  →  public/images/projects/foo.w480.webp
 */

import { readdir, stat, mkdir, readFile, writeFile } from "fs/promises"
import { join, dirname, basename, extname, relative, resolve } from "path"
import { fileURLToPath } from "url"
import { existsSync } from "fs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, "..")
const SOURCE_ROOT = join(ROOT, "source-images")
const PUBLIC_ROOT = join(ROOT, "public", "images")
const MANIFEST_PATH = join(ROOT, "data", "image-manifest.json")

// ── Presets ──────────────────────────────────────────────────────────────────

const PRESETS = {
  hero: {
    widths: [480, 768, 1280, 1600, 1920],
    maxBytes: { 480: 50 * 1024, 768: 40 * 1024, 1280: 170 * 1024, 1600: 250 * 1024, 1920: 340 * 1024 },
  },
  card: {
    widths: [320, 480, 640, 828],
    maxBytes: { 320: 15 * 1024, 480: 22 * 1024, 640: 30 * 1024, 828: 45 * 1024 },
  },
  serviceCard: {
    widths: [320, 480, 640, 828],
    maxBytes: { 320: 10 * 1024, 480: 14 * 1024, 640: 18 * 1024, 828: 25 * 1024 },
  },
  gallery: {
    widths: [480, 800, 1200, 1600],
    maxBytes: { 480: 45 * 1024, 800: 80 * 1024, 1200: 140 * 1024, 1600: 220 * 1024 },
  },
  thumbnail: {
    widths: [160, 240, 320],
    maxBytes: { 160: 12 * 1024, 240: 18 * 1024, 320: 28 * 1024 },
  },
}

const QUALITY_LADDER = [82, 76, 70, 64, 58, 52]
const SUPPORTED_EXT = [".webp", ".jpg", ".jpeg", ".png", ".tiff", ".avif"]

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatKB(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`
}

const VARIANT_RE = /\.w\d+\.webp$/i

async function findImages(path_) {
  const s = await stat(path_)
  if (s.isFile()) {
    const ext = extname(path_).toLowerCase()
    if (!SUPPORTED_EXT.includes(ext)) return []
    if (VARIANT_RE.test(path_)) return []
    return [resolve(path_)]
  }
  if (s.isDirectory()) {
    const entries = await readdir(path_, { withFileTypes: true })
    const results = []
    for (const e of entries) {
      if (e.name.startsWith(".") || e.name.startsWith("_")) continue
      const full = join(path_, e.name)
      if (e.isDirectory()) {
        results.push(...(await findImages(full)))
      } else {
        const ext = extname(e.name).toLowerCase()
        if (SUPPORTED_EXT.includes(ext) && !VARIANT_RE.test(e.name)) {
          results.push(resolve(full))
        }
      }
    }
    return results
  }
  return []
}

function sourceToPublicDir(sourcePath) {
  const rel = relative(SOURCE_ROOT, dirname(sourcePath))
  return join(PUBLIC_ROOT, rel)
}

function variantFilename(base, width) {
  return `${base}.w${width}.webp`
}

function manifestKey(sourcePath) {
  const rel = relative(SOURCE_ROOT, sourcePath)
  const ext = extname(rel)
  return rel.replace(/\\/g, "/").replace(ext, "")
}

// ── Core: adaptive encode ────────────────────────────────────────────────────

async function encodeVariant(sharp, sourceBuffer, targetWidth, maxBytes, sourceWidth) {
  if (targetWidth > sourceWidth) return null

  let currentWidth = targetWidth

  for (let attempt = 0; attempt < 3; attempt++) {
    for (const quality of QUALITY_LADDER) {
      const buf = await sharp(sourceBuffer)
        .resize({ width: currentWidth, withoutEnlargement: true })
        .webp({ quality, effort: 4 })
        .toBuffer()

      if (buf.length <= maxBytes) {
        return { buffer: buf, quality, actualWidth: currentWidth, size: buf.length }
      }
    }
    currentWidth = Math.round(currentWidth * 0.9)
  }

  const buf = await sharp(sourceBuffer)
    .resize({ width: currentWidth, withoutEnlargement: true })
    .webp({ quality: QUALITY_LADDER[QUALITY_LADDER.length - 1], effort: 6 })
    .toBuffer()

  return { buffer: buf, quality: QUALITY_LADDER[QUALITY_LADDER.length - 1], actualWidth: currentWidth, size: buf.length, overLimit: buf.length > maxBytes }
}

// ── Process one source file ──────────────────────────────────────────────────

async function processImage(sharp, sourcePath, preset) {
  const sourceBuffer = await readFile(sourcePath)
  const meta = await sharp(sourceBuffer).metadata()
  const sourceWidth = meta.width
  const sourceHeight = meta.height
  const aspectRatio = sourceWidth / sourceHeight

  const outDir = sourceToPublicDir(sourcePath)
  await mkdir(outDir, { recursive: true })

  const ext = extname(sourcePath)
  const base = basename(sourcePath, ext)

  const presetDef = PRESETS[preset]
  const variants = []
  const warnings = []

  for (const targetWidth of presetDef.widths) {
    if (targetWidth > sourceWidth) {
      warnings.push(`  SKIP w${targetWidth} (source is ${sourceWidth}px wide)`)
      continue
    }

    const maxBytes = presetDef.maxBytes[targetWidth]
    const result = await encodeVariant(sharp, sourceBuffer, targetWidth, maxBytes, sourceWidth)
    if (!result) continue

    const outName = variantFilename(base, result.actualWidth)
    const outPath = join(outDir, outName)
    await writeFile(outPath, result.buffer)

    const status = result.overLimit ? "⚠ OVER" : "  OK  "
    const note = result.actualWidth !== targetWidth ? ` (downsized from ${targetWidth})` : ""
    console.log(`  ${status} ${outName}  ${formatKB(result.size)} q${result.quality}${note}`)

    variants.push({
      width: result.actualWidth,
      size: result.size,
      quality: result.quality,
    })
  }

  for (const w of warnings) console.log(w)

  return {
    key: manifestKey(sourcePath),
    originalWidth: sourceWidth,
    originalHeight: sourceHeight,
    aspectRatio: Math.round(aspectRatio * 1000) / 1000,
    newWidths: variants.map((v) => v.width),
  }
}

// ── Manifest ─────────────────────────────────────────────────────────────────

async function loadManifest() {
  try {
    const raw = await readFile(MANIFEST_PATH, "utf8")
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

async function saveManifest(manifest) {
  const dir = dirname(MANIFEST_PATH)
  await mkdir(dir, { recursive: true })
  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)))
  await writeFile(MANIFEST_PATH, JSON.stringify(sorted, null, 2) + "\n")
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2)

  if (args.length < 2) {
    console.log("Usage: node scripts/generate-variants.mjs <preset> <path|dir> [path...]")
    console.log(`Presets: ${Object.keys(PRESETS).join(", ")}`)
    console.log("")
    console.log("Examples:")
    console.log("  pnpm images:generate hero source-images/projects/bruinisse-gevelisolatie-6cm-na-03.webp")
    console.log("  pnpm images:generate gallery source-images/projects/")
    console.log("  pnpm images:generate card source-images/projects/halsteren-buitenstucwerk-na-01.webp")
    process.exit(1)
  }

  const preset = args[0]
  if (!PRESETS[preset]) {
    console.error(`Unknown preset: ${preset}. Available: ${Object.keys(PRESETS).join(", ")}`)
    process.exit(1)
  }

  const paths = args.slice(1)
  const allImages = []
  for (const p of paths) {
    const resolved = resolve(p)
    if (resolved.startsWith(PUBLIC_ROOT)) {
      console.error(`\n✖ ERROR: Source path points inside public/images/:\n  ${p}\n`)
      console.error("public/images/ is the OUTPUT directory for generated variants.")
      console.error("Source images must come from source-images/.\n")
      console.error("Correct usage:")
      console.error("  pnpm images:generate hero source-images/projects/my-image.webp")
      console.error("  pnpm images:generate gallery source-images/projects/\n")
      process.exit(1)
    }
    if (!existsSync(resolved)) {
      console.error(`Path not found: ${p}`)
      process.exit(1)
    }
    allImages.push(...(await findImages(resolved)))
  }

  if (allImages.length === 0) {
    console.log("No images found.")
    return
  }

  console.log(`\nPreset: ${preset} (widths: ${PRESETS[preset].widths.join(", ")})`)
  console.log(`Processing ${allImages.length} image(s):\n`)

  let sharp
  try {
    sharp = (await import("sharp")).default
  } catch {
    console.error("Error: sharp not installed. Run: pnpm add sharp")
    process.exit(1)
  }

  const manifest = await loadManifest()
  let ok = 0
  let fail = 0

  for (const img of allImages) {
    const rel = relative(ROOT, img).replace(/\\/g, "/")
    console.log(`► ${rel}`)
    try {
      const entry = await processImage(sharp, img, preset)
      const existing = manifest[entry.key]
      const mergedWidths = existing
        ? [...new Set([...existing.variants, ...entry.newWidths])].sort((a, b) => a - b)
        : entry.newWidths.sort((a, b) => a - b)
      manifest[entry.key] = {
        originalWidth: entry.originalWidth,
        originalHeight: entry.originalHeight,
        aspectRatio: entry.aspectRatio,
        variants: mergedWidths,
      }
      ok++
    } catch (e) {
      console.error(`  FAIL: ${e.message}`)
      fail++
    }
  }

  await saveManifest(manifest)

  console.log(`\nDone. ${ok} succeeded, ${fail} failed.`)
  console.log(`Manifest: ${relative(ROOT, MANIFEST_PATH).replace(/\\/g, "/")}`)
}

main()

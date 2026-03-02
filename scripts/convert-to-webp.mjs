#!/usr/bin/env node
/**
 * Batch convert JPEG/PNG to WebP for project images.
 * Local dev tool — not deployed (only out/ goes to production).
 *
 * Usage:
 *   node scripts/convert-to-webp.mjs [path]
 *   pnpm images:webp [path]
 *
 * Examples:
 *   pnpm images:webp
 *   pnpm images:webp public/images/projects/
 *   pnpm images:webp public/images/projects/vlaardingen-2024/
 *
 * Default path: public/images/projects/
 * Converts: .jpg, .jpeg, .png → .webp (quality 85)
 * Keeps originals. Output alongside source.
 */

import { readdir, stat } from "fs/promises"
import { join, dirname, extname, basename } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, "..")

const SUPPORTED = [".jpg", ".jpeg", ".png"]
const QUALITY = 85

async function findImages(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) {
      await findImages(full, files)
    } else if (SUPPORTED.includes(extname(e.name).toLowerCase())) {
      files.push(full)
    }
  }
  return files
}

async function convert(sharp, path) {
  const ext = extname(path).toLowerCase()
  const out = path.replace(new RegExp(ext + "$", "i"), ".webp")

  await sharp(path)
    .webp({ quality: QUALITY })
    .toFile(out)

  const rel = path.replace(ROOT, "").replace(/\\/g, "/")
  const relOut = out.replace(ROOT, "").replace(/\\/g, "/")
  console.log(`  ${rel} → ${relOut}`)
}

async function main() {
  const arg = process.argv[2]
  const targetDir = arg
    ? join(ROOT, arg.replace(/^\/+/, ""))
    : join(ROOT, "public", "images", "projects")

  console.log(`Converting images in: ${targetDir.replace(ROOT, "").replace(/\\/g, "/") || "."}\n`)

  let stat_
  try {
    stat_ = await stat(targetDir)
  } catch {
    console.error(`Error: Directory not found: ${targetDir}`)
    process.exit(1)
  }
  if (!stat_.isDirectory()) {
    console.error(`Error: Not a directory: ${targetDir}`)
    process.exit(1)
  }

  const images = await findImages(targetDir)
  if (images.length === 0) {
    console.log("No images to convert (.jpg, .jpeg, .png)")
    return
  }

  console.log(`Found ${images.length} image(s):\n`)

  let sharp
  try {
    sharp = (await import("sharp")).default
  } catch (e) {
    console.error("Error: sharp not installed. Run: pnpm add -D sharp")
    process.exit(1)
  }

  for (const p of images) {
    try {
      await convert(sharp, p)
    } catch (e) {
      console.error(`  FAIL ${p}: ${e.message}`)
    }
  }

  console.log(`\nDone. Originals kept.`)
}

main()

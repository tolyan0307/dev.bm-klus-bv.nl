#!/usr/bin/env node
/**
 * Convert JPEG/PNG to WebP, replace originals only if WebP is smaller.
 * Keeps original if converted file would be larger.
 *
 * Usage:
 *   node scripts/convert-and-replace.mjs <file1> [file2] ...
 *   node scripts/convert-and-replace.mjs --dir public/images/projects --prefix rottekade
 *
 * Examples:
 *   node scripts/convert-and-replace.mjs rottekade-gevelisolatie-10cm-na-01.jpg
 *   node scripts/convert-and-replace.mjs rottekade-gevelisolatie-10cm-na-01.jpg rottekade-gevelisolatie-10cm-na-02.jpg
 */

import { stat, unlink } from "fs/promises"
import { join, dirname, extname } from "path"
import { fileURLToPath } from "url"
import { readdir } from "fs/promises"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, "..")
const PROJECTS_DIR = join(ROOT, "public", "images", "projects")

const SUPPORTED = [".jpg", ".jpeg", ".png"]
const QUALITY_LEVELS = [85, 75, 65] // try lower quality if WebP is larger than original

function parseArgs() {
  const args = process.argv.slice(2)
  if (args.length === 0) {
    console.error("Usage: node convert-and-replace.mjs <file1> [file2] ...")
    console.error("   or: node convert-and-replace.mjs --dir <path> --prefix <prefix>")
    process.exit(1)
  }

  if (args[0] === "--dir") {
    const dir = args[1]
    const prefix = args[2] === "--prefix" ? args[3] : null
    return { mode: "dir", dir, prefix }
  }

  return { mode: "files", files: args }
}

async function getFileList(mode, dir, prefix, files) {
  if (mode === "files") {
    return files.map((f) => join(PROJECTS_DIR, f))
  }

  const targetDir = dir ? join(ROOT, dir.replace(/^\/+/, "")) : PROJECTS_DIR
  const entries = await readdir(targetDir, { withFileTypes: true })
  const list = []
  for (const e of entries) {
    if (!e.isFile()) continue
    const ext = extname(e.name).toLowerCase()
    if (!SUPPORTED.includes(ext)) continue
    if (prefix && !e.name.startsWith(prefix)) continue
    list.push(join(targetDir, e.name))
  }
  return list
}

async function convertAndReplace(sharp, path) {
  const ext = extname(path).toLowerCase()
  if (!SUPPORTED.includes(ext)) {
    console.log(`  SKIP ${path} (unsupported format)`)
    return
  }

  const outPath = path.replace(new RegExp(ext + "$", "i"), ".webp")

  const origStat = await stat(path)
  const origSize = origStat.size

  let bestQuality = null
  let bestSize = Infinity

  for (const q of QUALITY_LEVELS) {
    await sharp(path)
      .webp({ quality: q })
      .toFile(outPath)

    const outStat = await stat(outPath)
    const outSize = outStat.size

    if (outSize <= origSize && outSize < bestSize) {
      bestQuality = q
      bestSize = outSize
    }
  }

  const rel = path.replace(ROOT, "").replace(/\\/g, "/")
  const relOut = outPath.replace(ROOT, "").replace(/\\/g, "/")

  if (bestQuality !== null) {
    // re-encode with best quality (last iteration may have different q)
    await sharp(path)
      .webp({ quality: bestQuality })
      .toFile(outPath)
    await unlink(path)
    const finalSize = (await stat(outPath)).size
    const qNote = bestQuality < 85 ? ` q${bestQuality}` : ""
    console.log(`  OK   ${rel} → ${relOut} (${formatSize(origSize)} → ${formatSize(finalSize)})${qNote}`)
  } else {
    await unlink(outPath)
    console.log(`  KEEP ${rel} (WebP larger at all quality levels)`)
  }
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

async function main() {
  const { mode, dir, prefix, files } = parseArgs()

  const toProcess = await getFileList(mode, dir, prefix, files)
  if (toProcess.length === 0) {
    console.log("No images to process.")
    return
  }

  console.log(`Processing ${toProcess.length} image(s):\n`)

  let sharp
  try {
    sharp = (await import("sharp")).default
  } catch (e) {
    console.error("Error: sharp not installed. Run: pnpm add -D sharp")
    process.exit(1)
  }

  for (const p of toProcess) {
    try {
      await convertAndReplace(sharp, p)
    } catch (e) {
      console.error(`  FAIL ${p}: ${e.message}`)
    }
  }

  console.log("\nDone.")
}

main()

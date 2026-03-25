/**
 * Prebuild script — fetches Google Places data via REST API (New)
 * and writes it to public/data/google-place.json.
 *
 * Run: node scripts/fetch-google-place.mjs
 *
 * Environment variables (read from .env.local or process.env):
 *   GOOGLE_PLACES_SERVER_KEY  — API key without referrer restrictions (preferred)
 *   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY — fallback (client key, requires Referer header)
 *   NEXT_PUBLIC_GOOGLE_PLACE_ID
 *
 * Output: public/data/google-place.json — consumed by the client
 * as a static asset (zero Google API calls from visitors).
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "..")
const OUT_DIR = resolve(ROOT, "public", "data")
const OUT_FILE = resolve(OUT_DIR, "google-place.json")

/* ------------------------------------------------------------------ */
/*  Load env vars from .env.local (Next.js doesn't run at this stage) */
/* ------------------------------------------------------------------ */

function loadEnvFile() {
  for (const name of [".env.local", ".env"]) {
    try {
      const text = readFileSync(resolve(ROOT, name), "utf-8")
      for (const line of text.split("\n")) {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith("#")) continue
        const eqIdx = trimmed.indexOf("=")
        if (eqIdx < 1) continue
        const key = trimmed.slice(0, eqIdx).trim()
        const val = trimmed.slice(eqIdx + 1).trim()
        if (!process.env[key]) process.env[key] = val
      }
      return
    } catch {
      /* file not found — try next */
    }
  }
}

loadEnvFile()

const SERVER_KEY = process.env.GOOGLE_PLACES_SERVER_KEY ?? ""
const CLIENT_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""
const API_KEY = SERVER_KEY || CLIENT_KEY
const PLACE_ID = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID ?? ""
const NEEDS_REFERER = !SERVER_KEY && !!CLIENT_KEY

if (!API_KEY || !PLACE_ID) {
  console.warn("[fetch-google-place] API key or Place ID missing — skipping.")
  process.exit(0)
}

if (NEEDS_REFERER) {
  console.log("[fetch-google-place] Using client key with Referer header (set GOOGLE_PLACES_SERVER_KEY for a cleaner setup).")
}

/* ------------------------------------------------------------------ */
/*  Fetch from Google Places API (New) REST endpoint                  */
/* ------------------------------------------------------------------ */

const FIELDS = [
  "rating",
  "userRatingCount",
  "reviews.rating",
  "reviews.text",
  "reviews.relativePublishTimeDescription",
  "reviews.authorAttribution.displayName",
  "reviews.authorAttribution.uri",
  "reviews.authorAttribution.photoUri",
  "reviews.publishTime",
  "googleMapsUri",
].join(",")

const url = `https://places.googleapis.com/v1/places/${PLACE_ID}`

console.log("[fetch-google-place] Fetching place data…")

try {
  const headers = {
    "X-Goog-Api-Key": API_KEY,
    "X-Goog-FieldMask": FIELDS,
  }
  if (NEEDS_REFERER) {
    headers["Referer"] = "https://bm-klus-bv.nl/"
  }

  const res = await fetch(url, { headers })

  if (!res.ok) {
    const body = await res.text()
    console.error(`[fetch-google-place] API error ${res.status}: ${body}`)
    process.exit(0)
  }

  const raw = await res.json()

  const data = {
    rating: raw.rating ?? 0,
    reviewCount: raw.userRatingCount ?? 0,
    googleMapsUri: raw.googleMapsUri ?? undefined,
    reviews: (raw.reviews ?? []).map((r) => ({
      author: r.authorAttribution?.displayName ?? "Anoniem",
      initial: (r.authorAttribution?.displayName ?? "A")
        .charAt(0)
        .toUpperCase(),
      rating: r.rating ?? 5,
      text: r.text?.text ?? r.text ?? "",
      relativeTime: r.relativePublishTimeDescription ?? "",
      authorUri: r.authorAttribution?.uri ?? undefined,
      photoUri: r.authorAttribution?.photoUri ?? undefined,
      publishTime: r.publishTime ?? undefined,
    })).sort((a, b) => {
      if (!a.publishTime) return 1
      if (!b.publishTime) return -1
      return b.publishTime.localeCompare(a.publishTime)
    }),
    fetchedAt: new Date().toISOString(),
  }

  mkdirSync(OUT_DIR, { recursive: true })
  writeFileSync(OUT_FILE, JSON.stringify(data, null, 2), "utf-8")

  console.log(
    `[fetch-google-place] OK — rating ${data.rating}, ${data.reviewCount} reviews, ${data.reviews.length} review texts → ${OUT_FILE}`,
  )
} catch (err) {
  console.error("[fetch-google-place] Network error:", err.message)
  process.exit(0)
}

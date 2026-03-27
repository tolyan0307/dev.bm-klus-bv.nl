/**
 * Prebuild script — fetches Google Places data and writes it to
 * public/data/google-place.json.
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
 *
 * ⚠️  LEGACY API NOTICE (2026-03-27)
 * Reviews are fetched via the Legacy Place Details endpoint because it
 * supports `reviews_sort=newest` — the New API (v1) does not.
 * Rating + reviewCount still come from the New API (v1).
 *
 * When Google sunsets the Legacy endpoint, revert reviews fetching to
 * the New API (v1).  Search for "LEGACY" in this file to find all
 * related code.  The New API code is preserved in comments marked
 * "// [NEW-API]" so the rollback is copy-paste.
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
const PLACE_ID = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID ?? ""

/* Server key → Legacy reviews (no Referer restriction needed).
   Client key → New API rating (Referer header required).
   Both must be present for the hybrid approach. */
const LEGACY_KEY = SERVER_KEY || CLIENT_KEY
const NEW_API_KEY = CLIENT_KEY || SERVER_KEY

if ((!SERVER_KEY && !CLIENT_KEY) || !PLACE_ID) {
  console.warn("[fetch-google-place] API key or Place ID missing — skipping.")
  process.exit(0)
}

if (!SERVER_KEY) {
  console.warn("[fetch-google-place] GOOGLE_PLACES_SERVER_KEY missing — Legacy reviews API may fail with Referer-restricted key.")
}

/* ------------------------------------------------------------------ */
/*  1. Rating + reviewCount — New API (v1)                            */
/* ------------------------------------------------------------------ */

const RATING_FIELDS = ["rating", "userRatingCount", "googleMapsUri"].join(",")
const ratingUrl = `https://places.googleapis.com/v1/places/${PLACE_ID}`

/* ------------------------------------------------------------------ */
/*  2. Reviews — LEGACY Place Details (supports reviews_sort=newest)  */
/* ------------------------------------------------------------------ */

const legacyUrl =
  `https://maps.googleapis.com/maps/api/place/details/json` +
  `?place_id=${PLACE_ID}` +
  `&fields=reviews` +
  `&reviews_sort=newest` +
  `&key=${LEGACY_KEY}`

// [NEW-API] To revert to New API for reviews, replace the LEGACY block
// below with this single fetch:
//
// const FIELDS = [
//   "rating", "userRatingCount", "reviews.rating", "reviews.text",
//   "reviews.relativePublishTimeDescription",
//   "reviews.authorAttribution.displayName",
//   "reviews.authorAttribution.uri",
//   "reviews.authorAttribution.photoUri",
//   "reviews.publishTime", "googleMapsUri",
// ].join(",")
//
// const url = `https://places.googleapis.com/v1/places/${PLACE_ID}`
// const res = await fetch(url, {
//   headers: { "X-Goog-Api-Key": API_KEY, "X-Goog-FieldMask": FIELDS },
// })
// const raw = await res.json()
// Then map raw.reviews using the [NEW-API] mapper below.

console.log("[fetch-google-place] Fetching rating (New API) + reviews (Legacy API, newest first)…")

try {
  /* --- Fetch both in parallel --- */
  const ratingHeaders = {
    "X-Goog-Api-Key": NEW_API_KEY,
    "X-Goog-FieldMask": RATING_FIELDS,
    "Referer": "https://bm-klus-bv.nl/",
  }

  const legacyHeaders = {
    "Referer": "https://bm-klus-bv.nl/",
  }

  const [ratingRes, reviewsRes] = await Promise.all([
    fetch(ratingUrl, { headers: ratingHeaders }),
    fetch(legacyUrl, { headers: legacyHeaders }),
  ])

  if (!ratingRes.ok) {
    const body = await ratingRes.text()
    console.error(`[fetch-google-place] Rating API error ${ratingRes.status}: ${body}`)
    process.exit(0)
  }
  if (!reviewsRes.ok) {
    const body = await reviewsRes.text()
    console.error(`[fetch-google-place] Legacy reviews API error ${reviewsRes.status}: ${body}`)
    process.exit(0)
  }

  const ratingRaw = await ratingRes.json()
  const reviewsRaw = await reviewsRes.json()

  /* --- Check Legacy API status (HTTP is always 200, real status is in body) --- */
  if (reviewsRaw.status && reviewsRaw.status !== "OK") {
    console.error(`[fetch-google-place] Legacy reviews API status: ${reviewsRaw.status} — ${reviewsRaw.error_message ?? "no details"}`)
    console.error("[fetch-google-place] Falling back to rating-only output (no review texts).")
  }

  /* --- LEGACY mapper — field names differ from New API --- */
  const legacyReviews = (reviewsRaw.result?.reviews ?? []).map((r) => ({
    author: r.author_name ?? "Anoniem",
    initial: (r.author_name ?? "A").charAt(0).toUpperCase(),
    rating: r.rating ?? 5,
    text: r.text ?? "",
    relativeTime: r.relative_time_description ?? "",
    authorUri: r.author_url ?? undefined,
    photoUri: r.profile_photo_url ?? undefined,
    publishTime: r.time ? new Date(r.time * 1000).toISOString() : undefined,
  }))

  // [NEW-API] mapper (for rollback):
  // const reviews = (raw.reviews ?? []).map((r) => ({
  //   author: r.authorAttribution?.displayName ?? "Anoniem",
  //   initial: (r.authorAttribution?.displayName ?? "A").charAt(0).toUpperCase(),
  //   rating: r.rating ?? 5,
  //   text: r.text?.text ?? r.text ?? "",
  //   relativeTime: r.relativePublishTimeDescription ?? "",
  //   authorUri: r.authorAttribution?.uri ?? undefined,
  //   photoUri: r.authorAttribution?.photoUri ?? undefined,
  //   publishTime: r.publishTime ?? undefined,
  // }))

  /* Reviews already come sorted by newest from Legacy API,
     but sort explicitly to be safe. */
  legacyReviews.sort((a, b) => {
    if (!a.publishTime) return 1
    if (!b.publishTime) return -1
    return b.publishTime.localeCompare(a.publishTime)
  })

  const data = {
    rating: ratingRaw.rating ?? 0,
    reviewCount: ratingRaw.userRatingCount ?? 0,
    googleMapsUri: ratingRaw.googleMapsUri ?? undefined,
    reviews: legacyReviews,
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

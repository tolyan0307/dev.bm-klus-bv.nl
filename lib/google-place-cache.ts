/**
 * Google Place data cache.
 *
 * PRIMARY source: /data/google-place.json — a static file generated
 * at build time by `scripts/fetch-google-place.mjs`.  Served by Apache
 * like any other asset: zero Google API calls from visitors.
 *
 * FALLBACK (dev only): Google Maps JS API — used when the static file
 * is missing (e.g. `npm run dev` without running prebuild first).
 */

/* ------------------------------------------------------------------ */
/*  Shared types                                                       */
/* ------------------------------------------------------------------ */

export interface PlaceReview {
  author: string
  initial: string
  rating: number
  text: string
  relativeTime: string
  authorUri?: string
  photoUri?: string
  publishTime?: string
}

export interface RatingData {
  rating: number
  reviewCount: number
  googleMapsUri?: string
}

export interface PlaceData extends RatingData {
  reviews: PlaceReview[]
}

/* ------------------------------------------------------------------ */
/*  In-memory singletons                                               */
/* ------------------------------------------------------------------ */

let memRating: RatingData | null = null
let memPlace: PlaceData | null = null
let ratingPromise: Promise<RatingData | null> | null = null
let placePromise: Promise<PlaceData | null> | null = null

const STATIC_JSON_PATH = "/data/google-place.json"

/* ------------------------------------------------------------------ */
/*  Static JSON loader (primary — zero API cost)                       */
/* ------------------------------------------------------------------ */

let staticPromise: Promise<PlaceData | null> | null = null

function fetchStaticJson(): Promise<PlaceData | null> {
  if (typeof window === "undefined") return Promise.resolve(null)
  if (staticPromise) return staticPromise

  staticPromise = fetch(STATIC_JSON_PATH)
    .then((res) => (res.ok ? res.json() : null))
    .then((raw: Record<string, unknown> | null) => {
      if (!raw || typeof raw.rating !== "number") return null
      return raw as unknown as PlaceData
    })
    .catch(() => null)

  return staticPromise
}

/* ------------------------------------------------------------------ */
/*  Google Maps JS API fallback (dev only — when JSON is missing)      */
/* ------------------------------------------------------------------ */

async function fetchFromApi(fieldsNeeded: "rating" | "full"): Promise<PlaceData | null> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID ?? ""
  if (!apiKey || !placeId) return null

  const { loadGoogleMaps } = await import("@/lib/google-maps-loader")
  const maps = await loadGoogleMaps(apiKey)
  const { Place } = (await maps.importLibrary("places")) as google.maps.PlacesLibrary
  const p = new Place({ id: placeId })

  const fields =
    fieldsNeeded === "full"
      ? ["rating", "userRatingCount", "reviews", "googleMapsURI"]
      : ["rating", "userRatingCount", "googleMapsURI"]

  await p.fetchFields({ fields })

  return {
    rating: p.rating ?? 0,
    reviewCount: p.userRatingCount ?? 0,
    googleMapsUri: p.googleMapsURI ?? undefined,
    reviews:
      fieldsNeeded === "full"
        ? (p.reviews ?? []).map((r) => ({
            author: r.authorAttribution?.displayName ?? "Anoniem",
            initial: (r.authorAttribution?.displayName ?? "A").charAt(0).toUpperCase(),
            rating: r.rating ?? 5,
            text: (r.text as string) ?? "",
            relativeTime: r.relativePublishTimeDescription ?? "",
            authorUri: r.authorAttribution?.uri ?? undefined,
            photoUri: r.authorAttribution?.photoURI ?? undefined,
          }))
        : [],
  }
}

/* ------------------------------------------------------------------ */
/*  Rating only (for badges — 17+ pages)                               */
/* ------------------------------------------------------------------ */

export function getCachedRating(): RatingData | null {
  return memRating
}

export function fetchRating(): Promise<RatingData | null> {
  if (memRating) return Promise.resolve(memRating)
  if (ratingPromise) return ratingPromise

  ratingPromise = fetchStaticJson()
    .then((data) => {
      if (data) {
        memPlace = data
        memRating = data
        return data as RatingData
      }
      return fetchFromApi("rating")
    })
    .then((data) => {
      if (data) memRating = data
      return data
    })
    .catch(() => null)

  return ratingPromise
}

/* ------------------------------------------------------------------ */
/*  Full place data with reviews (for carousel)                        */
/* ------------------------------------------------------------------ */

/** @deprecated Use `getCachedRating()` unless you need reviews. */
export function getCachedPlace(): PlaceData | null {
  return memPlace
}

export function fetchPlace(): Promise<PlaceData | null> {
  if (memPlace) return Promise.resolve(memPlace)
  if (placePromise) return placePromise

  placePromise = fetchStaticJson()
    .then((data) => {
      if (data) return data
      return fetchFromApi("full")
    })
    .then((data) => {
      if (data) {
        memPlace = data
        memRating = data
      }
      return data
    })
    .catch(() => null)

  return placePromise
}

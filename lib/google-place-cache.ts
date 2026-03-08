import { loadGoogleMaps } from "@/lib/google-maps-loader"

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
}

export interface PlaceData {
  rating: number
  reviewCount: number
  reviews: PlaceReview[]
  googleMapsUri?: string
}

/* ------------------------------------------------------------------ */
/*  Module-level singleton cache                                       */
/* ------------------------------------------------------------------ */

let cached: PlaceData | null = null
let promise: Promise<PlaceData | null> | null = null

/** Returns cached place data if already fetched, otherwise `null`. */
export function getCachedPlace(): PlaceData | null {
  return cached
}

/**
 * Fetches place data from Google Places API (New) and caches the result.
 * Subsequent calls return the same promise / cached value.
 * Both `GoogleRatingBadge` and `GoogleReviews` share this single fetch.
 */
export function fetchPlace(): Promise<PlaceData | null> {
  if (cached) return Promise.resolve(cached)
  if (promise) return promise

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID ?? ""
  if (!apiKey || !placeId) return Promise.resolve(null)

  promise = loadGoogleMaps(apiKey)
    .then(async (maps) => {
      const { Place } = (await maps.importLibrary(
        "places",
      )) as google.maps.PlacesLibrary
      const p = new Place({ id: placeId })
      await p.fetchFields({
        fields: ["rating", "userRatingCount", "reviews", "googleMapsURI"],
      })

      cached = {
        rating: p.rating ?? 0,
        reviewCount: p.userRatingCount ?? 0,
        reviews: (p.reviews ?? []).map((r) => ({
          author: r.authorAttribution?.displayName ?? "Anoniem",
          initial: (r.authorAttribution?.displayName ?? "A")
            .charAt(0)
            .toUpperCase(),
          rating: r.rating ?? 5,
          text: (r.text as string) ?? "",
          relativeTime: r.relativePublishTimeDescription ?? "",
          authorUri: r.authorAttribution?.uri ?? undefined,
          photoUri: r.authorAttribution?.photoURI ?? undefined,
        })),
        googleMapsUri: p.googleMapsURI ?? undefined,
      }

      return cached
    })
    .catch(() => null)

  return promise
}

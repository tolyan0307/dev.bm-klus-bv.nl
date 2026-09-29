"use client"

import { useEffect, useState } from "react"
import { fetchRating } from "@/lib/google-place-cache"
import { SITE } from "@/lib/seo/routes"

const BUSINESS_ID = `${SITE.canonicalBase}/#business`

/**
 * Injects AggregateRating structured data (JSON-LD) using live
 * Google Places data. Uses Essentials-tier fetch (rating + count only),
 * cached in localStorage for 24 h — effectively zero cost.
 *
 * Googlebot renders JavaScript and will pick up the injected schema.
 */
export default function GoogleAggregateRatingJsonLd() {
  // Set after hydration only. The server renders nothing here; a value taken from
  // the shared cache during hydration (filled by a GoogleRatingBadge that hydrated
  // earlier) would not match the server HTML — React error #418.
  const [json, setJson] = useState<string | null>(null)

  useEffect(() => {
    fetchRating().then((data) => {
      if (data && data.reviewCount > 0) {
        setJson(buildJson(data.rating, data.reviewCount))
      }
    })
  }, [])

  if (!json) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}

function buildJson(rating: number, count: number): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": BUSINESS_ID,
    name: "BM klus BV",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.toFixed(1),
      reviewCount: count,
      bestRating: "5",
      worstRating: "1",
    },
  }).replace(/</g, "\\u003c")
}

"use client"

import { useEffect, useState } from "react"
import { fetchRating, getCachedRating } from "@/lib/google-place-cache"

const BUSINESS_ID = "https://bm-klus-bv.nl/#business"

/**
 * Injects AggregateRating structured data (JSON-LD) using live
 * Google Places data. Uses Essentials-tier fetch (rating + count only),
 * cached in localStorage for 24 h — effectively zero cost.
 *
 * Googlebot renders JavaScript and will pick up the injected schema.
 */
export default function GoogleAggregateRatingJsonLd() {
  const [json, setJson] = useState<string | null>(() => {
    const init = getCachedRating()
    return init && init.reviewCount > 0 ? buildJson(init.rating, init.reviewCount) : null
  })

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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.toFixed(1),
      reviewCount: count,
      bestRating: "5",
      worstRating: "1",
    },
  }).replace(/</g, "\\u003c")
}

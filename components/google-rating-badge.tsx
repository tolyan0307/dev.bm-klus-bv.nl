"use client"

import { useEffect, useState } from "react"
import { fetchPlace, getCachedPlace } from "@/lib/google-place-cache"

const _fbRating = parseFloat(process.env.NEXT_PUBLIC_GOOGLE_RATING ?? "4.8")
const _fbCount = parseInt(process.env.NEXT_PUBLIC_GOOGLE_REVIEW_COUNT ?? "23", 10)

type Format = "display" | "short" | "trust" | "count" | "stat-desc"

function fmt(rating: number, count: number, f: Format): string {
  const r = rating.toFixed(1)
  switch (f) {
    case "display":
      return `${r} / 5`
    case "short":
      return `${r}/5 · ${count} reviews`
    case "trust":
      return `${r}★ Google reviews (${count})`
    case "count":
      return `${count}`
    case "stat-desc":
      return `Google · ${r} ★`
  }
}

/**
 * Lightweight client component that renders live Google rating data.
 *
 * On first render it shows build-time fallback values (from env vars).
 * Once the shared Google Place cache resolves, the text updates to
 * real API data. All `<GoogleRatingBadge>` instances on a page share
 * a single API call via `lib/google-place-cache.ts`.
 */
export default function GoogleRatingBadge({ format }: { format: Format }) {
  const init = getCachedPlace()

  const [text, setText] = useState(() =>
    fmt(init?.rating ?? _fbRating, init?.reviewCount ?? _fbCount, format),
  )

  useEffect(() => {
    fetchPlace().then((data) => {
      if (data) setText(fmt(data.rating, data.reviewCount, format))
    })
  }, [format])

  return <>{text}</>
}

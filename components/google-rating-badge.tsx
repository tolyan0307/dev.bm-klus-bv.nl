"use client"

import { useEffect, useState } from "react"
import { fetchRating, getCachedRating } from "@/lib/google-place-cache"

type Format = "short" | "trust" | "count" | "stat-desc"

function fmt(rating: number, count: number, f: Format): string {
  const r = rating.toFixed(1)
  switch (f) {
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

function neutralFallback(f: Format): string {
  switch (f) {
    case "short":
      return "Google reviews"
    case "trust":
      return "Google reviews"
    case "count":
      return "–"
    case "stat-desc":
      return "Google reviews"
  }
}

/**
 * Lightweight client component that renders live Google rating data.
 *
 * On first render it shows a neutral placeholder (no fake numbers).
 * Once the shared Google Place cache resolves, the text updates to
 * real API data. If the API fails, the neutral text stays.
 * All `<GoogleRatingBadge>` instances on a page share
 * a single API call via `lib/google-place-cache.ts`.
 */
export default function GoogleRatingBadge({ format }: { format: Format }) {
  const init = getCachedRating()

  const [text, setText] = useState(() =>
    init ? fmt(init.rating, init.reviewCount, format) : neutralFallback(format),
  )

  useEffect(() => {
    fetchRating().then((data) => {
      if (data) setText(fmt(data.rating, data.reviewCount, format))
    })
  }, [format])

  return <>{text}</>
}

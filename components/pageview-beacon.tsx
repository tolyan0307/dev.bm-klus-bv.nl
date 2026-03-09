"use client"

import { useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"

const API_BASE =
  process.env.NEXT_PUBLIC_CONTACT_API_BASE?.replace(/\/+$/, "") ?? ""
const ENDPOINT = `${API_BASE}/wp-json/bm-stats/v1/pageview`

function send(url: string, referrer: string) {
  const body = JSON.stringify({ url, referrer })

  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" })
    if (navigator.sendBeacon(ENDPOINT, blob)) return
  }

  fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {})
}

export default function PageviewBeacon() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    send(window.location.href, document.referrer)
  }, [pathname, searchParams])

  return null
}

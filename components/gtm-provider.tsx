"use client"

import { useEffect } from "react"

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID
const LOAD_DELAY_MS = 3500

export function GtmProvider() {
  useEffect(() => {
    if (!GTM_ID) return

    let initialized = false

    function loadGTM() {
      if (initialized) return
      initialized = true

      const script = document.createElement("script")
      script.async = true
      script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
      script.onload = () => {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          event: "gtm.js",
          "gtm.start": Date.now(),
          "gtm.uniqueEventId": 0,
        })
      }
      document.head.appendChild(script)
    }

    function onInteraction(e: Event) {
      loadGTM()
      e.currentTarget?.removeEventListener(e.type, onInteraction)
    }

    const triggers = ["scroll", "pointerdown", "keydown", "touchstart", "mousemove"] as const
    triggers.forEach((ev) => {
      document.addEventListener(ev, onInteraction, { passive: true })
    })

    const timer = setTimeout(loadGTM, LOAD_DELAY_MS)

    return () => {
      clearTimeout(timer)
      triggers.forEach((ev) => {
        document.removeEventListener(ev, onInteraction)
      })
    }
  }, [])

  if (!GTM_ID) return null

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  )
}

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

export function trackEvent(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && "dataLayer" in window) {
    window.dataLayer.push({ event, ...params })
  }
}

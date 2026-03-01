"use client"

import Link from "next/link"
import { Phone, ArrowRight, X } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function StickyCTABar() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const lastScroll = useRef(0)

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY
      // Show after scrolling 400px past hero, hide if scrolling back up fast
      if (y > 400 && !dismissed) {
        setVisible(true)
      }
      // Hide when user reaches the very bottom (footer area)
      const nearBottom = y + window.innerHeight >= document.body.scrollHeight - 120
      if (nearBottom) setVisible(false)
      lastScroll.current = y
    }
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [dismissed])

  if (dismissed || !visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      role="complementary"
      aria-label="Snelle contactbalk"
    >
      {/* subtle top shadow line */}
      <div className="h-px bg-border/60" />

      <div className="bg-background/95 px-4 pb-safe-area-inset-bottom pt-3 pb-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">

          {/* Phone button */}
          <a
            href="tel:+31612079808"
            className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-bold text-foreground transition-colors active:bg-muted"
            aria-label="Bel ons direct"
          >
            <Phone className="h-4 w-4 text-primary" />
            <span className="hidden xs:inline">Bellen</span>
          </a>

          {/* Primary CTA */}
          <Link
            href="/contact/"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-opacity active:opacity-90"
          >
            Plan gratis inspectie
            <ArrowRight className="h-4 w-4" />
          </Link>

          {/* Dismiss */}
          <button
            onClick={() => setDismissed(true)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors active:bg-muted"
            aria-label="Sluit balk"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

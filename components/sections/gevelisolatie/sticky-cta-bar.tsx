"use client"

import { Phone, ArrowRight, X, MessageCircle } from "lucide-react"
import { useState, useEffect, useRef } from "react"

const WA_URL =
  "https://wa.me/31612079808?text=Hallo%2C%20ik%20heb%20interesse%20in%20gevelisolatie.%20Kunt%20u%20mij%20meer%20informatie%20geven%3F"

export default function StickyCTABar() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const lastScroll = useRef(0)

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY
      if (y > 400 && !dismissed) {
        setVisible(true)
      }
      const nearBottom =
        y + window.innerHeight >= document.body.scrollHeight - 120
      if (nearBottom) setVisible(false)
      lastScroll.current = y
    }
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [dismissed])

  if (dismissed || !visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50"
      role="complementary"
      aria-label="Snelle contactbalk"
    >
      {/* Mobile layout */}
      <div className="border-t border-border/30 bg-background/90 px-4 pb-4 pt-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-2">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#25D366]/40 bg-[#25D366]/10 transition-transform active:scale-95"
            aria-label="WhatsApp ons"
          >
            <MessageCircle className="h-4 w-4 text-[#25D366]" strokeWidth={1.5} />
          </a>

          <a
            href="tel:+31612079808"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors active:bg-muted"
            aria-label="Bel ons"
          >
            <Phone className="h-4 w-4 text-muted-foreground" />
          </a>

          <a
            href="#offerte"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-opacity active:opacity-90"
          >
            Offerte aanvragen
            <ArrowRight className="h-4 w-4" />
          </a>

          <button
            onClick={() => setDismissed(true)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors active:bg-muted"
            aria-label="Sluit balk"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Desktop layout — light frosted glass */}
      <div className="hidden lg:block">
        <div className="border-t border-border/20 bg-background/75 backdrop-blur-xl backdrop-saturate-150">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-8 py-3.5">
            <p className="text-sm font-medium text-foreground/50">
              <span className="font-bold text-foreground/80">
                Buitengevelisolatie vanaf €110/m²
              </span>{" "}
              — stuur ons een bericht voor een vrijblijvende offerte
            </p>
            <div className="flex items-center gap-3">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 rounded-lg border border-border/40 bg-card/60 px-4 py-2.5 text-sm font-semibold text-foreground/70 transition-all hover:border-border hover:bg-card"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#25D366]/30 bg-[#25D366]/10 transition-transform group-hover:scale-110">
                  <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" strokeWidth={1.5} />
                </span>
                WhatsApp
              </a>
              <a
                href="#offerte"
                className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:bg-[#d0540a]"
              >
                Offerte aanvragen
                <ArrowRight className="h-4 w-4" />
              </a>
              <button
                onClick={() => setDismissed(true)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-foreground/20 transition-colors hover:bg-secondary hover:text-foreground/50"
                aria-label="Sluit balk"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

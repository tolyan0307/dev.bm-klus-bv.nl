"use client"

import { Phone, ArrowRight, X, MessageCircle } from "lucide-react"
import { useState, useEffect } from "react"

const WA_URL =
  "https://wa.me/31612079808?text=Hallo%2C%20ik%20heb%20interesse%20in%20gevelisolatie.%20Kunt%20u%20mij%20meer%20informatie%20geven%3F"

export default function StickyCTABar() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (dismissed) return

    const hero = document.querySelector<HTMLElement>('[aria-label="Hero"]')
    let showAfter = window.innerHeight * 0.8

    if (hero) {
      const next = hero.nextElementSibling as HTMLElement | null
      const target = next || hero
      const rect = target.getBoundingClientRect()
      showAfter = rect.bottom + window.scrollY
    }

    const footer = document.querySelector("footer")

    const handler = () => {
      const pastHero = window.scrollY > showAfter
      const beforeFooter = !footer || footer.getBoundingClientRect().top > window.innerHeight
      setVisible(pastHero && beforeFooter)
    }

    window.addEventListener("scroll", handler, { passive: true })
    handler()
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
      <div className="border-t border-border/20 bg-background/85 px-4 pb-4 pt-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-2">
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#25D366]/30 bg-[#25D366]/5 transition-transform active:scale-95"
            aria-label="WhatsApp ons"
          >
            <MessageCircle className="h-4 w-4 text-[#25D366]" strokeWidth={1.5} />
          </a>

          <a
            href="tel:+31612079808"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/50 transition-colors active:bg-muted"
            aria-label="Bel ons"
          >
            <Phone className="h-4 w-4 text-muted-foreground" />
          </a>

          <a
            href="#offerte"
            className="flex min-w-0 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-primary/40 px-5 py-2 text-sm font-semibold text-primary transition-colors active:bg-primary/5"
          >
            Offerte aanvragen
            <ArrowRight className="h-3.5 w-3.5 shrink-0" />
          </a>

          <button
            onClick={() => setDismissed(true)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground/40 transition-colors active:bg-muted"
            aria-label="Sluit balk"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:block">
        <div className="border-t border-border/15 bg-background/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-end gap-3 px-8 py-3">
            <a
              href="tel:+31612079808"
              className="flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm text-foreground/45 transition-colors hover:text-foreground/70"
            >
              <Phone className="h-3.5 w-3.5" />
              +31 6 12 07 98 08
            </a>
            <span className="h-4 w-px bg-border/30" />
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm text-foreground/45 transition-colors hover:text-foreground/70"
            >
              <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" strokeWidth={1.5} />
              WhatsApp
            </a>
            <span className="h-4 w-px bg-border/30" />
            <a
              href="#offerte"
              className="flex items-center gap-1.5 rounded-lg border border-primary/30 px-4 py-2 text-sm font-medium text-primary transition-all hover:border-primary/50 hover:bg-primary/5"
            >
              Offerte aanvragen
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <button
              onClick={() => setDismissed(true)}
              className="ml-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-foreground/15 transition-colors hover:text-foreground/40"
              aria-label="Sluit balk"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

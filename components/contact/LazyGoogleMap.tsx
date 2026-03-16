"use client"

import { useState } from "react"
import { MapPin, ExternalLink } from "lucide-react"

const EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2461.7!2d4.4663!3d51.9008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBonaventurastraat+58B%2C+3081+HE+Rotterdam!5e0!3m2!1snl!2snl!4v1"

const MAPS_LINK =
  "https://www.google.com/maps?q=Bonaventurastraat+58B,+3081+HE+Rotterdam"

export default function LazyGoogleMap() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative h-32 overflow-hidden border-t border-border">
      {loaded ? (
        <iframe
          src={EMBED_URL}
          className="absolute inset-0 w-full h-full border-0 grayscale"
          title="BM klus BV locatie"
          aria-label="Kaart met locatie BM klus BV"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="absolute inset-0 flex w-full cursor-pointer items-center justify-center bg-secondary/60 transition-colors hover:bg-secondary/80"
        >
          <span className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground shadow-sm">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            Toon kaart
          </span>
        </button>
      )}

      <div className="absolute inset-0 pointer-events-none bg-primary/8" />

      <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 rounded-lg bg-card/95 border border-border px-2.5 py-1.5 backdrop-blur-sm shadow-sm">
        <MapPin className="w-3 h-3 text-primary shrink-0" />
        <span className="text-[11px] font-semibold text-foreground">
          Rotterdam
        </span>
      </div>

      <a
        href={MAPS_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2.5 right-3 flex items-center gap-1 rounded-lg bg-card/95 border border-border px-2.5 py-1.5 backdrop-blur-sm shadow-sm text-[11px] font-semibold text-primary hover:bg-primary hover:text-white hover:border-primary transition-all"
      >
        <ExternalLink className="w-3 h-3" />
        Maps
      </a>
    </div>
  )
}

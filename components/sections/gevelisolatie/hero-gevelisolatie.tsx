"use client"

import Link from "next/link"
import { Phone, ArrowRight, CheckCircle2, MapPin } from "lucide-react"

const checks = [
  "Gratis opname ter plaatse (24–48 uur reactie)",
  "Gecertificeerde ETICS-systemen en materialen",
  "Advies over subsidie & vergunning (waar nodig)",
]

export default function GevelisolatieHero() {
  return (
    <section
      className="relative flex flex-col overflow-hidden"
      style={{
        background:
          "linear-gradient(175deg, #1A1A1A 0%, #2E2016 35%, #7A4520 60%, #C47A3A 78%, #F5EFE6 100%)",
      }}
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-end">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 sm:pt-40 lg:pt-44">
          <div className="flex">

            {/* text */}
            <div className="flex flex-col gap-6 pb-16 sm:pb-20 lg:pb-24 max-w-2xl">
              <p className="text-[#E8600A] text-xs font-bold tracking-[0.25em] uppercase">
                Gevelisolatie &amp; Renovatie · Rotterdam
              </p>

              <h1 className="text-balance text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-[3.75rem]">
                Buitengevelisolatie (ETICS):{" "}
                <span className="text-[#E8600A] decoration-[#E8600A]/40 underline decoration-[3px] underline-offset-4">
                  uw gevel perfect geïsoleerd
                      </span>{" "}
                &amp; vernieuwd
              </h1>

              <p className="mt-5 max-w-md text-base leading-relaxed text-white/80 sm:mt-6 sm:text-lg lg:text-xl">
                Gevelisolatie aan de buitenkant (ETICS) voor woningen en bedrijfspanden — met afwerking in stuc, sierpleister, crepi of steenstrips. Energiebesparend, duurzaam en direct zichtbaar resultaat.
              </p>

              <div className="flex flex-col gap-2.5">
                {checks.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 size={15} className="text-[#E8600A] shrink-0" />
                    <span className="text-sm text-white/70">{item}</span>
                  </div>
                ))}
              </div>

              {/* Werkgebied */}
              <div className="flex items-center gap-2 border-t border-white/10 pt-4">
                <MapPin size={13} className="shrink-0 text-[#E8600A]" />
                <span className="text-xs text-white/70">
                  Regio Rotterdam en omgeving (±80–100 km), Zuid-Holland en omliggende regio's.
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/contact/"
                  className="inline-flex items-center justify-center gap-2 bg-[#E8600A] text-white font-semibold px-7 py-4 text-sm tracking-wide hover:bg-[#d0540a] transition-colors rounded-sm"
                >
                  Offerte aanvragen
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/onze-werken/"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/25 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/20 tracking-wide"
                >
                  Voorbeelden bekijken
                </Link>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Phone size={14} className="text-[#E8600A]" />
                <a
                  href="tel:+31612079808"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  +31 6 1207 9808
                </a>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

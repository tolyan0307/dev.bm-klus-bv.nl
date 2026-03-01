import Image from "next/image"
import { MessageCircle, ArrowRight, CheckCircle2, MapPin, Star, Phone } from "lucide-react"
import type { ReactNode } from "react"

const WA_URL =
  "https://wa.me/31612079808?text=Hallo%2C%20ik%20heb%20interesse%20in%20gevelisolatie.%20Kunt%20u%20mij%20meer%20informatie%20geven%3F"

const checks = [
  "Gratis opname ter plaatse",
  "Gecertificeerde ETICS-systemen",
  "Advies over subsidie & vergunning",
]

export default function GevelisolatieHero({
  breadcrumbs,
}: {
  breadcrumbs?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-[#1A1A1A]">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/gevelisolatie-hero.webp"
          alt="Buitengevelisolatie (ETICS) afgewerkt met sierpleister op een woning in regio Rotterdam"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/95 via-[#1A1A1A]/75 to-[#1A1A1A]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 via-transparent to-[#1A1A1A]/30" />
      </div>

      {/* Breadcrumbs */}
      {breadcrumbs && <div className="relative z-10">{breadcrumbs}</div>}

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pb-14 pt-8 sm:pb-16 lg:pb-20 lg:pt-10">

          <div className="flex max-w-2xl flex-col gap-5">
            <p className="text-[#EA6C20] text-xs font-bold tracking-[0.25em] uppercase">
              Gevelisolatie specialist · Regio Rotterdam
            </p>

            <h1 className="text-balance text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl">
              Buitengevelisolatie{" "}
              <span className="text-[#EA6C20]">(ETICS)</span>
              <br />
              <span className="text-white/90">prijs per m² na gratis opname</span>
            </h1>

            <p className="max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
              Isolatie + afwerking in stuc, sierpleister, crepi of steenstrips.
              Energiebesparend, duurzaam en direct zichtbaar resultaat.
            </p>

            {/* Price teaser */}
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-[#EA6C20]/15 px-3 py-1.5 text-sm font-bold text-[#EA6C20] ring-1 ring-[#EA6C20]/25">
                Vanaf €110/m²
              </span>
              <span className="text-xs text-white/50">
                incl. arbeid & materiaal · excl. steiger
              </span>
            </div>

            {/* Trust bullets */}
            <div className="flex flex-col gap-2">
              {checks.map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle2
                    size={15}
                    className="shrink-0 text-[#EA6C20]"
                  />
                  <span className="text-sm text-white/70">{item}</span>
                </div>
              ))}
            </div>

            {/* Werkgebied */}
            <div className="flex items-center gap-2 border-t border-white/10 pt-4">
              <MapPin size={13} className="shrink-0 text-[#EA6C20]" />
              <span className="text-xs text-white/60">
                Rotterdam, Den Haag, Delft, Dordrecht en omgeving (±80–100 km)
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
              <a
                href="#offerte"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#EA6C20] px-7 py-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#d0540a]"
              >
                Offerte aanvragen
                <ArrowRight size={16} />
              </a>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-lg border border-white/20 bg-white/[0.08] px-7 py-4 text-sm font-semibold tracking-wide text-white backdrop-blur-md transition-all hover:border-white/35 hover:bg-white/[0.14]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#25D366]/50 bg-[#25D366]/15 transition-transform group-hover:scale-110">
                  <MessageCircle size={14} className="text-[#25D366]" strokeWidth={1.5} />
                </span>
                WhatsApp
              </a>
            </div>

            {/* Phone — passive text link */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-[#FBBC05] text-[#FBBC05]"
                    />
                  ))}
                </div>
                <span className="text-xs font-medium text-white/60">
                  4.8/5 · 23+ reviews
                </span>
              </div>
              <span className="h-3 w-px bg-white/20" />
              <a
                href="tel:+31612079808"
                className="flex items-center gap-1.5 text-xs text-white/50 transition-colors hover:text-white/80"
              >
                <Phone size={12} />
                +31 6 1207 9808
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

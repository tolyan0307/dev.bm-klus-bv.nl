"use client"

// FUTURE EXTRACTION TARGET: stays on pillar for now
import Image from "next/image"
import { detailsKoudebruggenContent } from "@/lib/content/gevelisolatie"
import { Check } from "lucide-react"
import { useState } from "react"

const subsectionImages: string[] = [
  "/images/detail-dagkanten.webp",
  "/images/detail-plint.webp",
  "/images/detail-hoeken.webp",
  "/images/detail-koudebruggen.webp",
]

export default function DetailsKoudebruggenSection() {
  const data = detailsKoudebruggenContent
  const [active, setActive] = useState(0)
  const current = data.subsections[active]

  return (
    <section id={data.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">

      {/* ── Header — стандарт ── */}
      <div className="mb-4 flex items-center gap-3">
        <div className="h-px w-10 bg-primary" />
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          ETICS-details
        </span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        Dagkanten, plint{" "}
        <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
          en koudebruggen
        </span>
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        {data.intro}
      </p>

      {/* ── Tab selectors ── */}

      {/* Mobile: 2×2 photo grid */}
      <div className="mt-10 grid grid-cols-2 gap-2 sm:hidden">
        {data.subsections.map((sub, i) => (
          <button
            key={sub.h3}
            onClick={() => setActive(i)}
            className={`group relative h-24 overflow-hidden rounded-xl border-2 transition-all ${
              active === i ? "border-primary" : "border-transparent"
            }`}
          >
            <Image
              src={subsectionImages[i]}
              alt={sub.h3}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="50vw"
            />
            <div className={`absolute inset-0 transition-colors ${active === i ? "bg-primary/50" : "bg-black/45"}`} />
            <span className="absolute inset-x-2 bottom-2 text-center text-xs font-bold leading-tight text-white">
              {sub.h3.split("&")[0].trim()}
            </span>
            {active === i && (
              <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                <Check className="h-3 w-3 text-white" strokeWidth={3} />
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Desktop: pill tabs */}
      <div className="mt-10 hidden flex-wrap gap-2 sm:flex" role="tablist" aria-label="ETICS-details">
        {data.subsections.map((sub, i) => (
          <button
            key={sub.h3}
            role="tab"
            aria-selected={active === i}
            aria-controls={`detail-panel-${i}`}
            id={`detail-tab-${i}`}
            onClick={() => setActive(i)}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
              active === i
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            <span className={`text-[10px] font-black tabular-nums ${active === i ? "text-white/50" : "text-border"}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            {sub.h3}
          </button>
        ))}
      </div>

      {/* ── Active card with photo ── */}
      <div
        className="mt-4 overflow-hidden rounded-2xl border border-border bg-card"
        role="tabpanel"
        id={`detail-panel-${active}`}
        aria-labelledby={`detail-tab-${active}`}
      >
        <div className="grid grid-rows-[220px_1fr] lg:grid-rows-none lg:grid-cols-[420px_1fr]">

          {/* Photo */}
          <div className="relative overflow-hidden">
            <Image
              src={subsectionImages[active]}
              alt={current.h3}
              fill
              className="object-cover transition-all duration-500"
              sizes="(max-width: 1024px) 100vw, 420px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r" />
            {/* label overlay on mobile */}
            <div className="absolute bottom-4 left-4 lg:hidden">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                {current.h3}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-5 p-6 lg:p-8">

            {/* Title + tekst */}
            <div>
              <h3 className="hidden text-xl font-bold text-foreground lg:block">{current.h3}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base lg:mt-3">
                {current.tekst}
              </p>
            </div>

            {/* Bullets */}
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                Aandachtspunten
              </p>
              <ul className="space-y-3">
                {current.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                    </div>
                    <span className="text-sm leading-snug text-foreground/70">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

"use client"

import { Check } from "lucide-react"
import { useState } from "react"

export interface DetailsSubsection {
  h3: string
  tekst: string
  bullets: string[]
  imgSrc: string
  imgSrcSet: string
}

export interface DetailsKoudebruggenInteractiveProps {
  id: string
  intro: string
  subsections: DetailsSubsection[]
}

export default function DetailsKoudebruggenInteractive({
  id,
  intro,
  subsections,
}: DetailsKoudebruggenInteractiveProps) {
  const [active, setActive] = useState(0)
  const current = subsections[active]

  return (
    <section id={id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">

      {/* ── Header ── */}
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
        {intro}
      </p>

      {/* ── Mobile: 2×2 photo grid ── */}
      <div className="mt-10 grid grid-cols-2 gap-2 sm:hidden">
        {subsections.map((sub, i) => (
          <button
            key={sub.h3}
            onClick={() => setActive(i)}
            className={`group relative h-24 overflow-hidden rounded-xl border-2 transition-all ${
              active === i ? "border-primary" : "border-transparent"
            }`}
          >
            <img
              src={sub.imgSrc}
              srcSet={sub.imgSrcSet}
              sizes="50vw"
              alt={sub.h3}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
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

      {/* ── Desktop: pill tabs ── */}
      <div className="mt-10 hidden flex-wrap gap-2 sm:flex" role="tablist" aria-label="ETICS-details">
        {subsections.map((sub, i) => (
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
            <img
              src={current.imgSrc}
              srcSet={current.imgSrcSet}
              sizes="(max-width: 1024px) 100vw, 420px"
              alt={current.h3}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r" />
            <div className="absolute bottom-4 left-4 lg:hidden">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                {current.h3}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-5 p-6 lg:p-8">
            <div>
              <h3 className="hidden text-xl font-bold text-foreground lg:block">{current.h3}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base lg:mt-3">
                {current.tekst}
              </p>
            </div>

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

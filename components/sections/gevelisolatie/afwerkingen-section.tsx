"use client"

// FUTURE EXTRACTION TARGET: /gevelisolatie/afwerkingen/
import Link from "next/link"
import Image from "next/image"
import { afwerkingenContent } from "@/lib/content/gevelisolatie"
import { Check, AlertTriangle, ArrowRight } from "lucide-react"
import { useState } from "react"

// Photo map per afwerking
const optieImages: Record<string, string> = {
  "Stucwerk": "/images/dienst-stucwerk.webp",
  "Sierpleister": "/images/dienst-sierpleister.webp",
  "Crepi": "/images/afwerking-crepi.webp",
  "Steenstrips": "/images/afwerking-steenstrips.webp",
}

// Budget indicator helpers
const budgetDots = (budget: string) => {
  const map: Record<string, number> = {
    "Laag – midden": 2,
    "Laag": 1,
    "Midden": 2,
    "Hoog": 3,
  }
  const filled = map[budget] ?? 2
  return Array.from({ length: 3 }, (_, i) => i < filled)
}

type Optie = (typeof afwerkingenContent.opties)[number]

export default function AfwerkingenSection() {
  const data = afwerkingenContent
  const [active, setActive] = useState(0)
  const current: Optie = data.opties[active]

  return (
    <section id={data.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">

      {/* ── Header — стандарт ── */}
      <div className="mb-4 flex items-center gap-3">
        <div className="h-px w-10 bg-primary" />
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          Afwerking
        </span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        Stuc, sierpleister, crepi{" "}
        <span className="text-primary">of steenstrips?</span>
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        {data.intro}
      </p>

      {/* ── Tab selectors ── */}

      {/* Mobile: 2×2 photo grid */}
      <div className="mt-10 grid grid-cols-2 gap-2 sm:hidden">
        {data.opties.map((optie, i) => (
          <button
            key={optie.h3}
            onClick={() => setActive(i)}
            className={`group relative h-24 overflow-hidden rounded-xl border-2 transition-all ${
              active === i ? "border-primary" : "border-transparent"
            }`}
          >
            <Image
              src={optieImages[optie.h3] ?? "/images/dienst-stucwerk.webp"}
              alt={optie.h3}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="50vw"
            />
            <div className={`absolute inset-0 transition-colors ${active === i ? "bg-primary/50" : "bg-black/40"}`} />
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
              {optie.h3}
            </span>
            {active === i && (
              <span className="absolute bottom-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                <Check className="h-3 w-3 text-white" strokeWidth={3} />
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Desktop: pill tabs */}
      <div className="mt-10 hidden gap-2 sm:flex" role="tablist" aria-label="Afwerkingen">
        {data.opties.map((optie, i) => (
          <button
            key={optie.h3}
            role="tab"
            aria-selected={active === i}
            aria-controls={`afwerking-panel-${i}`}
            id={`afwerking-tab-${i}`}
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
            {optie.h3}
          </button>
        ))}
      </div>

      {/* Active card with photo */}
      <div
        className="mt-4 overflow-hidden rounded-2xl border border-border bg-card"
        role="tabpanel"
        id={`afwerking-panel-${active}`}
        aria-labelledby={`afwerking-tab-${active}`}
      >
        <div className="grid grid-rows-[220px_1fr] lg:grid-rows-none lg:grid-cols-[420px_1fr]">

          {/* Photo */}
          <div className="relative overflow-hidden">
            <Image
              src={optieImages[current.h3] ?? "/images/dienst-stucwerk.webp"}
              alt={current.h3}
              fill
              className="object-cover transition-all duration-500"
              sizes="(max-width: 1024px) 100vw, 420px"
            />
            {/* dark gradient over photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r" />
            {/* name overlay on mobile */}
            <div className="absolute bottom-4 left-4 lg:hidden">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                {current.h3}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6 p-6 lg:p-8">

            {/* Title + omschrijving */}
            <div>
              <h3 className="hidden text-xl font-bold text-foreground lg:block">{current.h3}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base lg:mt-3">
                {current.omschrijving}
              </p>
            </div>

            {/* Past goed + let op */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-lg bg-primary/5 p-4">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                  <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-primary">Past goed bij</p>
                  <p className="mt-1 text-sm leading-snug text-foreground/70">{current.pastGoed}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500/70" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Let op</p>
                  <p className="mt-1 text-sm leading-snug text-foreground/70">{current.letOp}</p>
                </div>
              </div>
            </div>

            {/* Voordelen */}
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Voordelen</p>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {current.voordelen.map((v) => (
                  <li key={v} className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                    </div>
                    <span className="text-sm leading-snug text-foreground/70">{v}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* ── Vergelijkingstabel ── */}
      <div className="mt-10">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          Vergelijking op een rij
        </p>
        <div className="overflow-hidden rounded-xl border border-border">
          {/* header */}
          <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-0 border-b border-border bg-muted/40 px-5 py-3">
            {["Afwerking", "Uiterlijk", "Onderhoud", "Budget"].map((col) => (
              <span key={col} className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                {col}
              </span>
            ))}
          </div>
          {/* rows */}
          {data.vergelijkingstabel.rijen.map((rij, i) => (
            <div
              key={rij.afwerking}
              className={`grid grid-cols-[1fr_1fr_1fr_auto] gap-0 items-center px-5 py-4 transition-colors cursor-pointer ${
                active === i ? "bg-primary/5" : "hover:bg-muted/30"
              } ${i < data.vergelijkingstabel.rijen.length - 1 ? "border-b border-border" : ""}`}
              onClick={() => setActive(i)}
            >
              <span className={`text-sm font-bold ${active === i ? "text-primary" : "text-foreground"}`}>
                {rij.afwerking}
              </span>
              <span className="text-sm text-muted-foreground">{rij.uiterlijk}</span>
              <span className="text-sm text-muted-foreground">{rij.onderhoud}</span>
              {/* budget dots */}
              <div className="flex gap-1">
                {budgetDots(rij.budget).map((filled, di) => (
                  <div
                    key={di}
                    className={`h-2 w-2 rounded-full ${filled ? "bg-primary" : "bg-border"}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground/60 italic">
          Klik op een rij om de details te bekijken.
        </p>
      </div>

      {/* ── Related links ── */}
      <p className="mt-6 text-sm text-muted-foreground">
        Meer weten?{" "}
        <Link href="/gevelisolatie/afwerkingen/" className="font-semibold text-primary underline-offset-2 hover:underline">
          Alle afwerkingen vergelijken →
        </Link>
        {" · "}
        <Link href="/buiten-stucwerk/" className="font-semibold text-primary underline-offset-2 hover:underline">
          Buiten stucwerk
        </Link>
        {" · "}
        <Link href="/sierpleister/" className="font-semibold text-primary underline-offset-2 hover:underline">
          Sierpleister
        </Link>
      </p>

    </section>
  )
}

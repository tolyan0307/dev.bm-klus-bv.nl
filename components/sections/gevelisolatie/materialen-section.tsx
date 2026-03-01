"use client"

// FUTURE EXTRACTION TARGET: /gevelisolatie/materialen/
import Image from "next/image"
import Link from "next/link"
import { materialenContent } from "@/lib/content/gevelisolatie"
import { Check, AlertTriangle, Flame, Droplets, ArrowRight } from "lucide-react"
import { useState } from "react"

const materialImages: Record<string, string> = {
  "EPS":          "/images/materiaal-eps.webp",
  "PIR":          "/images/materiaal-pir.webp",
  "Minerale wol": "/images/materiaal-minerale-wol.webp",
}

const brandBadge: Record<string, { label: string; cls: string }> = {
  "A1": { label: "A1 — Onbrandbaar",           cls: "bg-green-100 text-green-700" },
  "B":  { label: "B — Moeilijk ontvlambaar",   cls: "bg-blue-100 text-blue-700" },
  "E":  { label: "E — Basis brandklasse",      cls: "bg-orange-100 text-orange-700" },
}

const lambdaScore: Record<string, number> = {
  "EPS": 2, "PIR": 3, "Minerale wol": 1,
}

const brandClass: Record<string, "A1" | "B" | "E"> = {
  "EPS": "E", "PIR": "B", "Minerale wol": "A1",
}

export default function MaterialenSection() {
  const data = materialenContent
  const [active, setActive] = useState(0)
  const current = data.vergelijkingstabel.rijen[active]
  const brand = brandBadge[brandClass[current.materiaal] ?? "E"]
  const score = lambdaScore[current.materiaal] ?? 2

  return (
    <section id={data.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">

      {/* ── Header — стандарт ── */}
      <div className="mb-4 flex items-center gap-3">
        <div className="h-px w-10 bg-primary" />
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          Materialen
        </span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        EPS, PIR{" "}
        <span className="text-primary">of minerale wol?</span>
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        {data.intro}
      </p>

      {/* ── Tab selectors ── */}

      {/* Mobile: 1×3 photo grid (3 cols) */}
      <div className="mt-10 grid grid-cols-3 gap-2 sm:hidden">
        {data.vergelijkingstabel.rijen.map((rij, i) => (
          <button
            key={rij.materiaal}
            onClick={() => setActive(i)}
            className={`group relative h-24 overflow-hidden rounded-xl border-2 transition-all ${
              active === i ? "border-primary" : "border-transparent"
            }`}
          >
            <Image
              src={materialImages[rij.materiaal] ?? "/images/materiaal-eps.webp"}
              alt={rij.materiaal}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="33vw"
            />
            <div className={`absolute inset-0 transition-colors ${active === i ? "bg-primary/50" : "bg-black/45"}`} />
            <span className="absolute inset-0 flex items-end justify-center pb-2 text-xs font-bold text-white">
              {rij.materiaal}
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
      <div className="mt-10 hidden gap-2 sm:flex" role="tablist" aria-label="Isolatiematerialen">
        {data.vergelijkingstabel.rijen.map((rij, i) => (
          <button
            key={rij.materiaal}
            role="tab"
            aria-selected={active === i}
            aria-controls={`materiaal-panel-${i}`}
            id={`materiaal-tab-${i}`}
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
            {rij.materiaal}
          </button>
        ))}
      </div>

      {/* ── Active card with photo ── */}
      <div
        className="mt-4 overflow-hidden rounded-2xl border border-border bg-card"
        role="tabpanel"
        id={`materiaal-panel-${active}`}
        aria-labelledby={`materiaal-tab-${active}`}
      >
        <div className="grid grid-rows-[220px_1fr] lg:grid-rows-none lg:grid-cols-[420px_1fr]">

          {/* Photo */}
          <div className="relative overflow-hidden">
            <Image
              src={materialImages[current.materiaal] ?? "/images/materiaal-eps.webp"}
              alt={current.materiaal}
              fill
              className="object-cover transition-all duration-500"
              sizes="(max-width: 1024px) 100vw, 420px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r" />
            {/* name + lambda overlay on mobile */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 lg:hidden">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                {current.materiaal}
              </span>
              <span className="rounded-full bg-black/50 px-2.5 py-1 text-xs font-bold text-white">
                λ {current.lambda}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-5 p-6 lg:p-8">

            {/* Title + badges row */}
            <div>
              <h3 className="hidden text-xl font-bold text-foreground lg:block">{current.materiaal}</h3>
              <div className="mt-2 flex flex-wrap gap-2 lg:mt-3">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${brand.cls}`}>
                  <Flame className="h-3 w-3" />
                  {brand.label}
                </span>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                  current.dampopen === "Ja" ? "bg-teal-100 text-teal-700" : "bg-muted text-muted-foreground"
                }`}>
                  <Droplets className="h-3 w-3" />
                  {current.dampopen === "Ja" ? "Dampopen" : `Dampopen: ${current.dampopen}`}
                </span>
                {/* isolatiewaarde dots */}
                <span className="ml-auto flex items-center gap-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">λ {current.lambda}</span>
                  <div className="flex gap-1">
                    {Array.from({ length: 3 }, (_, di) => (
                      <div key={di} className={`h-2 w-5 rounded-full ${di < score ? "bg-primary" : "bg-border"}`} />
                    ))}
                  </div>
                </span>
              </div>
            </div>

            {/* Wanneer kiezen */}
            <div>
              <p className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Wanneer kiezen</p>
              <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">{current.wanneer}</p>
            </div>

            {/* Pluspunt + Aandachtspunt */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-lg bg-primary/5 p-4">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                  <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-primary">Pluspunt</p>
                  <p className="mt-1 text-sm leading-snug text-foreground/70">{current.pluspunt}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500/70" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Aandachtspunt</p>
                  <p className="mt-1 text-sm leading-snug text-foreground/70">{current.aandachtspunt}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Systeemopbouw — layered stack ── */}
      <div className="mt-10">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          {data.systeemopbouw.h3}
        </p>
        <div className="space-y-1.5">
          {data.systeemopbouw.lagen.map((laag, i) => {
            const isIsolatie = i === 2
            return (
              <div
                key={i}
                className={`flex items-center gap-4 rounded-lg px-4 py-3 ${
                  isIsolatie
                    ? "border-2 border-primary bg-primary/5"
                    : "border border-border bg-muted/20"
                }`}
              >
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-black ${
                  isIsolatie ? "bg-primary text-white" : "bg-border text-muted-foreground"
                }`}>
                  {i + 1}
                </span>
                <span className={`text-sm ${isIsolatie ? "font-semibold text-foreground" : "text-foreground/70"}`}>
                  {laag}
                </span>
                {isIsolatie && (
                  <span className="ml-auto rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-bold text-white">
                    {current.materiaal}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Related links ── */}
      <p className="mt-6 text-sm text-muted-foreground">
        Meer weten?{" "}
        <Link href="/gevelisolatie/materialen/" className="font-semibold text-primary underline-offset-2 hover:underline">
          Uitgebreide materialenvergelijking →
        </Link>
        {" · "}
        <Link href="/gevelisolatie/rc-waarde-dikte/" className="font-semibold text-primary underline-offset-2 hover:underline">
          Welke dikte bij uw Rc-waarde?
        </Link>
      </p>

    </section>
  )
}

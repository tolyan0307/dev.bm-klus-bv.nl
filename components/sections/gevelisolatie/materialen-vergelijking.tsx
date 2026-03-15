"use client"

import { useState } from "react"
import { Check, AlertTriangle, Flame, Droplets } from "lucide-react"

export interface MaterialenItem {
  materiaal: string
  lambda: string
  brandKey: "A1" | "B" | "E"
  brandLabel: string
  brandCls: string
  dampopen: string
  dampLabel: string
  dampCls: string
  wanneer: string
  pluspunt: string
  aandachtspunt: string
  beschrijving: string
  lambdaScore: number
  imgSrc: string
  imgSrcSet: string
}

interface Props {
  items: MaterialenItem[]
}

export default function MaterialenVergelijking({ items }: Props) {
  const [activeTab, setActiveTab] = useState(0)
  const current = items[activeTab]

  return (
    <>
      {/* Mobile: 1×3 photo grid */}
      <div className="mt-6 grid grid-cols-3 gap-2 sm:hidden">
        {items.map((mat, i) => (
          <button
            key={mat.materiaal}
            onClick={() => setActiveTab(i)}
            className={`group relative h-24 overflow-hidden rounded-xl border-2 transition-all ${activeTab === i ? "border-primary" : "border-transparent"}`}
          >
            <img
              src={mat.imgSrc}
              srcSet={mat.imgSrcSet || undefined}
              sizes="33vw"
              alt={mat.materiaal}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className={`absolute inset-0 transition-colors ${activeTab === i ? "bg-primary/50" : "bg-black/45"}`} />
            <span className="absolute inset-0 flex items-end justify-center pb-2 text-xs font-bold text-white">
              {mat.materiaal}
            </span>
            {activeTab === i && (
              <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                <Check className="h-3 w-3 text-white" strokeWidth={3} />
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Desktop: pill tabs */}
      <div className="mt-6 hidden gap-2 sm:flex">
        {items.map((mat, i) => (
          <button
            key={mat.materiaal}
            onClick={() => setActiveTab(i)}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === i
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            <span className={`text-[10px] font-black tabular-nums ${activeTab === i ? "text-white/70" : "text-border"}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            {mat.materiaal}
          </button>
        ))}
      </div>

      {/* Active card */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-border/60 bg-card/80">
        <div className="grid grid-rows-[220px_1fr] lg:grid-rows-none lg:grid-cols-[420px_1fr]">
          {/* Photo */}
          <div className="relative overflow-hidden">
            <img
              src={current.imgSrc}
              srcSet={current.imgSrcSet || undefined}
              sizes="(max-width: 1024px) 100vw, 420px"
              alt={current.materiaal}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent lg:bg-linear-to-r" />
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
            <div>
              <h3 className="hidden text-xl font-bold text-foreground lg:block">{current.materiaal}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {current.beschrijving}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${current.brandCls}`}>
                  <Flame className="h-3 w-3" />
                  {current.brandLabel}
                </span>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${current.dampCls}`}>
                  <Droplets className="h-3 w-3" />
                  {current.dampLabel}
                </span>
                <span className="ml-auto flex items-center gap-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">λ {current.lambda}</span>
                  <div className="flex gap-1">
                    {Array.from({ length: 3 }, (_, di) => (
                      <div key={di} className={`h-2 w-5 rounded-full ${di < current.lambdaScore ? "bg-primary" : "bg-border"}`} />
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

            {/* Plus/aandacht */}
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
    </>
  )
}

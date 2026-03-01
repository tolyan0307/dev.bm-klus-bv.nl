"use client"

import { useState } from "react"
import { ArrowRight, Info } from "lucide-react"

const woningTypes = [
  { label: "Rijtjeshuis", m2: 60, icon: "🏠" },
  { label: "Hoekwoning", m2: 65, icon: "🏡" },
  { label: "2-onder-1-kap", m2: 100, icon: "🏘" },
  { label: "Vrijstaand", m2: 150, icon: "🏛" },
] as const

const afwerkingen = [
  { label: "Sierpleister / crepi", prijsMin: 110, prijsMax: 165 },
  { label: "Glad stucwerk", prijsMin: 120, prijsMax: 180 },
  { label: "Steenstrips", prijsMin: 200, prijsMax: 280 },
] as const

export default function KostenCalculator() {
  const [woningIdx, setWoningIdx] = useState(0)
  const [afwerkingIdx, setAfwerkingIdx] = useState(0)

  const woning = woningTypes[woningIdx]
  const afwerking = afwerkingen[afwerkingIdx]
  const totaalMin = woning.m2 * afwerking.prijsMin
  const totaalMax = woning.m2 * afwerking.prijsMax

  const fmt = (n: number) =>
    n.toLocaleString("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 })

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-primary/20 bg-card">
      <div className="border-b border-border bg-primary/[0.03] px-6 py-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-primary">
          Indicatieve prijscalculator
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Selecteer uw woningtype en afwerking voor een globale indicatie.
        </p>
      </div>

      <div className="grid gap-6 p-6 lg:grid-cols-[1fr_1px_1fr_1px_auto]">
        {/* Woningtype */}
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Woningtype
          </p>
          <div className="grid grid-cols-2 gap-2">
            {woningTypes.map((w, i) => (
              <button
                key={w.label}
                onClick={() => setWoningIdx(i)}
                className={`flex flex-col items-center gap-1 rounded-lg border p-3 text-center transition-all ${
                  woningIdx === i
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                    : "border-border hover:border-primary/30"
                }`}
              >
                <span className="text-lg">{w.icon}</span>
                <span className={`text-xs font-semibold ${woningIdx === i ? "text-primary" : "text-foreground/70"}`}>
                  {w.label}
                </span>
                <span className="text-[10px] text-muted-foreground">±{w.m2} m²</span>
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="hidden bg-border lg:block" />

        {/* Afwerking */}
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Afwerking
          </p>
          <div className="flex flex-col gap-2">
            {afwerkingen.map((a, i) => (
              <button
                key={a.label}
                onClick={() => setAfwerkingIdx(i)}
                className={`flex items-center justify-between rounded-lg border px-4 py-3 transition-all ${
                  afwerkingIdx === i
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                    : "border-border hover:border-primary/30"
                }`}
              >
                <span className={`text-sm font-semibold ${afwerkingIdx === i ? "text-primary" : "text-foreground/70"}`}>
                  {a.label}
                </span>
                <span className="text-xs text-muted-foreground">
                  €{a.prijsMin}–{a.prijsMax}/m²
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="hidden bg-border lg:block" />

        {/* Result */}
        <div className="flex flex-col justify-center rounded-xl bg-primary/[0.04] p-5 lg:min-w-[200px]">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Indicatie totaal
          </p>
          <p className="mt-2 text-2xl font-black tabular-nums text-foreground">
            {fmt(totaalMin)} – {fmt(totaalMax)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {woning.label} · ±{woning.m2} m² · {afwerking.label}
          </p>
          <a
            href="#offerte"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-[#d0540a]"
          >
            Exacte offerte aanvragen
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 border-t border-border bg-muted/20 px-6 py-3">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
        <p className="text-[11px] leading-relaxed text-muted-foreground/70">
          Indicatieve richtprijzen, incl. arbeid & materiaal, excl. steiger, herstel en complexe detaillering.
          Exacte prijs na gratis opname ter plaatse.
        </p>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"

const lambdaValues: Record<string, number> = {
  EPS: 0.038,
  PIR: 0.026,
  "Minerale wol": 0.035,
}

const opbouwOpslag: Record<string, number> = {
  EPS: 3,
  PIR: 3,
  "Minerale wol": 4,
}

const RC_MIN = 1.5
const RC_MAX = 6.0
const RC_STEP = 0.5
const RC_OPTIONS = Array.from(
  { length: Math.round((RC_MAX - RC_MIN) / RC_STEP) + 1 },
  (_, i) => +(RC_MIN + i * RC_STEP).toFixed(1),
)
const materialen = Object.keys(lambdaValues)

function calcDikte(rc: number, mat: string) {
  const lambda = lambdaValues[mat] ?? 0.038
  const mm = rc * lambda * 1000
  return Math.round(mm / 5) * 5
}

function rcLabel(rc: number): { label: string; cls: string } {
  if (rc < 2.5) {
    return { label: "Renovatie min.", cls: "bg-muted text-muted-foreground" }
  }
  if (rc < 3.5) {
    return { label: "Basis", cls: "bg-muted text-muted-foreground" }
  }
  if (rc < 4.7) {
    return { label: "Subsidie (check)", cls: "bg-primary/10 text-primary" }
  }
  if (rc < 5.5) {
    return { label: "Nieuwbouw ✓", cls: "bg-primary/20 text-primary" }
  }
  return { label: "Premium", cls: "bg-primary text-primary-foreground" }
}

export default function RcWaardeDikteCalculator() {
  const [rc, setRc] = useState(3.5)
  const badge = rcLabel(rc)
  const pct = ((rc - RC_MIN) / (RC_MAX - RC_MIN)) * 100

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/80">
        <div className="border-b border-border px-6 py-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                Gewenste Rc-waarde
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-5xl font-black tabular-nums text-foreground">
                  {rc.toFixed(1)}
                </span>
                <span className="text-lg font-semibold text-muted-foreground">
                  m²K/W
                </span>
                <span
                  className={`ml-2 rounded-full px-3 py-1 text-xs font-bold ${badge.cls}`}
                >
                  {badge.label}
                </span>
              </div>
            </div>
            <p className="hidden max-w-xs text-right text-xs leading-relaxed text-muted-foreground sm:block">
              Indicatief — exacte dikte afhankelijk van woning, doel en
              detaillering
            </p>
          </div>

          <div className="mt-5">
            <input
              type="range"
              min={RC_MIN}
              max={RC_MAX}
              step={RC_STEP}
              value={rc}
              onChange={(e) => setRc(+e.target.value)}
              className="w-full cursor-pointer appearance-none rounded-full bg-transparent [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-border [&::-webkit-slider-thumb]:mt-[-4px] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md"
              style={{
                background: `linear-gradient(to right, hsl(var(--primary)) ${pct}%, hsl(var(--border)) ${pct}%)`,
              }}
              aria-label="RC-waarde selecteren"
            />
            <div className="mt-1.5 flex justify-between">
              {RC_OPTIONS.map((v) => (
                <span
                  key={v}
                  className={`text-[11px] font-semibold tabular-nums ${
                    v === rc ? "text-primary" : "text-muted-foreground/50"
                  }`}
                >
                  {v.toFixed(1)}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {materialen.map((mat) => {
            const dikteMm = calcDikte(rc, mat)
            const opslagCm = opbouwOpslag[mat] ?? 3
            const totaalCm = Math.round(dikteMm / 10) + opslagCm
            const barPct = Math.min(100, (dikteMm / 240) * 100)

            return (
              <div key={mat} className="flex flex-col gap-3 p-5">
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  {mat}
                </p>
                <p className="text-[11px] text-muted-foreground/60">
                  λ = {lambdaValues[mat].toFixed(3)} W/m·K
                </p>
                <div className="relative h-3 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-primary transition-all duration-300"
                    style={{ width: `${barPct}%` }}
                  />
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-black tabular-nums text-foreground">
                    {dikteMm}
                  </span>
                  <span className="mb-0.5 text-sm font-semibold text-muted-foreground">
                    mm isolatie
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Totale WDVS-opbouw: ca.{" "}
                  <span className="font-semibold text-foreground">
                    {totaalCm} cm
                  </span>
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Diktes afgerond op 5 mm (gangbare fabrikantmaten). Totale opbouw
        inclusief hechtlaag, wapeningslaag en afwerklaag. Afhankelijk van
        woning, doel en detaillering.
      </p>
    </>
  )
}

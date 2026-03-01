"use client"

// FUTURE EXTRACTION TARGET: /gevelisolatie/rc-waarde-dikte/
import Link from "next/link"
import { rcWaardeDikteContent } from "@/lib/content/gevelisolatie"
import { Check, ArrowRight } from "lucide-react"
import { useState } from "react"

// Rd → dikte per materiaal (lambda-based calculation, NL praktijkwaarden)
// Bronnen: fabrikant-specificaties, RVO/ISDE voorwaarden, Bouwbesluit (Bbl)
// dikte (mm) = Rd × λ × 1000  →  afgerond op 5 mm
const lambdaValues: Record<string, number> = {
  EPS:            0.038, // EPS 70/80, meest gangbare type NL; λD ≈ 0.031–0.040 (bron: isolatieonline.nl)
  PIR:            0.024, // PIR WDVS-platen; λD ≈ 0.022–0.024 (bron: slimster.nl, RVO)
  "Minerale wol": 0.035, // Steenwol 90–100 kg/m³; λD ≈ 0.033–0.040 (bron: Rockwool NL 2025)
}

// Totale WDVS-opbouw opslag: hechtlaag + wapeningslaag + primer + afwerking ≈ 25–35 mm
const opbouwOpslag: Record<string, number> = {
  EPS:            3, // cm — dunne hechtlaag, sierpleister 1,5 mm
  PIR:            3,
  "Minerale wol": 4, // iets dikkere wapeningslaag bij minerale wol
}

function calcDikte(rc: number, materiaal: string): number {
  const lambda = lambdaValues[materiaal] ?? 0.038
  // Afronden op 5 mm (standaard fabrikantmaten)
  const mm = rc * lambda * 1000
  return Math.round(mm / 5) * 5 // mm
}

// Bouwbesluit (Bbl) en ISDE ijkpunten:
// Renovatie minimum gevel: Rc 1.4 m²K/W (Bbl art. 5.20)
// Nieuwbouw minimum gevel: Rc 4.7 m²K/W (Bbl)
// ISDE subsidie drempel gevelisolatie: Rd ≥ 3.5 m²K/W (rvo.nl)
const RC_MIN = 1.5
const RC_MAX = 6.0
const RC_STEP = 0.5
const RC_OPTIONS = Array.from(
  { length: Math.round((RC_MAX - RC_MIN) / RC_STEP) + 1 },
  (_, i) => +(RC_MIN + i * RC_STEP).toFixed(1)
)

const materialen = ["EPS", "PIR", "Minerale wol"]

// Labels op basis van Bbl en ISDE-drempel
function rcLabel(rc: number): { label: string; cls: string } {
  if (rc < 2.0)  return { label: "Renovatie",      cls: "bg-muted text-muted-foreground" }
  if (rc < 3.5)  return { label: "Basis",           cls: "bg-muted text-muted-foreground" }
  if (rc < 4.7)  return { label: "ISDE subsidie",   cls: "bg-primary/10 text-primary" }
  if (rc < 5.5)  return { label: "Nieuwbouwnorm",   cls: "bg-primary/20 text-primary" }
  return               { label: "Premium",           cls: "bg-primary text-primary-foreground" }
}

export default function RcWaardeDikteSection() {
  const data = rcWaardeDikteContent
  const [rc, setRc] = useState(3.5)
  const badge = rcLabel(rc)
  const pct = ((rc - RC_MIN) / (RC_MAX - RC_MIN)) * 100

  return (
    <section id={data.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">

      {/* ── Header — стандарт ── */}
      <div className="mb-4 flex items-center gap-3">
        <div className="h-px w-10 bg-primary" />
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          RC-waarde & dikte
        </span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        Wat heeft u{" "}
        <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
          nodig?
        </span>
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        {data.intro}
      </p>

      {/* ── Interactive RC calculator ── */}
      <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card">

        {/* Slider header */}
        <div className="border-b border-border px-6 py-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                Gewenste isolatiewaarde (Rd)
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-5xl font-black tabular-nums text-foreground">
                  {rc.toFixed(1)}
                </span>
                <span className="text-lg font-semibold text-muted-foreground">m²K/W</span>
                <span className={`ml-2 rounded-full px-3 py-1 text-xs font-bold ${badge.cls}`}>
                  {badge.label}
                </span>
              </div>
            </div>
            <p className="hidden max-w-xs text-right text-xs leading-relaxed text-muted-foreground sm:block">
              {data.disclaimer}
            </p>
          </div>

          {/* Custom styled range slider */}
          <div className="mt-5">
            <div className="relative">
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
            </div>
            {/* tick labels */}
            <div className="mt-1.5 flex justify-between">
              {RC_OPTIONS.map((v) => (
                <span
                  key={v}
                  className={`text-[11px] font-semibold tabular-nums ${v === rc ? "text-primary" : "text-muted-foreground/50"}`}
                >
                  {v.toFixed(1)}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Results grid — per materiaal */}
        <div className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {materialen.map((mat) => {
            const dikte_mm = calcDikte(rc, mat)           // mm, afgerond op 5 mm
            const opslag_cm = opbouwOpslag[mat] ?? 3       // cm WDVS-opbouw opslag
            const totaal_cm = Math.round(dikte_mm / 10) + opslag_cm
            // Bar: max verwacht 240 mm (RC 6.0 × EPS 0.038 × 1000 = 228 mm)
            const barPct = Math.min(100, (dikte_mm / 240) * 100)
            return (
              <div key={mat} className="flex flex-col gap-3 p-5">
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  {mat}
                </p>
                {/* λ label */}
                <p className="text-[11px] text-muted-foreground/60">
                  λ = {lambdaValues[mat].toFixed(3)} W/m·K
                </p>
                {/* visual bar */}
                <div className="relative h-3 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-primary transition-all duration-300"
                    style={{ width: `${barPct}%` }}
                  />
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-black tabular-nums text-foreground">
                    {dikte_mm}
                  </span>
                  <span className="mb-0.5 text-sm font-semibold text-muted-foreground">mm isolatie</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Totale WDVS-opbouw: ca.{" "}
                  <span className="font-semibold text-foreground">{totaal_cm} cm</span>
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Two-column: comfort vs max + opname ── */}
      <div className="mt-8 grid gap-4 lg:grid-cols-2">

        {/* Comfort vs maximaal */}
        <div className="rounded-xl border border-border bg-muted/20 p-6">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            {data.comfortVsMax.h3}
          </p>
          <ul className="space-y-3">
            {data.comfortVsMax.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                </div>
                <span className="text-sm leading-relaxed text-foreground/70">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Opname checklist */}
        <div className="rounded-xl border border-border bg-muted/20 p-6">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            {data.opname.h3}
          </p>
          <ul className="space-y-2.5">
            {data.opname.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                </div>
                <span className="text-sm leading-relaxed text-foreground/70">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Related link ── */}
      <p className="mt-6 text-sm text-muted-foreground">
        Twijfelt u over de juiste dikte?{" "}
        <Link href="/gevelisolatie/rc-waarde-dikte/" className="font-semibold text-primary underline-offset-2 hover:underline">
          Uitgebreide uitleg met praktijkwaarden →
        </Link>
      </p>

    </section>
  )
}

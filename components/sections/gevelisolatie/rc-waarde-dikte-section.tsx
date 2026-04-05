import Link from "next/link"
import { rcWaardeDikteContent } from "@/lib/content/gevelisolatie"
import { ArrowRight } from "lucide-react"
import {
  LAMBDA,
  OPBOUW_OPSLAG,
  MATERIALEN,
  calcDikte,
} from "@/lib/constants/rc-waarde"

// Vaste preview-waarde — meest gevraagde Rc voor de teaser
const PREVIEW_RC = 3.5

export default function RcWaardeDikteSection() {
  const data = rcWaardeDikteContent

  return (
    <section id={data.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">

      {/* ── Header ── */}
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

      {/* ── Rc vs Rd mini-explainer ── */}
      <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-5">
        <p className="text-sm leading-relaxed text-foreground/80">
          <span className="font-semibold text-primary">Rc vs Rd:</span>{" "}
          Rd is de warmteweerstand van het isolatiemateriaal zelf.
          Rc is de warmteweerstand van de gehele gevelconstructie — de waarde
          die telt voor vergunningen en energieberekeningen. Voor subsidies (ISDE) geldt de Rd van het isolatiemateriaal.
        </p>
      </div>

      {/* ── Static preview card — Rc 3.5 ���─ */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">

        <div className="border-b border-border px-6 py-4">
          <div className="flex items-end justify-between gap-4">
            <div className="flex items-baseline gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                Voorbeeld bij Rc
              </span>
              <span className="text-3xl font-black tabular-nums text-foreground">
                {PREVIEW_RC.toFixed(1)}
              </span>
              <span className="text-sm font-semibold text-muted-foreground">m²K/W</span>
            </div>
            <p className="hidden text-right text-xs leading-relaxed text-muted-foreground sm:block">
              {data.disclaimer}
            </p>
          </div>
        </div>

        <div className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {MATERIALEN.map((mat) => {
            const dikteMm = calcDikte(PREVIEW_RC, mat)
            const opslagCm = OPBOUW_OPSLAG[mat] ?? 3
            const totaalCm = Math.round(dikteMm / 10) + opslagCm
            const barPct = Math.min(100, (dikteMm / 240) * 100)

            return (
              <div key={mat} className="flex flex-col gap-3 p-5">
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  {mat}
                </p>
                <p className="text-[11px] text-muted-foreground/60">
                  λ = {LAMBDA[mat].toFixed(3)} W/m·K
                </p>
                <div className="relative h-3 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-primary"
                    style={{ width: `${barPct}%` }}
                  />
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-black tabular-nums text-foreground">
                    {dikteMm}
                  </span>
                  <span className="mb-0.5 text-sm font-semibold text-muted-foreground">mm isolatie</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Totale WDVS-opbouw: ca.{" "}
                  <span className="font-semibold text-foreground">{totaalCm} cm</span>
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── CTA → cluster page ── */}
      <Link
        href="/gevelisolatie/rc-waarde-dikte/"
        className="group mt-6 flex items-center gap-4 rounded-xl border border-primary/25 bg-primary/5 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
      >
        <div className="flex-1">
          <p className="text-sm font-bold text-foreground">
            Wilt u de exacte dikte voor uw woning berekenen?
          </p>
          <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
            Interactieve Rc-calculator, uitleg per materiaal en details over subsidiedrempels
          </p>
        </div>
        <ArrowRight className="h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
      </Link>

    </section>
  )
}

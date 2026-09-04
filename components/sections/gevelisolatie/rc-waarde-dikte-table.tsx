import {
  LAMBDA,
  OPBOUW_OPSLAG,
  MATERIALEN,
  THRESHOLDS,
  calcDikte,
  rcLabel,
} from "@/lib/constants/rc-waarde"

/** Vaste Rc-richtwaarden die in de tabel worden getoond (server-rendered, geen JS). */
const RC_ROWS: { rc: number; toelichting: string }[] = [
  { rc: THRESHOLDS.renovatieBasis, toelichting: "Renovatie basis" },
  { rc: THRESHOLDS.isdeRd,         toelichting: "Subsidie (Rd ≥ 3,5)" },
  { rc: THRESHOLDS.nieuwbouwRc,    toelichting: "Nieuwbouw / ingrijpend" },
  { rc: THRESHOLDS.premium,        toelichting: "Premium" },
]

export default function RcWaardeDikteTable() {
  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/80">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th scope="col" className="px-5 py-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  Gewenste Rc-waarde
                </th>
                {MATERIALEN.map((mat) => (
                  <th key={mat} scope="col" className="px-5 py-4">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                      {mat}
                    </p>
                    <p className="mt-0.5 text-[11px] font-normal normal-case tracking-normal text-muted-foreground/60">
                      λ = {LAMBDA[mat].toFixed(3)} W/m·K
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {RC_ROWS.map(({ rc, toelichting }) => {
                const badge = rcLabel(rc)
                return (
                  <tr key={rc}>
                    <th scope="row" className="px-5 py-4 align-top font-normal">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black tabular-nums text-foreground">
                          {rc.toFixed(1)}
                        </span>
                        <span className="text-xs font-semibold text-muted-foreground">
                          m²K/W
                        </span>
                      </div>
                      <span className={`mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold ${badge.cls}`}>
                        {toelichting}
                      </span>
                    </th>
                    {MATERIALEN.map((mat) => {
                      const dikteMm = calcDikte(rc, mat)
                      const totaalCm = Math.round(dikteMm / 10) + (OPBOUW_OPSLAG[mat] ?? 3)
                      return (
                        <td key={mat} className="px-5 py-4 align-top">
                          <div className="flex items-end gap-1.5">
                            <span className="text-2xl font-black tabular-nums text-foreground">
                              {dikteMm}
                            </span>
                            <span className="mb-0.5 text-xs font-semibold text-muted-foreground">
                              mm
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Totale opbouw ca.{" "}
                            <span className="font-semibold text-foreground">{totaalCm} cm</span>
                          </p>
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Indicatieve richtwaarden. Diktes afgerond op 5 mm (gangbare fabrikantmaten). Totale opbouw
        inclusief hechtlaag, wapeningslaag en afwerklaag. De exacte dikte hangt af van woning,
        doel en detaillering en wordt bepaald tijdens de opname.
      </p>
    </>
  )
}

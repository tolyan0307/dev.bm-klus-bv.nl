/**
 * SSoT: Rc-waarde, lambda en dikte — constanten en hulpfuncties
 *
 * Gebruikt door:
 *   - components/sections/gevelisolatie/rc-waarde-dikte-section.tsx  (pillar teaser)
 *   - components/sections/gevelisolatie/rc-waarde-dikte-table.tsx      (cluster diktetabel)
 *
 * Lambda-waarden zijn interne conservatieve rekenwaarden voor consistentie
 * op de website. Exacte lambda en totale opbouw variëren per fabrikant en
 * systeemopbouw — de definitieve waarden worden bepaald tijdens de opname.
 */

// ── Lambda (W/m·K) — conservatieve rekenwaarden ────────────────────────────
// Interne aanname per materiaalgroep; werkelijke λD verschilt per fabrikant/systeem.
export const LAMBDA: Record<string, number> = {
  EPS:            0.038,
  PIR:            0.026,
  "Minerale wol": 0.035,
}

// ── WDVS-opbouw opslag (cm) — hechtlaag + wapening + primer + afwerking ──
export const OPBOUW_OPSLAG: Record<string, number> = {
  EPS:            3,
  PIR:            3,
  "Minerale wol": 4,
}

// ── Materiaallijst (volgorde = weergavevolgorde) ──────────────────────────
export const MATERIALEN = Object.keys(LAMBDA)

// ── Richtwaarden (indicatief, geen normatieve minima) ─────────────────────
export const THRESHOLDS = {
  /** UI-grens onder welke label "Renovatie basis" verschijnt (geen normatief minimum) */
  renovatieBasis: 2.5,
  /** ISDE-drempel voor isolatiemateriaal — Rd ≥ 3,5 m²K/W (check actuele voorwaarden) */
  isdeRd:         3.5,
  /** Indicatief nieuwbouwniveau gevel (Bbl) */
  nieuwbouwRc:    4.7,
  /** Boven deze waarde label "Premium" */
  premium:        5.5,
} as const

// ── Dikte-berekening ──────────────────────────────────────────────────────
/** Bereken isolatiedikte in mm, afgerond op 5 mm (gangbare fabrikantmaten). */
export function calcDikte(rc: number, materiaal: string): number {
  const lambda = LAMBDA[materiaal] ?? 0.038
  const mm = rc * lambda * 1000
  return Math.round(mm / 5) * 5
}

// ── Badge-label per Rc-waarde ─────────────────────────────────────────────
export function rcLabel(rc: number): { label: string; cls: string } {
  if (rc < THRESHOLDS.renovatieBasis)
    return { label: "Renovatie basis",          cls: "bg-muted text-muted-foreground" }
  if (rc < THRESHOLDS.isdeRd)
    return { label: "Basis",                    cls: "bg-muted text-muted-foreground" }
  if (rc < THRESHOLDS.nieuwbouwRc)
    return { label: "Subsidie (Rd ≥ 3,5)",      cls: "bg-primary/10 text-primary" }
  if (rc < THRESHOLDS.premium)
    return { label: "Nieuwbouw / ingrijpend",   cls: "bg-primary/20 text-primary" }
  return   { label: "Premium",                  cls: "bg-primary text-primary-foreground" }
}

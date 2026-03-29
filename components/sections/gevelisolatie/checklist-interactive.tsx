"use client"

import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import {
  ShieldAlert,
  Home,
  MapPin,
  ClipboardList,
  Calendar,
  FileText,
  ArrowRight,
  Lightbulb,
  Check,
  type LucideIcon,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  ShieldAlert,
  Home,
  MapPin,
  ClipboardList,
  Calendar,
  FileText,
}

interface ChecklistItem {
  iconName: string
  label: string
  tekst: string
}

/* ── Tips per item — shown when NOT yet checked (to help verify) ── */
const tips: Record<string, string> = {
  "Beschermd stadsgezicht of monument":
    "Doe de Vergunningcheck in het Omgevingsloket (omgevingswet.overheid.nl). Controleer daarnaast het Rijksmonumentenregister en de kaart van beschermde stads- en dorpsgezichten op cultureleerfgoed.nl.",
  "Voorgevel of zicht vanaf de straat":
    "Raadpleeg de welstandsnota en het omgevingsplan op de website van uw gemeente. Voor gevels die zichtbaar zijn vanaf openbaar gebied gelden meestal strengere eisen aan kleur (RAL), structuur en materiaal.",
  "Erfgrens en extra geveldikte":
    "Bekijk uw kadastrale kaart op kadaster.nl en meet de beschikbare ruimte langs de gevel. Houd rekening met 10–20 cm extra dikte door de isolatie.",
  "Meldcode en productgegevens":
    "Zoek het beoogde isolatiemateriaal op in de RVO-productenlijst (rvo.nl). Vraag uw uitvoerder om de meldcode, productnaam en Rd-waarde vóór de start schriftelijk te bevestigen.",
  "Planning en volgorde":
    "Doe eerst de Vergunningcheck. Is een vergunning nodig? Vraag die dan aan vóór de start (beslistermijn ±8 weken). ISDE voor woningeigenaren vraagt u pas aan ná uitvoering, binnen 24 maanden via rvo.nl.",
  "Documentatie bewaren":
    "Maak nu een map aan. Bewaar straks: factuur (met m², productnaam, Rd-waarde en meldcode), betaalbewijs en duidelijke foto's van de woning en de werkzaamheden.",
}

/* ── Short action per item — for the bottom CTA block ── */
const actions: Record<string, string> = {
  "Beschermd stadsgezicht of monument":
    "Doe de Vergunningcheck in het Omgevingsloket",
  "Voorgevel of zicht vanaf de straat":
    "Controleer de welstandsnota en het omgevingsplan bij uw gemeente",
  "Erfgrens en extra geveldikte":
    "Bekijk uw kadastrale kaart en meet de beschikbare ruimte",
  "Meldcode en productgegevens":
    "Vraag uw uitvoerder om meldcode, m² en Rd-waarde",
  "Planning en volgorde":
    "Doe eerst de Vergunningcheck. Is een vergunning nodig? Vraag die aan vóór de start",
  "Documentatie bewaren":
    "Bewaar factuur, betaalbewijs en foto's voor uw aanvraag",
}

/* ── Sticky bar (portaled to body to escape content-visibility containment) ── */
function StickyBar({
  done,
  total,
  allDone,
  checked,
  visible,
}: {
  done: number
  total: number
  allDone: boolean
  checked: Set<number>
  visible: boolean
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return createPortal(
    <div
      className={[
        "fixed inset-x-0 top-[67px] z-50 transition-all duration-300",
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-4 opacity-0 pointer-events-none",
      ].join(" ")}
    >
      <div className="border-b border-border/20 bg-background/90 shadow-sm backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-muted-foreground">
            <span
              className={[
                "font-bold tabular-nums",
                allDone ? "text-green-600" : "text-primary",
              ].join(" ")}
            >
              {done}
            </span>
            /{total}
          </p>
          <div className="flex flex-1 gap-1">
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                className="relative h-1 flex-1 overflow-hidden rounded-full bg-primary/10"
              >
                <div
                  className={[
                    "absolute inset-0 rounded-full transition-all duration-500 ease-out",
                    checked.has(i)
                      ? allDone
                        ? "scale-x-100 bg-green-500"
                        : "scale-x-100 bg-primary"
                      : "scale-x-0",
                  ].join(" ")}
                  style={{ transformOrigin: "left" }}
                />
              </div>
            ))}
          </div>
          {allDone && (
            <span className="text-[10px] font-bold text-green-600">
              Compleet
            </span>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}

/* ── Main component ── */
export default function ChecklistInteractive({
  items,
}: {
  items: ChecklistItem[]
}) {
  const [checked, setChecked] = useState<Set<number>>(new Set())
  const [isSticky, setIsSticky] = useState(false)
  const barRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  useEffect(() => {
    const bar = barRef.current
    const section = sectionRef.current
    if (!bar || !section) return

    const NAVBAR_H = 70

    const onScroll = () => {
      const barRect = bar.getBoundingClientRect()
      const sectionRect = section.getBoundingClientRect()
      const barHidden = barRect.bottom < NAVBAR_H
      const sectionVisible = sectionRect.bottom > NAVBAR_H + 40
      setIsSticky(barHidden && sectionVisible)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const done = checked.size
  const total = items.length
  const allDone = done === total
  const pct = Math.round((done / total) * 100)

  /* Unchecked items for action list */
  const uncheckedItems = items.filter((_, i) => !checked.has(i))

  return (
    <div ref={sectionRef} className="relative mt-10">
      {/* Sticky bar — portaled to body */}
      <StickyBar
        done={done}
        total={total}
        allDone={allDone}
        checked={checked}
        visible={isSticky}
      />

      {/* ── Static segmented progress strip ── */}
      <div ref={barRef} className="mb-10 flex items-center gap-3">
        <p className="text-xs font-medium text-muted-foreground">
          <span
            className={[
              "font-bold tabular-nums",
              allDone ? "text-green-600" : "text-primary",
            ].join(" ")}
          >
            {done}
          </span>
          /{total}
        </p>
        <div className="flex flex-1 gap-1">
          {items.map((_, i) => {
            const isActive = checked.has(i)
            return (
              <div
                key={i}
                className="relative h-1 flex-1 overflow-hidden rounded-full bg-primary/10"
              >
                <div
                  className={[
                    "absolute inset-0 rounded-full transition-all duration-500 ease-out",
                    isActive
                      ? allDone
                        ? "scale-x-100 bg-green-500"
                        : "scale-x-100 bg-primary"
                      : "scale-x-0",
                  ].join(" ")}
                  style={{ transformOrigin: "left" }}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Checklist items ── */}
      <div className="space-y-3">
        {items.map((item, i) => {
          const Icon = iconMap[item.iconName]
          const isChecked = checked.has(i)
          const tip = tips[item.label]
          const showTip = !isChecked && tip

          return (
            <div key={item.label}>
              <button
                type="button"
                onClick={() => toggle(i)}
                className={[
                  "group relative flex w-full items-start gap-5 overflow-hidden border text-left",
                  "p-5 sm:p-6",
                  "transition-all duration-300 ease-out",
                  "cursor-pointer select-none",
                  isChecked
                    ? "rounded-2xl border-green-300/40 bg-green-50/20"
                    : showTip
                      ? "rounded-t-2xl border-b-0 rounded-b-none border-border/40 bg-card/80 hover:border-primary/20"
                      : "rounded-2xl border-border/40 bg-card/80 hover:border-primary/20 hover:shadow-md",
                ].join(" ")}
              >
                {/* Accent line */}
                <div
                  className={[
                    "absolute inset-x-0 top-0 h-[3px] transition-all duration-300",
                    isChecked
                      ? "bg-linear-to-r from-green-500/50 via-green-400/20 to-transparent"
                      : "bg-linear-to-r from-primary/70 via-primary/25 to-transparent",
                  ].join(" ")}
                />

                {/* Watermark */}
                <span
                  className={[
                    "pointer-events-none absolute -right-1 -top-3 select-none font-black text-[5rem] leading-none transition-colors duration-300",
                    isChecked
                      ? "text-green-500/[0.04]"
                      : "text-primary/4 group-hover:text-primary/7",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Icon / checkbox */}
                <div
                  className={[
                    "relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2",
                    "transition-all duration-300",
                    isChecked
                      ? "border-green-500 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.15)]"
                      : "border-border/50 bg-background group-hover:border-primary/30 group-hover:bg-primary/[0.03]",
                  ].join(" ")}
                >
                  {isChecked ? (
                    <svg
                      className="h-5 w-5 text-white animate-in zoom-in-50 duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : Icon ? (
                    <Icon
                      className="h-5 w-5 text-muted-foreground/40 transition-colors group-hover:text-primary/60"
                      strokeWidth={1.5}
                    />
                  ) : null}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 pt-1">
                  <h3
                    className={[
                      "text-sm font-bold leading-snug transition-all duration-300",
                      isChecked
                        ? "text-foreground/40 line-through decoration-green-500/30 decoration-2"
                        : "text-foreground",
                    ].join(" ")}
                  >
                    {item.label}
                  </h3>
                  <p
                    className={[
                      "mt-2 max-w-xl text-[13px] leading-relaxed transition-all duration-300",
                      isChecked
                        ? "text-muted-foreground/30"
                        : "text-muted-foreground/70",
                    ].join(" ")}
                  >
                    {item.tekst}
                  </p>
                </div>
              </button>

              {/* ── Tip panel — visible when NOT checked ── */}
              {tip && (
                <div
                  className={[
                    "overflow-hidden border border-t-0 border-border/40 bg-amber-50/40",
                    "transition-all duration-300 ease-out",
                    showTip
                      ? "max-h-40 rounded-b-2xl opacity-100"
                      : "max-h-0 opacity-0 border-transparent",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-3 px-5 pb-4 pt-3 sm:px-6">
                    <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" strokeWidth={2} />
                    <p className="text-xs leading-relaxed text-amber-900/60">
                      <span className="font-semibold text-amber-900/80">Hoe te checken: </span>
                      {tip}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* ── Bottom CTA block — contextual action list ── */}
      <div
        className={[
          "group relative mt-8 overflow-hidden rounded-2xl transition-all duration-500",
          allDone
            ? "bg-gradient-to-br from-green-50 via-green-50/80 to-emerald-50/50 shadow-[0_8px_40px_-12px_rgba(34,197,94,0.15)]"
            : "bg-gradient-to-br from-[#1A1A1A] via-[#1A1A1A] to-[#252525] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.25)]",
        ].join(" ")}
      >
        {/* Accent line */}
        <div
          className={[
            "h-[3px] transition-all duration-500",
            allDone
              ? "bg-linear-to-r from-green-500/60 via-green-400/30 to-transparent"
              : "bg-linear-to-r from-primary via-primary/50 to-transparent",
          ].join(" ")}
        />

        {/* Decorative glow */}
        {!allDone && (
          <>
            <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/[0.06] blur-3xl" />
            <div className="pointer-events-none absolute -left-16 -bottom-16 h-32 w-32 rounded-full bg-primary/[0.04] blur-3xl" />
          </>
        )}

        <div className="relative p-6 sm:p-8">
          {allDone ? (
            /* ── All done state ── */
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-base font-bold tracking-tight text-green-800 sm:text-lg">
                  Alle {total} punten afgevinkt
                </p>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-green-700/60">
                  U heeft de belangrijkste voorbereiding gedaan. Plan een gratis opname en wij bespreken uw situatie op locatie. De definitieve beoordeling blijft afhankelijk van uw gemeente en RVO.
                </p>
              </div>
              <Link
                href="/contact/"
                className="inline-flex shrink-0 items-center gap-2.5 rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-green-700 hover:shadow-md"
              >
                Plan gratis opname
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            /* ── Action list state ── */
            <div>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-base font-bold tracking-tight text-white sm:text-lg">
                    {done === 0
                      ? "Uw persoonlijke checklist"
                      : `Nog ${total - done} ${total - done === 1 ? "punt" : "punten"} om te checken`}
                  </p>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/40">
                    {done === 0
                      ? "Doorloop de punten hierboven om te zien wat u alvast kunt voorbereiden voor vergunning en subsidie."
                      : "Werk de openstaande punten af, zodat u beter voorbereid bent op vergunning en subsidieaanvraag."}
                  </p>

                  {/* Action items for unchecked */}
                  {uncheckedItems.length > 0 && uncheckedItems.length < total && (
                    <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
                      {uncheckedItems.map((item, idx) => (
                        <li key={item.label} className="flex items-start gap-3">
                          <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white/[0.06] text-[10px] font-bold tabular-nums text-primary/80">
                            {idx + 1}
                          </span>
                          <span className="text-[13px] leading-snug text-white/50">
                            {actions[item.label] || item.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <Link
                  href="/contact/"
                  className="inline-flex shrink-0 items-center gap-2.5 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:shadow-md hover:brightness-110"
                >
                  Plan gratis opname
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

interface WerkItem {
  title: string
  body: string
}

interface Props {
  items: WerkItem[]
}

export default function WerkzaamhedenAccordion({ items }: Props) {
  const [active, setActive] = useState(0)
  const current = items[active]

  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex flex-col md:flex-row">

        {/* ── LEFT: menu list ── */}
        <nav
          className="md:w-auto md:shrink-0 md:border-r border-border"
          aria-label="Werkzaamheden menu"
        >
          <ul role="list" className="divide-y divide-border">
            {items.map((item, i) => {
              const isActive = active === i
              return (
                <li key={item.title}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={isActive ? "true" : undefined}
                    className="group relative flex w-full items-center gap-3 px-5 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                    style={{ background: isActive ? "rgba(232,96,10,0.06)" : undefined }}
                  >
                    {/* Active indicator bar */}
                    <span
                      className="absolute left-0 inset-y-0 w-[3px] rounded-r-full bg-primary transition-opacity duration-200"
                      style={{ opacity: isActive ? 1 : 0 }}
                      aria-hidden
                    />
                    {/* Counter */}
                    <span
                      className="shrink-0 text-xs font-bold tabular-nums"
                      style={{ color: isActive ? "var(--color-primary)" : "var(--color-muted-foreground)" }}
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* Title */}
                    <span
                      className="whitespace-nowrap text-sm font-medium"
                      style={{ color: isActive ? "var(--color-foreground)" : "var(--color-muted-foreground)" }}
                    >
                      {item.title}
                    </span>
                    {/* Arrow */}
                    <ArrowRight
                      className="h-3.5 w-3.5 shrink-0 text-primary transition-opacity duration-200"
                      style={{ opacity: isActive ? 1 : 0 }}
                      aria-hidden
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* ── RIGHT: detail panel ── */}
        <div className="relative flex flex-1 flex-col justify-between overflow-hidden p-6 md:p-8">

          {/* Large decorative background number */}
          <span
            className="pointer-events-none absolute bottom-4 right-5 select-none font-black leading-none tabular-nums"
            style={{ fontSize: 120, color: "rgba(232,96,10,0.05)", lineHeight: 1 }}
            aria-hidden
          >
            {String(active + 1).padStart(2, "0")}
          </span>

          {/* Content */}
          <div key={active} className="animate-in fade-in duration-200 relative z-10">

            {/* Orange label + counter */}
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
              <span className="inline-block h-px w-6 bg-primary" aria-hidden />
              Werkzaamheid {String(active + 1).padStart(2, "0")}
              <span className="h-px flex-1 bg-primary/20" aria-hidden />
              <span className="font-bold tabular-nums text-muted-foreground normal-case tracking-normal">
                {active + 1} / {items.length}
              </span>
            </span>

            {/* Title */}
            <h3 className="mt-3 text-xl font-bold leading-snug text-foreground">
              {current.title}
            </h3>

            {/* Divider */}
            <div className="mt-4 flex items-center gap-3">
              <span className="h-px w-8 bg-primary" aria-hidden />
              <span className="h-px flex-1 bg-border" aria-hidden />
            </div>

            {/* Body */}
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {current.body}
            </p>
          </div>

          {/* Prev / Next */}
          <div className="relative z-10 mt-8 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActive((p) => Math.max(0, p - 1))}
              disabled={active === 0}
              className="rounded-lg border border-border px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary disabled:pointer-events-none disabled:opacity-30"
            >
              ← Vorige
            </button>
            <button
              type="button"
              onClick={() => setActive((p) => Math.min(items.length - 1, p + 1))}
              disabled={active === items.length - 1}
              className="rounded-lg border border-border px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary disabled:pointer-events-none disabled:opacity-30"
            >
              Volgende →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

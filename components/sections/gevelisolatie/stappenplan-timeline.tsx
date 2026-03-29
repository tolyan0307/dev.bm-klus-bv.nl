"use client"

import { useEffect, useRef, useState } from "react"

interface Stap {
  num: string
  titel: string
  tekst: string
}

export default function StappenplanTimeline({ stappen }: { stappen: Stap[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleSet, setVisibleSet] = useState<Set<number>>(new Set())
  const [lineHeight, setLineHeight] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cards = container.querySelectorAll<HTMLElement>("[data-step]")

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleSet((prev) => {
          const next = new Set(prev)
          entries.forEach((entry) => {
            const idx = Number((entry.target as HTMLElement).dataset.step)
            if (entry.isIntersecting) next.add(idx)
          })
          return next
        })
      },
      { threshold: 0.3 },
    )

    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  /* Grow the line to the last visible node */
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const update = () => {
      const sorted = [...visibleSet].sort((a, b) => a - b)
      if (sorted.length === 0) { setLineHeight(0); return }
      const lastNode = container.querySelector<HTMLElement>(
        `[data-node="${sorted[sorted.length - 1]}"]`,
      )
      if (!lastNode) return
      const containerRect = container.getBoundingClientRect()
      const nodeRect = lastNode.getBoundingClientRect()
      setLineHeight(nodeRect.top - containerRect.top + nodeRect.height / 2)
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(container)
    return () => ro.disconnect()
  }, [visibleSet])

  return (
    <div ref={containerRef} className="relative mt-12">
      {/* ── Line layer ── */}
      {/* Background line (faint dashed) */}
      <div
        className="absolute left-[19px] top-0 bottom-0 sm:left-1/2 sm:-translate-x-px"
        aria-hidden="true"
      >
        <div className="h-full w-px border-l border-dashed border-border/40" />
      </div>
      {/* Animated progress line (solid gradient) */}
      <div
        data-line
        className="absolute left-[19px] top-0 sm:left-1/2 sm:-translate-x-px"
        style={{
          height: lineHeight,
          transition: "height 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        aria-hidden="true"
      >
        <div className="h-full w-px bg-gradient-to-b from-primary/60 via-primary/40 to-primary/20" />
        {/* Glow at the tip */}
        <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary/50 blur-[3px]" />
      </div>

      <div className="space-y-10 sm:space-y-14">
        {stappen.map((stap, i) => {
          const isLeft = i % 2 === 0
          const isVisible = visibleSet.has(i)

          /* ── Card styles ── */
          const cardBase =
            "group relative w-full overflow-hidden rounded-2xl border bg-card/80 transition-all duration-700 ease-out"
          const cardState = isVisible
            ? "translate-y-0 opacity-100 border-border/40 hover:border-primary/20 hover:shadow-md"
            : "translate-y-6 opacity-0 border-transparent"

          /* ── Card content (shared) ── */
          const cardInner = (padding: string) => (
            <>
              <div className="h-[3px] bg-linear-to-r from-primary/70 via-primary/25 to-transparent" />
              <div className={`relative ${padding}`}>
                <span
                  className="pointer-events-none absolute -right-1 -top-3 select-none font-black text-[5rem] leading-none text-primary/4 transition-colors group-hover:text-primary/7"
                  aria-hidden="true"
                >
                  {stap.num}
                </span>
                <h3 className="text-sm font-bold text-foreground">{stap.titel}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stap.tekst}</p>
              </div>
            </>
          )

          return (
            <div
              key={stap.num}
              data-step={i}
              className="relative flex items-start gap-6 sm:gap-0"
            >
              {/* ── Node ── */}
              <div
                data-node={i}
                className={[
                  "absolute left-[19px] z-10 -translate-x-1/2 sm:left-1/2",
                  "flex h-9 w-9 items-center justify-center rounded-full",
                  "border-2 bg-background shadow-sm",
                  "transition-all duration-500",
                  isVisible
                    ? "border-primary/50 shadow-[0_0_8px_rgba(234,108,32,0.15)] scale-100"
                    : "border-border/40 scale-90 opacity-40",
                ].join(" ")}
              >
                <span
                  className={[
                    "text-xs font-bold tabular-nums transition-colors duration-500",
                    isVisible ? "text-primary" : "text-muted-foreground/50",
                  ].join(" ")}
                >
                  {stap.num}
                </span>
              </div>

              {/* Mobile spacer */}
              <div className="w-9 shrink-0 sm:hidden" />

              {/* ── Desktop: alternating cards ── */}
              {isLeft ? (
                <>
                  <div className="hidden sm:flex sm:w-1/2 sm:justify-end sm:pr-10">
                    <div
                      className={`${cardBase} ${cardState}`}
                      style={{ maxWidth: "28rem", transitionDelay: `${i * 80}ms` }}
                    >
                      {cardInner("p-6")}
                    </div>
                  </div>
                  <div className="hidden sm:block sm:w-1/2" />
                </>
              ) : (
                <>
                  <div className="hidden sm:block sm:w-1/2" />
                  <div className="hidden sm:flex sm:w-1/2 sm:pl-10">
                    <div
                      className={`${cardBase} ${cardState}`}
                      style={{ maxWidth: "28rem", transitionDelay: `${i * 80}ms` }}
                    >
                      {cardInner("p-6")}
                    </div>
                  </div>
                </>
              )}

              {/* ── Mobile card ── */}
              <div
                className={`${cardBase} ${cardState} flex-1 sm:hidden`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {cardInner("p-5")}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

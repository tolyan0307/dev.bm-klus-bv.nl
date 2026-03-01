"use client"

import { useState, useEffect } from "react"

type TocItem = { id: string; label: string }

export default function StickyToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("")
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[]

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  if (!visible) return null

  return (
    <nav
      aria-label="Inhoudsopgave (sticky)"
      className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 2xl:block"
    >
      <div className="flex flex-col gap-1.5 rounded-full border border-border/40 bg-background/80 px-1.5 py-2 shadow-md backdrop-blur-sm">
        {items.map((item) => {
          const isActive = activeId === item.id
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              title={item.label}
              className="group relative flex items-center justify-center"
            >
              <span
                className={`block h-2 w-2 rounded-full transition-all ${
                  isActive
                    ? "scale-125 bg-primary"
                    : "bg-border group-hover:bg-primary/50"
                }`}
              />
              <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-md bg-foreground/90 px-2.5 py-1 text-[11px] font-medium text-background opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                {item.label}
              </span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}

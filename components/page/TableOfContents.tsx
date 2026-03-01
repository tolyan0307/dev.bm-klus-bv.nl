"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export interface TocItem {
  id: string
  label: string
}

interface TableOfContentsProps {
  items: TocItem[]
  className?: string
}

export default function TableOfContents({ items, className = "" }: TableOfContentsProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <nav aria-label="Inhoudsopgave" className={className}>
      {/* Header row */}
      <div className="mb-3 flex items-center gap-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
          Inhoud
        </span>
        <span className="h-px flex-1 bg-primary/15" />
        {/* Mobile toggle */}
        <button
          type="button"
          className="flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground sm:hidden"
          onClick={() => setCollapsed(!collapsed)}
          aria-expanded={!collapsed}
          aria-controls="toc-links"
        >
          {collapsed ? "Toon" : "Verberg"}
          <ChevronDown
            className={`h-3 w-3 transition-transform duration-200 ${collapsed ? "" : "rotate-180"}`}
          />
        </button>
      </div>

      {/* Links */}
      <div
        id="toc-links"
        className={`flex flex-wrap gap-2 overflow-hidden transition-all duration-300 sm:flex ${
          collapsed ? "max-h-0 sm:max-h-none" : "max-h-[500px]"
        }`}
      >
        {items.map((item, i) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="group flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 transition-all hover:border-primary hover:bg-primary/5"
          >
            <span className="text-[9px] font-bold tabular-nums text-primary/40 transition-colors group-hover:text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </nav>
  )
}

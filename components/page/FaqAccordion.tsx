"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import type { ReactNode } from "react"

export interface FaqItem {
  vraag: string
  antwoord: ReactNode
}

interface FaqAccordionProps {
  items: FaqItem[]
  defaultOpen?: number
  variant?: "default" | "premium"
}

const styles = {
  default: {
    item: "overflow-hidden rounded-xl border border-border/60 bg-card/80 shadow-sm transition-all",
    itemOpen: "border-primary/40 shadow-md",
    itemClosed: "",
    summary: "flex w-full cursor-pointer items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-secondary/20",
    number: "mt-0.5 shrink-0 text-lg font-bold tabular-nums transition-colors",
    numberOpen: "text-primary",
    numberClosed: "text-border",
    chevronOpen: "rotate-90",
    chevronClosed: "",
  },
  premium: {
    item: "overflow-hidden rounded-2xl border bg-linear-to-br from-card via-card to-secondary/30 transition-all",
    itemOpen: "border-primary/30 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)]",
    itemClosed: "border-border/50 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]",
    summary: "flex w-full cursor-pointer items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-primary/4",
    number: "mt-0.5 shrink-0 text-lg font-bold transition-colors",
    numberOpen: "text-primary",
    numberClosed: "text-border/60",
    chevronOpen: "rotate-270",
    chevronClosed: "rotate-90",
  },
}

export default function FaqAccordion({
  items,
  defaultOpen = 0,
  variant = "default",
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen)
  const s = styles[variant]

  return (
    <div className="space-y-3">
      {items.map((faq, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={i}
            className={`${s.item} ${isOpen ? s.itemOpen : s.itemClosed}`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className={s.summary}
              aria-expanded={isOpen}
            >
              <div className="flex min-w-0 items-start gap-4">
                <span className={`${s.number} ${isOpen ? s.numberOpen : s.numberClosed}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 break-words text-base font-semibold text-foreground sm:text-lg">
                  {faq.vraag}
                </span>
              </div>
              <ChevronRight
                className={`mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                  isOpen ? s.chevronOpen : s.chevronClosed
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-border/50 px-6 pb-6 pt-4">
                  <p className="pl-12 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {faq.antwoord}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

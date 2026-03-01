"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import Link from "next/link"

export interface FaqItem {
  vraag: string
  antwoord: string
}

interface FAQAccordionProps {
  items: FaqItem[]
  /** "two-col" renders the home-page layout: sticky left header + right accordion */
  layout?: "default" | "two-col"
  eyebrow?: string
  heading?: string
  lead?: string
  contactHref?: string
}

export default function FAQAccordion({
  items,
  layout = "default",
  eyebrow = "FAQ",
  heading,
  lead,
  contactHref = "/contact/",
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const accordion = (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx
        return (
          <div
            key={idx}
            className={`overflow-hidden rounded-xl border transition-all ${
              isOpen
                ? "border-primary/40 bg-card shadow-md"
                : "border-border bg-card shadow-sm"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="flex w-full items-start justify-between gap-4 p-5 text-left transition-colors hover:bg-secondary/20"
              aria-expanded={isOpen}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 text-sm font-bold tabular-nums transition-colors ${
                    isOpen ? "text-primary" : "text-border"
                  }`}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold leading-snug text-foreground sm:text-base">
                  {item.vraag}
                </span>
              </div>
              <ChevronDown
                className={`mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            <div
              className={`grid transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-border/40 px-5 pb-5 pt-4">
                  <p className="pl-7 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item.antwoord}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )

  if (layout === "two-col") {
    return (
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: sticky header */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px w-8 bg-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                {eyebrow}
              </span>
            </div>
            {heading && (
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {heading.includes("vragen") ? (
                  <>
                    {heading.replace("vragen", "")}<span className="text-primary">vragen</span>
                  </>
                ) : heading}
              </h2>
            )}
            {lead && (
              <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">
                {lead}
              </p>
            )}
            <p className="mt-8 text-sm text-muted-foreground">
              Staat uw vraag er niet tussen?{" "}
              <Link href={contactHref} className="font-semibold text-primary hover:underline">
                Neem contact op
              </Link>
            </p>
          </div>
        </div>

        {/* Right: accordion */}
        <div className="lg:col-span-7">
          {accordion}
        </div>
      </div>
    )
  }

  return accordion
}

// FUTURE EXTRACTION TARGET: pillar-only (optional)
"use client"

import { faqContent } from "@/lib/content/gevelisolatie"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import Script from "next/script"
import { useState } from "react"

// Categorise the 12 FAQ items
const categories = [
  { label: "Alles",       indices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
  { label: "Kosten",      indices: [0] },
  { label: "Materiaal",   indices: [1, 2, 4] },
  { label: "Afwerking",   indices: [3, 11] },
  { label: "Subsidie",    indices: [7, 8] },
  { label: "Technisch",   indices: [5, 6, 9, 10] },
]

export default function FaqSection() {
  const data = faqContent
  const [activeCategory, setActiveCategory] = useState(0)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const visibleIndices = categories[activeCategory].indices
  const visibleItems = visibleIndices.map((i) => ({ ...data.items[i], originalIndex: i }))

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.items.map((item) => ({
      "@type": "Question",
      name: item.vraag,
      acceptedAnswer: { "@type": "Answer", text: item.antwoord },
    })),
  }

  return (
    <>
      <Script
        id="faq-gevelisolatie-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section id={data.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">

          {/* Left: sticky header */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div className="mb-3 flex items-center gap-3">
                <div className="h-px w-10 bg-primary" />
                <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                  FAQ
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Veelgestelde
                <br />
                <span className="text-primary">vragen</span>
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
                Alles wat u wilt weten over buitengevelisolatie — van kosten en materiaal tot subsidie en uitvoering.
              </p>

              {/* Category filters */}
              <div className="mt-6 flex flex-wrap gap-2">
                {categories.map((cat, ci) => (
                  <button
                    key={cat.label}
                    onClick={() => { setActiveCategory(ci); setOpenIndex(null) }}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                      activeCategory === ci
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    {cat.label}
                    <span className={`ml-1.5 text-[10px] ${activeCategory === ci ? "text-white/60" : "text-border"}`}>
                      {cat.indices.length}
                    </span>
                  </button>
                ))}
              </div>

              <p className="mt-8 text-sm text-muted-foreground">
                Staat uw vraag er niet tussen?{" "}
                <Link href="/contact/" className="font-semibold text-primary hover:underline">
                  Neem contact op
                </Link>
              </p>
            </div>
          </div>

          {/* Right: accordion */}
          <div className="lg:col-span-7">
            <div className="space-y-3">
              {visibleItems.map((item, idx) => {
                const isOpen = openIndex === idx
                return (
                  <div
                    key={item.originalIndex}
                    className={`overflow-hidden rounded-xl border transition-all ${
                      isOpen
                        ? "border-primary/40 bg-card shadow-md"
                        : "border-border bg-card shadow-sm"
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="flex w-full items-start justify-between gap-4 p-6 text-left transition-colors hover:bg-secondary/20"
                    >
                      <div className="flex items-start gap-4">
                        <span className={`mt-0.5 text-lg font-bold tabular-nums transition-colors ${isOpen ? "text-primary" : "text-border"}`}>
                          {String(item.originalIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="text-base font-semibold text-foreground sm:text-lg">
                          {item.vraag}
                        </span>
                      </div>
                      <ChevronDown
                        className={`mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                      <div className="overflow-hidden">
                        <div className="border-t border-border/50 px-6 pb-6 pt-4">
                          <div className="pl-12">
                            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                              {item.antwoord}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

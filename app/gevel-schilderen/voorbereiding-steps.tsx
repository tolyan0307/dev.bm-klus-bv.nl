"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Card {
  title: string;
  body: string;
  bullets: string[];
}

export function VoorbereidingSteps({ cards }: { cards: Card[] }) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="relative">
      {/* Vertical line — only between circles, not past the last one */}
      <div
        className="absolute left-[19px] top-5 w-px bg-border"
        style={{ height: `calc(100% - 2.5rem)` }}
        aria-hidden
      />

      <div className="space-y-2">
        {cards.map((card, i) => {
          const isOpen = open === i;
          return (
            <div key={card.title} className="relative flex gap-5">
              {/* Step circle */}
              <div
                className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 shadow-sm transition-colors ${
                  isOpen
                    ? "border-primary bg-primary"
                    : "border-primary bg-background"
                }`}
              >
                <span
                  className={`text-xs font-black transition-colors ${
                    isOpen ? "text-white" : "text-primary"
                  }`}
                >
                  {i + 1}
                </span>
              </div>

              {/* Accordion item */}
              <div className="flex-1 overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-sm">
                {/* Header — always visible */}
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left"
                  aria-expanded={isOpen}
                >
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                      Stap {i + 1}
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-foreground">
                      {card.title}
                    </p>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-muted-foreground transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Collapsible body */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-border px-5 py-4">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {card.body}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {card.bullets.map((b) => (
                          <span
                            key={b}
                            className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-foreground/70"
                          >
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

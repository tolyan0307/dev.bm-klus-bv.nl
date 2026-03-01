"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, Check, CheckCircle2, ArrowRight } from "lucide-react";
import { nadelen } from "@/lib/content/buiten-stucwerk";

const IMAGES = [
  "/images/nadelen/vocht-opgesloten.webp",
  "/images/nadelen/scheurvorming.webp",
  "/images/nadelen/vervuiling-algen.webp",
  "/images/nadelen/loslaten-hechting.webp",
  "/images/nadelen/plintschade-spatwater.webp",
];

const SOLUTIONS_DETAIL = [
  "Kies altijd een dampopen stucmortel en sierpleister. Zorg dat de plintzone voldoende boven het maaiveld eindigt en dat dagkanten rondom kozijnen correct worden afgedicht.",
  "Verwerk glasvezelwapening op alle kritieke zones: hoeken, overgangen en aansluitingen. Een goede primer en de juiste laagopbouw voorkomen spanningsscheuren.",
  "Kies voor een hydrofoberende sierpleister die vies water afstoot. Laat de gevel elke 5–7 jaar reinigen en behandelen tegen biologische aantasting.",
  "Zorg voor een grondige ondergrondvoorbereiding: reiniging, stabilisatie en een passende primer. Controleer altijd de hechtwaarde van de bestaande ondergrond vóór aanvang.",
  "Gebruik een kwalitatief plintprofiel van minimaal 30 cm hoog met spatwaterbestendige mortel. De overgang naar het maaiveld moet waterafdichtend worden afgewerkt.",
];

export default function NadelenSwitcher() {
  const [active, setActive] = useState(0);
  const item = nadelen.items[active];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">

      {/* Thumbnail tab strip */}
      <div className="flex gap-1.5 border-b border-border overflow-x-auto scrollbar-none p-1.5">
        {nadelen.items.map((it, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`group relative flex flex-col items-center gap-0 rounded-lg overflow-hidden transition-all focus-visible:outline-none flex-1 min-w-[72px] ring-1 ${
              active === i
                ? "ring-primary/40 shadow-sm"
                : "ring-transparent hover:ring-border"
            }`}
          >
            {/* Thumbnail */}
            <div className="relative w-full h-14 sm:h-18 overflow-hidden">
              <img
                src={IMAGES[i]}
                alt={it.risico}
                width={200}
                height={72}
                className={`h-full w-full object-cover transition-all duration-300 ${
                  active === i ? "opacity-100 scale-100" : "opacity-50 scale-105 grayscale"
                }`}
              />
              {active !== i && (
                <div className="absolute inset-0 bg-black/20" />
              )}
              {active === i && (
                <div className="absolute bottom-0 inset-x-0 h-[3px] bg-primary" />
              )}
            </div>
            {/* Label */}
            <div className={`w-full px-2 py-1.5 text-center ${active === i ? "bg-primary/5" : "bg-secondary/40"}`}>
              <span className={`text-[10px] sm:text-xs font-semibold leading-tight line-clamp-2 ${
                active === i ? "text-primary" : "text-muted-foreground"
              }`}>
                {it.risico}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="grid lg:grid-cols-[1fr_320px]">

        {/* Left: large image + risk */}
        <div className="flex flex-col">
          <div className="relative h-52 sm:h-64 lg:h-72 overflow-hidden">
            <img
              key={active}
              src={IMAGES[active]}
              alt={item.risico}
              width={640}
              height={288}
              className="h-full w-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            {/* Risk badge */}
            <div className="absolute bottom-4 left-5 flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/90 backdrop-blur-sm">
                <AlertTriangle className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-sm font-bold text-white drop-shadow">{item.risico}</span>
            </div>
            {/* Step counter */}
            <div className="absolute top-4 right-4 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-semibold text-white/80 backdrop-blur-sm">
              {active + 1} / {nadelen.items.length}
            </div>
          </div>

          {/* Solution */}
          <div className="flex-1 px-5 py-5 sm:px-6">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-primary/60">
              Oplossing
            </p>
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Check className="h-3 w-3 text-primary" strokeWidth={3} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground leading-snug mb-1.5">{item.oplossing}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{SOLUTIONS_DETAIL[active]}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: how we prevent it + CTA */}
        <div className="flex flex-col justify-between border-t border-border px-5 py-5 sm:px-6 lg:border-l lg:border-t-0">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary/70">
              Hoe wij dit voorkomen
            </p>
            <ul className="space-y-3">
              {[
                "Dampopen systemen — geen opgesloten vocht",
                "Glasvezelwapening op kritieke zones",
                "Correcte plintdetaillering en profielen",
                "Grondige ondergrondcontrole en primer",
                "Periodiek onderhoudsadvies na oplevering",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span className="text-xs leading-snug text-muted-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 border-t border-border pt-4">
            <Link
              href="/contact/"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110"
            >
              Gratis inspectie aanvragen
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

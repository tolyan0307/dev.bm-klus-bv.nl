"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ClipboardList,
  ShieldCheck,
  Hammer,
  Layers,
  Paintbrush2,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { werkwijze } from "@/lib/content/sierpleister";

const ICONS = [ClipboardList, ShieldCheck, Hammer, Layers, Paintbrush2, CheckCircle2];

const LABELS = ["Opname", "Reiniging", "Herstel", "Profielen", "Sierpleister", "Oplevering"];

const DETAILS = [
  "We beoordelen de gevel ter plaatse: de staat van de ondergrond, het gewenste type sierpleister (spachtelputz, crepi of mineraal), de korrelgrootte en het systeem worden besproken en vastgelegd.",
  "De gevel wordt grondig gereinigd — algen, mos en los materiaal worden verwijderd. Daarna beoordelen we de zuigkracht en hechting van de bestaande ondergrond.",
  "Scheuren en losse plekken worden hersteld met de juiste reparatiemortel. Vervolgens brengen we een geschikte primer of voorstrijk aan voor een optimale hechting van de sierpleister.",
  "Op alle hoeken, dagkanten en onderkanten worden de juiste profielen aangebracht: hoekprofielen, plinten en scheurpreventieband op naden en aansluitingen.",
  "De sierpleister wordt laag voor laag vakkundig aangebracht in de gewenste structuur en korrelgrootte. Elk vlak wordt gelijkmatig afgewerkt voor een strakke eindlaag.",
  "Na droging controleren we alle randen, overgangen en details. Afplakmateriaal wordt verwijderd, de omgeving schoongemaakt en u inspecteert het resultaat samen met ons.",
];

export default function WerkwijzeStepper() {
  const [active, setActive] = useState(0);
  const Icon = ICONS[active];
  const total = werkwijze.steps.length;

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">

      {/* Left: stepper */}
      <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card px-5 py-5 sm:px-8 sm:py-6 lg:flex-1 transition-colors hover:border-primary/40">

        {/* ── MOBILE: prev/next nav ── */}
        <div className="mb-5 block sm:hidden">
          <div className="mb-3 flex items-center justify-between gap-2">
            <button
              onClick={() => setActive((p) => Math.max(0, p - 1))}
              disabled={active === 0}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary disabled:opacity-30"
              aria-label="Vorige stap"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex flex-1 flex-col items-center">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-primary/60">
                Stap {active + 1} van {total}
              </span>
              <span className="mt-0.5 text-sm font-bold text-foreground">{LABELS[active]}</span>
            </div>
            <button
              onClick={() => setActive((p) => Math.min(total - 1, p + 1))}
              disabled={active === total - 1}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary disabled:opacity-30"
              aria-label="Volgende stap"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          {/* Segmented progress bar */}
          <div className="flex gap-1">
            {werkwijze.steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Stap ${i + 1}`}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  i === active ? "bg-primary" : i < active ? "bg-primary/30" : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── TABLET/DESKTOP: number circle strip ── */}
        <div className="mb-6 hidden sm:flex items-center gap-1.5">
          {werkwijze.steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`group flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                active === i
                  ? "bg-primary text-white shadow-sm"
                  : "border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary"
              }`}
              aria-label={`Stap ${i + 1}`}
            >
              {i + 1}
            </button>
          ))}
          <div className="ml-2 h-px flex-1 bg-border">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((active + 1) / total) * 100}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary/70">
              Stap {active + 1} / {total}
            </p>
          </div>
          <h3 className="text-base font-bold text-foreground sm:text-lg">
            {werkwijze.steps[active].title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {DETAILS[active]}
          </p>
        </div>

        {/* Bottom nav — desktop */}
        <div className="mt-6 hidden items-center justify-between border-t border-border pt-4 sm:flex">
          <button
            onClick={() => setActive((p) => Math.max(0, p - 1))}
            disabled={active === 0}
            className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
          >
            ← Vorige
          </button>
          <div className="flex gap-1.5">
            {werkwijze.steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${
                  active === i ? "w-5 bg-primary" : "w-1.5 bg-border hover:bg-primary/40"
                }`}
                aria-label={`Stap ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => setActive((p) => Math.min(total - 1, p + 1))}
            disabled={active === total - 1}
            className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
          >
            Volgende →
          </button>
        </div>
      </div>

      {/* Right: verwachten + CTA */}
      <div className="relative flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-card px-6 py-6 sm:px-7 lg:w-[300px] lg:shrink-0">
        {/* left orange accent bar */}
        <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-primary/40" />
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary/70">
          {werkwijze.verwachten.label}
        </p>
        <ul className="flex-1 space-y-3">
          {werkwijze.verwachten.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="text-sm leading-snug text-muted-foreground">{b}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 border-t border-border pt-4">
          <Link
            href="/contact/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Plan gratis inspectie
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

    </div>
  );
}

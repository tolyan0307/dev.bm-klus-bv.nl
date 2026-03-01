"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle2 } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Option = { label: string };
type Step = { title: string; options: Option[] };

type Material = "Cementpleister" | "Betonstuc" | "Spachtelputz" | "Crepi";
type Scores = Record<Material, number>;

// ─── Quiz data ────────────────────────────────────────────────────────────────

const STEPS: Step[] = [
  {
    title: "Uiterlijk",
    options: [{ label: "Strak (glad)" }, { label: "Structuur (korrel)" }],
  },
  {
    title: "Onderhoud",
    options: [
      { label: "Zo onderhoudsarm mogelijk" },
      { label: "Geen voorkeur" },
    ],
  },
  {
    title: "Ondergrond (beste inschatting)",
    options: [
      { label: "Baksteen" },
      { label: "Bestaand stucwerk" },
      { label: "Beton" },
      { label: "Weet ik niet" },
    ],
  },
  {
    title: "Ligging / blootstelling",
    options: [
      { label: "Veel regen/wind (open ligging)" },
      { label: "Normaal" },
      { label: "Weet ik niet" },
    ],
  },
  {
    title: "Doel",
    options: [
      { label: "Renovatie (scheurtjes/oneffenheden)" },
      { label: "Nieuwe uitstraling (strak of structuur)" },
      { label: "In combinatie met gevelisolatie (ETICS)" },
      { label: "Weet ik niet" },
    ],
  },
];

// ─── Scoring ──────────────────────────────────────────────────────────────────

function computeScores(answers: (string | null)[]): {
  scores: Scores;
  eticsNote: boolean;
  unknownCount: number;
} {
  const scores: Scores = { Cementpleister: 0, Betonstuc: 0, Spachtelputz: 0, Crepi: 0 };
  let eticsNote = false;
  let unknownCount = 0;

  answers.forEach((ans, i) => {
    if (!ans) return;
    if (ans === "Weet ik niet") { unknownCount++; return; }

    if (i === 0) {
      // Step 1 — Uiterlijk
      if (ans === "Strak (glad)")       { scores.Betonstuc += 3; scores.Cementpleister += 2; }
      if (ans === "Structuur (korrel)") { scores.Spachtelputz += 3; scores.Crepi += 2; }
    }
    if (i === 1) {
      // Step 2 — Onderhoud
      if (ans === "Zo onderhoudsarm mogelijk") {
        scores.Spachtelputz += 2; scores.Cementpleister += 2; scores.Crepi += 1;
      }
    }
    if (i === 2) {
      // Step 3 — Ondergrond
      if (ans === "Beton")              { scores.Betonstuc += 3; scores.Cementpleister += 2; }
      if (ans === "Baksteen")           { scores.Cementpleister += 2; scores.Spachtelputz += 1; scores.Crepi += 1; }
      if (ans === "Bestaand stucwerk")  { scores.Cementpleister += 2; scores.Spachtelputz += 2; }
    }
    if (i === 3) {
      // Step 4 — Ligging
      if (ans === "Veel regen/wind (open ligging)") {
        scores.Cementpleister += 2; scores.Crepi += 2;
      }
    }
    if (i === 4) {
      // Step 5 — Doel
      if (ans === "Renovatie (scheurtjes/oneffenheden)") {
        scores.Cementpleister += 3; scores.Spachtelputz += 1;
      }
      if (ans === "In combinatie met gevelisolatie (ETICS)") {
        scores.Spachtelputz += 3; scores.Crepi += 2; scores.Cementpleister += 1;
        eticsNote = true;
      }
    }
  });

  return { scores, eticsNote, unknownCount };
}

const LETOP: Record<Material, string> = {
  Betonstuc:       "Vraagt een vlakke, stabiele ondergrond en correcte detaillering.",
  Spachtelputz:    "Korrelgrootte bepaalt uitstraling; een proefvlak is slim.",
  Crepi:           "Grovere structuur kan sneller vervuilen; periodiek reinigen helpt.",
  Cementpleister:  "Goede voorbereiding en hechting zijn bepalend voor duurzaamheid.",
};

function buildWaarom(answers: (string | null)[], top: Material): string[] {
  const lines: string[] = [];
  if (answers[0] === "Strak (glad)")        lines.push("U gaf de voorkeur aan een gladde, strakke uitstraling.");
  if (answers[0] === "Structuur (korrel)")   lines.push("U koos voor een zichtbare structuur in de afwerking.");
  if (answers[1] === "Zo onderhoudsarm mogelijk") lines.push("Weinig onderhoud staat hoog op uw lijst.");
  if (answers[2] && answers[2] !== "Weet ik niet") lines.push(`Uw ondergrond (${answers[2]}) sluit goed aan bij ${top}.`);
  if (answers[3] === "Veel regen/wind (open ligging)") lines.push("De ligging vraagt om een robuust en weerbestendig systeem.");
  if (answers[4] === "Renovatie (scheurtjes/oneffenheden)") lines.push("Voor renovatie is een goede hechting op de bestaande laag essentieel.");
  if (answers[4] === "In combinatie met gevelisolatie (ETICS)") lines.push("Bij ETICS is de afwerklaag onderdeel van een gecertificeerd systeem.");
  // Fallback
  if (lines.length < 2) lines.push(`${top} scoorde het hoogst op basis van uw antwoorden.`);
  return lines.slice(0, 3);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AfwerkingKeuzehulp() {
  const [step, setStep] = useState(0); // 0-4 = questions, 5 = result
  const [answers, setAnswers] = useState<(string | null)[]>(Array(5).fill(null));

  const currentAnswer = answers[step];
  const total = STEPS.length;

  function select(label: string) {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = label;
      return next;
    });
  }

  function next() {
    if (step < total - 1) setStep((s) => s + 1);
    else setStep(total); // show result
  }

  function back() {
    if (step > 0) setStep((s) => s - 1);
  }

  function reset() {
    setStep(0);
    setAnswers(Array(5).fill(null));
  }

  // ── Result ──
  if (step === total) {
    const { scores, eticsNote, unknownCount } = computeScores(answers);
    const sorted = (Object.entries(scores) as [Material, number][]).sort((a, b) => b[1] - a[1]);
    const [topMat] = sorted[0];
    const alternatives = sorted.slice(1, 3).map(([m]) => m);
    const waarom = buildWaarom(answers, topMat);

    return (
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary/70">Keuzehulp — resultaat</p>
            <h3 className="text-lg font-bold text-foreground sm:text-xl">
              Advies (indicatief):{" "}
              <span className="text-primary">{topMat === "Betonstuc" ? "Betonstuc (betonlook)" : topMat}</span>
            </h3>
          </div>
          <button
            onClick={reset}
            className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            <RotateCcw size={12} />
            Opnieuw
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Waarom */}
          <div className="rounded-xl border border-border bg-secondary/30 px-5 py-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary/70">Waarom</p>
            <ul className="space-y-2">
              {waarom.map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span className="text-sm leading-snug text-muted-foreground">{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Let op + alternatieven */}
          <div className="flex flex-col gap-3">
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-800 dark:bg-amber-950/30">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-amber-600">Let op</p>
              <p className="text-sm leading-snug text-amber-800 dark:text-amber-300">{LETOP[topMat]}</p>
              {eticsNote && (
                <p className="mt-2 text-sm leading-snug text-amber-800 dark:text-amber-300">
                  Bij ETICS is de laagopbouw systeemgebonden (wapening + afwerklaag).
                </p>
              )}
            </div>

            {/* Alternatieven */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Alternatieven</p>
              <div className="flex flex-wrap gap-2">
                {alternatives.map((alt) => (
                  <span
                    key={alt}
                    className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {alt === "Betonstuc" ? "Betonstuc (betonlook)" : alt}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Unknown nudge */}
        {unknownCount > 0 && (
          <p className="mt-4 text-xs italic text-muted-foreground">
            Geen probleem — met een paar foto&apos;s kunnen we sneller adviseren.
          </p>
        )}

        {/* CTA */}
        <div className="mt-5 border-t border-border pt-4">
          <p className="text-sm text-muted-foreground">
            Wilt u zekerheid?{" "}
            <Link href="/contact/" className="font-semibold text-primary hover:underline underline-offset-4">
              Vraag advies aan via het contactformulier.
            </Link>
          </p>
          <p className="mt-2 text-[11px] text-muted-foreground/60 italic">
            Dit is een indicatie. Definitieve keuze hangt af van de staat van de gevel en de laagopbouw.
          </p>
        </div>
      </div>
    );
  }

  // ── Question ──
  const currentStep = STEPS[step];

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      {/* Progress bar */}
      <div className="my-5">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-xs font-semibold text-primary">
            Stap {step + 1} van {total}
          </span>
          <span className="text-xs text-muted-foreground">{currentStep.title}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${((step + 1) / total) * 100}%` }}
          />
        </div>
        {/* Step dots */}
        <div className="mt-2 flex gap-1.5">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i < step ? "bg-primary/40" : i === step ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Options */}
      <div className="grid gap-2 sm:grid-cols-2">
        {currentStep.options.map(({ label }) => {
          const isSelected = currentAnswer === label;
          return (
            <button
              key={label}
              onClick={() => select(label)}
              aria-pressed={isSelected}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isSelected
                  ? "border-primary bg-primary/8 text-foreground shadow-sm"
                  : "border-border bg-secondary/30 text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
              }`}
            >
              <div
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  isSelected ? "border-primary bg-primary" : "border-border"
                }`}
              >
                {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
              </div>
              {label}
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <button
          onClick={step === 0 ? reset : back}
          className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          {step === 0 ? (
            <>
              <RotateCcw size={12} /> Wissen
            </>
          ) : (
            <>
              <ChevronLeft size={14} /> Vorige
            </>
          )}
        </button>

        <button
          onClick={next}
          disabled={!currentAnswer}
          className="flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110 disabled:opacity-40"
        >
          {step === total - 1 ? "Bekijk advies" : "Volgende"}
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

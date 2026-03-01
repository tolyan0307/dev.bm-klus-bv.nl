import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Check,
  ArrowRight,
  Layers,
  Wrench,
  Shield,
  ShieldCheck,
  Paintbrush2,
  Sparkles,
  Palette,
  ChevronRight,
  AlertTriangle,
  RotateCcw,
  Thermometer,
} from "lucide-react";
import { buildPageMetadata } from "@/lib/seo/meta";
import {
  hero,
  toc,
  watIs,
  voordelen,
  kosten,
  werkwijze,
  materialen,
  ondergronden,
  nadelen,
  reparatie,
  isolatie,
  internalLinks,
} from "@/lib/content/buiten-stucwerk";
import { FaqAccordion } from "./faq-accordion";
import WerkwijzeStepper from "./werkwijze-stepper";
import AfwerkingKeuzehulp from "@/components/sections/buiten-stucwerk/AfwerkingKeuzehulp";
import NadelenSwitcher from "./nadelen-switcher";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata = buildPageMetadata("/buiten-stucwerk/");

// ─── Shared helpers ────────────────────────────────────────────────────────────

function SectionTagline({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="h-px w-10 bg-primary" />
      <span className="text-sm font-semibold uppercase tracking-wider text-primary">
        {children}
      </span>
    </div>
  );
}

function SectionHeading({ plain, accent }: { plain: string; accent: string }) {
  return (
    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
      {plain}{" "}
      <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
        {accent}
        <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-primary/40" />
      </span>
    </h2>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function BuitenStucwerkPage() {
  return (
    <>

      {/* ══ HERO ═══════════════════════════════════════════════════════════════ */}
      <section
        className="relative flex flex-col overflow-hidden"
        style={{
          background:
            "linear-gradient(175deg, #1A1A1A 0%, #2A1C0E 35%, #6B3D1A 60%, #BF722A 78%, #F5EFE6 100%)",
        }}
      >
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative z-10 flex-1 flex items-end">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 sm:pt-40 lg:pt-44">
            <div className="flex">
              <div className="flex flex-col gap-6 pb-16 sm:pb-20 lg:pb-24 max-w-2xl">

                {/* Breadcrumbs */}
                <nav aria-label="Breadcrumb">
                  <ol className="flex flex-wrap items-center gap-1 text-xs text-white/60">
                    {hero.breadcrumbs.map((crumb, i) => (
                      <li key={crumb.href} className="flex items-center gap-1">
                        {i > 0 && <span aria-hidden="true">/</span>}
                        {i < hero.breadcrumbs.length - 1 ? (
                          <Link
                            href={crumb.href}
                            className="hover:text-white/70 transition-colors"
                          >
                            {crumb.label}
                          </Link>
                        ) : (
                          <span className="text-white/60">{crumb.label}</span>
                        )}
                      </li>
                    ))}
                  </ol>
                </nav>

                <p className="text-[#E8600A] text-xs font-bold tracking-[0.25em] uppercase">
                  Buiten stucwerk &amp; gevel stucen · Rotterdam
                </p>

                <h1 className="text-balance text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-[3.75rem]">
                  {hero.h1.split("strakke buitengevel")[0]}
                  <span className="text-[#E8600A] decoration-[#E8600A]/40 underline decoration-[3px] underline-offset-4">
                    strakke buitengevel
                          </span>
                </h1>

                <p className="max-w-md text-base leading-relaxed text-white/80 sm:text-lg lg:text-xl">
                  {hero.lead[0]}
                </p>
                <p className="max-w-md text-sm leading-relaxed text-white/60">
                  {hero.lead[1]}
                </p>
                <p className="text-xs text-white/45">{hero.geoSentence}</p>

                {/* Trust bullets */}
                <div className="flex flex-col gap-2.5">
                  {hero.trustBullets.map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <CheckCircle2 size={15} className="text-[#E8600A] shrink-0" />
                      <span className="text-sm text-white/70">{item}</span>
                    </div>
                  ))}
                </div>

                {/* CTA links */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href="/contact/"
                    className="inline-flex items-center justify-center gap-2 bg-[#E8600A] text-white font-semibold px-7 py-4 text-sm tracking-wide hover:bg-[#d0540a] transition-colors rounded-sm"
                  >
                    Plan gratis inspectie
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/diensten/"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/25 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/20 tracking-wide"
                  >
                    Bekijk onze diensten
                  </Link>
                </div>

                {/* Text CTAs */}
                <div className="flex flex-wrap gap-4 pt-1">
                  {hero.ctaLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-white/80 transition-colors underline-offset-4 hover:underline"
                    >
                      {link.label}
                      <ChevronRight size={12} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ MAIN ═══════════════════════════════════════════════════════════════ */}
      <main className="overflow-hidden bg-background pb-16 sm:pb-20 lg:pb-24">

        {/* ── TOC ─────────────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14">
          <nav aria-label="Inhoudsopgave">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                Inhoud
              </span>
              <span className="h-px flex-1 bg-primary/15" />
            </div>
            <div className="flex flex-wrap gap-2">
              {toc.map((item, i) => (
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
        </div>

        {/* ── WAT IS BUITENMUUR STUCEN ─────────────────────────────────────── */}
        <section id={watIs.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* Heading — outside the card */}
            <SectionTagline>Definitie</SectionTagline>
            <h2 className="mt-2 mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              Wat is <span className="text-primary">buitenmuur stucen?</span>
            </h2>

            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:grid lg:grid-cols-[1fr_420px]">

              {/* Left: copy */}
              <div className="flex flex-col justify-center px-8 py-8 sm:px-10 lg:py-10">
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {watIs.intro}
                </p>

                {/* Divider */}
                <div className="my-6 h-px bg-border" />

                {/* Wanneer — inline list */}
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary/70">
                  {watIs.wanneer.h3}
                </p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {watIs.wanneer.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={3} />
                      <span className="text-sm leading-snug text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Buiten vs binnen */}
                <div className="mt-6 rounded-xl bg-secondary/50 px-5 py-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary/70">
                    {watIs.buitenVsBinnen.h3}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {watIs.buitenVsBinnen.body}
                  </p>
                </div>
              </div>

              {/* Image — top strip on mobile, flush right on desktop */}
              <div className="relative h-52 w-full lg:h-auto">
                <Image
                  src="/images/wat-is-buitenmuur-stucen.webp"
                  alt="Stukadoor brengt cementpleister aan op de buitenmuur van een woning"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-card/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-[11px] text-white/90 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Cementpleister op bakstenen gevel
                  </span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ── VOORDELEN ────────────────────────────────────────────────────── */}
        <section
          id={voordelen.id}
          className="scroll-mt-24 py-16 sm:py-20 lg:py-24 relative before:absolute before:inset-y-0 before:-inset-x-[50vw] before:-z-10 before:bg-secondary/40"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Heading outside */}
            <SectionTagline>Voordelen</SectionTagline>
            <h2 className="mt-2 mb-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              Voordelen van <span className="text-primary">buiten stucwerk</span>
            </h2>

            {/* Cards grid */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Sparkles,     ...voordelen.items[0] },
                { icon: ShieldCheck,  ...voordelen.items[1] },
                { icon: Paintbrush2,  ...voordelen.items[2] },
                { icon: Wrench,       ...voordelen.items[3] },
                { icon: Palette,      ...voordelen.items[4] },
              ].map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="group relative flex gap-4 rounded-xl border border-border bg-card px-5 py-5 transition-colors hover:border-primary/40 hover:bg-primary/[0.03]"
                >
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-primary/20 group-hover:bg-primary/50 transition-colors" />
                  {/* Icon */}
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold leading-snug text-foreground">{title}</p>
                    <p className="text-xs leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}

              {/* Note card — spans remaining column on large screens */}
              <div className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-transparent px-5 py-5 sm:col-span-2 lg:col-span-1">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                <p className="text-xs italic leading-relaxed text-muted-foreground">{voordelen.note}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── KOSTEN ───������─────────────────�������──────────────────────────────��������──── */}
        <section id={kosten.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* Heading outside */}
            <SectionTagline>Kosten</SectionTagline>
            <h2 className="mt-2 mb-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              Kosten buitenmuur stucen{" "}
              <span className="text-primary">(prijs per m²)</span>
            </h2>

            {/* Intro + stat banner */}
            <div className="mb-6 rounded-2xl border border-border bg-card overflow-hidden">
              <div className="px-6 py-5 sm:px-8">
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {kosten.intro}
                </p>
              </div>
              {/* Stat strip */}
              <div className="grid grid-cols-2 divide-x divide-border border-t border-border bg-secondary/40 sm:grid-cols-4">
                {kosten.prices.map(({ label, value }) => (
                  <div key={label} className="flex flex-col items-center py-4 px-3 text-center">
                    <span className="text-base font-bold text-primary sm:text-lg">{value}</span>
                    <span className="mt-0.5 text-[11px] text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
              {/* Disclaimer */}
              <div className="border-t border-border bg-secondary/20 px-5 py-3 space-y-0.5">
                {kosten.disclaimer.map((line, i) => (
                  <p key={i} className="text-[11px] leading-relaxed text-muted-foreground">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Two columns */}
            <div className="grid gap-4 lg:grid-cols-2">
              {/* Prijsfactoren */}
              <div className="rounded-2xl border border-border bg-card px-6 py-5 sm:px-7">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary/70">
                  {kosten.priceFactors.h3}
                </p>
                <ul className="space-y-2">
                  {kosten.priceFactors.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={3} />
                      <span className="text-sm leading-snug text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Wat zit in de prijs + callout + CTA */}
              <div className="flex flex-col gap-4">
                <div className="rounded-2xl border border-border bg-card px-6 py-5 sm:px-7">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary/70">
                    {kosten.inPrijs.h3}
                  </p>
                  <ul className="space-y-2">
                    {kosten.inPrijs.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                        <span className="text-sm leading-snug text-muted-foreground">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Callout + CTA */}
                <div className="rounded-2xl border border-primary/25 bg-primary/5 px-6 py-5 sm:px-7">
                  <div className="flex gap-3">
                    <div className="w-[3px] shrink-0 self-stretch rounded-full bg-primary/50" />
                    <p className="text-sm italic leading-relaxed text-muted-foreground">
                      {kosten.callout}
                    </p>
                  </div>
                  <Link
                    href="/contact/"
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110"
                  >
                    Gratis offerte aanvragen
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── MID-PAGE CTA ──────────────────────────────────────────────────── */}
        <section
          aria-label="Offerte aanvragen"
          className="relative py-16 sm:py-20 lg:py-24 bg-[#1A1A1A]"
          style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)", marginTop: "3rem", marginBottom: "3rem", paddingLeft: "calc(50vw - 50%)", paddingRight: "calc(50vw - 50%)" }}
        >
          {/* Decorative glow spots */}
          <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-primary/15 blur-[120px]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-[320px] w-[320px] rounded-full bg-primary/10 blur-[100px]" />
          {/* Diagonal texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "repeating-linear-gradient(135deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px)" }}
          />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Gratis &amp; vrijblijvend</p>
                <h2 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                  Klaar voor een{" "}
                  <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
                    fraaie gevel?
                          </span>
                </h2>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-white/55">
                  Vraag een gratis opname aan. We beoordelen uw gevel ter plaatse en sturen een heldere
                  offerte — zonder verplichtingen.
                </p>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {[
                    "Snelle reactie tijdens openingstijden",
                    "Opname ter plaatse",
                    "Heldere offerte met scope",
                  ].map((t) => (
                    <div key={t} className="flex items-center gap-2">
                      <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20">
                        <Check className="h-2.5 w-2.5 text-primary" strokeWidth={3} />
                      </div>
                      <span className="text-xs text-white/70">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col lg:min-w-[220px]">
                <Link
                  href="/contact/"
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-4 text-sm font-bold text-white shadow-sm transition-all hover:bg-primary/90 hover:shadow-lg"
                >
                  Offerte aanvragen
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── WERKWIJZE ─────────────────────────────────────────────────────── */}
        <section
          id={werkwijze.id}
          className="scroll-mt-24 py-16 sm:py-20 lg:py-24 relative before:absolute before:inset-y-0 before:-inset-x-[50vw] before:-z-10 before:bg-secondary/40"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* Heading outside */}
            <SectionTagline>Werkwijze</SectionTagline>
            <h2 className="mt-2 mb-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              Van inspectie <span className="text-primary">tot oplevering</span>
            </h2>

            <WerkwijzeStepper />
          </div>
        </section>

        {/* ── MATERIALEN & AFWERKINGEN ─────────────────────────────────────── */}
        <section id={materialen.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* Heading outside */}
            <SectionTagline>Materialen</SectionTagline>
            <h2 className="mt-2 mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              Materialen en <span className="text-primary">afwerkingen</span>
            </h2>
            <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {materialen.intro}
            </p>

            {/* 4 material cards — horizontal strip */}
            {(() => {
              const swatches = [
                { src: "/images/swatches/cementpleister.webp", alt: "Cementpleister textuur" },
                { src: "/images/swatches/betonstuc.webp",      alt: "Betonstuc textuur" },
                { src: "/images/swatches/spachtelputz.webp",   alt: "Spachtelputz textuur" },
                { src: "/images/swatches/crepi.webp",          alt: "Crepi textuur" },
              ];
              return (
                <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {materialen.subsections.map((s, i) => (
                    <div
                      key={s.h3}
                      className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40"
                    >
                      {/* Texture swatch strip */}
                      <div className="h-20 w-full overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={swatches[i].src}
                          alt={swatches[i].alt}
                          width={400}
                          height={80}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Card body */}
                      <div className="px-4 pb-4 pt-3">
                        <h3 className="mb-2 text-sm font-semibold leading-snug text-foreground">{s.h3}</h3>
                        <ul className="space-y-1.5">
                          {s.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-2">
                              <div className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                              <span className="text-xs leading-relaxed text-muted-foreground">{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* Comparison table */}
            <div className="overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-primary/20 bg-primary/8">
                    {materialen.table.headers.map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3 text-left font-semibold text-primary"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {materialen.table.rows.map((row, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={`px-5 py-3 leading-relaxed ${
                            j === 0 ? "font-medium text-foreground" : ""
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </section>

        {/* ── KEUZEHULP ─────────────────────────────────────────────────────── */}
        <section id="keuzehulp" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTagline>Keuzehulp</SectionTagline>
            <h2 className="mt-2 mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              Welke afwerking past <span className="text-primary">bij uw gevel?</span>
            </h2>
            <p className="mb-8 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Beantwoord 5 korte vragen en ontvang een advies (indicatief).
            </p>
            <AfwerkingKeuzehulp />
          </div>
        </section>

        {/* ── ONDERGRONDEN & TECHNIEK — tinted bg ─────────────────────────── */}
        <section
          id={ondergronden.id}
          className="scroll-mt-24 py-16 sm:py-20 lg:py-24 relative before:absolute before:inset-y-0 before:-inset-x-[50vw] before:-z-10 before:bg-secondary/40"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* Heading outside */}
            <SectionTagline>Techniek</SectionTagline>
            <h2 className="mt-2 mb-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              Ondergronden: <span className="text-primary">baksteen, beton & stucwerk</span>
            </h2>

            {/* Cards with swatch photos */}
            {(() => {
              const swatches = [
                { src: "/images/swatches/baksteen.webp",         alt: "Baksteen ondergrond" },
                { src: "/images/swatches/beton.jpg",            alt: "Beton ondergrond" },
                { src: "/images/swatches/bestaand-stucwerk.webp",alt: "Bestaand stucwerk ondergrond" },
              ];
              return (
                <div className="mb-4 grid gap-3 sm:grid-cols-3">
                  {ondergronden.cards.map(({ title, body }, i) => (
                    <div
                      key={title}
                      className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/40"
                    >
                      {/* Texture swatch strip */}
                      <div className="h-20 w-full overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={swatches[i].src}
                          alt={swatches[i].alt}
                          width={400}
                          height={80}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      {/* Card body */}
                      <div className="px-5 pb-5 pt-3">
                        <p className="mb-2 text-sm font-semibold text-foreground">{title}</p>
                        <p className="text-xs leading-relaxed text-muted-foreground">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* Detaillering note */}
            <div className="flex gap-3 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
              <div className="mt-1 w-[3px] shrink-0 self-stretch rounded-full bg-primary/40" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                {ondergronden.detaillering}
              </p>
            </div>

          </div>
        </section>

        {/* ── NADELEN & RISICO'S ───────────────────────────────────────────── */}
        <section id={nadelen.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <SectionTagline>{"Risico's"}</SectionTagline>
            <h2 className="mt-2 mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              Nadelen en hoe u <span className="text-primary">problemen voorkomt</span>
            </h2>
            <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {nadelen.intro}
            </p>

            <NadelenSwitcher />

          </div>
        </section>

        {/* ── REPARATIE & HERSTEL — tinted bg ─────────────────────────────── */}
        <section
          id={reparatie.id}
          className="scroll-mt-24 py-16 sm:py-20 lg:py-24 relative before:absolute before:inset-y-0 before:-inset-x-[50vw] before:-z-10 before:bg-secondary/40"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* Heading outside */}
            <SectionTagline>Reparatie</SectionTagline>
            <h2 className="mt-2 mb-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              Stucwerk buiten <span className="text-primary">repareren & herstellen</span>
            </h2>

            <div className="grid gap-4 lg:grid-cols-[1fr_300px] lg:items-stretch">

              {/* Left card: image + paragraphs */}
              <div className="overflow-hidden rounded-2xl border border-border bg-card lg:grid lg:grid-cols-[340px_1fr] lg:items-stretch">

                {/* Image — top strip on mobile, flush left on desktop */}
                <div className="h-52 w-full lg:h-auto">
                  <img
                    src="/images/stucwerk-reparatie.webp"
                    alt="Stukadoor herstelt en repareert scheuren in buitenmuur stucwerk"
                    width={340}
                    height={208}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Paragraphs */}
                <div className="flex flex-col justify-center gap-5 px-7 py-7">
                  {reparatie.paragraphs.map((p, i) => (
                    <div key={i}>
                      <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{p}</p>
                      {i < reparatie.paragraphs.length - 1 && (
                        <div className="mt-5 h-px bg-border" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right card: repair checklist */}
              <div className="flex flex-col rounded-2xl border border-primary/25 bg-primary/5 px-6 py-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10">
                    <RotateCcw className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary/70">
                    Herstelwerkzaamheden
                  </p>
                </div>
                <ul className="flex-1 space-y-3">
                  {reparatie.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={3} />
                      <span className="text-sm leading-snug text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 border-t border-primary/20 pt-4">
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
        </section>

        {/* ── STUCEN MET ISOLATIE (cross-sell) ─────────────────────────────── */}
        <section id={isolatie.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* Heading outside */}
            <SectionTagline>ETICS</SectionTagline>
            <h2 className="mt-2 mb-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              Buitenmuur isoleren <span className="text-primary">en stucen (ETICS)</span>
            </h2>

            {/* Card */}
            <div className="overflow-hidden rounded-2xl border border-border bg-card lg:grid lg:grid-cols-[1fr_400px] lg:items-stretch">

              {/* Left: content */}
              <div className="flex flex-col justify-between gap-8 px-7 py-8 sm:px-10">
                {/* ETICS layers */}
                <div>
                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {isolatie.body}
                  </p>
                  {/* Layer stack */}
                  <div className="space-y-2">
                    {[
                      { n: "1", label: "Bestaande gevel (baksteen / beton)", color: "bg-stone-400" },
                      { n: "2", label: "EPS isolatieplaten (hechtmiddel + ankers)", color: "bg-amber-200" },
                      { n: "3", label: "Glasvezelwapeningslaag (stucmortel + net)", color: "bg-primary/30" },
                      { n: "4", label: "Afwerklaag: sierpleister of betonstuc", color: "bg-primary" },
                    ].map(({ n, label, color }) => (
                      <div key={n} className="flex items-center gap-3">
                        <div className={`h-5 w-5 shrink-0 rounded-sm ${color}`} />
                        <span className="text-xs font-medium text-foreground">{n}.</span>
                        <span className="text-xs leading-snug text-muted-foreground">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href="/contact/"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110"
                  >
                    Gratis offerte aanvragen
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    href={isolatie.linkHref}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4"
                  >
                    {isolatie.linkLabel}
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Image — bottom strip on mobile, flush right on desktop */}
              <div className="h-52 w-full lg:h-auto">
                <img
                  src="/images/etics-isolatie-stucwerk.webp"
                  alt="ETICS buitengevelisolatie systeem — isolatieplaten op gevel"
                  width={340}
                  height={208}
                  className="h-full w-full object-cover"
                />
              </div>

            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <div className="relative before:absolute before:inset-y-0 before:-inset-x-[50vw] before:-z-10 before:bg-secondary/40">
        <section id="faq" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
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
                  <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground sm:text-lg">
                    Heeft u vragen over buitenmuur stucen? Hier vindt u de antwoorden op de meest gestelde vragen.
                  </p>
                  <p className="mt-8 text-base text-muted-foreground">
                    Staat uw vraag er niet tussen?{" "}
                    <Link href="/contact/" className="font-semibold text-primary hover:underline">
                      Neem contact op
                    </Link>
                  </p>
                </div>
              </div>
              <div className="lg:col-span-7">
                <FaqAccordion />
              </div>
            </div>
          </div>
        </section>
        </div>

        {/* ── INTERNAL LINKS ───────────────────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
          <nav aria-label="Gerelateerde pagina's">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Gerelateerde pagina&apos;s:</span>
              {internalLinks.map((link, i) => (
                <span key={link.href} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true" className="text-border">•</span>}
                  <Link
                    href={link.href}
                    className="hover:text-primary hover:underline underline-offset-4 transition-colors"
                  >
                    {link.label}
                  </Link>
                </span>
              ))}
            </div>
          </nav>
        </div>

      </main>

    </>
  );
}

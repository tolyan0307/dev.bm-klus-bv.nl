import Image from "next/image";
import Link from "next/link";
import WerkwijzeStepper from "./werkwijze-stepper";
import {
  CheckCircle2,
  Check,
  ArrowRight,
  Layers,
  Shield,
  ShieldCheck,
  Paintbrush2,
  Sparkles,
  ChevronRight,
  Clock,
  AlertCircle,
  Home,
  RotateCcw,
  Hammer,
} from "lucide-react";
import { buildPageMetadata } from "@/lib/seo/meta";
import {
  hero,
  toc,
  watIs,
  afwerking,
  voordelen,
  kosten,
  ctaStrip,
  werkwijze,
  voorbereiding,
  droogtijd,
  faq,
  internalLinks,
} from "@/lib/content/muren-stucen";
import FaqAccordionInner from "./faq-accordion";

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata = buildPageMetadata("/muren-stucen/");

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

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function MurenStucenPage() {
  return (
    <>

      {/* ══ HERO ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative flex flex-col overflow-hidden"
        style={{
          background:
            "linear-gradient(175deg, #1A1A1A 0%, #2A1C0E 35%, #6B3D1A 60%, #BF722A 78%, #F5EFE6 100%)",
        }}
      >
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
                          <Link href={crumb.href} className="hover:text-white/70 transition-colors">
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
                  Stucwerk binnen &amp; binnenmuren stucen · Rotterdam
                </p>

                <h1 className="text-balance text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-[3.75rem]">
                  Muren stucen (binnen):{" "}
                  <span className="text-[#E8600A] decoration-[#E8600A]/40 underline decoration-[3px] underline-offset-4">
                    sausklaar stucwerk
                          </span>{" "}
                  voor strakke wanden
                </h1>

                <p className="max-w-md text-base leading-relaxed text-white/80 sm:text-lg lg:text-xl">
                  Binnenmuren stucen voor een egale, vlakke ondergrond — behangklaar of sausklaar, naar uw wens. Met glad stucwerk werkt u oneffenheden weg en creëert u een uitstekende basis voor verf of behang.
                </p>
                <p className="max-w-md text-sm leading-relaxed text-white/60">
                  BM klus BV voert stucwerk binnen uit met aandacht voor hoeken, naden en een goede voorbereiding van de ondergrond.
                </p>
                <p className="text-xs text-white/45">{hero.geoSentence}</p>

                <div className="flex flex-col gap-2.5">
                  {hero.trustBullets.map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <CheckCircle2 size={15} className="text-[#E8600A] shrink-0" />
                      <span className="text-sm text-white/70">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href="/contact/"
                    className="inline-flex items-center justify-center gap-2 bg-[#E8600A] text-white font-semibold px-7 py-4 text-sm tracking-wide hover:bg-[#d0540a] transition-colors rounded-sm"
                  >
                    Offerte aanvragen
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/diensten/"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/25 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/20 tracking-wide"
                  >
                    Bekijk diensten
                  </Link>
                </div>

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

      {/* ══ MAIN ════════════════════════════════════════════════════════════════ */}
      <main className="bg-background pb-16 sm:pb-20 lg:pb-24">

        {/* ── TOC ───────────�����──────────────────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14">
          <nav aria-label="Inhoudsopgave">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Inhoud</span>
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

        {/* ── WAT IS MUREN STUCEN ──────────────────────────────────────────── */}
        <section id={watIs.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <div className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:gap-14 items-center">

              {/* Left: text */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="h-px w-10 bg-primary" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-primary">Uitleg</span>
                </div>
                <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
                  Wat is{" "}
                  <span className="text-primary">muren stucen</span>{" "}
                  (binnen)?
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground">{watIs.intro}</p>
                <div className="h-px bg-border" />
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/70">
                  Wanneer kiest u voor muren stucen?
                </p>
                <div className="pt-2">
                  <Link
                    href="/contact/"
                    className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:brightness-110"
                  >
                    Gratis offerte aanvragen
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              {/* Right: hero image */}
              <div className="relative">
                <div aria-hidden className="absolute -bottom-4 -right-4 h-32 w-32 rounded-2xl bg-primary/10 lg:-bottom-6 lg:-right-6 lg:h-48 lg:w-48" />
                <div aria-hidden className="absolute -top-4 -left-4 h-16 w-16 rounded-xl bg-primary/8 lg:-top-5 lg:-left-5" />
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src="/images/muren-stucen-wat-is.webp"
                    alt="Vakman brengt stucwerk aan op binnenmuur — BM klus BV Rotterdam"
                    width={720}
                    height={540}
                    className="h-[260px] w-full object-cover sm:h-[320px] lg:h-[380px]"
                    priority={false}
                  />
                  <div aria-hidden className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3.5 py-2 backdrop-blur-md border border-white/20">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="text-xs font-semibold text-white">Vakkundig stucwerk · Rotterdam &amp; omgeving</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Wanneer-situaties: 4-kaartgrid */}
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { img: "/images/muren-stucen-nieuwbouw.webp",        alt: "Nieuwbouw wanden klaar voor stucwerk",                title: "Nieuwbouw",              body: "Strakke wanden direct na de bouw afwerken voor een perfecte basis." },
                { img: "/images/muren-stucen-renovatie.webp",         alt: "Beschadigd en gebarsten pleisterwerk bij renovatie",  title: "Renovatie",              body: "Verouderd of beschadigd pleisterwerk vervangen voor een als nieuw resultaat." },
                { img: "/images/muren-stucen-behang-verwijderen.webp",alt: "Oud behang verwijderd van de muur",                   title: "Na behang verwijderen",  body: "Lijmresten en oneffenheden egaliseren na het strippen van oud behang." },
                { img: "/images/muren-stucen-schilderen.webp",        alt: "Schilder verflaag op glad gestuckte muur",           title: "Voorbereiding afwerking",body: "Ideale ondergrond voor schilderen of behangen — egaal en hecht." },
              ].map((c) => (
                <div
                  key={c.title}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={c.img}
                      alt={c.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 p-4">
                    <p className="text-sm font-bold text-foreground">{c.title}</p>
                    <p className="text-xs leading-relaxed text-muted-foreground">{c.body}</p>
                  </div>
                  <div className="mt-auto h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── AFWERKING BEHANGKLAAR / SAUSKLAAR ─────────────────────────────── */}
        <div className="bg-secondary/40">
          <section id={afwerking.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

              <SectionTagline>Afwerking</SectionTagline>
              <h2 className="mt-2 mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
                Behangklaar vs. sausklaar:{" "}
                <span className="text-primary">wat is het verschil?</span>
              </h2>
              <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {afwerking.intro}
              </p>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {afwerking.cards.map((card) => (
                  <div
                    key={card.title}
                    className="group relative flex flex-col gap-3 overflow-hidden rounded-xl border border-primary/15 bg-primary/[0.04] px-5 py-5 transition-all hover:border-primary/35 hover:bg-primary/[0.08] hover:shadow-sm"
                  >
                    <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-primary/40 transition-colors group-hover:bg-primary/70" />
                    <p className="text-sm font-bold text-foreground">{card.title}</p>
                    <ul className="space-y-1.5">
                      {card.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                          <span className="text-xs leading-relaxed text-muted-foreground">{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-2 border-t border-primary/15">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-primary/80">Geschikt voor</span>
                      <p className="mt-0.5 text-xs text-muted-foreground">{card.geschiktVoor}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-sm italic text-muted-foreground">{afwerking.closeLine}</p>

            </div>
          </section>
        </div>

        {/* ── VOORDELEN ─────────────────────────────────────────────────────── */}
        <section id={voordelen.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-10 bg-primary" />
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">Voordelen</span>
            </div>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
              Voordelen van{" "}
              <span className="text-primary">binnenmuren stucen</span>
            </h2>

            <div className="mt-10 grid gap-8 lg:grid-cols-[380px_1fr] lg:items-stretch lg:gap-14">

              {/* Photo — full height */}
              <div className="flex min-h-[280px] sm:min-h-[360px] lg:min-h-0">
                <div className="relative w-full overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src="/images/muren-stucen-voordelen.webp"
                    alt="Modern interieur met glad gestuckte wanden — BM Klus BV Rotterdam"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 380px"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-white/70">Eindresultaat</p>
                    <p className="mt-1 text-sm font-semibold leading-snug text-white">
                      Strakke wanden voor een premium interieur
                    </p>
                  </div>
                </div>
              </div>

              {/* Voordelen list */}
              <div className="flex flex-col gap-4">
                {[
                  { icon: Sparkles,    ...voordelen.items[0] },
                  { icon: Paintbrush2, ...voordelen.items[1] },
                  { icon: ShieldCheck, ...voordelen.items[2] },
                  { icon: Shield,      ...voordelen.items[3] },
                  { icon: Layers,      ...voordelen.items[4] },
                ].map(({ icon: Icon, title, body }) => (
                  <div
                    key={title}
                    className="group flex items-start gap-4 rounded-xl border border-border bg-card px-5 py-4 transition-all hover:border-primary/30 hover:shadow-sm"
                  >
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </section>

        {/* ── KOSTEN ───────────────────────────────────────────────────────── */}
        <div className="bg-secondary/40">
          <section id={kosten.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

              <SectionTagline>Kosten</SectionTagline>
              <h2 className="mt-2 mb-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
                Kosten muren stucen{" "}
                <span className="text-primary">(prijs per m²)</span>
              </h2>

              <div className="mb-6 rounded-2xl border border-border bg-card overflow-hidden">
                <div className="px-6 py-5 sm:px-8">
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{kosten.intro}</p>
                </div>
                <div className="grid grid-cols-2 divide-x divide-border border-t border-border bg-secondary/40 sm:grid-cols-4">
                  {kosten.prices.map(({ label, value, note }) => (
                    <div key={label} className="flex flex-col items-center py-4 px-3 text-center">
                      <span className="text-base font-bold text-primary sm:text-lg">{value}</span>
                      <span className="mt-0.5 text-[11px] text-muted-foreground">{label}</span>
                      {note && <span className="mt-1 text-[10px] leading-snug text-muted-foreground/70 italic">{note}</span>}
                    </div>
                  ))}
                </div>
                <div className="border-t border-border bg-secondary/20 px-5 py-3 space-y-0.5">
                  {kosten.disclaimer.map((line, i) => (
                    <p key={i} className="text-[11px] leading-relaxed text-muted-foreground">{line}</p>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card px-6 py-5 sm:px-7">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary/70">{kosten.priceFactors.h3}</p>
                  <ul className="space-y-2">
                    {kosten.priceFactors.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={3} />
                        <span className="text-sm leading-snug text-muted-foreground">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="rounded-2xl border border-border bg-card px-6 py-5 sm:px-7">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary/70">{kosten.inPrijs.h3}</p>
                    <ul className="space-y-2">
                      {kosten.inPrijs.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                          <span className="text-sm leading-snug text-muted-foreground">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-primary/25 bg-primary/5 px-6 py-5 sm:px-7">
                    <div className="flex gap-3">
                      <div className="w-[3px] shrink-0 self-stretch rounded-full bg-primary/50" />
                      <p className="text-sm italic leading-relaxed text-muted-foreground">{kosten.callout}</p>
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
        </div>

        {/* ── CTA STRIP ────────────────────────────────────────────────────── */}
        <section
          aria-label="Offerte aanvragen"
          className="relative py-16 sm:py-20 lg:py-24 bg-[#1A1A1A] -mx-[calc(50vw-50%)] px-[calc(50vw-50%)] my-12"
        >
          <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-primary/15 blur-[120px]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-[320px] w-[320px] rounded-full bg-primary/10 blur-[100px]" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "repeating-linear-gradient(135deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px)" }}
          />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary">{ctaStrip.label}</p>
                <h2 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                  {ctaStrip.headline.split("strakke binnenmuren")[0]}
                  <span className="text-primary decoration-primary/40 underline decoration-[3px] underline-offset-4">
                    strakke binnenmuren
                          </span>
                  ?
                </h2>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-white/55">{ctaStrip.text}</p>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {ctaStrip.bullets.map((t) => (
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
                  href={ctaStrip.cta.href}
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-4 text-sm font-bold text-white shadow-sm transition-all hover:brightness-110 hover:shadow-lg"
                >
                  {ctaStrip.cta.label}
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── WERKWIJZE ────────────────────────────────────────────────────── */}
        <div className="bg-secondary/40">
          <section id={werkwijze.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionTagline>Werkwijze</SectionTagline>
              <h2 className="mt-2 mb-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
                Van voorbereiding <span className="text-primary">tot oplevering</span>
              </h2>
              <WerkwijzeStepper />
            </div>
          </section>
        </div>

        {/* ── VOORBEREIDING & ONDERGROND ───────────────────────────────────── */}
        <section id={voorbereiding.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <SectionTagline>Voorbereiding</SectionTagline>
            <h2 className="mt-2 mb-8 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
              Voorbereiding &amp; ondergrond:{" "}
              <span className="text-primary">dit bepaalt de kwaliteit</span>
            </h2>

            <div className="mb-4 grid gap-5 sm:grid-cols-3">
              {[
                { icon: Home,      img: "/images/voorbereiding-nieuwbouw.webp", imgAlt: "Primer aanbrengen op nieuwe binnenmuur",         ...voorbereiding.cards[0] },
                { icon: Hammer,    img: "/images/voorbereiding-bestaand.webp",  imgAlt: "Scheuren herstellen in bestaand pleisterwerk",    ...voorbereiding.cards[1] },
                { icon: RotateCcw, img: "/images/voorbereiding-behang.webp",    imgAlt: "Oude stenen muur klaar voor stucwerk",            ...voorbereiding.cards[2] },
              ].map(({ icon: Icon, img, imgAlt, title, body }) => (
                <div
                  key={title}
                  className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={img}
                      alt={imgAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="flex flex-col gap-3 p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-sm font-bold text-foreground">{title}</p>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                  <div className="h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              ))}
            </div>

            <div className="flex gap-3 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
              <div className="mt-1 w-[3px] shrink-0 self-stretch rounded-full bg-primary/40" />
              <p className="text-sm leading-relaxed text-muted-foreground">{voorbereiding.note}</p>
            </div>

          </div>
        </section>

        {/* ── DROOGTIJD ────────────────────────────────────────────────────── */}
        <div className="bg-secondary/40">
          <section id={droogtijd.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-10 bg-primary" />
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">Droogtijd</span>
              </div>
              <h2 className="mb-10 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12]">
                Wanneer mag u{" "}
                <span className="text-primary">schilderen of behangen?</span>
              </h2>

              <div className="grid gap-5 sm:grid-cols-3">
                {[
                  { img: "/images/droogtijd-drying.webp",    alt: "Vers gestuckte muur die aan het drogen is",          icon: Clock,       label: "1–2 weken drogen", text: droogtijd.bullets[0] },
                  { img: "/images/droogtijd-schilderen.webp",alt: "Schilder brengt verf aan op droge gestuckte muur",   icon: Paintbrush2, label: "Schilderen",       text: droogtijd.bullets[1] },
                  { img: "/images/droogtijd-behangen.webp",  alt: "Behang aanbrengen op geprimed gestuckt oppervlak",   icon: Layers,      label: "Behangen",         text: droogtijd.bullets[2] },
                ].map(({ img, alt, icon: Icon, label, text }) => (
                  <div
                    key={label}
                    className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={img}
                        alt={alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-primary/90 px-3 py-1 backdrop-blur-sm">
                        <Icon className="h-3 w-3 text-white" />
                        <span className="text-[11px] font-semibold text-white">{label}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
                    </div>
                    <div className="h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-sm italic leading-relaxed text-muted-foreground">{droogtijd.closing}</p>
              </div>

            </div>
          </section>
        </div>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <div className="bg-secondary/40">
          <section id={faq.id} className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                  <div className="lg:sticky lg:top-32">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="h-px w-10 bg-primary" />
                      <span className="text-sm font-semibold uppercase tracking-widest text-primary">FAQ</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                      Veelgestelde
                      <br />
                      <span className="text-primary">vragen</span>
                    </h2>
                    <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground sm:text-lg">
                      Heeft u vragen over muren stucen? Hier vindt u de antwoorden op de meest gestelde vragen.
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
                  <FaqAccordionInner />
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

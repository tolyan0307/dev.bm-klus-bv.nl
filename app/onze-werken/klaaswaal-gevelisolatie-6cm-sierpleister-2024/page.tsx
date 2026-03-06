import Link from "next/link"
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react"
import { buildPageMetadata } from "@/lib/seo/meta"
import ProjectGalleryCarousel from "@/components/sections/projects/ProjectGalleryCarousel"
import WerkzaamhedenAccordion from "@/components/sections/projects/WerkzaamhedenAccordion"
import { beforeImages, afterImages } from "@/lib/content/projects/klaaswaal-gevelisolatie-6cm-sierpleister-2024"

// ─── SEO ──────────────────────────────────────────────────────────────────────
export const metadata = buildPageMetadata(
  "/onze-werken/klaaswaal-gevelisolatie-6cm-sierpleister-2024/",
  {
    title: "Klaaswaal gevelisolatie 6 cm & sierpleister – project 2025",
    description:
      "Project in Klaaswaal: gevelrenovatie met 6 cm gevelisolatie, scheurherstel, sierpleister 1,5 mm en technisch verbeterde plint met bitumen.",
  },
)

// ─── Data ─────────────────────────────────────────────────────────────────────
const heroBullets = [
  "6 cm buitengevelisolatie met mechanische bevestiging en volledige wapening met glasvezelnet",
  "Constructief scheurherstel met ankers, opgenomen in de wapeningslaag",
  "Sierpleister 1,5 mm met contrasterende plint, bitumen sokkelbescherming en vernieuwde details",
]

const werkzaamheden = [
  {
    title: "Opname van gevel, scheuren en verouderde details",
    body: "We hebben de gevel beoordeeld op scheurvorming, losse plekken in de afwerking, de staat van de plintzone, raamdorpels, hemelwaterafvoer en houten delen onder de dakrand.",
  },
  {
    title: "Constructief scheurherstel met ankers",
    body: "De aanwezige scheuren zijn constructief aangepakt met scheurankers en vervolgens opgenomen in de verdere gevelopbouw.",
  },
  {
    title: "Aanbrengen van 6 cm buitengevelisolatie",
    body: "De gevel is voorzien van 6 cm buitengevelisolatie, mechanisch bevestigd met gevelpluggen als basis voor de vernieuwde buitenschil.",
  },
  {
    title: "Volledige wapening en afwerking met sierpleister 1,5 mm",
    body: "De gevel is volledig gewapend met glasvezelnet en daarna afgewerkt met sierpleister 1,5 mm voor een strak en egaal gevelbeeld.",
  },
  {
    title: "Technische verbetering van de plintzone",
    body: "De plint is uitgevoerd met een sokkelprofiel en een extra centimeter opbouw, vervolgens in een contrasterende kleur geschilderd voor een duidelijke en versterkte plintlijn.",
  },
  {
    title: "Bitumen, raamdorpels, regenpijpen en dakranddelen",
    body: "Na het uitgraven van een sleuf van circa 30 cm is de sokkel behandeld met bitumen. Daarnaast zijn oude raamdorpels vervangen, regenpijpen vernieuwd en houten delen aan de dakrand vervangen.",
  },
]

const bevindingen = [
  {
    title: "Scheuren en losse plekken in de gevelafwerking",
    body: "De bestaande gevel vertoonde meerdere scheuren en losse plekken in de afwerking, waardoor zowel het gevelbeeld als de technische staat aandacht vroegen.",
  },
  {
    title: "Kwetsbare plint met vochtsporen",
    body: "De plint was onvoldoende beschermd tegen opspattend water en vocht, met verkleuringen en beginnende schade aan de onderzijde van de gevel.",
  },
  {
    title: "Verouderde geveldetails",
    body: "De oude raamdorpels en hemelwaterafvoeren sloten niet mooi meer aan, en de houten delen onder de dakrand waren verouderd.",
  },
  {
    title: "Geen volwaardig gevelisolatiesysteem",
    body: "Er was geen volwaardig gevelisolatiesysteem aanwezig, waardoor de woning warmte verloor en de gevel optisch onrustig oogde.",
  },
]

const resultaten = [
  {
    title: "Geïsoleerde en constructief herstelde gevel",
    body: "De woning is voorzien van 6 cm buitengevelisolatie en scheurherstel met ankers, opgenomen in de gewapende gevelopbouw.",
  },
  {
    title: "Strakke afwerking met sierpleister en duidelijke plintlijn",
    body: "Met sierpleister 1,5 mm en een contrasterend geschilderde plint heeft de gevel een egaal en verzorgd gevelbeeld met duidelijke detaillering aan de onderzijde.",
  },
  {
    title: "Technisch verbeterde sokkelzone",
    body: "De plintzone is versterkt met sokkelprofiel, extra opbouw en bitumenbehandeling voor extra bescherming van de onderzijde van de gevel.",
  },
  {
    title: "Vernieuwde functionele details",
    body: "Nieuwe raamdorpels, vernieuwde regenpijpen en vervangen dakranddelen zorgen voor een nettere en technisch verbeterde afwerking van de buitenschil.",
  },
]

const detailCards = [
  {
    title: "Scheurankers in constructief herstel",
    body: "Scheuren zijn constructief aangepakt met ankers en daarna opgenomen in de gewapende opbouw van de gevel.",
  },
  {
    title: "Volledige wapening met glasvezelnet",
    body: "De gevel is volledig gewapend met glasvezelnet als versterkte basis onder de sierpleisterafwerking.",
  },
  {
    title: "Versterkte plint met sokkelprofiel",
    body: "De plint is technisch verbeterd met een sokkelprofiel en extra opbouw, daarna afgewerkt in een contrasterende kleur.",
  },
  {
    title: "Bitumen langs de onderzijde",
    body: "Na uitgraven van circa 30 cm is de sokkel behandeld met bitumen als extra bescherming tegen vochtbelasting.",
  },
]

const materialen = [
  { label: "Gevelisolatie", value: "6 cm buitengevelisolatie" },
  { label: "Bevestiging", value: "Mechanische bevestiging met gevelpluggen" },
  { label: "Wapening", value: "Glasvezelnet (volledige wapeningslaag)" },
  { label: "Scheurherstel", value: "Scheurankers (constructief herstel)" },
  { label: "Sierpleister", value: "Korrelstructuur 1,5 mm" },
  {
    label: "Plintopbouw",
    value: "Sokkelprofiel + extra opbouw (ca. 1 cm) + contrasterende verfafwerking",
  },
  { label: "Sokkelbescherming", value: "Bitumen langs de onderzijde (na sleuf van circa 30 cm)" },
  {
    label: "Geveldetails",
    value: "Nieuwe raamdorpels, vernieuwde regenpijpen en vervangen houten dakranddelen",
  },
]

const relatedLinks = [
  { label: "Gevelisolatie", href: "/gevelisolatie/" },
  { label: "Sierpleister", href: "/sierpleister/" },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function KlaaswaalProjectPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── A · HERO ─────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden min-h-[80vh] lg:min-h-[65vh]">

        <img
          src="/images/projects/klaaswaal-gevelisolatie-6cm-na-01.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
          width={1920}
          height={1080}
          fetchPriority="high"
          draggable={false}
        />

        <div className="absolute inset-0" style={{ background: "rgba(10,7,3,0.48)" }} />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(108deg, rgba(10,7,3,0.97) 0%, rgba(10,7,3,0.88) 22%, rgba(10,7,3,0.65) 44%, rgba(10,7,3,0.25) 64%, transparent 84%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0"
          style={{
            height: 200,
            background:
              "linear-gradient(to bottom, rgba(6,4,1,0.92) 0%, rgba(6,4,1,0.65) 38%, transparent 100%)",
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            bottom: "12%",
            left: "-6%",
            width: 480,
            height: 480,
            background: "radial-gradient(circle, rgba(232,96,10,0.16) 0%, transparent 68%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: 180,
            background:
              "linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.70) 40%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0"
          style={{
            width: "32%",
            background: "linear-gradient(to left, rgba(10,7,3,0.30), transparent)",
          }}
        />

        <div className="relative z-10 container-default flex flex-col justify-between min-h-[80vh] lg:min-h-[65vh]">

          <nav aria-label="Breadcrumb" className="pt-28 sm:pt-32 lg:pt-36 mb-7">
            <ol
              className="flex flex-wrap items-center gap-1.5 text-sm"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              <li>
                <Link href="/" className="transition-colors hover:text-white">Home</Link>
              </li>
              <li aria-hidden><ChevronRight className="h-3.5 w-3.5" /></li>
              <li>
                <Link href="/onze-werken/" className="transition-colors hover:text-white">Onze werken</Link>
              </li>
              <li aria-hidden><ChevronRight className="h-3.5 w-3.5" /></li>
              <li className="font-medium text-white" aria-current="page">Klaaswaal (2025)</li>
            </ol>
          </nav>

          <div className="pb-16 sm:pb-20 lg:pb-24">
          <div className="mb-5">
            <span
              className="inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white"
              style={{ background: "rgba(232,96,10,0.90)", border: "1px solid rgba(232,96,10,0.60)" }}
            >
              Gevelisolatie
            </span>
          </div>

          <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl max-w-3xl">
            Klaaswaal: gevelisolatie 6 cm &amp; sierpleister 1,5 mm (2025)
          </h1>

          <p className="mt-4 text-lg leading-relaxed max-w-2xl" style={{ color: "rgba(255,255,255,0.78)" }}>
            Gevelrenovatie met 6 cm buitengevelisolatie, constructief scheurherstel, sierpleister 1,5 mm,
            contrasterende plint en vernieuwde details zoals raamdorpels, dakranden en regenpijpen.
          </p>

          <div
            className="mt-6 inline-flex flex-wrap gap-x-2 gap-y-1 rounded-xl px-4 py-3 text-sm"
            style={{
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(8px)",
              color: "rgba(255,255,255,0.75)",
            }}
          >
            <span className="font-medium text-white">Klaaswaal</span>
            <span aria-hidden>·</span>
            <span>woning</span>
            <span aria-hidden>·</span>
            <span>gevelisolatie 6 cm</span>
            <span aria-hidden>·</span>
            <span>scheurherstel met ankers</span>
            <span aria-hidden>·</span>
            <span>sierpleister 1,5 mm</span>
            <span aria-hidden>·</span>
            <span>contrasterende plint</span>
            <span aria-hidden>·</span>
            <span>2025</span>
          </div>

          <ul className="mt-6 grid gap-2 sm:grid-cols-2 max-w-2xl" role="list">
            {heroBullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.82)" }}>
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact/" className="btn-primary">
              Offerte aanvragen
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/onze-werken/"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all"
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.30)",
                color: "white",
                backdropFilter: "blur(8px)",
              }}
            >
              Terug naar Onze werken
            </Link>
          </div>
        </div>
        </div>
      </section>

      {/* ── B · OVERZICHT WERKZAAMHEDEN ──────────────────────────────────── */}
      <section className="section-spacing border-b border-border" aria-labelledby="werkzaamheden-heading">
        <div className="container-default">
          <div className="section-header">
            <span className="section-header-line" aria-hidden />
            <span className="section-header-label">Werkzaamheden</span>
          </div>
          <h2 id="werkzaamheden-heading" className="section-title max-w-2xl">
            Wat hebben we <span className="text-primary">uitgevoerd?</span>
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Van scheurherstel en isolatieopbouw tot sierpleister, versterkte plint en vernieuwde geveldetails.
          </p>

          <WerkzaamhedenAccordion items={werkzaamheden} />
        </div>
      </section>

      {/* ── C · VOOR DE WERKEN ───────────────────────────────────────────── */}
      <section className="section-spacing border-b border-border bg-secondary/30" aria-labelledby="voor-heading">
        <div className="container-default">
          <div className="section-header">
            <span className="section-header-line" aria-hidden />
            <span className="section-header-label">Beginsituatie</span>
          </div>
          <h2 id="voor-heading" className="section-title max-w-2xl">
            Voor de <span className="text-primary">werken</span>
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Vier aandachtspunten bepaalden de aanpak van de gevelrenovatie.
          </p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2" role="list">
            {bevindingen.map((item) => (
              <li
                key={item.title}
                className="group relative flex flex-col gap-1.5 rounded-xl border border-border bg-card px-5 py-4 shadow-sm transition-all hover:border-primary/30 hover:shadow-md overflow-hidden"
              >
                <span className="absolute left-0 inset-y-0 w-[3px] rounded-l-xl bg-primary opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                <span className="absolute left-0 top-5 w-[3px] h-4 rounded-r-full bg-primary/30" aria-hidden />
                <h3 className="text-sm font-semibold leading-snug text-foreground">{item.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px flex-1 bg-border" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Fotodocumentatie beginsituatie</span>
              <span className="h-px flex-1 bg-border" aria-hidden />
            </div>
            <ProjectGalleryCarousel title="Voor de werken" variant="voor" images={beforeImages} />
          </div>
        </div>
      </section>

      {/* ── D · NA DE WERKEN ─────────────────────────────────────────────── */}
      <section className="section-spacing border-b border-border" aria-labelledby="na-heading">
        <div className="container-default">
          <div className="section-header">
            <span className="section-header-line" aria-hidden />
            <span className="section-header-label">Eindresultaat</span>
          </div>
          <h2 id="na-heading" className="section-title max-w-2xl">
            Na de <span className="text-primary">werken</span>
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Een constructief herstelde en geïsoleerde gevel met strakke afwerking en technisch verbeterde plint.
          </p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2" role="list">
            {resultaten.map((item) => (
              <li
                key={item.title}
                className="group relative flex flex-col gap-1.5 rounded-xl border border-border bg-card px-5 py-4 shadow-sm transition-all hover:border-primary/30 hover:shadow-md overflow-hidden"
              >
                <span className="absolute left-0 inset-y-0 w-[3px] rounded-l-xl bg-primary opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                <span className="absolute left-0 top-5 w-[3px] h-4 rounded-r-full bg-primary/30" aria-hidden />
                <h3 className="text-sm font-semibold leading-snug text-foreground">{item.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px flex-1 bg-border" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Fotodocumentatie eindresultaat</span>
              <span className="h-px flex-1 bg-border" aria-hidden />
            </div>
            <ProjectGalleryCarousel title="Na de werken" variant="na" images={afterImages} />
          </div>
        </div>
      </section>

      {/* ── E · DETAILS DIE HET VERSCHIL MAKEN ──────────────────────────── */}
      <section className="section-spacing border-b border-border bg-secondary/30" aria-labelledby="details-heading">
        <div className="container-default">
          <div className="section-header">
            <span className="section-header-line" aria-hidden />
            <span className="section-header-label">Vakmanschap</span>
          </div>
          <h2 id="details-heading" className="section-title max-w-2xl">
            Details die het <span className="text-primary">verschil maken</span>
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Vier technische details die de kwaliteit en duurzaamheid van dit project onderscheiden.
          </p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2" role="list">
            {detailCards.map((card) => (
              <li
                key={card.title}
                className="group relative flex flex-col gap-1.5 rounded-xl border border-border bg-card px-5 py-4 shadow-sm transition-all hover:border-primary/30 hover:shadow-md overflow-hidden"
              >
                <span className="absolute left-0 inset-y-0 w-[3px] rounded-l-xl bg-primary opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                <span className="absolute left-0 top-5 w-[3px] h-4 rounded-r-full bg-primary/30" aria-hidden />
                <h3 className="text-sm font-semibold leading-snug text-foreground">{card.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{card.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── F · MATERIALEN & AFWERKING ───────────────────────────────────── */}
      <section className="section-spacing border-b border-border bg-secondary/30" aria-labelledby="materialen-heading">
        <div className="container-default max-w-3xl">
          <div className="section-header">
            <span className="section-header-line" aria-hidden />
            <span className="section-header-label">Materialen</span>
          </div>
          <h2 id="materialen-heading" className="section-title">
            Materialen &amp; <span className="text-primary">afwerking</span>
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Overzicht van alle toegepaste materialen en onderdelen bij dit project.
          </p>

          <dl className="mt-8 rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
            {materialen.map((m, i) => (
              <div
                key={m.label}
                className={`group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-primary/5 ${i !== 0 ? "border-t border-border" : ""}`}
              >
                <dt className="w-36 shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {m.label}
                </dt>
                <span className="h-4 w-px shrink-0 bg-border" aria-hidden />
                <dd className="text-sm font-medium text-foreground">{m.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground rounded-xl border border-border bg-card px-5 py-3.5">
            <strong className="font-semibold text-foreground">Let op:</strong> Exacte systeemkeuze is
            afhankelijk van ondergrond en situatie. Tijdens de gratis inspectie beoordelen wij welk
            systeem het meest geschikt is voor uw woning.
          </p>
        </div>
      </section>

      {/* ── H · GERELATEERDE DIENSTEN ────────────────────────────────────── */}
      <aside className="border-t border-border bg-secondary/10 py-10" aria-label="Gerelateerde diensten">
        <div className="container-default">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-primary">Gerelateerde diensten</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-5 py-4 transition-all hover:border-primary/40 hover:shadow-sm"
              >
                <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                  {link.label}
                </span>
                <ArrowRight size={14} className="shrink-0 text-border transition-colors group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </aside>

    </div>
  )
}

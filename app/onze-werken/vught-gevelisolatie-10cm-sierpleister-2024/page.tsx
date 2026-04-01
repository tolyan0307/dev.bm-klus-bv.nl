import { Fragment } from "react"
import Link from "next/link"
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react"
import { buildPageMetadata } from "@/lib/seo/meta"
import { jsonLdScript, projectPageSchema } from "@/lib/seo/schema"
import { SITE } from "@/lib/seo/routes"
import ProjectGalleryCarousel from "@/components/sections/projects/ProjectGalleryCarousel"
import WerkzaamhedenAccordion from "@/components/sections/projects/WerkzaamhedenAccordion"
import ResponsiveImage from "@/components/responsive-image"
import { beforeImages, afterImages } from "@/lib/content/projects/vught-gevelisolatie-10cm-sierpleister-2024"
import { resolveGalleryImages } from "@/lib/gallery-utils"

// ─── SEO ──────────────────────────────────────────────────────────────────────
export const metadata = buildPageMetadata(
  "/onze-werken/vught-gevelisolatie-10cm-sierpleister-2024/",
  {
    title: "Vught gevelisolatie 10 cm & sierpleister – project 2024",
    description:
      "Project in Vught: hoekwoning met 10 cm gevelisolatie, sierpleister 1,5 mm, bitumen sokkelbescherming en verzinkte dakranddetails.",
  },
)

// ─── Data ─────────────────────────────────────────────────────────────────────
const heroBullets = [
  "10 cm gevelisolatie met mechanische bevestiging (schotelpluggen 15 cm)",
  "Volledige bewapening met glasvezelnet + sierpleister 1,5 mm",
  "Bitumen sokkelbescherming en verzinkte dakrandafwerking met geïntegreerde ventilatie",
]

const werkzaamheden = [
  {
    title: "Opname van gevel, plint en dakranddetails",
    body: "We hebben de bestaande gevel beoordeeld op vervuiling, scheurvorming, de staat van de plintzone en de afwerking van dakrand en overstek, inclusief de behoefte aan ventilatie in de detaillering.",
  },
  {
    title: "Voorbereiding van de onderzijde en ondergrond",
    body: "Langs de zijgevel is een sleuf van circa 30 cm diep uitgegraven. Waar nodig is de oude afwerking verwijderd en is de ondergrond voorbereid voor isolatie, vochtbescherming en afwerking.",
  },
  {
    title: "Aanbrengen van 10 cm gevelisolatie",
    body: "De gevel is voorzien van 10 cm isolatie en mechanisch bevestigd met schotelpluggen van 15 cm als basis voor de vernieuwde gevelopbouw.",
  },
  {
    title: "Volledige bewapening en sierpleisterafwerking",
    body: "De gevel is volledig bewapend met glasvezelnet en afgewerkt met sierpleister 1,5 mm in een frisse, egale kleur.",
  },
  {
    title: "Hoekafwerking met keramische steenstrips",
    body: "De hoekzones van de gevel zijn versterkt/afgewerkt met keramische steenstrips als robuuste en verzorgde detaillering.",
  },
  {
    title: "Sokkel- en dakranddetails vernieuwen",
    body: "Langs de sokkel is bitumen toegepast en de uitgegraven zone netjes aangevuld. Rondom de dakrand is een verzinkt kader met afdekkappen en geïntegreerde ventilatieopeningen geplaatst.",
  },
]

const bevindingen = [
  {
    title: "Verouderde afwerking met vervuiling en scheuren",
    body: "De bestaande gevel had een verouderde afwerking met zichtbare vervuiling en scheuren, waardoor het gevelbeeld en de bescherming van de buitenschil waren verminderd.",
  },
  {
    title: "Onvoldoende bescherming van de plint tegen optrekkend vocht",
    body: "Aan de zijkant van de woning was geen goede bescherming tegen optrekkend vocht, waardoor de plint natter en donkerder werd.",
  },
  {
    title: "Dakrand technisch bruikbaar maar onvoldoende afgewerkt",
    body: "Dakrand en overstek waren technisch nog in orde, maar misten een nette afwerking en geïntegreerde ventilatieopeningen.",
  },
  {
    title: "Wens voor betere isolatie en netter gevelbeeld",
    body: "De bewoners wilden de gevel technisch verbeteren met isolatie en tegelijk een strakkere, modernere uitstraling realiseren.",
  },
]

const resultaten = [
  {
    title: "Geïsoleerde en vernieuwde gevelopbouw",
    body: "De hoekwoning is voorzien van 10 cm gevelisolatie met mechanische bevestiging, volledige bewapening en een afwerking in sierpleister 1,5 mm.",
  },
  {
    title: "Strakker en robuuster gevelbeeld",
    body: "De combinatie van sierpleister en keramische steenstrips op de hoeken geeft de woning een strakkere en robuustere uitstraling.",
  },
  {
    title: "Verbeterde sokkelbescherming tegen vochtbelasting",
    body: "De sokkelzone is behandeld met bitumen en opnieuw aangevuld, waardoor de onderzijde van de gevel beter beschermd is tegen vochtbelasting.",
  },
  {
    title: "Vernieuwde dakranddetails met ventilatie",
    body: "Rond de dakrand is een verzinkte afwerking met afdekkappen en geïntegreerde ventilatieopeningen geplaatst als technisch en visueel verbeterd detail.",
  },
]

const detailCards = [
  {
    title: "Mechanische bevestiging met schotelpluggen 15 cm",
    body: "De 10 cm isolatie is mechanisch bevestigd met schotelpluggen van 15 cm als onderdeel van de gevelopbouw.",
  },
  {
    title: "Volledige bewapening met glasvezelnet",
    body: "De gevel is volledig bewapend met glasvezelnet als versterkte basis onder de sierpleisterafwerking.",
  },
  {
    title: "Bitumenbehandeling van de sokkel",
    body: "Na het uitgraven van een sleuf van circa 30 cm is de sokkel behandeld met bitumen voor extra bescherming van de onderzijde.",
  },
  {
    title: "Verzinkte dakrand met ventilatieopeningen",
    body: "Rondom de dakrand is een verzinkt kader met afdekkappen en geïntegreerde ventilatieopeningen geplaatst als vernieuwde detaillering.",
  },
]

const materialen = [
  { label: "Gevelisolatie", value: "10 cm buitengevelisolatie" },
  { label: "Bevestiging", value: "Schotelpluggen 15 cm (mechanische bevestiging)" },
  { label: "Wapening", value: "Glasvezelnet (volledige bewapening)" },
  { label: "Sierpleister", value: "Korrelstructuur 1,5 mm" },
  { label: "Hoekafwerking", value: "Keramische steenstrips" },
  { label: "Sokkelbescherming", value: "Bitumen (na sleuf van circa 30 cm)" },
  { label: "Dakranddetails", value: "Verzinkt kader met afdekkappen en geïntegreerde ventilatieopeningen" },
]

const relatedLinks = [
  { label: "Gevelisolatie", href: "/gevelisolatie/" },
  { label: "Sierpleister", href: "/sierpleister/" },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function VughtGevelisolatieProjectPage() {
  return (
    <>
      {projectPageSchema({
        title: "Vught gevelisolatie 10 cm & sierpleister – project 2024",
        description:
          "Project in Vught: hoekwoning met 10 cm gevelisolatie, sierpleister 1,5 mm, bitumen sokkelbescherming en verzinkte dakranddetails.",
        url: `${SITE.canonicalBase}/onze-werken/vught-gevelisolatie-10cm-sierpleister-2024/`,
        image: "/images/projects/vught-gevelisolatie-10cm-na-1.webp",
        city: "Vught",
        year: 2024,
        serviceTypes: ["Gevelisolatie", "Sierpleister"],
      }).map((s, i) => (
        <Fragment key={i}>{jsonLdScript(s)}</Fragment>
      ))}
      <div className="min-h-screen bg-background">

      {/* ── A · HERO ─────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden min-h-[80vh] lg:min-h-[65vh]">

  <ResponsiveImage
    baseName="vught-gevelisolatie-10cm-na-1"
    dir="/images/projects"
    preset="hero"
    alt=""
    aria-hidden="true"
    className="absolute inset-0 h-full w-full object-cover object-center"
    sizes="100vw"
    priority
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
            height: 80,
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
            <ol className="flex flex-wrap items-center gap-1.5 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
              <li>
                <Link href="/" className="transition-colors hover:text-white">Home</Link>
              </li>
              <li aria-hidden><ChevronRight className="h-3.5 w-3.5" /></li>
              <li>
                <Link href="/onze-werken/" className="transition-colors hover:text-white">Onze werken</Link>
              </li>
              <li aria-hidden><ChevronRight className="h-3.5 w-3.5" /></li>
              <li className="font-medium text-white" aria-current="page">Vught (2024)</li>
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
            Vught: gevelisolatie 10 cm &amp; sierpleister 1,5 mm (2024)
          </h1>

          <p className="mt-4 text-lg leading-relaxed max-w-2xl" style={{ color: "rgba(255,255,255,0.78)" }}>
            Gevelrenovatie van een hoekwoning met 10 cm buitengevelisolatie, sierpleister 1,5 mm, keramische steenstrips op de hoeken, bitumen sokkelbescherming en vernieuwde verzinkte dakranddetails.
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
            <span className="font-medium text-white">Vught</span>
            <span aria-hidden>·</span>
            <span>hoekwoning</span>
            <span aria-hidden>·</span>
            <span>10 cm gevelisolatie</span>
            <span aria-hidden>·</span>
            <span>sierpleister 1,5 mm</span>
            <span aria-hidden>·</span>
            <span>bitumen sokkel</span>
            <span aria-hidden>·</span>
            <span>verzinkte dakrand</span>
            <span aria-hidden>·</span>
            <span>2024</span>
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
            <Link href="/contact/" className="btn-hero">
              Offerte aanvragen
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/onze-werken/"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/80 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10"
            >
              Terug naar Onze werken
            </Link>
          </div>
        </div>
        </div>
      </section>

      <div className="below-fold">
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
            Van opname tot 10 cm isolatie, bewapening, sierpleister en vernieuwde sokkel- en dakranddetails.
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
            <ProjectGalleryCarousel title="Voor de werken" variant="voor" images={resolveGalleryImages(beforeImages)} />
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
            Een geïsoleerde en vernieuwde gevel met strakke afwerking.
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
            <ProjectGalleryCarousel title="Na de werken" variant="na" images={resolveGalleryImages(afterImages)} />
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
            Vier aspecten van de gevelopbouw die de kwaliteit bepalen.
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
            Overzicht van alle toegepaste materialen bij dit project.
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
      </div>{/* end below-fold */}

    </div>
    </>
  )
}

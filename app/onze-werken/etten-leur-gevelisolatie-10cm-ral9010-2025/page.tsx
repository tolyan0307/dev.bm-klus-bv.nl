import { Fragment } from "react"
import Link from "next/link"
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react"
import { buildPageMetadata } from "@/lib/seo/meta"
import { jsonLdScript, projectPageSchema } from "@/lib/seo/schema"
import { SITE } from "@/lib/seo/routes"
import ProjectGalleryCarousel from "@/components/sections/projects/ProjectGalleryCarousel"
import WerkzaamhedenAccordion from "@/components/sections/projects/WerkzaamhedenAccordion"
import ResponsiveImage from "@/components/responsive-image"
import { beforeImages, afterImages } from "@/lib/content/projects/etten-leur-gevelisolatie-10cm-ral9010-2025"
import { resolveGalleryImages } from "@/lib/gallery-utils"

// ─── SEO ──────────────────────────────────────────────────────────────────────
export const metadata = buildPageMetadata(
  "/onze-werken/etten-leur-gevelisolatie-10cm-ral9010-2025/",
  {
    title: "Etten-Leur gevelisolatie 10 cm RAL 9010 (2025)",
    description:
      "Project in Etten-Leur: 10 cm Strikolith gevelisolatie, sierpleister, gevelverf RAL 9010, bitumen sokkel en vernieuwde geveldetails.",
  },
)

// ─── Data ─────────────────────────────────────────────────────────────────────
const heroBullets = [
  "10 cm Strikolith gevelisolatie met mechanische verankering",
  "Sierpleister, glasvezelnet en afwerking in RAL 9010",
  "Nieuwe marmeren raamdorpels, geschilderde daklijst en beschermde sokkel",
]

const werkzaamheden = [
  {
    title: "Aanbrengen van 10 cm gevelisolatie",
    body: "De gevel is voorzien van 10 cm Strikolith gevelisolatie als nieuwe basis voor een beter geïsoleerde en strakker afgewerkte buitenschil.",
  },
  {
    title: "Mechanisch verankeren met gevelpluggen",
    body: "De isolatie is extra versterkt en vastgezet met pluggen, zodat de gevelopbouw stabiel en duurzaam is uitgevoerd.",
  },
  {
    title: "Wapenen en egaliseren van het gevelvlak",
    body: "Over de isolatielaag is een glasvezelnet aangebracht en afgewerkt met een wapenings- en egalisatielaag om een vlakke en stevige ondergrond voor de afwerking te creëren.",
  },
  {
    title: "Afwerken met sierpleister en schilderwerk",
    body: "De gevel is afgewerkt met sierpleister en vervolgens geschilderd in RAL 9010 voor een frisse, egale en moderne uitstraling.",
  },
  {
    title: "Vernieuwen van details rond ramen, plint en dakrand",
    body: "De marmeren raamdorpels zijn gedemonteerd en opnieuw gemonteerd, hoeken en openingen zijn afgewerkt met profielen, de plint is in een contrasterende kleur geschilderd en de daklijst is mee afgewerkt in RAL 9010.",
  },
  {
    title: "Beschermen van de onderzijde van de gevel",
    body: "Langs de sokkel is bitumen toegepast en een sokkelprofiel geplaatst als extra bescherming van de onderzijde van de gevel.",
  },
]

const detailCards = [
  {
    title: "Strikolith gevelisolatie 10 cm",
    body: "De woning is opgebouwd met 10 cm gevelisolatie als basis voor de vernieuwde buitenschil en verdere afwerking.",
  },
  {
    title: "Glasvezelnet en wapeningslaag",
    body: "Het gevelvlak is versterkt met glasvezelnet en een egaliserende wapeningslaag als stabiele basis onder de afwerking.",
  },
  {
    title: "Marmeren raamdorpels en profielafwerking",
    body: "Rond ramen, deuren en buitenhoeken zijn profielen toegepast en de marmeren raamdorpels zijn vernieuwd als nette detaillering.",
  },
  {
    title: "Bitumen sokkel en contrasterende plint",
    body: "De onderzijde van de gevel is extra beschermd met bitumen, terwijl de plint in een afwijkende kleur is afgewerkt voor een duidelijke en verzorgde basislijn.",
  },
]

const materialen = [
  { label: "Gevelisolatie", value: "Strikolith 10 cm" },
  { label: "Wapening", value: "Glasvezelnet met wapenings- en egalisatielaag" },
  { label: "Afwerking", value: "Sierpleister + gevelverf RAL 9010" },
  { label: "Bevestiging", value: "Mechanische verankering met pluggen" },
  { label: "Raamdorpels", value: "Marmeren raamdorpels (gedemonteerd en opnieuw gemonteerd)" },
  { label: "Profielen", value: "Hoekprofielen voor ramen, deuren en gevelhoeken" },
  { label: "Sokkel", value: "Bitumen + sokkelprofiel" },
  { label: "Extra schilderwerk", value: "Daklijst in RAL 9010 en plint in contrasterende kleur" },
]

const bevindingen = [
  {
    title: "Geen volwaardige geïsoleerde buitengevel",
    body: "Voor de renovatie had de woning geen moderne buitenisolatie, waardoor de gevel minder goed beschermd was tegen temperatuurverschillen en weersinvloeden.",
  },
  {
    title: "Verouderde afwerking en kwetsbare sokkelzone",
    body: "De bestaande afwerking vroeg om vernieuwing en de onderzijde van de gevel had extra bescherming nodig tegen vochtbelasting en vervuiling.",
  },
  {
    title: "Details rond ramen en dakrand waren toe aan opfrissing",
    body: "Raamdorpels, daklijst en de overgang van plint naar gevel vroegen om een nettere en technisch sterkere afwerking als onderdeel van de totale gevelrenovatie.",
  },
]

const resultaten = [
  {
    title: "Strakke en vernieuwde gevelafwerking",
    body: "Met 10 cm gevelisolatie, sierpleister en schilderwerk in RAL 9010 heeft de woning een frisse en verzorgde uitstraling gekregen.",
  },
  {
    title: "Technisch verbeterde buitenschil",
    body: "De combinatie van isolatie, glasvezelwapening, plugverankering en profielafwerking zorgt voor een beter opgebouwde buitengevel dan in de oude situatie.",
  },
  {
    title: "Nettere en beter beschermde details",
    body: "Nieuwe marmeren raamdorpels, een geschilderde daklijst, een contrasterende plint en bitumen aan de sokkel maken de gevel zowel visueel als technisch sterker afgewerkt.",
  },
]

const relatedLinks = [
  { label: "Gevelisolatie", href: "/gevelisolatie/" },
  { label: "Sierpleister", href: "/sierpleister/" },
  { label: "Gevel schilderen", href: "/gevel-schilderen/" },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EttenLeurProjectPage() {
  return (
    <>
      {projectPageSchema({
        title: "Etten-Leur gevelisolatie 10 cm RAL 9010 (2025)",
        description:
          "Project in Etten-Leur: 10 cm Strikolith gevelisolatie, sierpleister, gevelverf RAL 9010, bitumen sokkel en vernieuwde geveldetails.",
        url: `${SITE.canonicalBase}/onze-werken/etten-leur-gevelisolatie-10cm-ral9010-2025/`,
        image: "/images/projects/etten-leur-gevelisolatie-10cm-ral9010-2025/etten-leur-gevelisolatie-10cm-ral9010-2025-na-01.webp",
        city: "Etten-Leur",
        year: 2025,
        serviceTypes: ["Gevelisolatie", "Sierpleister", "Gevel schilderen"],
      }).map((s, i) => (
        <Fragment key={i}>{jsonLdScript(s)}</Fragment>
      ))}
      <div className="min-h-screen bg-background">

      {/* ── A · HERO ─────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden min-h-[80vh] lg:min-h-[65vh]">

        <ResponsiveImage
          baseName="etten-leur-gevelisolatie-10cm-ral9010-2025-na-01"
          dir="/images/projects/etten-leur-gevelisolatie-10cm-ral9010-2025"
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
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden><ChevronRight className="h-3.5 w-3.5" /></li>
              <li>
                <Link href="/onze-werken/" className="transition-colors hover:text-white">
                  Onze werken
                </Link>
              </li>
              <li aria-hidden><ChevronRight className="h-3.5 w-3.5" /></li>
              <li className="font-medium text-white" aria-current="page">
                Etten-Leur (2025)
              </li>
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
            Etten-Leur – gevelisolatie 10 cm, sierpleister &amp; schilderwerk (2025)
          </h1>

          <p className="mt-4 text-lg leading-relaxed max-w-2xl" style={{ color: "rgba(255,255,255,0.78)" }}>
            Gevelrenovatie van een woning in Etten-Leur met 10 cm Strikolith gevelisolatie, sierpleister, glasvezelwapening, schilderwerk in RAL 9010 en extra bescherming van de sokkel. Daarbij zijn ook de marmeren raamdorpels vernieuwd, de daklijst geschilderd en de plint in een contrasterende kleur afgewerkt.
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
            <span className="font-medium text-white">Etten-Leur</span>
            <span aria-hidden>·</span>
            <span>woning</span>
            <span aria-hidden>·</span>
            <span>gevelisolatie 10 cm</span>
            <span aria-hidden>·</span>
            <span>sierpleister</span>
            <span aria-hidden>·</span>
            <span>RAL 9010</span>
            <span aria-hidden>·</span>
            <span>bitumen sokkel</span>
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
            Van isolatieopbouw en wapening tot sierpleister, schilderwerk en het vernieuwen van de geveldetails.
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
            Drie aandachtspunten stonden centraal: de verouderde buitenafwerking, de kwetsbare onderzijde van de gevel en het vernieuwen van de details rond ramen en dakrand.
          </p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2" role="list">
            {bevindingen.map((item) => (
              <li
                key={item.title}
                className="group relative flex flex-col gap-1.5 rounded-xl border border-border bg-card px-5 py-4 shadow-sm transition-all hover:border-primary/30 hover:shadow-md overflow-hidden"
              >
                <span
                  className="absolute left-0 inset-y-0 w-[3px] rounded-l-xl bg-primary opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
                <span
                  className="absolute left-0 top-5 w-[3px] h-4 rounded-r-full bg-primary/30"
                  aria-hidden
                />
                <h3 className="text-sm font-semibold leading-snug text-foreground">{item.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px flex-1 bg-border" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Fotodocumentatie beginsituatie
              </span>
              <span className="h-px flex-1 bg-border" aria-hidden />
            </div>
            <ProjectGalleryCarousel
              title="Voor de werken"
              variant="voor"
              images={resolveGalleryImages(beforeImages)}
            />
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
            Het project resulteerde in een beter geïsoleerde gevel met een egale afwerking, duidelijke plintlijn en vernieuwde details rond ramen en dakrand.
          </p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2" role="list">
            {resultaten.map((item) => (
              <li
                key={item.title}
                className="group relative flex flex-col gap-1.5 rounded-xl border border-border bg-card px-5 py-4 shadow-sm transition-all hover:border-primary/30 hover:shadow-md overflow-hidden"
              >
                <span
                  className="absolute left-0 inset-y-0 w-[3px] rounded-l-xl bg-primary opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
                <span
                  className="absolute left-0 top-5 w-[3px] h-4 rounded-r-full bg-primary/30"
                  aria-hidden
                />
                <h3 className="text-sm font-semibold leading-snug text-foreground">{item.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px flex-1 bg-border" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Fotodocumentatie eindresultaat
              </span>
              <span className="h-px flex-1 bg-border" aria-hidden />
            </div>
            <ProjectGalleryCarousel
              title="Na de werken"
              variant="na"
              images={resolveGalleryImages(afterImages)}
            />
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
            Vier details laten zien waar het vakwerk in dit project zit: de isolatieopbouw, de wapening, de afwerking rond openingen en de bescherming van de sokkel.
          </p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2" role="list">
            {detailCards.map((card) => (
              <li
                key={card.title}
                className="group relative flex flex-col gap-1.5 rounded-xl border border-border bg-card px-5 py-4 shadow-sm transition-all hover:border-primary/30 hover:shadow-md overflow-hidden"
              >
                <span
                  className="absolute left-0 inset-y-0 w-[3px] rounded-l-xl bg-primary opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
                <span
                  className="absolute left-0 top-5 w-[3px] h-4 rounded-r-full bg-primary/30"
                  aria-hidden
                />
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
            Overzicht van de belangrijkste materialen en afwerkingen die in dit project zijn toegepast.
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
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
    </>
  )
}

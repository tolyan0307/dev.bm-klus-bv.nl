import { Fragment } from "react"
import Link from "next/link"
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react"
import { buildPageMetadata } from "@/lib/seo/meta"
import { jsonLdScript, projectPageSchema } from "@/lib/seo/schema"
import { SITE } from "@/lib/seo/routes"
import ProjectGalleryCarousel from "@/components/sections/projects/ProjectGalleryCarousel"
import WerkzaamhedenAccordion from "@/components/sections/projects/WerkzaamhedenAccordion"
import ResponsiveImage from "@/components/responsive-image"
import { beforeImages, afterImages } from "@/lib/content/projects/etten-leur-gevelisolatie-6cm-strikolith-2025"

// ─── SEO ──────────────────────────────────────────────────────────────────────
export const metadata = buildPageMetadata(
  "/onze-werken/etten-leur-gevelisolatie-6cm-strikolith-2025/",
  {
    title: "Etten-Leur gevelisolatie 6 cm Strikolith (2025)",
    description:
      "Project in Etten-Leur: 6 cm Strikolith gevelisolatie, GW-Plus, sierpleister 1,5 mm en profielafwerking rond ramen, deuren en sokkel.",
  },
)

// ─── Data ─────────────────────────────────────────────────────────────────────
const heroBullets = [
  "6 cm Strikolith gevelisolatie met lijm, pluggen en BGI montageschuim",
  "Glasvezelweefsel fijn met GW-Plus als gewapende basislaag",
  "Sierpleister 1,5 mm met profielafwerking rond ramen, deuren en hoeken",
]

const werkzaamheden = [
  {
    title: "Ondergrond opbouwen en voorbereiden",
    body: "Op wanden en plafond is eerst plaatmateriaal gemonteerd als basis voor de verdere opbouw van de gevelschil en aansluitende afwerking.",
  },
  {
    title: "Aanbrengen van 6 cm Strikolith gevelisolatie",
    body: "De gevel is voorzien van 6 cm Strikolith isolatieplaten, verlijmd en extra bevestigd met pluggen en montageschuim van BGI om de opbouw stabiel uit te voeren.",
  },
  {
    title: "Monteren van EPS onderdozen",
    body: "Voor aansluitpunten in de gevel zijn EPS vario onderdozen van Strikotherm aangebracht, zodat de openingen netjes in de isolatieopbouw konden worden opgenomen.",
  },
  {
    title: "Wapenen en egaliseren van het gevelvlak",
    body: "Over de isolatielaag is fijn glasvezelweefsel aangebracht en afgewerkt met GW-Plus van Strikotherm als versterkte en egale basis voor de eindafwerking.",
  },
  {
    title: "Afwerken met sierpleister 1,5 mm",
    body: "Na de wapeningslaag is de gevel afgewerkt met Strikotherm spachtelpleister BGI 1,5 mm voor een rustige en verzorgde buitenafwerking.",
  },
  {
    title: "Profielen en sokkelafwerking monteren",
    body: "Rond ramen, deuren en gevelhoeken zijn renderpro hoekprofielen met glasvezelweefsel geplaatst. Langs de onderzijde is een renderpro aansluitprofiel APV met weefsel als sokkelprofiel gemonteerd.",
  },
]

const detailCards = [
  {
    title: "Strikolith isolatie 6 cm",
    body: "De gevelopbouw is uitgevoerd met 6 cm Strikolith isolatie als basis voor de nieuwe buitenschil.",
  },
  {
    title: "Glasvezelweefsel en GW-Plus",
    body: "Fijn glasvezelweefsel in combinatie met GW-Plus vormt de gewapende en geëgaliseerde ondergrond onder de sierpleister.",
  },
  {
    title: "EPS onderdozen in de isolatieopbouw",
    body: "Aansluitpunten zijn opgenomen met EPS vario onderdozen van Strikotherm voor een nette integratie in de gevel.",
  },
  {
    title: "Profielafwerking rond ramen, deuren en sokkel",
    body: "Renderpro hoekprofielen en een aansluitprofiel APV met weefsel zorgen voor strakke lijnen rond openingen, buitenhoeken en de onderzijde van de gevel.",
  },
]

const materialen = [
  { label: "Gevelisolatie", value: "Strikolith isolatieplaten 6 cm" },
  { label: "Bevestiging", value: "Pluggen + BGI montageschuim" },
  { label: "Onderdozen", value: "EPS vario Strikotherm" },
  { label: "Wapening", value: "Glasvezelweefsel fijn + GW-Plus Strikotherm" },
  { label: "Sierpleister", value: "Strikotherm spachtelpleister BGI 1,5 mm" },
  { label: "Profielen", value: "Renderpro hoekprofiel EP met glasvezelweefsel" },
  { label: "Sokkelprofiel", value: "Renderpro aansluitprofiel APV met weefsel" },
]

const bevindingen = [
  {
    title: "Ondergrond vroeg om een nieuwe opbouw",
    body: "De bestaande situatie vroeg om een stabiele en technisch verzorgde basis voordat een volwaardige isolatie- en afwerkopbouw kon worden aangebracht.",
  },
  {
    title: "Gevel had geen moderne isolatieschil",
    body: "Voor de werken was er geen nieuwe, doorlopende buitenopbouw met isolatie, wapening en afgewerkte details rond openingen en hoeken.",
  },
  {
    title: "Aansluitingen en openingen moesten netjes worden geïntegreerd",
    body: "Voor ramen, deuren en andere gevelaansluitingen was een oplossing nodig die zowel technisch goed werkte als visueel strak kon worden afgewerkt.",
  },
]

const resultaten = [
  {
    title: "Nieuwe geïsoleerde gevelschil",
    body: "De woning heeft nu een vernieuwde buitenopbouw met 6 cm Strikolith gevelisolatie, waardoor de gevel technisch beter is opgebouwd dan in de oude situatie.",
  },
  {
    title: "Egaal en verzorgd gevelbeeld",
    body: "Met GW-Plus, glasvezelweefsel en sierpleister 1,5 mm is een strak en rustig gevelvlak gerealiseerd.",
  },
  {
    title: "Nette details rond openingen en onderzijde",
    body: "Dankzij de profielafwerking rond ramen, deuren en hoeken en het sokkelprofiel langs de onderzijde zijn de aansluitingen verzorgd en consistent uitgewerkt.",
  },
]

const relatedLinks = [
  { label: "Gevelisolatie", href: "/gevelisolatie/" },
  { label: "Sierpleister", href: "/sierpleister/" },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EttenLeur6cmProjectPage() {
  return (
    <>
      {projectPageSchema({
        title: "Etten-Leur gevelisolatie 6 cm Strikolith (2025)",
        description:
          "Project in Etten-Leur: 6 cm Strikolith gevelisolatie, GW-Plus, sierpleister 1,5 mm en profielafwerking rond ramen, deuren en sokkel.",
        url: `${SITE.canonicalBase}/onze-werken/etten-leur-gevelisolatie-6cm-strikolith-2025/`,
        image: "/images/projects/etten-leur-gevelisolatie-6cm-strikolith-2025/etten-leur-gevelisolatie-6cm-strikolith-2025-na-01.webp",
        city: "Etten-Leur",
        year: 2025,
        serviceTypes: ["Gevelisolatie", "Sierpleister"],
      }).map((s, i) => (
        <Fragment key={i}>{jsonLdScript(s)}</Fragment>
      ))}
      <div className="min-h-screen bg-background">

      {/* ── A · HERO ─────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden min-h-[80vh] lg:min-h-[65vh]">

        {/* Background image */}
      <ResponsiveImage
        baseName="etten-leur-gevelisolatie-6cm-strikolith-2025-na-01"
        dir="/images/projects/etten-leur-gevelisolatie-6cm-strikolith-2025"
        preset="hero"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
        sizes="100vw"
        priority
        draggable={false}
      />

        {/* Layer 1 — base darkening */}
        <div className="absolute inset-0" style={{ background: "rgba(10,7,3,0.48)" }} />

        {/* Layer 2 — left-heavy content gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(108deg, rgba(10,7,3,0.97) 0%, rgba(10,7,3,0.88) 22%, rgba(10,7,3,0.65) 44%, rgba(10,7,3,0.25) 64%, transparent 84%)",
          }}
        />

        {/* Layer 3 — top band for transparent navbar / white text */}
        <div
          className="absolute inset-x-0 top-0"
          style={{
            height: 200,
            background:
              "linear-gradient(to bottom, rgba(6,4,1,0.92) 0%, rgba(6,4,1,0.65) 38%, transparent 100%)",
          }}
        />

        {/* Layer 4 — orange brand glow bottom-left */}
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

        {/* Layer 5 — bottom fade into page */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: 80,
            background:
              "linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.70) 40%, transparent 100%)",
          }}
        />

        {/* Layer 6 — right vignette */}
        <div
          className="absolute inset-y-0 right-0"
          style={{
            width: "32%",
            background: "linear-gradient(to left, rgba(10,7,3,0.30), transparent)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 container-default flex flex-col justify-between min-h-[80vh] lg:min-h-[65vh]">

          {/* Breadcrumbs */}
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
          {/* Badge */}
          <div className="mb-5">
            <span
              className="inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white"
              style={{ background: "rgba(232,96,10,0.90)", border: "1px solid rgba(232,96,10,0.60)" }}
            >
              Gevelisolatie
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl max-w-3xl">
            Etten-Leur: gevelisolatie 6 cm Strikolith &amp; sierpleister (2025)
          </h1>

          {/* Subheading */}
          <p className="mt-4 text-lg leading-relaxed max-w-2xl" style={{ color: "rgba(255,255,255,0.78)" }}>
            Woning in Etten-Leur voorzien van 6 cm Strikolith gevelisolatie, glasvezelwapening, sierpleister 1,5 mm en verzorgde profielafwerking rond ramen, deuren en gevelhoeken.
          </p>

          {/* Passport */}
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
            <span>gevelisolatie 6 cm</span>
            <span aria-hidden>·</span>
            <span>sierpleister 1,5 mm</span>
            <span aria-hidden>·</span>
            <span>Strikolith</span>
            <span aria-hidden>·</span>
            <span>sokkelprofiel</span>
          </div>

          {/* Bullets */}
          <ul className="mt-6 grid gap-2 sm:grid-cols-2 max-w-2xl" role="list">
            {heroBullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.82)" }}>
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                {b}
              </li>
            ))}
          </ul>

          {/* CTAs */}
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
            Van de basisopbouw en isolatie tot wapening, sierpleister en het netjes afwerken van openingen en de sokkel.
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
            De belangrijkste aandachtspunten lagen in het opbouwen van een geschikte basis, het creëren van een nieuwe isolatieschil en het netjes oplossen van openingen en aansluitdetails.
          </p>

          {/* Diagnosis cards */}
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

          {/* Gallery */}
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
              images={beforeImages}
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
            Het resultaat is een nieuwe buitenopbouw met isolatie, gewapende afwerking en nette details rond openingen en de sokkelzone.
          </p>

          {/* Result cards */}
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

          {/* Gallery */}
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
              images={afterImages}
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
            Vier technische details laten zien hoe de gevel is opgebouwd en afgewerkt: de isolatie, de gewapende laag, de geïntegreerde aansluitpunten en de profielafwerking.
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
            Overzicht van de belangrijkste systeemonderdelen en afwerkingsmaterialen die in deze gevelrenovatie zijn toegepast.
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
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
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

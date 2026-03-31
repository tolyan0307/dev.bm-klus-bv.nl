import { Fragment } from "react"
import Link from "next/link"
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react"
import { buildPageMetadata } from "@/lib/seo/meta"
import { jsonLdScript, projectPageSchema, videoSchema } from "@/lib/seo/schema"
import { SITE } from "@/lib/seo/routes"
import ProjectGalleryCarousel from "@/components/sections/projects/ProjectGalleryCarousel"
import WerkzaamhedenAccordion from "@/components/sections/projects/WerkzaamhedenAccordion"
import ResponsiveImage from "@/components/responsive-image"
import { beforeImages, afterImages } from "@/lib/content/projects/rotterdam-julianastraat-aanbouw-isolatie-4cm-2026"
import { resolveGalleryImages } from "@/lib/gallery-utils"
import YouTubeEmbed from "@/components/youtube-embed"

// ─── SEO ──────────────────────────────────────────────────────────────────────
export const metadata = buildPageMetadata(
  "/onze-werken/rotterdam-julianastraat-aanbouw-isolatie-4cm-2026/",
  {
    title: "Julianastraat aanbouw isolatie 4 cm (2026)",
    description:
      "Project in Rotterdam Julianastraat: aanbouw met 4 cm isolatie, sierpleister 1,5 mm, bitumen op de plint en antraciet plintafwerking.",
  },
)

// ─── Data ─────────────────────────────────────────────────────────────────────
const heroBullets = [
  "4 cm isolatie verlijmd en extra bevestigd met pluggen",
  "Glasvezelnet, pleisterlaag en sierpleister 1,5 mm in standaard wit",
  "Bitumen en profielafwerking aan de plint, geschilderd in antraciet",
]

const werkzaamheden = [
  {
    title: "Voorbereiden van de plint en ondergrond",
    body: "Langs de onderzijde van de gevel is de plintzone voorbereid en behandeld met bitumen tot circa 30 cm hoogte als basis voor extra bescherming.",
  },
  {
    title: "Aanbrengen van 4 cm isolatie",
    body: "Op de gevelwanden van de aanbouw is 4 cm isolatie verlijmd als nieuwe basis voor de opbouw van de buitenafwerking.",
  },
  {
    title: "Mechanisch bevestigen met pluggen",
    body: "De isolatie is aanvullend vastgezet met pluggen, zodat de opbouw stabiel en stevig op de gevel is verankerd.",
  },
  {
    title: "Wapenen en pleisteren van het gevelvlak",
    body: "Over de isolatielaag is gaas aangebracht en de gevel is geplamuurd tot een egale en gewapende ondergrond voor de eindafwerking.",
  },
  {
    title: "Afwerken met sierpleister 1,5 mm",
    body: "De gevel is afgewerkt met sierpleister 1,5 mm in standaard wit voor een frisse en verzorgde uitstraling van de aanbouw.",
  },
  {
    title: "Profielen en plintafwerking monteren",
    body: "Rond ramen, deuren en buitenhoeken zijn hoekprofielen geplaatst. Langs de sokkel is een profiel gemonteerd en de plint is afgewerkt in antraciet als contrasterende basislijn.",
  },
]

const detailCards = [
  {
    title: "Bitumen op de gevelplint",
    body: "De plint is tot circa 30 cm hoogte behandeld met bitumen als extra bescherming van de onderzijde van de gevel.",
  },
  {
    title: "Isolatie 4 cm met plugverankering",
    body: "De isolatie is verlijmd en aanvullend mechanisch bevestigd met pluggen als stabiele basis van de nieuwe gevelopbouw.",
  },
  {
    title: "Gaas en pleisterlaag als gewapende basis",
    body: "Over de isolatie is gaas gemonteerd en een pleisterlaag aangebracht om het gevelvlak egaal en versterkt af te werken.",
  },
  {
    title: "Profielen en contrasterende plintafwerking",
    body: "Hoekprofielen rond openingen en hoeken, samen met een profiel op de sokkel en antraciet schilderwerk, zorgen voor strakke lijnen en een duidelijke basislijn.",
  },
]

const materialen = [
  { label: "Gevelisolatie", value: "Isolatieplaten 4 cm" },
  { label: "Bevestiging", value: "Lijm + pluggen" },
  { label: "Wapening", value: "Gaas met pleisterlaag" },
  { label: "Sierpleister", value: "1,5 mm – standaard wit" },
  { label: "Profielen", value: "Hoekprofielen voor ramen, deuren en buitenhoeken" },
  { label: "Sokkelprofiel", value: "Profiel op de plint/sokkel" },
  { label: "Sokkelbescherming", value: "Bitumen tot circa 30 cm hoogte" },
  { label: "Schilderwerk plint", value: "Antraciet" },
]

const bevindingen = [
  {
    title: "Bestaande gevel bestond uit een zichtbare bakstenen wand",
    body: "Voor de werken bestond de aanbouw uit een bakstenen buitenwand zonder nieuwe isolatie- en afwerkopbouw.",
  },
  {
    title: "Geen vernieuwde beschermlaag op de gevelwanden",
    body: "De twee gevelwanden van de aanbouw hadden nog geen nieuwe buitenafwerking met isolatie, wapening en afgewerkte detaillering.",
  },
  {
    title: "Onderzijde van de gevel vroeg om extra bescherming",
    body: "De plintzone had baat bij een sterkere en beter beschermde afwerking, passend bij de nieuwe opbouw van de buitenwanden.",
  },
]

const resultaten = [
  {
    title: "Twee vernieuwde en geïsoleerde gevelwanden",
    body: "De aanbouw is voorzien van een nieuwe buitenopbouw met 4 cm isolatie, gewapende laag en sierpleister, waardoor beide gevelwanden technisch en visueel zijn vernieuwd.",
  },
  {
    title: "Frisse gevel in wit met contrasterende plint",
    body: "De wanden zijn afgewerkt in wit, terwijl de plint in antraciet is geschilderd voor een duidelijk en verzorgd contrast aan de onderzijde.",
  },
  {
    title: "Nettere details rond openingen en hoeken",
    body: "Met profielafwerking rond ramen, deuren, buitenhoeken en sokkel sluit de nieuwe gevelopbouw strak en consistent aan.",
  },
]

const relatedLinks = [
  { label: "Gevelisolatie", href: "/gevelisolatie/" },
  { label: "Sierpleister", href: "/sierpleister/" },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function RotterdamJulianastraatProjectPage() {
  return (
    <>
      {projectPageSchema({
        title: "Julianastraat aanbouw isolatie 4 cm (2026)",
        description:
          "Project in Rotterdam Julianastraat: aanbouw met 4 cm isolatie, sierpleister 1,5 mm, bitumen op de plint en antraciet plintafwerking.",
        url: `${SITE.canonicalBase}/onze-werken/rotterdam-julianastraat-aanbouw-isolatie-4cm-2026/`,
        image: "/images/projects/rotterdam-julianastraat-aanbouw-isolatie-4cm-2026/rotterdam-julianastraat-aanbouw-isolatie-4cm-2026-na-01.webp",
        city: "Rotterdam Julianastraat",
        year: 2026,
        serviceTypes: ["Gevelisolatie", "Sierpleister"],
      }).map((s, i) => (
        <Fragment key={i}>{jsonLdScript(s)}</Fragment>
      ))}
      {jsonLdScript(videoSchema({
        name: "Aanbouw isoleren in Rotterdam Julianastraat | 4 cm gevelisolatie",
        description:
          "Bij dit project hebben we de gevelplint behandeld met bitumen, 4 cm isolatie verlijmd en verankerd met pluggen, gaas gemonteerd en geplamuurd, en de gevel afgewerkt met sierpleister 1,5 mm in standaard wit. De plint is afgewerkt in antraciet voor een strak contrast.",
        videoId: "iSUV_L9tD-E",
        thumbnailUrl: "https://i.ytimg.com/vi/iSUV_L9tD-E/maxresdefault.jpg",
        uploadDate: "2026-03-26T00:00:00+01:00",
        duration: "PT33S",
      }))}
      <div className="min-h-screen bg-background">

      {/* ── A · HERO ─────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden min-h-[80vh] lg:min-h-[65vh]">

        {/* Background image */}
      <ResponsiveImage
        baseName="rotterdam-julianastraat-aanbouw-isolatie-4cm-2026-na-01"
        dir="/images/projects/rotterdam-julianastraat-aanbouw-isolatie-4cm-2026"
        preset="hero"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
        sizes="(max-width: 1920px) 100vw, 1920px"
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
                Rotterdam Julianastraat (2026)
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
            Rotterdam Julianastraat: aanbouw isolatie 4 cm &amp; sierpleister (2026)
          </h1>

          {/* Subheading */}
          <p className="mt-4 text-lg leading-relaxed max-w-2xl" style={{ color: "rgba(255,255,255,0.78)" }}>
            Voor deze aanbouw in Rotterdam Julianastraat hebben we twee buitenwanden vernieuwd met 4 cm isolatie, mechanische bevestiging, glasvezelwapening en sierpleister 1,5 mm in standaard wit. Daarnaast is de gevelplint behandeld met bitumen, voorzien van een profiel en afgewerkt in antraciet voor een duidelijke en beter beschermde onderzijde.
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
            <span className="font-medium text-white">Rotterdam Julianastraat</span>
            <span aria-hidden>·</span>
            <span>aanbouw</span>
            <span aria-hidden>·</span>
            <span>isolatie 4 cm</span>
            <span aria-hidden>·</span>
            <span>sierpleister 1,5 mm</span>
            <span aria-hidden>·</span>
            <span>standaard wit</span>
            <span aria-hidden>·</span>
            <span>plint antraciet</span>
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
            Van het voorbereiden van de plint en isolatieopbouw tot wapening, sierpleister en het netjes afwerken van ramen, deuren en hoeken.
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
            De situatie vóór de werken draaide vooral om twee onbehandelde bakstenen gevelwanden en een onderzijde die nog geen nieuwe beschermende afwerking had.
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
            Na de werken heeft de aanbouw een strakke, lichtere uitstraling gekregen met twee vernieuwde gevelwanden en een duidelijk afgewerkte plintzone in antraciet.
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
              images={resolveGalleryImages(afterImages)}
            />
          </div>
        </div>
      </section>

      {/* ── D½ · VIDEO ──────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden border-b border-border py-16 sm:py-20 lg:py-24"
        aria-labelledby="video-heading"
        style={{ background: "linear-gradient(175deg, #1A1A1A 0%, #1F1710 45%, #2A1C0E 70%, #1A1A1A 100%)" }}
      >
        {/* Decorative orange glow — top-right */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-[0.07] blur-3xl"
          style={{ background: "#E8600A" }}
          aria-hidden
        />
        {/* Decorative orange glow — bottom-left */}
        <div
          className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full opacity-[0.05] blur-3xl"
          style={{ background: "#E8600A" }}
          aria-hidden
        />

        <div className="container-default max-w-4xl">
          {/* Section header — adapted for dark background */}
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-12 bg-primary" aria-hidden />
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Video
            </span>
          </div>
          <h2
            id="video-heading"
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Bekijk het project{" "}
            <span className="text-primary">in beeld</span>
          </h2>
          <p
            className="mt-3 max-w-2xl text-base leading-relaxed"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            In deze korte video ziet u hoe de aanbouw in Rotterdam
            Julianastraat stap voor stap is voorzien van isolatie, wapening
            en sierpleister.
          </p>

          {/* Video card */}
          <div className="mt-8 rounded-2xl p-2 sm:p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <YouTubeEmbed
              videoId="iSUV_L9tD-E"
              title="Aanbouw isoleren in Rotterdam Julianastraat – 4 cm gevelisolatie"
              duration="0:33"
            />
          </div>

          {/* Metadata strip */}
          <div
            className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                <path d="M8 0a8 8 0 110 16A8 8 0 018 0zm0 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM6.5 5l5 3-5 3V5z" />
              </svg>
              BM klus BV op YouTube
            </span>
            <span className="h-3 w-px" style={{ background: "rgba(255,255,255,0.15)" }} aria-hidden />
            <span>Rotterdam Julianastraat</span>
            <span className="h-3 w-px" style={{ background: "rgba(255,255,255,0.15)" }} aria-hidden />
            <span>2026</span>
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
            Vier details bepalen de technische en visuele kwaliteit van dit project: de beschermde plint, de isolatieopbouw, de gewapende basislaag en de profielafwerking.
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
            Overzicht van de belangrijkste materialen en afwerkingen die zijn gebruikt voor de isolatieopbouw, de plintbescherming en de eindafwerking van de aanbouw.
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
      </div>{/* end below-fold */}

    </div>
    </>
  )
}

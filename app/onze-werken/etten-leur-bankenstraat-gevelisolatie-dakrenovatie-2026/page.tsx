import { Fragment } from "react"
import Link from "next/link"
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react"
import { buildPageMetadata } from "@/lib/seo/meta"
import { jsonLdScript, projectPageSchema, videoSchema } from "@/lib/seo/schema"
import { SITE } from "@/lib/seo/routes"
import ProjectGalleryCarousel from "@/components/sections/projects/ProjectGalleryCarousel"
import WerkzaamhedenAccordion from "@/components/sections/projects/WerkzaamhedenAccordion"
import ResponsiveImage from "@/components/responsive-image"
import { beforeImages, afterImages } from "@/lib/content/projects/etten-leur-bankenstraat-gevelisolatie-dakrenovatie-2026"
import { resolveGalleryImages } from "@/lib/gallery-utils"
import YouTubeEmbed from "@/components/youtube-embed"

// ─── SEO ──────────────────────────────────────────────────────────────────────
export const metadata = buildPageMetadata(
  "/onze-werken/etten-leur-bankenstraat-gevelisolatie-dakrenovatie-2026/",
  {
    title: "Etten-Leur gevel- en dakrenovatie – 2026",
    description:
      "Project in Etten-Leur met gevelisolatie, witte sierpleister, natuurstenen plint en raamdorpels en een dakrenovatie met zwarte Koramic dakpannen.",
  },
)

// ─── Data ─────────────────────────────────────────────────────────────────────
const heroBullets = [
  "Buitengevelisolatie met mechanische bevestiging en gewapende basislaag",
  "Witte sierpleister 1,5 mm met donker gezoete natuurstenen plint en raamdorpels",
  "Vernieuwd dak met matzwarte Koramic Datura 800 dakpannen en afgewerkte Trespa-delen",
]

const werkzaamheden = [
  {
    title: "Gevels voorbereiden en isolatiesysteem aanbrengen",
    body: "De bestaande gevels zijn voorbereid voor de nieuwe opbouw. Vervolgens is buitengevelisolatie verlijmd en aanvullend mechanisch bevestigd met pluggen.",
  },
  {
    title: "Wapeningslaag, profielen en sierpleister aanbrengen",
    body: "Op de isolatie is glasvezelwapening met een uitvlaklaag aangebracht. Rond ramen, deuren, buitenhoeken en de onderzijde van de gevel zijn passende profielen geplaatst, waarna de gevel is afgewerkt met witte sierpleister 1,5 mm.",
  },
  {
    title: "Plint en raamdorpels met natuursteen afwerken",
    body: "De sokkel is eerst uitgevlakt met cementmortel en rondom de woning afgewerkt met donker gezoete natuurstenen tegels. Hoekstukken zijn in verstek gezaagd en de voegen zijn met siliconen afgedicht. Ook de oude raamdorpels zijn vervangen door nieuwe natuurstenen exemplaren.",
  },
  {
    title: "Bestaande dakbedekking en latten verwijderen",
    body: "De bestaande dakpannen en lattenconstructie zijn gedemonteerd en afgevoerd. Daarbij zijn de dakvlakken voorbereid voor een vernieuwde, waterkerende opbouw.",
  },
  {
    title: "Nieuwe onderlaag, latten en dakpannen plaatsen",
    body: "Op het dak is een dampdoorlatende en waterdichte onderlaag aangebracht, gevolgd door een nieuwe horizontale en verticale lattenconstructie. Het dak is afgewerkt met matzwarte geglazuurde Koramic Datura 800 dakpannen en nieuwe nok- en randpannen.",
  },
  {
    title: "Trespa-delen demonteren en opnieuw afwerken",
    body: "Trespa-delen aan de dakoverstekken en voorzijde zijn gedemonteerd en opnieuw gemonteerd. Schroefgaten en aansluitingen zijn bijgewerkt, waarna de oppervlakken zijn geschuurd, gegrond en voorzien van een nieuwe lakafwerking.",
  },
]

const bevindingen = [
  {
    title: "Bakstenen gevel zonder nieuwe buitenisolatie",
    body: "Voor de renovatie bestond de buitenzijde hoofdzakelijk uit zichtbaar metselwerk en was nog geen doorlopende nieuwe buitengevelisolatie met sierpleisterafwerking aanwezig.",
  },
  {
    title: "Verouderde plint en raamdorpels",
    body: "De bestaande plintzone en raamdorpels sloten niet aan op de gewenste nieuwe gevelafwerking en moesten worden vernieuwd voor een verzorgde en samenhangende detaillering.",
  },
  {
    title: "Dakbedekking en onderliggende opbouw aan vernieuwing toe",
    body: "De oude dakpannen zijn verwijderd en tijdens de werkzaamheden kwam de bestaande onderliggende dakopbouw volledig vrij voor herstel en vernieuwing.",
  },
  {
    title: "Trespa vroeg om herstel en nieuwe afwerking",
    body: "De bestaande Trespa-delen rond de dakoverstekken en voorzijde moesten worden gedemonteerd, bijgewerkt en opnieuw afgewerkt.",
  },
]

const resultaten = [
  {
    title: "Strakke witte gevel met nieuwe isolatieopbouw",
    body: "De woning heeft een doorlopende nieuwe gevelopbouw gekregen met buitengevelisolatie, glasvezelwapening en een egale witte sierpleisterafwerking van 1,5 mm.",
  },
  {
    title: "Donkere natuurstenen plint en raamdorpels",
    body: "De donker gezoete natuursteen vormt een verzorgde, contrasterende aansluiting langs de onderzijde van de gevel en rond de raamopeningen.",
  },
  {
    title: "Vernieuwd matzwart pannendak",
    body: "Met de nieuwe onderlaag, lattenconstructie en Koramic Datura 800 dakpannen heeft de woning een volledig vernieuwde zwarte dakafwerking gekregen.",
  },
  {
    title: "Afgewerkte dakranden en Trespa-delen",
    body: "De vernieuwde en gelakte Trespa-delen sluiten visueel aan op het zwarte dak en de donkere detaillering van de gevel.",
  },
]

const detailCards = [
  {
    title: "Profielen rond openingen en gevelranden",
    body: "Hoekprofielen rond ramen, deuren en buitenhoeken en sokkelprofielen langs de onderzijde zorgen voor rechte lijnen en nette aansluitingen in de sierpleisterafwerking.",
  },
  {
    title: "Natuursteen in verstek en afgedichte voegen",
    body: "De natuurstenen plinttegels zijn bij de hoeken op 45 graden in verstek gezaagd en de voegen zijn zorgvuldig met siliconen afgedicht.",
  },
  {
    title: "Waterkerende dakopbouw met nieuwe latten",
    body: "Onder de nieuwe dakpannen is een dampdoorlatende, waterdichte onderlaag met een volledig vernieuwde lattenconstructie aangebracht.",
  },
  {
    title: "Trespa geschuurd, gegrond en gelakt",
    body: "Na montage zijn bevestigingspunten bijgewerkt en zijn de Trespa-oppervlakken geschuurd, voorzien van primer en opnieuw gelakt.",
  },
]

const materialen = [
  { label: "Gevelisolatie", value: "Buitengevelisolatie, verlijmd en mechanisch bevestigd" },
  { label: "Wapening", value: "Glasvezelnet met uitvlak- en pleisterlaag" },
  { label: "Gevelafwerking", value: "Sierpleister 1,5 mm in standaard wit" },
  { label: "Profielen", value: "Hoekprofielen rond openingen en sokkelprofielen" },
  { label: "Plint en raamdorpels", value: "Donker gezoete natuursteen met siliconen voegafdichting" },
  { label: "Dakonderlaag", value: "Dampdoorlatende, waterdichte onderlaag met nieuwe houten latten" },
  { label: "Dakpannen", value: "Matzwart geglazuurde Koramic Datura 800 met nieuwe nok- en randpannen" },
  { label: "Trespa-afwerking", value: "Tweedelige lijm, primer en lakafwerking" },
]

const relatedLinks = [
  { label: "Gevelisolatie", href: "/gevelisolatie/" },
  { label: "Sierpleister", href: "/sierpleister/" },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EttenLeurBankenstraatProjectPage() {
  return (
    <>
      {projectPageSchema({
        title: "Etten-Leur gevel- en dakrenovatie – 2026",
        description:
          "Project in Etten-Leur met gevelisolatie, witte sierpleister, natuurstenen plint en raamdorpels en een dakrenovatie met zwarte Koramic dakpannen.",
        url: `${SITE.canonicalBase}/onze-werken/etten-leur-bankenstraat-gevelisolatie-dakrenovatie-2026/`,
        image: "/images/projects/etten-leur-bankenstraat-gevelisolatie-dakrenovatie-2026/etten-leur-bankenstraat-gevelisolatie-dakrenovatie-2026-na-01.webp",
        city: "Etten-Leur (Bankenstraat)",
        year: 2026,
        serviceTypes: ["Gevelisolatie", "Sierpleister"],
      }).map((s, i) => (
        <Fragment key={i}>{jsonLdScript(s)}</Fragment>
      ))}
      {jsonLdScript(videoSchema({
        name: "Gevelisolatie en sierpleister in Etten-Leur | BM KLUS BV",
        description:
          "Bij deze woning aan de Bankenstraat in Etten-Leur zijn de gevels voorzien van buitengevelisolatie en witte sierpleister 1,5 mm, met een donker gezoete natuurstenen plint en raamdorpels. Ook het dak is vernieuwd met matzwarte Koramic Datura 800 dakpannen en afgewerkte Trespa-delen.",
        videoId: "2tEOggLbdqs",
        thumbnailUrl: "https://i.ytimg.com/vi/2tEOggLbdqs/maxresdefault.jpg",
        uploadDate: "2026-08-14T00:00:00+02:00",
        duration: "PT49S",
      }))}
      <div className="min-h-screen bg-background">

      {/* ── A · HERO ─────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden min-h-[80vh] lg:min-h-[65vh]">

        {/* Background image */}
      <ResponsiveImage
        baseName="etten-leur-bankenstraat-gevelisolatie-dakrenovatie-2026-na-01"
        dir="/images/projects/etten-leur-bankenstraat-gevelisolatie-dakrenovatie-2026"
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
                Etten-Leur (2026)
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
            Etten-Leur Bankenstraat: gevelisolatie, sierpleister &amp; dakrenovatie (2026)
          </h1>

          {/* Subheading */}
          <p className="mt-4 text-lg leading-relaxed max-w-2xl" style={{ color: "rgba(255,255,255,0.78)" }}>
            Bij deze woning aan de Bankenstraat in Etten-Leur zijn de bestaande bakstenen gevels voorzien van buitengevelisolatie, mechanische bevestiging, een gewapende basislaag en witte sierpleister 1,5 mm. De plint en raamdorpels zijn afgewerkt met donker gezoete natuursteen. Daarnaast is de dakopbouw vernieuwd en afgewerkt met matzwarte geglazuurde Koramic Datura 800 dakpannen, nieuwe nok- en randpannen en gerenoveerde Trespa-delen.
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
            <span className="font-medium text-white">Etten-Leur (Bankenstraat)</span>
            <span aria-hidden>·</span>
            <span>woning</span>
            <span aria-hidden>·</span>
            <span>gevelisolatie</span>
            <span aria-hidden>·</span>
            <span>sierpleister 1,5 mm</span>
            <span aria-hidden>·</span>
            <span>natuurstenen plint</span>
            <span aria-hidden>·</span>
            <span>Koramic Datura 800</span>
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
            De woning is als één samenhangend renovatieproject aangepakt: van gevelisolatie en natuurstenen details tot de vernieuwing van dakopbouw, dakpannen en Trespa-afwerking.
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
            De beginsituatie bestond uit een bakstenen gevel, een verouderde plint- en raamdorpeldetaillering en een bestaand pannendak. De fotoreeks toont ook de opeenvolgende fasen van isolatie, wapening, pleisterwerk en dakvernieuwing.
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
            Na afronding vormen de witte sierpleistergevel, donkere natuurstenen plint, zwarte raamdorpels, vernieuwde dakbedekking en afgewerkte Trespa-delen één samenhangend geheel.
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
            In deze korte video ziet u hoe de woning aan de Bankenstraat in
            Etten-Leur stap voor stap is voorzien van gevelisolatie,
            sierpleister, natuurstenen details en een vernieuwd pannendak.
          </p>

          {/* Video card */}
          <div className="mt-8 rounded-2xl p-2 sm:p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <YouTubeEmbed
              videoId="2tEOggLbdqs"
              title="Gevelisolatie en sierpleister in Etten-Leur – BM KLUS BV"
              duration="0:49"
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
            <span>Etten-Leur Bankenstraat</span>
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
            De kwaliteit van het project zit in de samenhang tussen de technische gevelopbouw, natuurstenen aansluitingen, vernieuwde daklagen en zorgvuldig afgewerkte dakranddetails.
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
            Overzicht van de belangrijkste materialen en afwerkingsonderdelen voor gevel, plint, raamdorpels, dak en Trespa-delen.
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

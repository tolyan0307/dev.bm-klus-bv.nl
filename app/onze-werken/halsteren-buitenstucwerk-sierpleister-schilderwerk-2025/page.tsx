import Link from "next/link"
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react"
import { buildPageMetadata } from "@/lib/seo/meta"
import ProjectGalleryCarousel from "@/components/sections/projects/ProjectGalleryCarousel"
import WerkzaamhedenAccordion from "@/components/sections/projects/WerkzaamhedenAccordion"
import { beforeImages, afterImages } from "@/lib/content/projects/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025"

// ─── SEO ──────────────────────────────────────────────────────────────────────
export const metadata = buildPageMetadata(
  "/onze-werken/halsteren-buitenstucwerk-sierpleister-schilderwerk-2025/",
  {
    title: "Halsteren buitenstucwerk & sierpleister – 2025 | BM Klus BV",
    description:
      "Halsteren (2025): herstel buitenstucwerk, sierpleister 1,5 mm, zinken afdekking en schilderwerk. Bekijk voor/na en details.",
  },
)

// ─── Data ─────────────────────────────────────────────────────────────────────
const heroBullets = [
  "Selectief herstel van loszittend stucwerk",
  "Wapeningslaag met glasvezelnet op kritieke zones",
  "Sierpleister 1,5 mm (wit) + nette profielen",
  "Zinken afdekking tegen inwateren",
]

const werkzaamheden = [
  {
    title: "Inspectie & afkloppen",
    body: "Volledige inventarisatie van de gevel: losse zones gelokaliseerd door systematisch afkloppen op de centrale gevel en rondom de binnenplaats.",
  },
  {
    title: "Verwijderen instabiel stucwerk",
    body: "Al het onthechte stucwerk verwijderd tot op de stabiele ondergrond, zodat de nieuwe opbouw een zuivere hechtbasis heeft.",
  },
  {
    title: "Hechtzandlaag & cementmortel",
    body: "Hechtzandlaag aangebracht gevolgd door MKS-Rapid cementmortel voor een egale, sneldrogende opbouwlaag over de behandelde zones.",
  },
  {
    title: "Wapeningslaag glasvezelnet",
    body: "Glasvezelnet verwerkt in de hechtzandlaag op hoeken, raakvlakken en andere kritieke zones om scheuren structureel te voorkomen.",
  },
  {
    title: "Stucstop- & hoekprofielen",
    body: "Profielen geplaatst langs alle gevelvlakranden en hoeken voor strakke, rechte lijnen en extra bescherming op de kwetsbaarste punten.",
  },
  {
    title: "Sierpleister 1,5 mm",
    body: "Sierpleister in korrelstructuur 1,5 mm, kleur wit, aangebracht over alle behandelde gevelzones voor een uniforme, hoogwaardige uitstraling.",
  },
  {
    title: "Zinken afdekprofiel",
    body: "Zinken afdekprofiel gemonteerd op de bovenrand van de gevel — leidt regenwater doeltreffend af en voorkomt herhaalde inwatering structureel.",
  },
  {
    title: "Schilderwerk & antraciet plint",
    body: "Twee lagen buitenverf aangebracht over de gehele gevel. Plintzone (40–50 cm) afgewerkt in antraciet voor spatwaterbestendigheid en visuele diepte.",
  },
]

const detailCards = [
  {
    title: "Plintzone & spatwater",
    body: "Antraciet afwerking 40–50 cm — beschermt tegen dagelijks spatwater en geeft visuele diepte.",
  },
  {
    title: "Hoeken & profielen",
    body: "Stucstop- en hoekprofielen op alle randen: strakke lijnen, beschermd tegen stoten en vocht.",
  },
  {
    title: "Dagkanten & aansluitingen",
    body: "Kozijnen en doorgangen volledig meebehandeld — geen zwakke aansluitpunten achtergelaten.",
  },
  {
    title: "Zinken afdekking",
    body: "Afdekprofiel bovenrand leidt regenwater direct af en houdt de nieuwe stuclaag droog.",
  },
]

const materialen = [
  { label: "Cementmortel", value: "MKS-Rapid (sneldrogende cementmortel)" },
  { label: "Wapening", value: "Glasvezelnet, verwerkt in hechtzandlaag" },
  { label: "Sierpleister", value: "1,5 mm korrelstructuur, kleur wit" },
  { label: "Afdekking", value: "Zink afdekkap bovenrand gevel" },
  { label: "Schilderwerk", value: "2 lagen buitenverf, kleur wit" },
  { label: "Plint", value: "Antraciet, 40–50 cm hoogte" },
]

const bevindingen = [
  {
    title: "Losse zones over groot oppervlak",
    body: "Onthecht stucwerk op de centrale gevel én rondom de binnenplaats.",
  },
  {
    title: "Scheurvorming op hoeken & raakvlakken",
    body: "Zichtbare scheuren door jarenlange vochtinfiltratie op aansluitpunten.",
  },
  {
    title: "Spatwaterschade aan de plintzone",
    body: "Gebarsten verf en loszittend stucwerk onderaan de gevel (0–50 cm).",
  },
  {
    title: "Ontbrekende afdekking bovenrand",
    body: "Geen afdekprofiel — regenwater kon vrij de stuclaag insijpelen.",
  },
]

const resultaten = [
  {
    title: "Gestabiliseerde en versterkte ondergrond",
    body: "Losse zones volledig gesaneerd, glasvezelnet op hoeken — geen herhaald loszittend stucwerk.",
  },
  {
    title: "Uniforme sierpleisterafwerking",
    body: "Sierpleister 1,5 mm wit over alle behandelde zones: strakke vlakken, nette profielen.",
  },
  {
    title: "Structurele afdichting bovenrand",
    body: "Zinken afdekprofiel leidt regenwater direct af — de voornaamste oorzaak van schade is opgelost.",
  },
  {
    title: "Klare gevel voor 15–20 jaar",
    body: "Twee lagen buitenverf, antraciet plint op spatwaterhoogte. Geen achterstallig onderhoud.",
  },
]

const relatedLinks = [
  { label: "Buiten stucwerk", href: "/buiten-stucwerk" },
  { label: "Sierpleister", href: "/sierpleister" },
  { label: "Gevel schilderen", href: "/gevel-schilderen/" },
  { label: "Gevelisolatie", href: "/gevelisolatie/" },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HalsterenProjectPage() {
  return (
    <main className="min-h-screen bg-background">

      {/* ── A · HERO ─────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden min-h-[80vh] lg:min-h-[65vh]">

        {/* Background image */}
        <img
          src="/images/projects/halsteren-buitenstucwerk-na-01.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
          width={1920}
          height={1080}
          fetchPriority="high"
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
            height: 180,
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
        <div className="relative z-10 container-default flex flex-col justify-end min-h-[80vh] lg:min-h-[65vh] pb-16 pt-36 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24">

          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-7">
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
                Halsteren (2025)
              </li>
            </ol>
          </nav>

          {/* Badge */}
          <div className="mb-5">
            <span
              className="inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white"
              style={{ background: "rgba(232,96,10,0.90)", border: "1px solid rgba(232,96,10,0.60)" }}
            >
              Buitenstucwerk
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl max-w-3xl">
            Halsteren: buitenstucwerk, sierpleister &amp; schilderwerk (2025)
          </h1>

          {/* Subheading */}
          <p className="mt-4 text-lg leading-relaxed max-w-2xl" style={{ color: "rgba(255,255,255,0.78)" }}>
            Volledige buitengevelrenovatie van een woning in Halsteren — van herstel en wapening
            tot een duurzame sierpleisterafwerking en schilderwerk.
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
            <span className="font-medium text-white">Halsteren</span>
            <span aria-hidden>·</span>
            <span>woning</span>
            <span aria-hidden>·</span>
            <span>binnenplaats &amp; centrale gevel</span>
            <span aria-hidden>·</span>
            <span>cementstuc + sierpleister 1,5 mm</span>
            <span aria-hidden>·</span>
            <span>zinken afdekking</span>
            <span aria-hidden>·</span>
            <span>schilderwerk (2 lagen)</span>
            <span aria-hidden>·</span>
            <span>antraciet plint</span>
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
            Een volledige buitengevelrenovatie — van diagnostiek tot de definitieve afwerking in twee schilderlagen.
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
            Vier terugkerende problemen bepaalden de omvang en aanpak van de renovatie.
          </p>

          {/* Diagnosis cards — compact 2-col grid */}
          <ul className="mt-7 grid gap-3 sm:grid-cols-2" role="list">
            {bevindingen.map((item) => (
              <li
                key={item.title}
                className="group relative flex flex-col gap-1.5 rounded-xl border border-border bg-card px-5 py-4 shadow-sm transition-all hover:border-primary/30 hover:shadow-md overflow-hidden"
              >
                {/* Orange left accent bar — full height on hover */}
                <span
                  className="absolute left-0 inset-y-0 w-[3px] rounded-l-xl bg-primary opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
                {/* Subtle resting dot */}
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
            Een technisch solide en esthetisch verzorgde gevel — klaar voor de komende decennia.
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
            Vier onderdelen die vakmanschap onderscheiden van standaard uitvoering.
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
            Overzicht van alle toegepaste materialen en systemen bij dit project.
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
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href + "/"}
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

    </main>
  )
}

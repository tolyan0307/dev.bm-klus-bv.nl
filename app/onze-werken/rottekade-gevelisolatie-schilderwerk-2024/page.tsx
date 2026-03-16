import { Fragment } from "react"
import Link from "next/link"
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react"
import { buildPageMetadata } from "@/lib/seo/meta"
import { jsonLdScript, projectPageSchema } from "@/lib/seo/schema"
import { SITE } from "@/lib/seo/routes"
import ProjectGalleryCarousel from "@/components/sections/projects/ProjectGalleryCarousel"
import WerkzaamhedenAccordion from "@/components/sections/projects/WerkzaamhedenAccordion"
import ResponsiveImage from "@/components/responsive-image"
import { beforeImages, afterImages } from "@/lib/content/projects/rottekade-gevelisolatie-schilderwerk-2024"
import { resolveGalleryImages } from "@/lib/gallery-utils"

// ─── SEO ──────────────────────────────────────────────────────────────────────
export const metadata = buildPageMetadata(
  "/onze-werken/rottekade-gevelisolatie-schilderwerk-2024/",
  {
    title: "Rottekade gevelisolatie 10 cm & schilderwerk – project 2024",
    description:
      "Project in Rottekade (regio Rotterdam): zijgevelrenovatie met 10 cm gevelisolatie, sierpleister met reliëf, schilderwerk en zinken HWA.",
  },
)

// ─── Data ─────────────────────────────────────────────────────────────────────
const heroBullets = [
  "10 cm gevelisolatie met versterkte laag en wapeningsnet",
  "Sierpleister met reliëf + duurzame schilderafwerking",
  "Nieuwe aluminium raamdorpels, bitumen sokkel en zinken hemelwaterafvoer",
]

const werkzaamheden = [
  {
    title: "Opname van de zijgevel en probleemzones",
    body: "We hebben de zijgevel geïnspecteerd en de verouderde afwerking, scheurvorming, beschadigde raamdorpels, sokkelproblemen en de oude hemelwaterafvoer in kaart gebracht.",
  },
  {
    title: "Gevelisolatie en versterkte opbouw",
    body: "Op de zijgevel is 10 cm gevelisolatie aangebracht, gevolgd door een versterkte laag met wapeningsnet als stabiele basis voor de verdere afwerking.",
  },
  {
    title: "Afwerking met reliëf en schilderwerk",
    body: "Na de opbouw is de gevel afgewerkt met een tweede laag sierpleister met reliëf en vervolgens geschilderd met duurzame gevelverf voor een strakke eindafwerking.",
  },
  {
    title: "Vernieuwing van details en waterafvoer",
    body: "De oude raamdorpels zijn vervangen door aluminium raamdorpels, de sokkelzone is voorzien van bitumen bescherming en de hemelwaterafvoer is vervangen door zinken regenpijpen. Daarnaast zijn ventilatieopeningen met nette roosters aangebracht.",
  },
]

const bevindingen = [
  {
    title: "Geen moderne isolatie en gevoelig voor warmteverlies",
    body: "De zijgevel had geen moderne isolatie en was daardoor gevoeliger voor warmteverlies en weersinvloeden.",
  },
  {
    title: "Verouderde afwerking met scheuren en verkleuringen",
    body: "In de bestaande gevelafwerking waren plaatselijke scheuren, verkleuringen en verouderingssporen zichtbaar.",
  },
  {
    title: "Beschadigde raamdorpels en kwetsbare sokkelzone",
    body: "De betonnen raamdorpels waren versleten en beschadigd. De sokkelzone had onvoldoende bescherming tegen spatwater en vocht, met vervuiling en donkere plekken als gevolg.",
  },
  {
    title: "Verouderde hemelwaterafvoer en ontbrekende ventilatie",
    body: "De oude hemelwaterafvoer voldeed niet meer en in de gevel ontbrak doelgerichte ventilatie, wat het vochtbeheer in de gevelzone niet ten goede kwam.",
  },
]

const resultaten = [
  {
    title: "Geïsoleerde en strak afgewerkte zijgevel",
    body: "De woning kreeg een compleet vernieuwde zijgevel met 10 cm gevelisolatie, versterkte opbouw en een nette eindafwerking met reliëf en gevelverf.",
  },
  {
    title: "Verbeterde details rond ramen en gevelvlakken",
    body: "Nieuwe aluminium raamdorpels zorgen voor een strakke uitstraling en ondersteunen een gecontroleerde waterafvoer rond de raamopeningen.",
  },
  {
    title: "Extra bescherming van de sokkelzone",
    body: "De sokkel is behandeld met bitumen als extra bescherming tegen vochtbelasting en spatwater in de onderste zone van de gevel.",
  },
  {
    title: "Vernieuwde waterafvoer en ventilatieroosters",
    body: "De hemelwaterafvoer is vervangen door zinken regenpijpen en er zijn ventilatieopeningen met roosters toegevoegd als onderdeel van de vernieuwde geveldetails.",
  },
]

const detailCards = [
  {
    title: "Aluminium raamdorpels",
    body: "Versleten betonnen raamdorpels vervangen door aluminium uitvoeringen voor een strakker detail en betere afwatering.",
  },
  {
    title: "Bitumen sokkelbescherming",
    body: "Sokkelzone voorzien van bitumen bescherming tegen spatwater en vochtbelasting in het onderste geveldeel.",
  },
  {
    title: "Zinken hemelwaterafvoer",
    body: "Oude afvoer vervangen door zinken regenpijpen als duurzame oplossing binnen de vernieuwde gevelafwerking.",
  },
  {
    title: "Ventilatieroosters in de gevel",
    body: "Ventilatieopeningen met nette roosters aangebracht als functioneel detail in de nieuwe gevelopbouw.",
  },
]

const materialen = [
  { label: "Gevelisolatie", value: "10 cm gevelisolatiesysteem" },
  { label: "Versterkte laag", value: "Wapeningslaag met wapeningsnet" },
  { label: "Pleisterafwerking", value: "Sierpleister met reliëf (tweede afwerklaag)" },
  { label: "Schilderafwerking", value: "Duurzame gevelverf" },
  { label: "Raamdorpels", value: "Aluminium raamdorpels" },
  { label: "Sokkelbescherming", value: "Bitumen bescherming van de sokkelzone" },
  { label: "Hemelwaterafvoer", value: "Zinken regenpijpen" },
  { label: "Ventilatie", value: "Ventilatieopeningen met roosters" },
]

const relatedLinks = [
  { label: "Gevelisolatie", href: "/gevelisolatie/" },
  { label: "Sierpleister", href: "/sierpleister/" },
  { label: "Gevel schilderen", href: "/gevel-schilderen/" },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function RottekadeProjectPage() {
  return (
    <>
      {projectPageSchema({
        title: "Rottekade gevelisolatie 10 cm & schilderwerk – project 2024",
        description:
          "Project in Rottekade (regio Rotterdam): zijgevelrenovatie met 10 cm gevelisolatie, sierpleister met reliëf, schilderwerk en zinken HWA.",
        url: `${SITE.canonicalBase}/onze-werken/rottekade-gevelisolatie-schilderwerk-2024/`,
        image: "/images/projects/rottekade-gevelisolatie-10cm-na-01.webp",
        city: "Rottekade",
        year: 2024,
        serviceTypes: ["Gevelisolatie", "Sierpleister", "Gevel schilderen"],
      }).map((s, i) => (
        <Fragment key={i}>{jsonLdScript(s)}</Fragment>
      ))}
      <div className="min-h-screen bg-background">

      {/* ── A · HERO ─────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden min-h-[80vh] lg:min-h-[65vh]">

        {/* Background image */}
  <ResponsiveImage
    baseName="rottekade-gevelisolatie-10cm-na-01"
    dir="/images/projects"
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
                Rottekade (2024)
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
            Rottekade: gevelisolatie 10 cm, sierpleister &amp; schilderwerk (2024)
          </h1>

          {/* Subheading */}
          <p className="mt-4 text-lg leading-relaxed max-w-2xl" style={{ color: "rgba(255,255,255,0.78)" }}>
            Zijgevelrenovatie van een woning met 10 cm gevelisolatie, sierpleister met reliëf,
            schilderafwerking, aluminium raamdorpels, bitumen sokkel en zinken hemelwaterafvoer.
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
            <span className="font-medium text-white">Rottekade</span>
            <span aria-hidden>·</span>
            <span>regio Rotterdam</span>
            <span aria-hidden>·</span>
            <span>woning</span>
            <span aria-hidden>·</span>
            <span>zijgevel</span>
            <span aria-hidden>·</span>
            <span>gevelisolatie 10 cm</span>
            <span aria-hidden>·</span>
            <span>sierpleister met reliëf</span>
            <span aria-hidden>·</span>
            <span>schilderwerk (2024)</span>
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
            Van inspectie en isolatieopbouw tot strak sierpleister- en schilderwerk met vernieuwde geveldetails.
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
            Vier aandachtspunten op de zijgevel bepaalden de scope en aanpak van deze renovatie.
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
            Een vernieuwde zijgevel met geïsoleerde opbouw, fraaie afwerking en verzorgde geveldetails.
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
            Vier geveldetails die de levensduur en kwaliteit van de renovatie bepalen.
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
      </div>{/* end below-fold */}

    </div>
    </>
  )
}

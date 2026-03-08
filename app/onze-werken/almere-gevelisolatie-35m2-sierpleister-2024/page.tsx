import Link from "next/link"
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react"
import { buildPageMetadata } from "@/lib/seo/meta"
import ProjectGalleryCarousel from "@/components/sections/projects/ProjectGalleryCarousel"
import WerkzaamhedenAccordion from "@/components/sections/projects/WerkzaamhedenAccordion"
import { beforeImages, afterImages } from "@/lib/content/projects/almere-gevelisolatie-35m2-sierpleister-2024"

// ─── SEO ──────────────────────────────────────────────────────────────────────
export const metadata = buildPageMetadata(
  "/onze-werken/almere-gevelisolatie-35m2-sierpleister-2024/",
  {
    title: "Almere gevelisolatie 35 m² sierpleister – 2024–2025",
    description:
      "Project in Almere: ca. 35 m² gevel vernieuwd met gevelisolatie, wapeningsnet, GW-Plus en sierpleister 1,5 mm in standaard wit.",
  },
)

// ─── Data ─────────────────────────────────────────────────────────────────────
const heroBullets = [
  "Circa 35 m² gevel vernieuwd met nieuwe gevelisolatie en sierpleister 1,5 mm",
  "Naden en aansluitingen gevuld en ondergrond uitgevlakt met GW-Plus",
  "Wapeningsnet en hoekprofielen toegepast voor een strakke afwerking",
]

const werkzaamheden = [
  {
    title: "Opname van de gevel en verouderde toplaag",
    body: "We hebben de bestaande gevel beoordeeld op scheuren, loslatende afwerking en zichtbare naden en aansluitingen om de herstel- en opbouwstappen gericht uit te voeren.",
  },
  {
    title: "Plaatselijk verwijderen en voorbehandelen van de ondergrond",
    body: "De oude gevellaag is plaatselijk verwijderd en de ondergrond is voorbehandeld als basis voor de nieuwe opbouw.",
  },
  {
    title: "Vullen van naden en aansluitingen",
    body: "Naden en aansluitingen zijn gevuld met speciale montageschuim voor gevelopeningen om de ondergrond en overgangen voor verdere opbouw voor te bereiden.",
  },
  {
    title: "Wapeningsnet en hoekprofielen aanbrengen",
    body: "Over de gevel is een wapeningsnet aangebracht. Op raam- en deuropeningen en kolomhoeken zijn hoekprofielen geplaatst voor nette en stabiele details.",
  },
  {
    title: "Uitvlakken met GW-Plus",
    body: "De ondergrond is uitgevlakt met GW-Plus om een egaal gevelvlak te creëren voor de afwerklaag.",
  },
  {
    title: "Afwerking met sierpleister 1,5 mm (standaard wit)",
    body: "De gevel is afgewerkt met sierpleister 1,5 mm in standaard wit voor een frisse en strakke uitstraling.",
  },
]

const bevindingen = [
  {
    title: "Verouderde toplaag met scheuren en onregelmatigheden",
    body: "De bestaande gevel had een verouderde toplaag met scheuren en onregelmatigheden, waardoor het gevelbeeld onrustig oogde.",
  },
  {
    title: "Plaatselijk loslatende afwerking",
    body: "Op verschillende plaatsen liet de afwerking los, wat de bescherming tegen weersinvloeden en de duurzaamheid van de gevel verminderde.",
  },
  {
    title: "Zichtbare naden en aansluitingen",
    body: "Naden en aansluitingen waren zichtbaar, wat zowel technisch als visueel aandacht vroeg.",
  },
  {
    title: "Wens voor strakkere gevel en duurzame basis",
    body: "De bewoners wilden een strakker gevelbeeld en een betere basis voor langdurige bescherming van de buitengevel.",
  },
]

const resultaten = [
  {
    title: "Egaal en strak afgewerkt gevelvlak",
    body: "Na voorbehandeling, uitvlakking en afwerking met sierpleister 1,5 mm is een egaal en rustig gevelvlak gerealiseerd.",
  },
  {
    title: "Verbeterde detaillering van openingen en hoeken",
    body: "De toepassing van hoekprofielen op openingen en kolomhoeken zorgt voor nette aansluitingen en een verzorgde afwerking.",
  },
  {
    title: "Vernieuwde gevelopbouw met betere bescherming",
    body: "Door herstel van naden/aansluitingen, wapeningsnet en nieuwe afwerklagen heeft de gevel een technisch verbeterde opbouw ten opzichte van de oude situatie.",
  },
  {
    title: "Frisse uitstraling in standaard wit",
    body: "De sierpleister 1,5 mm in standaard wit geeft de woning een frisse en nette uitstraling.",
  },
]

const detailCards = [
  {
    title: "Naden en aansluitingen gevuld",
    body: "Aansluitingen en naden zijn voorbereid en gevuld met montageschuim voor gevelopeningen als onderdeel van de opbouw.",
  },
  {
    title: "Wapeningsnet over het gevelvlak",
    body: "Wapeningsnet aangebracht als versterkende laag in de gevelopbouw vóór de afwerking.",
  },
  {
    title: "Hoekprofielen bij openingen en kolomhoeken",
    body: "Hoekprofielen toegepast op raam- en deuropeningen en kolomhoeken voor strakke lijnen en nette details.",
  },
  {
    title: "Uitvlakking met GW-Plus",
    body: "De ondergrond is uitgevlakt met GW-Plus om een egaal oppervlak te creëren voor de sierpleisterafwerking.",
  },
]

const materialen = [
  { label: "Werkoppervlak", value: "Circa 35 m² gevel" },
  { label: "Gevelisolatie", value: "Nieuwe gevelisolatie (dikte niet gespecificeerd)" },
  { label: "Vullen van aansluitingen", value: "Montageschuim voor gevelopeningen" },
  { label: "Wapening", value: "Wapeningsnet" },
  { label: "Profielen", value: "Hoekprofielen voor raam- en deuropeningen en kolomhoeken" },
  { label: "Uitvlaklaag", value: "GW-Plus" },
  { label: "Sierpleister", value: "1,5 mm – standaard wit" },
]

const relatedLinks = [
  { label: "Gevelisolatie", href: "/gevelisolatie/" },
  { label: "Sierpleister", href: "/sierpleister/" },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AlmereGevelisolatieProjectPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── A · HERO ─────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden min-h-[80vh] lg:min-h-[65vh]">

        <img
          src="/images/projects/almere-gevelisolatie-35m2-na-01.webp"
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
            <ol className="flex flex-wrap items-center gap-1.5 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
              <li>
                <Link href="/" className="transition-colors hover:text-white">Home</Link>
              </li>
              <li aria-hidden><ChevronRight className="h-3.5 w-3.5" /></li>
              <li>
                <Link href="/onze-werken/" className="transition-colors hover:text-white">Onze werken</Link>
              </li>
              <li aria-hidden><ChevronRight className="h-3.5 w-3.5" /></li>
              <li className="font-medium text-white" aria-current="page">Almere (2024–2025)</li>
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
            Almere: gevelisolatie (ca. 35 m²) &amp; sierpleister 1,5 mm (2024–2025)
          </h1>

          <p className="mt-4 text-lg leading-relaxed max-w-2xl" style={{ color: "rgba(255,255,255,0.78)" }}>
            Gevelrenovatie van een woning in Almere met circa 35 m² gevelisolatie, wapeningsnet, hoekprofielen, uitvlakking met GW-Plus en sierpleister 1,5 mm in standaard wit.
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
            <span className="font-medium text-white">Almere</span>
            <span aria-hidden>·</span>
            <span>woning</span>
            <span aria-hidden>·</span>
            <span>gevelisolatie</span>
            <span aria-hidden>·</span>
            <span>wapeningsnet</span>
            <span aria-hidden>·</span>
            <span>GW-Plus</span>
            <span aria-hidden>·</span>
            <span>sierpleister 1,5 mm</span>
            <span aria-hidden>·</span>
            <span>2024–2025</span>
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
            Van opname en voorbehandeling tot wapeningsnet, GW-Plus en sierpleister 1,5 mm in standaard wit.
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
            Een egaal en strak afgewerkt gevelvlak in standaard wit.
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

    </div>
  )
}

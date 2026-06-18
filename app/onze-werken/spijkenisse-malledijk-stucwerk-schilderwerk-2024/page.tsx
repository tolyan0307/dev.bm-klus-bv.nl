import { Fragment } from "react"
import Link from "next/link"
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react"
import { buildPageMetadata } from "@/lib/seo/meta"
import { jsonLdScript, projectPageSchema } from "@/lib/seo/schema"
import { SITE } from "@/lib/seo/routes"
import ProjectGalleryCarousel from "@/components/sections/projects/ProjectGalleryCarousel"
import WerkzaamhedenAccordion from "@/components/sections/projects/WerkzaamhedenAccordion"
import ResponsiveImage from "@/components/responsive-image"
import { beforeImages, afterImages } from "@/lib/content/projects/spijkenisse-malledijk-stucwerk-schilderwerk-2024"
import { resolveGalleryImages } from "@/lib/gallery-utils"

// ─── SEO ──────────────────────────────────────────────────────────────────────
export const metadata = buildPageMetadata(
  "/onze-werken/spijkenisse-malledijk-stucwerk-schilderwerk-2024/",
  {
    title: "Spijkenisse stuc- en schilderwerk – 2024",
    description:
      "Project in Spijkenisse (Malledijk): renovatie van binnenwanden met stucwerk, extra plamuur en schilderafwerking in RAL 9001.",
  },
)

// ─── Data ─────────────────────────────────────────────────────────────────────
const heroBullets = [
  "Voorbereiding van binnenwanden met verwijdering van oud gips en gipsplaten",
  "Stoplaag van ca. 4–5 mm en extra plamuur in twee lagen voor een glad oppervlak",
  "Schilderafwerking in RAL 9001 met nette profielafwerking rond openingen en hoeken",
]

const werkzaamheden = [
  {
    title: "Steigers plaatsen en oude lagen verwijderen",
    body: "Voor de uitvoering zijn steigers geplaatst en is verouderd of loszittend gips plaatselijk verwijderd. Waar nodig zijn ook gipsplaten gedemonteerd om de ondergrond goed te kunnen herstellen.",
  },
  {
    title: "Wanden voorbereiden en beschermingsmaatregelen treffen",
    body: "De wanden zijn schoongemaakt en voorbereid voor de verdere afwerking. Tegelijk zijn ramen, deuren, plinten en vloeren beschermd met folie om netjes en gecontroleerd te kunnen werken.",
  },
  {
    title: "Profielen rond openingen en wandhoeken aanbrengen",
    body: "Rond ramen en deuren zijn stopprofielen geplaatst en op de wandhoeken zijn hoekprofielen aangebracht voor strakke lijnen en een nette afwerking van de binnenwanden.",
  },
  {
    title: "Stoplaag en extra plamuur aanbrengen",
    body: "De wanden zijn voorzien van een stoplaag van circa 4–5 mm en daarna met twee extra plamuur lagen uitgevlakt om een glad en egaal oppervlak te creëren.",
  },
  {
    title: "Schilderafwerking in RAL 9001",
    body: "Na het uitvlakken zijn de binnenwanden geschilderd in kleur RAL 9001 als frisse en verzorgde eindafwerking van de ruimtes.",
  },
]

const detailCards = [
  {
    title: "Voorbehandeling en afscherming van de ruimtes",
    body: "Ramen, deuren, plinten en vloeren zijn beschermd met folie, terwijl de wanden zijn gereinigd en voorbereid voor de verdere opbouw.",
  },
  {
    title: "Profielen rond openingen en hoeken",
    body: "Stopprofielen bij ramen en deuren en hoekprofielen op wandhoeken zorgen voor strakke lijnen en een nette afwerking van de binnenwanden.",
  },
  {
    title: "Stoplaag en extra plamuur",
    body: "Een stoplaag van circa 4–5 mm en twee extra plamuur lagen zijn toegepast om de wanden glad en egaal af te werken.",
  },
  {
    title: "Schilderwerk in RAL 9001",
    body: "De geschilderde eindlaag in RAL 9001 geeft de gerenoveerde wanden een frisse en verzorgde uitstraling.",
  },
]

const materialen = [
  { label: "Basiswerkzaamheden", value: "Gedeeltelijke verwijdering van oud gips en gipsplaten" },
  { label: "Bescherming", value: "Beschermfolie voor ramen, deuren, plinten en vloeren" },
  { label: "Profielen", value: "Stopprofielen bij ramen/deuren + hoekprofielen op wandhoeken" },
  { label: "Uitvlaklaag", value: "Stoplaag ca. 4–5 mm" },
  { label: "Afwerking", value: "Extra plamuur in 2 lagen" },
  { label: "Schilderwerk", value: "Muurschildering in kleur RAL 9001" },
  { label: "Materialen", value: "Strokolith" },
]

const bevindingen = [
  {
    title: "Verouderde of beschadigde afwerklagen",
    body: "De bestaande binnenwanden hadden zones met verouderd gips en afwerklagen die eerst gedeeltelijk verwijderd moesten worden om een goede nieuwe opbouw mogelijk te maken.",
  },
  {
    title: "Wanden vroegen om uitvlakking en nette detaillering",
    body: "Voor een strak eindresultaat was het nodig om de wanden opnieuw vlak te zetten en de randen rond ramen, deuren en wandhoeken zorgvuldig af te werken.",
  },
  {
    title: "Bescherming van omliggende onderdelen noodzakelijk",
    body: "Omdat het om renovatiewerk in een woning ging, moesten ramen, deuren, plinten en vloeren vooraf goed worden afgedekt om de afwerking schoon en gecontroleerd uit te voeren.",
  },
]

const resultaten = [
  {
    title: "Strak en glad afgewerkte binnenwanden",
    body: "Dankzij de stoplaag en twee extra plamuur lagen zijn de wanden egaal en glad afgewerkt, klaar voor een verzorgde schilderlaag.",
  },
  {
    title: "Nette details rond ramen, deuren en hoeken",
    body: "Met stopprofielen en hoekprofielen sluiten de binnenwanden strak aan op de openingen en wandhoeken, wat zorgt voor een verzorgde uitstraling.",
  },
  {
    title: "Frisse schilderafwerking in RAL 9001",
    body: "De eindafwerking in RAL 9001 geeft de ruimtes een lichte en frisse uitstraling, passend bij een opgeknapte en strak afgewerkte woning.",
  },
]

const relatedLinks = [
  { label: "Muren stucen", href: "/muren-stucen/" },
  { label: "Buiten stucwerk", href: "/buiten-stucwerk/" },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SpijkenisseProjectPage() {
  return (
    <>
      {projectPageSchema({
        title: "Spijkenisse stuc- en schilderwerk – 2024",
        description:
          "Project in Spijkenisse (Malledijk): renovatie van binnenwanden met stucwerk, extra plamuur en schilderafwerking in RAL 9001.",
        url: `${SITE.canonicalBase}/onze-werken/spijkenisse-malledijk-stucwerk-schilderwerk-2024/`,
        image: "/images/projects/spijkenisse-malledijk-stucwerk-schilderwerk-2024/spijkenisse-malledijk-stucwerk-schilderwerk-2024-na-01.webp",
        city: "Spijkenisse",
        year: 2024,
        serviceTypes: ["Muren stucen"],
      }).map((s, i) => (
        <Fragment key={i}>{jsonLdScript(s)}</Fragment>
      ))}
      <div className="min-h-screen bg-background">

      {/* ── A · HERO ─────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden min-h-[80vh] lg:min-h-[65vh]">

        <ResponsiveImage
          baseName="spijkenisse-malledijk-stucwerk-schilderwerk-2024-na-01"
          dir="/images/projects/spijkenisse-malledijk-stucwerk-schilderwerk-2024"
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
                Spijkenisse (2024)
              </li>
            </ol>
          </nav>

          <div className="pb-16 sm:pb-20 lg:pb-24">
          <div className="mb-5">
            <span
              className="inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white"
              style={{ background: "rgba(232,96,10,0.90)", border: "1px solid rgba(232,96,10,0.60)" }}
            >
              Muren stucen
            </span>
          </div>

          <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl max-w-3xl">
            Spijkenisse Malledijk – stucwerk &amp; schilderwerk binnenwanden (2024)
          </h1>

          <p className="mt-4 text-lg leading-relaxed max-w-2xl" style={{ color: "rgba(255,255,255,0.78)" }}>
            Voor deze woning aan de Malledijk in Spijkenisse zijn de binnenwanden voorbereid, hersteld en opnieuw afgewerkt. De werkzaamheden bestonden uit gedeeltelijke verwijdering van oud gips en gipsplaten, het reinigen en voorbereiden van de wanden, het aanbrengen van profielen rond openingen en hoeken, een stoplaag van circa 4–5 mm, extra plamuur in twee lagen en een schilderafwerking in kleur RAL 9001. Bij het project zijn materialen van Strokolith toegepast.
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
            <span className="font-medium text-white">Spijkenisse (Malledijk)</span>
            <span aria-hidden>·</span>
            <span>woning</span>
            <span aria-hidden>·</span>
            <span>binnenwanden</span>
            <span aria-hidden>·</span>
            <span>stucwerk</span>
            <span aria-hidden>·</span>
            <span>schilderwerk</span>
            <span aria-hidden>·</span>
            <span>RAL 9001</span>
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
            De werkzaamheden bestonden uit het voorbereiden en herstellen van de binnenwanden, gevolgd door een nieuwe stuk- en schilderafwerking met aandacht voor strakke details.
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
            Voor de renovatie vroegen de binnenwanden om herstel, uitvlakking en een nieuwe afwerking, met extra aandacht voor oude gipslagen, openingen en de bescherming van omliggende onderdelen.
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
            Na de werken zijn de binnenwanden opnieuw opgebouwd, uitgevlakt en geschilderd, met een glad eindresultaat en nette aansluitingen rond de verschillende details.
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
            Vier onderdelen laten zien waar de kwaliteit van dit project in zit: goede voorbereiding, strakke profielafwerking, zorgvuldig uitvlakken en een nette schilderlaag als eindresultaat.
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
            Overzicht van de belangrijkste materialen en afwerkingsonderdelen die in deze renovatie van de binnenwanden zijn toegepast.
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

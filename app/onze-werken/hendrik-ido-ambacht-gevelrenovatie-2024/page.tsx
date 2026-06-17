import { Fragment } from "react"
import Link from "next/link"
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react"
import { buildPageMetadata } from "@/lib/seo/meta"
import { jsonLdScript, projectPageSchema } from "@/lib/seo/schema"
import { SITE } from "@/lib/seo/routes"
import ProjectGalleryCarousel from "@/components/sections/projects/ProjectGalleryCarousel"
import WerkzaamhedenAccordion from "@/components/sections/projects/WerkzaamhedenAccordion"
import ResponsiveImage from "@/components/responsive-image"
import { beforeImages, afterImages } from "@/lib/content/projects/hendrik-ido-ambacht-gevelrenovatie-2024"
import { resolveGalleryImages } from "@/lib/gallery-utils"

// ─── SEO ──────────────────────────────────────────────────────────────────────
export const metadata = buildPageMetadata(
  "/onze-werken/hendrik-ido-ambacht-gevelrenovatie-2024/",
  {
    title: "Hendrik-Ido-Ambacht gevelrenovatie 2024",
    description:
      "Project in Hendrik-Ido-Ambacht: complete gevelrenovatie met buitenstucwerk, schilderwerk, bitumen plintbescherming en renovatie van houten geveldelen.",
  },
)

// ─── Data ─────────────────────────────────────────────────────────────────────
const heroBullets = [
  "Voorbereidende plint- en grondwerken met vochtbescherming door bitumen",
  "Herstel van buitenstucwerk, scheuren en gevelvlakken met schilderafwerking",
  "Renovatie van houten delen, dakrand, balkonafwerking en centrale entree",
]

const werkzaamheden = [
  {
    title: "Voorbereidende werken rond plint en maaiveld",
    body: "De grond is vrijgemaakt van stenen, plaatselijk opengegraven rondom de gevel en straatstenen zijn deels gedemonteerd om de plintzone goed bereikbaar te maken. Ook bestaand kelder-/plintpleisterwerk is verwijderd waar nodig.",
  },
  {
    title: "Waterdicht maken van de onderzijde van de gevel",
    body: "Het onderste niveau van de plint is behandeld voor vochtbescherming en voorzien van een bitumenlaag als extra bescherming tegen opspattend water en vochtbelasting.",
  },
  {
    title: "Herstel en afwerking van sokkel en gevelvlakken",
    body: "De sokkel is opnieuw gestuct, wanden zijn voorbereid en bijgewerkt voor schilderwerk en kunststof hoekprofielen zijn aangebracht op de hoeken voor een nette en sterke afwerking.",
  },
  {
    title: "Buitenstucwerk en schilderwerk aan de gevel",
    body: "Oud pleisterwerk is verwijderd waar nodig, gevelvlakken zijn geschuurd en opnieuw afgewerkt. Daarna zijn de gevel en sokkel voorbereid voor schilderwerk en in de juiste kleur afgewerkt.",
  },
  {
    title: "Behandeling van scheuren en detaillering",
    body: "Grotere scheuren zijn behandeld met een tweecomponentenmengsel en aanvullende scheurbehandeling. De bovenzijde van het balkon is afgewerkt met siliconen/acryl voor een nette en beschermde aansluiting.",
  },
  {
    title: "Renovatie van houten delen en entree",
    body: "Houten oppervlakken zoals ramen, deuren en andere geveldelen zijn geschuurd, gereinigd, geprimerd in RAL 9002 en gelakt in RAL 9002. De centrale ingang/deuren zijn geschilderd in RAL 7030 en houten elementen aan de middenpoort zijn verwijderd en opnieuw aangebracht waar nodig.",
  },
]

const bevindingen = [
  {
    title: "Verouderde en plaatselijk beschadigde gevelafwerking",
    body: "De bestaande gevel had zones met verouderd of los pleisterwerk en delen die opnieuw moesten worden opgebouwd voor een nette en duurzame afwerking.",
  },
  {
    title: "Kwetsbare plintzone met behoefte aan vochtbescherming",
    body: "De onderzijde van de gevel vroeg om extra bescherming tegen vocht en vervuiling, onder meer door de overgang tussen gevel en maaiveld.",
  },
  {
    title: "Scheuren en verouderde details",
    body: "Er waren grotere scheuren aanwezig en ook details zoals houten delen, dakrandzones, entree en aansluitingen vroegen om renovatie en opfrissing.",
  },
]

const resultaten = [
  {
    title: "Vernieuwde en strak afgewerkte gevel",
    body: "De woning heeft een vernieuwde buitenafwerking gekregen met hersteld stucwerk, nette schilderafwerking en duidelijk verzorgde gevelvlakken.",
  },
  {
    title: "Beter beschermde plint en onderzijde",
    body: "Dankzij bitumenbehandeling en vernieuwde plintafwerking is de onderzijde van de gevel beter beschermd en visueel netter afgewerkt.",
  },
  {
    title: "Opgefriste houten onderdelen en entree",
    body: "Ramen, deuren, houten geveldelen en de centrale ingang zijn opnieuw geschilderd en verzorgd afgewerkt, waardoor de hele woning een frissere uitstraling heeft gekregen.",
  },
]

const detailCards = [
  {
    title: "Bitumenbehandeling van de plint",
    body: "De onderzijde van de gevel is waterdicht gemaakt en behandeld met bitumen als extra bescherming tegen vochtbelasting.",
  },
  {
    title: "Herstel van sokkel en buitenstucwerk",
    body: "Sokkel en gevelvlakken zijn opnieuw opgebouwd en afgewerkt als basis voor een strak eindresultaat.",
  },
  {
    title: "Scheurherstel en beschermende detailafwerking",
    body: "Grotere scheuren zijn behandeld met een tweecomponentenmengsel en aanvullende scheurbehandeling, terwijl kritieke aansluitingen zijn afgewerkt met siliconen/acryl.",
  },
  {
    title: "Houten delen, dakrand en entree geschilderd",
    body: "Houten oppervlakken en de centrale ingang zijn geschuurd, gegrond en afgelakt in zorgvuldig gekozen RAL-kleuren voor een nette en duurzame uitstraling.",
  },
]

const materialen = [
  { label: "Vochtbescherming", value: "Bitumenbehandeling van de plint" },
  { label: "Stucwerk", value: "Sokkelgips en gevelstucwerk" },
  { label: "Hoekafwerking", value: "Kunststof hoekprofielen" },
  { label: "Scheurherstel", value: "Tweecomponentenmengsel + aanvullende scheurbehandeling" },
  { label: "Primer", value: "RAL 9002 primer" },
  { label: "Lakverf", value: "RAL 9002" },
  { label: "Entree/deuren", value: "Schilderwerk in RAL 7030" },
  { label: "Aansluitingen", value: "Siliconen/acryl bij bovenzijde balkon" },
]

const relatedLinks = [
  { label: "Buiten-stucwerk", href: "/buiten-stucwerk/" },
  { label: "Gevel schilderen", href: "/gevel-schilderen/" },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HendrikIdoAmbachtProjectPage() {
  return (
    <>
      {projectPageSchema({
        title: "Hendrik-Ido-Ambacht gevelrenovatie 2024",
        description:
          "Project in Hendrik-Ido-Ambacht: complete gevelrenovatie met buitenstucwerk, schilderwerk, bitumen plintbescherming en renovatie van houten geveldelen.",
        url: `${SITE.canonicalBase}/onze-werken/hendrik-ido-ambacht-gevelrenovatie-2024/`,
        image: "/images/projects/hendrik-ido-ambacht-gevelrenovatie-2024/hendrik-ido-ambacht-gevelrenovatie-2024-na-01.webp",
        city: "Hendrik-Ido-Ambacht",
        year: 2024,
        serviceTypes: ["Buiten-stucwerk", "Gevel schilderen"],
      }).map((s, i) => (
        <Fragment key={i}>{jsonLdScript(s)}</Fragment>
      ))}
      <div className="min-h-screen bg-background">

      {/* ── A · HERO ─────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden min-h-[80vh] lg:min-h-[65vh]">

        <ResponsiveImage
          baseName="hendrik-ido-ambacht-gevelrenovatie-2024-na-01"
          dir="/images/projects/hendrik-ido-ambacht-gevelrenovatie-2024"
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
                Hendrik-Ido-Ambacht (2024)
              </li>
            </ol>
          </nav>

          <div className="pb-16 sm:pb-20 lg:pb-24">
          <div className="mb-5">
            <span
              className="inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white"
              style={{ background: "rgba(232,96,10,0.90)", border: "1px solid rgba(232,96,10,0.60)" }}
            >
              Buiten-stucwerk
            </span>
          </div>

          <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl max-w-3xl">
            Hendrik-Ido-Ambacht – gevelrenovatie, buitenstucwerk &amp; schilderwerk (2024)
          </h1>

          <p className="mt-4 text-lg leading-relaxed max-w-2xl" style={{ color: "rgba(255,255,255,0.78)" }}>
            Voor deze woning in Hendrik-Ido-Ambacht is een uitgebreide gevelrenovatie uitgevoerd. De werkzaamheden bestonden uit voorbereidende plint- en grondwerken, vochtbescherming met bitumen, herstel en vernieuwing van buitenstucwerk, schilderwerk aan gevel en plint, behandeling van scheuren, renovatie van houten onderdelen en afwerking van entree, dakrand en bovenzijde van het balkon.
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
            <span className="font-medium text-white">Hendrik-Ido-Ambacht</span>
            <span aria-hidden>·</span>
            <span>woning</span>
            <span aria-hidden>·</span>
            <span>gevelrenovatie</span>
            <span aria-hidden>·</span>
            <span>buitenstucwerk</span>
            <span aria-hidden>·</span>
            <span>schilderwerk</span>
            <span aria-hidden>·</span>
            <span>bitumen plint</span>
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
            De werkzaamheden bestonden uit een complete aanpak van plint, gevel, houten geveldelen en afwerking, van voorbereidende sloop- en grondwerken tot stucwerk, schilderwerk en detailherstel.
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
            Vóór de renovatie lag de nadruk op herstel van een verouderde buitenafwerking, bescherming van de plintzone en het vernieuwen van verschillende geveldetails en houten onderdelen.
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
            Na de werken toont de woning een verzorgde, technisch verbeterde gevel met een vernieuwde plint, strak schilderwerk en opgefriste details aan houtwerk, entree en aansluitingen.
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
            Vier onderdelen maken dit project technisch en visueel compleet: de beschermde plint, het herstelde stucwerk, de scheurbehandeling en de renovatie van houtwerk en entree.
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
            Overzicht van de belangrijkste materialen en afwerkingen die in deze gevelrenovatie zijn toegepast.
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

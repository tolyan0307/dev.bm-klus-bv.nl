import { Fragment } from "react"
import Link from "next/link"
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react"
import { buildPageMetadata } from "@/lib/seo/meta"
import { jsonLdScript, projectPageSchema } from "@/lib/seo/schema"
import { SITE } from "@/lib/seo/routes"
import ProjectGalleryCarousel from "@/components/sections/projects/ProjectGalleryCarousel"
import WerkzaamhedenAccordion from "@/components/sections/projects/WerkzaamhedenAccordion"
import ResponsiveImage from "@/components/responsive-image"
import { beforeImages, afterImages } from "@/lib/content/projects/stellendam-molenkade-gevelrenovatie-stucwerk-2026"
import { resolveGalleryImages } from "@/lib/gallery-utils"
import { getFallbackSrc } from "@/lib/responsive-image"

// ─── SEO ──────────────────────────────────────────────────────────────────────
export const metadata = buildPageMetadata(
  "/onze-werken/stellendam-molenkade-gevelrenovatie-stucwerk-2026/",
  {
    title: "Stellendam Molenkade gevelrenovatie – 2026",
    description:
      "Gevelrenovatie aan de Molenkade in Stellendam: scheurankers, MKS-Rapid stucwerk, marmeren raamdorpels, geometrische gevelornamenten en plintschilderwerk.",
  },
)

// ─── Data ─────────────────────────────────────────────────────────────────────
const heroBullets = [
  "Oud stucwerk verwijderd en grote scheuren versterkt met stalen ankers",
  "Twee lagen MKS-Rapid van Strikolith met een gladde eindafwerking",
  "Marmeren raamdorpels, geometrische gevelornamenten en een geschilderde plint",
]

const werkzaamheden = [
  {
    title: "Oud stucwerk tot op het metselwerk verwijderen",
    body: "De bestaande pleisterlaag is verwijderd zodat het onderliggende metselwerk bereikbaar werd voor herstel en de nieuwe stucopbouw.",
  },
  {
    title: "Grote scheuren met stalen ankers versterken",
    body: "In de grote scheuren zijn stalen ankers aangebracht ter versterking van de gevelwanden, voordat de nieuwe pleisterlagen werden aangebracht.",
  },
  {
    title: "Raamdorpels vervangen door marmeren exemplaren",
    body: "De oude vensterbanken zijn gedemonteerd en vervangen door nieuwe marmeren raamdorpels, passend bij de vernieuwde gevelafwerking.",
  },
  {
    title: "Profielen rond ramen, deuren en hoeken monteren",
    body: "Aan de dagkanten van ramen en deuren en op de buitenhoeken van de woning zijn profielen gemonteerd voor rechte randen in het nieuwe stucwerk.",
  },
  {
    title: "MKS-Rapid in twee lagen aanbrengen",
    body: "De gevelwanden zijn gestuct met cementgebonden MKS-Rapid pleister van Strikolith. De eerste laag is met een getande spaan bewerkt voor hechting van de volgende laag. De tweede laag is glad afgewerkt.",
  },
  {
    title: "Geometrische gevelornamenten plaatsen",
    body: "Boven de ramen en deuren zijn decoratieve elementen in geometrische vormen aangebracht. Deze geven de openingen een eigen accent binnen de nieuwe gevelafwerking.",
  },
  {
    title: "De plint schilderen",
    body: "De plint langs de onderzijde van de gevel is geschilderd en vormt een donkere begrenzing onder het lichte pleisterwerk.",
  },
]

const detailCards = [
  {
    title: "Stalen scheurankers",
    body: "Grote scheuren zijn voorzien van stalen ankers als onderdeel van het herstel van de gevelwanden.",
  },
  {
    title: "Een getande eerste laag en gladde tweede laag",
    body: "MKS-Rapid van Strikolith is in twee lagen verwerkt. De eerste laag is met een getande spaan bewerkt en de tweede laag glad afgewerkt.",
  },
  {
    title: "Marmeren raamdorpels en profielafwerking",
    body: "De oude vensterbanken zijn vervangen door marmeren exemplaren. Profielen geven de dagkanten en buitenhoeken een rechte afwerking.",
  },
  {
    title: "Geometrische ornamenten boven openingen",
    body: "Decoratieve vormelementen boven ramen en deuren brengen reliëf en ritme in de gevel. De geometrische vormgeving is een afzonderlijk onderdeel van dit project.",
  },
]

const materialen = [
  { label: "Gevelpleister", value: "Cementgebonden MKS-Rapid van Strikolith, aangebracht in twee lagen" },
  { label: "Scheurherstel", value: "Stalen ankers ter versterking van grote scheuren" },
  { label: "Raamdorpels", value: "Nieuwe marmeren vensterbanken" },
  { label: "Profielen", value: "Profielen voor dagkanten van ramen en deuren en buitenhoeken" },
  { label: "Decoratie", value: "Geometrische gevelornamenten boven ramen en deuren" },
  { label: "Plintafwerking", value: "Verf voor de plint, donker afgewerkt" },
]

const bevindingen = [
  {
    title: "Bestaande pleisterlaag moest worden verwijderd",
    body: "De oude gevelafwerking was plaatselijk beschadigd en is tot op het metselwerk verwijderd. De voorfoto's laten zowel deze beginsituatie als de demontage zien.",
  },
  {
    title: "Grote scheuren in de gevelwanden",
    body: "De gevelwanden vertoonden grote scheuren waarvoor versterking met stalen ankers is uitgevoerd.",
  },
  {
    title: "Raamdorpels en aansluitingen te vernieuwen",
    body: "De bestaande vensterbanken zijn meegenomen in de renovatie. Ook de dagkanten en gevelhoeken zijn voorbereid op een nieuwe, rechte profielafwerking.",
  },
]

const resultaten = [
  {
    title: "Herstelde ondergrond met nieuwe pleisteropbouw",
    body: "Na het verwijderen van de oude afwerking en het aanbrengen van de scheurankers zijn de gevelwanden opnieuw gestuct in twee lagen.",
  },
  {
    title: "Gladde, lichte gevelvlakken",
    body: "De glad afgewerkte tweede laag geeft de verschillende gevelvlakken een rustig en samenhangend uiterlijk.",
  },
  {
    title: "Nieuwe marmeren raamdorpels en rechte randen",
    body: "De nieuwe marmeren raamdorpels en profielafwerking zorgen voor verzorgde aansluitingen bij de ramen, deuren en buitenhoeken.",
  },
  {
    title: "Decoratieve accenten en een donkere plint",
    body: "De geometrische ornamenten boven ramen en deuren geven de gevel een herkenbaar detail. De geschilderde plint vormt een contrasterende onderzijde.",
  },
]

const relatedLinks = [
  { label: "Buiten-stucwerk", href: "/buiten-stucwerk/" },
  { label: "Gevel schilderen", href: "/gevel-schilderen/" },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function StellendamMolenkadeProjectPage() {
  return (
    <>
      {projectPageSchema({
        title: "Stellendam Molenkade gevelrenovatie – 2026",
        description:
          "Gevelrenovatie aan de Molenkade in Stellendam: scheurankers, MKS-Rapid stucwerk, marmeren raamdorpels, geometrische gevelornamenten en plintschilderwerk.",
        url: `${SITE.canonicalBase}/onze-werken/stellendam-molenkade-gevelrenovatie-stucwerk-2026/`,
        image: getFallbackSrc("stellendam-molenkade-gevelrenovatie-stucwerk-2026-na-01", "/images/projects/stellendam-molenkade-gevelrenovatie-stucwerk-2026", "hero"),
        city: "Stellendam (Molenkade)",
        year: 2026,
        serviceTypes: ["Buiten-stucwerk", "Gevel schilderen"],
      }).map((s, i) => (
        <Fragment key={i}>{jsonLdScript(s)}</Fragment>
      ))}
      <div className="min-h-screen bg-background">

      {/* ── A · HERO ─────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden min-h-[80vh] lg:min-h-[65vh]">

        {/* Background image */}
      <ResponsiveImage
        baseName="stellendam-molenkade-gevelrenovatie-stucwerk-2026-na-01"
        dir="/images/projects/stellendam-molenkade-gevelrenovatie-stucwerk-2026"
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
                Stellendam (2026)
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
              Buiten-stucwerk
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl max-w-3xl">
            Stellendam Molenkade: gevelherstel, stucwerk &amp; gevelornamenten (2026)
          </h1>

          {/* Subheading */}
          <p className="mt-4 text-lg leading-relaxed max-w-2xl" style={{ color: "rgba(255,255,255,0.78)" }}>
            Bij deze woning aan de Molenkade in Stellendam is het oude stucwerk verwijderd tot op het metselwerk. Grote scheuren zijn voorzien van stalen ankers ter versterking van de gevelwanden. De gevels zijn opnieuw gestuct met MKS-Rapid van Strikolith in twee lagen: een eerste laag met een getande spaan en een glad afgewerkte tweede laag. Nieuwe marmeren raamdorpels, profielen rond de openingen, geometrische ornamenten boven ramen en deuren en een geschilderde plint maken de gevelrenovatie compleet.
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
            <span className="font-medium text-white">Stellendam (Molenkade)</span>
            <span aria-hidden>·</span>
            <span>woning</span>
            <span aria-hidden>·</span>
            <span>scheurherstel met stalen ankers</span>
            <span aria-hidden>·</span>
            <span>MKS-Rapid Strikolith</span>
            <span aria-hidden>·</span>
            <span>marmeren raamdorpels</span>
            <span aria-hidden>·</span>
            <span>geometrische gevelornamenten</span>
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
            Van het verwijderen van het oude stucwerk en het verankeren van scheuren tot de nieuwe pleisterlagen, raamdorpels, ornamenten en plintafwerking.
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
            De reeks toont de bestaande gevel, het verwijderen van oud stucwerk en de opeenvolgende werkfasen tot en met de pleisterlagen en het aanbrengen van de ornamenten.
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
            De nafoto's tonen het vernieuwde gevelbeeld, de geometrische ornamenten en de geschilderde plint vanuit verschillende posities. Enkele foto's laten de afwerking zien terwijl er nog afdekmateriaal of werkmaterieel aanwezig is.
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
            Naast het herstel en het gladde stucwerk bepalen de marmeren raamdorpels, rechte profielen en geometrische gevelornamenten de uitstraling van de woning.
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
            De belangrijkste opgegeven materialen en afwerkingsonderdelen voor het gevelherstel, de nieuwe pleisterlagen en de decoratieve details.
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

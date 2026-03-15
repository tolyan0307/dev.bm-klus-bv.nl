import Link from "next/link"
import { Fragment } from "react"
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react"
import { jsonLdScript, projectPageSchema } from "@/lib/seo/schema"
import { SITE } from "@/lib/seo/routes"
import { buildPageMetadata } from "@/lib/seo/meta"
import ProjectGalleryCarousel from "@/components/sections/projects/ProjectGalleryCarousel"
import WerkzaamhedenAccordion from "@/components/sections/projects/WerkzaamhedenAccordion"
import ResponsiveImage from "@/components/responsive-image"
import { beforeImages, afterImages } from "@/lib/content/projects/rotterdam-buitenstucwerk-cementpleister-2025"

// ─── SEO ──────────────────────────────────────────────────────────────────────
export const metadata = buildPageMetadata(
  "/onze-werken/rotterdam-buitenstucwerk-cementpleister-2025/",
  {
    title: "Rotterdam buitenstucwerk cementpleister – project 2025",
    description:
      "Project in Rotterdam: plaatselijk gevelherstel met cementgebonden pleister en wapeningsnet, strak en glad afgewerkt als basis voor verdere afwerking.",
  },
)

// ─── Data ─────────────────────────────────────────────────────────────────────
const heroBullets = [
  "Plaatselijk herstel van beschadigde buitengevelzones",
  "Cementgebonden pleister met wapeningsnet om scheurvorming te helpen beperken",
  "Vlak en glad afgewerkt als basis voor verdere afwerking of schilderwerk",
]

const werkzaamheden = [
  {
    title: "Opname van beschadigde geveldelen",
    body: "We hebben de buitengevel beoordeeld op scheuren, loszittende pleisterlagen en oude reparatieplekken om de herstelzones gericht te bepalen.",
  },
  {
    title: "Plaatselijk kaal zetten van de gevel",
    body: "Beschadigde en loszittende delen van de bestaande pleisterlaag zijn plaatselijk verwijderd tot een geschikte ondergrond voor herstel.",
  },
  {
    title: "Heropbouw met cementgebonden pleister en wapeningsnet",
    body: "De gevel is op de herstelzones opnieuw opgebouwd met cementgebonden pleister, waarin een wapeningsnet is verwerkt als versterking van de opbouw.",
  },
  {
    title: "Vlak en glad afwerken van het gevelvlak",
    body: "Na het herstel is de buitenmuur strak, vlak en glad afgewerkt zodat één rustig gevelvlak ontstaat, klaar voor verdere afwerking of schilderwerk.",
  },
]

const bevindingen = [
  {
    title: "Scheuren en loszittende pleister",
    body: "De bestaande buitengevel vertoonde scheuren en loszittende stukken pleister, waardoor delen van de afwerking niet meer stabiel waren.",
  },
  {
    title: "Verouderde reparaties zichtbaar",
    body: "Op meerdere plaatsen waren oude reparaties zichtbaar, wat zorgde voor een onrustig gevelbeeld en verschillen in afwerking.",
  },
  {
    title: "Risico op verdere vochtbelasting",
    body: "Waar de oude pleisterlaag losliet, kon vocht gemakkelijker inwerken op de gevelconstructie.",
  },
  {
    title: "Wens voor gericht herstel zonder volledige vervanging",
    body: "De bewoners zochten een oplossing waarbij de gevel niet volledig vervangen hoefde te worden, maar wel weer strak en technisch betrouwbaar werd.",
  },
]

const resultaten = [
  {
    title: "Herstelde en technisch verbeterde buitengevel",
    body: "Beschadigde zones zijn plaatselijk hersteld en opnieuw opgebouwd met cementgebonden pleister en wapeningsnet, waardoor de gevel technisch is verbeterd.",
  },
  {
    title: "Rustig en egaal gevelvlak",
    body: "Door het vlak en glad afwerken is één rustig gevelvlak ontstaan met een nettere, uniforme uitstraling.",
  },
  {
    title: "Klaar voor verdere afwerking",
    body: "De gevel is opgeleverd als strakke ondergrond die geschikt is voor een volgende afwerkstap, zoals schilderwerk of een andere passende gevelafwerking.",
  },
]

const detailCards = [
  {
    title: "Plaatselijk herstel in plaats van volledige vervanging",
    body: "Beschadigde zones zijn gericht aangepakt, zodat alleen de noodzakelijke delen van de gevel opnieuw zijn opgebouwd.",
  },
  {
    title: "Cementgebonden pleisteropbouw",
    body: "Herstel uitgevoerd met cementgebonden pleister als stevige basis voor een duurzame buitenafwerking.",
  },
  {
    title: "Wapeningsnet in de herstelzones",
    body: "Wapeningsnet verwerkt in de pleisteropbouw om de herstelzones te versterken en het risico op nieuwe scheurvorming te helpen beperken.",
  },
  {
    title: "Gladde eindafwerking",
    body: "De buitenmuur is strak en glad afgewerkt zodat het gevelvlak rustig oogt en klaar is voor verdere afwerking.",
  },
]

const materialen = [
  { label: "Pleisteropbouw", value: "Cementgebonden pleister" },
  { label: "Wapening", value: "Wapeningsnet in de herstelzones" },
  { label: "Werksoort", value: "Plaatselijk herstel van beschadigde buitengevel" },
]

const relatedLinks = [
  { label: "Buiten-stucwerk", href: "/buiten-stucwerk/" },
  { label: "Gevel schilderen", href: "/gevel-schilderen/" },
  { label: "Sierpleister", href: "/sierpleister/" },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function RotterdamBuitenstucwerkProjectPage() {
  return (
    <>
      {projectPageSchema({
        title: "Rotterdam buitenstucwerk cementpleister – project 2025",
        description:
          "Project in Rotterdam: plaatselijk gevelherstel met cementgebonden pleister en wapeningsnet, strak en glad afgewerkt als basis voor verdere afwerking.",
        url: `${SITE.canonicalBase}/onze-werken/rotterdam-buitenstucwerk-cementpleister-2025/`,
        image: "/images/projects/rotterdam-buitenstucwerk-na-01.webp",
        city: "Rotterdam",
        year: 2025,
        serviceTypes: ["Buiten-stucwerk", "Gevel schilderen", "Sierpleister"],
      }).map((s, i) => (
        <Fragment key={i}>{jsonLdScript(s)}</Fragment>
      ))}
      <div className="min-h-screen bg-background">

      {/* ── A · HERO ─────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden min-h-[80vh] lg:min-h-[65vh]">

  <ResponsiveImage
    baseName="rotterdam-buitenstucwerk-na-01"
    dir="/images/projects"
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
                <Link href="/" className="transition-colors hover:text-white">Home</Link>
              </li>
              <li aria-hidden><ChevronRight className="h-3.5 w-3.5" /></li>
              <li>
                <Link href="/onze-werken/" className="transition-colors hover:text-white">Onze werken</Link>
              </li>
              <li aria-hidden><ChevronRight className="h-3.5 w-3.5" /></li>
              <li className="font-medium text-white" aria-current="page">Rotterdam (2025)</li>
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
            Rotterdam: buitenstucwerk met cementpleister (2025)
          </h1>

          <p className="mt-4 text-lg leading-relaxed max-w-2xl" style={{ color: "rgba(255,255,255,0.78)" }}>
            Plaatselijk herstel van een beschadigde buitengevel met cementgebonden pleister en wapeningsnet,
            strak en glad afgewerkt als basis voor verdere afwerking of schilderwerk.
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
            <span className="font-medium text-white">Rotterdam</span>
            <span aria-hidden>·</span>
            <span>woning</span>
            <span aria-hidden>·</span>
            <span>cementgebonden pleister</span>
            <span aria-hidden>·</span>
            <span>wapeningsnet</span>
            <span aria-hidden>·</span>
            <span>plaatselijk herstel</span>
            <span aria-hidden>·</span>
            <span>2025</span>
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
            Van opname en plaatselijk kaalzetten tot heropbouw met cementpleister en gladde eindafwerking.
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
            Vier aandachtspunten bepaalden de aanpak van het plaatselijk herstel.
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
            Een hersteld en egaal gevelvlak, klaar voor verdere afwerking of schilderwerk.
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
            Vier aspecten van het plaatselijk herstel die de kwaliteit bepalen.
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

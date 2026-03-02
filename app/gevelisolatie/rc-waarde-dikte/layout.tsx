import type { ReactNode } from "react"
import { buildPageMetadata } from "@/lib/seo/meta"
import { SITE } from "@/lib/seo/routes"
import {
  jsonLdScript,
  localBusinessSchema,
  serviceSchema,
  breadcrumbSchema,
} from "@/lib/seo/schema"

export const metadata = buildPageMetadata("/gevelisolatie/rc-waarde-dikte/")

const base = SITE.canonicalBase

const faqItems = [
  {
    vraag: "Is een Rc-waarde van 3,5 m²K/W voldoende voor mijn woning?",
    antwoord:
      "Rc 3,5 is de gangbare drempelwaarde voor energiesubsidies (ISDE/SEEH) en levert al een merkbare besparing op stookkosten.",
  },
  {
    vraag: "Kan de isolatielaag te dik worden?",
    antwoord:
      "Technisch gezien niet, maar er zijn praktische grenzen: langere ankers, aandacht bij dagkanten en soms vergunning.",
  },
  {
    vraag: "Heeft de keuze van de afwerking invloed op de warmte-isolatie?",
    antwoord:
      "De afwerklaag draagt vrijwel niet bij aan de Rc-waarde. De thermische prestatie wordt bepaald door het isolatiemateriaal en de dikte.",
  },
  {
    vraag: "Wat is het verschil in dikte tussen EPS en PIR bij dezelfde Rc?",
    antwoord:
      "PIR heeft een lagere lambda-waarde dan EPS, waardoor u bij dezelfde Rc een dunnere laag nodig heeft.",
  },
  {
    vraag: "Wat is het verschil tussen Rc en Rd?",
    antwoord:
      "Rd is de warmteweerstand van het isolatiemateriaal zelf. Rc is de totale warmteweerstand van de volledige constructie.",
  },
  {
    vraag: "Geldt er een subsidie- of vergunningsvereiste voor een minimale Rc?",
    antwoord:
      "Voor subsidies geldt doorgaans een minimale Rd-waarde. Wij geven bij de offerte aan of uw project in aanmerking komt.",
  },
  {
    vraag: "Waarom varieert de totale opbouwdikte zoveel (10–18 cm)?",
    antwoord:
      "De totale opbouw bestaat uit het isolatiepaneel plus de WDVS-lagen. De isolatiedikte hangt af van de gewenste Rc en het materiaal.",
  },
  {
    vraag: "Kan ik de Rc-waarde achteraf nog verhogen?",
    antwoord:
      "In principe wel, maar het is ingrijpend en financieel gunstiger om direct de gewenste einddikte te bepalen.",
  },
]

export default function RcWaardeDikteLayout({
  children,
}: {
  children: ReactNode
}) {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", item: `${base}/` },
    { name: "Gevelisolatie", item: `${base}/gevelisolatie/` },
    {
      name: "Rc-waarde & dikte",
      item: `${base}/gevelisolatie/rc-waarde-dikte/`,
    },
  ])

  const business = localBusinessSchema()

  const service = serviceSchema({
    name: "Rc-waarde & isolatiedikte — buitengevelisolatie",
    description:
      "Bereken hoeveel buitengevelisolatie u nodig heeft. Rc-waarde, lambda en dikte per materiaal.",
    url: `${base}/gevelisolatie/rc-waarde-dikte/`,
    lowPrice: "110",
    highPrice: "280",
  })

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.vraag,
      acceptedAnswer: { "@type": "Answer", text: item.antwoord },
    })),
  }

  return (
    <>
      {jsonLdScript(breadcrumbs)}
      {jsonLdScript(business)}
      {jsonLdScript(service)}
      {jsonLdScript(faqSchema)}
      {children}
    </>
  )
}

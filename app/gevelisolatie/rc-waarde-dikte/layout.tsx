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
      "Rc 3,5 is de gangbare drempelwaarde voor energiesubsidies (ISDE/SEEH) en levert doorgaans al een merkbare besparing op stookkosten, afhankelijk van uw woning en verwarmingssysteem. Voor oudere woningen met een slechte beginsituatie is Rc 3,5 een uitstekend startpunt. Wilt u het maximale resultaat of voldoen aan nieuwbouwprestaties, dan adviseren wij Rc 4,5 of hoger. Wij bepalen de optimale waarde tijdens de gratis opname op locatie.",
  },
  {
    vraag: "Kan de isolatielaag te dik worden?",
    antwoord:
      "Technisch gezien niet, maar er zijn praktische grenzen. Een dikke laag vraagt om langere bevestigingsankers, aandacht bij dagkanten (uitsprong van kozijnen) en soms een vergunning bij grotere overschrijdingen van de erfgrens. Boven Rc 5,0–6,0 neemt de extra besparing sterk af: u betaalt meer terwijl de return on investment afneemt. De ideale dikte is project- en budgetafhankelijk.",
  },
  {
    vraag: "Heeft de keuze van de afwerking invloed op de warmte-isolatie?",
    antwoord:
      "De afwerklaag (sierpleister, crepi, steenstrips) draagt vrijwel niet bij aan de Rc-waarde — haar dikte is slechts 1,5–15 mm. Wél speelt de kleur een rol in de zomerse warmtebelasting: donkere kleuren absorberen meer zonlicht. Lichte of witte afwerkingen verminderen dit effect. De thermische prestatie wordt vrijwel volledig bepaald door het isolatiemateriaal en de dikte daarvan.",
  },
  {
    vraag: "Wat is het verschil in dikte tussen EPS en PIR bij dezelfde Rc?",
    antwoord:
      "PIR heeft een lagere lambda-waarde (≈ 0,026 W/m·K) dan EPS (≈ 0,038 W/m·K), waardoor u bij dezelfde Rc-waarde een dunnere laag nodig heeft. Concreet: voor Rc 3,5 heeft EPS circa 135 mm nodig, PIR circa 95 mm — een verschil van ±40 mm. Dat maakt PIR aantrekkelijk waar de uitsprong beperkt moet blijven, al zijn de materiaalkosten iets hoger.",
  },
  {
    vraag: "Wat is het verschil tussen Rc en Rd?",
    antwoord:
      "Rd is de warmteweerstand van het isolatiemateriaal zelf (berekend als dikte gedeeld door lambda). Rc is de totale warmteweerstand van de volledige constructie: isolatie plus de aangrenzende lagen (gevel, pleisterwerk, luchtlagen). In de praktijk gaan we bij offerte en vergunning altijd uit van Rc, omdat dat de werkelijke isolatiekwaliteit van de gevelopbouw weergeeft.",
  },
  {
    vraag: "Geldt er een subsidie- of vergunningsvereiste voor een minimale Rc?",
    antwoord:
      "Voor subsidies (zoals ISDE of SEEH) geldt doorgaans een minimale Rd-waarde voor het isolatiepakket. Wij geven bij de offerte aan of uw project in aanmerking komt en welke documentatie vereist is. Een omgevingsvergunning is in de meeste gevallen niet nodig bij isolatie aan de eigen buitengevel, maar afhankelijk van gemeente en monument status kan dit afwijken.",
  },
  {
    vraag: "Waarom varieert de totale opbouwdikte zoveel (10–18 cm)?",
    antwoord:
      "De totale opbouw bestaat uit het isolatiepaneel plus de WDVS-lagen: hechtmortel, glasvlierwapening, primer en afwerklaag (samen ±25–40 mm). De isolatiedikte hangt af van de gewenste Rc en het gekozen materiaal. Bij Rc 3,5 met EPS: ±135 mm isolatie + 35 mm opbouw = ca. 17 cm totaal. Bij Rc 4,5 met PIR: ±120 mm + 30 mm = ca. 15 cm. De bandbreedte van 10–18 cm dekt de meeste woningprojecten.",
  },
  {
    vraag: "Kan ik de Rc-waarde achteraf nog verhogen?",
    antwoord:
      "In principe wel, maar het is ingrijpend: de bestaande WDVS-opbouw moet worden verwijderd of overplakt (overcoating is alleen mogelijk met specifieke systemen en tot beperkte diktes). Het is financieel gunstiger om direct de gewenste einddikte te bepalen. Wij adviseren u tijdens de opname over de toekomstbestendigste keuze, ook rekening houdend met eventuele subsidietrajecten.",
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

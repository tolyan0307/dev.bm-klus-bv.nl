import type { ReactNode } from "react"
import { buildPageMetadata } from "@/lib/seo/meta"
import { SITE } from "@/lib/seo/routes"
import {
  jsonLdScript,
  localBusinessSchema,
  serviceSchema,
  breadcrumbSchema,
} from "@/lib/seo/schema"

export const metadata = buildPageMetadata("/gevelisolatie/materialen/")

const base = SITE.canonicalBase

const faqItems = [
  {
    vraag: "Wat is het verschil tussen EPS en PIR voor gevelisolatie?",
    antwoord:
      "EPS (geëxpandeerd polystyreen) heeft een lambdawaarde van circa 0,031–0,038 W/(m·K) en is dampbeperkt. PIR heeft een lagere lambda (0,022–0,028), waardoor bij dezelfde RC-waarde een dunnere plaat volstaat. PIR is volledig dampdicht. EPS is de meest toegepaste en prijstechnisch meest aantrekkelijke keuze; PIR past beter wanneer ruimte schaars is.",
  },
  {
    vraag: "Wat betekent dampopenheid en waarom is dat belangrijk?",
    antwoord:
      "Dampopenheid geeft aan in hoeverre waterdamp door het materiaal kan diffunderen. Bij een dampopen gevel (bijvoorbeeld minerale wol) kan vocht dat in de constructie terechtkomt makkelijker naar buiten ontwijken. EPS is beperkt dampopen en PIR is volledig dampdicht. Voor gevels met bestaande vochtproblemen of houtskeletbouw is een dampopen oplossing (minerale wol) vaak de veiligste keuze.",
  },
  {
    vraag: "Is minerale wol veiliger bij brand dan EPS of PIR?",
    antwoord:
      "Ja. Minerale wol heeft brandklasse A1 (onbrandbaar). EPS valt in klasse E of B-s1,d0 en PIR in klasse B-s1,d0. Bij appartementencomplexen of panden met hoge brandveiligheidseisen schrijven verzekeraars of overheden soms klasse A1 voor.",
  },
  {
    vraag: "Welke dikte heb ik nodig voor RC 3,5 of RC 5?",
    antwoord:
      "De benodigde dikte verschilt per materiaal. Als indicatie: voor RC 3,5 m²K/W heeft u met EPS circa 12–13 cm nodig, met PIR circa 9 cm en met minerale wol circa 13–14 cm. Voor RC 5 komen die diktes op circa 18, 12 en 19 cm respectievelijk.",
  },
  {
    vraag: "Zijn steenstrips geschikt op alle drie de materialen?",
    antwoord:
      "Steenstrips zijn relatief zwaar. EPS in een hogere dichtheid en minerale wol worden het meest toegepast voor steenstrips-ETICS. PIR is minder gebruikelijk in combinatie met steenstrips. Wij berekenen de draagkracht per situatie.",
  },
  {
    vraag: "Hoe lang gaan EPS, PIR en minerale wol mee?",
    antwoord:
      "Bij correct aangebrachte ETICS met een goed onderhouden afwerklaag is de technische levensduur van alle drie de materialen minimaal 25–40 jaar.",
  },
  {
    vraag: "Wat is de invloed van het materiaal op de totale prijs?",
    antwoord:
      "EPS is doorgaans het goedkoopste isolatiemateriaal; minerale wol en PIR zijn duurder in aanschaf. Bij PIR kan een dunnere plaat het prijsverschil gedeeltelijk compenseren.",
  },
  {
    vraag: "Mag ik zelf het materiaal kiezen?",
    antwoord:
      "In overleg absoluut. Wij adviseren op basis van uw gevel, uw wensen (RC-doel, budget, brandklasse, dampopenheid) en de specifieke projectsituatie.",
  },
]

export default function MaterialenLayout({
  children,
}: {
  children: ReactNode
}) {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", item: `${base}/` },
    { name: "Gevelisolatie", item: `${base}/gevelisolatie/` },
    { name: "Materialen", item: `${base}/gevelisolatie/materialen/` },
  ])

  const business = localBusinessSchema()

  const service = serviceSchema({
    name: "Gevelisolatie materialen – EPS, PIR & minerale wol",
    description:
      "Vergelijk isolatieplaten voor ETICS: EPS, PIR en minerale wol. Diktes, brandklasse, dampopenheid en afwerking.",
    url: `${base}/gevelisolatie/materialen/`,
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

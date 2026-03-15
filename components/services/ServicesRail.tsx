import { buildSrcSet, getFallbackSrc } from "@/lib/responsive-image"
import ServicesRailInteractive, { type ServiceItem } from "./ServicesRailInteractive"

/* ─── Static service data (baseName resolved server-side) ─────────────────── */

const SERVICES_DATA = [
  {
    id: "01",
    label: "ENERGIEBESPARING & COMFORT",
    title: "Buitengevelisolatie (ETICS)",
    subtitle: "Energiezuinige gevel + nieuwe uitstraling",
    href: "/gevelisolatie/",
    baseName: "dienst-isolatie",
    badge: "Meest gekozen" as string | undefined,
    chips: ["Energie-label", "Comfort", "Nette details"] as [string, string, string],
    outcomeKey: "energie" as const,
    previewText:
      "Combineert gevelisolatie met een duurzame afwerking. Verlaagt stookkosten en verbetert uw energie-label in één project.",
    keuzehulpText:
      "Kies ETICS als u structureel wilt besparen op energie. Let op: de prijs hangt af van de afwerking en detaillering (dagkanten, plint). Na een gratis opname ontvangt u een heldere offerte per m².",
  },
  {
    id: "02",
    label: "BESCHERMING & UITSTRALING",
    title: "Gevel schilderen",
    subtitle: "Beschermt en verfrist uw gevel",
    href: "/gevel-schilderen/",
    baseName: "dienst-schilderen",
    badge: undefined,
    chips: ["Duurzame verf", "Reparaties", "Strakke afwerking"] as [string, string, string],
    outcomeKey: "beschermen" as const,
    previewText:
      "Beschermt de gevel tegen vocht en veroudering. Ideaal wanneer de constructie goed is maar de uitstraling een opfrisbeurt vraagt.",
    keuzehulpText:
      "Goede keuze als de gevel structureel intact is. Kleine scheurtjes worden vooraf gerepareerd. Prijs hangt af van oppervlak en staat van de huidige afwerking.",
  },
  {
    id: "03",
    label: "STRAKKE GEVELAFWERKING",
    title: "Buiten stucwerk",
    subtitle: "Gevel stucen voor een strak resultaat",
    href: "/buiten-stucwerk/",
    baseName: "dienst-stucwerk",
    badge: undefined,
    chips: ["Weerbestendig", "Scheurherstel", "Netjes opgeleverd"] as [string, string, string],
    outcomeKey: "look" as const,
    previewText:
      "Geeft de gevel een egale, moderne uitstraling. Geschikt bij renovatie of wanneer u de gevel een compleet nieuwe look wilt geven.",
    keuzehulpText:
      "Kies buiten stucwerk voor een strakke, moderne gevel. Combineerbaar met schilderen. Prijs hangt af van staat van de ondergrond en oppervlak.",
  },
  {
    id: "04",
    label: "DECORATIEVE AFWERKING",
    title: "Sierpleister (gevel)",
    subtitle: "Spachtelputz/crepi met karakter",
    href: "/sierpleister/",
    baseName: "dienst-sierpleister",
    badge: undefined,
    chips: ["Structuurkeuze", "Kleuren", "Onderhoudsvriendelijk"] as [string, string, string],
    outcomeKey: "look" as const,
    previewText:
      "Decoratieve toplaag met structuur (spachtelputz of crepi). Geeft karakter aan de gevel én verbergt kleine oneffenheden.",
    keuzehulpText:
      "Combineerbaar met buiten stucwerk als onderlaag. Keuze uit structuren en kleuren op maat. Onderhoudsvriendelijk en weerbestendig voor de lange termijn.",
  },
  {
    id: "05",
    label: "BINNEN STRAK & SAUSKLAAR",
    title: "Muren stucen (binnen)",
    subtitle: "Behangklaar of sausklaar stucwerk",
    href: "/muren-stucen/",
    baseName: "dienst-muren",
    badge: undefined,
    chips: ["Sausklaar", "Strakke wanden", "Renovatie"] as [string, string, string],
    outcomeKey: "binnen" as const,
    previewText:
      "Voor strakke, behangklare of sausklare binnenwanden. Perfect bij renovatie, verbouwing of nieuwbouw.",
    keuzehulpText:
      "Duidelijk resultaat: vlakke wand, direct sausklaar. Prijs per m², afhankelijk van de staat van de bestaande ondergrond en het aantal lagen.",
  },
  {
    id: "06",
    label: "OPLEVERING",
    title: "Schoonmaak na verbouwing",
    subtitle: "Op aanvraag (vraag naar de mogelijkheden)",
    href: "/contact/",
    baseName: "dienst-schoonmaak",
    badge: "Op aanvraag" as string | undefined,
    chips: ["Stofvrij", "Oplevering", "Snel gepland"] as [string, string, string],
    outcomeKey: "oplevering" as const,
    contactOnly: true as boolean | undefined,
    previewText:
      "Opleveringsschoonmaak na renovatie of verbouwing, op aanvraag. Zodat u het resultaat direct kunt bewonderen.",
    keuzehulpText:
      "Neem contact op voor beschikbaarheid en prijsindicatie. Wij plannen snel in zodat uw oplevering op tijd verloopt.",
  },
]

export default function ServicesRail() {
  const services: ServiceItem[] = SERVICES_DATA.map(({ baseName, ...rest }) => ({
    ...rest,
    imgSrc: getFallbackSrc(baseName, "/images", "serviceCard"),
    imgSrcSet: buildSrcSet(baseName, "/images", "serviceCard"),
  }))

  return <ServicesRailInteractive services={services} />
}

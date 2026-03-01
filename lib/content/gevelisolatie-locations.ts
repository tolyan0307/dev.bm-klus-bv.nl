export type LocationData = {
  slug: string
  city: string
  region: string
  title: string
  description: string
  h1: string
  intro: string
  localContext: string
  woningTypes: string[]
  afstanden: string
  faq: { vraag: string; antwoord: string }[]
}

export const locations: LocationData[] = [
  {
    slug: "rotterdam",
    city: "Rotterdam",
    region: "Zuid-Holland",
    title: "Gevelisolatie Rotterdam – ETICS prijs per m² | BM Klus BV",
    description:
      "Buitengevelisolatie (ETICS) in Rotterdam. Stuc, sierpleister, crepi of steenstrips. Gratis opname en offerte per m². VCA-gecertificeerd.",
    h1: "Gevelisolatie in Rotterdam",
    intro:
      "BM Klus BV is gevestigd in Rotterdam en verzorgt buitengevelisolatie (ETICS) voor woningen en bedrijfspanden in heel Rotterdam en directe omgeving. Van Kralingen tot Hillegersberg, van IJsselmonde tot Overschie — wij komen gratis bij u langs voor een opname en offerte.",
    localContext:
      "Rotterdam kent veel naoorlogse woningbouw (jaren '50–'70) met enkelsteens muren of smalle spouwen. Deze woningtypes zijn bij uitstek geschikt voor buitengevelisolatie. Ook de karakteristieke vooroorlogse panden in bijvoorbeeld Blijdorp of het Oude Noorden kunnen vaak goed geïsoleerd worden, mits de ondergrond in orde is.",
    woningTypes: [
      "Naoorlogse rijtjeshuizen (jaren '50–'70)",
      "Portiekflats en galerijflats",
      "Vooroorlogse woningen met massief metselwerk",
      "Twee-onder-een-kapwoningen",
      "Bedrijfspanden en utiliteit",
    ],
    afstanden: "Wij zijn gevestigd in Rotterdam — geen voorrijkosten binnen de gemeente.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Rotterdam?",
        antwoord:
          "De prijs voor buitengevelisolatie in Rotterdam begint vanaf €110/m² (incl. arbeid & materiaal, excl. steiger). De exacte prijs hangt af van de geveloppervlakte, de gekozen afwerking en de detaillering. Na een gratis opname ontvangt u een vaste offerte per m².",
      },
      {
        vraag: "Heb ik een vergunning nodig in Rotterdam?",
        antwoord:
          "In Rotterdam is voor buitengevelisolatie vaak geen omgevingsvergunning nodig, tenzij het gevelbeeld significant verandert of het pand in een beschermd stadsgezicht ligt. Wij checken dit vooraf bij de gemeente Rotterdam.",
      },
      {
        vraag: "Hoelang duurt gevelisolatie bij een rijtjeshuis in Rotterdam?",
        antwoord:
          "Een gemiddeld rijtjeshuis (±60 m² geveloppervlak) duurt doorgaans 1–2 weken, afhankelijk van de afwerking en eventueel herstelwerk aan de ondergrond.",
      },
    ],
  },
  {
    slug: "den-haag",
    city: "Den Haag",
    region: "Zuid-Holland",
    title: "Gevelisolatie Den Haag – ETICS prijs per m² | BM Klus BV",
    description:
      "Buitengevelisolatie (ETICS) in Den Haag en omgeving. Stuc, sierpleister of steenstrips. Gratis opname, offerte per m². Specialist uit Rotterdam.",
    h1: "Gevelisolatie in Den Haag",
    intro:
      "BM Klus BV verzorgt buitengevelisolatie (ETICS) voor woningen en bedrijfspanden in Den Haag en omgeving. Van Loosduinen tot Leidschenveen, van Scheveningen tot Ypenburg — wij komen kosteloos bij u langs.",
    localContext:
      "Den Haag heeft een gevarieerd woningbestand: van herenhuizen in het Statenkwartier tot naoorlogse portiekflats in Moerwijk en Mariahoeve. Veel van deze woningen zijn niet of nauwelijks geïsoleerd. Buitengevelisolatie biedt hier een duurzame oplossing zonder dat u woonruimte verliest.",
    woningTypes: [
      "Herenhuizen en bovenwoning (vooroorlogse bouw)",
      "Portiekflats en galerijflats (jaren '50–'70)",
      "Eengezinswoningen in vinexwijken",
      "Twee-onder-een-kapwoningen",
      "VvE-complexen",
    ],
    afstanden: "Den Haag ligt op ±25 km van ons kantoor in Rotterdam — wij rekenen geen voorrijkosten.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Den Haag?",
        antwoord:
          "De prijs voor buitengevelisolatie in Den Haag is vergelijkbaar met Rotterdam: vanaf €110/m² voor ETICS + pleisterafwerking en vanaf €200/m² voor ETICS + steenstrips. De exacte prijs volgt na een gratis opname ter plaatse.",
      },
      {
        vraag: "Werkt BM Klus BV ook in Scheveningen of Loosduinen?",
        antwoord:
          "Ja, wij werken in heel Den Haag inclusief alle stadsdelen. Van Scheveningen tot Ypenburg, van Loosduinen tot Leidschenveen.",
      },
      {
        vraag: "Kan een VvE in Den Haag gevelisolatie laten uitvoeren?",
        antwoord:
          "Ja, wij werken regelmatig samen met VvE's. Wij maken een offerte per m² op basis van het totale geveloppervlak en stemmen de planning af met het VvE-bestuur.",
      },
    ],
  },
  {
    slug: "delft",
    city: "Delft",
    region: "Zuid-Holland",
    title: "Gevelisolatie Delft – ETICS prijs per m² | BM Klus BV",
    description:
      "Buitengevelisolatie (ETICS) in Delft. Sierpleister, stucwerk of steenstrips. Gratis opname en offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Delft",
    intro:
      "BM Klus BV verzorgt buitengevelisolatie voor woningen en bedrijfspanden in Delft. Van de historische binnenstad tot de nieuwere wijken als Tanthof en Voorhof — wij adviseren u over de beste aanpak.",
    localContext:
      "Delft kent veel naoorlogse bouw in wijken als Voorhof, Buitenhof en Tanthof. Deze woningen zijn vaak slecht geïsoleerd en lenen zich uitstekend voor buitengevelisolatie. In de binnenstad gelden soms aanvullende eisen vanwege het beschermde stadsgezicht — wij checken dit vooraf.",
    woningTypes: [
      "Rijtjeshuizen (Voorhof, Tanthof)",
      "Portiekflats en galerijflats",
      "Studentenhuisvesting en kleine appartementen",
      "Historische panden (met maatwerk)",
    ],
    afstanden: "Delft ligt op ±15 km van ons kantoor — geen voorrijkosten.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Delft?",
        antwoord:
          "De kosten voor buitengevelisolatie in Delft starten vanaf €110/m² (ETICS + pleisterafwerking). De prijs is afhankelijk van het type woning, de oppervlakte en de gekozen afwerking.",
      },
      {
        vraag: "Mag ik mijn gevel isoleren in de historische binnenstad van Delft?",
        antwoord:
          "Dat hangt af van de locatie en het type pand. In het beschermd stadsgezicht gelden strengere regels. Wij checken vooraf bij de gemeente Delft of een vergunning nodig is en welke afwerkingen zijn toegestaan.",
      },
    ],
  },
  {
    slug: "dordrecht",
    city: "Dordrecht",
    region: "Zuid-Holland",
    title: "Gevelisolatie Dordrecht – ETICS prijs per m² | BM Klus BV",
    description:
      "Buitengevelisolatie (ETICS) in Dordrecht en omgeving. Stuc, sierpleister of steenstrips. Gratis opname, offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Dordrecht",
    intro:
      "BM Klus BV verzorgt buitengevelisolatie voor woningen en bedrijfspanden in Dordrecht en het eiland van Dordrecht. Van de Wielwijk tot Sterrenburg, van Dubbeldam tot Crabbehof.",
    localContext:
      "Dordrecht heeft veel naoorlogse wijken (Wielwijk, Crabbehof, Sterrenburg) met woningen die toe zijn aan een grondige isolatie-upgrade. De typische bouwstijl — enkelsteens of smalle spouw — maakt buitengevelisolatie de meest effectieve methode.",
    woningTypes: [
      "Naoorlogse eengezinswoningen",
      "Portiekflats (Wielwijk, Crabbehof)",
      "Twee-onder-een-kapwoningen (Dubbeldam)",
      "Bedrijfspanden op industrieterreinen",
    ],
    afstanden: "Dordrecht ligt op ±25 km van Rotterdam — geen voorrijkosten.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Dordrecht?",
        antwoord:
          "De kosten voor buitengevelisolatie in Dordrecht zijn vergelijkbaar met de regio Rotterdam: vanaf €110/m² voor ETICS + pleisterafwerking. Na een gratis opname ontvangt u een vaste offerte.",
      },
      {
        vraag: "Werkt BM Klus BV ook op het eiland van Dordrecht?",
        antwoord:
          "Ja, wij werken in heel Dordrecht en op het eiland van Dordrecht, inclusief Dubbeldam, Wielwijk, Sterrenburg en de Binnenstad.",
      },
    ],
  },
]

export function getLocation(slug: string): LocationData | undefined {
  return locations.find((l) => l.slug === slug)
}

export function getAllLocationSlugs(): string[] {
  return locations.map((l) => l.slug)
}

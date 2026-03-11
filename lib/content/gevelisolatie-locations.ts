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
  bouwperiode: string
  gemiddeldBesparing: string
  subsidieInfo: string
  vergunningTip: string
  energieTip: string
  gemeenteWebsite?: string
  nearbyLocations: string[]
}

export const locations: LocationData[] = [
  {
    slug: "rotterdam",
    city: "Rotterdam",
    region: "Zuid-Holland",
    title: "Gevelisolatie Rotterdam – ETICS prijs per m²",
    description:
      "Buitengevelisolatie (ETICS) in Rotterdam. Stuc, sierpleister, crepi of steenstrips. Opname op locatie en offerte per m². VCA-gecertificeerd.",
    h1: "Gevelisolatie in Rotterdam",
    intro:
      "Als wederopbouwstad kent Rotterdam een enorm woningbestand uit de jaren '50–'70 met enkelsteens gevels en smalle spouwen. Vanuit ons kantoor in Rotterdam verzorgen wij buitengevelisolatie (ETICS) door de hele stad — van Kralingen tot IJsselmonde. Wij komen bij u langs voor een gratis opname en offerte per m².",
    localContext:
      "Rotterdam kent veel naoorlogse woningbouw (jaren '50–'70) met enkelsteens muren of smalle spouwen. Deze woningtypes zijn bij uitstek geschikt voor buitengevelisolatie. Ook de karakteristieke vooroorlogse panden in bijvoorbeeld Blijdorp of het Oude Noorden kunnen vaak goed geïsoleerd worden, mits de ondergrond in orde is.",
    woningTypes: [
      "Naoorlogse rijtjeshuizen (jaren '50–'70)",
      "Portiekflats en galerijflats",
      "Vooroorlogse woningen met massief metselwerk",
      "Twee-onder-een-kapwoningen",
      "Bedrijfspanden en utiliteit",
    ],
    afstanden: "Wij zijn gevestigd in Rotterdam — wij werken in de gemeente en directe omgeving.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Rotterdam?",
        antwoord:
          "De prijs hangt af van de geveloppervlakte, de afwerking en de staat van de ondergrond. Bij Rotterdamse wederopbouwwoningen en portiekflats uit de jaren '50–'70 spelen steigerkosten en de conditie van het bestaande metselwerk een rol in de uiteindelijke prijs. Bekijk de richtprijzen op onze kostenpagina of vraag een gratis opname aan.",
      },
      {
        vraag: "Heb ik een vergunning nodig voor buitengevelisolatie in Rotterdam?",
        antwoord:
          "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig, omdat het uiterlijk van de gevel verandert. In beschermde stadsgezichten (bijv. Delfshaven, Kralingen-Midden, Tuindorp Vreewijk) gelden aanvullende eisen. Controleer altijd de actuele regels via het Omgevingsloket.",
      },
      {
        vraag: "Hoelang duurt gevelisolatie bij een rijtjeshuis in Rotterdam?",
        antwoord:
          "Een gemiddeld rijtjeshuis (±60 m² geveloppervlak) duurt doorgaans 1–2 weken, afhankelijk van de afwerking en eventueel herstelwerk aan de ondergrond.",
      },
      {
        vraag: "Is buitengevelisolatie geschikt voor wederopbouwwoningen in Rotterdam?",
        antwoord:
          "Ja, de naoorlogse wederopbouwwoningen (jaren '50–'70) in wijken als IJsselmonde, Lombardijen en Hillegersberg hebben vaak enkelsteens gevels met een zeer lage isolatiewaarde. ETICS is hier bijzonder effectief.",
      },
    ],
    bouwperiode: "Overwegend jaren '50–'70, met naoorlogse wederopbouw en portiekflats.",
    gemiddeldBesparing: "Indicatief €600–€900/jaar besparing op stookkosten bij een typisch rijtjeshuis (bron: Milieu Centraal). Het werkelijke bedrag hangt af van uw woning, isolatiedikte en stookgedrag.",
    subsidieInfo: "ISDE-subsidie voor gevelisolatie: €20,25/m² (bij één maatregel) of €40,50/m² (bij combinatie met andere isolatie). Min. 10 m², Rd ≥ 3,5 m²K/W. Raadpleeg rvo.nl voor actuele voorwaarden. Gemeente Rotterdam biedt het Energietransitiefonds (ETF) en advies via Duurzaam 010.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig, omdat het uiterlijk van de gevel verandert. In beschermde stadsgezichten (bijv. Delfshaven, Kralingen-Midden, Tuindorp Vreewijk) en bij monumenten gelden aanvullende eisen. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "Veel naoorlogse woningen in Rotterdam hebben een energielabel D–F. Buitengevelisolatie kan het label met 1–3 stappen verbeteren.",
    gemeenteWebsite: "https://www.rotterdam.nl/wonen-leven/energiebesparing/",
    nearbyLocations: ["schiedam", "vlaardingen", "barendrecht", "ridderkerk", "capelle-aan-den-ijssel"],
  },
  {
    slug: "den-haag",
    city: "Den Haag",
    region: "Zuid-Holland",
    title: "Gevelisolatie Den Haag – ETICS prijs per m²",
    description:
      "Buitengevelisolatie (ETICS) in Den Haag en omgeving. Stuc, sierpleister of steenstrips. Opname op locatie, offerte per m². Specialist uit Rotterdam.",
    h1: "Gevelisolatie in Den Haag",
    intro:
      "Den Haag telt 21 beschermde stadsgezichten en een grote diversiteit aan woningtypen — van vooroorlogse herenhuizen in het Statenkwartier tot naoorlogse portiekflats in Moerwijk. Juist die verscheidenheid vraagt om maatwerk bij buitengevelisolatie. Wij beoordelen de constructie ter plekke en adviseren over de juiste ETICS-opbouw en afwerking.",
    localContext:
      "Den Haag heeft een gevarieerd woningbestand: van herenhuizen in het Statenkwartier tot naoorlogse portiekflats in Moerwijk en Mariahoeve. Veel van deze woningen zijn niet of nauwelijks geïsoleerd. Buitengevelisolatie biedt hier een duurzame oplossing zonder dat u woonruimte verliest.",
    woningTypes: [
      "Herenhuizen en bovenwoning (vooroorlogse bouw)",
      "Portiekflats en galerijflats (jaren '50–'70)",
      "Eengezinswoningen in vinexwijken",
      "Twee-onder-een-kapwoningen",
      "VvE-complexen",
    ],
    afstanden: "Den Haag ligt op ±25 km van ons kantoor in Rotterdam — wij werken in de regio Rotterdam en omgeving.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Den Haag?",
        antwoord:
          "De kosten hangen af van de oppervlakte, afwerking en constructie van de gevel. Bij Haagse woningen met massief metselwerk (zonder spouw) is buitengevelisolatie vaak de enige optie, wat de prijs beïnvloedt. In beschermde stadsgezichten kunnen aanvullende eisen aan materiaal en kleur de kosten verhogen. Vraag een opname aan voor een exacte offerte.",
      },
      {
        vraag: "Werkt BM klus BV ook in Scheveningen of Loosduinen?",
        antwoord:
          "Ja, wij werken in heel Den Haag inclusief alle stadsdelen. Van Scheveningen tot Ypenburg, van Loosduinen tot Leidschenveen.",
      },
      {
        vraag: "Kan een VvE in Den Haag gevelisolatie laten uitvoeren?",
        antwoord:
          "Ja, wij werken regelmatig samen met VvE's. Wij maken een offerte per m² op basis van het totale geveloppervlak en stemmen de planning af met het VvE-bestuur.",
      },
      {
        vraag: "Is ETICS geschikt voor woningen met massief metselwerk zonder spouw?",
        antwoord:
          "Ja, veel woningen in Den Haag hebben massief metselwerk zonder spouw — zowel vooroorlogse herenhuizen (Statenkwartier, Archipelbuurt) als naoorlogse wederopbouwwoningen (Moerwijk, Mariahoeve). Buitengevelisolatie is dan vaak de enige praktische optie. Wij beoordelen de ondergrond en hechting bij de opname.",
      },
    ],
    bouwperiode: "Mix van vooroorlogse herenhuizen en naoorlogse portiekflats (jaren '50–'70).",
    gemiddeldBesparing: "Indicatief €500–€850/jaar besparing bij een bovenwoning of rijtjeshuis (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "ISDE-subsidie voor gevelisolatie: €20,25/m² (bij één maatregel) of €40,50/m² (bij combinatie met andere isolatie). Min. 10 m², Rd ≥ 3,5 m²K/W. Raadpleeg rvo.nl voor actuele voorwaarden. Gemeente Den Haag biedt de Energiebespaarlening (via Warmtefonds) en een gratis energie- en duurzaamheidsscan.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig. Den Haag telt 21 beschermde stadsgezichten (11 rijks, 10 gemeentelijk), waaronder het Willemspark, Statenkwartier, Archipelbuurt en Benoordenhout. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "Veel Haagse vooroorlogse woningen hebben massief metselwerk zonder spouw. ETICS is hier vaak de meest effectieve gevelisolatiemethode.",
    gemeenteWebsite: "https://www.denhaag.nl/nl/wonen-en-bouwen/duurzaam-wonen.htm",
    nearbyLocations: ["delft", "zoetermeer", "leidschendam-voorburg", "leiden"],
  },
  {
    slug: "delft",
    city: "Delft",
    region: "Zuid-Holland",
    title: "Gevelisolatie Delft – ETICS prijs per m²",
    description:
      "Buitengevelisolatie (ETICS) in Delft. Sierpleister, stucwerk of steenstrips. Opname op locatie en offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Delft",
    intro:
      "In Delft loopt het verschil tussen oud en nieuw dwars door de stad: de historische binnenstad is beschermd stadsgezicht, terwijl Voorhof en Tanthof typische jaren-'70-wijken zijn met ongeïsoleerde gevels. Wij komen langs om de constructie te beoordelen en stellen een ETICS-oplossing voor die past bij het karakter van uw woning.",
    localContext:
      "Delft kent veel naoorlogse bouw in wijken als Voorhof, Buitenhof en Tanthof. Deze woningen zijn vaak slecht geïsoleerd en lenen zich uitstekend voor buitengevelisolatie. Delft heeft vier beschermde stadsgezichten — de Binnenstad, Nieuwe Plantage, Agnetapark en TU-Noord — waar aanvullende eisen gelden. Wij checken dit vooraf bij de opname.",
    woningTypes: [
      "Rijtjeshuizen (Voorhof, Tanthof)",
      "Portiekflats en galerijflats",
      "Studentenhuisvesting en kleine appartementen",
      "Historische panden (met maatwerk)",
    ],
    afstanden: "Delft ligt op ±15 km van ons kantoor — wij werken in de regio Rotterdam en omgeving.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Delft?",
        antwoord:
          "De kosten verschillen sterk tussen de historische binnenstad en de naoorlogse wijken. Voor een rijtjeswoning in Voorhof of Tanthof is standaard ETICS met sierpleister doorgaans de voordeligste oplossing. In het beschermd stadsgezicht komen maatwerk en vergunningskosten erbij. Bekijk onze kostenpagina of plan een gratis opname.",
      },
      {
        vraag: "Mag ik mijn gevel isoleren in de historische binnenstad van Delft?",
        antwoord:
          "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig. Delft heeft vier beschermde stadsgezichten (Binnenstad, Nieuwe Plantage, Agnetapark, TU-Noord) waar strengere regels gelden. Wij checken vooraf bij de gemeente welke mogelijkheden er zijn.",
      },
      {
        vraag: "Zijn de flats in Voorhof en Buitenhof geschikt voor ETICS?",
        antwoord:
          "Ja, de portiekflats en galerijflats in Voorhof en Buitenhof (bouwjaar '60–'80) hebben typisch een zeer lage Rc-waarde (0,3–0,5). Buitengevelisolatie brengt de gevel naar Rc 3,5+ en verbetert zowel het comfort als het energielabel.",
      },
    ],
    bouwperiode: "Naoorlogse uitbreidingswijken (jaren '60–'80) naast historische binnenstad.",
    gemiddeldBesparing: "Indicatief €550–€800/jaar besparing bij een rijtjeshuis in Voorhof of Tanthof (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "ISDE-subsidie voor gevelisolatie: €20,25/m² (bij één maatregel) of €40,50/m² (bij combinatie met andere isolatie). Min. 10 m², Rd ≥ 3,5 m²K/W. Raadpleeg rvo.nl voor actuele voorwaarden. Gemeente Delft biedt de Duurzaamheidslening en gratis energieadvies voor woningeigenaren.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig. Delft heeft vier beschermde stadsgezichten (Binnenstad, Nieuwe Plantage, Agnetapark en TU-Noord). Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "De jaren '70-woningen in Voorhof en Buitenhof hebben vaak een Rc-waarde van 0,3–0,5. ETICS brengt dit naar Rc 3,5+ conform het Bbl (Besluit bouwwerken leefomgeving).",
    gemeenteWebsite: "https://www.delft.nl/duurzaamheid",
    nearbyLocations: ["den-haag", "schiedam", "zoetermeer", "leidschendam-voorburg"],
  },
  {
    slug: "dordrecht",
    city: "Dordrecht",
    region: "Zuid-Holland",
    title: "Gevelisolatie Dordrecht – ETICS prijs per m²",
    description:
      "Buitengevelisolatie (ETICS) in Dordrecht en omgeving. Stuc, sierpleister of steenstrips. Opname op locatie, offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Dordrecht",
    intro:
      "Dordrecht — de oudste stad van Holland — heeft in wijken als Wielwijk, Crabbehof en Sterrenburg een groot bestand aan portiekflats en rijtjeshuizen uit de jaren '50–'70. Deze woningen zijn vaak volledig ongeïsoleerd. Met buitengevelisolatie (ETICS) verbetert u zowel het wooncomfort als de uitstraling van de gevel, zonder dat u binnenruimte verliest.",
    localContext:
      "Dordrecht heeft veel naoorlogse wijken (Wielwijk, Crabbehof, Sterrenburg) met woningen die toe zijn aan een grondige isolatie-upgrade. De typische bouwstijl — enkelsteens of smalle spouw — maakt buitengevelisolatie de meest effectieve methode.",
    woningTypes: [
      "Naoorlogse eengezinswoningen",
      "Portiekflats (Wielwijk, Crabbehof)",
      "Twee-onder-een-kapwoningen (Dubbeldam)",
      "Bedrijfspanden op industrieterreinen",
    ],
    afstanden: "Dordrecht ligt op ±25 km van ons kantoor in Rotterdam — wij werken in de regio Rotterdam en omgeving.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Dordrecht?",
        antwoord:
          "De prijs wordt bepaald door de geveloppervlakte, de isolatiedikte en de afwerking. Dordtse portiekflats in Wielwijk of Crabbehof hebben relatief grote geveloppervlakken, maar bieden bij collectieve VvE-aanpak schaalvoordeel. De plint-zone vraagt in deze waterrijke stad extra aandacht. Vraag een opname aan voor een offerte op maat.",
      },
      {
        vraag: "Werkt BM klus BV ook op het eiland van Dordrecht?",
        antwoord:
          "Ja, wij werken in heel Dordrecht en op het eiland van Dordrecht, inclusief Dubbeldam, Wielwijk, Sterrenburg en de Binnenstad.",
      },
      {
        vraag: "Hoe pakt BM klus BV gevelisolatie aan bij portiekflats in Wielwijk of Crabbehof?",
        antwoord:
          "Bij portiekflats werken wij samen met het VvE-bestuur. Wij maken een totaalofferte per m² en stemmen de planning af zodat bewoners zo min mogelijk hinder ondervinden. De plint- en raamdorpeldetails krijgen extra aandacht.",
      },
    ],
    bouwperiode: "Overwegend jaren '50–'70 met grote naoorlogse wijken (Wielwijk, Crabbehof).",
    gemiddeldBesparing: "Indicatief €600–€900/jaar besparing bij een typisch naoorlogs rijtjeshuis (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "ISDE-subsidie voor gevelisolatie: €20,25/m² (bij één maatregel) of €40,50/m² (bij combinatie met andere isolatie). Min. 10 m², Rd ≥ 3,5 m²K/W. Raadpleeg rvo.nl voor actuele voorwaarden. Gemeente Dordrecht biedt de Duurzaamheidslening en het Energieloket Drechtsteden.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig. De historische binnenstad (eiland van Dordrecht) heeft beschermd stadsgezicht met aanvullende eisen. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "Dordrecht heeft relatief veel enkelsteens woningen uit de wederopbouwperiode. Deze profiteren het meest van buitengevelisolatie.",
    gemeenteWebsite: "https://www.dordrecht.nl/duurzaamheid",
    nearbyLocations: ["ridderkerk", "hendrik-ido-ambacht", "barendrecht", "spijkenisse"],
  },
  {
    slug: "schiedam",
    city: "Schiedam",
    region: "Zuid-Holland",
    title: "Gevelisolatie Schiedam – ETICS prijs per m²",
    description:
      "Buitengevelisolatie (ETICS) in Schiedam. Stuc, sierpleister of steenstrips. Opname op locatie en offerte per m². Specialist uit Rotterdam.",
    h1: "Gevelisolatie in Schiedam",
    intro:
      "Schiedam grenst direct aan Rotterdam, waardoor wij snel ter plekke zijn voor een opname. De stad kent naast een historische binnenstad met de hoogste klassieke windmolens ter wereld veel naoorlogse portiekflats en galerijflats in Nieuwland en Groenoord. Voor deze woningen is buitengevelisolatie vaak de meest praktische oplossing.",
    localContext:
      "Schiedam grenst direct aan Rotterdam en kent veel naoorlogse woningbouw in wijken als Nieuwland, Groenoord en Woudhoek. De typische portiekflats en rijtjeshuizen uit de jaren '50–'70 zijn vaak slecht geïsoleerd. Buitengevelisolatie is hier een effectieve aanpak: geen woonruimteverlies en direct zichtbaar resultaat aan de gevel.",
    woningTypes: [
      "Naoorlogse rijtjeshuizen (Nieuwland, Woudhoek)",
      "Portiekflats en galerijflats (Groenoord)",
      "Vooroorlogse woningen in het centrum",
      "Twee-onder-een-kapwoningen (Kethel)",
      "VvE-complexen",
    ],
    afstanden: "Schiedam grenst aan Rotterdam — wij werken in de regio Rotterdam en directe omgeving.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Schiedam?",
        antwoord:
          "Door de nabijheid van ons kantoor in Rotterdam zijn de reiskosten voor Schiedam minimaal. De prijs wordt verder bepaald door de geveloppervlakte en de afwerking. Bij VvE-projecten in Nieuwland of Groenoord kan collectieve aanpak de kosten per woning drukken. Bekijk onze kostenpagina of vraag een opname aan.",
      },
      {
        vraag: "Heb ik een vergunning nodig in Schiedam?",
        antwoord:
          "Of een vergunning nodig is, hangt af van uw woning, locatie en de actuele regels van de gemeente Schiedam. In de historische binnenstad kunnen aanvullende eisen gelden. Controleer altijd de actuele regels via uw gemeente en het Omgevingsloket.",
      },
      {
        vraag: "Werkt BM klus BV ook in Kethel en Woudhoek?",
        antwoord:
          "Ja, wij werken in heel Schiedam inclusief alle wijken: Nieuwland, Groenoord, Woudhoek, Kethel, West-Frankelandsepolder en de binnenstad.",
      },
    ],
    bouwperiode: "Voornamelijk jaren '50–'70, met grote naoorlogse flatwijken.",
    gemiddeldBesparing: "Indicatief €500–€800/jaar besparing bij een portiekflat of rijtjeshuis (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "ISDE-subsidie voor gevelisolatie: €20,25/m² (bij één maatregel) of €40,50/m² (bij combinatie met andere isolatie). Min. 10 m², Rd ≥ 3,5 m²K/W. Raadpleeg rvo.nl voor actuele voorwaarden. Gemeente Schiedam biedt de Duurzaamheidslening en werkt samen met het regionaal Energieloket.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig. De binnenstad van Schiedam is sinds 2005 aangewezen als beschermd stadsgezicht, waar aanvullende eisen gelden. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "De portiekflats in Groenoord en Nieuwland zijn veelal ongeïsoleerd. VvE-projecten met ETICS leveren hier grote energiebesparingen op.",
    gemeenteWebsite: "https://www.schiedam.nl/duurzaamheid",
    nearbyLocations: ["rotterdam", "vlaardingen", "delft", "maassluis"],
  },
  {
    slug: "vlaardingen",
    city: "Vlaardingen",
    region: "Zuid-Holland",
    title: "Gevelisolatie Vlaardingen – ETICS prijs per m²",
    description:
      "Buitengevelisolatie (ETICS) in Vlaardingen. Stuc, sierpleister of steenstrips. Opname op locatie, offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Vlaardingen",
    intro:
      "Veel woningen in de Vlaardingse wijken Holy en Westwijk zijn gebouwd in de jaren '60–'80 met enkelsteens gevels en weinig tot geen isolatie. Buitengevelisolatie (ETICS) pakt hier het probleem aan de buitenkant aan, zonder verbouwing binnenin. Wij beoordelen de staat van de ondergrond en adviseren over isolatiedikte en afwerking.",
    localContext:
      "Vlaardingen heeft veel naoorlogse woonwijken zoals Holy, Westwijk en de Vettenoordse polder met rijtjeshuizen en flats die veelal een enkelsteens of smalle spouwmuur hebben. Deze woningen zijn bij uitstek geschikt voor buitengevelisolatie. Ook in de oudere stadskernen zijn er mogelijkheden, mits de ondergrond goed beoordeeld wordt.",
    woningTypes: [
      "Naoorlogse rijtjeshuizen (Holy, Westwijk)",
      "Portiekflats en galerijflats",
      "Eengezinswoningen (Vettenoordse polder)",
      "Vooroorlogse woningen in het centrum",
    ],
    afstanden: "Vlaardingen ligt op ±13 km van ons kantoor in Rotterdam — wij werken in de regio Rotterdam en omgeving.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Vlaardingen?",
        antwoord:
          "De kosten hangen af van de geveloppervlakte en de gekozen afwerking. Bij enkelsteens woningen in Holy en Westwijk is vaak een grotere isolatiedikte nodig om een goede Rd-waarde te behalen, wat de materiaalkosten beïnvloedt. Wij geven altijd een gespecificeerde offerte na opname. Bekijk ook de richtprijzen op onze kostenpagina.",
      },
      {
        vraag: "Hoelang duurt gevelisolatie in Vlaardingen?",
        antwoord:
          "Een gemiddeld rijtjeshuis (±60 m² geveloppervlak) duurt doorgaans 1–2 weken, afhankelijk van de gekozen afwerking en eventueel herstelwerk. De exacte planning bespreken wij bij de opname.",
      },
      {
        vraag: "Welke woningen in Holy en Westwijk zijn het meest geschikt?",
        antwoord:
          "De rijtjeshuizen en portiekflats in Holy en Westwijk (bouwjaar '65–'80) hebben typisch een Rc-waarde van 0,2–0,5. Deze enkelsteens of smalle spouwgevels zijn bij uitstek geschikt voor buitengevelisolatie.",
      },
    ],
    bouwperiode: "Overwegend jaren '60–'80 met typische groeikernwoningen.",
    gemiddeldBesparing: "Indicatief €550–€800/jaar besparing bij een rijtjeshuis in Holy of Westwijk (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "ISDE-subsidie voor gevelisolatie: €20,25/m² (bij één maatregel) of €40,50/m² (bij combinatie met andere isolatie). Min. 10 m², Rd ≥ 3,5 m²K/W. Raadpleeg rvo.nl voor actuele voorwaarden. Gemeente Vlaardingen werkt samen met het regionaal Energieloket voor advies en financieringsmogelijkheden.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig, omdat het uiterlijk van de gevel verandert. In het oude centrum van Vlaardingen kunnen aanvullende eisen gelden. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "De rijtjeshuizen in Holy en Westwijk (bouwjaar '65–'80) hebben typisch een Rc-waarde van 0,2–0,5. Na ETICS bereiken zij Rc 3,5+ (conform Bbl).",
    gemeenteWebsite: "https://www.vlaardingen.nl/duurzaamheid",
    nearbyLocations: ["schiedam", "maassluis", "rotterdam", "delft"],
  },
  {
    slug: "leiden",
    city: "Leiden",
    region: "Zuid-Holland",
    title: "Gevelisolatie Leiden – ETICS prijs per m²",
    description:
      "Buitengevelisolatie (ETICS) in Leiden en omgeving. Stuc, sierpleister of steenstrips. Opname op locatie en offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Leiden",
    intro:
      "Leiden kent een scherp contrast: in de historische binnenstad staan grachtenpanden waar maatwerk essentieel is, terwijl naoorlogse wijken als Merenwijk en Stevenshof rijtjeshuizen en flats hebben die baat hebben bij standaard ETICS. Wij komen langs om de situatie te bekijken en adviseren welke aanpak past — ook als uw woning in een beschermd stadsgezicht ligt.",
    localContext:
      "Leiden is een historische universiteitsstad met een gevarieerd woningbestand. De stad heeft twee beschermde stadsgezichten — de Binnenstad (189,7 ha) en de Zuidelijke Schil (141,2 ha) — waarvoor maatwerk nodig is. In de naoorlogse wijk Merenwijk (jaren '70) en Stevenshof (jaren '80–'90) staan veel rijtjeshuizen en flats met slechte isolatiewaarden. Buitengevelisolatie biedt hier een duurzame oplossing.",
    woningTypes: [
      "Naoorlogse rijtjeshuizen (Merenwijk, Stevenshof)",
      "Portiekflats en galerijflats (Leiden-Noord)",
      "Grachtenpanden en herenhuizen (binnenstad, met maatwerk)",
      "Eengezinswoningen (Professorenwijk, De Kooi)",
      "VvE-complexen",
    ],
    afstanden: "Leiden ligt op ±35 km van ons kantoor in Rotterdam — wij werken in de regio Rotterdam en omgeving.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Leiden?",
        antwoord:
          "Voor naoorlogse rijtjeshuizen in Merenwijk of Stevenshof liggen de kosten in de standaard bandbreedte voor ETICS met sierpleister. Bij grachtenpanden in de binnenstad komen maatwerk, vergunningskosten en eventuele esthetische aanpassingen erbij. Wij maken na opname een heldere offerte per m². Bekijk ook onze kostenpagina.",
      },
      {
        vraag: "Mag ik mijn gevel isoleren in de Leidse binnenstad?",
        antwoord:
          "Dat hangt af van de exacte locatie en het type pand. In het beschermd stadsgezicht gelden strengere regels. Wij checken vooraf bij de gemeente Leiden welke mogelijkheden er zijn en of een vergunning nodig is.",
      },
      {
        vraag: "Werkt BM klus BV ook in Leiderdorp en Oegstgeest?",
        antwoord:
          "Ja, ons werkgebied omvat heel Leiden en de omliggende gemeenten: Leiderdorp, Oegstgeest, Voorschoten en Zoeterwoude.",
      },
    ],
    bouwperiode: "Mix van historische grachtenpanden, Merenwijk (jaren '70) en Stevenshof (jaren '80–'90).",
    gemiddeldBesparing: "Indicatief €500–€850/jaar besparing bij een rijtjeshuis in Merenwijk of Stevenshof (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "ISDE-subsidie voor gevelisolatie: €20,25/m² (bij één maatregel) of €40,50/m² (bij combinatie met andere isolatie). Min. 10 m², Rd ≥ 3,5 m²K/W. Raadpleeg rvo.nl voor actuele voorwaarden. Gemeente Leiden biedt de Leidse Duurzaamheidslening en een gratis energiescan voor woningeigenaren.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig. Leiden heeft twee beschermde stadsgezichten: de Binnenstad en de Zuidelijke Schil (Professorenwijk, Tuinstadwijk). Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "Veel grachtenpanden in Leiden hebben massieve gevels zonder spouw. ETICS is hier vaak de meest praktische optie, mits de gemeente toestemming geeft voor het gewijzigde gevelbeeld.",
    gemeenteWebsite: "https://www.leiden.nl/duurzaam",
    nearbyLocations: ["den-haag", "zoetermeer", "alphen-aan-den-rijn", "leidschendam-voorburg"],
  },
  {
    slug: "gouda",
    city: "Gouda",
    region: "Zuid-Holland",
    title: "Gevelisolatie Gouda – ETICS prijs per m²",
    description:
      "Buitengevelisolatie (ETICS) in Gouda en omgeving. Stuc, sierpleister of steenstrips. Opname op locatie, offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Gouda",
    intro:
      "Rond de historische binnenstad van Gouda — met zijn kenmerkende gevels, grachtjes en hofjes — liggen naoorlogse uitbreidingswijken als Goverwelle, Bloemendaal en Plaswijckbuurt. Hier staan rijtjeshuizen en flats uit de jaren '60–'80 die doorgaans slecht geïsoleerd zijn. Wij bekijken de gevel ter plekke en stellen een passende ETICS-oplossing voor.",
    localContext:
      "Gouda kent naast de historische binnenstad veel naoorlogse uitbreidingswijken zoals Goverwelle, Bloemendaal en de Plaswijckbuurt. De woningen in deze wijken — vaak rijtjeshuizen met enkelsteens gevels — zijn bij uitstek geschikt voor buitengevelisolatie. In de binnenstad gelden aanvullende regels vanwege het beschermde stadsgezicht.",
    woningTypes: [
      "Naoorlogse rijtjeshuizen (Goverwelle, Bloemendaal)",
      "Portiekflats (Kort Haarlem, Oost)",
      "Eengezinswoningen (Plaswijckbuurt)",
      "Historische panden binnenstad (met maatwerk)",
    ],
    afstanden: "Gouda ligt op ±25 km van ons kantoor in Rotterdam — wij werken in de regio Rotterdam en omgeving.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Gouda?",
        antwoord:
          "De prijs wordt bepaald door de oppervlakte, afwerking en de staat van de ondergrond. Rijtjeshuizen in Goverwelle of Bloemendaal hebben relatief compacte gevels, wat de totale investering beheersbaar houdt. In het historische centrum zijn de kosten hoger door maatwerk en eventuele vergunningseisen. Vraag een gratis opname aan.",
      },
      {
        vraag: "Heb ik een vergunning nodig voor buitengevelisolatie in Gouda?",
        antwoord:
          "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig, omdat het uiterlijk van de gevel verandert. De binnenstad van Gouda is rijksbeschermd stadsgezicht (sinds 1978, 77 ha), daarnaast is de Tuindorp Josephbuurt gemeentelijk beschermd. Controleer de actuele regels via het Omgevingsloket.",
      },
      {
        vraag: "Zijn de jaren '70-rijtjeshuizen in Goverwelle geschikt voor ETICS?",
        antwoord:
          "Ja, deze woningen hebben een typische Rc-waarde van 0,3–0,6. De enkelsteens gevels zijn bij uitstek geschikt voor buitengevelisolatie. ETICS brengt de isolatiewaarde naar Rc 3,5+ (conform Bbl) en verbetert het energielabel aanzienlijk.",
      },
    ],
    bouwperiode: "Naoorlogse uitbreidingswijken (jaren '60–'80) en historische binnenstad.",
    gemiddeldBesparing: "Indicatief €550–€800/jaar besparing bij een rijtjeshuis in Goverwelle of Bloemendaal (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "ISDE-subsidie voor gevelisolatie: €20,25/m² (bij één maatregel) of €40,50/m² (bij combinatie met andere isolatie). Min. 10 m², Rd ≥ 3,5 m²K/W. Raadpleeg rvo.nl voor actuele voorwaarden. Gemeente Gouda biedt de Duurzaamheidslening en het Energieloket Midden-Holland.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig. De binnenstad van Gouda is rijksbeschermd stadsgezicht (sinds 1978). Daarnaast is de Tuindorp Josephbuurt gemeentelijk beschermd. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "De jaren '70-rijtjeshuizen in Goverwelle hebben een typische Rc-waarde van 0,3–0,6. Buitengevelisolatie brengt dit naar Rc 3,5+ (conform Bbl) en verbetert het energielabel aanzienlijk.",
    gemeenteWebsite: "https://www.gouda.nl/duurzaamheid",
    nearbyLocations: ["zoetermeer", "alphen-aan-den-rijn", "rotterdam"],
  },
  {
    slug: "zoetermeer",
    city: "Zoetermeer",
    region: "Zuid-Holland",
    title: "Gevelisolatie Zoetermeer – ETICS prijs per m²",
    description:
      "Buitengevelisolatie (ETICS) in Zoetermeer. Stuc, sierpleister of steenstrips. Opname op locatie en offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Zoetermeer",
    intro:
      "Als groeikern groeide Zoetermeer vanaf de jaren '60 explosief, met grote aantallen rijtjeshuizen en flats in Palenstein, Meerzicht en Buytenwegh. Deze woningen werden snel gebouwd met dunne, vaak ongeïsoleerde gevels. Buitengevelisolatie is hier een bewezen manier om het comfort te verbeteren en energiekosten te verlagen.",
    localContext:
      "Zoetermeer is vanaf 1962 aangewezen als groeikern van Den Haag en grotendeels gebouwd in de jaren '66–'90. De wijken Palenstein (1966), Meerzicht (1969), Buytenwegh (1974) en Seghwaert bestaan voornamelijk uit rijtjeshuizen en portiekflats met enkelsteens of smalle spouwgevels. Deze woningen zijn bij uitstek geschikt voor buitengevelisolatie — er is veel oppervlak te winnen met relatief eenvoudige geveldetaillering.",
    woningTypes: [
      "Rijtjeshuizen (Palenstein, Meerzicht, Buytenwegh)",
      "Portiekflats en galerijflats (Seghwaert)",
      "Eengezinswoningen (Rokkeveen, Oosterheem)",
      "VvE-complexen",
    ],
    afstanden: "Zoetermeer ligt op ±20 km van ons kantoor in Rotterdam — wij werken in de regio Rotterdam en omgeving.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Zoetermeer?",
        antwoord:
          "Zoetermeerse groeikernwoningen uit de jaren '60–'80 hebben vaak grote, vlakke geveloppervlakken — dat maakt ETICS hier relatief efficiënt uit te voeren. De prijs hangt verder af van de isolatiedikte en afwerking. Bij galerijflats is steigerwerk een extra kostenpost. Bekijk onze kostenpagina of vraag een opname aan.",
      },
      {
        vraag: "Zijn de jaren '70-woningen in Zoetermeer geschikt voor ETICS?",
        antwoord:
          "Ja, de typische naoorlogse bouw in Zoetermeer (enkelsteens of smalle spouw) leent zich uitstekend voor buitengevelisolatie. Wij beoordelen bij de opname of de ondergrond in orde is en adviseren over de juiste aanpak.",
      },
      {
        vraag: "Werkt BM klus BV ook samen met VvE's in Zoetermeer?",
        antwoord:
          "Ja, wij werken regelmatig samen met VvE's. Wij maken een offerte per m² op basis van het totale geveloppervlak en stemmen de planning af met het VvE-bestuur.",
      },
    ],
    bouwperiode: "Grotendeels jaren '66–'90, gebouwd als groeikern van Den Haag.",
    gemiddeldBesparing: "Indicatief €600–€900/jaar besparing bij een typische groeikernwoning (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "ISDE-subsidie voor gevelisolatie: €20,25/m² (bij één maatregel) of €40,50/m² (bij combinatie met andere isolatie). Min. 10 m², Rd ≥ 3,5 m²K/W. Raadpleeg rvo.nl voor actuele voorwaarden. Gemeente Zoetermeer biedt het Zoetermeers Duurzaamheidsfonds en de Energiecoach aan huis.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig, omdat het uiterlijk van de gevel verandert. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "Als groeikern zijn veel woningen in Zoetermeer snel gebouwd met minimale isolatie. ETICS is bijzonder effectief bij de typische enkelsteens gevels in Palenstein en Meerzicht.",
    gemeenteWebsite: "https://www.zoetermeer.nl/duurzaamheid",
    nearbyLocations: ["den-haag", "delft", "gouda", "leidschendam-voorburg", "leiden"],
  },
  {
    slug: "capelle-aan-den-ijssel",
    city: "Capelle aan den IJssel",
    region: "Zuid-Holland",
    title: "Gevelisolatie Capelle aan den IJssel – ETICS prijs per m²",
    description:
      "Buitengevelisolatie (ETICS) in Capelle aan den IJssel. Stuc, sierpleister of steenstrips. Opname op locatie, offerte per m². Direct naast Rotterdam.",
    h1: "Gevelisolatie in Capelle aan den IJssel",
    intro:
      "Capelle aan den IJssel groeide in de jaren '70 als overloopgebied van Rotterdam van 9.000 naar ruim 57.000 inwoners. In Schollevaar en Oostgaarde staan duizenden portiekflats en rijtjeshuizen die destijds snel werden gebouwd — veelal zonder of met minimale gevelisolatie. ETICS is voor deze woningen een effectieve en veelgekozen oplossing.",
    localContext:
      "Capelle aan den IJssel grenst direct aan Rotterdam en is vanaf de jaren '70 snel uitgebreid met wijken als Schollevaar (1970+), Oostgaarde en 's-Gravenland. De typische portiekflats, galerijflats en rijtjeshuizen uit de jaren '70–'85 hebben vaak ongeïsoleerde of slecht geïsoleerde gevels. Buitengevelisolatie is hier een effectieve en veelgekozen oplossing.",
    woningTypes: [
      "Portiekflats en galerijflats (Schollevaar, Oostgaarde)",
      "Naoorlogse rijtjeshuizen ('s-Gravenland)",
      "Eengezinswoningen (Schenkel, Middelwatering)",
      "VvE-complexen (flatgebouwen)",
    ],
    afstanden: "Capelle aan den IJssel grenst aan Rotterdam — wij werken in de regio Rotterdam en directe omgeving.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Capelle aan den IJssel?",
        antwoord:
          "Bij de portiekflats en galerijflats in Schollevaar en Oostgaarde biedt een collectieve VvE-aanpak schaalvoordeel, wat de prijs per woning drukt. Voor individuele rijtjeshuizen bepalen de geveloppervlakte en afwerking de kosten. Wij geven na opname een gespecificeerde offerte. Bekijk ook de richtprijzen op onze kostenpagina.",
      },
      {
        vraag: "Zijn de flats in Schollevaar geschikt voor gevelisolatie?",
        antwoord:
          "Ja, de portiekflats en galerijflats in Schollevaar en Oostgaarde zijn vanwege hun bouwperiode en gevelconstructie zeer geschikt voor ETICS. Wij werken hierbij samen met VvE-besturen voor een efficiënte aanpak.",
      },
      {
        vraag: "Hoe verloopt een VvE-project voor gevelisolatie in Capelle?",
        antwoord:
          "Bij een VvE-project starten wij met een opname van het hele complex. Vervolgens maken wij een offerte per m² en een projectplanning die wij afstemmen met het VvE-bestuur. Zo worden kosten transparant verdeeld en wordt overlast voor bewoners geminimaliseerd.",
      },
    ],
    bouwperiode: "Voornamelijk jaren '70–'85, als uitbreiding van Rotterdam.",
    gemiddeldBesparing: "Indicatief €600–€850/jaar besparing bij een portiekflat of rijtjeshuis (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "ISDE-subsidie voor gevelisolatie: €20,25/m² (bij één maatregel) of €40,50/m² (bij combinatie met andere isolatie). Min. 10 m², Rd ≥ 3,5 m²K/W. Raadpleeg rvo.nl voor actuele voorwaarden. Gemeente Capelle aan den IJssel biedt een Duurzaamheidslening en werkt samen met het Energieloket.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig, omdat het uiterlijk van de gevel verandert. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "De portiekflats in Schollevaar en Oostgaarde (bouwjaar '70–'85) zijn veelal volledig ongeïsoleerd. VvE-projecten met ETICS leveren direct merkbare comfort- en energieverbetering.",
    gemeenteWebsite: "https://www.capelleaandenijssel.nl/duurzaamheid",
    nearbyLocations: ["rotterdam", "ridderkerk", "hendrik-ido-ambacht"],
  },
  {
    slug: "spijkenisse",
    city: "Spijkenisse",
    region: "Zuid-Holland",
    title: "Gevelisolatie Spijkenisse – ETICS prijs per m²",
    description:
      "Buitengevelisolatie (ETICS) in Spijkenisse (Nissewaard). Stuc, sierpleister of steenstrips. Opname op locatie en offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Spijkenisse",
    intro:
      "Spijkenisse werd in 1966 aangewezen als groeikern en kreeg in korte tijd duizenden woningen erbij. De rijtjeshuizen en flats uit de jaren '70–'85 in wijken als de Akkers, Waterland en Vogelenzang hebben grote, ongeïsoleerde geveloppervlakken — ideaal voor buitengevelisolatie met sierpleister of steenstrips als afwerking.",
    localContext:
      "Spijkenisse is als groeikern sterk uitgebreid in de jaren '70–'80 met grote woonwijken als de Akkers, Groenewoud en Waterland. De massale woningbouw uit deze periode — rijtjeshuizen, twee-onder-een-kapwoningen en flats — heeft veelal enkelsteens of smalle spouwgevels zonder noemenswaardige isolatie. Buitengevelisolatie levert hier direct merkbaar comfort en energiebesparing op.",
    woningTypes: [
      "Rijtjeshuizen (de Akkers, Groenewoud)",
      "Twee-onder-een-kapwoningen (Waterland)",
      "Portiekflats en galerijflats",
      "Eengezinswoningen (Vogelenzang, de Hoek)",
    ],
    afstanden: "Spijkenisse ligt op ±20 km van ons kantoor in Rotterdam — wij werken in de regio Rotterdam en omgeving.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Spijkenisse?",
        antwoord:
          "De typische groeikernwoningen in Spijkenisse hebben grote, rechte geveloppervlakken — dat maakt ETICS hier efficiënt toepasbaar. De prijs wordt bepaald door de oppervlakte, isolatiedikte en afwerking (sierpleister of steenstrips). Bij de grotere woonblokken kan een gezamenlijke aanpak voordeliger zijn. Vraag een opname aan.",
      },
      {
        vraag: "Zijn de jaren '70-woningen in Spijkenisse geschikt voor ETICS?",
        antwoord:
          "Ja, de typische groeikernwoningen in Spijkenisse (bouwjaar '70–'85) zijn zeer geschikt voor buitengevelisolatie. De enkelsteens of smalle spouwgevels bieden weinig isolatiewaarde — ETICS brengt de gevel direct op het gewenste niveau.",
      },
      {
        vraag: "Werkt BM klus BV ook in andere kernen van Nissewaard?",
        antwoord:
          "Ja, ons werkgebied omvat de hele gemeente Nissewaard: Spijkenisse, Hekelingen, Zuidland, Abbenbroek en Heenvliet. Na een opname op locatie ontvangt u een vaste offerte per m².",
      },
    ],
    bouwperiode: "Grotendeels jaren '70–'85, gebouwd als groeikern (aangewezen in 1966).",
    gemiddeldBesparing: "Indicatief €550–€850/jaar besparing bij een typische groeikernwoning (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "ISDE-subsidie voor gevelisolatie: €20,25/m² (bij één maatregel) of €40,50/m² (bij combinatie met andere isolatie). Min. 10 m², Rd ≥ 3,5 m²K/W. Raadpleeg rvo.nl voor actuele voorwaarden. Gemeente Nissewaard biedt advies via het Energieloket Voorne-Putten.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig, omdat het uiterlijk van de gevel verandert. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "De groeikernwoningen in de Akkers en Groenewoud (bouwjaar '72–'85) hebben standaard minimale isolatie. ETICS verbetert de Rc-waarde naar 3,5+ (conform Bbl) en het energielabel met 1–3 stappen.",
    gemeenteWebsite: "https://www.nissewaard.nl/duurzaamheid",
    nearbyLocations: ["hellevoetsluis", "barendrecht", "rotterdam"],
  },
  {
    slug: "barendrecht",
    city: "Barendrecht",
    region: "Zuid-Holland",
    title: "Gevelisolatie Barendrecht – ETICS prijs per m²",
    description:
      "Buitengevelisolatie (ETICS) in Barendrecht. Stuc, sierpleister of steenstrips. Opname op locatie, offerte per m². Specialist direct naast Rotterdam.",
    h1: "Gevelisolatie in Barendrecht",
    intro:
      "Direct ten zuiden van Rotterdam ligt Barendrecht, met een mix van oudere dorpsbebouwing en de nieuwere wijk Carnisselande (gebouwd 1995–2005). Bij oudere woningen levert ETICS het grootste isolatie-effect; bij nieuwere huizen kan het een oplossing zijn als de spouw onvoldoende gevuld is. Wij beoordelen dit tijdens een gratis opname.",
    localContext:
      "Barendrecht ligt direct ten zuiden van Rotterdam en kent een mix van oudere dorpsbebouwing en grootschalige nieuwbouw (Carnisselande, jaren '90–'00). De oudere woningen in het dorp en de Oranjewijk hebben vaak slecht geïsoleerde gevels. Ook woningen uit de jaren '80–'90 profiteren van buitengevelisolatie, zeker wanneer de spouw niet of onvoldoende is gevuld.",
    woningTypes: [
      "Eengezinswoningen (Carnisselande)",
      "Oudere dorpswoningen (centrum Barendrecht)",
      "Rijtjeshuizen (Oranjewijk, Vrijheidsakker)",
      "Twee-onder-een-kapwoningen",
    ],
    afstanden: "Barendrecht ligt op ±16 km van ons kantoor in Rotterdam — wij werken in de regio Rotterdam en directe omgeving.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Barendrecht?",
        antwoord:
          "Het verschil tussen oudere dorpsbebouwing en nieuwere woningen in Carnisselande is ook zichtbaar in de kosten: oudere gevels zonder isolatie bieden het meeste rendement, terwijl bij nieuwbouw eerst moet worden beoordeeld of ETICS meerwaarde heeft. De prijs hangt af van oppervlakte en afwerking. Vraag een gratis opname aan.",
      },
      {
        vraag: "Zijn de woningen in Carnisselande geschikt voor ETICS?",
        antwoord:
          "Woningen in Carnisselande (bouwjaar '95–'05) hebben doorgaans een betere basisisolatie, maar kunnen alsnog profiteren van buitengevelisolatie — vooral wanneer de spouw onvoldoende is gevuld of de Rc-waarde onder de huidige norm ligt. Wij beoordelen dit bij de opname.",
      },
      {
        vraag: "Wat is het verschil in aanpak tussen oudere dorpswoningen en Carnisselande?",
        antwoord:
          "Oudere dorpswoningen (centrum Barendrecht, Oranjewijk) hebben vaak enkelsteens gevels met minimale isolatie — hier levert ETICS de grootste energiebesparing op. Woningen in Carnisselande (vinex, 1997–2004) hebben een betere basisisolatie; een energiescan bepaalt of ETICS daar meerwaarde biedt.",
      },
    ],
    bouwperiode: "Mix van oudere dorpsbebouwing en vinex-nieuwbouw (Carnisselande, 1997–2004).",
    gemiddeldBesparing: "Indicatief €400–€700/jaar besparing. Nieuwere woningen (Carnisselande) hebben een lagere besparing dan oudere dorpswoningen (bron: Milieu Centraal).",
    subsidieInfo: "ISDE-subsidie voor gevelisolatie: €20,25/m² (bij één maatregel) of €40,50/m² (bij combinatie met andere isolatie). Min. 10 m², Rd ≥ 3,5 m²K/W. Raadpleeg rvo.nl voor actuele voorwaarden. Gemeente Barendrecht biedt de Duurzaamheidslening via het Energieloket BAR-gemeenten.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig, omdat het uiterlijk van de gevel verandert. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "De oudere dorpswoningen in het centrum van Barendrecht profiteren het meest. Woningen in Carnisselande (vinex, 1997–2004) hebben vaak al een betere basisisolatie — een energiescan bepaalt of ETICS meerwaarde biedt.",
    gemeenteWebsite: "https://www.barendrecht.nl/duurzaamheid",
    nearbyLocations: ["rotterdam", "ridderkerk", "dordrecht", "hendrik-ido-ambacht"],
  },
  {
    slug: "ridderkerk",
    city: "Ridderkerk",
    region: "Zuid-Holland",
    title: "Gevelisolatie Ridderkerk – ETICS prijs per m²",
    description:
      "Buitengevelisolatie (ETICS) in Ridderkerk. Stuc, sierpleister of steenstrips. Opname op locatie en offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Ridderkerk",
    intro:
      "Op het eiland IJsselmonde ligt Ridderkerk, waar ruim 35% van de woningen stamt uit de periode 1950–1970. In Drievliet, Bolnes en Slikkerveer treffen wij regelmatig enkelsteens gevels aan die nooit zijn nageïsoleerd. Buitengevelisolatie pakt dit probleem effectief aan zonder dat u binnenruimte inlevert.",
    localContext:
      "Ridderkerk ligt op het eiland IJsselmonde, direct ten zuiden van Rotterdam. De gemeente kent veel naoorlogse woningbouw in wijken als Drievliet, Bolnes en het centrum. Deze woningen — rijtjeshuizen en portiekflats met enkelsteens gevels — zijn ideaal voor buitengevelisolatie. Ook in de oudere dorpskernen (Slikkerveer, Rijsoord) zijn er mogelijkheden.",
    woningTypes: [
      "Naoorlogse rijtjeshuizen (Drievliet, centrum)",
      "Portiekflats (Bolnes)",
      "Eengezinswoningen (Rijsoord)",
      "Twee-onder-een-kapwoningen (Slikkerveer)",
    ],
    afstanden: "Ridderkerk ligt op ±15 km van ons kantoor in Rotterdam — wij werken in de regio Rotterdam en directe omgeving.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Ridderkerk?",
        antwoord:
          "De meeste woningen in Ridderkerk stammen uit de periode 1950–1970 en hebben compacte gevels. Dat maakt ETICS hier een overzichtelijke investering. De exacte prijs hangt af van de oppervlakte, de staat van het metselwerk en de gekozen afwerking. Bekijk onze kostenpagina of plan een gratis opname.",
      },
      {
        vraag: "Werkt BM klus BV ook in Bolnes en Slikkerveer?",
        antwoord:
          "Ja, wij werken in heel Ridderkerk inclusief Bolnes, Slikkerveer, Rijsoord en Drievliet. Na een opname op locatie ontvangt u een vaste offerte per m².",
      },
      {
        vraag: "Hoe verschilt gevelisolatie bij een enkelsteens woning van een spouwmuurwoning?",
        antwoord:
          "Enkelsteens woningen (veel voorkomend in Drievliet en Bolnes) hebben een Rc-waarde van 0,2–0,4. Hier is ETICS de meest effectieve methode. Bij spouwmuurwoningen kan eerst spouwvulling overwogen worden. Wij beoordelen dit bij de opname.",
      },
    ],
    bouwperiode: "Overwegend jaren '50–'70 met naoorlogse wijken op IJsselmonde.",
    gemiddeldBesparing: "Indicatief €550–€850/jaar besparing bij een naoorlogs rijtjeshuis (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "ISDE-subsidie voor gevelisolatie: €20,25/m² (bij één maatregel) of €40,50/m² (bij combinatie met andere isolatie). Min. 10 m², Rd ≥ 3,5 m²K/W. Raadpleeg rvo.nl voor actuele voorwaarden. Gemeente Ridderkerk biedt advies via het Energieloket BAR-gemeenten.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig, omdat het uiterlijk van de gevel verandert. In historische dorpskernen kunnen aanvullende eisen gelden. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "De naoorlogse woningen in Drievliet en Bolnes hebben enkelsteens gevels met een Rc-waarde van 0,2–0,4. ETICS is hier doorgaans de meest effectieve isolatiemethode.",
    gemeenteWebsite: "https://www.ridderkerk.nl/duurzaamheid",
    nearbyLocations: ["rotterdam", "barendrecht", "dordrecht", "hendrik-ido-ambacht"],
  },
  {
    slug: "alphen-aan-den-rijn",
    city: "Alphen aan den Rijn",
    region: "Zuid-Holland",
    title: "Gevelisolatie Alphen aan den Rijn – ETICS prijs per m²",
    description:
      "Buitengevelisolatie (ETICS) in Alphen aan den Rijn. Stuc, sierpleister of steenstrips. Opname op locatie, offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Alphen aan den Rijn",
    intro:
      "Midden in het Groene Hart ligt Alphen aan den Rijn, een gemeente met meer dan 100.000 inwoners en een gevarieerd woningbestand. De naoorlogse wijken Ridderveld, Kerk en Zanen en Lage Zijde bevatten rijtjeshuizen en flats waar buitengevelisolatie een flinke verbetering kan opleveren. Wij maken een opname op locatie en adviseren over de juiste aanpak.",
    localContext:
      "Alphen aan den Rijn is een middelgrote stad met een gevarieerd woningbestand. De naoorlogse wijken (Ridderveld, De Baronie, Kerk en Zanen) bevatten veel rijtjeshuizen en flats met ongeïsoleerde of slecht geïsoleerde gevels. Buitengevelisolatie is een effectieve maatregel die zowel het wooncomfort als de energieprestatie aanzienlijk verbetert.",
    woningTypes: [
      "Naoorlogse rijtjeshuizen (Ridderveld, De Baronie)",
      "Portiekflats (Kerk en Zanen)",
      "Eengezinswoningen (Nieuwe Sloot)",
      "Twee-onder-een-kapwoningen",
    ],
    afstanden: "Alphen aan den Rijn ligt op ±40 km van ons kantoor in Rotterdam — wij werken in de regio Rotterdam en omgeving.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Alphen aan den Rijn?",
        antwoord:
          "De kosten worden bepaald door de oppervlakte, afwerking en eventuele bijzonderheden van de ondergrond. In het veenweidegebied rond Alphen is aandacht voor de plint-zone en vochtbeheersing extra belangrijk, wat de uitvoering kan beïnvloeden. Wij geven na opname een heldere offerte per m². Bekijk ook onze kostenpagina.",
      },
      {
        vraag: "Werkt BM klus BV ook in Boskoop en Hazerswoude?",
        antwoord:
          "Ja, ons werkgebied omvat heel Alphen aan den Rijn en de omliggende kernen: Boskoop, Hazerswoude-Rijndijk, Hazerswoude-Dorp en Zwammerdam.",
      },
      {
        vraag: "Heb ik een vergunning nodig voor gevelisolatie in Alphen aan den Rijn?",
        antwoord:
          "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig, omdat het uiterlijk van de gevel verandert. In het centrum van Alphen aan den Rijn kunnen aanvullende welstandseisen gelden. Controleer de actuele regels via het Omgevingsloket of neem contact op met de gemeente.",
      },
    ],
    bouwperiode: "Naoorlogse uitbreidingswijken (jaren '60–'80) en nieuwere vinexlocaties.",
    gemiddeldBesparing: "Indicatief €550–€800/jaar besparing bij een rijtjeshuis in Ridderveld of De Baronie (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "ISDE-subsidie voor gevelisolatie: €20,25/m² (bij één maatregel) of €40,50/m² (bij combinatie met andere isolatie). Min. 10 m², Rd ≥ 3,5 m²K/W. Raadpleeg rvo.nl voor actuele voorwaarden. Gemeente Alphen aan den Rijn biedt de Duurzaamheidslening en een gratis energieadvies.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig, omdat het uiterlijk van de gevel verandert. In het centrum van Alphen aan den Rijn kunnen aanvullende regels gelden. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "De jaren '70-woningen in Ridderveld en De Baronie hebben een Rc-waarde van 0,3–0,5. Na ETICS stijgt deze naar 3,5+ (conform Bbl) en verbetert het energielabel aanzienlijk.",
    gemeenteWebsite: "https://www.alphenaandenrijn.nl/duurzaamheid",
    nearbyLocations: ["leiden", "gouda", "zoetermeer"],
  },
  {
    slug: "maassluis",
    city: "Maassluis",
    region: "Zuid-Holland",
    title: "Gevelisolatie Maassluis – ETICS prijs per m²",
    description:
      "Buitengevelisolatie (ETICS) in Maassluis. Stuc, sierpleister of steenstrips. Opname op locatie en offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Maassluis",
    intro:
      "Tussen Rotterdam en Hoek van Holland ligt Maassluis — een compacte stad met naoorlogse portiekflats in Sluispolder en nieuwere eengezinswoningen in het Balkon en de Dijkpolder. Bij gevelisolatie is het hier extra belangrijk om de plint-zone en vochthuishouding goed te controleren. Wij doen dit altijd tijdens de opname.",
    localContext:
      "Maassluis ligt tussen Rotterdam en Hoek van Holland en kent een compacte mix van naoorlogse woningbouw en nieuwere uitbreidingen. De wijk Sluispolder bevat veel naoorlogse portiekflats en rijtjeshuizen die baat hebben bij buitengevelisolatie. Het Balkon (2007+) en de Dijkpolder zijn nieuwere wijken met modernere woningen, maar ook daar kan ETICS meerwaarde bieden bij onvoldoende gevuld spouwwerk.",
    woningTypes: [
      "Naoorlogse rijtjeshuizen en portiekflats (Sluispolder)",
      "Eengezinswoningen (Dijkpolder, het Balkon)",
      "Vooroorlogse woningen (centrum)",
      "Twee-onder-een-kapwoningen",
    ],
    afstanden: "Maassluis ligt op ±16 km van ons kantoor in Rotterdam — wij werken in de regio Rotterdam en omgeving.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Maassluis?",
        antwoord:
          "De prijs hangt af van de oppervlakte en afwerking. Bij naoorlogse portiekflats in Sluispolder is de plint-zone een aandachtspunt dat de uitvoering kan beïnvloeden. Wij controleren altijd de vochthuishouding vóór isolatie en verwerken dit in een gespecificeerde offerte. Bekijk ook de richtprijzen op onze kostenpagina.",
      },
      {
        vraag: "Werkt BM klus BV ook in Maasland en Hoek van Holland?",
        antwoord:
          "Ja, ons werkgebied omvat heel Maassluis en de omliggende gebieden, inclusief Maasland en Hoek van Holland.",
      },
      {
        vraag: "Waar let BM klus BV op bij gevelisolatie in Maassluis?",
        antwoord:
          "Bij woningen in Maassluis controleren wij altijd de plint-zone en het vochtgedrag van de gevel. Eventuele vochtproblemen moeten vooraf worden opgelost, zodat ETICS duurzaam en veilig kan worden aangebracht. Dit beoordelen wij bij de opname.",
      },
    ],
    bouwperiode: "Overwegend jaren '60–'80 met compacte naoorlogse wijken.",
    gemiddeldBesparing: "Indicatief €500–€750/jaar besparing bij een rijtjeshuis (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "ISDE-subsidie voor gevelisolatie: €20,25/m² (bij één maatregel) of €40,50/m² (bij combinatie met andere isolatie). Min. 10 m², Rd ≥ 3,5 m²K/W. Raadpleeg rvo.nl voor actuele voorwaarden. Gemeente Maassluis biedt advies via het regionaal Energieloket.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig, omdat het uiterlijk van de gevel verandert. In het oude centrum van Maassluis kunnen aanvullende eisen gelden. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "De rijtjeshuizen in Sluispolder en het Balkon (bouwjaar '60–'80) zijn typisch ongeïsoleerd. Bij vochtproblematiek is een voorafgaand vochtonderzoek noodzakelijk — wij controleren dit bij de opname.",
    gemeenteWebsite: "https://www.maassluis.nl/duurzaamheid",
    nearbyLocations: ["vlaardingen", "schiedam", "hellevoetsluis", "delft"],
  },
  {
    slug: "hellevoetsluis",
    city: "Hellevoetsluis",
    region: "Zuid-Holland",
    title: "Gevelisolatie Hellevoetsluis – ETICS prijs per m²",
    description:
      "Buitengevelisolatie (ETICS) in Hellevoetsluis. Stuc, sierpleister of steenstrips. Opname op locatie en offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Hellevoetsluis",
    intro:
      "De voormalige vestingstad Hellevoetsluis op Voorne-Putten combineert een beschermd vestinggebied met naoorlogse en nieuwere woonwijken. In de Vesting gelden aanvullende regels voor het uiterlijk van de gevel; daarbuiten zijn rijtjeshuizen uit de jaren '70–'90 bijzonder geschikt voor ETICS. Wij adviseren ter plekke over de mogelijkheden.",
    localContext:
      "Hellevoetsluis ligt op Voorne-Putten en kent een mix van historische vestingbouw en naoorlogse uitbreidingswijken. De wijken Nieuw-Helvoet en het Zuiderpark bevatten veel rijtjeshuizen en eengezinswoningen uit de jaren '70–'90 die profiteren van buitengevelisolatie. In de vesting gelden soms aanvullende regels.",
    woningTypes: [
      "Rijtjeshuizen (Nieuw-Helvoet, Zuiderpark)",
      "Eengezinswoningen (Kickersbloem)",
      "Twee-onder-een-kapwoningen",
      "Historische panden in de Vesting (met maatwerk)",
    ],
    afstanden: "Hellevoetsluis ligt op ±35 km van ons kantoor in Rotterdam — wij werken in de regio Rotterdam en omgeving.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Hellevoetsluis?",
        antwoord:
          "Buiten de Vesting zijn de kosten vergelijkbaar met standaard ETICS-projecten; de prijs hangt af van oppervlakte, isolatiedikte en afwerking. Binnen het vestinggebied kunnen aanvullende eisen aan materiaal en kleur de kosten verhogen. Door de kustligging besteden wij extra aandacht aan weerbestendige afwerking. Vraag een opname aan.",
      },
      {
        vraag: "Werkt BM klus BV ook in Brielle en Oostvoorne?",
        antwoord:
          "Ja, ons werkgebied omvat heel Voorne-Putten: Hellevoetsluis, Brielle, Oostvoorne, Rockanje en Zuidland.",
      },
      {
        vraag: "Gelden er extra regels voor gevelisolatie in de Vesting van Hellevoetsluis?",
        antwoord:
          "Ja, de Vesting van Hellevoetsluis is sinds 1985 rijksbeschermd dorpsgezicht (68,9 ha). Hier gelden aanvullende eisen voor het uiterlijk van de gevel. Wij checken vooraf bij de gemeente welke afwerkingen zijn toegestaan en welke vergunningen nodig zijn.",
      },
    ],
    bouwperiode: "Mix van historische vestingbouw en naoorlogse uitbreiding (jaren '70–'90).",
    gemiddeldBesparing: "Indicatief €500–€750/jaar besparing bij een eengezinswoning (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "ISDE-subsidie voor gevelisolatie: €20,25/m² (bij één maatregel) of €40,50/m² (bij combinatie met andere isolatie). Min. 10 m², Rd ≥ 3,5 m²K/W. Raadpleeg rvo.nl voor actuele voorwaarden. Gemeente Voorne aan Zee biedt advies via het Energieloket Voorne-Putten.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig. De Vesting van Hellevoetsluis is sinds 1985 beschermd dorpsgezicht (68,9 ha), hier gelden aanvullende eisen. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "Bij woningen op Voorne-Putten kan vocht een aandachtspunt zijn. Wij controleren bij de opname altijd op vochtproblemen en ventilatie, zodat ETICS duurzaam en veilig wordt aangebracht.",
    gemeenteWebsite: "https://www.voornenaanzee.nl/duurzaamheid",
    nearbyLocations: ["spijkenisse", "maassluis", "rotterdam"],
  },
  {
    slug: "breda",
    city: "Breda",
    region: "Noord-Brabant",
    title: "Gevelisolatie Breda – ETICS prijs per m²",
    description:
      "Buitengevelisolatie (ETICS) in Breda en omgeving. Stuc, sierpleister of steenstrips. Opname op locatie en offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Breda",
    intro:
      "Als grootste stad van West-Brabant heeft Breda een omvangrijk woningbestand met portiekflats en rijtjeshuizen in wijken als Hoge Vucht, Brabantpark en Geeren-Zuid. Voor VvE-complexen werken wij met een heldere projectaanpak; voor particulieren beginnen wij met een opname op locatie en offerte per m².",
    localContext:
      "Breda is de grootste stad in West-Brabant met een gevarieerd woningbestand. De naoorlogse wijken Hoge Vucht, Brabantpark en Geeren-Zuid bevatten veel portiekflats en rijtjeshuizen die toe zijn aan een isolatie-upgrade. Ook in Princenhage en Tuinzigt zijn er veel woningen met ongeïsoleerde gevels. Buitengevelisolatie is hier een populaire en effectieve maatregel.",
    woningTypes: [
      "Portiekflats en galerijflats (Hoge Vucht, Geeren-Zuid)",
      "Naoorlogse rijtjeshuizen (Brabantpark)",
      "Eengezinswoningen (Princenhage, Tuinzigt)",
      "Twee-onder-een-kapwoningen",
      "VvE-complexen",
    ],
    afstanden: "Breda ligt op ±55 km van ons kantoor in Rotterdam — wij werken in de regio Rotterdam en omgeving.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Breda?",
        antwoord:
          "De prijs hangt af van de oppervlakte, afwerking en de complexiteit van het project. Bij VvE-complexen in Hoge Vucht of Geeren-Zuid biedt collectieve aanpak schaalvoordeel. Voor particuliere rijtjeshuizen maken wij een offerte op basis van opname. Bekijk de richtprijzen op onze kostenpagina of plan een gratis opname.",
      },
      {
        vraag: "Werkt een Rotterdams bedrijf ook in Breda?",
        antwoord:
          "Ja, Breda (±55 km) valt binnen ons werkgebied rond Rotterdam. Wij werken regelmatig in West-Brabant. Na een opname op locatie ontvangt u een vaste offerte per m².",
      },
      {
        vraag: "Werkt BM klus BV ook in Oosterhout en Etten-Leur?",
        antwoord:
          "Ja, ons werkgebied omvat heel Breda en omliggende gemeenten: Oosterhout, Etten-Leur, Prinsenbeek en Teteringen.",
      },
    ],
    bouwperiode: "Grote naoorlogse wijken (jaren '50–'70) en nieuwere uitbreidingswijken.",
    gemiddeldBesparing: "Indicatief €600–€900/jaar besparing bij een naoorlogs rijtjeshuis of portiekflat (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "ISDE-subsidie voor gevelisolatie: €20,25/m² (bij één maatregel) of €40,50/m² (bij combinatie met andere isolatie). Min. 10 m², Rd ≥ 3,5 m²K/W. Raadpleeg rvo.nl voor actuele voorwaarden. Gemeente Breda biedt de Toekomstbestendig Wonen Lening en gratis advies via de Energie Bespaar Coach.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig. De binnenstad van Breda heeft drie beschermde gezichten: het centrum (sinds 1967), de uitbreiding (2013) en Ginneken (1991). Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "De portiekflats in Hoge Vucht en Geeren-Zuid behoren tot de slechtst geïsoleerde woningen in West-Brabant. Collectieve ETICS-projecten via de VvE leveren hier de grootste besparingen op.",
    gemeenteWebsite: "https://www.breda.nl/duurzaam",
    nearbyLocations: ["bergen-op-zoom", "roosendaal"],
  },
  {
    slug: "bergen-op-zoom",
    city: "Bergen op Zoom",
    region: "Noord-Brabant",
    title: "Gevelisolatie Bergen op Zoom – ETICS prijs per m²",
    description:
      "Buitengevelisolatie (ETICS) in Bergen op Zoom en omgeving. Stuc, sierpleister of steenstrips. Opname op locatie, offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Bergen op Zoom",
    intro:
      "Aan de westrand van Noord-Brabant ligt Bergen op Zoom, met een beschermd historisch centrum en naoorlogse uitbreidingswijken als Gageldonk, Noordgeest en Fort-Zeekant. De woningen uit de jaren '60–'80 in deze wijken zijn het meest geschikt voor buitengevelisolatie. Wij werken in de regio vanuit ons project in nabijgelegen Halsteren.",
    localContext:
      "Bergen op Zoom ligt aan de westrand van Noord-Brabant en kent naast een historische binnenstad zowel naoorlogse wijken (Gageldonk, Noordgeest, Fort-Zeekant) als nieuwere uitbreidingen (Bergse Plaat, 1990–2008). De naoorlogse woningen uit de jaren '60–'80 zijn het meest geschikt voor buitengevelisolatie. In de binnenstad gelden aanvullende regels vanwege het beschermde stadsgezicht.",
    woningTypes: [
      "Rijtjeshuizen (Gageldonk, Noordgeest)",
      "Eengezinswoningen (Bergse Plaat)",
      "Portiekflats (Fort-Zeekant)",
      "Historische panden binnenstad (met maatwerk)",
    ],
    afstanden: "Bergen op Zoom ligt op ±65 km van ons kantoor in Rotterdam — wij werken in de regio Rotterdam en omgeving.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Bergen op Zoom?",
        antwoord:
          "De kosten worden bepaald door de oppervlakte, isolatiedikte en afwerking. In het beschermd stadsgezicht van de binnenstad gelden aanvullende eisen die de prijs beïnvloeden. In naoorlogse wijken als Gageldonk en Noordgeest is standaard ETICS met sierpleister doorgaans de voordeligste optie. Vraag een opname aan voor een offerte op maat.",
      },
      {
        vraag: "Valt Bergen op Zoom binnen het werkgebied van BM klus BV?",
        antwoord:
          "Ja, Bergen op Zoom (±65 km) valt binnen ons werkgebied rond Rotterdam. Wij werken regelmatig in West-Brabant en hebben recent nog een project in Halsteren uitgevoerd. Na een opname op locatie ontvangt u een vaste offerte per m².",
      },
      {
        vraag: "Heb ik een vergunning nodig in Bergen op Zoom?",
        antwoord:
          "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig. De binnenstad van Bergen op Zoom is sinds 1986 rijksbeschermd stadsgezicht (49,9 ha), hier gelden aanvullende eisen. Controleer de actuele regels via het Omgevingsloket.",
      },
    ],
    bouwperiode: "Naoorlogse uitbreidingswijken (jaren '60–'80) naast historische vestingstad.",
    gemiddeldBesparing: "Indicatief €500–€800/jaar besparing bij een eengezinswoning of rijtjeshuis (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "ISDE-subsidie voor gevelisolatie: €20,25/m² (bij één maatregel) of €40,50/m² (bij combinatie met andere isolatie). Min. 10 m², Rd ≥ 3,5 m²K/W. Raadpleeg rvo.nl voor actuele voorwaarden. Gemeente Bergen op Zoom biedt de Duurzaamheidslening en advies via het West-Brabants Energieloket.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig. De binnenstad van Bergen op Zoom is sinds 1986 rijksbeschermd stadsgezicht (49,9 ha), hier gelden aanvullende eisen. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "Bergen op Zoom ligt nabij het Markiezaatsmeer en de Oosterschelde. Bij vochtgevoelige gevels controleren wij vooraf op vochtproblemen, zodat ETICS duurzaam en veilig wordt aangebracht.",
    gemeenteWebsite: "https://www.bergenopzoom.nl/duurzaamheid",
    nearbyLocations: ["roosendaal", "breda"],
  },
  {
    slug: "roosendaal",
    city: "Roosendaal",
    region: "Noord-Brabant",
    title: "Gevelisolatie Roosendaal – ETICS prijs per m²",
    description:
      "Buitengevelisolatie (ETICS) in Roosendaal. Stuc, sierpleister of steenstrips. Opname op locatie en offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Roosendaal",
    intro:
      "Roosendaal — het eerste spoorwegknooppunt van Nederland — kent grote naoorlogse woonwijken als Langdonk, Kroeven en Tolberg met compacte rijtjeshuizen en portiekflats. Door de relatief kleine geveloppervlakken per woning is ETICS hier een efficiënte investering. Wij beoordelen de gevel op locatie en geven een eerlijk advies.",
    localContext:
      "Roosendaal is een centrumgemeente in West-Brabant met veel naoorlogse woonwijken. De Kroeven, Langdonk en Tolberg zijn typische voorbeelden van jaren '60–'80-bouw met rijtjeshuizen en portiekflats die baat hebben bij buitengevelisolatie. De compacte gevelindeling maakt ETICS hier bijzonder kosteneffectief.",
    woningTypes: [
      "Naoorlogse rijtjeshuizen (Kroeven, Langdonk)",
      "Portiekflats (Tolberg)",
      "Eengezinswoningen (Kalsdonk)",
      "Twee-onder-een-kapwoningen",
    ],
    afstanden: "Roosendaal ligt op ±57 km van ons kantoor in Rotterdam — wij werken in de regio Rotterdam en omgeving.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Roosendaal?",
        antwoord:
          "Roosendaalse rijtjeshuizen in Langdonk, Kroeven en Tolberg hebben relatief compacte gevels, wat de totale investering per woning beheersbaar maakt. De prijs per m² hangt af van de isolatiedikte en de afwerking (sierpleister, steenstrips of schilderwerk). Wij geven na opname een gespecificeerde offerte. Bekijk ook onze kostenpagina.",
      },
      {
        vraag: "Werkt BM klus BV ook in Nispen en Wouw?",
        antwoord:
          "Ja, ons werkgebied omvat heel Roosendaal en de omliggende kernen: Nispen, Wouw en Heerle.",
      },
      {
        vraag: "Valt Roosendaal binnen het werkgebied?",
        antwoord:
          "Ja, Roosendaal (±57 km) valt binnen ons werkgebied rond Rotterdam. Wij werken regelmatig in West-Brabant. Na een opname op locatie ontvangt u een vaste offerte per m².",
      },
    ],
    bouwperiode: "Overwegend jaren '60–'80 met typische naoorlogse woonwijken.",
    gemiddeldBesparing: "Indicatief €550–€800/jaar besparing bij een rijtjeshuis in Kroeven of Langdonk (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "ISDE-subsidie voor gevelisolatie: €20,25/m² (bij één maatregel) of €40,50/m² (bij combinatie met andere isolatie). Min. 10 m², Rd ≥ 3,5 m²K/W. Raadpleeg rvo.nl voor actuele voorwaarden. Gemeente Roosendaal biedt advies via het West-Brabants Energieloket en de gemeentelijke Duurzaamheidslening.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig, omdat het uiterlijk van de gevel verandert. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "De naoorlogse rijtjeshuizen in Kroeven en Tolberg hebben een compacte gevelindeling die ETICS bijzonder kosteneffectief maakt — relatief veel m² oppervlak per woning.",
    gemeenteWebsite: "https://www.roosendaal.nl/verduurzamen-van-uw-woning",
    nearbyLocations: ["bergen-op-zoom", "breda"],
  },
  {
    slug: "leidschendam-voorburg",
    city: "Leidschendam-Voorburg",
    region: "Zuid-Holland",
    title: "Gevelisolatie Leidschendam-Voorburg – ETICS prijs per m²",
    description:
      "Buitengevelisolatie (ETICS) in Leidschendam-Voorburg. Stuc, sierpleister of steenstrips. Opname op locatie, offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Leidschendam-Voorburg",
    intro:
      "De tweelingegemeente Leidschendam-Voorburg vraagt een verschillende aanpak per deel: Voorburg heeft historische panden waar maatwerk nodig is, terwijl Leidschendam-Noord en Prinsenhof naoorlogse flats en rijtjeshuizen bevatten die standaard met ETICS geïsoleerd kunnen worden. Wij bekijken beide situaties tijdens een gratis opname.",
    localContext:
      "Leidschendam-Voorburg ligt tussen Den Haag en Zoetermeer en kent een mix van vooroorlogse bebouwing in Voorburg en naoorlogse uitbreidingswijken in Leidschendam. De Heuvel, Prinsenhof en Leidschendam-Noord bevatten veel rijtjeshuizen en flats uit de jaren '60–'80 die geschikt zijn voor buitengevelisolatie.",
    woningTypes: [
      "Naoorlogse rijtjeshuizen (de Heuvel, Prinsenhof)",
      "Portiekflats (Leidschendam-Noord)",
      "Vooroorlogse woningen (Voorburg centrum)",
      "Eengezinswoningen (Stompwijk)",
    ],
    afstanden: "Leidschendam-Voorburg ligt op ±25 km van ons kantoor in Rotterdam — wij werken in de regio Rotterdam en omgeving.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Leidschendam-Voorburg?",
        antwoord:
          "De kosten verschillen per stadsdeel: bij historische panden in Voorburg is maatwerk nodig dat de prijs verhoogt, terwijl naoorlogse flats en rijtjeshuizen in Leidschendam-Noord standaard met ETICS behandeld kunnen worden. De prijs per m² hangt af van oppervlakte en afwerking. Vraag een gratis opname aan voor een exacte offerte.",
      },
      {
        vraag: "Werkt BM klus BV ook in Stompwijk?",
        antwoord:
          "Ja, ons werkgebied omvat heel Leidschendam-Voorburg inclusief Stompwijk en omliggende gebieden.",
      },
      {
        vraag: "Gelden er extra regels voor historische panden in Voorburg?",
        antwoord:
          "Voorburg kent historische panden waarvoor aanvullende welstandseisen kunnen gelden. Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig. Wij checken vooraf bij de gemeente welke mogelijkheden er zijn en welke afwerkingen zijn toegestaan.",
      },
      {
        vraag: "Zijn de flats in Leidschendam-Noord geschikt voor ETICS?",
        antwoord:
          "Ja, de jaren '70-flats in Leidschendam-Noord hebben veelal ongeïsoleerde gevels. VvE-projecten met ETICS zijn hier een effectieve oplossing — wij werken samen met het VvE-bestuur voor planning en uitvoering.",
      },
    ],
    bouwperiode: "Mix van vooroorlogse bebouwing (Voorburg) en naoorlogse uitbreidingswijken (Leidschendam, jaren '60–'80).",
    gemiddeldBesparing: "Indicatief €500–€800/jaar besparing bij een rijtjeshuis of bovenwoning (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "ISDE-subsidie voor gevelisolatie: €20,25/m² (bij één maatregel) of €40,50/m² (bij combinatie met andere isolatie). Min. 10 m², Rd ≥ 3,5 m²K/W. Raadpleeg rvo.nl voor actuele voorwaarden. Gemeente Leidschendam-Voorburg biedt de Duurzaamheidslening en het Energieloket Haaglanden.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig. In Voorburg zijn historische panden waarvoor aanvullende welstandseisen kunnen gelden. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "De jaren '70-flats in Leidschendam-Noord hebben veelal ongeïsoleerde gevels. VvE-projecten met ETICS zijn hier een effectieve oplossing.",
    gemeenteWebsite: "https://www.lv.nl/duurzaam-wonen-en-leven",
    nearbyLocations: ["den-haag", "delft", "zoetermeer"],
  },
  {
    slug: "hendrik-ido-ambacht",
    city: "Hendrik-Ido-Ambacht",
    region: "Zuid-Holland",
    title: "Gevelisolatie Hendrik-Ido-Ambacht – ETICS prijs per m²",
    description:
      "Buitengevelisolatie (ETICS) in Hendrik-Ido-Ambacht. Stuc, sierpleister of steenstrips. Opname op locatie en offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Hendrik-Ido-Ambacht",
    intro:
      "Binnen de Drechtsteden is Hendrik-Ido-Ambacht een snel groeiende gemeente met een bijzondere mix: oudere dorpsbebouwing in Sandelingen en Oud-Ambacht naast de moderne Vinex-wijk Volgerlanden. Voor de oudere woningen levert buitengevelisolatie het meeste rendement; bij nieuwere woningen beoordelen wij eerst of ETICS meerwaarde heeft.",
    localContext:
      "Hendrik-Ido-Ambacht is een snelgroeiende gemeente op het eiland IJsselmonde met zowel oudere dorpsbebouwing als de grote nieuwbouwwijk Volgerlanden. De oudere woningen in Oud-Ambacht en de Sandelingen hebben vaak matig geïsoleerde gevels. Buitengevelisolatie is hier een effectieve aanpak voor zowel energiebesparing als een frisse uitstraling.",
    woningTypes: [
      "Eengezinswoningen (Volgerlanden)",
      "Oudere dorpswoningen (Oud-Ambacht)",
      "Rijtjeshuizen (Sandelingen)",
      "Twee-onder-een-kapwoningen",
    ],
    afstanden: "Hendrik-Ido-Ambacht ligt op ±19 km van ons kantoor in Rotterdam — wij werken in de regio Rotterdam en omgeving.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Hendrik-Ido-Ambacht?",
        antwoord:
          "Voor oudere woningen in Sandelingen of Oud-Ambacht levert ETICS het meeste rendement en zijn de kosten vergelijkbaar met standaardprojecten. Bij nieuwere woningen in de Volgerlanden beoordelen wij eerst of buitengevelisolatie meerwaarde biedt. De prijs per m² hangt af van oppervlakte en afwerking. Plan een gratis opname voor een offerte.",
      },
      {
        vraag: "Werkt BM klus BV ook in Zwijndrecht en Papendrecht?",
        antwoord:
          "Ja, ons werkgebied omvat de hele Drechtsteden-regio: Hendrik-Ido-Ambacht, Zwijndrecht, Papendrecht, Sliedrecht en Alblasserdam.",
      },
      {
        vraag: "Heeft ETICS zin bij nieuwere woningen in de Volgerlanden?",
        antwoord:
          "Woningen in de Volgerlanden (2005+) hebben een moderne isolatiestandaard en profiteren doorgaans minder van ETICS dan oudere woningen. De oudere panden in Oud-Ambacht en de Sandelingen (jaren '60–'80) hebben echter een lage Rc-waarde en profiteren sterk. Wij beoordelen dit bij de opname.",
      },
    ],
    bouwperiode: "Mix van oudere dorpsbebouwing en nieuwbouw (Volgerlanden, vanaf 2005).",
    gemiddeldBesparing: "Indicatief €400–€700/jaar besparing. Oudere woningen in Oud-Ambacht profiteren het meest (bron: Milieu Centraal).",
    subsidieInfo: "ISDE-subsidie voor gevelisolatie: €20,25/m² (bij één maatregel) of €40,50/m² (bij combinatie met andere isolatie). Min. 10 m², Rd ≥ 3,5 m²K/W. Raadpleeg rvo.nl voor actuele voorwaarden. Gemeente Hendrik-Ido-Ambacht biedt advies via het Energieloket Drechtsteden.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig, omdat het uiterlijk van de gevel verandert. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "De woningen in Volgerlanden (2005+) hebben een moderne isolatiestandaard. De oudere woningen in Oud-Ambacht en de Sandelingen (jaren '60–'80) hebben echter een lage Rc-waarde en profiteren sterk van ETICS.",
    gemeenteWebsite: "https://www.h-i-ambacht.nl/Inwoners/Alle_onderwerpen_Inwoners/Duurzaamheid",
    nearbyLocations: ["dordrecht", "ridderkerk", "barendrecht"],
  },
]

export function getLocation(slug: string): LocationData | undefined {
  return locations.find((l) => l.slug === slug)
}

export function getAllLocationSlugs(): string[] {
  return locations.map((l) => l.slug)
}

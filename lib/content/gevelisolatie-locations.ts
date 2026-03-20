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
    subsidieInfo: "Gemeente Rotterdam biedt het Energietransitiefonds (ETF) en advies via Duurzaam 010. Daarnaast kunt u mogelijk ISDE-subsidie aanvragen — de hoogte is afhankelijk van het aantal maatregelen en de Rd-waarde van het isolatiepakket. Raadpleeg rvo.nl voor actuele bedragen en voorwaarden.",
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
      "In de Haagse flatwijken — zoals Morgenstond, Mariahoeve en Moerwijk — staan veel gelijksoortige woningen waar een collectieve VvE-aanpak goed mogelijk is. In rustigere stadsdelen als Loosduinen en Benoordenhout gaat het vaker om individuele woningen waar de aanpak per gevel wordt afgestemd.",
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
    subsidieInfo: "Gemeente Den Haag biedt de Energiebespaarlening (via Warmtefonds) en een gratis energie- en duurzaamheidsscan. Daarnaast kunt u mogelijk ISDE-subsidie aanvragen — de hoogte is afhankelijk van het aantal maatregelen en de Rd-waarde van het isolatiepakket. Raadpleeg rvo.nl voor actuele bedragen en voorwaarden.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig. Den Haag telt 21 beschermde stadsgezichten (11 rijks, 10 gemeentelijk), waaronder het Willemspark, Statenkwartier, Archipelbuurt en Benoordenhout. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "Den Haag ligt aan de kust en woningen zijn hier meer blootgesteld aan wind. Goede buitengevelisolatie kan merkbaar bijdragen aan comfort en tochtklachten verminderen.",
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
          "Ja, de portiekflats en galerijflats in Voorhof en Buitenhof (bouwjaar '60–'80) hebben typisch een zeer lage isolatiewaarde. Buitengevelisolatie brengt de gevel naar een goed niveau, wat merkbaar is in comfort en lagere stookkosten.",
      },
      {
        vraag: "Verschilt de aanpak tussen woningen in Voorhof en Tanthof?",
        antwoord:
          "De bouwperiode en gevelopbouw verschillen: Voorhof is voornamelijk jaren '60–'70, Tanthof jaren '80. Daardoor kan ook de juiste isolatie-opbouw per woning verschillen. Wij beoordelen dit bij de opname en adviseren welke aanpak het beste past.",
      },
    ],
    bouwperiode: "Naoorlogse uitbreidingswijken (jaren '60–'80) naast historische binnenstad.",
    gemiddeldBesparing: "Indicatief €550–€800/jaar besparing bij een rijtjeshuis in Voorhof of Tanthof (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "Gemeente Delft biedt de Duurzaamheidslening en gratis energieadvies voor woningeigenaren. Daarnaast kunt u mogelijk ISDE-subsidie aanvragen — de hoogte is afhankelijk van het aantal maatregelen en de Rd-waarde van het isolatiepakket. Raadpleeg rvo.nl voor actuele bedragen en voorwaarden.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig. Delft heeft vier beschermde stadsgezichten (Binnenstad, Nieuwe Plantage, Agnetapark en TU-Noord). Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "De jaren '70-woningen in Voorhof en Buitenhof zijn gebouwd met minimale gevelisolatie. Buitengevelisolatie brengt de isolatiewaarde naar het huidige niveau — dat is direct merkbaar in wooncomfort en lagere stookkosten.",
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
      "Dordrecht ligt op een eiland omringd door rivieren. Dat maakt vocht een belangrijk aandachtspunt bij gevelisolatie — vooral onderaan de gevel, waar regenwater kan opspatten. Wij passen daar vochtbestendige materialen en detaillering toe. De portiekflats in Wielwijk en Crabbehof zijn 3–4 verdiepingen hoog met enkelsteens gevels: grote, vlakke oppervlakken die zich goed lenen voor ETICS. In Sterrenburg en Dubbeldam staan laagbouwwoningen waar vooral de afwerking rondom kozijnen en de dakrand aandacht vraagt.",
    woningTypes: [
      "Naoorlogse eengezinswoningen",
      "Portiekflats (Wielwijk, Crabbehof)",
      "Twee-onder-een-kapwoningen (Dubbeldam)",
      "Laagbouwwoningen en rijtjeshuizen (Sterrenburg, Dubbeldam)",
    ],
    afstanden: "Dordrecht ligt op ±25 km van ons kantoor in Rotterdam. Wij hebben recent een gevelisolatieproject uitgevoerd in Dordrecht — bekijk het resultaat bij onze werken.",
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
          "Bij portiekflats in Wielwijk of Crabbehof werken wij samen met het VvE-bestuur. Wij maken een totaalofferte per m² voor het hele complex en stemmen de planning af zodat bewoners zo min mogelijk hinder ondervinden. De afwerking onderaan de gevel krijgt bij deze locatie extra zorg vanwege de nabijheid van water.",
      },
      {
        vraag: "Heeft de waterrijke ligging van Dordrecht invloed op gevelisolatie?",
        antwoord:
          "Ja. Vocht vanuit de grond en opspattend regenwater kunnen problemen geven als de onderkant van de gevel niet goed is afgewerkt. Wij controleren dit bij de opname en kiezen materialen die hiertegen bestand zijn. Dit speelt vooral bij woningen langs de Oude Maas en op het eiland van Dordrecht.",
      },
    ],
    bouwperiode: "Overwegend jaren '50–'70 met grote naoorlogse wijken (Wielwijk, Crabbehof).",
    gemiddeldBesparing: "Indicatief €600–€900/jaar besparing bij een typisch naoorlogs rijtjeshuis (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "Gemeente Dordrecht biedt de Duurzaamheidslening en het Energieloket Drechtsteden. Daarnaast kunt u mogelijk ISDE-subsidie aanvragen — de hoogte is afhankelijk van het aantal maatregelen en de Rd-waarde van het isolatiepakket. Raadpleeg rvo.nl voor actuele bedragen en voorwaarden.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig. De historische binnenstad (eiland van Dordrecht) heeft beschermd stadsgezicht met aanvullende eisen. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "Bij woningen nabij water besteden wij extra aandacht aan de onderkant van de gevel en de vochtafvoer. Wij kiezen voor een opbouw die vocht uit de muur kan laten ontsnappen, zodat de isolatie jarenlang goed blijft functioneren.",
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
      "In Groenoord staan portiekflats en galerijflats van 4–5 verdiepingen — bij VvE-projecten bepalen steigerhoogte en planning een groot deel van de aanpak. In Nieuwland en Woudhoek zijn het vooral rijtjeshuizen en twee-onder-een-kappers waar ETICS met minder steigerwerk is uit te voeren. De vooroorlogse panden in de binnenstad vragen om maatwerk vanwege het beschermde stadsgezicht.",
    woningTypes: [
      "Naoorlogse rijtjeshuizen (Nieuwland, Woudhoek)",
      "Portiekflats en galerijflats (Groenoord)",
      "Vooroorlogse woningen in het centrum",
      "Twee-onder-een-kapwoningen (Kethel)",
      "VvE-complexen",
    ],
    afstanden: "Schiedam grenst aan Rotterdam — wij werken in de directe omgeving. Recent nog in het naastgelegen Vlaardingen.",
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
        vraag: "Verschilt de aanpak bij portiekflats en rijtjeshuizen in Schiedam?",
        antwoord:
          "Ja. Bij portiekflats in Groenoord werken wij samen met het VvE-bestuur en is meer steigerwerk nodig. Bij rijtjeshuizen in Nieuwland of Woudhoek is de gevel lager en de aanpak eenvoudiger. In beide gevallen maken wij een offerte per m² op basis van de opname.",
      },
    ],
    bouwperiode: "Voornamelijk jaren '50–'70, met grote naoorlogse flatwijken.",
    gemiddeldBesparing: "Indicatief €500–€800/jaar besparing bij een portiekflat of rijtjeshuis (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "Gemeente Schiedam biedt de Duurzaamheidslening en werkt samen met het regionaal Energieloket. Daarnaast kunt u mogelijk ISDE-subsidie aanvragen — de hoogte is afhankelijk van het aantal maatregelen en de Rd-waarde van het isolatiepakket. Raadpleeg rvo.nl voor actuele bedragen en voorwaarden.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig. De binnenstad van Schiedam is sinds 2005 aangewezen als beschermd stadsgezicht, waar aanvullende eisen gelden. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "Bij de portiekflats in Groenoord is de prijs per woning bij collectieve VvE-aanpak lager dan bij individuele projecten, doordat steigerwerk en voorbereiding worden gedeeld. Zo wordt gevelisolatie ook voor kleinere appartementen bereikbaar.",
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
      "In Holy en Westwijk staan compacte rijtjeshuizen uit de jaren '65–'80 met relatief veel geveloppervlak per woning — dat maakt ETICS hier efficiënt toepasbaar. In de Vettenoordse polder zijn de woningen iets groter en gevarieerder. Bij het oude centrum van Vlaardingen controleren wij vooraf of er aanvullende eisen gelden vanwege het gevelbeeld.",
    woningTypes: [
      "Naoorlogse rijtjeshuizen (Holy, Westwijk)",
      "Portiekflats en galerijflats",
      "Eengezinswoningen (Vettenoordse polder)",
      "Vooroorlogse woningen in het centrum",
    ],
    afstanden: "Vlaardingen ligt op ±13 km van ons kantoor in Rotterdam. Wij hebben hier meerdere gevelisolatieprojecten uitgevoerd — bekijk de resultaten bij onze werken.",
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
          "De rijtjeshuizen en portiekflats in Holy en Westwijk (bouwjaar '65–'80) hebben enkelsteens of smalle spouwgevels met weinig isolatiewaarde. Deze woningen zijn bij uitstek geschikt voor buitengevelisolatie — het verschil in comfort is direct merkbaar.",
      },
    ],
    bouwperiode: "Overwegend jaren '60–'80 met typische groeikernwoningen.",
    gemiddeldBesparing: "Indicatief €550–€800/jaar besparing bij een rijtjeshuis in Holy of Westwijk (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "Gemeente Vlaardingen werkt samen met het regionaal Energieloket voor advies en financieringsmogelijkheden. Daarnaast kunt u mogelijk ISDE-subsidie aanvragen — de hoogte is afhankelijk van het aantal maatregelen en de Rd-waarde van het isolatiepakket. Raadpleeg rvo.nl voor actuele bedragen en voorwaarden.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig, omdat het uiterlijk van de gevel verandert. In het oude centrum van Vlaardingen kunnen aanvullende eisen gelden. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "Wij hebben inmiddels meerdere gevelisolatieprojecten in Vlaardingen uitgevoerd. De ervaring leert dat de enkelsteens gevels in Holy en Westwijk zich goed lenen voor ETICS — de resultaten zijn zichtbaar bij onze werken.",
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
      "De grachtenpanden en herenhuizen in de Leidse binnenstad hebben vaak massieve gevels zonder spouw — buitengevelisolatie is dan vaak een praktische oplossing, maar vraagt om afstemming met de gemeente. In Merenwijk en Stevenshof staan naoorlogse rijtjeshuizen en flats met enkelsteens gevels, waar standaard ETICS efficiënt is uit te voeren.",
    woningTypes: [
      "Naoorlogse rijtjeshuizen (Merenwijk, Stevenshof)",
      "Portiekflats en galerijflats (Leiden-Noord)",
      "Grachtenpanden en herenhuizen (binnenstad, met maatwerk)",
      "Eengezinswoningen (Professorenwijk, De Kooi)",
      "VvE-complexen",
    ],
    afstanden: "Leiden ligt op ±35 km van ons kantoor in Rotterdam. Wij werken ook in de regio — recent nog in het nabijgelegen Katwijk.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Leiden?",
        antwoord:
          "Voor naoorlogse rijtjeshuizen in Merenwijk of Stevenshof liggen de kosten in de standaard bandbreedte voor ETICS met sierpleister. Bij grachtenpanden in de binnenstad komen maatwerk, vergunningskosten en eventuele esthetische aanpassingen erbij. Wij maken na opname een heldere offerte per m². Bekijk ook onze kostenpagina.",
      },
      {
        vraag: "Mag ik mijn gevel isoleren in de Leidse binnenstad?",
        antwoord:
          "Dat hangt af van de exacte locatie en het type pand. In het beschermd stadsgezicht gelden strengere regels. Wij controleren vooraf bij de gemeente Leiden welke mogelijkheden er zijn en of een vergunning nodig is.",
      },
      {
        vraag: "Is buitengevelisolatie geschikt voor grachtenpanden met massief metselwerk?",
        antwoord:
          "Ja, bij massieve gevels zonder spouw is ETICS vaak een praktische buitenisolatie-optie. De bevestiging moet worden afgestemd op het type metselwerk en de staat van de voegen. In beschermde stadsgezichten gelden aanvullende eisen aan het uiterlijk — wij controleren dit vooraf bij de gemeente.",
      },
    ],
    bouwperiode: "Mix van historische grachtenpanden, Merenwijk (jaren '70) en Stevenshof (jaren '80–'90).",
    gemiddeldBesparing: "Indicatief €500–€850/jaar besparing bij een rijtjeshuis in Merenwijk of Stevenshof (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "Gemeente Leiden biedt de Leidse Duurzaamheidslening en een gratis energiescan voor woningeigenaren. Daarnaast kunt u mogelijk ISDE-subsidie aanvragen — de hoogte is afhankelijk van het aantal maatregelen en de Rd-waarde van het isolatiepakket. Raadpleeg rvo.nl voor actuele bedragen en voorwaarden.",
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
      "In Goverwelle en Bloemendaal staan rijtjeshuizen met enkelsteens gevels die zich goed lenen voor standaard ETICS. In de beschermde binnenstad van Gouda zijn de percelen vaak smal en de gevels aaneengebouwd — hier is ETICS vooral op vrije geveldelen een praktische oplossing en vraagt de uitvoering om afstemming met de gemeente.",
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
          "Ja, deze woningen hebben enkelsteens gevels met weinig isolatiewaarde. Ze zijn bij uitstek geschikt voor buitengevelisolatie — na ETICS verbetert zowel het wooncomfort als het energielabel.",
      },
    ],
    bouwperiode: "Naoorlogse uitbreidingswijken (jaren '60–'80) en historische binnenstad.",
    gemiddeldBesparing: "Indicatief €550–€800/jaar besparing bij een rijtjeshuis in Goverwelle of Bloemendaal (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "Gemeente Gouda biedt de Duurzaamheidslening en het Energieloket Midden-Holland. Daarnaast kunt u mogelijk ISDE-subsidie aanvragen — de hoogte is afhankelijk van het aantal maatregelen en de Rd-waarde van het isolatiepakket. Raadpleeg rvo.nl voor actuele bedragen en voorwaarden.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig. De binnenstad van Gouda is rijksbeschermd stadsgezicht (sinds 1978). Daarnaast is de Tuindorp Josephbuurt gemeentelijk beschermd. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "De rijtjeshuizen in Goverwelle en Bloemendaal zijn gebouwd met minimale gevelisolatie. Na ETICS merkt u het verschil direct: een warmer huis in de winter en lagere stookkosten.",
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
      "Zoetermeer is vanaf 1962 ontwikkeld als groeikern van Den Haag. Veel woningen in Palenstein (1966), Meerzicht (1969) en Buytenwegh (1974) zijn in systeembouw opgetrokken — snel gebouwd, maar nauwelijks geïsoleerd. Buitengevelisolatie is bij deze woningen bijzonder effectief. Wij controleren bij de opname of de bevestiging op het bestaande geveltype is afgestemd.",
    woningTypes: [
      "Rijtjeshuizen (Palenstein, Meerzicht, Buytenwegh)",
      "Portiekflats en galerijflats (Seghwaert)",
      "Eengezinswoningen (Rokkeveen, Oosterheem)",
      "VvE-complexen (galerijflats Seghwaert, portiekflats Palenstein)",
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
          "Ja, bij galerijflats en portiekflats in wijken als Seghwaert en Palenstein werken wij samen met het VvE-bestuur. Wij maken een offerte per m² voor het hele complex, stemmen de planning af en zorgen dat bewoners zo min mogelijk hinder ondervinden.",
      },
      {
        vraag: "Zijn systeembouwwoningen in Zoetermeer geschikt voor buitengevelisolatie?",
        antwoord:
          "Ja, veel woningen in Zoetermeer zijn in systeembouw opgetrokken met prefab geveldelen. Deze constructies lenen zich goed voor ETICS. Wel moet de bevestiging zijn afgestemd op het type gevel — wij beoordelen dit bij de opname op locatie.",
      },
    ],
    bouwperiode: "Grotendeels jaren '66–'90, gebouwd als groeikern van Den Haag.",
    gemiddeldBesparing: "Indicatief €600–€900/jaar besparing bij een typische groeikernwoning (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "Gemeente Zoetermeer biedt het Zoetermeers Duurzaamheidsfonds en de Energiecoach aan huis. Daarnaast kunt u mogelijk ISDE-subsidie aanvragen — de hoogte is afhankelijk van het aantal maatregelen en de Rd-waarde van het isolatiepakket. Raadpleeg rvo.nl voor actuele bedragen en voorwaarden.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig, omdat het uiterlijk van de gevel verandert. In de meeste woonwijken van Zoetermeer spelen beschermde stadsgezichten geen rol, wat het vergunningsproces doorgaans eenvoudiger maakt. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "Bij systeembouwwoningen letten wij op punten die typisch zijn voor dit bouwtype: koudebruggen bij balkons en galerijen, naden tussen bouwdelen en de hechting van de isolatie op de bestaande gevel. Een grondige opname vooraf voorkomt verrassingen bij de uitvoering.",
    gemeenteWebsite: "https://www.zoetermeer.nl/duurzaamheid",
    nearbyLocations: ["den-haag", "delft", "gouda", "leidschendam-voorburg", "leiden"],
  },
  {
    slug: "capelle-aan-den-ijssel",
    city: "Capelle aan den IJssel",
    region: "Zuid-Holland",
    title: "Gevelisolatie prijs Capelle aan den IJssel",
    description:
      "Buitengevelisolatie (ETICS) in Capelle aan den IJssel. Stuc, sierpleister of steenstrips. Opname op locatie, offerte per m². Direct naast Rotterdam.",
    h1: "Gevelisolatie in Capelle aan den IJssel",
    intro:
      "Capelle aan den IJssel groeide in de jaren '70 als overloopgebied van Rotterdam van 9.000 naar ruim 57.000 inwoners. In Schollevaar en Oostgaarde staan duizenden portiekflats en rijtjeshuizen die destijds snel werden gebouwd — veelal zonder of met minimale gevelisolatie. ETICS is voor deze woningen een effectieve en veelgekozen oplossing.",
    localContext:
      "Schollevaar en Oostgaarde bestaan uit grote flatcomplexen — bij deze projecten is een heldere VvE-afstemming en projectplanning essentieel. In 's-Gravenland staan kleinere rijtjeshuizen waar de aanpak per woning of per straat wordt bepaald. De gevelconstructie is in beide wijken vergelijkbaar: enkelsteens of smalle spouw, snel gebouwd in de jaren '70–'80.",
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
    subsidieInfo: "Gemeente Capelle aan den IJssel biedt een Duurzaamheidslening en werkt samen met het Energieloket. Daarnaast kunt u mogelijk ISDE-subsidie aanvragen — de hoogte is afhankelijk van het aantal maatregelen en de Rd-waarde van het isolatiepakket. Raadpleeg rvo.nl voor actuele bedragen en voorwaarden.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig, omdat het uiterlijk van de gevel verandert. In de woonwijken van Capelle aan den IJssel spelen beschermde stadsgezichten geen rol, wat het vergunningsproces doorgaans eenvoudiger maakt. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "Bij de grotere flatcomplexen in Capelle kan een VvE-project meerdere weken duren. Door vooraf een duidelijke planning en communicatie op te stellen zorgen wij dat de overlast voor bewoners beperkt blijft en het project soepel verloopt.",
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
      "De woningen in de Akkers en Groenewoud zijn grotendeels in dezelfde periode en bouwstijl opgetrokken — grote aantallen identieke rijtjeshuizen met enkelsteens gevels. Dat maakt collectieve aanpak per straat of blok bijzonder efficiënt: dezelfde isolatie-opbouw en hetzelfde steigerwerk voor een reeks woningen tegelijk. In Waterland en Vogelenzang staan meer twee-onder-een-kappers waar de aanpak per woning wordt bepaald.",
    woningTypes: [
      "Rijtjeshuizen (de Akkers, Groenewoud)",
      "Twee-onder-een-kapwoningen (Waterland)",
      "Portiekflats en galerijflats (de Akkers, Groenewoud)",
      "Eengezinswoningen (Vogelenzang, de Hoek)",
    ],
    afstanden: "Spijkenisse ligt op ±20 km van ons kantoor in Rotterdam. Wij werken ook in de omgeving — recent nog in Nieuw-Beijerland.",
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
        vraag: "Kan een hele straat of blok tegelijk gevelisolatie laten uitvoeren?",
        antwoord:
          "Ja, bij identieke woningen (zoals de rijtjeshuizen in de Akkers of Groenewoud) is een gezamenlijke aanpak per straat of blok bijzonder efficiënt. Dezelfde isolatie-opbouw en hetzelfde steigerwerk drukken de kosten per woning. Wij maken een totaalofferte en stemmen de planning af met alle bewoners.",
      },
    ],
    bouwperiode: "Grotendeels jaren '70–'85, gebouwd als groeikern (aangewezen in 1966).",
    gemiddeldBesparing: "Indicatief €550–€850/jaar besparing bij een typische groeikernwoning (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "Gemeente Nissewaard biedt advies via het Energieloket Voorne-Putten. Daarnaast kunt u mogelijk ISDE-subsidie aanvragen — de hoogte is afhankelijk van het aantal maatregelen en de Rd-waarde van het isolatiepakket. Raadpleeg rvo.nl voor actuele bedragen en voorwaarden.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig, omdat het uiterlijk van de gevel verandert. In de woonwijken van Spijkenisse spelen beschermde stadsgezichten geen rol, wat het vergunningsproces doorgaans eenvoudiger maakt. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "De groeikernwoningen in Spijkenisse zijn destijds gebouwd met minimale isolatie. Na buitengevelisolatie merkt u het verschil direct: minder tocht, een gelijkmatigere temperatuur en lagere stookkosten.",
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
      "In het oude dorp en de Oranjewijk zijn de gevels vaak enkelsteens of met een smalle spouw — hier wordt het ETICS-pakket direct op het metselwerk aangebracht. In Carnisselande is de gevelopbouw anders: woningen hebben doorgaans een bredere spouw met enige basisisolatie. Bij deze woningen beoordelen wij eerst of de bestaande spouw voldoende presteert, of dat buitenisolatie een zinvolle aanvulling kan zijn.",
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
        vraag: "Waar moet ik op letten bij gevelisolatie van een jaren-'80-woning in Barendrecht?",
        antwoord:
          "Woningen uit de jaren '80 hebben vaak een spouw, maar de vulling kan onvoldoende of verouderd zijn. Bij de opname beoordelen wij de plintzone, de aansluitingen rond kozijnen en de staat van het bestaande metselwerk. Op basis daarvan adviseren wij of ETICS of een andere maatregel het meest geschikt is.",
      },
      {
        vraag: "Kan ik gevelisolatie combineren met een nieuwe gevelafwerking?",
        antwoord:
          "Ja, bij ETICS kiest u de afwerking die bij uw woning past: stuc, sierpleister of steenstrips. Vooral bij oudere dorpswoningen met een verouderde gevel kan buitenisolatie tegelijk het uiterlijk vernieuwen. Wij laten tijdens de opname zien welke afwerkingen mogelijk zijn.",
      },
    ],
    bouwperiode: "Mix van oudere dorpsbebouwing en vinex-nieuwbouw (Carnisselande, 1997–2004).",
    gemiddeldBesparing: "Indicatief €400–€700/jaar besparing. Nieuwere woningen (Carnisselande) hebben een lagere besparing dan oudere dorpswoningen (bron: Milieu Centraal).",
    subsidieInfo: "Gemeente Barendrecht biedt de Duurzaamheidslening via het Energieloket BAR-gemeenten. Daarnaast kunt u mogelijk ISDE-subsidie aanvragen — de hoogte is afhankelijk van het aantal maatregelen en de Rd-waarde van het isolatiepakket. Raadpleeg rvo.nl voor actuele bedragen en voorwaarden.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig, omdat het uiterlijk van de gevel verandert. In de meeste woonwijken van Barendrecht spelen geen aanvullende welstandseisen. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "Bij oudere dorpswoningen gaat warmte grotendeels via de ongeïsoleerde gevel verloren — ETICS pakt dat direct aan. Bij woningen in Carnisselande zit het warmteverlies vaker bij de aansluitingen rond kozijnen en de plint, en is de vraag of buitenisolatie of gerichte maatregelen het meest logisch zijn.",
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
      "In Drievliet en Bolnes staan portiekflats en rijtjeshuizen van 3–4 verdiepingen — hier vraagt de steigerhoogte om een andere projectopzet dan bij de laagbouw in Rijsoord en Slikkerveer. De dorpskernen zijn ooit als aparte gemeenschappen gebouwd, en dat zie je terug in de gevels: van enkelsteens metselwerk in Bolnes tot gemengde spouwgevels in het centrum.",
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
        vraag: "Moet ik als VvE-lid wachten tot het hele complex meedoet?",
        antwoord:
          "Bij portiekflats in bijvoorbeeld Bolnes is instemming van de VvE nodig voor gevelisolatie aan gemeenschappelijke gevels. In de praktijk kan een meerderheid van eigenaren besluiten tot een collectief project. Wij adviseren graag over de mogelijkheden en planning.",
      },
      {
        vraag: "Hoe verschilt gevelisolatie bij een enkelsteens woning van een spouwmuurwoning?",
        antwoord:
          "Bij een enkelsteens woning zit er geen isolatie in de gevel — ETICS wordt dan direct op het metselwerk aangebracht. Bij een spouwmuurwoning kan soms eerst spouwvulling worden overwogen. Wij beoordelen bij de opname welke aanpak het meest geschikt is.",
      },
      {
        vraag: "Hoe wordt gevelisolatie bij een portiekflat in Bolnes aangepakt?",
        antwoord:
          "Bij portiekflats van 3–4 verdiepingen is steigerwerk nodig en wordt de planning afgestemd op de VvE en de bewoners. De doorlooptijd hangt af van het aantal woningen en de geveloppervlakte. Na een opname op locatie maken wij een projectvoorstel op maat.",
      },
    ],
    bouwperiode: "Overwegend jaren '50–'70 met naoorlogse wijken op IJsselmonde.",
    gemiddeldBesparing: "Indicatief €550–€850/jaar besparing bij een naoorlogs rijtjeshuis (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "Gemeente Ridderkerk biedt advies via het Energieloket BAR-gemeenten. Daarnaast kunt u mogelijk ISDE-subsidie aanvragen — de hoogte is afhankelijk van het aantal maatregelen en de Rd-waarde van het isolatiepakket. Raadpleeg rvo.nl voor actuele bedragen en voorwaarden.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig, omdat het uiterlijk van de gevel verandert. In historische dorpskernen kunnen aanvullende eisen gelden. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "Bij enkelsteens woningen — relatief vaak voorkomend in Drievliet en Bolnes — wordt het isolatiepakket direct op het bestaande metselwerk bevestigd. Bij spouwwoningen in het centrum kan eerst worden beoordeeld of spouwvulling een optie is, of dat ETICS meer geschikt is.",
    gemeenteWebsite: "https://www.ridderkerk.nl/duurzaamheid",
    nearbyLocations: ["rotterdam", "barendrecht", "dordrecht", "hendrik-ido-ambacht"],
  },
  {
    slug: "alphen-aan-den-rijn",
    city: "Alphen aan den Rijn",
    region: "Zuid-Holland",
    title: "Gevelisolatie prijs Alphen aan den Rijn",
    description:
      "Buitengevelisolatie (ETICS) in Alphen aan den Rijn. Stuc, sierpleister of steenstrips. Opname op locatie, offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Alphen aan den Rijn",
    intro:
      "Midden in het Groene Hart ligt Alphen aan den Rijn, een gemeente met meer dan 100.000 inwoners en een gevarieerd woningbestand. De naoorlogse wijken Ridderveld, Kerk en Zanen en Lage Zijde bevatten rijtjeshuizen en flats waar buitengevelisolatie een flinke verbetering kan opleveren. Wij maken een opname op locatie en adviseren over de juiste aanpak.",
    localContext:
      "In Ridderveld staan galerijflats van 4–5 verdiepingen waar steigerhoogte en gezamenlijke planning de aanpak bepalen. In De Baronie en Nieuwe Sloot gaat het om laagbouw-rijtjeshuizen waarbij ETICS per woning of per blok kan worden uitgevoerd. Bij woningen in het veenweidegebied rond Alphen vraagt de plintzone om extra aandacht bij de detaillering — wij stemmen de uitvoering hierop af.",
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
        vraag: "Wat is het verschil in aanpak tussen een flat in Ridderveld en een rijtjeshuis in De Baronie?",
        antwoord:
          "Bij galerijflats in Ridderveld is steigerwerk nodig en wordt de planning afgestemd op de VvE en de bewoners. Bij rijtjeshuizen in De Baronie kan de uitvoering vaak per woning of per blok worden opgezet. Wij beoordelen bij de opname welke aanpak het meest praktisch is.",
      },
      {
        vraag: "Waar moet ik op letten bij de plintzone in het veenweidegebied?",
        antwoord:
          "In het veenweidegebied rond Alphen is de plintzone — het onderste deel van de gevel — een aandachtspunt bij gevelisolatie. Wij zorgen voor een zorgvuldige aansluiting en waterdichte afwerking, zodat het isolatiepakket ook op dit kwetsbare punt goed presteert.",
      },
      {
        vraag: "Kan gevelisolatie ook bij een portiekflat in Kerk en Zanen?",
        antwoord:
          "Ja, portiekflats in Kerk en Zanen lenen zich vaak goed voor ETICS. Bij een collectief project stemt de VvE gezamenlijk in. Wij maken na een opname een projectvoorstel met planning en kosten per woning.",
      },
    ],
    bouwperiode: "Naoorlogse uitbreidingswijken (jaren '60–'80) en nieuwere vinexlocaties.",
    gemiddeldBesparing: "Indicatief €550–€800/jaar besparing bij een rijtjeshuis in Ridderveld of De Baronie (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "Gemeente Alphen aan den Rijn biedt de Duurzaamheidslening en een gratis energieadvies. Daarnaast kunt u mogelijk ISDE-subsidie aanvragen — de hoogte is afhankelijk van het aantal maatregelen en de Rd-waarde van het isolatiepakket. Raadpleeg rvo.nl voor actuele bedragen en voorwaarden.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig, omdat het uiterlijk van de gevel verandert. In de meeste woonwijken van Alphen aan den Rijn spelen geen aanvullende welstandseisen. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "In het veenweidegebied rond Alphen is zorgvuldige detaillering van de plintaansluiting en waterdichte afwerking extra belangrijk. Wij besteden hier bij de uitvoering van ETICS standaard aandacht aan.",
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
      "In Sluispolder staan naoorlogse portiekflats en rijtjeshuizen uit de jaren '60–'80 die doorgaans weinig tot geen gevelisolatie hebben — hier is ETICS het meest effectief. Het Balkon en de Dijkpolder zijn nieuwer en hebben veelal een betere basisisolatie. Bij de opname beoordelen wij of buitengevelisolatie hier meerwaarde biedt.",
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
        vraag: "Heeft mijn nieuwbouwwoning in het Balkon of Dijkpolder ook baat bij gevelisolatie?",
        antwoord:
          "Dat hangt af van de huidige isolatiewaarde van de gevel. Nieuwere woningen hebben vaak al spouwmuurisolatie, maar als deze onvoldoende of slecht is aangebracht kan buitengevelisolatie alsnog meerwaarde bieden. Wij beoordelen dit bij de opname op locatie.",
      },
      {
        vraag: "Waar let BM klus BV op bij gevelisolatie in Maassluis?",
        antwoord:
          "Bij woningen in Maassluis controleren wij altijd de plint-zone en het vochtgedrag van de gevel. Eventuele vochtproblemen moeten vooraf worden opgelost, zodat ETICS duurzaam en veilig kan worden aangebracht. Dit beoordelen wij bij de opname.",
      },
    ],
    bouwperiode: "Overwegend jaren '60–'80 met compacte naoorlogse wijken.",
    gemiddeldBesparing: "Indicatief €500–€750/jaar besparing bij een rijtjeshuis (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "Gemeente Maassluis biedt advies via het regionaal Energieloket. Daarnaast kunt u mogelijk ISDE-subsidie aanvragen — de hoogte is afhankelijk van het aantal maatregelen en de Rd-waarde van het isolatiepakket. Raadpleeg rvo.nl voor actuele bedragen en voorwaarden.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig, omdat het uiterlijk van de gevel verandert. In het oude centrum van Maassluis kunnen aanvullende eisen gelden. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "Bij de naoorlogse woningen in Sluispolder besteden wij extra aandacht aan de vochthuishouding — vochtproblemen moeten vooraf worden opgelost zodat de isolatie duurzaam blijft. Wij controleren dit altijd bij de opname.",
    gemeenteWebsite: "https://www.maassluis.nl/duurzaamheid",
    nearbyLocations: ["vlaardingen", "schiedam", "hellevoetsluis", "delft"],
  },
  {
    slug: "hellevoetsluis",
    city: "Hellevoetsluis",
    region: "Zuid-Holland",
    title: "Gevelisolatie Hellevoetsluis – prijs per m²",
    description:
      "Buitengevelisolatie (ETICS) in Hellevoetsluis. Stuc, sierpleister of steenstrips. Opname op locatie en offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Hellevoetsluis",
    intro:
      "De voormalige vestingstad Hellevoetsluis op Voorne-Putten combineert een beschermd vestinggebied met naoorlogse en nieuwere woonwijken. In de Vesting gelden aanvullende regels voor het uiterlijk van de gevel; daarbuiten zijn rijtjeshuizen uit de jaren '70–'90 bijzonder geschikt voor ETICS. Wij adviseren ter plekke over de mogelijkheden.",
    localContext:
      "Buiten de Vesting bestaan de woonwijken Nieuw-Helvoet, Zuiderpark en Kickersbloem grotendeels uit rijtjeshuizen en eengezinswoningen uit de jaren '70–'90. Door de ligging nabij de kust houden wij bij de keuze van de gevelafwerking extra rekening met wind en slagregen. In het vestinggebied gelden aanvullende regels voor het gevelbeeld.",
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
          "Buiten de Vesting zijn de kosten vergelijkbaar met standaard ETICS-projecten; de prijs hangt af van oppervlakte, isolatiedikte en afwerking. Binnen het vestinggebied kunnen aanvullende eisen aan materiaal en kleur de kosten verhogen. Vraag een opname aan voor een exacte offerte.",
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
      {
        vraag: "Is de gevelafwerking langs de kust anders dan in het binnenland?",
        antwoord:
          "Het ETICS-systeem is hetzelfde, maar bij woningen nabij de kust houden wij extra rekening met de keuze van sierpleister of coating. Een afwerking die goed bestand is tegen slagregen en wind gaat doorgaans langer mee. Wij adviseren hierover bij de opname.",
      },
    ],
    bouwperiode: "Mix van historische vestingbouw en naoorlogse uitbreiding (jaren '70–'90).",
    gemiddeldBesparing: "Indicatief €500–€750/jaar besparing bij een eengezinswoning (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "Gemeente Voorne aan Zee biedt advies via het Energieloket Voorne-Putten. Daarnaast kunt u mogelijk ISDE-subsidie aanvragen — de hoogte is afhankelijk van het aantal maatregelen en de Rd-waarde van het isolatiepakket. Raadpleeg rvo.nl voor actuele bedragen en voorwaarden.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig. De Vesting van Hellevoetsluis is sinds 1985 beschermd dorpsgezicht (68,9 ha), hier gelden aanvullende eisen. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "De rijtjeshuizen uit de jaren '70–'90 in Nieuw-Helvoet en Zuiderpark hebben doorgaans weinig tot geen gevelisolatie. Na buitengevelisolatie kan het verschil merkbaar zijn: minder tocht en een gelijkmatigere temperatuur, ook bij harde wind vanuit zee.",
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
      "In Hoge Vucht staan portiekflats van 4–5 verdiepingen met enkelsteens gevels — hier bepalen steigerhoogte en VvE-afstemming een groot deel van de projectaanpak. In Brabantpark en Geeren-Zuid zijn het vooral laagbouwrijtjeshuizen (2–3 lagen) waar ETICS met minder steigerwerk is uit te voeren. De vooroorlogse woningen in de binnenstad en Ginneken vragen om maatwerk vanwege het beschermde stadsgezicht.",
    woningTypes: [
      "Portiekflats en galerijflats (Hoge Vucht, Geeren-Zuid)",
      "Naoorlogse rijtjeshuizen (Brabantpark)",
      "Eengezinswoningen (Princenhage, Tuinzigt)",
      "Twee-onder-een-kapwoningen",
      "VvE-complexen",
    ],
    afstanden: "Breda ligt op ±55 km van ons kantoor in Rotterdam. Wij werken ook in West-Brabant — recent nog in het nabijgelegen Halsteren.",
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
        vraag: "Heeft de hoogte van portiekflats invloed op de kosten van gevelisolatie?",
        antwoord:
          "Ja, bij portiekflats van 4–5 verdiepingen (zoals in Hoge Vucht) is meer steigerwerk nodig, wat de kosten verhoogt. Bij collectieve VvE-aanpak worden de steigerkosten over alle woningen verdeeld, wat de prijs per appartement drukt. Wij geven dit inzichtelijk in de offerte.",
      },
      {
        vraag: "Mag ik gevelisolatie aanbrengen bij een woning in het beschermde stadsgezicht van Breda?",
        antwoord:
          "Voor buitengevelisolatie in een beschermd stadsgezicht gelden aanvullende eisen aan materiaal, kleur en detaillering. Breda heeft beschermde gezichten in het centrum en Ginneken. Wij controleren vooraf bij de gemeente welke mogelijkheden er zijn en adviseren over een passende uitvoering. Controleer ook zelf de actuele regels via het Omgevingsloket.",
      },
    ],
    bouwperiode: "Grote naoorlogse wijken (jaren '50–'70) en nieuwere uitbreidingswijken.",
    gemiddeldBesparing: "Indicatief €600–€900/jaar besparing bij een naoorlogs rijtjeshuis of portiekflat (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "Gemeente Breda biedt de Toekomstbestendig Wonen Lening en gratis advies via de Energie Bespaar Coach. Daarnaast kunt u mogelijk ISDE-subsidie aanvragen — de hoogte is afhankelijk van het aantal maatregelen en de Rd-waarde van het isolatiepakket. Raadpleeg rvo.nl voor actuele bedragen en voorwaarden.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig. De binnenstad van Breda heeft drie beschermde gezichten: het centrum (sinds 1967), de uitbreiding (2013) en Ginneken (1991). Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "De naoorlogse portiekflats in Hoge Vucht en Geeren-Zuid hebben doorgaans enkelsteens gevels met een zeer lage isolatiewaarde. Bij collectieve VvE-projecten is de prijs per woning lager dan bij individuele aanpak, doordat steigerwerk en voorbereiding worden gedeeld.",
    gemeenteWebsite: "https://www.breda.nl/duurzaam",
    nearbyLocations: ["bergen-op-zoom", "roosendaal"],
  },
  {
    slug: "bergen-op-zoom",
    city: "Bergen op Zoom",
    region: "Noord-Brabant",
    title: "Gevelisolatie Bergen op Zoom – prijs per m²",
    description:
      "Buitengevelisolatie (ETICS) in Bergen op Zoom en omgeving. Stuc, sierpleister of steenstrips. Opname op locatie, offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Bergen op Zoom",
    intro:
      "Aan de westrand van Noord-Brabant ligt Bergen op Zoom, met een beschermd historisch centrum en naoorlogse uitbreidingswijken als Gageldonk, Noordgeest en Fort-Zeekant. De woningen uit de jaren '60–'80 in deze wijken zijn het meest geschikt voor buitengevelisolatie. Wij werken in de regio vanuit ons project in nabijgelegen Halsteren.",
    localContext:
      "In Gageldonk en Noordgeest staan vooral rijtjeshuizen met enkelsteens gevels uit de jaren '60–'70. Fort-Zeekant heeft daarnaast portiekflats van meerdere lagen, waar steigerwerk en een collectieve aanpak een rol spelen. De Bergse Plaat (jaren '90–2000) is doorgaans al beter geïsoleerd — daar is ETICS minder vaak nodig.",
    woningTypes: [
      "Rijtjeshuizen (Gageldonk, Noordgeest)",
      "Eengezinswoningen (Bergse Plaat)",
      "Portiekflats (Fort-Zeekant)",
      "Historische panden binnenstad (met maatwerk)",
    ],
    afstanden: "Bergen op Zoom ligt op ±65 km van ons kantoor in Rotterdam. Wij werken in West-Brabant — recent nog in het nabijgelegen Halsteren.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Bergen op Zoom?",
        antwoord:
          "De kosten worden bepaald door de oppervlakte, isolatiedikte en afwerking. In het beschermd stadsgezicht van de binnenstad gelden aanvullende eisen die de prijs beïnvloeden. In naoorlogse wijken als Gageldonk en Noordgeest is standaard ETICS met sierpleister doorgaans de voordeligste optie. Vraag een opname aan voor een offerte op maat.",
      },
      {
        vraag: "Heeft de ligging nabij het water invloed op gevelisolatie?",
        antwoord:
          "Bergen op Zoom ligt nabij het Markiezaatsmeer en de Oosterschelde, waardoor gevels vaker aan vochtbelasting blootstaan. Wij controleren de gevel vooraf op vochtproblemen. Als de ondergrond in orde is, kan ETICS gewoon worden aangebracht — het beschermt de gevel juist tegen verdere vochtinwerking.",
      },
      {
        vraag: "Heb ik een vergunning nodig in Bergen op Zoom?",
        antwoord:
          "In de naoorlogse woonwijken als Gageldonk en Noordgeest verloopt de vergunningsprocedure doorgaans standaard. In en rond de beschermde binnenstad gelden aanvullende eisen — daar is vooroverleg met de gemeente aan te raden. Controleer de actuele regels via het Omgevingsloket.",
      },
    ],
    bouwperiode: "Naoorlogse uitbreidingswijken (jaren '60–'80) naast historische vestingstad.",
    gemiddeldBesparing: "Indicatief €500–€800/jaar besparing bij een eengezinswoning of rijtjeshuis (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "Gemeente Bergen op Zoom biedt de Duurzaamheidslening en advies via het West-Brabants Energieloket. Daarnaast kunt u mogelijk ISDE-subsidie aanvragen — de hoogte is afhankelijk van het aantal maatregelen en de Rd-waarde van het isolatiepakket. Raadpleeg rvo.nl voor actuele bedragen en voorwaarden.",
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
      "De woonwijken in Roosendaal verschillen in bouwperiode en gevelopbouw. In Kroeven en Langdonk staan vooral rijtjeshuizen uit de jaren '60–'70 met enkelsteens gevels, terwijl Tolberg voornamelijk jaren '80-bouw kent met soms al een dunne spouw. Dit verschil bepaalt de aanpak: wij beoordelen per woning welke isolatiemethode het beste past.",
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
        vraag: "Wat als mijn woning in Roosendaal al spouwisolatie heeft?",
        antwoord:
          "Bij woningen uit de jaren '80 in wijken als Tolberg is soms al een dunne laag spouwisolatie aanwezig. Buitengevelisolatie (ETICS) kan daar bovenop worden aangebracht en verbetert de isolatiewaarde aanzienlijk. Tijdens de opname controleren wij of er bestaande spouwisolatie zit en adviseren wij op basis van de situatie ter plekke.",
      },
    ],
    bouwperiode: "Overwegend jaren '60–'80 met typische naoorlogse woonwijken.",
    gemiddeldBesparing: "Indicatief €550–€800/jaar besparing bij een rijtjeshuis in Kroeven of Langdonk (bron: Milieu Centraal). De werkelijke besparing verschilt per woning.",
    subsidieInfo: "Gemeente Roosendaal biedt advies via het West-Brabants Energieloket en de gemeentelijke Duurzaamheidslening. Daarnaast kunt u mogelijk ISDE-subsidie aanvragen — de hoogte is afhankelijk van het aantal maatregelen en de Rd-waarde van het isolatiepakket. Raadpleeg rvo.nl voor actuele bedragen en voorwaarden.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig, omdat het uiterlijk van de gevel verandert. Roosendaal heeft geen beschermde stadsgezichten in de woonwijken, waardoor de procedure in de meeste gevallen standaard verloopt. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "Bij enkelsteens woningen in de oudere wijken gaat veel warmte verloren via de gevel — daar maakt buitengevelisolatie vaak het meeste verschil. In nieuwere wijken als Tolberg is soms al een dunne spouw aanwezig; wij controleren dit vooraf, zodat u niet onnodig investeert.",
    gemeenteWebsite: "https://www.roosendaal.nl/verduurzamen-van-uw-woning",
    nearbyLocations: ["bergen-op-zoom", "breda"],
  },
  {
    slug: "leidschendam-voorburg",
    city: "Leidschendam-Voorburg",
    region: "Zuid-Holland",
    title: "Gevelisolatie prijs Leidschendam-Voorburg",
    description:
      "Buitengevelisolatie (ETICS) in Leidschendam-Voorburg. Stuc, sierpleister of steenstrips. Opname op locatie, offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Leidschendam-Voorburg",
    intro:
      "De tweelingegemeente Leidschendam-Voorburg vraagt een verschillende aanpak per deel: Voorburg heeft historische panden waar maatwerk nodig is, terwijl Leidschendam-Noord en Prinsenhof naoorlogse flats en rijtjeshuizen bevatten die standaard met ETICS geïsoleerd kunnen worden. Wij bekijken beide situaties tijdens een gratis opname.",
    localContext:
      "In Leidschendam-Noord en Prinsenhof staan seriematig gebouwde rijtjeshuizen en portiekflats uit de jaren '60–'80 — hier is de aanpak per blok vaak het meest praktisch. In Voorburg is de bebouwing gevarieerder en ouder, met smallere percelen en verschillende geveltypen per pand. Dat vraagt om een opname per woning om de juiste isolatie-opbouw te bepalen.",
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
        vraag: "Verschilt de aanpak tussen Voorburg en Leidschendam?",
        antwoord:
          "Ja. In Leidschendam staan veel seriematig gebouwde rijtjeshuizen en flats waarbij de aanpak per blok wordt bepaald. In Voorburg is de bebouwing gevarieerder en ouder — hier bekijken wij per woning welke isolatie-opbouw en afwerking het beste past.",
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
    subsidieInfo: "Gemeente Leidschendam-Voorburg biedt de Duurzaamheidslening en het Energieloket Haaglanden. Daarnaast kunt u mogelijk ISDE-subsidie aanvragen — de hoogte is afhankelijk van het aantal maatregelen en de Rd-waarde van het isolatiepakket. Raadpleeg rvo.nl voor actuele bedragen en voorwaarden.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig. In Voorburg zijn historische panden waarvoor aanvullende welstandseisen kunnen gelden. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "Bij de portiekflats in Leidschendam-Noord zit het warmteverlies vooral in de buitengevels — de binnenwanden tussen woningen zijn minder bepalend. Buitengevelisolatie pakt daarmee een groot deel van het energieverlies aan.",
    gemeenteWebsite: "https://www.lv.nl/duurzaam-wonen-en-leven",
    nearbyLocations: ["den-haag", "delft", "zoetermeer"],
  },
  {
    slug: "hendrik-ido-ambacht",
    city: "Hendrik-Ido-Ambacht",
    region: "Zuid-Holland",
    title: "Gevelisolatie prijs Hendrik-Ido-Ambacht",
    description:
      "Buitengevelisolatie (ETICS) in Hendrik-Ido-Ambacht. Stuc, sierpleister of steenstrips. Opname op locatie en offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Hendrik-Ido-Ambacht",
    intro:
      "Binnen de Drechtsteden is Hendrik-Ido-Ambacht een snel groeiende gemeente met een bijzondere mix: oudere dorpsbebouwing in Sandelingen en Oud-Ambacht naast de moderne Vinex-wijk Volgerlanden. Voor de oudere woningen levert buitengevelisolatie het meeste rendement; bij nieuwere woningen beoordelen wij eerst of ETICS meerwaarde heeft.",
    localContext:
      "Oud-Ambacht en de Sandelingen bestaan uit korte straten met doorlopende rijwoningen van twee lagen — compact gebouwd in de jaren '60–'80 en doorgaans nauwelijks geïsoleerd. De woningen lijken op elkaar in opbouw, wat de voorbereiding en uitvoering vereenvoudigt. In de Volgerlanden (2005+) is de isolatiestandaard moderner en beoordelen wij eerst of buitengevelisolatie meerwaarde heeft.",
    woningTypes: [
      "Rijtjeshuizen (Sandelingen)",
      "Oudere dorpswoningen (Oud-Ambacht)",
      "Twee-onder-een-kapwoningen",
      "Eengezinswoningen (Volgerlanden)",
    ],
    afstanden: "Hendrik-Ido-Ambacht ligt op ±19 km van ons kantoor in Rotterdam — wij werken in de regio Rotterdam en omgeving.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Hendrik-Ido-Ambacht?",
        antwoord:
          "Voor oudere woningen in Sandelingen of Oud-Ambacht levert ETICS het meeste rendement en zijn de kosten vergelijkbaar met standaardprojecten. Bij nieuwere woningen in de Volgerlanden beoordelen wij eerst of buitengevelisolatie meerwaarde biedt. De prijs per m² hangt af van oppervlakte en afwerking. Plan een gratis opname voor een offerte.",
      },
      {
        vraag: "Zijn de woningen in Oud-Ambacht en de Sandelingen vergelijkbaar qua gevel?",
        antwoord:
          "Grotendeels wel — het zijn overwegend rijwoningen van twee lagen uit dezelfde bouwperiode, met een vergelijkbare gevelopbouw. Dat betekent dat de isolatie-opbouw en afwerking bij buurwoningen vaak identiek is. Wij beoordelen dit bij de opname.",
      },
      {
        vraag: "Heeft ETICS zin bij nieuwere woningen in de Volgerlanden?",
        antwoord:
          "Woningen in de Volgerlanden (2005+) hebben een moderne isolatiestandaard en profiteren doorgaans minder van ETICS dan oudere woningen. De oudere woningen in Oud-Ambacht en de Sandelingen (jaren '60–'80) hebben daarentegen nauwelijks gevelisolatie en hebben doorgaans meer baat bij ETICS. Wij beoordelen dit bij de opname.",
      },
    ],
    bouwperiode: "Mix van oudere dorpsbebouwing en nieuwbouw (Volgerlanden, vanaf 2005).",
    gemiddeldBesparing: "Indicatief €400–€700/jaar besparing. Oudere woningen in Oud-Ambacht profiteren het meest (bron: Milieu Centraal).",
    subsidieInfo: "Gemeente Hendrik-Ido-Ambacht biedt advies via het Energieloket Drechtsteden. Daarnaast kunt u mogelijk ISDE-subsidie aanvragen — de hoogte is afhankelijk van het aantal maatregelen en de Rd-waarde van het isolatiepakket. Raadpleeg rvo.nl voor actuele bedragen en voorwaarden.",
    vergunningTip: "Voor buitengevelisolatie is doorgaans een omgevingsvergunning nodig, omdat het uiterlijk van de gevel verandert. Controleer de actuele regels via het Omgevingsloket.",
    energieTip: "Bij de doorlopende rijwoningen in Oud-Ambacht en de Sandelingen gaat warmte vooral via de voor- en achtergevel verloren — de tussenwanden grenzen aan de buren. Buitengevelisolatie pakt daarmee een groot deel van het energieverlies aan.",
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

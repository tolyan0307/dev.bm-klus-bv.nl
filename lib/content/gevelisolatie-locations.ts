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
    bouwperiode: "Overwegend jaren '50–'70, met naoorlogse wederopbouw en portiekflats.",
    gemiddeldBesparing: "Gemiddeld €600–€900/jaar besparing op stookkosten bij een typisch rijtjeshuis.",
    subsidieInfo: "ISDE-subsidie (landelijk) tot ±€4.400 voor gevelisolatie. Gemeente Rotterdam biedt het Rotterdams Energietransitiefonds en de Energiebox voor advies.",
    vergunningTip: "Meestal vergunningvrij, tenzij het pand in een beschermd stadsgezicht ligt (bijv. Delfshaven, Kralingen). Check vooraf bij de gemeente.",
    energieTip: "Veel naoorlogse woningen in Rotterdam hebben een energielabel D–F. Buitengevelisolatie kan het label met 1–3 stappen verbeteren.",
    gemeenteWebsite: "https://www.rotterdam.nl/wonen-leven/energiebesparing/",
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
    bouwperiode: "Mix van vooroorlogse herenhuizen en naoorlogse portiekflats (jaren '50–'70).",
    gemiddeldBesparing: "Gemiddeld €500–€850/jaar besparing bij een bovenwoning of rijtjeshuis.",
    subsidieInfo: "ISDE-subsidie (landelijk) tot ±€4.400. Gemeente Den Haag biedt de Ookal-lening en het Haags Energieakkoord voor verduurzaming.",
    vergunningTip: "In het Willemspark, Statenkwartier en andere beschermde stadsgezichten zijn aanvullende regels van kracht. Wij checken dit vooraf.",
    energieTip: "Veel Haagse vooroorlogse woningen hebben massief metselwerk zonder spouw. ETICS is hier de enige effectieve gevelisolatiemethode.",
    gemeenteWebsite: "https://www.denhaag.nl/nl/wonen-en-bouwen/duurzaam-wonen.htm",
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
    bouwperiode: "Naoorlogse uitbreidingswijken (jaren '60–'80) naast historische binnenstad.",
    gemiddeldBesparing: "Gemiddeld €550–€800/jaar besparing bij een rijtjeshuis in Voorhof of Tanthof.",
    subsidieInfo: "ISDE-subsidie (landelijk) tot ±€4.400. Gemeente Delft biedt de Duurzaamheidslening en gratis energieadvies voor woningeigenaren.",
    vergunningTip: "De binnenstad van Delft is beschermd stadsgezicht. Buiten de binnenstad is buitengevelisolatie doorgaans vergunningvrij.",
    energieTip: "De jaren '70-woningen in Voorhof en Buitenhof hebben vaak een Rc-waarde van 0,3–0,5. ETICS brengt dit naar Rc 3,5+ conform het Bouwbesluit.",
    gemeenteWebsite: "https://www.delft.nl/duurzaamheid",
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
    bouwperiode: "Overwegend jaren '50–'70 met grote naoorlogse wijken (Wielwijk, Crabbehof).",
    gemiddeldBesparing: "Gemiddeld €600–€900/jaar besparing bij een typisch naoorlogs rijtjeshuis.",
    subsidieInfo: "ISDE-subsidie (landelijk) tot ±€4.400. Gemeente Dordrecht biedt de Duurzaamheidslening en het Energieloket Drechtsteden.",
    vergunningTip: "De historische binnenstad (eiland van Dordrecht) heeft beschermd stadsgezicht. In de naoorlogse wijken is ETICS doorgaans vergunningvrij.",
    energieTip: "Dordrecht heeft relatief veel enkelsteens woningen uit de wederopbouwperiode. Deze profiteren het meest van buitengevelisolatie.",
    gemeenteWebsite: "https://www.dordrecht.nl/duurzaamheid",
  },
  {
    slug: "schiedam",
    city: "Schiedam",
    region: "Zuid-Holland",
    title: "Gevelisolatie Schiedam – ETICS prijs per m² | BM Klus BV",
    description:
      "Buitengevelisolatie (ETICS) in Schiedam. Stuc, sierpleister of steenstrips. Gratis opname en offerte per m². Specialist uit Rotterdam.",
    h1: "Gevelisolatie in Schiedam",
    intro:
      "BM Klus BV verzorgt buitengevelisolatie (ETICS) voor woningen en bedrijfspanden in Schiedam. Van Nieuwland tot Groenoord, van West-Frankelandsepolder tot Kethel — wij komen kosteloos bij u langs voor een opname en offerte.",
    localContext:
      "Schiedam grenst direct aan Rotterdam en kent veel naoorlogse woningbouw in wijken als Nieuwland, Groenoord en Woudhoek. De typische portiekflats en rijtjeshuizen uit de jaren '50–'70 zijn vaak slecht geïsoleerd. Buitengevelisolatie is hier een effectieve aanpak: geen woonruimteverlies en direct zichtbaar resultaat aan de gevel.",
    woningTypes: [
      "Naoorlogse rijtjeshuizen (Nieuwland, Woudhoek)",
      "Portiekflats en galerijflats (Groenoord)",
      "Vooroorlogse woningen in het centrum",
      "Twee-onder-een-kapwoningen (Kethel)",
      "VvE-complexen",
    ],
    afstanden: "Schiedam grenst aan Rotterdam — geen voorrijkosten.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Schiedam?",
        antwoord:
          "De prijs voor buitengevelisolatie in Schiedam start vanaf €110/m² (ETICS + pleisterafwerking, incl. arbeid & materiaal, excl. steiger). De exacte prijs hangt af van de geveloppervlakte, de afwerking en de staat van de ondergrond. Na een gratis opname ontvangt u een vaste offerte per m².",
      },
      {
        vraag: "Heb ik een vergunning nodig in Schiedam?",
        antwoord:
          "In de meeste gevallen is in Schiedam geen omgevingsvergunning nodig voor buitengevelisolatie, tenzij het pand in een beschermd stadsgezicht ligt (bijv. de historische binnenstad). Wij checken dit vooraf bij de gemeente.",
      },
      {
        vraag: "Werkt BM Klus BV ook in Kethel en Woudhoek?",
        antwoord:
          "Ja, wij werken in heel Schiedam inclusief alle wijken: Nieuwland, Groenoord, Woudhoek, Kethel, West-Frankelandsepolder en de binnenstad.",
      },
    ],
    bouwperiode: "Voornamelijk jaren '50–'70, met grote naoorlogse flatwijken.",
    gemiddeldBesparing: "Gemiddeld €500–€800/jaar besparing bij een portiekflat of rijtjeshuis.",
    subsidieInfo: "ISDE-subsidie (landelijk) tot ±€4.400. Gemeente Schiedam biedt de Duurzaamheidslening en werkt samen met het regionaal Energieloket.",
    vergunningTip: "De historische jeneverstad (binnenstad) kent beschermd stadsgezicht. In de naoorlogse wijken als Nieuwland en Groenoord is ETICS vergunningvrij.",
    energieTip: "De portiekflats in Groenoord en Nieuwland zijn veelal ongeïsoleerd. VvE-projecten met ETICS leveren hier grote energiebesparingen op.",
    gemeenteWebsite: "https://www.schiedam.nl/duurzaamheid",
  },
  {
    slug: "vlaardingen",
    city: "Vlaardingen",
    region: "Zuid-Holland",
    title: "Gevelisolatie Vlaardingen – ETICS prijs per m² | BM Klus BV",
    description:
      "Buitengevelisolatie (ETICS) in Vlaardingen. Stuc, sierpleister of steenstrips. Gratis opname, offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Vlaardingen",
    intro:
      "BM Klus BV verzorgt buitengevelisolatie voor woningen en bedrijfspanden in Vlaardingen. Van Holy tot Westwijk, van Centrum tot Ambacht — wij adviseren u over de beste aanpak voor uw gevel.",
    localContext:
      "Vlaardingen heeft veel naoorlogse woonwijken zoals Holy, Westwijk en de Vettenoordse polder met rijtjeshuizen en flats die veelal een enkelsteens of smalle spouwmuur hebben. Deze woningen zijn bij uitstek geschikt voor buitengevelisolatie. Ook in de oudere stadskernen zijn er mogelijkheden, mits de ondergrond goed beoordeeld wordt.",
    woningTypes: [
      "Naoorlogse rijtjeshuizen (Holy, Westwijk)",
      "Portiekflats en galerijflats",
      "Eengezinswoningen (Vettenoordse polder)",
      "Vooroorlogse woningen in het centrum",
    ],
    afstanden: "Vlaardingen ligt op ±15 km van ons kantoor — geen voorrijkosten.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Vlaardingen?",
        antwoord:
          "De kosten voor buitengevelisolatie in Vlaardingen starten vanaf €110/m² voor ETICS + pleisterafwerking. De exacte prijs is afhankelijk van het woningtype, de oppervlakte en de gekozen afwerking. Na een gratis opname ontvangt u een vaste offerte.",
      },
      {
        vraag: "Hoelang duurt gevelisolatie in Vlaardingen?",
        antwoord:
          "Een gemiddeld rijtjeshuis (±60 m² geveloppervlak) duurt doorgaans 1–2 weken, afhankelijk van de gekozen afwerking en eventueel herstelwerk. De exacte planning bespreken wij bij de opname.",
      },
    ],
    bouwperiode: "Overwegend jaren '60–'80 met typische groeikernwoningen.",
    gemiddeldBesparing: "Gemiddeld €550–€800/jaar besparing bij een rijtjeshuis in Holy of Westwijk.",
    subsidieInfo: "ISDE-subsidie (landelijk) tot ±€4.400. Gemeente Vlaardingen werkt samen met het regionaal Energieloket voor advies en financieringsmogelijkheden.",
    vergunningTip: "In Vlaardingen is buitengevelisolatie in de meeste wijken vergunningvrij. Het oude centrum kan aanvullende eisen hebben.",
    energieTip: "De rijtjeshuizen in Holy en Westwijk (bouwjaar '65–'80) hebben typisch een Rc-waarde van 0,2–0,5. Na ETICS bereiken zij Rc 3,5+.",
  },
  {
    slug: "leiden",
    city: "Leiden",
    region: "Zuid-Holland",
    title: "Gevelisolatie Leiden – ETICS prijs per m² | BM Klus BV",
    description:
      "Buitengevelisolatie (ETICS) in Leiden en omgeving. Stuc, sierpleister of steenstrips. Gratis opname en offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Leiden",
    intro:
      "BM Klus BV verzorgt buitengevelisolatie (ETICS) voor woningen en bedrijfspanden in Leiden en omgeving. Van de Merenwijk tot Stevenshof, van Leiden-Noord tot de Professorenwijk — wij komen kosteloos bij u langs.",
    localContext:
      "Leiden is een historische universiteitsstad met een gevarieerd woningbestand. De binnenstad kent veel grachtenpanden en beschermde stadsgezichten waarvoor maatwerk nodig is. In de naoorlogse wijken — Merenwijk, Stevenshof, Leiden-Noord — staan veel rijtjeshuizen en flats met slechte isolatiewaarden. Buitengevelisolatie biedt hier een duurzame oplossing.",
    woningTypes: [
      "Naoorlogse rijtjeshuizen (Merenwijk, Stevenshof)",
      "Portiekflats en galerijflats (Leiden-Noord)",
      "Grachtenpanden en herenhuizen (binnenstad, met maatwerk)",
      "Eengezinswoningen (Professorenwijk, De Kooi)",
      "VvE-complexen",
    ],
    afstanden: "Leiden ligt op ±35 km van ons kantoor — geen voorrijkosten.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Leiden?",
        antwoord:
          "De prijs voor buitengevelisolatie in Leiden start vanaf €110/m² voor ETICS + pleisterafwerking. Bij steenstrips begint de prijs vanaf ±€200/m². De exacte kosten worden na een gratis opname vastgesteld.",
      },
      {
        vraag: "Mag ik mijn gevel isoleren in de Leidse binnenstad?",
        antwoord:
          "Dat hangt af van de exacte locatie en het type pand. In het beschermd stadsgezicht gelden strengere regels. Wij checken vooraf bij de gemeente Leiden welke mogelijkheden er zijn en of een vergunning nodig is.",
      },
      {
        vraag: "Werkt BM Klus BV ook in Leiderdorp en Oegstgeest?",
        antwoord:
          "Ja, ons werkgebied omvat heel Leiden en de omliggende gemeenten: Leiderdorp, Oegstgeest, Voorschoten en Zoeterwoude.",
      },
    ],
    bouwperiode: "Mix van historische grachtenpanden en naoorlogse uitbreidingswijken (jaren '60–'80).",
    gemiddeldBesparing: "Gemiddeld €500–€850/jaar besparing bij een rijtjeshuis in Merenwijk of Stevenshof.",
    subsidieInfo: "ISDE-subsidie (landelijk) tot ±€4.400. Gemeente Leiden biedt de Leidse Duurzaamheidslening en een gratis energiescan voor woningeigenaren.",
    vergunningTip: "De Leidse binnenstad is beschermd stadsgezicht met strenge regels. In de naoorlogse wijken (Merenwijk, Stevenshof) is ETICS doorgaans vergunningvrij.",
    energieTip: "Veel grachtenpanden in Leiden hebben massieve gevels zonder spouw. ETICS is hier de enige optie, mits de gemeente toestemming geeft voor het gewijzigde gevelbeeld.",
    gemeenteWebsite: "https://www.leiden.nl/duurzaam",
  },
  {
    slug: "gouda",
    city: "Gouda",
    region: "Zuid-Holland",
    title: "Gevelisolatie Gouda – ETICS prijs per m² | BM Klus BV",
    description:
      "Buitengevelisolatie (ETICS) in Gouda en omgeving. Stuc, sierpleister of steenstrips. Gratis opname, offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Gouda",
    intro:
      "BM Klus BV verzorgt buitengevelisolatie voor woningen en bedrijfspanden in Gouda en omgeving. Van Goverwelle tot Bloemendaal, van de Plaswijckbuurt tot Kort Haarlem — wij adviseren u kosteloos.",
    localContext:
      "Gouda kent naast de historische binnenstad veel naoorlogse uitbreidingswijken zoals Goverwelle, Bloemendaal en de Plaswijckbuurt. De woningen in deze wijken — vaak rijtjeshuizen met enkelsteens gevels — zijn bij uitstek geschikt voor buitengevelisolatie. In de binnenstad gelden aanvullende regels vanwege het beschermde stadsgezicht.",
    woningTypes: [
      "Naoorlogse rijtjeshuizen (Goverwelle, Bloemendaal)",
      "Portiekflats (Kort Haarlem, Oost)",
      "Eengezinswoningen (Plaswijckbuurt)",
      "Historische panden binnenstad (met maatwerk)",
    ],
    afstanden: "Gouda ligt op ±30 km van ons kantoor — geen voorrijkosten.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Gouda?",
        antwoord:
          "De kosten voor buitengevelisolatie in Gouda starten vanaf €110/m² voor ETICS + pleisterafwerking. De prijs is afhankelijk van het type woning, de oppervlakte en de gekozen afwerking. Na een gratis opname ontvangt u een vaste offerte.",
      },
      {
        vraag: "Heb ik een vergunning nodig in Gouda?",
        antwoord:
          "Voor de meeste woningen in Gouda is geen omgevingsvergunning nodig voor buitengevelisolatie. In het beschermd stadsgezicht (binnenstad) gelden strengere regels. Wij checken dit vooraf bij de gemeente Gouda.",
      },
    ],
    bouwperiode: "Naoorlogse uitbreidingswijken (jaren '60–'80) en historische binnenstad.",
    gemiddeldBesparing: "Gemiddeld €550–€800/jaar besparing bij een rijtjeshuis in Goverwelle of Bloemendaal.",
    subsidieInfo: "ISDE-subsidie (landelijk) tot ±€4.400. Gemeente Gouda biedt de Duurzaamheidslening en het Energieloket Midden-Holland.",
    vergunningTip: "De binnenstad van Gouda is beschermd stadsgezicht. In de naoorlogse wijken is buitengevelisolatie doorgaans vergunningvrij.",
    energieTip: "De jaren '70-rijtjeshuizen in Goverwelle hebben een typische Rc-waarde van 0,3–0,6. Buitengevelisolatie brengt dit naar Rc 3,5+ en verbetert het energielabel aanzienlijk.",
  },
  {
    slug: "zoetermeer",
    city: "Zoetermeer",
    region: "Zuid-Holland",
    title: "Gevelisolatie Zoetermeer – ETICS prijs per m² | BM Klus BV",
    description:
      "Buitengevelisolatie (ETICS) in Zoetermeer. Stuc, sierpleister of steenstrips. Gratis opname en offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Zoetermeer",
    intro:
      "BM Klus BV verzorgt buitengevelisolatie (ETICS) voor woningen en bedrijfspanden in Zoetermeer. Van Palenstein tot Meerzicht, van Buytenwegh tot Rokkeveen — wij komen kosteloos bij u langs voor een opname en offerte.",
    localContext:
      "Zoetermeer is grotendeels gebouwd in de jaren '60–'80 als groeikern van Den Haag. De wijken Palenstein, Meerzicht, Buytenwegh en Seghwaert bestaan voornamelijk uit rijtjeshuizen en portiekflats met enkelsteens of smalle spouwgevels. Deze woningen zijn bij uitstek geschikt voor buitengevelisolatie — er is veel oppervlak te winnen met relatief eenvoudige geveldetaillering.",
    woningTypes: [
      "Rijtjeshuizen (Palenstein, Meerzicht, Buytenwegh)",
      "Portiekflats en galerijflats (Seghwaert)",
      "Eengezinswoningen (Rokkeveen, Oosterheem)",
      "VvE-complexen",
    ],
    afstanden: "Zoetermeer ligt op ±25 km van ons kantoor — geen voorrijkosten.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Zoetermeer?",
        antwoord:
          "De prijs voor buitengevelisolatie in Zoetermeer start vanaf €110/m² (ETICS + pleisterafwerking, incl. arbeid & materiaal, excl. steiger). De exacte prijs volgt na een gratis opname ter plaatse.",
      },
      {
        vraag: "Zijn de jaren '70-woningen in Zoetermeer geschikt voor ETICS?",
        antwoord:
          "Ja, de typische naoorlogse bouw in Zoetermeer (enkelsteens of smalle spouw) leent zich uitstekend voor buitengevelisolatie. Wij beoordelen bij de opname of de ondergrond in orde is en adviseren over de juiste aanpak.",
      },
      {
        vraag: "Werkt BM Klus BV ook samen met VvE's in Zoetermeer?",
        antwoord:
          "Ja, wij werken regelmatig samen met VvE's. Wij maken een offerte per m² op basis van het totale geveloppervlak en stemmen de planning af met het VvE-bestuur.",
      },
    ],
    bouwperiode: "Grotendeels jaren '60–'80, gebouwd als groeikern van Den Haag.",
    gemiddeldBesparing: "Gemiddeld €600–€900/jaar besparing bij een typisch groeikernwoning.",
    subsidieInfo: "ISDE-subsidie (landelijk) tot ±€4.400. Gemeente Zoetermeer biedt het Zoetermeers Duurzaamheidsfonds en de Energiecoach aan huis.",
    vergunningTip: "In Zoetermeer is buitengevelisolatie in vrijwel alle wijken vergunningvrij. Er zijn geen beschermde stadsgezichten die beperkingen opleggen.",
    energieTip: "Als groeikern zijn veel woningen in Zoetermeer snel gebouwd met minimale isolatie. ETICS is bijzonder effectief bij de typische enkelsteens gevels in Palenstein en Meerzicht.",
  },
  {
    slug: "capelle-aan-den-ijssel",
    city: "Capelle aan den IJssel",
    region: "Zuid-Holland",
    title: "Gevelisolatie Capelle aan den IJssel – ETICS prijs per m² | BM Klus BV",
    description:
      "Buitengevelisolatie (ETICS) in Capelle aan den IJssel. Stuc, sierpleister of steenstrips. Gratis opname, offerte per m². Direct naast Rotterdam.",
    h1: "Gevelisolatie in Capelle aan den IJssel",
    intro:
      "BM Klus BV verzorgt buitengevelisolatie voor woningen en bedrijfspanden in Capelle aan den IJssel. Van Schollevaar tot Oostgaarde, van Schenkel tot Middelwatering — wij komen kosteloos bij u langs.",
    localContext:
      "Capelle aan den IJssel grenst direct aan Rotterdam en is in de jaren '60–'70 snel uitgebreid met wijken als Schollevaar, Oostgaarde en 's-Gravenland. De typische portiekflats, galerijflats en rijtjeshuizen uit deze periode hebben vaak ongeïsoleerde of slecht geïsoleerde gevels. Buitengevelisolatie is hier een effectieve en veelgekozen oplossing.",
    woningTypes: [
      "Portiekflats en galerijflats (Schollevaar, Oostgaarde)",
      "Naoorlogse rijtjeshuizen ('s-Gravenland)",
      "Eengezinswoningen (Schenkel, Middelwatering)",
      "VvE-complexen (flatgebouwen)",
    ],
    afstanden: "Capelle aan den IJssel grenst aan Rotterdam — geen voorrijkosten.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Capelle aan den IJssel?",
        antwoord:
          "De kosten voor buitengevelisolatie in Capelle aan den IJssel starten vanaf €110/m² voor ETICS + pleisterafwerking. De exacte prijs is afhankelijk van het woningtype, de oppervlakte en de afwerking. Na een gratis opname ontvangt u een vaste offerte per m².",
      },
      {
        vraag: "Zijn de flats in Schollevaar geschikt voor gevelisolatie?",
        antwoord:
          "Ja, de portiekflats en galerijflats in Schollevaar en Oostgaarde zijn vanwege hun bouwperiode en gevelconstructie zeer geschikt voor ETICS. Wij werken hierbij samen met VvE-besturen voor een efficiënte aanpak.",
      },
    ],
    bouwperiode: "Voornamelijk jaren '60–'70, als uitbreiding van Rotterdam.",
    gemiddeldBesparing: "Gemiddeld €600–€850/jaar besparing bij een portiekflat of rijtjeshuis.",
    subsidieInfo: "ISDE-subsidie (landelijk) tot ±€4.400. Gemeente Capelle aan den IJssel biedt een Duurzaamheidslening en werkt samen met het Energieloket.",
    vergunningTip: "In Capelle is buitengevelisolatie in de meeste wijken vergunningvrij. Er zijn geen beschermde stadsgezichten.",
    energieTip: "De portiekflats in Schollevaar en Oostgaarde (bouwjaar '65–'75) zijn veelal volledig ongeïsoleerd. VvE-projecten met ETICS leveren direct merkbare comfort- en energieverbetering.",
  },
  {
    slug: "spijkenisse",
    city: "Spijkenisse",
    region: "Zuid-Holland",
    title: "Gevelisolatie Spijkenisse – ETICS prijs per m² | BM Klus BV",
    description:
      "Buitengevelisolatie (ETICS) in Spijkenisse (Nissewaard). Stuc, sierpleister of steenstrips. Gratis opname en offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Spijkenisse",
    intro:
      "BM Klus BV verzorgt buitengevelisolatie voor woningen en bedrijfspanden in Spijkenisse en de gemeente Nissewaard. Van de Akkers tot Waterland, van Vogelenzang tot de Hoek — wij adviseren u kosteloos.",
    localContext:
      "Spijkenisse is als groeikern sterk uitgebreid in de jaren '70–'80 met grote woonwijken als de Akkers, Groenewoud en Waterland. De massale woningbouw uit deze periode — rijtjeshuizen, twee-onder-een-kapwoningen en flats — heeft veelal enkelsteens of smalle spouwgevels zonder noemenswaardige isolatie. Buitengevelisolatie levert hier direct merkbaar comfort en energiebesparing op.",
    woningTypes: [
      "Rijtjeshuizen (de Akkers, Groenewoud)",
      "Twee-onder-een-kapwoningen (Waterland)",
      "Portiekflats en galerijflats",
      "Eengezinswoningen (Vogelenzang, de Hoek)",
    ],
    afstanden: "Spijkenisse ligt op ±20 km van ons kantoor — geen voorrijkosten.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Spijkenisse?",
        antwoord:
          "De prijs voor buitengevelisolatie in Spijkenisse start vanaf €110/m² voor ETICS + pleisterafwerking. De exacte prijs hangt af van de geveloppervlakte, de afwerking en de staat van de ondergrond. Na een gratis opname ontvangt u een vaste offerte.",
      },
      {
        vraag: "Zijn de jaren '70-woningen in Spijkenisse geschikt voor ETICS?",
        antwoord:
          "Ja, de typische groeikernwoningen in Spijkenisse (bouwjaar '70–'85) zijn zeer geschikt voor buitengevelisolatie. De enkelsteens of smalle spouwgevels bieden weinig isolatiewaarde — ETICS brengt de gevel direct op het gewenste niveau.",
      },
    ],
    bouwperiode: "Grotendeels jaren '70–'80, gebouwd als groeikern.",
    gemiddeldBesparing: "Gemiddeld €550–€850/jaar besparing bij een typische groeikernwoning.",
    subsidieInfo: "ISDE-subsidie (landelijk) tot ±€4.400. Gemeente Nissewaard biedt advies via het Energieloket Voorne-Putten.",
    vergunningTip: "In Spijkenisse is buitengevelisolatie doorgaans vergunningvrij. Geen beschermde stadsgezichten.",
    energieTip: "De groeikernwoningen in de Akkers en Groenewoud (bouwjaar '72–'85) hebben standaard minimale isolatie. ETICS verbetert de Rc-waarde naar 3,5+ en het energielabel met 1–3 stappen.",
  },
  {
    slug: "barendrecht",
    city: "Barendrecht",
    region: "Zuid-Holland",
    title: "Gevelisolatie Barendrecht – ETICS prijs per m² | BM Klus BV",
    description:
      "Buitengevelisolatie (ETICS) in Barendrecht. Stuc, sierpleister of steenstrips. Gratis opname, offerte per m². Specialist direct naast Rotterdam.",
    h1: "Gevelisolatie in Barendrecht",
    intro:
      "BM Klus BV verzorgt buitengevelisolatie voor woningen en bedrijfspanden in Barendrecht. Van Carnisselande tot het oude dorp, van de Oranjewijk tot Vrijheidsakker — wij komen kosteloos bij u langs.",
    localContext:
      "Barendrecht ligt direct ten zuiden van Rotterdam en kent een mix van oudere dorpsbebouwing en grootschalige nieuwbouw (Carnisselande, jaren '90–'00). De oudere woningen in het dorp en de Oranjewijk hebben vaak slecht geïsoleerde gevels. Ook woningen uit de jaren '80–'90 profiteren van buitengevelisolatie, zeker wanneer de spouw niet of onvoldoende is gevuld.",
    woningTypes: [
      "Eengezinswoningen (Carnisselande)",
      "Oudere dorpswoningen (centrum Barendrecht)",
      "Rijtjeshuizen (Oranjewijk, Vrijheidsakker)",
      "Twee-onder-een-kapwoningen",
    ],
    afstanden: "Barendrecht ligt op ±10 km van ons kantoor — geen voorrijkosten.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Barendrecht?",
        antwoord:
          "De kosten voor buitengevelisolatie in Barendrecht starten vanaf €110/m² voor ETICS + pleisterafwerking. De exacte prijs wordt na een gratis opname ter plaatse vastgesteld.",
      },
      {
        vraag: "Zijn de woningen in Carnisselande geschikt voor ETICS?",
        antwoord:
          "Woningen in Carnisselande (bouwjaar '95–'05) hebben doorgaans een betere basisisolatie, maar kunnen alsnog profiteren van buitengevelisolatie — vooral wanneer de spouw onvoldoende is gevuld of de Rc-waarde onder de huidige norm ligt. Wij beoordelen dit bij de opname.",
      },
    ],
    bouwperiode: "Mix van oudere dorpsbebouwing en nieuwbouw (Carnisselande, jaren '95–'05).",
    gemiddeldBesparing: "Gemiddeld €400–€700/jaar besparing. Nieuwere woningen (Carnisselande) hebben een lagere besparing dan oudere dorpswoningen.",
    subsidieInfo: "ISDE-subsidie (landelijk) tot ±€4.400. Gemeente Barendrecht biedt de Duurzaamheidslening via het Energieloket BAR-gemeenten.",
    vergunningTip: "In Barendrecht is buitengevelisolatie doorgaans vergunningvrij. Geen beschermde stadsgezichten.",
    energieTip: "De oudere dorpswoningen in het centrum van Barendrecht profiteren het meest. Woningen in Carnisselande hebben vaak al een betere basisisolatie — een energiescan bepaalt of ETICS meerwaarde biedt.",
  },
  {
    slug: "ridderkerk",
    city: "Ridderkerk",
    region: "Zuid-Holland",
    title: "Gevelisolatie Ridderkerk – ETICS prijs per m² | BM Klus BV",
    description:
      "Buitengevelisolatie (ETICS) in Ridderkerk. Stuc, sierpleister of steenstrips. Gratis opname en offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Ridderkerk",
    intro:
      "BM Klus BV verzorgt buitengevelisolatie voor woningen en bedrijfspanden in Ridderkerk. Van Drievliet tot Bolnes, van Slikkerveer tot Rijsoord — wij adviseren u kosteloos over de beste aanpak.",
    localContext:
      "Ridderkerk ligt op het eiland IJsselmonde, direct ten zuiden van Rotterdam. De gemeente kent veel naoorlogse woningbouw in wijken als Drievliet, Bolnes en het centrum. Deze woningen — rijtjeshuizen en portiekflats met enkelsteens gevels — zijn ideaal voor buitengevelisolatie. Ook in de oudere dorpskernen (Slikkerveer, Rijsoord) zijn er mogelijkheden.",
    woningTypes: [
      "Naoorlogse rijtjeshuizen (Drievliet, centrum)",
      "Portiekflats (Bolnes)",
      "Eengezinswoningen (Rijsoord)",
      "Twee-onder-een-kapwoningen (Slikkerveer)",
    ],
    afstanden: "Ridderkerk ligt op ±15 km van ons kantoor — geen voorrijkosten.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Ridderkerk?",
        antwoord:
          "De prijs voor buitengevelisolatie in Ridderkerk start vanaf €110/m² voor ETICS + pleisterafwerking. De exacte prijs is afhankelijk van de geveloppervlakte, het woningtype en de gekozen afwerking.",
      },
      {
        vraag: "Werkt BM Klus BV ook in Bolnes en Slikkerveer?",
        antwoord:
          "Ja, wij werken in heel Ridderkerk inclusief Bolnes, Slikkerveer, Rijsoord en Drievliet. Na een gratis opname ontvangt u een vaste offerte per m².",
      },
    ],
    bouwperiode: "Overwegend jaren '50–'70 met naoorlogse wijken op IJsselmonde.",
    gemiddeldBesparing: "Gemiddeld €550–€850/jaar besparing bij een naoorlogs rijtjeshuis.",
    subsidieInfo: "ISDE-subsidie (landelijk) tot ±€4.400. Gemeente Ridderkerk biedt advies via het Energieloket BAR-gemeenten.",
    vergunningTip: "In Ridderkerk is buitengevelisolatie in de meeste wijken vergunningvrij. De historische dorpskernen kunnen aanvullende eisen hebben.",
    energieTip: "De naoorlogse woningen in Drievliet en Bolnes hebben enkelsteens gevels met een Rc-waarde van 0,2–0,4. ETICS is hier de meest effectieve isolatiemethode.",
  },
  {
    slug: "alphen-aan-den-rijn",
    city: "Alphen aan den Rijn",
    region: "Zuid-Holland",
    title: "Gevelisolatie Alphen aan den Rijn – ETICS prijs per m² | BM Klus BV",
    description:
      "Buitengevelisolatie (ETICS) in Alphen aan den Rijn. Stuc, sierpleister of steenstrips. Gratis opname, offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Alphen aan den Rijn",
    intro:
      "BM Klus BV verzorgt buitengevelisolatie voor woningen en bedrijfspanden in Alphen aan den Rijn en omgeving. Van de Ridder Huysmanlaan tot Kerk en Zanen, van de Lage Zijde tot Ridderveld — wij komen kosteloos bij u langs.",
    localContext:
      "Alphen aan den Rijn is een middelgrote stad met een gevarieerd woningbestand. De naoorlogse wijken (Ridderveld, De Baronie, Kerk en Zanen) bevatten veel rijtjeshuizen en flats met ongeïsoleerde of slecht geïsoleerde gevels. Buitengevelisolatie is een effectieve maatregel die zowel het wooncomfort als de energieprestatie aanzienlijk verbetert.",
    woningTypes: [
      "Naoorlogse rijtjeshuizen (Ridderveld, De Baronie)",
      "Portiekflats (Kerk en Zanen)",
      "Eengezinswoningen (Nieuwe Sloot)",
      "Twee-onder-een-kapwoningen",
    ],
    afstanden: "Alphen aan den Rijn ligt op ±40 km van ons kantoor — geen voorrijkosten.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Alphen aan den Rijn?",
        antwoord:
          "De kosten voor buitengevelisolatie in Alphen aan den Rijn starten vanaf €110/m² voor ETICS + pleisterafwerking. Na een gratis opname ontvangt u een vaste offerte per m².",
      },
      {
        vraag: "Werkt BM Klus BV ook in Boskoop en Hazerswoude?",
        antwoord:
          "Ja, ons werkgebied omvat heel Alphen aan den Rijn en de omliggende kernen: Boskoop, Hazerswoude-Rijndijk, Hazerswoude-Dorp en Zwammerdam.",
      },
    ],
    bouwperiode: "Naoorlogse uitbreidingswijken (jaren '60–'80) en nieuwere vinexlocaties.",
    gemiddeldBesparing: "Gemiddeld €550–€800/jaar besparing bij een rijtjeshuis in Ridderveld of De Baronie.",
    subsidieInfo: "ISDE-subsidie (landelijk) tot ±€4.400. Gemeente Alphen aan den Rijn biedt de Duurzaamheidslening en een gratis energieadvies.",
    vergunningTip: "In Alphen aan den Rijn is buitengevelisolatie doorgaans vergunningvrij. In het centrum kunnen aanvullende regels gelden.",
    energieTip: "De jaren '70-woningen in Ridderveld en De Baronie hebben een Rc-waarde van 0,3–0,5. Na ETICS stijgt deze naar 3,5+ en verbetert het energielabel aanzienlijk.",
    gemeenteWebsite: "https://www.alphenaandenrijn.nl/duurzaamheid",
  },
  {
    slug: "maassluis",
    city: "Maassluis",
    region: "Zuid-Holland",
    title: "Gevelisolatie Maassluis – ETICS prijs per m² | BM Klus BV",
    description:
      "Buitengevelisolatie (ETICS) in Maassluis. Stuc, sierpleister of steenstrips. Gratis opname en offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Maassluis",
    intro:
      "BM Klus BV verzorgt buitengevelisolatie voor woningen en bedrijfspanden in Maassluis. Van het Balkon tot Sluispolder, van Koningshoek tot de Dijkpolder — wij adviseren u kosteloos.",
    localContext:
      "Maassluis ligt tussen Rotterdam en Hoek van Holland en kent een compacte mix van naoorlogse woningbouw en nieuwere uitbreidingswijken. De wijken Sluispolder, het Balkon en Koningshoek bevatten veel rijtjeshuizen en portiekflats uit de jaren '60–'80 die baat hebben bij buitengevelisolatie. De nieuwere Dijkpolder heeft modernere woningen, maar ook daar kan ETICS meerwaarde bieden.",
    woningTypes: [
      "Naoorlogse rijtjeshuizen (Sluispolder, het Balkon)",
      "Portiekflats (Koningshoek)",
      "Eengezinswoningen (Dijkpolder)",
      "Vooroorlogse woningen (centrum)",
    ],
    afstanden: "Maassluis ligt op ±20 km van ons kantoor — geen voorrijkosten.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Maassluis?",
        antwoord:
          "De prijs voor buitengevelisolatie in Maassluis start vanaf €110/m² voor ETICS + pleisterafwerking. De exacte prijs hangt af van het woningtype en de gekozen afwerking. Na een gratis opname ontvangt u een vaste offerte.",
      },
      {
        vraag: "Werkt BM Klus BV ook in Maasland en Hoek van Holland?",
        antwoord:
          "Ja, ons werkgebied omvat heel Maassluis en de omliggende gebieden, inclusief Maasland en Hoek van Holland.",
      },
    ],
    bouwperiode: "Overwegend jaren '60–'80 met compacte naoorlogse wijken.",
    gemiddeldBesparing: "Gemiddeld €500–€750/jaar besparing bij een rijtjeshuis.",
    subsidieInfo: "ISDE-subsidie (landelijk) tot ±€4.400. Gemeente Maassluis biedt advies via het regionaal Energieloket.",
    vergunningTip: "In Maassluis is buitengevelisolatie doorgaans vergunningvrij. Het oude centrum kan aanvullende eisen hebben.",
    energieTip: "De rijtjeshuizen in Sluispolder en het Balkon (bouwjaar '60–'80) zijn typisch ongeïsoleerd. Door de ligging nabij de kust is gevelisolatie ook effectief tegen vochtproblemen.",
  },
  {
    slug: "hellevoetsluis",
    city: "Hellevoetsluis",
    region: "Zuid-Holland",
    title: "Gevelisolatie Hellevoetsluis – ETICS prijs per m² | BM Klus BV",
    description:
      "Buitengevelisolatie (ETICS) in Hellevoetsluis (Voorne aan Zee). Stuc, sierpleister of steenstrips. Gratis opname, offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Hellevoetsluis",
    intro:
      "BM Klus BV verzorgt buitengevelisolatie voor woningen en bedrijfspanden in Hellevoetsluis en op Voorne-Putten. Van Nieuw-Helvoet tot de Vesting, van Kickersbloem tot Zuiderpark — wij komen kosteloos bij u langs.",
    localContext:
      "Hellevoetsluis ligt op Voorne-Putten en kent een mix van historische vestingbouw en naoorlogse uitbreidingswijken. De wijken Nieuw-Helvoet en het Zuiderpark bevatten veel rijtjeshuizen en eengezinswoningen uit de jaren '70–'90 die profiteren van buitengevelisolatie. In de vesting gelden soms aanvullende regels.",
    woningTypes: [
      "Rijtjeshuizen (Nieuw-Helvoet, Zuiderpark)",
      "Eengezinswoningen (Kickersbloem)",
      "Twee-onder-een-kapwoningen",
      "Historische panden in de Vesting (met maatwerk)",
    ],
    afstanden: "Hellevoetsluis ligt op ±35 km van ons kantoor — geen voorrijkosten.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Hellevoetsluis?",
        antwoord:
          "De kosten voor buitengevelisolatie in Hellevoetsluis starten vanaf €110/m² voor ETICS + pleisterafwerking. De exacte prijs wordt na een gratis opname ter plaatse vastgesteld.",
      },
      {
        vraag: "Werkt BM Klus BV ook in Brielle en Oostvoorne?",
        antwoord:
          "Ja, ons werkgebied omvat heel Voorne-Putten: Hellevoetsluis, Brielle, Oostvoorne, Rockanje en Zuidland.",
      },
    ],
    bouwperiode: "Mix van historische vestingbouw en naoorlogse uitbreiding (jaren '70–'90).",
    gemiddeldBesparing: "Gemiddeld €500–€750/jaar besparing bij een eengezinswoning.",
    subsidieInfo: "ISDE-subsidie (landelijk) tot ±€4.400. Gemeente Voorne aan Zee biedt advies via het Energieloket Voorne-Putten.",
    vergunningTip: "In de Vesting van Hellevoetsluis gelden regels voor beschermd stadsgezicht. In de naoorlogse wijken is ETICS doorgaans vergunningvrij.",
    energieTip: "Door de kustligging is vocht een veelvoorkomend probleem. ETICS biedt naast isolatie ook vochtbescherming voor de gevel — een dubbel voordeel voor woningen op Voorne-Putten.",
  },
  {
    slug: "breda",
    city: "Breda",
    region: "Noord-Brabant",
    title: "Gevelisolatie Breda – ETICS prijs per m² | BM Klus BV",
    description:
      "Buitengevelisolatie (ETICS) in Breda en omgeving. Stuc, sierpleister of steenstrips. Gratis opname en offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Breda",
    intro:
      "BM Klus BV verzorgt buitengevelisolatie (ETICS) voor woningen en bedrijfspanden in Breda en omgeving. Van Brabantpark tot Hoge Vucht, van Princenhage tot Tuinzigt — wij komen kosteloos bij u langs.",
    localContext:
      "Breda is de grootste stad in West-Brabant met een gevarieerd woningbestand. De naoorlogse wijken Hoge Vucht, Brabantpark en Geeren-Zuid bevatten veel portiekflats en rijtjeshuizen die toe zijn aan een isolatie-upgrade. Ook in Princenhage en Tuinzigt zijn er veel woningen met ongeïsoleerde gevels. Buitengevelisolatie is hier een populaire en effectieve maatregel.",
    woningTypes: [
      "Portiekflats en galerijflats (Hoge Vucht, Geeren-Zuid)",
      "Naoorlogse rijtjeshuizen (Brabantpark)",
      "Eengezinswoningen (Princenhage, Tuinzigt)",
      "Twee-onder-een-kapwoningen",
      "VvE-complexen",
    ],
    afstanden: "Breda ligt op ±55 km van ons kantoor — geen voorrijkosten binnen ons werkgebied.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Breda?",
        antwoord:
          "De prijs voor buitengevelisolatie in Breda start vanaf €110/m² voor ETICS + pleisterafwerking. Bij steenstrips begint de prijs vanaf ±€200/m². De exacte kosten worden na een gratis opname vastgesteld.",
      },
      {
        vraag: "Werkt een Rotterdams bedrijf ook in Breda?",
        antwoord:
          "Ja, Breda valt binnen ons werkgebied (±80–100 km rond Rotterdam). Wij werken regelmatig in West-Brabant en rekenen geen voorrijkosten. Na een gratis opname ontvangt u een vaste offerte per m².",
      },
      {
        vraag: "Werkt BM Klus BV ook in Oosterhout en Etten-Leur?",
        antwoord:
          "Ja, ons werkgebied omvat heel Breda en omliggende gemeenten: Oosterhout, Etten-Leur, Prinsenbeek en Teteringen.",
      },
    ],
    bouwperiode: "Grote naoorlogse wijken (jaren '50–'70) en nieuwere uitbreidingswijken.",
    gemiddeldBesparing: "Gemiddeld €600–€900/jaar besparing bij een naoorlogs rijtjeshuis of portiekflat.",
    subsidieInfo: "ISDE-subsidie (landelijk) tot ±€4.400. Gemeente Breda biedt de Bredase Energietoeslag en het Bredaas Energiefonds voor verduurzaming.",
    vergunningTip: "De binnenstad van Breda heeft beschermd stadsgezicht. In Hoge Vucht, Brabantpark en andere naoorlogse wijken is ETICS doorgaans vergunningvrij.",
    energieTip: "De portiekflats in Hoge Vucht en Geeren-Zuid behoren tot de slechtst geïsoleerde woningen in West-Brabant. Collectieve ETICS-projecten via de VvE leveren hier de grootste besparingen op.",
    gemeenteWebsite: "https://www.breda.nl/duurzaam",
  },
  {
    slug: "bergen-op-zoom",
    city: "Bergen op Zoom",
    region: "Noord-Brabant",
    title: "Gevelisolatie Bergen op Zoom – ETICS prijs per m² | BM Klus BV",
    description:
      "Buitengevelisolatie (ETICS) in Bergen op Zoom en omgeving. Stuc, sierpleister of steenstrips. Gratis opname, offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Bergen op Zoom",
    intro:
      "BM Klus BV verzorgt buitengevelisolatie voor woningen en bedrijfspanden in Bergen op Zoom en omgeving. Van de Bergse Plaat tot Gageldonk, van de Noordgeest tot het centrum — wij komen kosteloos bij u langs.",
    localContext:
      "Bergen op Zoom ligt aan de westrand van Noord-Brabant en kent naast een historische binnenstad veel naoorlogse uitbreidingswijken. De Bergse Plaat, Gageldonk en Noordgeest bevatten rijtjeshuizen en eengezinswoningen uit de jaren '60–'90 die goed geschikt zijn voor buitengevelisolatie. In de binnenstad gelden soms aanvullende regels vanwege het beschermde stadsgezicht.",
    woningTypes: [
      "Rijtjeshuizen (Gageldonk, Noordgeest)",
      "Eengezinswoningen (Bergse Plaat)",
      "Portiekflats (Fort-Zeekant)",
      "Historische panden binnenstad (met maatwerk)",
    ],
    afstanden: "Bergen op Zoom ligt op ±75 km van ons kantoor — geen voorrijkosten binnen ons werkgebied.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Bergen op Zoom?",
        antwoord:
          "De kosten voor buitengevelisolatie in Bergen op Zoom starten vanaf €110/m² voor ETICS + pleisterafwerking. De exacte prijs is afhankelijk van het woningtype en de gekozen afwerking. Na een gratis opname ontvangt u een vaste offerte.",
      },
      {
        vraag: "Valt Bergen op Zoom binnen het werkgebied van BM Klus BV?",
        antwoord:
          "Ja, Bergen op Zoom (±75 km) valt binnen ons werkgebied van ±80–100 km rond Rotterdam. Wij rekenen geen voorrijkosten en komen gratis bij u langs voor een opname.",
      },
    ],
    bouwperiode: "Naoorlogse uitbreidingswijken (jaren '60–'80) naast historische vestingstad.",
    gemiddeldBesparing: "Gemiddeld €500–€800/jaar besparing bij een eengezinswoning of rijtjeshuis.",
    subsidieInfo: "ISDE-subsidie (landelijk) tot ±€4.400. Gemeente Bergen op Zoom biedt de Duurzaamheidslening en advies via het West-Brabants Energieloket.",
    vergunningTip: "De binnenstad van Bergen op Zoom is beschermd stadsgezicht. In de naoorlogse wijken (Gageldonk, Noordgeest) is ETICS doorgaans vergunningvrij.",
    energieTip: "Door de ligging nabij de Westerschelde heeft Bergen op Zoom een relatief vochtig klimaat. ETICS beschermt de gevel niet alleen thermisch maar ook tegen vochtindringing.",
  },
  {
    slug: "roosendaal",
    city: "Roosendaal",
    region: "Noord-Brabant",
    title: "Gevelisolatie Roosendaal – ETICS prijs per m² | BM Klus BV",
    description:
      "Buitengevelisolatie (ETICS) in Roosendaal. Stuc, sierpleister of steenstrips. Gratis opname en offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Roosendaal",
    intro:
      "BM Klus BV verzorgt buitengevelisolatie voor woningen en bedrijfspanden in Roosendaal en omgeving. Van Langdonk tot Kroeven, van Tolberg tot Kalsdonk — wij adviseren u kosteloos.",
    localContext:
      "Roosendaal is een centrumgemeente in West-Brabant met veel naoorlogse woonwijken. De Kroeven, Langdonk en Tolberg zijn typische voorbeelden van jaren '60–'80-bouw met rijtjeshuizen en portiekflats die baat hebben bij buitengevelisolatie. De compacte gevelindeling maakt ETICS hier bijzonder kosteneffectief.",
    woningTypes: [
      "Naoorlogse rijtjeshuizen (Kroeven, Langdonk)",
      "Portiekflats (Tolberg)",
      "Eengezinswoningen (Kalsdonk)",
      "Twee-onder-een-kapwoningen",
    ],
    afstanden: "Roosendaal ligt op ±65 km van ons kantoor — geen voorrijkosten binnen ons werkgebied.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Roosendaal?",
        antwoord:
          "De prijs voor buitengevelisolatie in Roosendaal start vanaf €110/m² voor ETICS + pleisterafwerking. Na een gratis opname ontvangt u een vaste offerte per m².",
      },
      {
        vraag: "Werkt BM Klus BV ook in Nispen en Wouw?",
        antwoord:
          "Ja, ons werkgebied omvat heel Roosendaal en de omliggende kernen: Nispen, Wouw en Heerle.",
      },
    ],
    bouwperiode: "Overwegend jaren '60–'80 met typische naoorlogse woonwijken.",
    gemiddeldBesparing: "Gemiddeld €550–€800/jaar besparing bij een rijtjeshuis in Kroeven of Langdonk.",
    subsidieInfo: "ISDE-subsidie (landelijk) tot ±€4.400. Gemeente Roosendaal biedt advies via het West-Brabants Energieloket en de gemeentelijke Duurzaamheidslening.",
    vergunningTip: "In Roosendaal is buitengevelisolatie in de meeste wijken vergunningvrij. Geen beschermde stadsgezichten die beperkingen opleggen.",
    energieTip: "De naoorlogse rijtjeshuizen in Kroeven en Tolberg hebben een compacte gevelindeling die ETICS bijzonder kosteneffectief maakt — relatief veel m² oppervlak per woning.",
  },
  {
    slug: "leidschendam-voorburg",
    city: "Leidschendam-Voorburg",
    region: "Zuid-Holland",
    title: "Gevelisolatie Leidschendam-Voorburg – ETICS prijs per m² | BM Klus BV",
    description:
      "Buitengevelisolatie (ETICS) in Leidschendam-Voorburg. Stuc, sierpleister of steenstrips. Gratis opname, offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Leidschendam-Voorburg",
    intro:
      "BM Klus BV verzorgt buitengevelisolatie voor woningen en bedrijfspanden in Leidschendam-Voorburg. Van de Heuvel tot Prinsenhof, van Voorburg-West tot Stompwijk — wij komen kosteloos bij u langs.",
    localContext:
      "Leidschendam-Voorburg ligt tussen Den Haag en Zoetermeer en kent een mix van vooroorlogse bebouwing in Voorburg en naoorlogse uitbreidingswijken in Leidschendam. De Heuvel, Prinsenhof en Leidschendam-Noord bevatten veel rijtjeshuizen en flats uit de jaren '60–'80 die geschikt zijn voor buitengevelisolatie.",
    woningTypes: [
      "Naoorlogse rijtjeshuizen (de Heuvel, Prinsenhof)",
      "Portiekflats (Leidschendam-Noord)",
      "Vooroorlogse woningen (Voorburg centrum)",
      "Eengezinswoningen (Stompwijk)",
    ],
    afstanden: "Leidschendam-Voorburg ligt op ±25 km van ons kantoor — geen voorrijkosten.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Leidschendam-Voorburg?",
        antwoord:
          "De kosten voor buitengevelisolatie in Leidschendam-Voorburg starten vanaf €110/m² voor ETICS + pleisterafwerking. De exacte prijs wordt na een gratis opname ter plaatse vastgesteld.",
      },
      {
        vraag: "Werkt BM Klus BV ook in Stompwijk?",
        antwoord:
          "Ja, ons werkgebied omvat heel Leidschendam-Voorburg inclusief Stompwijk en omliggende gebieden.",
      },
    ],
    bouwperiode: "Mix van vooroorlogse bebouwing (Voorburg) en naoorlogse uitbreidingswijken (Leidschendam, jaren '60–'80).",
    gemiddeldBesparing: "Gemiddeld €500–€800/jaar besparing bij een rijtjeshuis of bovenwoning.",
    subsidieInfo: "ISDE-subsidie (landelijk) tot ±€4.400. Gemeente Leidschendam-Voorburg biedt de Duurzaamheidslening en het Energieloket Haaglanden.",
    vergunningTip: "In Voorburg zijn er historische panden waarvoor aanvullende regels gelden. In de naoorlogse wijken van Leidschendam is ETICS doorgaans vergunningvrij.",
    energieTip: "De jaren '70-flats in Leidschendam-Noord hebben veelal ongeïsoleerde gevels. VvE-projecten met ETICS zijn hier een effectieve oplossing.",
  },
  {
    slug: "hendrik-ido-ambacht",
    city: "Hendrik-Ido-Ambacht",
    region: "Zuid-Holland",
    title: "Gevelisolatie Hendrik-Ido-Ambacht – ETICS prijs per m² | BM Klus BV",
    description:
      "Buitengevelisolatie (ETICS) in Hendrik-Ido-Ambacht. Stuc, sierpleister of steenstrips. Gratis opname en offerte per m². Specialist regio Rotterdam.",
    h1: "Gevelisolatie in Hendrik-Ido-Ambacht",
    intro:
      "BM Klus BV verzorgt buitengevelisolatie voor woningen in Hendrik-Ido-Ambacht. Van het Volgerlanden tot de Sandelingen, van Oud-Ambacht tot de Postweg — wij adviseren u kosteloos.",
    localContext:
      "Hendrik-Ido-Ambacht is een snelgroeiende gemeente op het eiland IJsselmonde met zowel oudere dorpsbebouwing als de grote nieuwbouwwijk Volgerlanden. De oudere woningen in Oud-Ambacht en de Sandelingen hebben vaak matig geïsoleerde gevels. Buitengevelisolatie is hier een effectieve aanpak voor zowel energiebesparing als een frisse uitstraling.",
    woningTypes: [
      "Eengezinswoningen (Volgerlanden)",
      "Oudere dorpswoningen (Oud-Ambacht)",
      "Rijtjeshuizen (Sandelingen)",
      "Twee-onder-een-kapwoningen",
    ],
    afstanden: "Hendrik-Ido-Ambacht ligt op ±15 km van ons kantoor — geen voorrijkosten.",
    faq: [
      {
        vraag: "Wat kost gevelisolatie in Hendrik-Ido-Ambacht?",
        antwoord:
          "De prijs voor buitengevelisolatie in Hendrik-Ido-Ambacht start vanaf €110/m² voor ETICS + pleisterafwerking. Na een gratis opname ontvangt u een vaste offerte per m².",
      },
      {
        vraag: "Werkt BM Klus BV ook in Zwijndrecht en Papendrecht?",
        antwoord:
          "Ja, ons werkgebied omvat de hele Drechtsteden-regio: Hendrik-Ido-Ambacht, Zwijndrecht, Papendrecht, Sliedrecht en Alblasserdam.",
      },
    ],
    bouwperiode: "Mix van oudere dorpsbebouwing en nieuwbouw (Volgerlanden, vanaf 2005).",
    gemiddeldBesparing: "Gemiddeld €400–€700/jaar besparing. Oudere woningen in Oud-Ambacht profiteren het meest.",
    subsidieInfo: "ISDE-subsidie (landelijk) tot ±€4.400. Gemeente Hendrik-Ido-Ambacht biedt advies via het Energieloket Drechtsteden.",
    vergunningTip: "In Hendrik-Ido-Ambacht is buitengevelisolatie doorgaans vergunningvrij. Geen beschermde stadsgezichten.",
    energieTip: "De woningen in Volgerlanden (2005+) hebben een moderne isolatiestandaard. De oudere woningen in Oud-Ambacht en de Sandelingen (jaren '60–'80) hebben echter een lage Rc-waarde en profiteren sterk van ETICS.",
  },
]

export function getLocation(slug: string): LocationData | undefined {
  return locations.find((l) => l.slug === slug)
}

export function getAllLocationSlugs(): string[] {
  return locations.map((l) => l.slug)
}

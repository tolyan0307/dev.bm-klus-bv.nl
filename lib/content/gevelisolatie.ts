// ============================================================================
// lib/content/gevelisolatie.ts
// Single source of truth for all /gevelisolatie/ page copy.
// Each section is exported individually so future cluster pages can re-use them.
// ============================================================================

/* ───── META ───── */
export const gevelisolatieMeta = {
  slug: "gevelisolatie",
  title: "Gevelisolatie buitenkant (ETICS) – prijs per m² | BM Klus BV",
  description:
    "Gevelisolatie aan de buitenkant (ETICS) met afwerking: stuc, sierpleister/crepi of steenstrips. Heldere prijs per m² na gratis opname.",
}

/* ───── INTRO ───── */
export const gevelisolatieIntro = {
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Diensten", href: "/diensten/" },
    { label: "Gevelisolatie", href: "/gevelisolatie/" },
  ],
  h1: "Buitengevelisolatie (ETICS) voor woningen & bedrijfspanden",
  paragraphs: [
    "Buitengevelisolatie (ETICS) — ook wel gevel isoleren buitenzijde — is een beproefde manier om uw buitenmuur te isoleren en tegelijk strak af te werken. Zo verbetert u comfort en verlaagt u warmteverlies via de gevel.",
    "U kiest de afwerking die bij uw woning past: stuc, sierpleister (spachtelputz), crepi of steenstrips. Na een gratis opname ter plaatse stellen wij een offerte op per m², inclusief RC-waarde, dikte en afwerking.",
  ],
  trustBullets: [
    "Gratis opname ter plaatse",
    "Gecertificeerde ETICS-systemen en materialen",
    "Advies over subsidie & vergunning (waar nodig)",
  ],
  werkgebied:
    "Regio Rotterdam en omgeving (±80–100 km), Zuid-Holland en omliggende regio\u2019s.",
  steden: [
    "Rotterdam",
    "Den Haag",
    "Delft",
    "Leiden",
    "Dordrecht",
    "Schiedam",
    "Vlaardingen",
    "Gouda",
    "Zoetermeer",
    "Capelle aan den IJssel",
    "Spijkenisse",
    "Barendrecht",
    "Ridderkerk",
    "Alphen aan den Rijn",
    "Maassluis",
    "Hellevoetsluis",
    "Breda",
    "Bergen op Zoom",
    "Roosendaal",
    "Leidschendam-Voorburg",
    "Hendrik-Ido-Ambacht",
  ],
  ctas: [
    { text: "Offerte aanvragen", href: "/contact/" },
    { text: "Voorbeelden bekijken", href: "/onze-werken/" },
  ],
}

/* ───── TABLE OF CONTENTS ───── */
export const gevelisolatieToc = [
  { id: "wat-is-etics", label: "Wat is ETICS?" },
  { id: "voordelen", label: "Voordelen" },
  { id: "kosten-prijs-per-m2", label: "Kosten & prijs per m²" },
  { id: "werkwijze", label: "Werkwijze" },
  { id: "afwerkingen", label: "Afwerkingen" },
  { id: "materialen", label: "Materialen" },
  { id: "rc-waarde-dikte", label: "RC-waarde & dikte" },
  { id: "details-koudebruggen", label: "Details & koudebruggen" },
  { id: "subsidie-vergunning", label: "Subsidie & vergunning" },
  { id: "faq", label: "Veelgestelde vragen" },
]

/* ───── SECTIONS ───── */

// ── 1. Wat is ETICS? ────────────────────────────────────────────────────────
export const watIsEticsContent = {
  id: "wat-is-etics",
  futureRoute: "/gevelisolatie/",
  h2: "Wat is buitengevelisolatie (ETICS)?",
  intro:
    "ETICS staat voor External Thermal Insulation Composite System. Het is een beproefde methode waarbij isolatieplaten aan de buitenzijde van de gevel worden bevestigd en afgewerkt met een beschermende wapeningslaag (mortel + glasvezelweefsel) en een decoratieve afwerklaag. Het resultaat: een geïsoleerde én visueel vernieuwde gevel in één arbeidsgang.",
  wanneerKiezen: {
    h3: "Wanneer kiest u voor gevelisolatie aan de buitenzijde?",
    bullets: [
      "Bij een renovatie of groot onderhoud van de gevel",
      "Wanneer binnenmuren koud aanvoelen en tocht veroorzaken",
      "Als u de gevel een volledig nieuw uiterlijk wilt geven",
      "Om het energieverbruik structureel te verlagen",
      "Voor meer wooncomfort zonder dat u woonruimte verliest",
    ],
  },
  wanneerAnders: {
    h3: "Wanneer eerst iets anders regelen?",
    bullets: [
      "Bij ernstige vochtproblemen of een sterk beschadigde ondergrond — eerst herstellen.",
      "Als het pand een monumentenstatus heeft of als het gevelbeeld strikt beschermd is — neem contact op met de gemeente.",
      "Bij constructieve schade aan de draagmuur — laat dit eerst beoordelen door een specialist.",
    ],
  },
}

// ── 2. Voordelen ─────────────────────────────────────────────────────────────
export const voordelenContent = {
  id: "voordelen",
  futureRoute: "/gevelisolatie/",
  h2: "5 voordelen van buitengevelisolatie",
  benefits: [
    {
      title: "Lagere energiekosten",
      description:
        "Een goed geïsoleerde buitengevel beperkt warmteverlies via de gevel. In veel gevallen kan dit leiden tot lagere stookkosten, afhankelijk van uw woning en installatie.",
    },
    {
      title: "Meer comfort",
      description:
        "Binnenmuren voelen warmer aan en koude tocht vermindert. Dat zorgt voor een aangenamer binnenklimaat, zowel in de winter als in de zomer.",
    },
    {
      title: "Nieuwe uitstraling door afwerking",
      description:
        "U kiest de afwerking die bij uw woning past: glad stuc, sierpleister, crepi of steenstrips. Zo combineert u isolatie met een frisse, moderne look.",
    },
    {
      title: "Bescherming tegen weersinvloeden",
      description:
        "De ETICS-opbouw beschermt het achterliggende metselwerk tegen regen, vorst en temperatuurschommelingen, wat de levensduur van de gevel ten goede komt.",
    },
    {
      title: "Waardebehoud van uw woning",
      description:
        "Een geïsoleerde en net afgewerkte gevel kan bijdragen aan het behoud of de verbetering van de woningwaarde. Het exacte effect verschilt per situatie.",
    },
  ],
  note: "Resultaten zijn afhankelijk van het woningtype, de behaalde RC-waarde en de gekozen afwerking.",
}

// ── 3. Kosten ────────────────────────────────────────────────────────────────
export const kostenContent = {
  id: "kosten-prijs-per-m2",
  futureRoute: "/gevelisolatie/kosten/",
  h2: "Kosten van buitengevelisolatie (prijs per m²)",
  paragraphs: [
    "De gevelisolatie kosten worden bepaald door de RC-waarde, de isolatiedikte en de afwerking. De prijs per m² verschilt per situatie; onderstaande richtprijzen geven een eerlijk marktrealistisch beeld.",
    "Details zoals dagkanten, kozijnaansluitingen, plintprofielen en de bereikbaarheid van de gevel (steigerhoogte) beïnvloeden de eindprijs eveneens. Daarom geven wij een prijs na een opname ter plaatse, zodat u een goed beeld heeft van de investering.",
  ],
  richtprijzen: {
    label: "Richtprijzen (indicatie)",
    cards: [
      {
        title: "ETICS + pleisterafwerking (stuc, sierpleister of crepi)",
        range: "€110–€200/m²",
        note: "Meest gekozen afwerking; exact hangt af van RC/dikte en details.",
      },
      {
        title: "ETICS + steenstrips",
        range: "€200–€280/m²",
        note: "Zwaarder en arbeidsintensiever; prijs is sterk situatie-afhankelijk.",
      },
    ],
    noteLines: [
      "Richtprijzen (indicatie), incl. arbeid & materiaal. Excl. steiger, herstel en complexe detaillering.",
      "Dakoverstekken, dagkanten en aansluitdetails kunnen meerwerk geven; exacte prijs volgt na opname.",
    ],
  },
  kostenfactoren: {
    h3: "Belangrijkste kostenfactoren",
    bullets: [
      "Staat en voorbereiding van de ondergrond",
      "Steigerhoogte en bereikbaarheid van de gevel",
      "Plintzone en aansluitingen op de begane grond",
      "Dagkanten rondom ramen en deuren",
      "Hoekprofielen en aansluitprofielen",
      "Type afwerking (stuc, sierpleister, crepi, steenstrips)",
      "Materiaalkeuze (EPS, PIR of minerale wol)",
      "Totale te isoleren oppervlakte",
      "Eventueel noodzakelijk herstelwerk aan het metselwerk",
    ],
  },
  prijsopbouw: {
    h3: "Prijsopbouw (wat zit er in)",
    bullets: [
      "Gratis opname en inmeting ter plaatse",
      "Werkvoorbereiding en materiaalbegroting",
      "Isolatieplaten inclusief bevestiging (lijm en/of pluggen)",
      "Wapeningslaag (mortel + glasvezelweefsel)",
      "Gekozen afwerklaag",
      "Detaillering (dagkanten, profielen, plint)",
      "Oplevering en inspectie",
    ],
  },
  callout:
    "Exacte prijs na gratis opname ter plaatse — wij stellen een heldere offerte op per m² met RC-waarde, dikte en afwerking.",
}

// ── 4. Werkwijze ─────────────────────────────────────────────────────────────
export const werkwijzeContent = {
  id: "werkwijze",
  futureRoute: "/gevelisolatie/",
  h2: "Werkwijze: van opname tot oplevering",
  stappen: [
    {
      titel: "1. Opname ter plaatse",
      tekst:
        "Wij komen bij u langs om de gevel te beoordelen, op te meten en uw wensen te bespreken. De opname is gratis en vrijblijvend.",
    },
    {
      titel: "2. Berekening & offerte",
      tekst:
        "Op basis van de opname berekenen wij de benodigde RC-waarde, adviseren wij het meest geschikte materiaal en stellen wij een offerte op per m².",
    },
    {
      titel: "3. Planning",
      tekst:
        "Na akkoord stemmen wij de planning af in overleg met u.",
    },
    {
      titel: "4. Voorbereiding",
      tekst:
        "De steiger wordt geplaatst, de ondergrond wordt gecontroleerd en waar nodig hersteld, en alle materialen worden aangeleverd.",
    },
    {
      titel: "5. ETICS-opbouw",
      tekst:
        "De isolatieplaten worden verlijmd en/of geplugd, waarna de wapeningslaag (mortel + glasvezelweefsel) wordt aangebracht.",
    },
    {
      titel: "6. Afwerking & oplevering",
      tekst:
        "De gekozen afwerklaag wordt aangebracht en details worden netjes afgewerkt.",
    },
  ],
  verwachting: {
    h3: "Wat u van ons mag verwachten",
    bullets: [
      "Duidelijke planning in overleg",
      "Een nette en opgeruimde werkplek",
      "Bereikbaar via WhatsApp en e-mail",
      "Heldere offerte met duidelijke scope",
    ],
  },
}

// ── 5. Afwerkingen ───────────────────────────────────────────────────────────
export const afwerkingenContent = {
  id: "afwerkingen",
  futureRoute: "/gevelisolatie/afwerkingen/",
  h2: "Afwerking na gevelisolatie: stuc, sierpleister, crepi of steenstrips",
  intro:
    "De afwerking bepaalt het uiterlijk, het onderhoud en deels het budget van uw gevelisolatie. Hieronder vindt u de vier meest gekozen opties, elk met eigen kenmerken.",
  opties: [
    {
      h3: "Stuc (glad)",
      omschrijving:
        "Een strakke, gladde afwerking die uw gevel een modern en minimalistisch uiterlijk geeft. Geschikt voor zowel woningen als bedrijfspanden.",
      pastGoed: "Moderne architectuur, strakke gevels, nieuwbouwuitstraling.",
      letOp:
        "Kleine oneffenheden in de ondergrond zijn sneller zichtbaar bij een gladde afwerking.",
      voordelen: [
        "Strak en tijdloos uiterlijk",
        "Goed te combineren met kleuraccenten",
        "Relatief eenvoudig bij te werken bij beschadigingen",
      ],
    },
    {
      h3: "Sierpleister / spachtelputz",
      omschrijving:
        "Een getextureerde afwerking met een subtiel patroon (korrel of schuurstructuur). Sierpleister is populair vanwege de goede prijs-kwaliteitverhouding.",
      pastGoed:
        "Jaren '60/'70-woningen, rijtjeshuizen, gevels die een frisse uitstraling nodig hebben.",
      letOp:
        "De korrelgrootte beïnvloedt het eindresultaat; laat u altijd een proefvlak tonen.",
      voordelen: [
        "Verbergt kleine oneffenheden in de ondergrond",
        "Breed scala aan kleuren en structuren",
        "Goede prijs-kwaliteitverhouding",
      ],
    },
    {
      h3: "Crepi",
      omschrijving:
        "Een grovere textuur met een rustiek of landelijk karakter. Crepi wordt vaak gekozen voor traditionele bouwstijlen of wanneer een robuuste uitstraling gewenst is.",
      pastGoed:
        "Landelijke woningen, traditionele architectuur, grotere gevelvlakken.",
      letOp:
        "De grovere structuur kan meer vuil vasthouden; periodiek reinigen is aan te raden.",
      voordelen: [
        "Sterke, robuuste uitstraling",
        "Zeer goed bestand tegen weersinvloeden",
        "Verbergt oneffenheden uitstekend",
      ],
    },
    {
      h3: "Steenstrips",
      omschrijving:
        "Dunne stroken baksteen die op de isolatie worden verlijmd. Het resultaat is nauwelijks te onderscheiden van traditioneel metselwerk.",
      pastGoed:
        "Woningen waar het oorspronkelijke baksteenuiterlijk behouden moet blijven.",
      letOp:
        "Steenstrips zijn zwaarder dan pleisterafwerkingen; de ondergrond en bevestiging moeten hierop berekend zijn.",
      voordelen: [
        "Authentieke baksteenlook",
        "Zeer duurzaam en onderhoudsarm",
        "Grote keuze in kleuren en formaten",
      ],
    },
  ],
  vergelijkingstabel: {
    kolommen: ["Afwerking", "Uiterlijk", "Onderhoud", "Budget", "Opmerking"],
    rijen: [
      {
        afwerking: "Stuc (glad)",
        uiterlijk: "Modern, strak",
        onderhoud: "Gemiddeld",
        budget: "Midden",
        opmerking: "Kleine schade snel zichtbaar",
      },
      {
        afwerking: "Sierpleister",
        uiterlijk: "Getextureerd, subtiel",
        onderhoud: "Laag",
        budget: "Laag – midden",
        opmerking: "Populairste keuze",
      },
      {
        afwerking: "Crepi",
        uiterlijk: "Grof, rustiek",
        onderhoud: "Laag – gemiddeld",
        budget: "Laag – midden",
        opmerking: "Kan meer vuil vasthouden",
      },
      {
        afwerking: "Steenstrips",
        uiterlijk: "Baksteen-look",
        onderhoud: "Laag",
        budget: "Hoog",
        opmerking: "Zwaarder; draagkracht controleren",
      },
    ],
  },
}

// ── 6. Materialen ────────────────────────────────────────────────────────────
export const materialenContent = {
  id: "materialen",
  futureRoute: "/gevelisolatie/materialen/",
  h2: "Materialen: EPS, PIR of minerale wol",
  intro:
    "De keuze van het isolatiemateriaal hangt af van de gewenste RC-waarde, de beschikbare dikte, het brand- en vochtgedrag, de dampopenheid van de gevelconstructie en de gekozen afwerking. Wij adviseren per project het meest geschikte materiaal.",
  vergelijkingstabel: {
    kolommen: [
      "Materiaal",
      "Lambda (indicatie)",
      "Brandklasse (indicatie)",
      "Dampopen",
      "Wanneer kiezen",
      "Pluspunt",
      "Aandachtspunt",
    ],
    rijen: [
      {
        materiaal: "EPS",
        lambda: "0,031 – 0,038",
        brandklasse: "E of B-s1,d0",
        dampopen: "Beperkt",
        wanneer:
          "Veelzijdig inzetbaar; goede prijs-kwaliteitverhouding",
        pluspunt: "Licht, bewerkbaar, breed verkrijgbaar",
        aandachtspunt: "Beperkte dampopenheid; controleer vochthuishouding",
      },
      {
        materiaal: "PIR",
        lambda: "0,022 – 0,028",
        brandklasse: "B-s1,d0",
        dampopen: "Nee",
        wanneer:
          "Hoge isolatiewaarde bij beperkte dikte nodig",
        pluspunt: "Zeer lage lambda; dunne opbouw mogelijk",
        aandachtspunt: "Niet dampopen; niet voor alle geveltypen geschikt",
      },
      {
        materiaal: "Minerale wol",
        lambda: "0,035 – 0,040",
        brandklasse: "A1",
        dampopen: "Ja",
        wanneer:
          "Dampopenheid vereist of hoge brandveiligheid gewenst",
        pluspunt: "Uitstekend brandgedrag; dampopen",
        aandachtspunt: "Dikker pakket nodig voor dezelfde RC-waarde",
      },
    ],
  },
  systeemopbouw: {
    h3: "ETICS-systeemopbouw (kort)",
    lagen: [
      "Bestaande gevel (draagconstructie)",
      "Lijmlaag en/of mechanische bevestiging (pluggen)",
      "Isolatieplaten (EPS, PIR of minerale wol)",
      "Wapeningslaag (lijmmortel + glasvezelweefsel)",
      "Afwerklaag (stuc, sierpleister, crepi of steenstrips)",
    ],
  },
}

// ── 7. RC-waarde & dikte ─────────────────────────────────────────────────────
export const rcWaardeDikteContent = {
  id: "rc-waarde-dikte",
  futureRoute: "/gevelisolatie/rc-waarde-dikte/",
  h2: "RC-waarde en dikte: wat heeft u nodig?",
  intro:
    "De RC-waarde geeft aan hoe goed een constructie warmte vasthoudt. Hoe hoger de RC-waarde, hoe beter de isolatie. De benodigde dikte hangt direct samen met het gekozen materiaal: een materiaal met een lagere lambdawaarde bereikt dezelfde RC-waarde met minder centimeters.",
  ranges: [
    "Veel projecten vallen in 8–15 cm isolatie",
    "De totale opbouw (isolatie + wapening + afwerking) is vaak 10–18 cm",
    "De behaalde RC-waarde ligt doorgaans tussen 3,5 en 6,0 m²K/W",
  ],
  disclaimer:
    "De exacte waarden zijn afhankelijk van uw woning, uw doel (comfort versus maximale besparing) en de detaillering.",
  comfortVsMax: {
    h3: "Comfort vs. maximale isolatie",
    bullets: [
      "Comfortisolatie: een merkbare verbetering in warmtegevoel en lagere stookkosten, vaak al bij een RC-waarde rond 3,5 m²K/W.",
      "Maximale isolatie: gericht op het hoogst haalbare rendement, bijvoorbeeld bij een energielabelverbetering of verduurzamingstraject. RC-waarden van 5,0 m²K/W en hoger.",
      "De keuze hangt af van uw budget, de beschikbare ruimte (dikte) en uw persoonlijke wensen.",
    ],
  },
  opname: {
    h3: "Wat meten we tijdens de opname?",
    bullets: [
      "Het totale geveloppervlak en de indeling (ramen, deuren, hoeken)",
      "De detailsituaties: dagkanten, dorpels, boeidelen, plint",
      "De staat en het type van de ondergrond",
      "Aansluitingen op dakrand, balkon of uitbouw",
      "De plintzone en spatwaterdetails",
      "Uw gewenste afwerking en eventuele kleurvoorkeur",
    ],
  },
}

// ── 8. Details & koudebruggen ────────────────────────────────────────────────
export const detailsKoudebruggenContent = {
  id: "details-koudebruggen",
  futureRoute: "/gevelisolatie/",
  h2: "ETICS-details: dagkanten, plint en koudebruggen",
  intro:
    "De kwaliteit van gevelisolatie wordt grotendeels bepaald door de detaillering. Juist op de overgangen — rondom ramen, bij de plint en op hoeken — ontstaan koudebruggen als de isolatie niet correct wordt doorgezet. Hieronder lichten wij de belangrijkste aandachtspunten toe.",
  subsections: [
    {
      h3: "Dagkanten & kozijnaansluitingen",
      tekst:
        "De dagkanten (de zijkanten van raam- en deuropeningen) worden mee-geïsoleerd met dunne isolatiestroken. Zo voorkomt u een koudebrugeffect en krijgt de opening een nette, afgewerkte rand.",
      bullets: [
        "Dunne isolatiestroken (2–4 cm) op dagkanten",
        "Aansluiting op kozijn met afdichtingsprofiel",
        "Nette afwerking met hoekprofielen",
      ],
    },
    {
      h3: "Plint & spatwaterzone",
      tekst:
        "De plintzone vormt de overgang tussen de gevel en het maaiveld. Waar nodig werken wij met vochtbestendige plintisolatie (bijv. XPS) en een passend plintprofiel om spatwater te weren en een duurzame aansluiting te maken.",
      bullets: [
        "Vochtbestendige plintisolatie (bijv. XPS) waar nodig",
        "Plintprofiel als nette afsluiting",
        "Spatwaterbestendige afwerking",
      ],
    },
    {
      h3: "Hoeken, profielen en dilataties",
      tekst:
        "Op hoeken en dilatatievoegen worden versterkingsprofielen geplaatst. Dit voorkomt scheurvorming en zorgt voor een strakke, rechte afwerking.",
      bullets: [
        "Hoekprofielen met ingebed glasvezelweefsel",
        "Dilatatievoegen op de juiste posities",
        "Aansluitprofielen bij gevelovergangen",
      ],
    },
    {
      h3: "Koudebruggen voorkomen",
      tekst:
        "Koudebruggen ontstaan waar de isolatie wordt onderbroken. Door consequent door te isoleren bij dagkanten, plint, balkonaansluitingen en dakranden minimaliseren wij warmteverlies en condensrisico.",
      bullets: [
        "Doorlopende isolatie bij alle overgangen en aansluitingen",
        "Thermisch onderbroken bevestigingsmiddelen waar nodig",
        "Controle op aansluitingen tijdens de oplevering",
      ],
    },
  ],
}

// ── 9. Subsidie & vergunning ─────────────────────────────────────────────────
export const subsidieVergunningContent = {
  id: "subsidie-vergunning",
  futureRoute: "/gevelisolatie/subsidie-vergunning/",
  h2: "Subsidie en vergunning: waar moet u op letten?",
  paragraphs: [
    "Bij buitengevelisolatie kan een omgevingsvergunning nodig zijn, met name wanneer het uiterlijk van de gevel verandert. Dit verschilt per gemeente en per situatie. Wij checken dit vooraf en adviseren u over de te volgen route.",
    "Daarnaast bestaan er regelingen en subsidies die van toepassing kunnen zijn op gevelisolatie. Wij helpen u om de mogelijkheden in kaart te brengen en ondersteunen bij de benodigde documentatie.",
  ],
  checklist: [
    "Wat verandert er aan het gevelbeeld?",
    "Welke isolatiewaarde (RC) en materiaal?",
    "Welke afwerking en kleur/structuur?",
  ],
}

// ── 10. FAQ ──────────────────────────────────────────────────────────────────
export const faqContent = {
  id: "faq",
  futureRoute: "/gevelisolatie/",
  h2: "Veelgestelde vragen over buitengevelisolatie",
  items: [
    {
      vraag: "Wat kost buitengevelisolatie per m²?",
      antwoord:
        "ETICS + pleisterafwerking (stuc/sierpleister/crepi) kost indicatief €110–€200/m²; ETICS + steenstrips €200–€280/m². Beide prijzen zijn inclusief arbeid en materiaal, exclusief steiger, herstelwerk en complexe detaillering. Na een gratis opname stellen wij een offerte op met RC-waarde, dikte en afwerking.",
    },
    {
      vraag: "Welke RC-waarde en dikte heb ik nodig?",
      antwoord:
        "Dat hangt af van uw doel: comfort verbeteren of maximaal isoleren. Veel projecten komen uit op een RC-waarde tussen 3,5 en 6,0 m²K/W, met een isolatiedikte van 8 tot 15 cm. Wij berekenen de optimale waarde voor uw situatie.",
    },
    {
      vraag: "EPS vs PIR vs minerale wol: wat kies ik?",
      antwoord:
        "EPS is veelzijdig en heeft een goede prijs-kwaliteitverhouding. PIR biedt de hoogste isolatiewaarde per centimeter. Minerale wol is dampopen en blinkt uit in brandveiligheid. De juiste keuze hangt af van uw gevel, het vochtgedrag en de gewenste dikte.",
    },
    {
      vraag: "Welke afwerking is het beste?",
      antwoord:
        "Er is geen 'beste' afwerking — het hangt af van uw smaak, het gewenste onderhoudsniveau en het budget. Stuc geeft een strakke, moderne look. Sierpleister is populair vanwege de goede prijs-kwaliteitverhouding. Crepi past bij een robuustere stijl. Steenstrips behouden het baksteenuiterlijk.",
    },
    {
      vraag: "Is buitengevelisolatie geschikt voor elk type gevel?",
      antwoord:
        "In de meeste gevallen wel: baksteen, beton en cellenbeton zijn uitstekend geschikt. Ook bij een enkelsteens muur (muur isoleren zonder spouw) is buitengevelisolatie vaak een geschikte oplossing, maar dit beoordelen we tijdens de opname. Bij sterk beschadigde gevels, houtskeletbouw of monumentale panden is een maatwerkbeoordeling nodig.",
    },
    {
      vraag: "Wat als er scheuren of voegwerkproblemen zijn?",
      antwoord:
        "Kleine scheuren en voegwerkgebreken worden in de voorbereiding hersteld. Bij ernstige schade aan het metselwerk adviseren wij eerst een grondig gevelopherstel voordat de isolatie wordt aangebracht.",
    },
    {
      vraag: "Hoe voorkomt u vocht- of schimmelproblemen?",
      antwoord:
        "Door het juiste materiaal te kiezen (dampopen bij vochtige gevels), de details correct uit te voeren en voldoende ventilatie in de woning te waarborgen. Wij beoordelen het vochtgedrag van de gevel tijdens de opname.",
    },
    {
      vraag: "Heb ik een vergunning nodig?",
      antwoord:
        "Dat hangt af van de gemeente en de mate waarin het gevelbeeld verandert. Soms is een omgevingsvergunning nodig, soms niet. Wij checken dit vooraf en adviseren u over de te volgen route.",
    },
    {
      vraag: "Kan ik subsidie krijgen?",
      antwoord:
        "Er bestaan diverse regelingen voor woningisolatie. Of u in aanmerking komt, hangt af van het type woning, de behaalde RC-waarde en de geldende subsidieregelingen. Wij helpen u bij het uitzoeken van de mogelijkheden.",
    },
    {
      vraag: "Hoe lang duurt het traject gemiddeld?",
      antwoord:
        "Van opname tot oplevering duurt een gemiddeld project enkele weken, afhankelijk van de omvang, het seizoen en de gekozen afwerking. De planning stemmen wij vooraf met u af.",
    },
    {
      vraag: "Wat gebeurt er met dagkanten, kozijnen en dorpels?",
      antwoord:
        "Dagkanten worden mee-geïsoleerd met dunne isolatiestroken en netjes afgewerkt met profielen. Kozijnen en dorpels worden zorgvuldig aangesloten om koudebruggen te voorkomen.",
    },
    {
      vraag: "Hoe onderhoud ik de afwerking (stuc/sierpleister/crepi/steenstrips)?",
      antwoord:
        "Stuc en sierpleister zijn grotendeels onderhoudsvrij; periodiek reinigen is voldoende. Crepi kan door de grovere structuur wat meer vuil ophopen. Steenstrips vragen nauwelijks onderhoud. Bij beschadigingen kunnen wij de afwerking lokaal herstellen.",
    },
  ],
}

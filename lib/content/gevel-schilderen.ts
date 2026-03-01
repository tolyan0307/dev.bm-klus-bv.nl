// lib/content/gevel-schilderen.ts
// Single source of truth for all copy on /gevel-schilderen/

export const meta = {
  title: "Gevel schilderen: kosten per m² & offerte | BM klus BV",
  description:
    "Gevel schilderen (buitenmuur verven) in regio Rotterdam. Dampopen systemen (silicaat/KEIM of siloxaan), voorbereiding, kosten per m², onderhoud & FAQ.",
  slug: "gevel-schilderen",
};

export const hero = {
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Diensten", href: "/diensten/" },
    { label: "Gevel schilderen", href: "/gevel-schilderen/" },
  ],
  h1: "Gevel schilderen (buitenmuur verven)",
  lead: [
    "Een geschilderde gevel beschermt uw woning of pand duurzaam tegen regen, wind en vocht — en geeft de gevel tegelijk een frisse uitstraling.",
    "Na inspectie van de ondergrond kiezen wij het meest geschikte dampopen systeem: silicaatverf (keimen/KEIM) of siloxaan/acryl.",
  ],
  trustBullets: [
    "Grondige voorbereiding en nette afwerking",
    "Systeemkeuze passend bij uw ondergrond",
    "Heldere offerte na opname",
  ],
  geoSentence:
    "Regio Rotterdam en omgeving (±80–100 km), Zuid-Holland en omliggende regio's.",
  cityChips: [
    "Rotterdam",
    "Den Haag",
    "Delft",
    "Leiden",
    "Dordrecht",
    "Schiedam",
    "Vlaardingen",
    "Gouda",
  ],
  ctaLinks: [
    { label: "Offerte aanvragen", href: "/contact/" },
    { label: "Alle diensten", href: "/diensten/" },
  ],
};

export const toc = {
  label: "Inhoud",
  items: [
    { anchor: "#core", label: "Wat levert het op?" },
    { anchor: "#kosten", label: "Kosten per m²" },
    { anchor: "#offerte", label: "Offerte" },
    { anchor: "#verfsoorten", label: "Verfsoorten" },
    { anchor: "#voorbereiding", label: "Voorbereiding & primer" },
    { anchor: "#techniek", label: "Techniek & ondergrond" },
    { anchor: "#onderhoud", label: "Onderhoud & levensduur" },
    { anchor: "#werkgebied", label: "Werkgebied" },
    { anchor: "#faq", label: "Veelgestelde vragen" },
  ],
};

export const core = {
  id: "core",
  h2: "Gevel schilderen — wat levert het op?",
  paragraph:
    "Buitenmuur schilderen biedt meer dan alleen een fraaie aanblik: een goed aangebracht verfsysteem beschermt de ondergrond actief tegen indringing van regenwater, weersinvloeden en biologische aantasting zoals mos en algengroei. Zo helpt u de structuur van uw gevel langer in goede staat te houden.",
  bullets: [
    "Bescherming tegen vocht, regen en temperatuurwisselingen",
    "Verfrissend kleureffect en verbeterde uitstraling van het pand",
    "Bijdrage aan langere levensduur en beperkt toekomstig onderhoud",
  ],
  note: "Het uiteindelijke resultaat is in hoge mate afhankelijk van de staat van de ondergrond en de kwaliteit van de voorbereiding — reden waarom wij hier altijd zorgvuldig aandacht aan besteden.",
};

export const kosten = {
  id: "kosten",
  h2: "Kosten gevel schilderen (prijs per m²)",
  paragraphs: [
    "De prijs voor gevel schilderen (buitenmuur verven) varieert afhankelijk van de ondergrond, voorbereiding en verfsysteem. Hier vindt u realistische richtprijzen.",
    "Exacte prijs na opname ter plaatse.",
  ],
  table: {
    headers: ["Situatie", "Indicatieve prijs"],
    rows: [
      ["Basis: lichte reiniging, stabiele ondergrond — geen herstelwerk vereist", "€25–€40 per m²"],
      ["Standaard: reiniging + primer/voorstrijk — meest voorkomende situatie", "€30–€50 per m²"],
      ["Intensief: herstel, afbladdering/losse lagen + steiger/hoogwerker + voorbereiding", "Op aanvraag"],
    ],
    note: "Richtprijzen (indicatie) incl. arbeid & standaardmaterialen.\nExcl. steiger/hoogwerker, herstelwerk en intensieve reiniging; exacte prijs volgt na opname.",
  },
  priceFactors: {
    label: "Belangrijkste prijsfactoren:",
    items: [
      "Bereikbaarheid (begane grond, steiger of hoogwerker)",
      "Mate en methode van reiniging (softwash, stoomreiniging)",
      "Herstel van scheuren, losse voegen of beschadigingen",
      "Primer, voorstrijk of fixeermiddel (type en hoeveelheid)",
      "Afplakken van kozijnen, plinten en aangrenzende vlakken",
      "Gekozen verfsoort (silicaat, siloxaan of acryl)",
      "Aantal verflagen dat benodigd is",
    ],
  },
  callout:
    "Exacte prijs volgt na opname; u ontvangt een offerte met duidelijke scope.",
  ctaLink: { label: "Vraag een offerte aan", href: "/contact/" },
};

export const offerte = {
  id: "offerte",
  h2: "Offerte voor gevel schilderen",
  paragraph:
    "Voor een snelle en accurate offerte hebben wij een aantal basisgegevens nodig. Hoe meer informatie u van tevoren aanlevert, hoe gerichter wij kunnen reageren — maar ook met een globale omschrijving komen wij graag langs voor een opname.",
  checklist: [
    "Type gevel (baksteen, pleister/stuc of beton)",
    "Indicatie van het te schilderen oppervlak in m²",
    "Hoogte en bereikbaarheid (begane grond, 1e verdieping, steiger nodig?)",
    "Huidige staat (afbladderen, haarscheuren, loszittend materiaal?)",
    "Gewenste kleur of kleurrichting",
    "Foto's van de gevel (optioneel, maar versnelt de beoordeling)",
  ],
  ctaLink: { label: "Stuur uw aanvraag", href: "/contact/" },
};

export const verfsoorten = {
  id: "verfsoorten",
  h2: "Verfsoorten: silicaat (keimen/KEIM) en siloxaan",
  subsections: [
    {
      h3: "Silicaatverf (keimen) — dampopen mineraal",
      body: "Silicaatverf, ook wel aangeduid als keimen of KEIM-verf, hecht zich door een chemische reactie (silificering) permanent aan minerale ondergronden. Dit resulteert in een uitzonderlijk dampopen verflaag die vocht uit de muur laat ontsnappen, terwijl regen van buiten wordt geweerd.",
      bullets: [
        "Sterk ademend (dampopen): geen opbollen of afbladderen bij vochtige ondergrond",
        "Geschikt voor minerale ondergronden: kalkpleister, beton, onbehandeld baksteen",
        "Hoge kleurvastheid: UV-bestendig door minerale pigmenten",
      ],
    },
    {
      h3: "Siloxaan/acryl — waterafstotend en breed inzetbaar",
      body: "Siloxaanverf combineert de waterafstotende eigenschappen van siliconen met de flexibiliteit van acrylbinders. Het is daarmee breed inzetbaar op verschillende ondergronden en biedt een goede bescherming tegen slaginregen. Acrylverf is een meer traditionele keuze die goed aansluit bij reeds geschilderde gevels.",
      bullets: [
        "Waterafstotend: slaginregen wordt effectief geweerd",
        "Onderhoudsvriendelijk en breed toepasbaar na beoordeling van de ondergrond",
        "Flexibel: overbrugt kleine haarscheurtjes in de ondergrond",
      ],
    },
    {
      h3: "Keimen of schilderen (en kaleien): wat is het verschil?",
      body: "Keimen is het aanbrengen van silicaatverf — een minerale coating die chemisch hecht aan de ondergrond. Traditioneel schilderen (buitenschilderwerk gevel) betekent het opbrengen van een filmvormende verflaag (acryl of siloxaan) bovenop de ondergrond. Kaleien is een oudere techniek waarbij een dunne kalkoplossing wordt aangebracht; het geeft een meer transparant, 'oud' effect en wordt tegenwoordig minder toegepast. De keuze hangt af van de wens van de opdrachtgever, het erfgoedbeschermd zijn van het pand en de staat van de bestaande afwerking.",
    },
  ],
  caution:
    "Belangrijk: de keuze van het verfsysteem hangt altijd af van de bestaande verflaag en de compatibiliteit met de ondergrond — mengen van systemen (bijv. silicaat op acryl) kan leiden tot hechting- en dampproblemen.",
};

export const voorbereiding = {
  id: "voorbereiding",
  h2: "Voorbereiding en primer: zo blijft het lang mooi",
  cards: [
    {
      title: "Reinigen & droogtijd",
      body: "Een buitenmuur schoonmaken vóór het verven is essentieel: vuil, algen, mos en losse deeltjes verminderen de hechting van de verf drastisch. Wij maken gebruik van softwash of stoomreiniging, afgestemd op de ondergrond. Na het reinigen moet de gevel voldoende drogen voordat er verf wordt aangebracht.",
      bullets: [
        "Softwash of stoomreiniging, afhankelijk van vervuiling en ondergrond",
        "Voldoende droogtijd in acht nemen vóór het verven",
      ],
    },
    {
      title: "Herstel van scheuren en voegwerk",
      body: "Scheuren in de ondergrond en beschadigd voegwerk worden hersteld vóórdat er een verflaag wordt aangebracht. Losse verf en afgebladderd materiaal worden verwijderd. Alleen een hechte, stabiele ondergrond garandeert een duurzaam eindresultaat.",
      bullets: [
        "Haarscheuren en open naden opvullen met geschikt herstelmateriaal",
        "Losse en afgebladderde verflagen volledig verwijderen",
      ],
    },
    {
      title: "Primer, voorstrijk en fixeermiddel",
      body: "Een primer of voorstrijk (primer buitenmuur) bereidt de ondergrond voor op de verflaag: het fixeert poreuze of poederende vlakken en verbetert de hechting. Niet elke situatie vereist een primer, maar 'zonder voorstrijk' is zeker niet altijd verstandig — wij beoordelen dit per situatie.",
      bullets: [
        "Fixeermiddel bij poederende of sterk zuigende ondergronden",
        "Primer afgestemd op het te gebruiken verfsysteem (silicaat of acryl/siloxaan)",
      ],
    },
    {
      title: "Afplakken en bescherming",
      body: "Kozijnen, raambanken, plinten en de directe omgeving worden zorgvuldig afgedekt en afgetapt. Zo blijft de afwerking schoon en worden aangrenzende vlakken beschermd tegen verfspatten.",
      bullets: [
        "Kozijnen en raambanken volledig afgetapt",
        "Grond en bestrating rondom het pand afgedekt",
      ],
    },
  ],
};

export const techniek = {
  id: "techniek",
  h2: "Techniek & ondergrond: baksteen, pleister en weer",
  subsections: [
    {
      h3: "Baksteen",
      body: "Bakstenen buitenmuur verven vraagt aandacht voor de dampopenheid van het systeem: baksteen ademt van nature. Voegen worden gecontroleerd op integriteit vóór het aanbrengen van de verflaag. De hechting wordt geoptimaliseerd door grondige reiniging en, indien nodig, een geschikte primer.",
    },
    {
      h3: "Pleister/stuc",
      body: "Een gestucte buitenmuur verven vereist controle op poederen en haarscheuren: poederend pleister hecht slecht en moet worden vastgezet met een fixeermiddel. Haarscheuren worden opgevuld vóór het schilderen. Een goede primer zorgt voor een egale opname van de verflaag.",
    },
    {
      h3: "Beton",
      body: "Beton is een bijzondere ondergrond vanwege de hoge zuiging in verse beton en de mogelijke alkaliteit. Een geschikte primer die bestand is tegen alkalische pH is noodzakelijk om loszetting van de verflaag te voorkomen. Wij stemmen de productenkeuze hierop af na beoordeling.",
    },
  ],
  weather: {
    label: "Weercondities",
    body: "Gevel schilderen is weersafhankelijk werk: wij schilderen niet bij regen, bij een relatieve luchtvochtigheid die te hoog is of bij temperaturen die te laag of juist te hoog zijn. De planning wordt afgestemd op een geschikt weersvenster om een optimaal droog- en hechtingsproces te waarborgen.",
  },
};

export const onderhoud = {
  id: "onderhoud",
  h2: "Onderhoud & levensduur",
  paragraph:
    "Na het schilderen van de gevel is regulier onderhoud doorgaans beperkt. Toch is periodieke inspectie verstandig: kleine beschadigingen tijdig herstellen voorkomt dat vocht via openstaande plekken kan binnendringen en grotere schade veroorzaakt.",
  bullets: [
    "Jaarlijks licht reinigen om aangroei van algen en mos te voorkomen",
    "Goten en afvoeren controleren op lekkage langs de gevel",
    "Groene aanslag (mos, algen) bij voorkeur vroegtijdig behandelen",
    "Kleine beschadigingen, krassen of losgelaten randen bijwerken",
    "Schilderinterval afhankelijk van ligging, windrichting en kleurkeuze",
  ],
  colorNote:
    "Donkere tinten — waaronder groen (gevel schilderen kleuren) — kunnen vervuiling en UV-verwering eerder zichtbaar maken dan lichte kleuren. Wij adviseren bij voorkeur een proefvlak te laten aanbrengen voor definitieve kleurkeuze.",
};

export const werkgebied = {
  id: "werkgebied",
  h2: "Werkgebied",
  geoSentence:
    "Regio Rotterdam en omgeving (±80–100 km), Zuid-Holland en omliggende regio's.",
  cityChips: [
    "Rotterdam",
    "Den Haag",
    "Delft",
    "Leiden",
    "Dordrecht",
    "Schiedam",
    "Vlaardingen",
    "Gouda",
  ],
  outsideNote:
    "Werkt u buiten dit werkgebied? Neem gerust contact op — in overleg is maatwerk mogelijk.",
};

export const faq = {
  id: "faq",
  h2: "Veelgestelde vragen",
  items: [
    {
      question: "Wat kost gevel schilderen per m²?",
      answer:
        "Als richtprijs (indicatie) ligt gevel schilderen rond €25–€40/m² voor basische situaties met lichte reiniging en stabiele ondergrond. Voor standaard voorbereiding (reiniging + primer/voorstrijk) doorgaans €30–€50/m². Intensievere herstelwerkzaamheden (afbladdering, scheuren, steiger/hoogwerker) worden op aanvraag berekend. Factoren die de prijs beïnvloeden: bereikbaarheid, reiniging, herstelwerk aan voegwerk en scheuren, verfsoort, aantal lagen en afplakwerk. Steiger/hoogwerker, intensieve reiniging en herstelwerk zijn niet altijd in het basisanterval begrepen en kunnen de prijs verhogen. Na opname ter plaatse ontvangt u een offerte met duidelijke scope.",
    },
    {
      question: "Welke verf is geschikt voor mijn gevel?",
      answer:
        "De verfkeuze hangt af van het type ondergrond, de bestaande verflaag en de gewenste eigenschappen. Op minerale ondergronden (onbehandeld baksteen, kalkpleister) is silicaatverf (keimen/KEIM) vaak de beste keuze vanwege de dampopen eigenschappen. Op eerder geschilderde gevels of beton is siloxaanverf of acrylverf veelal meer geschikt. Wij beoordelen de situatie ter plaatse en adviseren u over het beste systeem.",
    },
    {
      question: "Moet de gevel eerst gereinigd worden?",
      answer:
        "Ja, reiniging is een essentiële stap bij buitenmuur schilderen. Vuil, mos, algen en losse deeltjes verminderen de hechting van de verf en kunnen leiden tot snel loszetten of afbladderen. De methode (softwash, stoomreiniging of hogedrukreiniging) stemmen wij af op het type ondergrond en de mate van vervuiling. Na reiniging moet de gevel voldoende drogen voordat het schilderwerk kan beginnen.",
    },
    {
      question: "Is primer/voorstrijk altijd nodig?",
      answer:
        "Niet in elke situatie is een primer (voorstrijk buitenmuur) verplicht, maar het is zeker niet altijd verstandig om deze stap over te slaan. Bij poederende of sterk zuigende ondergronden is een fixeermiddel noodzakelijk om de verflaag te laten hechten. Bij sterk absorberende ondergronden of bij de overstap van het ene naar het andere verfsysteem is een primer onmisbaar. Wij beoordelen dit per situatie en nemen de primer mee in de offerte als dat nodig is.",
    },
    {
      question: "Kan ik een afgebladderde buitenmuur verven?",
      answer:
        "Ja, maar dan is grondige voorbereiding essentieel. Alle losse en afgebladderde verf moet worden verwijderd — dit kan mechanisch of chemisch — voordat de nieuwe verflaag wordt aangebracht. Daarna volgt eventuele reparatie van de ondergrond en het aanbrengen van een geschikte primer. Schilderen over afgebladderd materiaal zonder voorbereiding levert snel opnieuw problemen op. Voor advies op maat: /contact/",
    },
    {
      question: "Kan ik baksteen / pleister / beton schilderen?",
      answer:
        "Alle drie de ondergronden zijn schilderbaar, maar vereisen elk een specifieke aanpak. Bakstenen buitenmuur verven vraagt een dampopen systeem dat de adembaarheid van de steen respecteert. Gestucte buitenmuur verven vereist controle op haarscheuren en poedering. Beton heeft vanwege de alkaliteit en zuiging een speciale primer nodig. Wij bepalen de juiste werkwijze na inspectie.",
    },
    {
      question: "Keimen of schilderen — wat kiest u wanneer?",
      answer:
        "Keimen (silicaatverf aanbrengen) is de voorkeurskeuze bij minerale ondergronden die dampopen moeten blijven, zoals onbehandeld baksteen of kalkpleister — met name bij historische panden of bij vochtproblemen van binnenuit. Traditioneel buitenschilderwerk gevel met siloxaan of acryl is breed inzetbaar en vereist minder strenge ondergrondvereisten, maar is minder goed combineerbaar met een dampopen constructie. Keimen op een reeds met acrylverf geschilderde gevel is technisch niet aanbevolen. Voor advies op maat: /contact/",
    },
    {
      question: "Heb ik een vergunning nodig om de gevel te schilderen?",
      answer:
        "In de meeste gevallen is voor het schilderen van de gevel geen omgevingsvergunning nodig, mits u de bestaande kleur aanhoudt of een kleur kiest die voldoet aan eventuele lokale welstandseisen. In beschermde stads- of dorpsgezichten, bij rijksmonumenten of bij panden met bijzondere bestemmingsplaneisen kan dit anders zijn. Wij raden u aan om bij twijfel contact op te nemen met uw gemeente. Wij zijn hiervoor niet verantwoordelijk, maar adviseren graag mee.",
    },
    {
      question: "Welke kleuren zijn populair en waar moet ik op letten (bijv. groen)?",
      answer:
        "Gevel schilderen kleuren lopen uiteen van tijdloze tinten als gebroken wit, zandbeige en antraciet tot modernere keuzes als olijfgroen, terracotta of diepblauw. Groen is een populaire keuze voor gevels, maar donkere en verzadigde tinten — waaronder groen — kunnen UV-verwering en vervuiling sneller zichtbaar maken dan lichte kleuren. Wij adviseren bij voorkeur een proefvlak om de kleur in daglichtsituatie te beoordelen. Houd ook rekening met eventuele welstandseisen van de gemeente.",
    },
    {
      question: "Kan het ook met verfspuit/airless?",
      answer:
        "In sommige situaties is spuitwerk (airless verfspuit) een efficiënte methode voor het aanbrengen van gevelverf, met name bij grote, vlakke gevels zonder veel obstructies. Het vereist zorgvuldige afscherming van de omgeving en aangrenzende vlakken om overspray te voorkomen. Wij beoordelen per project of spuitwerk of rolwerk de meest geschikte techniek is, mede op basis van het verfsysteem en de locatie. Voor advies op maat: /contact/",
    },
  ],
};

export const internalLinks = [
  { label: "Diensten", href: "/diensten/" },
  { label: "Gevelisolatie", href: "/gevelisolatie/" },
  { label: "Buitenstucwerk", href: "/buiten-stucwerk/" },
  { label: "Sierpleister", href: "/sierpleister/" },
  { label: "Contact", href: "/contact/" },
];

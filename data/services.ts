export interface ServiceCard {
  title: string
  subtitle: string
  description: string
  href: string
  image: string
  badge?: string
  features: string[]
}

export interface Service {
  id: string
  title: string
  subtitle?: string
  description: string
  fullDescription?: string
  icon?: string
  image?: string
  priceRange?: string
  duration?: string
  featured?: boolean
  features: string[]
  benefits: string[]
  process: { step: number; title: string; description: string }[]
  faq: { question: string; answer: string }[]
}

export const services: Service[] = [
  {
    id: "etics",
    title: "ETICS Buitengevelisolatie",
    subtitle: "Energiebesparing & comfort",
    description: "Professionele isolatie van uw buitengevel voor optimale energiebesparing.",
    fullDescription:
      "Het ETICS-systeem (External Thermal Insulation Composite System) is de meest effectieve methode voor na-isolatie van buitengevels. Isolatieplaten worden aan de gevel bevestigd en afgewerkt met een wapening en sierpleister of steenstrips. Dit verlaagt uw energieverbruik aanzienlijk en verhoogt het wooncomfort.",
    icon: "shield",
    image: "/images/dienst-isolatie.webp",
    priceRange: "€110 – €280 / m²",
    duration: "2 – 4 weken",
    featured: true,
    features: ["Energielabel verbetering", "Vochtwerend", "Geluidsisolatie", "Onderhoudsarm"],
    benefits: [
      "Tot 30% lagere energiekosten door optimale gevelisolatie.",
      "Verbeterd wooncomfort: warmer in de winter, koeler in de zomer.",
      "Waardestijging van uw woning door betere energieprestatie.",
      "Bescherming van de gevel tegen weer en vocht.",
    ],
    process: [
      { step: 1, title: "Gratis opname", description: "Wij komen vrijblijvend de situatie bekijken en adviseren over de beste oplossing." },
      { step: 2, title: "Offerte", description: "U ontvangt een heldere offerte met materialen, planning en kosten." },
      { step: 3, title: "Uitvoering", description: "Onze vakmensen isoleren en werken uw gevel netjes af." },
      { step: 4, title: "Oplevering", description: "Eindcontrole en oplevering, inclusief garantie." },
    ],
    faq: [
      { question: "Hoeveel bespaar ik met gevelisolatie?", answer: "Gemiddeld 20–30% op uw energiekosten, afhankelijk van de huidige isolatiewaarde en het type woning." },
      { question: "Hoe lang duurt het project?", answer: "Een gemiddelde woning wordt in 2 tot 4 weken volledig geïsoleerd en afgewerkt." },
      { question: "Welke afwerkingen zijn mogelijk?", answer: "U kunt kiezen uit stucwerk (glad), sierpleister, crepi of steenstrips." },
    ],
  },
  {
    id: "gevelrenovatie",
    title: "Gevelrenovatie",
    subtitle: "Herstel & vernieuwing",
    description: "Complete renovatie en herstel van gevels voor een frisse uitstraling.",
    fullDescription:
      "Bij gevelrenovatie herstellen we beschadigingen, voegen we opnieuw en brengen we een beschermende afwerking aan. Zo geeft u uw woning een frisse, verzorgde uitstraling die jarenlang meegaat.",
    icon: "wrench",
    image: "/images/dienst-stucwerk.webp",
    featured: true,
    features: ["Voegwerk herstel", "Scheuren reparatie", "Beschermende coating", "Frisse uitstraling"],
    benefits: [
      "Verlengde levensduur van uw gevel en voegwerk.",
      "Bescherming tegen vochtpenetratie en verdere schade.",
      "Waardebehoud en verbetering van uw woning.",
    ],
    process: [
      { step: 1, title: "Inspectie", description: "Wij beoordelen de staat van de gevel en adviseren over de beste aanpak." },
      { step: 2, title: "Offerte", description: "U ontvangt een heldere offerte met scope en planning." },
      { step: 3, title: "Uitvoering", description: "Herstel, reiniging en afwerking van de gevel." },
      { step: 4, title: "Oplevering", description: "Eindcontrole en oplevering." },
    ],
    faq: [
      { question: "Wanneer is gevelrenovatie nodig?", answer: "Bij zichtbare scheuren, loszittend voegwerk, vochtplekken of verweerd metselwerk." },
      { question: "Hoe lang gaat een gerenoveerde gevel mee?", answer: "Met de juiste materialen en afwerking 15 tot 25 jaar." },
    ],
  },
  {
    id: "stucwerk",
    title: "Stucwerk",
    subtitle: "Strakke afwerking",
    description: "Hoogwaardig stucwerk voor een strakke en mooie afwerking.",
    fullDescription:
      "Wij leveren professioneel stucwerk voor zowel binnen- als buitengevels. Van glad pleisterwerk tot gestructureerde afwerkingen — altijd met oog voor detail en duurzaamheid.",
    icon: "brush",
    image: "/images/dienst-stucwerk.webp",
    features: ["Glad of gestructureerd", "Duurzaam materiaal", "Vakkundige afwerking", "Snelle uitvoering"],
    benefits: [
      "Een strakke, moderne uitstraling van uw gevel of binnenmuur.",
      "Bescherming van de onderliggende constructie.",
      "Makkelijk te onderhouden en te schilderen.",
    ],
    process: [
      { step: 1, title: "Opname", description: "Beoordeling van de ondergrond en bespreking van uw wensen." },
      { step: 2, title: "Offerte", description: "Heldere prijsopgave met materialen en planning." },
      { step: 3, title: "Uitvoering", description: "Professioneel aanbrengen van het stucwerk." },
      { step: 4, title: "Oplevering", description: "Eindcontrole en oplevering." },
    ],
    faq: [
      { question: "Wat kost stucwerk per m²?", answer: "Afhankelijk van de ondergrond en het type afwerking. Vraag een vrijblijvende offerte aan." },
      { question: "Kan ik stucwerk over bestaand pleisterwerk aanbrengen?", answer: "Ja, mits de bestaande laag goed hecht. Wij controleren dit bij de opname." },
    ],
  },
  {
    id: "schilderwerk",
    title: "Schilderwerk",
    subtitle: "Bescherming & kleur",
    description: "Professioneel schilder- en afwerkingswerk binnen en buiten.",
    fullDescription:
      "Van gevel schilderen tot binnenschilderwerk — wij gebruiken hoogwaardige verven voor een langdurig en professioneel resultaat. Bescherming en een frisse uitstraling in één.",
    icon: "droplet",
    image: "/images/dienst-schilderen.webp",
    features: ["UV-bestendig", "Waterafstotend", "Groot kleurpalet", "Nette detaillering"],
    benefits: [
      "Langdurige bescherming tegen weer, vocht en UV-straling.",
      "Frisse, verzorgde uitstraling van uw woning.",
      "Waardebehoud door preventief onderhoud.",
    ],
    process: [
      { step: 1, title: "Kleuradvies", description: "Wij adviseren over kleuren en verfsoorten." },
      { step: 2, title: "Offerte", description: "Heldere offerte met scope en planning." },
      { step: 3, title: "Uitvoering", description: "Voorbereiding, grondlagen en aflakken." },
      { step: 4, title: "Oplevering", description: "Eindcontrole en oplevering." },
    ],
    faq: [
      { question: "Hoe lang houdt buitenverf het?", answer: "Afhankelijk van de verfsoort en ondergrond: 7 tot 15 jaar." },
      { question: "Schilderen jullie ook binnen?", answer: "Ja, wij verzorgen zowel binnen- als buitenschilderwerk." },
    ],
  },
]

export const servicesData: ServiceCard[] = [
  {
    title: "Buitengevelisolatie (ETICS)",
    subtitle: "Energiebesparing & comfort",
    description:
      "Professionele ETICS isolatie voor optimale energiebesparing en verbeterd wooncomfort. Bespaar tot 30% op uw energiekosten.",
    href: "/gevelisolatie/",
    image: "/images/dienst-isolatie.webp",
    badge: "Meest gekozen",
    features: ["Energielabel verbetering", "30% besparing", "Vochtwerend"],
  },
  {
    title: "Gevel schilderen",
    subtitle: "Bescherming & uitstraling",
    description:
      "Vakkundig schilderwerk voor een frisse uitstraling. Bescherming tegen weersinvloeden met hoogwaardige materialen.",
    href: "/gevel-schilderen/",
    image: "/images/dienst-schilderen.webp",
    features: ["UV-bestendig", "Waterafstotend", "Nette detaillering"],
  },
  {
    title: "Buiten stucwerk",
    subtitle: "Strakke gevelafwerking",
    description:
      "Duurzaam buitenstucwerk voor een strakke, moderne gevelafwerking. Onderhoudsarm en bestand tegen alle weersomstandigheden.",
    href: "/buiten-stucwerk/",
    image: "/images/dienst-stucwerk.webp",
    features: ["Duurzaam", "Onderhoudsarm", "Weerbestendig"],
  },
  {
    title: "Sierpleister",
    subtitle: "Decoratieve afwerking",
    description:
      "Decoratieve sierpleister in verschillende structuren en kleuren. Geeft uw gevel een unieke, eigentijdse uitstraling.",
    href: "/sierpleister/",
    image: "/images/dienst-sierpleister.webp",
    features: ["Structuurkeuze", "Kleurvrijheid", "Krasvast"],
  },
  {
    title: "Muren stucen",
    subtitle: "Binnen & buiten",
    description:
      "Professioneel stucwerk voor binnen- en buitenmuren. Glad of gestructureerd, voor een perfect afgewerkte wand.",
    href: "/muren-stucen/",
    image: "/images/dienst-muren.webp",
    features: ["Professioneel", "Onderhoudsvriendelijk", "Moderne afwerking"],
  },
  {
    title: "Schoonmaak na verbouwing",
    subtitle: "Perfecte oplevering",
    description:
      "Grondige schoonmaak na verbouwing of renovatie. Wij zorgen dat uw woning opgeleverd wordt in perfecte staat.",
    href: "/contact/",
    image: "/images/dienst-schoonmaak.webp",
    features: ["Grondige reiniging", "Perfect opgeleverd", "Stofvrij"],
  },
]

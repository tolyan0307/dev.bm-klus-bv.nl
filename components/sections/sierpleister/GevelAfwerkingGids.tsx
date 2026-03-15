import { buildSrcSet, getFallbackSrc } from "@/lib/responsive-image";
import GevelAfwerkingGidsInteractive, {
  type FinishItem,
} from "./GevelAfwerkingGidsInteractive";

// ─── Static finish data (non-image fields only) ───────────────────────────────

type StructuurFilter = "Alle" | "Fijn" | "Midden" | "Grof";
type PropLevel = 1 | 2 | 3;

interface FinishData {
  id: string;
  name: string;
  subtitle: string;
  baseName: string;
  imageAlt: string;
  structuur: FinishItem["structuur"];
  structuurFilter: StructuurFilter[];
  korrel: string;
  systeem: FinishItem["systeem"];
  onderhoud: FinishItem["onderhoud"];
  etics: boolean | "beperkt";
  props: { dampopenheid: PropLevel; waterafstotend: PropLevel; algen: PropLevel };
  card: { pastGoed: string; pluspunt: string; letOp: string };
  modal: {
    waarvoor: [string, string, string];
    onderhoud: [string, string];
    korrelvarianten: string[];
    letOp: string;
  };
}

const FINISHES_DATA: FinishData[] = [
  {
    id: "spachtelputz",
    name: "Spachtelputz",
    subtitle: "Schuurstructuur gevelpleister",
    baseName: "gevel-sierpleister-spachtelputz",
    imageAlt: "Rotterdam gevel sierpleister spachtelputz – schuurstructuur close-up",
    structuur: "Midden",
    structuurFilter: ["Midden"],
    korrel: "1,5–2,0 mm",
    systeem: "Siliconenhars",
    onderhoud: "Laag",
    etics: true,
    props: { dampopenheid: 2, waterafstotend: 3, algen: 2 },
    card: {
      pastGoed: "Moderne gevels, strakke lijnen",
      pluspunt: "Rustige structuur, maskeert lichte oneffenheden",
      letOp: "Korrel bepaalt uitstraling; proefvlak is slim",
    },
    modal: {
      waarvoor: [
        "Renovatie van moderne en jaren-'70–'80 gevels",
        "Gevels waar een strakke, tijdloze uitstraling gewenst is",
        "Als eindlaag in een ETICS-systeem",
      ],
      onderhoud: [
        "Reinigen met zachte waterdruk; vermijd bijtende middelen",
        "Behandel algen tijdig bij beschaduwde of noordgerichte gevels",
      ],
      korrelvarianten: ["1,5 mm", "2,0 mm"],
      letOp: "Meng emmers uit dezelfde charge om kleurverschil te vermijden.",
    },
  },
  {
    id: "crepi",
    name: "Crepi",
    subtitle: "Rustieke gevelpleister",
    baseName: "gevel-sierpleister-crepi",
    imageAlt: "Rotterdam gevel sierpleister crepi – robuuste structuur close-up",
    structuur: "Midden–Grof",
    structuurFilter: ["Midden", "Grof"],
    korrel: "2,0–3,0 mm",
    systeem: "Siliconenhars",
    onderhoud: "Middel",
    etics: true,
    props: { dampopenheid: 2, waterafstotend: 3, algen: 2 },
    card: {
      pastGoed: "Grotere gevelvlakken, landelijke look",
      pluspunt: "Robuuste uitstraling, maskeert oneffenheden uitstekend",
      letOp: "Grover houdt meer vuil vast → periodiek reinigen",
    },
    modal: {
      waarvoor: [
        "Grotere gevelvlakken met meer oneffenheden",
        "Traditionele of landelijke woningstylen",
        "Gevels met een uitgesproken structuur gewenst",
      ],
      onderhoud: [
        "Jaarlijks inspecteren op algen en vervuiling, met name noordzijde",
        "Reinigen met geschikte gevelreiniger bij aanslag",
      ],
      korrelvarianten: ["2,0 mm", "3,0 mm"],
      letOp: "Grovere structuur maskeert meer maar bindt ook meer vuil in de structuur.",
    },
  },
  {
    id: "siliconenhars",
    name: "Siliconenhars sierpleister",
    subtitle: "Waterafstotend & duurzaam",
    baseName: "gevel-sierpleister-siliconenhars",
    imageAlt: "Rotterdam gevel sierpleister siliconenhars – waterafstotende afwerking",
    structuur: "Fijn–Grof",
    structuurFilter: ["Fijn", "Midden", "Grof"],
    korrel: "1,5–3,0 mm (keuze)",
    systeem: "Siliconenhars",
    onderhoud: "Laag",
    etics: true,
    props: { dampopenheid: 2, waterafstotend: 3, algen: 3 },
    card: {
      pastGoed: "Gevels met veel regen- en weerbelasting",
      pluspunt: "Waterafstotend en minder gevoelig voor micro-organismen",
      letOp: "Meng emmers uit dezelfde charge om kleurverschil te vermijden",
    },
    modal: {
      waarvoor: [
        "Gevels op open locaties met veel slagregen",
        "Noord- en schaduwzijden met algenrisico",
        "Als eindlaag in ETICS-systemen met hoge weervereisten",
      ],
      onderhoud: [
        "Minder reinigingsbeurt nodig dan minerale varianten",
        "Controleer jaarlijks op aantasting van kitvoegen rondom kozijnen",
      ],
      korrelvarianten: ["1,5 mm", "2,0 mm", "3,0 mm"],
      letOp: "Kleur/charge: mix emmers van dezelfde productienummer om ongewenste kleurverschillen te voorkomen.",
    },
  },
  {
    id: "silicaat",
    name: "Silicaat sierpleister",
    subtitle: "Dampopen minerale afwerking",
    baseName: "gevel-sierpleister-silicaat",
    imageAlt: "Rotterdam gevel sierpleister silicaat – minerale dampopen afwerking",
    structuur: "Fijn–Midden",
    structuurFilter: ["Fijn", "Midden"],
    korrel: "1,5–2,0 mm",
    systeem: "Silicaat",
    onderhoud: "Laag",
    etics: true,
    props: { dampopenheid: 3, waterafstotend: 2, algen: 3 },
    card: {
      pastGoed: "Dampopen gevels, minerale en historische ondergronden",
      pluspunt: "Zeer dampdoorlatend en waterafstotend",
      letOp: "Ondergrond en systeemkeuze zijn bepalend voor hechting",
    },
    modal: {
      waarvoor: [
        "Gevels met een hoge vochtwisseling (dampopen constructie)",
        "Historische panden of minerale ondergronden",
        "In combinatie met silicaat-verfsystemen",
      ],
      onderhoud: [
        "Lage onderhoudsintensiteit door algenwerende eigenschappen",
        "Controleer aansluiting op kozijnen bij ouder voegwerk",
      ],
      korrelvarianten: ["1,5 mm", "2,0 mm"],
      letOp: "Silicaat stelt hoge eisen aan de primer en ondergrond; niet geschikt op elke bestaande afwerking.",
    },
  },
  {
    id: "krabpleister",
    name: "Krabpleister",
    subtitle: "Krabstructuur, mineraal",
    baseName: "gevel-sierpleister-krabpleister",
    imageAlt: "Rotterdam gevel sierpleister krabpleister – minerale krabstructuur detail",
    structuur: "Grof",
    structuurFilter: ["Grof"],
    korrel: "2,0–3,0 mm+",
    systeem: "Mineraal",
    onderhoud: "Middel",
    etics: true,
    props: { dampopenheid: 3, waterafstotend: 2, algen: 2 },
    card: {
      pastGoed: "Traditionele gevels, dampopen wens",
      pluspunt: "Dampopen en kleurvast (vaak in de massa gekleurd)",
      letOp: "Details en profielen kunnen zichtbaarder zijn in de structuur",
    },
    modal: {
      waarvoor: [
        "Traditionele woningen met dampopen gevelconstructie",
        "Renovaties waarbij minerale opbouw gewenst is",
        "In combinatie met ETICS (systeemafhankelijk)",
      ],
      onderhoud: [
        "Controleer jaarlijks op algen- en mosgroei in de diepere structuur",
        "Reinig met milde druk; bijtmiddelen kunnen oppervlak aantasten",
      ],
      korrelvarianten: ["2,0 mm", "3,0 mm"],
      letOp: "Details, hoekprofielen en dagkanten vragen extra aandacht bij de grovere structuur.",
    },
  },
  {
    id: "kalei",
    name: "Kaleien",
    subtitle: "Kalkpleister techniek",
    baseName: "gevel-sierpleister-kalei",
    imageAlt: "Rotterdam gevel sierpleister kaleien – kalkpleister techniek op metselwerk",
    structuur: "Rustiek",
    structuurFilter: ["Grof"],
    korrel: "Variabel (kalk)",
    systeem: "Mineraal",
    onderhoud: "Middel",
    etics: false,
    props: { dampopenheid: 3, waterafstotend: 2, algen: 2 },
    card: {
      pastGoed: "Karakter- en landelijk stijl, metselwerk zichtbaar",
      pluspunt: "Ademend en waterafstotend (afhankelijk van opbouw)",
      letOp: "Techniek is bepalend; ondergrond moet geschikt zijn",
    },
    modal: {
      waarvoor: [
        "Karakterpanden en landelijke woningen",
        "Gevels waarbij metselwerkstructuur deels zichtbaar mag blijven",
        "Renovaties met nadruk op authenticiteit en duurzaamheid",
      ],
      onderhoud: [
        "Periodiek inspecteren op uitbloeiingen en vochtsporen",
        "Behandel lokale algen tijdig; gebruik kalk-compatibele reinigingsmiddelen",
      ],
      korrelvarianten: ["Variabel (vakmanstechniek)"],
      letOp: "Kaleien is een ambachtelijke techniek; de kwaliteit is sterk vakmanschapsafhankelijk.",
    },
  },
];

export default function GevelAfwerkingGids() {
  const finishes: FinishItem[] = FINISHES_DATA.map(({ baseName, ...rest }) => ({
    ...rest,
    imgSrc: getFallbackSrc(baseName, "/images", "serviceCard"),
    imgSrcSet: buildSrcSet(baseName, "/images", "serviceCard"),
  }));

  return <GevelAfwerkingGidsInteractive finishes={finishes} />;
}

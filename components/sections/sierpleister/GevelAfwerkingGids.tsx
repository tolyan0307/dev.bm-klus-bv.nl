"use client";

import { useState, useId } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ChevronDown,
  LayoutGrid,
  CheckCircle2,
  ArrowRight,
  Info,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type StructuurFilter = "Alle" | "Fijn" | "Midden" | "Grof";
type SysteemFilter = "Alle" | "Mineraal" | "Siliconenhars" | "Silicaat";
type OnderhoudFilter = "Alle" | "Laag" | "Middel";

type PropLevel = 1 | 2 | 3; // 1=laag, 2=middel, 3=hoog

interface Finish {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  structuur: "Fijn" | "Midden" | "Grof" | "Fijn–Midden" | "Fijn–Grof" | "Midden–Grof" | "Rustiek";
  structuurFilter: StructuurFilter[];
  korrel: string;
  systeem: "Mineraal" | "Siliconenhars" | "Silicaat";
  onderhoud: "Laag" | "Middel";
  etics: boolean | "beperkt";
  props: {
    dampopenheid: PropLevel;
    waterafstotend: PropLevel;
    algen: PropLevel;
  };
  card: {
    pastGoed: string;
    pluspunt: string;
    letOp: string;
  };
  modal: {
    waarvoor: [string, string, string];
    onderhoud: [string, string];
    korrelvarianten: string[];
    letOp: string;
  };
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const FINISHES: Finish[] = [
  {
    id: "spachtelputz",
    name: "Spachtelputz",
    subtitle: "Schuurstructuur gevelpleister",
    image: "/images/gevel-sierpleister-spachtelputz.webp",
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
    image: "/images/gevel-sierpleister-crepi.webp",
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
    image: "/images/gevel-sierpleister-siliconenhars.webp",
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
    image: "/images/gevel-sierpleister-silicaat.webp",
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
    image: "/images/gevel-sierpleister-krabpleister.webp",
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
    image: "/images/gevel-sierpleister-kalei.webp",
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PROP_LABELS: Record<string, string> = {
  dampopenheid: "Dampopenheid",
  waterafstotend: "Waterafstotend",
  algen: "Vuil/algenbestendig",
};

function PropMeter({
  level,
  label,
}: {
  level: PropLevel;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-1" aria-label={`${label}: ${level} van 3`}>
      <span className="text-[10px] font-medium text-muted-foreground">{label}</span>
      <div className="flex gap-0.5" role="img" aria-label={`${level} van 3`}>
        {[1, 2, 3].map((dot) => (
          <div
            key={dot}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              dot <= level ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function EticsBadge({ value }: { value: boolean | "beperkt" }) {
  if (value === true)
    return (
      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
        ETICS
      </span>
    );
  if (value === "beperkt")
    return (
      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
        ETICS beperkt
      </span>
    );
  return (
    <span className="rounded-full bg-border/60 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
      Geen ETICS
    </span>
  );
}

// ─── Compare tray ─────────────────────────────────────────────────────────────

interface CompareTrayProps {
  selected: string[];
  finishes: Finish[];
  onRemove: (id: string) => void;
  onCompare: () => void;
  onReset: () => void;
}

function CompareTray({
  selected,
  finishes,
  onRemove,
  onCompare,
  onReset,
}: CompareTrayProps) {
  if (selected.length === 0) return null;
  const items = selected.map((id) => finishes.find((f) => f.id === id)!);

  return (
    <div
      role="region"
      aria-label="Vergelijkingsbalk"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card shadow-2xl"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <span className="text-xs font-semibold text-foreground shrink-0">
          Vergelijken ({selected.length}/2):
        </span>
        <div className="flex flex-1 flex-wrap gap-2">
          {items.map((f) => (
            <div
              key={f.id}
              className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1"
            >
              <span className="text-xs font-medium text-foreground">{f.name}</span>
              <button
                onClick={() => onRemove(f.id)}
                aria-label={`${f.name} verwijderen uit vergelijking`}
                className="flex h-4 w-4 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex shrink-0 gap-2">
          {selected.length === 2 && (
            <button
              onClick={onCompare}
              className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Vergelijk nu
            </button>
          )}
          <button
            onClick={onReset}
            aria-label="Vergelijking resetten"
            className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Compare modal ────────────────────────────────────────────────────────────

interface CompareModalProps {
  ids: [string, string];
  finishes: Finish[];
  onClose: () => void;
}

function CompareModal({ ids, finishes, onClose }: CompareModalProps) {
  const [a, b] = ids.map((id) => finishes.find((f) => f.id === id)!);

  const rows: Array<{ label: string; a: React.ReactNode; b: React.ReactNode }> = [
    { label: "Structuur", a: a.structuur, b: b.structuur },
    { label: "Korrel (mm)", a: a.korrel, b: b.korrel },
    { label: "Systeem", a: a.systeem, b: b.systeem },
    { label: "Onderhoud", a: a.onderhoud, b: b.onderhoud },
    {
      label: "Dampopenheid",
      a: <PropMeter level={a.props.dampopenheid} label="" />,
      b: <PropMeter level={b.props.dampopenheid} label="" />,
    },
    {
      label: "Waterafstotend",
      a: <PropMeter level={a.props.waterafstotend} label="" />,
      b: <PropMeter level={b.props.waterafstotend} label="" />,
    },
    {
      label: "Algen/vuil",
      a: <PropMeter level={a.props.algen} label="" />,
      b: <PropMeter level={b.props.algen} label="" />,
    },
    {
      label: "ETICS-geschikt",
      a: <EticsBadge value={a.etics} />,
      b: <EticsBadge value={b.etics} />,
    },
    { label: "Past goed bij", a: a.card.pastGoed, b: b.card.pastGoed },
    { label: "Opmerking", a: a.card.letOp, b: b.card.letOp },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Vergelijking: ${a.name} vs ${b.name}`}
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-2xl rounded-t-2xl sm:rounded-2xl border border-border bg-card shadow-2xl max-h-[90dvh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-5 py-4">
          <p className="text-sm font-semibold text-foreground">
            {a.name} <span className="text-muted-foreground">vs</span> {b.name}
          </p>
          <button
            onClick={onClose}
            aria-label="Vergelijking sluiten"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Column headers */}
        <div className="grid grid-cols-3 gap-0 border-b border-border bg-secondary/30 px-5 py-3">
          <div />
          {[a, b].map((f) => (
            <p key={f.id} className="text-xs font-semibold text-foreground text-center">
              {f.name}
            </p>
          ))}
        </div>

        {/* Rows */}
        <div className="divide-y divide-border px-5">
          {rows.map(({ label, a: va, b: vb }) => (
            <div key={label} className="grid grid-cols-3 gap-2 py-3">
              <p className="text-xs font-medium text-muted-foreground self-center">{label}</p>
              {[va, vb].map((v, i) => (
                <div key={i} className="flex items-center justify-center">
                  {typeof v === "string" ? (
                    <span className="text-center text-xs text-foreground">{v}</span>
                  ) : (
                    v
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Footer disclaimer */}
        <div className="border-t border-border px-5 py-4">
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            <Info className="mr-1 inline h-3 w-3 text-primary/60" />
            Indicatief: de beste keuze hangt af van ondergrond, details en ligging.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Detail modal ─────────────────────────────────────────────────────────────

interface DetailModalProps {
  finish: Finish;
  onClose: () => void;
}

function DetailModal({ finish, onClose }: DetailModalProps) {
  const f = finish;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Details: ${f.name}`}
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-lg rounded-t-2xl sm:rounded-2xl border border-border bg-card shadow-2xl max-h-[90dvh] overflow-y-auto">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden rounded-t-2xl bg-secondary sm:h-56">
          <Image
            src={f.image}
            alt={f.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 512px"
          />
          <button
            onClick={onClose}
            aria-label="Sluiten"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-bold text-foreground">{f.name}</h3>
            <EticsBadge value={f.etics} />
          </div>
          <p className="mb-5 text-sm text-muted-foreground">{f.subtitle}</p>

          {/* Props */}
          <div className="mb-6 grid grid-cols-3 gap-3">
            {(
              Object.entries(f.props) as [
                keyof typeof f.props,
                PropLevel
              ][]
            ).map(([key, val]) => (
              <PropMeter key={key} level={val} label={PROP_LABELS[key]} />
            ))}
          </div>

          {/* Waarvoor geschikt */}
          <div className="mb-5">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-primary/70">
              Waarvoor geschikt
            </p>
            <ul className="space-y-1.5">
              {f.modal.waarvoor.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span className="text-xs leading-relaxed text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Onderhoud */}
          <div className="mb-5">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-primary/70">
              Onderhoud
            </p>
            <ul className="space-y-1.5">
              {f.modal.onderhoud.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <div className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                  <span className="text-xs leading-relaxed text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Korrel varianten */}
          <div className="mb-5">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-primary/70">
              Korrelopties
            </p>
            <div className="flex flex-wrap gap-2">
              {f.modal.korrelvarianten.map((k) => (
                <span
                  key={k}
                  className="rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs font-medium text-foreground"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>

          {/* Let op */}
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700 mb-1">
              Let op
            </p>
            <p className="text-xs leading-relaxed text-amber-900">{f.modal.letOp}</p>
          </div>

          {/* CTA */}
          <Link
            href="/contact/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline underline-offset-4 transition-colors"
          >
            Vraag advies aan
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          {/* Disclaimer */}
          <p className="mt-4 text-[10px] leading-relaxed text-muted-foreground/70">
            Indicatief: de beste keuze hangt af van ondergrond, details en ligging.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Filter bar ───────────────────────────────────────────────────────────────

interface FilterBarProps {
  structuur: StructuurFilter;
  systeem: SysteemFilter;
  onderhoud: OnderhoudFilter;
  etics: boolean;
  search: string;
  onStructuur: (v: StructuurFilter) => void;
  onSysteem: (v: SysteemFilter) => void;
  onOnderhoud: (v: OnderhoudFilter) => void;
  onEtics: (v: boolean) => void;
  onSearch: (v: string) => void;
  searchId: string;
}

function FilterBar({
  structuur,
  systeem,
  onderhoud,
  etics,
  search,
  onStructuur,
  onSysteem,
  onOnderhoud,
  onEtics,
  onSearch,
  searchId,
}: FilterBarProps) {
  const structuurOpts: StructuurFilter[] = ["Alle", "Fijn", "Midden", "Grof"];
  const systeemOpts: SysteemFilter[] = ["Alle", "Mineraal", "Siliconenhars", "Silicaat"];
  const onderhoudOpts: OnderhoudFilter[] = ["Alle", "Laag", "Middel"];

  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <div className="relative max-w-xs">
        <label htmlFor={searchId} className="sr-only">
          Zoek op naam
        </label>
        <input
          id={searchId}
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Zoeken op naam…"
          className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Chip groups */}
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {/* Structuur */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground shrink-0">
            Structuur
          </span>
          {structuurOpts.map((opt) => (
            <button
              key={opt}
              onClick={() => onStructuur(opt)}
              aria-pressed={structuur === opt}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                structuur === opt
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Systeem */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground shrink-0">
            Systeem
          </span>
          {systeemOpts.map((opt) => (
            <button
              key={opt}
              onClick={() => onSysteem(opt)}
              aria-pressed={systeem === opt}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                systeem === opt
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Onderhoud */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground shrink-0">
            Onderhoud
          </span>
          {onderhoudOpts.map((opt) => (
            <button
              key={opt}
              onClick={() => onOnderhoud(opt)}
              aria-pressed={onderhoud === opt}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                onderhoud === opt
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* ETICS toggle */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground shrink-0">
            ETICS
          </span>
          <button
            onClick={() => onEtics(!etics)}
            role="switch"
            aria-checked={etics}
            aria-label="Alleen ETICS-geschikt tonen"
            className={`relative inline-flex h-5 w-9 items-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              etics ? "border-primary bg-primary" : "border-border bg-secondary"
            }`}
          >
            <span
              className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
                etics ? "translate-x-4" : "translate-x-0.5"
              }`}
            />
          </button>
          <span className="text-xs text-muted-foreground">Geschikt voor ETICS</span>
        </div>
      </div>
    </div>
  );
}

// ─── Finish card ──────────────────────────────────────────────────────────────

interface FinishCardProps {
  finish: Finish;
  isComparing: boolean;
  compareCount: number;
  onDetail: () => void;
  onToggleCompare: () => void;
}

function FinishCard({
  finish,
  isComparing,
  compareCount,
  onDetail,
  onToggleCompare,
}: FinishCardProps) {
  const f = finish;
  const compareDisabled = !isComparing && compareCount >= 2;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-md">
      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden bg-secondary">
        <Image
          src={f.image}
          alt={f.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-black/50 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
            {f.systeem}
          </span>
          <EticsBadge value={f.etics} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-5 py-5">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold text-foreground leading-snug">{f.name}</h3>
          <span className="shrink-0 rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            {f.korrel}
          </span>
        </div>
        <p className="mb-4 text-xs text-muted-foreground">{f.subtitle}</p>

        {/* Property meters */}
        <div className="mb-4 grid grid-cols-3 gap-2">
          {(
            Object.entries(f.props) as [keyof typeof f.props, PropLevel][]
          ).map(([key, val]) => (
            <PropMeter key={key} level={val} label={PROP_LABELS[key]} />
          ))}
        </div>

        {/* Bullets */}
        <ul className="mb-5 flex-1 space-y-2">
          {[
            { label: "Past goed bij", value: f.card.pastGoed },
            { label: "Pluspunt", value: f.card.pluspunt },
            { label: "Let op", value: f.card.letOp },
          ].map(({ label, value }) => (
            <li key={label} className="flex items-start gap-2">
              <div className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
              <span className="text-xs leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">{label}:</span> {value}
              </span>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onDetail}
            className="flex-1 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-xs font-semibold text-primary transition-all hover:border-primary/60 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Bekijk details
          </button>
          <button
            onClick={onToggleCompare}
            disabled={compareDisabled}
            aria-pressed={isComparing}
            aria-label={isComparing ? `${f.name} uit vergelijking verwijderen` : `${f.name} toevoegen aan vergelijking`}
            className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              isComparing
                ? "border-primary bg-primary text-white hover:brightness-110"
                : compareDisabled
                ? "cursor-not-allowed border-border bg-card text-muted-foreground/50"
                : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
          >
            {isComparing ? "Geselecteerd" : "Vergelijk"}
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function GevelAfwerkingGids() {
  const searchId = useId();

  const [structuur, setStructuur] = useState<StructuurFilter>("Alle");
  const [systeem, setSysteem] = useState<SysteemFilter>("Alle");
  const [onderhoud, setOnderhoud] = useState<OnderhoudFilter>("Alle");
  const [eticsOnly, setEticsOnly] = useState(false);
  const [search, setSearch] = useState("");

  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);

  // Filtered list
  const filtered = FINISHES.filter((f) => {
    if (structuur !== "Alle" && !f.structuurFilter.includes(structuur)) return false;
    if (systeem !== "Alle" && f.systeem !== systeem) return false;
    if (onderhoud !== "Alle" && f.onderhoud !== onderhoud) return false;
    if (eticsOnly && f.etics !== true) return false;
    if (
      search.trim() !== "" &&
      !f.name.toLowerCase().includes(search.trim().toLowerCase())
    )
      return false;
    return true;
  });

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) return prev;
      return [...prev, id];
    });
  };

  const resetCompare = () => {
    setCompareIds([]);
    setShowCompare(false);
  };

  const detailFinish = detailId ? FINISHES.find((f) => f.id === detailId) ?? null : null;

  return (
    <>
      <section
        id="afwerking-gids"
        className="scroll-mt-24 py-12 sm:py-16 relative before:absolute before:inset-y-0 before:-inset-x-[50vw] before:-z-10 before:bg-secondary/40"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-10 bg-primary" />
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Afwerkinggids
            </span>
          </div>
          <h2 className="mt-2 mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            Populaire gevel-structuren{" "}
            <span className="text-primary">in Nederland</span>
          </h2>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Van <strong className="text-foreground">gevel sierpleister</strong> in een strakke
            schuurstructuur tot klassieke <strong className="text-foreground">crepi</strong> en
            dampopen <strong className="text-foreground">krabpleister</strong> — kies op basis van
            uitstraling, onderhoud en ligging (schaduw/noordzijde). Siliconenhars{" "}
            <strong className="text-foreground">spachtelputz buiten</strong> biedt de beste
            vuilafstoting; minerale varianten scoren hoog op dampopenheid.
          </p>

          {/* Filter bar */}
          <div className="mb-8 rounded-2xl border border-border bg-card px-5 py-5 sm:px-7">
            <FilterBar
              structuur={structuur}
              systeem={systeem}
              onderhoud={onderhoud}
              etics={eticsOnly}
              search={search}
              onStructuur={setStructuur}
              onSysteem={setSysteem}
              onOnderhoud={setOnderhoud}
              onEtics={setEticsOnly}
              onSearch={setSearch}
              searchId={searchId}
            />
          </div>

          {/* Result count */}
          <div className="mb-5 flex items-center gap-2">
            <LayoutGrid className="h-4 w-4 text-primary/60" />
            <span className="text-xs font-medium text-muted-foreground">
              {filtered.length} afwerking{filtered.length !== 1 ? "en" : ""} gevonden
            </span>
            {(structuur !== "Alle" || systeem !== "Alle" || onderhoud !== "Alle" || eticsOnly || search) && (
              <button
                onClick={() => {
                  setStructuur("Alle");
                  setSysteem("Alle");
                  setOnderhoud("Alle");
                  setEticsOnly(false);
                  setSearch("");
                }}
                className="ml-auto flex items-center gap-1 text-xs font-medium text-primary hover:underline underline-offset-4 transition-colors focus-visible:outline-none"
              >
                <X className="h-3 w-3" />
                Filters wissen
              </button>
            )}
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((f) => (
                <FinishCard
                  key={f.id}
                  finish={f}
                  isComparing={compareIds.includes(f.id)}
                  compareCount={compareIds.length}
                  onDetail={() => setDetailId(f.id)}
                  onToggleCompare={() => toggleCompare(f.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card py-16 text-center">
              <ChevronDown className="mb-3 h-8 w-8 text-muted-foreground/30" />
              <p className="text-sm font-medium text-muted-foreground">
                Geen afwerkingen gevonden voor deze combinatie.
              </p>
              <button
                onClick={() => {
                  setStructuur("Alle");
                  setSysteem("Alle");
                  setOnderhoud("Alle");
                  setEticsOnly(false);
                  setSearch("");
                }}
                className="mt-4 text-xs font-semibold text-primary hover:underline underline-offset-4 transition-colors"
              >
                Filters wissen
              </button>
            </div>
          )}

          {/* Compare help text */}
          {compareIds.length === 0 && (
            <p className="mt-6 text-[11px] text-muted-foreground/70 text-center">
              Selecteer tot 2 afwerkingen via &ldquo;Vergelijk&rdquo; om ze naast elkaar te
              bekijken.
            </p>
          )}
        </div>
      </section>

      {/* Compare tray */}
      <CompareTray
        selected={compareIds}
        finishes={FINISHES}
        onRemove={(id) => toggleCompare(id)}
        onCompare={() => setShowCompare(true)}
        onReset={resetCompare}
      />

      {/* Compare modal */}
      {showCompare && compareIds.length === 2 && (
        <CompareModal
          ids={compareIds as [string, string]}
          finishes={FINISHES}
          onClose={() => setShowCompare(false)}
        />
      )}

      {/* Detail modal */}
      {detailFinish && (
        <DetailModal
          finish={detailFinish}
          onClose={() => setDetailId(null)}
        />
      )}
    </>
  );
}

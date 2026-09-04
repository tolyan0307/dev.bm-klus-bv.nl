# GBP-post 2026-W37 · faq · faq-kosten

**Bron:** https://bm-klus-bv.nl/gevelisolatie/kosten/
**Feiten uit bron:**
- €110 – €200 per m² voor ETICS met pleisterafwerking (stuc/sierpleister/crepi) — `app/gevelisolatie/kosten/page.tsx:73` en FAQ-antwoord regel 160
- inclusief arbeid en materiaal, exclusief steiger, herstelwerk en complexe detaillering — regel 160
- detailwerk dagkanten/plint — regel 350
- exacte prijs na opname op locatie, met RC-waarde en afwerking — regels 160, 185, 519
- regio Rotterdam — regels 205, 325, 360
- Niet gebruikt (staat NIET op deze pagina): «gratis» opname, «offerte binnen 24–48 uur»

## Tekst (kopiëren als geheel)

Wat kost buitengevelisolatie per m²? Dat is in de regio Rotterdam onze meest gestelde vraag. Voor ETICS met een pleisterafwerking — stuc, sierpleister of crepi — liggen de richtprijzen tussen €110 en €200 per m², inclusief arbeid en materiaal.

Wat er niet in zit: steiger, eventueel herstelwerk en complexe detaillering. Die posten zetten wij apart in de offerte, samen met het netjes afgewerkte detailwerk aan dagkanten en plint.

Na een opname op locatie ontvangt u een exacte prijs per m², met RC-waarde, isolatiedikte en gekozen afwerking.

## Knop

Type: Meer informatie
URL: https://bm-klus-bv.nl/gevelisolatie/kosten/?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=post-faq-kosten

## Foto

Pagina: https://bm-klus-bv.nl/onze-werken/vlaardingen-gevelisolatie-10cm-sierpleister-2025/ → blok «Na de werken», foto 1
Bestand in repo: `site/public/images/projects/vlaardingen-gevelisolatie-10cm-na-01.w1600.webp`
Opslaan als: gbp-faq-kosten-2025.jpg
Eisen: echte foto, JPG/PNG (WebP niet toegestaan), min. 400×300, aanbevolen 1200×900, 4:3, 10 KB–5 MB
Conversie WebP→JPG: python3 -c "from PIL import Image; Image.open('vlaardingen-gevelisolatie-10cm-na-01.w1600.webp').convert('RGB').save('gbp-faq-kosten-2025.jpg', quality=92)"

## Publiceren (mens, ~2 minuten)

1. google.com/search?q=BM+klus+BV&hl=nl → blok «Je bedrijf op Google» → **Posts** → **Post toevoegen** → **Update toevoegen**
2. Tekst plakken · foto uploaden · **Knop toevoegen → Meer informatie** → URL plakken
3. **Voorbeeld** controleren → **Publiceren**
4. In `gbp-posts/log.jsonl` bij deze week `"published": true` zetten

## Checklist

- [x] Elk getal in de tekst staat op de bronpagina (110 en 200 → kosten/page.tsx:73, 160)
- [x] Eén stad (Rotterdam) — staat op de bronpagina; jaar n.v.t. bij type `faq`
- [x] Geen telefoon / e-mail / adres / «bel ons»-oproep
- [x] Alleen nl-NL (geen cyrillisch, geen Engels)
- [x] 544 tekens (350–700)
- [x] Openingszin (vraagvorm) wijkt af van post 2026-W36 (`case`, Dordrecht); bron `/gevelisolatie/kosten/` nog niet gebruikt
- [x] Knop-URL geeft HTTP 200 en bevat alle vier UTM-parameters (geverifieerd met curl)
- [x] Foto concreet benoemd: Vlaardingen-case → blok «Na de werken», foto 1
- [x] Echte projectfoto uit eigen archief; niets gegenereerd of stock

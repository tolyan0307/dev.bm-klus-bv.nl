import Link from "next/link"
import { buildPageMetadata } from "@/lib/seo/meta"

export const metadata = buildPageMetadata("/privacybeleid/")

export default function PrivacybeleidPage() {
  return (
    <>
      {/* ── Hero Section with Dark Background ──────────────────────────────── */}
      <section className="relative pt-36 pb-16 overflow-hidden sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24">
        {/* Dark background with radial gradient */}
        <div className="absolute inset-0 bg-foreground" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,transparent_40%,rgba(0,0,0,0.55)_100%)]" />

        {/* Texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full container-default">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-white/50">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/30">/</li>
              <li className="text-white font-medium">Privacybeleid</li>
            </ol>
          </nav>

          {/* H1 + intro */}
          <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
            Privacybeleid &amp; Cookiebeleid
          </h1>
          <p className="text-base leading-relaxed text-white/70 mb-2">
            BM klus BV hecht veel waarde aan transparantie over hoe wij omgaan met uw persoonsgegevens en cookies. Op deze pagina leest u welke gegevens wij verwerken, waarom wij dat doen en hoe u uw cookievoorkeuren kunt beheren of aanpassen.
          </p>
          <p className="text-sm text-white/60 mb-2">
            <span className="font-medium">Laatst bijgewerkt:</span> 25 februari 2026
          </p>
        </div>
      </section>

      <main className="bg-background pb-20">
        <div className="container-default pt-14">

          {/* No divider here — hero already has visual separation */}

          {/* Section 1 */}
          <section aria-labelledby="wie-zijn-wij" className="mb-10">
            <h2 id="wie-zijn-wij" className="text-xl font-bold text-foreground mb-4">
              1. Wie zijn wij?
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground mb-4">
              Wij zijn verantwoordelijk voor de verwerking van uw persoonsgegevens. Hieronder vindt u onze contactgegevens. Voor vragen of verzoeken met betrekking tot uw privacy kunt u contact met ons opnemen via het onderstaande e-mailadres.
            </p>
            <table className="w-full text-sm border-collapse">
              <tbody>
                {[
                  ["Bedrijfsnaam", "BM klus BV"],
                  ["Adres", "Bonaventurastraat 58B, 3081 HE Rotterdam, Nederland"],
                  ["E-mail", "info@bm-klus-bv.nl"],
                  ["Telefoon / WhatsApp", "+31 6 1207 9808"],
                  ["KVK-nummer", "77356039"],
                ].map(([label, value]) => (
                  <tr key={label} className="border-b border-border">
                    <td className="py-2.5 pr-4 font-medium text-foreground w-44 align-top">{label}</td>
                    <td className="py-2.5 text-muted-foreground">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Section 2 */}
          <section aria-labelledby="welke-gegevens" className="mb-10">
            <h2 id="welke-gegevens" className="text-xl font-bold text-foreground mb-4">
              2. Welke persoonsgegevens verwerken wij?
            </h2>

            <h3 className="text-base font-semibold text-foreground mb-2">A) Contact en offerteaanvraag</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground leading-relaxed mb-4 space-y-1 pl-1">
              <li>Naam (als u die opgeeft)</li>
              <li>Telefoonnummer</li>
              <li>E-mailadres (optioneel)</li>
              <li>Woonplaats</li>
              <li>Inhoud van uw bericht en eventuele projectinformatie die u meestuurt</li>
            </ul>

            <h3 className="text-base font-semibold text-foreground mb-2">B) Communicatie</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground leading-relaxed mb-4 space-y-1 pl-1">
              <li>Contactmomenten (bijv. e-mail, telefoon of WhatsApp) en correspondentie</li>
              <li>Als u contact opneemt via WhatsApp, worden persoonsgegevens ook door WhatsApp (Meta) verwerkt volgens hun eigen privacybeleid.</li>
            </ul>

            <h3 className="text-base font-semibold text-foreground mb-2">C) Websitegebruik (via cookies/techniek)</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground leading-relaxed space-y-1 pl-1">
              <li>IP-adres (in beperkte vorm)</li>
              <li>Apparaat- en browserinformatie</li>
              <li>Pagina-interacties</li>
              <li>Cookie-ID&apos;s (afhankelijk van uw cookiekeuze)</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section aria-labelledby="doeleinden" className="mb-10">
            <h2 id="doeleinden" className="text-xl font-bold text-foreground mb-4">
              3. Doeleinden en wettelijke grondslagen
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Wij verwerken uw gegevens alleen voor de hieronder beschreven doeleinden en op basis van een geldige wettelijke grondslag.
            </p>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full text-sm border-collapse min-w-[560px]">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-2.5 pr-3 font-semibold text-foreground">Doel</th>
                    <th className="text-left py-2.5 pr-3 font-semibold text-foreground">Gegevens</th>
                    <th className="text-left py-2.5 pr-3 font-semibold text-foreground">Grondslag</th>
                    <th className="text-left py-2.5 font-semibold text-foreground">Voorbeeld</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {[
                    [
                      "Offerteaanvraag en contact afhandelen",
                      "Contactgegevens + bericht",
                      "Uitvoering van (pre)contractuele stappen",
                      "Offerte opstellen / terugbellen",
                    ],
                    [
                      "Uitvoering van werkzaamheden en administratie",
                      "Klant- en factuurgegevens",
                      "Wettelijke verplichting / overeenkomst",
                      "Facturatie",
                    ],
                    [
                      "Website verbeteren (analytics)",
                      "Gebruiksgegevens",
                      "Toestemming (cookies)",
                      "Statistieken",
                    ],
                    [
                      "Marketing / remarketing (Google Ads)",
                      "Cookie- en advertentiegegevens",
                      "Toestemming (marketingcookies)",
                      "Conversiemeting / remarketing",
                    ],
                    [
                      "Beveiliging & misbruikpreventie",
                      "Technische logs",
                      "Gerechtvaardigd belang",
                      "Beveiliging website",
                    ],
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border">
                      {row.map((cell, j) => (
                        <td key={j} className="py-2.5 pr-3 align-top leading-relaxed">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4 */}
          <section aria-labelledby="cookiebeleid" className="mb-10">
            <h2 id="cookiebeleid" className="text-xl font-bold text-foreground mb-4">
              4. Cookiebeleid
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Cookies zijn kleine tekstbestanden die op uw apparaat worden opgeslagen wanneer u onze website bezoekt. Analytische en marketingcookies worden alleen geplaatst als u hiervoor toestemming geeft via de cookiebanner (conform uw cookiekeuze). U kunt uw toestemming op elk moment wijzigen of intrekken via de cookiebanner (en/of de cookie-instellingen, indien beschikbaar).
            </p>

            <div className="overflow-x-auto -mx-4 sm:mx-0 mb-6">
              <table className="w-full text-sm border-collapse min-w-[400px]">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-2.5 pr-4 font-semibold text-foreground">Categorie</th>
                    <th className="text-left py-2.5 font-semibold text-foreground">Toestemming vereist?</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {[
                    ["Functioneel (noodzakelijk)", "Nee — werkt zonder toestemming"],
                    ["Analytisch", "Ja — alleen na toestemming"],
                    ["Marketing", "Ja — alleen na toestemming"],
                  ].map(([cat, consent]) => (
                    <tr key={cat} className="border-b border-border">
                      <td className="py-2.5 pr-4 font-medium text-foreground">{cat}</td>
                      <td className="py-2.5">{consent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-base font-semibold text-foreground mb-2">Google Analytics</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              We gebruiken Google Analytics om inzicht te krijgen in het gebruik van de website. Deze metingen worden alleen geplaatst en uitgevoerd als u hiervoor toestemming geeft via de cookiebanner.
            </p>

            <h3 className="text-base font-semibold text-foreground mb-2">Google Ads</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              We gebruiken Google Ads om de effectiviteit van campagnes te meten en, indien u toestemming geeft, relevantere advertenties te tonen. Hiervoor kunnen marketingcookies of vergelijkbare technologie worden gebruikt.
            </p>

            <h3 className="text-base font-semibold text-foreground mb-2">Cookievoorkeuren aanpassen</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              U kunt uw voorkeuren op elk moment wijzigen via de cookiebanner en/of de cookie-instellingen (indien beschikbaar).
            </p>
          </section>

          {/* Section 5 */}
          <section aria-labelledby="derden" className="mb-10">
            <h2 id="derden" className="text-xl font-bold text-foreground mb-4">
              5. Delen van gegevens met derden
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Wij delen uw gegevens alleen met derden voor zover dat noodzakelijk is voor de in dit beleid beschreven doeleinden:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground leading-relaxed mb-4 space-y-1 pl-1">
              <li>IT/hostingdienstverleners (websitebeheer en hosting)</li>
              <li>Meet- en advertentiepartners (Google), wanneer u hiervoor toestemming geeft</li>
            </ul>

            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full text-sm border-collapse min-w-[400px]">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-2.5 pr-4 font-semibold text-foreground">Partij</th>
                    <th className="text-left py-2.5 pr-4 font-semibold text-foreground">Doeleinde</th>
                    <th className="text-left py-2.5 font-semibold text-foreground">Gegevens</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {[
                    ["Google (Analytics / Ads)", "Meten / advertenties", "Cookie- en gebruiksgegevens"],
                    ["Hostingprovider", "Hosting / techniek", "Technische logs"],
                  ].map(([partij, doel, data]) => (
                    <tr key={partij} className="border-b border-border">
                      <td className="py-2.5 pr-4 font-medium text-foreground">{partij}</td>
                      <td className="py-2.5 pr-4">{doel}</td>
                      <td className="py-2.5">{data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 6 */}
          <section aria-labelledby="doorgifte" className="mb-10">
            <h2 id="doorgifte" className="text-xl font-bold text-foreground mb-4">
              6. Doorgifte buiten de EER
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sommige dienstverleners kunnen gegevens buiten de Europese Economische Ruimte (EER) verwerken. In dat geval zorgen wij voor passende waarborgen, zoals contractuele afspraken en/of andere wettelijk erkende mechanismen, om een adequaat beschermingsniveau te garanderen.
            </p>
          </section>

          {/* Section 7 */}
          <section aria-labelledby="bewaartermijnen" className="mb-10">
            <h2 id="bewaartermijnen" className="text-xl font-bold text-foreground mb-4">
              7. Hoe lang bewaren wij gegevens?
            </h2>
            <ul className="list-disc list-inside text-sm text-muted-foreground leading-relaxed space-y-2 pl-1 mb-4">
              <li>
                <span className="font-medium text-foreground">Offerte- en contactaanvragen:</span> niet langer dan nodig; doorgaans tot maximaal 24 maanden na het laatste contact, tenzij er een overeenkomst ontstaat.
              </li>
              <li>
                <span className="font-medium text-foreground">Klant- en factuurgegevens:</span> conform de wettelijke (fiscale) bewaarplicht, doorgaans 7 jaar (voor sommige gegevens 10 jaar).
              </li>
              <li>
                <span className="font-medium text-foreground">Cookiegegevens:</span> afhankelijk van de cookiecategorie en uw toestemming; zie de cookie-instellingen voor meer informatie.
              </li>
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Gegevens die niet langer noodzakelijk zijn, worden verwijderd of geanonimiseerd.
            </p>
          </section>

          {/* Section 8 */}
          <section aria-labelledby="rechten" className="mb-10">
            <h2 id="rechten" className="text-xl font-bold text-foreground mb-4">
              8. Uw rechten
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Op grond van de Algemene Verordening Gegevensbescherming (AVG) heeft u de volgende rechten:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground leading-relaxed space-y-1 pl-1 mb-4">
              <li>Recht op inzage in uw persoonsgegevens</li>
              <li>Recht op rectificatie (correctie van onjuiste gegevens)</li>
              <li>Recht op verwijdering (&apos;recht om vergeten te worden&apos;)</li>
              <li>Recht op beperking van de verwerking</li>
              <li>Recht op bezwaar tegen de verwerking</li>
              <li>Recht op gegevensoverdraagbaarheid (waar van toepassing)</li>
              <li>Recht om toestemming in te trekken (voor cookies en marketing)</li>
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Wij behandelen uw verzoek binnen een redelijke termijn. U kunt uw verzoek indienen via{" "}
              <a href="mailto:info@bm-klus-bv.nl" className="text-primary underline underline-offset-2 hover:opacity-80 transition-opacity">
                info@bm-klus-bv.nl
              </a>.
            </p>
          </section>

          {/* Section 9 */}
          <section aria-labelledby="klacht" className="mb-10">
            <h2 id="klacht" className="text-xl font-bold text-foreground mb-4">
              9. Klacht indienen
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Als u van mening bent dat wij niet zorgvuldig met uw persoonsgegevens omgaan, heeft u het recht een klacht in te dienen bij de{" "}
              <a
                href="https://www.autoriteitpersoonsgegevens.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                Autoriteit Persoonsgegevens
              </a>.
            </p>
          </section>

          {/* Section 10 */}
          <section aria-labelledby="beveiliging" className="mb-10">
            <h2 id="beveiliging" className="text-xl font-bold text-foreground mb-4">
              10. Beveiliging
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te beschermen tegen ongeautoriseerde toegang, verlies of misbruik. Dit omvat onder meer toegangsbeperking, regelmatige updates en monitoring van onze systemen.
            </p>
          </section>

          {/* Section 11 */}
          <section aria-labelledby="wijzigingen" className="mb-10">
            <h2 id="wijzigingen" className="text-xl font-bold text-foreground mb-4">
              11. Wijzigingen
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Wij kunnen dit privacy- en cookiebeleid van tijd tot tijd aanpassen, bijvoorbeeld bij wijzigingen in de wet of in onze dienstverlening. De meest recente versie staat altijd op deze pagina. Wij raden u aan deze pagina periodiek te raadplegen.
            </p>
          </section>

          <div className="h-px w-full bg-border mb-8" />

          {/* Contact footer block */}
          <div className="rounded-lg border border-border bg-secondary/40 p-6">
            <p className="text-sm font-semibold text-foreground mb-1">Vragen over dit beleid?</p>
            <p className="text-sm text-muted-foreground">
              Neem contact op via{" "}
              <a href="mailto:info@bm-klus-bv.nl" className="text-primary underline underline-offset-2 hover:opacity-80 transition-opacity">
                info@bm-klus-bv.nl
              </a>{" "}
              of bel{" "}
              <a href="tel:+31612079808" className="text-primary underline underline-offset-2 hover:opacity-80 transition-opacity">
                +31 6 1207 9808
              </a>.
            </p>
          </div>

        </div>
      </main>
    </>
  )
}

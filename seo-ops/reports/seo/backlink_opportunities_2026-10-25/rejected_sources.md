# Исключённые источники — 2026-10-25

К отчёту `backlink_strategy.md`. Здесь — что из ссылочных профилей 30 конкурентов и из проверенных площадок не берём и почему.

**Данные.** DataForSEO Backlinks `backlinks/live`, режим `one_per_domain` (одна ссылка с каждого домена), только живые ссылки, снято 2026-10-25. 4 596 ссылок с 2 767 доменов. Живая проверка страниц — 2026-10-25. Число доменов в группах ниже — оценка эвристикой по домену, заголовку и URL страницы; группы частично пересекаются.

## 1. Сети продажи ссылок и SEO-мусор — не трогать никогда

| Группа | Сколько | Признаки | Примеры |
|---|---:|---|---|
| Страницы PBN «Boost your Google rankings with Premium PBN & Link Building» | ~35 доменов; ссылаются на 16 из 30 конкурентов | одинаковые URL `/all/714/2.html`, ~3 000 внешних ссылок на странице, spam score 60–75 | theforbestimes.com, thcradar.com, betulcrime.com, bestnz-poker-casinoslot.com |
| Страницы «Directory website list 2338 – Keyword Power 32» и «Directory Pages Index» | ~45 доменов | 5 000 внешних ссылок на странице, spam 30–80 | webranksdirectory.com, linkpointdirectory.com, ultimate-seo-packet.com |
| Магазины ссылок («Tiered Link Building», «Guest Post Service», «Niche Edit Links») | ~60 доменов, вместе с первой группой | рекламные заголовки, казино-домены | bomcaminho.com, top5casino.online, sisusan88ax.shop |
| Сокращатели и страницы «Domain Report», «URL Shared», «Website Stats» | ~10 доменов; ссылаются на 19 конкурентов | nofollow, ~3 500 внешних ссылок | drjack.world, shortenurls.eu, jake.eu, quero.party |
| Страницы-«startpagina» («links over…», «alles over…», «hier lees je alles over…») | ~110 доменов | 80–160 внешних ссылок на странице, spam 20–60, поддомены по темам | startkabel.nl, uwpagina.nl, linkspot.nl, start.be, tipjes.nl, onderde.nl, bootjevanpapier.nl |

**Почему.** Это классический link spam. Документация Google: при link spam «any ranking benefit the links may have previously generated for your site is lost» (developers.google.com/search/updates/spam-updates). У нас такие ссылки дали бы только риск.

## 2. Сети платных статей

| Группа | Сколько | Признаки | Примеры |
|---|---:|---|---|
| Статьи в лайфстайл-блогах с коммерческими анкорами («vloerisolatie», «dakisolatie», «isoleren subsidie», «stukadoor Den Haag») | ~770 доменов (эвристика: анкор не бренд и не URL) | в основном ссылки на крупные компании изоляции; темы блогов не связаны со строительством | wonen.nl, 123wonen.nl, groenezaken.com, huislijn.nl, bouwnu.nl |
| Сеть с общими конкурентами (отмечена ещё 24.10) | 6 доменов | ссылаются на одних и тех же: isolatiespecialist, pluimers, stucadoorsbedrijfdevries, lindhout | 3egolf.nl, passion4web.nl, thealternative.nl, uwbeste.nl, vsenv.nl, grotemarktberaad.nl |
| Сгенерированные статьи с URL вида `/blog/post/<номер>/…` и «энциклопедии» | 4 домена; у demargaretha.nl — 18 конкурентов | однотипные статьи под каждого клиента; у purperinterior.nl ETV 0 | demargaretha.nl, purperinterior.nl, bouwencyclopedie.nl, ikbenbint.nl |
| Платные «местные новости» (partnercontent, partnerbijdrage, regio-extra) | ~40 доменов | рекламные статьи без `rel="sponsored"` на сайтах местных газет | amsterdamsdagblad.nl, destadamersfoort.nl, rtvridderkerk.nl, dordtcentraal.nl, maassluis.nu |

**Поправка к прошлым отчётам.** В `link_prospects_latest.md` (01.10) в tier A стояли demargaretha.nl (№1), bouwencyclopedie.nl (№4), ikbenbint.nl (№12), wonen.nl (№18) и purperinterior.nl (№21). По ссылкам на уровне страниц все пять — статьи с коммерческими анкорами в сетях. Высокий rank домена здесь ничего не значит.

**Почему.** Покупка статей со ссылкой без `rel="sponsored"` нарушает правила Google о ссылках. Размещать платный текст ради анкора владелец не планирует, это противоречит и задаче.

## 3. Обмен ссылками

~520 страниц вида `/partners`, `/links`, `/linkpartners`, `/vrienden`, `/interessante-links`, `/sponsors` на сайтах мебели, стоматологов, кейтеринга и т. п.: madebybert.nl/webpartners, deurbelsets.com/linkpartners, floor-you.nl/linkpartners, tegelhoek.nl/partners. Тематики нет, ссылки взаимные или купленные. Сюда же собственная страница `stukadoorsbedrijfhoffman.nl/links/`.

## 4. Автоматические каталоги и агрегаторы данных

Записи появляются сами, из KvK или Google. Регистрироваться не нужно, пользы почти нет, ссылки чаще nofollow.

| Группа | Ссылка | Примеры |
|---|---|---|
| Сеть `/bedrijven/<профессия>/<город>/<компания>/` (появилась в мае 2026) | nofollow | bouwwerkzaam.online (16 конкурентов), huistuinkeuken.online (14), bootjevanpapier.nl (11), klussen2026.website (10), dv-mobydick.nl (7), offerteknaller.nl (4; отдаёт 403) |
| Сеть «kosten…» `/zuid-holland/<город>/<компания>/` | nofollow (проверено) | prijzenstucadoor.nl (13), kostenstucwerk.nl, stucadoor-nu.nl, eenstukadoor.nl, kostenschilderbedrijf.nl, schildersregister.nl, kostenschoonmaakbedrijf.nl, kostendakdekker.nl |
| Агрегаторы компаний и техданных | nofollow или без пользы | yoys.nl, reshark.io, revenuebase.ai, fastbase.com, 2miljoen.nl, datocapital.nl, vainu.com, contactklantenservice.nl, technofizi.net, themetix.com, comparable-companies.com, bunity.com, storeboard.com, yellowpages.net, acompio.nl |
| Справочники без ссылки или с nofollow | — | bedrijvenwegwijzer.nl и bedrijven-index.nl (ссылка — текст без анкора и nofollow), bedrijvenopdekaart.nl (spam 40, профилей нет), openingstijden.nl (nofollow sponsored), stukadoorgids.nl и isolatie.website (на сайт ссылки нет, есть только nofollow на KvK), stucadoor.net, stukadoors.net, bylder.com (nofollow) |

Часть этих каталогов стоит в выдаче (stukadoorgids.nl — 10 результатов в 7 из 49 рабочих выдач). Это не повод регистрироваться: карточка, скорее всего, появится сама из KvK, ссылки нет.

## 5. Проверенные и исключённые площадки

| Площадка | Почему исключена | Проверка |
|---|---|---|
| Stichting Gevelgarantie | Участвуют только компании с KOMO-процесс-сертификатом gevelisolatie и системами с KOMO-attest. На странице участников обычные ссылки (lindhout), но у нас нет сертификата | страница участников, 2026-10-25 |
| BouwLeadz | Бесплатный профиль без ссылки на сайт (2 профиля); 428 компаний; ETV 14, 2 ссылающихся домена, spam 32 [DataForSEO]; у профилей «Lid sinds sep. 2026», «0 klussen». Контакты заявок — за кредиты (данные ChatGPT; страница цен — 404) | 2026-10-25 |
| vakman-indebuurt.nl | Ссылка обычная, но spam score 51, rank 0, ETV 108 [DataForSEO]; пути регистрации нет (`/voor-bedrijven` — 404); профили, похоже, создаются автоматически | 2026-10-25 (и 24.10) |
| trustusfix.com | Профили собраны автоматически из данных Google («6 199 met publieke Google-reviews»); бизнес — заявки | 2026-10-25 |
| gevelkaart.nl | Ссылка nofollow (подтверждено); данные «uit openbare bronnen»; однотипная сеть каталогов агентства GambitGrid | 2026-10-25 (и 24.10) |
| klussercommunity.nl | В футере списки внешних ссылок, в т. ч. сервис накрутки лайков YouTube; регистрации компаний нет | 24.10 |
| klantkompas.com | Профили конкурентов отдают 404; каталог на 8,8 млн компаний | 2026-10-25 |
| Stucgilde (Neerlandsch Stucgilde) | Членство через аккредитационную комиссию, уклон в реставрацию; сейчас не про нас | 2026-10-25 |
| Insula, Airofill, Neopixels, PIF Insulation, Aminofoam, Total Wall, Termokomfort, Isovlas | Сертификаты и списки установщиков чужих продуктов (spouw, пол, засыпная изоляция) | 2026-10-25 |
| regio-business.nl, klimaatplein.nl/partners | Платные клубы и партнёрства ради нетворкинга | по данным DataForSEO |
| Энергетические лоукеты вне зоны (Drents Energieloket, Energieloket Hart van Brabant, Energie Oudewater, Woerden, Brummen) | Модель хорошая (обычная ссылка), но регион не наш | 2026-10-25 |
| Энергетические лоукеты Утрехта, Амстелвена, Амстердама (страницы «doe-het-zelf kadokaart») | Ссылка на интернет-магазин изоляции для самостоятельной работы, не на исполнителей | по данным DataForSEO |
| Milieu Centraal / verbeterjehuis.nl | Своего каталога компаний нет: отсылает к Centraal Register Techniek (признанные технические компании) и к лоукетам гемент | 2026-10-25 |
| De10beste, isolatieselect.nl, stukadoorkaart.nl, klussendirect.nl, vakmangids.com | Каталоги и лидогены из выдачи без подтверждённой пользы; isolatieselect — 404 на примере | 2026-10-25 |

## 6. Не исключены, но вынесены из SEO

Werkspot, Trustoo, Homedeal, Solvari, Zoofy, Slimster, Casius — платные заявки, а не ссылки. Разбор — в `backlink_strategy.md`, раздел 7, и в `opportunities.csv` (группа L). NOA — деловое решение владельца, не SEO (`opportunities.csv`, C10).

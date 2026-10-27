# Паспорт компании для внешних площадок — BM klus BV

Единственный источник данных о компании для регистраций, профилей и писем площадкам (skill `platform-signup`). Сверено с сайтом и `seo-ops/knowledge.md` 2026-10-25.

- Чего здесь нет — не выдумывать: спросить владельца и вписать ответ сюда.
- Репозиторий публичный (GitHub). Сюда — только то, что можно показать всем. Пароли, IBAN, BSN, копии документов, личные телефоны и адреса — никогда.
- Изменился факт — исправить здесь; на сайте — отдельной задачей.
- `[ВОПРОС ВЛАДЕЛЬЦУ]` — данных нет: поле на площадке оставить пустым или спросить.

## 1. Реквизиты и контакты

| Поле на площадках | Значение | Публиковать | Откуда |
|---|---|---|---|
| Bedrijfsnaam, handelsnaam | BM klus BV — так же, как на сайте и в GBP | да | сайт |
| Rechtsvorm | Besloten vennootschap (BV) | да | — |
| KvK-nummer | 77356039 | да | футер сайта |
| Inschrijving KvK, opgericht | 17-02-2020 | да («sinds 2020») | skill `gbp-weekly-post` |
| Vestigingsadres | Bonaventurastraat 58B, 3081 HE Rotterdam | **нет**. Только в обязательное поле, которое площадка не показывает. Публично — только «Rotterdam». Поле обязательное и публичное → стоп, решает владелец | `/contact/`, `lib/seo/schema.ts`; правило — `seo-ops/knowledge.md` |
| Plaats, provincie | Rotterdam, Zuid-Holland | да | — |
| Website | https://bm-klus-bv.nl/ | да; какую ссылку ставить — раздел 5 | — |
| E-mail | info@bm-klus-bv.nl | да | футер |
| Telefoon, WhatsApp | +31 6 12079808 (форматы: +31612079808, 06 12079808) | да, номер открыт на сайте | футер, `/contact/` |
| Voorkeur contact | WhatsApp и e-mail. Звонки владелец не обслуживает (языковой барьер): где можно выбрать — WhatsApp или e-mail основным каналом. С площадками — лучше e-mail; созвоны и «kennismakingsgesprek» предлагать заменить перепиской. На объекты выезжает нидерландоязычный сотрудник — можно писать «Bij klanten op locatie komen wij met een Nederlandstalige medewerker» | — | `CLAUDE.md`; владелец, 2026-10-27 |
| Contactpersoon | Boris Mitov (voornaam Boris, achternaam Mitov), directeur | да — уже открыто как директор в KvK-каталогах | владелец, 2026-10-25 |
| Aantal medewerkers | [ВОПРОС ВЛАДЕЛЬЦУ]: владелец не уверен; в открытых каталогах цифры нет (companyinfo.nl — только платно), 2026-10-25 | — | — |
| Talen | [ВОПРОС ВЛАДЕЛЬЦУ] | — | — |
| Algemene voorwaarden | Нет ни документа, ни страницы на сайте (владелец, 2026-10-25). Ссылку на privacybeleid вместо них не ставить | — | — |
| Type klanten | Particulieren, VvE's и zakelijk — работаем со всеми; на практике заказывают частные владельцы (владелец, 2026-10-25) | да | — |
| Certificaat Natuurvriendelijk Isoleren | нет | — | владелец, 2026-10-25 |
| Openingstijden | ma–za 09:00–18:00, zo gesloten | да | `components/contact/ContactOpeningHours.tsx`, schema |
| BTW-nummer, IBAN | не хранить; если площадка требует — вводит владелец | — | — |
| Логин на площадках | [ВОПРОС ВЛАДЕЛЬЦУ]: info@bm-klus-bv.nl? Пароли — только в менеджере паролей владельца | — | — |

## 2. Зона работы (werkgebied)

- Стандартная формулировка: «Regio Rotterdam en omgeving (±80–100 km)» (`/over-ons/`, `.claude/rules/content-nl.md`). Площадка просит одно число — 100 (владелец, 2026-10-25).
- Города со своей страницей `/gevelisolatie/<slug>/` (21, `lib/content/gevelisolatie-locations.ts`): Rotterdam, Den Haag, Delft, Dordrecht, Schiedam, Vlaardingen, Leiden, Gouda, Zoetermeer, Capelle aan den IJssel, Spijkenisse, Barendrecht, Ridderkerk, Alphen aan den Rijn, Maassluis, Hellevoetsluis, Breda, Bergen op Zoom, Roosendaal, Leidschendam-Voorburg, Hendrik-Ido-Ambacht.
- В GBP зона обслуживания — 20 городов [GBP API, 2026-10-24].
- Провинции: Zuid-Holland — основная; Noord-Brabant — страницы Breda, Bergen op Zoom, Roosendaal и проекты в Etten-Leur, Halsteren, Vught. Zeeland (Bruinisse) и Flevoland (Almere) — по одному проекту; отмечать только по решению владельца.

## 3. Услуги

| Услуга | Страница | Категории на площадках |
|---|---|---|
| Buitengevelisolatie (ETICS) с отделкой | `/gevelisolatie/` | Gevelisolatie, Buitengevelisolatie, Muurisolatie (только снаружи), Isolatiebedrijf, Aannemer voor isolatie |
| Buiten stucwerk (cementpleister, betonstuc) | `/buiten-stucwerk/` | Stukadoor, Gevelrenovatie |
| Sierpleister (spachtelputz, crepi) | `/sierpleister/` | Stukadoor, Sierpleister |
| Gevel schilderen, keimen | `/gevel-schilderen/`, `/gevel-schilderen/keimen/` | Schilder, Gevelschilder |
| Muren stucen binnen (sausklaar, behangklaar) | `/muren-stucen/` | Stukadoor |

- Категория «Aannemer» или «Aannemerij» — если узких категорий нет.
- Только по решению владельца: «Schoonmaak na verbouwing» (на сайте есть страница `/schoonmaak-na-verbouwing/`), dakrenovatie (один проект — Etten-Leur Bankenstraat 2026).
- Не отмечать — этих услуг на сайте нет: spouwmuurisolatie, binnenmuurisolatie и voorzetwanden, dak- en vloerisolatie, glas (HR++), warmtepomp, zonnepanelen, ventilatie, loodgieter, elektra.

Коротко об услугах (NL):

| Услуга | Текст | По-русски |
|---|---|---|
| ETICS | Isolatieplaten van EPS, PIR of minerale wol op de buitenkant van de gevel, met een wapeningslaag en een afwerking naar keuze: stucwerk, sierpleister, crepi of steenstrips. | Плиты EPS, PIR или минеральной ваты снаружи фасада, армирующий слой и отделка на выбор: штукатурка, декоративная штукатурка, крепи или клинкерная плитка. |
| Buiten stucwerk | Gevel stucen zonder isolatie, bijvoorbeeld met cementpleister of betonstuc. Wij controleren de ondergrond en herstellen die waar nodig. | Штукатурка фасада без утепления, например цементная или betonstuc. Проверяем основание и при необходимости ремонтируем. |
| Sierpleister | Sierpleister (spachtelputz) en crepi op de gevel, in de kleur en korrelgrootte van uw keuze. Bij twijfel over kleur of structuur maken wij eerst een proefvlak. | Декоративная штукатурка и крепи на фасаде, цвет и фракция на выбор. Если есть сомнения в цвете или фактуре — сначала пробный участок. |
| Gevel schilderen | Gevel schilderen met dampopen verf: silicaatverf (keimen) of siloxaanverf, gekozen na inspectie van de ondergrond. | Покраска фасада паропроницаемой краской: силикатной (keimen) или силоксановой, выбор после осмотра основания. |
| Binnen stucwerk | Binnenmuren en plafonds stucen, sausklaar of behangklaar. | Штукатурка стен и потолков внутри: под покраску или под обои. |

## 4. Что можно и чего нельзя утверждать

**Можно** (подтверждено):
- «VCA* gecertificeerd» — владелец, 2026-09-30.
- «Ingeschreven bij de KvK (77356039)», «sinds 2020».
- «Gratis opname op locatie», «vrijblijvende offerte» — главная, werkwijze на `/gevelisolatie/`.
- «Proefvlak op verzoek», «proefvlak mogelijk» — владелец, 2026-10-16.
- «Regio Rotterdam en omgeving (±80–100 km)».
- «Eén aanspreekpunt, via WhatsApp of e-mail» — `/over-ons/`.
- Выполненные проекты с фото до и после — `/onze-werken/`.
- Strikolith — только «toegepast bij projecten» (проект Etten-Leur 6 cm 2025). Не «partner», «dealer» или «gecertificeerd verwerker».
- Отзывы Google — ссылкой на профиль (раздел 8). Рейтинг и число отзывов по памяти не писать; если площадка спрашивает — взять из `public/data/google-place.json` (обновляется ежедневно) в момент заполнения.

**Нельзя:**
- Цены в любом виде: суммы, «vanaf», за m², «richtprijs», почасовая ставка. Поле цены — пусто или «prijs na opname».
- Гарантии, «vaste prijs», сроки (ответа, offerte, работ), сроки службы, число проектов («1200+ gevels»), «2–4× woningwaarde», «25 jr» — сняты с сайта 2026-09-30.
- «Geen onderaannemers», «eigen team», «eigen vakmensen» — не подтверждено ([ВОПРОС ВЛАДЕЛЬЦУ]).
- Страховки (aansprakelijkheid, CAR) — [ВОПРОС ВЛАДЕЛЬЦУ], до ответа не заявлять.
- Сертификаты и членства, которых нет: KOMO, Stichting Gevelgarantie, NOA, Bouwend Nederland, «erkend» и т. п.
- Экономия энергии — только «kan leiden tot», без цифр; суммы субсидий — нет.
- «Beste», «goedkoopste», «nummer 1» и другие превосходные степени.

## 5. Ссылки на сайт

- По умолчанию — главная `https://bm-klus-bv.nl/`. Анкор не просим.
- До 2026-12-19 — ни одной внешней ссылки на страницы эксперимента индексации и его пассивной группы. Список брать из `seo-ops/knowledge.md`, раздел «Эксперимент индексации — правила до 2026-12-19», не по памяти. На 2026-10-27 это 21 страница: 15 URL журнала `seo-ops/data/indexation_experiment_log.csv` (города Breda, Zoetermeer, Barendrecht, Gouda, Bergen op Zoom, Alphen aan den Rijn, `/gevelisolatie/materialen/` и 8 проектов), города Capelle aan den IJssel, Hellevoetsluis, Leidschendam-Voorburg, Maassluis, Ridderkerk и `/gevelisolatie/rc-waarde-dikte/`.
- Есть отдельное поле для услуги или проекта — страница услуги (таблица ниже) или проект вне тестов.
- **UTM — только если ссылка на карточках площадки с `rel="noreferrer"`.** Тогда браузер не сообщает, откуда пришёл посетитель, и в GA4 и логе заявок переход выглядит прямым. Так у Regionaal Energieloket (`noopener noreferrer`, проверено 2026-10-25). Формат: `https://bm-klus-bv.nl/?utm_source=<площадка>&utm_medium=referral&utm_campaign=vermelding`, где `<площадка>` — латиницей, строчными, без точек (`regionaalenergieloket`). Главная с параметрами отдаёт canonical на `https://bm-klus-bv.nl/` (проверено 2026-10-25). В остальных случаях — ссылка без параметров.

| Тема | Страница | Внешнюю ссылку сейчас |
|---|---|---|
| Компания целиком | `/` | да |
| Buitengevelisolatie (ETICS) | `/gevelisolatie/` | да |
| От чего зависит цена | `/gevelisolatie/kosten/` | да |
| Отделки поверх ETICS | `/gevelisolatie/afwerkingen/` | да |
| Rc-waarde и толщина | `/gevelisolatie/rc-waarde-dikte/` | **нет до 2026-12-19** |
| Материалы (EPS, PIR, минвата) | `/gevelisolatie/materialen/` | **нет до 2026-12-19** |
| Субсидия и разрешение | `/gevelisolatie/subsidie-vergunning/` | да |
| Город | `/gevelisolatie/<slug>/` | да, кроме 11 городов эксперимента и пассивной группы до 2026-12-19 |
| Buiten stucwerk | `/buiten-stucwerk/` | да |
| Sierpleister | `/sierpleister/` | да |
| Gevel schilderen | `/gevel-schilderen/` | да |
| Keimen | `/gevel-schilderen/keimen/` | да |
| Muren stucen (binnen) | `/muren-stucen/` | да |
| Sausklaar или behangklaar | `/muren-stucen/sausklaar-behangklaar/` | да |
| Все проекты | `/onze-werken/` | да |
| Проекты gevelisolatie | `/onze-werken/gevelisolatie/` | да |
| О компании | `/over-ons/` | да |
| Контакт и заявка | `/contact/` | да |

Проекты для референций (вне тестов, ETICS, свежие): `/onze-werken/strijen-schenkeldijk-gevelisolatie-sierpleister-2026/`, `/onze-werken/etten-leur-gevelisolatie-10cm-ral9010-2025/`, `/onze-werken/nieuw-beijerland-gevelisolatie-12cm-sierpleister-2025/`, `/onze-werken/dordrecht-gevelisolatie-10cm-sierpleister-2025/`. Полный список — `lib/content/projects/` минус URL из журнала тестов.

## 6. Готовые тексты (NL)

Подгонять под лимит поля — только сокращая. Смысл не менять, новых фактов не добавлять. В скобках — число знаков с пробелами.

**T1 — подзаголовок (73):**
> Buitengevelisolatie (ETICS), stucwerk en sierpleister in regio Rotterdam.

*По-русски:* Наружное утепление фасадов (ETICS), штукатурка и декоративная штукатурка в регионе Роттердам.

**T2 — короткое описание (121; как в описании компании на сайте):**
> Specialist in buitengevelisolatie (ETICS), stucwerk, sierpleister en gevel schilderen in regio Rotterdam en Zuid-Holland.

*По-русски:* Специалист по наружному утеплению фасадов (ETICS), штукатурке, декоративной штукатурке и покраске фасадов в регионе Роттердам и Южной Голландии.

**T3 — среднее (326):**
> BM klus BV is een gevelbedrijf uit Rotterdam. Wij brengen buitengevelisolatie (ETICS) aan met een afwerking in sierpleister of stucwerk, en verzorgen buiten stucwerk, sierpleister en het schilderen of keimen van gevels. Wij werken in de regio Rotterdam en omgeving (±80–100 km). De opname op locatie is gratis en vrijblijvend.

*По-русски:* BM klus BV — фасадная компания из Роттердама. Делаем наружное утепление (ETICS) с отделкой декоративной или обычной штукатуркой, а также наружную штукатурку, декоративную штукатурку, покраску и keimen фасадов. Работаем в Роттердаме и окрестностях (±80–100 км). Осмотр на месте — бесплатный и ни к чему не обязывает.

**T4 — длинное (521; то же, что в черновике для Regionaal Energieloket):**
> BM klus BV is een gevelbedrijf uit Rotterdam. Wij brengen buitengevelisolatie (ETICS) aan met een afwerking in sierpleister of stucwerk. Daarnaast verzorgen wij buiten stucwerk, sierpleister en het schilderen of keimen van gevels. Wij werken bij u op locatie in Rotterdam en de regio, tot ongeveer 80–100 km. Op onze website staan uitgevoerde projecten met foto's van voor en na. Wij zijn VCA* gecertificeerd en maken op verzoek een proefvlak. Contact gaat het snelst via WhatsApp of het offerteformulier op onze website.

*По-русски:* BM klus BV — фасадная компания из Роттердама. Делаем наружное утепление фасадов (ETICS) с отделкой декоративной или обычной штукатуркой. Также — наружная штукатурка, декоративная штукатурка, покраска и keimen фасадов. Работаем у заказчика в Роттердаме и регионе, примерно до 80–100 км. На сайте — выполненные проекты с фото до и после. Есть сертификат VCA*, по запросу делаем пробный участок. Быстрее всего связаться через WhatsApp или форму заявки на сайте.

**T5 — подробное (1005, с переносами строк; для больших полей «Over ons»):**
> BM klus BV is een gevelbedrijf uit Rotterdam. Wij brengen buitengevelisolatie (ETICS) aan met een afwerking in sierpleister, stucwerk, crepi of steenstrips. Daarnaast verzorgen wij buiten stucwerk, sierpleister en het schilderen of keimen van gevels. Ook voor stucwerk binnen, sausklaar of behangklaar, kunt u bij ons terecht.
>
> Wij werken in de regio Rotterdam en omgeving, tot ongeveer 80–100 km. Wij komen langs voor een gratis en vrijblijvende opname: wij beoordelen en meten de gevel en bespreken uw wensen. Daarna adviseren wij over isolatiedikte, materiaal en afwerking en ontvangt u een offerte. Na akkoord plannen wij het werk in overleg.
>
> Wij zijn VCA* gecertificeerd en ingeschreven bij de KvK (77356039). Op verzoek maken wij een proefvlak, zodat u kleur en structuur vooraf ziet. Op onze website staan uitgevoerde projecten met foto's van voor en na. Wij communiceren bij voorkeur schriftelijk: stuur via WhatsApp of het formulier op onze website uw woonplaats en een paar foto's van de gevel.

*По-русски:* BM klus BV — фасадная компания из Роттердама. Делаем наружное утепление (ETICS) с отделкой декоративной штукатуркой, обычной штукатуркой, крепи или клинкерной плиткой. Также — наружная штукатурка, декоративная штукатурка, покраска и keimen фасадов, а внутри — штукатурка под покраску или под обои. Работаем в Роттердаме и окрестностях, примерно до 80–100 км. Приезжаем на бесплатный осмотр без обязательств: оцениваем и измеряем фасад, обсуждаем пожелания. Потом советуем толщину утеплителя, материал и отделку, присылаем смету. После согласия планируем работы вместе с заказчиком. Есть сертификат VCA*, компания зарегистрирована в KvK (77356039). По запросу делаем пробный участок, чтобы цвет и фактура были видны заранее. На сайте — проекты с фото до и после. Предпочитаем письменное общение: пришлите через WhatsApp или форму на сайте свой город и несколько фото фасада.

**Фраза о контакте (77):**
> Contact gaat het snelst via WhatsApp of het offerteformulier op onze website.

*По-русски:* Быстрее всего связаться через WhatsApp или форму заявки на сайте.

## 7. Логотип и фото

- Логотип: `public/images/logo-bm-klus.png` — 384×64, широкий. Квадратного нет; `public/apple-icon.png` (180×180) — значок сайта. Нужен квадрат или крупнее — сделать копию во временной папке сеанса (sharp: логотип по центру на белом поле) и показать владельцу до загрузки.
- Фото — только реальные снимки наших объектов, лучше «na»-кадры со страниц `/onze-werken/`. Веб-версии — `public/images/projects/<slug>-na-NN.w1920.webp`. Многие площадки не принимают WebP — сделать копию в JPG во временной папке сеанса. Оригиналы в `source-images/` не трогать: это единственная копия.
- Без стоковых и сгенерированных картинок. Предпочтительно кадры без людей, читаемых номеров машин и номеров домов.
- Через браузер за одну загрузку — до 10 MB.

## 8. Профили компании в сети

- Google: https://maps.google.com/?cid=7611806846094172280 (отзывы).
- Из `sameAs` в `lib/seo/schema.ts`: Instagram https://www.instagram.com/bm_klus_bv, Facebook https://www.facebook.com/profile.php?id=61556805434705, Pinterest https://nl.pinterest.com/bmklusbv/, YouTube https://www.youtube.com/@bm-klus-bv.
- LinkedIn https://www.linkedin.com/in/boris-mitov-a436902b9 — личный профиль (адрес вида `/in/`); указывать только с согласия владельца.
- Где ещё есть профили — `seo-ops/data/external_profiles.csv`.

## 9. Открытые вопросы владельцу

1. ~~Контактное лицо~~ — Boris Mitov (2026-10-25).
2. Сколько человек в команде (aantal medewerkers)? Владелец не уверен (2026-10-25).
3. Есть ли страховка ответственности (aansprakelijkheidsverzekering, CAR)?
4. Работаете ли с субподрядчиками? От ответа зависит, можно ли писать «eigen team».
5. Какими марками материалов работаете, кроме Strikolith?
6. На каких языках можете говорить с клиентами (поле «talen»)?
7. На какую почту регистрироваться и кто её читает?
8. Где компания уже зарегистрирована (Werkspot, Trustoo, Gouden Gids и т. п.)?

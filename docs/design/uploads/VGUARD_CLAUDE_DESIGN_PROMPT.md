Ти дизайнер інтерфейсу. Намалюй макети сайту V Guard Studio: автостудія у Vroomshoop (Нідерланди), послуги PPF, тонування вікон (ramen blinderen) і car wrapping. Задача сайту одна: людина з Google Maps або TikTok на телефоні за 5 секунд розуміє послугу, місто, ціну і пише у WhatsApp або залишає заявку. Мова макетів NL. UA-версія в кінці, лише для фрейму 9.

## 0. ПЛЕЙСХОЛДЕРИ

Усе у форматі ⟦значення | підказка⟧ це дефолт, який клієнт потім замінить. У макеті показуй ЛИШЕ значення до «|». Підказку після «|» не малюй. Ніяких позначок «pending», ніяких сірих заглушок у тексті: макет має виглядати як готовий сайт.

## 1. ФРЕЙМИ

1. Home, 375, повна сторінка
2. Home, 1280, повна сторінка
3. PPF, 375 і 1280
4. Ramen blinderen, 375 і 1280
5. Car wrapping, 375 і 1280
6. Projecten, 375
7. Contact з формою, 375: кроки 1-4, помилка поля, екран успіху
8. Глобальні елементи: header 375 і 1280, відкрите мобільне меню, StickyMobileBar, footer
9. Home hero у UA, 375 (перевірка довжини)
10. 404, 375: H1 «Deze pagina bestaat niet (meer)» · кнопки «Naar home» · «Offerte aanvragen». Privacy окремого макета не потребує (звичайна текстова сторінка в стилі сайту).

## 2. ЖОРСТКІ ПРАВИЛА

- Mobile first. Перший екран на 375: H1, підзаголовок, 2 кнопки, смуга з 3 чипами, і видно нижню панель StickyMobileBar (WhatsApp · Bellen · Offerte). Не вміщується: зменшуй розміри, не прибирай елементи.
- Один H1 на сторінку. Тап-цілі від 44 px. Контраст WCAG AA, текст на фото завжди на затемненні.
- Без відео, без iframe, без вбудованої карти (лише кнопка «Route in Google Maps»), без embed соцмереж, без логотипів брендів плівок (бренди лише текстом).
- Лише завантажені фото V Guard. Дозволено кроп, світло, колір, розмиття номерів і облич, прибрати дрібні предмети. Не переносити авто в інше середовище, не генерувати фон, відображення, тонування чи плівку. Нема потрібного фото: сіра рамка з підписом, яке фото потрібне.
- Жодних тире em і en. Діапазони через дефіс. Ціни у форматі «vanaf €149», тисячі через крапку: €2.995.
- Таблиці цін на 375 скроляться вбік у власному контейнері, сторінка вбік не скролиться.

## 3. СТИЛЬ

Темна база: графіт і майже чорний. Світлі нейтральні поверхні для карток, таблиць і форми. Акцент золотий ⟦#C9A24B | фірмовий стиль ще не затверджений, замінимо⟧, лише для primary-кнопок, активних станів і тонких ліній. Один sans-шрифт, який можна self-host. Настрій: чисто, технічно, спокійно, як у боксі під hex LED. Окремим списком віддай токени: кольори, типографіка, відступи, радіуси, тіні.

## 4. ФОТО ПО БЛОКАХ

| Блок | Фото | Кроп |
|---|---|---|
| Hero Home | найкращий 3/4 кадр (BMW або синій SUV) | 375: 4:5; 1280: 16:9, авто 60-70% кадру, місце під текст |
| Hero послуг | реальний кадр цієї послуги, 3/4 | як вище |
| Before/After | синій Ford у профіль, «до» і «після» | 3:2, однаковий кроп |
| ProcessSteps, Studio | авто під hex LED у боксі | 16:9 |
| Картки, галерея | кропи реальних робіт: лобове, бічні, задні, дах, дзеркала, хром | 4:3 |

Біле Golf і старі outdoor-фото лише в галерею. Номери завжди розмиті.

## 5. ГЛОБАЛЬНІ ЕЛЕМЕНТИ

**Header 1280:** логотип · PPF · Ramen blinderen · Car wrapping · Projecten · Contact · NL / UA · кнопка «Offerte aanvragen».
**Header 375:** логотип · NL / UA · бургер. У меню ті самі пункти + кнопка «Offerte aanvragen».
**StickyMobileBar (375, завжди):** WhatsApp · Bellen · Offerte (три рівні кнопки).
**Footer:** V Guard Studio · Twentelaan 14 D, 7681 NE Vroomshoop · ⟦06 12 34 56 78 | телефон V Guard⟧ · ⟦ma-vr 9:00-18:00, za 10:00-16:00 | години V Guard⟧ · посилання на всі сторінки · TikTok · Instagram · Facebook (текстом або іконками-посиланнями) · Privacy · KvK ⟦12345678 | KvK V Guard⟧.

---

## 6. HOME (/)

**Hero**
- H1: PPF, ramen blinderen en car wrapping in Vroomshoop
- Sub: Bescherming en een nieuwe look voor je auto. Studio in Twente.
- Кнопки: Offerte aanvragen · WhatsApp ons
- Чипи: 3 jaar garantie · XPEL, BRAVIXX, LLumar · 5-staps voorbereiding

**Wat we doen** (3 картки, порядок саме такий, кожна з фото і кнопкою)
1. PPF lakbescherming · Transparante folie die je lak beschermt tegen steenslag en krassen. · vanaf ⟦€895 | Full Front, агресивний вхід; ринок ~€1.000-2.000⟧ · Meer over PPF
2. Ramen blinderen · Meer privacy en minder felle zon in je auto. · vanaf ⟦€129 | нижній поріг ринку NL; V Guard озвучував €200⟧ · Meer over ramen blinderen
3. Car wrapping · Nieuwe kleur of finish met folie, volledig of gedeeltelijk. · vanaf ⟦€69 | ковпаки дзеркал; повний wrap від €1.795⟧ · Meer over car wrapping

**Kwaliteit boven snelheid** (ключова схема, 5 кроків; 1280 горизонтально, 375 вертикально з номерами)
Zo werken we bij PPF en wraps.
1. Wassen · Grondige reiniging van de auto in meerdere fasen.
2. Kleibehandeling · Clay haalt vastzittend vuil uit de lak.
3. Ontvetten · Alcoholreiniging zodat de folie goed hecht.
4. Aanbrengen · De folie gaat op de schone, voorbereide lak.
5. Controle · Eindcontrole van randen en oppervlak voor oplevering.

**Recent werk** (6 фото, підпис ≤12 слів) · кнопка «Alle projecten»
Підписи: ⟦BMW X5 · ramen blinderen · LLumar 20% | реальні авто і плівки з проєктів⟧ і так далі для 6 фото.

**Waarom V Guard Studio** (4 пункти з іконками)
- 3 jaar garantie op ons werk
- Fabrieksgarantie op de folie, ⟦tot 10 jaar | PPF 5/7/10 залежно від бренду, тонування 5-7⟧
- ⟦Gecertificeerd voor PPF | після скану сертифіката Валери⟧
- Folies van XPEL, BRAVIXX en LLumar

**Wat klanten zeggen** (3 картки відгуків, без зірок-віджета)
⟦«Strak gewerkt, de ramen zien er top uit.» · Mark, Hardenberg | реальні відгуки Google після запуску профілю⟧
⟦«Full Front PPF op mijn Model 3, netjes afgewerkt.» · Sandra, Almelo | реальний відгук⟧
⟦«Snel geholpen en goed advies over wat mag.» · Dennis, Ommen | реальний відгук⟧
Посилання: Alle reviews op Google

**Waarvoor wil je een offerte?**
Kies een dienst en vertel ons welke auto je hebt.
Кнопки: PPF · Ramen blinderen · Car wrapping · Ik wil advies

**Studio in Vroomshoop**
Twentelaan 14 D, 7681 NE Vroomshoop · ⟦06 12 34 56 78⟧ · ⟦ma-vr 9:00-18:00, za 10:00-16:00⟧ · кнопки: Route in Google Maps · WhatsApp ons

---

## 7. PPF (/ppf/)

**Hero**
- H1: PPF lakbescherming in Vroomshoop
- Sub: Transparante folie op de lak, aangebracht na een voorbereiding in vijf stappen.
- Кнопки: Offerte aanvragen · WhatsApp ons
- Чипи: 3 jaar garantie · XPEL en BRAVIXX folie · ⟦Fabrieksgarantie tot 10 jaar | F7⟧

**Wat is PPF** (блок-відповідь, 1 абзац)
PPF (paint protection film) is een dunne, transparante folie op de lak. De folie vangt steenslag en lichte krassen op. V Guard Studio in Vroomshoop (Twente) brengt PPF aan op de voorkant, op losse delen of op de hele auto.

**Kies je bescherming** (3 картки пакетів, у кожній список зон, ціна і кнопка «Offerte aanvragen»)
1. Full Front · De voorkant, waar de meeste steenslag terechtkomt. · Zones: ⟦voorbumper, motorkap, voorschermen, spiegelkappen, koplampen | точні зони V Guard⟧ · vanaf ⟦€895⟧ · ⟦1-2 dagen | тривалість⟧
2. Full Body · Alle gelakte delen van de auto onder folie. · Zones: ⟦alle gelakte panelen | точні зони⟧ · vanaf ⟦€2.995 | ринок ~€3.500-6.000⟧ · ⟦3-5 dagen⟧
3. Gedeeltelijk · Alleen de delen die jij kiest. · ⟦Koplampen vanaf €99 · Instaplijsten vanaf €79 · Laadrand achterbumper vanaf €79 · Spiegelkappen vanaf €79 | ціни за деталь⟧
Під картками: Prijzen incl. btw. Eindprijs hangt af van model en zones.

**Zo werken we** (ті самі 5 кроків, що на Home)

**PPF projecten** (галерея 6 фото, лише PPF)

**Garantie en folies** (4 пункти як «Waarom V Guard Studio» на Home)

**Veelgestelde vragen** (акордеон, перше питання відкрите)
1. Wat is het verschil tussen PPF en een keramische coating?
Een keramische coating is een dunne, harde laag die vooral glans geeft en het wassen makkelijker maakt. PPF is een dikkere folie die steenslag en krassen opvangt voordat ze de lak raken.
2. Hoe lang duurt het aanbrengen?
⟦Full Front 1-2 dagen, Full Body 3-5 dagen. Je krijgt de exacte planning bij de offerte. | тривалість V Guard⟧
3. Welke garantie krijg ik?
Op ons werk geven we 3 jaar garantie. Op de folie geldt daarnaast de fabrieksgarantie, ⟦tot 10 jaar afhankelijk van het merk | F7⟧.
4. Welke folie gebruiken jullie?
Voor PPF werken we met ⟦XPEL en BRAVIXX | бренди саме для PPF⟧. In de offerte staat welke folie we voor jouw auto adviseren.
5. Hoe was ik een auto met PPF?
⟦De eerste week niet wassen. Daarna handwas of contactloos, en geen hogedrukspuit op de randen van de folie. | догляд V Guard⟧

**CtaBand:** Offerte voor PPF? · Stuur merk, model en bouwjaar. Je krijgt een prijs op maat. · Offerte aanvragen · WhatsApp ons

---

## 8. RAMEN BLINDEREN (/ramen-blinderen/)

**Hero**
- H1: Ramen blinderen en autoruiten tinten in Vroomshoop
- Sub: Meer privacy en minder felle zon. Folie op maat, klaar ⟦in 2-3 uur | тривалість V Guard⟧.
- Кнопки: Offerte aanvragen · WhatsApp ons
- Чипи: Achterzijde vanaf ⟦€129⟧ · 3 jaar garantie · LLumar en XPEL folie

**Wat is ramen blinderen** (блок-відповідь)
Ramen blinderen, ook autoruiten tinten genoemd, is het aanbrengen van getinte folie aan de binnenkant van de autoruiten. Het geeft meer privacy en minder felle zon. V Guard Studio blindeert autoruiten in Vroomshoop, Twente.

**Wat mag in Nederland** (ключова схема: авто вид зверху, 3 зони кольором + легенда)
- Voorruit: minimaal 55% licht
- Zijruiten naast de bestuurder: minimaal 55% licht
- Achterzijruiten en achterruit: donkerder mag, met buitenspiegels links en rechts
Підпис: Bron: Rijksoverheid (посилання)

**Prijzen ramen blinderen** (таблиця, вона головна на сторінці; ціни incl. btw)
Achterzijde (vanaf de B-stijl, standaard folie):
| Carrosserie | Prijs |
|---|---|
| Hatchback 3-deurs | ⟦€129 | нижній поріг ринку NL; SÜ Cars €150, Tintero €175⟧ |
| Hatchback 5-deurs | ⟦€149⟧ |
| Sedan / coupé | ⟦€179⟧ |
| Stationwagon | ⟦€189⟧ |
| SUV | ⟦€199⟧ |
| Bus / MPV | ⟦€249⟧ |
| Tesla Model 3 / Model Y | ⟦€179 | EV-сегмент з ресерчу; без даху⟧ |

Opties:
| Optie | Prijs |
|---|---|
| Voorste zijruiten, lichte folie (minimaal 55%) | ⟦+€99 | ринок €100-150⟧ |
| Keramische warmtewerende folie | ⟦+€69 | апгрейд, ринок +€70-100⟧ |
| Alleen achterruit | ⟦€79⟧ |
| Chameleon voorruit | ⟦vanaf €199 | V Guard озвучував €500⟧ |
| Complete auto (achterzijde + voorste zijruiten) | ⟦vanaf €239 | пакет зі знижкою⟧ |
Під таблицею: Kies je tint: 5%, 20%, 35%, 50% of 70%. Prijzen incl. btw.

**Voor en na** (слайдер порівняння)
Фото «Na» під фото «Voor», вертикальна лінія з ручкою від 44 px, мітки «Voor» і «Na» у кутах. Намалюй 3 стани: ручка по центру, ручка у фокусі клавіатури, запасний вигляд без JS (два фото: на 375 одне під одним, на 1280 поруч).
Підпис: ⟦Ford Focus · achterzijde · 20% | реальне авто з фото⟧

**Zo werken we** (4 кроки, той самий стиль схеми)
1. Advies · We kiezen samen de tint en de ruiten.
2. Reinigen · Ruiten worden binnen en buiten grondig schoongemaakt.
3. Op maat snijden · De folie wordt per ruit op maat gemaakt.
4. Aanbrengen · Folie aan de binnenkant, daarna eindcontrole.
⟦процес тонування V Guard, замінить клієнт⟧

**Getinte ruiten van V Guard** (галерея 6 фото тонування)

**Veelgestelde vragen**
1. Hoe donker mag ik mijn autoruiten laten blinderen?
De voorruit en de zijruiten naast de bestuurder moeten minimaal 55% licht doorlaten. Achterzijruiten en achterruit mogen donkerder, als je auto links en rechts een buitenspiegel heeft. Het gaat om ruit en folie samen, want fabrieksglas houdt zelf ook licht tegen.
2. Wordt dit gecontroleerd bij de APK?
Bij de APK wordt de lichtdoorlatendheid van de voorste ruiten niet getest. De politie kan wel meten. Laten de voorruit of de zijruiten naast de bestuurder te weinig licht door, dan kun je een boete krijgen en kan de politie je kentekenbewijs innemen.
3. Welke tint kan ik kiezen?
⟦5%, 20%, 35%, 50% of 70%. De meeste klanten kiezen 20% voor de achterzijde. | відсотки V Guard⟧
4. Hoe lang duurt het en wanneer mag het raam weer open?
⟦Het blinderen duurt 2-3 uur. Houd de ramen daarna 3 dagen dicht. | V Guard⟧
5. Hoe maak ik getinte ruiten schoon?
⟦Wacht een week met de binnenkant schoonmaken. Gebruik daarna een zachte doek en een schoonmaakmiddel zonder ammoniak. | догляд V Guard⟧
6. Welke garantie krijg ik?
Op ons werk geven we 3 jaar garantie. Op de tintfolie geldt de fabrieksgarantie, ⟦tot 7 jaar | F7⟧.

**CtaBand:** Ramen laten blinderen? · Stuur merk, model en bouwjaar. Je krijgt direct een prijs. · Offerte aanvragen · WhatsApp ons

---

## 9. CAR WRAPPING (/car-wrapping/)

**Hero**
- H1: Car wrapping in Vroomshoop, volledig of gedeeltelijk
- Sub: Een nieuwe kleur of finish met folie, aangebracht in onze studio.
- Кнопки: Offerte aanvragen · WhatsApp ons
- Чипи: 3 jaar garantie · Volledige wrap vanaf ⟦€1.795⟧ · 5-staps voorbereiding

**Wat is car wrapping** (блок-відповідь)
Car wrapping is het bekleden van de lak met gekleurde folie. Je kiest een volledige wrap of alleen delen van de auto, zoals dak, spiegelkappen of chroom. V Guard Studio wrapt auto's in Vroomshoop, Twente.

**Volledig of gedeeltelijk** (картки з фото, ціною і кнопкою)
1. Volledige wrap · De hele auto in een nieuwe kleur of finish. · vanaf ⟦€1.795 | ринок ~€2.000-3.500⟧ · ⟦3-5 dagen⟧
2. Dak · Zwart of in kleur, voor een sportieve look. · vanaf ⟦€249⟧
3. Spiegelkappen · Kleine upgrade, groot verschil. · vanaf ⟦€69⟧
4. Chrome delete · Chroomdelen in zwart of kleur. · vanaf ⟦€149 | ринок від €175⟧
Чипи фінішів під картками: Glans · Mat · Satijn · Metallic · Carbon look ⟦фініші V Guard⟧
Під картками: Prijzen incl. btw. Eindprijs hangt af van auto, folie en delen.

**Recent wrap-werk** (3 великі фото одразу після карток) · Bekijk alle projecten

**Zo werken we** (ті самі 5 кроків, що на Home)

**Veelgestelde vragen**
1. Hoe lang staat mijn auto bij jullie? ⟦Een volledige wrap duurt 3-5 dagen, een dak of spiegelkappen meestal 1 dag. | V Guard⟧
2. Hoe lang gaat een wrap mee? ⟦Bij goed onderhoud 5-7 jaar, afhankelijk van folie en gebruik. | V Guard⟧
3. Beschadigt een wrap de lak? Op originele lak in goede staat laat folie bij vakkundig verwijderen meestal los zonder schade. Bij overgespoten of beschadigde lak is er meer risico; daarom bekijken we de lak vooraf.
4. Welke kleuren en finishes zijn er? ⟦Glans, mat, satijn, metallic en carbon look, in tientallen kleuren. Bekijk de stalen in de studio. | V Guard⟧
5. Wat kost een wrap? Een volledige wrap begint bij ⟦€1.795⟧. Je krijgt een vaste prijs na je aanvraag.

**CtaBand:** Je auto in een nieuwe kleur? · Stuur merk, model en de kleur die je zoekt. · Offerte aanvragen · WhatsApp ons

---

## 10. PROJECTEN (/projecten/)

- H1: Projecten van V Guard Studio
- Sub: Echte auto's uit onze studio in Vroomshoop: PPF, getinte ruiten en wraps.
- Фільтр: Alles · PPF · Ramen blinderen · Car wrapping
- Сітка 12 карток: фото + підпис ⟦merk model · dienst · folie | з реальних проєктів⟧
- CtaBand: Jouw auto als volgende? · Vraag een offerte aan of stuur ons een WhatsApp.

---

## 11. CONTACT (/contact/) І ФОРМА

- H1: Offerte aanvragen bij V Guard Studio
- Sub: Vier korte stappen. We nemen ⟦binnen 1 werkdag | термін відповіді V Guard⟧ contact op via telefoon of WhatsApp.
- Форма вище згину на 375. Під формою блок «Studio in Vroomshoop» як на Home.

Прогрес «Stap 1 van 4». Кнопки: Volgende · Terug · Versturen.

**Stap 1.** Waarmee kunnen we je helpen? Великі картки: PPF · Ramen blinderen · Car wrapping · Ik wil advies.
**Stap 2.** Welke auto? Merk (bijv. Volkswagen) · Model (bijv. Golf) · Bouwjaar (bijv. 2021) · Carrosserie: Hatchback · Sedan · Stationwagon · Coupé · SUV · Bus · Anders.
**Stap 3 (варіант PPF).** Wat wil je laten doen? Full Front · Full Body · Gedeeltelijk.
(для тонування: Achterzijde · Voorste zijruiten · Complete auto · Chameleon; для wrap: Volledig · Dak · Spiegelkappen · Chrome delete + поле «Gewenste kleur of finish»)
**Stap 4.** Hoe bereiken we je? Naam* · Telefoon of WhatsApp* · E-mail (optioneel) · Opmerking (optioneel) · ☐ Ik ga akkoord met de privacyverklaring.
**Помилка поля (намалюй на телефоні):** Vul een geldig telefoonnummer in.
**Успіх:** Bedankt, je aanvraag is binnen. · We nemen contact met je op via telefoon of WhatsApp. Heb je foto's van je auto? Stuur ze via WhatsApp. · кнопка «Stuur foto's via WhatsApp».

---

## 12. UA-ВЕРСІЯ (для фрейму 9; решта для розробки)

**Глобальне:** меню PPF · Тонування · Car wrapping · Проєкти · Контакти · кнопка «Отримати оцінку». Нижня панель: WhatsApp · Подзвонити · Оцінка.

**Home.** H1: PPF, тонування і car wrapping у Vroomshoop · Sub: Захист і новий вигляд вашого авто. Студія у Твенте. · Кнопки: Отримати оцінку · Написати у WhatsApp · Чипи: 3 роки гарантії · XPEL, BRAVIXX, LLumar · Підготовка у 5 кроків.
Картки: PPF захист лаку · Прозора плівка, що захищає лак від сколів і подряпин. / Тонування вікон · Більше приватності й менше яскравого сонця в салоні. / Car wrapping · Новий колір або фініш плівкою, повністю чи частково. · «від €».
Схема «Якість важливіша за швидкість»: Миття · Clay · Знежирення · Нанесення · Перевірка.
Блоки: Наші роботи · Чому V Guard Studio · Відгуки клієнтів · Для чого потрібна оцінка? · Студія у Vroomshoop · Маршрут у Google Maps.

**PPF.** H1: PPF захист лаку у Vroomshoop · Sub: Прозора плівка на лак після підготовки у п'ять кроків. · Відповідь: PPF (paint protection film) це тонка прозора плівка на лаку. Вона бере на себе сколи і дрібні подряпини. V Guard Studio у Vroomshoop наносить PPF на передню частину, окремі деталі або все авто. · Пакети: Full Front · Full Body · Частково.

**Тонування.** H1: Тонування вікон авто у Vroomshoop · Sub: Більше приватності й менше яскравого сонця. Плівка за розміром, готово за 2-3 години. · Схема «Що дозволено в Нідерландах»: Лобове скло: щонайменше 55% світла · Бічні біля водія: щонайменше 55% світла · Задні бічні і заднє скло: можна темніше, якщо є дзеркала зліва і справа. · Таблиця: Хетчбек 3-дверний · Хетчбек 5-дверний · Седан / купе · Універсал · SUV · Бус / мінівен · Tesla Model 3 / Model Y; опції: Передні бічні, світла плівка (від 55%) · Керамічна плівка проти тепла · Лише заднє скло · Chameleon на лобове · Усе авто. · До і після.

**Car wrapping.** H1: Car wrapping у Vroomshoop, повністю чи частково · Sub: Новий колір або фініш плівкою, у нашій студії. · Картки: Повний wrap · Дах · Ковпаки дзеркал · Chrome delete. Фініші: Глянець · Мат · Сатин · Металік · Під карбон.

**Проєкти.** H1: Проєкти V Guard Studio · Sub: Справжні авто з нашої студії у Vroomshoop: PPF, тонування і wrap.

**Контакти і форма.** H1: Отримати оцінку у V Guard Studio · Sub: Чотири короткі кроки. Зв'яжемося протягом робочого дня телефоном або у WhatsApp. · Крок 1 з 4 · Далі · Назад · Надіслати · З чим вам допомогти? · Яке у вас авто? Марка · Модель · Рік випуску · Тип кузова · Що саме зробити? · Як з вами зв'язатися? Ім'я · Телефон або WhatsApp · Email (необов'язково) · Коментар · Я погоджуюся з політикою конфіденційності. · Успіх: Дякуємо, заявку отримано. Маєте фото авто? Надішліть їх у WhatsApp. · кнопка «Надіслати фото у WhatsApp».

**UA FAQ (для розробки).**
PPF: 1) Чим PPF відрізняється від керамічного покриття? Кераміка це тонкий твердий шар для блиску і легшого миття. PPF це товща плівка, яка приймає сколи і подряпини замість лаку. 2) Скільки триває нанесення? Full Front 1-2 дні, Full Body 3-5 днів, точний план в оцінці. 3) Яка гарантія? 3 роки на роботу, плюс гарантія виробника на плівку до 10 років. 4) Які плівки? XPEL і BRAVIXX; в оцінці вказуємо, яку радимо. 5) Як мити авто з PPF? Перший тиждень не мити. Далі ручне або безконтактне миття, без мийки високого тиску на краї плівки.
Тонування: 1) Наскільки темно можна? Лобове і бічні біля водія щонайменше 55% світла; задні бічні і заднє скло темніше, якщо є дзеркала зліва і справа. Рахується скло разом із плівкою. 2) Чи перевіряють на APK? На APK не перевіряють. Поліція може виміряти: штраф і можливе вилучення свідоцтва про реєстрацію. 3) Який тон обрати? 5%, 20%, 35%, 50% або 70%; для задньої частини найчастіше 20%. 4) Скільки триває? 2-3 години; 3 дні не опускати вікна. 5) Як мити? Тиждень не чіпати внутрішній бік, далі м'яка ганчірка і засіб без аміаку. 6) Гарантія: 3 роки на роботу, на плівку гарантія виробника до 7 років.
Wrap: 1) Скільки днів? Повний wrap 3-5 днів, дах чи дзеркала зазвичай 1 день. 2) Скільки служить? 5-7 років при доброму догляді. 3) Чи шкодить лаку? З оригінального лаку в доброму стані плівка зазвичай знімається без шкоди; перефарбований лак ризикованіший, тому оглядаємо лак заздалегідь. 4) Кольори і фініші: глянець, мат, сатин, металік, під карбон, десятки кольорів, зразки в студії. 5) Ціна: повний wrap від €1.795, фіксована ціна після заявки.

---

## 13. SEO І GEO (Claude Design ігнорує; для розробки)

| Сторінка | URL NL · UA | Title NL | Title UA |
|---|---|---|---|
| Home | `/` · `/uk/` | PPF, ramen blinderen en car wrapping Vroomshoop \| V Guard Studio | PPF, тонування і car wrapping у Vroomshoop \| V Guard Studio |
| PPF | `/ppf/` · `/uk/ppf/` | PPF lakbescherming Vroomshoop, Twente \| V Guard Studio | PPF захист лаку у Vroomshoop \| V Guard Studio |
| Тонування | `/ramen-blinderen/` · `/uk/tonuvannia/` | Ramen blinderen Vroomshoop vanaf €129 \| V Guard Studio | Тонування вікон авто у Vroomshoop \| V Guard Studio |
| Wrap | `/car-wrapping/` · `/uk/car-wrapping/` | Car wrapping en auto wrappen Vroomshoop \| V Guard Studio | Car wrapping у Vroomshoop \| V Guard Studio |
| Проєкти | `/projecten/` · `/uk/proiekty/` | Projecten: PPF, ramen blinderen en wraps \| V Guard Studio | Проєкти V Guard Studio |
| Контакти | `/contact/` · `/uk/kontakty/` | Offerte en contact \| V Guard Studio Vroomshoop | Оцінка і контакти \| V Guard Studio |

Meta NL (UA так само за змістом):
- Home: V Guard Studio in Vroomshoop, Twente: PPF lakbescherming, ramen blinderen en car wrapping. Bekijk prijzen en ons werk en vraag een offerte aan.
- PPF: PPF lakbescherming in Vroomshoop: Full Front vanaf €895, Full Body en losse delen. Voorbereiding in vijf stappen, 3 jaar garantie op het werk.
- Тонування: Ramen blinderen en autoruiten tinten in Vroomshoop vanaf €129. Vaste prijs per carrosserie, uitleg over de 55%-regel, klaar in 2-3 uur.
- Wrap: Car wrapping in Vroomshoop: volledige wrap vanaf €1.795, dak, spiegelkappen en chrome delete. Bekijk kleuren, finishes en ons werk.
- Проєкти: Echte projecten van V Guard Studio in Vroomshoop: PPF, getinte ruiten en car wrapping.
- Контакти: Vraag in vier stappen een offerte aan voor PPF, ramen blinderen of car wrapping. V Guard Studio, Twentelaan 14 D, Vroomshoop.

Правила:
- Один H1 = H1 з макета. Блок «Wat is ...» стоїть у перших 100 словах сторінки, звичайним HTML-текстом: це відповідь для Google і AI.
- Ключі: «ramen blinderen» і «autoruiten tinten» (не «ramen tinten» без «auto»: у видачі конфліктує з японськими ресторанами); «PPF», «lakbescherming»; «car wrapping», «auto wrappen»; Vroomshoop у H1, Twente в підзаголовку або відповіді.
- JSON-LD: `AutoRepair` на всіх сторінках (назва, адреса, телефон, години, соцмережі з footer, однакові з Google Business Profile); `Service` + `Offer` з цінами на сторінках послуг; `FAQPage` лише з видимих питань; `BreadcrumbList`.
- canonical на себе; hreflang `nl-NL` ↔ `uk-UA`, `x-default` → NL; sitemap; до запуску `noindex`.
- Alt фото: «{merk model} met {dienst} door V Guard Studio in Vroomshoop».
- Внутрішні посилання: Home → 3 послуги, Проєкти, Контакти; кожна послуга → Проєкти і форма з `?service=`.
- NAP (назва, адреса, телефон) символ у символ однаковий у footer, Контактах, JSON-LD і Google Business Profile.

---

## 14. ЩО ПОВЕРНУТИ

Фрейми 1-9, список токенів і короткий список місць, де текст не вліз у макет (сторінка, блок, скільки слів зайвих). Сам тексти не скорочуй.

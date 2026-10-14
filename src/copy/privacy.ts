// Privacy (/privacy/, /uk/privacy/). Text from Oleksii, step 13 and its addendum (12.10.2026), step 14 fixes.
// Tokens come from site.ts: legal name and KvK (F14), address (F2), email (F13), phone (F11) and
// the retention term. While the email is null (F13 ОЧІКУЄ), the two email sentences name only the
// phone (owner decision 12.10.2026). No [SESSION] sentence: the form keeps no data in the browser.
import { fullAddress, site } from '../config/site.ts';
import type { Locale } from '../data/fact.ts';

/** A paragraph, a bulleted list, or a paragraph with one plain link inside it. */
export type PrivacyBlock = string | string[] | { text: string; link: { label: string; href: string } };

export interface PrivacySection {
  title: string;
  blocks: PrivacyBlock[];
}

export interface PrivacyCopy {
  title: string;
  description: string;
  h1: string;
  /** «Laatst bijgewerkt: 12 oktober 2026» */
  updated: { label: string; date: string; iso: string };
  intro: string;
  sections: PrivacySection[];
}

const legalName = site.legalName.value;
const address = fullAddress;
const kvk = site.kvk.value;
const email = site.email.value;
const phone = site.phone.value.display;
const retentionMonths = site.retentionMonths.value;
const updatedIso = '2026-10-12';

const ap = { label: 'autoriteitpersoonsgegevens.nl', href: 'https://www.autoriteitpersoonsgegevens.nl' };

export const privacyCopy: Record<Locale, PrivacyCopy> = {
  nl: {
    title: 'Privacyverklaring | V Guard Studio',
    description:
      'Hoe V Guard Studio in Vroomshoop omgaat met uw gegevens uit het offerteformulier, WhatsApp en telefoon.',
    h1: 'Privacyverklaring',
    updated: { label: 'Laatst bijgewerkt:', date: '12 oktober 2026', iso: updatedIso },
    intro:
      'V Guard Studio gaat zorgvuldig om met uw persoonsgegevens. Hier leest u welke gegevens wij verzamelen, waarom, hoe lang wij ze bewaren en welke rechten u heeft.',
    sections: [
      {
        title: 'Wie zijn wij',
        blocks: [
          `V Guard Studio is een handelsnaam van ${legalName}, ${address}, KvK ${kvk}. Wij zijn verantwoordelijk voor de verwerking van uw gegevens. ${
            email ? `Vragen over privacy stelt u via ${email} of ${phone}.` : `Vragen over privacy stelt u via ${phone}.`
          }`,
        ],
      },
      {
        title: 'Welke gegevens wij verwerken',
        blocks: [
          'Via het offerteformulier:',
          [
            'naam en telefoonnummer;',
            'e-mailadres, als u dat invult;',
            'merk, model, bouwjaar en carrosserie van uw auto;',
            'de gewenste dienst en opties, bij car wrapping ook de gewenste kleur of afwerking, en uw opmerking;',
            'de taal en de pagina van waaruit u het formulier verstuurt.',
          ],
          'Bij het verzenden slaat Netlify bij uw aanvraag ook het IP-adres, het browsertype en de verwijzende pagina op.',
          'Naam, telefoonnummer, merk, model, carrosserie en de gewenste dienst met opties zijn nodig om uw aanvraag te behandelen. Zonder deze gegevens kunnen wij geen offerte maken. Bouwjaar, kleur, e-mailadres en opmerking zijn vrijwillig.',
          "Via WhatsApp of telefoon: de gegevens en foto's die u zelf stuurt.",
          'Bij een bezoek aan de website: technische gegevens zoals IP-adres en browsertype. Netlify verwerkt die voor beveiliging en het oplossen van storingen en bewaart ze volgens de eigen termijnen van Netlify.',
          "Foto's van auto's op deze website tonen geen leesbaar kenteken en geen herkenbare personen.",
        ],
      },
      {
        title: 'Waarvoor en op welke grondslag',
        blocks: [
          [
            'Uw offerteaanvraag beantwoorden en een afspraak maken: stappen op uw verzoek voordat er een overeenkomst is (art. 6 lid 1 sub b AVG).',
            'De opdracht uitvoeren en factureren: uitvoering van de overeenkomst en de wettelijke bewaarplicht (art. 6 lid 1 sub b en c AVG).',
            'De website beveiligen en spam tegengaan: ons gerechtvaardigd belang (art. 6 lid 1 sub f AVG).',
          ],
          'Wij gebruiken uw gegevens niet voor nieuwsbrieven of reclame en verkopen ze niet aan anderen.',
        ],
      },
      {
        title: 'Wie uw gegevens ontvangt',
        blocks: [
          'Alleen partijen die wij nodig hebben om uw aanvraag te behandelen:',
          [
            'Netlify, Inc. (Verenigde Staten): hosting van de website en verwerking van formulieren, inclusief een automatisch spamfilter;',
            'Telegram: interne melding van een nieuwe aanvraag met alle gegevens uit het formulier aan onze medewerkers, zodat wij u snel kunnen terugbellen;',
            'WhatsApp (Meta): alleen als u ons zelf via WhatsApp benadert;',
            'de technisch beheerder van de website, die in onze opdracht werkt.',
          ],
          'Met partijen die gegevens voor ons verwerken, maken wij afspraken over de beveiliging van uw gegevens.',
        ],
      },
      {
        title: 'Gegevens buiten de EU',
        blocks: [
          'Netlify, Inc. is gevestigd in de Verenigde Staten en neemt deel aan het EU-VS Data Privacy Framework. Telegram en WhatsApp zijn diensten van bedrijven buiten de Europese Economische Ruimte. Gegevens die via deze diensten lopen, kunnen daar worden verwerkt volgens de voorwaarden van die diensten.',
        ],
      },
      {
        title: 'Hoe lang wij gegevens bewaren',
        blocks: [
          [
            `Offerteaanvragen zonder opdracht: maximaal ${retentionMonths} maanden na het laatste contact.`,
            'Gegevens van klanten: zolang nodig voor de opdracht en de garantie. Facturen bewaren wij 7 jaar, zoals de wet voorschrijft.',
            'Meldingen in Telegram en berichten in WhatsApp bewaren wij niet langer dan nodig voor de aanvraag, de opdracht en de garantie.',
          ],
        ],
      },
      {
        title: 'Cookies',
        blocks: [
          'Deze website plaatst geen cookies en gebruikt geen analytics of advertentiepixels. Kaarten en sociale media openen pas na uw klik, op de website van die dienst. Daar gelden de voorwaarden van die dienst.',
        ],
      },
      {
        title: 'Beveiliging',
        blocks: [
          'De website werkt via een beveiligde verbinding (HTTPS). Alleen onze medewerkers die uw aanvraag behandelen en de technisch beheerder van de website hebben toegang tot uw gegevens.',
        ],
      },
      {
        title: 'Uw rechten',
        blocks: [
          `U kunt ons vragen uw gegevens in te zien, te corrigeren, te verwijderen of over te dragen, voor zover de AVG dat in uw situatie toestaat. U kunt ook vragen de verwerking te beperken of bezwaar maken. ${
            email ? `Stuur uw verzoek naar ${email}.` : `Stuur uw verzoek via ${phone}.`
          } Wij reageren binnen een maand en kunnen u vragen uw identiteit te bevestigen.`,
          {
            text: 'Bent u het niet eens met hoe wij met uw gegevens omgaan, dan kunt u een klacht indienen bij de Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl).',
            link: ap,
          },
        ],
      },
      {
        title: 'Geautomatiseerde besluiten',
        blocks: ['Wij nemen geen besluiten over u die uitsluitend geautomatiseerd tot stand komen.'],
      },
      {
        title: 'Wijzigingen',
        blocks: [
          'Wij kunnen deze verklaring aanpassen. De datum bovenaan laat zien wanneer dat voor het laatst is gebeurd.',
        ],
      },
    ],
  },
  uk: {
    title: 'Політика конфіденційності | V Guard Studio',
    description:
      'Як V Guard Studio у Vroomshoop обробляє ваші дані з форми заявки, WhatsApp і телефонних дзвінків.',
    h1: 'Політика конфіденційності',
    updated: { label: 'Оновлено:', date: '12 жовтня 2026', iso: updatedIso },
    intro:
      'V Guard Studio дбайливо ставиться до ваших персональних даних. Тут пояснюємо, які дані ми збираємо, навіщо, скільки їх зберігаємо і які у вас права. Ця політика діє також нідерландською мовою; у разі розбіжностей переважає нідерландська версія.',
    sections: [
      {
        title: 'Хто ми',
        blocks: [
          `V Guard Studio є торговою назвою ${legalName}, ${address}, KvK ${kvk}. Ми відповідаємо за обробку ваших даних. ${
            email
              ? `Питання щодо конфіденційності надсилайте на ${email} або телефонуйте ${phone}.`
              : `З питаннями щодо конфіденційності телефонуйте ${phone}.`
          }`,
        ],
      },
      {
        title: 'Які дані ми обробляємо',
        blocks: [
          'Через форму заявки:',
          [
            "ім'я і номер телефону;",
            'email, якщо ви його вказали;',
            'марка, модель, рік випуску і тип кузова авто;',
            'потрібна послуга й опції, для обклеювання також бажаний колір або фініш, і ваш коментар;',
            'мова і сторінка, з якої надіслано форму.',
          ],
          'Під час надсилання Netlify зберігає разом із заявкою також IP-адресу, тип браузера і сторінку, з якої ви прийшли.',
          'Імʼя, телефон, марка, модель, тип кузова і потрібна послуга з опціями необхідні, щоб обробити заявку. Без них ми не зможемо розрахувати вартість. Рік випуску, колір, email і коментар необовʼязкові.',
          'Через WhatsApp або телефон: дані і фото, які ви надсилаєте самі.',
          'Під час відвідування сайту: технічні дані, як-от IP-адреса і тип браузера. Netlify обробляє їх для безпеки і усунення збоїв і зберігає за своїми строками.',
          'На фото авто на цьому сайті немає читабельних номерів і людей, яких можна впізнати.',
        ],
      },
      {
        title: 'Навіщо і на якій підставі',
        blocks: [
          [
            'Відповісти на заявку і домовитися про візит: дії на ваш запит до укладення договору (ст. 6(1)(b) GDPR).',
            'Виконати роботу і виставити рахунок: виконання договору і обов\'язок за законом (ст. 6(1)(b) і (c) GDPR).',
            'Захищати сайт і відсіювати спам: наш законний інтерес (ст. 6(1)(f) GDPR).',
          ],
          'Ми не використовуємо ваші дані для розсилок чи реклами і не продаємо їх.',
        ],
      },
      {
        title: 'Хто отримує ваші дані',
        blocks: [
          'Лише ті, без кого ми не обробимо заявку:',
          [
            'Netlify, Inc. (США): хостинг сайту і обробка заявок, зокрема автоматичний фільтр спаму;',
            'Telegram: внутрішнє сповіщення працівникам про нову заявку з усіма даними з форми, щоб ми могли швидко передзвонити;',
            'WhatsApp (Meta): лише якщо ви самі пишете нам у WhatsApp;',
            'технічний адміністратор сайту, який працює за нашим дорученням.',
          ],
          'З усіма, хто обробляє дані за нашим дорученням, ми домовляємося про їхній захист.',
        ],
      },
      {
        title: 'Дані за межами ЄС',
        blocks: [
          'Netlify, Inc. зареєстрована в США і є учасником EU-US Data Privacy Framework. Telegram і WhatsApp належать компаніям за межами Європейської економічної зони. Дані, що проходять через ці сервіси, можуть оброблятися там за їхніми правилами.',
        ],
      },
      {
        title: 'Скільки ми зберігаємо дані',
        blocks: [
          [
            `Заявки без замовлення: до ${retentionMonths} місяців після останнього контакту.`,
            'Дані клієнтів: стільки, скільки потрібно для роботи і гарантії. Рахунки зберігаємо 7 років, як вимагає закон.',
            'Сповіщення в Telegram і повідомлення у WhatsApp зберігаємо не довше, ніж потрібно для заявки, роботи і гарантії.',
          ],
        ],
      },
      {
        title: 'Файли cookie',
        blocks: [
          'Сайт не встановлює cookie і не використовує аналітику чи рекламні пікселі. Карти і соцмережі відкриваються лише після вашого кліку, на сайті відповідного сервісу. Там діють правила цього сервісу.',
        ],
      },
      {
        title: 'Безпека',
        blocks: [
          'Сайт працює через захищене зʼєднання (HTTPS). Доступ до ваших даних мають лише працівники, які обробляють заявку, і технічний адміністратор сайту.',
        ],
      },
      {
        title: 'Ваші права',
        blocks: [
          `Ви можете попросити нас показати ваші дані, виправити, видалити або передати їх, наскільки це дозволяє GDPR у вашій ситуації. Також можете попросити обмежити обробку або заперечити проти неї. ${
            email ? `Надішліть запит на ${email}.` : `Зверніться із запитом за телефоном ${phone}.`
          } Ми відповімо протягом місяця і можемо попросити підтвердити вашу особу.`,
          {
            text: 'Якщо ви не згодні з тим, як ми обробляємо ваші дані, можете подати скаргу до нідерландського органу захисту даних Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl).',
            link: ap,
          },
        ],
      },
      {
        title: 'Автоматизовані рішення',
        blocks: ['Ми не ухвалюємо щодо вас рішень, які приймаються лише автоматично.'],
      },
      {
        title: 'Зміни',
        blocks: ['Ми можемо оновлювати цю політику. Дата вгорі показує, коли це сталося востаннє.'],
      },
    ],
  },
};

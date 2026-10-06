// Privacy (/privacy/, /uk/privacy/). No source text in the canon or design prompt:
// written from the actual data flow of this site (QuoteForm, Netlify Forms, Telegram
// function, no cookies or analytics). V Guard must review before launch (step 01 report).
import { fullAddress, site } from '../config/site.ts';
import type { Locale } from '../data/fact.ts';

export interface PrivacySection {
  title: string;
  paragraphs?: string[];
  list?: string[];
}

const months = site.retentionMonths.value;
const phone = site.phone.value.display;
const kvk = site.kvk.value;

export const privacyCopy: Record<Locale, { title: string; description: string; h1: string; intro: string; sections: PrivacySection[] }> = {
  nl: {
    title: 'Privacyverklaring | V Guard Studio',
    description: 'Hoe V Guard Studio in Vroomshoop omgaat met de gegevens uit het offerteformulier en WhatsApp.',
    h1: 'Privacyverklaring',
    intro: `${site.name}, ${fullAddress} (KvK ${kvk}), is verantwoordelijk voor de gegevens die je via deze website stuurt.`,
    sections: [
      {
        title: 'Welke gegevens',
        paragraphs: ['Via het offerteformulier ontvangen we:'],
        list: [
          'de dienst en optie die je kiest',
          'merk, model, bouwjaar en carrosserie van je auto',
          'je naam en telefoonnummer',
          'je e-mailadres en opmerking, als je die invult',
          'de taal en de pagina waarop je het formulier verstuurt',
        ],
      },
      {
        title: 'Waarvoor',
        paragraphs: [
          'We gebruiken deze gegevens alleen om je aanvraag te beantwoorden, een offerte te maken en een afspraak te plannen. We sturen geen nieuwsbrieven en verkopen geen gegevens.',
        ],
      },
      {
        title: 'Waar je gegevens staan',
        paragraphs: [
          'De website en het formulier draaien bij Netlify. Een kopie van je aanvraag gaat naar een interne Telegram-chat van V Guard Studio, zodat we snel kunnen reageren. Stuur je ons een WhatsApp, dan gelden ook de voorwaarden van WhatsApp.',
        ],
      },
      {
        title: 'Hoe lang',
        paragraphs: [`We bewaren aanvragen maximaal ${months} maanden, tenzij er een opdracht uit volgt en we gegevens langer moeten bewaren voor de administratie.`],
      },
      {
        title: 'Cookies',
        paragraphs: [
          'Deze website gebruikt geen cookies, geen analytics en geen trackers. Google Maps opent alleen als je zelf op de link klikt.',
        ],
      },
      {
        title: 'Je rechten',
        paragraphs: [
          `Je kunt je gegevens inzien, laten aanpassen of laten verwijderen. Neem contact op via ${phone} of WhatsApp. Ben je het niet eens met hoe we met je gegevens omgaan, dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens.`,
        ],
      },
    ],
  },
  uk: {
    title: 'Політика конфіденційності | V Guard Studio',
    description: 'Як V Guard Studio у Vroomshoop поводиться з даними з форми оцінки і WhatsApp.',
    h1: 'Політика конфіденційності',
    intro: `${site.name}, ${fullAddress} (KvK ${kvk}), відповідає за дані, які ви надсилаєте через цей сайт.`,
    sections: [
      {
        title: 'Які дані',
        paragraphs: ['Через форму оцінки ми отримуємо:'],
        list: [
          'послугу і варіант, які ви обираєте',
          'марку, модель, рік випуску і тип кузова авто',
          "ваше ім'я і номер телефону",
          'email і коментар, якщо ви їх вказали',
          'мову і сторінку, з якої надіслано форму',
        ],
      },
      {
        title: 'Для чого',
        paragraphs: [
          'Ми використовуємо ці дані лише для відповіді на заявку, оцінки і запису. Ми не надсилаємо розсилок і не продаємо дані.',
        ],
      },
      {
        title: 'Де зберігаються дані',
        paragraphs: [
          'Сайт і форма працюють на Netlify. Копія заявки надходить у внутрішній Telegram-чат V Guard Studio, щоб ми могли швидко відповісти. Якщо ви пишете нам у WhatsApp, діють також умови WhatsApp.',
        ],
      },
      {
        title: 'Як довго',
        paragraphs: [`Ми зберігаємо заявки не довше ${months} місяців, якщо з них не виникло замовлення, для якого дані потрібні в обліку довше.`],
      },
      {
        title: 'Cookies',
        paragraphs: [
          'Сайт не використовує cookies, аналітику чи трекери. Google Maps відкривається лише тоді, коли ви самі натискаєте посилання.',
        ],
      },
      {
        title: 'Ваші права',
        paragraphs: [
          `Ви можете переглянути, виправити або видалити свої дані. Звʼяжіться з нами за номером ${phone} або у WhatsApp. Якщо ви не згодні з тим, як ми обробляємо дані, можна подати скаргу до Autoriteit Persoonsgegevens.`,
        ],
      },
    ],
  },
};

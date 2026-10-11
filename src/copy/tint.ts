// Ramen blinderen (/ramen-blinderen/, /uk/tonuvannia/). Design prompt sections 8, 12, 13.
// Legal text only from Site Truth F10 and F10b (D14).
import { trust } from '../config/site.ts';
import { euro, type Locale } from '../data/fact.ts';
import { tint, tintFrom } from '../data/services.ts';
import { chipWarranty, headings, join, type CtaBand, type Faq } from './shared.ts';

const years = trust.workWarrantyYears.value;
const film = trust.filmWarrantyYears.value.tint;
const shades = tint.shades.value.map((s) => `${s}%`);
const from = euro(tintFrom.amount);

export const tintCopy = {
  nl: {
    title: `Ramen blinderen Vroomshoop vanaf ${from} | V Guard Studio`,
    description: `Ramen blinderen en autoruiten tinten in Vroomshoop vanaf ${from}. Vaste prijs per carrosserie, uitleg over de 55%-regel, klaar in ${tint.duration.value.nl}.`,
    h1: 'Ramen blinderen en autoruiten tinten in Vroomshoop',
    sub: `Meer privacy en minder felle zon. Folie op maat, klaar in ${tint.duration.value.nl}.`,
    chips: [`Achterzijde vanaf ${from}`, chipWarranty.nl, `${join(trust.tintBrands.value, 'en')} folie`],
    answerTitle: 'Wat is ramen blinderen',
    answer:
      'Ramen blinderen, ook autoruiten tinten genoemd, is het aanbrengen van getinte folie aan de binnenkant van de autoruiten. Het geeft meer privacy en minder felle zon. V Guard Studio blindeert autoruiten in Vroomshoop, Twente.',
    legalTitle: 'Wat mag in Nederland',
    // F10
    legal: [
      { zone: 'light', label: 'Voorruit:', text: 'minimaal 55% licht' },
      { zone: 'light', label: 'Zijruiten naast de bestuurder:', text: 'minimaal 55% licht' },
      { zone: 'dark', label: 'Achterzijruiten en achterruit:', text: 'donkerder mag, met buitenspiegels links en rechts' },
    ],
    legalDarker: 'donkerder',
    legalSource: 'Bron:',
    legalSourceLink: 'Rijksoverheid',
    pricesTitle: 'Prijzen ramen blinderen',
    bodyCaption: 'Achterzijde (vanaf de B-stijl, standaard folie)',
    bodyHead: ['Carrosserie', 'Prijs'],
    optionsCaption: 'Opties',
    optionsHead: ['Optie', 'Prijs'],
    pricesNote: `Kies je tint: ${join(shades, 'of')}. Prijzen incl. btw.`,
    beforeAfterTitle: 'Voor en na',
    galleryTitle: 'Getinte ruiten van V Guard',
    faq: [
      {
        // F10, F10b
        q: 'Hoe donker mag ik mijn autoruiten laten blinderen?',
        a: 'De voorruit en de zijruiten naast de bestuurder moeten minimaal 55% licht doorlaten. Achterzijruiten en achterruit mogen donkerder, als je auto links en rechts een buitenspiegel heeft. Het gaat om ruit en folie samen, want fabrieksglas houdt zelf ook licht tegen.',
      },
      {
        // F10b
        q: 'Wordt dit gecontroleerd bij de APK?',
        a: 'Bij de APK wordt de lichtdoorlatendheid van de voorste ruiten niet getest. De politie kan wel meten. Laten de voorruit of de zijruiten naast de bestuurder te weinig licht door, dan kun je een boete krijgen en kan de politie je kentekenbewijs innemen.',
      },
      {
        q: 'Welke tint kan ik kiezen?',
        a: `${join(shades, 'of')}. De meeste klanten kiezen ${tint.popularShade.value}% voor de achterzijde.`,
      },
      {
        q: 'Hoe lang duurt het en wanneer mag het raam weer open?',
        a: `Het blinderen duurt ${tint.duration.value.nl}. Houd de ramen daarna ${tint.keepClosedDays.value} dagen dicht.`,
      },
      { q: 'Hoe maak ik getinte ruiten schoon?', a: tint.care.value.nl },
      {
        q: 'Welke garantie krijg ik?',
        a: `Op ons werk geven we ${years} jaar garantie. Op de tintfolie geldt de fabrieksgarantie, tot ${film} jaar.`,
      },
    ] satisfies Faq[],
    faqTitle: headings.faq.nl,
    cta: { title: 'Ramen laten blinderen?', text: 'Stuur merk, model en bouwjaar. Je krijgt direct een prijs.' } satisfies CtaBand,
  },
  uk: {
    title: 'Тонування вікон авто у Vroomshoop | V Guard Studio',
    description: `Тонування вікон авто у Vroomshoop від ${from}. Фіксована ціна за типом кузова, пояснення правила 55%, готово за ${tint.duration.value.uk}.`,
    h1: 'Тонування скла автомобіля у Vroomshoop',
    sub: `Більше приватності та захист від яскравого сонця. Точна підгонка плівки, монтаж за ${tint.duration.value.uk}.`,
    chips: [`Задні вікна від ${from}`, chipWarranty.uk, `Плівки ${join(trust.tintBrands.value, 'і')}`],
    answerTitle: 'Що таке тонування скла',
    answer:
      'Тонування це встановлення спеціальної плівки з внутрішнього боку автомобільного скла. Вона зменшує яскравість сонячного світла та забезпечує більше приватності. V Guard Studio виконує тонування авто у Vroomshoop, регіон Twente.',
    legalTitle: 'Правила тонування в Нідерландах',
    legal: [
      { zone: 'light', label: 'Лобове скло:', text: 'світлопропускання не менше 55%' },
      { zone: 'light', label: 'Передні бічні вікна:', text: 'світлопропускання не менше 55%' },
      { zone: 'dark', label: 'Задні бічні вікна та заднє скло:', text: 'дозволено темніше тонування за наявності обох зовнішніх дзеркал' },
    ],
    legalDarker: 'темніше',
    legalSource: 'Джерело:',
    legalSourceLink: 'Rijksoverheid',
    pricesTitle: 'Ціни на тонування',
    bodyCaption: 'Задні вікна (від середньої стійки кузова, стандартна плівка)',
    bodyHead: ['Тип кузова', 'Ціна'],
    optionsCaption: 'Опції',
    optionsHead: ['Опція', 'Ціна'],
    pricesNote: `Оберіть світлопропускання: ${join(shades, 'або')}. Ціни з ПДВ.`,
    beforeAfterTitle: 'До та після',
    galleryTitle: 'Наші роботи з тонування',
    faq: [
      {
        q: 'Яке тонування дозволено?',
        a: 'Лобове та передні бічні вікна мають пропускати щонайменше 55% світла. Заднє скло та задні бічні вікна можна тонувати темніше за наявності обох зовнішніх дзеркал. Враховується світлопропускання скла разом із плівкою.',
      },
      {
        q: 'Чи перевіряють тонування під час APK?',
        a: 'На APK не перевіряють. Поліція може виміряти: штраф і можливе вилучення свідоцтва про реєстрацію.',
      },
      {
        q: 'Який ступінь тонування обрати?',
        a: `${join(shades, 'або')}; для задньої частини найчастіше ${tint.popularShade.value}%.`,
      },
      {
        q: 'Скільки триває тонування?',
        a: `${tint.duration.value.uk}; ${tint.keepClosedDays.value} дні не опускати вікна.`,
      },
      { q: 'Як доглядати за тонованим склом?', a: tint.care.value.uk },
      { q: 'Яка гарантія?', a: `${years} роки на роботу, на плівку гарантія виробника до ${film} років.` },
    ] satisfies Faq[],
    faqTitle: 'Поширені запитання',
    cta: {
      title: 'Хочете затонувати авто?',
      text: 'Надішліть марку, модель і рік випуску авто, і ми розрахуємо вартість.',
    } satisfies CtaBand,
  },
} satisfies Record<Locale, unknown>;

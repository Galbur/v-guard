// Ramen blinderen (/ramen-blinderen/, /uk/tonuvannia/). Design prompt sections 8, 12, 13.
// Legal text only from Site Truth F10 and F10b (D14).
import { trust } from '../config/site.ts';
import { euro, type Locale } from '../data/fact.ts';
import { tint, tintFrom } from '../data/services.ts';
import { chipWarranty, join, type CtaBand, type Faq } from './shared.ts';

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
    cta: { title: 'Ramen laten blinderen?', text: 'Stuur merk, model en bouwjaar. Je krijgt direct een prijs.' } satisfies CtaBand,
  },
  uk: {
    title: 'Тонування вікон авто у Vroomshoop | V Guard Studio',
    description: `Тонування вікон авто у Vroomshoop від ${from}. Фіксована ціна за типом кузова, пояснення правила 55%, готово за ${tint.duration.value.uk}.`,
    h1: 'Тонування вікон авто у Vroomshoop',
    sub: `Більше приватності й менше яскравого сонця. Плівка за розміром, готово за ${tint.duration.value.uk}.`,
    chips: [`Задня частина від ${from}`, chipWarranty.uk, `Плівки ${join(trust.tintBrands.value, 'і')}`],
    answerTitle: 'Що таке тонування',
    answer:
      'Тонування, або ramen blinderen, це нанесення тонованої плівки на внутрішній бік вікон авто. Воно дає більше приватності й менше яскравого сонця. V Guard Studio тонує вікна авто у Vroomshoop, Твенте.',
    legalTitle: 'Що дозволено в Нідерландах',
    legal: [
      { zone: 'light', label: 'Лобове скло:', text: 'щонайменше 55% світла' },
      { zone: 'light', label: 'Бічні біля водія:', text: 'щонайменше 55% світла' },
      { zone: 'dark', label: 'Задні бічні і заднє скло:', text: 'можна темніше, якщо є дзеркала зліва і справа' },
    ],
    legalDarker: 'темніше',
    legalSource: 'Джерело:',
    legalSourceLink: 'Rijksoverheid',
    pricesTitle: 'Ціни на тонування',
    bodyCaption: 'Задня частина (від стійки B, стандартна плівка)',
    bodyHead: ['Тип кузова', 'Ціна'],
    optionsCaption: 'Опції',
    optionsHead: ['Опція', 'Ціна'],
    pricesNote: `Оберіть тон: ${join(shades, 'або')}. Ціни з BTW.`,
    beforeAfterTitle: 'До і після',
    galleryTitle: 'Тоновані вікна від V Guard',
    faq: [
      {
        q: 'Наскільки темно можна?',
        a: 'Лобове і бічні біля водія щонайменше 55% світла; задні бічні і заднє скло темніше, якщо є дзеркала зліва і справа. Рахується скло разом із плівкою.',
      },
      {
        q: 'Чи перевіряють на APK?',
        a: 'На APK не перевіряють. Поліція може виміряти: штраф і можливе вилучення свідоцтва про реєстрацію.',
      },
      {
        q: 'Який тон обрати?',
        a: `${join(shades, 'або')}; для задньої частини найчастіше ${tint.popularShade.value}%.`,
      },
      {
        q: 'Скільки триває?',
        a: `${tint.duration.value.uk}; ${tint.keepClosedDays.value} дні не опускати вікна.`,
      },
      { q: 'Як мити?', a: tint.care.value.uk },
      { q: 'Яка гарантія?', a: `${years} роки на роботу, на плівку гарантія виробника до ${film} років.` },
    ] satisfies Faq[],
    cta: { title: 'Затонувати вікна?', text: 'Надішліть марку, модель і рік випуску. Ціну отримаєте одразу.' } satisfies CtaBand,
  },
} satisfies Record<Locale, unknown>;

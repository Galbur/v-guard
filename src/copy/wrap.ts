// Car wrapping (/car-wrapping/, /uk/car-wrapping/). Design prompt sections 9, 12, 13.
import type { Locale } from '../data/fact.ts';
import { euro } from '../data/fact.ts';
import { wrap, wrapCards, wrapFull } from '../data/services.ts';
import { chipPrep, chipWarranty, type CtaBand, type Faq } from './shared.ts';

const full = euro(wrapFull.amount);
const [fullCard, roofCard] = wrapCards;

export const wrapCopy = {
  nl: {
    title: 'Car wrapping en auto wrappen Vroomshoop | V Guard Studio',
    description: `Car wrapping in Vroomshoop: volledige wrap vanaf ${full}, dak, spiegelkappen en chrome delete. Bekijk kleuren, finishes en ons werk.`,
    h1: 'Car wrapping in Vroomshoop, volledig of gedeeltelijk',
    sub: 'Een nieuwe kleur of finish met folie, aangebracht in onze studio.',
    chips: [chipWarranty.nl, `Volledige wrap vanaf ${full}`, chipPrep.nl],
    answerTitle: 'Wat is car wrapping',
    answer:
      "Car wrapping is het bekleden van de lak met gekleurde folie. Je kiest een volledige wrap of alleen delen van de auto, zoals dak, spiegelkappen of chroom. V Guard Studio wrapt auto's in Vroomshoop, Twente.",
    cardsTitle: 'Volledig of gedeeltelijk',
    finishesLabel: 'Finishes:',
    cardsNote: 'Prijzen incl. btw. Eindprijs hangt af van auto, folie en delen.',
    galleryTitle: 'Recent wrap-werk',
    galleryMore: 'Bekijk alle projecten',
    faq: [
      {
        q: 'Hoe lang staat mijn auto bij jullie?',
        a: `Een volledige wrap duurt ${fullCard.duration.value.nl}, een dak of spiegelkappen meestal ${roofCard.duration.value.nl}.`,
      },
      { q: 'Hoe lang gaat een wrap mee?', a: `Bij goed onderhoud ${wrap.lifetime.value.nl}, afhankelijk van folie en gebruik.` },
      {
        q: 'Beschadigt een wrap de lak?',
        a: 'Op originele lak in goede staat laat folie bij vakkundig verwijderen meestal los zonder schade. Bij overgespoten of beschadigde lak is er meer risico; daarom bekijken we de lak vooraf.',
      },
      { q: 'Welke kleuren en finishes zijn er?', a: wrap.colors.value.nl },
      { q: 'Wat kost een wrap?', a: `Een volledige wrap begint bij ${full}. Je krijgt een vaste prijs na je aanvraag.` },
    ] satisfies Faq[],
    cta: { title: 'Je auto in een nieuwe kleur?', text: 'Stuur merk, model en de kleur die je zoekt.' } satisfies CtaBand,
  },
  uk: {
    title: 'Car wrapping у Vroomshoop | V Guard Studio',
    description: `Car wrapping у Vroomshoop: повний wrap від ${full}, дах, ковпаки дзеркал і chrome delete. Подивіться кольори, фініші і наші роботи.`,
    h1: 'Car wrapping у Vroomshoop, повністю чи частково',
    sub: 'Новий колір або фініш плівкою, у нашій студії.',
    chips: [chipWarranty.uk, `Повний wrap від ${full}`, chipPrep.uk],
    answerTitle: 'Що таке car wrapping',
    answer:
      'Car wrapping це обклеювання лаку кольоровою плівкою. Можна обрати повний wrap або лише частини авто, як-от дах, ковпаки дзеркал чи хром. V Guard Studio робить wrap у Vroomshoop, Твенте.',
    cardsTitle: 'Повністю чи частково',
    finishesLabel: 'Фініші:',
    cardsNote: 'Ціни з BTW. Остаточна ціна залежить від авто, плівки і деталей.',
    galleryTitle: 'Наші роботи з wrap',
    galleryMore: 'Усі проєкти',
    faq: [
      {
        q: 'Скільки днів?',
        a: `Повний wrap ${fullCard.duration.value.uk}, дах чи дзеркала зазвичай ${roofCard.duration.value.uk}.`,
      },
      { q: 'Скільки служить?', a: `${wrap.lifetime.value.uk} при доброму догляді.` },
      {
        q: 'Чи шкодить лаку?',
        a: 'З оригінального лаку в доброму стані плівка зазвичай знімається без шкоди; перефарбований лак ризикованіший, тому оглядаємо лак заздалегідь.',
      },
      { q: 'Кольори і фініші', a: wrap.colors.value.uk },
      { q: 'Ціна', a: `Повний wrap від ${full}, фіксована ціна після заявки.` },
    ] satisfies Faq[],
    cta: { title: 'Авто в новому кольорі?', text: 'Надішліть марку, модель і колір, який шукаєте.' } satisfies CtaBand,
  },
} satisfies Record<Locale, unknown>;

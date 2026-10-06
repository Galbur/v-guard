// PPF (/ppf/, /uk/ppf/). Design prompt sections 7, 12, 13.
import { trust } from '../config/site.ts';
import { euro, type Locale } from '../data/fact.ts';
import { ppfCare, ppfPackages } from '../data/services.ts';
import { chipWarranty, join, type CtaBand, type Faq } from './shared.ts';

const [front, body] = ppfPackages;
const film = trust.filmWarrantyYears.value.ppf;
const years = trust.workWarrantyYears.value;
const ppfBrands = trust.ppfBrands.value;

export const ppf = {
  nl: {
    title: 'PPF lakbescherming Vroomshoop, Twente | V Guard Studio',
    description: `PPF lakbescherming in Vroomshoop: Full Front vanaf ${euro(front.price.amount)}, Full Body en losse delen. Voorbereiding in vijf stappen, ${years} jaar garantie op het werk.`,
    h1: 'PPF lakbescherming in Vroomshoop',
    sub: 'Transparante folie op de lak, aangebracht na een voorbereiding in vijf stappen.',
    chips: [chipWarranty.nl, `${join(ppfBrands, 'en')} folie`, `Fabrieksgarantie tot ${film} jaar`],
    answerTitle: 'Wat is PPF',
    answer:
      'PPF (paint protection film) is een dunne, transparante folie op de lak. De folie vangt steenslag en lichte krassen op. V Guard Studio in Vroomshoop (Twente) brengt PPF aan op de voorkant, op losse delen of op de hele auto.',
    packagesTitle: 'Kies je bescherming',
    packagesNote: 'Prijzen incl. btw. Eindprijs hangt af van model en zones.',
    galleryTitle: 'PPF projecten',
    trustTitle: 'Garantie en folies',
    faq: [
      {
        q: 'Wat is het verschil tussen PPF en een keramische coating?',
        a: 'Een keramische coating is een dunne, harde laag die vooral glans geeft en het wassen makkelijker maakt. PPF is een dikkere folie die steenslag en krassen opvangt voordat ze de lak raken.',
      },
      {
        q: 'Hoe lang duurt het aanbrengen?',
        a: `Full Front ${front.duration.value.nl}, Full Body ${body.duration.value.nl}. Je krijgt de exacte planning bij de offerte.`,
      },
      {
        q: 'Welke garantie krijg ik?',
        a: `Op ons werk geven we ${years} jaar garantie. Op de folie geldt daarnaast de fabrieksgarantie, tot ${film} jaar afhankelijk van het merk.`,
      },
      {
        q: 'Welke folie gebruiken jullie?',
        a: `Voor PPF werken we met ${join(ppfBrands, 'en')}. In de offerte staat welke folie we voor jouw auto adviseren.`,
      },
      { q: 'Hoe was ik een auto met PPF?', a: ppfCare.value.nl },
    ] satisfies Faq[],
    cta: { title: 'Offerte voor PPF?', text: 'Stuur merk, model en bouwjaar. Je krijgt een prijs op maat.' } satisfies CtaBand,
  },
  uk: {
    title: 'PPF захист лаку у Vroomshoop | V Guard Studio',
    description: `PPF захист лаку у Vroomshoop: Full Front від ${euro(front.price.amount)}, Full Body і окремі деталі. Підготовка у пʼять кроків, ${years} роки гарантії на роботу.`,
    h1: 'PPF захист лаку у Vroomshoop',
    sub: "Прозора плівка на лак після підготовки у п'ять кроків.",
    chips: [chipWarranty.uk, `Плівки ${join(ppfBrands, 'і')}`, `Гарантія виробника до ${film} років`],
    answerTitle: 'Що таке PPF',
    answer:
      'PPF (paint protection film) це тонка прозора плівка на лаку. Вона бере на себе сколи і дрібні подряпини. V Guard Studio у Vroomshoop наносить PPF на передню частину, окремі деталі або все авто.',
    packagesTitle: 'Оберіть захист',
    packagesNote: 'Ціни з BTW. Остаточна ціна залежить від моделі і зон.',
    galleryTitle: 'Проєкти PPF',
    trustTitle: 'Гарантія і плівки',
    faq: [
      {
        q: 'Чим PPF відрізняється від керамічного покриття?',
        a: 'Кераміка це тонкий твердий шар для блиску і легшого миття. PPF це товща плівка, яка приймає сколи і подряпини замість лаку.',
      },
      {
        q: 'Скільки триває нанесення?',
        a: `Full Front ${front.duration.value.uk}, Full Body ${body.duration.value.uk}, точний план в оцінці.`,
      },
      { q: 'Яка гарантія?', a: `${years} роки на роботу, плюс гарантія виробника на плівку до ${film} років.` },
      { q: 'Які плівки?', a: `${join(ppfBrands, 'і')}; в оцінці вказуємо, яку радимо.` },
      { q: 'Як мити авто з PPF?', a: ppfCare.value.uk },
    ] satisfies Faq[],
    cta: { title: 'Оцінка для PPF?', text: 'Надішліть марку, модель і рік випуску. Отримаєте ціну під ваше авто.' } satisfies CtaBand,
  },
} satisfies Record<Locale, unknown>;

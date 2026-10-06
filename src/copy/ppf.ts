// PPF (/ppf/, /uk/ppf/). Prompt «PPF v2 за макетом» 06.10.2026, mockup «VG Site 02 PPF v2».
// Prices, durations, care, warranties and brands come from services.ts and site.ts, so every
// default shows up in `npm run check:defaults` (D15).
import { trust } from '../config/site.ts';
import { euro, type Locale } from '../data/fact.ts';
import { ppfCare, ppfPackages } from '../data/services.ts';
import { join, type CtaBand, type Faq, type TrustIcon } from './shared.ts';

const [front, body, custom] = ppfPackages;
const years = trust.workWarrantyYears.value;
const brands = trust.brands.value;
const film = trust.ppfFilmWarranty.value;
const filmYears = film.years.map(String);
const price = { front: euro(front.price.amount), body: euro(body.price.amount), custom: euro(custom.price.amount) };

export const ppf = {
  nl: {
    title: 'PPF Vroomshoop: lakbescherming tegen steenslag | V Guard Studio',
    description: `PPF en steenslagfolie in Vroomshoop, Twente: Full Front vanaf ${price.front}, Full Body of losse delen. Voorbereiding in 5 stappen. Vraag een prijs voor jouw auto aan.`,
    h1: 'PPF in Vroomshoop: bescherm je lak tegen steenslag',
    sub: 'Transparante folie voor de voorkant, losse delen of de hele auto.',
    heroAlt: 'Auto bij de studio van V Guard Studio in Vroomshoop',
    whatsapp: 'Hoi V Guard, ik wil een prijs voor PPF op mijn auto.',
    chips: ['5 stappen voorbereiding', `${years} jaar garantie op werk`, join(brands, 'en')],
    answer:
      "PPF (paint protection film), ook lakbeschermingsfolie of steenslagfolie genoemd, is een transparante folie op de lak. De folie vangt steenslag en lichte krassen op. V Guard Studio in Vroomshoop brengt PPF aan voor auto's uit heel Twente.",
    packagesTitle: 'Kies hoeveel je beschermt',
    packagesNote: 'De prijs hangt af van model, lakconditie en dekking.',
    processTitle: 'Zo brengen we PPF aan',
    processSub: 'Kwaliteit boven snelheid.',
    galleryTitle: 'PPF van V Guard',
    trust: [
      { icon: 'shield', text: `${years} jaar garantie op ons werk.` },
      { icon: 'award', text: `Fabrieksgarantie op de folie: ${join(filmYears, 'of')} jaar, afhankelijk van het merk.` },
      ...(trust.certifiedPpf.value ? [{ icon: 'certificate' as const, text: 'Gecertificeerd voor het aanbrengen van PPF.' }] : []),
      { icon: 'layers', text: `Wij werken met folies van ${join(brands, 'en')}.` },
    ] satisfies { icon: TrustIcon; text: string }[],
    faq: [
      {
        q: 'Wat kost PPF voor mijn auto?',
        a: `Dat hangt af van het model, de conditie van de lak en hoeveel delen je laat beschermen. Full Front kost vanaf ${price.front}, Full Body vanaf ${price.body}, losse delen vanaf ${price.custom}. Stuur merk, model en bouwjaar, dan krijg je een prijs voor jouw auto.`,
      },
      {
        q: 'Is alleen de voorbumper genoeg?',
        a: 'De bumper vangt veel steenslag, maar de motorkap, voorschermen en spiegels worden ook geraakt. Met Full Front bescherm je de hele voorkant in één keer, zodat er geen onbeschermde randen midden op de motorkap zitten.',
      },
      {
        q: 'PPF of keramische coating?',
        a: 'Een keramische coating is een dunne, harde laag voor glans en makkelijker wassen. PPF is een dikkere folie die steenslag en krassen opvangt voordat ze de lak raken. Coating beschermt de glans, PPF beschermt de lak zelf.',
      },
      {
        q: 'Hoe lang duurt het aanbrengen?',
        a: `Full Front duurt meestal ${front.duration.value.nl}, Full Body ${body.duration.value.nl}. Bij de offerte hoor je wanneer je auto klaar is.`,
      },
      { q: 'Hoe onderhoud ik een auto met PPF?', a: ppfCare.value.nl },
      {
        q: 'Welke garantie krijg ik en wordt de folie geel?',
        a: `Op ons werk geven we ${years} jaar garantie. Op de folie geldt daarnaast de fabrieksgarantie van ${join(filmYears, 'of')} jaar, afhankelijk van het merk, ook tegen ${film.covers.nl}.`,
      },
      {
        q: 'Verbergt PPF bestaande steenslag?',
        a: 'Nee. Bestaande steenslag en krassen blijven onder de folie zichtbaar, want de folie is transparant. Wil je een strak resultaat, laat de schade dan eerst herstellen.',
      },
    ] satisfies Faq[],
    cta: {
      title: 'PPF voor jouw auto?',
      text: 'Uit Vroomshoop, Almelo, Hardenberg of Ommen? Stuur merk, model en bouwjaar.',
    } satisfies CtaBand,
  },
  uk: {
    title: 'PPF у Vroomshoop: антигравійна плівка на лак | V Guard Studio',
    description: `Антигравійна плівка PPF у Vroomshoop, Твенте: Full Front від ${price.front}, Full Body або окремі деталі. Підготовка у 5 кроків. Отримайте ціну для свого авто.`,
    h1: 'PPF у Vroomshoop: захист лаку від сколів',
    sub: 'Прозора плівка на передню частину, окремі деталі або все авто.',
    heroAlt: 'Авто біля студії V Guard Studio у Vroomshoop',
    whatsapp: 'Вітаю! Хочу дізнатися ціну PPF для мого авто.',
    chips: ['Підготовка у 5 кроків', `${years} роки гарантії на роботу`, join(brands, 'і')],
    answer:
      'PPF (paint protection film), або антигравійна плівка, нідерландською lakbeschermingsfolie чи steenslagfolie, це прозора плівка на лаку. Вона бере на себе сколи і дрібні подряпини. V Guard Studio у Vroomshoop наносить PPF на авто з усього Твенте.',
    packagesTitle: 'Оберіть, скільки захищати',
    packagesNote: 'Ціна залежить від моделі, стану лаку і площі покриття.',
    processTitle: 'Як ми наносимо PPF',
    processSub: 'Якість важливіша за швидкість.',
    galleryTitle: 'PPF від V Guard',
    trust: [
      { icon: 'shield', text: `${years} роки гарантії на нашу роботу.` },
      { icon: 'award', text: `Гарантія виробника на плівку: ${join(filmYears, 'або')} років залежно від бренду.` },
      ...(trust.certifiedPpf.value ? [{ icon: 'certificate' as const, text: 'Сертифікат на нанесення PPF.' }] : []),
      { icon: 'layers', text: `Працюємо з плівками ${join(brands, 'і')}.` },
    ] satisfies { icon: TrustIcon; text: string }[],
    faq: [
      {
        q: 'Скільки коштує PPF для мого авто?',
        a: `Це залежить від моделі, стану лаку і кількості деталей, які захищаємо. Full Front від ${price.front}, Full Body від ${price.body}, окремі деталі від ${price.custom}. Надішліть марку, модель і рік, і отримаєте ціну саме для свого авто.`,
      },
      {
        q: 'Чи вистачить захистити лише бампер?',
        a: 'Бампер ловить багато сколів, але капот, крила і дзеркала теж страждають. Full Front захищає всю передню частину за раз, без незахищених країв посеред капота.',
      },
      {
        q: 'PPF чи керамічне покриття?',
        a: 'Керамічне покриття це тонкий твердий шар для блиску і легшого миття. PPF це товща плівка, яка приймає сколи й подряпини замість лаку. Покриття береже блиск, PPF береже сам лак.',
      },
      {
        q: 'Скільки триває нанесення?',
        a: `Full Front зазвичай ${front.duration.value.uk}, Full Body ${body.duration.value.uk}. Точний термін назвемо разом з оцінкою.`,
      },
      { q: 'Як доглядати авто з PPF?', a: ppfCare.value.uk },
      {
        q: 'Яка гарантія і чи жовтіє плівка?',
        a: `На нашу роботу ${years} роки гарантії. На плівку додатково діє гарантія виробника ${join(filmYears, 'або')} років залежно від бренду, зокрема від ${film.covers.uk}.`,
      },
      {
        q: 'Чи сховає PPF наявні сколи?',
        a: 'Ні. Наявні сколи й подряпини лишаються видимими під плівкою, бо вона прозора. Для рівного результату пошкодження спершу варто усунути.',
      },
    ] satisfies Faq[],
    cta: {
      title: 'PPF для вашого авто?',
      text: 'З Vroomshoop, Almelo, Hardenberg чи Ommen? Надішліть марку, модель і рік.',
    } satisfies CtaBand,
  },
} satisfies Record<Locale, unknown>;

// PPF (/ppf/, /uk/ppf/). Prompt «PPF v2 за макетом» 06.10.2026, mockup «VG Site 02 PPF v2».
// Prices, durations, care, warranties and brands come from services.ts and site.ts, so every
// default shows up in `npm run check:defaults` (D15).
import { trust } from '../config/site.ts';
import { euro, type Locale } from '../data/fact.ts';
import { ppfCare, ppfPackages } from '../data/services.ts';
import { headings, join, type CtaBand, type Faq, type Step, type TrustIcon } from './shared.ts';

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
    h1: 'PPF in Vroomshoop: bescherm je autolak tegen steenslag',
    sub: 'Transparante beschermfolie voor de voorzijde, losse onderdelen of de hele auto.',
    heroAlt: 'Auto bij de studio van V Guard Studio in Vroomshoop',
    whatsapp: 'Hoi V Guard, ik wil een prijs voor PPF op mijn auto.',
    chips: ['Aanbrengen in 5 stappen', `${years} jaar garantie op montage`, join(brands, 'en')],
    answer:
      "PPF (Paint Protection Film), ook wel lakbeschermingsfolie genoemd, beschermt je autolak tegen steenslag en lichte krassen. V Guard Studio in Vroomshoop brengt PPF aan op auto's van klanten uit heel Twente.",
    packagesTitle: 'Kies jouw PPF-pakket',
    packagesNote: 'De prijs hangt af van het automodel, de staat van de lak en het te beschermen oppervlak.',
    processTitle: 'Zo brengen wij PPF aan',
    processSub: 'Kwaliteit boven snelheid.',
    // PPF only: Home keeps the shared prepSteps wording.
    steps: [
      { title: 'Wassen', text: 'We reinigen de auto grondig in meerdere stappen.' },
      { title: 'Kleibehandeling', text: 'Met speciale reinigingsklei verwijderen we hardnekkig vuil van het lakoppervlak.' },
      { title: 'Ontvetten', text: 'We ontvetten de lak voor een goede hechting van de folie.' },
      { title: 'Aanbrengen', text: 'We brengen de folie zorgvuldig aan op de voorbereide lak.' },
      { title: 'Controle', text: 'We controleren de randen en het oppervlak voordat je de auto ophaalt.' },
    ] satisfies Step[],
    galleryTitle: 'PPF van V Guard',
    trust: [
      { icon: 'shield', text: `${years} jaar garantie op de montage.` },
      { icon: 'award', text: `Fabrieksgarantie op de folie: ${join(filmYears, 'of')} jaar, afhankelijk van het merk.` },
      ...(trust.certifiedPpf.value ? [{ icon: 'certificate' as const, text: 'Gecertificeerd voor het aanbrengen van PPF.' }] : []),
      { icon: 'layers', text: `Wij werken met folies van ${join(brands, 'en')}.` },
    ] satisfies { icon: TrustIcon; text: string }[],
    faq: [
      {
        q: 'Wat kost PPF voor mijn auto?',
        a: `De prijs hangt af van je automodel, de staat van de lak en het te beschermen oppervlak. Full Front vanaf ${price.front}, Full Body vanaf ${price.body} en losse onderdelen vanaf ${price.custom}. Stuur je merk, model en bouwjaar door voor een prijs op maat.`,
      },
      {
        q: 'Is alleen de voorbumper beschermen voldoende?',
        a: 'De bumper vangt veel steenslag, maar de motorkap, voorschermen en spiegels worden ook geraakt. Met Full Front bescherm je de hele voorkant in één keer, zodat er geen onbeschermde randen midden op de motorkap zitten.',
      },
      {
        q: 'PPF of keramische coating?',
        a: 'Een keramische coating is een dunne, harde laag voor glans en makkelijker wassen. PPF is een dikkere folie die steenslag en krassen opvangt voordat ze de lak raken. Coating beschermt de glans, PPF beschermt de lak zelf.',
      },
      {
        q: 'Hoe lang duurt het aanbrengen van PPF?',
        a: `Full Front duurt meestal ${front.duration.value.nl}, Full Body ${body.duration.value.nl}. Bij de offerte hoor je wanneer je auto klaar is.`,
      },
      { q: 'Hoe onderhoud ik een auto met PPF?', a: ppfCare.value.nl },
      {
        q: 'Welke garantie krijg ik? Kan de folie vergelen?',
        a: `Op ons werk geven we ${years} jaar garantie. Op de folie geldt daarnaast de fabrieksgarantie van ${join(filmYears, 'of')} jaar, afhankelijk van het merk, ook tegen ${film.covers.nl}.`,
      },
      {
        q: 'Maakt PPF bestaande steenslagschade onzichtbaar?',
        a: 'Nee. Bestaande steenslag en krassen blijven onder de folie zichtbaar, want de folie is transparant. Wil je een strak resultaat, laat de schade dan eerst herstellen.',
      },
    ] satisfies Faq[],
    faqTitle: headings.faq.nl,
    cta: {
      title: 'Jouw auto beschermen met PPF?',
      text: 'Woon je in Vroomshoop, Almelo, Hardenberg of Ommen? Stuur je merk, model en bouwjaar door.',
    } satisfies CtaBand,
  },
  uk: {
    title: 'PPF у Vroomshoop: антигравійна плівка на лак | V Guard Studio',
    description: `Антигравійна плівка PPF у Vroomshoop, Твенте: Full Front від ${price.front}, Full Body або окремі деталі. Монтаж у 5 етапів. Отримайте ціну для свого авто.`,
    h1: 'PPF у Vroomshoop: захист кузова від сколів',
    sub: 'Прозора захисна плівка для передньої частини, окремих деталей або всього авто.',
    heroAlt: 'Авто біля студії V Guard Studio у Vroomshoop',
    whatsapp: 'Вітаю! Хочу дізнатися ціну PPF для мого авто.',
    chips: ['Монтаж у 5 етапів', `${years} роки гарантії на монтаж`, join(brands, 'і')],
    answer:
      'PPF (Paint Protection Film), або антигравійна плівка, захищає лакофарбове покриття від сколів і дрібних подряпин. V Guard Studio у Vroomshoop встановлює PPF для клієнтів із регіону Twente.',
    packagesTitle: 'Оберіть рівень захисту',
    packagesNote: 'Ціна залежить від моделі авто, стану покриття та площі захисту.',
    processTitle: 'Як ми встановлюємо PPF',
    processSub: 'Якість важливіша за швидкість.',
    // PPF only: Home keeps the shared prepSteps wording.
    steps: [
      { title: 'Миття', text: 'Ретельно миємо автомобіль і видаляємо забруднення.' },
      { title: 'Очищення глиною', text: 'Спеціальна глина видаляє стійкі забруднення з поверхні кузова.' },
      { title: 'Знежирення', text: 'Знежирюємо поверхню для надійного зчеплення плівки.' },
      { title: 'Монтаж', text: 'Встановлюємо плівку на підготовлену поверхню.' },
      { title: 'Перевірка', text: 'Перевіряємо краї та поверхню плівки перед видачею авто.' },
    ] satisfies Step[],
    galleryTitle: 'PPF від V Guard',
    trust: [
      { icon: 'shield', text: `${years} роки гарантії на монтаж.` },
      { icon: 'award', text: `Гарантія виробника на плівку: ${join(filmYears, 'або')} років залежно від бренду.` },
      ...(trust.certifiedPpf.value ? [{ icon: 'certificate' as const, text: 'Сертифікат на встановлення PPF.' }] : []),
      { icon: 'layers', text: `Працюємо з плівками ${join(brands, 'і')}.` },
    ] satisfies { icon: TrustIcon; text: string }[],
    faq: [
      {
        q: 'Скільки коштує PPF для мого авто?',
        a: `Це залежить від моделі, стану лаку і площі захисту. Full Front від ${price.front}, Full Body від ${price.body}, окремі деталі від ${price.custom}. Надішліть марку, модель і рік випуску, і ми розрахуємо вартість.`,
      },
      {
        q: 'Чи достатньо захистити лише бампер?',
        a: 'Бампер ловить багато сколів, але капот, крила і дзеркала теж страждають. Full Front захищає всю передню частину за раз, без незахищених країв посеред капота.',
      },
      {
        q: 'PPF чи керамічне покриття?',
        a: 'Керамічне покриття це тонкий твердий шар для блиску і легшого миття. PPF це товща плівка, яка приймає сколи й подряпини замість лаку. Покриття береже блиск, PPF береже сам лак.',
      },
      {
        q: 'Скільки триває встановлення PPF?',
        a: `Full Front зазвичай ${front.duration.value.uk}, Full Body ${body.duration.value.uk}. Точний термін назвемо разом з оцінкою.`,
      },
      { q: 'Як доглядати за авто з PPF?', a: ppfCare.value.uk },
      {
        q: 'Яка гарантія і чи жовтіє плівка?',
        a: `На нашу роботу ${years} роки гарантії. На плівку додатково діє гарантія виробника ${join(filmYears, 'або')} років залежно від бренду, зокрема від ${film.covers.uk}.`,
      },
      {
        q: 'Чи приховає PPF наявні сколи?',
        a: 'Ні. Наявні сколи й подряпини лишаються видимими під плівкою, бо вона прозора. Для рівного результату пошкодження спершу варто усунути.',
      },
    ] satisfies Faq[],
    faqTitle: 'Поширені запитання',
    cta: {
      title: 'Хочете захистити авто PPF?',
      text: 'Ви з Vroomshoop, Almelo, Hardenberg чи Ommen? Надішліть марку, модель і рік випуску авто.',
    } satisfies CtaBand,
  },
} satisfies Record<Locale, unknown>;

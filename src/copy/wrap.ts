// Car wrapping (/car-wrapping/, /uk/obkleiuvannia/). NL verbatim from mockup «VG Site 04 Car
// wrapping v2»; UA native terms from step W3 («обклеювання плівкою», not «car wrapping»).
// Prices, durations and brands come from services.ts and site.ts.
import { features, site, trust } from '../config/site.ts';
import type { Locale } from '../data/fact.ts';
import { euro } from '../data/fact.ts';
import { wrap, wrapBase, wrapParts } from '../data/services.ts';
import { headings, type CtaBand, type Faq } from './shared.ts';

const full = euro(wrapBase.amount);
const chrome = euro(wrapParts.find((p) => p.id === 'chroom')!.price.amount);
const years = trust.workWarrantyYears.value;
/** D19: with the configurator off, hero, meta and step 1 point to the quote form instead. */
const cfgOn = features.wrapConfigurator;
const brands = wrap.brands.value;

export interface WrapCopy {
  title: string;
  description: string;
  h1: string;
  sub: string;
  /** Hero primary button: «Stel je wrap samen» (configurator) or the quote form. */
  ctaBuild: string;
  chips: string[];
  proof: { icon: 'shield' | 'layers' | 'eye' | 'pin'; text: string }[];
  answerTitle: string;
  answer: string;
  cfg: {
    title: string;
    sub: string;
    stepBody: string;
    stepParts: string;
    stepFinish: string;
    stepColor: string;
    full: string;
    parts: string;
    included: string;
    pakketTitle: string;
    pakketText: string;
    illustration: string;
    rows: { body: string; parts: string; finish: string; color: string };
    priceLabel: string;
    priceNote: string;
    from: string;
    onRequest: string;
    noParts: string;
    order: string;
    orderOnRequest: string;
    whatsapp: string;
    pakketParts: string;
    nothingYet: string;
    waIntro: string;
    stillAlt: string;
    previewAlt: string;
    fallbackFull: string;
    fallbackParts: string;
    fallbackVan: string;
  };
  cardsTitle: string;
  cardButton: string;
  cardsNote: string;
  finishesTitle: string;
  compareTitle: string;
  compareCols: [string, string];
  compare: { k: string; w: string; o: string }[];
  comparePpf: [string, string];
  recentTitle: string;
  recentMore: string;
  stepsTitle: string;
  steps: { icon: 'sliders' | 'chat' | 'shield' | 'flag'; text: string }[];
  faq: Faq[];
  /** FAQ heading; UA wrap page has its own wording. */
  faqTitle: string;
  cta: CtaBand;
}

export const wrapCopy: Record<Locale, WrapCopy> = {
  nl: {
    title: 'Car wrapping, auto wrappen en ontchromen in Vroomshoop | V Guard Studio',
    description: cfgOn
      ? `Auto wrappen in Vroomshoop: volledige wrap vanaf ${full}, ontchromen vanaf ${chrome}, dak en spiegelkappen. Stel je wrap samen en zie je prijsindicatie.`
      : `Auto wrappen in Vroomshoop: volledige wrap vanaf ${full}, ontchromen vanaf ${chrome}, dak en spiegelkappen. Bekijk finishes en ons werk.`,
    h1: 'Car wrapping in Vroomshoop: nieuwe kleur zonder overspuiten',
    sub: cfgOn
      ? 'Volledig of alleen dak, spiegels en chroom. Zie direct je prijsindicatie.'
      : 'Volledig of alleen dak, spiegels en chroom. Vaste prijs na je aanvraag.',
    ctaBuild: cfgOn ? 'Stel je wrap samen' : 'Offerte aanvragen',
    chips: [`${years} jaar garantie`, `Volledige wrap vanaf ${full}`, `Ontchromen vanaf ${chrome}`],
    proof: [
      { icon: 'shield', text: `${years} jaar garantie op het werk` },
      { icon: 'layers', text: `Folie van ${brands.join(' en ')}` },
      { icon: 'eye', text: 'Lak vooraf gecontroleerd' },
      { icon: 'pin', text: 'Studio in Vroomshoop, Twente' },
    ],
    answerTitle: 'Wat is car wrapping',
    answer:
      "Car wrapping (auto wrappen) is je auto bekleden met gekleurde folie: volledig of alleen dak, spiegelkappen of chroom. De originele lak blijft eronder, zodat je later terug kunt naar de originele kleur. V Guard Studio wrapt auto's in Vroomshoop.",
    cfg: {
      title: 'Stel je wrap samen',
      sub: 'Kies je auto, kleur en delen. Je ziet direct hoe het eruitziet en wat het ongeveer kost.',
      stepBody: 'A · Je auto',
      stepParts: 'B · Wat wrappen we?',
      stepFinish: 'C · Finish',
      stepColor: 'D · Kleur',
      full: 'Volledige wrap',
      parts: 'Losse delen',
      included: 'inbegrepen',
      pakketTitle: 'Black styling pakket',
      pakketText: 'Dak, spiegelkappen en chroom in zwart',
      illustration: 'Illustratie. De echte kleur zie je op stalen in de studio.',
      rows: { body: 'Auto', parts: 'Delen', finish: 'Finish', color: 'Kleur' },
      priceLabel: 'Prijsindicatie',
      priceNote: 'Vaste prijs na je aanvraag.',
      from: 'vanaf',
      onRequest: 'Prijs op aanvraag',
      noParts: 'Kies minimaal één deel',
      order: 'Deze wrap aanvragen',
      orderOnRequest: 'Offerte aanvragen',
      whatsapp: 'Verstuur via WhatsApp',
      pakketParts: 'Black styling pakket: dak, spiegelkappen, chroom',
      nothingYet: 'Nog geen delen gekozen',
      waIntro: 'Hallo V Guard Studio, ik heb op de website een wrap samengesteld.',
      stillAlt: 'Illustratie van een witte sedan in zijaanzicht',
      previewAlt: 'Illustratie van je wrap',
      fallbackFull: 'Volledige wrap per carrosserie',
      fallbackParts: 'Losse delen',
      fallbackVan: 'personenbus en touringcar',
    },
    cardsTitle: 'Wat wil je laten wrappen?',
    cardButton: 'Aanvragen',
    cardsNote: 'Prijzen incl. btw. Eindprijs hangt af van auto, folie en delen.',
    finishesTitle: 'Finishes',
    compareTitle: 'Wrappen of overspuiten?',
    compareCols: ['Wrappen', 'Overspuiten'],
    compare: [
      { k: 'Terug naar de originele kleur', w: 'Ja, folie eraf', o: 'Alleen door opnieuw te spuiten' },
      { k: 'Originele lak blijft behouden', w: 'Ja', o: 'Nee' },
      { k: 'Auto weg', w: 'Een paar dagen', o: 'Vaak langer' },
      { k: 'Alleen dak of chroom', w: 'Ja, los te kiezen', o: 'Lastig' },
    ],
    comparePpf: ['Wil je je lak ook tegen steenslag beschermen?', 'Kijk naar PPF.'],
    recentTitle: 'Recent opgeleverd',
    recentMore: 'Bekijk alle projecten',
    stepsTitle: 'Zo werkt het',
    steps: [
      { icon: 'sliders', text: cfgOn ? "Stel samen of stuur foto's" : "Stuur foto's of vraag een offerte aan" },
      { icon: 'chat', text: 'Offerte op maat via WhatsApp' },
      { icon: 'shield', text: 'Lak checken en voorbereiden' },
      { icon: 'flag', text: 'Ophalen in je nieuwe kleur' },
    ],
    faq: [
      {
        q: 'Hoe lang staat mijn auto bij jullie?',
        a: `Een volledige wrap duurt ${wrap.fullDuration.value.nl}, een dak of spiegelkappen meestal ${wrap.partsDuration.value.nl}.`,
      },
      {
        q: 'Hoe lang gaat een wrap mee?',
        a: `Bij goed onderhoud ${wrap.lifetime.value.nl}, afhankelijk van folie en gebruik.`,
      },
      {
        q: 'Beschadigt een wrap de lak?',
        a: 'Op originele lak in goede staat laat folie bij vakkundig verwijderen meestal los zonder schade. Bij overgespoten of beschadigde lak is er meer risico; daarom bekijken we de lak vooraf.',
      },
      {
        q: 'Moet ik een nieuwe kleur doorgeven aan de RDW?',
        a: 'Ja. Verandert de kleur van je auto door een wrap, ook tijdelijk, dan geef je de nieuwe kleur door aan de RDW. Dat is gratis en kan online met DigiD.',
      },
      {
        q: 'Beschermt een wrap tegen steenslag?',
        a: 'Een wrap verandert vooral de look en beschermt weinig tegen steenslag. Daarvoor is PPF bedoeld.',
      },
      {
        q: 'Kan ik de kleur eerst zien?',
        a: `Ja, in de studio liggen stalen.${wrap.proefstuk.value ? ' Je kunt ook een proefstuk op je auto laten zetten.' : ''}`,
      },
      {
        q: 'Kan ik een leaseauto laten wrappen?',
        a: 'Vaak wel, met toestemming van je leasemaatschappij. Vraag het vooraf na en laat de wrap verwijderen voordat je de auto inlevert.',
      },
      {
        q: 'Wat kost een wrap?',
        a: `Een volledige wrap begint bij ${full}, ontchromen bij ${chrome}. Je krijgt een vaste prijs na je aanvraag.`,
      },
    ],
    faqTitle: headings.faq.nl,
    cta: {
      title: 'Klaar voor een nieuwe kleur?',
      text: `Stuur merk, model en je idee. Je krijgt ${site.responseTime.value.nl} een offerte.`,
    },
  },
  uk: {
    title: 'Обклеювання авто плівкою у Vroomshoop | V Guard Studio',
    description: cfgOn
      ? `Обклеювання авто плівкою у Vroomshoop: повне від ${full}, антихром від ${chrome}, дах і дзеркала. Зберіть свій варіант і подивіться ціну.`
      : `Обклеювання авто плівкою у Vroomshoop: повне від ${full}, антихром від ${chrome}, дах і дзеркала. Фініші та наші роботи.`,
    h1: 'Обклеювання авто плівкою у Vroomshoop: зміна кольору без фарбування',
    sub: cfgOn
      ? 'Повністю або лише дах, дзеркала і хром. Одразу побачите орієнтовну ціну.'
      : 'Увесь кузов або окремі деталі: дах, дзеркала, хром. Точна вартість після заявки.',
    ctaBuild: cfgOn ? 'Зібрати свій варіант' : 'Дізнатися вартість',
    chips: [`${years} роки гарантії`, `Повне обклеювання від ${full}`, `Антихром від ${chrome}`],
    proof: [
      { icon: 'shield', text: `${years} роки гарантії на монтаж` },
      { icon: 'layers', text: `Плівки ${brands.join(' та ')}` },
      { icon: 'eye', text: 'Перевіряємо стан покриття перед монтажем' },
      { icon: 'pin', text: 'Студія у Vroomshoop, регіон Twente' },
    ],
    answerTitle: 'Що таке обклеювання авто плівкою',
    answer:
      'Обклеювання авто (car wrapping) це зміна кольору кузова за допомогою вінілової плівки. Можна обклеїти весь автомобіль або окремі деталі. Заводське покриття залишається під плівкою, а після її зняття можна повернути початковий колір. V Guard Studio виконує обклеювання авто у Vroomshoop.',
    cfg: {
      title: 'Зберіть свій варіант',
      sub: 'Оберіть авто, колір і деталі. Одразу побачите, як це виглядає і скільки приблизно коштує.',
      stepBody: 'A · Ваше авто',
      stepParts: 'B · Що обклеюємо?',
      stepFinish: 'C · Фініш',
      stepColor: 'D · Колір',
      full: 'Повне обклеювання',
      parts: 'Окремі деталі',
      included: 'включено',
      pakketTitle: 'Антихром-пакет',
      pakketText: 'Дах, дзеркала і хром у чорному',
      illustration: 'Ілюстрація. Справжній колір можна побачити на зразках у студії.',
      rows: { body: 'Авто', parts: 'Деталі', finish: 'Фініш', color: 'Колір' },
      priceLabel: 'Орієнтовна ціна',
      priceNote: 'Фіксовану ціну назвемо після заявки.',
      from: 'від',
      onRequest: 'Ціна за запитом',
      noParts: 'Оберіть хоча б одну деталь',
      order: 'Замовити цей варіант',
      orderOnRequest: 'Дізнатися вартість',
      whatsapp: 'Надіслати у WhatsApp',
      pakketParts: 'Антихром-пакет: дах, дзеркала, хром',
      nothingYet: 'Деталі ще не обрано',
      waIntro: 'Вітаю, V Guard Studio! Ось мій варіант обклеювання з сайту.',
      stillAlt: 'Ілюстрація: білий седан збоку',
      previewAlt: 'Ілюстрація вашого варіанта',
      fallbackFull: 'Повне обклеювання за типом кузова',
      fallbackParts: 'Окремі деталі',
      fallbackVan: 'мікроавтобус і автобус',
    },
    cardsTitle: 'Варіанти обклеювання',
    cardButton: 'Дізнатися вартість',
    cardsNote: 'Ціни з ПДВ. Остаточна вартість залежить від моделі авто, типу плівки та площі покриття.',
    finishesTitle: 'Види покриття',
    compareTitle: 'Обклеювання плівкою чи фарбування?',
    compareCols: ['Обклеїти', 'Перефарбувати'],
    compare: [
      { k: 'Відновити початковий колір', w: 'Так, після зняття плівки', o: 'Потрібне повторне фарбування' },
      { k: 'Заводське покриття зберігається', w: 'Так', o: 'Ні' },
      { k: 'Тривалість робіт', w: 'Кілька днів', o: 'Зазвичай довше' },
      { k: 'Окремі деталі кузова', w: 'Так', o: 'Можливо, але складніше' },
    ],
    comparePpf: ['Хочете також захистити кузов від сколів?', 'Дізнайтеся більше про захисну плівку PPF.'],
    recentTitle: 'Нещодавні роботи',
    recentMore: 'Переглянути всі роботи',
    stepsTitle: 'Етапи роботи',
    steps: [
      { icon: 'sliders', text: cfgOn ? 'Зберіть варіант або надішліть фото' : 'Надішліть фото авто або залиште заявку' },
      { icon: 'chat', text: 'Розрахунок вартості через WhatsApp' },
      { icon: 'shield', text: 'Огляд і підготовка кузова' },
      { icon: 'flag', text: 'Отримуєте авто в новому кольорі' },
    ],
    faq: [
      {
        q: 'Скільки триває обклеювання авто?',
        a: `Повне обклеювання займає ${wrap.fullDuration.value.uk}, дах або дзеркала зазвичай ${wrap.partsDuration.value.uk}.`,
      },
      {
        q: 'Який термін служби плівки?',
        a: `За доброго догляду ${wrap.lifetime.value.uk}, залежно від плівки і використання.`,
      },
      {
        q: 'Чи пошкоджує плівка заводське покриття?',
        a: 'З оригінального лаку в доброму стані плівка при правильному знятті зазвичай сходить без шкоди. Перефарбований чи пошкоджений лак ризикованіший, тому ми оглядаємо лак заздалегідь.',
      },
      {
        q: 'Чи потрібно повідомляти RDW про зміну кольору авто?',
        a: 'Так. Якщо плівка змінює колір авто, навіть тимчасово, новий колір треба передати в RDW. Це безкоштовно і робиться онлайн через DigiD.',
      },
      {
        q: 'Чи захищає плівка від сколів?',
        a: 'Кольорова плівка насамперед змінює вигляд і мало захищає від сколів. Для цього є PPF, прозора антигравійна плівка.',
      },
      {
        q: 'Чи можна заздалегідь побачити колір плівки?',
        a: `Так, у студії є зразки.${wrap.proefstuk.value ? ' Можна також наклеїти пробний шматок на ваше авто.' : ''}`,
      },
      {
        q: 'Чи можна обклеїти автомобіль у лізингу?',
        a: 'Часто так, зі згоди лізингової компанії. Уточніть заздалегідь і зніміть плівку перед поверненням авто.',
      },
      {
        q: 'Скільки коштує обклеювання?',
        a: `Повне обклеювання від ${full}, антихром від ${chrome}. Фіксовану ціну назвемо після заявки.`,
      },
    ],
    faqTitle: 'Поширені запитання',
    cta: {
      title: 'Хочете змінити колір авто?',
      text: `Надішліть марку, модель та побажання щодо кольору. Розрахуємо вартість ${site.responseTime.value.uk}.`,
    },
  },
};

// Services, packages, body types, form options and prices. The only place prices live
// (Site Truth section 6). A price renders when priceStatus is 'confirmed' or, until launch,
// 'default' (owner decision R2). Hints from «value | hint» marker stay here and in check:defaults.
import { features } from '../config/site.ts';
import { euro, fact, type Fact, type Locale, type Localized, type Status } from './fact.ts';

export type PriceStatus = 'confirmed' | 'spoken' | 'default' | 'dormant' | 'none';
export type ServiceSlug = 'ppf' | 'ramen-blinderen' | 'car-wrapping';
export type { Localized };

export interface Price {
  amount: number;
  status: PriceStatus;
  hint?: string;
  /** «vanaf €199» */
  from?: boolean;
  /** «+€99» (surcharge on top of the base price) */
  plus?: boolean;
}

const price = (amount: number, status: PriceStatus, hint?: string, opts: Pick<Price, 'from' | 'plus'> = {}): Price => ({
  amount,
  status,
  hint,
  ...opts,
});

export function isPriceShown(p: Price | undefined): p is Price {
  return p !== undefined && (p.status === 'confirmed' || p.status === 'default');
}

/** «vanaf €129» / «від €129» */
export function fromLabel(p: Price, locale: Locale): string {
  return `${locale === 'nl' ? 'vanaf' : 'від'} ${euro(p.amount)}`;
}

/** Table cell: «€129», «+€99», «vanaf €199». */
export function cellLabel(p: Price, locale: Locale): string {
  if (p.plus) return `+${euro(p.amount)}`;
  if (p.from) return fromLabel(p, locale);
  return euro(p.amount);
}

export interface ServiceOption {
  id: string;
  label: Localized;
  /** Shown only for this service in the quote form (e.g. Touringcar for car wrapping). */
  only?: ServiceSlug;
}

export interface Service {
  slug: ServiceSlug;
  order: number;
  /** Short name: nav, form, Telegram. */
  label: Localized;
  /** Option ids for quote form step 3 (Blueprint v1.3 section 6). */
  options: ServiceOption[];
}

// Order per block specs: PPF, ramen blinderen, car wrapping (F3, F4).
export const services: Service[] = [
  {
    slug: 'ppf',
    order: 1,
    label: { nl: 'PPF', uk: 'PPF' },
    options: [
      { id: 'full-front', label: { nl: 'Full Front', uk: 'Full Front' } },
      { id: 'full-body', label: { nl: 'Full Body', uk: 'Full Body' } },
      { id: 'gedeeltelijk', label: { nl: 'Custom (losse delen)', uk: 'Custom (окремі деталі)' } },
    ],
  },
  {
    slug: 'ramen-blinderen',
    order: 2,
    label: { nl: 'Ramen blinderen', uk: 'Тонування' },
    options: [
      { id: 'achterzijde', label: { nl: 'Achterzijde', uk: 'Задня частина' } },
      // D14: front side windows shown as a V Guard service; legal text only from F10, F10b
      { id: 'voorste-zijruiten', label: { nl: 'Voorste zijruiten (binnen 55%)', uk: 'Передні бічні (у межах 55%)' } },
      { id: 'chameleon', label: { nl: 'Chameleon', uk: 'Chameleon' } },
    ],
  },
  {
    slug: 'car-wrapping',
    order: 3,
    // UA: native term «обклеювання плівкою», not «car wrapping» (step W3).
    label: { nl: 'Car wrapping', uk: 'Обклеювання плівкою' },
    // Step W4: «Losse delen» holds checkboxes for the parts (wrapFormParts); the colour or
    // finish goes into the separate «kleur» field of step 3.
    options: [
      { id: 'volledig', label: { nl: 'Volledige wrap', uk: 'Повне обклеювання' } },
      { id: 'pakket', label: { nl: 'Black styling pakket', uk: 'Антихром-пакет' } },
      { id: 'delen', label: { nl: 'Losse delen', uk: 'Окремі деталі' } },
      { id: 'anders', label: { nl: 'Iets anders', uk: 'Інше' } },
    ],
  },
];

// Extra choice in quote form step 1; has no options step.
export const adviceOption = { id: 'advies', label: { nl: 'Ik wil advies', uk: 'Потрібна порада' } } as const;

export const bodyTypes: ServiceOption[] = [
  { id: 'hatchback', label: { nl: 'Hatchback', uk: 'Хетчбек' } },
  { id: 'sedan', label: { nl: 'Sedan', uk: 'Седан' } },
  { id: 'stationwagon', label: { nl: 'Stationwagon', uk: 'Універсал' } },
  { id: 'coupe', label: { nl: 'Coupé', uk: 'Купе' } },
  { id: 'suv', label: { nl: 'SUV', uk: 'SUV' } },
  // One item for vans and passenger buses, all services (step W4).
  { id: 'bus', label: { nl: 'Bus / personenbus', uk: 'Бус / мікроавтобус' } },
  { id: 'touringcar', label: { nl: 'Touringcar', uk: 'Автобус' }, only: 'car-wrapping' },
  { id: 'anders', label: { nl: 'Anders', uk: 'Інше' } },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

// ---------------------------------------------------------------- PPF

export interface Package {
  id: string;
  /** Quote form option preselected by the card button. */
  formOption: string;
  title: Localized;
  description: Localized;
  /** Silhouette highlight on the package card: front, whole body or spots (mockup PPF v2). */
  highlight: 'front' | 'full' | 'spots';
  zones: Fact<Localized<string[]>>;
  /** Priced single parts (quote form step 3); the card shows zones and the lowest price. */
  parts?: { label: Localized; price: Price }[];
  price: Price;
  duration: Fact<Localized>;
}

const ppfParts = [
  { label: { nl: 'Koplampen', uk: 'Фари' }, price: price(99, 'default', 'ціни за деталь', { from: true }) },
  { label: { nl: 'Instaplijsten', uk: 'Пороги' }, price: price(79, 'default', 'ціни за деталь', { from: true }) },
  {
    label: { nl: 'Laadrand achterbumper', uk: 'Край заднього бампера' },
    price: price(79, 'default', 'ціни за деталь', { from: true }),
  },
  { label: { nl: 'Spiegelkappen', uk: 'Корпуси дзеркал' }, price: price(79, 'default', 'ціни за деталь', { from: true }) },
];

/** «Bijv. koplampen», «instaplijsten», ... from the priced parts; no prefix: «Фари», «пороги», ... */
function partExamples(locale: Locale, prefix?: string): string[] {
  return ppfParts.map((p, i) => {
    const label = p.label[locale].toLowerCase();
    if (i > 0) return label;
    return prefix ? `${prefix} ${label}` : p.label[locale];
  });
}

export const ppfPackages: Package[] = [
  {
    id: 'full-front',
    formOption: 'full-front',
    title: { nl: 'Full Front', uk: 'Full Front' },
    description: {
      nl: 'De voorkant, waar de meeste steenslag terechtkomt.',
      uk: 'Захист передньої частини від каміння та сколів.',
    },
    highlight: 'front',
    zones: fact(
      {
        nl: ['Voorbumper', 'volledige motorkap', 'voorschermen', 'spiegelkappen', 'koplampen'],
        uk: ['Передній бампер', 'увесь капот', 'передні крила', 'корпуси дзеркал', 'фари'],
      },
      'default',
      'точні зони V Guard',
    ),
    price: price(895, 'default', 'Full Front, агресивний вхід; ринок ~€1.000-2.000', { from: true }),
    duration: fact({ nl: '1-2 werkdagen', uk: '1-2 робочі дні' }, 'default', 'тривалість V Guard'),
  },
  {
    id: 'full-body',
    formOption: 'full-body',
    title: { nl: 'Full Body', uk: 'Full Body' },
    description: { nl: 'Alle gelakte delen van de auto onder folie.', uk: 'Захист усіх пофарбованих деталей кузова.' },
    highlight: 'full',
    zones: fact(
      { nl: ['Alle gelakte carrosseriedelen'], uk: ['Усі пофарбовані деталі кузова'] },
      'default',
      'точні зони V Guard',
    ),
    price: price(2995, 'default', 'ринок ~€3.500-6.000', { from: true }),
    duration: fact({ nl: '3-5 werkdagen', uk: '3-5 робочих днів' }, 'default', 'тривалість V Guard'),
  },
  {
    id: 'gedeeltelijk',
    formOption: 'gedeeltelijk',
    title: { nl: 'Custom (losse delen)', uk: 'Custom (окремі деталі)' },
    description: { nl: 'Alleen de delen die jij kiest.', uk: 'Захист обраних деталей автомобіля.' },
    highlight: 'spots',
    // Zones = the priced parts, so «vanaf» matches the parts listed on the card.
    zones: fact(
      { nl: partExamples('nl', 'Bijv.'), uk: partExamples('uk') },
      'default',
      'деталі з ppfParts (ціни за деталь)',
    ),
    parts: ppfParts,
    price: price(Math.min(...ppfParts.map((p) => p.price.amount)), 'default', 'найнижча ціна за деталь', { from: true }),
    duration: fact({ nl: 'per onderdeel', uk: 'за деталь' }, 'default', 'тривалість V Guard'),
  },
];

export const ppfCare = fact<Localized>(
  {
    nl: 'Was de auto de eerste 7 dagen niet, zodat de folie goed hecht. Daarna kun je normaal wassen. Richt een hogedrukspuit niet direct op de randen van de folie.',
    uk: 'Перші 7 днів не мийте авто, щоб плівка добре схопилася. Далі мийте як звичайно. Не спрямовуйте мийку високого тиску прямо на краї плівки.',
  },
  'default',
  'догляд V Guard',
);

// ---------------------------------------------------------------- Ramen blinderen

export interface PriceRow {
  id: string;
  label: Localized;
  price: Price;
  formOption?: string;
}

const tintHint = 'нижній поріг ринку NL';
// Achterzijde (from the B-pillar, standard film), incl. btw.
export const tintBodyPrices: PriceRow[] = [
  { id: 'hatchback-3', label: { nl: 'Hatchback 3-deurs', uk: 'Тридверний хетчбек' }, price: price(129, 'default', `${tintHint}; V Guard озвучував €200 (P1)`) },
  { id: 'hatchback-5', label: { nl: 'Hatchback 5-deurs', uk: "П'ятидверний хетчбек" }, price: price(149, 'default', tintHint) },
  { id: 'sedan-coupe', label: { nl: 'Sedan / coupé', uk: 'Седан / купе' }, price: price(179, 'default', tintHint) },
  { id: 'stationwagon', label: { nl: 'Stationwagon', uk: 'Універсал' }, price: price(189, 'default', tintHint) },
  { id: 'suv', label: { nl: 'SUV', uk: 'SUV' }, price: price(199, 'default', tintHint) },
  { id: 'bus-mpv', label: { nl: 'Bus / MPV', uk: 'Мікроавтобус / мінівен' }, price: price(249, 'default', tintHint) },
  {
    id: 'tesla',
    label: { nl: 'Tesla Model 3 / Model Y', uk: 'Tesla Model 3 / Model Y' },
    price: price(179, 'default', 'EV-сегмент з ресерчу; без даху'),
  },
];

export const tintOptionPrices: PriceRow[] = [
  {
    id: 'voorste-zijruiten',
    formOption: 'voorste-zijruiten',
    label: { nl: 'Voorste zijruiten, lichte folie (minimaal 55%)', uk: 'Передні бічні вікна, світла плівка (світлопропускання від 55%)' },
    price: price(99, 'default', 'ринок €100-150', { plus: true }),
  },
  {
    id: 'keramisch',
    label: { nl: 'Keramische warmtewerende folie', uk: 'Керамічна плівка для захисту від спеки' },
    price: price(69, 'default', 'апгрейд, ринок +€70-100', { plus: true }),
  },
  { id: 'achterruit', label: { nl: 'Alleen achterruit', uk: 'Лише заднє скло' }, price: price(79, 'default') },
  {
    id: 'chameleon',
    formOption: 'chameleon',
    label: { nl: 'Chameleon voorruit', uk: 'Плівка Chameleon на лобове скло' },
    price: price(199, 'default', 'V Guard озвучував €500 (P3)', { from: true }),
  },
  {
    id: 'complete',
    label: { nl: 'Complete auto (achterzijde + voorste zijruiten)', uk: 'Усі вікна (задні та передні бічні)' },
    price: price(239, 'default', 'пакет зі знижкою; V Guard озвучував €450 (P2)', { from: true }),
  },
];

/** Lowest rear-side price, e.g. for «Achterzijde vanaf €129». */
export const tintFrom: Price = {
  ...tintBodyPrices.reduce((min, r) => (r.price.amount < min.price.amount ? r : min)).price,
  from: true,
};

export const tint = {
  shades: fact([5, 20, 35, 50, 70], 'default', 'відсотки V Guard'),
  popularShade: fact(20, 'default', 'найпопулярніший тон, V Guard'),
  duration: fact<Localized>({ nl: '2-3 uur', uk: '2-3 години' }, 'default', 'тривалість V Guard'),
  keepClosedDays: fact(3, 'default', 'V Guard'),
  care: fact<Localized>(
    {
      nl: 'Wacht een week met de binnenkant schoonmaken. Gebruik daarna een zachte doek en een schoonmaakmiddel zonder ammoniak.',
      uk: 'Тиждень не чіпайте внутрішній бік. Далі мʼяка ганчірка і засіб без аміаку.',
    },
    'default',
    'догляд V Guard',
  ),
  steps: fact<{ title: Localized; text: Localized }[]>(
    [
      {
        title: { nl: 'Advies', uk: 'Консультація' },
        text: { nl: 'We kiezen samen de tint en de ruiten.', uk: 'Допомагаємо обрати ступінь тонування та вікна.' },
      },
      {
        title: { nl: 'Reinigen', uk: 'Очищення' },
        text: { nl: 'Ruiten worden binnen en buiten grondig schoongemaakt.', uk: 'Ретельно очищуємо скло з обох боків.' },
      },
      {
        title: { nl: 'Op maat snijden', uk: 'Підготовка плівки' },
        text: { nl: 'De folie wordt per ruit op maat gemaakt.', uk: 'Точно підганяємо плівку під розміри кожного скла.' },
      },
      {
        title: { nl: 'Aanbrengen', uk: 'Монтаж' },
        text: { nl: 'Folie aan de binnenkant, daarna eindcontrole.', uk: 'Встановлюємо плівку зсередини та перевіряємо якість монтажу.' },
      },
    ],
    'default',
    'процес тонування V Guard, замінить клієнт',
  ),
};

// ---------------------------------------------------------------- Car wrapping
// Mockup «VG Site 04 Car wrapping v2» (step W3): configurator data, cards and page facts.
// Every price, factor and duration is a «value | hint» default from the mockup (R2).

export type WrapBodyId = 'hatch' | 'sedan' | 'station' | 'suv' | 'bus' | 'coach';
export type WrapPartId = 'dak' | 'spiegel' | 'chroom';
export type WrapFinishId = 'glans' | 'satijn' | 'mat' | 'metallic' | 'carbon';

export interface WrapBody {
  id: WrapBodyId;
  /** Quote form «carrosserie» id. */
  formBody: string;
  label: Localized;
  /** Factor on the hatchback base price. Missing: the base itself; null: price on request. */
  factor?: Fact<number | null>;
  /** Vans and buses have their own part prices. */
  van: boolean;
}

/** Volledige wrap on a hatchback; other bodies multiply it. */
export const wrapBase: Price = price(1795, 'default', 'Hatchback; ринок ~€2.000-3.500', { from: true });

/**
 * Defaults only the wrap configurator uses: 'dormant' while it is switched off (D19), so
 * check:defaults does not ask to confirm what is not on the site; 'default' when it is on.
 */
const configuratorStatus: Status = features.wrapConfigurator ? 'default' : 'dormant';

const factor = (value: number | null, hint = 'дефолт') => fact<number | null>(value, configuratorStatus, hint);

export const wrapBodies: WrapBody[] = [
  { id: 'hatch', formBody: 'hatchback', label: { nl: 'Hatchback', uk: 'Хетчбек' }, van: false },
  { id: 'sedan', formBody: 'sedan', label: { nl: 'Sedan', uk: 'Седан' }, factor: factor(1.1), van: false },
  {
    id: 'station',
    formBody: 'stationwagon',
    label: { nl: 'Stationwagon', uk: 'Універсал' },
    factor: factor(1.15),
    van: false,
  },
  { id: 'suv', formBody: 'suv', label: { nl: 'SUV', uk: 'Позашляховик (SUV)' }, factor: factor(1.3), van: false },
  {
    id: 'bus',
    formBody: 'bus',
    label: { nl: 'Personenbus', uk: 'Мікроавтобус' },
    factor: factor(1.5),
    van: true,
  },
  {
    id: 'coach',
    formBody: 'touringcar',
    label: { nl: 'Touringcar', uk: 'Автобус' },
    factor: factor(null, 'op aanvraag; автобус лише після оцінки'),
    van: true,
  },
];

export interface WrapPart {
  id: WrapPartId;
  /** Quote form checkbox under «Losse delen». */
  formPart: string;
  label: Localized;
  /** Label of the quote form checkbox. */
  formLabel: Localized;
  price: Price;
  /** Personenbus and touringcar; missing: same as price. */
  vanPrice?: Price;
}

export const wrapParts: WrapPart[] = [
  {
    id: 'dak',
    formPart: 'dak',
    label: { nl: 'Dak', uk: 'Дах' },
    formLabel: { nl: 'Dak', uk: 'Дах' },
    price: price(249, 'default', 'дах, легкове авто', { from: true }),
    vanPrice: price(349, configuratorStatus, 'дах, бус і автобус', { from: true }),
  },
  {
    id: 'spiegel',
    formPart: 'spiegelkappen',
    label: { nl: 'Spiegelkappen', uk: 'Дзеркала' },
    formLabel: { nl: 'Spiegelkappen', uk: 'Дзеркала' },
    price: price(69, 'default', 'ковпаки дзеркал, легкове авто', { from: true }),
    vanPrice: price(89, configuratorStatus, 'дзеркала, бус і автобус', { from: true }),
  },
  {
    id: 'chroom',
    formPart: 'chrome-delete',
    label: { nl: 'Chroom (ontchromen)', uk: 'Хром (антихром)' },
    formLabel: { nl: 'Chrome delete', uk: 'Антихром' },
    price: price(149, 'default', 'ринок від €175', { from: true }),
  },
];

/** Dak, spiegelkappen and chroom in black; not for a touringcar. */
export const wrapPakket: Price = price(395, 'default', 'Black styling pakket', { from: true });

/** Carbon look surcharge on the whole indication. */
export const wrapCarbonSurcharge = fact(0.1, configuratorStatus, 'Carbon look +10%');

export interface WrapFinish {
  id: WrapFinishId;
  label: Localized;
  /** Finishes tile: one line about the look. */
  text: Localized;
  image: Fact<string>;
}

/** AI illustration (D18): allowed in illustrative slots, never in the list of finished work. */
const illustration = (file: string) => fact(file, 'default', 'AI-ілюстрація (D18), замінити фото V Guard, коли буде');

export const wrapFinishes: WrapFinish[] = [
  {
    id: 'glans',
    label: { nl: 'Glans', uk: 'Глянець' },
    text: { nl: 'diep en spiegelend', uk: 'глибокий дзеркальний блиск' },
    image: illustration('wrap-fin-glans.png'),
  },
  {
    id: 'satijn',
    label: { nl: 'Satijn', uk: 'Сатин' },
    text: { nl: 'zachte glans, strak en modern', uk: 'мʼякий блиск, стримано і сучасно' },
    image: illustration('wrap-fin-satijn.png'),
  },
  {
    id: 'mat',
    label: { nl: 'Mat', uk: 'Мат' },
    text: { nl: 'geen reflectie, stoer', uk: 'без відблисків, брутально' },
    image: illustration('wrap-fin-mat.png'),
  },
  {
    id: 'metallic',
    label: { nl: 'Metallic', uk: 'Металік' },
    text: { nl: 'fijne schittering in het licht', uk: 'дрібні іскри на світлі' },
    image: illustration('wrap-fin-metallic.png'),
  },
  {
    id: 'carbon',
    label: { nl: 'Carbon look', uk: 'Під карбон' },
    text: { nl: 'structuur van koolstofvezel', uk: 'фактура вуглеволокна' },
    image: illustration('wrap-fin-carbon.png'),
  },
];

/** Which finishes V Guard offers (the list above). */
export const wrapFinishList = fact(
  wrapFinishes.map((f) => f.label.nl),
  'default',
  'фініші V Guard',
);

export interface WrapColor {
  name: string;
  hex: string;
}

/** Configurator swatches. Names and hex codes are mockup placeholders for V Guard's colours. */
export const wrapColors = fact<WrapColor[]>(
  [
    { name: 'Gloss Black', hex: '#0A0A0B' },
    { name: 'Satin Black', hex: '#1C1C1E' },
    { name: 'Matte Grey', hex: '#6B6C70' },
    { name: 'Nardo Grey', hex: '#8E9094' },
    { name: 'Satin Dark Grey', hex: '#45474B' },
    { name: 'Gloss White', hex: '#F4F4F2' },
    { name: 'Pearl White', hex: '#ECE9E1' },
    { name: 'Racing Green', hex: '#0F3D2E' },
    { name: 'Midnight Blue', hex: '#15213D' },
    { name: 'Satin Khaki', hex: '#6F6B4F' },
    { name: 'Metallic Silver', hex: '#B9BCC0' },
    { name: 'Candy Red', hex: '#B3122E' },
  ],
  configuratorStatus,
  'назви і hex кольорів V Guard (плейсхолдери макета)',
);

export const wrap = {
  fullDuration: fact<Localized>({ nl: '3-5 dagen', uk: '3-5 днів' }, 'default', 'тривалість повного wrap, V Guard'),
  partsDuration: fact<Localized>({ nl: '1 dag', uk: '1 день' }, 'default', 'тривалість дах або дзеркала, V Guard'),
  lifetime: fact<Localized>({ nl: '5-7 jaar', uk: '5-7 років' }, 'default', 'термін служби wrap, V Guard'),
  brands: fact(['3M', 'Avery Dennison'], 'default', 'бренди плівки для wrap, V Guard'),
  /** «Je kunt ook een proefstuk op je auto laten zetten.» */
  proefstuk: fact(true, 'default', 'пробний шматок плівки на авто клієнта, V Guard'),
  /** Hero, compare and CTA illustrations. */
  images: {
    hero375: illustration('wrap-hero-375.png'),
    hero1280: illustration('wrap-hero-1280.png'),
    compare: illustration('wrap-compare.png'),
    cta375: illustration('wrap-cta-a.png'),
    cta1280: illustration('wrap-cta-b.png'),
  },
};

export interface WrapCard {
  id: string;
  /** Quote form option preselected by the card button. */
  formOption: string;
  /** For «Losse delen»: the part checkbox to tick. */
  formPart?: string;
  title: Localized;
  description: Localized;
  price: Price;
  duration?: Fact<Localized>;
  badge?: Localized;
  image: Fact<string>;
}

const [roofPart, mirrorPart, chromePart] = wrapParts;

/** Checkboxes under «Losse delen» in quote form step 3, in mockup order. */
export const wrapFormParts: WrapPart[] = [chromePart, roofPart, mirrorPart];

/** «Wat wil je laten wrappen?»: one large card and four. */
export const wrapCards: WrapCard[] = [
  {
    id: 'volledig',
    formOption: 'volledig',
    title: { nl: 'Volledige wrap', uk: 'Повне обклеювання' },
    description: { nl: 'De hele auto in een nieuwe kleur of finish.', uk: 'Усе авто в новому кольорі або фініші.' },
    price: wrapBase,
    duration: wrap.fullDuration,
    image: illustration('wrap-card-volledig.png'),
  },
  {
    id: 'pakket',
    formOption: 'pakket',
    title: { nl: 'Black styling pakket', uk: 'Антихром-пакет' },
    description: {
      nl: 'Ontchromen, zwart dak en spiegelkappen in één keer.',
      uk: 'Антихром, чорний дах і дзеркала за один візит.',
    },
    price: wrapPakket,
    badge: { nl: 'Pakketvoordeel', uk: 'Вигідніше разом' },
    image: illustration('wrap-card-pakket.png'),
  },
  {
    id: 'chrome-delete',
    formOption: 'delen',
    formPart: 'chrome-delete',
    title: { nl: 'Ontchromen (chrome delete)', uk: 'Антихром' },
    description: { nl: 'Chroomdelen in zwart of kleur.', uk: 'Хромовані деталі в чорний або колір.' },
    price: chromePart.price,
    image: illustration('wrap-card-ontchromen.png'),
  },
  {
    id: 'dak',
    formOption: 'delen',
    formPart: 'dak',
    title: { nl: 'Dak', uk: 'Обклеювання даху' },
    description: {
      nl: 'Zwart dak voor een sportieve two-tone look.',
      uk: 'Чорний дах для спортивного двоколірного вигляду.',
    },
    price: roofPart.price,
    image: illustration('wrap-card-dak.png'),
  },
  {
    id: 'spiegelkappen',
    formOption: 'delen',
    formPart: 'spiegelkappen',
    title: { nl: 'Spiegelkappen', uk: 'Обклеювання дзеркал' },
    description: {
      nl: 'Spiegelkappen in zwart, carbon look of kleur.',
      uk: 'Дзеркала в чорному, під карбон або в кольорі.',
    },
    price: mirrorPart.price,
    image: illustration('wrap-card-spiegel.png'),
  },
];

export interface WrapRecent {
  id: string;
  /** Real V Guard photo in src/assets/photos. Never an AI illustration (D18). */
  file: string;
  car: Localized;
  detail: Localized;
  /** Month of the job. */
  date: Fact<Localized>;
}

const jobMonth = () =>
  fact<Localized>({ nl: 'okt 2026', uk: 'жовт. 2026' }, 'default', 'місяць роботи і підпис, V Guard');

/** «Recent opgeleverd»: real photos with captions from the mockup. */
export const wrapRecent: WrapRecent[] = [
  {
    id: 'bmw-3-front',
    file: 'real-bmw-3-front.png',
    car: { nl: 'BMW 3 Serie', uk: 'BMW 3 Series' },
    detail: { nl: 'spiegelkappen zwart', uk: 'чорні корпуси дзеркал' },
    date: jobMonth(),
  },
  {
    id: 'volvo-v60',
    file: 'real-volvo-v60.png',
    car: { nl: 'Volvo V60', uk: 'Volvo V60' },
    detail: { nl: 'ramen blinderen', uk: 'тонування вікон' },
    date: jobMonth(),
  },
  {
    id: 'audi-a7-zij',
    file: 'real-audi-a7-zij.png',
    car: { nl: 'Audi A7', uk: 'Audi A7' },
    detail: { nl: 'voorruit chameleon', uk: 'лобове скло хамелеон' },
    date: jobMonth(),
  },
  {
    id: 'bmw-3-voorruit',
    file: 'real-bmw-3-voorruit.png',
    car: { nl: 'BMW 3 Serie', uk: 'BMW 3 Series' },
    detail: { nl: 'voorruit chameleon', uk: 'лобове скло хамелеон' },
    date: jobMonth(),
  },
];

/** Lowest wrap price, e.g. Home card «vanaf €69». */
export const wrapFrom: Price = wrapCards.reduce((min, c) => (c.price.amount < min.price.amount ? c : min)).price;
export const wrapFull: Price = wrapBase;
export const ppfFrom: Price = ppfPackages[0].price;

/** «vanaf» price per service for cards and the mobile menu. */
export const serviceFrom: Record<ServiceSlug, Price> = {
  ppf: ppfFrom,
  'ramen-blinderen': tintFrom,
  'car-wrapping': wrapFrom,
};

/** Sub-line under a quote form option card (step 3), e.g. «vanaf €895 · 1-2 dagen». */
export function optionDetail(service: ServiceSlug, optionId: string, locale: Locale): string {
  const withDuration = (p: Price, d?: Fact<Localized>) =>
    [isPriceShown(p) ? fromLabel(p, locale) : null, d?.value[locale]].filter(Boolean).join(' · ');
  if (service === 'ppf') {
    const pkg = ppfPackages.find((p) => p.formOption === optionId);
    if (!pkg) return '';
    if (pkg.parts) return pkg.parts.map((p, i) => (i ? p.label[locale].toLowerCase() : p.label[locale])).join(', ');
    return withDuration(pkg.price, pkg.duration);
  }
  if (service === 'ramen-blinderen') {
    if (optionId === 'achterzijde') return withDuration(tintFrom, tint.duration);
    const row = tintOptionPrices.find((r) => r.formOption === optionId);
    return row && isPriceShown(row.price) ? cellLabel(row.price, locale) : '';
  }
  if (optionId === 'delen') {
    const cheapest = wrapFormParts.reduce((min, p) => (p.price.amount < min.price.amount ? p : min)).price;
    return isPriceShown(cheapest) ? fromLabel(cheapest, locale) : '';
  }
  const card = wrapCards.find((c) => c.formOption === optionId);
  return card ? withDuration(card.price, card.duration) : '';
}

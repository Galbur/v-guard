// Services, packages, body types, form options and prices. The only place prices live
// (Site Truth section 6). A price renders when priceStatus is 'confirmed' or, until launch,
// 'default' (owner decision R2). Hints from «value | hint» marker stay here and in check:defaults.
import { euro, fact, type Fact, type Locale, type Localized } from './fact.ts';

export type PriceStatus = 'confirmed' | 'spoken' | 'default' | 'none';
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
      { id: 'gedeeltelijk', label: { nl: 'Gedeeltelijk', uk: 'Частково' } },
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
    // Mockup «VG Site 04 Car wrapping v2»: one option per card; the colour or finish goes into
    // the separate «kleur» field of step 3.
    options: [
      { id: 'volledig', label: { nl: 'Volledige wrap', uk: 'Повне обклеювання' } },
      { id: 'pakket', label: { nl: 'Black styling pakket', uk: 'Антихром-пакет' } },
      { id: 'chrome-delete', label: { nl: 'Chrome delete', uk: 'Антихром' } },
      { id: 'dak', label: { nl: 'Dak', uk: 'Дах' } },
      { id: 'spiegelkappen', label: { nl: 'Spiegelkappen', uk: 'Дзеркала' } },
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
  { id: 'bus', label: { nl: 'Bus', uk: 'Бус' } },
  // Wrap configurator bodies (step W3)
  { id: 'personenbus', label: { nl: 'Personenbus', uk: 'Мікроавтобус' } },
  { id: 'touringcar', label: { nl: 'Touringcar', uk: 'Автобус' } },
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
  zones?: Fact<Localized>;
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
  { label: { nl: 'Spiegelkappen', uk: 'Ковпаки дзеркал' }, price: price(79, 'default', 'ціни за деталь', { from: true }) },
];

export const ppfPackages: Package[] = [
  {
    id: 'full-front',
    formOption: 'full-front',
    title: { nl: 'Full Front', uk: 'Full Front' },
    description: {
      nl: 'De voorkant, waar de meeste steenslag terechtkomt.',
      uk: 'Передня частина, куди потрапляє найбільше сколів.',
    },
    zones: fact(
      {
        nl: 'voorbumper, motorkap, voorschermen, spiegelkappen, koplampen',
        uk: 'передній бампер, капот, передні крила, ковпаки дзеркал, фари',
      },
      'default',
      'точні зони V Guard',
    ),
    price: price(895, 'default', 'Full Front, агресивний вхід; ринок ~€1.000-2.000', { from: true }),
    duration: fact({ nl: '1-2 dagen', uk: '1-2 дні' }, 'default', 'тривалість V Guard'),
  },
  {
    id: 'full-body',
    formOption: 'full-body',
    title: { nl: 'Full Body', uk: 'Full Body' },
    description: { nl: 'Alle gelakte delen van de auto onder folie.', uk: 'Усі пофарбовані деталі авто під плівкою.' },
    zones: fact({ nl: 'alle gelakte panelen', uk: 'усі пофарбовані панелі' }, 'default', 'точні зони V Guard'),
    price: price(2995, 'default', 'ринок ~€3.500-6.000', { from: true }),
    duration: fact({ nl: '3-5 dagen', uk: '3-5 днів' }, 'default', 'тривалість V Guard'),
  },
  {
    id: 'gedeeltelijk',
    formOption: 'gedeeltelijk',
    title: { nl: 'Gedeeltelijk', uk: 'Частково' },
    description: { nl: 'Alleen de delen die jij kiest.', uk: 'Лише деталі, які ви оберете.' },
    parts: ppfParts,
    price: price(Math.min(...ppfParts.map((p) => p.price.amount)), 'default', 'найнижча ціна за деталь', { from: true }),
    duration: fact({ nl: 'per onderdeel', uk: 'за деталь' }, 'default', 'тривалість V Guard'),
  },
];

export const ppfCare = fact<Localized>(
  {
    nl: 'De eerste week niet wassen. Daarna handwas of contactloos, en geen hogedrukspuit op de randen van de folie.',
    uk: 'Перший тиждень не мити. Далі ручне або безконтактне миття, без мийки високого тиску на краї плівки.',
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
  { id: 'hatchback-3', label: { nl: 'Hatchback 3-deurs', uk: 'Хетчбек 3-дверний' }, price: price(129, 'default', `${tintHint}; V Guard озвучував €200 (P1)`) },
  { id: 'hatchback-5', label: { nl: 'Hatchback 5-deurs', uk: 'Хетчбек 5-дверний' }, price: price(149, 'default', tintHint) },
  { id: 'sedan-coupe', label: { nl: 'Sedan / coupé', uk: 'Седан / купе' }, price: price(179, 'default', tintHint) },
  { id: 'stationwagon', label: { nl: 'Stationwagon', uk: 'Універсал' }, price: price(189, 'default', tintHint) },
  { id: 'suv', label: { nl: 'SUV', uk: 'SUV' }, price: price(199, 'default', tintHint) },
  { id: 'bus-mpv', label: { nl: 'Bus / MPV', uk: 'Бус / мінівен' }, price: price(249, 'default', tintHint) },
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
    label: { nl: 'Voorste zijruiten, lichte folie (minimaal 55%)', uk: 'Передні бічні, світла плівка (від 55%)' },
    price: price(99, 'default', 'ринок €100-150', { plus: true }),
  },
  {
    id: 'keramisch',
    label: { nl: 'Keramische warmtewerende folie', uk: 'Керамічна плівка проти тепла' },
    price: price(69, 'default', 'апгрейд, ринок +€70-100', { plus: true }),
  },
  { id: 'achterruit', label: { nl: 'Alleen achterruit', uk: 'Лише заднє скло' }, price: price(79, 'default') },
  {
    id: 'chameleon',
    formOption: 'chameleon',
    label: { nl: 'Chameleon voorruit', uk: 'Chameleon на лобове' },
    price: price(199, 'default', 'V Guard озвучував €500 (P3)', { from: true }),
  },
  {
    id: 'complete',
    label: { nl: 'Complete auto (achterzijde + voorste zijruiten)', uk: 'Усе авто (задня частина + передні бічні)' },
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
        title: { nl: 'Advies', uk: 'Порада' },
        text: { nl: 'We kiezen samen de tint en de ruiten.', uk: 'Разом обираємо тон і вікна.' },
      },
      {
        title: { nl: 'Reinigen', uk: 'Очищення' },
        text: { nl: 'Ruiten worden binnen en buiten grondig schoongemaakt.', uk: 'Вікна ретельно миються зсередини і ззовні.' },
      },
      {
        title: { nl: 'Op maat snijden', uk: 'Розкрій за розміром' },
        text: { nl: 'De folie wordt per ruit op maat gemaakt.', uk: 'Плівку підганяють під кожне вікно.' },
      },
      {
        title: { nl: 'Aanbrengen', uk: 'Нанесення' },
        text: { nl: 'Folie aan de binnenkant, daarna eindcontrole.', uk: 'Плівка зсередини, потім фінальна перевірка.' },
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

const factor = (value: number | null, hint = 'дефолт') => fact<number | null>(value, 'default', hint);

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
    formBody: 'personenbus',
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
  /** Quote form option for this part alone. */
  formOption: string;
  label: Localized;
  price: Price;
  /** Personenbus and touringcar; missing: same as price. */
  vanPrice?: Price;
}

export const wrapParts: WrapPart[] = [
  {
    id: 'dak',
    formOption: 'dak',
    label: { nl: 'Dak', uk: 'Дах' },
    price: price(249, 'default', 'дах, легкове авто', { from: true }),
    vanPrice: price(349, 'default', 'дах, бус і автобус', { from: true }),
  },
  {
    id: 'spiegel',
    formOption: 'spiegelkappen',
    label: { nl: 'Spiegelkappen', uk: 'Дзеркала' },
    price: price(69, 'default', 'ковпаки дзеркал, легкове авто', { from: true }),
    vanPrice: price(89, 'default', 'дзеркала, бус і автобус', { from: true }),
  },
  {
    id: 'chroom',
    formOption: 'chrome-delete',
    label: { nl: 'Chroom (ontchromen)', uk: 'Хром (антихром)' },
    price: price(149, 'default', 'ринок від €175', { from: true }),
  },
];

/** Dak, spiegelkappen and chroom in black; not for a touringcar. */
export const wrapPakket: Price = price(395, 'default', 'Black styling pakket', { from: true });

/** Carbon look surcharge on the whole indication. */
export const wrapCarbonSurcharge = fact(0.1, 'default', 'Carbon look +10%');

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
  'default',
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
  title: Localized;
  description: Localized;
  price: Price;
  duration?: Fact<Localized>;
  badge?: Localized;
  image: Fact<string>;
}

const [roofPart, mirrorPart, chromePart] = wrapParts;

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
    formOption: 'chrome-delete',
    title: { nl: 'Ontchromen (chrome delete)', uk: 'Антихром' },
    description: { nl: 'Chroomdelen in zwart of kleur.', uk: 'Хромовані деталі в чорний або колір.' },
    price: chromePart.price,
    image: illustration('wrap-card-ontchromen.png'),
  },
  {
    id: 'dak',
    formOption: 'dak',
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
    formOption: 'spiegelkappen',
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
  const card = wrapCards.find((c) => c.formOption === optionId);
  return card ? withDuration(card.price, card.duration) : '';
}

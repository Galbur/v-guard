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
    label: { nl: 'Car wrapping', uk: 'Car wrapping' },
    // Blueprint v1.3: volledig / gedeeltelijk + finish; finish goes into «opmerking».
    options: [
      { id: 'volledig', label: { nl: 'Volledig', uk: 'Повністю' } },
      { id: 'gedeeltelijk', label: { nl: 'Gedeeltelijk', uk: 'Частково' } },
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
  { label: { nl: 'Spiegelkappen', uk: 'Ковпаки дзеркал' }, price: price(79, 'default', 'ціни за деталь', { from: true }) },
];

export const ppfPackages: Package[] = [
  {
    id: 'full-front',
    formOption: 'full-front',
    title: { nl: 'Full Front', uk: 'Full Front' },
    description: {
      nl: 'De voorkant, waar de meeste steenslag terechtkomt.',
      uk: 'Передня частина, куди летить найбільше сколів.',
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
    description: { nl: 'Alle gelakte delen van de auto onder folie.', uk: 'Усі пофарбовані деталі авто під плівкою.' },
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
    description: { nl: 'Alleen de delen die jij kiest.', uk: 'Лише деталі, які оберете ви.' },
    highlight: 'spots',
    zones: fact(
      {
        nl: ['Bijv. voorbumper', 'deurgreepbakjes', 'deurranden', 'instaplijsten', 'laaddrempel'],
        uk: ['Напр. передній бампер', 'ніші ручок', 'торці дверей', 'пороги', 'поріг багажника'],
      },
      'default',
      'приклади деталей V Guard',
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

export interface WrapCard {
  id: string;
  formOption: string;
  title: Localized;
  description: Localized;
  price: Price;
  duration: Fact<Localized>;
  /** File name in src/assets/photos; only cards with a real photo get an image (R4). */
  photo?: { file: string; position: string };
}

const oneDay = fact<Localized>({ nl: '1 dag', uk: '1 день' }, 'default', 'тривалість V Guard');

export const wrapCards: WrapCard[] = [
  {
    id: 'volledig',
    formOption: 'volledig',
    title: { nl: 'Volledige wrap', uk: 'Повний wrap' },
    description: { nl: 'De hele auto in een nieuwe kleur of finish.', uk: 'Усе авто в новому кольорі або фініші.' },
    price: price(1795, 'default', 'ринок ~€2.000-3.500', { from: true }),
    duration: fact({ nl: '3-5 dagen', uk: '3-5 днів' }, 'default', 'тривалість V Guard'),
  },
  {
    id: 'dak',
    formOption: 'gedeeltelijk',
    title: { nl: 'Dak', uk: 'Дах' },
    description: { nl: 'Zwart of in kleur, voor een sportieve look.', uk: 'Чорний або кольоровий, для спортивного вигляду.' },
    price: price(249, 'default', undefined, { from: true }),
    duration: oneDay,
  },
  {
    id: 'spiegelkappen',
    formOption: 'gedeeltelijk',
    title: { nl: 'Spiegelkappen', uk: 'Ковпаки дзеркал' },
    description: { nl: 'Kleine upgrade, groot verschil.', uk: 'Невелике оновлення, помітна різниця.' },
    price: price(69, 'default', 'ковпаки дзеркал', { from: true }),
    duration: oneDay,
    photo: { file: 'bmw-34-p.png', position: '22% 48%' },
  },
  {
    id: 'chrome-delete',
    formOption: 'gedeeltelijk',
    title: { nl: 'Chrome delete', uk: 'Chrome delete' },
    description: { nl: 'Chroomdelen in zwart of kleur.', uk: 'Хромовані деталі в чорний або колір.' },
    price: price(149, 'default', 'ринок від €175', { from: true }),
    duration: oneDay,
    photo: { file: 'bmw-front-p.png', position: 'center 70%' },
  },
];

export const wrap = {
  finishes: fact<Localized<string[]>>(
    {
      nl: ['Glans', 'Mat', 'Satijn', 'Metallic', 'Carbon look'],
      uk: ['Глянець', 'Мат', 'Сатин', 'Металік', 'Під карбон'],
    },
    'default',
    'фініші V Guard',
  ),
  lifetime: fact<Localized>({ nl: '5-7 jaar', uk: '5-7 років' }, 'default', 'термін служби wrap, V Guard'),
  colors: fact<Localized>(
    {
      nl: 'Glans, mat, satijn, metallic en carbon look, in tientallen kleuren. Bekijk de stalen in de studio.',
      uk: 'Глянець, мат, сатин, металік, під карбон, десятки кольорів. Зразки можна подивитися в студії.',
    },
    'default',
    'кольори і фініші V Guard',
  ),
};

/** Lowest wrap price, e.g. Home card «vanaf €69». */
export const wrapFrom: Price = wrapCards.reduce((min, c) => (c.price.amount < min.price.amount ? c : min)).price;
export const wrapFull: Price = wrapCards[0].price;
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
  if (optionId === 'volledig') return withDuration(wrapCards[0].price, wrapCards[0].duration);
  return wrapCards
    .filter((c) => c.formOption === optionId)
    .map((c, i) => (i ? c.title[locale].toLowerCase() : c.title[locale]))
    .join(', ');
}

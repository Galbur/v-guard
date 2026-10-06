// Services, options, body types and prices. The only place prices live
// (Site Truth section 6). A price renders only when priceStatus === 'confirmed'.

import type { Locale } from '../i18n/routes.ts';

export type PriceStatus = 'confirmed' | 'spoken' | 'none';
export type ServiceSlug = 'ppf' | 'ramen-blinderen' | 'car-wrapping';
export type Localized = Record<Locale, string>;

export interface ServiceOption {
  id: string;
  label: Localized;
  priceFrom?: number;
  priceStatus: PriceStatus;
}

export interface Service {
  slug: ServiceSlug;
  order: number;
  label: Localized;
  options: ServiceOption[];
}

export interface BodyType {
  id: string;
  label: Localized;
}

// Order per block specs: PPF, ramen blinderen, car wrapping (F3, F4).
// Options per Blueprint section 6.
export const services: Service[] = [
  {
    slug: 'ppf',
    order: 1,
    label: { nl: 'PPF', uk: 'PPF' },
    options: [
      { id: 'full-front', label: { nl: 'Full Front', uk: 'Full Front' }, priceStatus: 'none' },
      { id: 'full-body', label: { nl: 'Full Body', uk: 'Full Body' }, priceStatus: 'none' },
      { id: 'gedeeltelijk', label: { nl: 'Gedeeltelijk', uk: 'Часткове' }, priceStatus: 'none' },
    ],
  },
  {
    slug: 'ramen-blinderen',
    order: 2,
    label: { nl: 'Ramen blinderen', uk: 'Тонування' },
    options: [
      // P1 ОЗВУЧЕНО
      { id: 'achterzijde', label: { nl: 'Achterzijde', uk: 'Задня частина' }, priceFrom: 200, priceStatus: 'spoken' },
      // P2 ОЗВУЧЕНО as «whole car»; window set to be defined per F10
      {
        id: 'toegestane-ruiten',
        label: { nl: 'Alle toegestane ruiten', uk: 'Усі дозволені вікна' },
        priceFrom: 450,
        priceStatus: 'spoken',
      },
      // P3 ОЗВУЧЕНО; compliance with F10 to be checked
      { id: 'chameleon', label: { nl: 'Chameleon', uk: 'Хамелеон' }, priceFrom: 500, priceStatus: 'spoken' },
    ],
  },
  {
    slug: 'car-wrapping',
    order: 3,
    label: { nl: 'Car wrapping', uk: 'Car wrapping' },
    options: [
      { id: 'volledig', label: { nl: 'Volledig', uk: 'Повне' }, priceStatus: 'none' },
      { id: 'gedeeltelijk', label: { nl: 'Gedeeltelijk', uk: 'Часткове' }, priceStatus: 'none' },
    ],
  },
];

// Extra choice in quote form step 1; has no options step.
export const adviceOption = { id: 'advies', label: { nl: 'Advies', uk: 'Консультація' } } as const;

export const bodyTypes: BodyType[] = [
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

/** «vanaf €200» / «від €200», or null when the price is not confirmed. */
export function priceFromLabel(option: ServiceOption, locale: Locale): string | null {
  if (option.priceStatus !== 'confirmed' || option.priceFrom === undefined) return null;
  const amount = `€${option.priceFrom.toLocaleString('nl-NL')}`;
  return locale === 'nl' ? `vanaf ${amount}` : `від ${amount}`;
}

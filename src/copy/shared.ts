// Copy shared by several pages. NL verbatim from VGUARD_CLAUDE_DESIGN_PROMPT.md; UA from
// section 12 where it exists, otherwise translated without new facts (see step 01 report).
import { trust } from '../config/site.ts';
import type { Locale, Localized } from '../data/fact.ts';
import { pageKeyFor } from '../i18n/routes.ts';

export interface Step {
  title: string;
  text: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface CtaBand {
  title: string;
  text: string;
}

const years = trust.workWarrantyYears.value;
const filmYears = trust.filmWarrantyYears.value;
const join = (list: readonly string[], last: string) =>
  list.length < 2 ? list.join('') : `${list.slice(0, -1).join(', ')} ${last} ${list[list.length - 1]}`;

export type TrustIcon = 'shield' | 'award' | 'certificate' | 'layers';

/** «Waarom V Guard Studio» / «Garantie en folies» (F6, F7, F8, F9). */
export const trustItems: Record<Locale, { icon: TrustIcon; text: string }[]> = {
  nl: [
    { icon: 'shield', text: `${years} jaar garantie op de montage` },
    { icon: 'award', text: `Tot ${filmYears.ppf} jaar fabrieksgarantie op de folie` },
    ...(trust.certifiedPpf.value ? [{ icon: 'certificate' as const, text: 'Gecertificeerd voor PPF' }] : []),
    { icon: 'layers', text: `Folies van ${join(trust.brands.value, 'en')}` },
  ],
  uk: [
    { icon: 'shield', text: `${years} роки гарантії на монтаж` },
    { icon: 'award', text: `Гарантія виробника на плівку: до ${filmYears.ppf} років` },
    ...(trust.certifiedPpf.value ? [{ icon: 'certificate' as const, text: 'Сертифіковані для PPF' }] : []),
    { icon: 'layers', text: `Плівки ${join(trust.brands.value, 'і')}` },
  ],
};

export const chipWarranty: Localized = { nl: `${years} jaar garantie`, uk: `${years} роки гарантії` };
export const chipPrep: Localized = { nl: 'Werkwijze in 5 stappen', uk: 'Монтаж у 5 етапів' };

export const headings = {
  process: { nl: 'Zo werken we', uk: 'Як ми працюємо' },
  faq: { nl: 'Veelgestelde vragen', uk: 'Часті питання' },
  studio: { nl: 'Studio in Vroomshoop', uk: 'Студія у Vroomshoop' },
  pricesIncl: { nl: 'Prijzen incl. btw.', uk: 'Ціни з BTW.' },
} satisfies Record<string, Localized>;

/** Prefilled WhatsApp texts (step 12): each service page has its own, every other page the general one. */
export const waTemplates = {
  ppf: {
    nl: 'Hallo V Guard Studio, ik wil graag een offerte voor PPF lakbescherming. Mijn auto:',
    uk: 'Добрий день, V Guard Studio! Хочу дізнатися вартість захисної плівки PPF. Моє авто:',
  },
  tint: {
    nl: 'Hallo V Guard Studio, ik wil graag een offerte voor ramen blinderen. Mijn auto:',
    uk: 'Добрий день, V Guard Studio! Хочу дізнатися вартість тонування вікон. Моє авто:',
  },
  wrap: {
    nl: 'Hallo V Guard Studio, ik wil graag een offerte voor car wrapping. Mijn auto:',
    uk: 'Добрий день, V Guard Studio! Хочу дізнатися вартість обклеювання авто плівкою. Моє авто:',
  },
  general: {
    nl: 'Hallo V Guard Studio, ik heb een vraag over mijn auto. Mijn auto:',
    uk: 'Добрий день, V Guard Studio! Маю питання щодо свого авто. Моє авто:',
  },
} satisfies Record<string, Localized>;

/** WhatsApp text for the page at `pathname` (Home, Projecten, Contact, Privacy and 404 get the general one). */
export function waText(pathname: string, locale: Locale): string {
  const key = pageKeyFor(pathname);
  return (key === 'ppf' || key === 'tint' || key === 'wrap' ? waTemplates[key] : waTemplates.general)[locale];
}

export { join };

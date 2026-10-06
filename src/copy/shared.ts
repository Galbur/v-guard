// Copy shared by several pages. NL verbatim from VGUARD_CLAUDE_DESIGN_PROMPT.md; UA from
// section 12 where it exists, otherwise translated without new facts (see step 01 report).
import { trust } from '../config/site.ts';
import type { Locale, Localized } from '../data/fact.ts';

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

/** PPF and wrap preparation, Site Truth F5: content ПІДТВЕРДЖЕНО; wording still to be agreed with V Guard. */
export const prepSteps: Record<Locale, Step[]> = {
  nl: [
    { title: 'Wassen', text: 'Grondige reiniging van de auto in meerdere fasen.' },
    { title: 'Kleibehandeling', text: 'Clay haalt vastzittend vuil uit de lak.' },
    { title: 'Ontvetten', text: 'Alcoholreiniging zodat de folie goed hecht.' },
    { title: 'Aanbrengen', text: 'De folie gaat op de schone, voorbereide lak.' },
    { title: 'Controle', text: 'Eindcontrole van randen en oppervlak voor oplevering.' },
  ],
  uk: [
    { title: 'Миття', text: 'Ретельне очищення авто в кілька етапів.' },
    { title: 'Clay', text: 'Clay прибирає вʼїлий бруд із лаку.' },
    { title: 'Знежирення', text: 'Очищення спиртом, щоб плівка добре трималася.' },
    { title: 'Нанесення', text: 'Плівка лягає на чистий, підготовлений лак.' },
    { title: 'Перевірка', text: 'Фінальна перевірка країв і поверхні перед видачею.' },
  ],
};

export type TrustIcon = 'shield' | 'award' | 'certificate' | 'layers';

/** «Waarom V Guard Studio» / «Garantie en folies» (F6, F7, F8, F9). */
export const trustItems: Record<Locale, { icon: TrustIcon; text: string }[]> = {
  nl: [
    { icon: 'shield', text: `${years} jaar garantie op ons werk` },
    { icon: 'award', text: `Fabrieksgarantie op de folie, tot ${filmYears.ppf} jaar` },
    ...(trust.certifiedPpf.value ? [{ icon: 'certificate' as const, text: 'Gecertificeerd voor PPF' }] : []),
    { icon: 'layers', text: `Folies van ${join(trust.brands.value, 'en')}` },
  ],
  uk: [
    { icon: 'shield', text: `${years} роки гарантії на нашу роботу` },
    { icon: 'award', text: `Гарантія виробника на плівку, до ${filmYears.ppf} років` },
    ...(trust.certifiedPpf.value ? [{ icon: 'certificate' as const, text: 'Сертифіковані для PPF' }] : []),
    { icon: 'layers', text: `Плівки ${join(trust.brands.value, 'і')}` },
  ],
};

export const chipWarranty: Localized = { nl: `${years} jaar garantie`, uk: `${years} роки гарантії` };
export const chipPrep: Localized = { nl: '5-staps voorbereiding', uk: 'Підготовка у 5 кроків' };

export const headings = {
  process: { nl: 'Zo werken we', uk: 'Як ми працюємо' },
  faq: { nl: 'Veelgestelde vragen', uk: 'Часті питання' },
  studio: { nl: 'Studio in Vroomshoop', uk: 'Студія у Vroomshoop' },
  pricesIncl: { nl: 'Prijzen incl. btw.', uk: 'Ціни з BTW.' },
} satisfies Record<string, Localized>;

export { join };

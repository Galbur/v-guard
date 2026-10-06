// Single source for NAP, contact channels, trust facts and launch state.
// Site, JSON-LD, footer and contact blocks read these values (CLAUDE.md rule 3).
// Values with status 'default' or 'spoken' render in preview (owner decision R1) and are
// listed by `npm run check:defaults`.
import type { PageKey } from '../i18n/routes.ts';
import { fact, type Localized } from '../data/fact.ts';

export interface Phone {
  /** As shown on the site, e.g. «06 12 34 56 78». */
  display: string;
  /** E.164 for tel: and wa.me, e.g. «+31612345678». */
  e164: string;
}

export interface Review {
  quote: Localized;
  author: string;
}

// The phone number shown on the site is a default (F11 ОЧІКУЄ). Clickable tel: and wa.me
// links never use it: they go to TEST_PHONE (E.164) from .env.local or the Netlify env.
// Without TEST_PHONE the number is plain text and the Bellen / WhatsApp buttons are hidden,
// so nobody calls or messages a random number. TEST_PHONE only works before launch: it is
// ignored as soon as LIVE_PAGES is not empty (see linkPhone below).

export const site = {
  name: 'V Guard Studio', // F1 ПІДТВЕРДЖЕНО
  // F2 ПІДТВЕРДЖЕНО. «14 D» must match GBP character for character.
  address: {
    street: 'Twentelaan 14 D',
    postalCode: '7681 NE',
    locality: 'Vroomshoop',
    region: 'Overijssel',
    country: 'NL',
  },
  // F11 ОЧІКУЄ
  phone: fact<Phone>({ display: '06 12 34 56 78', e164: '+31612345678' }, 'default', 'телефон V Guard (F11)'),
  // F15 ОЧІКУЄ
  hours: fact(
    {
      label: { nl: 'ma-vr 9:00-18:00, za 10:00-16:00', uk: 'пн-пт 9:00-18:00, сб 10:00-16:00' } as Localized,
      schema: ['Mo-Fr 09:00-18:00', 'Sa 10:00-16:00'],
    },
    'default',
    'години V Guard (F15)',
  ),
  legalName: null as string | null, // F14 ОЧІКУЄ
  kvk: fact('12345678', 'default', 'KvK V Guard (F14)'),
  emailNotify: null as string | null, // F13 ОЧІКУЄ; Netlify Forms notifications are set in the Netlify UI
  // F16 ОЧІКУЄ. No URL, no link: a guessed profile URL could point to someone else.
  socials: {
    tiktok: null as string | null,
    instagram: null as string | null,
    facebook: null as string | null,
  },
  // Not from the design prompt: proposed by the developer for the privacy page, to be checked with V Guard.
  retentionMonths: fact(12, 'default', 'термін зберігання заявок; запропоновано розробником, перевірити з V Guard'),
  responseTime: fact<Localized>(
    { nl: 'binnen 1 werkdag', uk: 'протягом робочого дня' },
    'default',
    'термін відповіді V Guard',
  ),
};

// Trust facts (Site Truth section 5). F6 and F9 are ОЗВУЧЕНО; rendered in preview per R1.
export const trust = {
  workWarrantyYears: fact(3, 'spoken', 'F6 ОЗВУЧЕНО'),
  filmWarrantyYears: fact({ ppf: 10, tint: 7 }, 'default', 'F7: PPF 5/7/10 залежно від бренду, тонування 5-7'),
  certifiedPpf: fact(true, 'default', 'F8: після скану сертифіката Валери'),
  brands: fact(['XPEL', 'BRAVIXX', 'LLumar'], 'spoken', 'F9 ОЗВУЧЕНО'),
  ppfBrands: fact(['XPEL', 'BRAVIXX'], 'default', 'F9: бренди саме для PPF'),
  tintBrands: fact(['LLumar', 'XPEL'], 'spoken', 'F9 ОЗВУЧЕНО: бренди для тонування з макета'),
};

// Google reviews (Blueprint ReviewsBlock). Defaults from the design prompt; owner decision
// R1 06.10.2026: render in preview, replace with real Google reviews before launch.
export const reviews = fact<Review[]>(
  [
    {
      quote: { nl: 'Strak gewerkt, de ramen zien er top uit.', uk: 'Акуратна робота, вікна виглядають чудово.' },
      author: 'Mark, Hardenberg',
    },
    {
      quote: { nl: 'Full Front PPF op mijn Model 3, netjes afgewerkt.', uk: 'Full Front PPF на мою Model 3, охайно зроблено.' },
      author: 'Sandra, Almelo',
    },
    {
      quote: { nl: 'Snel geholpen en goed advies over wat mag.', uk: 'Швидко допомогли і добре порадили, що дозволено.' },
      author: 'Dennis, Ommen',
    },
  ],
  'default',
  'реальні відгуки Google після запуску профілю',
);

export const fullAddress = `${site.address.street}, ${site.address.postalCode} ${site.address.locality}`;
const mapsQuery = encodeURIComponent(`${site.name}, ${fullAddress}`);

export const links = {
  // Plain links to Google Maps; nothing loads before a click (D7).
  route: `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`,
  reviews: fact(
    `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
    'default',
    'пряме посилання на відгуки GBP після активації профілю',
  ),
  // F10, F10b source
  rijksoverheid:
    'https://www.rijksoverheid.nl/onderwerpen/verkeersveiligheid/vraag-en-antwoord/mag-ik-folie-of-coating-aanbrengen-op-mijn-autoruiten',
};

// F17 ОЧІКУЄ. When set, it is the canonical origin; until then astro.config.mjs
// falls back to Netlify's URL env var.
export const SITE_URL: string | null = null;

// Page keys from src/i18n/routes.ts that are launched. Empty until launch:
// every page is noindex and the sitemap is empty. While empty, the whole site is
// a preview and all pages are linked; after launch only live pages are linked.
export const LIVE_PAGES: PageKey[] = [];

/** Whether header, footer and other internal links may point to a page. */
export function isLinked(key: PageKey): boolean {
  return LIVE_PAGES.length === 0 || LIVE_PAGES.includes(key);
}

/** Digits only, for wa.me links. */
export function waDigits(e164: string): string {
  return e164.replace(/\D/g, '');
}

/** E.164 number that tel: and wa.me links may use, or null (links hidden). */
export const linkPhone: string | null =
  LIVE_PAGES.length === 0 ? import.meta.env?.TEST_PHONE || process.env.TEST_PHONE || null : null;

/** tel: link, or null when no TEST_PHONE is set. */
export function telUrl(): string | null {
  return linkPhone ? `tel:${linkPhone}` : null;
}

/** wa.me link, or null when no TEST_PHONE is set. */
export function whatsappUrl(text?: string): string | null {
  if (!linkPhone) return null;
  const base = `https://wa.me/${waDigits(linkPhone)}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

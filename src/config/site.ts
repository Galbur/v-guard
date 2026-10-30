// Single source for NAP, contact channels, trust facts and launch state.
// Site, JSON-LD, footer and contact blocks read these values (CLAUDE.md rule 3).
// Values with status 'default' or 'spoken' render in preview (owner decision R1) and are
// listed by `npm run check:defaults`.
import type { PageKey } from '../i18n/routes.ts';
import { fact, type Localized } from '../data/fact.ts';

export interface Phone {
  /** As shown on the site (Dutch national format, pairs of digits after 06). */
  display: string;
  /** E.164, the canonical form (JSON-LD telephone). */
  e164: string;
}

export interface Review {
  quote: Localized;
  author: string;
}

// The phone number shown on the site is V Guard's (F11 ПІДТВЕРДЖЕНО). Since launch (D25) the clickable
// tel: and wa.me links use it. Before launch (LIVE_PAGES empty) they went to TEST_PHONE (E.164)
// from .env.local or the Netlify env (D16); without it the Bellen / WhatsApp buttons were hidden.

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
  // Pin of the Google Business Profile V-GUARD (JSON-LD geo).
  geo: { latitude: 52.4545024, longitude: 6.5833402 },
  // F11 ПІДТВЕРДЖЕНО (надано V Guard)
  phone: fact<Phone>({ display: '06 59 14 76 35', e164: '+31659147635' }, 'confirmed', 'телефон V Guard (F11)'),
  // F15 ПІДТВЕРДЖЕНО (усно, 30.10.2026). spec feeds JSON-LD openingHoursSpecification.
  hours: fact(
    {
      label: { nl: 'ma-vr 10:00-18:00 · za-zo 10:00-16:00', uk: 'пн-пт 10:00-18:00 · сб-нд 10:00-16:00' } as Localized,
      spec: [
        { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:00', closes: '18:00' },
        { days: ['Saturday', 'Sunday'], opens: '10:00', closes: '16:00' },
      ],
    },
    'confirmed',
    'години V Guard (F15)',
  ),
  // F14 ПІДТВЕРДЖЕНО (надано V Guard): legal entity behind the trade name (privacy page) and its KvK.
  legalName: fact('V-GUARD', 'confirmed', 'юридична назва V Guard (F14)'),
  kvk: fact('97417513', 'confirmed', 'KvK V Guard (F14)'),
  // Public contact email for the privacy page: none (F13: no public email for the site), so the
  // privacy page names only the phone (owner decision 12.10.2026).
  email: fact<string | null>(null, 'confirmed', 'публічного email V Guard немає (F13)'),
  // F13 ПІДТВЕРДЖЕНО (надано V Guard): inbox for new requests. Not shown on the site; Netlify Forms
  // email notifications to it are set in the Netlify UI.
  emailNotify: fact('vguardstudio1@gmail.com', 'confirmed', 'пошта для заявок V Guard (F13)'),
  // F16 ОЧІКУЄ. No URL, no link: a guessed profile URL could point to someone else.
  socials: {
    tiktok: null as string | null,
    instagram: null as string | null,
    facebook: null as string | null,
  },
  // Retention of requests for the privacy page (Site Truth D28).
  retentionMonths: fact(12, 'confirmed', 'термін зберігання заявок (D28)'),
  responseTime: fact<Localized>(
    { nl: 'binnen 1 werkdag', uk: 'протягом робочого дня' },
    'confirmed',
    'термін відповіді V Guard',
  ),
};

// Trust facts (Site Truth section 5). F6 to F9 ПІДТВЕРДЖЕНО (Oleksii, Site Truth D27).
export const trust = {
  workWarrantyYears: fact(3, 'confirmed', 'F6'),
  filmWarrantyYears: fact({ ppf: 10, tint: 7 }, 'confirmed', 'F7: PPF 5/7/10 залежно від бренду, тонування 5-7'),
  certifiedPpf: fact(true, 'confirmed', 'F8'),
  brands: fact(['XPEL', 'BRAVIXX', 'LLumar'], 'confirmed', 'F9'),
  // PPF page: manufacturer warranty per brand (F7) and what it covers.
  ppfFilmWarranty: fact(
    {
      years: [5, 7, 10],
      covers: { nl: 'vergelen en loslaten', uk: 'пожовтіння і відшарування' } as Localized,
    },
    'confirmed',
    'F7: 5/7/10 залежно від бренду; покриття (vergelen, loslaten) за умовами виробника',
  ),
  tintBrands: fact(['LLumar', 'XPEL'], 'confirmed', 'F9: бренди для тонування з макета'),
};

// Client reviews (Blueprint ReviewsBlock). Real reviews per Site Truth D26.
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
  'confirmed',
  'реальні відгуки клієнтів V Guard (Site Truth D26)',
);

export const fullAddress = `${site.address.street}, ${site.address.postalCode} ${site.address.locality}`;
const mapsQuery = encodeURIComponent(`${site.name}, ${fullAddress}`);

export const links = {
  // Plain links to Google Maps; nothing loads before a click (D7).
  route: `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`,
  // Google Business Profile V-GUARD: reviews link and JSON-LD hasMap.
  maps: 'https://www.google.com/maps/place/V-GUARD/@52.5307958,6.3895358,10513m/data=!3m1!1e3!4m6!3m5!1s0x59f397c5f407243:0x21c8c536d4931e56!8m2!3d52.4545024!4d6.5833402!16s%2Fg%2F11zztv_1xc',
  // F10, F10b source
  rijksoverheid:
    'https://www.rijksoverheid.nl/onderwerpen/verkeersveiligheid/vraag-en-antwoord/mag-ik-folie-of-coating-aanbrengen-op-mijn-autoruiten',
};

// F17 ОЧІКУЄ. When set, it is the canonical origin; until then astro.config.mjs
// falls back to Netlify's URL env var.
export const SITE_URL: string | null = null;

// Optional features. wrapConfigurator: «Stel je wrap samen» on the wrap page (built in PR #2,
// steps W3 and W4). Off by Oleksii's decision D19 (Site Truth v7): not part of the package.
// With false nothing of it ships: no markup, script, car images or styles.
export const features = {
  wrapConfigurator: false as boolean,
};

// Page keys from src/i18n/routes.ts that are launched (D25: all pages, 30.10.2026).
// Pages not listed are noindex and left out of the sitemap. While empty, the whole site is
// a preview and all pages are linked; after launch only live pages are linked.
export const LIVE_PAGES: PageKey[] = ['home', 'ppf', 'tint', 'wrap', 'projects', 'contact', 'privacy'];

/** Whether header, footer and other internal links may point to a page. */
export function isLinked(key: PageKey): boolean {
  return LIVE_PAGES.length === 0 || LIVE_PAGES.includes(key);
}

/** Digits only, for wa.me links. */
export function waDigits(e164: string): string {
  return e164.replace(/\D/g, '');
}

/** E.164 number that tel: and wa.me links may use, or null (links hidden). After launch: F11. */
export const linkPhone: string | null =
  LIVE_PAGES.length === 0 ? import.meta.env?.TEST_PHONE || process.env.TEST_PHONE || null : site.phone.value.e164;

/** tel: link, or null when no number may be linked. */
export function telUrl(): string | null {
  return linkPhone ? `tel:${linkPhone}` : null;
}

/** wa.me link, or null when no number may be linked. */
export function whatsappUrl(text?: string): string | null {
  if (!linkPhone) return null;
  const base = `https://wa.me/${waDigits(linkPhone)}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

// Single source for NAP, contact channels and launch state.
// Every value maps to a Site Truth fact ID. Only ПІДТВЕРДЖЕНО facts get a value;
// everything else stays null and the components that need it do not render.

export interface Address {
  street: string | null; // F2 ОЧІКУЄ
  postalCode: string | null; // F2 ОЧІКУЄ
  locality: string; // F2: Vroomshoop (exact address and spelling ОЧІКУЄ)
  country: 'NL';
}

export interface Socials {
  tiktok: string | null; // F16 ОЧІКУЄ
  instagram: string | null; // F16 ОЧІКУЄ
  facebook: string | null; // F16 ОЧІКУЄ
}

export interface SiteConfig {
  name: string;
  legalName: string | null;
  kvk: string | null;
  address: Address;
  phone: string | null; // E.164, e.g. +31...
  whatsapp: string | null; // E.164, e.g. +31...
  emailNotify: string | null;
  openingHours: string[] | null; // schema.org format, e.g. 'Mo-Fr 09:00-18:00'
  socials: Socials;
}

// Local QA only: TEST_PHONE from .env.local fills phone and WhatsApp so the
// sticky bar and the WhatsApp continuation can be tested. Ignored on Netlify
// production builds and never committed.
const testPhone: string | null =
  process.env.CONTEXT !== 'production' ? import.meta.env?.TEST_PHONE || null : null;

export const site: SiteConfig = {
  name: 'V Guard Studio', // F1 ПІДТВЕРДЖЕНО
  legalName: null, // F14 ОЧІКУЄ
  kvk: null, // F14 ОЧІКУЄ
  address: {
    street: null,
    postalCode: null,
    locality: 'Vroomshoop',
    country: 'NL',
  },
  phone: testPhone, // F11 ОЧІКУЄ
  whatsapp: testPhone, // F11 ОЧІКУЄ
  emailNotify: null, // F13 ОЧІКУЄ; Netlify Forms notifications are set in the Netlify UI
  openingHours: null, // F15 ОЧІКУЄ
  socials: {
    tiktok: null,
    instagram: null,
    facebook: null,
  },
};

// F17 ОЧІКУЄ. When set, it is the canonical origin; until then astro.config.mjs
// falls back to Netlify's URL env var.
export const SITE_URL: string | null = null;

// Page keys from src/i18n/routes.ts that are launched. Empty until launch:
// every page is noindex and the sitemap is empty. While empty, the whole site is
// a preview and all pages are linked; after launch only live pages are linked.
export const LIVE_PAGES: string[] = [];

/** Digits only, for wa.me links. */
export function waDigits(e164: string): string {
  return e164.replace(/\D/g, '');
}

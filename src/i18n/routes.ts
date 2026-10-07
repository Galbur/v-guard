// Page pairs NL ↔ UA (Site Truth section 8). NL lives at the root, UA under /uk/ (D1).

export const locales = ['nl', 'uk'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'nl';

export const hreflang: Record<Locale, string> = { nl: 'nl-NL', uk: 'uk-UA' };

export const routes = {
  home: { nl: '/', uk: '/uk/' },
  ppf: { nl: '/ppf/', uk: '/uk/ppf/' },
  tint: { nl: '/ramen-blinderen/', uk: '/uk/tonuvannia/' },
  wrap: { nl: '/car-wrapping/', uk: '/uk/obkleiuvannia/' },
  projects: { nl: '/projecten/', uk: '/uk/proiekty/' },
  contact: { nl: '/contact/', uk: '/uk/kontakty/' },
  privacy: { nl: '/privacy/', uk: '/uk/privacy/' },
} as const satisfies Record<string, Record<Locale, string>>;

export type PageKey = keyof typeof routes;
export const pageKeys = Object.keys(routes) as PageKey[];

/** Main navigation order (Blueprint section 2). */
export const navKeys: PageKey[] = ['ppf', 'tint', 'wrap', 'projects', 'contact'];

export function localizedPath(key: PageKey, locale: Locale): string {
  return routes[key][locale];
}

/** Page key for a pathname, or undefined (e.g. 404). */
export function pageKeyFor(pathname: string): PageKey | undefined {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return pageKeys.find((key) => locales.some((l) => routes[key][l] === path));
}

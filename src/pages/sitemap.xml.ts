// Sitemap lists only LIVE_PAGES (empty until launch), both locales.
import type { APIRoute } from 'astro';
import { LIVE_PAGES } from '../config/site.ts';
import { hreflang, locales, localizedPath } from '../i18n/routes.ts';

export const GET: APIRoute = ({ site }) => {
  const urls = site
    ? LIVE_PAGES.flatMap((key) =>
        locales.map((locale) => {
          const alternates = locales
            .map((l) => `<xhtml:link rel="alternate" hreflang="${hreflang[l]}" href="${new URL(localizedPath(key, l), site).href}"/>`)
            .join('');
          return `<url><loc>${new URL(localizedPath(key, locale), site).href}</loc>${alternates}</url>`;
        }),
      )
    : [];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join('')}</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};

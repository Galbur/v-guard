// @ts-check
import { defineConfig } from 'astro/config';

// Canonical origin. Until the domain (Site Truth F17) is confirmed, Netlify's
// URL env var is used on deploys; local builds have no origin and the layout
// then omits absolute canonical/hreflang links.
const site = process.env.SITE_URL || process.env.URL || undefined;

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'never',
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});

// @ts-check
import { defineConfig } from 'astro/config';
import { SITE_URL } from './src/config/site.ts';

// Canonical origin: SITE_URL once the domain (Site Truth F17) is confirmed,
// otherwise Netlify's URL env var on deploys. Local builds have no origin and the
// layout then omits absolute canonical/hreflang links.
const site = SITE_URL || process.env.URL || undefined;

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

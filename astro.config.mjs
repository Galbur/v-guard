// @ts-check
import { defineConfig } from 'astro/config';
import { SITE_URL, features } from './src/config/site.ts';

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
    // Build-time constant, so a switched-off wrap configurator (D19) is dropped from the bundle:
    // no script chunk, car images or CSS in dist. Source of truth: features in site.ts.
    define: {
      __WRAP_CONFIGURATOR__: JSON.stringify(features.wrapConfigurator),
    },
    build: {
      assetsInlineLimit: 0,
    },
  },
});

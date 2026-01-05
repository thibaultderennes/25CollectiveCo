// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://25collectiveco.com',
  output: 'static',
  integrations: [
    sitemap(),
  ],
  trailingSlash: 'never', // Use no trailing slash for consistency
});

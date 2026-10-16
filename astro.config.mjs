// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://zhar.coffee',
  output: 'server',
  adapter: vercel(),
  integrations: [sitemap()],
  vite: {
    // vite version mismatch between astro's bundled vite and @tailwindcss/vite peer
    // @ts-expect-error - see https://docs.astro.build/en/guides/integrations-guide/tailwind/
    plugins: [tailwind()],
  },
});

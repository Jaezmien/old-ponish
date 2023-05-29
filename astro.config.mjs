import { defineConfig } from 'astro/config';

import prefetch from '@astrojs/prefetch';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
	site: 'https://oldponish.netlify.app/',
	integrations: [vue(), prefetch(), sitemap(), tailwind()],
});

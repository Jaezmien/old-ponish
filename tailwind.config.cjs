/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				ponish: {
					50: '#fcfaea',
					100: '#f8f2cc',
					200: '#f4ecac',
					300: '#eee48e',
					400: '#eadd79',
					500: '#e6d867',
					600: '#d6c661',
					700: '#c2b15a',
					800: '#ad9b54',
					900: '#89774c',
				},
			},
			fontFamily: {
				'abhaya-libre': 'Abhaya Libre, serif',
				'roboto-serif': 'Roboto Serif, serif',
				'sans-runic': 'Noto Sans Runic, serif',
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
};

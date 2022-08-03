// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import '~/assets/style.scss';
import DefaultLayout from '~/layouts/Default.vue';

export default function(Vue, { router, head, isClient }) {
	// Set default layout as a global component
	Vue.component('Layout', DefaultLayout);

	head.link.push({
		rel: 'stylesheet',
		href:
			'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Montserrat:wght@300;400;700&display=swap',
	});

	head.meta.push({
		name: 'description',
		content: '🖥🐎 The official website of the Old Ponish Project!',
	});
}

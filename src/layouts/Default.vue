<script>
import Navbar from "@/components/Navbar.vue"
export default {
	components: {
		Navbar
	},

	props: {
		contentCSS: String,
		default: '',
	}
}
</script>

<template>
	<!--<div class="layout">
		<header class="header">
			<strong>
				<g-link to="/">{{ $static.metadata.siteName }}</g-link>
			</strong>
			<nav class="nav">
				<g-link class="nav__link"
						to="/">Home</g-link>
				<g-link class="nav__link"
						to="/about/">About</g-link>
			</nav>
		</header>
		<slot />
	</div>-->
	<div xclass="debug">
		<div class="min-h-screen flex flex-col sm:flex-row sm:h-screen">
			<div
				 class="p-8 w-full text-center sm:text-right sm:min-w-[18rem] sm:w-min grid place-items-center bg-dark-200 text-white">
				<div>
					<h1 class="text-4xl font-bold text-ponish-l">Old Ponish Project</h1>
					<h4 class="text-sm opacity-80">A constructed language based on the show - <i>My Little Pony:
							Friendship
							is Magic.</i></h4>

					<div id="nav-links"
						 class="mt-4 sm:mt-8 inline-flex flex-row flex-wrap place-content-center sm:flex-col text-center gap-2">
						<g-link to="/"
								class="px-4 py-1 border rounded hover:(bg-white text-dark-200) transition-colors duration-200">
							Home</g-link>
						<g-link to="/dictionary/"
								class="px-4 py-1 border rounded hover:(bg-white text-dark-200) transition-colors duration-200">
							Dictionary</g-link>
						<g-link to="/downloads/"
								class="px-4 py-1 border rounded hover:(bg-white text-dark-200) transition-colors duration-200">
							Downloads</g-link>
						<g-link to="/contact/"
								class="px-4 py-1 border rounded hover:(bg-white text-dark-200) transition-colors duration-200">
							Contact</g-link>
						<g-link to="/suggestion/"
								class="px-4 py-1 border rounded hover:(bg-white text-dark-200) transition-colors duration-200">
							Suggestions</g-link>
						<a href="https://discord.gg/NxerkEy"
						   target="_blank"
						   rel="noopener"
						   class="px-4 py-1 border border-[#5865F2] text-[#5865F2] hover:(bg-[#5865F2] text-white) transition-colors duration-200 rounded">
							Discord</a>
					</div>
				</div>
			</div>
			<div :class="['pt-4 sm:pt-0 w-full flex-grow sm:overflow-y-auto', contentCSS]"
				 id="inner-content">
				<transition name="fade"
							appear>
					<main>
						<slot />
					</main>
				</transition>
			</div>
		</div>
	</div>
</template>

<style>
.fade-enter-active {
	transition: opacity .5s;
}

.fade-enter {
	opacity: 0;
}
</style>
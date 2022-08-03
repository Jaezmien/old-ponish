<script>
import WordCard from '@/components/WordCard.vue'

export default {
	metaInfo: {
		title: 'Dictionary'
	},

	components: {
		WordCard
	},

	data() {
		return {
			currentLetter: "a",
			Dictionary: {},
			Etymology: {},

			dataLoaded: false,
		}
	},
	computed: {
		DictionaryKeys() {
			return Object.keys(this.Dictionary)
		},
		SelectionWords() {
			return this.DictionaryKeys.filter(word => word.toLowerCase().startsWith(this.currentLetter));
		},
	},
	methods: {
		async fetchJSON(path) {
			const data_fetch = await fetch(path)
			return await data_fetch.json()
		},
		remValue(rem) {
			return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
		},

		copyLink(word) {
			const link = `${window.location.origin}${window.location.pathname}#${word}`
			navigator.clipboard.writeText(link).catch(console.error);
		}
	},

	async mounted() {
		this.Dictionary = await this.fetchJSON('/dictionary.json');
		this.Etymology = await this.fetchJSON('/etymology.json');

		this.dataLoaded = true;

		this.$nextTick(() => {
			if (this.$route.hash) {
				const word = this.$route.hash.substring(1).toLowerCase()
				if (this.DictionaryKeys.includes(word)) {
					this.currentLetter = word.substring(0, 1)
					this.$nextTick(() => {
						const node = document.getElementById('word-' + word)
						if (window.innerWidth >= 640) {
							const content = document.getElementById('inner-content')
							content.scrollTo({ top: node.offsetTop - this.remValue(1), behavior: 'smooth' })
						}
						else {
							window.scrollTo({ top: node.offsetTop - this.remValue(1), behavior: 'smooth' })
						}

						this.$refs[word][0].active = true
					})
				}
			}
		})
	}
}
</script>

<template>
	<Layout contentCSS="px-6 !py-6">
		<h1 class="text-5xl sm:text-6xl text-center text-ponish-d">Dictionary</h1>

		<input type="text"
			   ref="copyField"
			   class="hidden">

		<div v-if="dataLoaded">
			<div class="my-8 mx-1 flex flex-row flex-wrap place-content-center gap-1 montserrat">
				<p v-for="letter in 'abdefghijklmnoprstuvwyz'.split('')"
				   :key="letter"
				   :class="['text-lg cursor-pointer p-1 hover:font-bold', currentLetter == letter ? 'font-bold text-ponish-m' : '']"
				   @click="currentLetter = letter">
					{{ letter.toUpperCase() }}
				</p>
			</div>
			<div class="flex flex-col sm:flex-row sm:flex-wrap gap-2">
				<WordCard v-for="word in SelectionWords"
						  :ref="word"
						  :word="word"
						  :key="word"
						  :content="Dictionary[word]"
						  :etymology="Etymology[word]"
						  @copyLink="copyLink" />
			</div>
		</div>
		<div v-else
			 class="my-8 w-full grid place-items-center">
			<div class="flex flex-col place-items-center gap-1">
				<div class="animate-spin inline-block w-8 h-8 border-4 border-ponish-l border-l-white rounded-full">
				</div>
				<p class="opacity-60">Loading the dictionary...</p>
			</div>
		</div>
	</Layout>
</template>

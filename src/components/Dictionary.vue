<script setup lang="ts">
	import '@fontsource/abhaya-libre/800.css';
	import { computed, nextTick, onMounted, ref } from 'vue';
	import type { DictionaryType, EtymologyType } from '../types';
	import WordCard from './WordCard.vue';

	const LETTERS = 'abdefghijklmnoprstuvwyz';
	const currentLetter = ref('a');
	const loaded = ref(false);

	const Dictionary = ref<DictionaryType>({});
	const Etymology = ref<EtymologyType>({});
	const word_refs = ref<{ [key: string]: InstanceType<typeof WordCard> | null }>({});

	const FilteredWords = computed(() => {
		return Object.keys(Dictionary.value).filter((w) => w.toLowerCase().startsWith(currentLetter.value));
	});

	async function loadJSON(path: string) {
		try {
			const data = await fetch(path);

			return await data.json();
		} catch (err) {
			console.error(err);
			throw err;
		}
	}
	function remValue(rem: number) {
		return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
	}

	onMounted(async () => {
		Dictionary.value = await loadJSON('/dictionary.json?ver=1.15');
		Etymology.value = await loadJSON('/etymology.json?ver=1.15');

		loaded.value = true;

		if (window.location.hash) {
			nextTick(() => {
				const word = decodeURI(window.location.hash.substring(1));
				if (Object.keys(Dictionary.value).includes(word)) {
					currentLetter.value = word.substring(0, 1).toLowerCase();

					nextTick(() => {
						const node = document.getElementById(`word-${word}`);

						if (node) {
							window.scrollTo({ top: node.offsetTop - remValue(1), behavior: 'smooth' });
						}

						if (word_refs.value[word]) {
							word_refs.value[word]!.card_active = true;
						}
					});
				}
			});
		}
	});
</script>

<template>
	<div>
		<noscript class="prose max-w-none text-center">
			<h1 class="text-4xl font-bold font-roboto-serif">Hey!</h1>
			<p>
				This page requires JavaScript to function. If you don't want to enable JavaScript - feel free to
				<a href="/download" class="text-ponish-900 underline">download the dictionary</a>
				instead!
			</p>
		</noscript>

		<div v-if="loaded">
			<nav class="flex flex-row flex-wrap place-content-center gap-2 mb-8">
				<button
					v-for="letter in LETTERS.split('')"
					:key="letter"
					:class="['text-xl p-1', { 'font-extrabold underline': currentLetter == letter }]"
					@click="currentLetter = letter"
				>
					{{ letter.toUpperCase() }}
				</button>
			</nav>

			<section class="flex flex-col gap-2">
				<WordCard
					v-for="word of FilteredWords"
					:key="`dictionary-${word}`"
					:word="word"
					:ref="
						(el) => {
							// what.
							word_refs[word] = el as InstanceType<typeof WordCard>;
						}
					"
					:content="Dictionary[word]"
					:etymology="Etymology[word]"
				></WordCard>
			</section>
		</div>
		<div v-else>
			<p class="italic text-center">Loading the dictionary...</p>
		</div>
	</div>
</template>

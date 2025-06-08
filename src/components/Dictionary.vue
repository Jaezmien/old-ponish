<script setup lang="ts">
	import '@fontsource/abhaya-libre/800.css';
	import { computed, nextTick, onMounted, ref } from 'vue';
	import type { DictionaryType, EtymologyType } from '../types';
	import WordCard from './WordCard.vue';

	const letters = ref('');
	const currentLetter = ref('');
	const loaded = ref(false);

	const Dictionary = ref<DictionaryType>({});
	const Etymology = ref<EtymologyType>({});
	const word_refs = ref<{ [key: string]: InstanceType<typeof WordCard> | null }>({});

	const FilteredWords = computed(() => {
		return Object.keys(Dictionary.value)
			.filter((w) => w.toLowerCase().startsWith(currentLetter.value))
			.sort((x, y) => x.localeCompare(y));
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

	function upperLettter(letter: string) {
		if (/^[a-z]$/.test(letter.toLowerCase())) {
			return letter.toUpperCase()
		}
		return letter
	}

	onMounted(async () => {
		Dictionary.value = await loadJSON('/dictionary.json?ver=1.18');
		Etymology.value = await loadJSON('/etymology.json?ver=1.18');

		const availableLetters = new Set<string>()
		for(const word of Object.keys(Dictionary.value)) {
			availableLetters.add(word[0].toLowerCase())
		}
		letters.value = Array.from(availableLetters.values()).join('')
		currentLetter.value = letters.value[0]

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
	<div id="dictionary" class="invisible">
		<div v-if="loaded">
			<nav class="flex flex-row flex-wrap place-content-center gap-2 mb-8">
				<button
					v-for="letter in letters.split('')"
					:key="letter"
					:class="['text-xl p-1', { 'font-extrabold underline': currentLetter == letter }]"
					@click="currentLetter = letter"
				>
					{{ upperLettter(letter) }}
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

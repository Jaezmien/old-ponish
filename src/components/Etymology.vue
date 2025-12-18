<script setup lang="ts">
import '@fontsource/abhaya-libre/800.css';
import { onMounted, ref } from 'vue';
import type { DictionaryType, EtymologyType } from '../types';
import WordCard from './WordCard.vue';
import Search from './Search.vue';
import SearchFilter from './SearchFilter.vue';

const Dictionary = ref<DictionaryType>({});
const Etymology = ref<EtymologyType>({});
const word_refs = ref<{ [key: string]: InstanceType<typeof WordCard> | null }>({});

const loaded = ref(false)

function case_word(word: string) {
	return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
}

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

function scrollToWord(word: string) {
	const node = document.getElementById(`word-${word}`);

	if (node) {
		window.scrollTo({ top: node.offsetTop - remValue(1), behavior: 'smooth' });
	}

	if (word_refs.value[word]) {
		word_refs.value[word]!.card_active = true;
	}
}

onMounted(async () => {
	Dictionary.value = await loadJSON('/dictionary.json?ver=1.18.1');
	Etymology.value = await loadJSON('/etymology.json?ver=1.18.1');

	loaded.value = true;
});
</script>

<template>
	<div id="search" class="invisible">
		<div v-if="loaded">
			<SearchFilter :data="Etymology" v-slot="_props" :filter="
				(i, k, v) => {
					return v.etymology?.toLocaleLowerCase().includes(i) ||
						v.description?.toLocaleLowerCase().includes(i) ||
						k.toLocaleLowerCase().includes(i)
				}
			">
				<Search :data="_props.words" v-slot="props" @link="scrollToWord">
					<WordCard
						v-for="word of props.words"
						:key="`search-${word}`"
						:word="word"

						:ref="
							(el) => {
								// what.
								word_refs[word] = el as InstanceType<typeof WordCard>;
							}
						"
					>
						<!-- HACK: don't do this. -->
						<section v-for="e in [Etymology[word]]">
								<h2 class="text-xl font-bold mr-2">Etymology</h2>
								<small class="inline" v-if="e.speech">({{ e.speech.map(case_word).join(' · ') }})</small>

								<p class="text-sm">{{ e.etymology }}</p>
								<p class="text-sm" v-if="e.description">:{{ e.description }}</p>

								<div class="mt-4 text-xs opacity-60 flex flex-row"
									v-if="e.note || e.credit">
									<div class="">
										<div v-if="e.note">
											<p>{{ e.note }}</p>
										</div>
									</div>
									<div class="ml-auto pl-4">
										<div v-if="e.credit">
											<p>
												Credits to
												<b class="font-bold">{{ e.credit }}</b>
											</p>
										</div>
									</div>
								</div>
						</section>
					</WordCard>
				</Search>
			</SearchFilter>
		</div>
		<div v-else>
			<p class="italic text-center">Loading the etymology...</p>
		</div>
	</div>
</template>

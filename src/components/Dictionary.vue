<script setup lang="ts">
import '@fontsource/abhaya-libre/800.css';
import { onMounted, ref } from 'vue';
import type { DictionaryType, EtymologyType } from '../types';
import Search from './Search.vue';
import WordCard from './WordCard.vue';

const Dictionary = ref<DictionaryType>({});
const Etymology = ref<EtymologyType>({});
const word_refs = ref<{ [key: string]: InstanceType<typeof WordCard> | null }>({});

const loaded = ref(false);

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
	<div id="dictionary" class="invisible">
		<div v-if="loaded">
			<Search :data="Dictionary" v-slot="props" @link="scrollToWord">

				<WordCard v-for="word of props.words" :key="`search-${word}`" :word="word"
					:nsfw="!!Dictionary[word].nsfw" :ref="(el) => {
							// what.
							word_refs[word] = el as InstanceType<typeof WordCard>;
					}">

					<!-- HACK: don't do this. -->
					<div v-for="w in [Dictionary[word]]">
						<section>
							<h2 class="inline text-xl font-bold mr-2">Definition</h2>
							<small class="inline" v-if="w.speech">({{ w.speech?.map(case_word).join(' · ') }})</small>

							<p class="text-sm">: {{ w.definition }}</p>

							<div v-if="w.character">
								<div
									v-if="w.character.english && w.character.english != w.definition">
									<p>
										<b>Character Name:</b>
										{{ w.character.english }}
									</p>
								</div>
								<div class="text-xs opacity-60" v-if="w.character.justification">
									<p>
										<b>Justification:</b>
										{{ w.character.justification }}
									</p>
								</div>
							</div>

							<div class="flex mt-4 text-xs opacity-60 gap-2" v-if="w.note || w.similar">
								<div class="text-left mt-auto">
									<p v-if="w.note">{{ w.note }}</p>
								</div>
								<div class="ml-auto text-right mt-auto">
									<p v-if="w.similar && typeof w.similar == 'object'">
										This word is also similar to {{ w.similar.join(', ') }}
									</p>
								</div>
							</div>
						</section>

						<section v-if="w.nsfw && Object.keys(w.nsfw).length">
							<hr class="border-gray-300 my-4" />

							<div v-if="w.nsfw.definition">
								<h4 class="text-xl font-bold">NSFW Description</h4>
								<p class="text-sm">{{ w.nsfw.definition }}</p>
							</div>
							<div v-if="w.nsfw.in_universe">
								<h4 class="text-xl font-bold">In Universe Reason</h4>
								<p class="text-sm">{{ w.nsfw.in_universe }}</p>
							</div>
							<div v-if="w.nsfw.out_universe">
								<h4 class="text-xl font-bold">Out Of Universe Reason</h4>
								<p class="text-sm">{{ w.nsfw.out_universe }}</p>
							</div>
						</section>

						<div v-for="e in [Etymology[word]]">
							<section v-if="e" v-once>
								<hr class="border-gray-300 my-4" />

								<h2 class="text-xl font-bold mr-2">Etymology</h2>
								<p class="text-sm">{{ e.etymology }}</p>

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
						</div>
					</div>
				</WordCard>

			</Search>
		</div>
		<div v-else>
			<p class="italic text-center">Loading the dictionary...</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { PropType, onUnmounted, ref, watch } from 'vue';
	import Chain from '../assets/icons/chain.svg?raw';
	import Chevron from '../assets/icons/chevron.svg?raw';
	import Warning from '../assets/icons/warning.svg?raw';
	import type { DictionaryWord, EtymologyWord } from '../types';

	const props = defineProps({
		word: {
			type: String,
			required: true,
		},
		content: {
			type: Object as PropType<DictionaryWord>,
			required: true,
		},
		etymology: {
			type: Object as PropType<EtymologyWord>,
			required: false,
			default: null,
		},
	});

	const word_anchor = ref(`word-${props.word}`);
	const card_active = ref(false);
	const chevron_css = ref<string[]>([]);

	defineExpose({
		card_active,
	});

	const copied = ref(false);
	const copied_timeout = ref<NodeJS.Timeout | null>(null);

	function case_word(word: string) {
		return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
	}

	function copy_link() {
		if (copied.value) return;

		const link = `${window.location.origin}${window.location.pathname}#${props.word}`;
		navigator.clipboard
			.writeText(link)
			.then(() => {
				copied.value = true;

				copied_timeout.value = setTimeout(() => {
					copied.value = false;
				}, 3000);
			})
			.catch((e) => {
				console.log('💥 An error has occured while trying to copy to clipboard!');
				console.error(e);
			});
	}
	function dismiss_copy() {
		if (!copied.value) return;

		if (copied_timeout.value) clearTimeout(copied_timeout.value);
		copied.value = false;
	}

	watch(card_active, (val) => {
		if (val === false) {
			chevron_css.value = ['negative-rotate'];
			setTimeout(() => {
				chevron_css.value = ['animate'];
			}, 1);
		} else if (val === true) {
			chevron_css.value = ['animate', 'full-rotate'];
		}
	});

	onUnmounted(() => {
		if (copied_timeout.value !== null) {
			clearTimeout(copied_timeout.value);
		}
	});
</script>

<template>
	<div :id="word_anchor" class="border-2 border-gray-300/80 rounded shadow w-full">
		<!-- Header -->
		<button
			class="px-4 py-2 flex flex-row items-center bg-gray-100 w-full group hover:font-bold"
			@click="card_active = !card_active"
		>
			<p>{{ word }}</p>

			<div title="This word is marked as Not Safe For Work" v-if="content.nsfw" class="ml-2">
				<div v-html="Warning" />
			</div>

			<div v-html="Chevron" :class="['ml-auto text-gray-400 group-hover:text-gray-800', ...chevron_css]"></div>
		</button>

		<!-- Contents -->
		<div v-show="card_active" class="bg-gray-50 p-4 border-t border-t-gray-300">
			<section>
				<button
					title="Copy a link to this word."
					class="float-right opacity-40 hover:opacity-80 transition-opacity duration-200 relative"
				>
					<div v-html="Chain" @click="copy_link"></div>

					<Transition name="pop">
						<div
							class="flex flex-col items-center absolute -top-[200%] -left-[100%]"
							v-if="copied"
							@click="dismiss_copy"
						>
							<p class="bg-gray-800 text-white px-2 py-1 rounded-xl">Copied!</p>
							<p class="w-0 h-0 border-8 border-solid border-transparent border-t-gray-800"></p>
						</div>
					</Transition>
				</button>

				<h2 class="inline text-xl font-bold mr-2">Definition</h2>
				<small class="inline">({{ content.speech?.map(case_word).join(' · ') }})</small>

				<p class="text-sm">: {{ content.definition }}</p>

				<div v-if="content.character">
					<div v-if="content.character.english && content.character.english != content.definition">
						<p>
							<b>Character Name:</b>
							{{ content.character.english }}
						</p>
					</div>
					<div class="text-xs opacity-60" v-if="content.character.justification">
						<p>
							<b>Justification:</b>
							{{ content.character.justification }}
						</p>
					</div>
				</div>

				<div class="flex mt-4 text-xs opacity-60 gap-2" v-if="content.note || content.similar">
					<div class="text-left mt-auto">
						<p v-if="content.note">{{ content.note }}</p>
					</div>
					<div class="ml-auto text-right mt-auto">
						<p v-if="content.similar && typeof content.similar == 'object'">
							This word is also similar to {{ content.similar.join(', ') }}
						</p>
					</div>
				</div>
			</section>

			<section v-if="content.nsfw && Object.keys(content.nsfw).length">
				<hr class="border-gray-300 my-4" />

				<div v-if="content.nsfw.definition">
					<h4 class="text-xl font-bold">NSFW Description</h4>
					<p class="text-sm">{{ content.nsfw.definition }}</p>
				</div>
				<div v-if="content.nsfw.in_universe">
					<h4 class="text-xl font-bold">In Universe Reason</h4>
					<p class="text-sm">{{ content.nsfw.in_universe }}</p>
				</div>
				<div v-if="content.nsfw.out_universe">
					<h4 class="text-xl font-bold">Out Of Universe Reason</h4>
					<p class="text-sm">{{ content.nsfw.out_universe }}</p>
				</div>
			</section>

			<section v-if="etymology" v-once>
				<hr class="border-gray-300 my-4" />

				<h2 class="text-xl font-bold mr-2">Etymology</h2>
				<p class="text-sm">{{ etymology.etymology }}</p>

				<div class="mt-4 text-xs opacity-60 flex flex-row" v-if="etymology.note || etymology.credit">
					<div class="">
						<div v-if="etymology.note">
							<p>{{ etymology.note }}</p>
						</div>
					</div>
					<div class="ml-auto pl-4">
						<div v-if="etymology.credit">
							<p>
								Credits to
								<b class="font-bold">{{ etymology.credit }}</b>
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.full-rotate {
		transform: rotate(180deg);
	}

	.negative-rotate {
		transform: rotate(-180deg);
	}

	.animate {
		transition: transform 200ms ease-in-out;
	}

	.pop-enter-active,
	.pop-leave-active {
		transition: opacity 200ms ease, transform 200ms ease;
	}

	.pop-enter-from,
	.pop-leave-to {
		opacity: 0;
		transform: translateY(10px);
	}
</style>

<script>
import Chevron from "@/components/svg/Chevron"
import Warning from "@/components/svg/Warning"
import Chain from "@/components/svg/Chain"

export default {
	components: {
		Chevron,
		Warning,
		Chain
	},

	props: {
		word: {
			type: String,
			required: true
		},
		content: {
			type: Object,
			required: true,
		},
		etymology: {
			type: Object,
			required: false,
			default: null,
		}
	},

	methods: {
		caseWord(/** @type {string} */ w) {
			return w.substring(0, 1).toUpperCase() + w.substring(1).toLowerCase()
		},
		copyLink() {
			this.$emit('copyLink', this.word)

			if (this.copiedTimeout) clearTimeout(this.copiedTimeout)

			this.copied = true
			this.copiedTimeout = setTimeout(() => {
				this.copied = false
				this.copiedTimeout = null
			}, 3000);
		}
	},

	watch: {
		active(value) {
			if (value == false) {
				this.chevronCSS = ['negative-rotate']
				setTimeout(() => {
					this.chevronCSS = ['animate']
				}, 1)
			}
			else if (value == true) {
				this.chevronCSS = ['animate full-rotate']
			}
		}
	},

	data() {
		return {
			active: false,
			quickReset: false,
			chevronCSS: [],

			copied: false,
			copiedTimeout: null,
		}
	}
}
</script>

<template>
	<div :id="'word-' + word"
		 class="rounded border border-light-800 w-full group shadow">

		<!-- Header -->
		<div class="px-4 py-2 flex flex-row items-center cursor-pointer bg-light-600"
			 @click="active = !active">
			<div class="montserrat flex flex-row place-items-center gap-2 group-hover:font-bold">
				<p>{{ word }}</p>

				<div title="This word is maked as Not Safe For Work"
					 v-if="content.NSFW">
					<Warning />
				</div>
			</div>

			<div class="ml-auto">
				<Chevron ref="chev"
						 :class="['text-gray-400 group-hover:text-gray-800', ...chevronCSS]" />
			</div>
		</div>
		<!-- Contents -->
		<div v-show="active"
			 class="p-4 border-t border-t-light-800">
			<div>
				<div class="flex flex-row">
					<div class="flex flex-row flex-wrap place-items-center gap-2">
						<h4 class="text-xl font-bold">Definition</h4>
						<small>({{ content['Part of Speech'].map(caseWord).join(' · ') }})</small>
					</div>
					<div @click="copyLink"
						 title="Copy a link to this word"
						 class="ml-auto relative basis-1 grid items-center p-1 cursor-pointer opacity-40 hover:opacity-80 transition-opacity duration-200">
						<Chain class="w-4 h-4" />
						<Transition name="fade">
							<div id="copied"
								 v-if="copied"
								 class="absolute -top-3 -left-1/3 text-xs">
								Copied!
							</div>
						</Transition>
					</div>
				</div>
				<p class="text-sm">: {{ content.English }}</p>

				<div v-if="content.Character"
					 class="my-4">
					<div v-if="content.Character.Name != content.English">
						<p><b>Character Name:</b> {{ content.Character.Name }}</p>
					</div>
					<div class="text-xs opacity-60"
						 v-if="content.Character.Justification">
						<p><b>Justification:</b> {{ content.Character.Justification }}</p>
					</div>
				</div>

				<div class="flex mt-4 text-xs opacity-60 gap-2">
					<div class="text-left mt-auto">
						<p v-if="content.Note">{{ content.Note }}</p>
					</div>
					<div class="ml-auto text-right mt-auto">
						<p v-if="content.Similar && typeof content.Similar == 'object'">This word is also
							similar to {{
									content.Similar.join(', ')
							}}</p>
					</div>
				</div>
			</div>

			<template v-if="content.NSFW && Object.keys(content.NSFW).length">
				<hr class="my-4">
				<div class="flex flex-col gap-4">
					<div v-if="content.NSFW.Description">
						<h4 class="text-xl font-bold">NSFW Description</h4>
						<p class="text-sm">{{ content.NSFW.Description }}</p>
					</div>
					<div v-if="content.NSFW['In Universe Reason']">
						<h4 class="text-xl font-bold">In Universe Reason</h4>
						<p class="text-sm">{{ content.NSFW['In Universe Reason'] }}</p>
					</div>
					<div v-if="content.NSFW['Out Of Universe Reason']">
						<h4 class="text-xl font-bold">Out Of Universe Reason</h4>
						<p class="text-sm">{{ content.NSFW['Out Of Universe Reason'] }}</p>
					</div>
				</div>
			</template>

			<template v-if="etymology">
				<hr class="my-4">
				<div>
					<h4 class="text-xl font-bold">Etymology</h4>
					<p class="text-sm">{{ etymology.Etymology }}</p>


					<div class="flex mt-4 text-xs opacity-60 gap-2">
						<div class="text-left mt-auto">
							<p v-if="etymology.Note">{{ etymology.Note }}</p>
						</div>
						<div class="ml-auto text-right mt-auto">
							<p v-if="etymology.Credit">
								Credits to <b>{{ etymology.Credit }}</b>
							</p>
						</div>
					</div>
				</div>
			</template>
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

.fade-enter-active,
.fade-leave-active {
	transition: opacity 200ms ease;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
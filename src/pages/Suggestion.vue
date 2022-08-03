<script>
import { Buffer } from "buffer";

export default {
	metaInfo: {
		title: 'Suggestion'
	},

	data() {
		return {
			suggestType: 1,
			encodedContent: '',

			inputWord: '',
			inputDescription: '',
			inputSuggestion: '',
		}
	},

	watch: {
		suggestType() {
			this.encodedContent = ''
		}
	},

	methods: {
		generate() {
			if (this.suggestType == 1) {
				const word = Buffer.from(this.inputWord.trim(), 'utf-8').toString('base64')
				const description = Buffer.from(this.inputDescription.trim(), 'utf-8').toString('base64')
				this.encodedContent = `ponish.word.${word}.${description}`
			}
			else if (this.suggestType == 2) {
				const idea = Buffer.from(this.inputSuggestion.trim(), 'utf-8').toString('base64');
				this.encodedContent = `ponish.idea.${idea}`
			}
			return false;
		},
		copyContent() {
			navigator.clipboard.writeText(this.encodedContent).catch(console.error);
		}
	}
}
</script>

<template>
	<Layout contentCSS="px-6 !py-6">
		<h1 class="text-5xl sm:text-6xl text-center text-ponish-d">Suggestion Generator</h1>
		<p class="mt-2 opacity-80 text-center">Is the bot offline? Use this website to generate your suggestions. Then,
			post it in
			the Discord server! The
			bot will automatically detect the message when it starts up.</p>

		<hr class="my-4">

		<div>
			<p class="text-center">I want to...</p>
			<div class="mt-4 flex flex-row flex-wrap justify-around">
				<div :class="['cursor-pointer flex-grow grid place-items-center px-4 py-2 border border-gray-400 rounded-t-lg bg-gray-100', { 'border-b-transparent !bg-white': suggestType == 1 }]"
					 @click="suggestType = 1">
					<p>Suggest a Word</p>
				</div>
				<div class="basis-[0.5rem] border-b border-gray-400"></div>
				<div :class="['cursor-pointer flex-grow grid place-items-center px-4 py-2 border border-gray-400 rounded-t-lg bg-gray-100', { 'border-b-transparent !bg-white': suggestType == 2 }]"
					 @click="suggestType = 2">
					<p>Suggest an Idea</p>
				</div>
			</div>
			<div v-show="suggestType > 0"
				 class="border-l border-b border-r border-gray-400 p-4">
				<form @submit.prevent="generate">
					<div v-if="suggestType == 1">
						<input type="text"
							   placeholder="Word"
							   required
							   pattern=".*\S+.*"
							   v-model="inputWord"
							   class="mb-4 w-full px-2 py-1 border border-light-800 focus:(border-ponish-d) transition-all duration-200 rounded">
						<input type="text"
							   placeholder="Description"
							   required
							   pattern=".*\S+.*"
							   v-model="inputDescription"
							   class="mb-4 w-full px-2 py-1 border border-light-800 focus:(border-ponish-d) transition-all duration-200 rounded">
						<button type="submit"
								class="block px-4 py-2 rounded-lg ml-auto mr-auto border border-ponish-d text-ponish-d hover:(bg-ponish-d text-white) transition-colors duration-200">Generate</button>
					</div>
					<div v-else-if="suggestType == 2">
						<input type="text"
							   placeholder="Idea"
							   required
							   pattern=".*\S+.*"
							   v-model="inputSuggestion"
							   class="mb-4 w-full px-2 py-1 border border-light-800 focus:(border-ponish-d) transition-all duration-200 rounded">
						<button type="submit"
								class="block px-6 py-2 rounded-lg ml-auto mr-auto border border-ponish-d text-ponish-d hover:(bg-ponish-d text-white) transition-colors duration-200">Generate</button>
					</div>
				</form>

				<div v-show="encodedContent">
					<hr class="my-4">

					<div class="text-center">
						<p>Send this message in #general <b>as is</b>, and the bot will pick it up.</p>
						<p class="my-2 overflow-x-scroll border border-gray-400 rounded bg-gray-800 text-white">{{
								encodedContent
						}}</p>
						<button @click="copyContent"
								class="block px-6 py-2 rounded-lg ml-auto mr-auto border border-green-600 text-green-600 hover:(bg-green-600 text-white) tarnsition-colors duration-200">Copy</button>
					</div>
				</div>
			</div>
		</div>
	</Layout>
</template>

<style lang="scss" scoped>
input[type=text]:focus {
	box-shadow: 0 0 0 0.3rem hsla(202, 34%, 67%, 0.4);
}
</style>
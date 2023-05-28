<script setup lang="ts">
	import { onMounted, ref } from 'vue';

	const currentLetter = ref('a');
	const loaded = ref(false);

	async function loadJSON(path: string) {
		try {
			const data = await fetch(path);

			return await data.json();
		} catch (err) {
			console.error(err);
			throw err;
		}
	}

	onMounted(async () => {
		// loadJSON()
		loaded.value = true;
	});
</script>

<template>
	<div>
		<div v-if="loaded">
			<p>Huzzah!</p>
		</div>
		<div v-else>
			<p>Loading the dictionary...</p>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>

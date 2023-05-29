<script setup lang="ts">
	import '@fontsource/noto-sans-runic';
	import '@fontsource/roboto-serif';

	import { onMounted, ref } from 'vue';

	const state = ref(0);
	const SWITCH_DELAY = 8000;

	function switch_state() {
		state.value = (state.value + 1) % 2;
		setTimeout(switch_state, SWITCH_DELAY);
	}

	onMounted(() => {
		setTimeout(switch_state, SWITCH_DELAY);
	});
</script>

<template>
	<div>
		<h1 class="h-12 md:h-14">
			<transition name="fade" mode="out-in">
				<span class="font-bold text-5xl md:text-6xl font-roboto-serif" v-if="state === 0">Halla!</span>
				<span class="font-bold text-5xl md:text-6xl font-sans-runic" v-else>ᚺᚨᛚᛚᚨ!</span>
			</transition>
		</h1>
	</div>
</template>

<style lang="scss">
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s ease;
	}
	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
</style>

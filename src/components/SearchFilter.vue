<script setup lang="ts" generic="T">
import { computed, ref } from 'vue';

const props = defineProps<{
	data: Record<string, T>;
	filter: (input: string, key: string, value: T) => boolean;
}>()

const filter = ref("");

const filtered = computed(() => {
	const e = Object
		.entries(props.data)
		.filter(([k, v]) => props.filter(filter.value, k, v))

	const d: Record<string, T> = {}
	for(const [k, v] of e) {
		d[k] = v
	}

	return d
})
</script>

<template>
  <nav class="">
    <input
      type="text"
      v-model="filter"
      class="p-2 w-full rounded"
      placeholder="Type some keywords here..."
    />
  </nav>

  <slot :words="filtered"/>
</template>


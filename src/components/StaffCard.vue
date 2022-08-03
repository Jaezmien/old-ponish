<script>
export default {
	props: {
		staff: Object,
		default: () => {
			return {
				Name: "",
				Discord: "",
				Role: ""
			}
		}
	}
}
</script>

<template>
	<div class="w-[20rem] p-5 border border-light-800 rounded shadow">
		<h1 class="text-2xl font-bold">{{ staff.Name }}</h1>
		<h4 class="text-sm opacity-80 -mt-1">{{ staff.Discord }}</h4>
		<p class="mt-2">{{ staff.Role }}</p>
	</div>
</template>
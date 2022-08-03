<script>
import ContactInfo from "@/data/contacts.yaml"
import StaffCard from '@/components/StaffCard.vue'

export default {
	data() {
		return {
			ContactInfo,
			StaffCard
		};
	},
	metaInfo: {
		title: "Contact"
	},
	components: { StaffCard }
}
</script>


<template>
	<Layout contentCSS="px-6 !py-6 grid place-items-center">
		<h1 class="text-5xl sm:text-6xl text-center text-ponish-d">Staff</h1>

		<div class="mt-8 flex flex-row flex-wrap justify-center gap-4">
			<StaffCard v-for="staff in ContactInfo"
					   :key="staff.Name"
					   :staff="staff" />
		</div>
	</Layout>
</template>
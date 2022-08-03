<template>
	<Layout contentCSS="px-6 !py-6 grid place-items-center">
		<h1 class="text-5xl sm:text-6xl text-center text-ponish-d">Downloads</h1>

		<main class="flex flex-col place-items-center my-8">
			<div class="flex flex-row flex-wrap gap-4 text-xl place-items-center place-content-center text-center">
				<a class="px-6 py-3 border border-dark-50 hover:(bg-dark-50 text-white) transition-colors duration-200 rounded"
				   href="https://cdn.discordapp.com/attachments/570668311361224724/947577014737567794/1.14_dictionary.pdf">Old
					Ponish Dictionary</a>
				<a class="px-6 py-3 border border-dark-50 hover:(bg-dark-50 text-white) transition-colors duration-200 rounded"
				   href="https://cdn.discordapp.com/attachments/570668311361224724/947577015404462180/Old_Ponish_Quick_Grammar_Guide_1.14-1.pdf">Quick
					Grammar Guide</a>
			</div>

			<small class="mt-2 opacity-80">Current Release: 1.14</small>
		</main>

		<section>
			<ul class="list-disc ml-4">
				<li><a class="underline"
					   href="https://docs.google.com/spreadsheets/d/1naMlQAieU-Xy4xReG0HTM-PT9_1hrH6i0TY3Xgwgqx0/edit?usp=drive_web">Copy
						of OP Translation</a> - Archive of the original Old Ponish Translation</li>
				<li><a class="underline"
					   href="https://www.google.com/url?q=https%3A%2F%2Fpastebin.com%2FPYbAKGf7&sa=D&sntz=1&usg=AOvVaw16emvw6UN5slpDyERKYMJY">hackd's
						Vocabulary Etymology</a> - Origins/Etymologies of a large batch of the first words, all from
					hackd</li>
			</ul>
		</section>
	</Layout>
</template>

<script>
export default {
	metaInfo: {
		title: 'Downloads'
	}
}
</script>

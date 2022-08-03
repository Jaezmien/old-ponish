<script>
import Book from "@/components/svg/Book";

export default {
	components: {
		Book
	},

	metaInfo: {
		title: 'Homepage'
	}
}
</script>

<template>
	<Layout contentCSS="!pt-0">

		<header class="relative h-60 overflow-clip bg-white">
			<g-image src="~/assets/oldponish.png"
					 alt="Old Ponish Icon"
					 :immediate="true"
					 class="absolute w-full h-full object-cover filter blur-lg transform scale-110" />
			<div class="absolute w-full h-full grid place-items-center text-center text-white">
				<div class="text-shadow-md">
					<h1 class="text-6xl font-bold">Halla!</h1>
					<h4>Welcome to the Old Ponish Project</h4>
				</div>
			</div>
		</header>

		<div class="text-center text-ponish-text px-4 py-8">
			<section>
				<span>
					<span class="pr-1">
						<Book class="!w-8 !h-8" />
					</span>
					<b class="text-2xl text-ponish-d">
						What is Old Ponish?
					</b>
				</span>
				<div
					 class="m-2 p-4 rounded border border-light-800 rounded border-l-dark-100 border-l-4 text-left indent-sm">
					<blockquote cite="https://www.fimfiction.net/blog/771938/how-to-speak-old-ponish">
						<p>
							Old Ponish first appeared in My Little Pony: Friendship is Magic, <abbr
								  title="Uncommon Bond">Season 7 Episode 24</abbr>. It is an ancient language used by
							ponies used for writing official documents and journals alike.</p>
						<p>Sunburst states that he owns a copy of History of Equestria written in its "Original Old
							Ponish", Twilight also translates some Old Ponish sentences found in Starswirl's journal.
						</p>
						<p>Using the sentences that Twilight and Sunburst already translated, it has been discovered
							that the language shares a resemblance to Old English and has Germanic roots.
						</p>
					</blockquote>
					<figcaption class="opacity-80">— TimeLoad (2017, <a
						   href="https://www.fimfiction.net/blog/771938/how-to-speak-old-ponish"
						   class="underline">"How To Speak Old
							Ponish"</a>)</figcaption>
				</div>
				<!--<br>
				<p class="opacity-40">(TODO: More stuff if needed)</p>-->
			</section>
		</div>

	</Layout>
</template>

<style lang="scss">
.home-links a {
	margin-right: 1rem;
}
</style>

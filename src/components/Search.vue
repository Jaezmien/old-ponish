<script setup lang="ts" generic="T">
import { ref, computed, watch, nextTick, onMounted, unref } from "vue";

const props = defineProps<{
  data: Record<string, T>;
}>();
const emit = defineEmits<{
  (e: "link", word: string): void;
}>();

const letters = ref<string[]>([]);
const currentLetter = ref("");

const filtered = computed(() => {
  const result = Object.keys(props.data)
    .filter((w) => w.toLowerCase().startsWith(currentLetter.value))
    .sort((x, y) => x.localeCompare(y));

  return result;
});

watch(
  () => props.data,
  (x) => {
    const availableLetters = new Set<string>();
    for (const word of Object.keys(x)) {
      availableLetters.add(word[0].toLowerCase());
    }
    letters.value = Array.from(availableLetters);
    currentLetter.value = letters.value[0];
  },
  {
    immediate: true,
  }
);

function upperLettter(letter: string) {
  if (/^[a-z]$/.test(letter.toLowerCase())) {
    return letter.toUpperCase();
  }
  return letter;
}

function loadLocationHash() {
  if (!window.location.hash) return;

  const word = decodeURI(window.location.hash.substring(1));
  if (Object.keys(props.data).includes(word)) {
    currentLetter.value = word.substring(0, 1).toLowerCase();

    nextTick(() => {
      emit("link", word);
    });
  }
}

onMounted(async () => {
  nextTick(() => loadLocationHash());
});
</script>

<template>
  <nav class="flex flex-row flex-wrap place-content-center gap-2">
    <button
      v-for="letter in letters"
      :key="letter"
      :class="[
        'text-xl p-1',
        { 'font-extrabold underline': currentLetter == letter },
      ]"
      @click="currentLetter = letter"
    >
      {{ upperLettter(letter) }}
    </button>
  </nav>

  <section class="flex flex-col gap-2">
    <slot :words="filtered" />
  </section>
</template>

import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useHighlightsStore = defineStore('highlights', () => {
  const highlights = ref([]);

  function replace (highlights) {
    highlights.value = highlights;
  }

  return { highlights, replace };
});
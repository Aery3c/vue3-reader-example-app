import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useHighlightsStore = defineStore('highlights', () => {
  const highlights = ref([]);

  function replace (hts) {
    highlights.value = hts;
  }

  return { highlights, replace };
});
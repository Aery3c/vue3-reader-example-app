import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useHighlightsStore = defineStore('highlights', () => {
  const highlights = ref([]);

  function replace (hts) {
    highlights.value = [...hts];
  }

  function remove (ht) {
    let index;
    if ((index = highlights.value.indexOf(ht)) !== -1) {
      highlights.value.splice(index, 1);
    }
  }

  return { highlights, replace, remove };
});
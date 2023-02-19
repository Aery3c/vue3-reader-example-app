<script setup>
import { storeToRefs } from 'pinia'
import { ElCard, ElScrollbar, ElButton, ElIcon, ElSpace } from 'element-plus';
import { MoreFilled } from '@element-plus/icons-vue';
import { computed } from 'vue';
import { useHighlightsStore } from '@/stores/highlights';

const highlightStore = useHighlightsStore();
const { highlights } = storeToRefs(highlightStore);
const { remove } = highlightStore;

const sortHighlights = computed(() => [...highlights.value].sort(
  (a, b) => a.range.compareBoundaryPoints(Range.START_TO_START, b.range))
);

function handleClickMoreBtn (highlight) {
  remove(highlight);
}

</script>

<template>
  <ElScrollbar class="sidebar">
    <ElSpace direction="vertical" fill size="large" class="space">
      <ElCard v-for="highlight in sortHighlights" :key="highlight" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>Range: {{ highlight.characterRange.start }} -> {{ highlight.characterRange.end }}</span>
            <ElButton text @click="handleClickMoreBtn(highlight)">
              <ElIcon>
                <MoreFilled />
              </ElIcon>
            </ElButton>
          </div>
        </template>
        {{ highlight.getText() }}
      </ElCard>
    </ElSpace>
  </ElScrollbar>
</template>

<style scoped lang="scss">
.sidebar {
  position: fixed;
  width: 256px;
  padding: 24px 32px 0;
  .space {
    width: 100%;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
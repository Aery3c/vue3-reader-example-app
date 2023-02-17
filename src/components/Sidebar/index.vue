<script setup>
import { storeToRefs } from 'pinia'
import { ElCard, ElScrollbar, ElButton, ElIcon, ElSpace } from 'element-plus';
import { MoreFilled } from '@element-plus/icons-vue';
import { useHighlightsStore } from '@/stores/highlights';

const { highlights } = storeToRefs(useHighlightsStore());

</script>

<template>
  <ElScrollbar class="sidebar">
    <ElSpace direction="vertical" fill size="large">
      <ElCard v-for="highlight in highlights" shadow="hover">
        <template #header>
          <div class="card-header">
            <span>Mark</span>
            <ElButton text>
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
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
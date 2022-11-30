<script setup>
import { defineProps, ref } from 'vue';
import { ElButton, ElIcon, ElButtonGroup } from 'element-plus';
import { EditPen, Edit, Delete } from '@element-plus/icons-vue';
import { createPopper } from '@popperjs/core';

const { type } = defineProps({
  type: String
});

const el = ref(null);

defineExpose({
  el
});

</script>

<template>
  <div class="highlight-operation" role="tooltip" ref="el">
    <ElButtonGroup>
      <ElButton type="primary">
          <ElIcon><EditPen /></ElIcon>
        </ElButton>
        <ElButton type="primary">
          <ElIcon><Edit /></ElIcon>
        </ElButton>
      <!-- <ElButton type="primary">
        <ElIcon><Delete /></ElIcon>Remove Note
      </ElButton> -->
    </ElButtonGroup>
    <div class="highlight-operation-arrow"></div>
  </div>
</template>

<style scoped lang="scss">
  .highlight-operation {
    position: absolute;
    z-index: 500;
    .highlight-operation-arrow, .highlight-operation-arrow::after {
      position: inherit;
      width: 8px;
      height: 8px;
      background-color: var(--el-color-primary);
    }

    .highlight-operation-arrow {
      visibility: hidden;
      bottom: -4px;
      left: calc(50% - 4px);
    }

    .highlight-operation-arrow::after {
      visibility: visible;
      content: '';
      transform: rotate(45deg);
    }
  }

</style>
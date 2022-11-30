<script setup>
import { defineProps, ref, shallowRef, onMounted, defineEmits } from 'vue';
import { ElButton, ElIcon, ElButtonGroup } from 'element-plus';
import { EditPen, Edit, Delete } from '@element-plus/icons-vue';
import { Highlighter } from 'highlighter/build/lib';

const { operationType } = defineProps({
  operationType: {
    type: String,
    default: 'highlight' // highlight and remove
  }
});

const emit = defineEmits(['onHighlighted', 'onAnnotationed', 'onClickHighlightEl']);

const el = ref(null);

defineExpose({ el });

const highlighterRef = shallowRef({ instance: null });

onMounted(() => {
  let highlighter = highlighterRef.value.instance = new Highlighter();
  highlighter.on('click', () => emit('onClickHighlightEl'));
});

function handleClickHighlight () {
  const highlighter = highlighterRef.value.instance;
  highlighter.highlightASelection();
  emit('onHighlighted');
}

</script>

<template>
  <div class="highlight-operation" role="tooltip" ref="el">
    <ElButtonGroup>
      <template v-if="operationType === 'highlight'">
        <ElButton type="primary" @click="handleClickHighlight">
          <ElIcon><EditPen /></ElIcon>
        </ElButton>
        <ElButton type="primary">
          <ElIcon><Edit /></ElIcon>
        </ElButton>
      </template>
      <ElButton type="primary" v-else>
        <ElIcon><Delete /></ElIcon>Remove Note
      </ElButton>
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
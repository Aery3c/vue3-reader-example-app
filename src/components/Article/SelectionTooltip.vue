<script setup>
import { shallowRef, onMounted, ref, provide } from "vue";
import { ElButton, ElIcon, ElButtonGroup } from 'element-plus';
import { EditPen, Edit, Delete } from '@element-plus/icons-vue';
import { createPopper } from '@popperjs/core';
import { generateClientRect } from '@/utils';
import { Highlighter } from 'highlighter';

const HIGHLIGHT = Symbol();
const REMOVE = Symbol();

const operationType = ref(HIGHLIGHT);
const initX = -200;

const popperRef = shallowRef({ instance: null });
const highlighterRef = shallowRef({ instance: null });
const tooltipRef = ref(null);
const currentHighlights = ref([]);

provide('currentHighlights', currentHighlights);
provide('highlighter', highlighterRef);

const virtualElement = {
  getBoundingClientRect: () => generateClientRect(initX, 0),
};

function handleMouseup () {
  operationType.value = HIGHLIGHT;
  const sel = window.getSelection(), range = sel.getRangeAt(0);

  let x = initX, y = 0;

  if (!sel.isCollapsed && sel.toString() !== '') {
    const clientRect = range.getBoundingClientRect();

    x = clientRect.x + clientRect.width / 2;
    y = clientRect.y;
  }

  updatePopperPosition(x, y);
}

function handleMousedown () {
  window.getSelection().removeAllRanges();
}

function handleClickHighlightBtn () {
  const highlighter = highlighterRef.value.instance;

  currentHighlights.value.push(...highlighter.useSelection({ referenceNodeId: 'acticle' }));
  updatePopperPosition(initX, 0);
}

let promise;
async function handleClickHighlightEl (highlight) {
  operationType.value = REMOVE;
  const clientRect = highlight.toRange().getBoundingClientRect();
  updatePopperPosition(clientRect.x + clientRect.width / 2, clientRect.y);

  await requireAuthUserClickRemove();

  highlighterRef.value.instance.removeHighlight(highlight);
  const index = currentHighlights.value.indexOf(highlight);
  currentHighlights.value.splice(index, 1);
}

function handleClickRemoveBtn () {
  updatePopperPosition(initX, 0);
  promise.resolve();
}

async function requireAuthUserClickRemove () {
  return new Promise(resolve => {
    promise = { resolve };
  });
}

/**
 * 
 * @param {number} x 
 * @param {number} y 
 */
function updatePopperPosition (x, y) {
  virtualElement.getBoundingClientRect = () => generateClientRect(x, y);
  popperRef.value.instance.forceUpdate();
}

onMounted(() => {
  popperRef.value.instance = createPopper(
    virtualElement,
    tooltipRef.value,
    {
      placement: 'top',
      modifiers: [
        { name: 'eventListeners', options: { scroll: false } },
        { name: 'offset', options: { offset: [0, 8] } }
      ]
    }
  );
  let highlighter = highlighterRef.value.instance = new Highlighter();
  highlighter.on('click', handleClickHighlightEl);

});

</script>

<template>
<div @mouseup="handleMouseup" @mousedown="handleMousedown">
  <slot name="selectionTooltip"></slot>
</div>
<div class="highlight-operation" role="tooltip" ref="tooltipRef">
  <ElButtonGroup>
    <template v-if="operationType === HIGHLIGHT">
      <ElButton type="primary" @click="handleClickHighlightBtn">
        <ElIcon><EditPen /></ElIcon>
      </ElButton>
      <ElButton type="primary">
        <ElIcon><Edit /></ElIcon>
      </ElButton>
    </template>
    <ElButton type="primary" @click="handleClickRemoveBtn" v-else>
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

<style>
  .highlight {
    background-color: yellow;
    cursor: pointer;
  }
</style>
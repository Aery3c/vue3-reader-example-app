<script setup>
import { ref, onMounted, shallowRef } from 'vue';
import { createPopper } from '@popperjs/core';
import { generateClientRect } from '@/utils';
import { dom } from 'highlighter/build/lib';
import SelectionTooltip from './SelectionTooltip.vue';
import Content from './Content.vue';

const operationType = ref('highlight');
const tooltipRef = ref(null);
const popperRef = shallowRef({ instance: null });

const virtualElement = {
  getBoundingClientRect: () => generateClientRect(-1000),
};

onMounted(() => {
  popperRef.value.instance = createPopper(
    virtualElement,
    tooltipRef.value.el,
    {
      placement: 'top',
      modifiers: [
        { name: 'eventListeners', options: { scroll: false } },
        { name: 'offset', options: { offset: [0, 8] } }
      ]
    }
  );
});

function handleMouseUp () {
  const sel = window.getSelection();
  const [ range ] = dom.getAllRange(sel);

  let x = -100, y = 0;

  if (!sel.isCollapsed && sel.toString() !== '') {
    const clientRect = range.getBoundingClientRect();

    // /** test range rect; */
    // highlightClientRect(range);
    x = clientRect.x + clientRect.width / 2;
    y = clientRect.y;
  }

  virtualElement.getBoundingClientRect = () => generateClientRect(x, y);

  popperRef.value.instance.forceUpdate();
}

function handleMouseDown () {
  window.getSelection().removeAllRanges();
}

function onHighlighted () {
  virtualElement.getBoundingClientRect = () => generateClientRect(-100);
  popperRef.value.instance.forceUpdate();
}

function onClickHighlightEl () {
  // operationType.value = 'remove';
  console.log('click');
}

</script>

<template>
  <article 
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp" 
    ref="rootRef"
  >
    <Content />
  </article>

  <SelectionTooltip
    ref="tooltipRef"
    @on-Highlighted="onHighlighted"
    :operationType="operationType"
    @on-Click-Highlight-El="onClickHighlightEl"
  />
</template>

<style scoped lang="scss">
article {
  padding: 0 10%;
}
</style>

<style>
.highlight {
  background-color: yellow;
  cursor: pointer;
}
</style>
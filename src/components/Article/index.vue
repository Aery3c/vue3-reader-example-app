<script setup>
import SelectionTooltip from './SelectionTooltip.vue';
import Content from './Content.vue';
</script>

<template>
  <SelectionTooltip>
    <template #selectionTooltip>
      <Content />
    </template>
  </SelectionTooltip>
</template>
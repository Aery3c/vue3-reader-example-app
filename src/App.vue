<script setup>
import Navbar from './components/Navbar/index.vue';
import Sidebar from './components/Sidebar/index.vue';
import Article from './components/Article/index.vue';
import { ElContainer, ElAside, ElMain } from 'element-plus'
</script>

<template>
  <Navbar />
  <div class="common-layout">
    <ElContainer>
      <ElAside width="256px">
        <Sidebar />
      </ElAside>
      <ElMain>
        <Article />
      </ElMain>
    </ElContainer>
  </div>
</template>
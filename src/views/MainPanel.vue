<template>
  <div class="newsnow-main-panel">
    <h1>新闻聚合插件</h1>
    <NewsList />
  </div>
</template>

<script lang="ts" setup>
import NewsList from '@/components/NewsList.vue';

/**
 * MainPanel组件是新闻聚合插件的主界面。
 * 它将负责展示新闻列表和用户交互元素。
 */
</script>

<style scoped>
.newsnow-main-panel {
  padding: 16px;
  text-align: center;
}
</style>
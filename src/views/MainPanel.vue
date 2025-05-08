<template>
  <div class="main-panel">
    <NewsList />
  </div>
</template>

<script lang="ts" setup>
import NewsList from '@/components/NewsList.vue';
</script>

<style scoped>
.main-panel {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
</style>
<template>
  <div class="newsnow-container">
    <MainPanel />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import MainPanel from '@/views/MainPanel.vue';
import type NewsNowPlugin from './main'; // 确保路径正确，相对于 App.vue

const plugin = inject<NewsNowPlugin>('plugin');

/**
 * 打开插件设置对话框
 */
const openSettingsDialog = () => {
  if (plugin) {
    plugin.openSetting();
  } else {
    console.error("Plugin instance not available for opening settings.");
  }
};
</script>

<style scoped>
.newsnow-container {
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--b3-theme-background);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

button {
  margin-bottom: 20px;
  padding: 10px 22px;
  cursor: pointer;
  background-color: var(--b3-theme-primary);
  color: var(--b3-theme-on-primary);
  border: none;
  border-radius: 6px;
  transition: background-color 0.2s, transform 0.15s, box-shadow 0.15s;
  font-weight: 500;
  font-size: 15px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

button:hover {
  background-color: var(--b3-theme-primary-light);
  transform: translateY(-2px);
  box-shadow: 0 3px 6px rgba(0,0,0,0.15);
}

button:active {
  transform: translateY(-1px);
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}
</style>
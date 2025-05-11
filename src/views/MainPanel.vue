<template>
  <div class="main-panel">
    <div class="panel-header">
      <h2 class="panel-title">{{ i18n.newsTitle || '新闻列表' }}</h2>
      <button @click="goToSettings" class="settings-button" :title="i18n.settingsButtonTooltip || '打开设置'">
        <!-- 使用思源笔记内置图标或SVG图标 -->
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M904 512c0 9.6-0.6 19.1-1.9 28.5l-47.8-27.6c2.3-9.4 3.6-19.1 3.6-29 0-107.7-87.4-195.1-195.1-195.1S467.7 404.3 467.7 512c0 9.9 1.3 19.6 3.6 29l-47.8 27.6A249.5 249.5 0 0 1 421.6 512c0-137.6 111.8-249.4 249.4-249.4s249.4 111.8 249.4 249.4zM708.9 658.1l47.8 27.6c-12.9 33.2-31.8 63.4-55.8 89.8l-39.6-22.8c19.8-22.1 36.1-47.8 47.6-74.6zM512 708.9c9.9 0 19.6-1.3 29-3.6l27.6 47.8A249.5 249.5 0 0 1 512 761.3c-107.7 0-195.1-87.4-195.1-195.1s87.4-195.1 195.1-195.1c9.9 0 19.6 1.3 29 3.6l27.6-47.8A249.5 249.5 0 0 0 512 262.7C374.4 262.7 262.6 374.5 262.6 512S374.4 761.3 512 761.3zm0-421.6c-9.6 0-19.1 0.6-28.5 1.9l-27.6-47.8c33.2-12.9 63.4-31.8 89.8-55.8l22.8 39.6C547.8 244.9 522.1 261.2 512 287.3zM315.1 365.9l-47.8-27.6c12.9-33.2 31.8-63.4 55.8-89.8l39.6 22.8C342.9 293.4 326.6 319.1 315.1 346zm0 280.2l-47.8 27.6C280.2 706.9 299.1 737.1 323.1 763.5l39.6-22.8c-19.8-22.1-36.1-47.8-47.6-74.6zM512 904c-9.6 0-19.1-0.6-28.5-1.9l-27.6 47.8c33.2 12.9 63.4 31.8 89.8 55.8l22.8-39.6c-22.1-19.8-47.8-36.1-74.6-47.6A195.93 195.93 0 0 1 512 904zm225.4-146.7l39.6 22.8c24-26.4 42.9-56.6 55.8-89.8l-47.8-27.6c-11.5 26.8-27.8 52.5-47.6 74.6z"></path></svg>
      </button>
    </div>
    <NewsList />
  </div>
</template>

<script lang="ts" setup>
import NewsList from '@/components/NewsList.vue';
import { usePlugin } from '@/main';
import { computed } from 'vue';

// Function-level comment: Defines the emits for the MainPanel component.
// 'show-settings' is emitted to request a view switch to the settings panel.
const emit = defineEmits(['show-settings']);

// Function-level comment: Accesses the plugin instance for i18n.
const plugin = usePlugin();

// Function-level comment: Provides localized strings for the main panel.
const i18n = computed(() => {
  return {
    newsTitle: plugin.i18n.newsTitle || '新闻',
    settingsButtonTooltip: plugin.i18n.settingsButtonTooltip || '设置',
  };
});

/**
 * @description: Emits an event to navigate to the settings view.
 */
const goToSettings = () => {
  emit('show-settings');
  console.log('SiyuanNewsPlugin: goToSettings called, emitting show-settings.');
};

console.log('SiyuanNewsPlugin: MainPanel.vue setup executed.');
</script>

<style scoped>
.main-panel {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--b3-theme-background, #fdfdfd);
  color: var(--b3-theme-on-background, #333);
  box-sizing: border-box;
  overflow: hidden;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid var(--b3-border-color, #e0e0e0);
  background-color: var(--b3-theme-surface, #fff);
  flex-shrink: 0; /* Prevent header from shrinking */
}

.panel-title {
  margin: 0;
  font-size: 1.1em; /* Slightly smaller for a cleaner look */
  font-weight: 600; /* Bolder title */
  color: var(--b3-theme-on-surface, #2c3e50);
}

.settings-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.settings-button svg {
  fill: var(--b3-theme-on-surface, #555);
  width: 18px; /* Adjust icon size */
  height: 18px;
}

.settings-button:hover {
  background-color: var(--b3-theme-surface-lighter, #f0f0f0);
}

/* Ensure NewsList takes remaining space and is scrollable */
:deep(.news-list) { /* Target .news-list directly as it's the root of NewsList.vue */
  flex-grow: 1;
  overflow-y: auto;
  /* Padding will be handled within NewsList.vue for better control */
}
</style>
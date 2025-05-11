<template>
  <div id="siyuan-news-plugin-main-container" class="siyuan-news-plugin-app">
    <component :is="currentView" @show-settings="showSettingsView" @back="showMainView" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, shallowRef } from 'vue';
import MainPanel from '@/views/MainPanel.vue';
import SettingsPanel from '@/views/SettingsPanel.vue';

// Function-level comment: This script block is the setup function for App.vue.
// It manages the current view (MainPanel or SettingsPanel) and handles view switching.

// shallowRef is used for components to optimize performance, as the component instances themselves don't need deep reactivity.
const currentViewComponent = shallowRef(MainPanel);

/**
 * @description: Computed property to get the current view component.
 */
const currentView = computed(() => currentViewComponent.value);

/**
 * @description: Switches the view to the SettingsPanel.
 */
const showSettingsView = () => {
  currentViewComponent.value = SettingsPanel;
  console.log('SiyuanNewsPlugin: Switched to SettingsPanel view.');
};

/**
 * @description: Switches the view back to the MainPanel.
 */
const showMainView = () => {
  currentViewComponent.value = MainPanel;
  console.log('SiyuanNewsPlugin: Switched to MainPanel view.');
};

console.log('SiyuanNewsPlugin: App.vue setup executed, view management initialized.');
</script>

<style scoped>
.siyuan-news-plugin-app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* Basic styling, will be enhanced with Siyuan CSS variables for theme consistency */
  background-color: var(--b3-theme-background, #ffffff); /* Default to white if Siyuan var not found */
  color: var(--b3-theme-on-background, #000000); /* Default to black */
  overflow: hidden; /* Prevent scrollbars on the app root, manage scrolling within components */
}

/* Ensure the container fills the dialog space */
#siyuan-news-plugin-main-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
</style>

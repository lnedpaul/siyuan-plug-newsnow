<template>
  <div class="settings-panel">
    <h2>{{ i18n.settingsTitle }}</h2>
    <p>{{ i18n.settingsDescription }}</p>

    <div class="news-sources-management">
      <h3>{{ i18n.manageNewsSourcesTitle }}</h3>
      <ul v-if="newsStore.newsSources.length > 0" class="news-sources-list">
        <li v-for="(source, index) in newsStore.newsSources" :key="index" class="news-source-item">
          <span>{{ source }}</span>
          <div class="source-actions">
            <button @click="editSource(index)" class="action-button edit-button">{{ i18n.editButton }}</button>
            <button @click="deleteSource(index)" class="action-button delete-button">{{ i18n.deleteButton }}</button>
          </div>
        </li>
      </ul>
      <p v-else>{{ i18n.noNewsSources }}</p>

      <div class="add-source-form">
        <input type="text" v-model="newSourceUrl" :placeholder="i18n.addSourcePlaceholder" />
        <button @click="addSource" class="action-button add-button">{{ i18n.addButton }}</button>
      </div>
    </div>

    <button @click="goBack" class="back-button">{{ i18n.backButton }}</button>
  </div>
</template>

<script lang="ts" setup>
import { usePlugin } from '@/main';
import { ref, computed } from 'vue';
import { useNewsStore } from '@/store/newsStore';

// Function-level comment: Defines the emits for the SettingsPanel component.
const emit = defineEmits(['back']);

// Function-level comment: Accesses the plugin instance to use its i18n capabilities.
const plugin = usePlugin();
const newsStore = useNewsStore();

const newSourceUrl = ref('');

// Function-level comment: Provides localized strings for the settings panel.
const i18n = computed(() => {
  return {
    settingsTitle: plugin.i18n.settingsTitle || '插件设置',
    settingsDescription: plugin.i18n.settingsDescription || '在这里配置新闻源和其他选项。',
    backButton: plugin.i18n.backButton || '返回新闻列表',
    manageNewsSourcesTitle: plugin.i18n.manageNewsSourcesTitle || '管理新闻源',
    noNewsSources: plugin.i18n.noNewsSources || '暂无新闻源。',
    addSourcePlaceholder: plugin.i18n.addSourcePlaceholder || '输入新的新闻源 URL',
    addButton: plugin.i18n.addButton || '添加',
    editButton: plugin.i18n.editButton || '修改',
    deleteButton: plugin.i18n.deleteButton || '删除',
  };
});

/**
 * @description: Adds a new news source to the store.
 */
const addSource = () => {
  if (newSourceUrl.value.trim()) {
    newsStore.addNewsSource(newSourceUrl.value.trim());
    newSourceUrl.value = ''; // Clear input after adding
    console.log('SiyuanNewsPlugin: Added new source.');
  } else {
    console.warn('SiyuanNewsPlugin: Attempted to add an empty source URL.');
    // Optionally, show a user-facing error message here
  }
};

/**
 * @description: Placeholder for editing a news source.
 * @param {number} index - The index of the news source to edit.
 */
const editSource = (index: number) => {
  // TODO: Implement edit functionality
  // For example, populate an input field with newsStore.newsSources[index]
  // and then call an action in the store to update it.
  const newUrl = prompt(`${i18n.value.editSourcePrompt || '修改新闻源'}: ${newsStore.newsSources[index]}`, newsStore.newsSources[index]);
  if (newUrl && newUrl.trim() !== newsStore.newsSources[index]) {
    newsStore.updateNewsSource(index, newUrl.trim()); 
    console.log(`SiyuanNewsPlugin: Editing source at index ${index} to ${newUrl.trim()}.`);
  }
};

/**
 * @description: Deletes a news source from the store.
 * @param {number} index - The index of the news source to delete.
 */
const deleteSource = (index: number) => {
  if (confirm(`${i18n.value.deleteSourceConfirm || '确定要删除新闻源'}: ${newsStore.newsSources[index]}吗？`)) {
    newsStore.deleteNewsSource(index); 
    console.log(`SiyuanNewsPlugin: Deleting source at index ${index}.`);
  }
};

/**
 * @description: 通知父组件返回到主视图。
 */
const goBack = () => {
  emit('back');
};

console.log('SiyuanNewsPlugin: SettingsPanel.vue setup executed.');
</script>

<style scoped>
.settings-panel {
  padding: 20px;
  background-color: var(--b3-theme-background, #fff);
  color: var(--b3-theme-on-background, #000);
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* Increased gap for better spacing */
  box-sizing: border-box;
  overflow-y: auto; /* Allow scrolling if content overflows */
}

.settings-panel h2, .settings-panel h3 {
  color: var(--b3-theme-on-surface, #333);
  margin-top: 0;
}

.news-sources-management {
  border: 1px solid var(--b3-border-color, #e0e0e0);
  padding: 15px;
  border-radius: 4px;
  background-color: var(--b3-theme-surface-lighter, #f9f9f9);
}

.news-sources-list {
  list-style: none;
  padding: 0;
  margin: 0 0 15px 0;
}

.news-source-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid var(--b3-border-color-translucent, #eee);
}

.news-source-item:last-child {
  border-bottom: none;
}

.news-source-item span {
  word-break: break-all; /* Prevent long URLs from breaking layout */
  margin-right: 10px;
}

.source-actions button {
  margin-left: 8px;
}

.add-source-form {
  display: flex;
  gap: 10px;
  align-items: center;
}

.add-source-form input[type="text"] {
  flex-grow: 1;
  padding: 8px 10px;
  border: 1px solid var(--b3-border-color, #ccc);
  border-radius: 4px;
  background-color: var(--b3-theme-surface, #fff);
  color: var(--b3-theme-on-surface, #333);
}

.action-button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.2s ease;
}

.add-button {
  background-color: var(--b3-button-primary-background, #28a745);
  color: var(--b3-button-primary-color, white);
}
.add-button:hover {
  background-color: var(--b3-button-primary-hover-background, #218838);
}

.edit-button {
  background-color: var(--b3-button-secondary-background, #ffc107);
  color: var(--b3-button-secondary-color, #212529);
}
.edit-button:hover {
  background-color: var(--b3-button-secondary-hover-background, #e0a800);
}

.delete-button {
  background-color: var(--b3-button-danger-background, #dc3545);
  color: var(--b3-button-danger-color, white);
}
.delete-button:hover {
  background-color: var(--b3-button-danger-hover-background, #c82333);
}

.back-button {
  padding: 10px 15px;
  background-color: var(--b3-button-cancel-background, #6c757d);
  color: var(--b3-button-cancel-color, white);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-start; /* Align button to the start */
  margin-top: auto; /* Push to the bottom if space allows */
}

.back-button:hover {
  background-color: var(--b3-button-cancel-hover-background, #5a6268);
}
</style>
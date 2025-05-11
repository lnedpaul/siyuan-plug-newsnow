<template>
  <div class="news-list">
    <div v-if="isLoading" class="loading-message">正在加载新闻...</div>
    <div v-else-if="error" class="error-message">加载新闻失败: {{ error }}</div>
    <div v-else-if="articles.length === 0" class="empty-message">暂无新闻</div>
    <div v-else>
      <NewsItem
        v-for="article in articles"
        :key="article.id"
        :article="article"
      />
    </div>
    <button @click="refreshNews" :disabled="isLoading" class="refresh-button">
      {{ isLoading ? '正在刷新...' : '刷新新闻' }}
    </button>
    <!-- Removed add source button and dialog -->
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed, ref, nextTick } from 'vue';
import { useNewsStore } from '@/store/newsStore';
import NewsItem from './NewsItem.vue';

/**
 * @file NewsList.vue - 展示新闻列表的组件。
 */

const newsStore = useNewsStore();
const articles = computed(() => newsStore.articles);
const isLoading = computed(() => newsStore.isLoading);
const error = computed(() => newsStore.error);

// Function-level comment: Fetches news articles when the component is mounted.
onMounted(() => {
  console.log('SiyuanNewsPlugin: NewsList.vue mounted, fetching news.');
  newsStore.fetchNews();
});

/**
 * @description: 重新加载新闻列表。
 */
const refreshNews = async () => {
  console.log('SiyuanNewsPlugin: Refreshing news...');
  await newsStore.fetchNews();
  console.log('SiyuanNewsPlugin: News refreshed.');
};

console.log('SiyuanNewsPlugin: NewsList.vue setup executed.');

</script>

<style scoped>
.news-list {
  display: flex;
  flex-direction: column;
  height: 100%; /* Ensure it fills the available space from MainPanel */
  overflow-y: auto; /* Allow scrolling within the list itself */
  padding: 15px 20px; /* Consistent padding */
  background-color: var(--b3-theme-background, #fdfdfd);
  gap: 12px; /* Spacing between items */
}

.loading-message,
.error-message,
.empty-message {
  padding: 20px;
  text-align: center;
  color: var(--b3-theme-on-surface, #555);
  font-size: 0.95em;
}

.error-message {
  color: var(--b3-theme-error, #d32f2f);
  background-color: var(--b3-theme-error-light, #ffebee);
  border: 1px solid var(--b3-theme-error, #d32f2f);
  border-radius: 4px;
  margin: 10px 0;
}

.refresh-button {
  padding: 8px 15px;
  background-color: var(--b3-theme-primary, #007bff);
  color: var(--b3-theme-on-primary, white);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.2s ease;
  align-self: flex-start; /* Align to start */
  margin-top: 10px;
  margin-bottom: 10px; /* Add some space below */
}

.refresh-button:hover {
  background-color: var(--b3-theme-primary-dark, #0056b3);
}

.refresh-button:disabled {
  background-color: var(--b3-theme-disabled, #ccc);
  color: var(--b3-theme-on-disabled, #888);
  cursor: not-allowed;
}

.add-source-button {
  padding: 8px 15px;
  background-color: var(--b3-theme-secondary, #6c757d);
  color: var(--b3-theme-on-secondary, white);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.2s ease;
  align-self: flex-start;
  margin-left: 10px; /* Space from refresh button if on same line, or if stacked */
  margin-top: 10px;
  margin-bottom: 10px;
}

.add-source-button:hover {
  background-color: var(--b3-theme-secondary-dark, #545b62);
}

.add-source-dialog {
  /* For Siyuan, dialogs are typically handled by its own UI system or need careful styling */
  /* This basic styling is a placeholder and might need Siyuan-specific classes/methods */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--b3-theme-background, white);
  padding: 25px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--b3-border-color, #ddd);
  z-index: 1000; /* Ensure it's above other content */
  color: var(--b3-theme-on-background);
}

.add-source-dialog h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.1em;
  color: var(--b3-theme-on-surface);
}

.add-source-dialog input[type="text"] {
  width: 100%;
  padding: 8px 10px;
  margin-bottom: 15px;
  border: 1px solid var(--b3-border-color, #ccc);
  border-radius: 4px;
  box-sizing: border-box;
  background-color: var(--b3-theme-surface-lighter, #f0f0f0);
  color: var(--b3-theme-on-surface);
}

.add-source-dialog input[type="text"]:focus {
  border-color: var(--b3-theme-primary, #007bff);
  outline: none;
  background-color: var(--b3-theme-background, #fff);
}

.add-source-dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.add-source-confirm-button,
.add-source-cancel-button {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.2s ease;
}

.add-source-confirm-button {
  background-color: var(--b3-theme-primary, #007bff);
  color: var(--b3-theme-on-primary, white);
}

.add-source-confirm-button:hover {
  background-color: var(--b3-theme-primary-dark, #0056b3);
}

.add-source-cancel-button {
  background-color: var(--b3-theme-secondary, #6c757d);
  color: var(--b3-theme-on-secondary, white);
}

.add-source-cancel-button:hover {
  background-color: var(--b3-theme-secondary-dark, #545b62);
}

.add-source-confirm-button:hover,
.add-source-cancel-button:hover {
  background-color: #0056b3;
}
</style>
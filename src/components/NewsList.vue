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
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { useNewsStore } from '@/store/newsStore';
import NewsItem from './NewsItem.vue';

/**
 * @file NewsList.vue - 展示新闻列表的组件。
 */

const newsStore = useNewsStore();

// 从 store 中获取计算属性
const articles = computed(() => newsStore.getArticles);
const isLoading = computed(() => newsStore.getIsLoading);
const error = computed(() => newsStore.getError);

/**
 * 组件挂载后加载新闻。
 */
onMounted(() => {
  newsStore.loadNews();
});

/**
 * 刷新新闻列表。
 */
const refreshNews = () => {
  newsStore.loadNews();
};
</script>

<style scoped>
.news-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #f9f9f9;
  max-width: 800px;
  margin: 1rem auto;
}

.loading-message,
.error-message,
.empty-message {
  padding: 1rem;
  text-align: center;
  color: #555;
}

.error-message {
  color: red;
  background-color: #ffebee;
  border: 1px solid red;
  border-radius: 4px;
}

.refresh-button {
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  align-self: center; /* Center the button */
  margin-top: 1rem;
}

.refresh-button:hover {
  background-color: #0056b3;
}

.refresh-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
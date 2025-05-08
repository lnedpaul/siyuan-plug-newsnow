<template>
  <div class="news-item">
    <h3 class="news-title">{{ article.title }}</h3>
    <div class="news-meta">
      <span class="news-source">来源: {{ article.source }}</span>
      <span class="news-published-at">发布于: {{ formatDate(article.publishedAt) }}</span>
    </div>
    <p v-if="article.summary" class="news-summary">{{ article.summary }}</p>
    <a :href="article.url" target="_blank" rel="noopener noreferrer" class="news-link">阅读原文</a>
    <button @click="addToNotes" class="add-to-notes-button">添加到笔记</button>
  </div>
</template>

<script lang="ts" setup>
import type { NewsArticle } from '@/services/newsService';
import { defineProps } from 'vue';

/**
 * @file NewsItem.vue - 展示单个新闻条目的组件。
 */

/**
 * 组件的 props 定义。
 * @property {NewsArticle} article - 要展示的新闻文章对象。
 */
const props = defineProps<{
  article: NewsArticle;
}>();

/**
 * 将 ISO 日期字符串格式化为更易读的格式。
 * @param {string} dateString - ISO 格式的日期字符串。
 * @returns {string} 格式化后的日期字符串 (YYYY-MM-DD HH:mm)。
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

/**
 * 处理“添加到笔记”按钮的点击事件。
 * 目前仅为占位符，将来会实现将新闻添加到思源笔记的逻辑。
 */
const addToNotes = () => {
  // TODO: 实现将新闻内容添加到思源笔记的逻辑
  console.log('将新闻添加到笔记:', props.article.title);
  alert(`功能待实现：将《${props.article.title}》添加到笔记`);
};
</script>

<style scoped>
.news-item {
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.news-title {
  font-size: 1.25rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: #333;
}

.news-meta {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.75rem;
}

.news-source {
  margin-right: 1rem;
}

.news-summary {
  font-size: 1rem;
  color: #444;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.news-link {
  color: #007bff;
  text-decoration: none;
  margin-right: 1rem;
}

.news-link:hover {
  text-decoration: underline;
}

.add-to-notes-button {
  padding: 0.5rem 1rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.add-to-notes-button:hover {
  background-color: #218838;
}
</style>
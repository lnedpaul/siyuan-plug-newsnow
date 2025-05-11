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
  border: 1px solid var(--b3-border-color-translucent, #e0e0e0);
  padding: 12px 15px;
  /* margin-bottom is handled by gap in NewsList.vue */
  border-radius: 6px;
  background-color: var(--b3-theme-surface, #fff);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s ease-in-out;
}

.news-item:hover {
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
}

.news-title {
  font-size: 1.1em; /* Slightly smaller for consistency */
  margin-top: 0;
  margin-bottom: 6px;
  color: var(--b3-theme-on-surface, #2c3e50);
  font-weight: 500;
}

.news-meta {
  font-size: 0.85em;
  color: var(--b3-theme-on-surface-light, #757575);
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.news-source {
  /* margin-right is handled by gap in .news-meta */
}

.news-summary {
  font-size: 0.9em;
  color: var(--b3-theme-on-background, #444);
  line-height: 1.55;
  margin-bottom: 12px;
  /* Basic text truncation for long summaries */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.news-link {
  color: var(--b3-theme-primary, #007bff);
  text-decoration: none;
  font-size: 0.85em;
  margin-right: 12px;
  transition: color 0.2s ease;
}

.news-link:hover {
  text-decoration: underline;
  color: var(--b3-theme-primary-dark, #0056b3);
}

.add-to-notes-button {
  padding: 6px 12px;
  background-color: var(--b3-theme-primary-light, #4CAF50); /* Using a green shade */
  color: var(--b3-theme-on-primary, white);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85em;
  transition: background-color 0.2s ease;
}

.add-to-notes-button:hover {
  background-color: var(--b3-theme-primary-dark, #388E3C); /* Darker green */
}
</style>
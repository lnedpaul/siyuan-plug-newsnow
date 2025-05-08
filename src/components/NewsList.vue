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
    <dialog v-if="isAddSourceDialogVisible" class="add-source-dialog">
      <h3>添加新闻源</h3>
      <input type="text" v-model="newSourceUrl" placeholder="输入新闻源 URL" />
      <button @click="addSource" class="add-source-confirm-button">确认添加</button>
      <button @click="closeAddSourceDialog" class="add-source-cancel-button">取消</button>
    </dialog>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed, ref } from 'vue';
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

// 控制添加新闻源对话框的显示状态
const isAddSourceDialogVisible = ref(false);
const newSourceUrl = ref('');

// 显示添加新闻源对话框
const showAddSourceDialog = () => {
  isAddSourceDialogVisible.value = true;
};

// 监听来自MainPanel的事件
onMounted(() => {
  emit('show-add-source-dialog', () => {
    isAddSourceDialogVisible.value = true;
  });
});

// 关闭添加新闻源对话框
const closeAddSourceDialog = () => {
  isAddSourceDialogVisible.value = false;
};

// 添加新闻源
const addSource = () => {
  if (newSourceUrl.value) {
    newsStore.addNewsSource(newSourceUrl.value);
    newSourceUrl.value = '';
    closeAddSourceDialog();
  }
};

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

.add-source-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.add-source-confirm-button,
.add-source-cancel-button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.add-source-confirm-button:hover,
.add-source-cancel-button:hover {
  background-color: #0056b3;
}
</style>
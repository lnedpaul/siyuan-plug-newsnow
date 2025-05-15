<template>
  <div class="main-panel-container">
    <!-- 标题可以根据需要保留或移除，因为 Dialog 可能已经有标题了 -->
    <!-- <h3 class="panel-title">NewsNow插件</h3> -->

    <div class="content-area">
      <!-- 这里是 MainPanel 显示新闻列表等内容的地方 -->
      <!-- TODO: 替换为实际的新闻列表组件或内容 -->
      <p v-if="isLoading">正在加载新闻...</p>
      <p v-else-if="newsItems.length === 0">暂无新闻数据，请检查新闻源设置或点击刷新。</p>
      <div v-else class="news-list">
        <!-- 示例新闻条目渲染 -->
        <div v-for="item in newsItems" :key="item.id" class="news-item">
          <h4>{{ item.title }}</h4>
          <p>{{ item.snippet }}</p>
        </div>
      </div>
    </div>

    <div class="actions-footer">
      <button @click="openSettingsDialog" class="btn-action btn-settings">新闻源设置</button>
      <button @click="refreshNewsData" class="btn-action btn-refresh">刷新新闻</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from 'vue';
import type NewsNowPlugin from '@/main'; // 确保路径相对于 MainPanel.vue
// import { useNewsStore } from '@/store/newsStore'; // 如果需要从store获取新闻

const plugin = inject<NewsNowPlugin>('plugin');
// const store = useNewsStore(); // 如果使用 Pinia store

const isLoading = ref(false);
const newsItems = ref<Array<{id: string, title: string, snippet: string}>>([]); // 简单示例

const openSettingsDialog = () => {
  if (plugin) {
    plugin.openSetting();
  } else {
    console.error("NewsNow插件：插件实例未注入，无法打开设置。");
  }
};

const refreshNewsData = async () => {
  console.log("NewsNow插件：刷新新闻被点击");
  isLoading.value = true;
  // TODO: 实现实际的新闻获取逻辑
  // 例如: newsItems.value = await plugin.fetchNews(); 或 await store.fetchAllNews();
  // 示例延迟
  setTimeout(() => {
    // 假设这是获取到的新闻数据
    // newsItems.value = [
    //   { id: '1', title: '示例新闻标题1', snippet: '这是第一条新闻的摘要...' },
    //   { id: '2', title: '示例新闻标题2', snippet: '这是第二条新闻的摘要...' },
    // ];
    newsItems.value = []; // 默认清空，除非您实现了获取逻辑
    isLoading.value = false;
  }, 1500);
};

onMounted(() => {
  // 首次加载时可以尝试刷新一次新闻
  // refreshNewsData();
});

</script>

<style scoped>
.main-panel-container {
  display: flex;
  flex-direction: column;
  height: 100%; /* 占满父容器（Dialog content）的高度 */
  padding: 15px;
  box-sizing: border-box;
  background-color: var(--b3-theme-background);
  color: var(--b3-theme-on-background);
}

/* .panel-title {
  font-size: 16px;
  color: var(--b3-theme-on-background);
  margin-bottom: 15px;
  text-align: center;
} */

.content-area {
  flex-grow: 1; /* 内容区域占据剩余空间 */
  overflow-y: auto; /* 内容过多时滚动 */
  margin-bottom: 15px; /* 与底部按钮的间距 */
}

.content-area p {
  text-align: center;
  margin-top: 20px;
  color: var(--b3-theme-on-surface);
}

.news-list {
  /* 简单的新闻列表样式 */
}

.news-item {
  padding: 10px;
  border-bottom: 1px solid var(--b3-border-color);
}
.news-item:last-child {
  border-bottom: none;
}
.news-item h4 {
  margin: 0 0 5px 0;
  font-size: 1em;
  color: var(--b3-theme-primary);
}
.news-item p {
  font-size: 0.9em;
  margin: 0;
  text-align: left;
}


.actions-footer {
  display: flex;
  justify-content: space-between; /* 按钮分布在两侧 */
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid var(--b3-border-color);
  flex-shrink: 0; /* 防止底部栏在内容不足时收缩 */
}

.actions-footer .btn-action {
  padding: 8px 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s, box-shadow 0.2s, transform 0.1s;
}

.actions-footer .btn-settings {
  background-color: var(--b3-theme-surface-light);
  color: var(--b3-theme-on-surface);
  border: 1px solid var(--b3-border-color);
}
.actions-footer .btn-settings:hover {
  background-color: var(--b3-theme-surface);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.actions-footer .btn-settings:active {
  transform: translateY(1px);
}

.actions-footer .btn-refresh {
  background-color: var(--b3-theme-primary);
  color: var(--b3-theme-on-primary);
}
.actions-footer .btn-refresh:hover {
  background-color: var(--b3-theme-primary-light); /* 或使用 color-mix 调暗/亮 */
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.actions-footer .btn-refresh:active {
  transform: translateY(1px);
}
</style>
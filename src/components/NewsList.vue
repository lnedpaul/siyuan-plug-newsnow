<template>
  <div class="news-list" @scroll="handleScroll">
    <div v-if="loading" class="loading">加载中...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-if="!loading && !error">
      <div v-if="newsList.length === 0" class="empty">暂无新闻数据</div>
      <template v-else>
        <div v-if="newsList && newsList.length > 0">
          <div v-for="(item, index) in newsList" :key="item?.id || index" class="news-item">
            <h3>{{ item?.title || '无标题' }}</h3>
            <p>{{ item?.summary || '' }}</p>
            <div class="meta" v-if="item && item.source">
              <span>{{ item.source?.name || item.source || '未知来源' }}</span>
              <span>{{ item?.time ? new Date(item.time).toLocaleString() : '未知时间' }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div v-if="loading" class="loading-indicator">加载中...</div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useNewsStore } from '@/store/newsStore'

const store = useNewsStore()
const loading = computed(() => store?.isLoading ?? false)
const error = computed(() => store?.getError ?? null)
const newsList = computed(() => store?.getNewsList ?? [])
const currentPage = ref(1)

const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement
  const { scrollHeight, scrollTop, clientHeight } = target
  
  if (scrollHeight - (scrollTop + clientHeight) < 50 && !loading.value) {
    loadMore()
  }
}

const loadMore = async () => {
  loading.value = true
  currentPage.value++
  await store.fetchNews('v2ex-share', currentPage.value)
  loading.value = false
}

onMounted(() => {
  // 默认加载v2ex-share源的新闻
  store.fetchNews('v2ex-share')
})
</script>

<style scoped>
.news-list {
  padding: 16px;
}

.news-item {
  margin-bottom: 16px;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.news-item h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
}

.meta {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 12px;
  color: #666;
}

.loading,
.error {
  padding: 16px;
  text-align: center;
}

.error {
  color: #f56c6c;
}
</style>
<template>
  <div class="news-item">
    <div class="news-header">
      <span class="news-source">{{ news?.source?.name || news?.source || '未知来源' }}</span>
      <span class="news-time">{{ formatTime(news.time) }}</span>
    </div>
    <h3 class="news-title">{{ news.title }}</h3>
    <p class="news-summary" v-if="news.summary">{{ news.summary }}</p>
    <button class="save-btn" @click="saveToNote(news)">保存到笔记</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps({
  news: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['save'])

const saveToNote = async (newsItem: any) => {
  try {
    // 格式化新闻内容为Markdown
    const content = `# ${newsItem.title}\n\n来源: [${newsItem.source}](${newsItem.url})\n\n${newsItem.summary || ''}`
    
    // 调用思源笔记API创建新笔记
    await window.siyuan.createDocWithMd({
      notebook: '', // 默认笔记本
      path: '', // 默认路径
      markdown: content
    })
    
    // 提示保存成功
    window.siyuan.showMessage('新闻已保存到笔记')
  } catch (err) {
    console.error('保存失败:', err)
    window.siyuan.showMessage('保存失败', 'error')
  }
}

const formatTime = (time: string) => {
  // TODO: 格式化时间显示
  return time
}
</script>

<style scoped>
.news-item {
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 4px;
}
.news-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 12px;
  color: #666;
}
.news-title {
  margin: 0 0 8px 0;
  font-size: 16px;
}
.news-summary {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #444;
}
.save-btn {
  padding: 4px 8px;
  background: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.save-btn:hover {
  background: #e0e0e0;
}
</style>
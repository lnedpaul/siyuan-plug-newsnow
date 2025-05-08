// src/store/newsStore.ts
import { defineStore } from 'pinia';

/**
 * @file newsStore.ts - 管理新闻数据的状态。
 */

export const useNewsStore = defineStore('news', {
  state: () => ({
    articles: [],
    isLoading: false,
    error: null,
    newsSources: [
      // 默认新闻源列表
      'https://rsshub.app/bbc/topics/chinese', // BBC中文网
      'https://rsshub.app/reuters/world/china', // 路透社中国新闻
      'https://rsshub.app/zaobao/realtime/china', // 联合早报中国新闻
      'https://rsshub.app/thepaper/featured', // 澎湃新闻
      'https://rsshub.app/guokr/scientific', // 果壳科学
      'https://rsshub.app/36kr/newsflashes', // 36氪快讯
      'https://rsshub.app/zhihu/daily', // 知乎日报
    ]
  }),
  actions: {
    async loadNews() {
      this.isLoading = true;
      try {
        // 添加模拟数据确保组件能渲染
        this.articles = [{
          id: '1',
          title: '测试新闻标题',
          source: '测试来源',
          publishedAt: new Date().toISOString(),
          url: '#',
          summary: '这是测试新闻摘要'
        }];
      } catch (err) {
        this.error = err.message;
      } finally {
        this.isLoading = false;
      }
    },
    addNewsSource(url) {
      if (!this.newsSources.includes(url)) {
        this.newsSources.push(url);
      }
    }
  },
  getters: {
    getArticles: (state) => state.articles,
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error
  }
});
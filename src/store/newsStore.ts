// src/store/newsStore.ts
import { defineStore } from 'pinia';

/**
 * @file newsStore.ts - 管理新闻数据的状态。
 */

export const useNewsStore = defineStore('news', {
  state: () => ({
    articles: [] as Array<any>, // 明确文章数组类型
    isLoading: false,
    error: null as string | null, // 明确错误类型
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
    /**
     * 加载新闻数据。
     * 目前使用模拟数据，后续会替换为真实 API 调用。
     */
    async loadNews() {
      this.isLoading = true;
      this.error = null; // 重置错误状态
      try {
        // 模拟 API 调用延迟
        await new Promise(resolve => setTimeout(resolve, 500));

        // 添加更多模拟数据确保组件能渲染
        this.articles = [
          {
            id: '1',
            title: '虚拟新闻标题 1：今日要闻',
            source: '虚拟新闻台',
            publishedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30分钟前
            url: '#article1',
            summary: '这是第一条虚拟新闻的摘要内容，帮助测试页面布局和组件渲染。'
          },
          {
            id: '2',
            title: '虚拟新闻标题 2：科技新动态',
            source: '科技前沿',
            publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2小时前
            url: '#article2',
            summary: '第二条虚拟新闻，关于最新的科技发展趋势和创新技术。'
          },
          {
            id: '3',
            title: '虚拟新闻标题 3：本地事件报道',
            source: '本地快讯',
            publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5小时前
            url: '#article3',
            summary: '关于本地发生的一些重要事件的快速报道，确保信息及时传达。'
          }
        ];
      } catch (err: any) { // 为 err 添加类型
        this.error = err.message;
      } finally {
        this.isLoading = false;
      }
    },
    /**
     * 添加新的新闻源。
     * @param {string} url - 新闻源的 URL。
     */
    addNewsSource(url: string) {
      if (url.trim() && !this.newsSources.includes(url.trim())) {
        this.newsSources.push(url.trim());
        console.log('SiyuanNewsPlugin: News source added to store:', url.trim());
      }
    },
    /**
     * 更新指定索引的新闻源。
     * @param {number} index - 要更新的新闻源的索引。
     * @param {string} newUrl - 新的新闻源 URL。
     */
    updateNewsSource(index: number, newUrl: string) {
      if (newUrl.trim() && index >= 0 && index < this.newsSources.length) {
        this.newsSources[index] = newUrl.trim();
        console.log('SiyuanNewsPlugin: News source updated in store at index', index, 'to:', newUrl.trim());
      }
    },
    /**
     * 删除指定索引的新闻源。
     * @param {number} index - 要删除的新闻源的索引。
     */
    deleteNewsSource(index: number) {
      if (index >= 0 && index < this.newsSources.length) {
        const removedSource = this.newsSources.splice(index, 1);
        console.log('SiyuanNewsPlugin: News source removed from store:', removedSource);
      }
    }
  },
  getters: {
    getArticles: (state) => state.articles,
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error
  }
});
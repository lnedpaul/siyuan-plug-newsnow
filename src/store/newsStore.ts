import { defineStore } from 'pinia'
import { fetchNews, fetchHotNews, getAvailableSources } from '@/services/newsApi'
import type { NewsItem } from '@/types/news'

export const useNewsStore = defineStore('news', {
  // 修改state初始化，确保所有属性都有默认值
  state: () => ({
    newsList: [] as NewsItem[],
    hotNewsList: [] as NewsItem[],
    sources: [] as string[],
    loading: false,
    error: null as string | null,
    currentPage: 1,
    hasMore: true,
    selectedSource: 'v2ex-share',
    lastUpdated: new Date() as Date | null,
    name: 'newsStore',
    initialized: false,
    // 添加默认新闻项以防止null访问
    currentNews: {
      id: '',
      title: '',
      summary: '',
      source: { name: '未知来源' },
      time: '',
      url: ''
    } as NewsItem,
    // 添加默认name属性防止null访问
    storeName: 'newsStore'
  }),

  actions: {
    /**
     * 获取新闻列表
     * @param source 新闻源ID
     * @param count 获取数量
     */
    async fetchNews(source: string, count = 10) {
      this.loading = true
      this.error = null
      try {
        const news = await fetchNews(source, this.currentPage, count)
        this.newsList = news
        this.lastUpdated = new Date()
      } catch (err) {
        this.error = '获取新闻列表失败'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    
    async fetchHotNews(sources: string[], count = 10) {
      this.loading = true
      this.error = null
      try {
        const hotNews = await getHotNews(sources, count)
        this.hotNewsList = hotNews
        this.lastUpdated = new Date()
      } catch (err) {
        this.error = '获取热门新闻失败'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    
    async fetchAvailableSources() {
      this.loading = true
      try {
        this.sources = await getAvailableSources()
      } catch (err) {
        console.error('获取新闻源列表失败:', err)
      } finally {
        this.loading = false
      }
    },

    /**
     * 获取支持的新闻源
     */
    async fetchSources() {
      this.loading = true
      this.error = null
      try {
        this.sources = await getAvailableSources()
      } catch (err) {
        this.error = '获取新闻源失败'
        console.error(err)
      } finally {
        this.loading = false
      }
    }
  },

  getters: {
    /**
     * 获取当前新闻列表
     */
    getNewsList: (state) => state.newsList,

    /**
     * 获取当前热门新闻列表
     */
    getHotNewsList: (state) => state.hotNewsList,

    /**
     * 获取支持的新闻源
     */
    getSources: (state) => state.sources,

    /**
     * 获取加载状态
     */
    isLoading: (state) => state.loading,

    /**
     * 获取错误信息
     */
    getError: (state) => state.error,
    
    /**
     * 获取最后更新时间
     */
    getLastUpdated: (state) => state.lastUpdated
  }
})
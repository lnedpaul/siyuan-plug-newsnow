// src/store/newsStore.ts
import { defineStore } from 'pinia';

/**
 * Defines the news store for managing news-related state.
 */
export const useNewsStore = defineStore('news', {
  state: () => ({
    newsList: [] as any[], // Define a more specific type later
    isLoading: false,
    error: null as string | null,
  }),
  getters: {
    /**
     * Gets the current list of news articles.
     * @param {object} state - The current state.
     * @returns {any[]} The list of news articles.
     */
    getNewsList: (state) => state.newsList,
    /**
     * Checks if news data is currently being loaded.
     * @param {object} state - The current state.
     * @returns {boolean} True if loading, false otherwise.
     */
    getIsLoading: (state) => state.isLoading,
    /**
     * Gets the current error message, if any.
     * @param {object} state - The current state.
     * @returns {string | null} The error message or null.
     */
    getError: (state) => state.error,
  },
  actions: {
    /**
     * Fetches news articles from the service and updates the state.
     */
    async fetchNews() {
      this.isLoading = true;
      this.error = null;
      try {
        // const newsService = await import('@/services/newsService'); // Example of dynamic import
        // this.newsList = await newsService.fetchNews();
        // Placeholder for now:
        this.newsList = [
          { id: 1, title: '示例新闻1', source: '来源A', date: '2023-10-27' },
          { id: 2, title: '示例新闻2', source: '来源B', date: '2023-10-28' },
        ];
        console.log('News fetched (mocked):', this.newsList);
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch news';
        console.error(this.error);
      } finally {
        this.isLoading = false;
      }
    },
    /**
     * Adds a news item to the list (example action).
     * @param {any} newsItem - The news item to add.
     */
    addNewsItem(newsItem: any) {
      this.newsList.push(newsItem);
    },
  },
});
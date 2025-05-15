import axios from 'axios'
import type { NewsItem } from '@/types/news'

const BASE_URL = 'https://newsnow.busiyi.world/api'

/**
 * 获取新闻列表
 * @param {string} source - 新闻源ID
 * @param {number} page - 页码
 * @param {number} count - 每页数量
 * @returns {Promise<NewsItem[]>} 新闻数据数组
 */
export const getNews = async (source: string = 'v2ex-share', page: number = 1, count: number = 10): Promise<NewsItem[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/news`, {
      params: { source, page, count }
    })
    return response.data?.data?.map(item => ({
      id: item.url,
      title: item.title,
      summary: item.summary || '',
      source: { name: item.source || 'V2EX' },
      time: item.time || new Date().toISOString(),
      url: item.url
    })) || []
  } catch (error) {
    console.error('获取新闻失败:', error)
    throw new Error('获取新闻数据失败，请稍后重试')
  }
}

/**
 * 获取热门新闻
 * @param {string[]} sources - 新闻源ID数组
 * @param {number} count - 获取数量
 * @returns {Promise<NewsItem[]>} 热门新闻列表
 */
export const getHotNews = async (sources: string[], count: number = 10): Promise<NewsItem[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/hot`, {
      params: { sources: sources.join(','), count }
    })
    return response.data?.data?.map(item => ({
      id: item.url,
      title: item.title,
      summary: item.summary || '',
      source: { name: item.source || 'V2EX' },
      time: item.time || new Date().toISOString(),
      url: item.url
    })) || []
  } catch (error) {
    console.error('获取热门新闻失败:', error)
    throw new Error('获取热门新闻失败，请稍后重试')
  }
}

/**
 * 获取支持的新闻源列表
 * @returns {Promise<string[]>} 新闻源ID列表
 */
export const getAvailableSources = async (): Promise<string[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/sources`)
    return response.data
  } catch (error) {
    console.error('获取新闻源列表失败:', error)
    return []
  }
}
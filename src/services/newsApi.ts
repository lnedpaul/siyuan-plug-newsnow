import axios from 'axios';
import type { NewsItem } from '../types/news';

const BASE_URL = 'https://newsnow.busiyi.world/api';

// 预设新闻源配置 (来自newsnow-main项目)
export const PRESET_SOURCES = {
  "v2ex-share": {
    "name": "V2EX",
    "column": "tech",
    "home": "https://v2ex.com/",
    "color": "slate",
    "interval": 600000,
    "title": "最新分享"
  },
  "zhihu": {
    "name": "知乎",
    "type": "hottest",
    "column": "china",
    "home": "https://www.zhihu.com",
    "color": "blue",
    "interval": 600000
  },
  "weibo": {
    "title": "实时热搜",
    "name": "微博",
    "type": "hottest",
    "column": "china",
    "home": "https://weibo.com",
    "color": "red",
    "interval": 120000
  },
  "zaobao": {
    "name": "联合早报",
    "type": "realtime",
    "desc": "来自第三方网站: 早晨报",
    "column": "world",
    "home": "https://www.zaobao.com",
    "color": "red",
    "interval": 1800000
  },
  "coolapk": {
    "title": "今日最热",
    "name": "酷安",
    "type": "hottest",
    "column": "tech",
    "home": "https://coolapk.com",
    "color": "green",
    "interval": 600000
  },
  "wallstreetcn-quick": {
    "name": "华尔街见闻",
    "type": "realtime",
    "column": "finance",
    "home": "https://wallstreetcn.com/",
    "color": "blue",
    "interval": 300000,
    "title": "实时快讯"
  },
  "wallstreetcn-news": {
    "name": "华尔街见闻",
    "column": "finance",
    "home": "https://wallstreetcn.com/",
    "color": "blue",
    "interval": 1800000,
    "title": "最新资讯"
  },
  "wallstreetcn-hot": {
    "name": "华尔街见闻",
    "type": "hottest",
    "column": "finance",
    "home": "https://wallstreetcn.com/",
    "color": "blue",
    "interval": 1800000,
    "title": "最热文章"
  },
  "36kr-quick": {
    "name": "36氪",
    "type": "realtime",
    "disable": "cf",
    "column": "tech",
    "home": "https://36kr.com",
    "color": "blue",
    "interval": 600000,
    "title": "快讯"
  }
};

/**
 * 获取新闻列表
 * @param source 新闻源ID
 * @param page 页码
 * @param count 获取数量
 * @returns Promise<NewsItem[]> 新闻列表
 */
export async function fetchNews(source: string, page = 1, count = 10): Promise<NewsItem[]> {
  try {
    const response = await axios.get(`${BASE_URL}/news`, {
      params: { source, page, count }
    });
    return response.data?.data || [];
  } catch (error) {
    console.error('获取新闻列表失败:', error);
    throw error;
  }
}

/**
 * 获取热门新闻
 * @param sources 新闻源ID数组
 * @param count 获取数量
 * @returns Promise<NewsItem[]> 热门新闻列表
 */
export async function fetchHotNews(sources: string[], count = 10): Promise<NewsItem[]> {
  try {
    const response = await axios.get(`${BASE_URL}/hot`, {
      params: { sources: sources.join(','), count }
    });
    return response.data?.data || [];
  } catch (error) {
    console.error('获取热门新闻失败:', error);
    throw error;
  }
}

/**
 * 获取支持的新闻源列表
 * @returns Promise<string[]> 新闻源ID列表
 */
export async function getAvailableSources(): Promise<string[]> {
  try {
    const response = await axios.get(`${BASE_URL}/sources`);
    return response.data;
  } catch (error) {
    console.error('获取新闻源列表失败:', error);
    return [];
  }
}
export interface NewsItem {
  id: string
  title: string
  source: string
  time: string
  url: string
  summary?: string
  content?: string
}

export type NewsList = NewsItem[]
# 思源笔记新闻聚合插件

## 项目概述

本插件为思源笔记提供新闻聚合功能，支持从多个新闻源获取数据并一键保存为笔记。

## 技术栈

- Vue 3 (Composition API)
- Vite
- Pinia
- TypeScript

## 项目结构

```
.siyuan-plug-newsnow/
├── src/
│   ├── components/     # Vue组件(NewsItem, NewsList等)
│   ├── services/       # API服务(newsApi, newsService)
│   ├── store/          # Pinia状态管理(newsStore)
│   ├── types/          # 类型定义
│   ├── views/          # 页面级组件(MainPanel)
│   ├── App.vue         # 根组件
│   └── main.ts         # 应用入口
├── server/             # 服务端代码
│   ├── api/            # API路由
│   └── database/       # 数据库相关
├── .eslintrc.cjs       # ESLint配置
├── .prettierrc.json    # Prettier配置
├── package.json        # 项目配置
├── plugin.json         # 插件配置
├── README.md           # 项目说明
├── tsconfig.json       # TypeScript配置
└── vite.config.ts      # Vite配置
```

## 开发流程

### 核心功能开发
1. 新闻浏览功能
   - 实现新闻列表展示(已完成NewsList组件)
   - 支持新闻源切换(通过newsStore管理)
   - 实现新闻详情查看(待开发)

2. 笔记保存功能
   - 实现一键保存为笔记(通过思源API)
   - 支持笔记模板配置(待开发)

3. API服务
   - 新闻数据获取(newsService.ts)
   - 数据缓存处理(server/database/cache.ts)

### 优化与测试
1. UI优化
   - 适配思源笔记主题
   - 响应式布局
2. 性能优化
   - 新闻数据缓存
   - 懒加载
3. 测试
   - 单元测试(Vitest)
   - E2E测试(待添加)

## 注意事项

- 遵循思源笔记插件开发规范
- 保持代码风格统一(ESLint + Prettier)
- 重要功能需添加详细注释
- 提交代码前运行测试
- 更新CHANGELOG.md记录变更
- 分支管理策略:
  - main: 稳定版本
  - dev: 开发分支
  - feature/*: 功能开发分支
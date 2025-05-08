# 思源笔记新闻插件 - siyuan-plug-newsnow

[English](./README.md)

一款为思源笔记开发的新闻聚合插件，灵感来源于[NewsNow](https://newsnow.busiyi.world/)。该插件允许用户：
- 直接在思源笔记中浏览多来源实时新闻
- 一键将感兴趣的新闻保存为笔记
- 自定义新闻源和笔记模板

## 功能特性

- **新闻聚合**：从多个来源获取并展示新闻
- **一键保存**：将新闻转换为包含标题、链接和摘要的笔记
- **可定制**：配置新闻源和笔记保存偏好
- **实时更新**：新闻列表自动刷新

## 环境要求

- [Node.js](https://nodejs.org/en/download) (推荐v18+)
- [pnpm](https://pnpm.io/installation)
- 思源笔记 (推荐v2.8.0+)

## 安装

1. 克隆仓库：
   ```bash
   git clone https://github.com/your-username/siyuan-plug-newsnow.git
   ```
2. 安装依赖：
   ```bash
   pnpm install
   ```
3. 复制`.env.example`为`.env`并设置思源工作空间路径：
   ```bash
   cp .env.example .env
   ```

## 开发

1. 启动开发服务器：
   ```bash
   pnpm dev
   ```
2. 插件将出现在思源的`设置 > 集市`中
3. 启用插件并在`src/App.vue`中开始开发

## 构建与发布

### 使用Github Action

1. 创建版本标签(如`v1.0.0`)
2. 推送标签触发自动发布

### 手动发布

1. 构建插件：
   ```bash
   pnpm build
   ```
2. 在GitHub上创建新版本并上传`package.zip`

首次发布时，需向[社区集市](https://github.com/siyuan-note/bazaar)提交PR添加你的仓库。

## 许可证

MIT许可证
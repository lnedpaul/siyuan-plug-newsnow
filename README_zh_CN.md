# 思源笔记新闻插件 - siyuan-plug-newsnow

[English](./README.md)

一款为思源笔记开发的新闻聚合插件，灵感来源于[NewsNow](https://newsnow.busiyi.world/)。该插件旨在提供在思源笔记内直接浏览新闻和保存内容的一体化体验。

该插件允许用户：
- 直接在思源笔记中浏览来自多个可配置来源的实时新闻。
- 一键将感兴趣的新闻（标题、链接、摘要等）保存为新的思源笔记。
- 自定义新闻源并配置笔记保存选项（例如，目标笔记本、模板）。

## 功能特性

- **新闻浏览**：直接在思源笔记中浏览来自多个可配置来源的实时新闻。新闻列表会实时或近实时更新，展示标题、来源和发布时间。
- **一键保存为笔记**：轻松将感兴趣的新闻文章（包括标题、原文链接、摘要，甚至部分正文）保存为思源笔记中的新笔记。
- **个性化定制**：
    - 选择和管理偏好的新闻来源。
    - 配置新笔记的默认保存位置和格式（例如，指定的笔记本、笔记模板）。
- **用户友好的界面**：简洁直观的界面设计，与思源笔记的整体风格协调一致，借鉴 NewsNow 的易用性。

## 环境要求

- [Node.js](https://nodejs.org/en/download) (推荐v18+)
- [pnpm](https://pnpm.io/installation)
- 思源笔记 (推荐v2.10.14+，请检查 `plugin.json` 中的 `minAppVersion`)

## 技术栈

- **核心框架**: Vue.js 3 (Composition API)
- **构建工具**: Vite
- **编程语言**: TypeScript
- **状态管理**: Pinia
- **HTTP客户端**: Axios 或 Fetch API
- **UI库**: (待定, 可考虑 Element Plus 或 Ant Design Vue)
- **代码规范**: ESLint, Prettier

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
2. 当您链接了开发插件目录或将构建好的插件复制到思源工作空间的 `data/plugins/` 目录下后，插件将出现在思源的 `设置 > 集市 > 已安装` 中。
3. 启用插件即可开始开发。主要的UI组件通常是 `src/App.vue` 或类似 `src/views/MainPanel.vue` 的视图组件。

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
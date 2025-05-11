# Siyuan Note News Plugin - siyuan-plug-newsnow

[简体中文](./README_zh_CN.md)

A news aggregator plugin for Siyuan Note, inspired by [NewsNow](https://newsnow.busiyi.world/). This plugin aims to provide a seamless experience for browsing news and saving content directly into Siyuan Note.

This plugin allows users to:
- Browse real-time news from multiple configurable sources directly within Siyuan Note.
- Save interesting news (title, link, summary, etc.) as new Siyuan notes with a single click.
- Customize news sources and configure note saving options (e.g., target notebook, template).

## Features

- **News Browsing**: Browse real-time news from multiple configurable sources directly within Siyuan Note. The news list updates in real-time or near real-time, displaying titles, sources, and publication times.
- **One-click Save to Note**: Easily save interesting news articles (including title, original link, summary, and potentially parts of the content) as new notes in Siyuan Note.
- **Customization**: 
    - Select and manage preferred news sources.
    - Configure default save locations and formats for new notes (e.g., specific notebook, note template).
- **User-Friendly Interface**: A clean, intuitive interface that integrates smoothly with the Siyuan Note environment, inspired by the usability of NewsNow.

## Prerequisites

- [Node.js](https://nodejs.org/en/download) (v18+ recommended)
- [pnpm](https://pnpm.io/installation)
- SiYuan Note (v2.10.14+ recommended, check `plugin.json` for `minAppVersion`)

## Technology Stack

- **Framework**: Vue.js 3 (Composition API)
- **Build Tool**: Vite
- **Language**: TypeScript
- **State Management**: Pinia
- **HTTP Client**: Axios or Fetch API
- **UI Library**: (To be determined, considering Element Plus or Ant Design Vue)
- **Linting/Formatting**: ESLint, Prettier

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/siyuan-plug-newsnow.git
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Copy `.env.example` to `.env` and set your SiYuan workspace path:
   ```bash
   cp .env.example .env
   ```

## Development

1. Start development server:
   ```bash
   pnpm dev
   ```
2. The plugin will appear in `Settings > Marketplace > Installed` in SiYuan after you've linked your development plugin directory or copied the built plugin to your SiYuan workspace's `data/plugins/` directory.
3. Enable the plugin and start developing. The main UI component is typically `src/App.vue` or a view component like `src/views/MainPanel.vue`.

## Build & Release

### Using Github Action

1. Create a version tag (e.g. `v1.0.0`)
2. Push the tag to trigger automatic release

### Manual Release

1. Build the plugin:
   ```bash
   pnpm build
   ```
2. Create a new release on GitHub and upload `package.zip`

For first release, submit a PR to [Community Bazaar](https://github.com/siyuan-note/bazaar) to add your repository.

## License

MIT License
# Siyuan Note News Plugin - siyuan-plug-newsnow

[简体中文](./README_zh_CN.md)

A news aggregator plugin for Siyuan Note, inspired by [NewsNow](https://newsnow.busiyi.world/). This plugin allows users to:
- Browse real-time news from multiple sources directly in Siyuan Note
- Save interesting news as notes with one click
- Customize news sources and note templates

## Features

- **News Aggregation**: Fetch and display news from various sources
- **One-click Save**: Convert news to notes with title, link and summary
- **Customizable**: Configure news sources and note saving preferences
- **Real-time Updates**: News list refreshes automatically

## Prerequisites

- [Node.js](https://nodejs.org/en/download) (v18+ recommended)
- [pnpm](https://pnpm.io/installation)
- SiYuan Note (v2.8.0+ recommended)

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
2. The plugin will appear in `Settings > Marketplace` in SiYuan
3. Enable the plugin and start developing in `src/App.vue`

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
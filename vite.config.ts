import { defineConfig } from 'vite'
import { resolve } from "node:path"
import vue from "@vitejs/plugin-vue"
import fg from "fast-glob"
import minimist from "minimist"
import livereload from "rollup-plugin-livereload"
import { createRequire } from 'node:module'
import fs from 'node:fs'
const require = createRequire(import.meta.url)
import zipPack from "vite-plugin-zip-pack"

// const pluginInfo = JSON.parse(fs.readFileSync(resolve(__dirname, './plugin.json'), 'utf-8')) // Not strictly needed for this config

export default defineConfig(({ mode }) => {
  const args = minimist(process.argv.slice(2))
  const isWatch = args.watch || args.w || false
  const distDir = isWatch ? "./dev" : "./dist"

  return {
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    plugins: [
      vue(),
      {
        name: 'copy-files',
        enforce: 'post',
        generateBundle() {
          fs.copyFileSync('./README.md', `${distDir}/README.md`)
          fs.copyFileSync('./icon.png', `${distDir}/icon.png`)
          fs.copyFileSync('./preview.png', `${distDir}/preview.png`)
          fs.copyFileSync('./plugin.json', `${distDir}/plugin.json`)
        }
      },
    ],
    build: {
      outDir: distDir,
      emptyOutDir: true,
      sourcemap: false,
      minify: !isWatch,
      lib: {
        entry: resolve(__dirname, "src/main.ts"),
        name: 'newsnow', // Used for UMD/IIFE, less relevant for CJS
        fileName: 'index',
        formats: ['cjs'] // Must be cjs
      },
      rollupOptions: {
        plugins: [
          ...(isWatch
            ? [
                livereload(distDir),
                {
                  name: "watch-external",
                  async buildStart() {
                    const files = await fg([
                      "./README*.md",
                      "./plugin.json",
                    ])
                    for (const file of files) {
                      this.addWatchFile(file)
                    }
                  },
                },
              ]
            : [
                zipPack({
                  inDir: "./dist",
                  outDir: "./",
                  outFileName: "package.zip",
                }),
              ]),
        ],
        external: ["siyuan"], // siyuan should be external
        output: {
          entryFileNames: "index.js",
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === "style.css") {
              return "index.css"
            }
            return assetInfo.name || ''
          },
          // exports: 'auto', // Default is 'auto', which should work for `export default class`
          // globals: {} // Not needed for CJS resolution
        },
      },
    },
    // define: {} // Ensure no siyuan define here
  }
})
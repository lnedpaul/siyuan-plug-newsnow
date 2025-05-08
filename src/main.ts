import {
  Plugin,
} from "siyuan";
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue'

let plugin = null
export function usePlugin(pluginProps?: Plugin): Plugin {
  console.log('usePlugin', pluginProps, plugin)
  if (pluginProps) {
    plugin = pluginProps
  }
  if (!plugin && !pluginProps) {
    console.error('need bind plugin')
  }
  return plugin;
}


let app = null
export function init(plugin: Plugin) {
  // bind plugin hook
  usePlugin(plugin);

  const div = document.createElement('div')
  div.classList.toggle('plugin-sample-vite-vue-app')
  div.id = plugin.name
  app = createApp(App);
  const pinia = createPinia();
  app.use(pinia);
  app.mount(div)
  document.body.appendChild(div)
}

export function destroy() {
  app.unmount()
  const div = document.getElementById(plugin.name)
  document.body.removeChild(div)
}

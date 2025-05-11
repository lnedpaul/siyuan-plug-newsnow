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


let app: ReturnType<typeof createApp> | null = null;
let piniaInstance: ReturnType<typeof createPinia> | null = null;

/**
 * 初始化Vue应用实例和Pinia状态管理。
 * @param {Plugin} pluginInstance - 思源插件实例。
 */
export function init(pluginInstance: Plugin) {
  // 绑定插件钩子
  usePlugin(pluginInstance);

  app = createApp(App);
  piniaInstance = createPinia();
  app.use(piniaInstance);
  console.log('SiyuanNewsPlugin: Vue app initialized.');
}

/**
 * 将Vue应用挂载到指定的DOM元素上。
 * @param {HTMLElement} container - Vue应用将要挂载到的容器元素。
 */
export function mountApp(container: HTMLElement) {
  if (app && container) {
    app.mount(container);
    console.log('SiyuanNewsPlugin: Vue app mounted.');
  } else {
    console.error('SiyuanNewsPlugin: App not initialized or container not provided for mount.');
  }
}

/**
 * 卸载Vue应用。
 */
export function unmountApp() {
  if (app) {
    app.unmount();
    app = null;
    piniaInstance = null; // 清理 Pinia 实例
    console.log('SiyuanNewsPlugin: Vue app unmounted.');
  } else {
    console.warn('SiyuanNewsPlugin: App not mounted or already unmounted.');
  }
}

/**
 * 销毁插件资源，主要是卸载Vue应用。
 */
export function destroy() {
  unmountApp();
  // 如果之前创建了全局的 div 并添加到 body，这里需要移除，但当前逻辑是挂载到 Dialog，由 Dialog 管理
  // const div = document.getElementById(usePlugin().name) // 假设 usePlugin() 能获取到当前 plugin 实例
  // if (div && div.parentNode) {
  //   div.parentNode.removeChild(div);
  // }
  console.log('SiyuanNewsPlugin: Plugin resources destroyed.');
}

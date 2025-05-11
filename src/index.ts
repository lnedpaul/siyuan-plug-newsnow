import {
  Plugin,
  getFrontend,
  Dialog, // 导入 Dialog 组件
} from "siyuan";
import "@/index.scss";
import PluginInfoString from '@/../plugin.json';
import { destroy, init, mountApp, unmountApp } from '@/main'; // 导入 mountApp 和 unmountApp

let PluginInfo = {
  name: 'siyuan-plug-newsnow', // 默认插件名称
  displayName: {
    zh_CN: '思源笔记新闻插件'
  },
  version: '0.1.0',
};
try {
  const parsedPluginInfo = JSON.parse(PluginInfoString);
  PluginInfo = { ...PluginInfo, ...parsedPluginInfo };
} catch (err) {
  console.error('SiyuanNewsPlugin: Plugin info parse error: ', err);
}

const DIALOG_ID = `newsnow-dialog-${Date.now()}`;

export default class SiyuanNewsPlugin extends Plugin {
  public isMobile: boolean;
  public isBrowser: boolean;
  public isLocal: boolean;
  public isElectron: boolean;
  public isInWindow: boolean;
  public platform: SyFrontendTypes;
  public readonly version = PluginInfo.version;
  private newsDialog: Dialog | null = null;
  private appContainer: HTMLElement | null = null;

  /**
   * 插件加载时执行的异步函数。
   */
  async onload() {
    const frontEnd = getFrontend();
    this.platform = frontEnd as SyFrontendTypes;
    this.isMobile = frontEnd === "mobile" || frontEnd === "browser-mobile";
    this.isBrowser = frontEnd.includes('browser');
    this.isLocal =
      location.href.includes('127.0.0.1') ||
      location.href.includes('localhost');
    this.isInWindow = location.href.includes('window.html');

    try {
      // @ts-ignore
      require("@electron/remote")
        // @ts-ignore
        .require("@electron/remote/main");
      this.isElectron = true;
    } catch (err) {
      this.isElectron = false;
    }

    // 初始化 Vue 应用，但不立即挂载
    init(this);
    console.log(`SiyuanNewsPlugin: ${this.i18n.pluginName} loaded.`);

    // 添加顶部栏图标按钮
    this.addTopBar({
      icon: "iconInfo", // 可以替换为更合适的图标
      title: this.i18n.pluginName,
      position: "right",
      callback: () => {
        this.openNewsDialog();
      }
    });
  }

  /**
   * 打开新闻插件对话框。
   */
  private openNewsDialog() {
    if (this.newsDialog) {
      // 如果对话框已存在，则销毁旧对话框以确保状态刷新。
      // Dialog.destroy() 会触发其 destroyCallback，进而调用 unmountApp()。
      this.newsDialog.destroy(); 
      this.newsDialog = null;
    }

    // 确保 Vue 应用已初始化或在必要时重新初始化。
    // 每次打开对话框时调用 init，可以保证 Vue 实例 (app) 和 Pinia 实例 (piniaInstance)
    // 在 main.ts 中被重新创建和设置，特别是在它们因对话框关闭或插件卸载而被置为 null 之后。
    init(this);

    this.appContainer = document.createElement('div');
    this.appContainer.id = `${PluginInfo.name}-app-container`;
    this.appContainer.style.width = '100%';
    this.appContainer.style.height = '100%';
    this.appContainer.style.overflow = 'auto'; // 允许内容滚动

    this.newsDialog = new Dialog({
      title: PluginInfo.displayName.zh_CN || PluginInfo.name, // 使用 plugin.json 中的 displayName
      content: `<div id="${this.appContainer.id}" style="height: 100%; width: 100%;"></div>`,
      width: "90vw", // 平铺笔记屏幕，直到软件窗口的边框
      height: "85vh",
      destroyCallback: () => {
        // 对话框关闭时卸载Vue应用
        unmountApp();
        this.appContainer = null; // 清理容器引用
        this.newsDialog = null; // 清理对话框引用
        console.log('SiyuanNewsPlugin: News dialog closed and Vue app unmounted.');
      }
    });

    // 确保 Dialog 的 content DOM 已经准备好
    // Dialog 构造函数执行后，其内容可能还未完全插入到 DOM 中
    // 使用 setTimeout 延迟挂载，或者寻找 Dialog 提供的生命周期钩子
    setTimeout(() => {
      const dialogContentElement = this.newsDialog.element.querySelector(`#${this.appContainer.id}`);
      if (dialogContentElement) {
        mountApp(dialogContentElement as HTMLElement);
      } else {
        console.error('SiyuanNewsPlugin: Dialog content element not found for mounting Vue app.');
      }
    }, 0); // 短暂延迟以确保DOM元素可用
  }

  /**
   * 插件卸载时执行的函数。
   */
  onunload() {
    // 销毁Vue应用和相关资源
    destroy();
    if (this.newsDialog) {
      this.newsDialog.destroy();
      this.newsDialog = null;
    }
    console.log(`SiyuanNewsPlugin: ${this.i18n.pluginName} unloaded.`);
  }

  // openSetting 方法可以保留，如果未来需要独立的设置页面
  // openSetting() {
  //   // 例如，可以打开一个新的 Dialog 来展示设置界面
  //   console.log('SiyuanNewsPlugin: openSetting called.');
  // }
}

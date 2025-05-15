// src/main.ts
import { createApp, provide } from 'vue'
import App from './App.vue'
import SettingsComponent from './Settings.vue';
import { createPinia } from 'pinia'
import { Plugin, Dialog } from 'siyuan'; // IModel is also useful for Dock data

let app: ReturnType<typeof createApp> | null = null;
let settingsApp: ReturnType<typeof createApp> | null = null;

class NewsNowPlugin extends Plugin {
  
  private newsDialog: Dialog | null = null;

  async onload() {
    console.log("NewsNowPlugin onload. Plugin name: ", this.name);

    // 添加顶栏图标按钮
    this.addTopBar({
      icon: "iconInfo", // 您可以更改为您想要的图标
      title: (this.i18n && this.i18n.displayName) || "NewsNow",
      position: "Center",
      callback: () => {
        this.openNewsNowDialog();
      }
    });
  }

  /**
   * 打开 NewsNow 主对话框
   */
  private openNewsNowDialog() {
    const dialogId = `${this.name}-main-dialog-content`;
    // 如果对话框已存在，则显示它，否则创建新的
    if (this.newsDialog) {
        // Siyuan 的 Dialog 可能没有直接的 show/hide 方法，通常是销毁再创建，或者依赖其内部状态
        // 这里我们简单地重新创建，或者您可以根据 Dialog API 探索更优的显示方式
        // 为确保内容是最新的，并且避免重复挂载Vue实例，先尝试销毁旧的
        if (app) {
            app.unmount();
            app = null;
        }
        this.newsDialog.destroy(); 
        this.newsDialog = null;
    }

    this.newsDialog = new Dialog({
      title: "NewsNow插件",
      content: `<div id="${dialogId}" style="height: 100%; min-height: 480px; overflow: auto;"></div>`,
      width: "clamp(320px, 50vw, 600px)", // 响应式宽度
      height: "clamp(480px, 70vh, 800px)", // 响应式高度
      resizable: true,
      destroyCallback: () => {
        if (app) {
          app.unmount();
          app = null;
        }
        this.newsDialog = null; // 清理引用
        console.log("NewsNow Main Dialog Destroyed");
      }
    });

    // 确保在新的 DOM 元素上挂载 Vue 应用
    // 需要延迟一点点时间，确保Dialog的content已经被插入到DOM中
    setTimeout(() => {
        const hostElement = document.getElementById(dialogId);
        if (hostElement) {
            app = createApp(App);
            app.provide('plugin', this);
            app.use(createPinia());
            app.mount(hostElement);
        } else {
            console.error(`Element with id '${dialogId}' not found for mounting Vue app.`);
        }
    }, 50); // 50ms 延迟，可以根据实际情况调整
  }

  onunload() {
    console.log("NewsNowPlugin onunload");
    if (app) { 
        app.unmount();
        app = null;
    }
    if (settingsApp) {
      settingsApp.unmount();
      settingsApp = null;
    }
    if (this.newsDialog) {
        this.newsDialog.destroy();
        this.newsDialog = null;
    }
  }

  openSetting(): void {
    const dialogId = `${this.name}-settings-dialog-content`;
    const dialog = new Dialog({
      title: '插件设置',
      content: `<div id="${dialogId}" style="height: 100%; min-height: 300px;"></div>`,
      width: '600px',
      destroyCallback: () => {
        if (settingsApp) {
          settingsApp.unmount();
          settingsApp = null;
        }
      }
    });

    settingsApp = createApp(SettingsComponent);
    settingsApp.provide('plugin', this); 
    settingsApp.use(createPinia());
    settingsApp.mount(`#${dialogId}`);
  }

  /**
   * 显示新闻详情对话框
   * @param title 新闻标题
   * @param content 新闻内容
   */
  showNewsDialog(title: string, content: string): void {
    const dialog = new Dialog({
      title: title,
      content: `<div class="news-content" style="padding: 16px;">${content}</div>`,
      width: '800px',
      height: '600px'
    });
  }
}

export default NewsNowPlugin;
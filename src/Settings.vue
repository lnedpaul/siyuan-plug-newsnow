<template>
  <div class="settings-panel">
    <div class="setting-group">
      <h4>新闻源配置</h4>
      <div v-for="source in availableSources" :key="source" class="source-item">
        <div class="source-row">
          <span class="source-name">{{ source }}</span>
          <div class="source-controls">
            <button @click="editSource(source)" class="btn-edit">修改</button>
            <button @click="removeSource(source)" class="btn-remove">删除</button>
            <label class="switch">
              <input type="checkbox" :id="source" :value="source" v-model="selectedSources">
              <span class="slider round"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部操作按钮容器 -->
    <div class="actions-footer">
      <button @click="openAddSourceModal" class="btn-add-source">添加新闻源</button>
      <button class="save-btn" @click="saveSettings">保存设置</button>
    </div>

    <!-- 编辑新闻源 URL 模态框 -->
    <div v-if="isEditModalVisible" class="modal-overlay">
      <div class="modal-content">
        <h4>修改新闻源</h4>
        <input type="text" v-model="editingSourceNameInput" placeholder="新闻源名称">
        <input type="text" v-model="editingSourceUrlInput" placeholder="新闻源 URL">
        <div class="modal-actions">
          <button @click="saveEditedSource" class="btn-primary">保存更改</button>
          <button @click="closeEditModal" class="btn-secondary">取消</button>
        </div>
      </div>
    </div>

    <!-- 添加新闻源 模态框 -->
    <div v-if="isAddModalVisible" class="modal-overlay">
      <div class="modal-content">
        <h4>添加新闻源</h4>
        <input type="text" v-model="newSourceNameInput" placeholder="新闻源名称 (例如: 科技新闻)">
        <input type="text" v-model="newSourceUrlInput" placeholder="新闻源 RSS/Feed URL">
        <div class="modal-actions">
          <button @click="saveNewSource" class="btn-primary">保存</button>
          <button @click="closeAddSourceModal" class="btn-secondary">取消</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import { useNewsStore } from '@/store/newsStore'
import { PRESET_SOURCES } from '@/services/newsApi'
import type NewsNowPlugin from '@/main'

const store = useNewsStore()
const availableSources = ref<string[]>(Object.keys(PRESET_SOURCES))
const selectedSources = ref<string[]>([])

// 新增：用于编辑新闻源URL的模态框状态
const isEditModalVisible = ref(false)
const currentEditingSourceKey = ref<string | null>(null)
const editingSourceNameInput = ref('')
const editingSourceUrlInput = ref('')

// 新增：用于添加新闻源的模态框状态
const isAddModalVisible = ref(false)
const newSourceNameInput = ref('')
const newSourceUrlInput = ref('')

// 从思源笔记插件存储加载用户设置
const plugin = inject<NewsNowPlugin>('plugin');

const editSource = (source: string) => {
  currentEditingSourceKey.value = source;
  editingSourceNameInput.value = source;
  editingSourceUrlInput.value = PRESET_SOURCES[source] || '';
  isEditModalVisible.value = true;
};

const saveEditedSource = () => {
  const oldName = currentEditingSourceKey.value;
  const newName = editingSourceNameInput.value.trim();
  const newUrl = editingSourceUrlInput.value.trim();

  if (!oldName) return;

  if (!newName || !newUrl) {
    alert('新闻源名称和 URL 不能为空！');
    return;
  }

  if (newName !== oldName && PRESET_SOURCES[newName]) {
    alert('该新闻源名称已存在，请使用其他名称。');
    return;
  }

  if (newName !== oldName) {
    delete PRESET_SOURCES[oldName];
    const selectedIndex = selectedSources.value.indexOf(oldName);
    if (selectedIndex !== -1) {
      selectedSources.value.splice(selectedIndex, 1, newName);
    }
  }

  PRESET_SOURCES[newName] = newUrl;
  availableSources.value = Object.keys(PRESET_SOURCES);
  
  console.log(`新闻源已修改: ${oldName} -> ${newName}, URL: ${newUrl}`);
  closeEditModal();
};

const closeEditModal = () => {
  isEditModalVisible.value = false;
  currentEditingSourceKey.value = null;
  editingSourceNameInput.value = '';
  editingSourceUrlInput.value = '';
};

// 新增：打开添加新闻源模态框
const openAddSourceModal = () => {
  newSourceNameInput.value = '';
  newSourceUrlInput.value = '';
  isAddModalVisible.value = true;
};

// 新增：关闭添加新闻源模态框
const closeAddSourceModal = () => {
  isAddModalVisible.value = false;
};

// 新增：保存新的新闻源
const saveNewSource = () => {
  const name = newSourceNameInput.value.trim();
  const url = newSourceUrlInput.value.trim();

  if (!name || !url) {
    alert('新闻源名称和 URL 不能为空！'); // 简单提示，后续可改为更友好的UI提示
    return;
  }

  if (PRESET_SOURCES[name]) {
    alert('该新闻源名称已存在，请使用其他名称。');
    return;
  }

  PRESET_SOURCES[name] = url;
  availableSources.value = Object.keys(PRESET_SOURCES); // 更新可用列表
  console.log('新增新闻源:', name, url);
  // 可选：自动选中新增的新闻源
  if (!selectedSources.value.includes(name)) {
    selectedSources.value.push(name);
  }
  closeAddSourceModal();
};

const removeSource = (source: string) => {
  if (confirm(`确定要删除新闻源 ${source} 吗?`)) {
    delete PRESET_SOURCES[source];
    availableSources.value = availableSources.value.filter(s => s !== source);
    selectedSources.value = selectedSources.value.filter(s => s !== source);
    console.log('已删除新闻源:', source);
  }
};

const checkPluginInstance = () => {
  if (!plugin) {
    console.error('新闻聚合插件：插件实例未注入，请检查main.ts中的provide设置');
    return;
  }
}

checkPluginInstance();

const loadSettings = async () => {
  if (plugin) {
    const savedSettings = await plugin.loadData('newsnow_settings.json');
    if (savedSettings) {
      selectedSources.value = savedSettings.selectedSources || Object.keys(PRESET_SOURCES);
      console.log('新闻聚合插件：设置已加载', savedSettings);
    } else {
      console.log('新闻聚合插件：未找到已保存的设置，使用默认值。');
    }
    // 更新 i18n 文本 (如果插件的 i18n 已加载)
    if (plugin.i18n) {
      i18n.value.title = plugin.i18n.settingsDialogTitle || i18n.value.title;
      i18n.value.description = plugin.i18n.settingsDialogDesc || i18n.value.description;
      i18n.value.saveButton = plugin.i18n.settingsSaveButton || i18n.value.saveButton;
    }
  }
};

const saveSettings = async () => {
  if (plugin) {
    const settingsToSave = {
      selectedSources: selectedSources.value
    };
    await plugin.saveData('newsnow_settings.json', settingsToSave);
    console.log('新闻聚合插件：设置已保存', settingsToSave);
    if (window.siyuan && window.siyuan.showMessage) {
        window.siyuan.showMessage(plugin.i18n?.settingsSavedMessage || '设置已保存');
    }
    // 更新新闻源
    if (store.updateSources) {
      store.updateSources(selectedSources.value);
    } else {
      console.warn('新闻聚合插件：store.updateSources方法未定义');
    }
  } else {
    console.warn('新闻聚合插件：插件实例未注入，无法保存设置。');
  }
  // 可以在这里通知主插件重新加载配置（如果需要立即生效）
  // plugin.eventBus.emit('settings-updated');
};

onMounted(() => {
  document.title = '插件设置'; // 设置文档标题
  loadSettings();
});

</script>

<style scoped>
.settings-panel {
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: var(--b3-theme-on-background);
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  padding: 25px;
  background-color: var(--b3-theme-background);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.settings-panel h3 {
    color: var(--b3-theme-on-background);
    margin-bottom: 15px;
    font-size: 20px;
}
.settings-panel div.setting-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
    max-height: 55vh;
    padding-right: 10px;
}

.settings-panel div.setting-group::-webkit-scrollbar {
  width: 8px;
}

.settings-panel div.setting-group::-webkit-scrollbar-track {
  background: var(--b3-theme-surface-light);
  border-radius: 4px;
}

.settings-panel div.setting-group::-webkit-scrollbar-thumb {
  background: var(--b3-theme-primary-light);
  border-radius: 4px;
}

.settings-panel div.setting-group::-webkit-scrollbar-thumb:hover {
  background: var(--b3-theme-primary);
}

.source-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  min-height: 40px;
  padding: 10px 15px;
  margin-bottom: 10px;
  background-color: var(--b3-theme-surface-lighter);
  border-radius: 6px;
  gap: 15px;
  border: 1px solid var(--b3-border-color);
}

.source-name {
  min-width: 150px;
  font-weight: 500;
}

.source-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  margin-left: auto;
}

.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--b3-theme-surface-light);
  transition: .3s;
  border: 1px solid var(--b3-border-color);
}

.slider.round {
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 2px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  transition: .3s;
}

.slider.round:before {
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--b3-theme-primary);
  border-color: var(--b3-theme-primary);
}

input:focus + .slider {
  box-shadow: 0 0 2px var(--b3-theme-primary);
}

input:checked + .slider:before {
  transform: translateX(19px);
}

.settings-panel label {
  font-weight: bold;
  margin-bottom: 5px;
}

.settings-panel input[type="text"],
.settings-panel input[type="number"] {
  padding: 10px;
  border: 1px solid var(--b3-border-color);
  background-color: var(--b3-theme-surface);
  color: var(--b3-theme-on-surface);
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s;
}
.settings-panel input[type="text"]:focus,
.settings-panel input[type="number"]:focus {
    outline: none;
    border-color: var(--b3-theme-primary);
    box-shadow: 0 0 0 2px rgba(var(--b3-theme-primary-rgb), 0.2);
}

.settings-panel button {
  margin-top: 0;
  padding: 8px 15px;
  background-color: var(--b3-theme-primary);
  color: var(--b3-theme-on-primary);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s, opacity 0.2s;
  min-width: initial;
  height: auto;
}

.settings-panel button.btn-edit {
  background-color: var(--b3-theme-surface-light);
  color: var(--b3-theme-on-surface);
  border: 1px solid var(--b3-border-color);
}
.settings-panel button.btn-edit:hover {
  background-color: var(--b3-theme-surface);
  opacity: 1;
}

.settings-panel button.btn-remove {
  background-color: var(--b3-theme-surface-light);
  color: var(--b3-theme-error);
  border: 1px solid var(--b3-border-color);
}
.settings-panel button.btn-remove:hover {
  background-color: var(--b3-theme-error-light);
  color: var(--b3-theme-on-error);
  opacity: 1;
}

.settings-panel button.save-btn {
  margin-top: 20px;
  padding: 10px 20px;
  align-self: flex-start;
}

.settings-panel button:hover {
  opacity: 0.85;
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--b3-theme-background);
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  width: 90%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.modal-content h4 {
  margin-top: 0;
  margin-bottom: 5px;
  font-size: 18px;
  color: var(--b3-theme-on-background);
}

.modal-content p {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--b3-theme-on-surface);
}

.modal-content input[type="text"] {
  padding: 10px;
  border: 1px solid var(--b3-border-color);
  background-color: var(--b3-theme-surface);
  color: var(--b3-theme-on-surface);
  border-radius: 4px;
  font-size: 14px;
}

.modal-content input[type="text"]:focus {
  outline: none;
  border-color: var(--b3-theme-primary);
  box-shadow: 0 0 0 2px rgba(var(--b3-theme-primary-rgb), 0.2);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

.modal-actions button {
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  border: none;
}

.modal-actions .btn-primary {
  background-color: var(--b3-theme-primary);
  color: var(--b3-theme-on-primary);
}
.modal-actions .btn-primary:hover {
  opacity: 0.9;
}

.modal-actions .btn-secondary {
  background-color: var(--b3-theme-surface-light);
  color: var(--b3-theme-on-surface);
  border: 1px solid var(--b3-border-color);
}
.modal-actions .btn-secondary:hover {
  background-color: var(--b3-theme-surface);
}

/* 底部操作按钮容器样式 */
.actions-footer {
  display: flex;
  justify-content: space-between; /* 将按钮分布在两端 */
  align-items: center;
  margin-top: 25px; /* 与上方内容的间距 */
  padding-top: 15px; /* 顶部内边距，可选，用于视觉分隔 */
  border-top: 1px solid var(--b3-border-color); /* 可选的顶部边框 */
}

.actions-footer .btn-add-source {
  /* 添加新闻源按钮的特定样式，如果需要的话 */
  /* 默认继承 .settings-panel button 的样式 */
  background-color: var(--b3-theme-surface-light); /* 使用与编辑/删除按钮类似的次要样式 */
  color: var(--b3-theme-on-surface);
  border: 1px solid var(--b3-border-color);
}

.actions-footer .btn-add-source:hover {
  background-color: var(--b3-theme-surface);
  opacity: 1;
}

.actions-footer .save-btn {
  margin-top: 0; /* 移除原有的 margin-top，因为父容器已处理间距 */
}
</style>
<template>
  <MainPanel />
</template>

<script lang="ts" setup>
import MainPanel from './views/MainPanel.vue';
</script>

<!-- 局部样式 -->
<style lang="scss" scoped>
/* 局部样式内容 */
</style>

<!-- 全局样式 --> 
<style lang="scss">
.plugin-sample-vite-vue-app {
  width: 100vw;
  height: 100dvh;
  max-height: 100vh;
  position: absolute;
  top: 0px;
  left: 0px;
  box-sizing: border-box;
}

.plugin-app-main {
  pointer-events: auto; /* 修改为允许交互 */
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
</style>
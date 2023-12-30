<script setup>
import { useAppStore } from '@/stores/modules/app'

const { appConfig } = useAppStore()
function onThemeClick(theme) {
  if (appConfig.enableGray || appConfig.enableColorWeakness)
    return
  if (theme !== 'dark')
    appConfig.oldTheme = theme
  appConfig.theme = theme
}
function isActive(theme) {
  return appConfig.theme === theme ? 'theme-is-active' : ''
}
const themeList = [
  {
    title: '默认', // 标题
    name: '', // 主题名
    mainBackground: '#f6f6f6', // 主背景
    headBackground: '#ffffff', // 顶栏背景
    asideBackground: '#ffffff', // 侧栏背景
    borderY: '#dcdfe6', // 纵边框
    borderX: '#dcdfe6', // 横边框
  },
  {
    title: '暗黑',
    name: 'dark',
    mainBackground: '#1e1f22',
    headBackground: '#2b2d30',
    asideBackground: '#2b2d30',
    borderY: '#4c4d4f',
    borderX: '#4c4d4f',
  },
  {
    title: '樱花粉',
    name: 'sakura',
    mainBackground: '#fff4f5',
    headBackground: '#f09199',
    asideBackground: '#ffc4d3',
  },
  {
    title: '天空蓝',
    name: 'sky',
    mainBackground: '#eefaff',
    headBackground: '#2ca9e1',
    asideBackground: '#a0d8ef',
  },
  {
    title: '草原绿',
    name: 'grassland',
    mainBackground: '#f1fffd',
    headBackground: '#00523f',
    asideBackground: '#00654f',
  },
  {
    title: '主题-幻想',
    name: 'fantasy',
    mainBackground: 'linear-gradient(90deg,#f7fdff, #f7f7ff, #fffafc)',
    headBackground: 'linear-gradient(45deg, #3b8d99, #6b6b83, #aa4b6b)',
    asideBackground: 'linear-gradient(90deg,#fffafc, #f7f7ff, #f7fdff)',
  },
]
</script>

<template>
  <ul class="fv-theme-switch">
    <li
      v-for="item in themeList" :key="item.name"
      :title="item.title" class="fv-theme-switch-item"
      :style="`background: ${item.mainBackground};`"
      :class="isActive(item.name)"
      @click.stop="onThemeClick(item.name)"
    >
      <div class="fv-theme-switch-item-header" :style="`background: ${item.headBackground};border-bottom: ${item.borderX ? '1px' : 0} solid ${item.borderX};`" />
      <div class="fv-theme-switch-item-sub-menu " :style="`background: ${item.asideBackground};border-right: ${item.borderY ? '1px' : 0} solid ${item.borderY};`" />
    </li>
  </ul>
</template>

<style scoped>
.theme-is-active {
  border: 2px solid var(--el-color-primary) !important;
}

.fv-theme-switch-item:hover {
  border: 2px solid var(--el-color-primary);
}

.fv-theme-switch-item {
  width: 60px;
  height: 60px;
  border: 2px solid var(--el-border-color);
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  float: left;
  margin: 3px;
}

.fv-theme-switch-item-header {
  height: 15px;

}

.fv-theme-switch-item-sub-menu {
  flex-grow: 1;
  width: 15px;

}
</style>

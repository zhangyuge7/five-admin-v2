<script setup>
import { computed } from 'vue'
import SvgIcon from '@/components/svg-icon/index.vue'
import { useAppStore } from '@/stores/modules/app'

defineProps({
  routes: { type: Array, default: () => [] },
  mode: { type: String, default: 'vertical' },
})
const { appConfig } = useAppStore()
const active = computed(() => appConfig.mainMenuActive)

/** 判断路由是否为外链 */
function isLink(path) {
  return (path.startsWith('http:') || path.startsWith('https:'))
}

/** 打开外链地址 */
function openLink(path) {
  if (!isLink(path))
    return
  const arr = path.split(',')
  window.open(arr[0], arr[1])
}
</script>

<template>
  <el-menu
    :mode="mode" :default-active="active" router
    :collapse="!appConfig.isMainMenuShowTitle && mode === 'vertical'"
    :collapse-transition="appConfig.enableCollapseTransition"
    class="fv-default-layout-main-menu"
  >
    <template v-for="item in routes" :key="item.path">
      <el-menu-item :index="isLink(item.path) ? '' : item.path" @click="openLink(item.path)">
        <el-icon v-if="item.meta?.icon">
          <SvgIcon :name="item.meta.icon" />
        </el-icon>
        <template v-if="item.meta?.title" #title>
          {{ $t(item.meta.title) }}
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<style scoped>
.fv-default-layout-main-menu{
  --el-menu-hover-bg-color:var(--fv-main-menu-hover-bg-color);
  --el-menu-horizontal-height:calc(var(--fv-header-height) - 1px);
  --el-menu-item-font-size:var(--fv-main-menu-item-font-size);
}
.fv-default-layout-main-menu .is-active{
  background: var(--fv-main-menu-active-bg);
  color: var(--fv-main-menu-active-color) !important;
}
.el-menu--vertical{
  --el-menu-item-height:var(--fv-main-menu-item-height);
  border-right:var(--fv-main-menu-border-right);
}

.el-menu--vertical:not(.el-menu--collapse) {
  width: var(--fv-main-menu-width);
}
.el-menu--vertical .el-menu-item {
  flex-direction: column;
  justify-content: center;
  line-height: 30px;
}

.el-menu--vertical .el-menu-item .el-icon {
  margin-right: 0;
}

.el-menu--horizontal {
  border-bottom: 0;
  width: 0;
}
</style>

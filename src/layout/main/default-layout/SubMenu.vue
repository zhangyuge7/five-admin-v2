<script setup>
import { computed } from 'vue'
import MenuItem from '@/layout/components/MenuItem.vue'
import router from '@/router'
import { useAppStore } from '@/stores/modules/app'

defineProps({
  mode: { type: String, default: 'vertical' },
  routes: { type: Array, default: () => [] },
})
const appStore = useAppStore()
const { currentRoute } = router

const isCollapse = computed(() => appStore.appConfig.menuIsCollapse)
</script>

<template>
  <el-menu
    :menu-trigger="appStore.appConfig.trigger"
    :mode="mode"
    router
    :collapse="isCollapse"
    :default-active="currentRoute.path"
    :unique-opened="appStore.appConfig.subMenuUniqueOpened"
    :collapse-transition="appStore.appConfig.enableCollapseTransition"
    :ellipsis="true"
    class="fv-default-layout-sub-menu"
  >
    <MenuItem :routes="routes" />
  </el-menu>
</template>

<style>
.fv-default-layout-sub-menu.el-menu--horizontal > .el-sub-menu .el-sub-menu__title:hover{
  background-color: var(--fv-sub-menu-hover-bg-color);
}
</style>

<style scoped>
.fv-default-layout-sub-menu{
  /* color:initial; */
  /* --el-menu-text-color:var(--fv-sub-menu-text-color); */
  --el-menu-hover-bg-color:var(--fv-sub-menu-hover-bg-color);
  --el-menu-horizontal-height:calc(var(--fv-header-height) - 1px);
  --el-menu-item-font-size:var(--fv-sub-menu-item-font-size);
  background:transparent;
}

.el-menu--vertical{
  --el-menu-item-height:var(--fv-sub-menu-item-height);
  --el-menu-sub-item-height:var(--fv-sub-menu-item-height);
  border-right: none;

}
:deep(.el-menu--inline){
  background: var(--fv-sub-menu-inline-bg);
}
.fv-default-layout-sub-menu :deep(.is-active){
  background: var(--fv-sub-menu-active-bg);
  color: var(--fv-sub-menu-active-color);
}
.el-menu--vertical:not(.el-menu--collapse) {
  width: var(--fv-sub-menu-width);
}

.el-menu--horizontal {
  border-bottom: 0;
}
</style>

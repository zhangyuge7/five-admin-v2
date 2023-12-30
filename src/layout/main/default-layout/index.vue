<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue'
import LayoutMain from '../LayoutMain.vue'
import SubMenu from './SubMenu.vue'
import MainMenu from './MainMenu.vue'
import { useAppStore } from '@/stores/modules/app'
import Tabs from '@/layout/components/Tabs.vue'
import useMenu from '@/hooks/useMenu'
import { useRouteStore } from '@/stores/modules/route'

defineOptions({ name: 'DefaultLayout' })
useMenu()
const routeStore = useRouteStore()
const Tools = defineAsyncComponent(() => import('../../components/tools/index.vue'))
const Backtop = defineAsyncComponent(() => import('./Backtop.vue'))
const Breadcrumb = defineAsyncComponent(() => import('@/layout/components/Breadcrumb.vue'))
const Logo = defineAsyncComponent(() => import('./Logo.vue'))
const UserInfo = defineAsyncComponent(() => import('./UserInfo.vue'))

const { appConfig } = useAppStore()

const layoutFixed = computed(() => appConfig.layoutFixed ? 'overflow-auto' : '')
const collapseIcon = computed(() => appConfig.menuIsCollapse ? DArrowRight : DArrowLeft)
const isCrosswise = computed(() => appConfig.layoutType === 'crosswise')
const isMixture = computed(() => appConfig.layoutType === 'mixture')
const isDoubleAside = computed(() => appConfig.layoutType === 'doubleAside')
</script>

<template>
  <article v-show="!appConfig.pageLargeScreen" class="fv-default-layout">
    <header class="fv-default-layout-header">
      <div class="flex items-center flex-shrink-0">
        <Logo v-if="appConfig.showLogo" />
        <Breadcrumb v-if="!isCrosswise && !isMixture" class="ml-3" />
      </div>
      <el-scrollbar v-if="isCrosswise" class="flex-grow" wrap-class="fv-default-layout-scrollbar">
        <SubMenu :routes="routeStore.subMenus" mode="horizontal" style="--el-menu-text-color:initial;" />
      </el-scrollbar>
      <MainMenu v-if="isMixture" class="flex-grow" :routes="routeStore.mainMenus" mode="horizontal" style="background: transparent;--el-menu-text-color:initial;" />
      <div class="flex items-center flex-shrink-0">
        <Tools />
        <UserInfo />
      </div>
    </header>
    <article class="fv-default-layout-bottom " :class="[layoutFixed]">
      <aside class="flex" style="background: var(--fv-aside-bg);">
        <MainMenu v-if="isDoubleAside" :routes="routeStore.mainMenus" mode="vertical" style="height: auto;overflow: auto;flex-shrink: 0;background: var(--fv-main-menu-bg);--el-menu-text-color:var(--fv-main-menu-text-color);" />
        <Transition name="slide" mode="out-in">
          <article v-show="appConfig.showSubMenu" class="fv-default-layout-left">
            <SubMenu :class="[layoutFixed]" :routes="routeStore.subMenus" style="--el-menu-text-color:var(--fv-sub-menu-text-color);" />
            <div class="fv-menu-fold" @click.stop="appConfig.menuIsCollapse = !appConfig.menuIsCollapse">
              <el-icon color="var(--fv-sub-menu-text-color)">
                <Transition name="scale" mode="out-in">
                  <component :is="collapseIcon" />
                </Transition>
              </el-icon>
            </div>
          </article>
        </Transition>
      </aside>
      <Teleport to="#app" :disabled="!appConfig.pageLargeScreen">
        <main class="fv-default-layout-main" :class="[layoutFixed, appConfig.pageLargeScreen ? 'h-full' : '']">
          <Tabs v-if="appConfig.isTabs" class="flex-shrink-0" />
          <LayoutMain :class="[layoutFixed]" class="fv-layout-main" />
          <footer v-if="appConfig.showFooter" class="flex justify-center items-center flex-shrink-0 fv-footer">
            {{ $t(appConfig.footerText) }}
          </footer>
        </main>
      </Teleport>
    </article>
  </article>
  <Backtop :target="appConfig.layoutFixed ? '.fv-layout-main' : '.fv-default-layout'" />
</template>

<style scoped>
.fv-menu-fold{
  @apply
  cursor-pointer flex justify-center items-center rounded
}
.fv-menu-fold:hover{
  background: var(--fv-tools-hover-bg-color);
}
.fv-footer{
  height: var(--fv-footer-heigth);
  background: var(--fv-footer-bg);
  color: var(--fv-footer-text-color);
  font-size: var(--fv-footer-font-size);
  border-top: var(--fv-footer-border-top);
}
.fv-layout-main{
  background: var(--fv-main-page-bg);
  flex-grow: 1;
}
:deep(.fv-default-layout-scrollbar) {
  overflow: hidden !important;
  overflow-x: auto !important;
  height: 110%;
  background: transparent;
}

:deep(.fv-el-drawer-sm)>.el-drawer__body {
  padding: 0;
}

.fv-default-layout-main {
  flex-grow: 1;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}

.fv-default-layout-left {
  width: auto;
  flex-shrink: 0;
  border-right:var(--fv-sub-menu-border-right);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: var(--fv-sub-menu-bg);
}

.fv-default-layout-bottom {
  background: var(--fv-layout-bottom-bg);
  @apply flex-grow flex
}

.fv-default-layout-header {
  height: var(--fv-header-height);
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  border-bottom: var(--fv-header-border-bottom);
  background: var(--fv-header-bg);
  color: var(--fv-header-text-color);
}

.fv-default-layout {
  background: var(--fv-bg);
  @apply flex flex-col w-full h-screen overflow-auto
}
</style>

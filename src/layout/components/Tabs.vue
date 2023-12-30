<script  setup>
import { computed, defineAsyncComponent, onBeforeMount, shallowReactive } from 'vue'
import { cloneDeep } from 'lodash'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import SvgIcon from '@/components/svg-icon/index.vue'
import router from '@/router'
import { useRouteStore } from '@/stores/modules/route'
import { useAppStore } from '@/stores/modules/app'
import { refreshPage } from '@/utils/tools'

const PageLargeScreen = defineAsyncComponent(() => import('./tools/PageLargeScreen.vue'))
const route = useRoute()
const appStore = useAppStore()
const routeStore = useRouteStore()

// 数据定义
const state = shallowReactive({
  currTabPath: '', // 当前激活的标签 path
  tabs: [], // 标签列表
  visible: false,
})

// 是否在 tab 上显示图标
const showIcon = computed(() => appStore.appConfig.tabsIcon)
let path = ''
// 定义方法
const methods = {
  // 改变当前 tab
  changeCurrPath(path) {
    state.currTabPath = path
    router.push(path)
  },
  // 新增 tab
  addTab(currentRoute) {
  // 判断当前路由是否已经在标签页列表
    const exist = state.tabs.filter(item => item.path === currentRoute.path)
    // 判断404
    const not = currentRoute.name === 'NotFound'
    // 如果标签页列表中不存在当前路由信息，并且不是404页面，将当前路由信息添加到列表
    if ((!exist || !exist.length) && !not && currentRoute.path !== '/')
      state.tabs.push(currentRoute)
    state.currTabPath = currentRoute.path
    methods.fixedLastTab()
  },
  // 关闭 tab
  removeTab(targetName) {
    const tabs = state.tabs
    let activeName = state.currTabPath
    if (activeName === targetName) {
      for (const i in tabs) {
        if (tabs[i].path === targetName) {
          const nextTab = tabs[i + 1] || tabs[i - 1]
          if (nextTab) {
            activeName = nextTab.path
            break
          }
        }
      }
    }
    methods.changeCurrPath(activeName)
    state.tabs = tabs.filter(tab => tab.path !== targetName)
    if (!state.tabs.length)
      router.push('/')

    methods.fixedLastTab()
  },
  // 关闭其它 tabs
  removeOtherTabs(targetPath) {
    const tabs = state.tabs
    if (state.currTabPath !== targetPath)
      methods.changeCurrPath(targetPath)

    state.tabs = tabs.filter(tab => tab.path === targetPath || tab.meta?.fixedTab)
    methods.fixedLastTab()
  },
  // 关闭全部 tabs
  removeAllTabs() {
    const tabs = state.tabs
    // 获取所有固定的 tab
    const fixedTabs = tabs.filter(tab => tab.meta?.fixedTab)
    // 如果有固定的 tab ，只保留固定的，其它的全部关闭
    if (fixedTabs.length) {
    // 从所有固定的 tabs 中找出当前激活的 tab
      const currTab = fixedTabs.filter(tab => tab.path === state.currTabPath)
      // 如果当前激活的 tab 不在固定 tabs 中，将固定的 tabs 的最后一项作为当前激活
      if (!currTab.length)
        methods.changeCurrPath(fixedTabs[fixedTabs.length - 1].path)

      // 只保留固定的 tabs
      state.tabs = fixedTabs
    }
    // 如果没有固定的 tabs,保留第一个 tab ，将其它tab全部删除
    else {
      state.tabs = [state.tabs[0]]
      if (state.currTabPath !== state.tabs[0].path)
        methods.changeCurrPath(state.tabs[0].path)

      methods.fixedLastTab()
    }
  },
  // 关闭左侧 tabs
  removeLeftTabs(targetPath) {
    if (state.tabs.length < 2)
      return
    const tabs = state.tabs
    let targetIndex = 0
    let currentIndex = 0
    let currentRt
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].path === targetPath)
        targetIndex = i
      if (tabs[i].path === state.currTabPath) {
        currentIndex = i
        currentRt = tabs[i]
      }
    }
    if (currentIndex < targetIndex && !currentRt.meta?.fixedTab)
      methods.changeCurrPath(targetPath)

    state.tabs = tabs.filter((item, i) => {
      return item.meta?.fixedTab || i >= targetIndex
    })
    methods.fixedLastTab()
  },
  // 关闭右侧 tabs
  removeRightTabs(targetPath) {
    if (state.tabs.length < 2)
      return
    const tabs = state.tabs
    let targetIndex = 0
    let currentIndex = 0
    let currentRt
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].path === targetPath)
        targetIndex = i
      if (tabs[i].path === state.currTabPath) {
        currentIndex = i
        currentRt = tabs[i]
      }
    }
    if (currentIndex > targetIndex && !currentRt.meta?.fixedTab)
      methods.changeCurrPath(targetPath)
    state.tabs = tabs.filter((item, i) => {
      return item.meta?.fixedTab || i <= targetIndex
    })
    methods.fixedLastTab()
  },
  // tab 被点击时
  tabClick(pane) {
    if (route.path !== pane.props.name)
      router.push(pane.props.name)
  },

  // 固定最后一个 tab 不可被关闭
  fixedLastTab() {
    // 判断标签页列表是否只有一个
    if (state.tabs.length === 1) {
      // 判断这一个标签是否为固定配置
      if (!state.tabs[0].meta?.fixedTab) {
        // 固定这个标签不可被关闭
        state.tabs[0].meta.fixedTab = true
        // 保存这个被设置为固定状态的 path
        path = state.tabs[0].path
      }
    }
    // 判断是否有被设置为固定状态的 path 并且标签页列表不止有一个
    else if (path && state.tabs.length > 1) {
      // 根据 path 过滤出被设置为固定状态的标签信息
      const routes = state.tabs.filter(item => item.path === path)
      // 取消固定状态
      routes[0].meta.fixedTab = false
      path = ''
    }
  },
  // 右键点击菜单项
  command(v) {
    const { flag, tab } = v
    // 刷新
    if (flag === 'refresh')
      refreshPage()
    // 关闭当前
    else if (flag === 'close')
      methods.removeTab(tab.path)
    // 关闭其它
    else if (flag === 'close-other')
      methods.removeOtherTabs(tab.path)
    else if (flag === 'close-left')
      methods.removeLeftTabs(tab.path)
    else if (flag === 'close-right')
      methods.removeRightTabs(tab.path)
    // 关闭所有
    else if (flag === 'close-all')
      methods.removeAllTabs()
  },
}

// 侦听路由变化
/*
路由修改前执行，如果在全局路由前置守卫中将路由拦截，这里可能会有bug：
  页面没进去，但是tab已经添加了。这只是猜测，没有测试证明
*/
onBeforeRouteUpdate((to) => {
  methods.addTab(to)
})

// 组件加载前
onBeforeMount(() => {
  // 从 pinia 仓库中获取需要固定在标签页的路由
  state.tabs = cloneDeep(routeStore.fiexTabsRoutes)
  // 当前路由添加到标签
  methods.addTab(cloneDeep({
    path: route.path,
    name: route.name,
    meta: route.meta,
  }))
})
</script>

<template>
  <div class="fv-tabs flex justify-between">
    <el-tabs
      v-model="state.currTabPath"
      :type="appStore.appConfig.tabsType"
      class="flex-1 overflow-hidden"
      @tab-remove="methods.removeTab"
      @tab-click="methods.tabClick"
    >
      <el-tab-pane
        v-for="item in state.tabs"
        :key="item.path"
        :name="item.path"
        :closable="!item.meta?.fixedTab"
      >
        <template #label>
          <el-dropdown trigger="contextmenu" style="color: inherit;" @command="methods.command">
            <div class="tabs-dropdown">
              <el-icon v-if="showIcon && item.meta?.icon">
                <SvgIcon :name="item.meta.icon" />
              </el-icon>
              <span v-if="item.meta?.title" class="tabs-item-title">{{ $t(item.meta.title) }}</span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :disabled="state.currTabPath !== item.path" :command="{ flag: 'refresh', tab: item }">
                  <el-icon>
                    <SvgIcon name="EpRefresh" />
                  </el-icon>
                  <span>
                    {{ $t('tabs.refresh') }}
                  </span>
                </el-dropdown-item>

                <el-dropdown-item :disabled="item.meta.fixedTab" :command="{ flag: 'close', tab: item }">
                  <el-icon>
                    <SvgIcon name="EpClose" />
                  </el-icon>
                  <span>
                    {{ $t('tabs.close') }}
                  </span>
                </el-dropdown-item>
                <el-dropdown-item :command="{ flag: 'close-left', tab: item }">
                  <el-icon>
                    <SvgIcon name="HumbleiconsAlignObjectsLeft" />
                  </el-icon>
                  <span>
                    {{ $t('tabs.closeLeft') }}
                  </span>
                </el-dropdown-item>
                <el-dropdown-item :command="{ flag: 'close-right', tab: item }">
                  <el-icon>
                    <SvgIcon name="HumbleiconsAlignObjectsRight" />
                  </el-icon>
                  <span>
                    {{ $t('tabs.closeRight') }}
                  </span>
                </el-dropdown-item>
                <el-dropdown-item :command="{ flag: 'close-other', tab: item }">
                  <el-icon>
                    <SvgIcon name="EpCircleClose" />
                  </el-icon>
                  <span>
                    {{ $t('tabs.closeOther') }}
                  </span>
                </el-dropdown-item>
                <el-dropdown-item :command="{ flag: 'close-all', tab: item }">
                  <el-icon>
                    <SvgIcon name="EpCircleCloseFilled" />
                  </el-icon>
                  <span>
                    {{ $t('tabs.closeAll') }}
                  </span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-tab-pane>
    </el-tabs>
    <div class="fv-tabs-operation">
      <PageLargeScreen size="18" />
      <el-dropdown :trigger="appStore.appConfig.trigger" @command="methods.command" @visible-change="state.visible = $event">
        <div class="el-dropdown-link ">
          <el-icon size="24">
            <Transition name="scale" mode="out-in">
              <component :is="state.visible ? ArrowUp : ArrowDown" />
            </Transition>
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :command="{ flag: 'refresh', tab: { path: state.currTabPath } }">
              <el-icon>
                <SvgIcon name="EpRefresh" />
              </el-icon>
              <span>
                {{ $t('tabs.refresh') }}
              </span>
            </el-dropdown-item>
            <el-dropdown-item :command="{ flag: 'close-left', tab: { path: state.currTabPath } }">
              <el-icon>
                <SvgIcon name="HumbleiconsAlignObjectsLeft" />
              </el-icon>
              <span>
                {{ $t('tabs.closeLeft') }}
              </span>
            </el-dropdown-item>
            <el-dropdown-item :command="{ flag: 'close-right', tab: { path: state.currTabPath } }">
              <el-icon>
                <SvgIcon name="HumbleiconsAlignObjectsRight" />
              </el-icon>
              <span>
                {{ $t('tabs.closeRight') }}
              </span>
            </el-dropdown-item>
            <el-dropdown-item :command="{ flag: 'close-other', tab: { path: state.currTabPath } }">
              <el-icon>
                <SvgIcon name="EpCircleClose" />
              </el-icon>
              <span>
                {{ $t('tabs.closeOther') }}
              </span>
            </el-dropdown-item>
            <el-dropdown-item :command="{ flag: 'close-all', tab: { path: state.currTabPath } }">
              <el-icon>
                <SvgIcon name="EpCircleCloseFilled" />
              </el-icon>
              <span>
                {{ $t('tabs.closeAll') }}
              </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style>
.fv-tabs{
    background: var(--fv-tabs-bg);
    color:var(--fv-tabs-text-color);
}
.fv-tabs .el-tabs--border-card{
  border:0;
}
.fv-tabs-operation{
  border-bottom: 1px solid var(--el-border-color);
  height: calc(var(--fv-tabs-height) - 1px);
  width: auto;
  display: flex;
  justify-content: center;
}
.fv-tabs-operation .el-dropdown-link{
  width: 40px;
  display: flex;
  justify-content: center;
}
.fv-tabs-operation .el-dropdown-link:hover{
  background-color: var(--fv-tools-hover-bg-color);
}
.fv-tabs-operation .el-dropdown{
  color: inherit;
}
.tabs-dropdown{
  height: var(--fv-tabs-height);
  display: flex;
  align-items: center;
}
.fv-tabs .is-active *{
  color: var(--el-color-primary);
}
.fv-tabs .el-tabs__item{
  color: inherit;
}
.fv-tabs .el-tabs__item:hover *{
  color: var(--el-color-primary);
}
.tabs-item-title{
  margin-left: 2px;
}
.fv-tabs .el-tabs__nav-wrap{
  margin-bottom: 0;
}
.fv-tabs .el-tabs__nav-wrap.is-scrollable{
  padding: 0 40px;
}
.fv-tabs .el-tabs__nav-next:hover, .fv-tabs .el-tabs__nav-prev:hover{
  background-color: var(--fv-tools-hover-bg-color);
  color:var(--el-color-primary);
}
.fv-tabs .el-tabs__nav-next, .fv-tabs .el-tabs__nav-prev{
    height: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
    position: absolute;
    cursor: pointer;
    font-size: 18px;
    color: var(--el-text-color-secondary);
    width: 40px;
    text-align: center;
}
.fv-tabs .el-tabs{
  --el-tabs-header-height: var(--fv-tabs-height);
}
.fv-tabs .el-tabs__header{
  margin: -1px;
}
.fv-tabs .el-tabs--border-card > .el-tabs__content{
  padding: 0;
}
</style>

<script setup>
import { onMounted, onUnmounted, reactive } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import mittBus from '@/utils/mitt'
import { getCssVal, setCssVal } from '@/utils/domUtils'
import { tabsTypes, transitionNames } from '@/appConfig'
import LayoutSelect from '@/layout/components/LayoutSelect.vue'
import { t } from '@/i18n'
import ThemeSwitch from '@/layout/components/ThemeSwitch.vue'

const appStore = useAppStore()

// 响应式数据定义
const state = reactive({
  showSettingDrawer: false, // 控制显示抽屉
  size: 'default', // 当前组件的子组件尺寸
  menuWidth: 0, // 侧栏菜单宽度
  mainMenuWidth: 0, // 侧栏主菜单宽度
  footerHeight: 0, // 页脚高度
  headerHeight: 0, // 顶栏高度
  tabsHeight: 0, // tabs高度
})

// 方法定义
const methods = {
  // 抽屉关闭时
  drawerClose() {
    state.showSettingDrawer = false
  },
  // 初始化数据
  initState() {
    // 获取侧栏菜单宽度
    const menuWidth = getCssVal('--fv-sub-menu-width')
    state.menuWidth = Number.parseInt(menuWidth.substring(0, menuWidth.lastIndexOf('px')))
    // 获取侧栏主菜单宽度
    const mainMenuWidth = getCssVal('--fv-main-menu-width')
    state.mainMenuWidth = Number.parseInt(mainMenuWidth.substring(0, mainMenuWidth.lastIndexOf('px')))
    // 获取页脚高度
    const footerHeight = getCssVal('--fv-footer-heigth')
    state.footerHeight = Number.parseInt(footerHeight.substring(0, footerHeight.lastIndexOf('px')))
    // 获取顶栏高度
    const headerHeight = getCssVal('--fv-header-height')
    state.headerHeight = Number.parseInt(headerHeight.substring(0, headerHeight.lastIndexOf('px')))
    // 获取tabs高度
    const tabsHeight = getCssVal('--fv-tabs-height')
    state.tabsHeight = Number.parseInt(tabsHeight.substring(0, tabsHeight.lastIndexOf('px')))
  },
  // 修改尺寸
  updateSizeCssValue(v, cssKey) {
    cssKey && setCssVal(cssKey, `${v}px`)
  },
}

onMounted(() => {
  // 初始化数据
  methods.initState()
  // 监听事件打开抽屉
  mittBus.on('onShowSettingDrawer', () => {
    state.showSettingDrawer = true
  })
})
onUnmounted(() => {
  mittBus.off('onShowSettingDrawer')
})
</script>

<template>
  <div>
    <el-drawer
      :model-value="state.showSettingDrawer"
      :title="t('appConfig.applicationConfig')"
      size="350px" class="setting-drawer"
      :lock-scroll="false"

      @close="methods.drawerClose"
    >
      <el-scrollbar class=" pr-4">
        <el-divider :size="state.size">
          {{ t('appConfig.layoutConfig') }}
        </el-divider>
        <div class="setting-item">
          <LayoutSelect v-model="appStore.appConfig.layoutType" />
        </div>
        <el-divider :size="state.size">
          {{ t('appConfig.theme') }}
        </el-divider>
        <div class="setting-item">
          <ThemeSwitch />
        </div>

        <el-divider :size="state.size">
          LOGO
        </el-divider>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.showLogo') }}
          </el-text>
          <el-switch
            v-model="appStore.appConfig.showLogo"
            :size="state.size"
          />
        </div>

        <el-divider :size="state.size">
          {{ t('appConfig.headerConfig') }}
        </el-divider>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.headerHeight') }}
          </el-text>
          <el-input-number
            v-model="state.headerHeight"
            :size="state.size"
            controls-position="right"
            @change="methods.updateSizeCssValue($event, '--fv-header-height')"
          />
        </div>

        <el-divider :size="state.size">
          {{ t('appConfig.sideConfig') }}
        </el-divider>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.collapse') }}
          </el-text>
          <el-switch
            v-model="appStore.appConfig.menuIsCollapse"
            :size="state.size"
            :disabled="appStore.appConfig.layoutType === 'crosswise'"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.collapseAnimation') }}
          </el-text>
          <el-switch
            v-model="appStore.appConfig.enableCollapseTransition"
            :size="state.size"
            :disabled="appStore.appConfig.layoutType === 'crosswise'"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.primaryTitle') }}
          </el-text>
          <el-switch
            v-model="appStore.appConfig.isMainMenuShowTitle"
            :disabled="appStore.appConfig.layoutType !== 'doubleAside'"
            :size="state.size"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.sideWidth') }}
          </el-text>
          <el-input-number
            v-model="state.menuWidth"
            :size="state.size"
            controls-position="right"
            :disabled="appStore.appConfig.menuIsCollapse || appStore.appConfig.layoutType === 'crosswise'"
            @change="methods.updateSizeCssValue($event, '--fv-sub-menu-width')"
          />
        </div>
        <el-divider :size="state.size">
          {{ t('appConfig.menuConfig') }}
        </el-divider>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.uniqueOpened') }}
          </el-text>
          <el-switch
            v-model="appStore.appConfig.subMenuUniqueOpened"
            :disabled="appStore.appConfig.menuIsCollapse || appStore.appConfig.layoutType === 'crosswise'"
            :size="state.size"
          />
        </div>

        <el-divider :size="state.size">
          {{ t('appConfig.tabsConfig') }}
        </el-divider>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.openTabs') }}
          </el-text>
          <el-switch
            v-model="appStore.appConfig.isTabs"
            :size="state.size"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.showIcon') }}
          </el-text>
          <el-switch
            v-model="appStore.appConfig.tabsIcon"
            :disabled="!appStore.appConfig.isTabs"
            :size="state.size"
          />
        </div>

        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.tabsStyle') }}
          </el-text>
          <el-select v-model="appStore.appConfig.tabsType" :size="state.size" class="select" :disabled="!appStore.appConfig.isTabs">
            <el-option
              v-for="item in tabsTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.tabsHeight') }}
          </el-text>
          <el-input-number
            v-model="state.tabsHeight"
            :size="state.size"
            controls-position="right"
            :disabled="!appStore.appConfig.isTabs"
            @change="methods.updateSizeCssValue($event, '--fv-tabs-height')"
          />
        </div>
        <el-divider :size="state.size">
          {{ t('appConfig.transitionAnimationConfig') }}
        </el-divider>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.openAnimation') }}
          </el-text>
          <el-switch
            v-model="appStore.appConfig.isTransition"
            :size="state.size"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.animationStyle') }}
          </el-text>
          <el-select v-model="appStore.appConfig.transitionName" :size="state.size" class="select" :disabled="!appStore.appConfig.isTransition">
            <el-option
              v-for="item in transitionNames"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <el-divider :size="state.size">
          {{ t('appConfig.pageFooterConfig') }}
        </el-divider>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.showFooter') }}
          </el-text>
          <el-switch
            v-model="appStore.appConfig.showFooter"
            :size="state.size"
          />
        </div>

        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.footerHeight') }}
          </el-text>
          <el-input-number
            v-model="state.footerHeight"
            :size="state.size"
            controls-position="right"
            :disabled="!appStore.appConfig.showFooter"
            @change="methods.updateSizeCssValue($event, '--fv-footer-heigth')"
          />
        </div>

        <el-divider :size="state.size">
          {{ t('appConfig.otherConfig') }}
        </el-divider>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.grayPattern') }}
          </el-text>
          <el-switch
            v-model="appStore.appConfig.enableGray"
            :size="state.size"
          />
        </div>
        <div class="setting-item">
          <el-text :size="state.size">
            {{ t('appConfig.tritanope') }}
          </el-text>
          <el-switch
            v-model="appStore.appConfig.enableColorWeakness"
            :size="state.size"
          />
        </div>
        <el-divider :size="state.size">
          {{ t('appConfig.hint') }}
        </el-divider>
        <el-alert :title="t('appConfig.hintText')" type="warning" :closable="false" />
      </el-scrollbar>
    </el-drawer>
  </div>
</template>

<style lang="scss">
.setting-drawer {
    .el-drawer__header {
        margin-bottom: 0;
    }
    .setting-item{
        display: flex;
        justify-content: space-between;
        margin: 2px 0;
    }
    .select{
        width: 85px;
    }
    .el-drawer__body{
      padding-right: 0;
    }
    .el-input-number{
      width: 85px;
    }
    .el-input{
      width: 85px;
    }

}
</style>

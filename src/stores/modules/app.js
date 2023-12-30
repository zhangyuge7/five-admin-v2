import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import sysGlobalConfig from '@/appConfig'
import { cancelColorWeakness, cancelGray, setColorWeakness, setGray } from '@/utils/theme'
import { addClass, clearClass } from '@/utils/domUtils'

const PREFIX = import.meta.env.VITE_APP_STORAGE_PREFIX

export const useAppStore = defineStore('app', () => {
  const appConfig = ref({
    ...sysGlobalConfig,
    // 显示子菜单
    showSubMenu: true,
    // 主菜单当前激活项
    mainMenuActive: '',
    // 当前页面全屏
    pageLargeScreen: false,
    // 记录上个主题
    oldTheme: '',
  })

  // 侦听灰色模式
  watch(() => appConfig.value.enableGray, val => val ? setGray() : cancelGray(), { immediate: true })

  // 侦听色弱模式
  watch(() => appConfig.value.enableColorWeakness, val => val ? setColorWeakness() : cancelColorWeakness(), { immediate: true })
  // 侦听主题
  watch(() => appConfig.value.theme, (theme) => {
    const htmlEl = document.documentElement
    if (htmlEl) {
      clearClass(htmlEl)
      addClass(htmlEl, theme)
    }
  }, { immediate: true })

  return { appConfig }
}, {
  persist: {
    key: `${PREFIX}APPCONFIG`,
    paths: [
      'appConfig.defaultLanguage',
      'appConfig.elementSize',
      'appConfig.layoutType',
      'appConfig.showSubMenu',
      'appConfig.theme',
      'appConfig.oldTheme',
    ],
    storage: localStorage,
    debug: true, // 输出持久化错误信息
  },
})

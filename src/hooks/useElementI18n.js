import zhCn from 'element-plus/dist/locale/zh-cn.js'
import zhTw from 'element-plus/dist/locale/zh-tw.js'
import en from 'element-plus/dist/locale/en.js'
import { computed } from 'vue'
import { useAppStore } from '@/stores/modules/app'

export default function useElementI18n() {
  const useApp = useAppStore()
  const locale = computed(() => {
    return useApp.appConfig.defaultLanguage === 'zh-cn'
      ? zhCn
      : useApp.appConfig.defaultLanguage === 'zh-tw'
        ? zhTw
        : en
  })
  return { locale }
}

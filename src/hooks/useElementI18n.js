import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import zhTw from 'element-plus/dist/locale/zh-tw.mjs'
import en from 'element-plus/dist/locale/en.mjs'
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

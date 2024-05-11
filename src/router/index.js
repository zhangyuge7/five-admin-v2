import { createRouter, createWebHistory } from 'vue-router'
import baseRoutes from './base'
import { useRouteStore } from '@/stores/modules/route'
import useAuth from '@/hooks/useAuth'
import { t } from '@/i18n'
import { useAppStore } from '@/stores/modules/app'
import { useUserStore } from '@/stores/modules/user'
import usePageLoading from '@/utils/pageLoading'
import { userInfoApi } from '@/api/auth'

// 路由白名单
export const WHITE_LIST = []

const router = createRouter({
  // 使用HTML5模式，正式环境服务器配置查看：https://router.vuejs.org/zh/guide/essentials/history-mode.html
  history: createWebHistory(import.meta.env.VITE_APP_BASE_PATH),
  routes: baseRoutes,
})
const { start, end } = usePageLoading()
// 前置守卫
router.beforeEach(async (to, from) => {
  start()
  const { hasToken } = useAuth()
  if (hasToken && to.name === 'Login') {
    /** 如果已经登录并跳转登录页，则重定向 */
    return { path: from.fullPath }
  }
  if (WHITE_LIST.includes(to.path)) {
    /** 如果为白名单路由，则通过 */
    return true
  }
  if (!hasToken && to.name !== 'Login') {
    /** 如果没有登录，并且跳转路径不为登录，则重定向到登录 */
    return { name: 'Login' }
  }
  const userStore = useUserStore()
  /** 如果已经认证但仓库没有用户信息，尝试重新获取用户信息 */
  if (hasToken && !userStore.userInfo) {
    const routeStore = useRouteStore()
    const { ok, data } = await userInfoApi()
    if (ok) {
      // 将用户信息保存到仓库
      userStore.userInfo = data
      // 初始化路由
      await routeStore.initRoutes()
      return { path: to.fullPath, replace: true }
    }
    else {
      // 获取用户信息失败，回登录页
      return { name: 'Login' }
    }
  }
})

// 后置守卫
router.afterEach((to) => {
  const appStore = useAppStore()
  // 判断动态 html 标题是否开启
  if (appStore.appConfig.dynamicTitle) {
    if (to.meta?.title)
      document.title = `${import.meta.env.VITE_APP_TITLE} - ${t(to.meta?.title)}`
    else
      document.title = import.meta.env.VITE_APP_TITLE
  }
  end()
})
function setupRouter(app) {
  app.use(router)
}
export default router
export { setupRouter }

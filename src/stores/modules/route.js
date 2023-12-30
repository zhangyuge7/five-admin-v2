import { defineStore } from 'pinia'
import { shallowRef } from 'vue'
import { menuListApi } from '@/api/auth'
import router from '@/router'
import useAuth from '@/hooks/useAuth'
import appConfig from '@/appConfig'
import routeModuleList from '@/router/modules'
import { useUserStore } from '@/stores/modules/user'
import { rootRoute } from '@/router/base'
import { getHomePath, getMenus, handleRoutes } from '@/router/routerUtil'

const { routeSource, innerNotFound } = appConfig

export const useRouteStore = defineStore('route', () => {
  // 菜单列表
  const menus = shallowRef([])
  // 主菜单
  const mainMenus = shallowRef([])
  // 子菜单
  const subMenus = shallowRef([])
  // 需要在移除组件时缓存的路由 name 列表
  const keepAliveViews = shallowRef([])
  // 需要在 tabs 标签中固定的路由
  const fiexTabsRoutes = shallowRef([])

  /**
   *  初始化路由
   */
  async function initRoutes() {
    // 获取路由表
    let routes = []
    if (routeSource === 'frontend') {
      routes = routeModuleList
    }
    else if (routeSource === 'backend') {
      const res = await menuListApi()
      routes = res.data
    }
    const { hasRole } = useAuth()
    const routeMap = handleRoutes(routes, hasRole, innerNotFound)
    // 获取homePath
    rootRoute.redirect = getHomePath(useUserStore().userInfo)
    // 需要缓存的组件列表名称
    keepAliveViews.value = routeMap.keepAliveViews
    // 需要固定标签的路由
    fiexTabsRoutes.value = routeMap.fiexTabsRoutes
    // 添加路由到路由器
    rootRoute.children = [...routeMap.innerRoutes]
    router.addRoute(rootRoute)
    // 提升需要在 layout 框架外显示的路由与 root 路由平级
    routeMap.outerRoutes.forEach((outRoute) => {
      router.addRoute(outRoute)
    })
    // 获取菜单
    menus.value = getMenus(routes, hasRole)
  }

  // 使用 setup 语法糖的 pinia 自己实现 $reset 方法
  function $reset() {
    menus.value = []
    mainMenus.value = []
    subMenus.value = []
    keepAliveViews.value.length = 0
    fiexTabsRoutes.value.length = 0
  }
  return { menus, mainMenus, subMenus, keepAliveViews, fiexTabsRoutes, initRoutes, $reset }
})

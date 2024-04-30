import useCutTree from 'cut-tree'
import { cloneDeep } from 'lodash'
import { notFound } from '@/router/base'

const { sort, foreach, forEach, listToTree } = useCutTree({ id: 'path', children: 'children', parentId: 'parentPath' })
const allViews = import.meta.glob('/src/views/**/*.vue')
/**
 * 菜单排序
 * @param {*[]} menus 菜单
 */
function menusSort(menus) {
  sort(menus, (a, b) => {
    if (a.meta?.sortNo && !b.meta?.sortNo && b.meta?.sortNo !== 0)
      return -1

    else if (!a.meta?.sortNo && a.meta?.sortNo !== 0 && b.meta?.sortNo)
      return 1

    else if (!a.meta?.sortNo && a.meta?.sortNo !== 0 && !b.meta?.sortNo && b.meta?.sortNo !== 0)
      return 0

    return a.meta.sortNo - b.meta.sortNo
  })
}
/**
 * 获取菜单树列表
 * @param {*[]} routes 路由
 * @param {Function} hasRole 角色权限验证函数
 * @returns 菜单树列表
 */
function getMenus(routes, hasRole) {
  routes = cloneDeep(routes)
  let menuList = []
  // 遍历
  foreach(routes, (route, i, l, parent) => {
    // 父级标识赋值，方便转换为列表后再次转为树
    if (!route.parentPath)
      route.parentPath = parent ? parent.path : null

    /**
       * 如果父节点需要隐藏所有子级
       * 或此节点无权限
       * 将节点设置为隐藏并且也隐藏其子级，这样在遍历到其子节点时这个条件也成立
       */
    if (parent?.meta?.hideChildren || (hasRole && route.meta?.roles && !hasRole(route.meta.roles))) {
      if (!route.meta)
        route.meta = {}
      route.meta.isHide = true
      route.meta.hideChildren = true
    }

    // 如果此节点隐藏并且不隐藏子级，需要将子级提升一个leve
    else if (route.meta?.isHide && !route.meta.hideChildren && route.children?.length) {
      if (parent)
        route.children.forEach(item => item.parentPath = parent.path)
      else
        route.children.forEach(item => item.parentPath = null)
    }

    menuList.push(route)
  })

  // 将所有节点的子节点清空，否则转树时有重复节点
  menuList.forEach(route => route.children = null)

  // 保留所有未隐藏的节点
  menuList = menuList.filter(route => !route.meta?.isHide)
  const menuTree = listToTree(menuList)
  // 排序
  menusSort(menuTree)
  return menuTree
}

/**
 * 获取 homePath
 * @param {*} userInfo 用户信息
 * @returns
 */
function getHomePath(userInfo) {
  return userInfo?.homePath || import.meta.env.VITE_APP_HOME_PATH
}
/**
 * 判断路由是否为外链内嵌路由
 * @param {*} route 路由对象
 * @returns
 */
function isIframe(route) {
  if (route.meta?.iframeLink) {
    if (route.meta.iframeLink.startsWith('http:') || route.meta.iframeLink.startsWith('https:')) {
      return true
    }
    else {
      console.warn(`${route.path} 路由不符合此框架内嵌外链接规则, route.meta.iframeLink 应以 'http:' 或 'https:' 开头`, route)
      return false
    }
  }
  return false
}
/**
 * 处理 component
 * @param {*} route 路由对象
 * @param {*} hasRole 角色权限验证函数
 */
function handleComponent(route, hasRole) {
  if (route.meta?.roles && hasRole && !hasRole(route.meta.roles)) {
    route.component = () => import('/src/views/error-page/NotPermission.vue')
    route.meta.hide = true
    route.meta.title = '无权限'
  }
  else if (isIframe(route)) {
    route.component = () => import('@/layout/main/LayoutIframe.vue')
  }
  else if (route.component && typeof (route.component) === 'string') {
    const url = route.component.endsWith('.vue')
      ? `/src/views/${route.component}`
      : `/src/views/${route.component}.vue`
    // route.component = () => import(/* @vite-ignore */url)
    route.component = allViews[url]
  }
}

/**
 * 处理路由
 * @param {*} rawRoutes 原路由信息
 * @param {*} hasRole 角色权限验证函数
 * @param {*} innerNotFound 404是否显示在layout内
 * @returns
 */
function handleRoutes(routes, hasRole, innerNotFound) {
  const outerRoutes = []
  const innerRoutes = []
  const keepAliveViews = []
  const fiexTabsRoutes = []
  routes = cloneDeep(routes)
  forEach(routes, (route) => {
    handleComponent(route, hasRole)
    if (route.meta?.isKeep)
      keepAliveViews.push(route.name)
    if (route.meta?.isOuter)
      outerRoutes.push(route)
    else if (route.meta?.fixedTab)
      fiexTabsRoutes.push(route)
  })

  if (innerNotFound)
    innerRoutes.push(...routes, notFound)
  else
    innerRoutes.push(...routes)

  return {
    innerRoutes,
    outerRoutes,
    keepAliveViews,
    fiexTabsRoutes,
  }
}
export { getMenus, handleRoutes, getHomePath }

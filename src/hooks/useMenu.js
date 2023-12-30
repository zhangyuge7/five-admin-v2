import { useRoute } from 'vue-router'
import { watch } from 'vue'
import { cloneDeep } from 'lodash'
import { getRootById } from 'cut-tree'
import { useRouteStore } from '@/stores/modules/route'
import { useAppStore } from '@/stores/modules/app'

export default function useMenu() {
  const routeStore = useRouteStore()
  const currentRoute = useRoute()
  const { appConfig } = useAppStore()

  /** 仅子菜单全部填充 */
  function subMenuAll(showSubMenu = true) {
    routeStore.mainMenus = []
    routeStore.subMenus = [...routeStore.menus]
    appConfig.showSubMenu = showSubMenu
  }

  /** 主菜单与子菜单混合。主菜单仅展示一层菜单，子菜单填充为当前主菜单的子级 */
  function mainAndSub() {
    // 将所有菜单的子级删除后填充到主菜单
    const arr = cloneDeep(routeStore.menus)
    arr.forEach(item => item.children = null)
    routeStore.mainMenus = [...arr]

    // 根据当前路由路径查找顶级并将其子级填充到子菜单
    const root = getRootById(routeStore.menus, { id: 'path', children: 'children' }, currentRoute.path)
    if (root?.children)
      routeStore.subMenus = [...root.children]
    else
      routeStore.subMenus = []

    // 初始化主菜单当前激活项
    appConfig.mainMenuActive = root ? root.path : ''
    // 子菜单有数据则显示，否则隐藏
    appConfig.showSubMenu = !!routeStore.subMenus.length
  }

  /** 监听路由变化，如果布局为主菜单子菜单分离模式，执行主菜单与子菜单的填充逻辑 */
  watch(() => currentRoute.path, () => {
    if (appConfig.layoutType !== 'mixture' && appConfig.layoutType !== 'doubleAside')
      return
    mainAndSub()
  })

  function init(type) {
    if (type === 'default')
      subMenuAll()
    else if (type === 'crosswise')
      subMenuAll(false)
    else if (type === 'mixture' || type === 'doubleAside')
      mainAndSub()
  }

  /** 立即监听布局方式， 根据不同布局方式执行菜单的初始化 */
  watch(() => appConfig.layoutType, init, { immediate: true })

  return { subMenuAll, mainAndSub }
}

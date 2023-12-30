export const defaultLanguages = [
  { label: '中文简体', value: 'zh-cn' },
  { label: '中文繁体', value: 'zh-tw' },
  { label: 'English', value: 'en' },
]
export const elementSizes = [
  { label: 'size.default', value: 'default' },
  { label: 'size.large', value: 'large' },
  { label: 'size.small', value: 'small' },
]
export const layoutTypes = [
  { label: '默认', value: 'default' },
  { label: '双侧栏', value: 'doubleAside' },
  { label: '横向上下布局', value: 'crosswise' },
  { label: '混合导航布局', value: 'mixture' },
]

export const tabsTypes = [
  { label: '风格一', value: 'card' },
  { label: '风格二', value: 'border-card' },
  { label: '风格三', value: '' },
]

export const transitionNames = [
  { label: '渐变', value: 'fade' },
  { label: '缩放', value: 'scale' },
  { label: '滑动', value: 'slide' },
]

export const routeSources = [
  { label: '前端', value: 'frontend' },
  { label: '后端', value: 'backend' },
  { label: '混合', value: 'mixture' },
]

export default {
  /**
   * 多语言。'zh-cn' 中文简体
   * 'zh-tw' 中文繁体
   * 'en' 英文
   */
  defaultLanguage: defaultLanguages[0].value,

  /**
   * elementplus组件尺寸。
   * 'default' 默认
   * 'large' 大
   * 'small' 小
   */
  elementSize: elementSizes[0].value,

  /** 布局。
   * 'default' 单侧栏
   * 'doubleAside' 双侧栏
   * 'crosswise' 无侧栏
   * 'mixture' 顶栏主菜单，侧栏子菜单
   */
  layoutType: layoutTypes[0].value,

  // 显示 logo
  showLogo: true,

  // 侧栏折叠
  menuIsCollapse: false,
  // 仅保持一个子菜单的展开
  subMenuUniqueOpened: true,
  // 显示主菜单标题(双侧栏布局有效)
  isMainMenuShowTitle: true,
  // 启用侧栏折叠动画
  enableCollapseTransition: true,

  // 使用多标签页
  isTabs: true,
  // 标签显示图标
  tabsIcon: true,
  /**
   * tabs风格。'card' 风格一
   * 'border-card' 风格二
   * '' 风格三
   */
  tabsType: tabsTypes[0].value,

  // 启用页面切换动画
  isTransition: true,
  /**
   * 页面过渡动画。
   * 'fade' 渐变
   * 'scale' 缩放
   * 'slide' 滑动
   */
  transitionName: transitionNames[0].value,

  // 显示页脚
  showFooter: true,
  // 页脚显示的文本内容,可以使用多语言文本
  footerText: 'Copyright © 2023 XXX 拥有所有版权',

  // 灰色模式
  enableGray: false,
  // 色弱模式
  enableColorWeakness: false,

  /**
   * 路由加载策略
   * 'frontend' 前端加载
   * 'backend' 后端加载
   */
  routeSource: routeSources[0].value,

  // 动态 html 标题
  dynamicTitle: true,

  // 404页面显示位置, true：layout内，false：layout 外
  innerNotFound: true,

  // 固定布局
  layoutFixed: true,

  /**
   * 触发方式。主要使用的地方有 horizontal 模式的菜单，Dropdown 下拉菜单组件。
   * 'hover' 鼠标经过
   * 'click' 鼠标点击
   */
  trigger: 'hover',

  /**
   * 主题。主题文件：/src/assets/styles/common/theme.scss
   * '' 默认
   * 'dark' 暗黑
   * 'sakura' 樱花粉
   * 'sky' 天空蓝
   * 'grassland' 草原绿
   * 'fantasy' 主题-幻想
   */
  theme: '',

  /**
   * 工具栏收缩
   */
  headerToolsOmit: true,
}

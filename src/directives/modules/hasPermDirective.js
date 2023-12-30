import useAuth from '@/hooks/useAuth'

/**
 * 基于权限标识权限指令
 * 使用手册：
 * v-hasPerm:or     值可以为字符串和数组，权限标识码匹配其一就显示组件
 * v-hasPerm:all    值只可以是数组，权限标识码全部包含才显示组件
 * v-hasPerm        v-hasPerm:or 的简写
 */
const hasPermDirective = {
  mounted(el, binding) {
    const { hasPerm, hasPermAll } = useAuth()
    const { value, arg } = binding
    let isShow = false
    if (!arg || arg === 'or')
      isShow = hasPerm(value)

    else if (arg === 'all')
      isShow = hasPermAll(value)

    else
      console.error(`v-hasPerm指令参数'${arg}'错误，v-hasPerm 或 v-hasPerm:or 或 v-hasPerm:all`)

    if (!isShow)
      el.parentNode && el.parentNode.removeChild(el) // 无权限时，从父节点中移除该节点
  },
}
export default { name: 'hasPerm', value: hasPermDirective }

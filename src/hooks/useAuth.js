import { useUserStore } from '@/stores/modules/user'
import { match } from '@/utils/strUtils'

export default function useAuth() {
  const userStore = useUserStore()
  // 用户信息
  const userInfo = userStore.userInfo
  // 是否有 token
  const hasToken = !!userStore.token
  // token 值
  const token = userStore.token

  /**
   * 设置 token 值
   * @param {String} token token 值
   */
  function setToken(token = '') {
    userStore.token = token
  }

  /**
   * 检验当前用户是否有指定角色。
   * 当前用户角色与 val 值匹配其一即为 true
   * @param {String,String[]} val 角色值字符串或数组
   * @returns Boolean
   */
  function hasRole(val) {
    if (!userStore.userInfo || !userStore.userInfo.roles?.length)
      return false
    const { roles } = userStore.userInfo
    if (typeof (val) === 'string') {
      const arr = roles.filter(role => match(val, role) || match(role, val))
      return !!arr?.length
    }
    else if (Array.isArray(val)) {
      const arr = roles.filter(role => !!val.filter(v1 => match(v1, role) || match(role, v1)).length)
      return !!arr?.length
    }
    else {
      console.error('The parameter type is incorrect. A string or Array parameter is required')
      return false
    }
  }

  /**
   * 检验当前用户是否有指定角色。
   * 当前用户角色必须包含val中的所有值才为 true
   * @param {String[]} val 角色值数组
   * @returns Boolean
   */
  function hasRoleAll(val) {
    if (!Array.isArray(val)) {
      console.error('The parameter type is incorrect. The Array type parameter is required')
      return false
    }
    if (!val.length)
      return false
    if (!userStore.userInfo || !userStore.userInfo.roles?.length)
      return false

    const { roles } = userStore.userInfo
    const set = new Set(val) // 去重
    const containsAll = [...set].every(v1 => !!roles.filter(role => match(v1, role) || match(role, v1)).length)
    return containsAll
  }

  /**
   * 检验当前用户是否有指定权限标识码。
   * 当前用户权限标识码与 val 值匹配其一即为 true
   * @param {String,String[]} val 权限标识符字符串或数组
   * @returns Boolean
   */
  function hasPerm(val) {
    if (!userStore.userInfo || !userStore.userInfo.perms?.length)
      return false

    const { perms } = userStore.userInfo
    if (typeof (val) === 'string') {
      return !!perms.filter(pre => match(val, pre) || match(pre, val)).length
    }
    else if (Array.isArray(val)) {
      const arr = perms.filter(per => !!val.filter(v1 => match(v1, per) || match(per, v1)).length)
      return !!arr?.length
    }
    else {
      console.error('The parameter type is incorrect. A string or Array parameter is required')
      return false
    }
  }

  /**
   * 检验当前用户是否有指定权限标识码。
   * 当前用户权限标识码必须包含val中的所有值才为 true
   * @param {String[]} val 权限标识符数组
   * @returns Boolean
   */
  function hasPermAll(val) {
    if (!Array.isArray(val)) {
      console.error('The parameter type is incorrect. The Array type parameter is required')
      return false
    }
    if (!val.length)
      return false
    if (!userStore.userInfo || !userStore.userInfo.perms?.length)
      return false

    const { perms } = userStore.userInfo
    const set = new Set(val) // 去重
    const containsAll = [...set].every(v1 => !!perms.filter(pre => match(v1, pre) || match(pre, v1)).length)
    return containsAll
  }
  return {
    userInfo,
    hasToken,
    token,
    setToken,
    hasRole,
    hasRoleAll,
    hasPerm,
    hasPermAll,
  }
}

/**
 * 初始化代理
 * @param {*} env 环境配置对象
 * @param {*} isDev 是否为开发模式
 * @returns 代理对象
 */
export function initProxy(env, isDev) {
  if (!isDev)
    return {}
  const proxy = {}
  const rawProxy = JSON.parse(env.VITE_DEV_PROXY)
  Object.keys(rawProxy).forEach((key) => {
    proxy[key] = {
      target: rawProxy[key],
      changeOrigin: true,
      rewrite: path => path.substring(key.length),
    }
  })
  return proxy
}

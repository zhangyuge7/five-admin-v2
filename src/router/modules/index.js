// 加入到路由集合中
const modules = import.meta.glob('./**/*.js', { import: 'default', eager: true })
const routeModuleList = []
Object.keys(modules).forEach((key) => {
  const mod = modules[key] || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})
export default routeModuleList

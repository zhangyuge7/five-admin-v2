const directiveDirs = import.meta.glob('./modules/*.js', { import: 'default', eager: true })
export function setupDirectives(app) {
  Object.keys(directiveDirs).forEach((key) => {
    const target = directiveDirs[key]
    app.directive(target.name, target.value)
  })
}

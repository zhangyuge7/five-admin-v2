/**
 * 判断元素是否具有某个class
 */
export function hasClass(el, cls) {
  if (!el || !cls)
    return false
  if (cls.includes(' '))
    throw new Error('className不应该包含空格。')
  if (el.classList)
    return el.classList.contains(cls)

  else
    return (` ${el.className} `).includes(` ${cls} `)
}

/**
 * 给元素追加class
 */

export function addClass(el, cls) {
  if (!el)
    return
  let curClass = el.className
  const classes = (cls || '').split(' ')

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName)
      continue

    if (el.classList)
      el.classList.add(clsName)

    else if (!hasClass(el, clsName))
      curClass += ` ${clsName}`
  }
  if (!el.classList)
    el.className = curClass
}
/**
 * 删除元素的某个class
 */

export function removeClass(el, cls) {
  if (!el || !cls)
    return
  const classes = cls.split(' ')
  let curClass = ` ${el.className} `

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName)
      continue

    if (el.classList)
      el.classList.remove(clsName)

    else if (hasClass(el, clsName))
      curClass = curClass.replace(` ${clsName} `, ' ')
  }
  if (!el.classList)
    el.className = window.trim(curClass)
}
/** 清空元素的class */
export function clearClass(el) {
  if (!el)
    return
  el.classList = []
}

/**
 * 设置css变量的值
 */
export function setCssVal(key, val, el = document.documentElement) {
  if (!key || !val)
    return
  el.style.setProperty(key, val)
}
/**
 * 获取css变量值
 */
export function getCssVal(key, el = document.documentElement) {
  if (!key)
    return
  return getComputedStyle(el).getPropertyValue(key)
}

/**
 * 主题
 */

import { addClass, hasClass, removeClass, setCssVal } from '@/utils/domUtils'

/**
 * 设置全局灰色风格
 */
export function setGray() {
  const el = document.documentElement
  const val = 'gray'
  !hasClass(el, val) && addClass(el, val)
}
/**
 * 取消全局灰色风格
 */
export function cancelGray() {
  const el = document.documentElement
  const val = 'gray'
  hasClass(el, val) && removeClass(el, val)
}
/**
 * 判断是否为全局灰色风格
 * @returns{Boolean}
 */
export function isGray() {
  const el = document.documentElement
  const val = 'gray'
  return hasClass(el, val)
}

/**
 * 设置全局色弱风格
 */
export function setColorWeakness() {
  const el = document.documentElement
  const val = 'webkit'
  !hasClass(el, val) && addClass(el, val)
}
/**
 * 取消全局色弱风格
 */
export function cancelColorWeakness() {
  const el = document.documentElement
  const val = 'webkit'
  hasClass(el, val) && removeClass(el, val)
}
/**
 * 判断是否为全局色弱风格
 * @returns{Boolean}
 */
export function isColorWeakness() {
  const el = document.documentElement
  const val = 'webkit'
  return hasClass(el, val)
}

/**
 * 计算颜色渐变
 * @param {String} startColor 起始颜色
 * @param {Boolean} dark 是否逐渐加深
 * @param {Number} step 步长
 * @returns{String[]} 颜色数组
 */
export function colorGradual(startColor = '#000000', dark = false, step = 10) {
  const startRGB = hexToRGB(startColor)
  const gradientStep = step
  const gradientColors = []

  for (let i = 0; i <= 100; i += gradientStep) {
    const currentRGB = dark ? calculateGradientColorDark(startRGB, i) : calculateGradientColor(startRGB, i)
    const currentColor = rgbToHex(currentRGB)
    gradientColors.push(currentColor)
  }

  return gradientColors

  // 将16进制颜色值转换为RGB值
  function hexToRGB(hex) {
    const r = Number.parseInt(hex.substring(1, 3), 16)
    const g = Number.parseInt(hex.substring(3, 5), 16)
    const b = Number.parseInt(hex.substring(5, 7), 16)
    return [r, g, b]
  }

  // 将RGB值转换为16进制颜色值
  function rgbToHex(rgb) {
    let r = Math.round(rgb[0]).toString(16)
    let g = Math.round(rgb[1]).toString(16)
    let b = Math.round(rgb[2]).toString(16)
    r = r.length === 1 ? `0${r}` : r
    g = g.length === 1 ? `0${g}` : g
    b = b.length === 1 ? `0${b}` : b
    return `#${r}${g}${b}`
  }

  // 计算渐变色
  function calculateGradientColor(startRGB, percentage) {
    const endRGB = [255, 255, 255] // 结束颜色为白色
    const currentRGB = []
    for (let i = 0; i < startRGB.length; i++) {
      const difference = endRGB[i] - startRGB[i]
      currentRGB.push(startRGB[i] + Math.round((difference / 100) * percentage))
    }
    return currentRGB
  }

  // 计算渐变色
  function calculateGradientColorDark(startRGB, percentage) {
    const endRGB = [0, 0, 0] // 结束颜色为黑色
    const currentRGB = []
    for (let i = 0; i < startRGB.length; i++) {
      const difference = endRGB[i] - startRGB[i]
      currentRGB.push(startRGB[i] + Math.round((difference / 100) * percentage))
    }
    return currentRGB
  }
}

/**
 * 设置PrimaryColor，会计算生成深、浅色系
 * @param {String} theme primary | warining | danger | error | info
 * @param {String} colorVal 颜色值,如#000000
 * @param {Element} el 元素对象
 */
export function setThemeColor(theme, colorVal, el = document.documentElement) {
  const colors = colorGradual(colorVal)
  colors.forEach((item, i) => {
    if (i !== 0)
      setCssVal(`--el-color-${theme}-light-${i}`, item, el)
    else
      setCssVal(`--el-color-${theme}`, item, el)
  })
  const darkColors = colorGradual(colorVal, true)
  setCssVal(`--el-color-${theme}-dark-2`, darkColors[2], el)
}

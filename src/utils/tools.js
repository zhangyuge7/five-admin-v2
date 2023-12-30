/**
 * 工具箱
 */

import mittBus from '@/utils/mitt'

// 复制文本
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  }
  catch (e) {
    return false
  }
}

// 刷新页面
export function refreshPage() {
  mittBus.emit('onReloadPage')
}

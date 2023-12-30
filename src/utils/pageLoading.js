/**
 * 页面加载
 */
import { ElLoading } from 'element-plus'

export default function usePageLoading() {
  let loadingInstance
  let timer
  function close() {
    loadingInstance && loadingInstance.close()
    timer && clearTimeout(timer)
  }
  function start(delay = 500) {
    close()
    timer = setTimeout(() => {
      loadingInstance = ElLoading.service({
        target: '.fv-layout-main',
        text: 'Loading...',
      })
    }, delay)
  }
  function end(delay = 200) {
    setTimeout(() => close(), delay)
  }
  return { start, end }
}

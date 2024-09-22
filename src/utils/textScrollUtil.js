/**
 * 组件描述：滚动文字组件工具类
 * 特别感谢：vue-amazing-ui
 * https://themusecatcher.github.io/vue-amazing-ui/guide/components/textscroll.html
 * 源码来自vue-amazing-ui， 改动：TS -> JS
 */

/**
 * 组合式函数
 * 使用 ResizeObserver 观察 DOM 元素尺寸变化
 *
 * 该函数提供了一种方便的方式来观察一个或多个元素的尺寸变化，并在变化时执行指定的回调函数。
 *
 * @param target 要观察的目标，可以是 Ref 对象、Ref 数组、HTMLElement 或 HTMLElement 数组
 * @param callback 当元素尺寸变化时调用的回调函数
 * @param options ResizeObserver 选项，用于定制观察行为
 * @returns 返回一个对象，包含停止和开始观察的方法，使用者可以调用 start 方法开始观察，调用 stop 方法停止观察
 */
import { computed, onBeforeUnmount, ref, toValue, watch } from 'vue'

export function useResizeObserver(target, callback, options = {}) {
  let observer
  const stopObservation = ref(false)
  const targets = computed(() => {
    const targetsValue = toValue(target)
    if (targetsValue) {
      if (Array.isArray(targetsValue))
        return targetsValue.map(el => toValue(el)).filter(el => el)
      else
        return [targetsValue]
    }
    return []
  })
  // 定义清理函数，用于断开 ResizeObserver 的连接
  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = undefined
    }
  }
  // 初始化 ResizeObserver，开始观察目标元素
  const observeElements = () => {
    if (targets.value.length && !stopObservation.value) {
      observer = new ResizeObserver(callback)
      targets.value.forEach(element => observer.observe(element, options))
    }
  }
  // 监听 targets 的变化，当 targets 变化时，重新建立 ResizeObserver 观察
  watch(
    () => targets.value,
    () => {
      cleanup()
      observeElements()
    },
    {
      immediate: true, // 立即触发回调，以便初始状态也被观察
      flush: 'post',
    },
  )
  const stop = () => {
    stopObservation.value = true
    cleanup()
  }
  const start = () => {
    stopObservation.value = false
    observeElements()
  }
  // 在组件卸载前清理 ResizeObserver
  onBeforeUnmount(() => cleanup())
  return {
    stop,
    start,
  }
}

/**
 * 使用requestAnimationFrame实现的延迟setTimeout或间隔setInterval调用函数。
 *
 * @param fn 要执行的函数。
 * @param delay 延迟的时间，单位为ms，默认为0，表示不延迟立即执行。
 * @param interval 是否间隔执行，如果为true，则在首次执行后，以delay为间隔持续执行。
 * @returns 返回一个对象，包含一个id属性，该id为requestAnimationFrame的调用ID，可用于取消动画帧。
 */
export function rafTimeout(fn, delay = 0, interval = false) {
  const raf = {
    id: requestAnimationFrame(timeElapse),
  }
  let start = null // 记录动画开始的时间戳
  function timeElapse(timestamp) {
    // 创建一个对象用于存储动画帧的ID，并初始化动画帧

    // 定义动画帧回调函数
    /*
        timestamp参数：与performance.now()的返回值相同，它表示requestAnimationFrame()开始去执行回调函数的时刻
      */
    if (!start) {
      // 如果还没有开始时间，则以当前时间为开始时间
      start = timestamp
    }
    const elapsed = timestamp - start
    if (elapsed >= delay) {
      try {
        fn() // 执行目标函数
      }
      catch (error) {
        console.error('Error executing rafTimeout function:', error)
      }
      if (interval) {
        // 如果需要间隔执行，则重置开始时间并继续安排下一次动画帧
        start = timestamp
        raf.id = requestAnimationFrame(timeElapse)
      }
    }
    else {
      raf.id = requestAnimationFrame(timeElapse)
    }
  }
  return raf
}
/**
   * 用于取消 rafTimeout 函数
   *
   * @param raf - 包含请求动画帧ID的对象。该ID是由requestAnimationFrame返回的。
   *              该函数旨在取消之前通过requestAnimationFrame请求的动画帧。
   *              如果传入的raf对象或其id无效，则会打印警告。
   */
export function cancelRaf(raf) {
  if (raf && raf.id && typeof raf.id === 'number')
    cancelAnimationFrame(raf.id)
  else
    console.warn('cancelRaf received an invalid id:', raf)
}

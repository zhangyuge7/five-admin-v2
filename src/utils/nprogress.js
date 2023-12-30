/**
 * 进度条
 */
import NProgress from 'nprogress'

NProgress.configure({
  minimum: 0.2, // 启动时最小百分比，默认0.08
  speed: 200, // 值越大，进度条动画越丝滑，默认200
  easing: 'ease', // 动画效果，默认'ease'。linear | ease-in | ease-out | ease-in-out
  trickle: true, // 进度条自动递增，默认true
  trickleRate: 0.02, // 每次递增多少
  trickleSpeed: 200, // 递增频率,值越小越快
  showSpinner: false, // 是否显示旋转加载器，默认true
  parent: 'body', // 指定父容器，默认body,如：#container
})
export const FiveNProgress = {
  start() {
    NProgress.start()
  },
  done() {
    NProgress.done()
  },
}

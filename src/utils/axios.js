import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { FiveNProgress } from '@/utils/nprogress'
import { useUserStore } from '@/stores/modules/user'
import { t } from '@/i18n'

import useAuth from '@/hooks/useAuth'

// 请求超时
const timeout = import.meta.env.VITE_API_TIMEOUT
// 创建 axios 实例
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: timeout ? Number.parseInt(timeout) : 0,
})

// 定义成功响应码
export const successCode = 0
// 响应结果映射
export const resultProp = {
  data: 'data',
  code: 'code',
  message: 'message',
  ok: 'ok',
}
// 响应后消息提示类型
export const msgType = {
  none: 'none', // 无提示
  msg: 'msg', // 消息提示
  box: 'box', // 弹框提示
}

// 请求拦截器
axiosInstance.interceptors.request.use((config) => {
  const { token } = useAuth()
  FiveNProgress.start() // 请求进度条开始
  // 请求头携带token
  config.headers.Authorization = token
  // 添加时间戳参数
  config.url = `${config.url}?_t=${new Date().getTime()}`

  return config
}, (error) => {
  FiveNProgress.done() // 请求进度条结束
  return Promise.reject(error)
})

// 响应拦截器
axiosInstance.interceptors.response.use((res) => {
  const userStore = useUserStore()
  const { data, config } = res
  // 获取请求时配置的成功消息提示类型与错误消息提示类型
  const { errorMsgType, successMsgType } = config
  const code = data[resultProp.code]
  // 业务异常响应时
  if (code !== successCode) {
    errorMessage(data[resultProp.message] || t('http.error'), errorMsgType)
    switch (code) {
      case 401:
        userStore.logout(true)
        break
    }
  }
  // 正常响应时
  else {
    successMessage(data[resultProp.message] || t('http.success'), successMsgType)
  }
  FiveNProgress.done() // 请求进度条结束
  return data
}, (err) => {
  if (!err.response) {
    ElMessage.error(err.message)
    FiveNProgress.done()
    return Promise.reject(err)
  }

  const userStore = useUserStore()
  const { status, statusText, data } = err.response
  let message = data[resultProp.message]
  switch (status) {
    case 401:
      message = message || t('http.error401')
      userStore.logout(true)
      break
    case 403:
      message = message || t('http.error403')
      break
    case 500:
      message = message || t('http.error500')
      break
    case 404:
      message = message || t('http.error404')
      break
    default:
      message = message || statusText
  }
  ElMessage.error(message)
  FiveNProgress.done()
  return Promise.reject(err)
})

// 错误消息处理
function errorMessage(message, messageType) {
  if (!messageType || !Object.keys(msgType).includes(messageType) || messageType === msgType.msg) {
    ElMessage.error(message)
  }
  else if (messageType === msgType.box) {
    ElMessageBox.confirm(
      message,
      t('messageBox.hint'),
      {
        showCancelButton: false,
        confirmButtonText: t('messageBox.iKnow'),
        type: 'error',
        showClose: false,
        lockScroll: false,
      },
    )
  }
}

// 成功消息处理
function successMessage(message, messageType) {
  if (messageType && messageType === msgType.msg) {
    ElMessage.success(message)
  }
  else if (messageType && messageType === msgType.box) {
    ElMessageBox.confirm(
      message,
      t('messageBox.hint'),
      {
        showCancelButton: false,
        confirmButtonText: t('messageBox.close'),
        type: 'success',
        showClose: false,
        lockScroll: false,
      },
    )
  }
}

export default axiosInstance

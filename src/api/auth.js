import axios, { msgType } from '@/utils/axios'

// 登录
export function loginApi(data) {
  return axios.post('/auth/login', data, { errorMsgType: msgType.box })
}
// 用户信息
export function userInfoApi() {
  return axios.get('/auth/userInfo')
}
// 菜单/路由
export function menuListApi() {
  return axios.get('/auth/menuList')
}
// 登出
export function logoutApi() {
  return axios.post('/auth/logout', {})
}

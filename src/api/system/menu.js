import axios from '@/utils/axios'

// 查询菜单
export function menuTreeApi() {
  return axios.get('/system/menu')
}

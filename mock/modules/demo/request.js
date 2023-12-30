import { baseApi } from '../../index'

export default [
  {
    url: `${baseApi}/demo/successRequest`,
    method: 'get',
    response: () => {
      return {
        code: 0,
        msg: '',
        data: '成功请求测试',
        ok: true,
      }
    },
  },
  {
    url: `${baseApi}/demo/errorRequest`,
    method: 'get',
    response: () => {
      return {
        code: -1,
        msg: '',
        data: '失败请求测试',
        ok: false,
      }
    },
  },
  {
    url: `${baseApi}/demo/request500`,
    method: 'get',
    statusCode: 500,
    response: () => {
      return {}
    },
  },
  {
    url: `${baseApi}/demo/postRequest`,
    method: 'post',
    response: () => {
      return {
        code: 0,
        msg: '',
        data: 'post请求测试',
        ok: true,
      }
    },
  },
]

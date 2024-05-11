import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'

import { ElNotification } from 'element-plus'
import { useRouteStore } from './route'
import router from '@/router'
import { loginApi, logoutApi } from '@/api/auth'
import { t } from '@/i18n'

const PREFIX = import.meta.env.VITE_APP_STORAGE_PREFIX

export const useUserStore = defineStore('user', () => {
  const token = ref()
  const userInfo = shallowRef()

  // 登录
  async function login(form, replacePath = '/') {
    const { data, ok } = await loginApi(form)
    if (!ok)
      return
    token.value = data.token
    await router.replace(replacePath)
    ElNotification({
      title: t('app.loginSuccess'),
      message: `${t('app.welcome')} ${data?.nickName || ''}`,
      type: 'success',
    })
  }
  // 登出
  async function logout(skip = false) {
    try {
      !skip && await logoutApi()
    }
    finally {
      const routeStore = useRouteStore()
      token.value = ''
      userInfo.value = null
      await router.replace(`/login?replace=${router.currentRoute.value.path}`)
      routeStore.$reset()
    }
  }

  return { token, userInfo, login, logout }
}, {
  persist: {
    key: `${PREFIX}USER`,
    paths: ['token'],
    storage: localStorage,
  },
})

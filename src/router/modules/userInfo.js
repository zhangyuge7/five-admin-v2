export default {
  path: '/user-info',
  name: 'UserInfo',
  meta: {
    title: 'menus.personalCenter',
    icon: 'ep:user',
  },
  component: () => import('@/views/user-info/index.vue'),
}

export default {
  path: '/dev-tools',
  name: 'DevTools',
  meta: {
    title: '开发工具',
    isHide: false,
    icon: 'mdi:ev-plug-chademo',
    sortNo: 12,
  },
  redirect: '/dev-tools/theme-color-generate',
  children: [
    {
      path: '/dev-tools/theme-color-generate',
      name: 'ThemeColorGenerate',
      meta: {
        title: '生成主题色',
        icon: 'ic:twotone-radio-button-unchecked',
      },
      component: () => import('@/views/devTools/ThemeColorGenerate.vue'),
    },
  ],
}

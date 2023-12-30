export default {
  path: '/home',
  name: 'Home',
  component: () => import('@/views/home/index.vue'),
  meta: {
    title: 'menus.home',
    isHide: false,
    icon: 'PhHouse',
    fixedTab: true,
    sortNo: 1,
  },
}

export default {
  path: '/dashboard',
  name: 'Dashboard',
  redirect: '/dashboard/analysis',
  meta: {
    title: 'menus.dashboard',
    isHide: false,
    icon: 'ant-design:dashboard-outlined',
    sortNo: 2,
  },
  children: [
    {
      path: '/dashboard/analysis',
      name: 'Analysis',
      meta: {
        title: 'menus.analysis',
        isHide: false,
        icon: 'ep:data-analysis',
      },
      component: () => import('@/views/dashboard/analysis/index.vue'),
    },
    {
      path: '/dashboard/workbench',
      name: 'Workbench',
      meta: {
        title: 'menus.workbench',
        isHide: false,
        icon: 'icon-park-outline:workbench',
      },
      component: () => import('@/views/dashboard/workbench/index.vue'),
    },
  ],
}

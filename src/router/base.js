import Layout from '@/layout/index.vue'

const notFound = {
  path: '/:path(.*)*',
  name: 'NotFound',
  component: () => import('@/views/error-page/NotFound.vue'),
}
const rootRoute = {
  path: '/',
  name: 'Root',
  meta: {
    title: '',
    icon: 'PhHouse',
  },
  component: Layout,
  redirect: import.meta.env.VITE_APP_HOME_PATH,
}
// 基础路由
const baseRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
  },
  notFound,
]

export default baseRoutes
export { notFound, rootRoute }

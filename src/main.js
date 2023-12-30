import './assets/styles/tailwind/index.css'
import './assets/styles/index.scss'
import 'virtual:svg-icons-register'
import 'default-passive-events'
import 'nprogress/nprogress.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'

import { setupProdMockServer } from '../mock/createProductionServer'
import { setupRouter } from './router'
import { setupStore } from './stores'
import { setupI18n } from './i18n'
import App from './App.vue'
import { setupDirectives } from '@/directives'
import Banner from '@/utils/banner'

// 使用 mock 模拟接口，如果确定不再使用请将这行代码和引入一并删除
import.meta.env.VITE_USE_MOCK === 'true' && setupProdMockServer()

const app = createApp(App) // 创建 vue 应用
window.vm = app // 将 app 挂载到全局方便调用
app.use(ElementPlus) // element-plus 组件库
setupStore(app) // pinia 仓库
setupI18n(app) // 国际化多语言
setupRouter(app) // 路由器
setupDirectives(app) // 自定义指定
app.mount('#app') // 挂载页面
Banner.print() // 控制台 banner 输出

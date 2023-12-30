import { URL, fileURLToPath } from 'node:url'

const alias = {
  '@': fileURLToPath(new URL('../src', import.meta.url)),
  'vue-i18n': 'vue-i18n/dist/vue-i18n.esm-bundler.js', // 修改后
}
export default alias

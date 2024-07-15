import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import alias from './vite/alias'
import setupVitePlugins from './vite/plugins'
import { initProxy } from './vite/proxy'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: env.VITE_APP_BASE_PATH,
    plugins: setupVitePlugins(env, command === 'build'),
    resolve: {
      alias,
    },
    build: {
      chunkSizeWarningLimit: 2500,
      // 非大型项目，不建议分包
      // rollupOptions: {
      //   output: {
      //     manualChunks(id) {
      //       if (id.includes('node_modules'))
      //         return id.toString().split('node_modules/.pnpm/')[1].split('/')[0].toString()
      //     },
      //   },
      // },
    },
    server: {
      open: false,
      host: true,
      port: env.VITE_APP_PORT,
      proxy: initProxy(env, mode === 'development'),
    },
    preview: {
      open: false,
      host: true,
      port: env.VITE_APP_PORT,
      proxy: initProxy(env, true),
    },
  }
})

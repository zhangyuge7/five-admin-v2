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
    server: {
      open: false,
      host: true,
      port: env.VITE_APP_PORT,
      proxy: initProxy(env, mode === 'development'),
    },
  }
})

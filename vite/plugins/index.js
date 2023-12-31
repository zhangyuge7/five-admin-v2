import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import setupSvgIcon from './svg-icon'

export default function setupVitePlugins(env, isBuild) {
  const plugins = [vue(), vueJsx()]
  plugins.push(setupSvgIcon(isBuild))
  return plugins
}

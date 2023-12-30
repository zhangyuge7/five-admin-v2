import path from 'node:path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

/** 本地svg-icon插件 */
export default function setupSvgIcon(isBuild) {
  return createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
    symbolId: 'icon-[dir]-[name]',
    svgoOptions: isBuild,
  })
}

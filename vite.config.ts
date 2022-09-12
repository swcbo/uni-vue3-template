import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import tailwindcss from 'tailwindcss'
import config from './tailwind.config'
import autoprefixer from 'autoprefixer'
import postcssClassRename from 'postcss-class-rename'
import cssByebye from 'css-byebye'
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        tailwindcss(config as any),
        autoprefixer({
          remove: process.env.UNI_PLATFORM !== 'h5',
        }),
        ...(process.env.UNI_PLATFORM !== 'h5'
          ? [
              // 使用postcss-class-name 包将小程序不支持的类名转换为支持的类名
              postcssClassRename({
                '\\\\:': '--',
                '\\\\/': '_',
              }),
              cssByebye({
                rulesToRemove: [/\*/],
                map: false,
              }),
            ]
          : []),
      ],
    },
  },
  plugins: [uni()],
})

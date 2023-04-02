import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import uniTwuCssPlugin from '@uni-helper/vite-plugin-uni-tailwind'
export default defineConfig({
  plugins: [uni(), uniTwuCssPlugin()],
  css: {
    postcss: {
      plugins: [require('tailwindcss')()],
    },
  },
})

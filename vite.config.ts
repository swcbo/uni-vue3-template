import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import Unocss from 'unocss/vite'

export default defineConfig({
  plugins: [uni(), Unocss()]
})

import App from './App.vue'
import '@/style/tailwind.css'
import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'

// @ts-ignore
import uviewPlus from 'uview-plus'
const createApp = () => {
  const app = createSSRApp(App)
  app.use(uviewPlus)
  app.use(createPinia())
  return {
    app,
  }
}

export default createApp

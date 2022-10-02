import '@/style/tailwind.css'
import { createPinia } from 'pinia'
import { createSSRApp } from 'vue'
import App from './App.vue'
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

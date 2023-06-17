import 'uno.css'
import { createSSRApp } from 'vue'
import uviewPlus from 'uview-plus'
import App from './App.vue'
import store from './store'

export function createApp() {
  const app = createSSRApp(App).use(uviewPlus).use(store)
  return {
    app
  }
}

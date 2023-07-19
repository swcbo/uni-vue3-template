/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface Window {
  wx: {
    config: (config: unknown) => void
    checkJsApi: (config: unknown) => void
    ready: (config: unknown) => void
    updateAppMessageShareData: (config: unknown) => void
    updateTimelineShareData: (config: unknown) => void
  }
}
interface Uni {
  $u: {
    setConfig: (params: { config: { unit: string } }) => void
    
  }
}


declare module 'uview-plus'{
  const uviewPlus: any
  export default uviewPlus
}
/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
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

import { defineStore } from 'pinia'
import { isH5 } from './../utils/platform'

interface IScreenStore {
  statusBarHeight: number
  topHeight: string
  screenInfo?: UniApp.GetSystemInfoResult
}
interface IScreenStoreAction {
  getStatusInfo: () => void
}
export const useScreenStore = defineStore<
  string,
  IScreenStore,
  {},
  IScreenStoreAction
>({
  id: 'screen',
  state: () => ({
    statusBarHeight: 0,
    topHeight: isH5 ? '44px' : '0px',
    screenInfo: undefined
  }),
  actions: {
    getStatusInfo() {
      const info = uni.getSystemInfoSync()
      const { statusBarHeight = 20, safeArea } = info
      this.screenInfo = info
      this.statusBarHeight = statusBarHeight
      this.topHeight = `${safeArea?.top}px`
    }
  }
})

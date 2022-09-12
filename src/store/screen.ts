import { isH5 } from './../utils/platform'
import { defineStore } from 'pinia'

export const useScreenStore = defineStore({
  id: 'screen',
  state: () => ({ statusBarHeight: 20, topHeight: isH5 ? '44px' : '0px' }),
  actions: {
    getStatusInfo() {
      const {
        statusBarHeight = 20,
        safeAreaInsets,
        safeArea,
        ...other
      } = uni.getSystemInfoSync()
      this.statusBarHeight = statusBarHeight || 20
      this.topHeight = safeArea?.top + 'px'
    },
  },
})

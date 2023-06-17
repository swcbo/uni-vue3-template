import { defineStore } from 'pinia'
import { setUserId } from '@/utils/auth'

const defaultInfo = {
  avatar_url: '',
  name: '',
  phone: '',
  id: 0
}
export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    userInfo: defaultInfo
  }),
  actions: {
    setUserInfo(payload = defaultInfo) {
      setUserId(`${payload.id}`)
      this.userInfo = payload
    }
  }
})

/*
 * @Author: swcbo
 * @Date: 2022-02-19 19:05:50
 * @LastEditors: swcbo
 * @LastEditTime: 2022-09-12 11:33:58
 * @FilePath: /uni-vue3-template/src/utils/auth.ts
 * @Description:
 */

export const setAuth = (auth: string) => {
  uni.setStorageSync('auth', auth)
}
export const setUserId = (auth: string) => {
  uni.setStorageSync('userId', auth)
}
export const getUserId = () => {
  let auth = uni.getStorageSync('userId')
  return auth ? auth : ''
}

export const getAuth = () => {
  let auth = uni.getStorageSync('auth')
  return auth ? auth : ''
}
export const getLogin = () => {
  if (!getAuth()) {
    uni.showModal({
      title: '提示',
      content: '登录才能正常使用当前功能',
      success({ confirm }) {
        if (confirm)
          uni.reLaunch({
            url: '/pages/mine/index',
          })
      },
    })
    return false
  }
  return true
}

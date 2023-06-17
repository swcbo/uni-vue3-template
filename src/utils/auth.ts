/*
 * @Author: swcbo
 * @Date: 2022-02-19 19:05:50
 * @LastEditors: swcbo
 * @LastEditTime: 2022-09-12 16:20:53
 * @FilePath: /uni-vue3-template/src/utils/auth.ts
 * @Description:
 */

import { getSearch } from '.'
import { wxConfig, wxLogin } from '@/api/user'
import { SHARE_CONFIG } from '@/constant'

export function setAuth(auth: string) {
  uni.setStorageSync('auth', auth)
}
export function setUserId(auth: string) {
  uni.setStorageSync('userId', auth)
}
export function getUserId() {
  const auth = uni.getStorageSync('userId')
  return auth || ''
}

export function getAuth() {
  const auth = uni.getStorageSync('auth')
  return auth || ''
}

/** 微信登录 */
export function wxCodeLogin() {
  return new Promise((resolve, reject) => {
    // #ifdef MP-WEIXIN
    uni.login({
      success: async ({ code }) => {
        try {
          const data = await wxLogin(code)
          resolve(data)
        } catch (e) {
          reject(e)
        }
      },
      fail: reject
    })
    // #endif
    wxGetUrlCode()
      .then((v) => {
        resolve(v)
      })
      .catch(reject)
  })
}

/** 微信公众号登录 */
export async function wxGetUrlCode() {
  // #ifdef H5
  const code = getSearch('code')
  if (code) {
    return await wxLogin(code)
  } else {
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
      import.meta.env.VITE_APP_ID
    }&redirect_uri=${
      window.location.href
    }&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
  }
  // #endif
}

/** 微信公众号配置 */
export async function doWxConfig() {
  const data = await wxConfig()
  window.wx.config({
    ...data,
    jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
  })
  window.wx.ready(() => {
    window.wx.updateAppMessageShareData(SHARE_CONFIG)
    window.wx.updateTimelineShareData(SHARE_CONFIG)
  })
}

export function getLogin() {
  if (!getAuth()) {
    // #ifdef MP-WEIXIN
    uni.showModal({
      title: '提示',
      content: '登录才能正常使用当前功能',
      success({ confirm }) {
        if (confirm)
          uni.reLaunch({
            url: '/pages/mine/index'
          })
      }
    })
    // #endif
    wxGetUrlCode()
    return false
  }
  return true
}

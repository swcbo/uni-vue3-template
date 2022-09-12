import { getAuth, getLogin, setAuth } from '@/utils/auth'
import { showToast } from '@/utils/toast'
export const post = <T>(url: string, data = {}) =>
  BaseRequest<T>('POST', url, data)
export const get = <T>(url: string, data = {}) =>
  BaseRequest<T>('GET', url, data)
export const put = <T>(url: string, data = {}) =>
  BaseRequest<T>('PUT', url, data)
let count = 0
export const BaseRequest = <T>(
  method:
    | 'OPTIONS'
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'TRACE'
    | 'CONNECT',
  url: string,
  data?: object | ArrayBuffer,
) => {
  if (!count) {
    uni.showLoading({ title: '加载中...', mask: true })
  }
  count += 1

  let header: any = {
    'Content-type': 'application/json;charset=utf-8',
    Authorization: `Bearer ${getAuth()}`,
  }
  let realUrl = `${import.meta.env.VITE_HOST}${url}`
  return new Promise<T>((resolve, reject) => {
    uni.request({
      url: realUrl,
      data,
      method,
      header,
      success: (response: any) => {
        const {
          data: { status, statusCode, content = {}, message },
        } = response
        count -= 1
        if (!count) {
          uni.hideLoading()
          uni.stopPullDownRefresh()
        }
        if (status) {
          resolve(content)
        } else {
          if (statusCode === 401) {
            setAuth('')
            getLogin()
          } else {
            showToast(message || '服务异常')
          }
          reject(message)
        }
      },
      fail: (error) => {
        count -= 1
        if (!count) {
          uni.hideLoading()
          uni.stopPullDownRefresh()
        }
        showToast('服务异常')
        reject(error)
      },
    })
  })
}

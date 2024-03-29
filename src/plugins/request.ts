import { getAuth, getLogin, setAuth } from '@/utils/auth'
import { isH5 } from '@/utils/platform'
import { showToast } from '@/utils/toast'

export function post<T>(url: string, data = {}) {
  return BaseRequest<T>('POST', url, data)
}
export function get<T>(url: string, data = {}) {
  return BaseRequest<T>('GET', url, data)
}
export function put<T>(url: string, data = {}) {
  return BaseRequest<T>('PUT', url, data)
}
export function del<T>(url: string, data = {}) {
  return BaseRequest<T>('DELETE', url, data)
}
let count = 0
export function BaseRequest<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: object | ArrayBuffer
) {
  if (!count) {
    uni.showLoading({ title: '加载中...', mask: true })
  }
  count += 1

  const header: any = {
    'Content-type': 'application/json;charset=utf-8',
    Authorization: `Bearer ${getAuth()}`
  }
  const realUrl = `${isH5 ? '' : import.meta.env.VITE_HOST}${url}`
  return new Promise<T>((resolve, reject) => {
    uni.request({
      url: realUrl,
      data,
      method,
      header,
      success: (response: any) => {
        const {
          data: { status, statusCode, content = {}, message }
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
      }
    })
  })
}

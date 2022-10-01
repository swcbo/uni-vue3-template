/** 微信分享内容 */
export const SHARE_CONFIG = {
  title: '', // 分享标题
  desc: '', // 分享描述
  link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  imgUrl: '', // 分享图标
}

export const NAV_CONFIG = {
  bgColor: '#fff',
  border: false,
  height: 44,
}
export type TPageStatus = keyof typeof PAGE_STATUS | undefined
export const PAGE_STATUS: {
  [key in 'error' | 'loading' | 'networkError']: {
    restart?: boolean
    tip: string
    image?: string
  }
} = {
  error: {
    tip: '请求异常',
    restart: true,
    image: 'wifi.png',
  },
  loading: {
    tip: '加载中...',
  },
  networkError: {
    tip: '网络异常',
    restart: true,
    image: 'wifi.png',
  },
}

import { isH5 } from './platform'
export const getSearch = (code: string) => {
  const reg = new RegExp('(^|&)' + code + '=([^&]*)(&|$)')
  const r = location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  } else {
    return null
  }
}

export const hiddenNav = () => import.meta.env.VITE_WEB_HIDDEN_NAV && isH5

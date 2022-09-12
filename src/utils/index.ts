export const getSearch = (code: string) => {
  const reg = new RegExp('(^|&)' + code + '=([^&]*)(&|$)')
  const r = location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  } else {
    return null
  }
}

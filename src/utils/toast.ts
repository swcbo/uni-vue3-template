export const realToast = (title = '', fun: () => void) => {
  uni.showToast({
    title,
    duration: 1500,
    mask: true,
  })
  const timer = setTimeout(() => {
    clearTimeout(timer)
    fun()
  }, 1500)
}

/** toast */
export const showToast = (msg: string) => {
  uni.showToast({
    title: msg,
    icon: 'none',
  })
}

import { onPullDownRefresh } from '@dcloudio/uni-app'

/**
 * @description:
 * @param {function} onRefresh // 下拉刷新回调
 * @return {void}
 */
export default (onRefresh: () => Promise<void>) => {
  onPullDownRefresh(async () => {
    await onRefresh()
    uni.stopPullDownRefresh()
  })
}

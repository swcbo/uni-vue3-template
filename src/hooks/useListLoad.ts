import { getAuth } from './../utils/auth'
import { onReachBottom } from '@dcloudio/uni-app'
import { reactive, watch } from 'vue'
import usePullDown from './usePullDown'
export type TPaginationFun<T> = (data: {
  page: number
  pageSize: number
  [key: string]: unknown
}) => Promise<T[]>

export type TPagination<T> = {
  pageNum: number
  list: T[]
  pageSize: number
  hasMore: boolean
  status: 'more' | 'loading' | 'noMore'
  loading: boolean
}
export type TPaginationConfig = {
  pageSize?: number
  params?: any
  noPage?: boolean
  immediate?: boolean
}
export default <T extends (...args: any) => any = (...args: any) => any>(
  fun: TPaginationFun<ReturnType<T>>,
  config: TPaginationConfig = {
    pageSize: 10,
    params: {},
    noPage: false,
    immediate: true,
  },
) => {
  const { pageSize = 10, params = {}, noPage = false } = config
  const pagination = reactive<TPagination<ReturnType<T>>>({
    pageNum: 1,
    list: [],
    pageSize,
    hasMore: false,
    status: 'noMore',
    loading: false,
  })
  const refreshData = async () => {
    pagination.pageNum = 1
    await getData()
  }
  const getData = async () => {
    // 如果没有登录，则不请求数据
    if (!getAuth() || pagination.loading) {
      return
    }
    pagination.loading = true
    try {
      const list = await fun({
        pageNum: pagination.pageNum,
        pageSize: pagination.pageSize,
        ...params,
      })
      pagination.hasMore = list.length === pageSize
      pagination.list = (
        pagination.pageNum === 1 ? list : [...(pagination.list as T[]), ...list]
      ) as ReturnType<T>
      pagination.status = pagination.hasMore ? 'more' : 'noMore'
    } catch (error) {
      pagination.hasMore = false
      pagination.list = []
      pagination.status = 'noMore'
    }
    pagination.loading = false
  }
  const loadMore = async () => {
    if (pagination.hasMore) {
      pagination.pageNum++
      pagination.status = 'loading'
      await getData()
    }
  }
  usePullDown(async () => {
    await refreshData()
  })
  onReachBottom(async () => {
    if (pagination.hasMore && !noPage) {
      pagination.pageNum++
      pagination.status = 'loading'
      await getData()
    }
  })

  watch(
    () => params,
    refreshData,
    //深度监听
    { deep: true, immediate: config.immediate },
  )
  return {
    pagination,
    loadMore,
    getData,
    refreshData,
    onReachBottom,
  }
}

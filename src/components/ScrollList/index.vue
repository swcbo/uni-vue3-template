<!--
 * @Author: swcbo
 * @Date: 2022-03-05 14:48:41
 * @LastEditors: swcbo
 * @LastEditTime: 2022-09-12 17:02:57
 * @FilePath: /uni-vue3-template/src/components/ScrollList/index.vue
 * @Description: 滚动列表
-->
<template>
  <scroll-view
    scroll-y="true"
    refresher-enabled
    @refresherrefresh="onPull"
    @scrolltolower="lower"
    :refresher-triggered="triggered"
    :refresher-default-style="gray ? 'black' : 'white'"
    :style="{
      height: `calc(100vh - ${top})`,
    }"
    :class="class"
    class="my-scroll-view"
  >
    <slot :list="pagination.list"></slot>

    <uni-load-more
      :status="pagination.status"
      v-show="pagination.list.length > 0"
    />
    <Empty
      v-if="pagination.list.length === 0 && !pagination.loading && showEmpty"
    />
  </scroll-view>
</template>
<script setup lang="ts">
import useListLoad from '@/hooks/useListLoad'
import Empty from '@/layout/Empty/index.vue'
import { PropType, ref, watch } from 'vue'
const emits = defineEmits(['change'])
const triggered = ref(false)
const props = defineProps({
  params: {
    type: Object,
    default: () => {},
  },
  searchFun: {
    type: Object as PropType<(...args: any) => Promise<unknown[]>>,
    required: true,
  },
  class: {
    type: String,
    default: '',
  },
  gray: {
    type: Boolean,
    default: false,
  },
  immediate: {
    type: Boolean,
    default: true,
  },
  showEmpty: {
    type: Boolean,
    default: true,
  },
  top: {
    type: String,
    default: '0px',
  },
})

const { pagination, refreshData, loadMore } = useListLoad(props.searchFun, {
  params: props.params,
  noPage: true,
  immediate: props.immediate,
})
watch(
  () => pagination.list,
  () => {
    emits('change', pagination.list)
  },
)
const onPull = async () => {
  triggered.value = true
  await refreshData()
  triggered.value = false
}
const lower = () => {
  loadMore()
}
defineExpose({
  refreshData,
})
</script>

<!--
 * @Author: swcbo
 * @Date: 2022-03-05 14:48:41
 * @LastEditors: swcbo
 * @LastEditTime: 2022-10-01 15:50:49
 * @FilePath: /uni-vue3-template/src/components/ScrollList/index.vue
 * @Description: 滚动列表
-->
<script setup lang="ts">
import type { PropType } from 'vue'
import { ref, watch } from 'vue'
import type { TPaginationFun } from '@/hooks/useListLoad'
import useListLoad from '@/hooks/useListLoad'

const props = defineProps({
  empty: {
    type: Object,
    default: () => ({
      mode: 'data',
      icon: 'http://cdn.uviewui.com/uview/empty/data.png'
    })
  },
  params: {
    type: Object,
    default: () => {}
  },
  searchFun: {
    type: Function as PropType<TPaginationFun>
  },
  className: {
    type: String,
    default: ''
  },
  gray: {
    type: Boolean,
    default: false
  },
  immediate: {
    type: Boolean,
    default: true
  },
  showEmpty: {
    type: Boolean,
    default: true
  },
  top: {
    type: String,
    default: '0px'
  }
})
const emits = defineEmits(['change'])
const triggered = ref(false)
const { pagination, refreshData, loadMore } = useListLoad(props.searchFun, {
  params: props.params,
  noPage: true,
  immediate: props.immediate
})
watch(
  () => pagination.list,
  () => {
    emits('change', pagination.list)
  }
)
async function onPull() {
  triggered.value = true
  await refreshData()
  triggered.value = false
}
function lower() {
  loadMore()
}
defineExpose({
  refreshData
})
</script>

<template>
  <scroll-view
    scroll-y="true"
    refresher-enabled
    :refresher-triggered="triggered"
    :refresher-default-style="gray ? 'black' : 'white'"
    :class="className"
    class="my-scroll-view h-full"
    @refresherrefresh="onPull"
    @scrolltolower="lower"
  >
    <slot :list="pagination.list"></slot>
    <u-loadmore
      v-if="pagination.list.length > 0"
      :status="pagination.status"
    />
    <u-empty
      v-if="pagination.list.length === 0 && !pagination.loading && showEmpty"
      class="h-full"
      v-bind="empty"
    >
    </u-empty>
  </scroll-view>
</template>

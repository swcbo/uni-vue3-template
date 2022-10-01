<template>
  <div class="h-full w-full flex items-center justify-center flex-col">
    <u-loading-icon
      mode="circle"
      size="40"
      color="#3c9cff"
      vertical
      v-if="status === 'loading'"
    />
    <u--image
      :src="`/static/status/${pageStatus.image}`"
      width="300"
      :fade="false"
      height="300"
      :showLoading="false"
      v-if="pageStatus?.image"
    />
    <div class="mt-6 text-gray-500 text-sm">{{ pageStatus.tip }}</div>
    <u-button
      type="primary"
      text="点击重试"
      shape="circle"
      size="small"
      class="mt-20 !w-28"
      @click="emits('on-retry')"
      v-if="pageStatus.restart"
    />
  </div>
</template>
<script setup lang="ts">
import { PAGE_STATUS } from '@/constant'
import { computed } from 'vue'
interface IStatusView {
  status: keyof typeof PAGE_STATUS
}
const emits = defineEmits<{ (e: 'on-retry'): void }>()
const props = withDefaults(defineProps<IStatusView>(), {
  status: 'loading',
})
const pageStatus = computed(() => {
  return PAGE_STATUS[props.status]!
})
</script>

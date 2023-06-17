<script setup lang="ts">
import { computed } from 'vue'
import { PAGE_STATUS } from '@/constant'

interface IStatusView {
  status: keyof typeof PAGE_STATUS
}
const props = withDefaults(defineProps<IStatusView>(), {
  status: 'loading'
})
const emits = defineEmits<{ (e: 'on-retry'): void }>()
const pageStatus = computed(() => {
  return PAGE_STATUS[props.status]!
})
</script>

<template>
  <div class="h-full w-full flex items-center justify-center flex-col">
    <u-loading-icon
      v-if="status === 'loading'"
      mode="circle"
      size="40"
      color="#3c9cff"
      vertical
    />
    <u--image
      v-if="pageStatus?.image"
      :src="`/static/status/${pageStatus.image}`"
      width="300"
      :fade="false"
      height="300"
      :show-loading="false"
    />
    <div class="mt-6 text-gray-500 text-sm">{{ pageStatus.tip }}</div>
    <u-button
      v-if="pageStatus.restart"
      type="primary"
      text="点击重试"
      shape="circle"
      size="small"
      class="mt-20 !w-28"
      @click="emits('on-retry')"
    />
  </div>
</template>

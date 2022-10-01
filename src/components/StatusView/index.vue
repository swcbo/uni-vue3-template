<template>
  <div class="h-full w-full flex items-center justify-center flex-col">
    <u-loading-icon
      mode="circle"
      size="50"
      color="#3c9cff"
      vertical
      v-if="status === 'loading'"
    />
    <div class="mt-4 text-gray-500 text-lg">{{ tips }}</div>
  </div>
</template>
<script setup lang="ts">
import { ERROR_TIPS } from '@/constant'
import { computed } from 'vue'
interface IStatusView {
  status: keyof typeof ERROR_TIPS
}
const props = withDefaults(defineProps<IStatusView>(), {
  status: 'loading',
})
const tips = computed(() => {
  return ERROR_TIPS[props.status].tip
})
</script>

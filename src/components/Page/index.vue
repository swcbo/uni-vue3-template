<script setup lang="ts">
import { computed } from 'vue'
import StatusView from '../StatusView/index.vue'
import CustomNav from '@/components/CustomNav/index.vue'
import type { TPageStatus } from '@/constant'
import { NAV_CONFIG } from '@/constant'
import { useScreenStore } from '@/store/screen'
import { hiddenNav } from '@/utils'
import { isH5 } from '@/utils/platform'

interface IPageProps {
  status?: TPageStatus
  onLeftClick?: Function
  title?: string
  bgColor?: string
  hiddenBack?: boolean
  border?: boolean
}
const props = withDefaults(defineProps<IPageProps>(), {
  hiddenBack: isH5
})
const emits = defineEmits<{ (e: 'update:status', msg: TPageStatus): void }>()
const hidden = hiddenNav()
const screen = useScreenStore()
const top = computed(
  () => `${hidden ? 0 : NAV_CONFIG.height + screen.statusBarHeight}px`
)
function onRetry() {
  emits('update:status', 'loading')
}
defineExpose({ onRetry, top })
</script>

<template>
  <CustomNav
    v-show="!hidden"
    v-bind="props"
    @left-click="onLeftClick"
  >
    <template #navLeft>
      <slot name="navLeft"></slot>
    </template>
  </CustomNav>
  <div
    :style="{
      marginTop: top,
      height: `calc(100% - ${top})`
    }"
    class="overflow-y-auto overflow-x-hidden relative"
  >
    <StatusView
      v-if="status"
      :status="status"
      @on-retry="onRetry"
    />
    <slot v-else />
  </div>
</template>

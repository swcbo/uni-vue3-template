<template>
  <CustomNav v-bind="props" @leftClick="onLeftClick" v-show="!hidden">
    <template #navLeft>
      <slot name="navLeft"></slot>
    </template>
  </CustomNav>
  <div
    :style="{
      marginTop: top,
      height: `calc(100% - ${top})`,
    }"
    class="overflow-y-auto overflow-x-hidden relative"
  >
    <StatusView v-if="status" :status="status" @on-retry="onRetry" />
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import CustomNav from '@/components/CustomNav/index.vue'
import { NAV_CONFIG, TPageStatus } from '@/constant'
import { useScreenStore } from '@/store/screen'
import { hiddenNav } from '@/utils'
import { isH5 } from '@/utils/platform'
import { computed } from 'vue'
import StatusView from '../StatusView/index.vue'
interface IPageProps {
  status?: TPageStatus
  onLeftClick?: Function
  title?: string
  bgColor?: string
  hiddenBack?: boolean
  border?: boolean
}
const props = withDefaults(defineProps<IPageProps>(), {
  hiddenBack: isH5,
})
const emits = defineEmits<{ (e: 'update:status', msg: TPageStatus): void }>()
const hidden = hiddenNav()
const screen = useScreenStore()
const top = computed(
  () => `${hidden ? 0 : NAV_CONFIG.height + screen.statusBarHeight}px`,
)
const onRetry = () => {
  emits('update:status', 'loading')
}
defineExpose({ onRetry, top })
</script>

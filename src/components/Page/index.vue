<template>
  <CustomNav v-bind="navPorps" @leftClick="onLeftClick" v-show="!hidden">
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
    <StatusView v-if="status" :status="status" />
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CustomNav from '@/components/CustomNav/index.vue'
import { useScreenStore } from '@/store/screen'
import { isH5 } from '@/utils/platform'
import { hiddenNav } from '@/utils'
import { ERROR_TIPS, NAV_CONFIG } from '@/constant'
import StatusView from '../StatusView/index.vue'
interface IPageProps {
  status?: keyof typeof ERROR_TIPS
  onLeftClick?: Function
  title?: string
  bgColor?: string
  hiddenBack?: boolean
  border?: boolean
}
const props = withDefaults(defineProps<IPageProps>(), {
  hiddenBack: isH5,
})
const hidden = hiddenNav()
const screen = useScreenStore()
const navPorps = computed(() => props)
const top = computed(
  () => `${hidden ? 0 : NAV_CONFIG.height + screen.statusBarHeight}px`,
)
</script>

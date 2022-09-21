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
    class="overflow-y-auto overflow-x-hidden"
  >
    <slot v-if="!isLoading"></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CustomNav from '@/components/CustomNav/index.vue'
import { useScreenStore } from '@/store/screen'
import { isH5 } from '@/utils/platform'
import { hiddenNav } from '@/utils'
interface IPageProps {
  isLoading?: boolean
  onLeftClick?: Function
  title?: string
  bgColor?: string
  hiddenBack?: boolean
  border?: boolean
}
const props = withDefaults(defineProps<IPageProps>(), {
  isLoading: false,
  hiddenBack: isH5,
})
const hidden = hiddenNav()
const screen = useScreenStore()
const navPorps = computed(() => props)
const top = computed(() => `${hidden ? 0 : 44 + screen.statusBarHeight}px`)
</script>

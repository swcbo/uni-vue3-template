<template>
  <CustomNav v-bind="navPorps" @leftClick="onLeftClick" v-show="hiddenNav()">
    <template #navLeft>
      <slot name="navLeft"></slot>
    </template>
  </CustomNav>
  <div
    :style="{
      paddingTop: top,
    }"
  >
    <slot v-if="!isLoading"></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CustomNav, { INavProps } from '@/components/CustomNav/index.vue'
import { useScreenStore } from '@/store/screen'
import { isH5 } from '@/utils/platform'
import { hiddenNav } from '@/utils'
interface IPageProps extends INavProps {
  isLoading?: boolean
  onLeftClick?: Function
}
const screen = useScreenStore()
const props = withDefaults(defineProps<IPageProps>(), {
  isLoading: false,
  hiddenBack: isH5,
})
const navPorps = computed(() => props)
const top = computed(
  () => `${props.hiddenBack ? 0 : 44 + screen.statusBarHeight}px`,
)
</script>

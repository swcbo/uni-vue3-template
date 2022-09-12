<template>
  <CustomNav @on-click-left="onClickLeft" v-bind="navPorps" v-show="!isH5">
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
import CustomNav from '@/components/CustomNav/index.vue'
import { useScreenStore } from '@/store/screen'
import { isH5 } from '@/utils/platform'
const screen = useScreenStore()
const props = defineProps({
  title: {
    type: String,
    default: '视客美客',
  },
  hiddenBack: {
    type: Boolean,
    default: isH5,
  },
  // 铺满屏幕
  full: {
    type: Boolean,
    default: false,
  },
  // 是否加载
  isLoading: {
    type: Boolean,
    default: false,
  },
  // 是否白色底色
  white: {
    type: Boolean,
    default: false,
  },
  gray: {
    type: Boolean,
    default: false,
  },
  navWhite: {
    type: Boolean,
    default: false,
  },
})
const navPorps = computed(() => props)
const emit = defineEmits(['on-click-left'])
const top = computed(
  () => `${props.hiddenBack ? 0 : 44 + screen.statusBarHeight}px`,
)
const onClickLeft = () => {
  emit('on-click-left')
}
</script>

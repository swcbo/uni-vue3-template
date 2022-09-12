<!--
 * @Author: swcbo
 * @Date: 2022-03-05 13:42:34
 * @LastEditors: swcbo
 * @LastEditTime: 2022-09-12 22:49:51
 * @FilePath: /uni-vue3-template/src/components/CustomNav/index.vue
 * @Description:  自定义导航栏
-->
<template>
  <u-navbar
    fixed
    @leftClick="onLeftClick"
    :leftIcon="iconType"
    v-bind="navPorps"
  >
    <template #left>
      <slot name="navLeft"></slot>
    </template>
  </u-navbar>
</template>

<script lang="ts" setup>
import { NAV_CONFIG } from '@/constant'
import { isH5 } from '@/utils/platform'
import { onShow } from '@dcloudio/uni-app'
import { computed, useAttrs } from 'vue'

export interface INavProps {
  title?: string
  bgColor?: string
  hiddenBack?: boolean
  border?: boolean
}
const emit = defineEmits(['on-left-click'])
const attrs = useAttrs()
const { hiddenBack, ...other } = withDefaults(defineProps<INavProps>(), {
  bgColor: NAV_CONFIG.bgColor,
  border: NAV_CONFIG.border,
  hiddenBack: false,
})
const navPorps = computed(() => other)
const isCanBack = computed(() => {
  return getCurrentPages().length > 1 ? !hiddenBack : false
})
const iconType = computed(() =>
  hiddenBack ? '' : isCanBack.value ? 'arrow-left' : 'home',
)
onShow(() => {
  if (isH5)
    uni.setNavigationBarTitle({
      title: other.title || '',
    })
})
const onLeftClick = () => {
  if (hiddenBack) return
  if (attrs.onLeftClick) {
    emit('on-left-click')
    return
  }
  if (isCanBack.value) {
    uni.navigateBack({})
  } else {
    uni.reLaunch({
      url: '/pages/index/index',
    })
  }
}
</script>

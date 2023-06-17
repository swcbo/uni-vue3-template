<!--
 * @Author: swcbo
 * @Date: 2022-03-05 13:42:34
 * @LastEditors: swcbo
 * @LastEditTime: 2022-09-12 22:57:48
 * @FilePath: /uni-vue3-template/src/components/CustomNav/index.vue
 * @Description:  自定义导航栏
-->
<script lang="ts" setup>
import { onShow } from '@dcloudio/uni-app'
import { computed, useAttrs } from 'vue'
import { NAV_CONFIG } from '@/constant'
import { isH5 } from '@/utils/platform'

export interface INavProps {
  title?: string
  bgColor?: string
  hiddenBack?: boolean
  border?: boolean
}
const { hiddenBack, ...other } = withDefaults(defineProps<INavProps>(), {
  bgColor: NAV_CONFIG.bgColor,
  border: NAV_CONFIG.border,
  hiddenBack: false
})
const emit = defineEmits(['onLeftClick'])
const attrs = useAttrs()
const navPorps = computed(() => other)
const isCanBack = computed(() => {
  return getCurrentPages().length > 1 ? !hiddenBack : false
})
const iconType = computed(() =>
  hiddenBack ? '' : isCanBack.value ? 'arrow-left' : 'home'
)
onShow(() => {
  if (isH5)
    uni.setNavigationBarTitle({
      title: other.title || ''
    })
})
function onLeftClick() {
  if (hiddenBack) return
  if (attrs.onLeftClick) {
    emit('onLeftClick')
    return
  }
  if (isCanBack.value) {
    uni.navigateBack({})
  } else {
    uni.reLaunch({
      url: '/pages/index/index'
    })
  }
}
</script>

<template>
  <u-navbar
    fixed
    :left-icon="iconType"
    v-bind="navPorps"
    @left-click="onLeftClick"
  >
    <template #left>
      <slot name="navLeft"></slot>
    </template>
  </u-navbar>
</template>

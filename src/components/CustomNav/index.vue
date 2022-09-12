<!--
 * @Author: swcbo
 * @Date: 2022-03-05 13:42:34
 * @LastEditors: swcbo
 * @LastEditTime: 2022-09-12 21:59:59
 * @FilePath: /uni-vue3-template/src/components/CustomNav/index.vue
 * @Description:  自定义导航栏
-->
<template>
  <u-navbar
    fixed
    @leftClick="onClickLeft"
    :leftIcon="iconType"
    v-bind="navPorps"
  >
    <template #left>
      <slot name="navLeft"></slot>
    </template>
  </u-navbar>
</template>

<script lang="ts" setup>
import { isH5 } from '@/utils/platform'
import { onShow } from '@dcloudio/uni-app'
import { computed } from 'vue'
const emit = defineEmits(['on-click-left'])
const { hiddenBack, ...other } = defineProps({
  // 是否显示返回按钮
  hiddenBack: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
  },
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
const onClickLeft = () => {
  if (hiddenBack) return
  if (isCanBack.value) {
    uni.navigateBack({})
  } else {
    uni.reLaunch({
      url: '/pages/index/index',
    })
  }
  emit('on-click-left')
}
</script>

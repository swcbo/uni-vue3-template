<template></template>
<script setup lang="ts">
import { wxCodeLogin } from '@/utils/auth'
import { isH5 } from '@/utils/platform'
import { onLoad } from '@dcloudio/uni-app'
onLoad(async () => {
  // #ifdef H5 || MP-WEIXIN
  if (!(isH5 && import.meta.env.VITE_USER_NODE_ENV === 'development')) {
    await wxCodeLogin()
  }
  // #endif
  uni.reLaunch({ url: '/pages/index/index' })
})
</script>
<style lang="scss" scoped></style>

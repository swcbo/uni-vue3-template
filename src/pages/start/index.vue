<template></template>

<script setup lang="ts">
import { wxCodeLogin } from '@/utils/auth'
import { onLoad } from '@dcloudio/uni-app'
onLoad(async () => {
  // #ifdef H5 || MP-WEIXIN
  await wxCodeLogin()
  // #endif
  uni.redirectTo({ url: '/pages/index/index' })
})
</script>
<style lang="scss" scoped></style>

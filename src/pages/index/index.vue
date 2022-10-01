<template>
  <Page title="首页" hiddenBack>
    <ScrollList :searchFun="searchFun">
      <template #default="{ list }">
        <div v-for="item in list" :key="item">
          {{ item }}
        </div>
      </template>
    </ScrollList>
  </Page>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import Page from '@/components/Page/index.vue'
import ScrollList from '../../components/ScrollList/index.vue'
const searchFun = (params: any) =>
  new Promise<number[]>((resolve) => {
    resolve([1, 23, 4, 1, 5, 6, 7, 8])
  })
onLoad(() => {})
</script>
<style lang="scss" scoped></style>

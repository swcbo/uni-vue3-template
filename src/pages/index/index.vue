<template>
  <Page title="首页" hiddenBack ref="pageRef">
    <z-paging ref="paging" v-model="dataList" @query="queryList">
      <template #top>
        <view class="h-5 bg-blue-900 w-[100vw]">我是固定在顶部的view</view>
      </template>
      <view class="h-4 bg-red-400 mt-2" v-for="(item, index) in dataList">
        <view class="text-blue-400">{{ item.title }}</view>
      </view>
    </z-paging>
  </Page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Page from '@/components/Page/index.vue'
const paging = ref<any>(null)
let dataList = ref([{ title: 'dsadas' }])
const queryList = () => {
  setTimeout(() => {
    paging.value!.complete([
      { title: 'dsa2das' },
      { title: 'dsad3as' },
      { title: 'dsa4das' },
    ])
  }, 1000)
}
</script>

<style scoped></style>

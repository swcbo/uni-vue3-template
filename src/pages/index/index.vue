<script setup lang="ts">
import { ref } from 'vue'
import Page from '@/components/Page/index.vue'

const paging = ref<any>(null)
const dataList = ref([{ title: 'dsadas' }])
function queryList() {
  setTimeout(() => {
    paging.value!.complete([
      { title: 'dsa2das' },
      { title: 'dsad3as' },
      { title: 'dsa4das' }
    ])
  }, 1000)
}
</script>

<template>
  <Page
    title="首页"
    hidden-back
  >
    <z-paging
      ref="paging"
      v-model="dataList"
      @query="queryList"
    >
      <template #top>
        <view class="h-5 bg-blue-900 w-100vw">我是固定在顶部的view</view>
      </template>
      <view
        v-for="item in dataList"
        :key="item.title"
        class="h-4 bg-red-400 mt-2"
      >
        <view class="text-red-500 hover:bg-blue-900">{{ item.title }}</view>
      </view>
    </z-paging>
  </Page>
</template>

<style scoped lang="scss"></style>

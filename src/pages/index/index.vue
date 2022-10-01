<template>
  <Page title="首页" hiddenBack :status="status" ref="pageRef">
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
import Page from '@/components/Page/index.vue'
import useLoad from '@/hooks/useLoad'
import ScrollList from '../../components/ScrollList/index.vue'
const { status, pageRef } = useLoad(async (values) => {})
const searchFun = (params: any) =>
  new Promise<number[]>((resolve) => {
    resolve([1, 23, 4, 1, 5, 6, 7, 8])
  })
</script>
<style lang="scss" scoped></style>

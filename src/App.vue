<script lang="ts">
import { onLaunch } from '@dcloudio/uni-app'
import { useScreenStore } from '@/store/screen'

export default {
  globalData: {},
  setup() {
    const screenStore = useScreenStore()
    onLaunch(async () => {
      screenStore.getStatusInfo()
    })
  }
}
</script>

<style lang="scss">
@import url('uview-plus/index.scss');
page {
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  width: 100vw;
  height: 100%;
  background-color: #f9f9f9;
}
</style>

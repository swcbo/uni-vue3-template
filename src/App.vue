<script lang="ts">
import { useScreenStore } from '@/store/screen'
import { onLaunch } from '@dcloudio/uni-app'
export default {
  globalData: {},
  setup() {
    const screenStore = useScreenStore()
    onLaunch(async () => {
      screenStore.getStatusInfo()
    })
  },
}
</script>
<style lang="scss">
@import 'uview-plus/index.scss';
page {
  width: 100vw;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #f9f9f9;
  box-sizing: border-box;
  height: 100%;
}
</style>

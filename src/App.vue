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
</style>

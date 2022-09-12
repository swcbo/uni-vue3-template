<script lang="ts">
import { useScreenStore } from '@/store/screen'
import { onLaunch } from '@dcloudio/uni-app'
export default {
  globalData: {
    banner: {},
    code: '',
  },
  setup() {
    const screenStore = useScreenStore()
    onLaunch(async () => {
      screenStore.getStatusInfo()
    })
  },
}
</script>
<style lang="scss">
@import 'tailwindcss/utilities';
@import 'uview-plus/index.scss';
</style>

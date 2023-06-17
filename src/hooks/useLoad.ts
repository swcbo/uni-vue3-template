import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { TPageStatus } from '@/constant'
import type Page from '@/components/Page/index.vue'

export default (
  load: (values: Record<string, string | undefined>) => Promise<void>
) => {
  const status = ref<TPageStatus>('loading')
  const pageRef = ref<InstanceType<typeof Page> | null>(null)
  onLoad(async (values) => {
    try {
      await load({ ...values })
      status.value = undefined
    } catch (e) {
      status.value = 'error'
    }
  })
  return { status, pageRef }
}

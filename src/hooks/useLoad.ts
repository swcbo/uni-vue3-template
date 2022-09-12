import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
export type PromiseType<T extends Promise<any>> = T extends Promise<infer U>
  ? U
  : never
export default <T extends (args: any) => Promise<any>>(
  api: T,
  load?: (values: Record<string, string | undefined>) => void,
) => {
  const info = ref<PromiseType<ReturnType<T>>>()
  onLoad(async (values) => {
    load?.(values)
    info.value = await api({ ...values })
  })
  return { info }
}

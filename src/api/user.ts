import { post } from '@/plugins/request'

/** 微信登录 */
export const wxLogin = (code: string) => post('wx/login', { code })

/** 微信config */
export const wxConfig = () => post<Record<string, unknown>>('wx/config')

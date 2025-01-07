import { z } from 'zod'

export const emailSchema = z.object({
  email: z.string().email('올바른 이메일 형식을 입력해주세요.') // 이메일 형식이 아니면 에러
})
export type EmailForm = z.infer<typeof emailSchema>

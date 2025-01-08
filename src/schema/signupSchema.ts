import { z } from 'zod'

export const emailSchema = z.object({
  email: z.string().email('올바른 이메일 형식을 입력해주세요.')
})
export type EmailForm = z.infer<typeof emailSchema>

export const passwordSchema = z
  .object({
    password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
    confirmPassword: z.string()
    //   .min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword']
  })

export type PasswordForm = z.infer<typeof passwordSchema>

export const nicknameSchema = z.object({
  nickname: z.string().max(8, '닉네임은 최대 8자 이하이어야 합니다.')
})

export type NicknameForm = z.infer<typeof nicknameSchema>

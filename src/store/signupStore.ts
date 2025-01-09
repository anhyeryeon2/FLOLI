import { create } from 'zustand'

interface SignupState {
  nickname: string
  email: string
  password: string
  setNickname: (nickname: string) => void
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  reset: () => void
}

export const useSignupStore = create<SignupState>(set => ({
  nickname: '',
  email: '',
  password: '',
  setNickname: nickname => set({ nickname }),
  setEmail: email => set({ email }),
  setPassword: password => set({ password }),
  reset: () => set({ nickname: '', email: '', password: '' })
}))

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface User {
  id: string
  email: string
  nickname: string
  profile_img: string | FileList | undefined | null
  introduction?: string | null
  subsc_count?: number
}

interface AuthState {
  user: User | null
  setUser: (user: User) => void
  updateUser: (updates: Partial<User>) => void
  clearUser: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      // 전체 User 객체를 설정하는 함수
      setUser: user => set({ user }),

      // 특정 필드를 업데이트하는 함수
      updateUser: (updates: Partial<User>) =>
        set(state => ({
          user: state.user ? { ...state.user, ...updates } : null
        })),
      clearUser: () => set({ user: null })
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

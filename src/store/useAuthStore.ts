import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface User {
  id: string
  email: string
  nickname: string
  profile_img: string
}

interface AuthState {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      setUser: user =>
        set({
          user: {
            ...user,
            profile_img: user.profile_img
          }
        }),
      clearUser: () => set({ user: null })
    }),
    {
      name: 'auth-storage', 
      storage: createJSONStorage(() => localStorage) 
    }
  )
)

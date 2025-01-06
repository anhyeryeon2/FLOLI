import { create } from 'zustand'

interface User {
  id: string
  email: string
  nickname: string
  profileImage?: string
}

interface AuthState {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  setUser: user =>
    set({
      user: {
        ...user,
        profileImage: user.profileImage
      }
    }),
  clearUser: () => set({ user: null })
}))

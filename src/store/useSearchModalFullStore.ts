import { create } from 'zustand'

interface ModalFullProps {
  state: boolean
  searchState: boolean
  setModalState: (newState: boolean) => void
  setModalSearchState: (newState: boolean) => void
}

export const useSearchModalFullStore = create<ModalFullProps>(set => ({
  state: false,
  searchState: false,
  setModalState: (newState: boolean) => set({ state: newState }),
  setModalSearchState: (newState: boolean) => set({ searchState: newState })
}))

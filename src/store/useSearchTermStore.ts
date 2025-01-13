import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface SearchTermPros {
  setSearchTerm: (newState: string) => void
  searchTerm: string
}

interface SearchTermListProps {
  searchTermList: { id: string; term: string }[] // id와 term을 포함한 객체 배열
  setSearchTermList: (newState: { id: string; term: string }[]) => void
  addSearchTerm: (newTerm: string) => void
}

export const useSearchTermStore = create<SearchTermPros>(set => ({
  searchTerm: '',
  setSearchTerm: (newState: string) => set({ searchTerm: newState })
}))

export const useSearchTermListStore = create<SearchTermListProps>()(
  persist(
    (set, get) => ({
      searchTermList: [],
      setSearchTermList: newState => set({ searchTermList: newState }),

      addSearchTerm: (newTerm: string) => {
        // 빈 문자열인 경우 저장하지 않음
        if (!newTerm.trim()) return

        const currentList = get().searchTermList

        const newId = crypto.randomUUID()
        const newEntry = { id: newId, term: newTerm }

        // 중복 제거 및 최대 10개 유지
        const updatedList = [
          newEntry, // 최신 검색어를 맨 앞에 추가
          ...currentList.filter(item => item.term !== newTerm) // 중복 제거
        ]
        const limitedList = updatedList.slice(0, 10) // 최대 10개 유지

        set({ searchTermList: limitedList })
      }
    }),
    {
      name: 'searchTermList',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

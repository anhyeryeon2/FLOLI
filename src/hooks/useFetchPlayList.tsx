import { useInfiniteQuery } from '@tanstack/react-query'
import axiosInstance from '../apis/axiosInstance'
import { useAuthStore } from '@/store/useAuthStore'

interface FetchPlayListProps {
  isMainPage: boolean
}

const ITEM_COUNT = 5

export const getPlayList = async (
  page: number = 1,
  item: number = ITEM_COUNT
) => {
  try {
    const currentUserId = useAuthStore.getState().user?.id
    const playListData = await axiosInstance.get('rpc/get_user_and_playlists', {
      params: {
        current_user_id: currentUserId,
        page: page,
        item: item
      }
    })
    return playListData.data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('알 수 없는 오류가 발생했습니다.')
  }
}

const useFetchPlayList = ({ isMainPage }: FetchPlayListProps) => {
  return useInfiniteQuery({
    queryKey: ['playList'],
    queryFn: ({ pageParam }) => getPlayList(pageParam as number),

    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1

      return nextPage <= lastPage.length ? nextPage : undefined
    },

    select: data => {
      return data.pages.flat()
    },

    initialPageParam: 1,

    staleTime: 1000 * 60,
    enabled: isMainPage
  })
}

export default useFetchPlayList

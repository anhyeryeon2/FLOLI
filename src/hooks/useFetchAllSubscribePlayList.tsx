import { useInfiniteQuery } from '@tanstack/react-query'
import axiosInstance from '../apis/axiosInstance'
import { useAuthStore } from '@/store/useAuthStore'

const ITEM_COUNT = 5

export const getSubscribeAllPlayLists = async (
  page: number = 1,
  item: number = ITEM_COUNT
) => {
  try {
    const currentUserId = useAuthStore.getState().user?.id
    const subscribeData = await axiosInstance.get(
      'rpc/get_playlists_by_subscribed_users',
      {
        params: {
          input_user_id: currentUserId,
          page: page,
          item: item
        }
      }
    )
    return subscribeData.data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('알 수 없는 오류가 발생했습니다.')
  }
}

const useFetchAllSubscribePlayList = () => {
  return useInfiniteQuery({
    queryKey: ['allSubscribePlayList'],
    queryFn: ({ pageParam }) => getSubscribeAllPlayLists(pageParam as number),

    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1
      return nextPage <= lastPage.length ? nextPage : undefined
    },

    select: data => data.pages.flat(),
    initialPageParam: 1,
    staleTime: 1000 * 60
  })
}

export default useFetchAllSubscribePlayList

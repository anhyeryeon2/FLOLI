import { useInfiniteQuery } from '@tanstack/react-query'
import axiosInstance from '../apis/axiosInstance'

const ITEM_COUNT = 5

export const getSubscribePlayLists = async (
  userId: string,
  page: number = 1,
  item: number = ITEM_COUNT
) => {
  try {
    const subscribeData = await axiosInstance.get('rpc/get_playlists_by_user', {
      params: {
        input_user_id: userId,
        page: page,
        item: item
      }
    })
    return subscribeData.data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('알 수 없는 오류가 발생했습니다.')
  }
}

const useFetchSubscribePlayList = (userId: string) => {
  return useInfiniteQuery({
    queryKey: ['subscribePlayList', userId],
    queryFn: ({ pageParam }) =>
      getSubscribePlayLists(userId, pageParam as number),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1
      return nextPage <= lastPage.length ? nextPage : undefined
    },
    select: data => data.pages.flat(),
    enabled: !!userId,
    initialPageParam: 1,
    staleTime: 1000 * 60
  })
}

export default useFetchSubscribePlayList

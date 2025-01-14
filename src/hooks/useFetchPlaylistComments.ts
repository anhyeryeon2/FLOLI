import { useInfiniteQuery } from '@tanstack/react-query'
import { COMMENT_CALL_LIMIT } from '@/constants/constant'
import fetchPlaylistComments from '@/apis/comment/fetchPlaylistComments'

/**
 * @param {string} playlistId - 플레이리스트 ID
 * @example const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchPlaylistComments(playlistId);
 */
const useFetchPlaylistComments = (playlistId: string) => {
  return useInfiniteQuery({
    queryKey: ['playlistComments', playlistId],
    queryFn: ({ pageParam = 0 }) =>
      fetchPlaylistComments({ pageParam, playlistId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length
      return lastPage.length === COMMENT_CALL_LIMIT ? nextPage : undefined
    },
    enabled: !!playlistId
  })
}

export default useFetchPlaylistComments

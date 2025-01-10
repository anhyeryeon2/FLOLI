import { useInfiniteQuery } from '@tanstack/react-query'
import axiosInstance from '@/apis/axiosInstance'
import { IFetchCommentsProps } from '@/types/comments'

const fetchPlaylistComments = async ({
  playlistId,
  pageParam = 0
}: IFetchCommentsProps) => {
  const limit = 3
  const offset = pageParam * limit

  const res = await axiosInstance.get('/comments', {
    params: {
      playlist_id: `eq.${playlistId}`,
      order: 'updated_at.desc',
      limit: limit,
      offset: offset
    }
  })

  if (!res.data) {
    // 댓글이 없는 경우
    return { data: [], nextPage: undefined }
  }

  return res.data
}

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
      return lastPage.length === 3 ? nextPage : undefined
    },
    enabled: !!playlistId
  })
}

export default useFetchPlaylistComments

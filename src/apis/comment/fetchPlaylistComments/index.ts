import axiosInstance from '@/apis/axiosInstance'
import { COMMENT_CALL_LIMIT } from '@/constants/constant'
import { IFetchCommentsProps } from '@/types/comments'

const fetchPlaylistComments = async ({
  playlistId,
  pageParam = 0
}: IFetchCommentsProps) => {
  const offset = pageParam * COMMENT_CALL_LIMIT

  const res = await axiosInstance.get('/comments', {
    params: {
      playlist_id: `eq.${playlistId}`,
      order: 'updated_at.desc',
      limit: COMMENT_CALL_LIMIT,
      offset: offset
    }
  })

  if (!res.data) {
    // 댓글이 없는 경우
    return { data: [], nextPage: undefined }
  }

  return res.data
}

export default fetchPlaylistComments

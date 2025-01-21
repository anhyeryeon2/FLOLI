import axiosInstance from '@/apis/axiosInstance'

//유저 플레이리스트 불러오기

export async function userPlayListGet(
  userId: string | undefined,
  pageParam: number = 0
) {
  const PAGE_SIZE = 10
  const offset = (pageParam - 1) * PAGE_SIZE
  const limit = PAGE_SIZE

  const userPlayList = await axiosInstance.get('/playlists', {
    params: {
      user_id: `eq.${userId}`,
      limit: limit,
      offset: offset
    }
  })

  return userPlayList.data
}

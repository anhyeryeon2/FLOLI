import axiosInstance from '@/apis/axiosInstance'

type EditProfile = {
  nickname?: string
  introduction?: string
}

//좋아요 누른 플레이리스트 정보

interface LikedPlaylist extends EditProfile {
  playlist_id: string
  created_at: string
  user_id: string
  like_id: string
}

export async function LikedPlayList(
  userId: string | undefined,
  pageParam: number = 1
) {
  const PAGE_SIZE = 10
  const offset = (pageParam - 1) * PAGE_SIZE
  const limit = PAGE_SIZE

  const likedRes = await axiosInstance.get('/likes', {
    params: {
      user_id: `eq.${userId}`,
      order: 'created_at.desc'
    }
  })

  const playlistIds = likedRes.data
    .map((item: LikedPlaylist) => item.playlist_id)
    .join(',')

  const PlayRes = await axiosInstance.get('/playlists', {
    params: {
      playlist_id: `in.(${playlistIds})`,
      limit: limit,
      offset: offset
    }
  })

  const sortedLikeList = likedRes.data
    .map((cur: LikedPlaylist) => {
      const playlist = PlayRes.data.find(
        (cur2: LikedPlaylist) => cur2.playlist_id === cur.playlist_id
      )
      if (playlist) {
        return { ...playlist }
      } else {
        return null
      }
    })
    .filter((item: LikedPlaylist) => item !== null)

  return sortedLikeList
}

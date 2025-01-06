import FeedList from '@/components/Feedlist/Feedlist'
import * as S from '@/components/Feedlist/Feedlist.styles'
import axiosInstance from '@/apis/axiosInstance'
import { useEffect, useState } from 'react'
import { IPlayListType } from '@/types/playList'

export function Home() {
  const [data, setData] = useState<IPlayListType[]>([])
  const getPlayListData = async () => {
    const playListData = await axiosInstance.get('rpc/get_user_and_playlists')
    let data = playListData.data
    setData(data)
  }

  useEffect(() => {
    getPlayListData()
  }, [])

  return (
    <S.FeedConteiner>
      {data.map(playList => (
        <FeedList
          image={playList.thumbnail}
          profileImage={playList.profile_img_path}
          nickname={playList.nickname}
          likes={playList.likes_count}
          track={playList.video_count}
          date={playList.created_at}
          title={playList.title}
          comments={playList.comments_count}
          key={playList.playlist_id}
        />
      ))}
    </S.FeedConteiner>
  )
}

export default Home

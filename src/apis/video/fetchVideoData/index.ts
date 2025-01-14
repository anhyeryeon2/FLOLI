import extractYouTubeVideoId from '@/utils/extractYouTubeVideoId'
import axios from 'axios'

interface IVideoData {
  title: string
  author_name: string
  thumbnail_url: string
  video_id: string
}

const fetchVideoData = async (url: string): Promise<IVideoData> => {
  const res = await axios.get(
    `https://www.youtube.com/oembed?url=${url}&format=json`
  )

  // 데이터에 video id값 추가하기
  res.data.video_id = extractYouTubeVideoId(url)

  return res.data
}

export default fetchVideoData

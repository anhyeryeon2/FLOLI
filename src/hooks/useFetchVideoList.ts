import extractYouTubeVideoId from '@/utils/extractYouTubeVideoId'
import { useQuery } from '@tanstack/react-query'
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

/**
 * @param {string} videoUrls - video url 배열
 * @returns {object} data, error, isPending
 * @example const { data, error, isPending } = useFetchVideoList(videoUrls);
 */
const useFetchVideoList = (videoUrls: string[]) => {
  // videoUrls 데이터가 아직 없을 때 undefined여서 enabled에서 에러 발생하므로 추가
  if (!videoUrls) {
    videoUrls = []
  }

  return useQuery({
    queryKey: ['youtubeData', videoUrls],
    queryFn: async () => {
      const promises = videoUrls.map(url => fetchVideoData(url))
      return Promise.all(promises)
    },
    enabled: !!videoUrls.length
  })
}

export default useFetchVideoList

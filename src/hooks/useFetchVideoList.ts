import fetchVideoData from '@/apis/video/fetchVideoData'
import { useQuery } from '@tanstack/react-query'

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

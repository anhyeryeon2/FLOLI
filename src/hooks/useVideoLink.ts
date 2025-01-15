import { VideoItem } from '@/types/playListCreate'
import extractYouTubeVideoId from '@/utils/extractYouTubeVideoId'
import { useState } from 'react'

export const useVideoLink = () => {
  const [videoLink, setVideoLink] = useState('')
  const [videoList, setVideoList] = useState<VideoItem[]>([])
  // 영상 추가 핸들러
  const handleAddVideo = async () => {
    if (!videoLink.trim()) return alert('유튜브 링크를 입력해주세요.')

    const videoId = extractYouTubeVideoId(videoLink)
    if (!videoId) return alert('올바른 유튜브 링크를 입력해주세요.')

    try {
      const response = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      )
      const data = await response.json()

      const newVideo: VideoItem = {
        id: videoId,
        title: data.title,
        thumbnail: `https://img.youtube.com/vi/${videoId}/0.jpg`,
        link: videoLink,
        channel: data.author_name || '알 수 없는 채널'
      }

      setVideoList([...videoList, newVideo])
      setVideoLink('')
    } catch (error) {
      console.error('Error fetching ', error)
      alert('영상 정보를 불러오는 데 실패했습니다.')
    }
  }

  const handleRemoveVideo = (index: number) => {
    setVideoList(videoList.filter((_, i) => i !== index))
  }

  return {
    videoLink,
    setVideoLink,
    videoList,
    setVideoList,
    handleAddVideo,
    handleRemoveVideo
  }
}

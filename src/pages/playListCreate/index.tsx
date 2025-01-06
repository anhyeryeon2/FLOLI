import { useState } from 'react'
import { Button } from '@/components/button/Button'
import Input from '@/components/Input/Input'
import * as S from './PlayListCreate.styles'
import { RiImageAddLine } from 'react-icons/ri'
interface VideoItem {
  id: string
  title: string
  thumbnail: string
  link: string
  channel: string
}

export function PlaylistCreate() {
  const [videoLink, setVideoLink] = useState('')
  const [videoList, setVideoList] = useState<VideoItem[]>([])
  const [playlistTitle, setPlaylistTitle] = useState('')
  const [playlistDescription, setPlaylistDescription] = useState('')
  const [isPublic, setIsPublic] = useState(true)

  // 유튜브 영상 ID 추출
  const extractYouTubeVideoId = (url: string) => {
    const regExp =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    const match = url.match(regExp)
    return match ? match[1] : null
  }

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
      console.error('Error fetching video details:', error)
      alert('영상 정보를 불러오는 데 실패했습니다.')
    }
  }

  // 영상 제거 핸들러
  const handleRemoveVideo = (index: number) => {
    setVideoList(videoList.filter((_, i) => i !== index))
  }

  return (
    <S.Container>
      <S.Section>
        <S.Label>플레이리스트 제목</S.Label>
        <Input
          value={playlistTitle}
          onChange={e => setPlaylistTitle(e.target.value)}
          placeholder="플레이리스트 제목을 입력해주세요"
        />
      </S.Section>

      {/* 설명 입력 */}
      <S.Section>
        <S.Label>플레이리스트 설명</S.Label>
        <S.TextArea
          value={playlistDescription}
          onChange={e => setPlaylistDescription(e.target.value)}
          placeholder="플레이리스트 설명을 입력해주세요"
        />
      </S.Section>

      {/* 공개/비공개 선택 */}
      <S.Section>
        <S.ToggleContainer>
          <S.ToggleButton
            isActive={isPublic}
            onClick={() => setIsPublic(true)}>
            공개
          </S.ToggleButton>
          <S.ToggleButton
            isActive={!isPublic}
            onClick={() => setIsPublic(false)}>
            비공개
          </S.ToggleButton>
        </S.ToggleContainer>
      </S.Section>

      {/* 영상 링크 추가 */}
      <S.Section>
        <S.Label>영상 링크 추가</S.Label>
        <S.VideoLinkInput>
          <Input
            value={videoLink}
            onChange={e => setVideoLink(e.target.value)}
            placeholder="영상 링크를 입력해주세요"
          />
          <S.AddButton onClick={handleAddVideo}>+</S.AddButton>
        </S.VideoLinkInput>
      </S.Section>

      {/* 영상 목록 */}
      <S.Section>
        <S.Label>영상 목록</S.Label>
        {videoList.map((video, index) => (
          <S.VideoItem key={video.id}>
            <a
              href={video.link}
              target="_blank"
              rel="noopener noreferrer">
              <S.Thumbnail
                src={`https://img.youtube.com/vi/${video.id}/0.jpg`}
                alt={video.title}
              />
            </a>
            <S.VideoInfo>
              <span>{video.title}</span>
              <p>{video.channel || '알 수 없는 채널'}</p>
            </S.VideoInfo>
            <S.RemoveButton onClick={() => handleRemoveVideo(index)}>
              ✕
            </S.RemoveButton>
          </S.VideoItem>
        ))}
      </S.Section>

      <S.Section>
        <S.Label>썸네일 등록</S.Label>
        <S.ThumbnailContainer>
          <S.ThumbnailUpload>
            <S.UploadIcon>
              <RiImageAddLine />
            </S.UploadIcon>
          </S.ThumbnailUpload>

          <S.ThumbnailInfo>
            <S.Title>제목이 2줄까지...</S.Title>
          </S.ThumbnailInfo>
        </S.ThumbnailContainer>
      </S.Section>

      <Button
        bordertype="기본"
        fontSize="1.6rem"
        width="100%">
        플레이리스트 생성하기
      </Button>
    </S.Container>
  )
}

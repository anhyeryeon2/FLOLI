import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import { useToastMessageContext } from '@/providers/ToastMessageProvider'
import { useVideoLink } from '@/hooks/useVideoLink'
import { useModal } from '@/hooks/useModal'
import { useImageUpload } from '@/hooks/useImageUpload'
import { useDebounce } from '@/hooks/useDebounce'
import axiosInstance from '@/apis/axiosInstance'
import { CreatePlaylistPayload } from '@/types/playListCreate'

import { Button } from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import * as S from '@/components/playListCreate/PlayListCreate.styles'
import { PlayListInfo } from '@/components/playListCreate/PlayListInfo'
import { PlayListIsPublic } from '@/components/playListCreate/PlayListIsPublic'
import { RiImageAddLine } from 'react-icons/ri'

export function PlayListCreate() {
  const [playlistTitle, setPlaylistTitle] = useState('')
  const [playlistDescription, setPlaylistDescription] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const { showToastMessage } = useToastMessageContext()
  const { open, ModalComponent } = useModal()
  const navigate = useNavigate()

  const showModal = () => {
    open({
      title: '플레이리스트를 생성하시겠습니까?',
      description: '새로운 플레이리스트가 생성됩니다.',
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: handleCreatePlaylist
    })
  }
  const user = useAuthStore(state => state.user)
  const {
    videoLink,
    setVideoLink,
    videoList,
    setVideoList,
    handleAddVideo,
    handleRemoveVideo
  } = useVideoLink()
  const { thumbnail, handleThumbnailUpload, resetThumbnail } = useImageUpload()

  const debouncedTitle = useDebounce(playlistTitle, 300)

  const handleCreatePlaylist = async () => {
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
      return showToastMessage({
        message: '로그인이 필요합니다.',
        type: 'error'
      })
    }

    if (!playlistTitle.trim()) {
      return showToastMessage({
        message: '플레이리스트 제목을 입력해주세요.',
        type: 'error'
      })
    }

    if (videoList.length === 0) {
      return showToastMessage({
        message: '영상을 1개 이상 추가해주세요.',
        type: 'error'
      })
    }
    const payload: CreatePlaylistPayload = {
      user_id: user?.id || '',
      title: playlistTitle,
      description: playlistDescription || '',
      thumbnail: thumbnail || videoList[0]?.thumbnail,
      video_urls: videoList.map(video => video.link),
      is_public: isPublic
    }

    try {
      await axiosInstance.post('/rpc/create_playlist', payload)
      console.log('➡️', payload.user_id)
      showToastMessage({
        message: '플레이리스트가 성공적으로 생성되었습니다.',
        type: 'success'
      })
      navigate('/')

      setPlaylistTitle('')
      setPlaylistDescription('')
      setVideoList([])
      resetThumbnail()
    } catch (error) {
      console.error(error)
      showToastMessage({
        message: '플레이리스트 생성에 실패했습니다.',
        type: 'error'
      })
    }
  }

  return (
    <S.Container>
      <PlayListInfo
        playlistTitle={playlistTitle}
        setPlaylistTitle={setPlaylistTitle}
        playlistDescription={playlistDescription}
        setPlaylistDescription={setPlaylistDescription}
      />

      <PlayListIsPublic
        isPublic={isPublic}
        setIsPublic={setIsPublic}
      />

      <S.Section>
        <S.Label>영상 링크 추가</S.Label>
        <S.VideoLinkInput>
          <Input
            value={videoLink}
            onChange={e => setVideoLink(e.target.value)}
            placeholder="영상 링크를 입력해주세요"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleAddVideo()
              }
            }}
          />
          <S.AddButton onClick={handleAddVideo}>+</S.AddButton>
        </S.VideoLinkInput>
      </S.Section>

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
        <S.ThumbnailPreview>
          <div style={{ position: 'relative' }}>
            <label htmlFor="thumbnail-upload">
              {thumbnail ? (
                <S.ThumbnailImage
                  src={thumbnail}
                  alt="썸네일 미리보기"
                />
              ) : (
                <S.EmptyThumbnail>
                  <span>
                    <RiImageAddLine />
                  </span>
                </S.EmptyThumbnail>
              )}
              <input
                type="file"
                id="thumbnail-upload"
                accept="image/"
                onChange={handleThumbnailUpload}
                style={{ display: 'none' }}
              />
            </label>
            <S.TrackTag>Track: {videoList.length}</S.TrackTag>
          </div>
          <S.ThumbnailInfo>
            <S.ThumbnailTitle>{debouncedTitle || ''}</S.ThumbnailTitle>
            <S.ThumbnailMaker>{user?.nickname}</S.ThumbnailMaker>
          </S.ThumbnailInfo>
        </S.ThumbnailPreview>
      </S.Section>

      <S.ButtonContainer>
        <Button
          bordertype="기본"
          width="100%"
          onClick={showModal}>
          플레이리스트 생성하기
        </Button>
        {ModalComponent}
      </S.ButtonContainer>
    </S.Container>
  )
}

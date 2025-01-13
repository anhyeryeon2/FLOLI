import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import { useVideoLink } from '@/hooks/useVideoLink'
import { useModal } from '@/hooks/useModal'
import { useImageUpload } from '@/hooks/useImageUpload'
import { useDebounce } from '@/hooks/useDebounce'
import axiosInstance from '@/apis/axiosInstance'
import { CreatePlaylistPayload } from '@/types/playListCreate'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/hooks/useToast'

import { Button } from '@/component/Button/Button'
import Input from '@/component/Input/Input'
import * as S from '@/component/PlayListCreate/PlayListCreate.styles'
import { PlayListInfo } from '@/component/PlayListCreate/PlayListInfo'
import { PlayListIsPublic } from '@/component/PlayListCreate/PlayListIsPublic'
import { RiImageAddLine } from 'react-icons/ri'

export function PlayListCreate() {
  const [playlistTitle, setPlaylistTitle] = useState('')
  const [playlistDescription, setPlaylistDescription] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const { open, ModalComponent } = useModal()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { handleToastError, handleToastSuccess } = useToast()

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

  const showModal = () => {
    open({
      title: '플레이리스트를 생성하시겠습니까?',
      description: '새로운 플레이리스트가 생성됩니다.',
      confirmText: '확인',
      cancelText: '취소',
      onConfirm: handleCreatePlaylist
    })
  }
  const debouncedTitle = useDebounce(playlistTitle, 300)

  const createPlayListMutation = useMutation({
    mutationFn: async (payload: CreatePlaylistPayload) => {
      const response = await axiosInstance.post('/rpc/create_playlist', payload)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists'] })
      handleToastSuccess('플레이리스트가 성공적으로 생성되었습니다.')

      setPlaylistTitle('')
      setPlaylistDescription('')
      setVideoList([])
      resetThumbnail()
      navigate('/', { state: { refetch: true } })
    },
    onError: error => {
      console.error(error)
      handleToastError('플레이리스트 생성에 실패했습니다')
    }
  })

  const handleCreatePlaylist = async () => {
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
      handleToastError('로그인이 필요합니다.')
      navigate('/login')
    }

    if (!playlistTitle.trim()) {
      handleToastError('플레이리스트 제목을 입력해주세요.')
    }

    if (videoList.length === 0) {
      handleToastError('영상을 추가해주세요 ')
    }
    const payload: CreatePlaylistPayload = {
      user_id: user?.id || '',
      title: playlistTitle,
      description: playlistDescription || '',
      thumbnail: thumbnail || videoList[0]?.thumbnail,
      video_urls: videoList.map(video => video.link),
      is_public: isPublic
    }
    createPlayListMutation.mutate(payload)
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

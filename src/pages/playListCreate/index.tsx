import { useState } from 'react'
import { Button } from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import * as S from '../../components/playListCreate/PlayListCreate.styles'
import { supabase } from '../../../supabaseConfig'
import { useToastMessageContext } from '@/providers/ToastMessageProvider'
import { useVideoLink } from '@/hooks/useVideoLink'
import { PlaylistInfo } from '@/components/playListCreate/PlayListInfo'
import { PlaylistIsPublic } from '@/components/playListCreate/PlayListIsPublic'
import { RiImageAddLine } from 'react-icons/ri'
import { useImageUpload } from '@/hooks/useImageUpload'
import { useDebounce } from '@/hooks/useDebounce'

export function PlayListCreate() {
  const [playlistTitle, setPlaylistTitle] = useState('')
  const [playlistDescription, setPlaylistDescription] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const { showToastMessage } = useToastMessageContext()

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

    const { data: user, error: userError } =
      await supabase.auth.getUser(accessToken)
    if (userError || !user) {
      return showToastMessage({
        message: '사용자 정보를 불러오지 못했습니다.',
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
        message: '영상을 1개이상 추가해주세요.',
        type: 'error'
      })
    }
    try {
      const userId = user.user?.id
      const { error } = await supabase.from('playlists').insert([
        {
          title: playlistTitle,
          description: playlistDescription || '',
          thumbnail: thumbnail || videoList[0]?.thumbnail,
          video_url: videoList.map(video => video.link).join(',') || '',
          is_public: isPublic,
          likes_count: 0,
          comments_count: 0,
          user_id: userId,
          video_count: videoList.length || 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])

      if (error) {
        throw error
      }

      showToastMessage({
        message: '플레이리스트가 성공적으로 생성되었습니다',
        type: 'success'
      })

      setPlaylistTitle('')
      setPlaylistDescription('')
      setVideoList([])
      resetThumbnail()
    } catch {
      showToastMessage({
        message: `플레이리스트 생성 실패하였습니다`,
        type: 'error'
      })
    } finally {
      console.log('플레이리스트 생성 완료')
    }
  }

  return (
    <S.Container>
      <PlaylistInfo
        playlistTitle={playlistTitle}
        setPlaylistTitle={setPlaylistTitle}
        playlistDescription={playlistDescription}
        setPlaylistDescription={setPlaylistDescription}
      />

      <PlaylistIsPublic
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
                accept="image/*"
                onChange={handleThumbnailUpload}
                style={{ display: 'none' }}
              />
            </label>
            <S.TrackTag>Track: {videoList.length}</S.TrackTag>
          </div>
          <S.ThumbnailInfo>
            <S.ThumbnailTitle>{debouncedTitle || ''}</S.ThumbnailTitle>
            <S.ThumbnailMaker>//user.nickname 추가예정</S.ThumbnailMaker>
          </S.ThumbnailInfo>
        </S.ThumbnailPreview>
      </S.Section>

      <S.ButtonContainer>
        <Button
          bordertype="기본"
          width="100%"
          onClick={handleCreatePlaylist}>
          플레이리스트 생성하기
        </Button>
      </S.ButtonContainer>
    </S.Container>
  )
}

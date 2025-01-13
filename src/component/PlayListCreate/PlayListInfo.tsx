import { PlayListInfoProps } from '@/types/playListCreate'
import * as S from '@/component/PlayListCreate/PlayListCreate.styles'
import Input from '../Input/Input'

export const PlayListInfo = ({
  playlistTitle,
  setPlaylistTitle,
  playlistDescription,
  setPlaylistDescription
}: PlayListInfoProps) => {
  const renderDescriptionWithHashtags = () => {
    if (!playlistDescription) return ''

    const hashtagRegex = /(#[^\s#]+)/g
    const parts = playlistDescription.split(hashtagRegex)

    return parts.map((part, index) => {
      if (part.startsWith('#')) {
        return <S.HashtagSpan key={index}>{part}</S.HashtagSpan>
      }
      return part
    })
  }

  return (
    <>
      <S.Section>
        <S.Label>플레이리스트 제목</S.Label>
        <Input
          value={playlistTitle}
          onChange={e => setPlaylistTitle(e.target.value)}
          placeholder="플레이리스트 제목을 입력해주세요"
        />
      </S.Section>
      <S.Section>
        <S.Label>플레이리스트 설명</S.Label>
        <S.HighlightWrapper>
          <S.HighlightView>{renderDescriptionWithHashtags()}</S.HighlightView>
          <S.TransparentTextarea
            value={playlistDescription}
            onChange={(e: { target: { value: string } }) =>
              setPlaylistDescription(e.target.value)
            }
            placeholder="플레이리스트 설명을 입력해주세요"
          />
        </S.HighlightWrapper>
      </S.Section>
    </>
  )
}

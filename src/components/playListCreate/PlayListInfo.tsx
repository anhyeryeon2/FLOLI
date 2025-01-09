import { PlayListInfoProps } from '@/types/playListCreate'
import * as S from '../../components/playListCreate/PlayListCreate.styles'
import Input from '../Input/Input'
import Textarea from '../Textarea/Textarea'

export const PlayListInfo = ({
  playlistTitle,
  setPlaylistTitle,
  playlistDescription,
  setPlaylistDescription
}: PlayListInfoProps) => {
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
        <Textarea
          value={playlistDescription}
          onChange={e => setPlaylistDescription(e.target.value)}
          placeholder="플레이리스트 설명을 입력해주세요"
        />
      </S.Section>
    </>
  )
}

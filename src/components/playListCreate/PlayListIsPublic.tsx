import { PlaylistIsPublicProps } from '@/types/playListCreate'
import * as S from '../../components/playListCreate/PlayListCreate.styles'

export const PlaylistIsPublic = ({
  isPublic,
  setIsPublic
}: PlaylistIsPublicProps) => {
  return (
    <S.Section>
      <S.ToggleContainer>
        <S.ToggleButton
          $isActive={isPublic}
          onClick={() => setIsPublic(true)}>
          공개
        </S.ToggleButton>
        <S.ToggleButton
          $isActive={!isPublic}
          onClick={() => setIsPublic(false)}>
          비공개
        </S.ToggleButton>
      </S.ToggleContainer>
    </S.Section>
  )
}

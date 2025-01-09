import { PlayListIsPublicProps } from '@/types/playListCreate'
import * as S from '../../components/playListCreate/PlayListCreate.styles'

export const PlayListIsPublic = ({
  isPublic,
  setIsPublic
}: PlayListIsPublicProps) => {
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

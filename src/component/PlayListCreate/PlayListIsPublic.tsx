import { PlayListIsPublicProps } from '@/types/playListCreate'
import * as S from '../../component/PlayListCreate/PlayListCreate.styles'
import { useState } from 'react'

export const PlayListIsPublic = ({
  isPublic,
  setIsPublic
}: PlayListIsPublicProps) => {
  const [message, setMessage] = useState<string>(
    '이 플레이리스트는 모두에게 공개됩니다.'
  )

  const handleToggle = (publicStatus: boolean) => {
    setIsPublic(publicStatus)
    if (publicStatus) {
      setMessage('이 플레이리스트는 모두에게 공개됩니다.')
    } else {
      setMessage('이 플레이리스트는 나만 볼 수 있습니다.')
    }
  }
  return (
    <S.Section>
      <S.ToggleContainer>
        <S.ToggleButton
          $isActive={isPublic === true}
          onClick={() => handleToggle(true)}>
          공개
        </S.ToggleButton>
        <S.ToggleButton
          $isActive={isPublic === false}
          onClick={() => handleToggle(false)}>
          비공개
        </S.ToggleButton>
      </S.ToggleContainer>
      <S.Message>{message}</S.Message>
    </S.Section>
  )
}

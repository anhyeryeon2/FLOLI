import * as S from './DetailPlayList.styles'

interface DetailPlayListProps {
  image: string
  title: string
  nickname: string
  onClick: () => void
}

const DetailPlayList = ({
  image,
  title,
  nickname,
  onClick
}: DetailPlayListProps) => {
  return (
    <S.CardContainer onClick={onClick}>
      <S.ImageWrapper>
        <img
          src={image}
          alt={title}
        />
      </S.ImageWrapper>
      <S.TextWrapper>
        <S.Title>{title}</S.Title>
        <S.nickname>{nickname}</S.nickname>
      </S.TextWrapper>
    </S.CardContainer>
  )
}

export default DetailPlayList

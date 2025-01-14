import * as S from './PlayListSkeleton.module'

export const PlayListSkeleton = () => {
  return (
    <S.Container>
      <S.Wrapper>
        {[...Array(3)].map((_, index) => (
          <S.ItemContainer key={index}>
            <S.Thumbnail />
            <S.ItemContiner>
              <S.ItemAvatar>
                <S.SkeletonAvatar />
              </S.ItemAvatar>
              <S.ItemContent>
                <S.ItemTop />
                <S.ItemMid />
              </S.ItemContent>
            </S.ItemContiner>
          </S.ItemContainer>
        ))}
      </S.Wrapper>
    </S.Container>
  )
}

import Profile from '@/components/Profile/Profile'
import * as S from '@/pages/mypage/Mypage.styled'

export default function MyPageForOthers() {
  return (
    <S.Container>
      <S.HeaderBox>
        <S.ProfileBox>
          <Profile
            className="profile-img"
            size="8rem"
            userId="userIdtest"
            imageUrl="https://cdn.pixabay.com/photo/2023/03/11/20/24/animal-7845217_1280.jpg"
          />
          <S.ProfileDetailBox>
            <S.UserName>Floli</S.UserName>
            <S.SubscribeCount>3 구독자</S.SubscribeCount>
          </S.ProfileDetailBox>
        </S.ProfileBox>
        <S.ButtonBox></S.ButtonBox>
      </S.HeaderBox>
      <S.IntruductionBox>채널 소개글</S.IntruductionBox>

      <S.PlayListsBox></S.PlayListsBox>
    </S.Container>
  )
}

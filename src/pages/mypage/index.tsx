import { useNavigate } from 'react-router-dom'

import * as S from '@/pages/mypage/Mypage.styled'
import { Button } from '@/components/Button/Button'
import Profile from '@/components/Profile/Profile'
import { ROUTER_PATH } from '@/constants/constant'

export const Mypage = () => {
  const navigate = useNavigate()

  const handleEditProfileClick = () => {
    navigate(ROUTER_PATH.ProfileEdit)
  }

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
        <S.ButtonBox>
          <Button
            bordertype="기본"
            width="20rem"
            onClick={handleEditProfileClick}>
            프로필 수정
          </Button>
        </S.ButtonBox>
      </S.HeaderBox>
      <S.IntruductionBox>채널 소개글</S.IntruductionBox>
      <S.SeparatingBox>
        <S.ShowTypes>저장된 플리</S.ShowTypes>
        <S.ShowTypes>좋아요</S.ShowTypes>
      </S.SeparatingBox>
      <S.PlayListsBox></S.PlayListsBox>
    </S.Container>
  )
}

import { useNavigate } from 'react-router-dom'

import * as S from '@/pages/mypage/Mypage.styled'
import { Button } from '@/components/Button/Button'
import Profile from '@/components/Profile/Profile'
import { ROUTER_PATH } from '@/constants/constant'
import { useQuery } from '@tanstack/react-query'
import { userInfoGet } from '@/apis/userInfoApi'
import Loading from '@/components/LoadingSpinner/Loading'
import { useAuthStore } from '@/store/useAuthStore'
import { useState } from 'react'
import MyPageLikes from '@/components/MyPageType/MyPageLikes'
import SignOutButton from '@/components/SignOut/SignOutButton'

export const Mypage = () => {
  const [type, setType] = useState('like')

  const { user } = useAuthStore()

  const navigate = useNavigate()

  const handleEditProfileClick = () => {
    navigate(ROUTER_PATH.ProfileEdit)
  }

  const { isPending, data } = useQuery({
    queryKey: ['userInfo', user?.id],
    queryFn: () => userInfoGet(user?.id),
    enabled: !!user?.id
  })

  if (isPending) return <Loading />

  if (!data || data.length === 0) {
    return <S.NotFound>프로필 데이터가 존재하지 않습니다.</S.NotFound>
  }

  return (
    <>
      <S.Container>
        <S.HeaderBox>
          <S.ProfileBox>
            <Profile
              className="profile-img"
              size="8rem"
              userId="userIdtest"
              imageUrl={data[0].profile_img}
              disabledLink={true}
            />
            <S.ProfileDetailBox>
              <S.UserName>{data[0].nickname}</S.UserName>
              <S.SubscribeCount>{data[0].subsc_count} 구독자</S.SubscribeCount>
            </S.ProfileDetailBox>
          </S.ProfileBox>
          <S.ButtonBox>
            <Button
              bordertype="기본"
              width="20rem"
              onClick={handleEditProfileClick}>
              프로필 수정
            </Button>
            <SignOutButton />
          </S.ButtonBox>
        </S.HeaderBox>
        <S.IntruductionBox>{data[0].introduction}</S.IntruductionBox>
        <S.SeparatingBox>
          <S.ShowTypes
            onClick={() => setType('like')}
            isActive={type === 'like'}>
            좋아요
          </S.ShowTypes>
          <S.ShowTypes
            onClick={() => setType('save')}
            isActive={type === 'save'}>
            저장된 플리
          </S.ShowTypes>
        </S.SeparatingBox>
      </S.Container>
      <S.PlayListsBox>
        {type === 'like' ? <MyPageLikes /> : 'nothing'}
      </S.PlayListsBox>
    </>
  )
}

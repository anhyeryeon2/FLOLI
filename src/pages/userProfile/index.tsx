import { userInfoGet } from '@/apis/userInfoApi'
import UserProfileList from '@/component/MyPageType/UserProfileList'
import Profile from '@/component/Profile/Profile'
import * as S from '@/pages/mypage/Mypage.styled'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export function UserProfile() {
  const { userId } = useParams<{ userId: string }>()

  const { data } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => userInfoGet(userId)
  })

  return (
    <S.Container>
      <S.HeaderBox>
        <S.ProfileBox>
          <Profile
            className="profile-img"
            size="8rem"
            userId="userIdtest"
            imageUrl={data?.[0]?.profile_img}
          />
          <S.ProfileDetailBox>
            <S.UserName>{data?.[0]?.nickname}</S.UserName>
            <S.SubscribeCount>{data?.[0]?.subsc_count} 구독자</S.SubscribeCount>
          </S.ProfileDetailBox>
        </S.ProfileBox>
        <S.ButtonBox></S.ButtonBox>
      </S.HeaderBox>
      <S.IntruductionBox>{data?.[0]?.introduction}</S.IntruductionBox>

      <S.SeparatingBox>
        <S.ShowTypes>플레이리스트</S.ShowTypes>
      </S.SeparatingBox>

      <S.PlayListsBox>
        <UserProfileList />
      </S.PlayListsBox>
    </S.Container>
  )
}

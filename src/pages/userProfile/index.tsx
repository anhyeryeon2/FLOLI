import { userInfoGet } from '@/apis/userInfoApi'
import UserProfileList from '@/component/MyPageType/UserProfileList'
import { Button, Profile } from '@/component'
import * as S from '@/pages/mypage/Mypage.styled'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import useFetchUserSubscStatus from '@/hooks/useFetchUserSubscStatus'
import useToggleSubsc from '@/hooks/useToggleSubsc'
import { useToastMessageContext } from '@/providers/ToastMessageProvider'

export function UserProfile() {
  const { userId } = useParams<{ userId: string }>()
  const { user: currentUser } = useAuthStore()
  const { showToastMessage } = useToastMessageContext()

  const { data, isPending, isError } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => userInfoGet(userId)
  })

  const { data: isSubsc } = useFetchUserSubscStatus(
    currentUser!.id,
    data?.[0].id
  )

  const { mutate: toggleSubscMutate, isPending: isToggleSubscPending } =
    useToggleSubsc()

  const handleSubscClick = () => {
    const props = {
      currentUserId: currentUser!.id,
      subscribedUserId: data?.[0].id
    }
    toggleSubscMutate(props, {
      onError: () => {
        showToastMessage({
          message:
            '구독에 실패하였습니다. 새로고침 이후에도 문제가 지속될 경우 관리자에 문의해 주세요.',
          type: 'error'
        })
      }
    })
  }

  if (isPending) {
    return <div>잠시만 기다려주세요!</div>
  }
  if (isError) {
    return <div>에러가 발생했어요...</div>
  }

  return (
    <S.Container>
      <S.HeaderBoxForOther>
        <S.ProfileBox>
          <Profile
            className="profile-img"
            size="8rem"
            userId="userIdtest"
            imageUrl={data?.[0]?.profile_img}
            disabledLink={true}
          />
          <S.ProfileDetailBox>
            <S.UserName>{data?.[0]?.nickname}</S.UserName>
            <S.IntruductionBox>{data?.[0]?.introduction}</S.IntruductionBox>
            <S.SubscribeCount>{data?.[0]?.subsc_count} 구독자</S.SubscribeCount>
            {currentUser!.id !== data?.[0].id &&
              (isSubsc ? (
                <Button
                  type="button"
                  className="subsc-cancel"
                  onClick={handleSubscClick}
                  disabled={isToggleSubscPending}>
                  구독 취소
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubscClick}
                  disabled={isToggleSubscPending}>
                  구독
                </Button>
              ))}
          </S.ProfileDetailBox>
        </S.ProfileBox>
      </S.HeaderBoxForOther>

      <S.SeparatingBox>
        <S.PlayListBoxForOther>
          {data?.[0]?.nickname} 님의 플레이리스트
        </S.PlayListBoxForOther>
      </S.SeparatingBox>

      <S.PlayListsBox>
        <UserProfileList />
      </S.PlayListsBox>
    </S.Container>
  )
}

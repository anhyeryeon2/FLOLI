import { SetStateAction, useRef, useEffect } from 'react'
import * as S from './SubscribeList.module'
import { useDragScroll } from '@/hooks/useDragScroll'
import { getSubscribe } from '@/apis/subscribe'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { SubscribeType } from '@/types/subscribe'
import { Loading } from '@/component'
import { useState } from 'react'
import SubscriptionListModal from './SubscriptionListModal'
import { useToastMessageContext } from '@/providers/ToastMessageProvider'

interface Props {
  setUserId: React.Dispatch<SetStateAction<string>>
  setSubcribeDetail: React.Dispatch<SetStateAction<boolean>>
}

const SubscribeList = ({ setUserId, setSubcribeDetail }: Props) => {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const { showToastMessage } = useToastMessageContext()
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()

  const {
    data: subscribeList,
    isError,
    isLoading
  } = useQuery<SubscribeType[]>({
    queryKey: ['subscribeList'],
    queryFn: () => getSubscribe(),
    staleTime: 1000 * 60
  })

  const { onMouseDown, onTouchStart, onDragEnd, isDrag, onThrottleDragMove } =
    useDragScroll(scrollRef)

  const handleSubscribeClick = (userId: string) => {
    setSubcribeDetail(true)
    setUserId(userId)
  }

  const handleSubscribeListOpen = () => {
    setIsOpen(true)
  }

  useEffect(() => {
    if (isError) {
      showToastMessage({
        message: '에러가 발생하여 구독자 정보를 가져오지 못하였습니다..',
        type: 'error'
      })
    }
  }, [isError, showToastMessage])
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['subscribeList'] })
  }, [subscribeList])

  if (isLoading) <Loading />

  return (
    <S.SubscribeContainer>
      <S.SubscribeListContainer
        ref={scrollRef}
        onMouseDown={onMouseDown} // 마우스 클릭 시
        onMouseUp={onDragEnd} // 마우스 클릭을 뗀 후
        onMouseLeave={onDragEnd} // 마우스가 해당 요소 영역을 벗어났을 때
        onMouseMove={isDrag ? onThrottleDragMove : undefined} // 마우스가 움직일 때
        onTouchStart={onTouchStart} // 터치 시작 시
        onTouchEnd={onDragEnd} // 터치 종료 시
        onTouchMove={isDrag ? onThrottleDragMove : undefined} // 터치 이동 시
      >
        {subscribeList && subscribeList.length > 0 ? (
          subscribeList?.map(subscribe => (
            <S.SubscribeListItem
              key={subscribe.user_id}
              onClick={() =>
                handleSubscribeClick(subscribe.subscribed_user_id)
              }>
              <S.SubscribeItem>
                <S.SubscribeAvatar
                  src={subscribe.user_profile_image}
                  alt="구독한 프로필 이미지"
                />
              </S.SubscribeItem>
            </S.SubscribeListItem>
          ))
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            구독한 사람이 없습니다.
          </div>
        )}
      </S.SubscribeListContainer>
      <S.SubscribeAllList onClick={handleSubscribeListOpen}>
        전체
      </S.SubscribeAllList>
      <SubscriptionListModal
        isOpen={isOpen}
        subscribeList={subscribeList}
        setIsOpen={setIsOpen}
      />
    </S.SubscribeContainer>
  )
}

export default SubscribeList

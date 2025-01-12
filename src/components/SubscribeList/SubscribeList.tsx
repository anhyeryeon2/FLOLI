import { SetStateAction, useRef } from 'react'
import * as S from './SubscribeList.module'
import { useDragScroll } from '@/hooks/useDragScroll'
import { getSubscribe } from '@/apis/subscribe'
import { useQuery } from '@tanstack/react-query'
import { SubscribeType } from '@/types/subscribe'
import Loading from '../LoadingSpinner/Loading'
import { useState } from 'react'
import SubscriptionListModal from './SubscriptionListModal'

interface Props {
  setUserId: React.Dispatch<SetStateAction<string>>
}

const SubscribeList = ({ setUserId }: Props) => {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const [isOpen, setIsOpen] = useState(false)
  const {
    data: subscribeList,
    isError,
    isLoading
  } = useQuery<SubscribeType[]>({
    queryKey: ['subscribeList'],
    queryFn: () => getSubscribe(),
    staleTime: 1000 * 60
  })

  const { onDragStart, onDragEnd, isDrag, onThrottleDragMove } =
    useDragScroll(scrollRef)

  const handleSubscribeClick = (userId: string) => {
    setUserId(userId)
  }

  const handleSubscribeListOpen = () => {
    setIsOpen(true)
  }

  if (isLoading) <Loading />
  if (isError) <div>구독자 목록을 가져오지 못했습니다.</div>

  return (
    <S.SubscribeContainer>
      <S.SubscribeListContainer
        ref={scrollRef}
        onMouseDown={onDragStart} // 마우스 클릭 시
        onMouseUp={onDragEnd} // 마우스 클릭을 뗀 후
        onMouseLeave={onDragEnd} //마우스가 해당 요소 영역을 벗어낫을 때
        onMouseMove={isDrag ? onThrottleDragMove : undefined} //마우스가 움직일때
      >
        {subscribeList?.map(subscribe => (
          <S.SubscribeListItem
            key={subscribe.user_id}
            onClick={() => handleSubscribeClick(subscribe.subscriber_id)}>
            <S.SubscribeItem>
              <S.SubscribeAvatar
                src={subscribe.user_profile_image}
                alt="구독한 프로필 이미지"
              />
            </S.SubscribeItem>
          </S.SubscribeListItem>
        ))}
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

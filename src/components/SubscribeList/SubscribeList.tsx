import { useRef } from 'react'
import * as S from './SubscribeList.module'
import img from '../../assets/test.webp'
import { useDragScroll } from '@/hooks/useDragScroll'
const data = [
  {
    user_id: 'p5o4n3m2-l1k0j9-i8h7g6-f5e4d3c2b1a0',
    email: 'janedoe@example.com',
    nickname: 'JaneDoe456',
    created_at: '2025-02-01T08:00:00Z',
    updated_at: '2025-02-15T14:30:00Z',
    profile_img_path: '../../assets/test.webp',
    password: 'hashedpassword456',
    introduction: 'Frontend developer and designer.',
    subsc_count: 10,
    subscription_status: 'canceled', // 구독 취소
    subscription_plan: 'basic', // 기본 플랜
    subscription_start_date: '2025-01-15T12:00:00Z',
    subscription_end_date: '2025-07-15T23:59:59Z',
    last_payment_date: '2025-06-15T12:00:00Z'
  },
  {
    user_id: 'z1x2c3v4-b5n6-m7a8-s9d0-f1g2h3j4k5l6',
    email: 'bobjones@example.com',
    nickname: 'BobTheBuilder',
    created_at: '2025-03-01T08:00:00Z',
    updated_at: '2025-03-20T09:00:00Z',
    profile_img_path: '/assets/img/profile/default_profile.webp',
    password: 'hashedpassword789',
    introduction: null,
    subsc_count: 0,
    subscription_status: 'expired', // 구독 만료
    subscription_plan: 'free', // 무료 플랜
    subscription_start_date: '2025-03-01T12:00:00Z',
    subscription_end_date: '2025-03-31T23:59:59Z',
    last_payment_date: null
  },
  {
    user_id: '23',
    email: 'bobjones@example.com',
    nickname: 'BobTheBuilder',
    created_at: '2025-03-01T08:00:00Z',
    updated_at: '2025-03-20T09:00:00Z',
    profile_img_path: '/assets/img/profile/default_profile.webp',
    password: 'hashedpassword789',
    introduction: null,
    subsc_count: 0,
    subscription_status: 'expired', // 구독 만료
    subscription_plan: 'free', // 무료 플랜
    subscription_start_date: '2025-03-01T12:00:00Z',
    subscription_end_date: '2025-03-31T23:59:59Z',
    last_payment_date: null
  },
  {
    user_id: '10',
    email: 'bobjones@example.com',
    nickname: 'BobTheBuilder',
    created_at: '2025-03-01T08:00:00Z',
    updated_at: '2025-03-20T09:00:00Z',
    profile_img_path: '/assets/img/profile/default_profile.webp',
    password: 'hashedpassword789',
    introduction: null,
    subsc_count: 0,
    subscription_status: 'expired', // 구독 만료
    subscription_plan: 'free', // 무료 플랜
    subscription_start_date: '2025-03-01T12:00:00Z',
    subscription_end_date: '2025-03-31T23:59:59Z',
    last_payment_date: null
  },
  {
    user_id: '6',
    email: 'bobjones@example.com',
    nickname: 'BobTheBuilder',
    created_at: '2025-03-01T08:00:00Z',
    updated_at: '2025-03-20T09:00:00Z',
    profile_img_path: '/assets/img/profile/default_profile.webp',
    password: 'hashedpassword789',
    introduction: null,
    subsc_count: 0,
    subscription_status: 'expired', // 구독 만료
    subscription_plan: 'free', // 무료 플랜
    subscription_start_date: '2025-03-01T12:00:00Z',
    subscription_end_date: '2025-03-31T23:59:59Z',
    last_payment_date: null
  },
  {
    user_id: '5',
    email: 'bobjones@example.com',
    nickname: 'BobTheBuilder',
    created_at: '2025-03-01T08:00:00Z',
    updated_at: '2025-03-20T09:00:00Z',
    profile_img_path: '../../assets/test.webp',
    password: 'hashedpassword789',
    introduction: null,
    subsc_count: 0,
    subscription_status: 'expired', // 구독 만료
    subscription_plan: 'free', // 무료 플랜
    subscription_start_date: '2025-03-01T12:00:00Z',
    subscription_end_date: '2025-03-31T23:59:59Z',
    last_payment_date: null
  },
  {
    user_id: '4',
    email: 'bobjones@example.com',
    nickname: 'BobTheBuilder',
    created_at: '2025-03-01T08:00:00Z',
    updated_at: '2025-03-20T09:00:00Z',
    profile_img_path: '/assets/img/profile/default_profile.webp',
    password: 'hashedpassword789',
    introduction: null,
    subsc_count: 0,
    subscription_status: 'expired', // 구독 만료
    subscription_plan: 'free', // 무료 플랜
    subscription_start_date: '2025-03-01T12:00:00Z',
    subscription_end_date: '2025-03-31T23:59:59Z',
    last_payment_date: null
  },
  {
    user_id: '3',
    email: 'bobjones@example.com',
    nickname: 'BobTheBuilder',
    created_at: '2025-03-01T08:00:00Z',
    updated_at: '2025-03-20T09:00:00Z',
    profile_img_path: '/assets/img/profile/default_profile.webp',
    password: 'hashedpassword789',
    introduction: null,
    subsc_count: 0,
    subscription_status: 'expired', // 구독 만료
    subscription_plan: 'free', // 무료 플랜
    subscription_start_date: '2025-03-01T12:00:00Z',
    subscription_end_date: '2025-03-31T23:59:59Z',
    last_payment_date: null
  },
  {
    user_id: '30',
    email: 'bobjones@example.com',
    nickname: 'BobTheBuilder',
    created_at: '2025-03-01T08:00:00Z',
    updated_at: '2025-03-20T09:00:00Z',
    profile_img_path: '/assets/img/profile/default_profile.webp',
    password: 'hashedpassword789',
    introduction: null,
    subsc_count: 0,
    subscription_status: 'expired', // 구독 만료
    subscription_plan: 'free', // 무료 플랜
    subscription_start_date: '2025-03-01T12:00:00Z',
    subscription_end_date: '2025-03-31T23:59:59Z',
    last_payment_date: null
  },
  {
    user_id: '2=399',
    email: 'bobjones@example.com',
    nickname: 'BobTheBuilder',
    created_at: '2025-03-01T08:00:00Z',
    updated_at: '2025-03-20T09:00:00Z',
    profile_img_path: '/assets/img/profile/default_profile.webp',
    password: 'hashedpassword789',
    introduction: null,
    subsc_count: 0,
    subscription_status: 'expired', // 구독 만료
    subscription_plan: 'free', // 무료 플랜
    subscription_start_date: '2025-03-01T12:00:00Z',
    subscription_end_date: '2025-03-31T23:59:59Z',
    last_payment_date: null
  },
  {
    user_id: '09',
    email: 'bobjones@example.com',
    nickname: 'BobTheBuilder',
    created_at: '2025-03-01T08:00:00Z',
    updated_at: '2025-03-20T09:00:00Z',
    profile_img_path: '/assets/img/profile/default_profile.webp',
    password: 'hashedpassword789',
    introduction: null,
    subsc_count: 0,
    subscription_status: 'expired', // 구독 만료
    subscription_plan: 'free', // 무료 플랜
    subscription_start_date: '2025-03-01T12:00:00Z',
    subscription_end_date: '2025-03-31T23:59:59Z',
    last_payment_date: null
  },
  {
    user_id: '60',
    email: 'bobjones@example.com',
    nickname: 'BobTheBuilder',
    created_at: '2025-03-01T08:00:00Z',
    updated_at: '2025-03-20T09:00:00Z',
    profile_img_path: '/assets/img/profile/default_profile.webp',
    password: 'hashedpassword789',
    introduction: null,
    subsc_count: 0,
    subscription_status: 'expired', // 구독 만료
    subscription_plan: 'free', // 무료 플랜
    subscription_start_date: '2025-03-01T12:00:00Z',
    subscription_end_date: '2025-03-31T23:59:59Z',
    last_payment_date: null
  },
  {
    user_id: '555',
    email: 'bobjones@example.com',
    nickname: 'BobTheBuilder',
    created_at: '2025-03-01T08:00:00Z',
    updated_at: '2025-03-20T09:00:00Z',
    profile_img_path: '/assets/img/profile/default_profile.webp',
    password: 'hashedpassword789',
    introduction: null,
    subsc_count: 0,
    subscription_status: 'expired', // 구독 만료
    subscription_plan: 'free', // 무료 플랜
    subscription_start_date: '2025-03-01T12:00:00Z',
    subscription_end_date: '2025-03-31T23:59:59Z',
    last_payment_date: null
  }
]

const SubscribeList = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const { onDragStart, onDragEnd, isDrag, onThrottleDragMove } =
    useDragScroll(scrollRef)

  return (
    <S.SubscribeContainer>
      <S.SubscribeListContainer
        ref={scrollRef}
        onMouseDown={onDragStart} // 마우스 클릭 시
        onMouseUp={onDragEnd} // 마우스 클릭을 뗀 후
        onMouseLeave={onDragEnd} //마우스가 해당 요소 영역을 벗어낫을 때
        onMouseMove={isDrag ? onThrottleDragMove : undefined} //마우스가 움직일때
      >
        {data.map(value => (
          <S.SubscribeListItem key={value.user_id}>
            <S.SubscribeItem>
              <S.SubscribeAvatar
                src={img}
                alt="구독한 프로필 이미지"
              />
            </S.SubscribeItem>
          </S.SubscribeListItem>
        ))}
      </S.SubscribeListContainer>
      <S.SubscribeAllList>전체</S.SubscribeAllList>
    </S.SubscribeContainer>
  )
}

export default SubscribeList

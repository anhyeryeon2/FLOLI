import { useState } from 'react'
import { IoHomeOutline, IoHomeSharp, IoAddCircle } from 'react-icons/io5'
import { IoIosAddCircleOutline } from 'react-icons/io'
import {
  MdOutlinePlaylistAddCheckCircle,
  MdPlaylistAddCheckCircle,
  MdOutlineSubscriptions,
  MdSubscriptions
} from 'react-icons/md'
import * as S from './Navbar.styled'
import { useAuthStore } from '@/store/useAuthStore'
import Profile from '../Profile/Profile'
import useUserInfo from '@/hooks/useUserInfo'
import { useSearchTermStore } from '@/store/useSearchTermStore'

export default function Navbar() {
  const { userinfo } = useUserInfo()
  const { user } = useAuthStore()
  const [active, setActive] = useState<string>('home')
  const setSearchTerm = useSearchTermStore(state => state.setSearchTerm)

  const handleClick = (icon: string) => {
    setSearchTerm('')
    setActive(icon)
  }

  return (
    <S.NavbarWrapper>
      <S.Menu>
        <S.MenuItem
          onClick={() => handleClick('home')}
          to="/">
          <S.Icon active={active === 'home'}>
            {active === 'home' ? <IoHomeSharp /> : <IoHomeOutline />}
          </S.Icon>
          <span>홈</span>
        </S.MenuItem>

        <S.MenuItem
          onClick={() => handleClick('subscribe')}
          to="/subscriptions">
          <S.Icon active={active === 'subscribe'}>
            {active === 'subscribe' ? (
              <MdSubscriptions />
            ) : (
              <MdOutlineSubscriptions />
            )}
          </S.Icon>
          <span>구독</span>
          {/* 플리추가  */}
        </S.MenuItem>
        <S.MenuItem
          onClick={() => handleClick('add')}
          to="/playlist/create"
          $isCenter>
          <S.Icon active={active === 'add'}>
            {active === 'add' ? (
              <IoAddCircle size={40} />
            ) : (
              <IoIosAddCircleOutline size={40} />
            )}
          </S.Icon>
        </S.MenuItem>
        {/* 내 플리 */}
        <S.MenuItem
          onClick={() => handleClick('mine')}
          to="/my-playlists">
          <S.Icon active={active === 'mine'}>
            {active === 'mine' ? (
              <MdPlaylistAddCheckCircle />
            ) : (
              <MdOutlinePlaylistAddCheckCircle />
            )}
          </S.Icon>
          <span>내 플리</span>
        </S.MenuItem>
        {/* 유저 프로필 사진 */}
        <S.MenuItem
          onClick={() => handleClick('mypage')}
          to="/mypage">
          {active === 'mypage' ? (
            <Profile
              imageUrl={
                userinfo
                  ? userinfo[0].profile_img
                  : 'https://vpxgcvxodypztnxelmqx.supabase.co/storage/v1/object/public/avatar/default_profile.png'
              }
              altText="profile"
              userId={user?.id || ''}
              size="xsmall"
              border="2px solid var(--color-black)"
              disabledLink={true}
            />
          ) : (
            <Profile
              imageUrl={
                userinfo
                  ? userinfo[0].profile_img
                  : 'https://vpxgcvxodypztnxelmqx.supabase.co/storage/v1/object/public/avatar/default_profile.png'
              }
              altText="profile"
              userId={user?.id || ''}
              size="xsmall"
              to="/mypage"
            />
          )}

          <span>라이브러리</span>
        </S.MenuItem>
      </S.Menu>
    </S.NavbarWrapper>
  )
}

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

export default function Navbar() {
  const [active, setActive] = useState<string>('home')

  const handleClick = (icon: string) => {
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
              <IoAddCircle size={48} />
            ) : (
              <IoIosAddCircleOutline size={48} />
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
        <S.MenuItem to="/mypage">
          <S.Icon>🧑</S.Icon>
          <span>라이브러리</span>
        </S.MenuItem>
      </S.Menu>
    </S.NavbarWrapper>
  )
}

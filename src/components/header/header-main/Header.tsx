import { IoIosSearch } from 'react-icons/io'
import * as S from './Header.styled'
import MainLogo from '@/assets/img/logo/floli.svg'
export default function Header() {
  return (
    <S.HeaderWrapper>
      <S.Logo src={MainLogo} />
      <S.SearchIcon>
        <IoIosSearch size={30} />
      </S.SearchIcon>
    </S.HeaderWrapper>
  )
}

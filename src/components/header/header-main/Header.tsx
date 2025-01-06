import { IoIosSearch } from 'react-icons/io'
import * as S from './Header.styled'
import MainLogo from '@/assets/img/logo/floli.svg'
import { IoChevronBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

type HeaderProps = {
  isBack?: boolean
}

export default function Header({ isBack }: HeaderProps) {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(-1)
  }

  return (
    <S.HeaderWrapper>
      {isBack ? (
        <button
          type="button"
          onClick={handleClick}>
          <IoChevronBack size="24" />
        </button>
      ) : (
        <S.Logo src={MainLogo} />
      )}
      <S.SearchIcon>
        <IoIosSearch size={24} />
      </S.SearchIcon>
    </S.HeaderWrapper>
  )
}

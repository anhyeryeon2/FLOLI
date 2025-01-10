import { IoIosSearch } from 'react-icons/io'
import * as S from './Header.styled'
import MainLogo from '@/assets/img/logo/floli.svg'
import { IoChevronBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { useModalFullStore } from '@/store/useModalFullStore'
import { useSearchTermStore } from '@/store/useSearchTermStore'

type HeaderProps = {
  isBack?: boolean
}

export default function Header({ isBack }: HeaderProps) {
  const navigate = useNavigate()
  const setModalFull = useModalFullStore(state => state.setModalState)
  const modalFull = useModalFullStore(state => state.state)
  const setModalSearch = useModalFullStore(state => state.setModalSearchState)
  const setSearchTerm = useSearchTermStore(state => state.setSearchTerm)
  const handleClick = () => {
    navigate(-1)
  }
  const handleModalFullOpen = () => {
    setModalFull(true)
    setModalSearch(true)
  }

  const handleNavgiate = () => {
    setSearchTerm('')
    navigate('/')
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
        <S.Logo
          src={MainLogo}
          onClick={handleNavgiate}
        />
      )}
      <S.SearchIcon>
        {modalFull ? (
          <input />
        ) : (
          <IoIosSearch
            size={24}
            onClick={handleModalFullOpen}
          />
        )}
      </S.SearchIcon>
    </S.HeaderWrapper>
  )
}

import { IoIosSearch } from 'react-icons/io'
import * as S from './Header.styled'
import MainLogo from '@/assets/img/logo/floli.svg'
import { IoChevronBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { useSearchTermStore } from '@/store/useSearchTermStore'
import { useSearchModalFullStore } from '@/store/useSearchModalFullStore'

type HeaderProps = {
  isBack?: boolean
}

export default function Header({ isBack }: HeaderProps) {
  const navigate = useNavigate()
  const setModalFull = useSearchModalFullStore(state => state.setModalState)
  const modalFull = useSearchModalFullStore(state => state.state)
  const setModalSearch = useSearchModalFullStore(
    state => state.setModalSearchState
  )
  const setSearchTerm = useSearchTermStore(state => state.setSearchTerm)

  const handleClick = () => {
    setModalSearch(false)
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

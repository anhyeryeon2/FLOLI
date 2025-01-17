import { IoChevronBack } from 'react-icons/io5'
import * as S from './Header.styled'
import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useSearchTermListStore,
  useSearchTermStore
} from '@/store/useSearchTermStore'
import { useSearchModalFullStore } from '@/store/useSearchModalFullStore'

interface HeaderSubProps {
  children?: ReactNode
  onClick?: () => void
}

export default function HeaderSub({ children, onClick }: HeaderSubProps) {
  const navigate = useNavigate()
  const modalSearchState = useSearchModalFullStore(state => state.searchState)
  const setSearchTerm = useSearchTermStore(state => state.setSearchTerm)
  const setModalFull = useSearchModalFullStore(state => state.setModalState)
  const searchTerm = useSearchTermStore(state => state.searchTerm)
  const addSearchTerm = useSearchTermListStore(state => state.addSearchTerm)

  const handleClick = () => {
    navigate(-1)
  }
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setModalFull(false) // 모달 닫기
      const searchValue = searchTerm
      setSearchTerm(searchValue) // 선택된 검색어 설정
      addSearchTerm(searchValue) // 최근 검색어 목록에 추가
      navigate(`/search?search=${searchValue}`, { state: searchValue }) // navigate로 검색어와 함께 이동
    }
  }
  return (
    <S.HeaderWrapper>
      <S.Logo onClick={onClick ? onClick : handleClick}>
        <IoChevronBack size="24" />
      </S.Logo>
      {modalSearchState ? (
        <S.Headeritem>
          <S.HeaderInput
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <S.SearchIcon />
        </S.Headeritem>
      ) : (
        children && <S.Content>{children}</S.Content>
      )}
    </S.HeaderWrapper>
  )
}

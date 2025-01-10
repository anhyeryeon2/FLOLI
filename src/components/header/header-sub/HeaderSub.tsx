import { IoChevronBack } from 'react-icons/io5'
import * as S from './Header.styled'
import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useModalFullStore } from '@/store/useModalFullStore'
import { useSearchTermStore } from '@/store/useSearchTermStore'

//컨텐츠 내용과 이벤트는 props로 넣어주세요!

interface HeaderSubProps {
  children?: ReactNode
  onClick?: () => void
}

export default function HeaderSub({ children, onClick }: HeaderSubProps) {
  const navigate = useNavigate()
  const modalSearchState = useModalFullStore(state => state.searchState)
  const setSearchTerm = useSearchTermStore(state => state.setSearchTerm)

  const handleClick = () => {
    navigate(-1)
  }

  return (
    <S.HeaderWrapper>
      <S.Logo onClick={onClick ? onClick : handleClick}>
        <IoChevronBack size="24" />
      </S.Logo>
      {modalSearchState ? (
        <>
          <S.HeaderInput onChange={e => setSearchTerm(e.target.value)} />
          <S.SearchIcon />
        </>
      ) : (
        children && <S.Content>{children}</S.Content>
      )}
    </S.HeaderWrapper>
  )
}

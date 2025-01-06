import * as S from './OptionPopUp.module'
import { RiUserUnfollowLine } from 'react-icons/ri'
import { MdPlaylistAdd } from 'react-icons/md'

export const OpitonPopup = () => {
  const options = [
    { id: '1', name: '구독취소', icon: <RiUserUnfollowLine /> },
    { id: '2', name: '저장', icon: <MdPlaylistAdd /> }
  ]
  return (
    <S.OptionPopupContainer>
      {options.map(value => (
        <S.OptionPopupItem key={value.id}>
          <span>{value.icon}</span>
          <span>{value.name}</span>
        </S.OptionPopupItem>
      ))}
    </S.OptionPopupContainer>
  )
}

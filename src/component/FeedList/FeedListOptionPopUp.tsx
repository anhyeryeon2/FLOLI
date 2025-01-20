import { Modal } from '@/component'
import { useToastMessageContext } from '@/providers/ToastMessageProvider'
import { MdPlaylistAdd } from 'react-icons/md'
import { FaShareAlt } from 'react-icons/fa'
import { MdSubscriptions } from 'react-icons/md'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBookmarks } from '@/apis/feed/books'
import * as S from './FeedList.style'
import { subscribeCreate } from '@/apis/subscribe/subscribeCreate'
import { SetStateAction, useEffect, useState } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import useBookmarksMututation from '@/hooks/useBookmarksMututation'
import useSubscribeCreate from '@/hooks/useSubscribeCreate'

interface FeedListOption {
  isOpen: boolean
  handleOptionsPopState: () => void
  id: string
  playlist_user_id: string
  setIsOpen: React.Dispatch<SetStateAction<boolean>>
}

const FeedListOptionPopUp = ({
  isOpen,
  handleOptionsPopState,
  id,
  playlist_user_id,
  setIsOpen
}: FeedListOption) => {
  const { showToastMessage } = useToastMessageContext()
  const [isDisabled, setIsDisabled] = useState(false)

  const { user: currentUser } = useAuthStore()

  const { mutate: updateMutate } = useBookmarksMututation()

  const { mutate: subscribeCreateMutate } = useSubscribeCreate()
  const handleSubscribeCreate = (playListId: string) => {
    setIsOpen(false)
    subscribeCreateMutate(playListId)
  }
  const handlePlayListBookmarks = (id: string) => {
    setIsOpen(false)
    updateMutate(id)
  }

  const handleSharePlaylist = (id: string) => {
    setIsOpen(false)

    const shareUrl = `${window.location.origin}/view/${id}`
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        showToastMessage({
          message: `플레이리스트 URL이 클립보드에 복사되었습니다!`,
          type: 'success'
        })
      })
      .catch(err => {
        console.error(err)
        showToastMessage({
          message: `URL 복사에 실패하였습니다.`,
          type: 'error'
        })
      })
  }

  useEffect(() => {
    if (playlist_user_id === currentUser?.id) setIsDisabled(true)
  }, [currentUser?.id, playlist_user_id])

  return (
    <>
      <Modal
        id="FeedListModal"
        isOpen={isOpen}
        closeModal={handleOptionsPopState}
        className="feedoption"
        isBg={true}>
        <S.ModalWrapper
          key={id}
          id={id}>
          <S.ModalContentContainer
            isDisabled={isDisabled}
            onClick={() => handleSubscribeCreate(playlist_user_id)}>
            <MdSubscriptions size={24} />
            <p>
              {playlist_user_id !== currentUser?.id
                ? '구독하기'
                : '구독할 수 없습니다'}
            </p>
          </S.ModalContentContainer>
          <S.ModalContentSubContainer
            onClick={() => handlePlayListBookmarks(id)}>
            <MdPlaylistAdd size={24} />
            <p>저장</p>
          </S.ModalContentSubContainer>
          <S.ModalContentSubContainer onClick={() => handleSharePlaylist(id)}>
            <FaShareAlt size={24} />
            <p>공유</p>
          </S.ModalContentSubContainer>
        </S.ModalWrapper>
      </Modal>
    </>
  )
}

export default FeedListOptionPopUp

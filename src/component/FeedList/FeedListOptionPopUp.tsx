import { Modal } from '@/component'
import { useToastMessageContext } from '@/providers/ToastMessageProvider'
import { MdPlaylistAdd } from 'react-icons/md'
import { FaShareAlt } from 'react-icons/fa'
import { MdSubscriptions } from 'react-icons/md'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBookmarks } from '@/apis/feed/books'
import * as S from './FeedList.style'
import { subscribeCreate } from '@/apis/subscribe/subscribeCreate'
import {
  Profiler,
  ProfilerOnRenderCallback,
  SetStateAction,
  memo,
  useCallback,
  useEffect,
  useState
} from 'react'
import { useAuthStore } from '@/store/useAuthStore'

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
  const queryClient = useQueryClient()
  const [isDisabled, setIsDisabled] = useState(false)

  const { user: currentUser } = useAuthStore()

  const { mutate: updateMutate } = useMutation({
    mutationFn: (id: string) => updateBookmarks(id),
    onSuccess: () => {
      showToastMessage({
        message: `나의 플레이리스트에 추가되었습니다.!! `,
        type: 'success'
      })
      queryClient.invalidateQueries({ queryKey: ['playList'] })
    },
    onError: () =>
      showToastMessage({
        message: `나의 플레이리스트 추가에 실패하였습니다.`,
        type: 'error'
      })
  })

  const { mutate: subscribeCreateMutate } = useMutation({
    mutationFn: (id: string) => subscribeCreate(id),
    onSuccess: () => {
      showToastMessage({
        message: `구독을 성공하였습니다.!! `,
        type: 'success'
      })
      queryClient.invalidateQueries({ queryKey: ['playList'] })
    },
    onError: () =>
      showToastMessage({
        message: `구독을 실패하였습니다.`,
        type: 'error'
      })
  })

  const handleSubscribeCreate = useCallback(
    (playListId: string) => {
      setIsOpen(false)
      subscribeCreateMutate(playListId)
    },
    [subscribeCreateMutate]
  )
  const handlePlayListBookmarks = useCallback(
    (id: string) => {
      setIsOpen(false)
      updateMutate(id)
    },
    [updateMutate]
  )

  const handleSharePlaylist = useCallback(
    (id: string) => {
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
    },
    [setIsOpen, showToastMessage]
  )

  useEffect(() => {
    if (playlist_user_id === currentUser?.id) setIsDisabled(true)
  }, [currentUser?.id, playlist_user_id])

  const onRenderCallback: ProfilerOnRenderCallback = (
    id, // 방금 커밋된 Profiler 트리의 "id"
    phase, // "mount" (트리가 방금 마운트가 된 경우) 혹은 "update"(트리가 리렌더링된 경우)
    actualDuration, // 커밋된 업데이트를 렌더링하는데 걸린 시간
    baseDuration, // 메모이제이션 없이 하위 트리 전체를 렌더링하는데 걸리는 예상시간
    startTime, // React가 언제 해당 업데이트를 렌더링하기 시작했는지
    commitTime // React가 해당 업데이트를 언제 커밋했는지
    // interactions,
  ) => {
    console.log('[Feedoption] Info]', {
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime
      // interactions,
    })
  }

  return (
    <>
      <Profiler
        onRender={onRenderCallback}
        id="feedListOption">
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
      </Profiler>
    </>
  )
}

export default memo(FeedListOptionPopUp)

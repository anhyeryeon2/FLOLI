import { ModalFull } from '@/component'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteSubscribe } from '@/apis/subscribe/subscribeDelete'
import { SubscribeType } from '@/types/subscribe'
import { SetStateAction } from 'react'
import * as S from './SubscribeList.module'
import { RiUserUnfollowLine } from 'react-icons/ri'
import { useToast } from '@/hooks/useToast'

interface SubscriptionListModalProps {
  isOpen: boolean
  subscribeList: SubscribeType[] | undefined
  setIsOpen: React.Dispatch<SetStateAction<boolean>>
}

const SubscriptionListModal = ({
  isOpen,
  subscribeList,
  setIsOpen
}: SubscriptionListModalProps) => {
  const queryClient = useQueryClient()
  const { handleToastError, handleToastSuccess } = useToast()

  const { mutate } = useMutation({
    mutationFn: async (subscribe_id: string) => {
      const res = await deleteSubscribe(subscribe_id)
      return res.data
    },
    onSuccess: () => {
      handleToastSuccess(`구독을 취소하였습니다. `)
      queryClient.invalidateQueries({ queryKey: ['subscribeList'] })
    },
    onError: () => {
      handleToastError(`예상치 못한 이유로 구독을 취소하지 못하였습니다.`)
    }
  })
  const handleMoalFullClose = () => {
    setIsOpen(false)
  }
  const handleSubscribeDelete = (id: string) => {
    mutate(id)
  }
  return (
    <>
      <ModalFull
        id={'32'}
        closeModal={handleMoalFullClose}
        isOpen={isOpen}
        pageTitle={'모든 구독 목록'}>
        <S.SubscribeAllLength>
          총 {subscribeList && subscribeList.length}명
        </S.SubscribeAllLength>
        {subscribeList && subscribeList.length > 0 ? (
          subscribeList?.map(subscribe => (
            <S.ModalfullContent key={subscribe.subscriber_id}>
              <S.SubscribeAvatar
                src={subscribe.user_profile_image}
                alt="구독한 프로필 이미지"
              />
              <span>{subscribe.user_nickname}</span>
              <S.ModalfullClickContent
                onClick={() =>
                  handleSubscribeDelete(subscribe.subscribed_user_id)
                }>
                <RiUserUnfollowLine size={30} />
              </S.ModalfullClickContent>
            </S.ModalfullContent>
          ))
        ) : (
          <div
            style={{ display: 'flex', justifyContent: 'center', color: 'red' }}>
            구독 목록이 없습니다.
          </div>
        )}
      </ModalFull>
    </>
  )
}

export default SubscriptionListModal

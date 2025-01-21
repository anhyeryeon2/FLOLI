import { ModalFull } from '@/component'
import { SubscribeType } from '@/types/subscribe'
import { SetStateAction, useCallback } from 'react'
import * as S from './SubscribeList.module'
import { RiUserUnfollowLine } from 'react-icons/ri'
import useDeleteSubscribe from '@/hooks/useDeleteSubscribe'

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
  const { mutate } = useDeleteSubscribe()

  const handleMoalFullClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleSubscribeDelete = useCallback(
    (id: string) => {
      mutate(id)
    },
    [mutate]
  )

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
              <S.NickNameSpan>{subscribe.user_nickname}</S.NickNameSpan>
              <S.ModalfullClickContent
                onClick={() =>
                  handleSubscribeDelete(subscribe.subscribed_user_id)
                }>
                <RiUserUnfollowLine size={20} />
              </S.ModalfullClickContent>
            </S.ModalfullContent>
          ))
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            구독 목록이 없습니다.
          </div>
        )}
      </ModalFull>
    </>
  )
}

export default SubscriptionListModal

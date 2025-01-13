import AllSubscribePlayLists from '@/component/SubscribeList/AllSubscribePlayLists'
import SubscribeList from '@/component/SubscribeList/SubscribeList'
import SubscribePlayLists from '@/component/SubscribeList/SubscribePlayLists'
import { useState } from 'react'

export function Subscriptions() {
  const [userId, setUserId] = useState<string>('')
  const [subscribeDetail, setSubcribeDetail] = useState(false)
  return (
    <>
      <SubscribeList
        setUserId={setUserId}
        setSubcribeDetail={setSubcribeDetail}
      />
      {!userId && !subscribeDetail ? (
        <AllSubscribePlayLists />
      ) : (
        <SubscribePlayLists userId={userId} />
      )}
    </>
  )
}

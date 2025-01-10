import AllSubscribePlayLists from '@/components/SubscribeList/AllSubscribePlayLists'
import SubscribeList from '@/components/SubscribeList/SubscribeList'
import SubscribePlayLists from '@/components/SubscribeList/SubscribePlayLists'
import { useState } from 'react'

export function Subscriptions() {
  const [userId, setUserId] = useState<string>('')

  return (
    <>
      <SubscribeList setUserId={setUserId} />
      {!userId ? (
        <AllSubscribePlayLists />
      ) : (
        <SubscribePlayLists userId={userId} />
      )}
    </>
  )
}

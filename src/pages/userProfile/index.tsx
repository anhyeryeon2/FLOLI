import { useParams } from 'react-router-dom'

export function UserProfile() {
  const { userId } = useParams()

  return (
    <div>
      <h1>사용자 프로필</h1>
      <p>선택한 사용자 ID: {userId}</p>
    </div>
  )
}

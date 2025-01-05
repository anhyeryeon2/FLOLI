import { ProfileButtonProps } from '@/types/profile'
import * as S from './Profile.styles'

/* 사용예시1 
      <Profile
        image={} (넣을 이미지가 있을때, 명시안해주면 기본프로필)
        altText="User Profile"
        userId= @ {userId값 넣어야 url 지정돼요}
        size="large"
      />

   사용예시2
      <Profile 
        image={}
        userId=@
        size="100px" // custom size
      />

      - 큰 사이즈 프로필: large
      - 중간 사이즈 프로필: medium
      - 작은 사이즈 프로필: small  이외에 커스텀 가능 => 모바일 설정을 경험해 본 적이 없어, 추후 필요시 styles 속성에서 조정부탁드립니다.
*/

const Profile = ({
  imageUrl,
  altText = 'Profile',
  userId,
  className,
  size = 'medium'
}: ProfileButtonProps) => {
  return (
    <S.ProfileButtonWrapper
      to={`/profile/${userId}`}
      size={size}
      className={className}>
      <S.ProfileImage
        src={imageUrl}
        alt={altText}
      />
    </S.ProfileButtonWrapper>
  )
}

export default Profile

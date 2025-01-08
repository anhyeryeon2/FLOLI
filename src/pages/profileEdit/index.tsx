import { useRef, useState } from 'react'
import * as S from './EditProfile.styled'
import Profile from '@/components/Profile/Profile'
import { Button } from '@/components/Button/Button'
import img from '@/assets/img/profile/default_profile.png'
import Input from '@/components/Input/Input'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { userInfoGet, UserProfileEdit } from '@/apis/userInfoApi'
import { useAuthStore } from '@/store/useAuthStore'

type FormData = {
  nickname: string
  introduction: string
}

interface EditProfile {
  image?: FileList | null
  nickname?: string
  intro?: string
}

export function ProfileEdit() {
  const { user } = useAuthStore()
  const userId = user?.id
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState<string | null>(null)

  // get
  const { data: userinfo } = useQuery({
    queryKey: ['userInfo', user?.id],
    queryFn: () => userInfoGet(user?.id),
    enabled: !!user?.id
  })
  // edit
  const { mutate } = useMutation({
    mutationFn: ({ data, id }: { data: EditProfile; id: string }) =>
      UserProfileEdit(data, id)
  })

  //Form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: userinfo
      ? {
          nickname: userinfo[0].nickname,
          introduction: userinfo[0].introduction
        }
      : {}
  })

  //File 관련
  function handleClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  //Submit
  function onSubmit(data: EditProfile) {
    if (!userId) {
      console.error('유저 id 정보가 필요합니다')
      return
    }

    const editProfileData = {
      ...data,
      image: fileInputRef.current?.files
    }
    mutate({ data: editProfileData, id: userId })
    console.log('submit했음')
    console.log(image)
  }

  return (
    <>
      <S.ContentContainer onSubmit={handleSubmit(onSubmit)}>
        <S.ProfileImageContainer>
          {image ? (
            <Profile
              className="profile-img"
              size="15rem"
              userId="userIdtest"
              imageUrl={image}
            />
          ) : (
            <Profile
              className="profile-img"
              size="15rem"
              userId="userIdtest"
              imageUrl={img}
            />
          )}

          <Button
            bordertype="기본"
            width="16rem"
            type="submit"
            onClick={handleClick}>
            프로필 사진 수정
          </Button>

          <S.FileInput
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
          />
        </S.ProfileImageContainer>

        <S.Label htmlFor="nickname">닉네임</S.Label>
        <S.ContentBox>
          <Input
            id="nickname"
            {...register('nickname', { required: '닉네임을 입력력해주세요.' })}
            placeholder="닉네임을 입력해주세요"
          />
          <Button
            width="9rem"
            bordertype="기본"
            type="submit">
            확인
          </Button>
          {errors.nickname && (
            <S.Errormsg>{errors.nickname.message}</S.Errormsg>
          )}
        </S.ContentBox>

        <S.Label htmlFor="introduction">소개글</S.Label>
        <S.ContentBox>
          <Input
            id="introduction"
            {...register('introduction', {
              required: '소개 글을 입력해주세요.'
            })}
            placeholder="소개 글을 입력해주세요"
          />
          <Button
            width="9rem"
            bordertype="기본"
            type="submit">
            확인
          </Button>
          {errors.introduction && (
            <S.Errormsg>{errors.introduction.message}</S.Errormsg>
          )}
        </S.ContentBox>
      </S.ContentContainer>
    </>
  )
}

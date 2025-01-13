import { useEffect, useRef, useState } from 'react'
import * as S from './EditProfile.styled'
import Profile from '@/components/Profile/Profile'
import { Button } from '@/components/Button/Button'
import img from '@/assets/img/profile/default_profile.png'
import Input from '@/components/Input/Input'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { UserProfileEdit } from '@/apis/userInfoApi'
import { useAuthStore } from '@/store/useAuthStore'
import { CiCirclePlus } from 'react-icons/ci'
import { useToastMessageContext } from '@/providers/ToastMessageProvider'
import useUserInfo from '@/hooks/useUserInfo'
import { FormData, EditProfile } from '@/types/profileEdit'

export function ProfileEdit() {
  const { showToastMessage } = useToastMessageContext()
  const { user } = useAuthStore()
  const userId = user?.id
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState<string | null>(null)

  // data get는 커스텀훅으로 처리
  const { userinfo } = useUserInfo()
  // data edit
  const { mutate } = useMutation({
    mutationFn: ({ data, id }: { data: EditProfile; id: string }) =>
      UserProfileEdit(data, id),
    onSuccess: () =>
      showToastMessage({
        message: `수정되었습니다!! `,
        type: 'success'
      }),
    onError: () =>
      showToastMessage({
        message: `수정에 실패하였습니다... `,
        type: 'error'
      })
  })

  //Form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: userinfo
      ? {
          image: userinfo[0].profile_img,
          nickname: userinfo[0].nickname,
          introduction: userinfo[0].introduction
        }
      : {}
  })

  //File 관련
  useEffect(() => {
    if (userinfo?.[0]?.profile_img) {
      setImage(userinfo[0].profile_img)
    }
  }, [userinfo])

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
      alert('유저 id 정보가 필요합니다')
      return
    }

    const editProfileData = {
      ...data,
      image: fileInputRef.current?.files
    }
    mutate({ data: editProfileData, id: userId })
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

          <CiCirclePlus
            type="button"
            onClick={handleClick}
            size={50}
            style={{
              position: 'absolute',
              bottom: '30',
              right: '170',
              backgroundColor: 'white',
              borderRadius: '9999rem',
              cursor: 'pointer'
            }}
          />

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
            {...register('nickname', {
              required: '닉네임을 입력해주세요.'
            })}
            placeholder="닉네임을 입력해주세요"
          />
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
          {errors.introduction && (
            <S.Errormsg>{errors.introduction.message}</S.Errormsg>
          )}
        </S.ContentBox>
        <S.CompleteBox>
          <Button
            bordertype="기본"
            width="9rem"
            type="submit">
            수정
          </Button>
        </S.CompleteBox>
      </S.ContentContainer>
    </>
  )
}

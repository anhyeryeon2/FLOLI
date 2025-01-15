import { useEffect, useRef, useState } from 'react'
import * as S from './EditProfile.styled'
import { Profile, Input, Button } from '@/component'
import img from '@/assets/img/profile/default_profile.png'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { UserProfileEdit } from '@/apis/userInfoApi'
import { useAuthStore } from '@/store/useAuthStore'
import { CiCirclePlus } from 'react-icons/ci'
import { useUserInfo, useToast } from '@/hooks'
import { FormData, EditProfile } from '@/types/profileEdit'

export function ProfileEdit() {
  const { user, updateUser } = useAuthStore()
  const userId = user?.id
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState<string | null>(null)
  const { handleToastError, handleToastSuccess } = useToast()

  // data get는 커스텀훅으로 처리
  const { userinfo } = useUserInfo()

  // data edit
  const { mutate } = useMutation({
    mutationFn: ({
      data,
      image,
      id
    }: {
      data: EditProfile
      image: string | FileList | null
      id: string
    }) => UserProfileEdit(data, image, id),
    onSuccess: () => handleToastSuccess(`수정되었습니다!! `),

    onError: () => handleToastError(`수정에 실패하였습니다... `)
  })

  //Form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: user
      ? {
          nickname: user?.nickname,
          introduction: user?.introduction ?? undefined
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

    const newImage =
      fileInputRef.current?.files && fileInputRef.current.files.length > 0
        ? fileInputRef.current.files
        : image

    const editProfileData = {
      ...data
    }

    mutate({ data: editProfileData, image: newImage, id: userId })

    updateUser({
      profile_img: userinfo![0].profile_img,
      nickname: editProfileData.nickname,
      introduction: editProfileData.introduction
    })
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
              disabledLink={true}
            />
          ) : (
            <Profile
              className="profile-img"
              size="15rem"
              userId="userIdtest"
              imageUrl={img}
              disabledLink={true}
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

export type FormData = {
  image?: FileList | null
  nickname: string
  introduction: string
}

export type EditProfile = {
  image?: FileList | null
  nickname?: string
  introduction?: string
}

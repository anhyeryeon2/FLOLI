export type FormData = {
  image?: FileList | null
  nickname: string
  introduction: string
}

export interface EditProfile {
  image?: FileList | null
  nickname?: string
  intro?: string
}

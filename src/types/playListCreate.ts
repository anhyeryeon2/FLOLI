export interface PlayListInfoProps {
  playlistTitle: string
  setPlaylistTitle: (value: string) => void
  playlistDescription: string
  setPlaylistDescription: (value: string) => void
}

export interface PlayListIsPublicProps {
  isPublic: boolean
  setIsPublic: (value: boolean) => void
}
export interface VideoItem {
  id: string
  title: string
  thumbnail: string
  link: string
  channel: string
}
export interface CreatePlaylistPayload {
  user_id: string | number
  title: string
  description: string
  thumbnail: string
  video_urls: string[]
  is_public: boolean
}

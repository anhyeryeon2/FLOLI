export interface PlaylistInfoProps {
  playlistTitle: string
  setPlaylistTitle: (value: string) => void
  playlistDescription: string
  setPlaylistDescription: (value: string) => void
}

export interface PlaylistIsPublicProps {
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

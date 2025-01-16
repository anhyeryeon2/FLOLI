export interface FeedListProps {
  image: string
  profileImage: string
  title: string
  nickname: string
  likes: number
  comments: number
  date: string
  track: number
  id: string
  likesState: boolean
  playlist_user_id: string
  is_public: boolean
}

export interface PlayListProps {
  image: string
  title: string
  date: string
  likes: number
  comments: number
  ispublic?: boolean
  optionIcon?: 'heart' | 'bookmark' | 'option' | 'removeBookmark'
  nickname?: string
  playlistId?: string
  onDelete?: (id: string) => void
  onClick?: () => void
  onOptionClick?: () => void
}

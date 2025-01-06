export interface FeedListProps {
  image: string
  profileImage: string
  title: string
  nickname: string
  likes: number
  comments: number
  date: string
  track: number
  key: string
}

export interface PlayListProps {
  image: string
  title: string
  date: string
  likes: number
  comments: number
  isLocked?: boolean
  optionIcon?: 'heart' | 'bookmark' | 'option'
  nickname?: string
}

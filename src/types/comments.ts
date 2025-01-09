export interface IFetchCommentsProps {
  userId: string
  playlistId: string
}

export interface ICommentItemProps {
  comment_id: string
  user_id: string
  content: string
  created_at: string
  updated_at?: string | null
  nickname: string
}

export interface IFetchCommentsProps {
  userId: string
  playlistId: string
  content: string
}

export interface ICommentItemProps {
  comment_id: string
  user_id: string
  content: string
  created_at: string
  updated_at?: string | null
  nickname: string
}

export type CommentListProps = {
  playlistId: string
}

export type CommentEditorProps = {
  playlistId: string
}

export type DeleteCommentProps = {
  commentId: string
  playlistId: string
}

export type CommentModifierProps = {
  commentId: string
  playlistId: string
  text: string
  setIsModifier: React.Dispatch<React.SetStateAction<boolean>>
}

export type ModifyCommentProps = {
  commentId: string
  playlistId: string
  content: string
}

export type ProfileButtonSize = 'small' | 'medium' | 'large' | string

export interface ProfileButtonProps {
  imageUrl?: string
  altText?: string
  size?: ProfileButtonSize
  userId?: string
  className?: string
}

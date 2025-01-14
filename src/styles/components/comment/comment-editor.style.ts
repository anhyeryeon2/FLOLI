import { Textarea } from '@/component'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;

  .profile-img {
    flex: 0 0 auto;
  }
`

export const StyledTextarea = styled(Textarea)`
  font-size: var(--fs-m);

  &:focus {
    height: 10rem;
  }
`

export const CommentSendButton = styled.button`
  padding: 0.4rem 0;
  line-height: 0;
`

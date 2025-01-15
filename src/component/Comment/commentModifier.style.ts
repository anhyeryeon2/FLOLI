import styled from 'styled-components'
import { Textarea } from '@/component'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-top: 0.4rem;
`

export const StyledTextarea = styled(Textarea)`
  height: 10rem;
  font-size: 1.4rem;
`

export const ModifyButtonBox = styled.div`
  display: flex;
  gap: 0.6rem;

  button {
    flex: 1 1 100%;
    padding: 0.6rem 0;
    font-size: var(--fs-m);
    border-radius: var(--radius-base);
    line-height: 1;
  }

  .cancel {
    flex: 1 1 30%;
    background: transparent;
    border: 1px solid var(--color-main3);
  }
`

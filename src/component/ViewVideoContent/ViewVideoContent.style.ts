import styled from 'styled-components'

export const Container = styled.div`
  position: sticky;
  top: var(--header-height);
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

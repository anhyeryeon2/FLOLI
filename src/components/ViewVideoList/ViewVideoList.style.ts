import styled from 'styled-components'

export const Container = styled.div`
  .detail-play-List {
    padding-bottom: var(--layout-padding);

    & > *:nth-child(n + 2) {
      margin-top: 0.6rem;
    }
  }
`

export const TitleWrapper = styled.header`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  position: sticky;
  top: 0;
  padding: var(--layout-padding) 0;
  background: var(--color-white);

  .title-box {
    h2 {
      flex: 1 1 auto;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    span {
      font-size: var(--fs-m);
      color: var(--color-gray);
    }
  }
`

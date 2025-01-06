import Modal from '@/components/Modal/Modal'
import styled from 'styled-components'

export const Container = styled.div`
  padding-bottom: 7rem;
`

export const VideoInfoWrapper = styled.div`
  padding: 0 var(--layout-padding);

  h2 {
    font-size: 1.8rem;
    font-weight: 400;
  }

  h1 {
    margin-top: 1rem;
    font-size: var(--fs-l);
    font-weight: 500;
  }

  .info-box {
    margin-top: 0.8rem;
    font-size: 1.2rem;

    .create-at {
      display: inline-block;
      margin-bottom: 0.4rem;
      color: var(--color-gray);
    }
  }

  .desc-toggle-button {
    font-size: var(--fs-m);
    color: var(--color-gray);
  }
`

export const Description = styled.div`
  font-size: var(--fs-m);

  .desc-text {
    font-size: inherit;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: pre-wrap;

    &.open {
      display: block;
      overflow: visible;
      text-overflow: unset;
      -webkit-line-clamp: unset;
    }
  }

  .desc-toggle-text {
    color: var(--color-gray);
  }
`

export const CreatorProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--spacing-5);

  div {
    display: flex;
    align-items: center;
    min-width: 0;
    font-size: 1.2rem;

    & > * {
      flex: 0 0 auto;
    }
  }

  .creator-name {
    flex: 0 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0 0.6rem 0 0.8rem;
    font-size: 1.4rem;
    font-weight: 500;
  }

  .subsc-count {
    color: var(--color-gray);
  }
`

export const StyledButton = styled.button`
  flex: 0 0 auto;
  width: auto;
  padding: 0.8rem 1.6rem;
  margin-left: var(--spacing-5);
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-white);
  background: var(--color-black);
  border-radius: var(--radius-full);

  &.subsc-cancel {
    padding: 0.8rem 1rem;
    background: var(--color-white);
    color: var(--color-black);
    border: 1px solid var(--color-black);
  }
`

export const ActionButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: var(--spacing-4);

  button {
    padding: 0 0.6rem;
    font-size: 1.4rem;

    & > * {
      vertical-align: middle;
    }

    span {
      margin-left: 0.4rem;
    }
  }
`

export const CommentWrapper = styled.div`
  padding: var(--spacing-5) var(--layout-padding);
  margin-top: var(--spacing-5);
  border-top: 1px solid #ddd;

  .comment-count {
    margin-bottom: var(--spacing-4);
    font-size: 1.4rem;

    span {
      margin-left: 0.4rem;
      color: var(--color-gray);
    }
  }
`

export const VideoListPanel = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: var(--spacing-5);
  width: calc(100% - 1.6rem);
  max-width: calc(var(--max-width) - 1.6rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-4) var(--spacing-5);
  background: var(--color-main2);
  border-radius: var(--radius-base);

  div {
    /* 말줄임표때문에 넣음 */
    min-width: 0;
  }

  & > svg {
    flex: 0 0 auto;
  }

  .next-video-title {
    font-size: var(--fs-m);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .playList-info-wrapper {
    padding: 0 var(--spacing-4);
  }

  .playList-info {
    min-width: 0;
    display: flex;
    align-items: center;
    margin-top: 0.4rem;
    font-size: var(--fs-m);
    color: var(--color-gray);

    p {
      font-size: inherit;
      flex: 1 1 auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    span {
      flex: 0 0 auto;
    }
  }

  .modal-toggle-button {
    flex: 0 0 auto;
    line-height: 0;
  }
`

export const StyledModal = styled(Modal)`
  // 영상 영역까지만 보이도록
  top: calc(56.25vw + var(--header-height));

  & > div {
    height: 100%;
  }
`

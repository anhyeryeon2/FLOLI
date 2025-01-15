import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  margin-bottom: var(--spacing-5);

  .profile-img {
    flex: 0 0 auto;
  }

  .comment-box {
    flex: 1 1 auto;
    min-width: 0;
  }

  .comment-title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: var(--fs-m);
    overflow: hidden;

    .comment-user-nickname {
      flex: 0 1 auto;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .is-creator-nickname {
      width: 1rem;
      margin-left: 0.2rem;
    }

    .create-at {
      flex: 0 0 auto;
      margin-left: 1rem;
      color: var(--color-gray);
    }
  }

  .comment-content {
    margin-top: 0.4rem;
    font-size: 1.4rem;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    white-space: pre-wrap;

    &.open {
      display: block;
      overflow: visible;
      text-overflow: unset;
      -webkit-line-clamp: unset;
    }
  }

  .comment-toggle-text {
    font-size: 1.2rem;
    color: var(--color-gray);
  }
`

export const CommentEditButtonBox = styled.div`
  margin-left: -0.4rem;

  button {
    padding: 0.4rem;
    font-size: var(--fs-m);
    color: var(--color-gray);

    &:nth-child(n + 2) {
      margin-left: 0.2rem;
    }

    & > * {
      vertical-align: text-top;
    }

    span {
      margin-right: 0.2rem;
    }
  }
`

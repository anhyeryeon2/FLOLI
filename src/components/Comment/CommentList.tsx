import * as S from '@/styles/components/comment/comment-list.style'
import CommentItem from './CommentItem'

const CommentList = () => {
  const testData = [
    {
      commentId: 'asdlifuw',
      userId: 'klajlsdifjqwer',
      content:
        '이것은 댓글 내용입니다이것은\n 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다',
      createAt: '2024년 2월 11일',
      updatedAt: '2024년 3월 7일',
      nickname: '몽글이'
    },
    {
      commentId: '245dagah63245',
      userId: 'sifu98723dfs',
      content: '댓글을 한줄만 써보자',
      createAt: '2024년 8월 21일',
      nickname: '이건닉네임'
    },
    {
      commentId: '5436asfdet4326',
      userId: 'klajlsdihgao83u12fjqwer',
      content:
        '이것은 댓글 내용입니다이것은\n 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다이것은 댓글 내용입니다',
      createAt: '2024년 2월 11일',
      updatedAt: '2024년 3월 7일',
      nickname:
        '닉네임을 길게 써보자닉네임을 길게 써보자닉네임을 길게 써보자닉네임을 길게 써보자'
    }
  ]

  return (
    <S.Container>
      {testData.map(data => (
        <CommentItem
          key={data.commentId}
          commentId={data.commentId}
          userId={data.userId}
          content={data.content}
          createAt={data.createAt}
          updatedAt={data.updatedAt ? data.updatedAt : null}
          nickname={data.nickname}
        />
      ))}
    </S.Container>
  )
}

export default CommentList

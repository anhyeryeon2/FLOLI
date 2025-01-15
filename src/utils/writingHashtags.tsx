import React from 'react'
import * as S from '@/component/PlayListCreate/PlayListCreate.styles'

interface WritingHashtagsProps {
  description: string
}

const WritingHashtags = ({ description }: WritingHashtagsProps) => {
  if (!description) return null

  const lines = description.split('\n')

  return (
    <>
      {lines.map((line, lineIndex) => {
        const hashtagRegex = /(#[^\s#]+)/g
        const parts = line.split(hashtagRegex)

        const processedLine = parts.map((part, partIndex) => {
          if (part.startsWith('#')) {
            return (
              <S.HashtagSpan key={`${lineIndex}-${partIndex}`}>
                {part}
              </S.HashtagSpan>
            )
          }
          return part
        })

        return (
          <React.Fragment key={lineIndex}>
            {processedLine}
            {lineIndex < lines.length - 1 && <br />}
          </React.Fragment>
        )
      })}
    </>
  )
}

export default WritingHashtags

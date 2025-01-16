import React from 'react'
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
              <HashtagSpan key={`${lineIndex}-${partIndex}`}>
                <span className="hash-symbol">#</span>
                <span className="hash-text">{part.slice(1)}</span>
              </HashtagSpan>
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
import styled from 'styled-components'

export const HashtagSpan = styled.span`
  color: var(--color-main1);
  font-weight: 500;
`

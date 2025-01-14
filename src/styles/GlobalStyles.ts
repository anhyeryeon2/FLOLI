import { createGlobalStyle } from 'styled-components'
import '@/styles/reset.css'
import '@/styles/common.css'

export const GlobalStyle = createGlobalStyle`
  #root {
    background: gray;
    -webkit-tap-highlight-color: transparent; /* 모바일 파란색 하이라이트 제거 */
  user-select: none; /* 텍스트 선택 방지 */
  appearance: none; /* 기본 브라우저 스타일 제거 */
  }
 


  /*
    hidden
    단순히 시각적으로 감추는 것이 목적이라면 opacity0이나 displaynone 대신 이것을 사용
  */
  .visually-hidden {
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    position: absolute;
    width: 1px;
    height: 1px;
    white-space: nowrap;
    border: 0;
  }

  /* 스크롤 막기 */
  .scroll-locked {
    position: fixed;
    width: 100%;
    overflow-x: hidden;
    top: var(--scroll-position);
  }
  .scroll-locked.has-scrollbar {
    overflow-y: scroll;
  }


`

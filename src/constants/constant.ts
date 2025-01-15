export const ROUTER_PATH = {
  HOME: '/',
  VIEW: '/view/:playlist_id',
  MYPAGE: '/mypage',
  ProfileEdit: '/mypage/profile-edit',
  LOGIN: '/login',
  SUBSCRIPTIONS: '/subscriptions',
  MYPLAYLISTS: '/my-playlists',
  USERPROFILE: '/profile/:userId',
  PLAYLISTCREATE: '/playlist/create',

  SIGNUP_EMAIL: '/signup/email',
  SIGNUP_PASSWORD: '/signup/password',
  SIGNUP_NICKNAME: '/signup/nickname',
  END_SIGNUP: '/signup/complete',
  SEARCH_PLAYLIST: '/search'
}

// 유동 경로를 위한 정규 표현식
export const ROUTER_PATH_REGEX = {
  VIEW: /^\/view\/[^/]+$/,
  USERPROFILE: /^\/profile\/[^/]+$/
}

// 플리 상세페이지에서 사용. 마지막 영상일 때, 다음 영상 제목으로 표시할 텍스트.
export const LAST_VIDEO_TITLE = '플레이리스트 끝'

// 플리 상세페이지에서 사용. 한번에 불러올 댓글 최대 개수
export const COMMENT_CALL_LIMIT = 10

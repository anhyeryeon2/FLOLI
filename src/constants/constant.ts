export const ROUTER_PATH = {
  HOME: '/',
  VIEW: '/view/:playlist_id',
  MYPAGE: '/mypage',
  LOGIN: '/login',
  SUBSCRIPTIONS: '/subscriptions',
  MYPLAYLISTS: '/my-playlists',
  USERPROFILE: '/profile/:userId',
  PLAYLISTCREATE: '/playlist/create',

  SIGNUP_EMAIL: '/signup/email',
  SIGNUP_PASSWORD: '/signup/password',
  SIGNUP_NICKNAME: '/signup/nickname'
}

// 유동 경로를 위한 정규 표현식
export const ROUTER_PATH_REGEX = {
  VIEW: /^\/view\/[^/]+$/,
  USERPROFILE: /^\/profile\/[^/]+$/
}

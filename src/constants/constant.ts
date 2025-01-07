export const ROUTER_PATH = {
  HOME: '/',
  VIEW: '/view/:id',
  MYPAGE: '/mypage',
  LOGIN: '/login',
  SIGNUP: '/signup',
  SUBSCRIPTIONS: '/subscriptions',
  MYPLAYLISTS: '/my-playlists',
  USERPROFILE: '/profile/:userId',
  PLAYLISTCREATE: '/playlist/create'
}

// 유동 경로를 위한 정규 표현식
export const ROUTER_PATH_REGEX = {
  VIEW: /^\/view\/[^/]+$/,
  USERPROFILE: /^\/profile\/[^/]+$/
}

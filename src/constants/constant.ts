export const ROUTER_PATH = {
  HOME: '/',
  VIEW: '/view/:id',
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
  SEARCH_PLAYLIST: '/search'
}

// 유동 경로를 위한 정규 표현식
export const ROUTER_PATH_REGEX = {
  VIEW: /^\/view\/[^/]+$/,
  USERPROFILE: /^\/profile\/[^/]+$/
}

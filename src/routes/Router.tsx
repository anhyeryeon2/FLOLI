import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '@/components/Layout/Layout'
import {
  Login,
  Mypage,
  MyPlayLists,
  NotFound,
  PlayListCreate,
  SearchPage,
  Subscriptions,
  UserProfile,
  View,
  ProfileEdit
} from '@/pages'
import { Home } from '@/pages/Home'
import { ROUTER_PATH } from '@/constants/constant'
import StepEmail from '@/components/SignUp/StepEmail'
import StepPassword from '@/components/SignUp/StepPassword'
import StepNickname from '@/components/SignUp/StepNickname'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const user = useAuthStore(state => state.user)

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }

  return children
}
const router = createBrowserRouter([
  {
    path: ROUTER_PATH.HOME,
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: ROUTER_PATH.HOME,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        )
      },
      {
        path: ROUTER_PATH.LOGIN,
        element: <Login />
      },
      {
        path: ROUTER_PATH.MYPAGE,
        element: (
          <ProtectedRoute>
            <Mypage />
          </ProtectedRoute>
        )
      },
      {
        path: ROUTER_PATH.VIEW,
        element: (
          <ProtectedRoute>
            <View />
          </ProtectedRoute>
        )
      },
      {
        path: ROUTER_PATH.SUBSCRIPTIONS,
        element: (
          <ProtectedRoute>
            <Subscriptions />
          </ProtectedRoute>
        )
      },
      {
        path: ROUTER_PATH.MYPLAYLISTS,
        element: (
          <ProtectedRoute>
            <MyPlayLists />
          </ProtectedRoute>
        )
      },
      {
        path: ROUTER_PATH.USERPROFILE,
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        )
      },
      {
        path: ROUTER_PATH.PLAYLISTCREATE,
        element: (
          <ProtectedRoute>
            <PlayListCreate />
          </ProtectedRoute>
        )
      },
      {
        path: ROUTER_PATH.SIGNUP_EMAIL,
        element: <StepEmail />
      },
      {
        path: ROUTER_PATH.SIGNUP_PASSWORD,
        element: <StepPassword />
      },
      {
        path: ROUTER_PATH.SIGNUP_NICKNAME,
        element: <StepNickname />
      },
      {
        path: ROUTER_PATH.ProfileEdit,
        element: (
          <ProtectedRoute>
            <ProfileEdit />
          </ProtectedRoute>
        )
      },
      {
        path: ROUTER_PATH.SEARCH_PLAYLIST,
        element: <SearchPage />
      },
      { path: ROUTER_PATH.ProfileEdit, element: <ProfileEdit /> }
    ]
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}

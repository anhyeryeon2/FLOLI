import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '@/component/Layout/Layout'
import {
  Mypage,
  MyPlayLists,
  NotFound,
  PlayListCreate,
  SearchPage,
  Subscriptions,
  UserProfile,
  View,
  ProfileEdit,
  SignIn
} from '@/pages'
import { Home } from '@/pages/Home'
import { ROUTER_PATH } from '@/constants/constant'
import StepEmail from '@/component/SignUp/StepEmail'
import StepPassword from '@/component/SignUp/StepPassword'
import StepNickname from '@/component/SignUp/StepNickname'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/component/ErrorBoundary/ErrorFallback'
import EndSignUp from '@/component/SignUp/EndSignUp'

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
    element: (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Layout />
      </ErrorBoundary>
    ),
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
        element: <SignIn />
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
        path: ROUTER_PATH.END_SIGNUP,
        element: <EndSignUp />
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

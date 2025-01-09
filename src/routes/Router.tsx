import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '@/components/Layout/Layout'
import {
  Login,
  Mypage,
  MyPlayLists,
  NotFound,
  PlayListCreate,
  Subscriptions,
  UserProfile,
  View
} from '@/pages'
import { Home } from '@/pages/Home'
import { ROUTER_PATH } from '@/constants/constant'
import StepEmail from '@/components/SignUp/StepEmail'
import StepPassword from '@/components/SignUp/StepPassword'
import StepNickname from '@/components/SignUp/StepNickname'

const router = createBrowserRouter([
  {
    path: ROUTER_PATH.HOME,
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: ROUTER_PATH.HOME,
        element: <Home />
      },
      {
        path: ROUTER_PATH.LOGIN,
        element: <Login />
      },
      {
        path: ROUTER_PATH.MYPAGE,
        element: (
          // <ProtectedRoute>
          <Mypage />
          // </ProtectedRoute>
        )
      },
      {
        path: ROUTER_PATH.VIEW,
        element: <View />
      },
      {
        path: ROUTER_PATH.SUBSCRIPTIONS,
        element: <Subscriptions />
      },
      {
        path: ROUTER_PATH.MYPLAYLISTS,
        element: <MyPlayLists />
      },
      {
        path: ROUTER_PATH.USERPROFILE,
        element: <UserProfile />
      },
      {
        path: ROUTER_PATH.PLAYLISTCREATE,
        element: <PlayListCreate />
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
      }
    ]
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}

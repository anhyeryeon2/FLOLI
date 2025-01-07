import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '@/components/Layout/Layout'
import {
  Login,
  Mypage,
  MyPlayLists,
  NotFound,
  PlayListCreate,
  Signup,
  Subscriptions,
  UserProfile,
  View,
  ProfileEdit
} from '@/pages'
import { Home } from '@/pages/Home'
import { ROUTER_PATH } from '@/constants/constant'

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
        path: ROUTER_PATH.SIGNUP,
        element: <Signup />
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
        path: ROUTER_PATH.ProfileEdit,
        element: <ProfileEdit />
      }
    ]
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}

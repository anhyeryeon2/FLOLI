import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout, { Container } from '@/components/Layout/Layout'
import {
  Login,
  Mypage,
  MyPlaylists,
  NotFound,
  PlaylistCreate,
  Signup,
  Subscriptions,
  UserProfile,
  View
} from '@/pages'
import { Home } from '@/pages/Home'
import { ROUTER_PATH } from '@/constants/constant'

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const session = supabase.auth.getSession()

//   if (!session) {
//     return (
//       <Navigate
//         to="/login"
//         replace
//       />
//     )
//   }

//   return <>{children}</>
// }

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
        element: <MyPlaylists />
      },
      {
        path: ROUTER_PATH.USERPROFILE,
        element: <UserProfile />
      },
      {
        path: ROUTER_PATH.PLAYLISTCREATE,
        element: <PlaylistCreate />
      }
    ]
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}

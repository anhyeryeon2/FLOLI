import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '@/components/Layout/Layout'
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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      {
        path: '/mypage',
        element: (
          // <ProtectedRoute>
          <Mypage />
          // </ProtectedRoute>
        )
      },
      {
        path: '/view/:id',
        element: <View />
      },
      {
        path: '/subscriptions',
        element: <Subscriptions />
      },
      {
        path: '/my-playlists',
        element: <MyPlaylists />
      },
      {
        path: '/profile/:userId',
        element: <UserProfile />
      },
      {
        path: '/playlist/create',
        element: <PlaylistCreate />
      }
    ]
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}

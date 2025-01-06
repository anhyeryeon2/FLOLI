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
    path: '/login',
    element: (
      <Container>
        <Login />
      </Container>
    ),
    errorElement: <NotFound />
  },
  {
    path: '/signup',
    element: (
      <Container>
        <Signup />
      </Container>
    ),
    errorElement: <NotFound />
  },
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Home /> },
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

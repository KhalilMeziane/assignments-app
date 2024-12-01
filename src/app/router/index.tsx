import { Home } from "@/features/assignment/presentation/pages"
import { Forgot, Login, Register } from "@/features/auth/presentation/pages"
import { NuqsAdapter } from "nuqs/adapters/react-router"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import ProtectedRoute from "./ProtectedRoute"
import PublicRoute from "./PublicRoute"

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        element: <Login />,
        path: "/",
      },
      {
        element: <Register />,
        path: "/register",
      },
      {
        element: <Forgot />,
        path: "/forgot-password",
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Home />,
        path: "/home",
      },
    ],
  },
  {
    path: "*",
    element: <p>NotFound</p>,
  },
])

export function Router() {
  return (
    <NuqsAdapter>
      <RouterProvider router={router} />
    </NuqsAdapter>
  )
}

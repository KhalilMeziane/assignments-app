import { Home } from "@/features/assignment/presentation/pages"
import { Forgot, Login, Register } from "@/features/auth/presentation/pages"
import { NuqsAdapter } from "nuqs/adapters/react-router"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import ErrorBoundary from "@/components/ErrorBoundary"
import NotFound from "@/components/NotFound"

import ProtectedRoute from "./ProtectedRoute"
import PublicRoute from "./PublicRoute"

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    errorElement: <ErrorBoundary />,
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
    errorElement: <ErrorBoundary />,
    children: [
      {
        element: <Home />,
        path: "/home",
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
])

export function Router() {
  return (
    <NuqsAdapter>
      <RouterProvider router={router} />
    </NuqsAdapter>
  )
}

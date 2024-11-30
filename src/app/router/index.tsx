import { Home } from "@/features/assignment/presentation/pages"
import { Forgot, Login, Register } from "@/features/auth/presentation/pages"
import { NuqsAdapter } from "nuqs/adapters/react-router"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
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
  {
    element: <Home />,
    path: "/home",
  },
])

export function Router() {
  return (
    <NuqsAdapter>
      <RouterProvider router={router} />
    </NuqsAdapter>
  )
}

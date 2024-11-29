import { Forgot, Login, Register } from "@/features/auth/presentation/pages"
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
])

export function Router() {
  return <RouterProvider router={router} />
}

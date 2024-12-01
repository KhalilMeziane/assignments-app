import Cookies from "js-cookie"
import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoute() {
  if (!Cookies.get("accessToken")) {
    return <Navigate to="/" />
  }
  return <Outlet />
}

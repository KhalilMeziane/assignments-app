import Cookies from "js-cookie"
import { Navigate, Outlet } from "react-router-dom"

export default function PublicRoute() {
  if (Cookies.get("accessToken")) {
    return <Navigate to="/home" />
  }
  return <Outlet />
}

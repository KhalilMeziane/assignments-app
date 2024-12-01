import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"

import App from "@/app/App"
import { makeServer } from "@/server/server"

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" })
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)

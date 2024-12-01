import { Link } from "react-router-dom"

import { Button } from "./ui/button"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="container flex flex-col items-center justify-center gap-5 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          404
        </h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </main>
  )
}

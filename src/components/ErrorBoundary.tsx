import { AlertTriangle } from "lucide-react"
import { Link, useRouteError } from "react-router-dom"

import { Button } from "./ui/button"

export default function ErrorBoundary() {
  const error = useRouteError() as Error
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 ">
        <AlertTriangle className="h-24 w-24 text-destructive" />
        <h1 className="text-4xl font-semibold text-center">
          Oops! Something went wrong
        </h1>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link to="/">Go back home</Link>
          </Button>
        </div>
        {error ? (
          <p className="text-sm text-muted-foreground">
            Error Message: {error?.message || "Unknown error"}
          </p>
        ) : null}
      </div>
    </main>
  )
}

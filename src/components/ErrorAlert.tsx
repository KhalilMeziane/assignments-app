import { CloudAlert } from "lucide-react"

import { Alert, AlertTitle } from "@/components/ui/alert"

export default function ErrorAlert({ error }: { error: Error }) {
  return (
    <Alert variant="destructive">
      <AlertTitle className="flex items-center gap-2">
        <CloudAlert className="size-5" />
        {error.message}
      </AlertTitle>
    </Alert>
  )
}

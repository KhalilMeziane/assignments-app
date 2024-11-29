import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ErrorAlert({ error }: { error: Error }) {
  return (
    <Alert variant="destructive" className="my-2">
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
  )
}

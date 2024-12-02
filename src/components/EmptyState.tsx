import { FileX2 } from "lucide-react"

export default function EmptyState() {
  return (
    <div className="flex flex-col flex-grow bg-white items-center justify-center text-center p-8 space-y-4">
      <FileX2 className="size-16 text-gray-700" />
      <h3 className="text-lg font-semibold">No Assignments Found</h3>
    </div>
  )
}

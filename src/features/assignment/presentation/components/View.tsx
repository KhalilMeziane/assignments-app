import placeholder from "@/assets/user-placeholder.jpg"
import { Calendar } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import StatusBadge from "@/components/StatusBadge"

import { Assignment } from "../../domain/models/Assignment"

export default function View({
  onClose,
  assignment,
}: {
  onClose: () => void
  assignment: Assignment
}) {
  return (
    <div>
      <h2 className="font-semibold text-xl">{assignment.title}</h2>
      <div className="mb-2">
        <h3 className="font-semibold text-lg">Description:</h3>
        <p className="text-sm text-gray-700 mb-1">{assignment.description}</p>
      </div>

      <div className="flex justify-between mb-2">
        <p className="font-semibold text-lg mb-1">Status:</p>
        <StatusBadge status={assignment.status} />
      </div>

      {/* #todo */}
      <div className="mb-2">
        <h3 className="font-semibold text-lg mb-1">Assignee:</h3>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={placeholder} />
            <AvatarFallback>{assignment.author.name.slice()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{assignment.author.name}</p>
            <p className="text-xs">{assignment.author.email}</p>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <h3 className="font-semibold text-lg mb-1">Timestamps:</h3>
        <p className="text-base flex items-center gap-1 text-gray-700">
          <Calendar className="size-4" />
          <span> Created: {assignment.createdAt.slice(0, 10)}</span>
        </p>
        <p className="text-base flex items-center gap-1 text-gray-700">
          <Calendar className="size-4" />
          <span>Updated: {assignment.updatedAt.slice(0, 10)}</span>
        </p>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  )
}

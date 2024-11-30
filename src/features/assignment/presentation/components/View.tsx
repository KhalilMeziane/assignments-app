import { Calendar } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function View({ onClose }: { onClose: () => void }) {
  return (
    <div>
      <h2 className="font-semibold text-xl">Complete Project Proposal</h2>
      <div className="mb-2">
        <h3 className="font-semibold text-lg">Description:</h3>
        <p className="text-sm text-gray-700 mb-1">
          Draft and finalize the project proposal for the new client.
        </p>
      </div>

      <div className="flex justify-between mb-2">
        <p className="font-semibold text-lg mb-1">Status:</p>
        <Badge
          variant="outline"
          className={cn("text-green-500 border-green-500")}
        >
          Status
        </Badge>
      </div>

      <div className="mb-2">
        <h3 className="font-semibold text-lg mb-1">Assignee:</h3>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>khalil</p>
        </div>
      </div>

      <div className="mb-2">
        <h3 className="font-semibold text-lg mb-1">Timestamps:</h3>
        <p className="text-base flex items-center gap-1 text-gray-700">
          <Calendar className="size-4" />
          <span> Created: 2023-06-15</span>
        </p>
        <p className="text-base flex items-center gap-1 text-gray-700">
          <Calendar className="size-4" />
          <span>Updated: 2023-06-15</span>
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

import { STATUS } from "@/features/assignment/domain/models/Assignment"

import { cn } from "@/lib/utils"

import { Badge } from "./ui/badge"

const statusColors: Record<STATUS, { text: string; border: string }> = {
  [STATUS.ALL]: { text: "text-yellow-500", border: "border-yellow-500" },
  [STATUS.PENDING]: { text: "text-yellow-500", border: "border-yellow-500" },
  [STATUS.IN_PROGRESS]: { text: "text-blue-500", border: "border-blue-500" },
  [STATUS.COMPLETED]: { text: "text-green-500", border: "border-green-500" },
}
export default function StatusBadge({ status }: { status: STATUS }) {
  const { text, border } = statusColors[status]
  return (
    <Badge variant="outline" className={cn(`capitalize ${text} ${border}`)}>
      {status}
    </Badge>
  )
}

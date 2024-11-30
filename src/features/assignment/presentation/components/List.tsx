import { Calendar, ChevronLeft, ChevronRight, Edit, Trash2 } from "lucide-react"
import { parseAsInteger, parseAsNumberLiteral, useQueryState } from "nuqs"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ErrorBlock from "@/components/ErrorBlock"
import Loading from "@/components/Loading"
import { Modal } from "@/components/Modal"

import { useGetAssignments } from "../hooks"
import DeleteForm from "./forms/Delete"
import EditForm from "./forms/Edit"

export default function List() {
  const { data, isLoading, isError, error } = useGetAssignments()
  return (
    <div className="flex flex-col gap-1.5">
      {!isLoading && !data && isError ? <ErrorBlock error={error} /> : null}
      {!isError && !data && isLoading ? <Loading /> : null}
      {!isLoading && !isError && data ? (
        <>
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Pagination />
        </>
      ) : null}
    </div>
  )
}

const Item = () => {
  return (
    <div className="bg-white p-3 rounded-md border-2 border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <h2 className="font-semibold text-xl">Complete Project Proposal</h2>
          <Badge
            variant="outline"
            className={cn("text-green-500 border-green-500")}
          >
            Status
          </Badge>
        </div>
        <div className="flex gap-1">
          <Modal
            title="Delete Assignment"
            CButton={
              <Button size="icon" variant="outline">
                <Trash2 className="size-4" />
              </Button>
            }
            render={({ onClose }) => {
              return <DeleteForm onClose={onClose} />
            }}
          />
          <Modal
            title="Update Assignment"
            CButton={
              <Button size="icon" variant="default">
                <Edit className="size-4" />
              </Button>
            }
            render={({ onClose }) => {
              return <EditForm onClose={onClose} />
            }}
          />
        </div>
      </div>
      <p className="text-sm text-gray-700 mb-1">
        Draft and finalize the project proposal for the new client
      </p>
      <p className="text-xs flex items-center gap-1 text-gray-700">
        <Calendar className="size-4" />
        <span>2023-06-15</span>
      </p>
    </div>
  )
}

const Pagination = ({ pageCount = 5 }: { pageCount?: number }) => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1))
  const handelPageNext = () => {
    setPage(page + 1)
  }
  const handelPagePrev = () => {
    setPage(page - 1)
  }

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2 py-1">
        <Button size="icon" onClick={handelPagePrev} disabled={page === 1}>
          <ChevronLeft />
        </Button>
        <p className="bg-white p-2 rounded-md font-medium">
          {page} of {pageCount}
        </p>
        <Button
          size="icon"
          onClick={handelPageNext}
          disabled={page === pageCount}
        >
          <ChevronRight />
        </Button>
      </div>
      <div>
        <Limit />
      </div>
    </div>
  )
}

const Limit = () => {
  const limitWhiteList = [10, 20, 30] as const
  const [limit, setLimit] = useQueryState(
    "limit",
    parseAsNumberLiteral(limitWhiteList).withDefault(10)
  )

  const handelStatus = (value: (typeof limitWhiteList)[number]) => {
    setLimit(value)
  }
  return (
    <Select
      onValueChange={(val: string) => handelStatus(Number(val) as 10 | 20 | 30)}
      defaultValue={limit.toString()}
    >
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Select Limit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="20">20</SelectItem>
        <SelectItem value="30">30</SelectItem>
      </SelectContent>
    </Select>
  )
}

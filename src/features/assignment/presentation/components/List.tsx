import { Calendar, ChevronLeft, ChevronRight, Edit, Trash2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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

const Pagination = () => {
  return (
    <div className="flex justify-center items-center gap-2 py-1">
      <Button size="icon">
        <ChevronLeft />
      </Button>
      <p className="bg-white p-2 rounded-md font-medium">1 of 5</p>
      <Button size="icon">
        <ChevronRight />
      </Button>
    </div>
  )
}

import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  Trash2,
} from "lucide-react"
import {
  parseAsInteger,
  parseAsNumberLiteral,
  parseAsString,
  parseAsStringEnum,
  parseAsStringLiteral,
  useQueryState,
} from "nuqs"

import { limitWhiteList, sortOrder } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import EmptyState from "@/components/EmptyState"
import ErrorBlock from "@/components/ErrorBlock"
import Loading from "@/components/Loading"
import { Modal } from "@/components/Modal"
import StatusBadge from "@/components/StatusBadge"

import { PaginationDTO } from "../../domain/dtos/AssignmentDTO"
import { Assignment, STATUS } from "../../domain/models/Assignment"
import { useGetAssignments } from "../hooks"
import DeleteForm from "./forms/Delete"
import EditForm from "./forms/Edit"
import View from "./View"

export default function List() {
  const [search] = useQueryState("search", parseAsString.withDefault(""))
  const [page] = useQueryState("page", parseAsInteger.withDefault(1))
  const [limit] = useQueryState(
    "limit",
    parseAsNumberLiteral(limitWhiteList).withDefault(10)
  )
  const [sort] = useQueryState(
    "sort",
    parseAsStringLiteral(sortOrder).withDefault("desc")
  )
  const [status] = useQueryState(
    "status",
    parseAsStringEnum<STATUS>(Object.values(STATUS)).withDefault(STATUS.ALL)
  )

  const queryParams = {
    page,
    limit,
    search,
    sort,
    status,
  }
  const { data, isLoading, isError, error } = useGetAssignments(queryParams)

  return (
    <div className="flex flex-col gap-1.5 min-h-[80vh]">
      {!isLoading && !data && isError ? <ErrorBlock error={error} /> : null}
      {!isError && !data && isLoading ? <Loading /> : null}
      {!isLoading && !isError && data ? (
        <>
          <div className="flex-grow">
            {data.data.assignments.length === 0 ? <EmptyState /> : null}
            {data.data.assignments.length > 0
              ? data.data.assignments.map((assignment) => (
                  <Item key={assignment.id} assignment={assignment} />
                ))
              : null}
          </div>
          <Pagination pagination={data.data.pagination} />
        </>
      ) : null}
    </div>
  )
}

const Item = ({ assignment }: { assignment: Assignment }) => {
  return (
    <div className="bg-white p-3 rounded-md border-2 border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <h2 className="font-semibold text-xl">{assignment.title}</h2>
          <StatusBadge status={assignment.status} />
        </div>
        <div className="flex gap-1">
          <Modal
            title="Delete Assignment"
            CButton={
              <Button size="icon" variant="ghost">
                <Trash2 className="size-4" />
              </Button>
            }
            render={({ onClose }) => {
              return <DeleteForm onClose={onClose} assignment={assignment} />
            }}
          />
          <Modal
            title="Update Assignment"
            CButton={
              <Button size="icon" variant="outline">
                <Edit className="size-4" />
              </Button>
            }
            render={({ onClose }) => {
              return <EditForm onClose={onClose} assignment={assignment} />
            }}
          />
          <Modal
            title="View Assignment"
            CButton={
              <Button size="icon" variant="default">
                <Eye className="size-4" />
              </Button>
            }
            render={({ onClose }) => {
              return <View onClose={onClose} assignment={assignment} />
            }}
          />
        </div>
      </div>
      <p className="text-sm text-gray-700 mb-1">{assignment.description}</p>
      <p className="text-xs flex items-center gap-1 text-gray-700">
        <Calendar className="size-4" />
        <span>{assignment.createdAt.slice(0, 10)}</span>
      </p>
    </div>
  )
}

const Pagination = ({ pagination }: { pagination: PaginationDTO }) => {
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
          {pagination.page} of {pagination.totalPages}
        </p>
        <Button
          size="icon"
          onClick={handelPageNext}
          disabled={page === pagination.totalPages || pagination.total === 0}
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

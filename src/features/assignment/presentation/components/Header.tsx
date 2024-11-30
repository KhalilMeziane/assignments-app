import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react"
import { parseAsString, parseAsStringLiteral, useQueryState } from "nuqs"
import { useDebouncedCallback } from "use-debounce"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Modal } from "@/components/Modal"

import CreateForm from "./forms/Create"

export default function Header() {
  return (
    <header className="py-4">
      <h1 className="font-medium text-xl">Assignments List</h1>
      <div className="mt-2 flex justify-between">
        <div className="flex gap-2">
          <Search />
          <StatusFilter />
          <Sort />
        </div>
        <Modal
          title="Create Assignment"
          CButton={<Button>Add Assignment</Button>}
          render={({ onClose }) => {
            return <CreateForm onClose={onClose} />
          }}
        />
      </div>
    </header>
  )
}

const Search = () => {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  )

  const debounced = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setSearch(event.target.value),
    300
  )

  const handelSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    debounced(event)
  }

  return (
    <Input
      placeholder="Search"
      className="w-64 bg-white"
      onChange={handelSearch}
      defaultValue={search}
    />
  )
}

const StatusFilter = () => {
  const statusWhiteList = ["all", "pending", "progress", "completed"] as const
  const [status, setStatus] = useQueryState(
    "status",
    parseAsStringLiteral(statusWhiteList).withDefault("all")
  )

  const handelStatus = (value: (typeof statusWhiteList)[number]) => {
    setStatus(value)
  }

  return (
    <Select onValueChange={handelStatus} defaultValue={status}>
      <SelectTrigger className="w-[180px] bg-white">
        <SelectValue placeholder="Filter By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="progress">In Progress</SelectItem>
        <SelectItem value="completed">Completed</SelectItem>
      </SelectContent>
    </Select>
  )
}

const Sort = () => {
  const sortOrder = ["asc", "desc"] as const
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsStringLiteral(sortOrder).withDefault("desc")
  )

  const handelStatus = () => {
    if (sort === "asc") {
      setSort("desc")
    } else {
      setSort("asc")
    }
  }

  return (
    <Button size="icon" variant="outline" onClick={() => handelStatus()}>
      {sort === "desc" ? <ArrowDownNarrowWide /> : <ArrowUpNarrowWide />}
    </Button>
  )
}

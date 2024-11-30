import { ArrowDownNarrowWide } from "lucide-react"

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
      <h1 className="font-medium text-xl">Assignment Dashboard</h1>
      <div className="mt-2 flex justify-between">
        <div className="flex gap-2">
          <Input placeholder="Search" className="w-64 bg-white" />
          <Select>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Filter By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
            <Button size="icon" variant="outline">
              <ArrowDownNarrowWide />
            </Button>
          </Select>
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

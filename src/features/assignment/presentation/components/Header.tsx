import { RootState } from "@/app/store"
import placeholder from "@/assets/user-placeholder.jpg"
import { clearAuth } from "@/features/auth/application/authSlice"
import { useLogout } from "@/features/auth/presentation/hooks"
import Cookies from "js-cookie"
import { ArrowDownNarrowWide, ArrowUpNarrowWide, LogOut } from "lucide-react"
import {
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryState,
} from "nuqs"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useDebouncedCallback } from "use-debounce"

import { sortOrder, statusWhiteList } from "@/lib/constants"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
      <div className="flex justify-between">
        <h1 className="font-medium text-xl">Assignments List</h1>
        <UserMenu />
      </div>

      <div className="flex gap-2 flex-wrap justify-between py-0.5">
        <div className="flex gap-1 flex-wrap lg:justify-between">
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
  const [_page, setPage] = useQueryState("page", parseAsInteger.withDefault(1))

  const debounced = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value)
      setPage(1)
    },
    300
  )

  const handelSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    debounced(event)
  }

  return (
    <Input
      placeholder="Search"
      className="w-full lg:w-64 bg-white"
      onChange={handelSearch}
      defaultValue={search}
    />
  )
}

const StatusFilter = () => {
  const [status, setStatus] = useQueryState(
    "status",
    parseAsStringLiteral(statusWhiteList).withDefault("all")
  )
  const [_page, setPage] = useQueryState("page", parseAsInteger.withDefault(1))

  const handelStatus = (value: (typeof statusWhiteList)[number]) => {
    setStatus(value)
    setPage(1)
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

const UserMenu = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { email, name } = useSelector((state: RootState) => state.user)
  const { mutateAsync } = useLogout()

  const handleLogout = async () => {
    await mutateAsync()
    dispatch(clearAuth())
    Cookies.remove("accessToken")
    navigate("/")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={placeholder} alt={name} />
            <AvatarFallback>{name?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

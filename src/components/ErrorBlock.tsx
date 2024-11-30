import axios, { AxiosError } from "axios"
import {
  AlertCircle,
  Lock,
  LucideIcon,
  Search,
  Server,
  ShieldAlert,
} from "lucide-react"

import {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
  UnhandledError,
} from "@/lib/networkErrors"
import { cn } from "@/lib/utils"

const ERROR_CONFIGS = {
  BadRequestError: {
    Icon: ShieldAlert,
    title: "Invalid Request",
    description: "The request was invalid. Please check your input.",
  },
  UnAuthorizedError: {
    Icon: Lock,
    title: "Unauthorized Access",
    description: "You are not authorized to perform this action.",
  },
  NotFoundError: {
    Icon: Search,
    title: "Not Found",
    description: "The requested resource could not be found.",
  },
  UnhandledError: {
    Icon: Server,
    title: "System Error",
    description: "An unexpected error occurred. Please try again later.",
  },
  Default: {
    Icon: AlertCircle,
    title: "Something Went Wrong",
    description: "An unexpected error occurred. Please try again.",
  },
}

const getErrorConfig = (
  error?:
    | Error
    | AxiosError
    | BadRequestError
    | UnAuthorizedError
    | NotFoundError
    | UnhandledError
    | null
) => {
  if (error instanceof BadRequestError) return ERROR_CONFIGS.BadRequestError
  if (error instanceof UnAuthorizedError) return ERROR_CONFIGS.UnAuthorizedError
  if (error instanceof NotFoundError) return ERROR_CONFIGS.NotFoundError
  if (error instanceof UnhandledError) return ERROR_CONFIGS.UnhandledError
  if (axios.isAxiosError(error)) {
    switch (error.response?.status) {
      case 400:
        return ERROR_CONFIGS.BadRequestError
      case 401:
        return ERROR_CONFIGS.UnAuthorizedError
      case 404:
        return ERROR_CONFIGS.NotFoundError
      default:
        return ERROR_CONFIGS.UnhandledError
    }
  }

  return ERROR_CONFIGS.Default
}

export default function ErrorBlock({
  error,
  className,
}: {
  error?: Error | AxiosError | null
  className?: string
}) {
  const { Icon, title, description } = getErrorConfig(error)
  return (
    <ErrorUi
      Icon={Icon}
      title={title}
      description={description}
      className={className}
    />
  )
}

type TErrorUiProps = {
  Icon: LucideIcon
  title: string
  description: string
  className?: string
}

const ErrorUi = ({ description, Icon, title, className }: TErrorUiProps) => {
  return (
    <div
      className={cn(
        "mx-auto flex h-[80vh] w-1/2 flex-col items-center justify-center gap-1 text-center",
        className
      )}
    >
      <Icon className="mb-3 size-12 text-red-500" />
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mb-2 text-base text-gray-600">{description}</p>
    </div>
  )
}

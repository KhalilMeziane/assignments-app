import useToggle from "@/hooks/useToggle"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type TModalProps = {
  CButton: JSX.Element
  title: string
  render: ({
    onClose,
    onOpen,
    isOpen,
  }: {
    onClose: () => void
    onOpen: () => void
    isOpen: boolean
  }) => JSX.Element
}

export function Modal({ title, CButton, render }: TModalProps) {
  const { isOpen, onClose, onOpen, toggle } = useToggle()
  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogTrigger asChild>{CButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">{title}</DialogTitle>
        </DialogHeader>
        {render({ onClose, onOpen, isOpen })}
      </DialogContent>
    </Dialog>
  )
}

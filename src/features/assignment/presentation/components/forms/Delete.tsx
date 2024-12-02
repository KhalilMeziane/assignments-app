import { Assignment } from "@/features/assignment/domain/models/Assignment"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import ErrorAlert from "@/components/ErrorAlert"
import { InputField } from "@/components/fields"

import { useDeleteAssignment } from "../../hooks"
import {
  ConfirmDeleteAssignmentFnSchema,
  ConfirmDeleteAssignmentValues,
} from "../../validators"

export default function DeleteForm({
  onClose,
  assignment,
}: {
  onClose: () => void
  assignment: Assignment
}) {
  const { mutateAsync, isPending, isError, error } = useDeleteAssignment()

  const form = useForm<ConfirmDeleteAssignmentValues>({
    resolver: zodResolver(ConfirmDeleteAssignmentFnSchema(assignment.title)),
    defaultValues: {
      confirm: "",
    },
  })

  const handelSubmit = async () => {
    await mutateAsync(assignment.id)
    onClose()
  }

  return (
    <Form {...form}>
      {isError ? <ErrorAlert error={error} /> : null}
      <form onSubmit={form.handleSubmit(handelSubmit)} className="space-y-4">
        <p className="text-sm">
          Type the name <b>"{assignment.title}"</b> to confirm deletion.
        </p>
        <InputField label="Confirm" name="confirm" type="text" form={form} />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="destructive" disabled={isPending}>
            Delete
          </Button>
        </div>
      </form>
    </Form>
  )
}

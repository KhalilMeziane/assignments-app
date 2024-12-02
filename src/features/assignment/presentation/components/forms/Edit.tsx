import {
  Assignment,
  STATUS,
} from "@/features/assignment/domain/models/Assignment"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import ErrorAlert from "@/components/ErrorAlert"
import { InputField, SelectField, TextareaField } from "@/components/fields"

import { useUpdateAssignment } from "../../hooks"
import {
  UpdateAssignmentSchema,
  UpdateAssignmentValues,
} from "../../validators"

export default function EditForm({
  onClose,
  assignment,
}: {
  onClose: () => void
  assignment: Assignment
}) {
  const { mutateAsync, isPending, isError, error } = useUpdateAssignment()

  const form = useForm<UpdateAssignmentValues>({
    resolver: zodResolver(UpdateAssignmentSchema),
    defaultValues: {
      title: assignment.title,
      description: assignment.description,
      status: assignment.status as
        | STATUS.PENDING
        | STATUS.IN_PROGRESS
        | STATUS.COMPLETED
        | undefined,
    },
  })

  const handelSubmit = async (values: UpdateAssignmentValues) => {
    await mutateAsync({ ...values, id: assignment.id })
    onClose()
  }

  return (
    <Form {...form}>
      {isError ? <ErrorAlert error={error} /> : null}
      <form onSubmit={form.handleSubmit(handelSubmit)} className="space-y-4">
        <InputField
          label="Title"
          name="title"
          type="text"
          form={form}
          placeholder="Title..."
        />
        <SelectField
          name="status"
          form={form}
          placeholder="Select Status"
          options={[
            {
              label: "Pending",
              value: "pending",
            },
            {
              label: "In Progress",
              value: "progress",
            },
            {
              label: "Completed",
              value: "completed",
            },
          ]}
        />
        <TextareaField
          label="Description"
          name="description"
          form={form}
          placeholder="Description..."
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            Update
          </Button>
        </div>
      </form>
    </Form>
  )
}

import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import ErrorAlert from "@/components/ErrorAlert"
import { InputField, TextareaField } from "@/components/fields"

import { useCreateAssignment } from "../../hooks"
import {
  CreateAssignmentSchema,
  CreateAssignmentValues,
} from "../../validators"

export default function CreateForm({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending, isError, error } = useCreateAssignment()

  const form = useForm<CreateAssignmentValues>({
    resolver: zodResolver(CreateAssignmentSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const handelSubmit = async (values: CreateAssignmentValues) => {
    await mutateAsync(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get-assignments"] })
        onClose()
      },
    })
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
            Create
          </Button>
        </div>
      </form>
    </Form>
  )
}

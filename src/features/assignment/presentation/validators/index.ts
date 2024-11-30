import { z } from "zod"
import { STATUS } from "../../domain/models/Assignment";

export const CreateAssignmentSchema = z.object({
  title: z
    .string()
    .min(8, "Title must be at least 8 characters long"),
  description: z
    .string()
    .min(8, "Description must be at least 8 characters long")
})

export type CreateAssignmentValues = z.infer<typeof CreateAssignmentSchema>;

export const UpdateAssignmentSchema = z.object({
  status: z.enum([STATUS.PENDING, STATUS.IN_PROGRESS, STATUS.COMPLETED]),
}).and(CreateAssignmentSchema)

export type UpdateAssignmentValues = z.infer<typeof UpdateAssignmentSchema>;

export const ConfirmDeleteAssignmentSchema = z.object({
  confirm: z
    .string()
    .min(8, "Confirm must be at least 8 characters long"),
})

export const ConfirmDeleteAssignmentFnSchema = (title: string) =>
  z.object({
    confirm: z
      .string()
      .refine((val) => val === title, {
        message: `The Title must match exactly "${title}"`,
      }),
  });

export type ConfirmDeleteAssignmentValues = z.infer<typeof ConfirmDeleteAssignmentSchema>;
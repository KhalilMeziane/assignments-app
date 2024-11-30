import { useCreateAssignmentMutation, useUpdateAssignmentMutation, useDeleteAssignmentMutation } from "@/features/assignment/application/assignmentMutations"
import { useGetAssignmentsQuery } from "../../application/assignmentQueries"
import { GetAllParamsDTO } from "../../domain/dtos/AssignmentDTO"

export const useCreateAssignment = () => {
  return useCreateAssignmentMutation()
}

export const useUpdateAssignment = () => {
  return useUpdateAssignmentMutation()
}

export const useDeleteAssignment = () => {
  return useDeleteAssignmentMutation()
}

export const useGetAssignments = (params?: GetAllParamsDTO) => {
  return useGetAssignmentsQuery(params)
}
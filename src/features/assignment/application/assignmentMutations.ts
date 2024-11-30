import { useMutation } from "@tanstack/react-query";

import { CreateDTO, UpdateDTO } from "../domain/dtos/AssignmentDTO";
import { AssignmentHttpRepository } from "../infrastructure/http/AssignmentHttpRepository";

export const useCreateAssignmentMutation = () => {
  return useMutation({
    mutationKey: ['create-assignment'],
    mutationFn: (body: CreateDTO) => {
      return new AssignmentHttpRepository().create(body);
    },
  });
}

export const useUpdateAssignmentMutation = () => {
  return useMutation({
    mutationKey: ['update-assignment'],
    mutationFn: (body: UpdateDTO) => {
      return new AssignmentHttpRepository().update(body);
    },
  });
}

export const useDeleteAssignmentMutation = () => {
  return useMutation({
    mutationKey: ['delete-assignment'],
    mutationFn: (id: string) => {
      return new AssignmentHttpRepository().delete(id);
    },
  });
}
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AssignmentHttpRepository } from "../infrastructure/http/AssignmentHttpRepository";
import { GetAllParamsDTO } from "../domain/dtos/AssignmentDTO";

export const useGetAssignmentsQuery = (params?: GetAllParamsDTO) => {
  return useQuery({
    queryKey: ['get-assignments', JSON.stringify(params)],
    queryFn: () => {
      return new AssignmentHttpRepository().getAll(params);
    },
    placeholderData: keepPreviousData
  });
}
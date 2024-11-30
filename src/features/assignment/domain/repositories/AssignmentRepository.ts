import { CreateDTO, CreateResponseDTO, DeleteResponseDTO, GetAllParamsDTO, GetAllResponseDTO, UpdateDTO, UpdateResponseDTO } from "../../domain/dtos/AssignmentDTO"

export interface AssignmentRepository {
  create(createDTO: CreateDTO): Promise<CreateResponseDTO | null>;
  update(updateDTO: UpdateDTO): Promise<UpdateResponseDTO | null>;
  delete(id: string): Promise<DeleteResponseDTO | null>;
  getAll(getAllParamsDTO: GetAllParamsDTO): Promise<GetAllResponseDTO | null>;
}

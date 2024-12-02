import { HttpClient } from "@/lib/httpClient"
import { CreateDTO, CreateResponseDTO, DeleteResponseDTO, GetAllParamsDTO, GetAllResponseDTO, UpdateDTO, UpdateResponseDTO } from "../../domain/dtos/AssignmentDTO"
import { AssignmentRepository } from "../../domain/repositories/AssignmentRepository"

export class AssignmentHttpRepository implements AssignmentRepository {
  async create(createDTO: CreateDTO): Promise<CreateResponseDTO | null> {
    try {
      const response = await HttpClient().post('/assignments', createDTO)
      const data = response.data as CreateResponseDTO
      return data
    } catch (error) {
      throw error
    }
  }

  async update(updateDTO: UpdateDTO): Promise<UpdateResponseDTO | null> {
    try {
      const { id, ...body } = updateDTO
      const response = await HttpClient().put(`/assignments/${id}`, body)
      const data = response.data as UpdateResponseDTO
      return data
    } catch (error) {
      throw error
    }
  }

  async delete(id: string): Promise<DeleteResponseDTO | null> {
    try {
      const response = await HttpClient().delete(`/assignments/${id}`)
      const data = response.data as DeleteResponseDTO
      return data
    } catch (error) {
      throw error
    }
  }

  async getAll(getAllParams?: GetAllParamsDTO): Promise<GetAllResponseDTO | null> {
    try {
      const response = await HttpClient().get('/assignments', {
        params: getAllParams
      })
      const data = response.data as GetAllResponseDTO
      return data
    } catch (error) {
      throw error
    }
  }
}
import { Assignment, STATUS } from "../models/Assignment";

export interface CreateDTO {
  title: string;
  description: string;
}

export interface CreateResponseDTO {
  message: string,
  assignment: Assignment
}

export interface UpdateDTO {
  id: string,
  status: STATUS
  title: string;
  description: string;
}

export interface UpdateResponseDTO {
  message: string,
  assignment: Assignment
}

export interface DeleteResponseDTO {
  message: string
}


export interface GetAllParamsDTO {
  page?: number;
  limit?: number;
  search?: string;
  order?: 'asc' | 'desc'
}

export interface GetAllResponseDTO {
  message: string,
  data: {
    assignments: Assignment[]
    pagination: {}
  }
}
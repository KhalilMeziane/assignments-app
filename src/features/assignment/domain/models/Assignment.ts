import { User } from "@/features/auth/domain/models/Auth"

export interface Assignment {
  id: string
  title: string
  description: string
  status: STATUS
  createdAt: string
  updatedAt: string
  author: User
}

export enum STATUS {
  ALL = '',
  PENDING = 'pending',
  IN_PROGRESS = 'progress',
  COMPLETED = 'completed'
}
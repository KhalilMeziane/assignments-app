export interface Assignment {
  id: string
  title: string
  description: string
  status: STATUS
  createdAt: string
  updatedAt: string
}

export enum STATUS {
  ALL = '',
  PENDING = 'pending',
  IN_PROGRESS = 'progress',
  COMPLETED = 'completed'
}
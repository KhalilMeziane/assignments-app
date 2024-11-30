export interface Assignment {
  id: string
  title: string
  description: string
  status: STATUS
}

export enum STATUS {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed'
}
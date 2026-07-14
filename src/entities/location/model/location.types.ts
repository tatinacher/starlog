import type { UUID, ISODateString } from '@/shared/types'

export interface ObservationLocation {
  id: UUID
  name: string
  latitude: number
  longitude: number
  altitude?: number
  timezone?: string
  isDefault: boolean
  notes?: string
  createdAt: ISODateString
}

export type CreateLocationDto = Omit<ObservationLocation, 'id' | 'createdAt'>
export type UpdateLocationDto = Partial<Omit<ObservationLocation, 'id' | 'createdAt'>>

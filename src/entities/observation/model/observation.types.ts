import type { UUID, ISODateString } from '@/shared/types'
import type { MoonPhase } from '@/entities/astronomy'

export interface Observation {
  id: UUID
  date: ISODateString
  locationId: UUID | null
  objects: ObservationEntry[]
  conditions: SkyConditions
  equipment?: string
  notes: string
  createdAt: ISODateString
  updatedAt: ISODateString
}

export interface ObservationEntry {
  objectId: UUID
  seen: boolean
  notes?: string
  rating?: 1 | 2 | 3 | 4 | 5
}

export interface SkyConditions {
  bortle?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  seeing?: 1 | 2 | 3 | 4 | 5
  transparency?: 1 | 2 | 3 | 4 | 5
  moonPhase?: MoonPhase
  temperature?: number
  humidity?: number
}

export interface ObservationFilters {
  dateFrom?: ISODateString
  dateTo?: ISODateString
  locationId?: UUID
  objectType?: string
  objectId?: UUID
}

export type CreateObservationDto = Omit<Observation, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateObservationDto = Partial<CreateObservationDto>

import type { UUID } from '@/shared/types'
import type { ObjectType, EquatorialCoordinates } from '@/entities/astronomy'

export interface CelestialObject {
  id: UUID
  catalogId: string
  name: string
  altNames: string[]
  type: ObjectType
  constellation: string
  coordinates: EquatorialCoordinates
  magnitude: number | null
  angularSize?: string
  description?: string
}

// Пользовательские данные по объекту — хранятся отдельно от каталога
export interface UserObjectData {
  id: UUID
  objectId: UUID
  isFavorite: boolean
  personalNotes?: string
}

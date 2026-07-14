import type { UUID } from '@/shared/types'
import type { ObjectType } from '@/entities/astronomy'

export interface UserSettings {
  defaultLocationId?: UUID
  theme: 'dark' | 'night-red' | 'light'
  language: string
  catalogFilters: ObjectType[]
  equipment: EquipmentConfig
}

export interface EquipmentConfig {
  telescopeName?: string
  apertureMm?: number
  focalLengthMm?: number
  eyepieces: Eyepiece[]
}

export interface Eyepiece {
  id: UUID
  name: string
  focalLengthMm: number
  afovDeg?: number
}

export const DEFAULT_SETTINGS: UserSettings = {
  theme: 'dark',
  language: 'ru',
  catalogFilters: [],
  equipment: {
    eyepieces: [],
  },
}

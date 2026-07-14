import type { UUID } from '@/shared/types'
import type { CelestialObjectType } from '@/shared/types/enums'

// Eyepiece переехал в entities/instrument — здесь оставляем только UserSettings.

export interface UserSettings {
  readonly defaultLocationId?: UUID
  readonly theme: 'dark' | 'night-red' | 'light'
  readonly language: string
  readonly catalogFilters: readonly CelestialObjectType[]
}

export const DEFAULT_SETTINGS: UserSettings = {
  theme: 'dark',
  language: 'ru',
  catalogFilters: [],
}

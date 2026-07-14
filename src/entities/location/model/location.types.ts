import type { UUID, ISODateString, Bortle } from '@/shared/types'

/**
 * Сохранённое место наблюдений.
 *
 * Пользователь может сохранить несколько мест (дача, тёмное поле, крыша дома)
 * и быстро выбирать их при создании наблюдения.
 *
 * `bortle` здесь — характеристика места, а не конкретной ночи.
 * Условия конкретной ночи (видимость, прозрачность) хранятся в `ObservationConditions`.
 */
export interface Location {
  readonly id: UUID
  readonly name: string
  readonly latitude: number
  readonly longitude: number
  /** Высота над уровнем моря в метрах. */
  readonly altitudeMeters: number | null
  /** Типичная засветка неба на этом месте по шкале Бортля. */
  readonly bortle: Bortle | null
  /** IANA timezone ID, например "Europe/Moscow". null если не определён. */
  readonly timezone: string | null
  readonly notes: string | null
  readonly isFavorite: boolean
  /** Место по умолчанию — подставляется автоматически при создании наблюдения. */
  readonly isDefault: boolean
  readonly createdAt: ISODateString
}

// ─── DTO ──────────────────────────────────────────────────────────────────────

/** DTO для создания места наблюдений. */
export type CreateLocationDto = Omit<Location, 'id' | 'createdAt'>

/** DTO для обновления места наблюдений. */
export type UpdateLocationDto = Partial<CreateLocationDto>

// Алиас для совместимости с существующим кодом в репозитории и стора.
/** @deprecated Используй `Location`. */
export type ObservationLocation = Location

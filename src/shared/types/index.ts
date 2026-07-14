export type UUID = string
export type ISODateString = string

export interface LatLng {
  readonly latitude: number
  readonly longitude: number
}

export interface PaginationParams {
  readonly page: number
  readonly perPage: number
}

export interface AsyncState<T> {
  readonly data: T
  readonly loading: boolean
  readonly error: string | null
}

/**
 * Шкала Бортля (1–9).
 * 1 = идеально тёмное небо, 9 = центр города.
 * Числовой литеральный тип: значения имеют семантику порядка, их не нужно сериализовывать как строки.
 */
export type Bortle = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

/**
 * Атмосферная стабильность по шкале Антониади (1–5).
 * 1 = превосходное, 5 = очень плохое.
 */
export type Seeing = 1 | 2 | 3 | 4 | 5

/**
 * Прозрачность атмосферы (1–5).
 * 1 = плохая, 5 = отличная.
 */
export type Transparency = 1 | 2 | 3 | 4 | 5

/** Оценка наблюдения (1–5 звёзд). */
export type ObservationRating = 1 | 2 | 3 | 4 | 5

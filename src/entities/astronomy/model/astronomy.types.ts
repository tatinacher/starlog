import type { MoonPhase } from '@/shared/types/enums'

export type { MoonPhase }

/**
 * Экваториальные координаты объекта (система J2000.0).
 * Используются для всех неподвижных объектов каталога.
 */
export interface EquatorialCoordinates {
  /** Прямое восхождение в десятичных часах (0–24). */
  readonly raHours: number
  /** Склонение в десятичных градусах (−90 до +90). */
  readonly decDegrees: number
}

/**
 * Горизонтальные координаты объекта на конкретный момент времени и место.
 * Вычисляются из экваториальных — не хранятся в БД.
 */
export interface HorizonCoordinates {
  /** Азимут в градусах (0 = Север, по часовой стрелке). */
  readonly azimuth: number
  /** Высота над горизонтом в градусах (−90 до +90). */
  readonly altitude: number
}

/**
 * Контекст текущего момента наблюдения.
 * Передаётся в будущий calculation-слой для вычисления видимости объектов.
 */
export interface AstronomyContext {
  readonly date: Date
  readonly latitude: number
  readonly longitude: number
}

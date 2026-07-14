import type { Distance } from '@/entities/celestial-object'
import { DistanceUnit } from '@/shared/types/enums'

/** Форматирует прямое восхождение из десятичных часов в читаемый вид. */
export function formatRA(raHours: number): string {
  const h = Math.floor(raHours)
  const mFull = (raHours - h) * 60
  const m = Math.floor(mFull)
  const s = Math.round((mFull - m) * 60)
  return `${h}h ${m}m ${s}s`
}

/** Форматирует склонение из десятичных градусов в читаемый вид. */
export function formatDec(decDegrees: number): string {
  const sign = decDegrees >= 0 ? '+' : '-'
  const abs = Math.abs(decDegrees)
  const d = Math.floor(abs)
  const m = Math.floor((abs - d) * 60)
  return `${sign}${d}° ${m}'`
}

const DISTANCE_UNIT_LABELS: Record<DistanceUnit, string> = {
  [DistanceUnit.Kilometer]:        'км',
  [DistanceUnit.AstronomicalUnit]: 'а.е.',
  [DistanceUnit.LightYear]:        'св. лет',
  [DistanceUnit.KiloLightYear]:    'тыс. св. лет',
  [DistanceUnit.MegaLightYear]:    'млн св. лет',
  [DistanceUnit.Parsec]:           'пк',
  [DistanceUnit.Kiloparsec]:       'кпк',
  [DistanceUnit.Megaparsec]:       'Мпк',
}

/** Форматирует расстояние с единицей измерения. */
export function formatDistance(distance: Distance | null): string {
  if (!distance) return '—'
  return `${distance.value.toLocaleString('ru-RU')} ${DISTANCE_UNIT_LABELS[distance.unit]}`
}

/** Форматирует высоту над горизонтом в градусах. */
export function formatAltitude(altitude: number): string {
  return `${Math.round(altitude)}°`
}

/** Форматирует азимут в градусах. */
export function formatAzimuth(azimuth: number): string {
  return `${Math.round(azimuth)}°`
}

const DIRECTION_LABELS = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'] as const

/** Конвертирует азимут в сторону света (С, СВ, В …). */
export function azimuthToDirection(azimuth: number): string {
  const idx = Math.round(azimuth / 45) % 8
  return DIRECTION_LABELS[idx]
}

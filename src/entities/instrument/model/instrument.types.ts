import type { UUID, ISODateString } from '@/shared/types'
import type { InstrumentType } from '@/shared/types/enums'

/**
 * Окуляр телескопа.
 * Хранится в составе инструмента, используется при расчёте увеличения.
 */
export interface Eyepiece {
  readonly id: UUID
  readonly name: string
  /** Фокусное расстояние окуляра в мм. */
  readonly focalLengthMm: number
  /** Видимый угол поля зрения в градусах (apparent field of view). */
  readonly afovDeg: number | null
  readonly manufacturer: string | null
}

/**
 * Астрономический инструмент пользователя.
 *
 * Модель описывает физический инструмент (телескоп, бинокль, камера).
 * Пока не используется в основном flow, но модель зафиксирована,
 * чтобы инструменты можно было добавить без миграции схемы типов.
 */
export interface Instrument {
  readonly id: UUID
  readonly name: string
  readonly type: InstrumentType
  readonly manufacturer: string | null
  /** Апертура (диаметр объектива/зеркала) в мм. */
  readonly apertureMm: number | null
  /** Фокусное расстояние трубы в мм. */
  readonly focalLengthMm: number | null
  readonly eyepieces: readonly Eyepiece[]
  readonly notes: string | null
  readonly createdAt: ISODateString
}

// ─── DTO ──────────────────────────────────────────────────────────────────────

/** DTO для создания инструмента. */
export type CreateInstrumentDto = Omit<Instrument, 'id' | 'createdAt'>

/** DTO для обновления инструмента. */
export type UpdateInstrumentDto = Partial<CreateInstrumentDto>

/** DTO для создания окуляра. */
export type CreateEyepieceDto = Omit<Eyepiece, 'id'>

/** DTO для обновления окуляра. */
export type UpdateEyepieceDto = Partial<CreateEyepieceDto>

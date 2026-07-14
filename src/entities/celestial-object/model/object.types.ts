import type { UUID } from '@/shared/types'
import type { CelestialObjectType, AstronomicalCatalog, Constellation, DistanceUnit } from '@/shared/types/enums'
import type { EquatorialCoordinates } from '@/entities/astronomy'

// ─── Вспомогательные структуры ────────────────────────────────────────────────

/**
 * Идентификатор объекта в астрономическом каталоге.
 * Один объект может фигурировать в нескольких каталогах одновременно
 * (например, M31 = NGC 224).
 */
export interface CatalogId {
  readonly catalog: AstronomicalCatalog
  readonly id: string
}

/**
 * Расстояние до объекта.
 * Единица хранится явно, чтобы не зависеть от контекста при отображении.
 */
export interface Distance {
  readonly value: number
  readonly unit: DistanceUnit
}

/**
 * Угловой размер объекта.
 * Все размеры в угловых минутах — стандарт большинства каталогов.
 */
export interface AngularSize {
  /** Большая ось в угловых минутах. */
  readonly majorAxisArcmin: number
  /** Малая ось в угловых минутах. null если объект круглый. */
  readonly minorAxisArcmin: number | null
  /** Позиционный угол большой оси в градусах (0 = Север). */
  readonly positionAngleDeg: number | null
}

// ─── Основная модель ──────────────────────────────────────────────────────────

/**
 * Астрономический объект из каталога.
 *
 * Это неизменяемые данные каталога — пользователь не редактирует их напрямую.
 * Личные данные пользователя (наблюдал/избранное) хранятся в `UserObjectData`.
 *
 * `coordinates: null` у объектов Солнечной системы — их положение вычисляется
 * на конкретный момент времени, а не хранится статично.
 */
export interface CelestialObject {
  readonly id: UUID
  /** URL-safe идентификатор для роутинга и поиска. Например: "m31", "vega", "saturn". */
  readonly slug: string
  /** Основное название объекта (латиница/международное). */
  readonly name: string
  /** Русское название объекта. */
  readonly nameRu: string | null
  /** Альтернативные названия, обозначения Байера, Флемстида, обиходные имена. */
  readonly aliases: readonly string[]
  readonly type: CelestialObjectType
  /** IAU-код созвездия. null для объектов Солнечной системы. */
  readonly constellation: Constellation | null
  /**
   * Экваториальные координаты эпохи J2000.0.
   * null для объектов с переменным положением (планеты, Луна, кометы, астероиды).
   */
  readonly coordinates: EquatorialCoordinates | null
  /** Видимая звёздная величина. null если объект переменный или данные недоступны. */
  readonly magnitude: number | null
  /** Абсолютная звёздная величина. Применимо к звёздам и внегалактическим объектам. */
  readonly absoluteMagnitude: number | null
  readonly distance: Distance | null
  readonly angularSize: AngularSize | null
  /** Описание для пользователя. */
  readonly description: string | null
  /** URL изображения объекта. */
  readonly imageUrl: string | null
  /** Теги для фильтрации: "summer-triangle", "bright", "showpiece" и т. д. */
  readonly tags: readonly string[]
  /** Идентификаторы в астрономических каталогах. */
  readonly catalogIds: readonly CatalogId[]
  /** Спектральный класс MK. Только для звёзд. Например: "A0Va", "K1.5IIIFe". */
  readonly spectralClass: string | null
  /** Температура фотосферы в Кельвинах. Только для звёзд. */
  readonly surfaceTemperatureK: number | null
  /**
   * true для объектов Солнечной системы (планеты, Луна, кометы, астероиды).
   * Их положение нельзя сохранить статично — координаты вычисляются на момент наблюдения.
   */
  readonly isVariablePosition: boolean
}

// ─── Пользовательские данные по объекту ──────────────────────────────────────

/**
 * Личные данные пользователя об объекте.
 * Хранятся отдельно от каталога, чтобы каталог мог обновляться независимо.
 */
export interface UserObjectData {
  readonly id: UUID
  readonly objectId: UUID
  readonly isFavorite: boolean
  readonly personalNotes: string | null
}

// ─── DTO ──────────────────────────────────────────────────────────────────────

/** DTO для создания пользовательских данных объекта. */
export type CreateUserObjectDataDto = Omit<UserObjectData, 'id'>

/** DTO для обновления пользовательских данных объекта. */
export type UpdateUserObjectDataDto = Partial<Omit<UserObjectData, 'id' | 'objectId'>>

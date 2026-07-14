import type { UUID, ISODateString, Bortle, Seeing, Transparency, ObservationRating } from '@/shared/types'
import type { MoonPhase, ObservationStatus } from '@/shared/types/enums'

// ─── Вспомогательные структуры ────────────────────────────────────────────────

/**
 * Координаты места наблюдения в конкретный момент.
 * Хранятся прямо в записи наблюдения — пользователь мог наблюдать
 * не из сохранённого места, или место могло быть удалено позже.
 */
export interface ObservationCoordinates {
  readonly latitude: number
  readonly longitude: number
  /** Высота над уровнем моря в метрах. */
  readonly altitudeMeters: number | null
}

/**
 * Условия наблюдения.
 * Все поля опциональны — пользователь заполняет то, что измерил.
 */
export interface ObservationConditions {
  /** Шкала Бортля: 1 = тёмное небо, 9 = центр города. */
  readonly bortle: Bortle | null
  /** Атмосферная стабильность по Антониади: 1 = отличное, 5 = очень плохое. */
  readonly seeing: Seeing | null
  /** Прозрачность атмосферы: 1 = плохая, 5 = отличная. */
  readonly transparency: Transparency | null
  readonly moonPhase: MoonPhase | null
  /** Освещённость Луны в процентах (0–100). */
  readonly moonIllumination: number | null
  /** Температура воздуха в °C. */
  readonly temperatureCelsius: number | null
  /** Относительная влажность (0–100). */
  readonly humidity: number | null
  /** Скорость ветра в км/ч. */
  readonly windSpeedKmh: number | null
}

/**
 * Инструмент, использованный при наблюдении.
 * `instrumentId` ссылается на запись в таблице инструментов — может быть null,
 * если пользователь ввёл инструмент текстом без сохранения.
 */
export interface ObservationInstrument {
  readonly instrumentId: UUID | null
  /** Свободный текст названия инструмента (используется когда instrumentId = null). */
  readonly name: string
  readonly magnification: number | null
}

/**
 * Фотография из сессии наблюдения.
 * Модель заготовлена — функциональность появится в следующих версиях.
 */
export interface ObservationPhoto {
  readonly id: UUID
  readonly url: string
  readonly caption: string | null
  readonly capturedAt: ISODateString | null
}

// ─── Основная модель ──────────────────────────────────────────────────────────

/**
 * Запись о наблюдении одного небесного объекта.
 *
 * Одно наблюдение = один объект + один момент времени.
 * Если за ночь наблюдалось 10 объектов — это 10 записей Observation.
 * Такой подход позволяет: независимо оценивать каждый объект,
 * точно фильтровать по объекту, добавлять фото к конкретному объекту.
 */
export interface Observation {
  readonly id: UUID
  readonly celestialObjectId: UUID
  readonly observedAt: ISODateString
  /**
   * ID сохранённого места. null если место не выбрано или было удалено.
   * Координаты в момент наблюдения дублируются в `observationCoordinates`.
   */
  readonly locationId: UUID | null
  /**
   * Координаты в момент наблюдения.
   * Дублируются из места намеренно — пользователь мог наблюдать с другой точки,
   * или место могло быть удалено из базы.
   */
  readonly observationCoordinates: ObservationCoordinates | null
  readonly instrument: ObservationInstrument | null
  readonly conditions: ObservationConditions | null
  readonly note: string | null
  readonly status: ObservationStatus
  readonly rating: ObservationRating | null
  /**
   * Фотографии наблюдения.
   * Слот готов — в текущей версии всегда пустой массив.
   */
  readonly photos: readonly ObservationPhoto[]
  readonly tags: readonly string[]
  readonly createdAt: ISODateString
  readonly updatedAt: ISODateString
}

// ─── Фильтры ─────────────────────────────────────────────────────────────────

/** Параметры фильтрации списка наблюдений. */
export interface ObservationFilters {
  readonly celestialObjectId?: UUID
  readonly locationId?: UUID
  readonly dateFrom?: ISODateString
  readonly dateTo?: ISODateString
  readonly status?: ObservationStatus
  readonly minRating?: ObservationRating
}

// ─── DTO ──────────────────────────────────────────────────────────────────────

/**
 * DTO и Domain Model разделены по следующим причинам:
 *
 * 1. Domain Model (`Observation`) — то, с чем работает приложение.
 *    Поля строго типизированы, все readonly.
 *
 * 2. `CreateObservationDto` — то, что передаётся репозиторию при создании.
 *    Не содержит id, createdAt, updatedAt — они генерируются в репозитории.
 *    Это разделение гарантирует, что ID никогда не придёт снаружи.
 *
 * 3. `UpdateObservationDto` — Partial от Create DTO.
 *    Позволяет обновлять отдельные поля без передачи полного объекта.
 *    Если завтра появится REST API — только репозиторий изменится, не модели.
 */
export type CreateObservationDto = Omit<Observation, 'id' | 'createdAt' | 'updatedAt'>

/** DTO для частичного обновления наблюдения. */
export type UpdateObservationDto = Partial<CreateObservationDto>

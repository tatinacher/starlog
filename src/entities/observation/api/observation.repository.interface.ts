import type { UUID } from '@/shared/types'
import type {
  Observation,
  ObservationFilters,
  CreateObservationDto,
  UpdateObservationDto,
} from '../model/observation.types'

/**
 * Контракт репозитория наблюдений.
 *
 * Все методы возвращают Domain Model (`Observation`), не сырые записи БД.
 * Преобразование DTO → Domain Model происходит внутри реализации репозитория.
 */
export interface ObservationRepository {
  /** Найти наблюдение по ID. */
  findById(id: UUID): Promise<Observation | null>

  /**
   * Вернуть список наблюдений с фильтрацией.
   * Без фильтров — все записи, отсортированные по дате убывания.
   */
  findAll(filters?: ObservationFilters): Promise<Observation[]>

  /** Все наблюдения конкретного объекта. */
  findByObjectId(objectId: UUID): Promise<Observation[]>

  /** Все наблюдения из конкретного места. */
  findByLocationId(locationId: UUID): Promise<Observation[]>

  /** Количество наблюдений (с опциональной фильтрацией). Дешевле чем findAll().length. */
  count(filters?: ObservationFilters): Promise<number>

  /** Создать новую запись наблюдения. */
  create(dto: CreateObservationDto): Promise<Observation>

  /** Обновить существующую запись. Возвращает обновлённый объект. */
  update(id: UUID, dto: UpdateObservationDto): Promise<Observation>

  /** Удалить запись наблюдения. */
  delete(id: UUID): Promise<void>
}

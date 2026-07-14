import type { UUID } from '@/shared/types'
import type { Location, CreateLocationDto, UpdateLocationDto } from '../model/location.types'

/**
 * Контракт репозитория мест наблюдений.
 */
export interface LocationRepository {
  /** Найти место по ID. */
  findById(id: UUID): Promise<Location | null>

  /** Вернуть все сохранённые места. */
  findAll(): Promise<Location[]>

  /** Вернуть место по умолчанию. null если не установлено. */
  findDefault(): Promise<Location | null>

  /** Вернуть все места, отмеченные как избранные. */
  findFavorites(): Promise<Location[]>

  /** Создать новое место. */
  create(dto: CreateLocationDto): Promise<Location>

  /** Обновить место. Возвращает обновлённый объект. */
  update(id: UUID, dto: UpdateLocationDto): Promise<Location>

  /** Удалить место. Наблюдения, связанные с этим местом, не удаляются. */
  delete(id: UUID): Promise<void>

  /**
   * Установить место по умолчанию.
   * Сбрасывает isDefault у всех остальных мест атомарно.
   */
  setDefault(id: UUID): Promise<void>
}

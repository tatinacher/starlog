import type { UUID } from '@/shared/types'
import type { CelestialObjectType, Constellation } from '@/shared/types/enums'
import type { CelestialObject } from '../model/object.types'

/**
 * Контракт репозитория астрономических объектов.
 *
 * Реализации могут читать из: локального JSON-каталога, IndexedDB, REST API.
 * Слой фич и сторы работают только с этим интерфейсом — не с конкретной реализацией.
 */
export interface CelestialObjectRepository {
  /** Найти объект по внутреннему ID. */
  findById(id: UUID): Promise<CelestialObject | null>

  /** Найти объект по slug (используется в роутинге). */
  findBySlug(slug: string): Promise<CelestialObject | null>

  /** Вернуть полный каталог. */
  findAll(): Promise<CelestialObject[]>

  /** Отфильтровать по типу объекта. */
  findByType(type: CelestialObjectType): Promise<CelestialObject[]>

  /** Отфильтровать по созвездию. */
  findByConstellation(constellation: Constellation): Promise<CelestialObject[]>

  /**
   * Полнотекстовый поиск по name, aliases, catalogIds.
   * Реализация должна поддерживать частичное совпадение.
   */
  search(query: string): Promise<CelestialObject[]>

  /** Сохранить объект (insert or replace). */
  save(object: CelestialObject): Promise<CelestialObject>

  /** Удалить объект из пользовательской БД. Не удаляет из встроенного каталога. */
  delete(id: UUID): Promise<void>
}

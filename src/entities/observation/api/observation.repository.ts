import { db } from '@/entities/storage'
import { generateId } from '@/shared/utils/id.utils'
import { toISODate } from '@/shared/utils/date.utils'
import type {
  Observation,
  ObservationFilters,
  CreateObservationDto,
  UpdateObservationDto,
} from '../model/observation.types'

export const observationRepository = {
  async getAll(filters: ObservationFilters = {}): Promise<Observation[]> {
    let collection = db.table<Observation>('observations').orderBy('date').reverse()

    if (filters.locationId) {
      collection = collection.filter((o) => o.locationId === filters.locationId)
    }
    if (filters.objectId) {
      collection = collection.filter((o) =>
        o.objects.some((entry) => entry.objectId === filters.objectId),
      )
    }
    if (filters.dateFrom) {
      collection = collection.filter((o) => o.date >= filters.dateFrom!)
    }
    if (filters.dateTo) {
      collection = collection.filter((o) => o.date <= filters.dateTo!)
    }

    return collection.toArray()
  },

  async getById(id: string): Promise<Observation | undefined> {
    return db.table<Observation>('observations').get(id)
  },

  async create(dto: CreateObservationDto): Promise<Observation> {
    const now = toISODate(new Date())
    const record: Observation = {
      ...dto,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    }
    await db.table('observations').add(record)
    return record
  },

  async update(id: string, dto: UpdateObservationDto): Promise<void> {
    await db.table('observations').update(id, { ...dto, updatedAt: toISODate(new Date()) })
  },

  async delete(id: string): Promise<void> {
    await db.table('observations').delete(id)
  },
}

import { db } from '@/entities/storage'
import { generateId } from '@/shared/utils/id.utils'
import { toISODate } from '@/shared/utils/date.utils'
import { toStorable } from '@/shared/utils/storage.utils'
import { ObservationStatus } from '@/shared/types/enums'
import type {
  Observation,
  ObservationFilters,
  CreateObservationDto,
  UpdateObservationDto,
} from '../model/observation.types'

export const observationRepository = {
  async getAll(filters: ObservationFilters = {}): Promise<Observation[]> {
    let collection = db.table<Observation>('observations').orderBy('observedAt').reverse()

    if (filters.celestialObjectId) {
      collection = collection.filter((o) => o.celestialObjectId === filters.celestialObjectId)
    }
    if (filters.locationId) {
      collection = collection.filter((o) => o.locationId === filters.locationId)
    }
    if (filters.dateFrom) {
      collection = collection.filter((o) => o.observedAt >= filters.dateFrom!)
    }
    if (filters.dateTo) {
      collection = collection.filter((o) => o.observedAt <= filters.dateTo!)
    }
    if (filters.status) {
      collection = collection.filter((o) => o.status === filters.status)
    }
    if (filters.minRating) {
      collection = collection.filter(
        (o) => o.rating !== null && o.rating >= filters.minRating!,
      )
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
      status: dto.status ?? ObservationStatus.Completed,
      photos: dto.photos ?? [],
      tags: dto.tags ?? [],
      createdAt: now,
      updatedAt: now,
    }
    await db.table('observations').add(toStorable(record))
    return record
  },

  async update(id: string, dto: UpdateObservationDto): Promise<void> {
    await db.table('observations').update(id, toStorable({ ...dto, updatedAt: toISODate(new Date()) }))
  },

  async delete(id: string): Promise<void> {
    await db.table('observations').delete(id)
  },
}

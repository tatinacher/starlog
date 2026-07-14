import { db } from '@/entities/storage'
import { generateId } from '@/shared/utils/id.utils'
import { toISODate } from '@/shared/utils/date.utils'
import type { ObservationLocation, CreateLocationDto, UpdateLocationDto } from '../model/location.types'

export const locationRepository = {
  async getAll(): Promise<ObservationLocation[]> {
    return db.table<ObservationLocation>('locations').toArray()
  },

  async getById(id: string): Promise<ObservationLocation | undefined> {
    return db.table<ObservationLocation>('locations').get(id)
  },

  async create(dto: CreateLocationDto): Promise<ObservationLocation> {
    const record: ObservationLocation = {
      ...dto,
      id: generateId(),
      createdAt: toISODate(new Date()),
    }
    await db.table('locations').add(record)
    return record
  },

  async update(id: string, dto: UpdateLocationDto): Promise<void> {
    await db.table('locations').update(id, dto)
  },

  async delete(id: string): Promise<void> {
    await db.table('locations').delete(id)
  },

  async setDefault(id: string): Promise<void> {
    await db.transaction('rw', db.table('locations'), async () => {
      await db.table('locations').toCollection().modify({ isDefault: false })
      await db.table('locations').update(id, { isDefault: true })
    })
  },
}

import { db } from '@/entities/storage'
import { generateId } from '@/shared/utils/id.utils'
import { toISODate } from '@/shared/utils/date.utils'
import { toStorable } from '@/shared/utils/storage.utils'
import type { Location, CreateLocationDto, UpdateLocationDto } from '../model/location.types'

export const locationRepository = {
  async getAll(): Promise<Location[]> {
    return db.table<Location>('locations').toArray()
  },

  async getById(id: string): Promise<Location | undefined> {
    return db.table<Location>('locations').get(id)
  },

  async create(dto: CreateLocationDto): Promise<Location> {
    const record: Location = {
      ...dto,
      id: generateId(),
      createdAt: toISODate(new Date()),
    }
    await db.table('locations').add(toStorable(record))
    return record
  },

  async update(id: string, dto: UpdateLocationDto): Promise<void> {
    await db.table('locations').update(id, toStorable(dto))
  },

  async delete(id: string): Promise<void> {
    await db.table('locations').delete(id)
  },

  async setDefault(id: string): Promise<void> {
    await db.table('locations').toCollection().modify({ isDefault: false })
    await db.table('locations').update(id, { isDefault: true })
  },
}

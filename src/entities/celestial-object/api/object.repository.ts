import { db } from '@/entities/storage'
import { generateId } from '@/shared/utils/id.utils'
import type { CelestialObject, UserObjectData } from '../model/object.types'

export const objectRepository = {
  async getAll(): Promise<CelestialObject[]> {
    return db.table<CelestialObject>('celestialObjects').toArray()
  },

  async getById(id: string): Promise<CelestialObject | undefined> {
    return db.table<CelestialObject>('celestialObjects').get(id)
  },

  async getObservedIds(): Promise<string[]> {
    const rows = await db
      .table<UserObjectData>('userObjectData')
      .filter((r) => r.isFavorite !== undefined)
      .toArray()
    return rows.map((r) => r.objectId)
  },

  async getFavoriteIds(): Promise<string[]> {
    const rows = await db
      .table<UserObjectData>('userObjectData')
      .filter((r) => r.isFavorite === true)
      .toArray()
    return rows.map((r) => r.objectId)
  },

  async markObserved(objectId: string): Promise<void> {
    const existing = await db
      .table<UserObjectData>('userObjectData')
      .where('objectId')
      .equals(objectId)
      .first()
    if (!existing) {
      await db.table('userObjectData').add({ id: generateId(), objectId, isFavorite: false })
    }
  },

  async unmarkObserved(objectId: string): Promise<void> {
    await db
      .table<UserObjectData>('userObjectData')
      .where('objectId')
      .equals(objectId)
      .delete()
  },

  async addFavorite(objectId: string): Promise<void> {
    const existing = await db
      .table<UserObjectData>('userObjectData')
      .where('objectId')
      .equals(objectId)
      .first()
    if (existing) {
      await db.table('userObjectData').update(existing.id, { isFavorite: true })
    } else {
      await db.table('userObjectData').add({ id: generateId(), objectId, isFavorite: true })
    }
  },

  async removeFavorite(objectId: string): Promise<void> {
    const existing = await db
      .table<UserObjectData>('userObjectData')
      .where('objectId')
      .equals(objectId)
      .first()
    if (existing) {
      await db.table('userObjectData').update(existing.id, { isFavorite: false })
    }
  },
}

import { db } from '@/entities/storage'
import { toStorable } from '@/shared/utils/storage.utils'
import type { UserSettings } from '../model/settings.types'
import { DEFAULT_SETTINGS } from '../model/settings.types'

const SETTINGS_ID = 1

export const settingsRepository = {
  async get(): Promise<UserSettings> {
    const row = await db.table<UserSettings & { id: number }>('settings').get(SETTINGS_ID)
    if (!row) return { ...DEFAULT_SETTINGS }
    const { id: _id, ...settings } = row
    return settings
  },

  async save(data: UserSettings): Promise<void> {
    await db.table('settings').put(toStorable({ ...data, id: SETTINGS_ID }))
  },

  async reset(): Promise<void> {
    await db.table('settings').put(toStorable({ ...DEFAULT_SETTINGS, id: SETTINGS_ID }))
  },
}

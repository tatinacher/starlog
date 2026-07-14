import type { StarlogDatabase } from '@/shared/lib/db/dexie.instance'
import { DB_SCHEMA } from '../model/schema.types'

// Каждая версия — отдельная запись. Никогда не изменять уже выпущенные версии.
export function applyMigrations(db: StarlogDatabase): void {
  db.version(1).stores(DB_SCHEMA)
}

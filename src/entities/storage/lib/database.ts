import { db } from '@/shared/lib/db/dexie.instance'
import { applyMigrations } from './migrations'

export function initDatabase(): void {
  applyMigrations(db)
}

export { db }

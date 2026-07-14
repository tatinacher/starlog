import Dexie from 'dexie'
import { DB_NAME, DB_VERSION } from '@/shared/config/app.config'

// Единственный экземпляр БД для всего приложения.
// Схема таблиц задаётся в entities/storage.
class StarlogDatabase extends Dexie {
  constructor() {
    super(DB_NAME)
  }
}

export const db = new StarlogDatabase()
export { StarlogDatabase }
export type { Dexie }

// Версия БД — всегда инкрементируется при изменении схемы.
export const CURRENT_DB_VERSION = DB_VERSION

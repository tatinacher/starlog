// Описание схемы Dexie — имена таблиц и их индексы.
// Изменение версии схемы всегда требует добавления миграции в migrations.ts.

export interface DbSchema {
  observations: string
  celestialObjects: string
  userObjectData: string
  locations: string
  settings: string
}

export const DB_SCHEMA: DbSchema = {
  observations: '++id, date, locationId, createdAt',
  celestialObjects: '++id, catalogId, type, constellation',
  userObjectData: '++id, objectId',
  locations: '++id, isDefault',
  settings: '++id',
}

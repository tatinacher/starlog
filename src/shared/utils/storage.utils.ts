/**
 * Конвертирует реактивный Vue Proxy в plain object перед записью в IndexedDB.
 * Structured Clone Algorithm (используемый IndexedDB) не умеет клонировать Proxy.
 */
export function toStorable<T>(data: T): T {
  return JSON.parse(JSON.stringify(data))
}

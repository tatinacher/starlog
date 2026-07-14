import type { UUID } from '@/shared/types'

export function generateId(): UUID {
  return crypto.randomUUID()
}
